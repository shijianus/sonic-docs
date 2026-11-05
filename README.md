# SonicDocs · Sonic 服务与数据文档

**文档版本：1.9｜修订日期：2026-11-03**

本仓库维护 Sonic 个人、免费、非营利学习与公益测试项目的服务条款、隐私说明和使用指南。文档面向实际采用这些政策的托管实例；自部署者须按自己的行为、配置和适用法律另行告知。代码仓库为 [shijianus/sonic](https://github.com/shijianus/sonic)。

托管服务定位为个人维护的实验／测试服务。我们重视用户隐私，以严格的数据保护原则作为设计与持续改进方向，参照 GDPR 的数据最小化、目的限制、透明告知和用户控制原则，尽合理努力提供与实际风险相称的高水平保护。这是保护目标，不表示已经获得欧盟认证、全面符合欧盟及成员国全部法律，或能保证零风险；具体数据流、已知风险和未核实事项仍须如实披露。

项目不额外提供商业服务等级、永久运营或生产环境合规认证承诺。非营利、免费、开源及学习目的均不免除适用法律义务；“尽合理努力”不能替代身份告知、合法依据、必要安全措施或权利处理，风险说明也不要求用户接受不合法的处理或放弃权利。

2026-11-02 重新核对公开 `main` 的 [`ce443c801d2eafdbdc53e60b12b088ba3bac4d67`](https://github.com/shijianus/sonic/commit/ce443c801d2eafdbdc53e60b12b088ba3bac4d67)（2026-10-27 UTC），以及较新的公开候选分支 `rc/sonic-20261031` 的 [`a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8`](https://github.com/shijianus/sonic/commit/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8)（2026-11-01 UTC）。本套功能说明以该候选提交为据，明确标明旧主线差异；GitHub 没有已发布 Release，候选分支不等于线上部署。静态检查不能证明实际版本、供应商合同、保存期限或删除结果。详细证据和仍须落实的条件见 [源码核对记录](doc/sonic-source-audit-2026-11-02.md)。

本仓库既有文档拟用 `admin@epocanvas.com`（服务与账号）和 `privacy@epocanvas.com`（隐私与权利请求）。本轮未在受审 Sonic 上游源码确认这两个地址的公告，也未发信验证送达，不能把它们写成已核验的运营联系资料。运营者的法定姓名／实体、法律要求的地址和电话、节点国家及供应商关系仍待补齐；实例采用前须确认或更正联系方式并核实可用性。

## 文档与语言

`src/content/docs/` 共 **10 种语言 × 22 篇 = 220 内容页**。简体中文位于根目录，其余目录为 `zh-tw`、`en`、`fr`、`es`、`de`、`ja`、`ko`、`pt`、`ru`。简体中文是维护基准；强制法律、易懂告知及消费者有利解释不因语言约定而减损。

| 文档组 | 内容 |
| --- | --- |
| 核心法律文档 | `overview`、`privacy-policy`、`terms-of-service`、`acceptable-use`、`data-security`、`sub-processors`、`key-terms` |
| 项目与使用 | `project`、`interface`、`quickstart`、`features`、`search-syntax`、`library`、`mobile`、`troubleshooting` |
| 账户与数据 | `account-security`、`recommendation`、`data-management` |
| 开源与开发 | `open-source`、`deployment`、`development`、`api` |

本轮版本为 **1.9／2026-11-03**，UI 收敛构建为 **1.9.1／2026-11-05**：在 v1.8 法律实质修订基础上，统一简体中文正文的大陆规范用语（个人数据、项目、账号、信号、在线、存储等），重绘主题自适应 SVG 图示，补充阅读路径、页面反馈、复制链接与翻页体验；十语言 220 页、侧栏、搜索与渲染检查全部同步。v1.9.1 增加全站页脚语言声明、文档状态徽标与阅读路径悬停提示，并修复报告链接。v1.8 的四类核心法律页面保护定位、数据风险与用户权利内容保留。全站版本由检查脚本验证。既有 UI 截图仅示意界面，截图内“不会上传”或清除提示不是实际行为的证明。采用前应完成 [v1.8 实例采用核对表](doc/sonic-v1.8-adoption-checklist.md)（其运营条件仍适用）。旧 v1.6／v1.7 交付包保留为历史材料；本轮验证见 [v1.9 核验报告](doc/verification-v1.9-2026-11-04.md) 与 [v1.9.1 UI 冻结报告](doc/release-readiness-2026-11-05.md)。

## 本地构建与检查

工具链要求 Node.js ≥ 22.12、pnpm 10.34.5 和 Python 3；Wrangler 4.156.1 已固定在开发依赖与锁文件。

```bash
pnpm install --frozen-lockfile
pnpm validate
pnpm preview:pages
```

`pnpm validate` 依次检查内容矩阵与自测、构建、站内链接／图片／锚点、渲染 HTML、十语言入口与侧栏、政策引用及 Cloudflare Pages 本地 HTTP 行为。它会启动独立的临时 Pages 进程，验证后清理，不部署到远程。`scripts/check-structure.py` 检查 UTF-8、日期／版本、Markdown 结构与已审阅概念；`scripts/check-policy-consistency.py` 检查识别到的 GDPR 条号、列表／范围、引用格式、源码说明及技术字面值。自动检查不证明全部译文法义等价、实际运营身份、合法依据或删除已经落实。

`public/_redirects` 和构建末尾的 `scripts/finalize-pages.mjs` 将 `/sonic/` 请求映射到平铺的 `dist`，同时显式规范全部文档的尾斜杠，防止 Pages 跳转时丢失 `/sonic`。直接运行 `astro build` 会跳过该末尾步骤，正式产物必须由 `pnpm build`／`pnpm validate` 生成。根路径由 Pages Functions 按 `Accept-Language` 跳转；`/sonic/` 提供不强制跳转的十语言选择。语言切换清除旧章节锚点，正文图片支持原图对话框及无脚本链接兜底。

`pnpm preview:pages` 使用实际 Pages 本地运行时；`pnpm preview` 是便于阅读的轻量预览，不能替代 Pages 验收。默认发布地址是 `https://docs.epocanvas.com/sonic/`。`pnpm deploy` 必须先通过完整 `validate`，再用锁定的 Wrangler 上传同一份 `dist`；这是对外发布操作，本次未执行。冻结判定与截图证据见 [v1.9 上线候选审计报告](doc/release-readiness-2026-11-04.md) 与 [v1.9.1 UI 冻结复验](doc/release-readiness-2026-11-05.md)。

## 维护依据

- 新增编号法条前，先核对官方文本，再登记 [legal-reference.md](doc/legal-reference.md)；不要把旧模板的台湾法要求套到未核实的主体。
- 技术事实记录分支、完整提交和文件行号，区分源码默认、示例配置与实际部署。查不到身份、国家、合同或期限时明确记录缺项，不能编造。
- 修改法律文档须同步十种语言、相关指南、图内文字和站点摘要；`scripts/check-structure.py` 核对标题层级、完整表格尺寸、图片、提示框和版本，但不替代语义及日期审阅。
- 音乐、歌词、封面与 MV 的权利须分别向相应权利人或许可文件核对；代码许可、第三方内容许可和文档使用权不能相互推定，非营利或学习用途也不自动授予内容使用权。

## 自部署采用

自部署者不能只替换域名就沿用全部披露。应确定自己的控制者身份、处理目的、法律依据、实际提供方、服务器地区、日志与备份期限、同意流程和删除能力。GDStudio 的代码缺省与示例环境配置不同；推荐开关、内存存储或无痕窗口都不能单独证明数据不外传或删除已经完成。

适用 GDPR 时按风险和具体门槛判断处理记录、影响评估、代表及数据保护官等要求；人数少或免费不构成概括豁免，也不意味着每个学习者都须采购商业合规服务。仅供本人使用的隔离测试与向公众提供服务应分别判断。
