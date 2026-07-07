import type { Metadata } from "next";
import { Github, ArrowUpRight } from "lucide-react";
import { legalApps } from "@/data/legal";

export const metadata: Metadata = {
  title: "法律 AI",
  description: "法律人出身做法律 AI:裁判文书分析、诉讼多 Agent、专利备考、合规。",
};

function Item({ a }: { a: (typeof legalApps)[number] }) {
  return (
    <div className="flex flex-col bg-[color:var(--color-paper)] p-6">
      <div className="mono mb-3 flex items-center gap-2 text-[11px] text-[color:var(--color-muted)]">
        <span>{a.category}</span>
        <span className="text-[color:var(--color-flame)]">/</span>
        <span>{a.type}</span>
      </div>
      <h3 className="text-lg font-bold text-[color:var(--color-ink)]">{a.name}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-[color:var(--color-ink-soft)]">{a.description}</p>
      <div className="mt-4 flex items-center gap-4 text-sm">
        {a.url && (
          <a href={a.url} target="_blank" rel="noopener noreferrer" className="ulink">
            体验 <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
        {a.githubUrl && (
          <a href={a.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]">
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function LegalPage() {
  const own = legalApps.filter((a) => a.type === "自研");
  const collected = legalApps.filter((a) => a.type === "收集");
  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">纵深 / VERTICAL — 法律</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">法律 AI</h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          我是法律背景出身。比起通用工具,我更愿意在真正懂的领域里深挖——
          <span className="font-semibold text-[color:var(--color-ink)]">懂法的人做法律 AI,和不懂法的人做,是两回事。</span>
        </p>
      </header>

      <h2 className="eyebrow mb-6 mt-12">自研 / ORIGINAL</h2>
      <div className="mb-14 grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {own.map((a) => <Item key={a.id} a={a} />)}
      </div>

      <h2 className="eyebrow mb-6">精选收集 / CURATED</h2>
      <div className="grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {collected.map((a) => <Item key={a.id} a={a} />)}
      </div>
    </div>
  );
}
