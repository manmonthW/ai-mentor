import type { Metadata } from "next";
import Link from "next/link";
import { Github, ArrowUpRight } from "lucide-react";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills · 技能蒸馏馆",
  description: "女娲蒸馏人的思维,仓颉蒸馏经典名著——把它们炼成可执行的 Agent Skill。",
};

const platformLabel: Record<string, string> = {
  "claude-code": "Claude Code",
  kiro: "Kiro",
  通用: "通用",
  其他: "其他",
};

export default function SkillsPage() {
  const flagships = skills.filter((s) => s.id === "s-nuwa" || s.id === "s-cangjie");
  const rest = skills.filter((s) => !flagships.includes(s));

  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">蒸馏 / DISTILLATION</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">
          技能蒸馏馆
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          我最上瘾的玩法:不让 AI 替我写一段东西,而是让它变成一个特定的「人」或「一本书」,替我持续地想事情。下面两个是母 Skill——它们造出会干活的 Skill。
        </p>
      </header>

      {/* 旗舰 */}
      <div className="mt-10 grid gap-px bg-[color:var(--color-line)] md:grid-cols-2">
        {flagships.map((s) => (
          <div key={s.id} className="flex flex-col justify-between bg-[color:var(--color-ink)] p-8 text-[color:var(--color-paper)]">
            <div>
              <span className="eyebrow !text-[color:var(--color-flame)]">母 Skill</span>
              <h2 className="display mt-3 text-3xl font-bold">{s.name}</h2>
              <p className="mt-4 text-[color:var(--color-paper)]/75">{s.description}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="mono border border-[color:var(--color-paper)]/25 px-2 py-0.5 text-[11px] text-[color:var(--color-paper)]/70">
                    {t}
                  </span>
                ))}
              </div>
              {s.githubUrl && (
                <a href={s.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-[color:var(--color-flame)] pb-0.5 text-sm font-semibold hover:text-[color:var(--color-flame)]">
                  拿去用 <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skill 库 */}
      <h2 className="eyebrow mt-16 mb-6">Skill 库 / LIBRARY</h2>
      <div className="grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((s) => (
          <div key={s.id} className="flex flex-col bg-[color:var(--color-paper)] p-6">
            <div className="mono mb-3 flex items-center gap-2 text-[11px] text-[color:var(--color-muted)]">
              <span>{s.category}</span>
              <span className="text-[color:var(--color-flame)]">/</span>
              <span>{platformLabel[s.platform] ?? s.platform}</span>
            </div>
            <h3 className="text-base font-bold text-[color:var(--color-ink)]">{s.name}</h3>
            <p className="mt-2 line-clamp-3 flex-1 text-sm text-[color:var(--color-ink-soft)]">{s.description}</p>
            {s.githubUrl && (
              <a href={s.githubUrl} target="_blank" rel="noopener noreferrer" className="ulink mt-4 text-sm">
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-[color:var(--color-line)] pt-6 text-[color:var(--color-ink-soft)]">
        想看这些 Skill 是怎么想出来的?读读{" "}
        <Link href="/blog/nuwa-cangjie" className="ulink">《女娲与仓颉》</Link>。
      </div>
    </div>
  );
}
