"use client";

import { Building2, CheckCircle2, Clock, Lightbulb, ArrowRight, FileText, Shield, BarChart3 } from "lucide-react";
import { opcServices } from "@/data";
import HeroSection from "@/components/ui/HeroSection";

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  "已上线": { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  "开发中": { color: "bg-blue-100 text-blue-700", icon: Clock },
  "规划中": { color: "bg-gray-100 text-gray-600", icon: Lightbulb },
};

const categoryIcons: Record<string, typeof FileText> = {
  "财务": BarChart3,
  "合同": FileText,
  "合规": Shield,
  "业务": Building2,
};

const archItems = [
  { title: "财务管理", desc: "AI报税 · 财报生成 · 收支管理", color: "bg-blue-500" },
  { title: "合同管理", desc: "草拟 · 审核 · 全生命周期管理", color: "bg-green-500" },
  { title: "合规管理", desc: "政策跟踪 · 合规检查 · 风险提醒", color: "bg-amber-500" },
  { title: "业务管理", desc: "客户管理 · 项目跟踪 · 数据看板", color: "bg-purple-500" },
];

export default function OPCContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection title="OPC公司AI服务" description="专为OPC公司设计的AI驱动一站式管理服务平台" gradient="from-blue-600 via-cyan-600 to-teal-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 服务架构 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-3 text-center">服务架构</h2>
          <p className="text-gray-500 text-center mb-8">精简版公司管理系统，专为OPC公司创始人设计</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {archItems.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="bg-indigo-50 rounded-lg px-6 py-3 text-sm text-indigo-600 flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              四大模块统一整合，AI驱动自动化运营
            </div>
          </div>
        </section>

        {/* 服务列表 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">服务详情</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opcServices.map((svc) => {
              const StatusIcon = statusConfig[svc.status]?.icon || Clock;
              const CatIcon = categoryIcons[svc.category] || Building2;
              return (
                <div key={svc.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CatIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-xs text-gray-400">{svc.category}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${statusConfig[svc.status]?.color || "bg-gray-100 text-gray-600"}`}>
                      <StatusIcon className="w-3 h-3" />
                      {svc.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{svc.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{svc.description}</p>
                  <div className="space-y-1">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-center text-sm text-gray-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  {svc.url && (
                    <a href={svc.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                      立即使用 <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 参考方案 */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">对标成熟企业管理平台</h3>
          <p className="text-white/80 text-sm">参考 Zoho · Odoo · QuickBooks 等平台，打造适合OPC公司的精简版解决方案</p>
        </div>
      </div>
    </div>
  );
}
