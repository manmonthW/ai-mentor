"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, BookOpen, ChevronRight, ArrowRight, Users, Truck, Lightbulb } from "lucide-react";
import { trainingPrograms, courses } from "@/data";
import HeroSection from "@/components/ui/HeroSection";

const industryIcons: Record<string, typeof Lightbulb> = {
  "通用": Lightbulb,
  "教培": Users,
  "物流": Truck,
};

const industryColors: Record<string, string> = {
  "通用": "from-amber-500 to-orange-600",
  "教培": "from-blue-500 to-indigo-600",
  "物流": "from-green-500 to-emerald-600",
};

export default function LearnContent() {
  const [activeTab, setActiveTab] = useState<"programs" | "resources">("programs");

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection title="AI培训中心" description="覆盖通用AI、教培行业、物流行业的系统化培训课程体系" gradient="from-amber-500 via-orange-500 to-red-500" />

      {/* Tabs */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8">
          <button
            onClick={() => setActiveTab("programs")}
            className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === "programs" ? "border-amber-600 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            <GraduationCap className="w-5 h-5 inline mr-2" />
            我的课程体系
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === "resources" ? "border-amber-600 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            推荐资源
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "programs" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {trainingPrograms.map((prog) => {
                const Icon = industryIcons[prog.industry] || Lightbulb;
                const color = industryColors[prog.industry] || "from-gray-500 to-gray-600";
                return (
                  <Link key={prog.id} href={`/learn/${prog.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100">
                    <div className={`h-36 bg-gradient-to-br ${color} flex items-center justify-center`}>
                      <Icon className="w-14 h-14 text-white/80" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{prog.title}</h3>
                      <p className="text-gray-500 text-sm mb-4">{prog.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{prog.level}</span>
                        <span className="text-xs text-gray-400">{prog.modules.length} 个模块</span>
                      </div>
                      <div className="mt-4 space-y-1">
                        {prog.modules.slice(0, 3).map((m) => (
                          <div key={m.id} className="flex items-center text-sm text-gray-500">
                            <ChevronRight className="w-3 h-3 mr-1 flex-shrink-0" />
                            {m.title}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-sm text-indigo-600 flex items-center font-medium">
                        查看详情 <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">推荐学习资源</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <a key={course.id} href={course.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-white/80" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{course.source}</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">{course.level}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
