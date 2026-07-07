import type { Metadata } from "next";
import Link from "next/link";
import { Github, Mail, ArrowUpRight } from "lucide-react";
import { totalShippedApprox } from "@/data/works";

export const metadata: Metadata = {
  title: "关于珂",
  description: "王珂——法律人出身的独立 AI 造物者。用 AI 把想法当天变成产品,已上线 40+ 个应用。",
};

const doing = [
  { k: "造", en: "BUILD", d: "用 AI 把想法当天变成能跑的产品,已上线 40+ 个。" },
  { k: "蒸馏", en: "DISTILL", d: "把人的思维和经典名著炼成可执行的 Agent Skill。" },
  { k: "法律 AI", en: "LEGAL", d: "法律人背景,深挖别人做不了的法律 AI 纵深。" },
  { k: "教", en: "TEACH", d: "给企业与团队做行业 AI 赋能培训。" },
];

export default function AboutPage() {
  return (
    <div className="wrap max-w-3xl py-16">
      <p className="eyebrow mb-6">关于 / COLOPHON</p>
      <div className="flex items-baseline gap-4">
        <span className="display text-6xl font-bold text-[color:var(--color-ink)]">王珂</span>
        <span className="mono text-sm text-[color:var(--color-muted)]">独立 AI 造物者 · 法律人</span>
      </div>

      <div className="mt-10 space-y-5 text-[18px] leading-8 text-[color:var(--color-ink-soft)]">
        <p>
          我是王珂。「珂以这样玩AI」这个名字,是「王珂 · 可以 · 这样玩 AI」的三重双关——重点在那个
          <strong className="text-[color:var(--color-ink)]">「玩」</strong>字。
        </p>
        <p>
          我不太喜欢「AI 赋能专家」这类头衔,太虚。我更愿意让作品说话:过去这段时间,我用 AI 造了 {totalShippedApprox}+
          个能跑起来的应用——从法律文书分析、诉讼多 Agent,到 AI 报税、养老金测算、思维罗盘。有的很正经,有的纯为好玩。
        </p>
        <p>
          我最上瘾的方向,是把「一个人的思维」和「一本书」蒸馏成可执行的 Skill;我的老本行是法律,所以也一直在做别人做不了的法律 AI 纵深。
        </p>
        <p className="text-[color:var(--color-ink)]">
          我想证明一件事:用 AI 把想法变成产品,门槛比你以为的低得多。跟着珂,你也可以这样玩。
        </p>
      </div>

      <h2 className="eyebrow mb-6 mt-14">我在做的事 / WHAT I DO</h2>
      <div className="grid gap-px border border-[color:var(--color-line)] bg-[color:var(--color-line)] sm:grid-cols-2">
        {doing.map((x) => (
          <div key={x.k} className="bg-[color:var(--color-paper)] p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="display text-2xl font-bold text-[color:var(--color-ink)]">{x.k}</h3>
              <span className="eyebrow">{x.en}</span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">{x.d}</p>
          </div>
        ))}
      </div>

      <h2 className="eyebrow mb-6 mt-14">找珂 / CONTACT</h2>
      <div className="flex flex-wrap gap-4">
        <a href="mailto:wang.manmonth@gmail.com" className="btn">
          <Mail className="h-4 w-4" /> 写信给珂
        </a>
        <a href="https://github.com/manmonthW" target="_blank" rel="noopener noreferrer" className="btn-line">
          <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-4 w-4" />
        </a>
        <Link href="/works" className="btn-line">看我的作品</Link>
      </div>
    </div>
  );
}
