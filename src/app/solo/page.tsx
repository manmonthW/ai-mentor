import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { opcServices } from "@/data/opc";

export const metadata: Metadata = {
  title: "一人公司",
  description: "一个人也能开公司、也能把公司跑好。珂用 AI 给一人公司(OPC)配齐装备。",
};

const statusColor: Record<string, string> = {
  已上线: "text-[color:var(--color-flame)]",
  开发中: "text-[color:var(--color-ink)]",
  规划中: "text-[color:var(--color-muted)]",
};

export default function SoloPage() {
  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">纵深 / VERTICAL — 一人公司 OPC</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">
          一人公司 · AI 装备
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          一个人也能开公司、也能把公司跑好。不懂财税、合同、合规?那正是 AI 该替你扛的活。这是我给一人公司创始人配的一套装备。
        </p>
      </header>

      <div className="mt-10 grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2">
        {opcServices.map((s) => (
          <div key={s.id} className="flex flex-col bg-[color:var(--color-paper)] p-7">
            <div className="mono mb-3 flex items-center gap-2 text-[11px]">
              <span className="text-[color:var(--color-muted)]">{s.category}</span>
              <span className="text-[color:var(--color-line-strong)]">·</span>
              <span className={statusColor[s.status]}>{s.status}</span>
            </div>
            <h3 className="text-xl font-bold text-[color:var(--color-ink)]">{s.name}</h3>
            <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">{s.description}</p>
            <ul className="mt-5 space-y-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--color-flame)]" /> {f}
                </li>
              ))}
            </ul>
            {s.url && (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="ulink mt-5 text-sm">
                了解 <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
