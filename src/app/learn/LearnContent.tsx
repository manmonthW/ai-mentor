"use client";

import { useState } from "react";
import { BookOpen, Play, ChevronRight, Award, Rocket, Star } from "lucide-react";
import { courses } from "@/data";

const learningPaths = [
  {
    id: "beginner",
    title: "零基础入门",
    description: "了解AI基本概念，开启AI之旅",
    icon: "🌱",
    color: "from-green-500 to-emerald-600",
    steps: [
      "了解什么是人工智能",
      "认识大语言模型",
      "学会使用AI对话助手",
      "掌握提示词基础技巧"
    ]
  },
  {
    id: "intermediate",
    title: "进阶学习",
    description: "深入理解AI原理，提升应用能力",
    icon: "🚀",
    color: "from-blue-500 to-indigo-600",
    steps: [
      "学习提示词高级技巧",
      "了解AI Agent原理",
      "掌握RAG知识库搭建",
      "学习AI工具组合使用"
    ]
  },
  {
    id: "advanced",
    title: "实战开发",
    description: "动手实践，开发AI应用",
    icon: "⚡",
    color: "from-purple-500 to-pink-600",
    steps: [
      "学习Python基础",
      "掌握API调用方法",
      "开发第一个AI应用",
      "部署上线AI产品"
    ]
  }
];

const levelColors: Record<string, string> = {
  "入门": "bg-green-100 text-green-700",
  "进阶": "bg-blue-100 text-blue-700",
  "高级": "bg-purple-100 text-purple-700"
};

export default function LearnContent() {
  const [selectedPath, setSelectedPath] = useState("beginner");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">AI学习中心</h1>
          <p className="text-gray-600">从入门到实战，系统化学习人工智能</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Learning Paths */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Rocket className="w-5 h-5 mr-2 text-indigo-600" />
            学习路径
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`bg-white rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPath === path.id ? "ring-2 ring-indigo-500 shadow-lg" : "shadow-sm hover:shadow-md"
                }`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-2xl mb-4`}>
                  {path.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{path.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{path.description}</p>
                <div className="space-y-2">
                  {path.steps.map((step, index) => (
                    <div key={index} className="flex items-start text-sm text-gray-500">
                      <ChevronRight className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Courses */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
            推荐课程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <a
                key={course.id}
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="h-36 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white/80" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${levelColors[course.level] || 'bg-gray-100 text-gray-700'}`}>
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      {course.source}
                    </span>
                    <div className="flex gap-1">
                      {course.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Learning Resources */}
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2 text-pink-600" />
            学习资源
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">免费资源</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 mr-2 text-indigo-500" />
                  <a href="https://www.bilibili.com" target="_blank" className="hover:text-indigo-600">B站AI教程</a>
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 mr-2 text-indigo-500" />
                  <a href="https://www.huggingface.co/learn" target="_blank" className="hover:text-indigo-600">Hugging Face Learn</a>
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 mr-2 text-indigo-500" />
                  <a href="https://www.deeplearning.ai" target="_blank" className="hover:text-indigo-600">DeepLearning.AI</a>
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 mr-2 text-indigo-500" />
                  <a href="https://learn.microsoft.com/zh-cn/azure/ai-services" target="_blank" className="hover:text-indigo-600">Microsoft AI School</a>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">进阶资源</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 mr-2 text-indigo-500" />
                  <a href="https://openai.com/index/" target="_blank" className="hover:text-indigo-600">OpenAI官方文档</a>
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 mr-2 text-indigo-500" />
                  <a href="https://docs.anthropic.com" target="_blank" className="hover:text-indigo-600">Anthropic文档</a>
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 mr-2 text-indigo-500" />
                  <a href="https://python.langchain.com" target="_blank" className="hover:text-indigo-600">LangChain文档</a>
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 mr-2 text-indigo-500" />
                  <a href="https://docs.dify.ai" target="_blank" className="hover:text-indigo-600">Dify文档</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
