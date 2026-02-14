import { Metadata } from "next";
import LearnContent from "./LearnContent";

export const metadata: Metadata = {
  title: "AI学习中心 - 入门路径/视频课程/实战教程",
  description: "AI学习路径：从入门到实战，系统化学习人工智能",
};

export default function LearnPage() {
  return <LearnContent />;
}
