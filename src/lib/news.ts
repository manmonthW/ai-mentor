// 真实 AI 资讯聚合:抓取公开 RSS/Atom,解析后返回。
// 与旧版最大的区别:数据是真的。抓不到就诚实返回空,绝不编造。

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  date: string; // ISO
  summary: string;
}

export interface NewsResult {
  ok: boolean;
  updatedAt: string;
  sources: string[];
  items: NewsItem[];
}

const FEEDS: { url: string; source: string; aiOnly?: boolean }[] = [
  { url: "https://www.qbitai.com/feed", source: "量子位" },
  { url: "https://www.theverge.com/rss/index.xml", source: "The Verge", aiOnly: true },
];

// 非 AI 原生源(如 The Verge)只保留与 AI 相关的条目
const AI_RE =
  /\b(AI|A\.I\.|artificial intelligence|GPT|LLM|Claude|Gemini|OpenAI|Anthropic|model|chatbot|machine learning|neural|Copilot|Nvidia|agent)\b/i;

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

function pick(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? decode(m[1]) : "";
}

function parse(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  // RSS <item>
  const rss = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  for (const b of rss) {
    const title = pick(b, "title");
    const link = pick(b, "link");
    if (!title || !link) continue;
    const date = pick(b, "pubDate") || pick(b, "dc:date");
    items.push({
      title,
      link,
      source,
      date: date ? new Date(date).toISOString() : "",
      summary: pick(b, "description").slice(0, 120),
    });
  }
  // Atom <entry>
  const atom = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  for (const b of atom) {
    const title = pick(b, "title");
    const hrefM = b.match(/<link[^>]*href="([^"]+)"/i);
    const link = hrefM ? hrefM[1] : "";
    if (!title || !link) continue;
    const date = pick(b, "updated") || pick(b, "published");
    items.push({
      title,
      link,
      source,
      date: date ? new Date(date).toISOString() : "",
      summary: pick(b, "summary").slice(0, 120),
    });
  }
  return items;
}

export async function fetchAINews(): Promise<NewsResult> {
  const collected: NewsItem[] = [];
  const okSources: string[] = [];

  await Promise.all(
    FEEDS.map(async ({ url, source, aiOnly }) => {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0 (KeyiWanAI news aggregator)" },
          next: { revalidate: 1800 }, // 30 分钟
        });
        if (!res.ok) return;
        const xml = await res.text();
        let parsed = parse(xml, source);
        if (aiOnly) parsed = parsed.filter((it) => AI_RE.test(it.title + " " + it.summary));
        parsed = parsed.slice(0, 12);
        if (parsed.length) {
          collected.push(...parsed);
          okSources.push(source);
        }
      } catch {
        /* 单源失败不影响其他源 */
      }
    }),
  );

  collected.sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    ok: collected.length > 0,
    updatedAt: new Date().toISOString(),
    sources: okSources,
    items: collected.slice(0, 24),
  };
}
