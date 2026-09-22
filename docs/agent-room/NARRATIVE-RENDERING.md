# HAIP 2.0 narrative rendering rules

Status: Draft 0.1  
Companions: `HAIP-2.0-PROTOCOL.md`, `EVENTS-AND-TASK-STATE.md`

## 1. Goal

The narrative renderer turns persisted machine events into a readable, human-style collaboration timeline. It makes agents understandable without pretending they are human, inventing activity, or exposing private chain-of-thought.

The default UI is a conversation view. Every rendered entry can be expanded to its source events, tool details, artifacts, and evidence.

## 2. Non-negotiable rules

1. Facts come from Events. Narrative text is never authoritative.
2. Every narrative entry contains `derived_from_event_ids`.
3. The renderer must not claim an action started, succeeded, failed, or completed without the corresponding Event.
4. The renderer must not infer private reasoning.
5. Agent style may change wording, not facts, certainty, status, responsibility, or evidence.
6. Completion language is forbidden before `task.completed`.
7. Long tool output is summarized and linked, not pasted into chat.
8. Security redaction happens before rendering.
9. Deterministic templates are preferred over LLM generation.
10. If facts are insufficient, render uncertainty explicitly.

## 3. Three display densities

### 3.1 Conversation mode (default)

Shows:

- user and agent outward messages;
- delegation and acknowledgement;
- meaningful stage progress;
- blockers and questions;
- approvals;
- verification outcomes;
- final delivery.

Hides or groups routine reads, searches, heartbeats, token deltas, and repeated progress.

### 3.2 Work mode

Adds:

- tool invocation cards;
- commands and working directories;
- file changes and diffs;
- test/build details;
- child task activity;
- retries and budgets.

### 3.3 Audit mode

Shows all persisted Events in sequence order, including normalized JSON, event IDs, causation, correlation, redaction metadata, connector source, and artifact hashes.

All three modes are projections of one Event Store.

## 4. Narrative entry structure

```json
{
  "entry_id": "nar_01...",
  "room_id": "room_01...",
  "task_id": "task_01...",
  "speaker_id": "codex:wsl-main",
  "kind": "verification_failure",
  "sequence_start": 52,
  "sequence_end": 55,
  "text": "测试没有全过：4 项通过、1 项失败。失败点在文章来源唯一性校验，我继续修这个问题。",
  "tone": "concise",
  "confidence": "verified",
  "derived_from_event_ids": ["evt_52", "evt_53", "evt_54", "evt_55"],
  "attachments": ["artifact://task_01/test-log"],
  "actions": ["open_evidence", "open_task"]
}
```

`confidence` values:

- `verified`: directly supported by successful/failed machine evidence;
- `reported`: agent outward report exists but verification is incomplete;
- `inferred`: deterministic projection from state; UI labels it as inferred;
- `unknown`: insufficient facts.

The default chat SHOULD avoid inferred entries unless they help explain system state.

## 5. Speaker identity and voice

Each Agent has a restrained voice profile:

```json
{
  "agent_id": "codex:wsl-main",
  "voice": {
    "register": "technical",
    "verbosity": "short",
    "first_person": true,
    "preferred_terms": ["测试", "构建", "改动"],
    "avoid": ["情绪表演", "营销语言", "无证据保证"]
  }
}
```

Voice profiles MAY alter sentence rhythm and terminology. They MUST NOT:

- add emotion not sent by the Agent;
- claim intent or thought;
- hide failure;
- soften approval risk;
- convert `reported` to `verified`;
- identify a different speaker.

Recommended role posture:

- Marvis: concise material handoff and user-context framing;
- Hermes: coordination, task contract, validation, and synthesis;
- Codex: implementation, command results, tests, and diffs;
- Claude Code: design/review findings and code reasoning summaries;
- OpenCode: implementation and cross-checking;
- Pi: session control and lightweight orchestration.

These are defaults, not fictional personalities.

## 6. Deterministic templates

### 6.1 Assignment

Source: `task.assigned` + accompanying `message.sent`.

Template:

`{assigner_name}: "@{assignee_name}，{objective}。完成标准：{criteria_summary}。{side_effect_boundary}"`

Example:

`Hermes: “@Codex，请更新文章数据并验证网站。完成标准是测试和构建都通过；不要推送远端。”`

### 6.2 Accepted acknowledgement

Source: `task.acknowledged decision=accepted`.

Template:

`{assignee_name}: "接手。{understood_plan}。完成后我会返回{expected_evidence_summary}。"`

Do not render “接手” until acknowledgement is persisted.

### 6.3 Rejection

`{assignee_name}: "我不能接这个任务：{reason}。{suggested_reassignment_or_fix}"`

### 6.4 Clarification

`{agent_name}: "我需要确认一件事：{question}"`

Questions should be bounded and directly tied to the blocked criterion.

### 6.5 Tool activity group

Source: multiple low-value tool events in a bounded window.

`{agent_name} 正在{stage} · 读取 {read_count} 个文件 · 搜索 {search_count} 处引用 · 运行 {command_count} 个命令`

This is a system activity line, not a speech bubble, unless the Agent sent a progress message.

### 6.6 Command succeeded

`{agent_name}: "我刚跑完 `{command}`，结果通过。{verified_summary}"`

Only use “通过” when status succeeded and expected exit code matches.

### 6.7 Command failed

`{agent_name}: "`{command}` 没有通过。{failure_summary}。{next_action_if_reported}"`

Do not invent a next action. Include it only from a message or progress event.

### 6.8 File changes

System card:

`{agent_name} 修改了 {modified_count} 个文件，新增 {added_count} 个文件，删除 {deleted_count} 个文件。`

Attach diff Artifact. Avoid describing semantic effects unless validated by later Evidence or an outward report labeled `reported`.

### 6.9 Blocked

`{agent_name}: "我卡在这里：{block_reason}。需要{required_input_or_change}才能继续。"`

### 6.10 Approval

System approval card:

`{agent_name} 请求执行：{action}  
目标：{target}  
影响：{risk_summary}  
范围：{scope}  
[批准] [拒绝] [修改范围]`

Do not make approval cards conversationally cute. Risk clarity wins.

### 6.11 Result submitted, not yet accepted

`{agent_name}: "我已经提交结果：{summary}。现在等待验收。"`

UI label: `待验收`, not `已完成`.

### 6.12 Completed

Source: `task.completed` plus passing Evidence.

`{agent_name}: "做完了。{outcome_summary}。{verification_summary}{remaining_risk_summary}"`

Evidence cards follow immediately.

### 6.13 Failed

`{agent_name}: "这次没有完成：{cause}。{what_was_preserved}。{recommended_recovery}"`

## 7. Event aggregation

### 7.1 Window

Default grouping window: 8 seconds, extendable while one tool invocation remains active. Never group across:

- different Tasks;
- different speakers;
- an approval boundary;
- an error or failed verification;
- user intervention;
- assignment/acknowledgement;
- terminal task state.

### 7.2 Suppression

Conversation mode suppresses:

- token deltas;
- routine heartbeats;
- repeated identical searches;
- tool progress below configured significance;
- environment warmup;
- internal retries that recover without user impact.

Suppressed events remain visible in Audit mode.

### 7.3 Promotion

Always promote to visible entry:

- responsibility transfer;
- question or approval;
- test/build failure;
- destructive or public side effect;
- file write;
- credential or permission failure;
- retry after failure;
- result and review;
- terminal state;
- user steer/cancel/reassign.

## 8. LLM-assisted rendering

LLM rendering is optional and limited to important summaries:

- stage summaries;
- blocker explanations;
- result condensation;
- multi-Agent handoff summaries.

The model receives a closed fact bundle:

```json
{
  "allowed_facts": [...],
  "forbidden_claims": ["unobserved actions", "private reasoning", "completion without event"],
  "speaker_voice": {...},
  "max_characters": 320,
  "required_event_ids": [...]
}
```

The output schema requires:

```json
{
  "text": "...",
  "claims": [
    {"text": "测试 5/5 通过", "supported_by": ["evt_test"]}
  ],
  "derived_from_event_ids": ["evt_test"]
}
```

A validator rejects output when:

- any claim lacks source IDs;
- an ID is outside the supplied bundle;
- completion language appears without `task.completed`;
- numeric values differ from source events;
- speaker/assignee is changed;
- approval is implied rather than recorded.

On rejection, use deterministic templates.

## 9. No chain-of-thought policy

Never display hidden reasoning, scratchpad text, model deliberation, or fabricated internal monologue.

Allowed:

- “I chose X because criterion Y requires it,” if sent as an outward decision summary;
- tool inputs and outputs after redaction;
- a concise plan;
- stated uncertainty;
- review rationale linked to evidence.

Not allowed:

- raw private reasoning tokens;
- “the Agent was thinking...” narration;
- reconstructed motives;
- hidden system prompts or secrets.

## 10. Human-readable status language

| Machine state | UI label | Allowed speech |
|---|---|---|
| proposed | 待安排 | “我准备把这项工作交给…” |
| assigned | 等待接手 | no claim of acceptance |
| acknowledged | 已接手 | “接手” |
| running | 处理中 | “正在处理” |
| waiting_input | 等待信息 | “需要确认…” |
| waiting_approval | 等待批准 | “需要你批准…” |
| blocked | 被阻塞 | “卡在…” |
| review | 待验收 | “已提交结果，等待验收” |
| completed | 已完成 | “做完了” |
| failed | 失败 | “这次没有完成” |
| cancelling | 正在停止 | “正在停止” |
| cancelled | 已取消 | “已停止，没有继续执行” |

## 11. Evidence presentation

Evidence cards show:

- claim;
- source type;
- command/target;
- exit code/status;
- timestamp;
- freshness;
- “查看原始输出”.

Example:

```text
测试通过
npm test · exit 0 · 5 passed
验证于 08:22:41 · 当前
```

Stale evidence uses a visible warning and does not support completion.

## 12. Errors and uncertainty

Use specific language:

- network unavailable: “页面请求失败，尚未读到内容”;
- permission denied: “当前 Agent 没有写入权限”;
- no result event: “任务仍在运行，尚未返回结果”;
- connector lost: “与 Codex 的连接中断，任务状态未知”;
- reported without proof: “Codex 报告构建通过，但系统还没有收到构建日志”.

Avoid “应该”“大概”“快完成了” unless clearly labeled as an Agent estimate.

## 13. User actions in the timeline

User actions render as first-class entries:

- steer: “你补充要求：只修改本地，不推送远端。”
- approve: “你批准了部署到 staging，有效期 10 分钟。”
- reject: “你拒绝了公开发布。”
- reassign: “你把任务从 Claude Code 转给 Codex。”
- mark incomplete: “你认为结果未达到验收标准：缺少构建验证。”

## 14. Accessibility and readability

- Do not rely on color alone for states.
- Every icon has a text label or accessible name.
- Tool output uses selectable text.
- Timeline supports keyboard expansion.
- Timestamps can switch between relative and absolute.
- Agent avatars never replace written names.
- Dense logs use virtualized rendering but preserve sequence navigation.

## 15. Example rendered exchange

```text
You
把腾讯 AI 速递更新到网站，但不要发布。

Hermes · 协调
我拆成两项：先核对来源，再更新网站并跑验证。

[委派] Hermes → Marvis
核对原文和子链接，返回可引用来源。

Marvis · 材料
接手。我会核对原文标题、日期和文章链接。

[活动] Marvis 正在检查来源 · 访问 11 个链接

Marvis · 材料
来源核对完了。10 个子链接可读取，1 个页面无法访问。我把清单作为附件交回。
[来源清单]

[委派] Hermes → Codex
按来源清单更新网站。完成标准：测试和构建通过，不推送远端。

Codex · 代码
接手。我先跑现有测试，再改数据文件。

[命令失败]
npm test · exit 1 · 1 failed, 4 passed

Codex · 代码
测试没有全过，失败点在文章来源唯一性校验。我先修这个。

[文件变更]
修改 2 个文件 · 查看 diff

[证据]
npm test · exit 0 · 5 passed
npm run build · exit 0

Codex · 代码
我已经提交结果，测试和构建都通过。现在等待验收。

Hermes · 协调
验收通过。本地网站已经更新，没有推送或发布。
```

Every sentence above must map to persisted events.