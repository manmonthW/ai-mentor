// 统一数据导出
export { tools } from "./tools";
export { products } from "./products";
export { courses } from "./courses";
export { skills } from "./skills";
export { legalApps } from "./legal";
export { opcServices } from "./opc";
export { trainingPrograms } from "./training";

// 统一类型导出
export type {
  NewsItem,
  Keyword,
  Tool,
  Course,
  Product,
  Skill,
  LegalApp,
  OPCService,
  TrainingProgram,
  TrainingModule,
  BlogPost,
  Category,
} from "@/types";

export const categories = [
  { name: "大模型", color: "bg-indigo-100 text-indigo-700" },
  { name: "应用", color: "bg-green-100 text-green-700" },
  { name: "产品", color: "bg-blue-100 text-blue-700" },
  { name: "融资", color: "bg-yellow-100 text-yellow-700" },
  { name: "政策", color: "bg-purple-100 text-purple-700" },
  { name: "观点", color: "bg-pink-100 text-pink-700" },
  { name: "事件", color: "bg-orange-100 text-orange-700" },
  { name: "科技", color: "bg-cyan-100 text-cyan-700" },
];

// 保留旧的静态新闻和关键词数据用于 fallback
export const newsItems = [
  { id: "1", title: "Claude Opus 4.6 发布，编码能力再创新高", summary: "Anthropic发布新版Claude模型，在多项基准测试中超越GPT-4.5", category: "模型", source: "Anthropic", date: "2025-02-14", hot: 98 },
  { id: "2", title: "阿里云开源 QwQ-32B 推理模型", summary: "消费级显卡即可部署，小尺寸大性能", category: "模型", source: "阿里云", date: "2025-02-14", hot: 95 },
  { id: "3", title: "快手可灵AI发布2.6版本，音画同出", summary: "一键生成有声音的动态世界", category: "应用", source: "快手", date: "2025-02-13", hot: 92 },
  { id: "4", title: "小米发布首代机器人VLA大模型", summary: "推理延迟仅80ms，全面开源", category: "应用", source: "小米", date: "2025-02-13", hot: 90 },
  { id: "5", title: "讯飞星火X2硬核亮相", summary: "语音和语义理解领域实现突破", category: "模型", source: "科大讯飞", date: "2025-02-12", hot: 88 },
  { id: "6", title: "OpenAI Sora独立社交应用上线iOS", summary: "基于Sora 2模型，文字和图像转化为视频", category: "应用", source: "OpenAI", date: "2025-02-12", hot: 85 },
];

export const keywords = [
  { id: "1", word: "Claude Opus 4.6", category: "模型", entity: "Anthropic", summary: "编码能力登顶的新一代AI模型" },
  { id: "2", word: "GPT-5.3-Codex", category: "模型", entity: "OpenAI", summary: "OpenAI最新编程模型" },
  { id: "3", word: "QwQ-32B", category: "模型", entity: "阿里云", summary: "开源推理模型，消费级可部署" },
  { id: "4", word: "1M上下文", category: "模型", entity: "DeepSeek", summary: "百万Token上下文窗口" },
  { id: "5", word: "Ming-flash-omni 2.0", category: "模型", entity: "蚂蚁", summary: "全模态大模型新标杆" },
];
