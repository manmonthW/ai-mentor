export type AgentStatus = "idle" | "working" | "waiting" | "done";
export type TimelineKind =
  | "message"
  | "delegation"
  | "activity"
  | "command"
  | "file"
  | "evidence"
  | "approval"
  | "result";

export interface ReplayAgent {
  id: string;
  name: string;
  role: string;
  runtime: string;
  status: AgentStatus;
  color: string;
  initials: string;
  currentTask?: string;
}

export interface ReplayEvent {
  id: string;
  sequence: number;
  type: string;
  actor: string;
  taskId: string;
  at: string;
  summary: string;
  detail?: string;
  status?: "success" | "failed" | "pending" | "info";
}

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  actor: string;
  at: string;
  text: string;
  label?: string;
  detail?: string;
  status?: "success" | "failed" | "pending" | "info";
  derivedFromEventIds: string[];
}

export const replayAgents: ReplayAgent[] = [
  {
    id: "user:owner",
    name: "你",
    role: "任务发起人",
    runtime: "Human",
    status: "idle",
    color: "#1a1712",
    initials: "你",
  },
  {
    id: "hermes:default",
    name: "Hermes",
    role: "协调与验收",
    runtime: "Hermes Agent",
    status: "working",
    color: "#ff3b00",
    initials: "H",
    currentTask: "验收发布准备",
  },
  {
    id: "marvis:windows",
    name: "Marvis",
    role: "材料与用户上下文",
    runtime: "Windows Agent",
    status: "done",
    color: "#28785f",
    initials: "M",
    currentTask: "来源核对完成",
  },
  {
    id: "codex:wsl-main",
    name: "Codex",
    role: "代码实现与验证",
    runtime: "Codex CLI",
    status: "done",
    color: "#3158a6",
    initials: "C",
    currentTask: "本地更新完成",
  },
  {
    id: "claude-code:local",
    name: "Claude Code",
    role: "代码审查与复杂实现",
    runtime: "Claude Code CLI",
    status: "idle",
    color: "#a45c3f",
    initials: "CC",
  },
  {
    id: "pi:local",
    name: "Pi",
    role: "轻量调度与会话协作",
    runtime: "Pi Agent",
    status: "idle",
    color: "#7557a8",
    initials: "P",
  },
  {
    id: "opencode:local",
    name: "OpenCode",
    role: "代码实现与交叉验证",
    runtime: "OpenCode CLI",
    status: "idle",
    color: "#187d80",
    initials: "O",
  },
  {
    id: "dsh:local",
    name: "DSH",
    role: "专项任务 Agent",
    runtime: "DSH Agent",
    status: "idle",
    color: "#6f6154",
    initials: "D",
  },
];

export const replayEvents: ReplayEvent[] = [
  { id: "evt_001", sequence: 1, type: "message.sent", actor: "user:owner", taskId: "task_main", at: "08:13:05", summary: "用户要求更新腾讯 AI 速递，但不公开发布。" },
  { id: "evt_002", sequence: 2, type: "task.proposed", actor: "hermes:default", taskId: "task_main", at: "08:13:07", summary: "创建主任务：更新网站并完成本地验证。" },
  { id: "evt_003", sequence: 3, type: "task.assigned", actor: "hermes:default", taskId: "task_sources", at: "08:13:09", summary: "来源核对任务分配给 Marvis。" },
  { id: "evt_004", sequence: 4, type: "task.acknowledged", actor: "marvis:windows", taskId: "task_sources", at: "08:13:11", summary: "Marvis 接受任务。" },
  { id: "evt_005", sequence: 5, type: "tool.completed", actor: "marvis:windows", taskId: "task_sources", at: "08:13:39", summary: "读取原文和 10 个子链接。", status: "success" },
  { id: "evt_006", sequence: 6, type: "artifact.created", actor: "marvis:windows", taskId: "task_sources", at: "08:13:45", summary: "创建来源清单。", detail: "sources-20260922.json" },
  { id: "evt_007", sequence: 7, type: "task.completed", actor: "marvis:windows", taskId: "task_sources", at: "08:13:51", summary: "来源核对完成。", status: "success" },
  { id: "evt_008", sequence: 8, type: "task.assigned", actor: "hermes:default", taskId: "task_code", at: "08:13:55", summary: "网站更新任务分配给 Codex。" },
  { id: "evt_009", sequence: 9, type: "task.acknowledged", actor: "codex:wsl-main", taskId: "task_code", at: "08:13:57", summary: "Codex 接受任务。" },
  { id: "evt_010", sequence: 10, type: "tool.completed", actor: "codex:wsl-main", taskId: "task_code", at: "08:15:59", summary: "npm test 失败。", detail: "1 failed, 4 passed · 来源唯一性校验", status: "failed" },
  { id: "evt_011", sequence: 11, type: "evidence.recorded", actor: "codex:wsl-main", taskId: "task_code", at: "08:16:00", summary: "记录失败证据。", status: "failed" },
  { id: "evt_012", sequence: 12, type: "artifact.created", actor: "codex:wsl-main", taskId: "task_code", at: "08:16:34", summary: "修改文章数据和测试夹具。", detail: "2 files changed · +126 / -8" },
  { id: "evt_013", sequence: 13, type: "tool.completed", actor: "codex:wsl-main", taskId: "task_code", at: "08:17:08", summary: "npm test 通过。", detail: "5 passed · exit 0", status: "success" },
  { id: "evt_014", sequence: 14, type: "evidence.recorded", actor: "codex:wsl-main", taskId: "task_code", at: "08:17:09", summary: "测试证据有效。", status: "success" },
  { id: "evt_015", sequence: 15, type: "tool.completed", actor: "codex:wsl-main", taskId: "task_code", at: "08:18:21", summary: "npm run build 通过。", detail: "Next.js production build · exit 0", status: "success" },
  { id: "evt_016", sequence: 16, type: "evidence.recorded", actor: "codex:wsl-main", taskId: "task_code", at: "08:18:22", summary: "构建证据有效。", status: "success" },
  { id: "evt_017", sequence: 17, type: "task.result_submitted", actor: "codex:wsl-main", taskId: "task_code", at: "08:18:25", summary: "Codex 提交本地更新结果。", status: "pending" },
  { id: "evt_018", sequence: 18, type: "task.completed", actor: "hermes:default", taskId: "task_code", at: "08:18:32", summary: "Hermes 验收代码任务。", status: "success" },
  { id: "evt_019", sequence: 19, type: "approval.requested", actor: "hermes:default", taskId: "task_main", at: "08:18:35", summary: "请求是否公开发布。", status: "pending" },
  { id: "evt_020", sequence: 20, type: "approval.resolved", actor: "user:owner", taskId: "task_main", at: "08:18:48", summary: "用户拒绝公开发布。", detail: "保留本地结果", status: "info" },
  { id: "evt_021", sequence: 21, type: "task.completed", actor: "hermes:default", taskId: "task_main", at: "08:18:51", summary: "主任务完成：本地已更新，未公开发布。", status: "success" },
];

export const timelineEntries: TimelineEntry[] = [
  { id: "nar_001", kind: "message", actor: "user:owner", at: "08:13", text: "把腾讯研究院 AI 速递更新到网站，但先不要公开发布。", derivedFromEventIds: ["evt_001"] },
  { id: "nar_002", kind: "message", actor: "hermes:default", at: "08:13", text: "我拆成两项：Marvis 核对原文和子链接，Codex 更新网站并跑测试。我负责最后验收。", label: "任务拆解", derivedFromEventIds: ["evt_002"] },
  { id: "nar_003", kind: "delegation", actor: "hermes:default", at: "08:13", text: "@Marvis，请核对原文标题、日期和所有子链接，返回可引用的来源清单。", label: "Hermes → Marvis", detail: "验收：来源可访问、标题日期明确、清单可复用", derivedFromEventIds: ["evt_003"] },
  { id: "nar_004", kind: "message", actor: "marvis:windows", at: "08:13", text: "接手。我会核对原文和子链接，完成后交回来源清单。", label: "已接手", derivedFromEventIds: ["evt_004"] },
  { id: "nar_005", kind: "activity", actor: "marvis:windows", at: "08:13", text: "正在核对来源", detail: "读取 1 篇原文 · 检查 10 个子链接 · 生成 1 个清单", status: "info", derivedFromEventIds: ["evt_005", "evt_006"] },
  { id: "nar_006", kind: "result", actor: "marvis:windows", at: "08:13", text: "来源核对完了。10 个子链接可以读取，我把清单作为附件交回。", label: "材料任务完成", detail: "sources-20260922.json", status: "success", derivedFromEventIds: ["evt_006", "evt_007"] },
  { id: "nar_007", kind: "delegation", actor: "hermes:default", at: "08:13", text: "@Codex，请按来源清单更新网站。完成标准：npm test 和 npm run build 都通过；不要推送远端。", label: "Hermes → Codex", detail: "工作区：ai-mentor · 预期产物：diff、测试日志、构建日志", derivedFromEventIds: ["evt_008"] },
  { id: "nar_008", kind: "message", actor: "codex:wsl-main", at: "08:13", text: "接手。我先跑现有测试，再修改文章数据；完成后返回 diff 和验证结果。", label: "已接手", derivedFromEventIds: ["evt_009"] },
  { id: "nar_009", kind: "command", actor: "codex:wsl-main", at: "08:15", text: "npm test 没有通过。", detail: "exit 1 · 1 failed, 4 passed · 来源唯一性校验", status: "failed", derivedFromEventIds: ["evt_010", "evt_011"] },
  { id: "nar_010", kind: "message", actor: "codex:wsl-main", at: "08:16", text: "失败点在文章来源唯一性校验。我先修这个，不把任务标成完成。", derivedFromEventIds: ["evt_010", "evt_011"] },
  { id: "nar_011", kind: "file", actor: "codex:wsl-main", at: "08:16", text: "修改了文章数据和测试夹具。", detail: "2 files changed · +126 / -8 · 查看 diff", status: "info", derivedFromEventIds: ["evt_012"] },
  { id: "nar_012", kind: "evidence", actor: "codex:wsl-main", at: "08:17", text: "测试通过", detail: "npm test · exit 0 · 5 passed", status: "success", derivedFromEventIds: ["evt_013", "evt_014"] },
  { id: "nar_013", kind: "evidence", actor: "codex:wsl-main", at: "08:18", text: "生产构建通过", detail: "npm run build · exit 0 · Next.js build completed", status: "success", derivedFromEventIds: ["evt_015", "evt_016"] },
  { id: "nar_014", kind: "result", actor: "codex:wsl-main", at: "08:18", text: "我已经提交结果。网站在本地更新完成，测试和构建都通过，现在等待验收。", label: "待验收", status: "pending", derivedFromEventIds: ["evt_017"] },
  { id: "nar_015", kind: "message", actor: "hermes:default", at: "08:18", text: "代码任务验收通过。数据、测试和构建证据都齐了。", label: "验收通过", status: "success", derivedFromEventIds: ["evt_018"] },
  { id: "nar_016", kind: "approval", actor: "hermes:default", at: "08:18", text: "是否把这次改动推送并公开发布？", label: "需要你的决定", detail: "目标：生产网站 · 影响：公开可见、触发部署", status: "pending", derivedFromEventIds: ["evt_019"] },
  { id: "nar_017", kind: "message", actor: "user:owner", at: "08:18", text: "先不发布，保留本地结果。", derivedFromEventIds: ["evt_020"] },
  { id: "nar_018", kind: "result", actor: "hermes:default", at: "08:18", text: "完成。本地网站已经更新，测试和构建均通过；没有推送，也没有公开发布。", label: "主任务完成", status: "success", derivedFromEventIds: ["evt_021"] },
];

export const replayTasks = [
  { id: "task_main", title: "更新腾讯 AI 速递", assignee: "Hermes", status: "已完成", progress: 100, depth: 0 },
  { id: "task_sources", title: "核对原文与子链接", assignee: "Marvis", status: "已完成", progress: 100, depth: 1 },
  { id: "task_code", title: "更新网站并验证", assignee: "Codex", status: "已完成", progress: 100, depth: 1 },
];

export const acceptanceCriteria = [
  { id: "sources", label: "来源清单完整", status: "passing", evidence: "10 个子链接已读取" },
  { id: "tests", label: "项目测试通过", status: "passing", evidence: "npm test · 5 passed" },
  { id: "build", label: "生产构建通过", status: "passing", evidence: "npm run build · exit 0" },
  { id: "publish", label: "不公开发布", status: "passing", evidence: "用户已拒绝发布" },
];
