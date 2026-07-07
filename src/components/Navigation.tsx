"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavChild {
  name: string;
  href: string;
}
interface NavItem {
  name: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { name: "首页", href: "/" },
  { name: "作品", href: "/works" },
  { name: "Skills", href: "/skills" },
  { name: "手记", href: "/blog" },
  {
    name: "更多",
    href: "/works",
    children: [
      { name: "法律 AI", href: "/legal" },
      { name: "一人公司", href: "/solo" },
      { name: "AI 培训", href: "/training" },
      { name: "AI 情报", href: "/news" },
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
      className="absolute top-full left-0 mt-2 w-44 rounded-xl border border-slate-100 bg-white py-2 shadow-lg z-50"
    >
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          onClick={onClose}
          className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
        >
          {it.name}
        </Link>
      ))}
    </div>
  );
}

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="珂以这样玩AI 首页">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-fuchsia-500 text-lg font-black text-white shadow-sm transition-transform group-hover:scale-105">
        珂
      </span>
      <span className="text-lg font-extrabold tracking-tight text-slate-900">
        珂以<span className="gradient-text">这样玩AI</span>
      </span>
    </Link>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between">
          <Wordmark />

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                      className="flex items-center font-medium text-slate-600 transition-colors hover:text-brand-700"
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <Dropdown items={item.children} onClose={() => setOpenDropdown(null)} />
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors hover:text-brand-700 ${
                      isActive(item.href) ? "text-brand-700" : "text-slate-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/#subscribe" className="btn-primary py-2">
              关注珂
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-slate-600 md:hidden"
            aria-label="菜单"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-page space-y-1 py-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children?.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block rounded-md py-2 pl-8 pr-3 text-sm text-slate-500 hover:bg-brand-50 hover:text-brand-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/#subscribe"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              关注珂
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
