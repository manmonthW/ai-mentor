import type { Metadata } from "next";
import AgentRoomClient from "./AgentRoomClient";

export const metadata: Metadata = {
  title: "Agent Room · 多 Agent 协作回放",
  description: "把 Agent 间的任务委派、执行、证据和验收转换为可追溯的人类对话。",
  robots: { index: false, follow: false },
};

export default function AgentRoomPage() {
  return (
    <>
      <span className="sr-only">对话 工作 审计</span>
      <AgentRoomClient />
    </>
  );
}
