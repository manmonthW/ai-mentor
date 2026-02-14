import { Metadata } from "next";
import ToolsContent from "./ToolsContent";

export const metadata: Metadata = {
  title: "AI工具导航 - 热门AI工具推荐",
  description: "发现最新AI工具：聊天、图像生成、视频制作、编程辅助等一站式导航",
};

export default function ToolsPage() {
  return <ToolsContent />;
}
