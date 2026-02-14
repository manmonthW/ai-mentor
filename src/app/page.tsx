"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, ToolCase, BookOpen, AppWindow, ChevronRight, Flame, Github, Globe, RefreshCw, Clock } from "lucide-react";
import { tools, courses, products } from "@/data";

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

export default function HomeContent() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 并行获取新闻和关键词
      const [newsRes, keywordsRes] = await Promise.all([
        fetch('/api/news', { cache: 'no-store' }),
        fetch('/api/keywords', { cache: 'no-store' })
      ]);

      if (!newsRes.ok || !keywordsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const newsData = await newsRes.json();
      const keywordsData = await keywordsRes.json();

      setNews(newsData.data);
      setKeywords(keywordsData.data);
      setLastUpdated(newsData.updatedAt);
      setNextUpdate(newsData.nextUpdate);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // 每5分钟检查更新
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNextUpdate = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    const time = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    if (isToday) return `今天 ${time}`;
    if (isTomorrow) return `明天 ${time}`;
    return date.toLocaleDateString('zh-CN', { weekday: 'short' }) + ' ' + time;
  };

  const topTools = tools.slice(0, 8);
  const featuredCourses = courses.slice(0, 4);
  const githubProjects = products.filter(p => p.developer === "manmonthW" && p.url.includes("github.com")).slice(0, 3);
  const googleProjects = products.filter(p => p.developer === "manmonthW" && p.url.includes("keaimentor.com")).slice(0, 4);
  const featuredProducts = products.filter(p => p.featured && p.developer !== "manmonthW").slice(0, 3);

  const categoryColors: Record<string, string> = {
    "模型": "bg-indigo-100 text-indigo-700",
    "应用": "bg-green-100 text-green-700",
    "产品": "bg-blue-100 text-blue-700",
    "事件": "bg-orange-100 text-orange-700",
    "硬件": "bg-purple-100 text-purple-700",
    "生态": "bg-rose-100 text-rose-700",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              {loading ? "正在加载..." : "每日更新AI前沿资讯"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              你的AI成长伙伴
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              每日AI资讯 · 每周关键词 · 热门工具推荐 · 一站式学习平台
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/news"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                探索AI资讯
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-colors"
              >
                <ToolCase className="mr-2 w-5 h-5" />
                AI工具导航
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 更新状态提示 */}
      {lastUpdated && (
        <div className="bg-indigo-50 border-b border-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-sm text-indigo-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>更新时间: {new Date(lastUpdated).toLocaleString('zh-CN')}</span>
            </div>
            {nextUpdate && (
              <div className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>下次更新: {formatNextUpdate(nextUpdate)}</span>
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
        
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-2">加载失败: {error}</p>
            <button 
              onClick={fetchData}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              点击重试
            </button>
          </div>
        ) : loading && news.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
                <div className="h-5 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href="/news"
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-700'}`}>
                    {item.category}
                  </span>
                  <span className="text-gray-400 text-sm">{item.source}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
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
              <h2 className="text-2xl font-bold">每周关键词 Top50</h2>
              <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">每周日6:00更新</span>
            </div>
            <Link href="/news" className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading && keywords.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="bg-gray-200 rounded-lg p-4 animate-pulse">
                  <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 w-16 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {keywords.slice(0, 20).map((kw) => (
                <Link
                  key={kw.id}
                  href="/news"
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-indigo-600">{kw.word}</span>
                    <span className="text-xs text-gray-400">{kw.entity}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{kw.summary}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${
                    categoryColors[kw.category] || 'bg-gray-100 text-gray-600'
                  }`}>
                    {kw.category}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 热门工具 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ToolCase className="w-6 h-6 text-emerald-600 mr-2" />
            <h2 className="text-2xl font-bold">热门AI工具</h2>
          </div>
          <Link href="/tools" className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
            查看全部 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-200 group"
            >
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h3 className="font-semibold mb-1 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{tool.description}</p>
              <div className="mt-3 flex items-center text-xs text-gray-400">
                <span className="bg-gray-100 px-2 py-0.5 rounded">{tool.category}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 精选课程 */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-amber-600 mr-2" />
              <h2 className="text-2xl font-bold">精选学习资源</h2>
            </div>
            <Link href="/learn" className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
                查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                href={course.url}
                target="_blank"
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1 hover:text-indigo-600 transition-colors">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{course.source}</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">{course.level}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 我的GitHub作品 */}
      {githubProjects.length > 0 && (
        <section className="bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center text-white">
                <Github className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">我的开源作品</h2>
              </div>
              <a 
                href="https://github.com/manmonthW" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white flex items-center font-medium"
              >
                查看全部 <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {githubProjects.map((product) => (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="h-36 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Github className="w-12 h-12 text-white/50" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                    <span className="text-xs text-gray-400">by manmonthW</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 我的AI Studio作品 */}
      {googleProjects.length > 0 && (
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center text-white">
                <Globe className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">我的AI应用</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {googleProjects.map((product) => (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="w-10 h-10 text-white/50" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2">{product.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI产品展示 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <AppWindow className="w-6 h-6 text-pink-600 mr-2" />
            <h2 className="text-2xl font-bold">本周精选AI产品</h2>
          </div>
          <Link href="/products" className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
            查看全部 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{product.category}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                <span className="text-xs text-gray-400">by {product.developer}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 订阅区域 */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">订阅每日AI简报</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            每天早上6点获取最新AI资讯，每周汇总关键词Top50，让AI信息获取更高效
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              立即订阅
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
