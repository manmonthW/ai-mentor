// 作品墙数据 —— 珂以这样玩AI
// 只收录个人作品(原创 / Skill / 精选 Fork),已排除公司(Ericsson/IMS)项目与纯第三方产品。
// url 均为已验证可访问的线上地址;shot 为 public/shots/{id}.png 的真实截图。

export type WorkGroup =
  | "原创应用"
  | "Skill"
  | "法律AI"
  | "一人公司"
  | "思维工具"
  | "教育"
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
    tagline: "AI 裁判文书分析——上传判决书,自动拆解核心要素、法律依据与裁判逻辑,可导出 Word。",
    group: "法律AI",
    url: "https://analyzer.xiaodalaw.cn",
    github: "https://github.com/manmonthW/judgment-analyzer",
    stack: ["Next.js", "LLM", "法律AI"],
    featured: true,
    shot: "judgment-analyzer.png",
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
    name: "LexSmile · 小达律法",
    tagline: "法律服务站点——法律咨询与信息展示的门面与入口。",
    group: "法律AI",
    url: "https://www.xiaodalaw.cn",
    stack: ["Next.js", "法律服务"],
    shot: "lexsmile.png",
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
    url: "https://xiaoda-tax.vercel.app",
    github: "https://github.com/manmonthW/xiaoda-tax",
    stack: ["LLM", "财税", "OPC"],
    featured: true,
    shot: "xiaoda-tax.png",
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
    id: "voltgrid",
    name: "VoltGrid",
    tagline: "电力网格管理与可视化平台。",
    group: "原创应用",
    url: "https://volt-grid.vercel.app",
    stack: ["可视化", "数据平台"],
    shot: "voltgrid.png",
  },
  {
    id: "chargehub",
    name: "ChargeHub",
    tagline: "社区共享充电桩平台。",
    group: "原创应用",
    url: "https://chargehub.keaimentor.com",
    stack: ["Next.js", "平台"],
    shot: "chargehub.png",
  },
  {
    id: "pension-suite",
    name: "养老金规划套件",
    tagline: "从基础测算到方案优化再到精算的一整套养老金规划工具。",
    group: "原创应用",
    url: "https://pension-optimize2.vercel.app",
    stack: ["测算工具", "金融"],
    shot: "pension-suite.png",
  },
  {
    id: "word-memorizer",
    name: "Word Memorizer",
    tagline: "AI 辅助单词记忆工具。",
    group: "原创应用",
    url: "https://word-memorizer-seven.vercel.app",
    github: "https://github.com/manmonthW/word-memorizer",
    stack: ["LLM", "教育"],
    shot: "word-memorizer.png",
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
    shot: "banana-slides.png",
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
    shot: "worldmonitor.png",
  },
  {
    id: "valuecell",
    name: "ValueCell",
    tagline: "社区驱动的多 Agent 金融应用平台。",
    group: "精选Fork",
    url: "https://valuecell-manmonthws-projects.vercel.app",
    stack: ["多 Agent", "金融"],
    shot: "valuecell.png",
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
    shot: "drawnix.png",
  },

  // ───────────────── 教育 · K-12 ─────────────────
  {
    id: "k12-ai-curriculum",
    name: "中小学 AI 课程体系(3-9 年级 · 208 课时)",
    tagline:
      "对齐 2022 新课标的完整 K-12 AI 课程设计:10/70/20 黄金比例、四阶螺旋进阶、六大主题闭环。",
    group: "教育",
    url: "/k12",
    stack: ["2022 新课标", "K-12", "课程体系设计"],
    featured: true,
    accent: "from-amber-500 to-orange-600",
  },
  // ───────────────── 教育 · 中考 ─────────────────
  {
    id: "zhongkao-baokao",
    name: "2026 大连中考报考指南",
    tagline: "把复杂的志愿政策讲成人话:批次结构、指标到校、征集志愿、跨区报考。",
    group: "教育",
    url: "https://baokao.keaimentor.com",
    stack: ["政策分析", "志愿策略"],
    featured: true,
    shot: "zhongkao-baokao.png",
  },
  {
    id: "zhongkao-shijuan",
    name: "中考全学科试卷分析",
    tagline: "辽宁中考 7 科模拟卷,用工程化 Harness 逐卷拆解、横向对比。",
    group: "教育",
    url: "https://zhongkao.keaimentor.com",
    stack: ["试卷分析", "7 科"],
    shot: "zhongkao-shijuan.png",
  },
];

export const workGroups: WorkGroup[] = [
  "Skill",
  "法律AI",
  "一人公司",
  "思维工具",
  "教育",
  "原创应用",
  "精选Fork",
];

export const featuredWorks = works.filter((w) => w.featured);
export const worksCount = works.length;
// 实际造过、但未逐一收录的应用远不止此数,用于"我造了 N+ 个应用"的展示
export const totalShippedApprox = 40;
