"use client";

import { useState } from "react";
import { Flame, TrendingUp, Globe, Tag, ChevronRight } from "lucide-react";
import { newsItems, keywords, categories } from "@/data";

const categoryColors: Record<string, string> = {
  "模型": "bg-indigo-100 text-indigo-700",
  "应用": "bg-green-100 text-green-700",
  "产品": "bg-blue-100 text-blue-700",
  "融资": "bg-yellow-100 text-yellow-700",
  "政策": "bg-purple-100 text-purple-700",
  "观点": "bg-pink-100 text-pink-700",
  "事件": "bg-orange-100 text-orange-700",
  "科技": "bg-cyan-100 text-cyan-700",
  "生态": "bg-rose-100 text-rose-700",
};

export default function NewsContent() {
  const [activeTab, setActiveTab] = useState<"news" | "keywords" | "global">("news");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNews = selectedCategory
    ? newsItems.filter(n => n.category === selectedCategory)
    : newsItems;

  const filteredKeywords = selectedCategory
    ? keywords.filter(k => k.category === selectedCategory)
    : keywords;

  const tabs = [
    { id: "news", label: "每日AI速度", icon: Flame },
    { id: "keywords", label: "每周关键词", icon: TrendingUp },
    { id: "global", label: "全球AI视野", icon: Globe },
  ];

  const allCategories = [
    { name: "全部", color: "bg-gray-100 text-gray-700" },
    ...categories,
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">AI资讯中心</h1>
          <p className="text-gray-600">每日AI要闻 · 每周关键词Top50 · 全球AI动态</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "news" | "keywords" | "global")}
                className={`flex items-center py-4 px-2 border-b-2 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {allCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name === "全部" ? null : cat.name)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  (selectedCategory === null && cat.name === "全部") || selectedCategory === cat.name
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "news" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">最新AI资讯</h2>
            <div className="space-y-4">
              {filteredNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[news.category] || 'bg-gray-100 text-gray-700'}`}>
                        {news.category}
                      </span>
                      <span className="text-gray-500 text-sm">{news.source}</span>
                      <span className="text-gray-400 text-sm">{news.date}</span>
                    </div>
                    {news.hot && (
                      <div className="flex items-center text-orange-500 text-sm">
                        <span className="font-medium">{news.hot}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 hover:text-indigo-600 transition-colors cursor-pointer">
                    {news.title}
                  </h3>
                  <p className="text-gray-600">{news.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "keywords" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">每周关键词 Top50</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredKeywords.map((kw) => (
                <div
                  key={kw.id}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-indigo-600">{kw.word}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[kw.category] || 'bg-gray-100 text-gray-700'}`}>
                      {kw.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{kw.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">主体: {kw.entity}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "global" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">全球AI视野</h2>
            <div className="bg-white rounded-xl p-8 text-center">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">全球AI资讯即将上线</h3>
              <p className="text-gray-500">正在整合国际AI资讯源，敬请期待</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
