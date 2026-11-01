---
title: 開發指南
description: Sonic 開發指南——儲存庫結構、建置指令、測試套件、文件一致性核驗與參與貢獻。
---

**生效日期：2026 年 11 月 1 日｜版本：1.4**

本頁面向參與開發與二次開發之讀者，說明儲存庫結構、建置指令、測試套件與文件一致性核驗。本站法律文件以簡體中文版本為正式版本，本繁體中文版本為對照譯本。授權與法律邊界見[開源與自行部署法律](/zh-tw/open-source/)。

## 1. 儲存庫結構

| 路徑 | 內容 |
| --- | --- |
| `player/` | Vue 3 網頁播放器（內建 zh／en／ja 三語 i18n） |
| `functions/` | Cloudflare Pages Functions 邊緣閘道（路由、限流、快取、熔斷） |
| `functions/_lib/sonic/` | 推薦、身分、上游協定與安全共享邏輯 |
| `server/` | 資料面 Node.js 22 引擎（含 `recommend-sqlite.ts` SQLite 儲存） |
| `Dockerfile` / `docker-compose.yml` | 資料面容器堆疊（sonic-engine + ncm-api） |
| `docs/` | 營運、合規、稽核改善與已知問題文件 |
| `tests/` | 安全、閘道、推薦與發布關卡測試 |

## 2. 建置與本地執行

```bash
npm ci                              # 根依賴
pnpm --dir player install --frozen-lockfile
npm run build                       # 播放器建置 + 複製至 dist
npx wrangler pages dev dist         # 本地邊緣閘道（無資料面時自動降級模式）
npm run build:engine && npm run start:engine   # 本地資料面引擎
```

## 3. 測試套件

發布前由 `npm test` 執行，涵蓋：

1. 閘道行為與降級（`test-sonic-gateway.mjs`、`test-local-engine-and-degradation.mjs`）；
2. 驗證相容性與 OAuth 安全（`test-auth-compatibility.mjs`、`tests/oauth-security.test.ts`）；
3. SSRF 與安全強化（`tests/ssrf-security.test.ts`、`tests/security*.test.ts`）；
4. 推薦與搜尋（`tests/recommendation-and-search.test.ts`）；
5. 前端 XSS（`tests/frontend-xss.test.ts`）；
6. 設定一致性——`.env.example` 與程式碼讀取之環境變數逐項比對（`tests/config-parity.test.ts`）；
7. 發布 P0/P1 關卡（`tests/release-p0-p1-gate.test.ts`）。

## 4. 文件一致性核驗

本站（sonicdocs）隨版本演進與原始碼核對，核驗工具鏈：

```bash
pnpm validate    # 建置 + 頁內錨點失效連結檢查 + 多語言結構對稱核驗
```

1. `scripts/validate-anchors.cjs`：全站頁內錨點與圖片引用零失效連結；
2. `scripts/check-structure.py`：多語言版本標題／表格／圖片／提示框結構 1:1；
3. `doc/legal-reference.md`：GDPR 條號引用白名單（EUR-Lex 核驗底稿），文件中不得出現白名單外條號；
4. 技術事實隨版本對照原始碼（`.env.example`、`server/recommend-sqlite.ts`、`functions/_lib/sonic/security.ts`）更新，不一致時以原始碼為準修正文件。

## 5. 參與貢獻

1. 議題與討論：GitHub 程式碼庫 Issue（`github.com/shijianus/sonic`）；
2. 提交前執行完整測試套件與 `npm run lint`；
3. 涉及資料處理之變更（新增蒐集項目、變更保留策略、新增第三方共享）須同步更新本站對應文件並走一致性核驗；
4. 第三方依賴引入須更新 `THIRD_PARTY_NOTICES.md` 並評估隱私與授權影響。

## 6. 文件翻譯貢獻

本站為多語言對照結構：任一語言之修改須同步其餘語言（結構 1:1 由腳本核驗）。新增語言時：註冊 locale、補齊全部文件、加入結構腳本語言清單，並按 `doc/legal-reference.md` 之該語言引註格式核對法條引用。
