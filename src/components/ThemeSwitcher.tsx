"use client";

import { useTheme, THEMES, type ThemeKey } from "@/contexts/ThemeContext";
import { useState, useRef, useEffect } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState<ThemeKey | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* 触发按钮：当前主题色块 */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center border border-[color:var(--color-line)] transition-colors hover:border-[color:var(--color-ink)]"
        aria-label="切换主题风格"
        title="切换主题风格"
      >
        <span
          className="block h-4 w-4 border border-[color:var(--color-ink)]/20"
          style={{ background: THEMES.find((t) => t.key === theme)?.swatch }}
        />
      </button>

      {/* 下拉面板 */}
      {open && (
        <div className="absolute right-0 top-full mt-3 border border-[color:var(--color-line)] bg-[color:var(--color-paper)] p-3 shadow-[4px_4px_0_0_rgba(26,23,18,0.06)] z-50">
          <p className="eyebrow mb-3">风格 / THEME</p>
          <div className="flex gap-2">
            {THEMES.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTheme(t.key);
                  setOpen(false);
                }}
                onMouseEnter={() => setShowTooltip(t.key)}
                onMouseLeave={() => setShowTooltip(null)}
                className="relative flex flex-col items-center gap-1.5"
                aria-label={`切换到${t.name}风格`}
              >
                <span
                  className={`block h-8 w-8 border-2 transition-all ${
                    theme === t.key
                      ? "border-[color:var(--color-flame)] scale-110"
                      : "border-[color:var(--color-line)] hover:border-[color:var(--color-ink)]"
                  }`}
                  style={{ background: t.swatch }}
                />
                <span className="mono text-[9px] text-[color:var(--color-muted)]">
                  {t.name}
                </span>
                {/* 当前指示 */}
                {theme === t.key && (
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 bg-[color:var(--color-flame)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
