"use client";

import { useState } from "react";
import { Search, TrendingUp, Plus, Grid, List } from "lucide-react";
import { tools } from "@/data";

const toolCategories = [
  { name: "全部", icon: "🌟" },
  { name: "聊天", icon: "💬" },
  { name: "图像", icon: "🎨" },
  { name: "视频", icon: "🎬" },
  { name: "编程", icon: "💻" },
  { name: "写作", icon: "✍️" },
  { name: "设计", icon: "🎯" },
  { name: "办公", icon: "📊" },
  { name: "音频", icon: "🎧" },
  { name: "搜索", icon: "🔍" },
  { name: "Agent", icon: "🤖" },
];

export default function ToolsContent() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === "全部" || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedTools = [...filteredTools].sort((a, b) => b.hot - a.hot);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">AI工具导航</h1>
          <p className="text-gray-600">发现最新AI工具，一站式获取最全面的AI工具资源</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索AI工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-indigo-100 text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-indigo-100 text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto py-3">
            {toolCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hot Ranking */}
        <div className="flex items-center mb-6">
          <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
          <span className="font-medium">热门榜单</span>
        </div>

        {sortedTools.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">未找到相关工具</h3>
            <p className="text-gray-500">试试调整搜索条件或选择其他分类</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedTools.map((tool, index) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-200 group relative"
              >
                {index < 3 && (
                  <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-600"
                  }`}>
                    {index + 1}
                  </div>
                )}
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="font-semibold mb-1 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{tool.category}</span>
                  <span className="text-xs text-gray-400">🔥 {tool.hot}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTools.map((tool, index) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-200 flex items-center gap-4 group"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${
                  index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-gray-300 text-gray-600"
                }`}>
                  {index + 1}
                </div>
                <div className="text-3xl">{tool.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{tool.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{tool.category}</span>
                  <span className="text-sm text-gray-400">🔥 {tool.hot}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Submit Tool */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">没有找到你想要的工具？</h3>
          <p className="text-white/80 mb-4">推荐你喜欢的AI工具给我们</p>
          <button className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-gray-100 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            提交工具
          </button>
        </div>
      </div>
    </div>
  );
}
