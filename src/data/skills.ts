import type { Skill } from "@/types";

export const skills: Skill[] = [
  // 母 Skill — 创造器
  {
    id: "s-nuwa",
    name: "女娲 Skill",
    description: "蒸馏任何人的思维方式——心智模型、决策启发式、表达DNA。你想蒸馏的下一个员工，何必是同事。",
    category: "创作类",
    platform: "通用",
    githubUrl: "https://github.com/manmonthW/nuwa-skill",
    tags: ["名人蒸馏", "心智模型", "Skill生成器"],
    featured: true,
  },
  {
    id: "s-cangjie",
    name: "仓颉 Skill",
    description: "把一本书蒸馏成一组可执行的 Agent Skills，古今中外经典名著皆可转化",
    category: "创作类",
    platform: "通用",
    githubUrl: "https://github.com/manmonthW/cangjie-skill",
    tags: ["名著蒸馏", "知识提取", "Skill生成器"],
    featured: true,
  },

  // 工具类 Skill
  {
    id: "s-plan-files",
    name: "Plan with Files",
    description: "研究代码库并创建带文件引用的详细实施计划",
    category: "工具类",
    platform: "kiro",
    tags: ["规划", "代码分析", "实施计划"],
    featured: true,
  },
  {
    id: "s-termux-openclaw",
    name: "Termux OpenClaw Android",
    description: "在Android上安装Termux + OpenClaw并连接WhatsApp（含中国GFW绕过）",
    category: "工具类",
    platform: "claude-code",
    githubUrl: "https://github.com/manmonthW/termux-openclaw-android",
    tags: ["Android", "OpenClaw", "WhatsApp"],
    featured: false,
  },
  {
    id: "s-wechat-article",
    name: "微信公众号文章 Skill",
    description: "微信公众号文章创作与发布流程 Skill",
    category: "工具类",
    platform: "claude-code",
    githubUrl: "https://github.com/manmonthW/wechat_article_skills",
    tags: ["微信", "公众号", "内容创作"],
    featured: false,
  },
  {
    id: "s-youtube-clipper",
    name: "Youtube Clipper Skill",
    description: "YouTube视频剪辑与内容提取 Skill",
    category: "工具类",
    platform: "claude-code",
    githubUrl: "https://github.com/manmonthW/Youtube-clipper-skill",
    tags: ["YouTube", "视频剪辑", "内容提取"],
    featured: false,
  },
  {
    id: "s-custom-wraps",
    name: "Custom Wraps",
    description: "自定义包装 Skill 模板",
    category: "工具类",
    platform: "通用",
    githubUrl: "https://github.com/manmonthW/custom-wraps",
    tags: ["模板", "自定义", "包装"],
    featured: false,
  },
  {
    id: "s-skills-repo",
    name: "Skills 公共仓库",
    description: "公共 Skills 仓库集合，包含多种可复用 Skill",
    category: "其他",
    platform: "通用",
    githubUrl: "https://github.com/manmonthW/skills",
    tags: ["合集", "公共仓库", "可复用"],
    featured: false,
  },
  {
    id: "s-frontend-slides",
    name: "Frontend Slides Skill",
    description: "使用Claude前端能力在Web上创建精美幻灯片",
    category: "工具类",
    platform: "claude-code",
    githubUrl: "https://github.com/manmonthW/frontend-slides",
    tags: ["幻灯片", "前端", "演示"],
    featured: false,
  },

  // 名人系列（女娲衍生 — 待扩展）
  // 经典名著系列（仓颉衍生 — 待扩展）
];
