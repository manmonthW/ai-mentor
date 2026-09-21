import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getBrief } from "@/data/briefs";

const briefData = getBrief("2026-09-21");
if (!briefData) throw new Error("Brief 2026-09-21 is missing");
const brief = briefData;

export const metadata: Metadata = {
  title: brief.title,
  description: brief.description,
};

const status = {
  full_text: { label: "已读取正文", icon: CheckCircle2 },
  title_only: { label: "仅读取标题", icon: CheckCircle2 },
} as const;

export default function TencentBriefPage() {
  return (
    <article>
      <header className="border-b border-[color:var(--color-line)]">
        <div className="wrap py-14 sm:py-20">
          <Link href="/briefs" className="ulink mb-10 text-sm"><ArrowLeft className="h-4 w-4" /> 全部速递</Link>
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
            <div>
              <p className="eyebrow mb-5">珂的非官方整理 · {brief.date}</p>
              <h1 className="display max-w-4xl text-[clamp(2.7rem,7vw,5.6rem)] font-bold leading-[0.98] text-[color:var(--color-ink)]">
                珂的非官方整理<br /><span className="flame">AI 速递</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">{brief.description}</p>
            </div>
            <div className="border-l-2 border-[color:var(--color-flame)] pl-5">
              <div className="display text-5xl font-bold">09</div>
              <p className="eyebrow mt-2">ITEMS / 3 SECTIONS</p>
              <a href={brief.sourceUrl} target="_blank" rel="noopener noreferrer" className="ulink mt-5 text-sm">
                腾讯主文 <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="wrap py-10">
        <aside className="border border-[color:var(--color-line)] bg-[color:var(--color-paper-2)] p-5 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
          <strong className="text-[color:var(--color-ink)]">证据读取口径：</strong>{brief.evidenceNote}
          <p className="mt-3">{brief.copyrightNotice}</p>
        </aside>

        <div className="mt-12">
          {brief.items.map((item, index) => {
            const StatusIcon = status[item.evidenceLevel].icon;
            const sectionStart = index === 0 || brief.items[index - 1].category !== item.category;
            return (
              <section key={item.id} id={item.id} className="scroll-mt-24">
                {sectionStart && (
                  <div className="mt-16 flex items-center gap-4 border-b border-[color:var(--color-line-strong)] pb-3 first:mt-0">
                    <span className="eyebrow">SECTION {item.category === "生成式 AI" ? "01" : item.category === "前沿科技" ? "02" : "03"}</span>
                    <h2 className="display text-2xl font-bold">{item.category}</h2>
                  </div>
                )}
                <div className="grid gap-7 border-b border-[color:var(--color-line)] py-10 lg:grid-cols-[4rem_1.1fr_1fr] lg:gap-10">
                  <div className="mono text-2xl font-bold text-[color:var(--color-flame)]">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="display text-3xl font-bold leading-tight text-[color:var(--color-ink)]">{item.title}</h3>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
                        <StatusIcon className="h-4 w-4" aria-hidden="true" /> {status[item.evidenceLevel].label} · {item.checkedAt}
                      </span>
                      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="ulink text-sm">
                        子原文 <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[color:var(--color-muted)]">{item.sourceTitle}</p>
                  </div>
                  <div className="space-y-7">
                    <div>
                      <p className="eyebrow mb-3">腾讯摘要 / SOURCE SUMMARY</p>
                      <ol className="space-y-3 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                        {item.tencentSummary.map((point, pointIndex) => (
                          <li key={point} className="grid grid-cols-[1.4rem_1fr] gap-2">
                            <span className="mono text-[color:var(--color-flame)]">{pointIndex + 1}.</span><span>{point}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="eyebrow mb-2">扩展解读 / READ</p>
                      <p className="leading-relaxed text-[color:var(--color-ink)]">{item.interpretation}</p>
                    </div>
                    <div className="border-l-2 border-[color:var(--color-flame)] pl-4">
                      <p className="eyebrow mb-2">为什么重要 / WHY IT MATTERS</p>
                      <p className="text-sm leading-relaxed text-[color:var(--color-ink-soft)]">{item.whyItMatters}</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
