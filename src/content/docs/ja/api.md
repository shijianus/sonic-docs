---
title: オープンプラットフォームと API 接続
description: Sonic 公開 API 接続 — 統一レスポンス構造、主要エンドポイント一覧、API キー認証と伝送規範、レート制限と取消。
---

**発効日：2026年11月2日｜バージョン：1.5**

本ページでは、Sonic 公開 API の接続方式を説明します：統一レスポンス構造、中核エンドポイント、API キー認証と伝送規範、レート制限と取消。接続行為は[利用規約](/ja/terms-of-service/)と[受け入れ可能な利用ポリシー](/ja/acceptable-use/)に拘束されます。エンドポイント仕様の権威ある記述は上流リポジトリの `API.md` にあります。

## 1. 統一レスポンス構造

すべてのエンドポイントは外部に対して `brand: "Sonic"` の互換性契約を保証し、標準レスポンスは次のとおりです：

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

`meta` フィールドはキャッシュ階層、提供者、降格状態、サーキットブレーカー状態を正直に標示し、クライアントはこれに基づいて透明な表示を行えます。

## 2. 主要エンドポイント一覧

| 分類 | メソッド | エンドポイント | 機能 |
| --- | --- | --- | --- |
| スマートレコメンド | GET | `/api/sonic/recommend/for-you` | 「あなたへのおすすめ」／Auto DJ |
| | GET | `/api/sonic/recommend/trending` | トレンドチャート（24h／7d／surging／new） |
| | GET | `/api/sonic/recommend/similar` | 類似トラック／アーティスト探索 |
| | GET | `/api/sonic/recommend/discover` | ジャンルレーダー |
| 行動イベント | POST | `/api/sonic/events` | 行動イベントの送信（1 バッチ最大 50 件） |
| | GET | `/api/sonic/events` | レコメンドプロファイル概要の照会 |
| | DELETE | `/api/sonic/events` | ワンクリックで個人プロファイルを全消去 |
| アグリゲーション検索 | GET | `/api/sonic/search/smart` | スマート混合検索と補完 |
| | GET | `/api/sonic/search/nexus` | 全ソース並列検索 |
| ダイナミック歌詞 | GET | `/api/sonic/lyrics/nexus` | 文字単位歌詞（YRC/QRC/KRC → AMLL → LRCLIB） |
| | GET | `/api/sonic/lyrics/sync` | クロスプラットフォーム同期歌詞（複数形式出力） |
| オーディオメディア | GET | `/api/music/stream` | オーディオセグメントプロキシ（Range／206；`?mode=redirect` 直連） |
| | GET | `/api/music/cover` | カバープロキシ（高画質優先、降格時は SVG） |
| | GET | `/api/music/palette` | カバーの色調分析 |
| 認証 | GET | `/api/auth/user` | 現在のセッション情報 |
| | GET／POST | `/api/auth/key` | API キーの表示／再発行 |
| | POST | `/api/auth/revoke` | 現在の鍵を取消（明示的な鍵ヘッダーが必要） |
| | POST | `/api/auth/logout` | ログアウトしてセッションを取消 |

## 3. API キー認証

1. **形式**：`sonic_live_v2.<header>.<payload>.<signature>` バージョン付き形式、HMAC-SHA256 署名。ペイロードは `sub`（電子メール）、`iat`、`exp`、`jti`、`kid`、`role`、`uid` を含みます；
2. **発行**：Epomail OAuth ログイン後に `/api/auth/key` で取得します。発行有効期間 30 日、検証上限 90 日；
3. **伝送**：リクエストヘッダーのみ許可されます——`X-Sonic-Key: <key>` または `Authorization: Bearer <key>`。URL クエリパラメータの経路は完全に廃止済みで、鍵がアクセスログ、ブラウザ履歴、Referer へ漏れることを防ぎます；
4. **検証**：サーバー側は Web Crypto による定数時間比較で、バージョン、`kid`、`iat`／`exp`、`jti` と取消リストを厳格に検査します。無署名鍵と旧版鍵は一律拒否（fail-closed）します。

## 4. レート制限と取消

| 項目 | 上限 |
| --- | --- |
| 匿名リクエスト | 毎分 240 回（既定値） |
| 認証済みリクエスト | 毎分 600 回（既定値） |
| 認証エンドポイント | 毎分毎 IP 30 回 |
| 行動イベントの送信 | 1 バッチ最大 50 件、リクエストボディ 64 KB |

取消メカニズム：ログアウトで現在のセッションと `jti` を即時取消します。展開者は `SONIC_REVOKED_JTIS`／`SONIC_REVOKED_SUBS`／`SONIC_TOKEN_MIN_IAT` の静的リストを設定するか、KV バインドで即時取消を有効化できます。通常の個人利用ではレート制限に達することはありません。継続的な超過は[受け入れ可能な利用ポリシー](/ja/acceptable-use/)の執行段階に入ります。

## 5. 接続者の義務

1. API キーは個人の認証情報であり、第三者に譲渡したり、公開リリースされるクライアントに組み込んだりしてはいけません；
2. 自作クライアントはレート制限を尊重し、降格表示（`X-Sonic-Degraded: 1`）を提示し、[受け入れ可能な利用ポリシー](/ja/acceptable-use/)の禁止行動リストを遵守してください；
3. 第三者クライアントを接続する際のエンドユーザーへの告知義務は、接続者が自ら負担します。自己展開インスタンスの API 利用者は[オープンソースと自己ホスティングの法的事項](/ja/open-source/)も併せてお読みください。
