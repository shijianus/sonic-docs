---
title: 部署指南
description: Sonic 部署指南——Cloudflare Pages 边缘闸道与 Linux 本地引擎双方案、环境变量、备份恢复、健康检查与回滚。
---

**生效日期：2026 年 11 月 2 日｜版本：1.5**

本页说明自行部署 Sonic 之两种方案、核心环境变量、备份恢复与运维要点。部署之时点起，部署者即为其用户之数据控制者，相关义务见[数据处理与安全维护](/data-security/)第 6 节与[开源与自行部署法律](/open-source/)；操作细节之权威表述见上游仓库 `docs/OPERATIONS.md`。

## 1. 方案 A：Cloudflare Pages 边缘闸道

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <你的项目名>
```

于 Cloudflare Pages 后台配置加密环境变量：`SONIC_SECRET`、`SONIC_ENGINE_SECRET`（与 VPS 侧一致）、`SONIC_LOCAL_ENGINE_URL`（指向你的数据面隧道域名）。

## 2. 方案 B：Linux 本地协议引擎（Docker Compose）

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
cp .env.example .env
chmod 600 .env    # 填入强随机 SONIC_ENGINE_SECRET 与 SONIC_SECRET
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

堆叠组成：sonic-engine 主容器（宿主仅映射 `127.0.0.1:8080`）、内网封闭之 ncm-api 辅助容器、SQLite 持久化（命名卷 `sonic-data`）。数据面经 Cloudflare Tunnel 接入，不直接暴露公网。

## 3. 核心环境变量

| 变量 | 说明 |
| --- | --- |
| `SONIC_SECRET` | API Key 签名密钥，长度 ≥ 32 字符（`openssl rand -base64 48`） |
| `SONIC_ENGINE_SECRET` | 服务间密钥，Pages 与 VPS 双侧一致 |
| `SONIC_LOCAL_ENGINE_URL` | 数据面隧道地址 |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | 内置音源协议开关（缺省 1） |
| `SONIC_ENABLE_AMLL/LRCLIB` | 歌词补位开关（缺省 1） |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | 第三方聚合与解灰（缺省 0，必须保持关闭除非确有需要） |
| `SONIC_RECOMMEND_DB_PATH` | 行为数据落盘路径；设为 `memory` 关闭落盘 |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 行为事件保留天数（缺省 90，下限 7） |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | 限流（缺省 240／600） |
| `EPOMAIL_BASE_URL` 等 | Epomail OAuth 配置 |

完整清单见上游仓库 `.env.example`；隐私相关开关之告知一致性要求见[数据处理与安全维护](/data-security/)第 6 节。

## 4. 备份与恢复

1. **备份**：以一致性快照脚本执行 `VACUUM INTO` 并附完整性检查（`npm run backup:db`）；备份文件含假名化行为数据，应与生产数据同等级保护；
2. **恢复**：停机后以恢复脚本还原快照（`npm run restore:db`）；仓库无版本化迁移框架，恢复目标版本应与备份版本一致；
3. **容量**：行为事件按 90 日保留自动清理，数据库体积随曲目规范数据增长，留意卷空间。

## 5. 健康检查与回滚

1. **健康检查**：`GET /api/sonic/engine/health`（需服务密钥）返回引擎与熔断器状态；边缘侧熔断器对数据面连续失败自动降级；
2. **日志**：引擎侧访问日志仅含路径、方法、状态码与耗时（`docker compose logs`）；不记录查询字符串、IP、Cookie 与请求体；
3. **回滚**：Pages 侧回滚至上一部署版本即可；数据面以 `git checkout` 上一标签重新 `docker compose up -d --build`；回滚前确认 SQLite 架构兼容（无迁移框架）。

## 6. 部署者核对清单

上线路前逐项确认：

1. 两枚密钥均为强随机且长度 ≥ 32 字符，`.env` 权限 600；
2. 第三方链路开关与你的隐私告知一致（未开启者从告知中删除）；
3. 行为事件保留天数与落盘路径符合你的政策承诺；
4. 数据面仅经隧道可达，宿主端口未对公网开放；
5. 已建立备份计划与恢复演练；
6. 已向你的用户发布告知文本（可以本站[隐私政策](/privacy-policy/)为基础）。
