---
title: 展開ガイド
description: Sonic 展開ガイド — Cloudflare Pages エッジゲートウェイと Linux ローカルエンジンの二方式、環境変数、バックアップと復元、ヘルスチェックとロールバック。
---

**発効日：2026年11月1日｜バージョン：1.4**

本ページでは、Sonic を自己ホスティングする二つの方式、中核的な環境変数、バックアップと復元、運用の要点を説明します。展開の時点から、展開者はその利用者のデータ管理者となります。関連する義務は[データ処理とセキュリティ](/ja/data-security/)第6節と[オープンソースと自己ホスティングの法的事項](/ja/open-source/)を参照してください。操作詳細の権威ある記述は上流リポジトリの `docs/OPERATIONS.md` にあります。

## 1. 方式 A：Cloudflare Pages エッジゲートウェイ

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <あなたのプロジェクト名>
```

Cloudflare Pages の管理画面で暗号化環境変数を設定します：`SONIC_SECRET`、`SONIC_ENGINE_SECRET`（VPS 側と一致させる）、`SONIC_LOCAL_ENGINE_URL`（あなたのデータプレーンのトンネルドメインを指す）。

## 2. 方式 B：Linux ローカルプロトコルエンジン（Docker Compose）

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
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
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | 第三者アグリゲーションと課金回避（既定 0。確実な必要がある場合を除き、閉じたまま維持してください） |
| `SONIC_RECOMMEND_DB_PATH` | 行動データの保存パス。`memory` に設定するとディスクへの保存を無効化 |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 行動イベントの保存日数（既定 90、下限 7） |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | レート制限（既定 240／600） |
| `EPOMAIL_BASE_URL` など | Epomail OAuth の設定 |

完全なリストは上流リポジトリの `.env.example` を参照してください。プライバシー関連スイッチの告知一致性の要件は[データ処理とセキュリティ](/ja/data-security/)第6節を参照してください。

## 4. バックアップと復元

1. **バックアップ**：一致性スナップショットのスクリプトで `VACUUM INTO` を実行し、整合性検査を添えます（`npm run backup:db`）。バックアップファイルには偽名化行動データが含まれるため、本番データと同等の保護を適用してください；
2. **復元**：停止後に復元スクリプトでスナップショットを戻します（`npm run restore:db`）。リポジトリにはバージョン管理されたマイグレーションフレームワークがないため、復元先のバージョンはバックアップのバージョンと一致させてください；
3. **容量**：行動イベントは 90 日の保存期間に従い自動消去されます。データベースのサイズはトラック正規化データの増加に伴い大きくなるため、ボリュームの空き容量に注意してください。

## 5. ヘルスチェックとロールバック

1. **ヘルスチェック**：`GET /api/sonic/engine/health`（サービス鍵が必要）はエンジンとサーキットブレーカーの状態を返します。エッジ側のサーキットブレーカーは、データプレーンの連続失敗で自動降格します；
2. **ログ**：エンジン側のアクセスログはパス、メソッド、ステータスコード、所要時間のみを含みます（`docker compose logs`）。クエリ文字列、IP、Cookie、リクエストボディは記録しません；
3. **ロールバック**：Pages 側は前のデプロイ版へ戻すだけで完了です。データプレーンは前のタグに `git checkout` して、`docker compose up -d --build` を再実行します。ロールバック前に SQLite スキーマの互換性を確認してください（マイグレーションフレームワークなし）。

## 6. 展開者チェックリスト

公開前に各項目を確認してください：

1. 二つの鍵がいずれも強力なランダム値で長さ 32 文字以上であり、`.env` の権限が 600 であること；
2. 第三者リンクのスイッチがあなたのプライバシー告知と一致していること（無効のものは告知から削除）；
3. 行動イベントの保存日数と保存パスが、あなたのポリシーの約束に合っていること；
4. データプレーンがトンネル経由でのみ到達可能で、ホストポートが公衆ネットワークへ開放されていないこと；
5. バックアップ計画と復元訓練を整えていること；
6. あなたの利用者に告知文書を公開していること（本サイトの[プライバシーポリシー](/ja/privacy-policy/)を基礎にできます）。
