---
title: 开发指南
description: Sonic 开发指南——仓库结构、构建命令、测试套件、文档一致性核验与参与贡献。
---

**修订日期：2026 年 11 月 3 日｜版本：1.9**

本页功能核对基于最新公开 RC `rc/sonic-20261031@a75f5cb`（2026-11-01 UTC）；较早默认分支 `main@ce443c8`（2026-10-27 UTC）仅作兼容性对照，不证明 RC 功能已部署，在线版本未知。

本页面向参与开发与二次开发的读者，说明仓库结构、建置指令、测试套件与文件一致性核验。本站以简体中文为维护基准，其余九种语言为译本；强制法律、消费者有利解释与易懂告知优先。授权与法律边界见[开源与自行部署法律](/open-source/)。

## 1. 仓库结构

| 路径 | 内容 |
| --- | --- |
| `player/` | Vue 3 网页播放器（内建 zh／en／ja 三语 i18n） |
| `functions/` | Cloudflare Pages Functions 边缘网关（路由、限流、缓存、熔断） |
| `functions/_lib/sonic/` | 推荐、身份、上游协定与安全共享逻辑 |
| `server/` | 数据面 Node.js 22 引擎（含 `recommend-sqlite.ts` SQLite 存储） |
| `Dockerfile` / `docker-compose.yml` | 数据面容器堆叠（sonic-engine + ncm-api） |
| `docs/` | 运营、合规、审计改进与已知问题文件 |
| `tests/` | 安全、网关、推荐与发布关卡测试 |

## 2. 构建与本地运行

```bash
npm ci                              # 根依赖
pnpm --dir player install --frozen-lockfile
npm run build                       # 播放器建置 + 复制至 dist
npx wrangler pages dev dist         # 本地边缘网关（无数据面时自动降级模式）
npm run build:engine && npm run start:engine   # 本地数据面引擎
```

## 3. 测试套件

发布前由 `npm test` 执行，涵盖：

1. 网关行为与降级（`test-sonic-gateway.mjs`、`test-local-engine-and-degradation.mjs`）；
2. 验证兼容性与 OAuth 安全（`test-auth-compatibility.mjs`、`tests/oauth-security.test.ts`）；
3. SSRF 与安全强化（`tests/ssrf-security.test.ts`、`tests/security*.test.ts`）；
4. 推荐与搜索（`tests/recommendation-and-search.test.ts`）；
5. 前端 XSS（`tests/frontend-xss.test.ts`）；
6. 设置一致性——`.env.example` 与代码读取的环境变量逐项比对（`tests/config-parity.test.ts`）；
7. 发布 P0/P1 关卡（`tests/release-p0-p1-gate.test.ts`）。

## 4. 文档一致性核验

本站（sonicdocs）随版本演进与源代码核对，核验工具链：

```bash
pnpm validate    # 建置 + 页内锚点失效链接检查 + 多语言结构对称核验
```

1. `scripts/validate-anchors.cjs`：全站页内锚点与图片引用零失效链接；
2. `scripts/check-structure.py`：多语言版本标题／表格／图片／提示框结构 1:1；
3. `doc/legal-reference.md`：GDPR 条号引用白名单（EUR-Lex 核验底稿），文件中不得出现白名单外条号；
4. 按指定版本与实际部署核对技术说明，包含默认画像分析、公开搜索原文再利用、电子邮件头像请求、HTTP 上游连接、部分删除与失败未显示。源代码核对不是在线合规认证，也不免除错误告知责任；矛盾应修正并通知受影响用户。

## 5. 参与贡献

1. 议题与讨论：GitHub 代码库 Issue（`github.com/shijianus/sonic`）；
2. 提交前执行完整测试套件与 `npm run lint`；
3. 涉及数据处理的变更（新增搜集项目、变更保留策略、新增第三方共享）须同步更新本站对应文件并走一致性核验；
4. 第三方依赖引入须更新 `THIRD_PARTY_NOTICES.md` 并评估隐私与授权影响。

## 6. 文档翻译贡献

本站以简体中文为维护基准，其余九种语言为译本；强制法律、易懂告知与消费者有利解释优先于语言约定。须逐段完整翻译，包括待解决问题与强制条款，维持 H2/H3 数量、表格维度、图片 URL 与提示框数量并在地化内部链接。各文件独立使用修订日期与版本，不追溯成立同意或推定部署日期。新增语言须注册、补齐文件、结构核验并依 `doc/legal-reference.md` 检查引用格式。
