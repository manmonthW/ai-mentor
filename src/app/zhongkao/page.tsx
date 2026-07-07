import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "中考 AI",
  description: "用 AI 帮家长和孩子搞懂中考:2026 大连中考志愿报考指南、中考全学科试卷分析。",
};

const projects = [
  {
    id: "baokao",
    name: "2026 大连中考报考指南",
    url: "https://baokao.keaimentor.com",
    tagline: "把复杂的志愿政策讲成人话,帮家长少走弯路。",
    points: [
      "批次结构梳理:普通高中 A/B/C/D 段 + 职业院校征集志愿,一张图看懂",
      "三大关键机制:指标到校(普通学生进名校的核心通道)、征集志愿(兜底)、跨区报考",
      "政策深度分析 + 志愿填报策略参考",
    ],
  },
  {
    id: "shijuan",
    name: "中考全学科试卷分析",
    url: "https://zhongkao.keaimentor.com",
    tagline: "辽宁中考 7 科模拟卷,用工程化的方式逐卷拆解。",
    points: [
      "覆盖语文 / 数学 / 英语 / 物理 / 化学 / 历史 / 道法 七科",
      "Harness 架构:Schema 先行、逐卷独立验证、质量门禁不可跳过",
      "单卷分析 → 学科汇总 → 横向对比 → 全站整合",
    ],
  },
];

export default function ZhongkaoPage() {
  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">用 AI 解决真实需求 / EDUCATION</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">
          中考 AI
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          「玩 AI」不只是造酷东西,也可以很实在——比如帮家长搞懂中考志愿政策、帮孩子把各科模拟卷吃透。这是我用 AI 做的两件和中考有关的事。
        </p>
      </header>

      <div className="mt-4">
        {projects.map((p, i) => (
          <div key={p.id} className="grid gap-6 border-b border-[color:var(--color-line)] py-12 md:grid-cols-[3rem_1fr]">
            <span className="mono text-sm text-[color:var(--color-flame)]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">{p.name}</h2>
              <p className="mt-1 text-lg text-[color:var(--color-ink-soft)]">{p.tagline}</p>
              <ul className="mt-5 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-[15px] text-[color:var(--color-ink-soft)]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-flame)]" /> {pt}
                  </li>
                ))}
              </ul>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="ulink mt-6 text-sm">
                在线体验 <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
