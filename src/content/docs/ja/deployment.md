---
title: 展開ガイド
description: Sonic 展開ガイド — Cloudflare Pages エッジゲートウェイと Linux ローカルエンジンの二方式、環境変数、バックアップと復元、ヘルスチェックとロールバック。
---

**改訂日：2026年11月3日｜バージョン：1.9**

Sonic のエッジ、データプレーン、設定、バックアップを説明します。2026-11-02 に確認した最新の公開候補ブランチ（RC）`rc/sonic-20261031@a75f5cb`（2026-11-01 UTC）が対象で、以下の手順はそのコミットに固定しています。正式な GitHub Release ではなく、オンラインで稼働中のバージョンも不明です。旧 `main@ce443c8`（2026-10-27 UTC）とは構成・認証・保存処理が異なるため、同じ手順や保護を推定できません。役割は実際の処理の決定・関与に基づき、個人の端末内テストと公開サービスは別に評価します。条件は[総覧](/ja/overview/)と[オープンソースと自己ホスト](/ja/open-source/)、手順は上流の `docs/OPERATIONS.md` を参照してください。

## 1. 方式 A：Cloudflare Pages エッジゲートウェイ

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

コマンドを実行する前に、`YOUR_PROJECT_NAME` を実際の Pages プロジェクト名に置き換えてください。Cloudflare Pages の管理画面で暗号化環境変数を設定します：`SONIC_SECRET`、`SONIC_ENGINE_SECRET`（VPS 側と一致させる）、`SONIC_LOCAL_ENGINE_URL`（あなたのデータプレーンのトンネルドメインを指す）。

## 2. 方式 B：Linux ローカルプロトコルエンジン（Docker Compose）

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
cp .env.example .env
chmod 600 .env    # 強力なランダム値の SONIC_ENGINE_SECRET と SONIC_SECRET を記入
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

スタックの構成：sonic-engine 本体コンテナ（ホスト側は `127.0.0.1:8080` のみマッピング）、内部ネットワーク限定の ncm-api 補助コンテナ、SQLite 永続化（命名ボリューム `sonic-data`）。データプレーンは Cloudflare Tunnel 経由で接続され、公衆ネットワークへは直接公開されません。

## 3. 中核的な環境変数

| 変数 | 説明 |
| --- | --- |
| `SONIC_SECRET` | API キー署名鍵。長さ 32 文字以上（`openssl rand -base64 48`） |
| `SONIC_ENGINE_SECRET` | サービス間鍵。Pages と VPS の双方の側で一致させます |
| `SONIC_LOCAL_ENGINE_URL` | データプレーンのトンネルアドレス |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | 内蔵音源プロトコルのスイッチ（既定 1） |
| `SONIC_ENABLE_AMLL/LRCLIB` | 歌詞補完のスイッチ（既定 1） |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | 環境例・Compose は0でも、GDStudio はコードで未設定なら ON。実際の設定を確認。スイッチは課金・アクセス・著作権保護の回避許可ではありません |
| `SONIC_RECOMMEND_DB_PATH` | 行動データの保存パス。`memory` に設定するとディスクへの保存を無効化 |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 既定90日、最低7日。起動・一部書き込み時の消去で、90日固定経路もあり、全データの期限削除ではありません  |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | レート制限（既定 240／600） |
| `EPOMAIL_BASE_URL` など | Epomail OAuth の設定 |

全設定は上流 `.env.example` を参照してください。コードだけでは運営者氏名、ノード所在国、契約・移転根拠は確認できません。既定 ON を有効な同意とせず、任意処理の事前選択、拒否・撤回、保存・削除を実装してから公開してください。[プライバシーポリシー](/ja/privacy-policy/)参照。

## 4. バックアップと復元

1. **バックアップ**：`VACUUM INTO` と整合性確認（`npm run backup:db`）のスナップショットには個人データが含まれ得ます。本番相当の保護と明確な保存期限を設定し、個別削除できない場合は隔離・通常利用停止・期限後消去を実装してください；
2. **復元**：停止後に `npm run restore:db` 等で復元し、バージョンとスキーマの互換性を確認してください。復元時は削除記録を再適用すべきで、文書の記載だけでは自動処理が存在する証明になりません；
3. **容量と期限**：90日設定は期限直後の逐次破棄ではなく、レーダー、検索集計、ログ、バックアップを網羅しません。容量と各保存先の期間・削除結果を定期検証してください。

## 5. ヘルスチェックとロールバック

1. **ヘルスチェック**：`GET /api/sonic/engine/health`（サービス鍵が必要）はエンジンとサーキットブレーカーの状態を返します。エッジ側のサーキットブレーカーは、データプレーンの連続失敗で自動降格します；
2. **ログ**：アプリは最小化設計ですが、エラー、ホスト、プロキシ、Cloudflare は別です。生 IP キーが KV 等に入り、エンジンにアドレス・セッション・コンテキストが転送され得るため、全展開のゼロログとは言えません；
3. **ロールバック**：Pages 側は前のデプロイ版へ戻すだけで完了です。データプレーンは前のタグに `git checkout` して、`docker compose up -d --build` を再実行します。ロールバック前に SQLite スキーマの互換性を確認してください（マイグレーションフレームワークなし）。

## 6. 展開者チェックリスト

公開前に各項目を確認してください：

1. 二つの鍵がいずれも強力なランダム値で長さ 32 文字以上であり、`.env` の権限が 600 であること；
2. 外部接続、Google Fonts、DiceBear、MV・画像・アバター、HTTP 経路を確認し、メール seed を是正して、受領者・契約・移転根拠を確認すること；
3. イベントだけでなく旧匿名識別子、レーダー、検索集計、外部推薦、ログ、バックアップの保存・削除を検証すること；
4. データプレーンがトンネル経由でのみ到達可能で、ホストポートが公衆ネットワークへ開放されていないこと；
5. バックアップの隔離、期限後消去、復元時の削除記録再適用を整備して検証すること；
6. 管理者の身元・連絡先を収集前に告知し、任意処理は既定で行わず事前選択と撤回を実装すること。ログインや規約同意は代用ではありません（[プライバシーポリシー](/ja/privacy-policy/)参照）。
