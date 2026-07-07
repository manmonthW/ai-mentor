# 珂以这样玩AI

王珂的个人品牌主站——「王珂 · 可以 · 这样玩 AI」的三重双关。一个用 AI 把想法当天变成产品的独立造物者:作品墙、造物记(手记)、Skill 蒸馏、法律 AI 与一人公司。

> 定位:高产、好玩、能落地的 AI 造物者。三支柱——**造** / **蒸馏** / **法律 & 一人公司**。

## 技术栈

- **Next.js 16**(App Router)+ React 19 + TypeScript
- **Tailwind v4**(设计系统在 `src/app/globals.css` 的 `@theme`)
- **MDX**(手记)via `next-mdx-remote`
- 真实 RSS 资讯聚合(`src/lib/news.ts`)

## 目录

```
src/
  app/
    page.tsx            首页(Hero / 三支柱 / 精选作品 / 最新手记 / 关注)
    works/              作品墙(可筛选)
    skills/             技能蒸馏馆(女娲 / 仓颉旗舰)
    blog/[slug]/        手记(MDX 渲染)
    legal/ solo/ training/  法律AI / 一人公司 / AI培训 纵向页
    news/               AI 情报(真实 RSS 聚合)
    api/news/           资讯 API(30 分钟 revalidate)
    sitemap.ts robots.ts rss.xml/  SEO
  components/           Navigation / Footer / WorkCard / Subscribe
  content/blog/*.mdx    手记内容
  data/                 works / skills / legal / opc / training
  lib/                  blog / news
```

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## 内容维护

- **加作品**:编辑 `src/data/works.ts`,截图放 `public/shots/{id}.png`。
- **写手记**:在 `src/content/blog/` 新增 `.mdx`(frontmatter: title/description/date/category/tags)。
- **资讯源**:在 `src/lib/news.ts` 的 `FEEDS` 增删 RSS/Atom 源;非 AI 原生源用 `aiOnly` 按关键词过滤。资讯只做真实抓取,抓不到就诚实空着,不编造。

## 部署

面向 Vercel。主域 `keaimentor.com`。

---
© 珂以这样玩AI · 王珂
