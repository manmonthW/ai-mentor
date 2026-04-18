import { Metadata } from "next";
import ToolsContent from "./ToolsContent";

export const metadata: Metadata = {
  title: "工具导航",
  description: "精选AI工具导航 — 一站式发现最新AI工具资源",
};

export default function ToolsPage() {
  return <ToolsContent />;
}
