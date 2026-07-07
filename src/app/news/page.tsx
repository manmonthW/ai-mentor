import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { fetchAINews } from "@/lib/news";

export const metadata: Metadata = {
  title: "AI 情报",
  description: "聚合自量子位、The Verge 等公开 RSS 的真实 AI 资讯,每 30 分钟自动刷新。",
};

export const revalidate = 1800;

function timeAgo(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return "";
  const h = Math.floor((Date.now() - d) / 3.6e6);
  if (h < 1) return "刚刚";
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export default async function NewsPage() {
  const { ok, items, sources, updatedAt } = await fetchAINews();
  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-8">
        <p className="eyebrow mb-4">真实聚合 / LIVE FEED</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">AI 情报</h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          聚合自{sources.length ? sources.join("、") : "量子位、The Verge"}等公开 RSS 的真实资讯,每 30 分钟自动刷新。点标题直达原文。
        </p>
        <p className="mono mt-3 text-xs text-[color:var(--color-muted)]">
          更新于 {new Date(updatedAt).toLocaleString("zh-CN")}
        </p>
      </header>

      {ok ? (
        <div className="mt-4 border-t border-[color:var(--color-line-strong)]">
          {items.map((n, i) => (
            <a
              key={n.link + i}
              href={n.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-[color:var(--color-line)] py-5"
            >
              <span className="mono text-sm text-[color:var(--color-muted)]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-flame)]">
                  {n.title}
                </h3>
                {n.summary && <p className="mt-1 line-clamp-1 text-sm text-[color:var(--color-muted)]">{n.summary}</p>}
                <div className="mono mt-1.5 text-xs text-[color:var(--color-muted)]">
                  {n.source} · {timeAgo(n.date)}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--color-muted)] transition-colors group-hover:text-[color:var(--color-flame)]" />
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-[color:var(--color-line-strong)] p-10 text-center text-[color:var(--color-muted)]">
          <p>此刻抓不到资讯源(网络或源站波动)。</p>
          <p className="mt-1 text-sm">这里只放真实抓取的内容,宁可空着,也不编造。稍后再来。</p>
        </div>
      )}
    </div>
  );
}
