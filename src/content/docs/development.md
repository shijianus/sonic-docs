---
title: 开发指南
description: Sonic 开发指南——仓库结构、构建命令、测试套件、文档一致性核验与参与贡献。
---

**生效日期：2026 年 11 月 1 日｜版本：1.4**

本页面向参与开发与二次开发之读者，说明仓库结构、构建命令、测试套件与文档一致性核验。许可证与法律边界见[开源与自行部署法律](/open-source/)。

## 1. 仓库结构

| 路径 | 内容 |
| --- | --- |
| `player/` | Vue 3 网页播放器（内建 zh／en／ja 三语 i18n） |
| `functions/` | Cloudflare Pages Functions 边缘闸道（路由、限流、缓存、熔断） |
| `functions/_lib/sonic/` | 推荐、身份、上游协议与安全共享逻辑 |
| `server/` | 数据面 Node.js 22 引擎（含 `recommend-sqlite.ts` SQLite 存储） |
| `Dockerfile` / `docker-compose.yml` | 数据面容器堆叠（sonic-engine + ncm-api） |
| `docs/` | 运维、合规、审计整改与已知问题文档 |
| `tests/` | 安全、网关、推荐与发布门禁测试 |

## 2. 构建与本地运行

```bash
npm ci                              # 根依赖
pnpm --dir player install --frozen-lockfile
npm run build                       # 播放器构建 + 复制至 dist
npx wrangler pages dev dist         # 本地边缘闸道（无数据面时自动降级模式）
npm run build:engine && npm run start:engine   # 本地数据面引擎
```

## 3. 测试套件

发布前由 `npm test` 执行，覆盖：

1. 网关行为与降级（`test-sonic-gateway.mjs`、`test-local-engine-and-degradation.mjs`）；
2. 认证兼容性与 OAuth 安全（`test-auth-compatibility.mjs`、`tests/oauth-security.test.ts`）；
3. SSRF 与安全硬化（`tests/ssrf-security.test.ts`、`tests/security*.test.ts`）；
4. 推荐与搜索（`tests/recommendation-and-search.test.ts`）；
5. 前端 XSS（`tests/frontend-xss.test.ts`）；
6. 配置一致性——`.env.example` 与代码读取之环境变量逐项比对（`tests/config-parity.test.ts`）；
7. 发布 P0/P1 门禁（`tests/release-p0-p1-gate.test.ts`）。

## 4. 文档一致性核验

本站（sonicdocs）随版本演进与源码核对，核验工具链：

```bash
pnpm validate    # 构建 + 页内锚点断链检查 + 多语言结构对称校验
```

1. `scripts/validate-anchors.cjs`：全站页内锚点与图片引用零断链；
2. `scripts/check-structure.py`：多语言版本标题／表格／图片／提示框结构 1:1；
3. `doc/legal-reference.md`：GDPR 条号引用白名单（EUR-Lex 核验底稿），文档中不得出现白名单外条号；
4. 技术事实随版本对照源码（`.env.example`、`server/recommend-sqlite.ts`、`functions/_lib/sonic/security.ts`）刷新，不一致时以源码为准修正文档。

## 5. 参与贡献

1. 议题与讨论：GitHub 代码库 Issue（`github.com/shijianus/sonic`）；
2. 提交前运行完整测试套件与 `npm run lint`；
3. 涉及资料处理之变更（新增收集项、变更保留策略、新增第三方共享）须同步更新本站对应文档并走一致性核验；
4. 第三方依赖引入须更新 `THIRD_PARTY_NOTICES.md` 并评估隐私与许可影响。

## 6. 文档翻译贡献

本站为多语言对照结构：任一语言之修改须同步其余语言（结构 1:1 由脚本校验）。新增语言时：注册 locale、补齐全部文档、加入结构脚本语言清单，并按 `doc/legal-reference.md` 之该语言引注格式核对法条引用。
