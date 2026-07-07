// 作品墙数据 —— 珂以这样玩AI
// 只收录个人作品(原创 / Skill / 精选 Fork),已排除公司(Ericsson/IMS)项目与纯第三方产品。
// featured: 首页精选;shot: public/shots/{id}.(png|svg) 截图;buildLog: 对应手记 slug。

export type WorkGroup =
  | "原创应用"
  | "Skill"
  | "法律AI"
  | "一人公司"
  | "思维工具"
  | "精选Fork";

export interface Work {
  id: string;
  name: string;
  tagline: string;
  group: WorkGroup;
  url?: string;
  github?: string;
  stack?: string[];
  featured?: boolean;
  shot?: string; // 文件名(位于 /public/shots/)
  buildLog?: string; // 手记 slug
  accent?: string; // 无截图时的占位渐变色
}

export const works: Work[] = [
  // ───────────────── Skill · 蒸馏(旗舰)─────────────────
  {
    id: "nuwa",
    name: "女娲 Skill",
    tagline: "蒸馏任何人的思维方式——心智模型、决策启发式、表达 DNA。你想蒸馏的下一个员工,何必是同事。",
    group: "Skill",
    github: "https://github.com/manmonthW/nuwa-skill",
    stack: ["Claude Skill", "Agent", "思维蒸馏"],
    featured: true,
    buildLog: "nuwa-cangjie",
    accent: "from-fuchsia-500 to-violet-600",
  },
  {
    id: "cangjie",
    name: "仓颉 Skill",
    tagline: "把一本书蒸馏成一组可执行的 Agent Skills,古今中外经典名著皆可转化为你的外挂大脑。",
    group: "Skill",
    github: "https://github.com/manmonthW/cangjie-skill",
    stack: ["Claude Skill", "知识提取", "Agent"],
    featured: true,
    buildLog: "nuwa-cangjie",
    accent: "from-violet-500 to-indigo-600",
  },
  {
    id: "ppt-skill",
    name: "网页 PPT Skill",
    tagline: "一句话生成横向翻页网页 PPT:WebGL 背景、章节幕封、数据大字报,两种风格(电子杂志 / 瑞士国际主义)。",
    group: "Skill",
    stack: ["Claude Skill", "前端", "OpenPencil"],
    featured: true,
    buildLog: "ppt-to-editable-pptx",
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: "frontend-slides",
    name: "Frontend Slides Skill",
    tagline: "用 Claude 的前端能力在 Web 上直接生成精美幻灯片。",
    group: "Skill",
    github: "https://github.com/manmonthW/frontend-slides",
    stack: ["Claude Skill", "前端"],
    accent: "from-sky-400 to-blue-600",
  },
  {
    id: "wechat-article",
    name: "微信公众号文章 Skill",
    tagline: "公众号文章从选题、创作到排版发布的一条龙 Skill。",
    group: "Skill",
    github: "https://github.com/manmonthW/wechat_article_skills",
    stack: ["Claude Skill", "内容创作"],
    accent: "from-green-400 to-emerald-600",
  },
  {
    id: "youtube-clipper",
    name: "YouTube Clipper Skill",
    tagline: "YouTube 视频剪辑与内容提取,把长视频变成可用素材。",
    group: "Skill",
    github: "https://github.com/manmonthW/Youtube-clipper-skill",
    stack: ["Claude Skill", "视频"],
    accent: "from-red-400 to-rose-600",
  },

  // ───────────────── 法律 AI(纵深)─────────────────
  {
    id: "judgment-analyzer",
    name: "Judgment Analyzer",
    tagline: "AI 裁判文书分析——自动拆解判决书的核心要素、法律依据与裁判逻辑。",
    group: "法律AI",
    url: "https://judgment-analyzer.vercel.app",
    github: "https://github.com/manmonthW/judgment-analyzer",
    stack: ["Next.js", "LLM", "法律AI"],
    featured: true,
    accent: "from-indigo-500 to-blue-700",
  },
  {
    id: "suitagent",
    name: "SuitAgent 诉讼分析系统",
    tagline: "基于 Claude Code 的诉讼法律服务系统,10 个专业 AI 代理协作,把法律文书生成工程化。",
    group: "法律AI",
    github: "https://github.com/manmonthW/SuitAgent",
    stack: ["Claude Code", "多 Agent", "法律AI"],
    featured: true,
    accent: "from-slate-600 to-indigo-700",
  },
  {
    id: "lexsmile",
    name: "LexSmile",
    tagline: "法律服务站点——法律咨询与信息展示的门面与入口。",
    group: "法律AI",
    url: "https://lexsmile-site-v3.vercel.app",
    stack: ["Next.js", "法律服务"],
    accent: "from-teal-400 to-cyan-600",
  },
  {
    id: "patent-prep",
    name: "专利代理师备考助手",
    tagline: "AI 辅助专利代理师资格考试:智能题库、知识点梳理与薄弱项训练。",
    group: "法律AI",
    stack: ["LLM", "教育", "法律AI"],
    accent: "from-purple-400 to-fuchsia-600",
  },

  // ───────────────── 一人公司 OPC ─────────────────
  {
    id: "xiaoda-tax",
    name: "小达报税",
    tagline: "AI 生成财报,帮不懂财税的一人公司(OPC)创始人自动完成报税。",
    group: "一人公司",
    github: "https://github.com/manmonthW/xiaoda-tax",
    stack: ["LLM", "财税", "OPC"],
    featured: true,
    accent: "from-emerald-500 to-green-700",
  },

  // ───────────────── 思维工具 ─────────────────
  {
    id: "insight-vector",
    name: "Insight Vector · 维度罗盘",
    tagline: "头脑风暴工具,用维度罗盘帮你梳理思维、发散创意。",
    group: "思维工具",
    github: "https://github.com/manmonthW/Insight-Vector",
    stack: ["Next.js", "思维工具"],
    featured: true,
    accent: "from-cyan-400 to-sky-600",
  },
  {
    id: "high-dim-thinker",
    name: "高维认知伴侣",
    tagline: "用向量化思维拆解问题本质,跨界映射寻找第一性原理。",
    group: "思维工具",
    github: "https://github.com/manmonthW/high-dimensional-thinker",
    stack: ["LLM", "认知工具"],
    accent: "from-violet-400 to-purple-700",
  },

  // ───────────────── 原创应用 ─────────────────
  {
    id: "zhiyitong",
    name: "智医通 V1.0",
    tagline: "AI 医疗辅助系统,面向就医与健康问题的智能助手。",
    group: "原创应用",
    url: "https://zhiyitong.keaimentor.com",
    stack: ["Next.js", "医疗AI"],
    accent: "from-rose-400 to-red-600",
  },
  {
    id: "voltgrid",
    name: "VoltGrid",
    tagline: "电力网格管理与可视化平台。",
    group: "原创应用",
    url: "https://volt-grid.vercel.app",
    stack: ["可视化", "数据平台"],
    accent: "from-yellow-400 to-amber-600",
  },
  {
    id: "chargehub",
    name: "ChargeHub",
    tagline: "社区共享充电桩平台。",
    group: "原创应用",
    url: "https://charge-hub-sandy.vercel.app",
    stack: ["Next.js", "平台"],
    accent: "from-lime-400 to-green-600",
  },
  {
    id: "pension-suite",
    name: "养老金规划套件",
    tagline: "从基础测算到方案优化再到精算的一整套养老金规划工具。",
    group: "原创应用",
    url: "https://pension-optimize.vercel.app",
    stack: ["测算工具", "金融"],
    accent: "from-orange-400 to-amber-700",
  },
  {
    id: "word-memorizer",
    name: "Word Memorizer",
    tagline: "AI 辅助单词记忆工具。",
    group: "原创应用",
    github: "https://github.com/manmonthW/word-memorizer",
    stack: ["LLM", "教育"],
    accent: "from-blue-400 to-indigo-600",
  },
  {
    id: "photo-ai",
    name: "Photo AI · Nano Banana Pro",
    tagline: "基于 Nano Banana Pro 的 AI 图像处理工具。",
    group: "原创应用",
    url: "https://photo.keaimentor.com",
    stack: ["图像AI"],
    accent: "from-yellow-300 to-orange-500",
  },

  // ───────────────── 精选 Fork(有价值/已改造)─────────────────
  {
    id: "banana-slides",
    name: "Banana Slides",
    tagline: "基于 Nano Banana Pro 的原生 AI PPT 生成,一句话出片。",
    group: "精选Fork",
    url: "http://bananaslides.online",
    stack: ["AI PPT", "图像"],
    featured: true,
    accent: "from-amber-300 to-yellow-500",
  },
  {
    id: "echotrace",
    name: "EchoTrace",
    tagline: "本地安全的微信聊天记录导出、分析与年度报告生成。",
    group: "精选Fork",
    github: "https://github.com/manmonthW/wechatlog",
    stack: ["数据分析", "本地优先"],
    featured: true,
    accent: "from-green-400 to-teal-600",
  },
  {
    id: "weknora",
    name: "WeKnora",
    tagline: "LLM 驱动的 RAG 框架,做深度文档理解与语义检索。",
    group: "精选Fork",
    stack: ["RAG", "LLM", "检索"],
    accent: "from-indigo-400 to-violet-700",
  },
  {
    id: "worldmonitor",
    name: "WorldMonitor",
    tagline: "实时全球情报仪表盘——AI 新闻聚合与地缘政治监控。",
    group: "精选Fork",
    url: "https://worldmonitor.app",
    stack: ["聚合", "仪表盘"],
    accent: "from-sky-500 to-blue-700",
  },
  {
    id: "director-ai",
    name: "Director AI",
    tagline: "AI 漫剧制作,一键生成剧本、分镜与合成视频。",
    group: "精选Fork",
    github: "https://github.com/manmonthW/director_ai",
    stack: ["视频", "多模态"],
    accent: "from-pink-400 to-fuchsia-600",
  },
  {
    id: "drawnix",
    name: "Drawnix Seedream",
    tagline: "开源协作白板,支持思维导图、流程图与自由绘画。",
    group: "精选Fork",
    url: "https://drawnix-seedream-xi.vercel.app",
    stack: ["白板", "协作"],
    accent: "from-cyan-300 to-teal-500",
  },
];

export const workGroups: WorkGroup[] = [
  "Skill",
  "法律AI",
  "一人公司",
  "思维工具",
  "原创应用",
  "精选Fork",
];

export const featuredWorks = works.filter((w) => w.featured);
export const worksCount = works.length;
// 实际造过、但未逐一收录的应用远不止此数,用于"我造了 N+ 个应用"的展示
export const totalShippedApprox = 40;
