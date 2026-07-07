import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { works, featuredWorks, totalShippedApprox } from "@/data/works";
import { getAllPosts } from "@/lib/blog";
import WorkCard from "@/components/WorkCard";
import Subscribe from "@/components/Subscribe";

const pillars = [
  {
    k: "01",
    t: "造",
    en: "BUILD",
    d: "有想法当天变成能跑的产品,不行就扔,行就打磨。已上线 40+ 个。数量本身,就是「我真的这样玩」的证据。",
  },
  {
    k: "02",
    t: "蒸馏",
    en: "DISTILL",
    d: "女娲蒸馏「人的思维」,仓颉蒸馏「一本书」——把它们炼成可执行的 Agent Skill。一次蒸馏,长期复利。",
  },
  {
    k: "03",
    t: "法律 & 一人公司",
    en: "LAW / OPC",
    d: "法律人出身,做别人做不了的纵深:裁判文书分析、诉讼多 Agent、AI 报税、一人公司合规。",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 4);
  const skillCount = works.filter((w) => w.group === "Skill").length;
  const legalCount = works.filter((w) => w.group === "法律AI").length;
  const ticker = works.map((w) => w.name);

  return (
    <>
      {/* ── HERO ───────────────────────────────── */}
      <section className="relative border-b border-[color:var(--color-line)]">
        <div className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-6">王珂 — 独立 AI 造物者 / INDEPENDENT&nbsp;AI&nbsp;BUILDER</p>
            <h1 className="display text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.98] tracking-tight text-[color:var(--color-ink)]">
              珂以<br />
              这样<span className="flame">玩AI</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[color:var(--color-ink-soft)] text-balance">
              一个用 AI 把想法当天变成产品的独立创造者。作品、方法、以及法律 AI 与一人公司的实战——
              <span className="font-semibold text-[color:var(--color-ink)]">跟着珂,你也可以这样玩。</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/works" className="btn">
                看珂造的东西 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#subscribe" className="ulink text-[color:var(--color-ink)]">
                关注珂 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 数字栏 */}
          <div className="grid grid-cols-3 gap-px border border-[color:var(--color-line)] bg-[color:var(--color-line)] lg:grid-cols-1">
            {[
              { n: `${totalShippedApprox}+`, l: "上线应用" },
              { n: `${skillCount}`, l: "原创 Skill" },
              { n: `${legalCount}+`, l: "法律 AI 工具" },
            ].map((s) => (
              <div key={s.l} className="bg-[color:var(--color-paper)] px-5 py-6">
                <div className="display text-4xl font-bold text-[color:var(--color-ink)]">{s.n}</div>
                <div className="eyebrow mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 跑马灯 ─────────────────────────────── */}
      <section className="marquee overflow-hidden border-b border-[color:var(--color-line)] bg-[color:var(--color-ink)] py-3 text-[color:var(--color-paper)]">
        <div className="marquee-track">
          {[...ticker, ...ticker].map((name, i) => (
            <span key={i} className="mono mx-6 text-sm tracking-wide">
              {name} <span className="flame">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── 三支柱(编辑式列表)──────────────── */}
      <section className="wrap py-20">
        <p className="eyebrow mb-10">我怎么玩 / THE METHOD</p>
        <div className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
          {pillars.map((p) => (
            <div key={p.k} className="grid gap-4 py-8 md:grid-cols-[auto_1fr_2fr] md:items-baseline md:gap-10">
              <span className="mono text-sm text-[color:var(--color-flame)]">{p.k}</span>
              <div>
                <h3 className="display text-3xl font-bold text-[color:var(--color-ink)]">{p.t}</h3>
                <span className="eyebrow">{p.en}</span>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 精选作品 ─────────────────────────── */}
      <section className="wrap pb-20">
        <div className="mb-10 flex items-end justify-between border-b border-[color:var(--color-line)] pb-4">
          <div>
            <p className="eyebrow mb-2">精选作品 / SELECTED WORK</p>
            <h2 className="display text-4xl font-bold text-[color:var(--color-ink)]">挑几个我自己也常打开的</h2>
          </div>
          <Link href="/works" className="ulink hidden shrink-0 sm:inline-flex">
            全部作品 <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} />
          ))}
        </div>
      </section>

      {/* ── 手记(编辑式列表)────────────────── */}
      <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-paper-2)]">
        <div className="wrap py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-2">手记 / FIELD NOTES</p>
              <h2 className="display text-4xl font-bold text-[color:var(--color-ink)]">我造了什么,怎么造的</h2>
            </div>
            <Link href="/blog" className="ulink hidden shrink-0 sm:inline-flex">
              全部手记 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="border-t border-[color:var(--color-line-strong)]">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group grid gap-2 border-b border-[color:var(--color-line)] py-6 md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="mono text-xs text-[color:var(--color-muted)]">
                  {p.date} · {p.category}
                </span>
                <h3 className="display text-2xl font-bold leading-snug text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-flame)]">
                  {p.title}
                </h3>
                <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-[color:var(--color-muted)] transition-colors group-hover:text-[color:var(--color-flame)] md:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Subscribe />
    </>
  );
}
