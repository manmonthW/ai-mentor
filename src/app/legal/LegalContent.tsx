"use client";

import { Scale, BookOpen, Gavel, FileCheck, ExternalLink, Github } from "lucide-react";
import { legalApps } from "@/data";
import HeroSection from "@/components/ui/HeroSection";

const sections = [
  {
    icon: Gavel,
    title: "专利代理师备考",
    desc: "通过AI辅助学习专利代理师资格认证考试",
    items: [
      "AI智能题库 — 自动生成练习题与模拟考试",
      "知识点图谱 — AI梳理专利法核心知识体系",
      "错题分析 — 智能分析薄弱环节并针对性强化",
      "法条速查 — AI辅助快速检索相关法律条文",
    ],
  },
  {
    icon: FileCheck,
    title: "软著申请AI助手",
    desc: "AI辅助软件著作权申请全流程",
    items: [
      "自动生成申请材料模板",
      "代码文档智能整理",
      "申请流程指引与状态跟踪",
    ],
  },
];

const typeColors: Record<string, string> = {
  "自研": "bg-indigo-100 text-indigo-700",
  "收集": "bg-green-100 text-green-700",
};

export default function LegalContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection title="法律AI应用" description="软著申请 · 专利代理师备考 · 合同审核 · 法律知识库" gradient="from-emerald-600 via-teal-600 to-cyan-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 核心板块 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Scale className="w-6 h-6 text-emerald-600 mr-2" />
            核心板块
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((sec) => (
              <div key={sec.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <sec.icon className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{sec.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{sec.desc}</p>
                <ul className="space-y-2">
                  {sec.items.map((item) => (
                    <li key={item} className="flex items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 法律AI应用集 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <BookOpen className="w-6 h-6 text-teal-600 mr-2" />
            法律AI应用集
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalApps.map((app) => (
              <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[app.type] || "bg-gray-100 text-gray-700"}`}>{app.type}</span>
                  <span className="text-xs text-gray-400">{app.category}</span>
                </div>
                <h3 className="font-semibold mb-2">{app.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {app.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {app.url && (
                    <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
                      访问 <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                  {app.githubUrl && (
                    <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                      <Github className="w-4 h-4 mr-1" /> 源码
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 规划提示 */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">更多法律AI应用开发中</h3>
          <p className="text-white/80">合同智能审核 · 法律知识图谱 · AI法律咨询助手</p>
        </div>
      </div>
    </div>
  );
}
