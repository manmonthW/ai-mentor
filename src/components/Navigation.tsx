"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavChild { name: string; href: string }
interface NavItem { name: string; href: string; children?: NavChild[] }

const navItems: NavItem[] = [
  { name: "AI 情报", href: "/news" },
  { name: "AI 培训", href: "/training" },
  { name: "作品", href: "/works" },
  { name: "Skills", href: "/skills" },
  { name: "手记", href: "/blog" },
  {
    name: "更多",
    href: "/works",
    children: [
      { name: "法律 AI", href: "/legal" },
      { name: "一人公司", href: "/solo" },
      { name: "中考 AI", href: "/zhongkao" },
    ],
  },
  { name: "关于", href: "/about" },
];

function Dropdown({ items, onClose }: { items: NavChild[]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-3 w-44 border border-[color:var(--color-line)] bg-[color:var(--color-paper)] py-1 shadow-[6px_6px_0_0_rgba(26,23,18,0.08)]"
    >
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          onClick={onClose}
          className="block px-4 py-2 text-sm text-[color:var(--color-ink-soft)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
        >
          {it.name}
        </Link>
      ))}
    </div>
  );
}

function Wordmark() {
  return (
    <Link href="/" className="group flex items-baseline gap-2" aria-label="珂以这样玩AI 首页">
      <span className="display text-2xl font-bold leading-none text-[color:var(--color-ink)]">珂</span>
      <span className="text-[15px] font-bold tracking-tight text-[color:var(--color-ink)]">
        以这样玩<span className="flame">AI</span>
      </span>
    </Link>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--color-line)] bg-[color:var(--color-paper)]/90 backdrop-blur-md">
      <div className="wrap">
        <div className="flex h-16 items-center justify-between">
          <Wordmark />

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    className="text-sm text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-flame)]"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors hover:text-[color:var(--color-flame)] ${
                      isActive(item.href)
                        ? "text-[color:var(--color-ink)] font-semibold"
                        : "text-[color:var(--color-ink-soft)]"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
                {item.children && openDropdown === item.name && (
                  <Dropdown items={item.children} onClose={() => setOpenDropdown(null)} />
                )}
              </div>
            ))}
            <Link
              href="/#subscribe"
              className="border border-[color:var(--color-ink)] px-4 py-1.5 text-sm font-semibold text-[color:var(--color-ink)] transition-all hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
            >
              关注珂
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[color:var(--color-ink)] md:hidden" aria-label="菜单">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[color:var(--color-line)] bg-[color:var(--color-paper)] md:hidden">
          <div className="wrap flex flex-col py-3">
            {[{ name: "AI 情报", href: "/news" }, { name: "AI 培训", href: "/training" }, { name: "作品", href: "/works" }, { name: "Skills", href: "/skills" }, { name: "手记", href: "/blog" }, { name: "法律 AI", href: "/legal" }, { name: "一人公司", href: "/solo" }, { name: "中考 AI", href: "/zhongkao" }, { name: "关于", href: "/about" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[color:var(--color-line)] py-3 text-[color:var(--color-ink-soft)]"
              >
                {l.name}
              </Link>
            ))}
            <Link href="/#subscribe" onClick={() => setMobileOpen(false)} className="btn mt-4">
              关注珂
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
