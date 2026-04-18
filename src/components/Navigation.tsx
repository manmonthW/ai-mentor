"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";

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
  { name: "资讯中心", href: "/news" },
  {
    name: "AI应用",
    href: "/products",
    children: [
      { name: "Skill Hub", href: "/skills" },
      { name: "法律AI", href: "/legal" },
      { name: "OPC服务", href: "/opc" },
      { name: "我的作品", href: "/products" },
    ],
  },
  {
    name: "培训中心",
    href: "/learn",
    children: [
      { name: "课程总览", href: "/learn" },
      { name: "通用AI课程", href: "/learn/general" },
      { name: "教培行业", href: "/learn/education" },
      { name: "物流行业", href: "/learn/logistics" },
    ],
  },
  { name: "工具导航", href: "/tools" },
  { name: "关于我", href: "/about" },
];

function DropdownMenu({ items, onClose }: { items: NavChild[]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">AI Mentor</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === item.name && (
                      <DropdownMenu items={item.children} onClose={() => setOpenDropdown(null)} />
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-600 hover:text-gray-900">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
