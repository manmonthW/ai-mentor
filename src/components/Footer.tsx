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
    <footer className="mt-8 border-t border-slate-200 bg-slate-50">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-fuchsia-500 text-lg font-black text-white">
              珂
            </span>
            <span className="text-lg font-extrabold text-slate-900">珂以这样玩AI</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-slate-500">
            王珂 · 独立 AI 造物者。用 AI 把想法当天变成产品——跟着珂,你也可以这样玩。
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://github.com/manmonthW"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-brand-700"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:wang.manmonth@gmail.com"
              className="text-slate-400 hover:text-brand-700"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-brand-700">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200">
        <div className="container-page py-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} 珂以这样玩AI · 王珂. Built with Next.js.
        </div>
      </div>
    </footer>
  );
}
