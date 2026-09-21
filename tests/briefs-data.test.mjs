import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const dataPath = new URL("../src/data/briefs.ts", import.meta.url);
const dynamicPagePath = new URL("../src/app/briefs/[date]/page.tsx", import.meta.url);
const legacyDetailPath = new URL("../src/app/briefs/2026-09-21/page.tsx", import.meta.url);
const listPagePath = new URL("../src/app/briefs/page.tsx", import.meta.url);
const homePagePath = new URL("../src/app/page.tsx", import.meta.url);
const source = (path = dataPath) => readFileSync(path, "utf8");

const editions = [
  {
    date: "2026-09-20",
    mainId: "pL8UK11hs5z2qu5nwgl7bA",
    childIds: [
      "u3oTtbEFuTUAPWsEYZSXkw", "ZJHhQrDeiwOGkkaqHw7kqA", "JA-fKZLgoXpQl9G9xzmdog",
      "aZTOlQUnULqptBgGGKZXEg", "vAhhXRfpcVnGNeHgRIM69Q", "hLkEzbEvF8m79qmofngIZg",
      "ZEmB7xiRrvh7_eHvOogjhQ", "yTRfQCybSFsvb5wX0nY51g", "3LNY2w6t-xAaGa9roD4WYw",
    ],
    fullText: 4,
    titleOnly: 5,
  },
  {
    date: "2026-09-21",
    mainId: "T4DrR5-t0XpPeehtZbNPKg",
    childIds: [
      "rphPh91aHpcOovORbAo2Kw", "fQa_seXe03mm2f5ISqOHJQ", "WLnBfojjQHcuiqI6wteQUw",
      "KC71_44AnVQ9mnwBYJHGVA", "dQucrl2On0yDS1wxzAcAQg", "OFG-FkhmVDJ30VplYgLQZQ",
      "45mhPwu97oBIB0Ra3mcB3A", "tUOxFKGDGTweX193w_JCqA", "vwQB-j7eT25Wiz6ZJsiS3Q",
    ],
    fullText: 9,
    titleOnly: 0,
  },
];

function editionBlock(text, date) {
  const start = text.indexOf(`date: "${date}"`);
  assert.notEqual(start, -1, `${date} edition missing`);
  const next = text.indexOf("\n  {\n    date:", start + 1);
  return text.slice(start, next === -1 ? text.indexOf("\n];", start) : next);
}

test("both editions have valid, unique WeChat sources and required fields", () => {
  const text = source();
  for (const edition of editions) {
    const block = editionBlock(text, edition.date);
    assert.match(block, new RegExp(`sourceUrl: "https://mp\\.weixin\\.qq\\.com/s/${edition.mainId}"`));
    const urls = [...block.matchAll(/^\s{8}sourceUrl:\s*["']([^"']+)["']/gm)].map((match) => match[1]);
    assert.equal(urls.length, 9);
    assert.equal(new Set(urls).size, 9);
    assert.deepEqual(urls.map((url) => url.split("/").at(-1)), edition.childIds);
    urls.forEach((url) => {
      const parsed = new URL(url);
      assert.equal(parsed.protocol, "https:");
      assert.equal(parsed.hostname, "mp.weixin.qq.com");
    });
    for (const field of ["tencentSummary", "interpretation", "whyItMatters", "evidenceLevel", "checkedAt", "sourceTitle", "sourceUrl"]) {
      assert.equal((block.match(new RegExp(`^\\s{8}${field}:`, "gm")) ?? []).length, 9, `${edition.date}: ${field}`);
    }
    assert.equal((block.match(/^\s{8}evidenceLevel: "full_text"/gm) ?? []).length, edition.fullText);
    assert.equal((block.match(/^\s{8}evidenceLevel: "title_only"/gm) ?? []).length, edition.titleOnly);
  }
});

test("2026-09-20 preserves requested evidence state, attribution, and copyright", () => {
  const block = editionBlock(source(), "2026-09-20");
  assert.equal((block.match(/^\s{8}checkedAt: "2026-09-21"/gm) ?? []).length, 9);
  assert.match(block, /珂的非官方整理/);
  assert.match(block, /已读取正文不等于独立交叉核验/);
  assert.match(block, /版权归原作者/);
  assert.match(block, /据(?:原文|官方)|原文称|官方称|腾讯摘要/);
  assert.doesNotMatch(block, /已证实|事实证明|必将|一定会/);
});

test("detail route is one reusable dynamic template", () => {
  assert.equal(existsSync(dynamicPagePath), true);
  assert.equal(existsSync(legacyDetailPath), false);
  const detail = source(dynamicPagePath);
  assert.match(detail, /generateStaticParams/);
  assert.match(detail, /getBrief\(date\)/);
  assert.match(detail, /notFound\(\)/);
  assert.doesNotMatch(detail, /getBrief\("2026-09-21"\)/);
  assert.match(detail, /brief\.items\.length/);
  assert.match(detail, /NON-OFFICIAL AI BRIEF/);
});

test("attribution surfaces and link accessibility remain explicit", () => {
  const data = source();
  const detail = source(dynamicPagePath);
  assert.match(detail, /珂的非官方整理/);
  assert.match(source(listPagePath), /珂的非官方整理|brief\.title/);
  assert.match(source(homePagePath), /珂的非官方整理|briefs/);
  assert.match(data, /基于腾讯研究院公开主文和关联原文的短摘要与评论/);
  assert.equal((detail.match(/target="_blank" rel="noopener noreferrer"/g) ?? []).length, 2);
  assert.match(detail, /<StatusIcon[^>]*aria-hidden="true"/);
});
