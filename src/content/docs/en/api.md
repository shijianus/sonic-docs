---
title: Open Platform & API Access
description: The Sonic open API — the unified response structure, endpoint navigation, API key authentication and transmission rules, rate limits and revocation.
---

**Effective date: 1 November 2026｜Version: 1.4**

This page describes how to integrate with the Sonic open API: the unified response structure, the core endpoints, API key authentication and transmission rules, rate limits and revocation. Integration is governed by the [Terms of Service](/en/terms-of-service/) and the [Acceptable Use Policy](/en/acceptable-use/); the authoritative statement of the endpoint specifications is `API.md` in the upstream repository.

## 1. Unified response structure

Every endpoint commits externally to the `brand: "Sonic"` compatibility contract; the standard response is as follows:

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

The `meta` fields honestly report the cache level, the provider, the degraded state and the circuit-breaker state, on which clients can base transparent notices.

## 2. Core endpoint navigation

| Category | Method | Endpoint | Function |
| --- | --- | --- | --- |
| Smart recommendations | GET | `/api/sonic/recommend/for-you` | For You／Auto DJ |
| | GET | `/api/sonic/recommend/trending` | Trending charts (24h／7d／surging／new) |
| | GET | `/api/sonic/recommend/similar` | Similar tracks／artist exploration |
| | GET | `/api/sonic/recommend/discover` | Genre radar |
| Behavioral events | POST | `/api/sonic/events` | Report behavioral events (batches of at most 50) |
| | GET | `/api/sonic/events` | Query the recommendation profile overview |
| | DELETE | `/api/sonic/events` | Clear the personal profile in one click |
| Aggregated search | GET | `/api/sonic/search/smart` | Smart hybrid search and completion |
| | GET | `/api/sonic/search/nexus` | Multi-source parallel retrieval across the web |
| Dynamic lyrics | GET | `/api/sonic/lyrics/nexus` | Word-level lyrics (YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | Cross-platform synced lyrics (multi-format output) |
| Audio media | GET | `/api/music/stream` | Audio segment proxy (Range／206; `?mode=redirect` direct) |
| | GET | `/api/music/cover` | Cover proxy (high quality first, SVG fallback) |
| | GET | `/api/music/palette` | Cover colour-palette analysis |
| Authentication | GET | `/api/auth/user` | Current session profile |
| | GET／POST | `/api/auth/key` | View／reissue an API key |
| | POST | `/api/auth/revoke` | Revoke the current key (explicit key header required) |
| | POST | `/api/auth/logout` | Sign out and revoke the session |

## 3. API key authentication

1. **Format**: the `sonic_live_v2.<header>.<payload>.<signature>` versioned format, signed with HMAC-SHA256; the payload carries `sub` (e-mail address), `iat`, `exp`, `jti`, `kid`, `role` and `uid`;
2. **Issuance**: obtained from `/api/auth/key` after signing in through Epomail OAuth; keys are valid for 30 days from issue, with a 90-day validation cap;
3. **Transmission**: request headers only — `X-Sonic-Key: <key>` or `Authorization: Bearer <key>`; the URL query parameter channel has been removed entirely, so keys cannot leak into access logs, browser history or the Referer header;
4. **Validation**: the server compares in constant time with Web Crypto and strictly checks the version, `kid`, `iat`／`exp`, `jti` and the revocation lists; unsigned and legacy keys are always rejected (fail-closed).

## 4. Rate limits and revocation

| Item | Limit |
| --- | --- |
| Anonymous requests | 240 per minute (default) |
| Authenticated requests | 600 per minute (default) |
| Authentication endpoints | 30 per minute per IP |
| Behavioral event reporting | At most 50 per batch, request body 64 KB |

Revocation: signing out revokes the current session and its `jti` immediately; deployers can configure the `SONIC_REVOKED_JTIS`／`SONIC_REVOKED_SUBS`／`SONIC_TOKEN_MIN_IAT` static lists, or bind a KV store to enable instant revocation. Normal personal use does not approach the rate limits; sustained excess moves into the enforcement ladder of the [Acceptable Use Policy](/en/acceptable-use/).

## 5. Integrator obligations

1. An API key is a personal credential and must not be handed to third parties or embedded in publicly released clients;
2. Self-built clients should respect the rate limits, surface the degradation notice (`X-Sonic-Degraded: 1`) and observe the prohibited-conduct list of the [Acceptable Use Policy](/en/acceptable-use/);
3. The duty to inform end users when connecting a third-party client rests with the integrator; API users of self-hosted instances should also read [Open-Source & Self-Hosting Legal](/en/open-source/).
