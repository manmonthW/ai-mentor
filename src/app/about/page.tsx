import type { Metadata } from "next";
import Link from "next/link";
import { Github, Mail, Hammer, FlaskConical, Scale, GraduationCap } from "lucide-react";
import { totalShippedApprox } from "@/data/works";

export const metadata: Metadata = {
  title: "关于珂",
  description: "王珂——法律人出身的独立 AI 造物者。用 AI 把想法当天变成产品,已上线 40+ 个应用。",
};

const doing = [
  { icon: Hammer, t: "造", d: "用 AI 把想法当天变成能跑的产品,已上线 40+ 个。" },
  { icon: FlaskConical, t: "蒸馏", d: "把人的思维和经典名著炼成可执行的 Agent Skill。" },
  { icon: Scale, t: "法律 AI", d: "法律人背景,深挖别人做不了的法律 AI 纵深。" },
  { icon: GraduationCap, t: "教", d: "给企业与团队做行业 AI 赋能培训。" },
];

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <div className="flex items-center gap-5">
        <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-fuchsia-500 text-4xl font-black text-white shadow">
          珂
        </span>
        <div>
          <h1 className="text-4xl font-black text-slate-900">王珂</h1>
          <p className="mt-1 text-lg text-slate-600">独立 AI 造物者 · 法律人</p>
        </div>
      </div>

      <div className="mt-8 space-y-4 text-lg leading-8 text-slate-700">
        <p>
          我是王珂。「珂以这样玩AI」这个名字,是「王珂 · 可以 · 这样玩 AI」的三重双关——
          重点在那个<strong className="text-slate-900">「玩」</strong>字。
        </p>
        <p>
          我不太喜欢「AI 赋能专家」这类头衔,太虚。我更愿意让作品说话:过去这段时间,
          我用 AI 造了 {totalShippedApprox}+ 个能跑起来的应用——从法律文书分析、诉讼多 Agent,
          到 AI 报税、养老金测算、思维罗盘。有的很正经,有的纯为好玩。
        </p>
        <p>
          我最上瘾的方向,是把「一个人的思维」和「一本书」蒸馏成可执行的 Skill;
          我的老本行是法律,所以也一直在做别人做不了的法律 AI 纵深。
        </p>
        <p className="font-semibold text-slate-900">
          我想证明一件事:用 AI 把想法变成产品,门槛比你以为的低得多。跟着珂,你也可以这样玩。
        </p>
      </div>

      <h2 className="mt-12 text-xl font-bold text-slate-900">我在做的事</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {doing.map((x) => (
          <div key={x.t} className="card flex items-start gap-3 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <x.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{x.t}</h3>
              <p className="mt-0.5 text-sm text-slate-600">{x.d}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold text-slate-900">找珂</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="mailto:wang.manmonth@gmail.com" className="btn-primary">
          <Mail className="h-4 w-4" /> 写信给珂
        </a>
        <a
          href="https://github.com/manmonthW"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <Github className="h-4 w-4" /> GitHub
        </a>
        <Link href="/works" className="btn-ghost">
          看我的作品
        </Link>
      </div>
    </div>
  );
}
