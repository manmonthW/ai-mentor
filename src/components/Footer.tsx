import Link from "next/link";
import { Sparkles, Mail, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              <span className="text-xl font-bold text-white">AI Mentor</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              每日AI资讯 · 一站式AI成长平台，让你轻松了解AI、使用AI、学习AI
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link href="/news" className="hover:text-indigo-400 transition-colors">资讯中心</Link></li>
              <li><Link href="/tools" className="hover:text-indigo-400 transition-colors">工具导航</Link></li>
              <li><Link href="/learn" className="hover:text-indigo-400 transition-colors">学习中心</Link></li>
              <li><Link href="/products" className="hover:text-indigo-400 transition-colors">产品展示</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">关于我们</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">投稿合作</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">用户反馈</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">订阅服务</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Mentor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
