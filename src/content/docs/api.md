---
title: 开放平台与 API 接入
description: Sonic 开放 API 接入——统一回传结构、端点导航、API Key 认证与传递规范、限流与撤销。
---

**修订日期：2026 年 11 月 2 日｜版本：1.8**

本页说明 Sonic 开放 API 之接入方式：统一回传结构、核心端点、API Key 验证与传递规范、限流与撤销。本站以简体中文为维护基准，其余九种语言为译本；强制法律、消费者有利解释与易懂告知优先。接入行为受[用户条款](/terms-of-service/)与[可接受使用政策](/acceptable-use/)拘束；端点规格之权威表述见上游仓库 `API.md`。

托管服务是个人维护、免费非营利测试专案，没有 SLA 或数据恢复保证。本指南核对最新公开 RC `rc/sonic-20261031@a75f5cb`（2026-11-01 UTC）的功能；较早默认分支 `main@ce443c8`（2026-10-27 UTC）仅作相容性对照，不能证明 RC 功能已部署。线上版本未知。个性化默认开启不成立同意；画像重置仅属部分删除，失败可能未显示；凭证撤销依赖设置及请求成功。请勿提交不必要的个人资料、生产资料或凭证。

## 1. 统一回传结构

端点通常采用下列 `brand: "Sonic"` 回传惯例；这是技术格式，不保证每个端点或未来版本持续相容：

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

`meta` 字段如实标注缓存层级、提供者、降级状态与熔断器状态，客户端可据此呈现透明提示。

## 2. 核心端点导航

| 分类 | 方法 | 端点 | 功能 |
| --- | --- | --- | --- |
| 智能推荐 | GET | `/api/sonic/recommend/for-you` | RC 路由；线上可用性依部署核验 |
| | GET | `/api/sonic/recommend/trending` | RC 路由；线上可用性依部署核验 |
| | GET | `/api/sonic/recommend/similar` | RC 路由；线上可用性依部署核验 |
| | GET | `/api/sonic/recommend/discover` | RC 路由；线上可用性依部署核验 |
| 行为事件 | POST | `/api/sonic/events` | RC 路由；事件范围与线上配置须核验 |
| | GET | `/api/sonic/events` | RC 路由；摘要不是完整资料汇出 |
| | DELETE | `/api/sonic/events` | 删除当前身份的部分事件／反馈，不是完整远端删除 |
| 聚合搜索 | GET | `/api/sonic/search/smart` | 智能搜索；另有查询统计和公开建议路径 |
| | GET | `/api/sonic/search/nexus` | 聚合搜索，结果受上游与配置影响 |
| 动态歌词 | GET | `/api/sonic/lyrics/nexus` | 歌词聚合与补位，上游可用性可能变化 |
| | GET | `/api/sonic/lyrics/sync` | 歌词同步路径，依实际来源返回 |
| 音频媒体 | GET | `/api/music/stream` | 音频代理或配置的重定向路径 |
| | GET | `/api/music/cover` | 封面资源路径，不保证所有图片都经此代理 |
| | GET | `/api/music/palette` | 封面色彩分析相关路径 |
| 验证 | GET | `/api/auth/user` | 查询经后端验证的身份 |
| | GET／POST | `/api/auth/key` | 取得或重新签发凭证；重新签发须出示有效请求标头凭证 |
| | POST | `/api/auth/revoke` | 撤销请求；依支持的存储及实际结果 |
| | POST | `/api/auth/logout` | 退出及清理会话 Cookie，不保证所有凭证副本失效 |

## 3. API Key 认证

1. **格式**：最新公开 RC 的 `sonic_live_v2.<header>.<payload>.<signature>` 使用 HMAC-SHA256 签章而非加密；持有凭证者可能读取载荷中的身份字段。较早 `main@ce443c8` 仅作相容性对照，线上实现仍须核验；
2. **签发**：RC 的会话／凭证签发默认有效 30 日；验证器接受的最大生命周期 90 日不是默认签发期限。`POST /api/auth/key` 须出示有效请求标头凭证，旧凭证撤销依设置；登录既不验证年龄，也不等于画像同意；
3. **传递**：外部客户端使用请求标头，同源浏览器可使用会话 Cookie；不要把凭证置于 URL。旧 `main` 的 query／fragment 路径不是 RC 现行保护的证明；日志、截图和导出副本均须保护；
4. **核验**：RC 验证版本、签名、时间及配置的撤销状态；这不能证明每个线上部署设置正确，也不保证撤销在所有节点即时传播。

## 4. 限流与撤销

| 项目 | 上限 |
| --- | --- |
| 匿名请求 | RC 默认每分钟 240 次；依路由和实例设置调整 |
| 验证请求 | RC 默认每分钟 600 次；依路由和实例设置调整 |
| 验证端点 | 专用登录限流默认每 IP 每分钟 30 次；不是所有路由统一配额 |
| 行为事件上报 | 单批最多处理 50 条；请求体上限 64 KiB；另受限流约束 |

退出登录清理目前 Cookie；被复制凭证须在所设置机制与请求成功时才撤销。运营者可使用 `SONIC_REVOKED_JTIS`、`SONIC_REVOKED_SUBS`、`SONIC_TOKEN_MIN_IAT` 或支持的 KV 储存，须核对失败而非保证全面即时失效。限流使用原始 IP 或身份衍生键，部分进入 KV；边缘也转送客户端位址、会话及上下文至引擎。持续滥用依[可接受使用政策](/acceptable-use/)处理。

## 5. 接入者义务

1. API Key 为个人凭证，不得转交第三方或嵌入公开发行之客户端；
2. 自建客户端应尊重限流、呈现降级提示（`X-Sonic-Degraded: 1`）并遵守[可接受使用政策](/acceptable-use/)之禁止行为清单；
3. 接入者须告知实际处理，必要时取得独立有效选择；默认个性化不是同意，搜索原文可能进入公开建议，画像重置可能遗漏资料或失败未显示。不得将音频代理描述为全部流量的 IP 保护。见[开源与自行部署法律](/open-source/)及[隐私政策](/privacy-policy/)。
