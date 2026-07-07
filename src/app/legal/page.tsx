import type { Metadata } from "next";
import { Github, ArrowUpRight, Scale } from "lucide-react";
import { legalApps } from "@/data/legal";

export const metadata: Metadata = {
  title: "法律 AI",
  description:
    "法律人出身做法律 AI:裁判文书分析、诉讼多 Agent、专利备考、合规。懂法的人做法律 AI,和不懂法的人做,是两回事。",
};

export default function LegalPage() {
  const own = legalApps.filter((a) => a.type === "自研");
  const collected = legalApps.filter((a) => a.type === "收集");

  const Item = ({ a }: { a: (typeof legalApps)[number] }) => (
    <div className="card card-hover flex flex-col p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="badge bg-indigo-100 text-indigo-700">{a.category}</span>
        <span className="badge bg-slate-100 text-slate-500">{a.type}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900">{a.name}</h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-slate-600">{a.description}</p>
      <div className="mt-4 flex items-center gap-3 text-sm">
        {a.url && (
          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800"
          >
            体验 <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
        {a.githubUrl && (
          <a
            href={a.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-800"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="container-page py-14">
      <header className="mb-10 max-w-2xl">
        <span className="badge mb-4 bg-indigo-100 text-indigo-700">
          <Scale className="mr-1 h-3.5 w-3.5" /> 纵深
        </span>
        <h1 className="text-4xl font-black text-slate-900">法律 AI</h1>
        <p className="mt-3 text-lg text-slate-600">
          我是法律背景出身。比起通用工具,我更愿意在真正懂的领域里深挖——
          <span className="font-semibold text-slate-800">懂法的人做法律 AI,和不懂法的人做,是两回事。</span>
        </p>
      </header>

      <h2 className="mb-5 text-xl font-bold text-slate-900">自研</h2>
      <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {own.map((a) => (
          <Item key={a.id} a={a} />
        ))}
      </div>

      <h2 className="mb-5 text-xl font-bold text-slate-900">精选收集</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collected.map((a) => (
          <Item key={a.id} a={a} />
        ))}
      </div>
    </div>
  );
}
