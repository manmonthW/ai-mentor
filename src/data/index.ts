export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  date: string;
  hot?: number;
}

export interface Keyword {
  id: string;
  word: string;
  category: string;
  entity: string;
  summary: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  hot: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  level: string;
  tags: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  url: string;
  developer: string;
  featured: boolean;
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Claude Opus 4.6 发布，编码能力再创新高",
    summary: "Anthropic发布新版Claude模型，在多项基准测试中超越GPT-4.5，成为编码能力最强模型",
    category: "模型",
    source: "Anthropic",
    date: "2025-02-14",
    hot: 98
  },
  {
    id: "2",
    title: "阿里云开源 QwQ-32B 推理模型",
    summary: "消费级显卡即可部署，小尺寸大性能，推理能力比肩DeepSeek-R1",
    category: "模型",
    source: "阿里云",
    date: "2025-02-14",
    hot: 95
  },
  {
    id: "3",
    title: "快手可灵AI发布2.6版本，音画同出",
    summary: "一键生成有声音的动态世界，视频生成进入音画同步时代",
    category: "应用",
    source: "快手",
    date: "2025-02-13",
    hot: 92
  },
  {
    id: "4",
    title: "小米发布首代机器人VLA大模型",
    summary: "丝滑如德芙，推理延迟仅80ms，全面开源赋能机器人产业",
    category: "应用",
    source: "小米",
    date: "2025-02-13",
    hot: 90
  },
  {
    id: "5",
    title: "讯飞星火X2硬核亮相，行业深度全面升级",
    summary: "科大讯飞发布新一代星火大模型，在语音和语义理解领域实现突破",
    category: "模型",
    source: "科大讯飞",
    date: "2025-02-12",
    hot: 88
  },
  {
    id: "6",
    title: "OpenAI Sora独立社交应用上线iOS",
    summary: "基于Sora 2模型，可将文字和图像转化为带声音的超现实视频",
    category: "应用",
    source: "OpenAI",
    date: "2025-02-12",
    hot: 85
  },
  {
    id: "7",
    title: "智谱开源 GLM-5 模型",
    summary: "国产大模型再添重磅成员，开发者可免费商用",
    category: "模型",
    source: "智谱",
    date: "2025-02-11",
    hot: 82
  },
  {
    id: "8",
    title: "英伟达发布DreamZero视频生成技术",
    summary: "实现零样本视频生成，为视频创作带来新范式",
    category: "应用",
    source: "英伟达",
    date: "2025-02-11",
    hot: 80
  },
];

export const keywords: Keyword[] = [
  { id: "1", word: "Claude Opus 4.6", category: "模型", entity: "Anthropic", summary: "编码能力登顶的新一代AI模型" },
  { id: "2", word: "GPT-5.3-Codex", category: "模型", entity: "OpenAI", summary: "OpenAI最新编程模型" },
  { id: "3", word: "QwQ-32B", category: "模型", entity: "阿里云", summary: "开源推理模型，消费级可部署" },
  { id: "4", word: "1M上下文", category: "模型", entity: "DeepSeek", summary: "百万Token上下文窗口" },
  { id: "5", word: "Ming-flash-omni 2.0", category: "模型", entity: "蚂蚁", summary: "全模态大模型新标杆" },
  { id: "6", word: "星火X2", category: "模型", entity: "科大讯飞", summary: "语音语义理解再升级" },
  { id: "7", word: "GLM-5开源", category: "模型", entity: "智谱", summary: "国产大模型开放商用" },
  { id: "8", word: "Seedance 2.0", category: "应用", entity: "字节跳动", summary: "AI视频生成工具" },
  { id: "9", word: "WorkBuddy内测", category: "应用", entity: "腾讯", summary: "企业AI办公助手" },
  { id: "10", word: "可灵3.0", category: "应用", entity: "快手", summary: "影视级AI视频生成" },
  { id: "11", word: "Qwen-Image-2.0", category: "应用", entity: "通义千问", summary: "AI图像生成新模型" },
  { id: "12", word: "Seedream 5.0", category: "应用", entity: "字节跳动", summary: "图像生成进入工作室级" },
  { id: "13", word: "小米机器人", category: "科技", entity: "小米", summary: "首代VLA机器人模型" },
  { id: "14", word: "机器人春晚", category: "科技", entity: "智元机器人", summary: "具身智能新突破" },
  { id: "15", word: "AI医疗实战", category: "观点", entity: "牛津大学", summary: "AI医疗应用反思" },
  { id: "16", word: "AI奇点已至", category: "观点", entity: "HyperWrite", summary: "AI发展进入新阶段" },
  { id: "17", word: "Runway融资", category: "事件", entity: "Runway", summary: "AI视频公司获新融资" },
  { id: "18", word: "AI.com域名", category: "事件", entity: "Crypto.com", summary: "AI域名高价交易" },
  { id: "19", word: "xAI联创离职", category: "事件", entity: "xAI", summary: "特斯拉AI团队变动" },
  { id: "20", word: "2026展望", category: "观点", entity: "ARK Invest", summary: "AI未来趋势预测" },
];

export const tools: Tool[] = [
  { id: "1", name: "ChatGPT", description: "OpenAI对话AI助手", category: "聊天", url: "https://chat.openai.com", icon: "🤖", hot: 100 },
  { id: "2", name: "Claude", description: "Anthropic AI助手，擅长编程", category: "聊天", url: "https://claude.ai", icon: "🧠", hot: 98 },
  { id: "3", name: "Midjourney", description: "AI图像生成工具", category: "图像", url: "https://midjourney.com", icon: "🎨", hot: 95 },
  { id: "4", name: "Runway", description: "AI视频生成平台", category: "视频", url: "https://runwayml.com", icon: "🎬", hot: 92 },
  { id: "5", name: "Copilot", description: "GitHub AI编程助手", category: "编程", url: "https://github.com/features/copilot", icon: "💻", hot: 90 },
  { id: "6", name: "Notion AI", description: "AI写作和笔记助手", category: "写作", url: "https://notion.so", icon: "📝", hot: 88 },
  { id: "7", name: "通义千问", description: "阿里AI助手", category: "聊天", url: "https://tongyi.aliyun.com", icon: "🐱", hot: 85 },
  { id: "8", name: "Kimi", description: "月之暗面AI助手", category: "聊天", url: "https://kimi.moonshot.cn", icon: "🌙", hot: 83 },
  { id: "9", name: "可灵AI", description: "快手AI视频生成", category: "视频", url: "https://klingai.com", icon: "🎥", hot: 80 },
  { id: "10", name: "文心一言", description: "百度AI助手", category: "聊天", url: "https://yiyan.baidu.com", icon: "🦢", hot: 78 },
  { id: "11", name: "Canva AI", description: "AI设计工具", category: "设计", url: "https://canva.com", icon: "✏️", hot: 76 },
  { id: "12", name: "Descript", description: "AI音视频编辑", category: "音频", url: "https://descript.com", icon: "🎧", hot: 74 },
  { id: "13", name: "Cursor", description: "AI代码编辑器", category: "编程", url: "https://cursor.sh", icon: "⌨️", hot: 95 },
  { id: "14", name: "Gamma", description: "AI PPT生成", category: "办公", url: "https://gamma.app", icon: "📊", hot: 72 },
  { id: "15", name: "Perplexity", description: "AI搜索引擎", category: "搜索", url: "https://perplexity.ai", icon: "🔍", hot: 88 },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "AI大模型零基础全套教程",
    description: "B站最全最细的AI大模型教程，7天从小白到大神",
    source: "B站",
    url: "https://www.bilibili.com/video/BV1uNk1YxEJQ/",
    level: "入门",
    tags: ["大模型", "Python", "提示词工程"]
  },
  {
    id: "2",
    title: "动手学AI：人工智能通识与实践",
    description: "阿里云联合五所高校推出的免费AI公益课程",
    source: "阿里云",
    url: "https://ai-bot.cn/ai-tutorials-2025082201/",
    level: "入门",
    tags: ["通识", "理论基础", "免费"]
  },
  {
    id: "3",
    title: "AI辅助神器Cursor实战",
    description: "从0到1实战仿小红书小程序",
    source: "慕课网",
    url: "https://coding.imooc.com/class/935.html",
    level: "进阶",
    tags: ["Cursor", "实战", "小程序"]
  },
  {
    id: "4",
    title: "Hugging Face Learn Center",
    description: "官方免费课程，涵盖LLM、深度学习、计算机视觉等",
    source: "Hugging Face",
    url: "https://jimmysong.io/ai/huggingface-learn",
    level: "进阶",
    tags: ["机器学习", "深度学习", "开源"]
  },
  {
    id: "5",
    title: "DeepSeek实战应用课程",
    description: "深入解读DeepSeek应用开发与技术创新",
    source: "AI全栈营",
    url: "https://xmq1024.com/12140.html",
    level: "进阶",
    tags: ["DeepSeek", "应用开发", "实战"]
  },
];

export const products: Product[] = [
  // 我的作品 - GitHub
  {
    id: "g1",
    name: "Banana Slides",
    description: "基于nano banana pro的原生AI PPT生成应用，支持上传模板、智能解析、一句话生成PPT",
    category: "工具",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
    url: "https://github.com/manmonthW/banana-slides",
    developer: "manmonthW",
    featured: true
  },
  {
    id: "g2",
    name: "Insight Vector",
    description: "维度罗盘 - 头脑风暴工具，帮助你梳理思维和创意",
    category: "工具",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=300&fit=crop",
    url: "https://github.com/manmonthW/Insight-Vector",
    developer: "manmonthW",
    featured: true
  },
  {
    id: "g3",
    name: "EchoTrace",
    description: "本地安全的微信聊天记录导出、分析与年度报告生成工具",
    category: "工具",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    url: "https://github.com/manmonthW/wechatlog",
    developer: "manmonthW",
    featured: true
  },
  {
    id: "g4",
    name: "高维认知伴侣",
    description: "用向量化思维拆解问题本质，跨界映射寻找第一性原理",
    category: "工具",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    url: "https://github.com/manmonthW/high-dimensional-thinker",
    developer: "manmonthW",
    featured: false
  },
  {
    id: "g5",
    name: "WeKnora",
    description: "LLM-powered RAG框架，用于深度文档理解和语义检索",
    category: "工具",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    url: "https://github.com/manmonthW/WeKnora",
    developer: "manmonthW",
    featured: false
  },
  // 我的作品 - Google AI Studio
  {
    id: "ga1",
    name: "关于我",
    description: "王珂 | 高级AI赋能专家 - 个人主页",
    category: "应用",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    url: "https://aboutme.keaimentor.com",
    developer: "manmonthW",
    featured: true
  },
  {
    id: "ga2",
    name: "April 寒假作业助手",
    description: "王笑的寒假作业助手 - WinterTask Tracker",
    category: "应用",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    url: "https://april.keaimentor.com",
    developer: "manmonthW",
    featured: false
  },
  {
    id: "ga3",
    name: "ChargeHub 充电桩平台",
    description: "社区共享充电桩平台",
    category: "应用",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
    url: "https://chargehub.keaimentor.com",
    developer: "manmonthW",
    featured: false
  },
  {
    id: "ga4",
    name: "Learning IMS",
    description: "IMS Learning Lab - 智能学习平台",
    category: "应用",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop",
    url: "https://learningims.keaimentor.com",
    developer: "manmonthW",
    featured: false
  },
  {
    id: "ga5",
    name: "Photo AI",
    description: "Nano Banana Pro - AI图像处理工具",
    category: "工具",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    url: "https://photo.keaimentor.com",
    developer: "manmonthW",
    featured: false
  },
  {
    id: "ga6",
    name: "Arch Reliability AI Optima",
    description: "IMS Arch-Reliability AI Optima | Carrier Grade",
    category: "工具",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    url: "https://redundancy-design.keaimentor.com",
    developer: "manmonthW",
    featured: false
  },
  {
    id: "ga7",
    name: "AI Training 工程化体系",
    description: "AI Engineering Matrix - 企业AI课程工程化体系",
    category: "应用",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    url: "https://training.keaimentor.com",
    developer: "manmonthW",
    featured: false
  },
  {
    id: "ga8",
    name: "智医通",
    description: "智医通 - AI医疗辅助系统",
    category: "应用",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    url: "https://zhiyitong.keaimentor.com",
    developer: "manmonthW",
    featured: false
  },
  // 热门AI产品
  {
    id: "1",
    name: "ChatGPT",
    description: "OpenAI推出的AI对话助手，掀起全球AI热潮",
    category: "工具",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    url: "https://chat.openai.com",
    developer: "OpenAI",
    featured: false
  },
  {
    id: "2",
    name: "Claude",
    description: "Anthropic打造的AI助手，以长文本理解和安全性著称",
    category: "工具",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    url: "https://claude.ai",
    developer: "Anthropic",
    featured: false
  },
  {
    id: "3",
    name: "Midjourney",
    description: "最强AI图像生成工具，让创意变为现实",
    category: "工具",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    url: "https://midjourney.com",
    developer: "Midjourney",
    featured: false
  },
  {
    id: "4",
    name: "Kimi",
    description: "月之暗面推出的超长上下文AI助手",
    category: "工具",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    url: "https://kimi.moonshot.cn",
    developer: "月之暗面",
    featured: false
  },
  {
    id: "5",
    name: "可灵AI",
    description: "快手推出的AI视频生成工具",
    category: "应用",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    url: "https://klingai.com",
    developer: "快手",
    featured: false
  },
  {
    id: "6",
    name: "Cursor",
    description: "AI驱动的代码编辑器重构开发体验",
    category: "工具",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    url: "https://cursor.sh",
    developer: "Anysphere",
    featured: false
  },
];

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
