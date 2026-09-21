import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const dataPath = new URL("../src/data/briefs.ts", import.meta.url);
const detailPagePath = new URL("../src/app/briefs/2026-09-21/page.tsx", import.meta.url);
const listPagePath = new URL("../src/app/briefs/page.tsx", import.meta.url);
const homePagePath = new URL("../src/app/page.tsx", import.meta.url);
const source = (path = dataPath) => readFileSync(path, "utf8");

const childIds = [
  "rphPh91aHpcOovORbAo2Kw",
  "fQa_seXe03mm2f5ISqOHJQ",
  "WLnBfojjQHcuiqI6wteQUw",
  "KC71_44AnVQ9mnwBYJHGVA",
  "dQucrl2On0yDS1wxzAcAQg",
  "OFG-FkhmVDJ30VplYgLQZQ",
  "45mhPwu97oBIB0Ra3mcB3A",
  "tUOxFKGDGTweX193w_JCqA",
  "vwQB-j7eT25Wiz6ZJsiS3Q",
];

test("2026-09-21 brief has nine unique HTTPS WeChat child sources", () => {
  const text = source();
  const urls = [...text.matchAll(/^\s{8}sourceUrl:\s*["']([^"']+)["']/gm)].map((match) => match[1]);
  assert.equal(urls.length, 9);
  assert.equal(new Set(urls).size, 9);
  for (const url of urls) {
    const parsed = new URL(url);
    assert.equal(parsed.protocol, "https:");
    assert.equal(parsed.hostname, "mp.weixin.qq.com");
  }
  assert.deepEqual(urls.map((url) => url.split("/").at(-1)), childIds);
});

test("all nine items record full-text reading depth and check date", () => {
  const text = source();
  assert.match(text, /export type BriefEvidenceLevel = "full_text" \| "title_only"/);
  assert.equal((text.match(/^\s{8}evidenceLevel:\s*["']full_text["']/gm) ?? []).length, 9);
  assert.equal((text.match(/^\s{8}checkedAt:\s*["']2026-09-21["']/gm) ?? []).length, 9);
  assert.doesNotMatch(text, /verified|partial|只取到标题|仅取到标题|未读取正文|正文未被本站读取/);
  assert.match(text, /已读取正文不等于独立交叉核验/);
  assert.doesNotMatch(text, /官方一手来源/);
});

test("brief attribution, opinion title, and copyright notice are explicit", () => {
  const data = source();
  const detail = source(detailPagePath);
  const list = source(listPagePath);
  const home = source(homePagePath);

  assert.match(data, /title:\s*["'][^"']*(?:珂的非官方整理|本站整理)[^"']*["']/);
  assert.match(detail, /珂的非官方整理|本站整理/);
  assert.match(list, /珂的非官方整理|本站整理/);
  assert.match(home, /珂的非官方整理|本站整理/);
  assert.match(data, /Jake Wharton 认为：AI 编程账单可能贵过程序员/);
  assert.match(data, /基于腾讯研究院公开主文和关联原文的短摘要与评论/);
  assert.match(data, /版权归原作者/);
  assert.match(data, /链接回原文/);
});

test("external links are isolated and status icons are decorative", () => {
  const detail = source(detailPagePath);
  assert.equal((detail.match(/target="_blank" rel="noopener noreferrer"/g) ?? []).length, 2);
  assert.match(detail, /<StatusIcon[^>]*aria-hidden="true"/);
});
