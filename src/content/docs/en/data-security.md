---
title: Data Processing & Security
description: Sonic data processing and security — data lifecycle, processing matrix, security measures, breach response, and self-hosting duties.
---

**Effective date: 30 October 2026｜Version: 1.0**

This page sets out the data lifecycle of the Sonic service (hereinafter "the service"), the nature of each processing activity, the security measures and the breach response procedures. It expands section 10 of the [Privacy Policy](/en/privacy-policy/); technical statements follow the actual implementation of the open-source code.

![The four security layers of Sonic: transport encryption, authentication and signing, edge SSRF defence, and isolated storage, alongside user-controlled erasure (one-click erase, incognito mode, immediate revocation on sign-out)](/images/sonic/security-shield.svg)

*Figure: the layered security measures of the service. The transport layer is TLS end to end; the authentication layer combines HMAC-SHA256 signed keys with the PKCE OAuth flow; the edge layer denies internal and metadata addresses; the storage layer is isolated through loopback binding and an encrypted tunnel. On the right are the controls you command.*

## 1. Data lifecycle

| Stage | Description |
| --- | --- |
| Collection | Account identification data from Epomail OAuth sign-in; behavioral events reported by the player (switchable off); transient use of IP for anonymous rate limiting |
| Transmission | HTTPS/TLS across the chain; the control plane and data plane communicate through a Cloudflare Tunnel encrypted channel with mandatory mutual service-key verification (X-Sonic-Engine-Key) |
| Storage | SQLite (WAL mode) on the data plane, on the named volume `sonic-data`; account identification data is never persisted |
| Use | Statistical computation keyed by pseudonymous identifiers (recommendations, trending, similarity); no human content review, no automated decision-making |
| Sharing | See [Third Parties & Transfers](/en/sub-processors/); never sold, never used for advertising |
| Erasure | Behavioral events auto-destroyed after 90 days; one-click erasure deletes immediately; rate-limit records expire after 120 seconds |

## 2. Processing matrix

| Processing activity | Data involved | Identity linkage | Legal basis | Retention |
| --- | --- | --- | --- | --- |
| Account identification and sign-in | Epomail identifier, e-mail address, nickname, avatar link, role | E-mail (within session) | Contract necessity | Never persisted; session lifetime |
| Behavioral event recording | Event type, track, artist, genre, language, search term, progress, weight | Pseudonymous hash (`usr_`／`anon_`) | Legitimate interests + objection right | 90 days (minimum 7) |
| Recommendation profile computation | Aggregated features of behavioral events | Pseudonymous hash | Legitimate interests + objection right | Destroyed with events |
| Global aggregate statistics | Search-term counts, track co-occurrence | Not linked to individuals | Legitimate interests | Under database maintenance |
| Rate limiting and abuse prevention | IP (anonymous bucket), e-mail hash (authenticated bucket) | Transient use | Legitimate interests | 120 s／60 s windows |
| Session and key security | Session cookie, API key payload, revocation lists | E-mail hash | Contract necessity, security duty | At most 30 days |

## 3. Security measures

### 3.1 Transport and access

1. **End-to-end encryption**: TLS from browser to edge and from edge to data plane; the data plane is reachable only through a Cloudflare Tunnel encrypted channel, with no public port exposure;
2. **Service-to-service verification**: the data plane enforces the X-Sonic-Engine-Key on all API, proxy and palette routes; the client-address header forwarded from the edge is accepted only after the engine-side service key verifies;
3. **Loopback binding**: the data-plane HTTP service binds to `127.0.0.1` by default, and the host maps only the loopback port.

### 3.2 Authentication and keys

1. **OAuth flow**: the state parameter and PKCE (S256) guard against authorization-code interception and replay; transactional cookies are valid for 600 seconds; any failed callback verification is rejected;
2. **API keys**: the `sonic_live_v2` versioned format signed with HMAC-SHA256, verified server-side in constant time; unsigned and legacy keys are always rejected (fail-closed); keys travel only in request headers, never in URL query parameters;
3. **Revocation**: signing out immediately revokes the current session; the key identifier (jti) revocation list and a global minimum issuance time support bulk invalidation;
4. **Session attributes**: `HttpOnly; Secure; SameSite=Lax`, valid at most 30 days.

### 3.3 Outbound request defences

1. **SSRF interception**: outbound requests to loopback addresses, RFC 1918 private ranges, Docker internal bridges and cloud metadata addresses (such as `169.254.169.254`) are always denied, with dual IPv4 and IPv6 checks, re-validating the target and its resolved addresses on every redirect;
2. **Domain allowlist**: the audio, cover and forwarding proxies allow only HTTPS targets on the controlled music CDN domain list;
3. **Request sanitisation**: upstream requests shed Set-Cookie and credential headers, carrying only the fixed User-Agent, the corresponding official Referer and the necessary Range header.

### 3.4 Storage and logs

1. **Pseudonymous storage**: behavioral events are keyed by one-way hash identifiers, with no plaintext e-mail column and no IP column;
2. **Minimised logging**: data-plane access logs contain only path, method, status code and duration; query strings, IP addresses, User-Agent, cookies, Authorization and request bodies are never logged;
3. **Backups**: database backups run as consistent snapshots (VACUUM INTO) with integrity checks; backup files contain pseudonymised behavioral data and deserve the same protection as production data;
4. **Container isolation**: the data plane runs as a Docker container stack, with the ncm-api helper container reachable only inside the internal network.

### 3.5 Known limitations

As an open-source project, the operator publishes the following known limitations and keeps improving them:

1. Deployments without the native rate limiter bound do not have strictly global rate counting;
2. DNS rebinding protection is not fully eliminated; deployers should add network-layer measures;
3. The session cookie contains the signed API key; a stolen cookie equals a stolen key;
4. SQLite is a single-writer architecture, unsuitable for high-concurrency write deployments.

The complete list is in the upstream repository's `docs/OPERATIONS.md`; self-hosted operators should assess their own deployment shape.

## 4. Breach response

1. **Internal record**: every personal data breach is documented (Article 33, Paragraph 5 of the GDPR);
2. **Notification to the authority**: where the breach is likely to risk the rights of data subjects, it is notified to the supervisory authority at the operator's location within 72 hours of awareness (Article 33, Paragraph 1);
3. **Communication to data subjects**: where the breach is likely to result in a high risk, affected data subjects are informed without undue delay through on-site announcement or other effective means, describing the nature of the breach and recommended measures (Article 34);
4. **Containment**: immediate isolation of affected systems, revocation of affected keys and sessions, assessment and repair of the cause, and documentation of the handling.

## 5. Data protection by design and by default

The service implements the following at design time (Article 25 of the GDPR):

1. **Pseudonymisation by default**: behavioral events are keyed by hash identifiers from the moment of collection, and e-mail addresses are never persisted;
2. **Zero-collection mode**: with personalisation off, events are not stored; public mode drops them outright;
3. **Minimal client data**: recommendation context carries only truncated favorites, artists and search terms, used in memory and never persisted;
4. **High-risk chains off by default**: third-party aggregation upstreams (GDStudio, Lyriva) and circumvention chains are strictly disabled by default and require explicit deployer action;
5. **One-click erasure**: the erasure right is implemented directly as a self-service function, with no manual request needed.

## 6. Duties of self-hosted operators

From the moment you deploy the service yourself, you are the data controller of your users and must:

1. **Notify**: inform your users of the data processing (you may base the notice on this site's [Privacy Policy](/en/privacy-policy/));
2. **Keep records**: maintain records of processing activities (Article 30 of the GDPR);
3. **Assess**: carry out a data protection impact assessment where processing is likely to result in high risk (Article 35), covering anonymous device identifiers, behavioral events, rate-limiting IPs and the OAuth e-mail;
4. **Verify configuration**: confirm that the behavioral retention days (`SONIC_RECOMMEND_RETENTION_DAYS`), the persistence path (`SONIC_RECOMMEND_DB_PATH`; setting it to `memory` disables persistence), the third-party switches and the rate-limit parameters match your policy commitments;
5. **Secure and submit to supervision**: apply the measures in section 3 and submit to supervision by the authority of your location as its law requires.

## 7. Auditability

Every security statement of this service can be verified against the source code: all processing logic, switch defaults and storage structures are public in the open-source repository. The technical facts of this site's documents are re-verified at each release; where they disagree with the code, the code prevails and the documents are corrected.
