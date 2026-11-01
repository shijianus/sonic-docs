---
title: Deployment Guide
description: The Sonic deployment guide — the two tracks of Cloudflare Pages edge gateway and Linux local engine, environment variables, backup and recovery, health checks and rollback.
---

**Effective date: 1 November 2026｜Version: 1.4**

This page describes the two deployment tracks for Sonic, the core environment variables, backup and recovery, and operational essentials. From the moment of deployment the deployer is the data controller for that deployment's users; the relevant obligations are in [Data Processing & Security](/en/data-security/), section 6, and [Open-Source & Self-Hosting Legal](/en/open-source/); the authoritative operating detail is `docs/OPERATIONS.md` in the upstream repository.

## 1. Track A: Cloudflare Pages edge gateway

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <你的项目名>
```

Configure the encrypted environment variables in the Cloudflare Pages dashboard: `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (identical on the VPS side) and `SONIC_LOCAL_ENGINE_URL` (pointing to your data plane's tunnel domain).

## 2. Track B: Linux local protocol engine (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
cp .env.example .env
chmod 600 .env    # 填入强随机 SONIC_ENGINE_SECRET 与 SONIC_SECRET
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
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | Third-party aggregation and unlock switches (default 0; must remain off unless genuinely needed) |
| `SONIC_RECOMMEND_DB_PATH` | Persistence path for behavioral data; set to `memory` to disable persistence |
| `SONIC_RECOMMEND_RETENTION_DAYS` | Retention days for behavioral events (default 90, minimum 7) |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | Rate limits (default 240／600) |
| `EPOMAIL_BASE_URL` etc. | Epomail OAuth configuration |

The complete list is in the upstream repository's `.env.example`; the notice-consistency requirements for the privacy-related switches are in [Data Processing & Security](/en/data-security/), section 6.

## 4. Backup and recovery

1. **Backup**: a consistent snapshot script runs `VACUUM INTO` with an integrity check (`npm run backup:db`); backup files contain pseudonymised behavioral data and should be protected at the same level as production data;
2. **Recovery**: after stopping the service, a restore script reinstates the snapshot (`npm run restore:db`); the repository has no versioned migration framework, so the target version of a restore should match the backup's version;
3. **Capacity**: behavioral events are cleaned up automatically on the 90-day retention cycle; the database grows with the normalized track data, so watch the volume's free space.

## 5. Health checks and rollback

1. **Health check**: `GET /api/sonic/engine/health` (service key required) returns the engine and circuit-breaker state; the edge-side circuit breaker degrades automatically on consecutive data-plane failures;
2. **Logs**: engine-side access logs contain only path, method, status code and duration (`docker compose logs`); query strings, IPs, cookies and request bodies are not logged;
3. **Rollback**: on the Pages side, rolling back to the previous deployment is enough; on the data plane, `git checkout` the previous tag and run `docker compose up -d --build` again; before rolling back, confirm SQLite schema compatibility (there is no migration framework).

## 6. Deployer checklist

Confirm each item before going live:

1. Both secrets are strongly random and at least 32 characters long, and `.env` permissions are 600;
2. The third-party chain switches match your privacy notice (chains you have not enabled are removed from the notice);
3. The behavioral-event retention days and the persistence path match the commitments in your policy;
4. The data plane is reachable only through the tunnel, with no host ports open to the public internet;
5. A backup plan and recovery drills are in place;
6. A notice text has been published to your users (this site's [Privacy Policy](/en/privacy-policy/) can serve as the basis).
