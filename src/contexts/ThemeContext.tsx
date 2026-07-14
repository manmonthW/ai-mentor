"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ThemeKey = "warm" | "dark" | "swiss" | "ink";

export interface ThemeMeta {
  key: ThemeKey;
  name: string;
  swatch: string; // 小色块预览颜色
}

export const THEMES: ThemeMeta[] = [
  { key: "warm", name: "暖纸编辑", swatch: "#f3f0e9" },
  { key: "dark", name: "深夜工坊", swatch: "#0f0f0f" },
  { key: "swiss", name: "瑞士终端", swatch: "#ffffff" },
  { key: "ink", name: "水墨极简", swatch: "#f8f8f6" },
];

interface ThemeContextValue {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "warm",
  setTheme: () => {},
});

const STORAGE_KEY = "keyiwanai-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>("warm");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeKey | null;
    if (stored && THEMES.some((t) => t.key === stored)) {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    // 移除旧 theme
    root.removeAttribute("data-theme");
    if (theme !== "warm") {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const setTheme = useCallback((t: ThemeKey) => {
    setThemeState(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
