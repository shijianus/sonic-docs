---
title: Deployment Guide
description: The Sonic deployment guide — the two tracks of Cloudflare Pages edge gateway and Linux local engine, environment variables, backup and recovery, health checks and rollback.
---

**Revision date: 3 November 2026｜Version: 1.9**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page describes Sonic deployment, configuration, backup and recovery. Responsibilities follow actual operational and data-processing roles; purely personal testing and public service require separate assessment. Source review does not establish the operator's legal identity, node countries, contracts or live compliance. Before public processing, address the blockers in the [Privacy Policy](/en/privacy-policy/) and [Open-Source & Self-Hosting Legal](/en/open-source/). Operating details are in upstream `docs/OPERATIONS.md`, not a compliance certification.

## 1. Track A: Cloudflare Pages edge gateway

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

Before running the commands, replace `YOUR_PROJECT_NAME` with your actual Pages project name. Configure the encrypted environment variables in the Cloudflare Pages dashboard: `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (identical on the VPS side) and `SONIC_LOCAL_ENGINE_URL` (pointing to your data plane's tunnel domain).

## 2. Track B: Linux local protocol engine (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
cp .env.example .env
chmod 600 .env    # set strong random SONIC_ENGINE_SECRET and SONIC_SECRET
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

The stack consists of the sonic-engine main container (mapped on the host to `127.0.0.1:8080` only), the ncm-api helper container closed inside the internal network, and SQLite persistence (named volume `sonic-data`). The data plane is reached through Cloudflare Tunnel and is never exposed directly to the public internet.

## 3. Core environment variables

| Variable | Description |
| --- | --- |
| `SONIC_SECRET` | API key signing secret, at least 32 characters long (`openssl rand -base64 48`) |
| `SONIC_ENGINE_SECRET` | Service-to-service secret, identical on both the Pages and VPS sides |
| `SONIC_LOCAL_ENGINE_URL` | The data plane's tunnel address |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | Built-in source protocol switches (default 1) |
| `SONIC_ENABLE_AMLL/LRCLIB` | Lyrics fallback switches (default 1) |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | Optional paths; GDStudio defaults on in code when unset but off in environment / Compose examples; verify each switch and keep unlawful or unnecessary paths disabled |
| `SONIC_RECOMMEND_DB_PATH` | Store path; `memory` changes this store's persistence, not all logs, remote services or browser storage |
| `SONIC_RECOMMEND_RETENTION_DAYS` | Default 90, minimum 7; cleanup runs at startup / some writes, with a separate fixed 90-day write path and incomplete coverage |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | Rate limits (default 240／600) |
| `EPOMAIL_BASE_URL` etc. | Epomail OAuth configuration |

The complete list is in the upstream repository's `.env.example`; the notice-consistency requirements for the privacy-related switches are in [Data Processing & Security](/en/data-security/), section 6.

## 4. Backup and recovery

1. **Backup**: `npm run backup:db` uses `VACUUM INTO` and an integrity check. Backups can contain linkable personal data, not merely anonymous statistics; protect them and define a necessary retention period rather than assuming a schedule is already deployed;
2. **Recovery**: `npm run restore:db` restores a snapshot after stopping the service; check version and schema compatibility, and reapply deletion records before routine use. Isolate backups that cannot be selectively erased until defined expiry;
3. **Capacity**: event cleanup is triggered at startup and on some writes, not at each record's expiry. Radar, search statistics, logs and backups need separate controls; verify the fixed 90-day write path and monitor storage.

## 5. Health checks and rollback

1. **Health check**: `GET /api/sonic/engine/health` (service key required) returns the engine and circuit-breaker state; the edge-side circuit breaker degrades automatically on consecutive data-plane failures;
2. **Logs**: application access logs minimise fields, but errors, host systems, proxies and providers may retain request information. Raw IP rate-limit keys can enter KV, and the edge forwards client address, session and context to the engine; verify actual logging and retention rather than claiming zero logs;
3. **Rollback**: on the Pages side, rolling back to the previous deployment is enough; on the data plane, `git checkout` the previous tag and run `docker compose up -d --build` again; before rolling back, confirm SQLite schema compatibility (there is no migration framework).

## 6. Deployer checklist

Confirm each item before going live:

1. Secrets are strongly random and at least 32 characters long, `.env` permissions are 600, and credential revocation storage and failure handling are verified;
2. Map actual recipients, roles, contracts and node countries; check direct Google Fonts, email-based DiceBear requests, external images and MV connections. Certifications alone are not a transfer basis;
3. Implement necessary retention and verified deletion across events, radar, search statistics, logs and backups; the default 90-day setting and reset button do not suffice;
4. Keep the data plane private and verify each connection; an encrypted tunnel does not secure the HTTP upstream requests present in the reviewed code;
5. Test backup expiry, restoration with deletion records reapplied, and failures that the interface may currently hide;
6. Publish accurate identity and data notices and implement valid prior choices: default-on personalisation is not consent, and raw-query public reuse needs controls. Suspend optional processing without a lawful basis and necessary safeguards (see the [Privacy Policy](/en/privacy-policy/)).
