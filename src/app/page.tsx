import Link from "next/link";
import {
  ArrowRight,
  Hammer,
  FlaskConical,
  Scale,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { works, featuredWorks, totalShippedApprox } from "@/data/works";
import { getAllPosts } from "@/lib/blog";
import WorkCard from "@/components/WorkCard";
import Subscribe from "@/components/Subscribe";

const pillars = [
  {
    icon: Hammer,
    title: "造",
    color: "from-amber-400 to-orange-500",
    desc: "40+ 个上线的 AI 应用。有想法当天变产品,不行就扔,行就打磨。数量本身就是「我真的这样玩」的证据。",
  },
  {
    icon: FlaskConical,
    title: "蒸馏",
    color: "from-fuchsia-500 to-violet-600",
    desc: "女娲蒸馏「人的思维」,仓颉蒸馏「一本书」——把它们炼成可执行的 Agent Skill。一次蒸馏,长期复利。",
  },
  {
    icon: Scale,
    title: "法律 & 一人公司",
    color: "from-indigo-500 to-blue-700",
    desc: "法律人出身,做别人做不了的纵深:裁判文书分析、诉讼多 Agent、AI 报税、一人公司合规。",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const skillCount = works.filter((w) => w.group === "Skill").length;
  const legalCount = works.filter((w) => w.group === "法律AI").length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="container-page relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge mb-5 border border-brand-200 bg-brand-50 text-brand-700">
              <Sparkles className="mr-1 h-3.5 w-3.5" /> 王珂 · 独立 AI 造物者
            </span>
            <h1 className="text-5xl font-black leading-[1.1] text-slate-900 sm:text-6xl">
              珂以<span className="gradient-text">这样玩AI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              一个用 AI 把想法当天变成产品的独立创造者。这里有我造的 40+ 个 AI 应用、
              把思维与名著蒸馏成 Agent Skill 的方法,以及法律 AI 与一人公司的实战。
              <span className="font-semibold text-slate-800">跟着珂,你也可以这样玩。</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/works" className="btn-primary">
                看珂造的东西 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#subscribe" className="btn-ghost">
                关注珂
              </Link>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
              {[
                { n: `${totalShippedApprox}+`, l: "上线应用" },
                { n: `${skillCount}`, l: "原创 Skill" },
                { n: `${legalCount}+`, l: "法律 AI 工具" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <div className="text-3xl font-black gradient-text">{s.n}</div>
                  <div className="mt-1 text-sm text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="card p-7">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} text-white`}
              >
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured works */}
      <section className="container-page py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">精选作品</h2>
            <p className="mt-2 text-slate-600">挑几个我自己也常打开的。</p>
          </div>
          <Link
            href="/works"
            className="hidden shrink-0 items-center gap-1 font-semibold text-brand-700 hover:text-brand-800 sm:flex"
          >
            全部作品 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      </section>

      {/* Latest posts */}
      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">最新手记</h2>
            <p className="mt-2 text-slate-600">我造了什么、怎么造的。</p>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 items-center gap-1 font-semibold text-brand-700 hover:text-brand-800 sm:flex"
          >
            全部手记 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-hover flex flex-col p-6">
              <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                <BookOpen className="h-3.5 w-3.5 text-brand-500" />
                <span className="font-medium text-brand-700">{p.category}</span>
                <time>· {p.date}</time>
              </div>
              <h3 className="text-lg font-bold leading-snug text-slate-900">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {p.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <Subscribe />
    </>
  );
}
