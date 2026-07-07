import Link from "next/link";
import { Github, Mail } from "lucide-react";

const cols = [
  {
    title: "逛逛",
    links: [
      { name: "作品", href: "/works" },
      { name: "Skills", href: "/skills" },
      { name: "手记", href: "/blog" },
      { name: "关于珂", href: "/about" },
    ],
  },
  {
    title: "纵深",
    links: [
      { name: "法律 AI", href: "/legal" },
      { name: "一人公司", href: "/solo" },
      { name: "AI 培训", href: "/training" },
      { name: "AI 情报", href: "/news" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-[color:var(--color-paper)]">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="display text-2xl font-bold text-[color:var(--color-ink)]">珂</span>
            <span className="text-[15px] font-bold text-[color:var(--color-ink)]">
              以这样玩<span className="flame">AI</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            王珂 · 独立 AI 造物者。用 AI 把想法当天变成产品——跟着珂,你也可以这样玩。
          </p>
          <div className="mt-5 flex gap-4">
            <a href="https://github.com/manmonthW" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="mailto:wang.manmonth@gmail.com" className="text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="eyebrow mb-4">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-flame)]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[color:var(--color-line)]">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <span className="mono text-xs text-[color:var(--color-muted)]">
            © {new Date().getFullYear()} 珂以这样玩AI · 王珂
          </span>
          <span className="mono text-xs text-[color:var(--color-muted)]">Made with taste, not templates.</span>
        </div>
      </div>
    </footer>
  );
}
