export type BriefEvidenceLevel = "full_text" | "title_only";

export interface BriefItem {
  id: string;
  category: "生成式 AI" | "前沿科技" | "报告观点";
  title: string;
  tencentSummary: string[];
  interpretation: string;
  whyItMatters: string;
  evidenceLevel: BriefEvidenceLevel;
  checkedAt: string;
  sourceTitle: string;
  sourceUrl: string;
}

export interface Brief {
  date: string;
  title: string;
  description: string;
  sourceUrl: string;
  evidenceNote: string;
  copyrightNotice: string;
  items: BriefItem[];
}

export const briefs: Brief[] = [
  {
    date: "2026-09-21",
    title: "珂的非官方整理：腾讯研究院 AI 速递 20260921",
    description: "从判断模型、图像生成与网页评测，到家庭机器人和 AI 创业：9 条动态的结构化阅读样板。",
    sourceUrl: "https://mp.weixin.qq.com/s/T4DrR5-t0XpPeehtZbNPKg",
    evidenceNote: "证据读取层级记录本站实际读取范围：本期 9 条均已读取正文；已读取正文不等于独立交叉核验。",
    copyrightNotice: "基于腾讯研究院公开主文和关联原文的短摘要与评论，版权归原作者，链接回原文。",
    items: [
      {
        id: "jev-judgment-model",
        category: "生成式 AI",
        title: "判断模型 Jev 出圈实测，40 秒完成 724 条广告分类",
        tencentSummary: [
          "Jev 被定位为 System One 判断模型，可快速返回 Noul、Choice、Score 等结构化结果与概率。",
          "开发者约 40 秒分析 37 个品牌、724 条实时广告，产生 8724 次判断；摘要称 Token 成本约 9 美分。",
          "腾讯摘要还提到它可用于压缩 Claude Code 上下文，以及浏览器 Agent 的读页、候选动作与选型循环。",
        ],
        interpretation: "这条动态强调的不是生成更多文字，而是把模型缩窄成低延迟、可校准的判断部件。若摘要中的实测条件成立，它更像 Agent 工作流里的分类器或路由器，而不是聊天模型替代品。",
        whyItMatters: "Agent 要连续执行大量小判断，延迟、成本和结构化输出往往比长文本能力更关键；专用判断模型因此提供了另一种系统拆分方式。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "刷屏了！前 OpenAI 研究员做的 Jev，大家为啥抢着用？",
        sourceUrl: "https://mp.weixin.qq.com/s/rphPh91aHpcOovORbAo2Kw",
      },
      {
        id: "qwen-image-2-1",
        category: "生成式 AI",
        title: "Qwen-Image-2.1 开源，7B 模型原生支持透明图像",
        tencentSummary: [
          "阿里开源 Qwen-Image-2.1，将文生图与图像编辑整合进同一模型；视觉生成部分为 32 层 Single-Stream DiT、7B 参数。",
          "摘要称模型采用混合粒度注意力与 KV Cache 复用机制，以改善多图输入时的推理效率和显存开销。",
          "编辑能力支持最多 10 张参考图，并可用圈选、涂抹或独立掩码指定区域。",
        ],
        interpretation: "透明图像与多参考图编辑把模型从单张成图工具推向可组合的设计工作流；本站已读取关联原文正文，但架构和能力数字仍按原文与腾讯摘要呈现，未作独立交叉核验。",
        whyItMatters: "对电商、品牌物料和演示文稿而言，透明背景、局部编辑和主体一致性直接决定生成结果能否进入后续排版，而不只是用于展示。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "Qwen-Image-2.1 开源：轻量高能，创作编辑一体化",
        sourceUrl: "https://mp.weixin.qq.com/s/fQa_seXe03mm2f5ISqOHJQ",
      },
      {
        id: "step-5-preview",
        category: "生成式 AI",
        title: "阶跃发布 Step 5 Preview，摘要称成本为 Opus 5 的 1/8",
        tencentSummary: [
          "Step 5 Preview 被描述为总参数 600B、激活 27B 的稀疏 MoE 模型，支持 100 万 Token 上下文和文本、视觉输入。",
          "腾讯摘要称其在 Artificial Analysis 智能指数取得 44 分，单任务成本为 Claude Opus 5 的 1/8。",
          "摘要记录了一项约 22 小时的 MLA 内核优化任务，峰值性能达到 508 TFLOPS。",
        ],
        interpretation: "发布叙事把能力、上下文和推理成本放在同一个“效率前沿”中比较。本站已读取关联原文正文；榜单、成本和性能数字未作独立交叉核验。",
        whyItMatters: "大模型能否进入长周期工程任务，取决于能力之外的持续运行成本和上下文容量；这类指标会影响团队选择自部署还是 API。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "阶跃发布旗舰模型 Step 5 Preview：向前一步，智能效率的新一代“帕累托前沿”",
        sourceUrl: "https://mp.weixin.qq.com/s/WLnBfojjQHcuiqI6wteQUw",
      },
      {
        id: "webcraftbench",
        category: "生成式 AI",
        title: "腾讯混元推出 WebCraftBench，实测 AI 生成网页",
        tencentSummary: [
          "腾讯混元联合清华、北大提出 WebCraftBench，让智能体真实操作网页，并从美观度、易用性和需求符合度评分。",
          "摘要称基准包含 369 条真实需求、5088 条验收标准，并评测 17 个模型生成的 6273 个应用。",
          "在 197 组人类偏好对比中，摘要报告一致率为 85.3%，美观度与易用性的相关系数为 0.36。",
        ],
        interpretation: "它试图把网页生成评测从截图相似度推进到“能否操作、是否满足验收条件”。本站已读取关联原文正文，所有规模与指标仍保留为腾讯摘要与关联原文口径，未作独立交叉核验。",
        whyItMatters: "生成网页的真正失败常发生在交互和业务规则，而不是视觉层；可执行验收能更接近软件交付质量。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "WebCraftBench：给 AI 生成的网页来一场「实测大考」",
        sourceUrl: "https://mp.weixin.qq.com/s/KC71_44AnVQ9mnwBYJHGVA",
      },
      {
        id: "weknora",
        category: "生成式 AI",
        title: "微信团队开源 WeKnora，企业知识底座获 26.8K 星",
        tencentSummary: [
          "腾讯摘要称 WeKnora 以 MIT 协议开源，覆盖 RAG 问答、ReAct Agent 和自动 Wiki。",
          "检索层采用向量与 BM25 混合召回，并可结合知识图谱；支持编辑切片、重建索引、版本 diff 与回滚。",
          "v0.8.0 被摘要为新增会话级 Skill 沙箱与跨会话长期记忆，并可同步多种内容数据源。",
        ],
        interpretation: "摘要显示它把知识摄取、检索、Agent 和内容维护放进同一框架。本站已读取关联原文正文；Star 数、版本能力和协议均未作独立交叉核验。",
        whyItMatters: "企业 RAG 的瓶颈往往是知识更新、权限和可维护性，而非一次问答；可编辑切片与版本回滚面向的是长期运营。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "GitHub 26.8K Star！微信团队开源一套覆盖 RAG、Agent、自动 Wiki 的企业知识底座",
        sourceUrl: "https://mp.weixin.qq.com/s/dQucrl2On0yDS1wxzAcAQg",
      },
      {
        id: "qiyuan-q1-t1",
        category: "前沿科技",
        title: "启元发布 Q1 与 T1 两款家庭机器人，19999 元起",
        tencentSummary: [
          "Q1 与 T1 标准版均为 19999 元，Q1 探索版与 T1 Pro 版分别为 26999 元和 29999 元。",
          "Q1 身高 88 厘米、具备 22 个自由度，采用全身力控与防夹手设计，并开放 100 多项原子能力。",
          "T1 支持双足与四足形态切换；公司同时发布 PrimeMotion、PrimeGo、PrimeVista 三款模型。",
        ],
        interpretation: "子原文正文确认了价格、10 月 1 日起发货、Q1 尺寸与自由度，以及开放开发能力等信息。它把家庭陪伴、教育内容和开发者平台放在同一消费硬件中。",
        whyItMatters: "万元级定价与 SDK/HDK 开放意味着家庭机器人开始同时争夺消费者和开发者；实际价值仍需等待交付后的可靠性与应用生态检验。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "10 岁小孩姐，都能轻松给机器人编程！稚晖君连发两款万元级机器人",
        sourceUrl: "https://mp.weixin.qq.com/s/OFG-FkhmVDJ30VplYgLQZQ",
      },
      {
        id: "jake-wharton-ai-cost",
        category: "报告观点",
        title: "Jake Wharton 认为：AI 编程账单可能贵过程序员",
        tencentSummary: [
          "Jake Wharton 的求职准则包括不加入 AI 公司、不做 AI 核心产品，也不接受公司强制使用 AI。",
          "腾讯摘要转述其观点：生成式 AI 由资本补贴支撑，补贴退潮后编码工具账单可能高于工程师成本。",
          "他认为样板代码不是编程最难的部分，架构设计与长期维护才是核心。",
        ],
        interpretation: "子原文正文确认了他估计这项准则会放弃约 80% 的潜在机会，并展开了其对工具成本和工程工作的批评。这是个人判断与价值选择，不应读作行业成本结论。",
        whyItMatters: "它提醒采购方把补贴、按量计费、审查与维护成本纳入 AI 编程工具的总拥有成本，而不是只比较生成速度。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "狂裁 70% 工程师指望 AI 顶上？Android 之神算了一笔账",
        sourceUrl: "https://mp.weixin.qq.com/s/45mhPwu97oBIB0Ra3mcB3A",
      },
      {
        id: "yc-2026-review",
        category: "报告观点",
        title: "YC 2026 复盘：硬科技占比升至 20%，应用团队自训模型",
        tencentSummary: [
          "YC 近 12 至 18 个月数据被概括为：硬科技在录取公司中的占比从 8% 升至 20%。",
          "端到端完成任务的公司占比从约 10% 升至 25% 以上，加速营后 MRR 中位数接近 2 万美元。",
          "训练数据与 RL 环境成为新业务；单人创始人比例被摘要为从 5% 升至 18%。",
        ],
        interpretation: "子原文正文确认硬科技占比及机器人、制造、半导体、电力等细分变化，并将其解释为 AI 算力需求向物理产业栈传导。其数据来源是 YC 播客的机构自述。",
        whyItMatters: "如果资源从纯应用层转向算力、能源、制造和训练基础设施，创业机会与团队能力结构都会随之变化；但 YC 样本不等于整个市场。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "YC 2026 Startup 复盘：硬件、数据的都在挣钱，应用团队开始自己训模型了",
        sourceUrl: "https://mp.weixin.qq.com/s/tUOxFKGDGTweX193w_JCqA",
      },
      {
        id: "jev-founder-rlhf",
        category: "报告观点",
        title: "Jev 创始人：RLHF 是弯路，自主自动化才是下一程",
        tencentSummary: [
          "Diogo Almeida 认为大模型擅长有人在回路的协助任务，却不适合移出人类的自动化任务。",
          "他把幻觉与奖励模型对人类偏好的优化联系起来，并将 RLHF 称为一条“始料未及的弯路”。",
          "TypeSafe 选择 RLCD 路线，优化校准决策；腾讯摘要还给出 Jev 发布后的采用与克隆数据。",
        ],
        interpretation: "子原文正文完整呈现了 Almeida 关于“协助与自动化”的论证，以及他对 RLHF 目标函数的批评。这仍是创始人的技术主张，且同时服务于 Jev 的产品定位。",
        whyItMatters: "如果 Agent 的目标是无人值守执行，校准、不确定性表达和可审计决策会比语言流畅度更重要；这对模型训练目标提出了不同要求。",
        evidenceLevel: "full_text",
        checkedAt: "2026-09-21",
        sourceTitle: "Jev 模型创始人：RLHF 是一条弯路，下一个时代绝不是 Claude Code 时代",
        sourceUrl: "https://mp.weixin.qq.com/s/vwQB-j7eT25Wiz6ZJsiS3Q",
      },
    ],
  },
];

export function getBrief(date: string) {
  return briefs.find((brief) => brief.date === date);
}
