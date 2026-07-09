// 真实交付过的 AI 培训课程(客户/机构/人名已全部脱敏)。

export type TrainingTrack = "enterprise" | "university";

export interface TrainingCourse {
  id: string;
  title: string;
  subtitle: string;
  track: TrainingTrack; // 培训方向
  audience: string; // 受众
  duration: string; // 时长
  platform?: string; // 用到的平台
  industry: string; // 行业标签
  highlights: string[]; // 亮点(2-3 条)
  modules: { title: string; points: string[] }[];
  featured?: boolean;
}

export const trainingCourses: TrainingCourse[] = [
  {
    id: "coze-freight",
    title: "货代行业智能体应用培训",
    subtitle: "一天,让每个学员带走 3 个能干活的智能体",
    track: "enterprise",
    audience: "货代公司业务 / 管理人员(多家公司混编)",
    duration: "1 天 · 约 6 小时",
    platform: "扣子 Coze(零代码、免费可用)",
    industry: "物流 / 货代",
    featured: true,
    highlights: [
      "理论 ≤ 25%,实操 ≥ 75%——讲师演示一步、学员跟做一步,当堂跑通",
      "销售(答疑)→ 服务(订单跟踪)→ HR(招聘初筛)三大场景闭环",
      "用通用平台搭建,散会即可在公司复用,不依赖任何一家企业内部系统",
    ],
    modules: [
      { title: "AI / 智能体认知", points: ["会聊天 vs 会干活", "智能体三件套:提示词 + 知识库 + 工作流", "货代行业能落地在哪"] },
      { title: "Coze 入门 + 提示词速成", points: ["零代码平台上手", "提示词四要素", "现场搭第一个机器人"] },
      { title: "销售场景智能体", points: ["FOB/CIF、舱位、清关答疑", "挂知识库", "跟我做当堂跑通"] },
      { title: "服务场景 · 订单跟踪", points: ["箱号 / 订单状态查询", "工作流编排", "多轮对话"] },
      { title: "HR 招聘智能体", points: ["简历初筛", "结构化输出", "岗位匹配"] },
      { title: "发布 + 数据安全 + 落地清单", points: ["发布渠道", "数据边界与安全", "回公司落地清单"] },
    ],
  },
  {
    id: "enterprise-dify",
    title: "从 ChatGPT 到企业级 AI 工作流",
    subtitle: "基于 Dify 的智能体与工作流实战",
    track: "enterprise",
    audience: "某软件开发团队",
    duration: "2 天 · 12 学时(可扩展至 3 天)",
    platform: "Dify(可私有化部署)",
    industry: "软件 / 企业",
    featured: true,
    highlights: [
      "理论讲解 + 现场演示 + 分组实战,学员在企业内网平台上真刀真枪做",
      "企业 AI 三层架构:大模型 → 编排层(Dify)→ 业务落地",
      "从高频重复场景切入,小步快跑、持续迭代,而非全员先学 Python",
    ],
    modules: [
      { title: "AI 全景认知导入", points: ["大模型能力演进", "从对话到 Agent、从个人到企业", "落地误区与正确路径"] },
      { title: "Prompt Engineering 实战", points: ["角色 / 任务 / 约束 / 输出格式", "开发场景模板库:代码生成、审查、测试用例", "优化前后效果对比"] },
      { title: "Dify 工作流搭建", points: ["可视化编排", "知识库 / RAG", "多节点串联"] },
      { title: "企业级 Agent 与集成", points: ["工具调用", "接内部系统", "分组实战项目"] },
      { title: "落地、治理与安全", points: ["权限与数据边界", "评测与迭代", "团队推广路径"] },
    ],
  },
  {
    id: "univ-ai-practice",
    title: "面向某大学的 AI 实战课程",
    subtitle: "产教融合,围绕港口、航运、物流方向",
    track: "university",
    audience: "人工智能相关学院学生",
    duration: "学期课 · 项目制",
    industry: "教育 / 高校",
    featured: true,
    highlights: [
      "在已有 AI 理论教学基础上,补「AI 在企业实际工作中如何应用」这一环",
      "真实问题驱动、真实项目交付,学生做出可运行成果而非只观摩",
      "先通用后专业:前期覆盖通用 AI 应用,后期聚焦行业方向做专业化实践",
    ],
    modules: [
      { title: "AI 认知与提示词工程", points: ["大模型对话基础", "提示词方法", "职场高频用法"] },
      { title: "办公场景 AI", points: ["文档 / PPT / 海报", "数据处理与图表", "会议纪要"] },
      { title: "零代码智能体搭建", points: ["平台操作", "知识库", "工作流"] },
      { title: "行业专业化实践", points: ["港口 / 航运 / 物流案例", "小组项目", "成果展示"] },
    ],
  },
  {
    id: "legal-compliance",
    title: "法律合规与风险防控 · AI 培训",
    subtitle: "面向法务 / 合规团队,把 AI 用在真正专业的地方",
    track: "enterprise",
    audience: "企业法务、合规人员",
    duration: "0.5 – 1 天 · 可定制",
    industry: "法律 / 合规",
    highlights: [
      "由法律背景讲师授课,内容紧贴法务真实工作,而非泛泛的 AI 通识",
      "结合自研的裁判文书分析、合同审阅等法律 AI 工具现场演示",
      "覆盖数据与隐私、反商业贿赂、知识产权保密等合规红线",
    ],
    modules: [
      { title: "合规三大红线", points: ["数据与隐私保护", "反商业贿赂与利益冲突", "知识产权与保密"] },
      { title: "AI 辅助合同审阅", points: ["条款抽取", "风险点提示", "审阅提效"] },
      { title: "裁判文书 / 案例分析", points: ["要素拆解", "法律依据定位", "批量研判"] },
      { title: "风险防控落地", points: ["使用边界", "内部规范", "工具清单"] },
    ],
  },
];
