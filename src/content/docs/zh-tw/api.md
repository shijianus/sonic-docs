---
title: 開放平台與 API 串接
description: Sonic 開放 API 串接——統一回傳結構、端點導覽、API Key 驗證與傳遞規範、限流與撤銷。
---

**修訂日期：2026 年 11 月 3 日｜版本：1.9**

本頁說明 Sonic 開放 API 之串接方式：統一回傳結構、核心端點、API Key 驗證與傳遞規範、限流與撤銷。本站以簡體中文為維護基準，其餘九種語言為譯本；強制法律、消費者有利解釋與易懂告知優先。串接行為受[使用者條款](/zh-tw/terms-of-service/)與[可接受使用政策](/zh-tw/acceptable-use/)拘束；端點規格之權威表述見上游儲存庫 `API.md`。

本頁功能說明依據公開候選版本（RC）`rc/sonic-20261031@a75f5cb`（2026-11-01 UTC），核對日期為 2026-11-02。較早的公開 `main@ce443c8`（2026-10-27 UTC）不能作為其已具備這些 RC 功能的依據。候選版本不是正式 GitHub Release；線上部署版本與設定仍未核實。

託管服務是個人維護、免費非營利測試專案，沒有 SLA 或資料還原保證。個人化預設開啟不成立同意；輪廓重置僅屬部分刪除，失敗可能未顯示；憑證撤銷依賴設定及請求成功。請勿提交不必要的個人資料、生產資料或憑證。

## 1. 統一回傳結構

端點通常採用下列 `brand: "Sonic"` 回傳慣例；這是技術格式，不保證每個端點或未來版本持續相容：

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
| 行為事件 | POST | `/api/sonic/events` | 回傳行為事件（批次至多 50 筆）  |
| | GET | `/api/sonic/events` | 查詢推薦輪廓概覽  |
| | DELETE | `/api/sonic/events` | 重置目前身分的部分事件／回饋，不是完整輪廓刪除  |
| 聚合搜尋 | GET | `/api/sonic/search/smart` | 智慧混合搜尋與補全 |
| | GET | `/api/sonic/search/nexus` | 全網多源並行檢索 |
| 動態歌詞 | GET | `/api/sonic/lyrics/nexus` | 逐字歌詞（YRC/QRC/KRC → AMLL → LRCLIB） |
| | GET | `/api/sonic/lyrics/sync` | 跨平台同步歌詞（多格式輸出） |
| 音訊媒體 | GET | `/api/music/stream` | 音訊分段代理（Range／206；`?mode=redirect` 直連） |
| | GET | `/api/music/cover` | 封面代理（高畫質優先，降級 SVG） |
| | GET | `/api/music/palette` | 封面色溫分析 |
| 驗證 | GET | `/api/auth/user` | 當前工作階段資料 |
| | GET／POST | `/api/auth/key` | 檢視／重簽 API Key |
| | POST | `/api/auth/revoke` | 請求金鑰撤銷，需明確金鑰標頭及支援的撤銷儲存 |
| | POST | `/api/auth/logout` | 清理目前 Cookie 並嘗試撤銷，遠端成功有條件 |

## 3. API Key 驗證

1. **格式**：`sonic_live_v2.<header>.<payload>.<signature>` 使用 HMAC-SHA256 簽章而非加密；持有憑證者可能讀取酬載的 `sub`（電子郵件）、`iat`、`exp`、`jti`、`kid`、`role`、`uid`；
2. **簽發**：Epomail OAuth 登入後使用 `/api/auth/key`，簽發與重簽預設有效期為 30 日；90 日僅為驗證器允許的上限，不是簽發或重簽期限。登入不驗證年齡或成立可選輪廓分析同意；
3. **傳遞**：使用 `X-Sonic-Key: <key>` 或 `Authorization: Bearer <key>`，不要放入 URL 參數；移除查詢通道降低外洩，但不保證主機、代理或錯誤日誌不會暴露憑證；
4. **核驗**：伺服器端以 Web Crypto 常數時間比對，嚴格檢查版本、`kid`、`iat`／`exp`、`jti` 與撤銷清單；無簽章金鑰與舊版金鑰一律拒絕（fail-closed）。

## 4. 限流與撤銷

| 項目 | 上限 |
| --- | --- |
| 匿名請求 | 每分鐘 240 次（預設值） |
| 驗證請求 | 每分鐘 600 次（預設值） |
| 驗證端點 | 每分鐘每 IP 30 次 |
| 行為事件上報 | 單批至多 50 筆、請求主體 64 KiB |

登出清理目前 Cookie；被複製憑證須在所設定機制與請求成功時才撤銷。營運者可使用 `SONIC_REVOKED_JTIS`、`SONIC_REVOKED_SUBS`、`SONIC_TOKEN_MIN_IAT` 或支援的 KV 儲存，須核對失敗而非保證全面即時失效。限流使用原始 IP 或身分衍生鍵，部分進入 KV；邊緣也轉送用戶端位址、工作階段及上下文至引擎。持續濫用依[可接受使用政策](/zh-tw/acceptable-use/)處理。

## 5. 串接者義務

1. API Key 為個人憑證，不得轉交第三方或嵌入公開發行之用戶端；
2. 自建用戶端應尊重限流、呈現降級提示（`X-Sonic-Degraded: 1`）並遵守[可接受使用政策](/zh-tw/acceptable-use/)之禁止行為清單；
3. 串接者須告知實際處理，必要時取得獨立有效選擇；預設個人化不是同意，搜尋原文可能進入公開建議，輪廓重置可能遺漏資料或失敗未顯示。不得將音訊代理描述為全部流量的 IP 保護。見[開源與自行部署法律](/zh-tw/open-source/)及[隱私權政策](/zh-tw/privacy-policy/)。
