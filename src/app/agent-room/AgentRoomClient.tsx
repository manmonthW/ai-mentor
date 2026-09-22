"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  CirclePause,
  Clock3,
  Code2,
  FileDiff,
  GitBranch,
  MessageSquareText,
  Search,
  Send,
  ShieldCheck,
  TerminalSquare,
  X,
} from "lucide-react";
import {
  acceptanceCriteria,
  replayAgents,
  replayEvents,
  replayTasks,
  timelineEntries,
  type TimelineEntry,
} from "@/data/agent-room-replay";

type ViewMode = "conversation" | "work" | "audit";
type DataSource = "replay" | "live";

type LiveEvent = {
  event_id: string;
  sequence: number;
  timestamp: string;
  session_id: string;
  session_title: string;
  source: string;
  actor: string;
  type: string;
  summary: string;
  detail?: string;
  status: "success" | "failed" | "pending" | "info";
  tool_name?: string;
};

type LiveSnapshot = {
  connected: boolean;
  store: string;
  generated_at: string;
  last_sequence: number;
  sessions: Array<{ id: string; title: string; source: string; active: boolean; last_activity_at: string; event_count: number }>;
  events: LiveEvent[];
  error?: string;
};

const modeLabels: Record<ViewMode, string> = {
  conversation: "对话",
  work: "工作",
  audit: "审计",
};

const hiddenInConversation = new Set(["activity", "file"]);
const BEIJING_TIME_ZONE = "Asia/Shanghai";

function formatBeijingTime(timestamp: string, withSeconds = true) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: BEIJING_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
    hour12: false,
  }).format(new Date(timestamp));
}

function AgentAvatar({ agentId, small = false }: { agentId: string; small?: boolean }) {
  const agent = replayAgents.find((item) => item.id === agentId) ?? replayAgents[1];
  return (
    <div
      className={`grid shrink-0 place-items-center border border-black/10 font-bold text-white ${small ? "h-7 w-7 text-[10px]" : "h-10 w-10 text-sm"}`}
      style={{ backgroundColor: agent.color }}
      aria-label={agent.name}
    >
      {agent.initials}
    </div>
  );
}

function StatusMark({ status }: { status: string }) {
  const style =
    status === "success"
      ? "bg-[#2e785d] text-white"
      : status === "failed"
        ? "bg-[#a72c22] text-white"
        : status === "pending"
          ? "bg-[#b97416] text-white"
          : "bg-[color:var(--color-paper-2)] text-[color:var(--color-ink-soft)]";
  return <span className={`mono px-2 py-1 text-[10px] uppercase tracking-[0.08em] ${style}`}>{status ?? "info"}</span>;
}

function EvidenceButton({ entry, onOpen }: { entry: TimelineEntry; onOpen: (entry: TimelineEntry) => void }) {
  return (
    <button
      onClick={() => onOpen(entry)}
      className="mono mt-3 inline-flex min-h-9 items-center gap-2 border border-[color:var(--color-line)] px-3 text-[11px] text-[color:var(--color-muted)] transition hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
    >
      查看原始事件 ({entry.derivedFromEventIds.length})
      <ChevronRight className="h-3 w-3" />
    </button>
  );
}

function TimelineCard({ entry, mode, onOpen }: { entry: TimelineEntry; mode: ViewMode; onOpen: (entry: TimelineEntry) => void }) {
  const agent = replayAgents.find((item) => item.id === entry.actor) ?? replayAgents[1];
  const isUser = entry.actor === "user:owner";

  if (entry.kind === "activity") {
    return (
      <div className="my-4 border-y border-[color:var(--color-line)] bg-[color:var(--color-paper-2)] px-4 py-3">
        <div className="flex items-center gap-3 text-sm">
          <Activity className="h-4 w-4 text-[color:var(--color-flame)]" />
          <span className="font-semibold">{agent.name}</span>
          <span className="text-[color:var(--color-ink-soft)]">{entry.text}</span>
          <span className="mono ml-auto text-[10px] text-[color:var(--color-muted)]">{entry.at}</span>
        </div>
        <p className="mt-2 pl-7 text-xs text-[color:var(--color-muted)]">{entry.detail}</p>
        {mode !== "conversation" && <EvidenceButton entry={entry} onOpen={onOpen} />}
      </div>
    );
  }

  if (["command", "file", "evidence", "approval"].includes(entry.kind)) {
    const Icon = entry.kind === "command" ? TerminalSquare : entry.kind === "file" ? FileDiff : entry.kind === "approval" ? ShieldCheck : Check;
    return (
      <div className={`my-4 border ${entry.status === "failed" ? "border-[#a72c22]" : entry.kind === "approval" ? "border-[#b97416]" : "border-[color:var(--color-line-strong)]"} bg-[color:var(--color-paper)]`}>
        <div className="flex items-center gap-3 border-b border-[color:var(--color-line)] px-4 py-3">
          <Icon className="h-4 w-4" />
          <span className="text-sm font-bold">{entry.text}</span>
          <span className="mono ml-auto text-[10px] text-[color:var(--color-muted)]">{entry.at}</span>
        </div>
        <div className="px-4 py-3">
          <p className="mono text-xs leading-relaxed text-[color:var(--color-ink-soft)]">{entry.detail}</p>
          <div className="mt-3 flex items-center gap-2">
            {entry.status && <StatusMark status={entry.status} />}
            {entry.kind === "approval" && (
              <>
                <button className="min-h-9 border border-[#2e785d] bg-[#2e785d] px-3 text-xs font-bold text-white">批准</button>
                <button className="min-h-9 border border-[#a72c22] px-3 text-xs font-bold text-[#a72c22]">拒绝</button>
              </>
            )}
          </div>
          <EvidenceButton entry={entry} onOpen={onOpen} />
        </div>
      </div>
    );
  }

  return (
    <div className={`my-5 flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <AgentAvatar agentId={entry.actor} />
      <div className={`min-w-0 max-w-[84%] ${isUser ? "text-right" : ""}`}>
        <div className={`mb-1 flex items-baseline gap-2 ${isUser ? "justify-end" : ""}`}>
          <span className="text-sm font-bold">{agent.name}</span>
          <span className="text-xs text-[color:var(--color-muted)]">{agent.role}</span>
          <span className="mono text-[10px] text-[color:var(--color-muted)]">{entry.at}</span>
        </div>
        <div className={`border px-4 py-3 text-left ${isUser ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]" : entry.kind === "delegation" ? "border-[color:var(--color-flame)] bg-[color:var(--color-paper)]" : "border-[color:var(--color-line)] bg-[color:var(--color-paper)]"}`}>
          {entry.label && <div className={`mono mb-2 text-[10px] uppercase tracking-[0.12em] ${isUser ? "text-[color:var(--color-paper)]/60" : "text-[color:var(--color-flame)]"}`}>{entry.label}</div>}
          <p className="text-sm leading-6">{entry.text}</p>
          {entry.detail && <p className={`mono mt-3 border-t pt-3 text-xs leading-5 ${isUser ? "border-white/20 text-white/70" : "border-[color:var(--color-line)] text-[color:var(--color-muted)]"}`}>{entry.detail}</p>}
          {!isUser && mode !== "conversation" && <EvidenceButton entry={entry} onOpen={onOpen} />}
        </div>
      </div>
    </div>
  );
}

function AgentList() {
  return (
    <aside className="border-r border-[color:var(--color-line)] bg-[color:var(--color-paper-2)]">
      <div className="border-b border-[color:var(--color-line)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">ROOMS / AGENTS</p>
            <h2 className="mt-1 text-lg font-bold">协作现场</h2>
          </div>
          <span className="mono bg-[color:var(--color-ink)] px-2 py-1 text-[10px] text-[color:var(--color-paper)]">LIVE REPLAY</span>
        </div>
        <div className="mt-4 flex h-10 items-center gap-2 border border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-3">
          <Search className="h-4 w-4 text-[color:var(--color-muted)]" />
          <span className="text-xs text-[color:var(--color-muted)]">搜索房间或 Agent</span>
        </div>
      </div>

      <div className="border-b border-[color:var(--color-line)] p-3">
        <button className="w-full border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] p-3 text-left">
          <div className="flex items-start gap-3">
            <MessageSquareText className="mt-0.5 h-4 w-4 text-[color:var(--color-flame)]" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">发布腾讯 AI 速递</span>
                <span className="h-2 w-2 bg-[#2e785d]" aria-label="已完成" />
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-[color:var(--color-muted)]">本地网站已经更新，未公开发布</p>
              <p className="mono mt-2 text-[10px] text-[color:var(--color-muted)]">{replayAgents.length} MEMBERS · 21 EVENTS</p>
            </div>
          </div>
        </button>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="eyebrow">参与者</p>
          <span className="mono text-[10px] text-[color:var(--color-muted)]">{replayAgents.length}</span>
        </div>
        <div className="space-y-1">
          {replayAgents.map((agent) => (
            <button key={agent.id} className="flex w-full items-center gap-3 border border-transparent p-2 text-left transition hover:border-[color:var(--color-line)] hover:bg-[color:var(--color-paper)]">
              <AgentAvatar agentId={agent.id} small />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{agent.name}</span>
                  <span className={`h-1.5 w-1.5 ${agent.status === "working" ? "bg-[#b97416]" : agent.status === "done" ? "bg-[#2e785d]" : "bg-[color:var(--color-muted)]"}`} />
                </div>
                <p className="truncate text-[11px] text-[color:var(--color-muted)]">{agent.currentTask ?? agent.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function TaskInspector() {
  const [tasksOpen, setTasksOpen] = useState(true);
  return (
    <aside className="border-l border-[color:var(--color-line)] bg-[color:var(--color-paper-2)]">
      <div className="border-b border-[color:var(--color-line)] p-4">
        <p className="eyebrow">TASK INSPECTOR</p>
        <h2 className="mt-1 text-lg font-bold">更新腾讯 AI 速递</h2>
        <div className="mt-3 flex items-center gap-2">
          <span className="mono bg-[#2e785d] px-2 py-1 text-[10px] text-white">已完成</span>
          <span className="mono text-[10px] text-[color:var(--color-muted)]">08:13 — 08:18</span>
        </div>
      </div>

      <div className="border-b border-[color:var(--color-line)] p-4">
        <button onClick={() => setTasksOpen(!tasksOpen)} className="flex w-full items-center justify-between text-left">
          <span className="eyebrow">任务树</span>
          {tasksOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {tasksOpen && (
          <div className="mt-4 space-y-3">
            {replayTasks.map((task) => (
              <div key={task.id} className="flex gap-2" style={{ paddingLeft: task.depth * 14 }}>
                <GitBranch className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--color-muted)]" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">{task.title}</span>
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#2e785d]" />
                  </div>
                  <p className="mt-1 text-[10px] text-[color:var(--color-muted)]">{task.assignee} · {task.status}</p>
                  <div className="mt-1 h-0.5 bg-[color:var(--color-line)]"><div className="h-full bg-[#2e785d]" style={{ width: `${task.progress}%` }} /></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-b border-[color:var(--color-line)] p-4">
        <p className="eyebrow mb-4">验收标准</p>
        <div className="space-y-3">
          {acceptanceCriteria.map((criterion) => (
            <div key={criterion.id} className="grid grid-cols-[auto_1fr] gap-2">
              <span className="grid h-5 w-5 place-items-center bg-[#2e785d] text-white"><Check className="h-3 w-3" /></span>
              <div>
                <p className="text-xs font-semibold">{criterion.label}</p>
                <p className="mt-1 text-[10px] text-[color:var(--color-muted)]">{criterion.evidence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-[color:var(--color-line)] p-4">
        <p className="eyebrow mb-3">证据与产物</p>
        {["来源清单 · JSON", "代码变更 · DIFF", "测试日志 · 5 PASSED", "构建日志 · EXIT 0"].map((item) => (
          <button key={item} className="flex min-h-10 w-full items-center gap-2 border-t border-[color:var(--color-line)] text-left text-xs first:border-t-0">
            <FileDiff className="h-3.5 w-3.5 text-[color:var(--color-muted)]" />
            <span>{item}</span>
            <ChevronRight className="ml-auto h-3 w-3" />
          </button>
        ))}
      </div>

      <div className="p-4">
        <p className="eyebrow mb-3">人工控制</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="min-h-10 border border-[color:var(--color-line-strong)] px-2 text-xs font-semibold hover:border-[color:var(--color-ink)]">追加指导</button>
          <button className="min-h-10 border border-[color:var(--color-line-strong)] px-2 text-xs font-semibold hover:border-[color:var(--color-ink)]">要求复核</button>
          <button className="col-span-2 flex min-h-10 items-center justify-center gap-2 border border-[#a72c22] px-2 text-xs font-semibold text-[#a72c22]"><CirclePause className="h-3.5 w-3.5" /> 暂停任务</button>
        </div>
      </div>
    </aside>
  );
}

export default function AgentRoomClient() {
  const [mode, setMode] = useState<ViewMode>("conversation");
  const [dataSource, setDataSource] = useState<DataSource>("replay");
  const [liveSnapshot, setLiveSnapshot] = useState<LiveSnapshot | null>(null);
  const [liveStatus, setLiveStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (dataSource !== "live") return;
    const source = new EventSource("/api/agent-room/events?stream=1&since=0&limit=300");
    const onSnapshot = (message: MessageEvent<string>) => {
      const snapshot = JSON.parse(message.data) as LiveSnapshot;
      setLiveSnapshot((current) => {
        if (!current || snapshot.events.length === 0) return snapshot.events.length ? snapshot : current ?? snapshot;
        const merged = new Map(current.events.map((event) => [event.event_id, event]));
        snapshot.events.forEach((event) => merged.set(event.event_id, event));
        return { ...snapshot, events: [...merged.values()].sort((a, b) => a.sequence - b.sequence).slice(-500) };
      });
      setLiveStatus(snapshot.connected ? "connected" : "error");
    };
    source.addEventListener("snapshot", onSnapshot as EventListener);
    source.onerror = () => setLiveStatus("error");
    return () => source.close();
  }, [dataSource]);

  const liveTimeline = useMemo<TimelineEntry[]>(() => (liveSnapshot?.events ?? []).map((event) => ({
    id: event.event_id,
    kind: event.type === "tool.completed" ? "command" : event.type === "tool.started" ? "activity" : "message",
    actor: event.actor === "user:owner" ? "user:owner" : "hermes:default",
    at: formatBeijingTime(event.timestamp),
    text: event.summary,
    detail: event.detail ?? `${event.session_title} · ${event.source}`,
    label: event.type,
    status: event.status,
    derivedFromEventIds: [event.event_id],
  })), [liveSnapshot]);

  const activeTimeline = dataSource === "live" ? liveTimeline : timelineEntries;

  const visibleEntries = useMemo(() => {
    if (mode === "audit") return [];
    return activeTimeline.filter((entry) => {
      if (mode === "conversation" && hiddenInConversation.has(entry.kind)) return false;
      if (filter === "all") return true;
      if (filter === "failures") return entry.status === "failed";
      if (filter === "evidence") return ["evidence", "command", "file"].includes(entry.kind);
      return true;
    });
  }, [mode, filter, activeTimeline]);

  const liveAuditEvents = liveSnapshot?.events ?? [];
  const auditEvents = dataSource === "live"
    ? liveAuditEvents.map((event) => ({ id: event.event_id, sequence: event.sequence, type: event.type, actor: event.actor, at: formatBeijingTime(event.timestamp), summary: event.summary, detail: event.detail, status: event.status, taskId: event.session_id }))
    : replayEvents;

  return (
    <div className="agent-room-shell">
      <header className="agent-room-topbar">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid h-9 w-9 place-items-center bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"><Bot className="h-5 w-5" /></div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-bold">Agent Room</h1>
              <span className="mono hidden text-[10px] text-[color:var(--color-muted)] sm:inline">HAIP 2.0 REPLAY</span>
            </div>
            <p className="truncate text-xs text-[color:var(--color-muted)]">可观察、可干预、可审计的多 Agent 协作</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex items-center border border-[color:var(--color-line-strong)]">
            <button onClick={() => { setDataSource("live"); setLiveStatus("connecting"); }} className={`min-h-9 px-3 text-xs font-semibold ${dataSource === "live" ? "bg-[#2e785d] text-white" : ""}`}>实时事件</button>
            <button onClick={() => { setDataSource("replay"); setLiveStatus("idle"); }} className={`min-h-9 px-3 text-xs font-semibold ${dataSource === "replay" ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]" : ""}`}>静态回放</button>
          </div>
          <span className={`mono px-2 py-1 text-[9px] ${liveStatus === "connected" ? "bg-[#2e785d] text-white" : liveStatus === "error" ? "bg-[#a72c22] text-white" : "bg-[color:var(--color-paper-2)]"}`}>
            {dataSource === "replay" ? "REPLAY" : liveStatus === "connected" ? "实时已连接" : liveStatus === "error" ? "连接异常" : "正在连接"}
          </span>
          <div className="flex items-center border border-[color:var(--color-line-strong)]">
            {(Object.keys(modeLabels) as ViewMode[]).map((item) => (
              <button key={item} onClick={() => setMode(item)} className={`min-h-9 px-3 text-xs font-semibold transition ${mode === item ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]" : "hover:bg-[color:var(--color-paper-2)]"}`}>{modeLabels[item]}</button>
            ))}
          </div>
        </div>
      </header>

      <main className="agent-room-grid">
        <AgentList />
        <section className="min-w-0 bg-[color:var(--color-paper)]">
          <div className="flex min-h-14 items-center gap-2 border-b border-[color:var(--color-line)] px-4">
            <span className="text-sm font-bold">发布腾讯 AI 速递</span>
            <span className="mono bg-[#2e785d] px-2 py-1 text-[9px] text-white">已完成</span>
            <span className="mono ml-auto hidden text-[10px] text-[color:var(--color-muted)] sm:block">{dataSource === "live" ? `${liveSnapshot?.events.length ?? 0} EVENTS · ${liveSnapshot?.sessions.length ?? 0} SESSIONS` : `21 EVENTS · 3 TASKS · ${replayAgents.length} AGENTS`}</span>
          </div>

          {mode === "audit" ? (
            <div className="agent-room-scroll p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="eyebrow">RAW EVENT STREAM</p>
                  <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">按持久化 sequence 排序，点击事件查看完整 payload。</p>
                </div>
                <span className="mono text-[10px] text-[color:var(--color-muted)]">APPEND ONLY</span>
              </div>
              <div className="border-t border-[color:var(--color-line-strong)]">
                {auditEvents.map((event) => (
                  <button key={event.id} onClick={() => setSelectedEntry({ id: event.id, kind: "activity", actor: event.actor, at: event.at, text: event.summary, detail: event.detail, status: event.status, derivedFromEventIds: [event.id] })} className="grid w-full grid-cols-[3rem_7rem_1fr_auto] gap-3 border-b border-[color:var(--color-line)] py-3 text-left hover:bg-[color:var(--color-paper-2)]">
                    <span className="mono text-[10px] text-[color:var(--color-muted)]">#{String(event.sequence).padStart(3, "0")}</span>
                    <span className="mono truncate text-[10px]">{event.type}</span>
                    <span className="text-xs">{event.summary}</span>
                    <span className="mono text-[10px] text-[color:var(--color-muted)]">{event.at}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex min-h-11 items-center gap-2 border-b border-[color:var(--color-line)] px-4">
                {["all", "failures", "evidence"].map((item) => (
                  <button key={item} onClick={() => setFilter(item)} className={`mono px-2 py-1 text-[10px] ${filter === item ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]" : "text-[color:var(--color-muted)]"}`}>
                    {item === "all" ? "全部" : item === "failures" ? "失败" : "证据"}
                  </button>
                ))}
                <span className="ml-auto flex items-center gap-1 text-[10px] text-[color:var(--color-muted)]"><Clock3 className="h-3 w-3" /> 5 分 46 秒</span>
              </div>
              <div className="agent-room-scroll px-4 py-3 sm:px-6">
                <div className="mx-auto max-w-3xl">
                  <div className="my-4 flex items-center gap-3"><span className="h-px flex-1 bg-[color:var(--color-line)]" /><span className="mono text-[10px] text-[color:var(--color-muted)]">{dataSource === "live" ? `Hermes Event Store · 北京时间 · ${liveSnapshot?.events.length ?? 0} 条实时事件` : "2026-09-22 · 实际任务回放"}</span><span className="h-px flex-1 bg-[color:var(--color-line)]" /></div>
                  {visibleEntries.map((entry) => <TimelineCard key={entry.id} entry={entry} mode={mode} onOpen={setSelectedEntry} />)}
                </div>
              </div>
              <div className="border-t border-[color:var(--color-line)] p-3">
                <div className="mx-auto flex max-w-3xl items-center gap-2 border border-[color:var(--color-line-strong)] bg-[color:var(--color-paper)] p-2">
                  <span className="px-2 text-sm text-[color:var(--color-muted)]">@</span>
                  <input aria-label="给 Agent 追加指导" placeholder="给运行中的 Agent 追加指导…" className="min-h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--color-muted)]" />
                  <button className="grid h-9 w-9 place-items-center bg-[color:var(--color-ink)] text-[color:var(--color-paper)]" aria-label="发送"><Send className="h-4 w-4" /></button>
                </div>
              </div>
            </>
          )}
        </section>
        <TaskInspector />
      </main>

      {selectedEntry && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/35" onClick={() => setSelectedEntry(null)}>
          <div className="h-full w-full max-w-xl overflow-y-auto bg-[#11100e] text-[#eee9df] shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#11100e] p-4">
              <div>
                <p className="mono text-[10px] uppercase tracking-[0.18em] text-white/45">RAW EVENTS</p>
                <h3 className="mt-1 font-bold">查看原始事件</h3>
              </div>
              <button onClick={() => setSelectedEntry(null)} className="grid h-10 w-10 place-items-center border border-white/15" aria-label="关闭"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-4">
              <div className="border border-white/10 p-4">
                <p className="text-sm leading-6">{selectedEntry.text}</p>
                {selectedEntry.detail && <p className="mono mt-3 text-xs text-white/55">{selectedEntry.detail}</p>}
              </div>
              <div className="mt-4 space-y-3">
                {selectedEntry.derivedFromEventIds.map((id) => {
                  const event = replayEvents.find((item) => item.id === id);
                  return (
                    <div key={id} className="border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center gap-2"><Code2 className="h-4 w-4 text-[#ff5b2a]" /><span className="mono text-xs">{id}</span><span className="mono ml-auto text-[10px] text-white/45">{event?.at}</span></div>
                      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-[11px] leading-5 text-white/70">{JSON.stringify(event ?? { event_id: id, note: "事件已归档" }, null, 2)}</pre>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
