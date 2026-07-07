import type { Metadata } from "next";
import { Mail, ArrowUpRight, Check } from "lucide-react";
import { trainingCourses } from "@/data/courses-training";

export const metadata: Metadata = {
  title: "AI 培训",
  description:
    "珂交付过的真实 AI 培训课程:货代智能体、企业级 AI 工作流(Dify)、高校 AI 实战、法律合规。从认知到实战,让人真的把 AI 用起来。",
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
          我不只自己玩,也把这套「动手玩 AI」的方法带给团队与院校。下面是我真实交付过的课程——理论少、实操多,目标只有一个:
          <span className="font-semibold text-[color:var(--color-ink)]">让人当天就把 AI 用起来。</span>课程均可按行业与团队水平定制。
        </p>
      </header>

      <div className="mt-4">
        {trainingCourses.map((c, i) => (
          <div
            key={c.id}
            className="grid gap-6 border-b border-[color:var(--color-line)] py-12 md:grid-cols-[3rem_1fr]"
          >
            <span className="mono text-sm text-[color:var(--color-flame)]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">{c.title}</h2>
              <p className="mt-1 text-lg text-[color:var(--color-ink-soft)]">{c.subtitle}</p>

              {/* 元信息 */}
              <dl className="mono mt-5 grid gap-x-8 gap-y-2 text-xs text-[color:var(--color-muted)] sm:grid-cols-2 lg:grid-cols-4">
                <div><dt className="text-[color:var(--color-line-strong)]">受众</dt><dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{c.audience}</dd></div>
                <div><dt className="text-[color:var(--color-line-strong)]">时长</dt><dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{c.duration}</dd></div>
                {c.platform && <div><dt className="text-[color:var(--color-line-strong)]">平台</dt><dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{c.platform}</dd></div>}
                <div><dt className="text-[color:var(--color-line-strong)]">行业</dt><dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{c.industry}</dd></div>
              </dl>

              {/* 亮点 */}
              <ul className="mt-6 space-y-2">
                {c.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-[15px] text-[color:var(--color-ink-soft)]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-flame)]" /> {h}
                  </li>
                ))}
              </ul>

              {/* 模块 */}
              <div className="mt-6 grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
                {c.modules.map((m, mi) => (
                  <div key={m.title} className="bg-[color:var(--color-paper)] p-4">
                    <div className="mono mb-1.5 text-[11px] text-[color:var(--color-muted)]">
                      M{mi + 1}
                    </div>
                    <h3 className="text-sm font-bold text-[color:var(--color-ink)]">{m.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[color:var(--color-muted)]">
                      {m.points.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-start gap-4 bg-[color:var(--color-ink)] p-8 text-[color:var(--color-paper)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="display text-2xl font-bold">想给你的团队 / 学院做一场 AI 培训?</h2>
          <p className="mt-1 text-[color:var(--color-paper)]/70">课程按行业、团队水平与时长定制。聊聊你的需求。</p>
        </div>
        <a href="mailto:wang.manmonth@gmail.com?subject=AI培训咨询" className="inline-flex shrink-0 items-center gap-2 border border-[color:var(--color-flame)] bg-[color:var(--color-flame)] px-6 py-3 text-sm font-semibold text-white">
          <Mail className="h-4 w-4" /> 预约咨询 <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
