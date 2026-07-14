import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  weight: ["400", "500"],
  display: "swap",
});

export const SITE = {
  name: "珂以这样玩AI",
  author: "王珂",
  url: "https://www.keaimentor.com",
  tagline: "跟着珂,你也可以这样玩 AI",
  description:
    "珂以这样玩AI —— 一个用 AI 把想法当天变成产品的独立创造者。这里有我造的 40+ 个 AI 应用、把思维与名著蒸馏成 Agent Skill 的方法,以及法律 AI 与一人公司的实战。",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.author}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "珂以这样玩AI",
    "王珂",
    "AI应用",
    "Claude Skill",
    "Agent",
    "法律AI",
    "一人公司",
    "独立开发",
  ],
  authors: [{ name: SITE.author }],
  openGraph: {
    title: `${SITE.name} · ${SITE.author}`,
    description: SITE.description,
    type: "website",
    locale: "zh_CN",
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} · ${SITE.author}`, description: SITE.description },
  alternates: { canonical: SITE.url, types: { "application/rss+xml": `${SITE.url}/rss.xml` } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${space.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain min-h-screen">
        <Providers>
          <StructuredData />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
