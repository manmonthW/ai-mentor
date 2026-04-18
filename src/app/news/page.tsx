import { Metadata } from "next";
import NewsContent from "./NewsContent";

export const metadata: Metadata = {
  title: "资讯中心",
  description: "每日AI要闻 · 每周关键词Top50 · 全球AI动态",
};

export default function NewsPage() {
  return <NewsContent />;
}
