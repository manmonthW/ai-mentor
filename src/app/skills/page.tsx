import type { Metadata } from "next";
import Link from "next/link";
import { Github, ArrowUpRight, FlaskConical } from "lucide-react";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills · 技能蒸馏馆",
  description:
    "女娲蒸馏人的思维,仓颉蒸馏经典名著——把它们炼成可执行的 Agent Skill。这是珂玩 AI 最上瘾的一条路。",
};

const platformLabel: Record<string, string> = {
  "claude-code": "Claude Code",
  kiro: "Kiro",
  通用: "通用",
  其他: "其他",
};

export default function SkillsPage() {
  const flagships = skills.filter((s) => s.featured && (s.id === "s-nuwa" || s.id === "s-cangjie"));
  const rest = skills.filter((s) => !flagships.includes(s));

  return (
    <div className="container-page py-14">
      <header className="mb-10 max-w-2xl">
        <span className="badge mb-4 bg-fuchsia-100 text-fuchsia-700">
          <FlaskConical className="mr-1 h-3.5 w-3.5" /> 蒸馏
        </span>
        <h1 className="text-4xl font-black text-slate-900">技能蒸馏馆</h1>
        <p className="mt-3 text-lg text-slate-600">
          我最上瘾的玩法:不让 AI 替我写一段东西,而是让它变成一个特定的「人」或「一本书」,
          替我持续地想事情。下面两个是母 Skill——它们造出会干活的 Skill。
        </p>
      </header>

      {/* 旗舰 */}
      <div className="mb-12 grid gap-6 md:grid-cols-2">
        {flagships.map((s) => (
          <div
            key={s.id}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-fuchsia-600 p-8 text-white"
          >
            <h2 className="text-2xl font-black">{s.name}</h2>
            <p className="mt-3 text-white/90">{s.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs">
                  {t}
                </span>
              ))}
            </div>
            {s.githubUrl && (
              <a
                href={s.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700"
              >
                <Github className="h-4 w-4" /> 拿去用
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Skill 库 */}
      <h2 className="mb-5 text-xl font-bold text-slate-900">Skill 库</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((s) => (
          <div key={s.id} className="card card-hover flex flex-col p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="badge bg-slate-100 text-slate-600">{s.category}</span>
              <span className="badge bg-brand-50 text-brand-700">
                {platformLabel[s.platform] ?? s.platform}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
            <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-slate-600">{s.description}</p>
            {s.githubUrl && (
              <a
                href={s.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-slate-600">
          想看这些 Skill 是怎么想出来的?读读{" "}
          <Link href="/blog/nuwa-cangjie" className="font-semibold text-brand-700 hover:underline">
            《女娲与仓颉》
          </Link>
          。
        </p>
      </div>
    </div>
  );
}
