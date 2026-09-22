import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const pagePath = new URL("../src/app/agent-room/page.tsx", import.meta.url);
const dataPath = new URL("../src/data/agent-room-replay.ts", import.meta.url);

test("Agent Room route implements all three evidence views", async () => {
  const page = await readFile(pagePath, "utf8");
  for (const label of ["对话", "工作", "审计"]) {
    assert.match(page, new RegExp(label));
  }
  assert.match(page, /AgentRoomClient/);
});

test("replay fixture preserves task, event, and evidence concepts", async () => {
  const source = await readFile(dataPath, "utf8");
  for (const token of [
    "task.assigned",
    "task.acknowledged",
    "tool.completed",
    "evidence.recorded",
    "task.completed",
    "derivedFromEventIds",
  ]) {
    assert.match(source, new RegExp(token.replace(".", "\\.")));
  }
});

test("Agent Room UI exposes human intervention controls", async () => {
  const client = await readFile(new URL("../src/app/agent-room/AgentRoomClient.tsx", import.meta.url), "utf8");
  for (const label of ["追加指导", "暂停任务", "要求复核", "查看原始事件"]) {
    assert.match(client, new RegExp(label));
  }
});

test("live event API reads the canonical Hermes event store safely", async () => {
  const route = await readFile(new URL("../src/app/api/agent-room/events/route.ts", import.meta.url), "utf8");
  assert.match(route, /readHermesEvents/);
  assert.match(route, /since/);
  assert.match(route, /no-store/);
  assert.doesNotMatch(route, /reasoning_content/);
});

test("Agent Room can switch from replay to live Hermes events", async () => {
  const client = await readFile(new URL("../src/app/agent-room/AgentRoomClient.tsx", import.meta.url), "utf8");
  for (const token of ["实时事件", "/api/agent-room/events", "EventSource", "实时已连接", "静态回放"]) {
    assert.match(client, new RegExp(token));
  }
});

test("live event timestamps are rendered explicitly in China Standard Time", async () => {
  const client = await readFile(new URL("../src/app/agent-room/AgentRoomClient.tsx", import.meta.url), "utf8");
  assert.match(client, /Asia\/Shanghai/);
  assert.match(client, /北京时间/);
});

test("Agent Room participant roster includes the requested external agents", async () => {
  const source = await readFile(dataPath, "utf8");
  for (const agent of ["Claude Code", "Pi", "OpenCode", "DSH"]) {
    assert.match(source, new RegExp(`name: \\"${agent}\\"`));
  }
});

test("Hermes desktop agent inbox popup delays relay processing for five seconds", async () => {
  const relay = await readFile(new URL("../../../hermes/apps/desktop/src/plugins/hermes-bots/relay.ts", import.meta.url), "utf8");
  const plugin = await readFile(new URL("../../../hermes/apps/desktop/src/plugins/hermes-bots/plugin.tsx", import.meta.url), "utf8");
  for (const token of ["AGENT_INBOX_COUNTDOWN_MS", "5000", "agent-inbox-countdown"]) {
    assert.match(relay + plugin, new RegExp(token));
  }
  assert.match(relay, /awaitAgentInboxCountdown/);
  assert.match(plugin, /收到其他 Agent 的消息/);
  assert.match(plugin, /立即处理/);
  assert.match(plugin, /后台处理/);
});
