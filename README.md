# SonicDocs · epocanvas sonic 官方法律文档站

本目录是 **epocanvas sonic** 的官方法律文档站（独立 git 仓库，位于 sonic 仓库之外）：法律内容以**欧盟《通用数据保护条例》（GDPR）为全体用户之最低资料保护标准**（无论用户所在地），条号引用以 [`doc/legal-reference.md`](doc/legal-reference.md) 为唯一核验底稿（EUR-Lex 合并文本，2026-10-30 核验）；全部技术事实（行为事件采集范围、假名化标识符、90 日保留、日志最小化、第三方清单、默认关闭链路）均经 sonic 仓库源码逐项核实，与 `docs/OPERATIONS.md`、`docs/COMPLIANCE.md` 之表述一致。

- 产品定位：多源音乐串流平台与聚合闸道，Cloudflare 边缘控制面 + Linux 本地协议引擎数据面，开源（仓库根目录 `LICENSE`，MIT）可自托管
- 托管实例：[sonic.epocanvas.tech](https://sonic.epocanvas.tech)（主站）· [sonic.epocanvas.com](https://sonic.epocanvas.com)（备用镜像）
- 视觉：Dignified Minimal 主题（靛蓝 `#2563eb` 主色 + Slate 中性色，与 EpoCanvasDocs / EpomailDocs 家族一致），8 张主题自适应 SVG 原理图（浅色底 + `prefers-color-scheme` 暗色适配，图内微标签英文复用、语义由各语言图注承载）+ 11 张托管实例真实运行截图（`public/images/sonic/ui/`，本地实际运行前端截取）与莫比乌斯声波品牌徽标（`public/logo.svg`）

## 文档架构（专案介绍 1 篇 + 法律 7 篇）

| 文档 | slug | 内容 |
| --- | --- | --- |
| 专案介绍 | `project` | 产品定位、双层架构、核心能力、音源与歌词链路、推荐引擎、安全与隐私设计、适用边界、部署形态、质量保障、常见疑问、文档导读 |
| 界面与功能导览 | `interface` | 首页与推荐（含音乐与风格雷达）、侧栏折叠与帐号入口、搜索、排行榜与官方榜单、歌手与专辑库、播放控制、播放器抽屉与逐字歌词、我的音乐、设置、隐私与数据控制、移动端（11 张真实运行截图） |
| 总览 | `overview` | 平台身份、数据控制者/受托处理者角色界定、GDPR 级保护基线、文档地图、效力顺序 |
| 快速上手 | `quickstart` | 打开网站、搜索与播放、登录与收藏同步、下载与本地音乐、移动端、隐私设置第一步、常见问题速查 |
| 功能指南 | `features` | 音质分级与试听透明、逐字歌词链路、推荐与 Auto DJ、下载与本地音乐、排行榜、MV、搜索容错、降级模式 |
| 搜索与规则参考 | `search-syntax` | 检索范围、容错与匹配规则、多源并行与去重、结果操作、搜索与隐私 |
| 音乐库管理 | `library` | 喜爱与收藏、最近播放、下载列表、本地音乐、存储位置一览 |
| 移动端指南 | `mobile` | 布局与导航、移动播放器抽屉、首页与雷达、存储与同步边界、使用建议 |
| 故障排查 | `troubleshooting` | 播放、降级模式、搜索、登录、存储、限流与错误码、提报指引 |
| 开放平台与 API 接入 | `api` | 统一回传结构、端点导航、API Key 认证与传递规范、限流与撤销、接入者义务 |
| 隐私政策 | `privacy-policy` | 告知事项六款、收集之资料（帐户识别／行为事件／聚合统计／本地存储／技术资料）、法律依据（GDPR 第 6 条）、保存期限、当事人权利（第 15–22、77、79 条）、儿童保护（第 8 条） |
| 用户条款 | `terms-of-service` | 电子同意、帐号（Epomail OAuth）、服务范围明细、降级机制、行为数据授权、音质与试听标识、责任限制、准据法与管辖、修订 |
| 可接受使用政策 | `acceptable-use` | 禁止行为清单（系统滥用／内容权利／他人权益）、资源上限（240/600 rpm）、执行阶梯与零容忍通道、申诉 |
| 数据处理与安全维护 | `data-security` | 数据生命周期、处理矩阵、四层安全措施、已知局限、资料外泄应变（72 小时通报）、设计与默认、自部署义务 |
| 第三方共享与传输清单 | `sub-processors` | Cloudflare（受托）、Epomail（身份）、上游内容来源（不含身份）、默认关闭链路、法律要求、国际传输（第 44–46 条） |
| 推荐算法说明 | `recommendation` | 行为信号与权重、热度模型、会话意图与长期偏好、MMR 重排与 Auto DJ、音乐与风格雷达、控制权 |
| 帐户与安全指南 | `account-security` | Epomail OAuth 登录、会话机制、API Key 保管、撤销与登出、安全使用建议、帐号管理入口 |
| 数据导出与存储 | `data-management` | 数据位置总览、画像概览查询、导出与备份、清除操作、自部署实例 |
| 开源与自行部署法律 | `open-source` | 许可证现状（MIT 权威/历史 CC 意图）、商标边界、第三方致谢、部署者法律义务、本站文档采用指南 |
| 部署指南 | `deployment` | Pages 与 Docker 双方案、核心环境变量、备份恢复、健康检查与回滚、部署者核对清单 |
| 开发指南 | `development` | 仓库结构、构建与本地运行、测试套件、文档一致性核验、参与贡献、翻译贡献 |
| 用语定义 | `key-terms` | 法律名词（GDPR 第 4 条词汇）与技术名词（HMAC、PKCE、SSRF、WAL、熔断器等） |

**法律要点**：以 GDPR 作为全体用户之最低资料保护标准——欧盟与欧洲经济区用户 GDPR 直接适用；其他地区用户以 GDPR 标准为自助承诺、按契约义务履行；所在地法律更强保障就其范围优先。托管实例于台湾营运，用户条款准据法为运营者所在地法律（消费者强制管辖除外），资料保护事项不因准据法而降低。简体中文版为正式版本，英文与日文版为对照译本。当前文档版本 **1.5**（生效日期 2026-11-02，全站统一；1.5 新增搜索规则/音乐库/移动端/推荐算法/帐户安全/数据导出/故障排查七篇，侧栏扩至 6 组 22 条，界面导览同步 sonic 最新 UI——莫比乌斯声波新 Logo、折叠模式、Epomail 帐号入口、音乐与风格雷达）。

## 语言矩阵（10 语言 × 22 文档 = 220 内容页，对齐 EpoCanvasDocs 语言集合）

| 语言 | 目录 | 说明 |
| --- | --- | --- |
| 简体中文（正式版本） | `src/content/docs/` | Starlight `root` 约定占用根路径（URL 如 `/sonic/privacy-policy/`） |
| 繁體中文 | `src/content/docs/zh-tw/` | 对照译本（台湾用语） |
| English | `src/content/docs/en/` | 对照译本 |
| Français | `src/content/docs/fr/` | 对照译本 |
| Español | `src/content/docs/es/` | 对照译本 |
| Deutsch | `src/content/docs/de/` | 对照译本 |
| 日本語 | `src/content/docs/ja/` | 对照译本 |
| 한국어 | `src/content/docs/ko/` | 对照译本 |
| Português | `src/content/docs/pt/` | 对照译本 |
| Русский | `src/content/docs/ru/` | 对照译本 |

十语言集合与 EpoCanvasDocs 一致；其中 `zh` / `en` / `ja` 与 Sonic 播放器内建 i18n 一一对应，其余七语为对照译本。每篇文档头部标注生效日期与版本号，全站统一（当前 1.3）。

## 本地构建与检视

```bash
cd sonicdocs
pnpm install        # astro ^5 / @astrojs/starlight ^0.32
pnpm build          # 24 内容页 + 站点骨架，Pagefind 全文搜索索引
pnpm preview        # http://localhost:4321/ —— 根路径按 Accept-Language 协商跳转（与生产 functions/ 一致）
node scripts/validate-anchors.cjs   # 校验 dist 全部页内锚点与图片引用
```

构建时 Starlight 依 Git 提交历史生成「最后更新于」时间戳；`custom.css` 提供明暗双主题设计变量。发布地址暂定 `https://docs.epocanvas.com/sonic/`：部署前将 `astro.config.mjs` 顶部 `SITE_ORIGIN` / `SITE_BASE` 换成实际域名，并同步 `public/robots.txt` 之 `Sitemap:` 行。

## 发布前核验

```bash
pnpm validate       # 构建 + 页内锚点断链检查 + 3 语言 × 8 篇结构对称
```

三项核验之当前基线：220 内容页构建 0 报错；页内锚点 0 断链；10 语言 × 22 篇标题／表格／图片／提示框结构 1:1（精确数字见最新一次 `pnpm validate` 输出）。

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

- 十语言版本结构 1:1（标题层级、表格行列、图片、提示框逐一对应），修改任一语言时同步其余九种；由 `scripts/check-structure.py` 校验
- 页内锚点与图片引用由 `scripts/validate-anchors.cjs` 全量复核
- 法条引用一致性：`grep -ohP "第\s*\d+\s*条|Article \d+|第\d+条" src/content/docs -r` 抽取全部条号，与 `doc/legal-reference.md` 白名单比对，白名单外条号不得出现
- 时效型事实（保留天数、限流值、开关默认值）随源码演进变化：每次提交前对照 sonic 仓库 `.env.example`、`server/recommend-sqlite.ts`、`functions/_lib/sonic/security.ts` 之当前值刷新对应文档
