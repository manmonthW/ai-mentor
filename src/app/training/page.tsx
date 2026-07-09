import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowUpRight, Check } from "lucide-react";
import { trainingCourses, type TrainingCourse } from "@/data/courses-training";
import { k12Stats } from "@/data/k12";

export const metadata: Metadata = {
  title: "AI 培训",
  description:
    "珂的完整 AI 培训体系:面向企业与行业的实战课程、面向高校的产教融合课、以及面向中小学的 3-9 年级 K-12 课程设计。理论少、实操多。",
};

const enterpriseCourses = trainingCourses.filter((c) => c.track === "enterprise");
const universityCourses = trainingCourses.filter((c) => c.track === "university");

// 三大培训方向总览
const tracks = [
  {
    k: "01",
    id: "enterprise",
    t: "企业与行业培训",
    en: "ENTERPRISE",
    d: "面向企业与行业团队的实战培训。从认知到工具,当天让人把 AI 用起来。",
    count: `${enterpriseCourses.length} 门真实交付课程`,
    tags: ["货代 / 物流", "软件 / 企业", "法律 / 合规"],
    href: "#enterprise",
    external: false,
  },
  {
    k: "02",
    id: "university",
    t: "高校 AI 实战",
    en: "UNIVERSITY",
    d: "产教融合课程。在已有 AI 理论教学的基础上,补「AI 在企业实际工作中如何应用」这一环。",
    count: `${universityCourses.length} 门真实交付课程`,
    tags: ["港口 / 航运 / 物流", "项目制"],
    href: "#university",
    external: false,
  },
  {
    k: "03",
    id: "k12",
    t: "中小学 AI 课程",
    en: "K-12",
    d: "对齐 2022 新课标的完整 K-12 AI 课程体系设计,3-9 年级贯通,可作为课外拓展或校本课程落地。",
    count: `${k12Stats.grades} 年级 · ${k12Stats.totalHours} 课时`,
    tags: ["10 / 70 / 20", "四阶螺旋进阶", "六大主题"],
    href: "/k12",
    external: true,
  },
];

function CourseBlock({ c, i }: { c: TrainingCourse; i: number }) {
  return (
    <div className="grid gap-6 border-b border-[color:var(--color-line)] py-12 md:grid-cols-[3rem_1fr]">
      <span className="mono text-sm text-[color:var(--color-flame)]">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="display text-3xl font-bold text-[color:var(--color-ink)]">{c.title}</h3>
        <p className="mt-1 text-lg text-[color:var(--color-ink-soft)]">{c.subtitle}</p>

        {/* 元信息 */}
        <dl className="mono mt-5 grid gap-x-8 gap-y-2 text-xs text-[color:var(--color-muted)] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-[color:var(--color-line-strong)]">受众</dt>
            <dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{c.audience}</dd>
          </div>
          <div>
            <dt className="text-[color:var(--color-line-strong)]">时长</dt>
            <dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{c.duration}</dd>
          </div>
          {c.platform && (
            <div>
              <dt className="text-[color:var(--color-line-strong)]">平台</dt>
              <dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{c.platform}</dd>
            </div>
          )}
          <div>
            <dt className="text-[color:var(--color-line-strong)]">行业</dt>
            <dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{c.industry}</dd>
          </div>
        </dl>

        {/* 亮点 */}
        <ul className="mt-6 space-y-2">
          {c.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-[15px] text-[color:var(--color-ink-soft)]">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-flame)]" /> {h}
            </li>
          ))}
        </ul>

        {/* 模块 */}
        <div className="mt-6 grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {c.modules.map((m, mi) => (
            <div key={m.title} className="bg-[color:var(--color-paper)] p-4">
              <div className="mono mb-1.5 text-[11px] text-[color:var(--color-muted)]">
                M{mi + 1}
              </div>
              <h4 className="text-sm font-bold text-[color:var(--color-ink)]">{m.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-[color:var(--color-muted)]">
                {m.points.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrainingPage() {
  return (
    <div className="wrap py-16">
      {/* ── HERO ─────────────────────────────── */}
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">变现 / TRAINING</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">
          AI 培训体系
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          我不只自己玩,也把这套「动手玩 AI」的方法带给企业、高校和中小学——
          三个方向、三种交付节奏,但内核一致:
          <span className="font-semibold text-[color:var(--color-ink)]">
            理论少、实操多、让人真的把 AI 用起来。
          </span>
        </p>
      </header>

      {/* ── 培训方向总览 (3 卡片) ─────────────── */}
      <section className="py-14">
        <p className="eyebrow mb-6">培训方向总览 / TRACKS</p>
        <div className="grid gap-px bg-[color:var(--color-line)] md:grid-cols-3">
          {tracks.map((tr) => {
            const Card = (
              <div className="group flex h-full flex-col bg-[color:var(--color-paper)] p-6 transition-colors hover:bg-[color:var(--color-paper-2)]">
                <div className="flex items-baseline justify-between border-b border-[color:var(--color-line)] pb-3">
                  <div className="flex items-baseline gap-3">
                    <span className="mono text-sm text-[color:var(--color-flame)]">{tr.k}</span>
                    <h2 className="display text-2xl font-bold text-[color:var(--color-ink)] group-hover:text-[color:var(--color-flame)]">
                      {tr.t}
                    </h2>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[color:var(--color-muted)] transition-colors group-hover:text-[color:var(--color-flame)]" />
                </div>
                <p className="eyebrow mt-2">{tr.en}</p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {tr.d}
                </p>
                <div className="mono mt-5 text-[11px] text-[color:var(--color-flame)]">
                  {tr.count}
                </div>
                <ul className="mono mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[color:var(--color-muted)]">
                  {tr.tags.map((tag) => (
                    <li key={tag}>· {tag}</li>
                  ))}
                </ul>
              </div>
            );
            return tr.external ? (
              <Link key={tr.id} href={tr.href}>
                {Card}
              </Link>
            ) : (
              <a key={tr.id} href={tr.href}>
                {Card}
              </a>
            );
          })}
        </div>
      </section>

      {/* ── 01 企业与行业培训 ─────────────── */}
      <section id="enterprise" className="scroll-mt-20 border-t border-[color:var(--color-line-strong)] pt-14">
        <div className="grid gap-4 md:grid-cols-[3rem_1fr]">
          <span className="mono text-sm text-[color:var(--color-flame)]">01</span>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">企业与行业培训 / ENTERPRISE</p>
            <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">
              把 AI 交到具体岗位手上
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
              面向企业内部团队或行业混编班,课程按行业、水平与时长定制。
              讲师演示一步、学员跟做一步——散会时每个人都能带走可复用的智能体或工作流。
            </p>
          </div>
        </div>
        <div className="mt-4">
          {enterpriseCourses.map((c, i) => (
            <CourseBlock key={c.id} c={c} i={i} />
          ))}
        </div>
      </section>

      {/* ── 02 高校 AI 实战 ─────────────── */}
      <section id="university" className="scroll-mt-20 pt-14">
        <div className="grid gap-4 md:grid-cols-[3rem_1fr]">
          <span className="mono text-sm text-[color:var(--color-flame)]">02</span>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">高校 AI 实战 / UNIVERSITY</p>
            <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">
              产教融合,补上「AI 在企业里到底怎么用」这一环
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
              在高校已有 AI 理论课的基础上,以真实项目驱动学生做出可运行成果。
              先通用后专业:前期覆盖通用 AI 应用,后期聚焦行业方向做专业化实践。
            </p>
          </div>
        </div>
        <div className="mt-4">
          {universityCourses.map((c, i) => (
            <CourseBlock key={c.id} c={c} i={i} />
          ))}
        </div>
      </section>

      {/* ── 03 中小学 AI 课程 ─────────────── */}
      <section id="k12" className="scroll-mt-20 pt-14">
        <div className="grid gap-4 md:grid-cols-[3rem_1fr]">
          <span className="mono text-sm text-[color:var(--color-flame)]">03</span>
          <div>
            <p className="eyebrow mb-3">中小学 AI 课程 / K-12</p>
            <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">
              让 AI 从三年级走进课堂
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
              一套对齐 2022 新课标、覆盖九年义务教育阶段的完整 AI 课程体系设计——
              <span className="font-semibold text-[color:var(--color-ink)]">
                3-9 年级 · 208 课时 · 四阶螺旋进阶 · 六大主题。
              </span>
              可作为学校课外拓展、校本课程,或对教育机构做系统化内训。
            </p>

            {/* K-12 亮点表 */}
            <div className="mt-8 grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "112 h", t: "小学 3-6 年级", d: "10 / 70 / 20 · 四阶进阶 · 从不插电到 AIGC" },
                { k: "96 h", t: "初中 7-9 年级", d: "20 / 60 / 20 · 六学期主题 · 从使用者到创造者" },
                { k: "4 项", t: "交付形态", d: "体系方案 · 分学段课件 · 教师培训 · 校本共建" },
                { k: "★", t: "工具主线", d: "飞桨 / 讯飞 / MindSpore(国产) · Scratch / TF(国际)" },
              ].map((it) => (
                <div key={it.t} className="bg-[color:var(--color-paper)] p-5">
                  <div className="mono mb-2 text-[11px] text-[color:var(--color-flame)]">{it.k}</div>
                  <h3 className="text-sm font-bold text-[color:var(--color-ink)]">{it.t}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                    {it.d}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/k12"
                className="inline-flex items-center gap-2 border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-6 py-3 text-sm font-semibold text-[color:var(--color-paper)] transition-all hover:border-[color:var(--color-flame)] hover:bg-[color:var(--color-flame)]"
              >
                看完整 K-12 课程体系 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────── */}
      <div className="mt-16 flex flex-col items-start gap-4 bg-[color:var(--color-ink)] p-8 text-[color:var(--color-paper)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="display text-2xl font-bold">
            想给你的团队 / 学院 / 学校做一场 AI 培训?
          </h2>
          <p className="mt-1 text-[color:var(--color-paper)]/70">
            课程按行业、团队水平与时长定制。聊聊你的需求。
          </p>
        </div>
        <a
          href="mailto:wang.manmonth@gmail.com?subject=AI培训咨询"
          className="inline-flex shrink-0 items-center gap-2 border border-[color:var(--color-flame)] bg-[color:var(--color-flame)] px-6 py-3 text-sm font-semibold text-white"
        >
          <Mail className="h-4 w-4" /> 预约咨询 <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
