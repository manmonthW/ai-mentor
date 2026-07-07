# 珂以这样玩AI · SEO + GEO 推广规划

> 站点:www.keaimentor.com(Next.js 16 SSG · Vercel)。受众中文为主。
> 目标:让「王珂 / 珂以这样玩AI」在**传统搜索(Google/百度)**和**AI 答案引擎(ChatGPT/Perplexity/豆包/Kimi/DeepSeek/文心)**里都能被搜到、被引用、被推荐。

---

## 0. 现状诊断

**已有(地基不错)**:静态渲染(SSG,爬虫友好)、`sitemap.xml`、`robots.txt`、`rss.xml`、每页 metadata + OpenGraph 标签、语义化 HTML、干净的 URL。

**缺口(这次要补)**:
- 无**结构化数据(JSON-LD)** —— 搜索引擎与 AI 都靠它理解「你是谁、页面是什么」。
- 无真实**OG 分享图**(社媒/AI 卡片没有封面)。
- 未做**站长验证**(Google Search Console / 百度站长 / Bing)。
- 无**分析**(看不到流量与关键词)。
- 无 **llms.txt**(给 AI 爬虫的站点导航)。
- **内容量少**(手记仅 4 篇)、**站外引用几乎为零**(新域名,权重低)。

---

## 1. SEO 策略(Google + 百度)

### 1.1 技术 SEO(Phase 1 · 可代码实现)
- **JSON-LD 结构化数据**:
  - 全站:`Person`(王珂,含 `sameAs` 指向 GitHub/知乎/公众号)、`WebSite`(含 `SearchAction`)。
  - 手记:每篇 `Article`(标题/描述/日期/作者)、`BreadcrumbList`。
  - 培训页:`Course`;FAQ 页:`FAQPage`;教程:`HowTo`。
- **动态 OG 图**:用 Next.js `opengraph-image`(ImageResponse)按页/按文章自动生成品牌封面。
- **站长工具**:Google Search Console + 百度站长平台 + Bing Webmaster —— 验证域名、提交 sitemap、主动推送新页面。
- **性能/Core Web Vitals**:作品截图 PNG 偏大 → 转 WebP / 用 `next/image` 懒加载与自适应尺寸;字体已 `display:swap`。
- **百度专项**:百度对 JS 收录弱,但本站是 SSG(静态)对百度友好;做百度站长「普通收录」主动提交 + 百度统计。

### 1.2 内容 SEO(Phase 2)
- **关键词(中文长尾)**:法律AI、裁判文书 AI 分析、一人公司 AI 报税、Claude Skill 教程、女娲/仓颉 skill、大连中考志愿、货代 AI 智能体、企业 AI 培训定制、Dify 工作流实战。
- **支柱页 + 卫星文**:把 `/legal`、`/solo`、`/training` 做成深度支柱页,每个配 3-5 篇卫星文章内链(如「裁判文书AI怎么用」「一人公司报税全流程」)。
- **内容飞轮**:每个作品 → 一篇造物记长文(H1/H2 结构、关键词、内链回作品与支柱页)。目标每周 1-2 篇。
- **内链网**:作品 ↔ 造物记 ↔ 支柱页 互链;图片 alt 补全。

### 1.3 站外 SEO(Phase 3 · 权重与外链)
- **内容分发回链**:知乎、掘金、CSDN、少数派、简书、微信公众号、小红书、B站。
- **GitHub 杠杆**(你已有几十个 repo):个人 profile README + 各 repo README 链主站;争取被 `awesome-*` 收录。
- **工具榜单收录**:AI 工具导航(ai-bot.cn、Toolify、GptsHunter)、Product Hunt(英文作品如 Banana Slides)。
- 访谈/播客/投稿换取自然外链。

---

## 2. GEO 策略(让 AI 答案引擎引用你)

> GEO = Generative Engine Optimization。目标:当有人问 ChatGPT/Perplexity/豆包/Kimi「法律AI工具推荐」「一人公司怎么用AI」时,**你的作品被引用、你的名字被提到**。

### 2.1 让内容"可被引用"(写法层)
- **开头即答**:每篇文章第一段给 TL;DR / 直接结论 —— AI 偏爱可摘录的定义、结论、清单。
- **结构化表达**:多用「定义 + 步骤 + 对比表 + FAQ」,少用纯叙事;AI 更爱引用结构化片段。
- **权威信号(E-E-A-T)**:署名、日期、真实数据、引用来源、"我做过/我上线过"的第一手经验。
- **实体一致性**:全网统一「王珂 / 珂以这样玩AI」的名称、简介、头像(NAP 一致),让它成为一个清晰实体。

### 2.2 技术层(Phase 1 · 可代码实现)
- **`llms.txt`**:站点根放一份给 LLM 的导航(你是谁、有哪些板块、关键页面链接)。
- **放行 AI 爬虫**:`robots.txt` 明确 allow `GPTBot`、`PerplexityBot`、`ClaudeBot`、`Google-Extended`、`Bytespider`(豆包)等 —— GEO 要被引用就得让它们爬。
- **结构化数据**(同 SEO 的 JSON-LD)帮 AI 理解实体与内容。
- **FAQPage / HowTo schema** 让问答型内容更易被抽取。

### 2.3 站外 GEO(最关键:被第三方提及 = 被 AI 引用)
AI 答案高频引用**知乎、百科、GitHub、Reddit、行业媒体、榜单**。所以:
- **知乎系统化输出**:回答「法律AI有哪些」「一人公司如何用AI单干」「Claude Skill 怎么写」等问题,自然带出作品与主站。
- **百度百科/中文维基词条**(够格时)或至少让品牌名在多平台一致出现。
- **GitHub 高星 + awesome 收录**:AI 极常引用 GitHub;把 nuwa/cangjie 等 skill 的 README 做好、求 star。
- 跨平台**同一简介 + 同一头像 + 互相 sameAs 链接**,强化实体。

### 2.4 监测
每两周在 ChatGPT / Perplexity / 豆包 / Kimi 问:「法律AI工具推荐」「王珂 AI」「珂以这样玩AI」,记录是否被提及,反哺内容。

---

## 3. 分发矩阵(中枢-辐射)

主站是大本营,内容一鱼多吃:
| 内容类型 | 主战场 |
|---|---|
| 造物记 / 技术 | 掘金、知乎、CSDN |
| 方法论 / 观点 | 微信公众号、知乎 |
| 短 demo / 视觉 | 小红书、B站、抖音 |
| 英文 / 出海作品 | X(Twitter)、Product Hunt |
| 代码 | GitHub(回链主站) |
全部**回链主站**,把外部流量沉淀为自有受众(邮件/微信)。

---

## 4. 路线图 + 优先级

**Phase 1 · 技术地基(本周,大部分我能直接写代码上线)**
JSON-LD(Person/WebSite/Article)、`llms.txt`、robots 放行 AI 爬虫、动态 OG 图、图片转 WebP、接入分析 → 然后你去 Google Search Console / 百度站长 验证并提交 sitemap。

**Phase 2 · 内容(1 个月)**
三个支柱页深化 + 每周 1-2 篇 SEO/GEO 友好文章(开头即答 + 结构化)+ 同步分发。

**Phase 3 · 站外(持续)**
知乎/百科/榜单/GitHub 外链 + GEO 提及监测迭代。

---

## 5. 指标(怎么算成功)
- **SEO**:GSC/百度 收录页数、目标关键词排名、自然搜索流量、品牌词搜索量。
- **GEO**:AI 引擎「被提及率」(人工抽查清单)、来自 AI 引擎的引荐流量(referrer)。
- **转化**:邮件/微信新增、培训与咨询询盘数。

---

## 6. 需要你本人做的(我代替不了的)
- Google Search Console / 百度站长 / Bing 的**域名验证**(需你的账号;我会把验证所需的 meta/DNS 方式准备好)。
- 各内容平台(公众号/知乎/掘金/小红书)的**账号与发文**。
- 决定是否允许 AI 爬虫用于训练(GEO 默认建议允许,以换取被引用)。
