import Link from "next/link";
import { ArrowUpRight, Github, BookOpen } from "lucide-react";
import type { Work } from "@/data/works";

const groupColor: Record<string, string> = {
  Skill: "bg-fuchsia-100 text-fuchsia-700",
  法律AI: "bg-indigo-100 text-indigo-700",
  一人公司: "bg-emerald-100 text-emerald-700",
  思维工具: "bg-cyan-100 text-cyan-700",
  原创应用: "bg-amber-100 text-amber-700",
  精选Fork: "bg-slate-100 text-slate-600",
};

export default function WorkCard({ work }: { work: Work }) {
  return (
    <div className="card card-hover group flex flex-col overflow-hidden">
      {/* 预览图 / 渐变占位 */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {work.shot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/shots/${work.shot}`}
            alt={work.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
              work.accent ?? "from-brand-500 to-violet-700"
            }`}
          >
            <span className="px-6 text-center text-xl font-black leading-tight text-white/95">
              {work.name}
            </span>
          </div>
        )}
        <span
          className={`badge absolute left-3 top-3 ${groupColor[work.group] ?? "bg-white/90 text-slate-700"}`}
        >
          {work.group}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-slate-900">{work.name}</h3>
        <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {work.tagline}
        </p>

        {work.stack && work.stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {work.stack.map((s) => (
              <span
                key={s}
                className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-sm">
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800"
            >
              在线体验 <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {work.buildLog && (
            <Link
              href={`/blog/${work.buildLog}`}
              className="ml-auto inline-flex items-center gap-1 text-slate-500 hover:text-brand-700"
            >
              <BookOpen className="h-4 w-4" /> 造物记
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
