"use client";

import { useTheme, THEMES, type ThemeKey } from "@/contexts/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { Palette, X } from "lucide-react";

/** 右下角浮动球 + 展开面板 */
function FloatingThemeButton() {
  const { theme, setTheme } = useTheme();
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
    <div ref={ref} className="fixed bottom-6 right-6 z-[100]">
      {/* 展开面板 */}
      {open && (
        <div className="absolute bottom-14 right-0 w-48 border border-[color:var(--color-line)] bg-[color:var(--color-paper)] p-4 shadow-[6px_6px_0_0_rgba(26,23,18,0.08)] animate-in">
          <p className="eyebrow mb-3">风格 / THEME</p>
          <div className="flex flex-col gap-2">
            {THEMES.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTheme(t.key);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 text-sm transition-all ${
                  theme === t.key
                    ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)] font-semibold"
                    : "text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-2)]"
                }`}
              >
                <span
                  className={`block h-4 w-4 shrink-0 border ${
                    theme === t.key
                      ? "border-[color:var(--color-flame)]"
                      : "border-[color:var(--color-line-strong)]"
                  }`}
                  style={{ background: t.swatch }}
                />
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 浮动按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex h-12 w-12 items-center justify-center border border-[color:var(--color-line-strong)] bg-[color:var(--color-paper)] shadow-[4px_4px_0_0_rgba(26,23,18,0.1)] transition-all hover:shadow-[6px_6px_0_0_rgba(26,23,18,0.12)] hover:border-[color:var(--color-ink)] ${
          open ? "rotate-90" : ""
        }`}
        aria-label="切换主题风格"
        title="切换阅读风格"
      >
        {open ? (
          <X className="h-5 w-5 text-[color:var(--color-ink)]" />
        ) : (
          <Palette className="h-5 w-5 text-[color:var(--color-flame)]" />
        )}
      </button>
    </div>
  );
}

/** 首次访问引导横条 */
function ThemeBanner({ onDismiss }: { onDismiss: () => void }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative border-b border-[color:var(--color-line)] bg-[color:var(--color-paper-2)]">
      <div className="wrap flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-[color:var(--color-ink-soft)]">
          <span className="font-semibold text-[color:var(--color-ink)]">✨ 选择你喜欢的阅读风格</span>
          <span className="hidden sm:inline"> — 切换后所有页面同步变化</span>
        </p>
        <div className="flex items-center gap-2">
          {THEMES.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTheme(t.key);
                onDismiss();
              }}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all ${
                theme === t.key
                  ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                  : "border border-[color:var(--color-line-strong)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
              }`}
            >
              <span
                className="block h-3 w-3 border border-[color:var(--color-line-strong)]"
                style={{ background: t.swatch }}
              />
              {t.name}
            </button>
          ))}
          <button
            onClick={onDismiss}
            className="ml-2 text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] transition-colors"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const BANNER_DISMISSED_KEY = "keyiwanai-theme-banner-dismissed";

/** 组合组件：首次显示横条 + 始终显示浮动球 */
export default function ThemeSwitcher() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    if (!dismissed) {
      setShowBanner(true);
    }
  }, []);

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem(BANNER_DISMISSED_KEY, "1");
  };

  if (!mounted) return null;

  return (
    <>
      {showBanner && <ThemeBanner onDismiss={dismissBanner} />}
      <FloatingThemeButton />
    </>
  );
}
