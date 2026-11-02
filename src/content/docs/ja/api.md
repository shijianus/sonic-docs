---
title: オープンプラットフォームと API 接続
description: Sonic 公開 API 接続 — 統一レスポンス構造、主要エンドポイント一覧、API キー認証と伝送規範、レート制限と取消。
---

**改訂日：2026年11月2日｜バージョン：1.8**

Sonic API の応答、エンドポイント、認証、制限、失効を説明します。実際に適用され有効に提示された[利用規約](/ja/terms-of-service/)と[利用ポリシー](/ja/acceptable-use/)に従ってください。API 接続や OAuth の成功は任意処理への同意ではありません。仕様は上流 `API.md` も参照してください。

ホスト型サービスは、個人が維持する無料・非営利のテストプロジェクトであり、SLA やデータ復旧を保証しません。本ガイドは2026-11-02 に、最新の公開候補ブランチ（RC）`rc/sonic-20261031@a75f5cb`（2026-11-01 UTC）を確認したものです。正式な GitHub Release ではなく、オンラインでのデプロイを証明するものでもありません。旧 `main@ce443c8`（2026-10-27 UTC）とは API・認証の実装が異なり、同じ機能や保護を推定できません。稼働中のバージョンは不明です。RC のセッションの既定発行期間は30日で、90日は検証器が許容する上限にすぎず、再発行による90日への延長を意味しません。既定で有効な個人化は同意ではなく、リセットは部分的で失敗が表示されない場合があります。認証情報の失効は設定とリクエストの成功に依存します。不要な個人情報や認証情報を送信しないでください。

## 1. 統一レスポンス構造

以下は `brand: "Sonic"` を用いる代表的な応答形式です。すべてのエンドポイントの恒久的な互換性や SLA を保証するものではありません。

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
| 行動イベント | POST | `/api/sonic/events` | 行動イベントの送信（1 バッチ最大 50 件）  |
| | GET | `/api/sonic/events` | レコメンドプロファイル概要の照会  |
| | DELETE | `/api/sonic/events` | 現在の識別子の一部イベント／フィードバックを削除。完全削除・エクスポートではありません  |
| アグリゲーション検索 | GET | `/api/sonic/search/smart` | スマート混合検索と補完 |
| | GET | `/api/sonic/search/nexus` | 全ソース並列検索 |
| ダイナミック歌詞 | GET | `/api/sonic/lyrics/nexus` | 文字単位歌詞（YRC/QRC/KRC → AMLL → LRCLIB） |
| | GET | `/api/sonic/lyrics/sync` | クロスプラットフォーム同期歌詞（複数形式出力） |
| オーディオメディア | GET | `/api/music/stream` | オーディオセグメントプロキシ（Range／206；`?mode=redirect` 直連） |
| | GET | `/api/music/cover` | カバープロキシ（高画質優先、降格時は SVG） |
| | GET | `/api/music/palette` | カバーの色調分析 |
| 認証 | GET | `/api/auth/user` | 現在のセッション情報 |
| | GET／POST | `/api/auth/key` | API キーの表示／再発行 |
| | POST | `/api/auth/revoke` | 明示的キーが必要。失効は保存先設定と要求成功に依存 |
| | POST | `/api/auth/logout` | 現在の Cookie 消去。複製済みキーの即時失効は保証されません |

## 3. API キー認証

1. **形式**：`sonic_live_v2.<header>.<payload>.<signature>`、HMAC-SHA256 署名。`sub`（メール）、`iat`、`exp`、`jti`、`kid`、`role`、`uid` を含みます。署名は暗号化ではありません；
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

失効は `SONIC_REVOKED_JTIS`／`SONIC_REVOKED_SUBS`／`SONIC_TOKEN_MIN_IAT`、KV 等の設定と要求成功に依存します。ログアウトの Cookie 消去は複製済みキーの即時取消しではありません。削除 API も旧匿名識別子、レーダー、集計、外部推薦、ログ、バックアップ等を網羅せず、失敗が画面に出ない場合があります。完全な削除・写しは `privacy@epocanvas.com` へ。

## 5. 接続者の義務

1. API キーは個人の認証情報であり、第三者に譲渡したり、公開リリースされるクライアントに組み込んだりしてはいけません；
2. レート制限と縮退表示（`X-Sonic-Degraded: 1`）を尊重し、任意のプロファイリングには事前同意・拒否・撤回を実装してください。既定 ON や API キーは同意の証拠ではありません；
3. 接続者は自ら決定する処理の告知・保護を担いますが、運営者自身の責任を包括的に負担するものではありません。実際の役割で判断します。[オープンソースと自己ホスト](/ja/open-source/)参照。
