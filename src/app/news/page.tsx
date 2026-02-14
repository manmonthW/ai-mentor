import { Metadata } from "next";
import NewsContent from "./NewsContent";

export const metadata: Metadata = {
  title: "AI资讯中心 - 每日AI速度/每周关键词",
  description: "每日AI要闻、每周关键词Top50、全球AI资讯 - 实时更新AI行业动态",
};

export default function NewsPage() {
  return <NewsContent />;
}
