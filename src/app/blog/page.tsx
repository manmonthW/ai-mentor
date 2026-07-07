import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "手记",
  description: "珂的 AI 手记:造物记、方法论、法律 AI 与一人公司的实战笔记。",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">手记 / FIELD NOTES</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">
          珂的 AI 手记
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          我造了什么、怎么造的、踩了哪些坑。写给未来的自己,也写给想一起玩的你。
        </p>
      </header>

      <div className="mt-4 border-t border-[color:var(--color-line-strong)]">
        {posts.map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group grid gap-3 border-b border-[color:var(--color-line)] py-8 md:grid-cols-[3rem_1fr_auto] md:items-baseline md:gap-8"
          >
            <span className="mono text-sm text-[color:var(--color-flame)]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="mono mb-2 text-xs text-[color:var(--color-muted)]">
                {p.date} · {p.category}
              </div>
              <h2 className="display text-3xl font-bold leading-snug text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-flame)]">
                {p.title}
              </h2>
              <p className="mt-2 max-w-2xl text-[color:var(--color-ink-soft)]">{p.description}</p>
            </div>
            <ArrowUpRight className="hidden h-6 w-6 shrink-0 text-[color:var(--color-muted)] transition-colors group-hover:text-[color:var(--color-flame)] md:block" />
          </Link>
        ))}
      </div>
      {posts.length === 0 && <p className="text-[color:var(--color-muted)]">手记正在路上,很快就有。</p>}
    </div>
  );
}
