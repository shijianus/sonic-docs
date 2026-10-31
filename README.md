# SonicDocs · epocanvas sonic 官方法律文档站

本目录是 **epocanvas sonic** 的官方法律文档站（独立 git 仓库，位于 sonic 仓库之外）：法律内容以**欧盟《通用数据保护条例》（GDPR）为全体用户之最低资料保护标准**（无论用户所在地），条号引用以 [`doc/legal-reference.md`](doc/legal-reference.md) 为唯一核验底稿（EUR-Lex 合并文本，2026-10-30 核验）；全部技术事实（行为事件采集范围、假名化标识符、90 日保留、日志最小化、第三方清单、默认关闭链路）均经 sonic 仓库源码逐项核实，与 `docs/OPERATIONS.md`、`docs/COMPLIANCE.md` 之表述一致。

- 产品定位：多源音乐串流平台与聚合闸道，Cloudflare 边缘控制面 + Linux 本地协议引擎数据面，开源（仓库根目录 `LICENSE`，MIT）可自托管
- 托管实例：[sonic.epocanvas.tech](https://sonic.epocanvas.tech)（主站）· [sonic.epocanvas.com](https://sonic.epocanvas.com)（备用镜像）
- 视觉：Dignified Minimal 主题（靛蓝 `#2563eb` 主色 + Slate 中性色，与 EpoCanvasDocs / EpomailDocs 家族一致），8 张主题自适应 SVG 原理图（浅色底 + `prefers-color-scheme` 暗色适配，图内微标签英文复用、语义由各语言图注承载），每篇文档开头一张

## 文档架构（专案介绍 1 篇 + 法律 7 篇）

| 文档 | slug | 内容 |
| --- | --- | --- |
| 专案介绍 | `project` | 产品定位、双层架构、核心能力、内容与版权边界、隐私立场、文档导读 |
| 总览 | `overview` | 平台身份、数据控制者/受托处理者角色界定、GDPR 级保护基线、文档地图、效力顺序 |
| 隐私政策 | `privacy-policy` | 告知事项六款、收集之资料（帐户识别／行为事件／聚合统计／本地存储／技术资料）、法律依据（GDPR 第 6 条）、保存期限、当事人权利（第 15–22、77、79 条）、儿童保护（第 8 条） |
| 用户条款 | `terms-of-service` | 电子同意、帐号（Epomail OAuth）、服务说明与降级机制、行为数据授权、责任限制、准据法与管辖、修订 |
| 可接受使用政策 | `acceptable-use` | 禁止行为清单（系统滥用／内容权利／他人权益）、资源上限（240/600 rpm）、执行阶梯与零容忍通道、申诉 |
| 数据处理与安全维护 | `data-security` | 数据生命周期、处理矩阵、四层安全措施、已知局限、资料外泄应变（72 小时通报）、设计与默认、自部署义务 |
| 第三方共享与传输清单 | `sub-processors` | Cloudflare（受托）、Epomail（身份）、上游内容来源（不含身份）、默认关闭链路、法律要求、国际传输（第 44–46 条） |
| 用语定义 | `key-terms` | 法律名词（GDPR 第 4 条词汇）与技术名词（HMAC、PKCE、SSRF、WAL、熔断器等） |

**法律要点**：以 GDPR 作为全体用户之最低资料保护标准——欧盟与欧洲经济区用户 GDPR 直接适用；其他地区用户以 GDPR 标准为自助承诺、按契约义务履行；所在地法律更强保障就其范围优先。托管实例于台湾营运，用户条款准据法为运营者所在地法律（消费者强制管辖除外），资料保护事项不因准据法而降低。简体中文版为正式版本，英文与日文版为对照译本。当前文档版本 **1.2**（生效日期 2026-10-30，全站统一；1.2 新增界面与功能导览并扩充用户条款）。

## 语言矩阵（3 语言 × 8 文档，与产品内建 i18n 一一对应）

| 语言 | 目录 | 说明 |
| --- | --- | --- |
| 简体中文（正式版本） | `src/content/docs/sonic/` | Starlight `root` 约定占用根路径（URL 如 `/sonic/privacy-policy/`） |
| English | `src/content/docs/en/sonic/` | 对照译本 |
| 日本語 | `src/content/docs/ja/sonic/` | 对照译本 |

语言集合与 Sonic 播放器内建 i18n（`player/src/languages/modules/` 之 `zh` / `en` / `ja`）一一对应；如产品新增语言，按同构流程补齐。

## 本地构建与检视

```bash
cd sonicdocs
pnpm install        # astro ^5 / @astrojs/starlight ^0.32
pnpm build          # 24 内容页 + 站点骨架，Pagefind 全文搜索索引
pnpm preview        # http://localhost:4321/
node scripts/validate-anchors.cjs   # 校验 dist 全部页内锚点与图片引用
```

构建时 Starlight 依 Git 提交历史生成「最后更新于」时间戳；`custom.css` 提供明暗双主题设计变量。发布地址暂定 `https://docs.epocanvas.com/sonic/`：部署前将 `astro.config.mjs` 顶部 `SITE_ORIGIN` / `SITE_BASE` 换成实际域名，并同步 `public/robots.txt` 之 `Sitemap:` 行。

## 发布前核验

```bash
pnpm validate       # 构建 + 页内锚点断链检查 + 3 语言 × 8 篇结构对称
```

三项核验之当前基线：27 内容页构建 0 报错；297 个页内锚点 0 断链；3 语言 × 9 篇标题／表格／图片／提示框结构 1:1。

## 法条引用维护

- 条号引用以 [`doc/legal-reference.md`](doc/legal-reference.md) 为唯一白名单：**只允许引用清单已核验之条号**；清单未收录的法规一律不带条号引用
- 引注格式：简中 `GDPR 第 6 条第 1 项第 b 款`；English `Article 6, Paragraph 1, point (b)`（全拼，不得缩写）；日本語 `GDPR 第6条第1項第b号`
- 新增条号时：先于 EUR-Lex 合并文本核对现文，再登记入白名单（条号、主题、关键句、使用文档、核验日期）
- GDPR 修订时：更新核验网址与日期，全语言同步修订受影响之义务表述

## 自托管运营者采用指南

本文档为「通用范本 + 托管实例实文」双轨设计。自托管运营者采用时：

1. **替换身份信息**：实例域名（`sonic.epocanvas.tech` → 你的域名）、联络邮箱、生效日期与版本号；
2. **复核第三方清单**：未开启 GDStudio / Lyriva / ListenBrainz / Gorse 等就保留其「默认关闭」表述；配置了额外外部服务则如实增列，避免过度披露或虚假披露；
3. **核对处理参数**：行为事件保留天数（`SONIC_RECOMMEND_RETENTION_DAYS`，默认 90、下限 7）、落盘路径（`SONIC_RECOMMEND_DB_PATH=memory` 可关闭落盘）、第三方开关（`SONIC_ENABLE_GDSTUDIO` 等）与你的告知一致；
4. **履行控制者义务**：依你所在地法律完成告知、处理活动记录（GDPR 第 30 条）、影响评估（第 35 条）与安全维护（第 32 条），并接受主管机关监督；
5. **按辖区补足法定条款**（UK GDPR / LGPD / CCPA-CPRA 等）；本模板不构成法律意见。

## 一致性保障

- 三语言版本结构 1:1（标题层级、表格行列、图片、提示框逐一对应），修改任一语言时同步其余两种；由 `scripts/check-structure.py` 校验
- 页内锚点与图片引用由 `scripts/validate-anchors.cjs` 全量复核
- 法条引用一致性：`grep -ohP "第\s*\d+\s*条|Article \d+|第\d+条" src/content/docs -r` 抽取全部条号，与 `doc/legal-reference.md` 白名单比对，白名单外条号不得出现
- 时效型事实（保留天数、限流值、开关默认值）随源码演进变化：每次提交前对照 sonic 仓库 `.env.example`、`server/recommend-sqlite.ts`、`functions/_lib/sonic/security.ts` 之当前值刷新对应文档
