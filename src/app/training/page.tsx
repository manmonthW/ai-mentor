import type { Metadata } from "next";
import { Mail, ArrowUpRight } from "lucide-react";
import { trainingPrograms } from "@/data/training";

export const metadata: Metadata = {
  title: "AI 培训",
  description: "面向企业与机构的行业 AI 赋能培训:通用、教培、物流。从认知到实战。",
};

export default function TrainingPage() {
  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">变现 / TRAINING</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">
          行业 AI 赋能培训
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          我不只自己玩,也把这套「动手玩 AI」的方法带给团队。课程从认知讲到实战,针对不同行业量身设计——目标只有一个:让人真的把 AI 用起来。
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {trainingPrograms.map((p, i) => (
          <div key={p.id} className="grid gap-6 border-t border-[color:var(--color-line-strong)] pt-8 md:grid-cols-[3rem_1fr]">
            <span className="mono text-sm text-[color:var(--color-flame)]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="mono mb-2 text-xs text-[color:var(--color-muted)]">{p.industry} · {p.level}</div>
              <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">{p.title}</h2>
              <p className="mt-2 text-[color:var(--color-ink-soft)]">{p.description}</p>
              <div className="mt-6 grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2">
                {p.modules.map((m) => (
                  <div key={m.id} className="bg-[color:var(--color-paper)] p-5">
                    <h3 className="font-bold text-[color:var(--color-ink)]">{m.title}</h3>
                    <p className="mt-1 text-sm text-[color:var(--color-muted)]">{m.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.lessons.map((l) => (
                        <span key={l} className="mono border border-[color:var(--color-line)] px-2 py-0.5 text-[11px] text-[color:var(--color-ink-soft)]">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start gap-4 border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] p-8 text-[color:var(--color-paper)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="display text-2xl font-bold">想给你的团队做一场 AI 培训?</h2>
          <p className="mt-1 text-[color:var(--color-paper)]/70">课程可按行业与团队水平定制。</p>
        </div>
        <a href="mailto:wang.manmonth@gmail.com?subject=AI培训咨询" className="inline-flex shrink-0 items-center gap-2 border border-[color:var(--color-flame)] bg-[color:var(--color-flame)] px-6 py-3 text-sm font-semibold text-white">
          <Mail className="h-4 w-4" /> 预约咨询 <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
