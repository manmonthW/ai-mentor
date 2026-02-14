"use client";

import { useState } from "react";
import { AppWindow, Star, Plus, Filter, Smartphone, Wrench, Cpu, Bot } from "lucide-react";
import { products } from "@/data";

const productCategories = [
  { name: "全部", icon: "🌟" },
  { name: "工具", icon: "🔧" },
  { name: "应用", icon: "📱" },
  { name: "硬件", icon: "💻" },
  { name: "Agent", icon: "🤖" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "工具": <Wrench className="w-5 h-5" />,
  "应用": <Smartphone className="w-5 h-5" />,
  "硬件": <Cpu className="w-5 h-5" />,
  "Agent": <Bot className="w-5 h-5" />,
};

export default function ProductsContent() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [showFeatured, setShowFeatured] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "全部" || product.category === selectedCategory;
    const matchesFeatured = showFeatured ? product.featured : true;
    return matchesCategory && matchesFeatured;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">AI产品展示</h1>
          <p className="text-gray-600">发现最新AI产品，分享你的AI创作</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto">
              {productCategories.map((cat) => (
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

            {/* Featured Toggle */}
            <button
              onClick={() => setShowFeatured(!showFeatured)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                showFeatured
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Star className="w-4 h-4 mr-2" />
              本周精选
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <AppWindow className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">暂无产品</h3>
            <p className="text-gray-500">试试选择其他分类</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                {/* Product Image */}
                <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-32 bg-gray-800 rounded-xl border-4 border-gray-600 flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  {product.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        精选
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded flex items-center">
                      {categoryIcons[product.category]}
                      <span className="ml-1">{product.category}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">by {product.developer}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Submit Product */}
        <div className="mt-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">展示你的AI产品</h3>
          <p className="text-white/80 mb-4">让更多用户发现你的AI创作</p>
          <button className="inline-flex items-center px-6 py-3 bg-white text-pink-600 rounded-full font-medium hover:bg-gray-100 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            提交产品
          </button>
        </div>
      </div>
    </div>
  );
}
