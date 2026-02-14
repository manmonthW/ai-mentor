import { Metadata } from "next";
import { Sparkles, Mail, MessageCircle, Users, FileText, Rss } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我们 - AI Mentor",
  description: "关于AI Mentor - 每日AI资讯一站式成长平台",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
              <Sparkles className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">AI Mentor</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              每日AI资讯 · 一站式AI成长平台
            </p>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              致力于让每个人都能轻松了解AI、使用AI、学习AI
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <section className="mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">我们的使命</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
              AI Mentor 致力于打造最全面的中文AI资讯和学习平台。在这个AI快速发展的时代，
              我们希望通过每日的资讯更新、关键词整理、学习资源推荐，帮助每一个人
              跟上AI发展的步伐，无论是AI从业者、企业决策者，还是对AI感兴趣的普通人。
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">核心内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">每日AI资讯</h3>
              <p className="text-sm text-gray-500">精选每日AI要闻，追踪行业动态</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="font-semibold mb-2">每周关键词</h3>
              <p className="text-sm text-gray-500">每周50关键词把握AI全局动态</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">工具导航</h3>
              <p className="text-sm text-gray-500">一站式发现最新AI工具</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">学习中心</h3>
              <p className="text-sm text-gray-500">从入门到实战的系统学习路径</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:contact@aimentor.com"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">邮箱联系</h3>
                <p className="text-sm text-gray-500">contact@aimentor.com</p>
              </div>
            </a>
            <a
              href="#"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">微信群</h3>
                <p className="text-sm text-gray-500">加入AI爱好者社群</p>
              </div>
            </a>
            <a
              href="#"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Rss className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">RSS订阅</h3>
                <p className="text-sm text-gray-500">订阅最新资讯</p>
              </div>
            </a>
          </div>
        </section>

        {/* Subscribe */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">订阅我们</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            订阅每日AI简报，每天早上获取最新AI资讯
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              立即订阅
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
