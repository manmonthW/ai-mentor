import { Metadata } from "next";
import {
  Sparkles, Mail, Github, Code2, GraduationCap, Scale,
  Building2, Puzzle, Briefcase, Award, MessageCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于我",
  description: "王珂 | 高级AI赋能专家 — AI培训、Skill开发、法律AI、OPC服务",
};

const timeline = [
  { year: "至今", title: "高级AI赋能专家", desc: "专注AI前沿技术研究、行业AI培训、Skill开发与AI应用落地" },
  { year: "2024", title: "AI应用开发", desc: "开发 Banana Slides、EchoTrace、WeKnora 等多个AI开源项目" },
  { year: "2024", title: "AI培训体系构建", desc: "设计通用、教培、物流等多行业AI培训课程体系" },
  { year: "进行中", title: "专利代理师认证", desc: "备考专利代理师资格考试，探索AI+法律深度融合" },
];

const expertiseAreas = [
  { icon: Puzzle, title: "Skill开发", desc: "Claude Code / Kiro 等多平台Skill设计与开发" },
  { icon: GraduationCap, title: "AI培训", desc: "多行业AI赋能课程体系设计与交付" },
  { icon: Scale, title: "法律AI", desc: "软著申请、专利代理、合同审核等法律AI应用" },
  { icon: Building2, title: "OPC服务", desc: "AI报税、合同管理等OPC公司智能化服务" },
  { icon: Code2, title: "AI应用开发", desc: "全栈AI应用开发，从原型到部署" },
  { icon: Briefcase, title: "企业AI咨询", desc: "企业AI转型策略规划与落地指导" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
              <Sparkles className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">王珂</h1>
            <p className="text-xl text-white/90 mb-2">高级AI赋能专家</p>
            <p className="text-white/70 max-w-2xl mx-auto">
              专注AI前沿技术研究、Skill开发、行业AI培训、法律AI应用与OPC公司智能化服务
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://github.com/manmonthW" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors">
                <Github className="w-4 h-4 mr-2" /> GitHub
              </a>
              <a href="https://aboutme.keaimentor.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors">
                <Award className="w-4 h-4 mr-2" /> 个人主页
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 专业领域 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">专业领域</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area) => (
              <div key={area.title} className="bg-white rounded-xl p-6 shadow-sm">
                <area.icon className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold mb-2">{area.title}</h3>
                <p className="text-sm text-gray-500">{area.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 经历时间线 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">发展历程</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-600 mt-1.5" />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-indigo-200 mt-1" />}
                </div>
                <div className="pb-6">
                  <span className="text-xs text-indigo-600 font-medium">{item.year}</span>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 联系方式 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">联系我</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a href="mailto:contact@keaimentor.com" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">邮箱</h3>
                <p className="text-sm text-gray-500">contact@keaimentor.com</p>
              </div>
            </a>
            <a href="https://github.com/manmonthW" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Github className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-semibold">GitHub</h3>
                <p className="text-sm text-gray-500">manmonthW</p>
              </div>
            </a>
            <Link href="/skills" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">合作咨询</h3>
                <p className="text-sm text-gray-500">查看我的 Skill Hub</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
