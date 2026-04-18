import Link from "next/link";
import { Sparkles, Mail, Github } from "lucide-react";

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
            <p className="text-gray-400 mb-2">王珂 | 高级AI赋能专家</p>
            <p className="text-gray-500 text-sm mb-4 max-w-md">
              AI前沿资讯 · Skill开发 · 行业AI培训 · 法律AI应用 · OPC公司服务
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/manmonthW" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:contact@keaimentor.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">核心板块</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/skills" className="hover:text-indigo-400 transition-colors">Skill Hub</Link></li>
              <li><Link href="/legal" className="hover:text-indigo-400 transition-colors">法律AI</Link></li>
              <li><Link href="/opc" className="hover:text-indigo-400 transition-colors">OPC服务</Link></li>
              <li><Link href="/learn" className="hover:text-indigo-400 transition-colors">培训中心</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">更多</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="hover:text-indigo-400 transition-colors">资讯中心</Link></li>
              <li><Link href="/tools" className="hover:text-indigo-400 transition-colors">工具导航</Link></li>
              <li><Link href="/products" className="hover:text-indigo-400 transition-colors">产品展示</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">关于我</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Mentor by 王珂. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
