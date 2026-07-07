import Link from "next/link";
import { ArrowUpRight, Github, BookOpen } from "lucide-react";
import type { Work } from "@/data/works";

export default function WorkCard({ work, index }: { work: Work; index?: number }) {
  return (
    <div className="group relative flex flex-col border border-[color:var(--color-line)] bg-[color:var(--color-paper)] transition-colors duration-200 hover:border-[color:var(--color-ink)]">
      {/* 预览区 */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[color:var(--color-line)] bg-[color:var(--color-paper-2)]">
        {work.shot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/shots/${work.shot}`}
            alt={work.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between p-5">
            <span className="eyebrow">{work.group}</span>
            <span className="display text-2xl font-bold leading-tight text-[color:var(--color-ink)]">
              {work.name}
            </span>
          </div>
        )}
        {typeof index === "number" && (
          <span className="mono absolute right-3 top-3 bg-[color:var(--color-paper)]/85 px-1.5 text-[11px] text-[color:var(--color-ink)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* 内容 */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="eyebrow">{work.group}</span>
          {work.stack && (
            <span className="mono text-[11px] text-[color:var(--color-muted)]">
              {work.stack.slice(0, 2).join(" / ")}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-[color:var(--color-ink)]">{work.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
          {work.tagline}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-[color:var(--color-line)] pt-3 text-sm">
          {work.url && (
            <a href={work.url} target="_blank" rel="noopener noreferrer" className="ulink">
              在线体验 <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-ink)]"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {work.buildLog && (
            <Link href={`/blog/${work.buildLog}`} className="ml-auto inline-flex items-center gap-1 text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-flame)]">
              <BookOpen className="h-3.5 w-3.5" /> 造物记
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
