import type { Metadata } from "next";
import WorksContent from "./WorksContent";

export const metadata: Metadata = {
  title: "作品",
  description:
    "珂造的 40+ 个 AI 应用:Skill 蒸馏、法律 AI、一人公司工具、思维工具、原创应用与精选 Fork。",
};

export default function WorksPage() {
  return <WorksContent />;
}
