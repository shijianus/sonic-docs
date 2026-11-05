---
title: 開発ガイド
description: Sonic 開発ガイド — リポジトリ構造、ビルドコマンド、テストスイート、ドキュメント一致性検証と貢献。
---

**改訂日：2026年11月3日｜バージョン：1.9**

本ページは、開発と二次開発に参加する読者に向け、リポジトリ構造、ビルドコマンド、テストスイート、ドキュメント一致性検証を説明します。2026-11-02 に確認した最新の公開候補ブランチ（RC）`rc/sonic-20261031@a75f5cb`（2026-11-01 UTC）が対象で、正式な GitHub Release ではありません。旧 `main@ce443c8`（2026-10-27 UTC）とは実装が異なり、同じ構成や機能を推定できません。オンラインで稼働中のバージョンは不明で、コードの確認はデプロイの証明ではありません。ライセンスと法的境界は[オープンソースと自己ホスティングの法的事項](/ja/open-source/)を参照してください。

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
4. 今回の確認対象は最新公開 RC `rc/sonic-20261031@a75f5cb`（2026-11-01 UTC）です。古い `main@ce443c8` は互換性比較に限られ、RC の展開を証明しません。オンライン版は不明です。コード・設定・実際の動作を区別し、告知の矛盾は修正して影響するユーザーに知らせます。「ソースコードが優先する」として誤った説明の責任を免れることはできません。

## 5. 貢献方法

1. 課題とディスカッション：GitHub リポジトリの Issue（`github.com/shijianus/sonic`）；
2. 提出前に完全なテストスイートと `npm run lint` を実行してください；
3. データ処理の変更は、同意前の任意処理停止、拒否・撤回、旧識別子・レーダー・集計・外部推薦・検索・バックアップの削除、ログ、外部リソース・移転まで確認し、対応文書を同期してください。ポリシー公開だけで是正が完了するわけではありません；
4. 第三者依存の導入は `THIRD_PARTY_NOTICES.md` を更新し、プライバシーとライセンスへの影響を評価する必要があります。

## 6. ドキュメント翻訳への貢献

簡体字中国語を維持管理基準とし、ほかの9言語を翻訳として同期します。見出し、表、画像、注記を対応させ、法条表記は `doc/legal-reference.md` と照合してください。言語の優先は強行法規、消費者に有利な解釈、明確な告知を排除しません。新言語は locale 登録と全対象文書の整備が必要です。
