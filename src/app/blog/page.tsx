import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "手记",
  description: "珂的 AI 手记:造物记、方法论、法律 AI 与一人公司的实战笔记。",
};

const catColor: Record<string, string> = {
  造物记: "bg-amber-100 text-amber-700",
  方法论: "bg-fuchsia-100 text-fuchsia-700",
  法律AI: "bg-indigo-100 text-indigo-700",
  手记: "bg-slate-100 text-slate-600",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="container-page py-14">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-black text-slate-900">珂的 AI 手记</h1>
        <p className="mt-3 text-lg text-slate-600">
          我造了什么、怎么造的、踩了哪些坑。写给未来的自己,也写给想一起玩的你。
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card card-hover group flex flex-col p-6"
          >
            <div className="mb-3 flex items-center gap-3 text-xs">
              <span className={`badge ${catColor[p.category] ?? catColor["手记"]}`}>
                {p.category}
              </span>
              <time className="text-slate-400">{p.date}</time>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-700">
              {p.title}
            </h2>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
              {p.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="text-[11px] text-slate-400">
                  #{t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-slate-500">手记正在路上,很快就有。</p>
      )}
    </div>
  );
}
