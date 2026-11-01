---
title: Privacy Policy
description: The Sonic Privacy Policy — notice of collection, legal bases, retention periods, your rights and international transfers, with the GDPR as the minimum standard for every user.
---

**Effective date: 2 November 2026｜Version: 1.5**

This policy explains how the Sonic service (hereinafter "the service") collects, processes and transfers your personal data, and the standards and commitments the operator observes to protect it. Read this policy before signing in to or using the service; if you do not agree with any part of it, do not use the service.

The technical statements in this policy follow the actual implementation of the service's open-source code. The Simplified Chinese version of this site's legal documents is the authoritative version; the English and Japanese versions are reference translations, and in case of doubt the authoritative version prevails. The service applies the EU General Data Protection Regulation (GDPR) as the minimum data protection standard for every user (see section 2).

![The five pillars of the Sonic privacy policy: lawfulness, purpose limitation, minimisation and retention, security, and your rights, resting on the GDPR-level baseline](/images/sonic/privacy-pillars.svg)

*Figure: the five axes of this policy. Lawfulness anchors on the legal bases of Article 6 of the GDPR; purpose limitation excludes advertising profiles; minimisation is implemented through pseudonymisation and one-click erasure; security measures are in section 10; rights are exercised under section 9; all five rest on the GDPR-level baseline.*

## 1. Scope

This policy applies to the personal data arising from your use of the service in any form, including:

1. Visiting the service's sites (`sonic.epocanvas.tech`, `sonic.epocanvas.com`, or the domain of a self-hosted instance);
2. Using every function of the web player (search, playback, lyrics, recommendations, downloads, local music import);
3. Third-party clients connecting through the open API.

This policy does not apply to third-party websites and services linked or embedded in the service (such as the upstream music platforms' own sites); those third parties have their own privacy policies, for which they are responsible. An operator who self-hosts Sonic becomes the data controller of its users from the moment of deployment and must perform the notice duties required by the law applicable at its location; this policy may serve as the baseline text for its notice.

## 2. Data controller and protection baseline

| Instance you use | Data controller | Notes |
| --- | --- | --- |
| Hosted instances (`sonic.epocanvas.tech`, `sonic.epocanvas.com`) | The operations team | The operations team is the controller for behavioral events, sign-in and security records |
| Self-hosted instances | The deployer of that instance | The open-source code contains no telemetry; apart from external services configured by the operator, nothing is sent back to the upstream authors or any third party |

**Protection baseline**: the service applies the GDPR as the minimum data protection standard for every user, wherever you live. Your rights of notice, access, rectification, erasure, restriction, portability, objection and complaint regarding your personal data are never below the level set by the GDPR. For users in the European Union and the European Economic Area, the GDPR applies directly; for users elsewhere, the service carries the GDPR standard as a contractual obligation; where the law of your location grants stronger protection, that law prevails to its extent.

## 3. Notice of collection

When the service collects personal data from you, it clearly informs you of the following:

| Notice item | The service's disclosure |
| --- | --- |
| 1. Identity of the controller | The operator (section 2; for self-hosted instances, their deployer) |
| 2. Purposes of collection | Account identification and sign-in sessions; provision of playback, search and recommendation functions; abuse and fraud prevention; rate limiting and service security (see the matrix in section 5) |
| 3. Categories of personal data | Account identification (Epomail user identifier, e-mail address, nickname, avatar link, account role); behavioral and preference data (play, completion, skip, favorite, dislike, search terms and similar events, linked by a pseudonymous identifier); technical data (transient use of IP for rate limiting, session cookie, OAuth transactional cookies) — see section 4 |
| 4. Period, region, recipients and manner of use | Period: behavioral events are destroyed automatically 90 days after recording (deployer-configurable, minimum 7 days); account identification data is never persisted and exists only within sessions; region: the control plane runs on the Cloudflare global edge network and the data plane on the operator's own Linux node (section 7); recipients: the operator and its processors, and competent authorities under legal requirement (section 7); manner: automated pseudonymised storage and statistical computation, never human content review |
| 5. Your rights and how to exercise them | Access, rectification, erasure, restriction, portability, objection and complaint, as set out in section 9 |
| 6. Consequences of not providing | The core functions (search, playback, lyrics) are usable without signing in and without reporting behavioral events; personalised recommendation and behavioral-event management require sign-in where applicable, while local favorites and playlists do not require sign-in and are not synchronized across devices |

## 4. Personal data collected

### 4.1 Account identification data (via Epomail sign-in)

When you sign in with an Epomail account over OAuth 2.0 (PKCE), the service obtains the following fields from Epomail's userinfo endpoint, and no other account data:

| Field | Use | Persisted? |
| --- | --- | --- |
| User identifier (`id`／`sub`) | In-session identification | No |
| E-mail address (must be verified) | Deriving pseudonymous hashes; the `sub` claim of the API key issued to you personally | No |
| Nickname or username (`name`／`username`／`nickname`) | Interface display | No |
| Avatar link (`avatar`／`picture`) | Interface display | No |
| Account role (`role`) | Permission decisions | No |

The service maintains no separate registration system and collects no phone number, legal name, postal address or payment data. The e-mail address is used only within the sign-in session: to derive the pseudonymous identifier (a SHA-256 hash with the `usr_` prefix, truncated to 12 hexadecimal characters), the user-identifier hash and rate-limit bucket keys; the derived hashes cannot be reversed into the original e-mail address.

### 4.2 Behavioral events

To provide the recommendation and Auto DJ functions, the service records behavioral events related to track playback. There are 11 event types: search, search click, play start, play progress, play completion, skip, replay, favorite, unfavorite, dislike and undislike. Each event is linked to one of the following pseudonymous identifiers:

1. **Signed-in users**: a SHA-256 hash derived from the e-mail address (prefix `usr_`);
2. **Anonymous participants**: a hash (prefix `anon_`) of a random identifier generated in your browser and re-hashed server-side;
3. **Public mode**: with personalisation off, events are neither stored nor persisted — they are dropped server-side.

Event reporting is batched (at most 50 events per batch, 64 KB per request body) and flushed when the page is hidden. Each stored event contains only: the event type, the canonical track identifier, artist key, genre and language tags, the search term (where applicable), the progress ratio and the signal weight — no IP addresses, no device fingerprints, no free-text content.

Noise and false-signal purification: skips caused by network stalls (network_stall), decode failures (playback_error), trial truncation (trial_end), unavailable streams (stream_unavailable), buffer timeouts (buffer_timeout) or auto-switch failures (auto_switch_error) carry zero weight and are never stored; the client reports an active skip only when playback is healthy and between 0.5 and 25 seconds of listening.

In addition, recommendation requests carry a small amount of client-side context (a truncated set of favorites, recent artists and recent search terms), used in memory for that request's personal ranking only and never persisted or logged.

### 4.3 Global aggregate statistics

The service also maintains global aggregate statistics unrelated to any user, for the trending lists and similar-track recommendations:

| Statistic | Content | Link to individuals |
| --- | --- | --- |
| Search-term aggregate counts | Global frequency counts of search terms | None |
| Track co-occurrence relations | Global statistics of tracks listened together | None |

These records contain no personal identifiers, are not linked to your identity, and are outside the scope of "one-click profile erasure" (since they belong to no user).

### 4.4 Local storage in your browser

The following data lives only in your browser; the operator's servers never receive a full copy. When storage is unavailable in the browser's private mode, it degrades automatically to in-memory storage:

| Location | Key | Content |
| --- | --- | --- |
| localStorage | `audio` | Playlists, current track, play mode, volume, mute state, play history |
| localStorage | `library` | Liked songs, collected playlists, followed artists, liked MVs, collected albums, user playlists |
| localStorage | `global` | Theme, language preference, search history (at most 10 entries) |
| localStorage | `settings` | Interface preferences (background animation, quality preference and other settings) |
| localStorage | `recommend` | Personalisation toggle, Auto DJ toggle, anonymous identifier, disliked-track list |
| localStorage | `sonic-perf-mode` | Performance-mode toggle |
| IndexedDB | `SonicMusicPlayerDB` | Locally imported music files (`local_music`) and downloaded tracks (`downloaded_music`) |

### 4.5 Technical data processed automatically

- **Rate limiting**: anonymous requests are rate-limited per IP bucket (240 per minute by default); the IP is used only transiently as a rate-limit key — the native edge limiter retains no data, or a KV record auto-expires after 120 seconds, or a 60-second in-memory window (at most 4096 buckets) holds it; the IP is never written to the database and never to access logs. Authenticated requests are bucketed by e-mail hash (600 per minute by default), and authentication endpoints have a dedicated 30-per-minute-per-IP limit.
- **Session and keys**: a signed-in session issues an `HttpOnly; Secure; SameSite=Lax` `sonic_session` cookie (valid at most 30 days) containing the signed API key; keys are never written to URLs, query parameters or localStorage. The OAuth handshake uses the `sonic_oauth_state` and `sonic_oauth_verifier` transactional cookies (valid 600 seconds, scoped to `/api/auth`). The API key payload carries `sub` (e-mail), `iat`, `exp`, `jti`, `kid`, `role` and `uid`; `jti` serves revocation lists and immediate invalidation on sign-out.
- **Access logs**: data-plane access logs are line-delimited JSON containing only the request id, method, path, status code and duration; query strings, IP addresses, User-Agent, cookies, Authorization and request bodies are never logged. Error logs contain only the request id, error name and a truncated message.
- **Audio proxy**: audio streams are proxied through the service's edge by default; upstream requests carry only a User-Agent, the CDN-specific official Referer and the Range header, with Set-Cookie and credential headers stripped; upstream CDNs see only the proxy's address. If you actively invoke the `?mode=redirect` direct mode, your browser connects straight to the official CDN and your IP becomes visible to that CDN (an inherent property of 302 redirects); the web player never uses this mode.
- **Edge network**: Cloudflare processes network-layer request metadata under its own policies.

### 4.6 What the service never collects

The service has no advertising trackers, no cross-site cookies, no third-party analytics scripts, no device fingerprinting and no behavioral advertising profiles; it collects no contacts, photo library, location or any device data unrelated to music playback; it never sells personal data or uses it for advertising, and connects to no advertising network.

## 5. Legal bases and purposes

The legal bases of each processing activity are as follows:

| Processing activity | Purpose | Legal basis |
| --- | --- | --- |
| Epomail sign-in, session maintenance, API key issuance and revocation | Account identification and service access | Necessity for the contract (Article 6, Paragraph 1, point (b) of the GDPR) |
| Behavioral events and recommendation profile (pseudonymised) | Recommendation and Auto DJ functions | Legitimate interests (Article 6, Paragraph 1, point (f)); you may switch off personalisation at any time (the objection right in section 9), which stops collection immediately |
| Global aggregate statistics | Trending lists and similar recommendations | Legitimate interests (Article 6, Paragraph 1, point (f)); not linked to individuals |
| Anonymous-identifier events (anonymous participants) | Recommendation functions | Your own choice; switching personalisation off terminates it |
| IP rate limiting, session security, abuse prevention | Service security and stability | Legitimate interests (Article 6, Paragraph 1, point (f)); where applicable also a legal obligation (Article 6, Paragraph 1, point (c)) |

Your personal data is used only for the purposes above and the scope closely related to them. The service never uses your data for automated decision-making within the meaning of Article 22 of the GDPR (decisions producing legal effects or similarly significantly affecting you); the impact of recommendations is limited to the playback sequence and chart ordering you see, and you can turn it off at any time.

## 6. Retention periods and erasure

| Data category | Retention policy |
| --- | --- |
| Behavioral events | Destroyed automatically 90 days after recording (deployer-configurable, minimum 7 days), pruned on write counts and at startup; "one-click profile erasure" destroys them immediately |
| Account identification data (e-mail, nickname, avatar link, role) | Never persisted; exists only within sessions |
| Session cookie | At most 30 days; invalidated immediately on sign-out |
| OAuth transactional cookies | Auto-expire after 600 seconds |
| Rate-limit counters | Not retained by the native edge limiter; KV records auto-expire after 120 seconds; in-memory window 60 seconds |
| Key revocation lists | Deployer-configured static lists (environment variables) or instant KV revocation records |
| Database backups | Consistent snapshots containing pseudonymised behavioral data; deserve the same protection as production data |
| Global aggregate statistics | Contain no personal identifiers; handled under database maintenance policy |
| Browser local storage | Remains on your device until you clear it or use "clear all local data" |

## 7. Sharing with third parties and international transfers

The service shares personal data with third parties on a strict minimum-necessity principle; the complete list is in [Third Parties & Transfers](/en/sub-processors/), in summary:

1. **Processors**: Cloudflare (Pages hosting, Functions edge computing, Tunnel encrypted channel, KV storage, rate-limiting infrastructure);
2. **Identity provider**: Epomail (identifier, e-mail address, nickname, avatar link and role obtained at sign-in);
3. **Upstream content sources**: NetEase, QQ, Kugou, Kuwo, AMLL, LRCLIB and the official content CDNs — requests carry only song query parameters with a fixed User-Agent／Referer, never your identity or IP;
4. **Legal requirement**: provided only upon a request from a competent authority following legal procedure, with notice to you to the extent the law allows.

The control plane of the service runs on the Cloudflare global edge network, so your personal data may be processed at nodes outside the operator's country. The operator manages international transfers under the safeguards of Articles 44 to 46 of the GDPR (including the EU Standard Contractual Clauses) governing the hosting and processor relationships, and relies on Cloudflare's data protection certifications (SOC 2 Type II, ISO/IEC 27001). Self-hosted operators must assess and ensure that their international transfers meet the requirements of the law at their own location.

## 8. Protection of children

The service is not directed at children under 16 and does not knowingly collect children's personal data; where the law of your location sets a lower age of consent for information society services (no lower than 13, Article 8 of the GDPR), that age applies. A guardian who believes a child has provided personal data may contact the operator for deletion, which is processed immediately after verification. No one may use the service to distribute content harmful to minors; the relevant restrictions are in the [Acceptable Use Policy](/en/acceptable-use/).

## 9. Your rights and how to exercise them

You have the following rights regarding your personal data:

1. Access and obtain a copy (Article 15 of the GDPR);
2. Rectification (Article 16);
3. Erasure (Article 17);
4. Restriction of processing (Article 18);
5. Data portability (Article 20);
6. Objection (Article 21), including switching personalisation off at any time;
7. Not to be subject to decisions based solely on automated processing (Article 22) — the service makes no such decisions.

How to exercise them:

![The "Privacy & local data" section of the Sonic settings page: the smart search and personalisation toggle, the Auto DJ toggle, the reset-profile-and-dislikes button, with the section stating "the following data lives only in your browser and is never uploaded to the server"](/images/sonic/ui/ui-privacy.png)

*Figure: the "Privacy & local data" section of the settings page — the live interface of the self-service functions below. The interface tour is in the [Interface & Features Guide](/en/interface/), section 7.*

1. **Self-service functions (immediate effect)**:
   - "Clear recommendation profile": immediately destroys all behavioral events server-side linked to you (`DELETE /api/sonic/events`);
   - "Clear all local data": immediately clears browser localStorage, sessionStorage and the entire IndexedDB database, and destroys the server-side profile as well;
   - Recommendation profile summary: query the available summary of your current profile via `GET /api/sonic/events` (total events, favorite and dislike counts, most-played artists, genre affinities, recent search terms, storage kind). This is a summary, not a complete export; browser-local data remains on your device, and Sonic provides no general localStorage/IndexedDB export;
   - Switch personalisation off: takes effect immediately in settings, with the pending queue flushed and no further events collected;
   - Sign out: immediately revokes the current session and key identifier.
2. **Manual requests**: requests not covered by the self-service summary or deletion controls go to `privacy@epocanvas.com`; the operator responds within one month of receipt (Article 12, Paragraph 3 of the GDPR); complex cases may extend by a further two months, with the reason communicated within the first month.

If you believe the service's processing has infringed your rights, you may seek a remedy from the operator (Article 79) and lodge a complaint with a supervisory authority at the operator's location (Article 77); users in the European Union and the European Economic Area may lodge a complaint with the supervisory authority of their habitual residence, place of work or the place of the alleged infringement. Anyone who has suffered material or non-material damage from a GDPR infringement may seek compensation under Article 82.

## 10. Security measures

Under Article 32 of the GDPR, the operator maintains and continually improves appropriate technical and organisational measures against theft, alteration, damage, loss or disclosure of personal data: HTTPS/TLS across the chain; HMAC-SHA256 versioned signed API keys with constant-time comparison; the PKCE OAuth flow with time-limited transactional cookies; HttpOnly／Secure／SameSite cookie attributes with immediate revocation; the data plane bound to loopback only and reachable through an encrypted tunnel; full-chain SSRF interception and a domain allowlist; pseudonymous identifiers and an IP-free database design; minimised logging; fail-closed key verification. The complete list, the processing matrix and known limitations are in [Data Processing & Security](/en/data-security/).

## 11. Changes to this policy

This policy may be revised as the service or the law changes. Material changes (adding third-party recipients, changing retention policies or collection scopes, and the like) will be announced in advance on the site, and the effective date and version at the top of this page updated. Continuing to use the service after a change takes effect constitutes acceptance of the revised policy; if you do not agree, stop using the service and erase your data. Material revisions are archived with the version history of the open-source repository.

## 12. Contact

- **Privacy matters, rights and appeals**: `privacy@epocanvas.com`
- **Service and account matters**: `admin@epocanvas.com`
- **Open-source project**: GitHub repository Issues (`github.com/shijianus/sonic`)
- **Self-hosted sites**: contact the operator published by that site

---

*This document is a compliance document prepared by the Sonic operations team and is not legal advice; mandatory provisions of the law of your location prevail over any inconsistent part of this policy.*
