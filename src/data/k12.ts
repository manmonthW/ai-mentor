// 中小学 AI 课程体系 —— 3-9 年级 · 208 课时
// 依据本地设计文档(AI启蒙课程设计更新方案3-6年级 / 初中7-9年级人工智能课外拓展课程体系设计)
// 网站上只展示可公开的骨架层级信息, 具体课件与研究报告走 CTA 邮件对接。

export interface K12Principle {
  k: string;   // "01"
  t: string;   // 中文标题
  en: string;  // 英文小标
  d: string;   // 说明
  ratio?: string; // 展示比例, 仅原则 01 用
}

export interface K12Grade {
  code: string;        // "G3"
  gradeCN: string;     // "三年级"
  stage: string;       // 阶段定位
  cognition: string;   // 认知特征
  carriers: string[];  // 关键载体
  semesters: {
    label: string;     // "第 1 学期"
    theme: string;     // "编码物理世界"
    brief: string;     // 一句话概述
  }[];
}

export interface K12Semester {
  code: string;      // "7 上"
  theme: string;     // 主题
  goal: string;      // 教学目标
  project: string;   // 代表性项目
  tools: string[];   // 推荐工具
}

export interface K12Deliverable {
  k: string;
  t: string;
  d: string;
}

// ── 顶部数字栏 ──────────────────────────────────────
export const k12Stats = {
  grades: "3-9",
  totalHours: 208,
  elementaryHours: 112,
  juniorHours: 96,
  themes: 6,
};

// ── 三大设计原则 ────────────────────────────────────
export const k12Principles: K12Principle[] = [
  {
    k: "01",
    t: "黄金比例",
    en: "GOLDEN RATIO",
    ratio: "10 / 70 / 20  ·  20 / 60 / 20",
    d: "小学阶段 10% 技术原理 + 70% 场景应用 + 20% 数字素养; 初中阶段 20% 技术理解 + 60% 应用实践 + 20% 思维素养。技术不重, 应用做透, 素养渗透——把课时用在真的能长出计算思维的地方。",
  },
  {
    k: "02",
    t: "四阶螺旋进阶",
    en: "SPIRAL PROGRESSION",
    d: "感性体验(G3) → 交互逻辑(G4) → 算法感知(G5) → 系统创新(G6)。初中六学期以「用 → 懂 → 造」为主轴, 从 AI 使用者走向初步创造者。每一阶都对上皮亚杰认知阶段, 不越级、不脱节。",
  },
  {
    k: "03",
    t: "国产工具优先",
    en: "LOCAL-FIRST STACK",
    d: "主线走飞桨 EasyDL / 科大讯飞 / 华为 MindSpore / 慧编程等国产平台, 贴合课堂语言环境与合规要求; 同时以 Scratch / Teachable Machine / TensorFlow 作国际参照。技术向善的价值观从工具选择开始培育。",
  },
];

// ── 四大核心素养 (2022 新课标) ──────────────────────
export const k12Literacies = [
  { t: "信息意识", d: "对数据的敏感与判断——理解数据是 AI 的燃料" },
  { t: "计算思维", d: "抽象、分解、建模、算法设计的一般思维方式" },
  { t: "数字化学习与创新", d: "从技术消费者走向技术创造者" },
  { t: "信息社会责任", d: "隐私、版权、算法偏见——数字公民的伦理底线" },
];

// ── 小学 3-6 年级 (112 课时 / 8 学期) ────────────────
export const elementaryGrades: K12Grade[] = [
  {
    code: "G3",
    gradeCN: "三年级",
    stage: "感性体验与逻辑启蒙",
    cognition: "具体运算阶段",
    carriers: ["无屏编程 Unplugged", "实物编程机器人", "MatataLab / Tale-Bot"],
    semesters: [
      {
        label: "第 1 学期",
        theme: "编码物理世界",
        brief: "不插电 CS + 实物编程: 用肢体与卡片理解「算法」「循环」「二进制」, 让机器人在网格地图上走出几何图形。",
      },
      {
        label: "第 2 学期",
        theme: "数据侦探与数字初体验",
        brief: "从物理走向数字: 数据采集与整理、图表制作、图形化编程入门(编程猫 Nemo / Scratch Jr)。",
      },
    ],
  },
  {
    code: "G4",
    gradeCN: "四年级",
    stage: "交互逻辑与模块构建",
    cognition: "过渡阶段",
    carriers: ["Scratch / 慧编程", "多媒体互动作品", "基本传感器"],
    semesters: [
      {
        label: "第 1 学期",
        theme: "交互式多媒体作品",
        brief: "掌握顺序 / 循环 / 分支三大结构, 用图形化编程做小游戏、动画与互动故事。",
      },
      {
        label: "第 2 学期",
        theme: "AI 扩展模块初体验",
        brief: "接触慧编程 / Scratch 的 AI 扩展块——摄像头识别、语音合成, 感受「编程可以让 AI 动起来」。",
      },
    ],
  },
  {
    code: "G5",
    gradeCN: "五年级",
    stage: "算法感知与智能控制",
    cognition: "形式运算初期",
    carriers: ["机器学习平台", "Micro:bit + 传感器", "开源硬件"],
    semesters: [
      {
        label: "第 1 学期",
        theme: "训练你的第一个 AI 模型",
        brief: "用 Teachable Machine / 飞桨 EasyDL 训练图像 / 声音分类模型, 理解「数据 → 训练 → 使用」的机器学习闭环。",
      },
      {
        label: "第 2 学期",
        theme: "智能硬件与物联网",
        brief: "Micro:bit + 传感器搭建智能小系统(智能灯、智能垃圾桶), 软硬结合。",
      },
    ],
  },
  {
    code: "G6",
    gradeCN: "六年级",
    stage: "系统创新与未来伦理",
    cognition: "形式运算成熟期",
    carriers: ["生成式 AI(AIGC)", "综合性 PBL 项目", "社会议题研究"],
    semesters: [
      {
        label: "第 1 学期",
        theme: "AIGC 创作",
        brief: "用文生图 / 文生视频工具创作数字作品, 讨论版权归属与真伪判断。",
      },
      {
        label: "第 2 学期",
        theme: "AI 综合项目与社会责任",
        brief: "小组 PBL: 智慧校园 / 无障碍助手 / 环境监测选题, 完整走一遍从需求到部署的过程。",
      },
    ],
  },
];

// ── 初中 7-9 年级 (96 课时 / 6 学期) ─────────────────
export const juniorHighSemesters: K12Semester[] = [
  {
    code: "7 上",
    theme: "AI 初体验 · 人工智能与生活",
    goal: "认识 AI 概念与发展史, 建立对 AI 能力边界的正确认识, 激发探索兴趣。",
    project: "AI 垃圾分类小助手——分组采集图片, 用飞桨 EasyDL / Teachable Machine 训练模型, 在 Scratch 里做成互动程序。",
    tools: ["百度飞桨 EasyDL", "科大讯飞", "MIT Scratch AI 扩展"],
  },
  {
    code: "7 下",
    theme: "智能感知与人机交互",
    goal: "理解机器视觉与语音识别的基本原理, 制作交互式 AI 小作品。",
    project: "语音控制智能家居——讯飞语音 API + Scratch 编程, 进阶用 Micro:bit 控制真实灯与蜂鸣器。",
    tools: ["科大讯飞", "百度 AI 视觉", "Micro:bit / Arduino"],
  },
  {
    code: "8 上",
    theme: "知识表示与智能推理",
    goal: "理解知识图谱、规则推理与搜索算法的基本思想。",
    project: "校园百科智能问答——构建小型知识库, 结合大模型做检索增强(RAG)雏形。",
    tools: ["阿里通义", "知识图谱工具", "简易 RAG 平台"],
  },
  {
    code: "8 下",
    theme: "机器学习基础",
    goal: "掌握「数据 → 特征 → 训练 → 评估」的机器学习基本流程, 理解过拟合与数据偏见。",
    project: "图像识别模型训练与部署——数据集构建、训练调参、评估指标、部署到 Web 或硬件。",
    tools: ["百度飞桨 EasyDL", "Teachable Machine", "华为 MindSpore"],
  },
  {
    code: "9 上",
    theme: "神经网络与深度学习原理",
    goal: "认识神经元、层与训练的基本原理, 通俗理解深度学习「为什么能行」。",
    project: "手写数字识别——从可视化神经网络到自己训练一个小型 CNN, 理解卷积与池化。",
    tools: ["华为 MindSpore", "TensorFlow Playground", "飞桨 AI Studio"],
  },
  {
    code: "9 下",
    theme: "AI 综合应用与社会责任",
    goal: "综合运用前五学期能力完成创新项目, 深度思考 AI 伦理与人机关系。",
    project: "综合创新项目(选题制)——教育 / 医疗 / 环保 / 无障碍方向, 完整产出可演示的 AI 作品并做社会影响评估。",
    tools: ["前五学期全部工具", "AIGC 创作平台", "开源硬件"],
  },
];

// ── 交付形态 ───────────────────────────────────────
export const k12Deliverables: K12Deliverable[] = [
  {
    k: "01",
    t: "完整体系方案",
    d: "3-9 年级教学目标、进阶路线、比例设计与依据的完整方案文档, 对齐 2022 新课标。",
  },
  {
    k: "02",
    t: "分学段可授课件",
    d: "小学各年级、初中各学期的 PPT 课件与教师讲义, 可直接进课堂或做校本改编。",
  },
  {
    k: "03",
    t: "教师培训 / 备课支持",
    d: "面向学校信息科技教师的师训, 从新课标解读到 AI 工具实操, 帮助教师站上讲台。",
  },
  {
    k: "04",
    t: "校本课程共建 / 内训",
    d: "根据学校资源、地方特色与学生水平定制校本课程, 或为教育机构做体系化内训。",
  },
];
