export type Film = {
  id: string;
  title: string;
  kind: string;
  style: string;
  duration: string;
  description: string;
};

// 成片放在 public/films/{id}.mp4,海报 public/films/{id}-poster.jpg
export const films: Film[] = [
  {
    id: "keyi-opener",
    title: "珂以这样玩AI",
    kind: "开场片",
    style: "瑞士动态排版",
    duration: "0:18",
    description: "一刀切掉「可」,唯一不守网格的朱红方块落进缺口,变成「珂」。读音不变,意思变了。",
  },
  {
    id: "keyi-distill",
    title: "Skill 蒸馏",
    kind: "科普短片",
    style: "白板讲解",
    duration: "1:09",
    description: "一本三百页的书,真正有用的只有一滴。女娲蒸馏一个人,仓颉蒸馏一本书,装进 AI 随时能用的 Skill。",
  },
  {
    id: "keyi-keynote",
    title: "40+",
    kind: "发布片",
    style: "暗色科技发布",
    duration: "0:47",
    description: "四十多个 AI 应用,一个人做的。每一个都从一个想法开始,早上九点想到,晚上六点上线。",
  },
];
