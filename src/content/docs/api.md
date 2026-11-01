---
title: 开放平台与 API 接入
description: Sonic 开放 API 接入——统一回传结构、端点导航、API Key 认证与传递规范、限流与撤销。
---

**生效日期：2026 年 11 月 1 日｜版本：1.4**

本页说明 Sonic 开放 API 之接入方式：统一回传结构、核心端点、API Key 认证与传递规范、限流与撤销。接入行为受[用户条款](/terms-of-service/)与[可接受使用政策](/acceptable-use/)约束；端点规格之权威表述见上游仓库 `API.md`。

## 1. 统一回传结构

全部端点对外承诺 `brand: "Sonic"` 相容性契约，标准回传如下：

```json
{
  "brand": "Sonic",
  "data": { "id": "191254", "title": "红豆", "quality": "320k" },
  "meta": {
    "cached": true,
    "cacheLevel": "edge",
    "provider": "nexus",
    "degraded": false,
    "circuitState": "CLOSED"
  }
}
```

`meta` 字段如实标注缓存层级、提供方、降级状态与熔断器状态，客户端可据此呈现透明提示。

## 2. 核心端点导航

| 分类 | 方法 | 端点 | 功能 |
| --- | --- | --- | --- |
| 智慧推荐 | GET | `/api/sonic/recommend/for-you` | 猜你喜欢／Auto DJ |
| | GET | `/api/sonic/recommend/trending` | 趋势热榜（24h／7d／surging／new） |
| | GET | `/api/sonic/recommend/similar` | 相似曲目／歌手探索 |
| | GET | `/api/sonic/recommend/discover` | 风格流派雷达 |
| 行为事件 | POST | `/api/sonic/events` | 回传行为事件（批量至多 50 条） |
| | GET | `/api/sonic/events` | 查询推荐画像概览 |
| | DELETE | `/api/sonic/events` | 一键清空个人画像 |
| 聚合搜索 | GET | `/api/sonic/search/smart` | 智慧混合搜索与补全 |
| | GET | `/api/sonic/search/nexus` | 全网多源并行检索 |
| 动态歌词 | GET | `/api/sonic/lyrics/nexus` | 逐字歌词（YRC/QRC/KRC → AMLL → LRCLIB） |
| | GET | `/api/sonic/lyrics/sync` | 跨平台同步歌词（多格式输出） |
| 音讯媒体 | GET | `/api/music/stream` | 音讯分段代理（Range／206；`?mode=redirect` 直连） |
| | GET | `/api/music/cover` | 封面代理（高画质优先，降级 SVG） |
| | GET | `/api/music/palette` | 封面色温分析 |
| 认证 | GET | `/api/auth/user` | 当前会话资料 |
| | GET／POST | `/api/auth/key` | 查看／重签 API Key |
| | POST | `/api/auth/revoke` | 撤销当前金钥（需显式金钥标头） |
| | POST | `/api/auth/logout` | 登出并撤销会话 |

## 3. API Key 认证

1. **格式**：`sonic_live_v2.<header>.<payload>.<signature>` 版本化格式，HMAC-SHA256 签名；载荷含 `sub`（电子邮箱）、`iat`、`exp`、`jti`、`kid`、`role`、`uid`；
2. **签发**：经 Epomail OAuth 登录后由 `/api/auth/key` 取得；签发有效期 30 日，校验上限 90 日；
3. **传递**：仅允许请求标头——`X-Sonic-Key: <key>` 或 `Authorization: Bearer <key>`；URL 查询参数通道已完全移除，避免金钥泄漏至访问日志、浏览器历史或 Referer；
4. **校验**：服务器端以 Web Crypto 常数时间比对，严格检查版本、`kid`、`iat`／`exp`、`jti` 与撤销清单；无签名金钥与旧版金钥一律拒绝（fail-closed）。

## 4. 限流与撤销

| 项目 | 上限 |
| --- | --- |
| 匿名请求 | 每分钟 240 次（缺省值） |
| 认证请求 | 每分钟 600 次（缺省值） |
| 认证端点 | 每分钟每 IP 30 次 |
| 行为事件上报 | 单批至多 50 条、请求体 64 KB |

撤销机制：登出即时撤销当前会话与 `jti`；部署者可配置 `SONIC_REVOKED_JTIS`／`SONIC_REVOKED_SUBS`／`SONIC_TOKEN_MIN_IAT` 静态清单，或绑定 KV 开启即时撤销。正常个人使用不会触及限流；持续超限进入[可接受使用政策](/acceptable-use/)之执行阶梯。

## 5. 接入者义务

1. API Key 为个人凭证，不得转交第三方或嵌入公开发行之客户端；
2. 自建客户端应尊重限流、呈现降级提示（`X-Sonic-Degraded: 1`）并遵守[可接受使用政策](/acceptable-use/)之禁止行为清单；
3. 第三方客户端接入时对终端用户之告知义务，由接入者自行承担；自行部署实例之 API 使用者请一并阅读[开源与自行部署法律](/open-source/)。
