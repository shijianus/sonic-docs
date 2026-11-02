---
title: Open Platform & API Access
description: The Sonic open API — the unified response structure, endpoint navigation, API key authentication and transmission rules, rate limits and revocation.
---

**Revision date: 2 November 2026｜Version: 1.8**

This page describes how to integrate with the Sonic open API: the unified response structure, the core endpoints, API key authentication and transmission rules, rate limits and revocation. Integration is governed by the [Terms of Service](/en/terms-of-service/) and the [Acceptable Use Policy](/en/acceptable-use/); the authoritative statement of the endpoint specifications is `API.md` in the upstream repository.

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

The hosted service is a free, individually maintained nonprofit test project, without an SLA or data-recovery guarantee. Default-on personalisation is not consent; profile reset is partial and failures may not be displayed; credential revocation depends on configuration and successful requests. Do not submit unnecessary personal data, production data or credentials.

## 1. Unified response structure

Endpoints commonly use the `brand: "Sonic"` response convention below. This is a technical format, not a guarantee that every endpoint or future version will remain compatible:

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
| Behavioral events | POST | `/api/sonic/events` | Report behavioral events (batches of at most 50)  |
| | GET | `/api/sonic/events` | Query the recommendation profile overview  |
| | DELETE | `/api/sonic/events` | Reset some current-identity events / feedback, not a complete profile erasure  |
| Aggregated search | GET | `/api/sonic/search/smart` | Smart hybrid search and completion |
| | GET | `/api/sonic/search/nexus` | Multi-source parallel retrieval across the web |
| Dynamic lyrics | GET | `/api/sonic/lyrics/nexus` | Word-level lyrics (YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | Cross-platform synced lyrics (multi-format output) |
| Audio media | GET | `/api/music/stream` | Audio segment proxy (Range／206; `?mode=redirect` direct) |
| | GET | `/api/music/cover` | Cover proxy (high quality first, SVG fallback) |
| | GET | `/api/music/palette` | Cover colour-palette analysis |
| Authentication | GET | `/api/auth/user` | Current session profile |
| | GET／POST | `/api/auth/key` | View／reissue an API key |
| | POST | `/api/auth/revoke` | Request key revocation; explicit key header and supported revocation storage required |
| | POST | `/api/auth/logout` | Clear the current cookie and attempt revocation; remote success is conditional |

## 3. API key authentication

1. **Format**: `sonic_live_v2.<header>.<payload>.<signature>` uses HMAC-SHA256 signing, not encryption; its payload may expose `sub` (email), `iat`, `exp`, `jti`, `kid`, `role` and `uid` to anyone holding the credential;
2. **Issuance**: `/api/auth/key` is used after Epomail OAuth sign-in; issuance and reissuance default to a 30-day lifetime. The 90-day limit is only the validator's permitted maximum, not a 90-day issuance or reissuance period. Signing in does not verify age or establish consent to optional profiling;
3. **Transmission**: use `X-Sonic-Key: <key>` or `Authorization: Bearer <key>`, not URL parameters. Removing the query channel reduces leakage but does not guarantee that host, proxy or error logging cannot expose credentials;
4. **Validation**: the server compares in constant time with Web Crypto and strictly checks the version, `kid`, `iat`／`exp`, `jti` and the revocation lists; unsigned and legacy keys are always rejected (fail-closed).

## 4. Rate limits and revocation

| Item | Limit |
| --- | --- |
| Anonymous requests | 240 per minute (default) |
| Authenticated requests | 600 per minute (default) |
| Authentication endpoints | 30 per minute per IP |
| Behavioral event reporting | At most 50 per batch, request body 64 KiB |

Sign-out clears the current cookie; copied credentials are revoked only if the configured mechanism and request succeed. Operators can use `SONIC_REVOKED_JTIS`, `SONIC_REVOKED_SUBS`, `SONIC_TOKEN_MIN_IAT` or supported KV storage, and must verify failures rather than promise universal instant invalidation. Rate limiting uses raw IP or identity-derived keys, some in KV; the edge also forwards client address, session and context to the engine. Sustained abuse is handled under the [Acceptable Use Policy](/en/acceptable-use/).

## 5. Integrator obligations

1. An API key is a personal credential and must not be handed to third parties or embedded in publicly released clients;
2. Self-built clients should respect the rate limits, surface the degradation notice (`X-Sonic-Degraded: 1`) and observe the prohibited-conduct list of the [Acceptable Use Policy](/en/acceptable-use/);
3. Integrators must disclose actual processing and obtain separate valid choices where required. Default-on personalisation is not consent; raw queries may enter public suggestions, and profile reset may omit data or fail silently. Do not present the audio proxy as all-traffic IP protection. See [Open-Source & Self-Hosting Legal](/en/open-source/) and the [Privacy Policy](/en/privacy-policy/).
