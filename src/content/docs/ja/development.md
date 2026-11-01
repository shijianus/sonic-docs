---
title: 開発ガイド
description: Sonic 開発ガイド — リポジトリ構造、ビルドコマンド、テストスイート、ドキュメント一致性検証と貢献。
---

**発効日：2026年11月2日｜バージョン：1.5**

本ページは、開発と二次開発に参加する読者に向け、リポジトリ構造、ビルドコマンド、テストスイート、ドキュメント一致性検証を説明します。ライセンスと法的境界は[オープンソースと自己ホスティングの法的事項](/ja/open-source/)を参照してください。

## 1. リポジトリ構造

| パス | 内容 |
| --- | --- |
| `player/` | Vue 3 ウェブプレイヤー（zh／en／ja の三言語 i18n を内蔵） |
| `functions/` | Cloudflare Pages Functions エッジゲートウェイ（ルーティング、レート制限、キャッシュ、サーキットブレーカー） |
| `functions/_lib/sonic/` | レコメンド、アイデンティティ、上流プロトコル、セキュリティの共有ロジック |
| `server/` | データプレーンの Node.js 22 エンジン（`recommend-sqlite.ts` の SQLite ストレージを含む） |
| `Dockerfile` / `docker-compose.yml` | データプレーンのコンテナスタック（sonic-engine + ncm-api） |
| `docs/` | 運用、コンプライアンス、監査整改、既知問題のドキュメント |
| `tests/` | セキュリティ、ゲートウェイ、レコメンド、リリースゲートのテスト |

## 2. ビルドとローカル実行

```bash
npm ci                              # ルート依存
pnpm --dir player install --frozen-lockfile
npm run build                       # プレイヤーのビルド + dist へコピー
npx wrangler pages dev dist         # ローカルエッジゲートウェイ（データプレーンなしでは自動降格モード）
npm run build:engine && npm run start:engine   # ローカルデータプレーンエンジン
```

## 3. テストスイート

リリース前に `npm test` で実行され、次をカバーします：

1. ゲートウェイ動作と降格（`test-sonic-gateway.mjs`、`test-local-engine-and-degradation.mjs`）；
2. 認証互換性と OAuth セキュリティ（`test-auth-compatibility.mjs`、`tests/oauth-security.test.ts`）；
3. SSRF とセキュリティ強化（`tests/ssrf-security.test.ts`、`tests/security*.test.ts`）；
4. レコメンドと検索（`tests/recommendation-and-search.test.ts`）；
5. フロントエンド XSS（`tests/frontend-xss.test.ts`）；
6. 設定一致性——`.env.example` とコードが読み取る環境変数の項目別照合（`tests/config-parity.test.ts`）；
7. リリース P0/P1 ゲート（`tests/release-p0-p1-gate.test.ts`）。

## 4. ドキュメント一致性検証

本サイト（sonicdocs）は版の進展に伴いソースコードと照合されます。検証ツールチェーン：

```bash
pnpm validate    # ビルド + ページ内アンカーのリンク切れ検査 + 多言語構造の対称検証
```

1. `scripts/validate-anchors.cjs`：全サイトのページ内アンカーと画像参照のリンク切れゼロ；
2. `scripts/check-structure.py`：多言語版の見出し／表／画像／コールアウト構造の 1:1；
3. `doc/legal-reference.md`：GDPR 条号引用のホワイトリスト（EUR-Lex 検証底稿）。ドキュメントにはホワイトリスト外の条号を記載してはいけません；
4. 技術的事実は版ごとにソースコード（`.env.example`、`server/recommend-sqlite.ts`、`functions/_lib/sonic/security.ts`）と対照して更新し、不一致の場合はソースコードを優先してドキュメントを修正します。

## 5. 貢献方法

1. 課題とディスカッション：GitHub リポジトリの Issue（`github.com/shijianus/sonic`）；
2. 提出前に完全なテストスイートと `npm run lint` を実行してください；
3. データ処理に関わる変更（収集項目の追加、保存ポリシーの変更、第三者共有の追加）は、本サイトの対応するドキュメントを同時に更新し、一致性検証を通す必要があります；
4. 第三者依存の導入は `THIRD_PARTY_NOTICES.md` を更新し、プライバシーとライセンスへの影響を評価する必要があります。

## 6. ドキュメント翻訳への貢献

本サイトは多言語対照構造です：いずれかの言語の変更は、他の言語と同期する必要があります（構造の 1:1 はスクリプトで検証されます）。新しい言語を追加する場合は、locale を登録し、全ドキュメントを揃え、構造スクリプトの言語リストに加え、`doc/legal-reference.md` の当該言語の引用形式に従って法条引用を照合してください。
