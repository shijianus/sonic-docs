---
title: Data Processing & Security
description: Sonic data processing and security — data lifecycle, processing matrix, layered security measures, known limitations, breach response, and self-hosting duties.
---

**Effective date: 1 November 2026｜Version: 1.3**

This page sets out the data lifecycle of the Sonic service (hereinafter "the service"), the nature of each processing activity, the security measures, known limitations and the breach response procedures. It expands section 10 of the [Privacy Policy](/en/privacy-policy/); technical statements follow the actual implementation of the open-source code and can be verified by source audit.

![The four security layers of Sonic: transport encryption, authentication and signing, edge SSRF defence, and isolated storage, alongside user-controlled erasure (one-click erase, incognito mode, immediate revocation on sign-out)](/images/sonic/security-shield.svg)

*Figure: the layered security measures of the service. The transport layer is TLS end to end; the authentication layer combines HMAC-SHA256 signed keys with the PKCE OAuth flow; the edge layer denies internal and metadata addresses; the storage layer is isolated through loopback binding and an encrypted tunnel. On the right are the controls you command.*

## 1. Data lifecycle

| Stage | Description |
| --- | --- |
| Collection | Account identification data from Epomail OAuth sign-in (never persisted); behavioral events reported by the player in batches (switchable off, at most 50 events／64 KB per batch); transient use of IP for anonymous rate limiting |
| Transmission | HTTPS/TLS across the chain; the control plane and data plane communicate through a Cloudflare Tunnel encrypted channel with mandatory X-Sonic-Engine-Key verification; the client-address header forwarded from the edge is accepted only after the engine-side service key verifies |
| Storage | SQLite (WAL mode) on the data plane, on the named volume `sonic-data` at `/app/data/sonic-recommend.sqlite`; production failures to open the database refuse service (fail-closed) rather than silently degrading |
| Use | Statistical computation keyed by pseudonymous identifiers (recommendations, trending, similarity); no human content review, no automated decision-making |
| Sharing | See [Third Parties & Transfers](/en/sub-processors/); never sold, never used for advertising |
| Erasure | Behavioral events auto-destroyed after 90 days (pruned every 1,500 writes and at startup); one-click erasure deletes immediately; rate-limit records expire after 120 seconds |

## 2. Processing matrix

| Processing activity | Data involved | Identity linkage | Legal basis | Retention |
| --- | --- | --- | --- | --- |
| Account identification and sign-in | Epomail identifier, e-mail address, nickname, avatar link, role | E-mail (within session) | Contract necessity | Never persisted; session lifetime |
| Behavioral event recording | Event type, canonical track id, artist, genre, language, search term, progress ratio, signal weight | Pseudonymous hash (`usr_`／`anon_`) | Legitimate interests + objection right | 90 days (minimum 7) |
| Recommendation profile computation | Aggregated features of behavioral events (long-term artists, genre affinity, session intent) | Pseudonymous hash | Legitimate interests + objection right | Destroyed with events |
| Global aggregate statistics | Search-term counts, track co-occurrence | Not linked to individuals | Legitimate interests | Under database maintenance |
| Rate limiting and abuse prevention | IP (anonymous bucket), e-mail hash (authenticated bucket), per-IP counts on auth endpoints | Transient use | Legitimate interests | 120 s／60 s windows |
| Session and key security | Session cookie, API key payload (`sub`／`jti`／`kid` and others), revocation lists | E-mail hash | Contract necessity, security duty | At most 30 days |
| Database backups | Consistent snapshots of pseudonymised behavioral data | Pseudonymous hash | Security duty | Per the deployer's backup policy |

## 3. Security measures

### 3.1 Transport and access

1. **End-to-end encryption**: TLS from browser to edge and from edge to data plane; the data plane is reachable only through a Cloudflare Tunnel encrypted channel, with no public port exposure and the host mapping only `127.0.0.1:8080`;
2. **Service-to-service verification**: the data plane enforces the X-Sonic-Engine-Key on all `/api`, `/proxy` and `/palette` routes; the engine strips untrusted inbound headers and rebuilds the client-address header from the socket address, so forged values are ineffective;
3. **Explicit degradation**: degraded responses carry `X-Sonic-Degraded: 1` and the interface shows a degradation notice — the switch is never silent.

### 3.2 Authentication and keys

1. **OAuth flow**: the `state` parameter and PKCE (S256) guard against authorization-code interception and replay; transactional cookies are valid for 600 seconds and scoped to `/api/auth`; the callback verifies state, PKCE, the authorization code and replay, and rejects on any missing or anomalous element;
2. **API keys**: the `sonic_live_v2` versioned format signed with HMAC-SHA256, verified server-side in constant time with Web Crypto `crypto.subtle.verify`; version, `kid`, `iat`／`exp` and `jti` are strictly checked; unsigned and legacy v1 keys are always rejected (fail-closed); 30-day issue validity and a 90-day validation cap; keys travel only in request headers and the `?api_key=` query channel has been removed entirely, preventing key leakage into access logs, browser history or Referer;
3. **Revocation**: signing out immediately revokes the current session; the `jti` revocation list, subject revocation list and global minimum issuance time (`SONIC_REVOKED_JTIS`／`SONIC_REVOKED_SUBS`／`SONIC_TOKEN_MIN_IAT`) support bulk invalidation; with a KV binding and `SONIC_ENABLE_KEY_REVOCATION=1`, instant revocation is supported; without it, the relevant endpoints return 501 and point to the list-based method instead of pretending to revoke;
4. **Session attributes**: `HttpOnly; Secure; SameSite=Lax`, valid at most 30 days; the sign-in callback redirect carries only `?auth=success` and never returns a key.

### 3.3 Outbound request defences

1. **SSRF interception**: outbound requests to loopback addresses, RFC 1918 private ranges, Docker internal bridges and cloud metadata addresses (such as `169.254.169.254`) are always denied, with dual IPv4 and IPv6 checks, re-validating the target and its resolved addresses on every redirect;
2. **Domain allowlist**: the audio, cover and forwarding proxies allow only HTTPS targets on the controlled music CDN domain list (`SONIC_ALLOWED_MUSIC_DOMAINS`) with standard ports;
3. **Request sanitisation**: upstream requests shed `Set-Cookie` and credential headers, carrying only the fixed User-Agent, the corresponding official Referer and the necessary Range header; the egress IP is marked with the deployer-configured placeholder (an RFC 5737 documentation address by default), never the IP of any user.

### 3.4 Storage and logs

1. **Pseudonymous storage**: behavioral events are keyed by one-way hash identifiers (truncated SHA-256 with `usr_`／`anon_` prefixes), with no plaintext e-mail column and no IP column; the store has 6 tables (canonical tracks, platform track links, full-text index, behavioral events, track co-occurrence, search-term aggregates), of which only the behavioral events table is linked to individuals;
2. **Fail-closed storage**: a production failure to open the database refuses service instead of silently degrading; the in-memory fallback applies only to development and tests or an explicit `SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK=1`;
3. **Minimised logging**: data-plane access logs are line-delimited JSON containing only the request id, method, path, status code and duration; query strings, IP addresses, User-Agent, cookies, Authorization and request bodies are never logged; unhandled errors log only the request id, error name and a truncated message; logs go to Docker's standard output with rotation per the host's Docker configuration; there is no custom global access log on the Cloudflare Pages side;
4. **Backups**: database backups run as consistent snapshots (VACUUM INTO) with integrity checks; backup files contain pseudonymised behavioral data and deserve the same protection as production data;
5. **Container isolation**: the data plane runs as a Docker container stack, with the ncm-api helper container reachable only inside the compose network (`ncm-api:3000`) and never exposed publicly; the `.env` configuration file requires permission 600.

### 3.5 Known limitations

As an open-source project, the operator publishes the following known limitations and keeps improving them:

1. Deployments without the native Cloudflare rate limiter bound count in KV or process memory and are not strictly global;
2. DNS rebinding protection is not fully eliminated; deployers should add network-layer measures;
3. The `sonic_session` cookie contains the signed API key; a stolen cookie equals a stolen key — combine with device security and timely sign-out;
4. SQLite is a single-writer architecture, unsuitable for high-concurrency write deployments;
5. There is no built-in Prometheus metrics endpoint; monitoring relies on logs and external probes.

The complete list is in the upstream repository's `docs/OPERATIONS.md`; self-hosted operators should assess their own deployment shape.

## 4. Breach response

1. **Internal record**: every personal data breach is documented (Article 33, Paragraph 5 of the GDPR), regardless of a low-risk assessment;
2. **Notification to the authority**: where the breach is likely to risk the rights of data subjects, it is notified to the supervisory authority at the operator's location within 72 hours of awareness, describing the nature of the breach, the categories and approximate numbers involved, the likely consequences and the measures taken (Article 33, Paragraphs 1 and 3);
3. **Communication to data subjects**: where the breach is likely to result in a high risk, affected data subjects are informed without undue delay through on-site announcement or other effective means, describing the nature of the breach and recommended measures (Article 34); where the high risk is effectively remediated, communication may be waived with the decision documented;
4. **Containment**: immediate isolation of affected systems, revocation of affected keys and sessions (via the `jti` list and global minimum issuance time), assessment and repair of the cause, and documentation of the handling.

## 5. Data protection by design and by default

The service implements the following at design time (Article 25 of the GDPR):

1. **Pseudonymisation by default**: behavioral events are keyed by hash identifiers from the moment of collection, e-mail addresses are never persisted and the database has no IP column;
2. **Zero-collection mode**: with personalisation off, events are not stored; public mode drops them server-side with the ignored count reported honestly;
3. **Minimal client data**: recommendation context carries only truncated favorites, recent artists and search terms, used in memory and never persisted; the player never reads or writes `document.cookie` and keys never enter localStorage;
4. **High-risk chains off by default**: third-party aggregation upstreams (GDStudio, Lyriva) and circumvention chains are strictly disabled by default and require explicit deployer action (environment variables set to 1);
5. **One-click erasure**: the erasure right is implemented directly as a self-service function, with no manual request needed; "clear all local data" clears the server-side profile, localStorage, sessionStorage and IndexedDB together.

## 6. Duties of self-hosted operators

From the moment you deploy the service yourself, you are the data controller of your users and must:

1. **Notify**: inform your users of the data processing (you may base the notice on this site's [Privacy Policy](/en/privacy-policy/));
2. **Keep records**: maintain records of processing activities (Article 30 of the GDPR);
3. **Assess**: carry out a data protection impact assessment where processing is likely to result in high risk (Article 35), covering at least anonymous device identifiers, behavioral events, transient use of rate-limiting IPs and the hash derivation of the OAuth e-mail;
4. **Verify configuration**: confirm that the following match your policy commitments — behavioral retention days (`SONIC_RECOMMEND_RETENTION_DAYS`, default 90, minimum 7), persistence path (`SONIC_RECOMMEND_DB_PATH`; setting it to `memory` disables persistence), the memory-fallback switch (`SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK`), third-party switches (`SONIC_ENABLE_GDSTUDIO` and others), and rate-limit parameters (`SONIC_RATE_LIMIT_ANON_RPM`／`SONIC_RATE_LIMIT_AUTH_RPM`);
5. **Secure and submit to supervision**: apply the measures in section 3 (service keys of at least 32 characters, `.env` permissions 600, no public exposure of the data plane) and submit to supervision by the authority of your location as its law requires.

## 7. Auditability

Every security statement of this service can be verified against the source code: all processing logic, switch defaults, storage structures and log shapes are public in the open-source repository; the upstream repository also carries the security audit remediation record (`docs/AUDIT_REMEDIATION.md`) and the operations manual (`docs/OPERATIONS.md`). The technical facts of this site's documents are re-verified at each release; where they disagree with the code, the code prevails and the documents are corrected.
