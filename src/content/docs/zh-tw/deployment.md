---
title: 部署指南
description: Sonic 部署指南——Cloudflare Pages 邊緣閘道與 Linux 本地引擎雙方案、環境變數、備份還原、健康檢查與回滾。
---

**修訂日期：2026 年 11 月 2 日｜版本：1.8**

本頁功能說明依據公開候選版本（RC）`rc/sonic-20261031@a75f5cb`（2026-11-01 UTC），核對日期為 2026-11-02。較早的公開 `main@ce443c8`（2026-10-27 UTC）不能作為其已具備這些 RC 功能的依據。候選版本不是正式 GitHub Release；線上部署版本與設定仍未核實。

本頁說明 Sonic 部署、設定、備份與還原。責任依實際營運及資料處理角色判斷，純個人測試與公開服務須分別評估。原始碼核對不證明營運者法律身分、節點國家、契約或線上合規；公開處理前須解決[隱私權政策](/zh-tw/privacy-policy/)與[開源與自行部署法律](/zh-tw/open-source/)所述問題。操作細節見上游 `docs/OPERATIONS.md`，不是合規認證。

## 1. 方案 A：Cloudflare Pages 邊緣閘道

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

執行前，請將 `YOUR_PROJECT_NAME` 替換為實際的 Pages 專案名稱。於 Cloudflare Pages 後台設定加密環境變數：`SONIC_SECRET`、`SONIC_ENGINE_SECRET`（與 VPS 側一致）、`SONIC_LOCAL_ENGINE_URL`（指向你的資料面通道網域）。

## 2. 方案 B：Linux 本地協定引擎（Docker Compose）

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
cp .env.example .env
chmod 600 .env    # 填入強隨機 SONIC_ENGINE_SECRET 與 SONIC_SECRET
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

堆疊組成：sonic-engine 主容器（宿主僅映射 `127.0.0.1:8080`）、內網封閉之 ncm-api 輔助容器、SQLite 持久化（具名磁碟區 `sonic-data`）。資料面經 Cloudflare Tunnel 接入，不直接對外公開。

## 3. 核心環境變數

| 變數 | 說明 |
| --- | --- |
| `SONIC_SECRET` | API Key 簽章金鑰，長度 ≥ 32 字元（`openssl rand -base64 48`） |
| `SONIC_ENGINE_SECRET` | 服務間金鑰，Pages 與 VPS 雙側一致 |
| `SONIC_LOCAL_ENGINE_URL` | 資料面通道位址 |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | 內建音源協定開關（預設 1） |
| `SONIC_ENABLE_AMLL/LRCLIB` | 歌詞補位開關（預設 1） |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | 可選路徑；GDStudio 程式碼未設定時預設開啟，環境／Compose 範例為關閉，須逐項核驗並停用違法或不必要路徑 |
| `SONIC_RECOMMEND_DB_PATH` | 儲存路徑；`memory` 改變此儲存的持久性，不涵蓋全部日誌、遠端服務或瀏覽器儲存 |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 預設 90、下限 7；啟動／部分寫入清理，另有固定 90 日寫入路徑，涵蓋範圍不完整  |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | 限流（預設 240／600） |
| `EPOMAIL_BASE_URL` 等 | Epomail OAuth 設定 |

完整清單見上游儲存庫 `.env.example`；隱私相關開關之告知一致性要求見[資料處理與安全維護](/zh-tw/data-security/)第 6 節。

## 4. 備份與還原

1. **備份**：`npm run backup:db` 使用 `VACUUM INTO` 與完整性檢查；備份可能含可關聯個人資料，而非僅匿名統計，須保護並訂定必要保存期限，不能假定排程已部署；
2. **還原**：停機後以 `npm run restore:db` 還原快照，核對版本與架構相容性，日常使用前重新套用刪除記錄；無法逐項刪除的備份應隔離至明確期限屆滿；
3. **容量**：事件清理在啟動與部分寫入時觸發，不是逐筆到期銷毀；雷達、搜尋統計、日誌與備份須獨立控制，並核驗固定 90 日寫入路徑及監測儲存空間。

## 5. 健康檢查與回滾

1. **健康檢查**：`GET /api/sonic/engine/health`（需服務金鑰）回傳引擎與熔斷器狀態；邊緣側熔斷器對資料面連續失敗自動降級；
2. **日誌**：應用程式存取日誌最小化欄位，但錯誤、主機、代理與提供者仍可能保留請求資訊；原始 IP 限流鍵可進入 KV，邊緣轉送用戶端位址、工作階段及上下文至引擎。須核驗實際日誌與期限，不應宣稱零日誌；
3. **回滾**：Pages 側回滾至上一部署版本即可；資料面以 `git checkout` 上一標籤重新 `docker compose up -d --build`；回滾前確認 SQLite 架構相容（無遷移框架）。

## 6. 部署者核對清單

上線前逐項確認：

1. 金鑰為強隨機且長度 ≥ 32 字元，`.env` 權限 600，並核驗憑證撤銷儲存與失敗處理；
2. 盤點實際接收者、角色、契約及節點國家，核對直連 Google Fonts、電子郵件 DiceBear 請求、外部圖片與 MV 連線；認證本身不是傳輸依據；
3. 對事件、雷達、搜尋統計、日誌及備份落實必要期限與經驗證的刪除，預設 90 日與重置按鈕不足以完成；
4. 維持資料面非公開並核驗每段連線，加密通道不會保護核對程式碼中仍存在的 HTTP 上游請求；
5. 測試備份到期、重新套用刪除記錄的還原及目前介面可能隱藏的失敗；
6. 公布準確身分與資料告知並落實有效事前選擇：預設個人化不是同意，公開搜尋原文再利用須控制；缺少合法依據與必要保障的可選處理應暫停（見[隱私權政策](/zh-tw/privacy-policy/)）。
