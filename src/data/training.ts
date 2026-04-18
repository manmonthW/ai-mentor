import type { TrainingProgram } from "@/types";

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "tp1",
    title: "通用AI赋能课程体系",
    description: "面向所有行业从业者的AI基础能力提升课程，从认知到实战",
    industry: "通用",
    level: "入门-进阶",
    slug: "general",
    modules: [
      {
        id: "tp1-m1",
        title: "AI认知与趋势",
        description: "理解AI发展现状与未来趋势",
        lessons: ["AI发展简史", "大模型原理概述", "AI行业全景图", "AI对各行业的影响"],
      },
      {
        id: "tp1-m2",
        title: "AI工具实战",
        description: "掌握主流AI工具的使用方法",
        lessons: ["ChatGPT/Claude高效使用", "AI图像生成实战", "AI视频制作", "AI办公效率提升"],
      },
      {
        id: "tp1-m3",
        title: "提示词工程",
        description: "系统学习提示词设计方法论",
        lessons: ["提示词基础框架", "角色设定与场景构建", "链式思维提示", "提示词优化技巧"],
      },
      {
        id: "tp1-m4",
        title: "AI应用开发入门",
        description: "从零开始开发AI应用",
        lessons: ["API调用基础", "AI Agent概念与实践", "RAG知识库搭建", "AI应用部署"],
      },
    ],
  },
  {
    id: "tp2",
    title: "教培行业AI转型课程",
    description: "专为教育培训行业设计的AI赋能课程，助力教培机构数字化转型",
    industry: "教培",
    level: "入门-进阶",
    slug: "education",
    modules: [
      {
        id: "tp2-m1",
        title: "AI+教育趋势",
        description: "教育行业AI应用现状与趋势",
        lessons: ["AI教育产品全景", "个性化学习与AI", "AI助教与智能批改", "教培行业AI案例"],
      },
      {
        id: "tp2-m2",
        title: "AI教学工具实战",
        description: "教培场景下的AI工具应用",
        lessons: ["AI课件生成", "智能题库构建", "AI学情分析", "AI辅助备课"],
      },
    ],
  },
  {
    id: "tp3",
    title: "物流行业AI应用课程",
    description: "面向物流行业的AI赋能课程，提升物流运营效率",
    industry: "物流",
    level: "入门-进阶",
    slug: "logistics",
    modules: [
      {
        id: "tp3-m1",
        title: "AI+物流概览",
        description: "物流行业AI应用现状与机遇",
        lessons: ["智慧物流全景图", "AI路径优化", "智能仓储管理", "物流AI案例分析"],
      },
      {
        id: "tp3-m2",
        title: "物流AI工具实战",
        description: "物流场景下的AI工具应用",
        lessons: ["AI需求预测", "智能调度系统", "AI客服与工单", "数据分析与可视化"],
      },
    ],
  },
];
