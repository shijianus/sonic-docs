---
title: 部署指南
description: Sonic 部署指南——Cloudflare Pages 边缘闸道与 Linux 本地引擎双方案、环境变量、备份恢复、健康检查与回滚。
---

**修订日期：2026 年 11 月 2 日｜版本：1.8**

本页说明 Sonic 部署、设置、备份与还原。功能说明核对最新公开 RC `rc/sonic-20261031@a75f5cb`（2026-11-01 UTC）；较早默认分支 `main@ce443c8`（2026-10-27 UTC）仅供相容性对照，不证明 RC 已部署，线上版本未知。以下示例须先选择核对的 RC 提交，不能将默认克隆得到的旧 main 视为相同实现。责任依实际运营及资料处理角色判断，纯个人测试与公开服务须分别评估。源代码核对不证明运营者法律身份、节点国家、合同或线上合规；公开处理前须解决[隐私政策](/privacy-policy/)与[开源与自行部署法律](/open-source/)所述问题。操作细节见上游 `docs/OPERATIONS.md`，不是合规认证。

## 1. 方案 A：Cloudflare Pages 边缘闸道

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME
```

运行前，请将 `YOUR_PROJECT_NAME` 替换为实际的 Pages 项目名。于 Cloudflare Pages 后台设置加密环境变量：`SONIC_SECRET`、`SONIC_ENGINE_SECRET`（与 VPS 侧一致）、`SONIC_LOCAL_ENGINE_URL`（指向你的资料面通道域名）。

## 2. 方案 B：Linux 本地协议引擎（Docker Compose）

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
cp .env.example .env
chmod 600 .env    # 填入强随机 SONIC_ENGINE_SECRET 与 SONIC_SECRET
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

堆叠组成：sonic-engine 主容器（宿主仅映射 `127.0.0.1:8080`）、内网封闭之 ncm-api 辅助容器、SQLite 持久化（具名磁盘区 `sonic-data`）。资料面经 Cloudflare Tunnel 接入，不直接对外公开。

## 3. 核心环境变量

| 变数 | 说明 |
| --- | --- |
| `SONIC_SECRET` | API Key 签章金钥，长度 ≥ 32 字元（`openssl rand -base64 48`） |
| `SONIC_ENGINE_SECRET` | 服务间金钥，Pages 与 VPS 双侧一致 |
| `SONIC_LOCAL_ENGINE_URL` | 资料面通道位址 |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | 内建音源协定开关（默认 1） |
| `SONIC_ENABLE_AMLL/LRCLIB` | 歌词补位开关（默认 1） |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | 可选路径；GDStudio 代码未设置时默认开启，环境／Compose 范例为关闭，须逐项核验并停用违法或不必要路径 |
| `SONIC_RECOMMEND_DB_PATH` | 储存路径；`memory` 改变此储存的持久性，不涵盖全部日志、远端服务或浏览器存储 |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 默认 90、下限 7；启动／部分写入清理，另有固定 90 日写入路径，涵盖范围不完整 |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | 限流（默认 240／600） |
| `EPOMAIL_BASE_URL` 等 | Epomail OAuth 设置 |

完整清单见上游仓库 `.env.example`；隐私相关开关之告知一致性要求见[数据处理与安全维护](/data-security/)第 6 节。

## 4. 备份与恢复

1. **备份**：`npm run backup:db` 使用 `VACUUM INTO` 与完整性检查；备份可能含可关联个人资料，而非仅匿名统计，须保护并订定必要保存期限，不能假定排程已部署；
2. **还原**：停机后以 `npm run restore:db` 还原快照，核对版本与架构相容性，日常使用前重新套用删除记录；无法逐项删除的备份应隔离至明确期限届满；
3. **容量**：事件清理在启动与部分写入时触发，不是逐笔到期销毁；雷达、搜索统计、日志与备份须独立控制，并核验固定 90 日写入路径及监测储存空间。

## 5. 健康检查与回滚

1. **健康检查**：`GET /api/sonic/engine/health`（需服务金钥）回传引擎与熔断器状态；边缘侧熔断器对资料面连续失败自动降级；
2. **日志**：应用程序访问日志最小化字段，但错误、主机、代理与提供者仍可能保留请求信息；原始 IP 限流键可进入 KV，边缘转送客户端位址、会话及上下文至引擎。须核验实际日志与期限，不应宣称零日志；
3. **回滚**：Pages 侧回滚至上一部署版本即可；资料面以 `git checkout` 上一标签重新 `docker compose up -d --build`；回滚前确认 SQLite 架构相容（无迁移框架）。

## 6. 部署者核对清单

上线前逐项确认：

1. 金钥为强随机且长度 ≥ 32 字元，`.env` 权限 600，并核验凭证撤销储存与失败处理；
2. 盘点实际接收者、角色、合同及节点国家，核对直连 Google Fonts、电子邮件 DiceBear 请求、外部图片与 MV 连线；认证本身不是传输依据；
3. 对事件、雷达、搜索统计、日志及备份落实必要期限与经验证的删除，默认 90 日与重置按钮不足以完成；
4. 维持资料面非公开并核验每段连线，加密通道不会保护核对代码中仍存在的 HTTP 上游请求；
5. 测试备份到期、重新套用删除记录的还原及目前界面可能隐藏的失败；
6. 公布准确身份与资料告知并落实有效事前选择：默认个性化不是同意，公开搜索原文再利用须控制；缺少合法依据与必要保障的可选处理应暂停（见[隐私政策](/privacy-policy/)）。
