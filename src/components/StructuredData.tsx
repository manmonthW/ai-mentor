// 站点级结构化数据(JSON-LD)。帮助搜索引擎与 AI 答案引擎理解「王珂 / 珂以这样玩AI」这个实体。

const SITE_URL = "https://www.keaimentor.com";

const data = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "王珂",
    alternateName: "珂以这样玩AI",
    url: SITE_URL,
    jobTitle: "独立 AI 造物者 / 法律 AI 与 AI 培训",
    description:
      "王珂,独立 AI 造物者,法律人出身。用 AI 把想法当天变成产品,已上线 40+ 个 AI 应用;做法律 AI、一人公司工具、Agent Skill 蒸馏与行业 AI 培训。",
    knowsAbout: [
      "人工智能应用",
      "Claude Skill 与 Agent",
      "法律 AI",
      "裁判文书分析",
      "一人公司",
      "AI 培训",
      "独立开发",
    ],
    sameAs: ["https://github.com/manmonthW"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "珂以这样玩AI",
    alternateName: "王珂个人站",
    url: SITE_URL,
    inLanguage: "zh-CN",
    description:
      "珂以这样玩AI —— 王珂的个人品牌站:作品墙、Skill 蒸馏、法律 AI、一人公司、AI 培训与造物记。",
    author: { "@type": "Person", name: "王珂" },
  },
];

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
