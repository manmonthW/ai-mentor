import type { Metadata } from "next";
import { GraduationCap, Mail } from "lucide-react";
import { trainingPrograms } from "@/data/training";

export const metadata: Metadata = {
  title: "AI 培训",
  description:
    "面向企业与机构的行业 AI 赋能培训:通用、教培、物流。从认知到实战,让团队真正把 AI 用起来。",
};

export default function TrainingPage() {
  return (
    <div className="container-page py-14">
      <header className="mb-10 max-w-2xl">
        <span className="badge mb-4 bg-amber-100 text-amber-700">
          <GraduationCap className="mr-1 h-3.5 w-3.5" /> 培训
        </span>
        <h1 className="text-4xl font-black text-slate-900">行业 AI 赋能培训</h1>
        <p className="mt-3 text-lg text-slate-600">
          我不只自己玩,也把这套「动手玩 AI」的方法带给团队。课程从认知讲到实战,
          针对不同行业量身设计——目标只有一个:让人真的把 AI 用起来。
        </p>
      </header>

      <div className="space-y-8">
        {trainingPrograms.map((p) => (
          <div key={p.id} className="card p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge bg-brand-50 text-brand-700">{p.industry}</span>
              <span className="text-sm text-slate-400">{p.level}</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{p.title}</h2>
            <p className="mt-2 text-slate-600">{p.description}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {p.modules.map((m) => (
                <div key={m.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <h3 className="font-semibold text-slate-900">{m.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{m.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.lessons.map((l) => (
                      <span
                        key={l}
                        className="rounded-md bg-white px-2 py-0.5 text-xs text-slate-500 ring-1 ring-slate-200"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-600 to-fuchsia-500 p-8 text-center text-white">
        <h2 className="text-2xl font-black">想给你的团队做一场 AI 培训?</h2>
        <p className="mt-2 text-white/90">课程可按行业与团队水平定制。聊聊你的需求。</p>
        <a
          href="mailto:wang.manmonth@gmail.com?subject=AI培训咨询"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-brand-700"
        >
          <Mail className="h-4 w-4" /> 预约咨询
        </a>
      </div>
    </div>
  );
}
