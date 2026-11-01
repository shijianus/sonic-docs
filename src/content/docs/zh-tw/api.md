---
title: 開放平台與 API 串接
description: Sonic 開放 API 串接——統一回傳結構、端點導覽、API Key 驗證與傳遞規範、限流與撤銷。
---

**生效日期：2026 年 11 月 2 日｜版本：1.5**

本頁說明 Sonic 開放 API 之串接方式：統一回傳結構、核心端點、API Key 驗證與傳遞規範、限流與撤銷。本站法律文件以簡體中文版本為正式版本，本繁體中文版本為對照譯本。串接行為受[使用者條款](/zh-tw/terms-of-service/)與[可接受使用政策](/zh-tw/acceptable-use/)拘束；端點規格之權威表述見上游儲存庫 `API.md`。

## 1. 統一回傳結構

全部端點對外承諾 `brand: "Sonic"` 相容性契約，標準回傳如下：

```json
{
  "brand": "Sonic",
  "data": { "id": "191254", "title": "紅豆", "quality": "320k" },
  "meta": {
    "cached": true,
    "cacheLevel": "edge",
    "provider": "nexus",
    "degraded": false,
    "circuitState": "CLOSED"
  }
}
```

`meta` 欄位如實標註快取層級、提供者、降級狀態與熔斷器狀態，用戶端可據此呈現透明提示。

## 2. 核心端點導覽

| 分類 | 方法 | 端點 | 功能 |
| --- | --- | --- | --- |
| 智慧推薦 | GET | `/api/sonic/recommend/for-you` | 猜你喜歡／Auto DJ |
| | GET | `/api/sonic/recommend/trending` | 趨勢熱榜（24h／7d／surging／new） |
| | GET | `/api/sonic/recommend/similar` | 相似曲目／歌手探索 |
| | GET | `/api/sonic/recommend/discover` | 風格流派雷達 |
| 行為事件 | POST | `/api/sonic/events` | 回傳行為事件（批次至多 50 筆） |
| | GET | `/api/sonic/events` | 查詢推薦輪廓概覽 |
| | DELETE | `/api/sonic/events` | 一鍵清空個人輪廓 |
| 聚合搜尋 | GET | `/api/sonic/search/smart` | 智慧混合搜尋與補全 |
| | GET | `/api/sonic/search/nexus` | 全網多源並行檢索 |
| 動態歌詞 | GET | `/api/sonic/lyrics/nexus` | 逐字歌詞（YRC/QRC/KRC → AMLL → LRCLIB） |
| | GET | `/api/sonic/lyrics/sync` | 跨平台同步歌詞（多格式輸出） |
| 音訊媒體 | GET | `/api/music/stream` | 音訊分段代理（Range／206；`?mode=redirect` 直連） |
| | GET | `/api/music/cover` | 封面代理（高畫質優先，降級 SVG） |
| | GET | `/api/music/palette` | 封面色溫分析 |
| 驗證 | GET | `/api/auth/user` | 當前工作階段資料 |
| | GET／POST | `/api/auth/key` | 檢視／重簽 API Key |
| | POST | `/api/auth/revoke` | 撤銷當前金鑰（需明確金鑰標頭） |
| | POST | `/api/auth/logout` | 登出並撤銷工作階段 |

## 3. API Key 驗證

1. **格式**：`sonic_live_v2.<header>.<payload>.<signature>` 版本化格式，HMAC-SHA256 簽章；酬載含 `sub`（電子郵件）、`iat`、`exp`、`jti`、`kid`、`role`、`uid`；
2. **簽發**：經 Epomail OAuth 登入後由 `/api/auth/key` 取得；簽發有效期 30 日，驗證上限 90 日；
3. **傳遞**：僅允許請求標頭——`X-Sonic-Key: <key>` 或 `Authorization: Bearer <key>`；URL 查詢參數通道已完全移除，避免金鑰洩漏至存取日誌、瀏覽器歷史或 Referer；
4. **核驗**：伺服器端以 Web Crypto 常數時間比對，嚴格檢查版本、`kid`、`iat`／`exp`、`jti` 與撤銷清單；無簽章金鑰與舊版金鑰一律拒絕（fail-closed）。

## 4. 限流與撤銷

| 項目 | 上限 |
| --- | --- |
| 匿名請求 | 每分鐘 240 次（預設值） |
| 驗證請求 | 每分鐘 600 次（預設值） |
| 驗證端點 | 每分鐘每 IP 30 次 |
| 行為事件上報 | 單批至多 50 筆、請求主體 64 KB |

撤銷機制：登出即時撤銷當前工作階段與 `jti`；部署者可設定 `SONIC_REVOKED_JTIS`／`SONIC_REVOKED_SUBS`／`SONIC_TOKEN_MIN_IAT` 靜態清單，或繫結 KV 開啟即時撤銷。正常個人使用不會觸及限流；持續超限進入[可接受使用政策](/zh-tw/acceptable-use/)之執行階梯。

## 5. 串接者義務

1. API Key 為個人憑證，不得轉交第三方或嵌入公開發行之用戶端；
2. 自建用戶端應尊重限流、呈現降級提示（`X-Sonic-Degraded: 1`）並遵守[可接受使用政策](/zh-tw/acceptable-use/)之禁止行為清單；
3. 第三方用戶端串接時對終端使用者之告知義務，由串接者自行承擔；自行部署執行個體之 API 使用者請一併閱讀[開源與自行部署法律](/zh-tw/open-source/)。
