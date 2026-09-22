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
];

function editionBlock(text, date) {
  const start = text.indexOf(`date: "${date}"`);
  assert.notEqual(start, -1, `${date} edition missing`);
  const next = text.indexOf("\n  {\n    date:", start + 1);
  return text.slice(start, next === -1 ? text.indexOf("\n];", start) : next);
}

test("all brief editions have valid, unique WeChat sources and required fields", () => {
  const text = source();
  for (const edition of editions) {
    const block = editionBlock(text, edition.date);
    assert.match(block, new RegExp(`sourceUrl: "https://mp\\.weixin\\.qq\\.com/s/${edition.mainId}"`));
    const urls = [...block.matchAll(/^\s{8}sourceUrl:\s*["']([^"']+)["']/gm)].map((match) => match[1]);
    assert.equal(urls.length, edition.itemCount);
    assert.equal(new Set(urls).size, edition.itemCount);
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
