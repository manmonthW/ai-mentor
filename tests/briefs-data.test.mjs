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
    date: "2026-09-14",
    itemCount: 8,
  },
  {
    date: "2026-09-15",
    itemCount: 9,
  },
  {
    date: "2026-09-07",
    mainId: "tdwpwREQm2kdS4bP_-PATA",
    childIds: [
      "hom4EJYcoqa04t8P50LgGg", "NxRN1lU4trtXEd4_JPoZ4A", "-dXCb01gj3YCV6LHbH1AGw",
      "XVCgYnBi2LNLNSJ7Hh3fPw", "VG5eD0-yqmuQB-IxUW-8uQ", "X77LoTA2Wqq-nKbMo2OF_Q",
      "ykGMTXkVj-eWOy9TaXNvug", "tdwpwREQm2kdS4bP_-PATA",
    ],
    fullText: 5,
    titleOnly: 3,
    itemCount: 8,
  },
  {
    date: "2026-09-08",
    mainId: "RFaua7o2EhOIqck3q7AnJA",
    childIds: [
      "7UgT_nKsJBJdePgv_s8Piw", "l2FDgfFACHF_smQ0ZR2HTg", "bINXguaCisUfQ17tA61yUQ",
      "cXx-xxkXG666cvKjdktRoA", "PWd5S1Xew2540h7YsX85Mg", "JSO9e-sQK20Lx1hv01lKPg",
      "eeeJMjCSQftjskkFc60ZNA", "kR8VGXCqleCo_KzvdY-KNg", "f_5eMcbaZSs2vbK4JQ4nzA",
    ],
    fullText: 8,
    titleOnly: 1,
    itemCount: 9,
  },
  {
    date: "2026-09-09",
    mainId: "SJvFXVUYVbhI55aZWYj05w",
    childIds: [
      "Y13161SUQE3FH1mac8sIxA", "QjIQhrayJK47SAN2E5TpdA", "Z_kYT86kERNYwXrAC3w_Xw",
      "Ey0GaGl3erC6sm_ubOOEEQ", "XXK7ejnZinFSv8nnY_VxkA", "LtSA4ujn9Cs-WNu0sDOvfg",
      "SIFyLBt0JSkDUnjb45dIFQ", "9aHSWR4h02pEevAZyH1Lgg", "Ta66pElxaAC8Ulpwf5tCOw",
    ],
    fullText: 9,
    titleOnly: 0,
    itemCount: 9,
  },
  {
    date: "2026-09-10",
    mainId: "47WZuT9Lc2zaV8qXI9dfFw",
    childIds: [
      "LnUELzf0IyALtS4sCoEolw", "KlcYAmY8323gfv1XGgdUHA", "EetIRfqAB1bGkBmufZKYPw",
      "D-I1TCpkSsPuKLFVd-6fDA", "d2siJoxVpDPrcX5PXHZv3A", "IAyYxKWSMeC8seNkWdHq5Q",
      "VwHPYRm_UnUAPi0zTxkaCg", "m_olIo_4Xi8ZJmeCVeJvnA", "ojnPlORVWnNieziWaHVf8w",
    ],
    fullText: 9,
    titleOnly: 0,
    itemCount: 9,
  },
  {
    date: "2026-09-11",
    mainId: "5PP7Tazner724OxXpY8H_A",
    childIds: [
      "qg0NU3NNUbp1co2PdkAPAg", "DeRINAhowAGMobWR1yz_Ug", "TfqaD0HS3NAsOduYjC1Ptg",
      "SuVfrbU1265HXewb-YO8AA", "JKmcG1AUCINGOmD2U00VxA", "_cxfK9AlPhv635qkAu7hlA",
      "wFiCpTKjystW2rGfHxuong", "k4MVNOBVoy4uu4c4ZsMpDg", "k9-5_hoTp7uwuyadJcpECQ",
    ],
    fullText: 8,
    titleOnly: 1,
    itemCount: 9,
  },
  {
    date: "2026-09-16",
    mainId: "xcL6S0C8JN55D43b1b2lhA",
    childIds: Array(10).fill("xcL6S0C8JN55D43b1b2lhA"),
    fullText: 0,
    titleOnly: 10,
    itemCount: 10,
  },
  {
    date: "2026-09-17",
    mainId: "DstCN36veEO21no4_vo8Ng",
    childIds: Array(9).fill("DstCN36veEO21no4_vo8Ng"),
    fullText: 0,
    titleOnly: 9,
    itemCount: 9,
  },
  {
    date: "2026-09-18",
    mainId: "ePg0n47SQoLiA8AhtRWT0Q",
    childIds: Array(8).fill("ePg0n47SQoLiA8AhtRWT0Q"),
    fullText: 0,
    titleOnly: 8,
    itemCount: 8,
  },
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
    itemCount: 9,
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
    itemCount: 9,
  },
  {
    date: "2026-09-22",
    mainId: "FFtUavCjawo40TokJjfw1w",
    childIds: [
      "YJmteuFKuOsHRemL9YjQbg", "QCHjEye57BUKUNInPKb4cA", "0x-tXOxlutrxE9YNODng0A",
      "-J598xWiMu6gIls_dERfRw", "9xswBSikTTErGX-LGjg4oA", "8IrHbNboy58FZO2PcxxSTw",
      "gbjDsY7AJv9hXxstGvPY3A", "rUrUNHWEQvEoQlAXK9MfDQ", "HZZEMDldR19mwlvmfpuCEA",
      "TXylfIKU0VZNO9eNzbW0mQ",
    ],
    fullText: 10,
    titleOnly: 0,
    itemCount: 10,
  },
  {
    date: "2026-09-23",
    mainId: "WHdSwsopsLsB15W6AP1zmQ",
    childIds: [
      "grok-4-7-20260923", "mimo-v2-6-20260923", "hy-image-3-5-20260923",
      "me-dex-1-0-20260923", "zhenwu-v900-20260923", "hygon-1000-20260923",
      "openai-math-agmai-20260923", "jev-interview-20260923", "rsi-verification-20260923",
    ],
    fullText: 6,
    titleOnly: 3,
    itemCount: 9,
  },
];

function editionBlock(text, date) {
  const start = text.indexOf(`date: "${date}"`);
  assert.notEqual(start, -1, `${date} edition missing`);
  const next = text.indexOf("\n  {\n    date:", start + 1);
  return text.slice(start, next === -1 ? text.indexOf("\n];", start) : next);
}

test("September 14-15 editions satisfy the complete data contract", () => {
  const text = source();
  const expectedCounts = new Map([
    ["2026-09-14", 8],
    ["2026-09-15", 9],
  ]);

  for (const [date, itemCount] of expectedCounts) {
    const block = editionBlock(text, date);
    const mainUrlMatch = block.match(/^\s{4}sourceUrl:\s*["']([^"']+)["']/m);
    assert.ok(mainUrlMatch, `${date}: main sourceUrl`);
    const mainUrl = new URL(mainUrlMatch[1]);
    assert.equal(mainUrl.protocol, "https:", `${date}: main source protocol`);
    assert.equal(mainUrl.hostname, "mp.weixin.qq.com", `${date}: main source host`);

    const childUrls = [...block.matchAll(/^\s{8}sourceUrl:\s*["']([^"']+)["']/gm)].map((match) => match[1]);
    assert.equal(childUrls.length, itemCount, `${date}: child source count`);
    const expectedUniqueSources = date === "2026-09-14" ? itemCount - 1 : itemCount;
    assert.equal(new Set(childUrls).size, expectedUniqueSources, `${date}: child source count must match the sources actually published`);
    childUrls.forEach((url) => {
      const parsed = new URL(url);
      assert.equal(parsed.protocol, "https:", `${date}: child source protocol`);
      assert.equal(parsed.hostname, "mp.weixin.qq.com", `${date}: child source host`);
    });

    for (const field of ["id", "category", "title", "tencentSummary", "interpretation", "whyItMatters", "evidenceLevel", "checkedAt", "sourceTitle", "sourceUrl"]) {
      assert.equal((block.match(new RegExp(`^\\s{8}${field}:`, "gm")) ?? []).length, itemCount, `${date}: ${field}`);
    }
    assert.equal((block.match(/^\s{8}evidenceLevel: "(?:full_text|title_only)"/gm) ?? []).length, itemCount, `${date}: evidence enum`);
    assert.equal((block.match(new RegExp(`^\\s{8}checkedAt: "${date}"`, "gm")) ?? []).length, itemCount, `${date}: checkedAt`);
    assert.match(block, /title: "珂的非官方整理：/, `${date}: nonofficial title`);
    assert.match(block, /本站为非官方整理/, `${date}: nonofficial copyright label`);
    assert.match(block, /版权归原作者(?:和发布者)?/, `${date}: copyright ownership`);
  }
});

test("brief detail template keeps safe external links and decorative icons hidden", () => {
  const detail = source(dynamicPagePath);
  const externalLinks = [...detail.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((match) => match[0]);
  assert.equal(externalLinks.length, 2);
  externalLinks.forEach((link) => assert.match(link, /rel="noopener noreferrer"/));
  assert.match(detail, /<StatusIcon[^>]*aria-hidden="true"/);
  assert.equal((detail.match(/<ArrowUpRight[^>]*aria-hidden="true"/g) ?? []).length, 2);
});

test("all brief editions have valid, unique WeChat sources and required fields", () => {
  const text = source();
  for (const edition of editions.filter(({ mainId }) => mainId)) {
    const block = editionBlock(text, edition.date);
    assert.match(block, new RegExp(`sourceUrl: "https://mp\\.weixin\\.qq\\.com/s/${edition.mainId}"`));
    const urls = [...block.matchAll(/^\s{8}sourceUrl:\s*["']([^"']+)["']/gm)].map((match) => match[1]);
    assert.equal(urls.length, edition.itemCount);
    const mainUrl = `https://mp.weixin.qq.com/s/${edition.mainId}`;
    const fallbackUrls = urls.filter((url) => url === mainUrl);
    const childUrls = urls.filter((url) => url !== mainUrl);
    assert.equal(new Set(childUrls).size, childUrls.length);
    if (fallbackUrls.length && fallbackUrls.length === edition.itemCount) {
      assert.equal((block.match(/^\s{8}evidenceLevel: "title_only"/gm) ?? []).length, edition.itemCount);
    }
    assert.deepEqual(urls.map((url) => url.split("/").at(-1)), edition.childIds);
    urls.forEach((url) => {
      const parsed = new URL(url);
      assert.equal(parsed.protocol, "https:");
      assert.equal(parsed.hostname, "mp.weixin.qq.com");
    });
    for (const field of ["tencentSummary", "interpretation", "whyItMatters", "evidenceLevel", "checkedAt", "sourceTitle", "sourceUrl"]) {
      assert.equal((block.match(new RegExp(`^\\s{8}${field}:`, "gm")) ?? []).length, edition.itemCount, `${edition.date}: ${field}`);
    }
    assert.equal((block.match(/^\s{8}evidenceLevel: "full_text"/gm) ?? []).length, edition.fullText);
    assert.equal((block.match(/^\s{8}evidenceLevel: "title_only"/gm) ?? []).length, edition.titleOnly);
  }
});

test("requested September 16-23 brief batch exists with exact source item counts", () => {
  const text = source();
  const expected = new Map([
    ["2026-09-16", 10],
    ["2026-09-17", 9],
    ["2026-09-18", 8],
    ["2026-09-20", 9],
    ["2026-09-21", 9],
    ["2026-09-22", 10],
    ["2026-09-23", 9],
  ]);
  for (const [date, itemCount] of expected) {
    const block = editionBlock(text, date);
    assert.equal((block.match(/^\s{8}tencentSummary:/gm) ?? []).length, itemCount, date);
  }
});

test("homepage and sitemap discover briefs from the data layer", () => {
  const home = source(homePagePath);
  const sitemap = source(new URL("../src/app/sitemap.ts", import.meta.url));
  assert.match(home, /reduce\([\s\S]*brief\.date > latest\.date/);
  assert.doesNotMatch(home, /href="\/briefs\/2026-09-21"/);
  assert.match(sitemap, /briefs\.map/);
  assert.doesNotMatch(sitemap, /"\/briefs\/2026-09-21"/);
});

test("new five-edition batch preserves current evidence scope, attribution, and copyright", () => {
  const text = source();
  for (const date of ["2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11"]) {
    const block = editionBlock(text, date);
    const expected = editions.find((edition) => edition.date === date);
    assert.equal((block.match(/^\s{8}checkedAt: "2026-09-22"/gm) ?? []).length, expected.itemCount);
    assert.match(block, /珂的非官方整理/);
    assert.match(block, /已读取正文不等于独立交叉核验/);
    assert.match(block, /版权归原作者/);
    assert.doesNotMatch(block, /已证实|事实证明|必将|一定会/);
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

test("2026-09-23 preserves requested evidence state, attribution, and copyright", () => {
  const block = editionBlock(source(), "2026-09-23");
  assert.equal((block.match(/^\s{8}checkedAt: "2026-09-23"/gm) ?? []).length, 9);
  assert.equal((block.match(/^\s{8}evidenceLevel: "full_text"/gm) ?? []).length, 6);
  assert.equal((block.match(/^\s{8}evidenceLevel: "title_only"/gm) ?? []).length, 3);
  assert.match(block, /珂的非官方整理/);
  assert.match(block, /已读取正文不等于独立交叉核验/);
  assert.match(block, /本站为非官方整理/);
  assert.match(block, /版权归原作者和发布者/);
  assert.match(block, /腾讯摘要|厂商称|OpenAI 称|认为/);
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
