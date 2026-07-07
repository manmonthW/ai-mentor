import { ImageResponse } from "next/og";

export const alt = "珂以这样玩AI · 王珂 —— 独立 AI 造物者";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const EYEBROW = "KEAIMENTOR.COM";
const TITLE = "珂以这样玩AI";
const SUB = "王珂 · 独立 AI 造物者";
const FOOTER = "40+ AI 应用 · 法律AI · Skill 蒸馏 · AI 培训";

async function loadFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@700&text=${encodeURIComponent(text)}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)\s*format/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await loadFont(EYEBROW + TITLE + SUB + FOOTER);
  const fontFamily = font ? "Noto Sans SC" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f0e9",
          padding: "72px 80px",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 26, letterSpacing: 6, color: "#837a6c" }}>{EYEBROW}</span>
          <span
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1a1712",
              color: "#f3f0e9",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            珂
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, color: "#1a1712", lineHeight: 1 }}>
            <span>珂以这样</span>
            <span style={{ color: "#ff3b00" }}>玩AI</span>
          </div>
          <div style={{ fontSize: 40, color: "#4a453c", marginTop: 28 }}>{SUB}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 6, background: "#ff3b00" }} />
          <span style={{ fontSize: 28, color: "#837a6c" }}>{FOOTER}</span>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Noto Sans SC", data: font, weight: 700, style: "normal" }] : [] },
  );
}
