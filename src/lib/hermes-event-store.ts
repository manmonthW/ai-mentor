import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

export interface HermesLiveEvent {
  event_id: string;
  sequence: number;
  timestamp: string;
  session_id: string;
  session_title: string;
  source: string;
  actor: string;
  type: "message.sent" | "tool.started" | "tool.completed" | "session.started" | "session.completed";
  summary: string;
  detail?: string;
  status: "success" | "failed" | "pending" | "info";
  tool_name?: string;
}

export interface HermesEventSnapshot {
  connected: boolean;
  store: string;
  generated_at: string;
  last_sequence: number;
  sessions: Array<{
    id: string;
    title: string;
    source: string;
    active: boolean;
    last_activity_at: string;
    event_count: number;
  }>;
  events: HermesLiveEvent[];
  error?: string;
}

const PYTHON_READER = String.raw`
import json, os, sqlite3, sys
from datetime import datetime, timezone

DB, since_raw, limit_raw = sys.argv[1:4]
since = max(0, int(since_raw or 0))
limit = min(500, max(1, int(limit_raw or 200)))

def iso(ts):
    if not ts: return None
    return datetime.fromtimestamp(float(ts), tz=timezone.utc).isoformat().replace('+00:00','Z')

def clip(value, n=800):
    value = str(value or '').strip()
    return value if len(value) <= n else value[:n] + '…'

def parse(value, fallback=None):
    try: return json.loads(value) if value else fallback
    except Exception: return fallback

def actor_for(source, role):
    if role == 'user': return 'user:owner'
    return f'hermes:{source or "default"}'

uri = 'file:' + DB + '?mode=ro'
conn = sqlite3.connect(uri, uri=True, timeout=2)
conn.row_factory = sqlite3.Row
rows = conn.execute('''
SELECT m.id, m.session_id, m.role, m.content, m.tool_calls, m.tool_name,
       m.effect_disposition, m.timestamp, m.finish_reason, m.display_kind,
       s.source, s.title, s.display_name, s.ended_at, s.end_reason,
       s.last_activity_at, s.started_at
FROM messages m JOIN sessions s ON s.id=m.session_id
WHERE m.active=1 AND m.id > ?
ORDER BY m.id ASC LIMIT ?
''', (since, limit)).fetchall()

events=[]
for r in rows:
    base = dict(r)
    seq = int(r['id'])
    role = r['role'] or 'unknown'
    source = r['source'] or 'unknown'
    title = r['title'] or r['display_name'] or r['session_id']
    event_type = 'message.sent'
    status = 'info'
    summary = clip(r['content'], 360)
    detail = None
    tool_name = r['tool_name']
    if role == 'assistant' and r['tool_calls']:
        calls = parse(r['tool_calls'], [])
        names=[]
        if isinstance(calls, list):
            for call in calls:
                if not isinstance(call, dict): continue
                fn=call.get('function') or {}
                name=fn.get('name') or call.get('name')
                if name: names.append(str(name))
        event_type='tool.started'
        status='pending'
        tool_name=', '.join(names) or 'tool'
        summary='调用工具：' + tool_name
        detail=f'{len(names) or 1} 个工具调用'
    elif role == 'tool':
        event_type='tool.completed'
        failed = str(r['effect_disposition'] or '').lower() in ('failed','denied','error')
        status='failed' if failed else 'success'
        tool_name=tool_name or 'tool'
        summary=('工具失败：' if failed else '工具完成：') + tool_name
        detail=clip(r['content'], 800)
    elif role == 'user':
        summary=summary or '用户发送了一条消息'
    elif role == 'assistant':
        summary=summary or 'Hermes 返回了一条消息'
    else:
        summary=summary or f'{role} 事件'
    events.append({
      'event_id': f'hermes_msg_{seq}', 'sequence': seq, 'timestamp': iso(r['timestamp']),
      'session_id': r['session_id'], 'session_title': title, 'source': source,
      'actor': actor_for(source, role), 'type': event_type, 'summary': summary,
      'detail': detail, 'status': status, 'tool_name': tool_name,
    })

session_rows = conn.execute('''
SELECT s.id, COALESCE(s.title,s.display_name,s.id) title, s.source, s.ended_at,
       COALESCE(s.last_activity_at,s.started_at) last_activity_at,
       COUNT(m.id) event_count
FROM sessions s LEFT JOIN messages m ON m.session_id=s.id AND m.active=1
WHERE s.hidden=0
GROUP BY s.id ORDER BY last_activity_at DESC LIMIT 12
''').fetchall()
max_id = conn.execute('SELECT COALESCE(MAX(id),0) FROM messages WHERE active=1').fetchone()[0]
print(json.dumps({
  'connected': True, 'store': DB, 'generated_at': iso(datetime.now(tz=timezone.utc).timestamp()),
  'last_sequence': int(max_id), 'sessions': [{
    'id': r['id'], 'title': r['title'], 'source': r['source'], 'active': r['ended_at'] is None,
    'last_activity_at': iso(r['last_activity_at']), 'event_count': int(r['event_count'])
  } for r in session_rows], 'events': events
}, ensure_ascii=False))
`;

function resolveStorePath() {
  return process.env.HERMES_STATE_DB || path.join(process.env.HERMES_HOME || path.join(homedir(), ".hermes"), "state.db");
}

export async function readHermesEvents(since = 0, limit = 200): Promise<HermesEventSnapshot> {
  const store = resolveStorePath();
  if (!existsSync(/* turbopackIgnore: true */ store)) {
    return { connected: false, store, generated_at: new Date().toISOString(), last_sequence: since, sessions: [], events: [], error: "Hermes state.db not found" };
  }
  return new Promise((resolve) => {
    const child = spawn("python3", ["-c", PYTHON_READER, store, String(Math.max(0, since)), String(Math.min(500, Math.max(1, limit)))], {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PYTHONUTF8: "1" },
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => child.kill("SIGKILL"), 4000);
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (code) => {
      clearTimeout(timer);
      try {
        if (code !== 0) throw new Error(stderr || `reader exited ${code}`);
        resolve(JSON.parse(stdout) as HermesEventSnapshot);
      } catch (error) {
        resolve({ connected: false, store, generated_at: new Date().toISOString(), last_sequence: since, sessions: [], events: [], error: error instanceof Error ? error.message : "Failed to read Hermes Event Store" });
      }
    });
  });
}
