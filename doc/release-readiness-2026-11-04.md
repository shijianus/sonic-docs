# SonicDocs v1.9 上线候选审计与冻结判定（2026-11-04）

## 1. 判定摘要

**技术候选：可冻结。** 十语言 220 页、构建链、站内链接、Pages 路由、搜索、主题图示、移动端布局与浏览器交互均通过本轮门禁，未发现未关闭的技术 P0/P1 缺陷。

**真实服务上线：仍受运营事实阻断。** 控制者法定身份、有效联系渠道、部署版本与地点、供应商合同／传输工具、实际保存与删除流程、适用时的消费者撤回界面仍未核实。该结论与 v1.8 采用核对表一致；文案和 UI 收敛不能替代这些事实。

本轮未执行远程部署、未发送邮件、未签署合同、未操作真实用户数据，也未创建 Git 提交。

## 2. 候选基线

| 项目 | 值 |
| --- | --- |
| 文稿版本 | v1.9 |
| 文稿修订日 | 2026-11-03 |
| 本轮核验日 | 2026-11-04 |
| 内容矩阵 | 10 locale × 22 slug = 220 页 |
| 部署前缀 | `/sonic` |
| 站点来源 | `https://docs.epocanvas.com` |
| 构建入口 | `pnpm build`（先清理 Astro 内容缓存，再 `astro build`，最后 `finalize-pages`） |
| 发布入口 | `pnpm deploy`（先跑完整 `validate`，再上传同一份 `dist`；本轮未执行） |
| 工具链 | Node.js ≥ 22.12、pnpm 10.34.5、Wrangler 4.156.1、Python 3 |

## 3. 门禁结果

| 门禁 | 结果 | 证据 |
| --- | --- | --- |
| 内容矩阵与结构 | 通过：220/220；自测 317 项 | `python scripts/check-structure.py --self-test` |
| 搜索界面翻译 | 通过：10 语言 × 10 键 | `node scripts/check-search-translations.mjs` |
| 构建 | 通过：221 页，222 个 HTML（含 404） | `pnpm build` |
| 链接／锚点／资源 | 通过：14,325 链接、4,151 锚点、573 图片、断链 0 | `node scripts/validate-anchors.cjs` |
| 渲染产物 | 通过：222 页 UTF-8、351 图片、4,410 语言选项、420 翻页链接 | `node scripts/check-rendered-site.mjs` |
| 语言协商 | 通过：61 协商、12 路径、146 重定向/响应头 | `node scripts/test-language-negotiation.mjs` |
| 侧栏翻译 | 通过：22 条目、6 分组、10 语言 | `node scripts/check-sidebar-i18n.mjs` |
| 政策一致性 | 通过：20 篇、564 引用、36 白名单、错误 0 | `python scripts/check-policy-consistency.py` |
| Pages 本地运行时 | 通过：781 请求、0 失败；220 页、328 资源、404 与重定向正常 | `node scripts/test-pages-runtime.mjs` |
| 浏览器黑盒 | 通过：10 语言、1280/390/320、浅色/深色、搜索、图示、翻页、反馈 | `gui-audit/v19-*.png` |

完整日志：[validation-freeze-v1.9-2026-11-04.log](validation-freeze-v1.9-2026-11-04.log)。逐项说明见 [v1.9 交付核验](verification-v1.9-2026-11-04.md)。

## 4. P0/P1/P2 缺陷处置

| 级别 | 缺陷 | 状态 |
| --- | --- | --- |
| P1 | 入口页 `reading-paths.svg` 以 960×224 声明，实际 960×240，存在布局偏移 | 已修复为 240 |
| P1 | 入口页深色主题仍加载浅色 SVG，视觉割裂 | 已用 `<picture>` + `prefers-color-scheme` 修复，打印回落浅色 |
| P1 | 阅读路径圆点／进度／刻度由 `set:html` 注入，Astro 作用域 CSS 未命中，轨道被黑点打断、当前节点无高亮 | 已改用 `:global()` 选择器，轨道、节点、进度和端点恢复 |
| P1 | 图示生成器重复绘制 `SONIC` 页眉，入口图出现重影 | 已删除重复绘制并重新生成 26 个 SVG |
| P1 | `diagram-legends.mjs` 的十语言图例从未渲染，非英文页缺少图内编号说明 | 已接入 rehype 流程，120 个图示页注入本地化图例 |
| P2 | 24 条拉丁文字页面 meta description 超过 200 字符，搜索摘要会被截断 | 已压缩到约 135–170 字符 |
| P2 | Astro 增量缓存不跟踪 rehype 依赖，可能复用旧 HTML | `pnpm build` 现先清理 `.astro` 与 `node_modules/.astro`，保证全量生成 |
| P2 | 日文首次搜索需加载 Pagefind 索引，本地约数秒 | 保留；属 Pagefind 运行时行为，结果与 UI 正常 |
| P2 | 剪贴板权限被浏览器拒绝时复制失败 | 已有本地化失败提示与地址栏兜底，非阻断 |

截至本报告，无未关闭的技术 P0/P1。

## 5. 生产挂载契约

- 所有页面、`_astro` 资源、图片、favicon、Pagefind 索引、sitemap 与 404 均以 `/sonic/` 前缀可访问。
- `public/_redirects` 与 `scripts/finalize-pages.mjs` 生成 223 条规则，覆盖 220 个 canonical 尾斜杠重定向、18 个语言入口和 3 条基础规则；Pages 本地运行时逐一通过。
- 根路径 `/` 由 Pages Functions 按 `Accept-Language` 协商，返回 `302`、`Vary: Accept-Language` 与 `cache-control: no-store`。
- `/sonic`（无尾斜杠）返回 `308` 到 `/sonic/`；`/sonic/` 提供不强制跳转的十语言选择页。
- 404 的语言选择器落到各语言总览，不指向未生成的本地化 404。
- 静态入口页的深色阅读路径图使用 `screen and (prefers-color-scheme: dark)`，打印与浅色系统保持浅色。

若生产平台不能等价重写 `/sonic/` 前缀，本冻结结论不适用于该部署；不能以本地预览通过替代生产挂载验收。

## 6. 上线前仍须完成的运营条件

以下条件不因本轮 UI/内容收敛而关闭，采用前须逐项核对 [v1.8 实例采用核对表](sonic-v1.8-adoption-checklist.md)：

1. 确认控制者法定身份、适用地址／电话与有效联系渠道；验证 `admin@epocanvas.com` 与 `privacy@epocanvas.com` 的送达和公告状态。
2. 记录实际部署提交、启用功能、服务器国家与供应商关系；不得用 RC 的安全描述代替未知或旧版部署。
3. 为可选画像、Auto DJ、搜索词复用、邮箱头像、雷达与本地封面共享建立合法依据与事前选择；未完成时暂停相应处理。
4. 核实每类数据的保存期限、备份删除延迟、跨身份删除与接收者通知能力；不能用按钮成功代替完整删除。
5. 核实适用时的跨境传输工具、处理者合同、消费者订约前信息、法定撤回表单与在线撤回入口。
6. 确认文档站自身的控制者、日志与 Pagefind／语言请求头处理，不把“浏览器内搜索”表述为零日志。
7. 建立可执行的权利请求流程：收件验证、身份核验、适用时限、失败记录与人工兜底。

## 7. 冻结判定

- **技术冻结：通过。** 可交付的候选是当前工作树生成的 `dist`、v1.9 文稿、校验脚本和本报告；任何后续改动都必须重新执行 `pnpm validate` 并重跑浏览器关键路径。
- **生产发布：未批准。** `pnpm deploy` 未执行；运营采用条件未完成前，不应将本站描述为已合规的公开服务。
- **发布后复核：** 若上线，需在生产域名复验 `/sonic/` 挂载、语言协商、搜索索引、主题图示、移动端布局、404 与缓存头，并保存生产截图与响应头证据。

## 8. 证据索引

| 证据 | 路径 |
| --- | --- |
| 完整校验日志 | `doc/validation-freeze-v1.9-2026-11-04.log` |
| 交付核验 | `doc/verification-v1.9-2026-11-04.md` |
| 实例采用条件 | `doc/sonic-v1.8-adoption-checklist.md` |
| 法律引用底稿 | `doc/legal-reference.md` |
| 源码核对 | `doc/sonic-source-audit-2026-11-02.md` |
| 最终 UI 截图 | `gui-audit/v19-*.png` |
| 历史 v1.8 验证 | `doc/verification-v1.8-2026-11-02.md` |
