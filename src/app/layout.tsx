import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AI Mentor - 王珂 | 高级AI赋能专家",
    template: "%s | AI Mentor",
  },
  description: "AI前沿资讯 · Skill开发 · 行业AI培训 · 法律AI应用 · OPC公司服务 — 一站式AI成长平台",
  keywords: "AI, 人工智能, AI培训, AI Skill, 法律AI, OPC, AI工具, AI资讯, 王珂",
  openGraph: {
    title: "AI Mentor - 王珂 | 高级AI赋能专家",
    description: "AI前沿资讯 · Skill开发 · 行业AI培训 · 法律AI应用 · OPC公司服务",
    type: "website",
  },
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
