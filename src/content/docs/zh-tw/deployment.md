---
title: 部署指南
description: Sonic 部署指南——Cloudflare Pages 邊緣閘道與 Linux 本地引擎雙方案、環境變數、備份還原、健康檢查與回滾。
---

**生效日期：2026 年 11 月 1 日｜版本：1.4**

本頁說明自行部署 Sonic 之兩種方案、核心環境變數、備份還原與營運要點。部署之時點起，部署者即為其使用者之資料控制者，相關義務見[資料處理與安全維護](/zh-tw/data-security/)第 6 節與[開源與自行部署法律](/zh-tw/open-source/)。本站法律文件以簡體中文版本為正式版本，本繁體中文版本為對照譯本。操作細節之權威表述見上游儲存庫 `docs/OPERATIONS.md`。

## 1. 方案 A：Cloudflare Pages 邊緣閘道

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <你的專案名>
```

於 Cloudflare Pages 後台設定加密環境變數：`SONIC_SECRET`、`SONIC_ENGINE_SECRET`（與 VPS 側一致）、`SONIC_LOCAL_ENGINE_URL`（指向你的資料面通道網域）。

## 2. 方案 B：Linux 本地協定引擎（Docker Compose）

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
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
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | 第三方聚合與解灰（預設 0，必須保持關閉除非確有需要） |
| `SONIC_RECOMMEND_DB_PATH` | 行為資料落盤路徑；設為 `memory` 關閉落盤 |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 行為事件保留天數（預設 90，下限 7） |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | 限流（預設 240／600） |
| `EPOMAIL_BASE_URL` 等 | Epomail OAuth 設定 |

完整清單見上游儲存庫 `.env.example`；隱私相關開關之告知一致性要求見[資料處理與安全維護](/zh-tw/data-security/)第 6 節。

## 4. 備份與還原

1. **備份**：以一致性快照腳本執行 `VACUUM INTO` 並附完整性檢查（`npm run backup:db`）；備份檔案含假名化行為資料，應與生產資料同等級保護；
2. **還原**：停機後以還原腳本還原快照（`npm run restore:db`）；儲存庫無版本化遷移框架，還原目標版本應與備份版本一致；
3. **容量**：行為事件按 90 日保留自動清理，資料庫體積隨曲目規範資料成長，留意磁碟區空間。

## 5. 健康檢查與回滾

1. **健康檢查**：`GET /api/sonic/engine/health`（需服務金鑰）回傳引擎與熔斷器狀態；邊緣側熔斷器對資料面連續失敗自動降級；
2. **日誌**：引擎側存取日誌僅含路徑、方法、狀態碼與耗時（`docker compose logs`）；不記錄查詢字串、IP、Cookie 與請求主體；
3. **回滾**：Pages 側回滾至上一部署版本即可；資料面以 `git checkout` 上一標籤重新 `docker compose up -d --build`；回滾前確認 SQLite 架構相容（無遷移框架）。

## 6. 部署者核對清單

上線前逐項確認：

1. 兩枚金鑰均為強隨機且長度 ≥ 32 字元，`.env` 權限 600；
2. 第三方鏈路開關與你的隱私告知一致（未開啟者從告知中刪除）；
3. 行為事件保留天數與落盤路徑符合你的政策承諾；
4. 資料面僅經通道可達，宿主連接埠未對外公網開放；
5. 已建立備份計畫與還原演練；
6. 已向你的使用者發布告知文件（可以本站[隱私權政策](/zh-tw/privacy-policy/)為基礎）。
