import { Metadata } from "next";
import SkillsContent from "./SkillsContent";

export const metadata: Metadata = {
  title: "Skill Hub",
  description: "Claude Code / Kiro 等多平台 AI Skill 开发与分享中心",
};

export default function SkillsPage() {
  return <SkillsContent />;
}
