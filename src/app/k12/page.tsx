import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import {
  k12Stats,
  k12Principles,
  k12Literacies,
  elementaryGrades,
  juniorHighSemesters,
  k12Deliverables,
} from "@/data/k12";

export const metadata: Metadata = {
  title: "中小学 AI 课程",
  description:
    "对齐 2022 新课标的完整 K-12 AI 课程体系: 3-9 年级 · 208 课时 · 10/70/20 黄金比例 · 四阶螺旋进阶。珂主持设计, 完整方案与课件可对接。",
};

export default function K12Page() {
  return (
    <div className="wrap py-16">
      {/* ── HERO ─────────────────────────────── */}
      <header className="border-b border-[color:var(--color-line)] pb-12">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">中小学 AI 课程 · K-12 CURRICULUM</p>
            <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">
              让 <span className="flame">AI</span> 从<br />
              三年级走进课堂
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              一套对齐 2022 新课标、覆盖九年义务教育阶段的完整 AI 课程体系——
              <span className="font-semibold text-[color:var(--color-ink)]">
                3-9 年级 · 208 课时 · 四阶螺旋进阶 · 六大主题。
              </span>
              由珂主持设计, 从「像计算机科学家一样思考」出发, 让孩子在做中学、用中学、创中学。
            </p>
          </div>

          {/* 数字栏 */}
          <div className="grid grid-cols-3 gap-px border border-[color:var(--color-line)] bg-[color:var(--color-line)] lg:grid-cols-1">
            {[
              { n: k12Stats.grades, l: "年级覆盖" },
              { n: k12Stats.totalHours, l: "总课时" },
              { n: `${k12Stats.themes}`, l: "初中学期主题" },
            ].map((s) => (
              <div key={s.l} className="bg-[color:var(--color-paper)] px-5 py-6">
                <div className="display text-4xl font-bold text-[color:var(--color-ink)]">
                  {s.n}
                </div>
                <div className="eyebrow mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── 01 为什么设计这套课 ─────────────────── */}
      <section className="border-b border-[color:var(--color-line)] py-14">
        <div className="grid gap-8 md:grid-cols-[3rem_1fr]">
          <span className="mono text-sm text-[color:var(--color-flame)]">01</span>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">为什么设计这套课 / RATIONALE</p>
            <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">
              从「软件操作」到「计算思维」的教育范式转型
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
              <p>
                2022 年新课标把「信息技术」正式更名「信息科技」, 三至八年级独立设课, 课时占比 1%-3%。
                这一词之变, 反映的是从「技术导向」向「科学导向」的跨越——
                课程本质从教 Word/PPT 操作, 转向培养数字素养与计算思维。
              </p>
              <p>
                新课标确立数据、算法、网络、信息处理、信息安全、人工智能六条主线,
                贯穿整个义务教育阶段。本方案以此为骨, 落到每个年级的具体课时、载体与项目上。
              </p>
            </div>

            {/* 四大核心素养 */}
            <div className="mt-8 grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2">
              {k12Literacies.map((it) => (
                <div key={it.t} className="bg-[color:var(--color-paper)] p-5">
                  <h3 className="text-sm font-bold text-[color:var(--color-ink)]">{it.t}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                    {it.d}
                  </p>
                </div>
              ))}
            </div>
            <p className="eyebrow mt-3 text-[10.5px]">四大核心素养 · 2022 新课标</p>
          </div>
        </div>
      </section>

      {/* ── 02 三大设计原则 ─────────────────── */}
      <section className="border-b border-[color:var(--color-line)] py-14">
        <div className="grid gap-8 md:grid-cols-[3rem_1fr]">
          <span className="mono text-sm text-[color:var(--color-flame)]">02</span>
          <div>
            <p className="eyebrow mb-3">三大设计原则 / DESIGN PRINCIPLES</p>
            <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">
              比例、进阶、工具——三件必须钉死的事
            </h2>

            <div className="mt-8 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
              {k12Principles.map((p) => (
                <div
                  key={p.k}
                  className="grid gap-4 py-8 md:grid-cols-[auto_1fr_2fr] md:items-baseline md:gap-10"
                >
                  <span className="mono text-sm text-[color:var(--color-flame)]">{p.k}</span>
                  <div>
                    <h3 className="display text-2xl font-bold text-[color:var(--color-ink)]">
                      {p.t}
                    </h3>
                    <span className="eyebrow">{p.en}</span>
                    {p.ratio && (
                      <p className="mono mt-2 text-xs text-[color:var(--color-flame)]">
                        {p.ratio}
                      </p>
                    )}
                  </div>
                  <p className="max-w-2xl text-[15.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 小学篇 ─────────────────── */}
      <section className="border-b border-[color:var(--color-line)] py-14">
        <div className="grid gap-8 md:grid-cols-[3rem_1fr]">
          <span className="mono text-sm text-[color:var(--color-flame)]">03</span>
          <div>
            <p className="eyebrow mb-3">
              小学篇 · 3-6 年级  ·  {k12Stats.elementaryHours} 课时 / 8 学期
            </p>
            <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">
              从不插电到 AIGC——四年一个闭环
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
              以皮亚杰认知阶段为锚, 三年级从「像计算机科学家一样思考」的无屏活动切入,
              到六年级已经能带着 AIGC 做完整的社会议题项目。每学期 14 课时, 10% 技术 · 70% 应用 · 20% 素养。
            </p>

            {/* 年级卡片 */}
            <div className="mt-8 grid gap-px bg-[color:var(--color-line)] md:grid-cols-2">
              {elementaryGrades.map((g) => (
                <div key={g.code} className="bg-[color:var(--color-paper)] p-6">
                  <div className="flex items-baseline gap-3 border-b border-[color:var(--color-line)] pb-3">
                    <span className="mono text-xs text-[color:var(--color-flame)]">{g.code}</span>
                    <h3 className="display text-xl font-bold text-[color:var(--color-ink)]">
                      {g.gradeCN}  ·  {g.stage}
                    </h3>
                  </div>

                  <dl className="mono mt-4 grid gap-x-6 gap-y-1.5 text-[11px] text-[color:var(--color-muted)] sm:grid-cols-2">
                    <div>
                      <dt className="text-[color:var(--color-line-strong)]">认知阶段</dt>
                      <dd className="mt-0.5 text-[color:var(--color-ink-soft)]">{g.cognition}</dd>
                    </div>
                    <div>
                      <dt className="text-[color:var(--color-line-strong)]">关键载体</dt>
                      <dd className="mt-0.5 text-[color:var(--color-ink-soft)]">
                        {g.carriers.join(" · ")}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 space-y-3">
                    {g.semesters.map((s) => (
                      <div
                        key={s.label}
                        className="border-l-2 border-[color:var(--color-flame)] pl-3"
                      >
                        <div className="mono text-[11px] text-[color:var(--color-muted)]">
                          {s.label}
                        </div>
                        <h4 className="text-sm font-bold text-[color:var(--color-ink)]">
                          {s.theme}
                        </h4>
                        <p className="mt-1 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                          {s.brief}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 初中篇 ─────────────────── */}
      <section className="border-b border-[color:var(--color-line)] py-14">
        <div className="grid gap-8 md:grid-cols-[3rem_1fr]">
          <span className="mono text-sm text-[color:var(--color-flame)]">04</span>
          <div>
            <p className="eyebrow mb-3">
              初中篇 · 7-9 年级  ·  {k12Stats.juniorHours} 课时 / 6 学期
            </p>
            <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">
              从 AI 使用者到初步创造者
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
              六个学期的主题呼应 K-12 人工智能课程「与生活、表征与推理、机器学习、社会责任」的经典主线。
              每学期 16 课时, 20% 技术 · 60% 应用 · 20% 素养。国产工具为主, 每学期一个可落地的项目。
            </p>

            {/* 学期列表 */}
            <div className="mt-8 border-y border-[color:var(--color-line-strong)]">
              {juniorHighSemesters.map((s, i) => (
                <div
                  key={s.code}
                  className="grid gap-4 border-b border-[color:var(--color-line)] py-7 md:grid-cols-[4rem_1fr]"
                >
                  <div>
                    <div className="mono text-xs text-[color:var(--color-muted)]">
                      S{String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="display mt-1 text-2xl font-bold text-[color:var(--color-flame)]">
                      {s.code}
                    </div>
                  </div>

                  <div>
                    <h3 className="display text-xl font-bold text-[color:var(--color-ink)]">
                      {s.theme}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
                      <span className="font-semibold text-[color:var(--color-ink)]">目标 · </span>
                      {s.goal}
                    </p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
                      <span className="font-semibold text-[color:var(--color-ink)]">项目 · </span>
                      {s.project}
                    </p>
                    <div className="mono mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[color:var(--color-muted)]">
                      <span className="text-[color:var(--color-line-strong)]">工具 ·</span>
                      {s.tools.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 交付形态 ─────────────────── */}
      <section className="border-b border-[color:var(--color-line)] py-14">
        <div className="grid gap-8 md:grid-cols-[3rem_1fr]">
          <span className="mono text-sm text-[color:var(--color-flame)]">05</span>
          <div>
            <p className="eyebrow mb-3">交付形态 / DELIVERY</p>
            <h2 className="display text-3xl font-bold text-[color:var(--color-ink)]">
              从体系方案到走上讲台
            </h2>

            <div className="mt-8 grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
              {k12Deliverables.map((d) => (
                <div key={d.k} className="bg-[color:var(--color-paper)] p-5">
                  <div className="mono mb-2 text-[11px] text-[color:var(--color-flame)]">
                    {d.k}
                  </div>
                  <h3 className="text-sm font-bold text-[color:var(--color-ink)]">{d.t}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                    {d.d}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-2">
              {[
                "本站只展示体系骨架, 完整方案文档、分年级课件、教师讲义走邮件对接",
                "支持按学校规模、地方特色、师资水平做校本化改编",
                "配套教师师训, 帮不熟 AI 的信息科技老师稳稳站上讲台",
              ].map((h) => (
                <li
                  key={h}
                  className="flex gap-2 text-[15px] text-[color:var(--color-ink-soft)]"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-flame)]" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────── */}
      <div className="mt-14 flex flex-col items-start gap-4 bg-[color:var(--color-ink)] p-8 text-[color:var(--color-paper)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="display text-2xl font-bold">
            想为学校 / 教育机构定制一套 AI 课程?
          </h2>
          <p className="mt-1 text-[color:var(--color-paper)]/70">
            体系方案、分学段课件、教师培训均可对接。聊聊你的场景与需求。
          </p>
        </div>
        <a
          href="mailto:wang.manmonth@gmail.com?subject=中小学AI课程咨询"
          className="inline-flex shrink-0 items-center gap-2 border border-[color:var(--color-flame)] bg-[color:var(--color-flame)] px-6 py-3 text-sm font-semibold text-white"
        >
          <Mail className="h-4 w-4" /> 预约咨询
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* 关联链接 */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-line)] pt-6">
        <p className="eyebrow">同属 AI 培训体系 / RELATED</p>
        <div className="flex flex-wrap gap-6">
          <Link href="/training" className="ulink text-sm">
            AI 培训总览  <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/zhongkao" className="ulink text-sm">
            中考 AI  <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
