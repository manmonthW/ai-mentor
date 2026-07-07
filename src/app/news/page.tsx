import type { Metadata } from "next";
import { ArrowUpRight, Radio, RefreshCw } from "lucide-react";
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
  const diff = Date.now() - d;
  const h = Math.floor(diff / 3.6e6);
  if (h < 1) return "刚刚";
  if (h < 24) return `${h} 小时前`;
  return `${Math.floor(h / 24)} 天前`;
}

export default async function NewsPage() {
  const { ok, items, sources, updatedAt } = await fetchAINews();

  return (
    <div className="container-page py-14">
      <header className="mb-8 max-w-2xl">
        <span className="badge mb-4 bg-sky-100 text-sky-700">
          <Radio className="mr-1 h-3.5 w-3.5" /> 真实聚合
        </span>
        <h1 className="text-4xl font-black text-slate-900">AI 情报</h1>
        <p className="mt-3 text-lg text-slate-600">
          聚合自{sources.length ? sources.join("、") : "量子位、The Verge"}等公开 RSS 的真实资讯,
          每 30 分钟自动刷新。点标题直达原文。
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
          <RefreshCw className="h-3.5 w-3.5" />
          更新于 {new Date(updatedAt).toLocaleString("zh-CN")}
        </p>
      </header>

      {ok ? (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {items.map((n, i) => (
            <li key={n.link + i}>
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 transition-colors hover:bg-brand-50/50"
              >
                <span className="mt-0.5 w-6 shrink-0 text-right text-sm font-bold text-slate-300">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                    {n.title}
                  </h3>
                  {n.summary && (
                    <p className="mt-1 line-clamp-1 text-sm text-slate-500">{n.summary}</p>
                  )}
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-medium text-slate-500">{n.source}</span>
                    <span>· {timeAgo(n.date)}</span>
                  </div>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-600" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          <p>此刻抓不到资讯源(可能是网络或源站波动)。</p>
          <p className="mt-1 text-sm">这里只放真实抓取的内容,宁可空着,也不编造。稍后再来。</p>
        </div>
      )}
    </div>
  );
}
