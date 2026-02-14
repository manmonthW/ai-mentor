import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Mentor - 每日AI资讯 · 一站式AI成长平台",
  description: "每日AI资讯、每周关键词、热门工具推荐、学习资源导航 - 让你轻松了解AI、使用AI、学习AI",
  keywords: "AI, 人工智能, AI资讯, AI工具, AI学习, 每周关键词, AI产品",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
