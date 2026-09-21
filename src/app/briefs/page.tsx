import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { briefs } from "@/data/briefs";

export const metadata: Metadata = {
  title: "珂的非官方整理｜AI 速递",
  description: "珂的非官方整理：保留来源边界的结构化摘要与评论。",
};

export default function BriefsPage() {
  const sortedBriefs = [...briefs].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">珂的非官方整理 / STRUCTURED BRIEFS</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-none text-[color:var(--color-ink)]">
          珂的非官方整理<br /><span className="flame">AI 速递</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          保留来源边界，区分原摘要与扩展解读。不是信息搬运，而是一份可追溯的阅读索引。
        </p>
      </header>

      <div className="mt-4 border-t border-[color:var(--color-line-strong)]">
        {sortedBriefs.map((brief, index) => (
          <Link
            key={brief.date}
            href={`/briefs/${brief.date}`}
            className="group grid gap-4 border-b border-[color:var(--color-line)] py-9 md:grid-cols-[4rem_10rem_1fr_auto] md:items-baseline md:gap-8"
          >
            <span className="mono text-sm text-[color:var(--color-flame)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="mono text-xs text-[color:var(--color-muted)]">{brief.date}</span>
            <div>
              <h2 className="display text-3xl font-bold text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-flame)]">
                {brief.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-[color:var(--color-ink-soft)]">{brief.description}</p>
              <p className="eyebrow mt-4">{brief.items.length} ITEMS · SOURCE-BOUNDED</p>
            </div>
            <ArrowUpRight className="hidden h-6 w-6 text-[color:var(--color-muted)] group-hover:text-[color:var(--color-flame)] md:block" />
          </Link>
        ))}
      </div>
    </div>
  );
}
