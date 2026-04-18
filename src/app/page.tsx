"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, Sparkles, TrendingUp, BookOpen, AppWindow,
  ChevronRight, Flame, Github, Globe, Clock, RefreshCw,
  Scale, Building2, Puzzle, GraduationCap, Code2, Wrench,
} from "lucide-react";
import { tools, products } from "@/data";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  date: string;
  hot: number;
}

interface Keyword {
  id: string;
  word: string;
  category: string;
  entity: string;
  summary: string;
}

const capabilities = [
  { icon: Puzzle, title: "Skill Hub", desc: "Claude Code / Kiro 等多平台 Skill 开发与分享", href: "/skills", color: "from-violet-500 to-purple-600" },
  { icon: GraduationCap, title: "AI培训", desc: "通用 · 教培 · 物流等多行业AI课程体系", href: "/learn", color: "from-amber-500 to-orange-600" },
  { icon: Scale, title: "法律AI", desc: "软著申请 · 专利代理师备考 · 法律AI应用集", href: "/legal", color: "from-emerald-500 to-teal-600" },
  { icon: Building2, title: "OPC服务", desc: "AI报税 · 合同管理 · 一站式OPC公司服务", href: "/opc", color: "from-blue-500 to-cyan-600" },
  { icon: Code2, title: "AI作品", desc: "Banana Slides · EchoTrace · WeKnora 等开源项目", href: "/products", color: "from-pink-500 to-rose-600" },
  { icon: Wrench, title: "工具导航", desc: "精选主流AI工具，一站式发现与使用", href: "/tools", color: "from-gray-600 to-gray-800" },
];

const stats = [
  { label: "AI应用", value: "40+" },
  { label: "Skills", value: "9" },
  { label: "培训课程", value: "3套" },
  { label: "覆盖行业", value: "6+" },
];

const categoryColors: Record<string, string> = {
  "模型": "bg-indigo-100 text-indigo-700",
  "应用": "bg-green-100 text-green-700",
  "产品": "bg-blue-100 text-blue-700",
  "事件": "bg-orange-100 text-orange-700",
  "硬件": "bg-purple-100 text-purple-700",
  "融资": "bg-yellow-100 text-yellow-700",
  "观点": "bg-pink-100 text-pink-700",
};

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, kwRes] = await Promise.all([
          fetch("/api/news", { cache: "no-store" }),
          fetch("/api/keywords", { cache: "no-store" }),
        ]);
        if (newsRes.ok && kwRes.ok) {
          const nd = await newsRes.json();
          const kd = await kwRes.json();
          setNews(nd.data);
          setKeywords(kd.data);
          setLastUpdated(nd.updatedAt);
          setNextUpdate(nd.nextUpdate);
        }
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const myProjects = products.filter((p) => p.developer === "manmonthW" && p.featured).slice(0, 8);
  const topTools = tools.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero — 个人品牌 */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              高级AI赋能专家
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              你好，我是<span className="text-yellow-300">王珂</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              AI Mentor — 你的AI成长伙伴
            </p>
            <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              专注AI前沿技术研究、Skill开发、行业AI培训、法律AI应用与OPC公司智能化服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/skills"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                探索 Skill Hub
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur text-white rounded-full font-semibold hover:bg-white/30 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{s.value}</div>
                <div className="text-white/70 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 能力矩阵 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">我能为你提供什么</h2>
          <p className="text-gray-500">多年AI实战经验，覆盖多个领域和行业</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <Link
              key={cap.title}
              href={cap.href}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center mb-4`}>
                <cap.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{cap.title}</h3>
              <p className="text-gray-500 text-sm">{cap.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 精选作品 */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">我的AI作品</h2>
              <p className="text-gray-400 text-sm">开源项目与AI应用</p>
            </div>
            <Link href="/products" className="text-indigo-400 hover:text-indigo-300 flex items-center font-medium">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProjects.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors group border border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  {p.url.includes("github.com") ? (
                    <Github className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Globe className="w-5 h-5 text-indigo-400" />
                  )}
                  <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">{p.category}</span>
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-indigo-400 transition-colors">{p.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{p.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 更新状态 */}
      {lastUpdated && (
        <div className="bg-indigo-50 border-b border-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-sm text-indigo-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>更新: {new Date(lastUpdated).toLocaleString("zh-CN")}</span>
            </div>
            {nextUpdate && (
              <div className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>下次更新: {new Date(nextUpdate).toLocaleString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 今日AI要闻 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Flame className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-2xl font-bold">今日AI要闻</h2>
            <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">每日6:00更新</span>
          </div>
          <Link href="/news" className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
            查看更多 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {loading && news.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
                <div className="h-5 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 6).map((item) => (
              <Link key={item.id} href="/news" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[item.category] || "bg-gray-100 text-gray-700"}`}>
                    {item.category}
                  </span>
                  <span className="text-gray-400 text-sm">{item.source}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{item.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 每周关键词 */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold">每周关键词</h2>
              <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">每周日更新</span>
            </div>
            <Link href="/news" className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {keywords.slice(0, 12).map((kw) => (
              <div key={kw.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-indigo-600">{kw.word}</span>
                  <span className="text-xs text-gray-400">{kw.entity}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{kw.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 热门工具 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <AppWindow className="w-6 h-6 text-emerald-600 mr-2" />
            <h2 className="text-2xl font-bold">热门AI工具</h2>
          </div>
          <Link href="/tools" className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
            查看全部 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topTools.map((tool) => (
            <a key={tool.id} href={tool.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-200 group">
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h3 className="font-semibold mb-1 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{tool.description}</p>
              <span className="mt-3 inline-block text-xs bg-gray-100 px-2 py-0.5 rounded">{tool.category}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 学习资源入口 */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">AI培训课程体系</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            覆盖通用AI、教培行业、物流行业的系统化培训课程，从认知到实战
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            进入培训中心
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
