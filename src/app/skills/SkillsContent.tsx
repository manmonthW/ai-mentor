"use client";

import { useState } from "react";
import { Puzzle, ExternalLink, Github, Search } from "lucide-react";
import { skills } from "@/data";
import HeroSection from "@/components/ui/HeroSection";

const platformFilters = [
  { name: "全部", icon: "🌟" },
  { name: "claude-code", icon: "🧠" },
  { name: "kiro", icon: "⚡" },
  { name: "通用", icon: "🔗" },
];

const categoryFilters = [
  { name: "全部", icon: "📋" },
  { name: "工具类", icon: "🔧" },
  { name: "创作类", icon: "✨" },
  { name: "名人系列", icon: "👤" },
  { name: "经典名著系列", icon: "📚" },
];

export default function SkillsContent() {
  const [platform, setPlatform] = useState("全部");
  const [category, setCategory] = useState("全部");
  const [search, setSearch] = useState("");

  const filtered = skills.filter((s) => {
    const matchPlatform = platform === "全部" || s.platform === platform;
    const matchCategory = category === "全部" || s.category === category;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchPlatform && matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection title="Skill Hub" description="多平台 AI Skill 开发与分享 — Claude Code / Kiro / 通用" gradient="from-violet-600 via-purple-600 to-indigo-600" />

      {/* 筛选 */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索 Skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <span className="text-xs text-gray-400 self-center mr-1">平台:</span>
            {platformFilters.map((f) => (
              <button key={f.name} onClick={() => setPlatform(f.name)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${platform === f.name ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {f.icon} {f.name}
              </button>
            ))}
            <span className="text-xs text-gray-400 self-center ml-3 mr-1">类型:</span>
            {categoryFilters.map((f) => (
              <button key={f.name} onClick={() => setCategory(f.name)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${category === f.name ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {f.icon} {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skill 列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Puzzle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">未找到匹配的 Skill</h3>
            <p className="text-gray-500">试试调整筛选条件</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((skill) => (
              <div key={skill.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{skill.platform}</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{skill.category}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
                {skill.createdFrom && (
                  <p className="text-xs text-gray-400 mb-3">衍生自: {skill.createdFrom}</p>
                )}
                <div className="flex flex-wrap gap-1 mb-4">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                {skill.githubUrl && (
                  <a href={skill.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700">
                    <Github className="w-4 h-4 mr-1" /> 查看源码 <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 扩展提示 */}
        <div className="mt-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">更多 Skill 持续开发中</h3>
          <p className="text-white/80 mb-2">女娲系列 · 仓颉系列 · 工具类 Skill 不断扩展</p>
          <p className="text-white/60 text-sm">关注 GitHub 获取最新更新</p>
        </div>
      </div>
    </div>
  );
}
