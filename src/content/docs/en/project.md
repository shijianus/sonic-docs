---
title: Project Overview
description: The epocanvas sonic project — product identity, core capabilities, architecture, recommendation engine, security and privacy design, fit, deployment, and reading guide.
---

**Revision date: 2 November 2026｜Version: 1.8**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page introduces the epocanvas sonic project (hereinafter "Sonic" or "the project"): its product identity, core capabilities, system architecture, security and privacy design, fit and deployment, together with a reading guide for this site. Whether you intend to use a hosted instance, deploy your own, or review our privacy and terms commitments, start here. The legal commitments are set out in the [Privacy Policy](/en/privacy-policy/) and the [Terms of Service](/en/terms-of-service/).

![Sonic two-plane architecture: users connect to the Cloudflare edge control plane (routing, rate limiting, caching, circuit breaking); the Linux data plane performs protocol parsing, recommendation computation and SQLite storage; audio streams are proxied by the edge from official CDNs by default](/images/sonic/project-architecture.svg)

*Figure: the control plane and data plane of Sonic. The control plane runs on Cloudflare Pages at the edge; the data plane runs on the operator's own Linux node, connected through an encrypted tunnel with mandatory service-key verification. Audio streams are proxied from official CDNs by default (Range 206), with an optional 302 redirect mode.*

## 1. Product identity

Sonic is an independently developed multi-source music streaming platform and aggregation gateway, built on a two-plane architecture of a "Cloudflare edge control plane + Linux local protocol engine data plane", designed for high-quality streaming, millisecond word-level lyrics and user-controllable recommendations. The project is open-source software; the source code is publicly available and anyone may deploy it.

| Item | Description |
| --- | --- |
| Hosted instances | `sonic.epocanvas.tech` and `sonic.epocanvas.com`, where actually operated by this individual, free nonprofit test project; the operator must disclose its legal identity and contact details |
| Self-hosted instances | Independently deployed instances; operator and controller roles depend on who actually determines the service and processing, not the deployment label alone |
| Source license | The latest public RC has MIT licences in the repository root and `player/LICENSE`; the missing root licence in the older `main@ce443c8` is only a legacy comparison. Nonprofit status does not prohibit permitted commercial use; media and trademarks have separate rights |
| Sign-in | The latest public RC uses Epomail OAuth 2.0 (PKCE), without a separate registration system; the older `main@ce443c8` lacks these RC controls, and the live version is unknown |
| Software composition | Cloudflare Pages front end and edge functions (control plane), Node.js 22 local engine and ncm-api helper container (data plane), Vue 3 web player |

## 2. Core capabilities

![The Sonic player's live interface: left navigation (Explore, My Music, System), home page with banner carousel, smart recommendation and music radar, recommended playlists, and the bottom mini player bar](/images/sonic/ui/ui-home.png)

*Figure: the hosted instance's web player running live. A per-function tour of the interface is in the [Interface & Features Guide](/en/interface/).*

| Capability | Description |
| --- | --- |
| Multi-source aggregated search | Fault-tolerant retrieval across all sources: simplified/traditional normalization, pinyin and initials lookup, artist alias-symmetric matching, edit-distance spelling tolerance, version recognition; parallel multi-source retrieval with normalized deduplication |
| Word-level dynamic lyrics | Native reverse parsing of NetEase YRC, QQ QRC and Kugou KRC (XOR decryption + Deflate), continued by AMLL TTML and the LRCLIB global lyrics library; translations and romanization synchronized at millisecond level |
| Quality tiers and trial transparency | Strict entity probing distinguishes complete tracks from official 30-second trial truncation, never presenting a trial as a full track; cross-source full-track completion for trials is triggered automatically (configurable) with the substitute source labelled |
| Smart recommendations and Auto DJ | A lightweight local recommendation engine: multi-factor trending model, session search intent, behavioral feedback weighting, content similarity with MMR diversity re-ranking; no external big-data cluster required |
| Behavioral event control | Personalisation can be switched off, but separate search statistics remain; profile reset covers only some current-identity events and feedback, with omissions and possibly hidden failures |
| Security boundaries | The RC includes PKCE, signed sessions, versioned API keys and some SSRF checks; actual cookie settings, credential transmission and deployment configuration still require verification. The older `main@ce443c8` does not establish RC or live functionality |
| Failover | When the data plane goes offline, the edge attempts to switch to fallback paths and shows a degraded-mode notice; this is not a promise of zero-latency switching or uninterrupted playback |

## 3. Architecture overview

### 3.1 Control plane (Cloudflare edge)

The control plane runs on Cloudflare Pages and Pages Functions, performing:

1. **Routing and authentication**: the single entry for API requests, auth checks and signed-key verification;
2. **Tiered rate limiting**: 240 requests per minute anonymous, 600 per minute authenticated (defaults, configurable), plus a dedicated 30-per-minute-per-IP limit on authentication endpoints;
3. **Multi-tier caching**: edge cache keyed `sonic:*` with an 8-minute fresh window and a stale fallback state after expiry;
4. **Three-state circuit breaker**: 3 consecutive failures or a call exceeding the 4.5-second budget trips OPEN; further requests stop waiting on the tripped data plane and attempt the edge fallback (public QQ／Kugou search interfaces and AMLL／LRCLIB), which still incurs network latency; after a 30-second cooldown it enters HALF_OPEN probing and closes on success. Degraded responses carry `X-Sonic-Degraded: 1` and the player shows a degradation capsule.

### 3.2 Data plane (Linux protocol engine)

The data plane is a Docker Compose stack on the operator's own Linux node:

| Component | Description |
| --- | --- |
| sonic-engine main container | Node.js 22 HTTP service listening on port 8080, mapped only to `127.0.0.1` on the host; all `/api`, `/proxy` and `/palette` routes enforce the service key (X-Sonic-Engine-Key) |
| ncm-api helper container | NetEase protocol helper reachable only inside the compose network (`ncm-api:3000`), never exposed publicly |
| SQLite 3 (WAL mode) | Persistence for behavioral events and entity weights on the named volume `sonic-data` (`/app/data/sonic-recommend.sqlite` in the container); backups run as consistent snapshots (VACUUM INTO) with integrity checks |
| Native protocol modules | Pure TypeScript parsing of NetEase linuxapi/eapi, QQ, Kugou KRC and Kuwo protocols |

The control plane and data plane communicate through a Cloudflare Tunnel encrypted channel; the data plane has no direct public port exposure.

### 3.3 Audio stream path

Audio streams normally use the same-origin byte-range edge proxy with HTTP `Range` and `206 Partial Content`, allowing that upstream connection to see the proxy address. This is not protection for all traffic: `?mode=redirect`, MVs, covers, external images, avatars and fonts may connect directly and expose your IP. The current code loads Google Fonts and can send a plaintext email address to DiceBear as an avatar seed. Some upstream requests use HTTP, so not every connection is encrypted. See the [Privacy Policy](/en/privacy-policy/), section 4.4.

## 4. Sources and lyrics chain

| Source | Share | State |
| --- | --- | --- |
| Local native parsing (NetEase／QQ／Kugou／Kuwo official interfaces + ncm-api) | Main chain (over 90%) | On by default |
| AMLL TTML word-level lyrics + LRCLIB synced lyrics | Lyrics fallback (about 10%) | On by default |
| GDStudio／Lyriva third-party aggregation | Optional paths | GDStudio defaults on in code when unset but off in environment / Compose examples; verify actual switches |
| ListenBrainz／MusicBrainz similar-artist enrichment | Optional enhancement | Off by default |

Trial detection probes the audio entity's length and metadata to identify official 30-second truncation; the result is labelled transparently in the front end and may trigger cross-platform full-track matching (against free full tracks on QQ／Kugou／Kuwo), switching smoothly and labelling the substitute source on success. The project integrates no paywall-circumvention components.

## 5. Recommendation engine

The core recommendation engine runs on the data plane; optional external providers and radar sync depend on configuration and route availability. Track-signal weights are public in the source code; artist, album, playlist and MV feedback also exists:

| Signal | Weight | Meaning |
| --- | --- | --- |
| favorite (add to favorites) | +4.0 | Very strong positive |
| replay (replay) | +3.5 | Strong positive |
| play_complete (valid completion) | +2.5 | Standard positive |
| play_progress (listening progress) | +0.2 ～ +1.8 | Scored by listening ratio |
| skip (fast skip) | -0.8 | Skipping past the halfway point counts +0.25 |
| dislike (explicit reject) | -5.0 | Hard-filtered and blocklisted |

Noise and false-signal purification: skips caused by network stalls (network_stall), decode failures (playback_error), trial truncation (trial_end), unavailable streams (stream_unavailable), buffer timeouts (buffer_timeout) or auto-switch failures (auto_switch_error) carry zero weight and are never stored.

The trending model combines valid plays (35%), distinct listeners (25%), completion (20%), favorite conversion (15%) and growth slope (5%), with exponential time decay (a 24-hour surging chart and a 7-day cumulative chart) and Bayesian／Wilson Score smoothing; similarity blends the artist-relation graph with audio-feature cosine and applies MMR re-ranking to balance precision and diversity. Session intent and longer-term signals are weighted separately; this does not mean searches are never retained. Separate raw-query counts may appear in public suggestions even when personalisation is off.

## 6. Security design

1. **Authentication**: the latest public RC uses OAuth state and PKCE, with OAuth transaction cookies lasting 600 seconds; actual deployment still requires verification, and the older `main@ce443c8` is only a compatibility comparison;
2. **API keys**: the RC implements `sonic_live_v2` signed credentials and version, signature, time and configured revocation checks. Issuance defaults to 30 days; the validator's maximum 90-day lifetime is not the default. Signing is not encryption; credentials must not appear in URLs, logs or public clients. Live settings and revocation propagation remain unverified;
3. **Revocation**: sign-out, revocation endpoints and immediate invalidation depend on the actual routes, storage, switches and request results. The RC provides revocation paths but does not prove immediate effect in every deployment;
4. **Sessions**: cookie attributes, lifetime and server-side state require deployment verification; frontend `auth` may retain email and avatar data;
5. **SSRF defence**: the RC contains route-specific checks for loopback, private-network and cloud-metadata destinations, IPv4 and IPv6 addresses, DNS resolution and redirects. These checks cover only the paths that invoke them, not every request or direct browser connection.

## 7. Privacy design

1. **Pseudonymisation**: email-derived and browser-generated identifiers may remain linkable personal data; email and avatar information also persist in browser `auth` storage;
2. **Personalisation toggle**: personalisation and Auto DJ currently default to on, not valid affirmative consent. Turning personalisation off does not stop separate public search-term reuse or necessarily every radar path; optional processing without a valid basis must be suspended;
3. **Reset and clearing**: reset deletes some current-identity events and feedback, not necessarily old anonymous identifiers, radar data, search aggregates, external providers or backups; errors may be hidden. Local clearing is separate from complete remote deletion;
4. **Minimised logging**: application access logs minimise fields, but errors, host systems, proxies and providers may still process request data; raw IP rate-limit keys can enter KV and client addresses can be forwarded to the engine.

The full privacy commitments are in the [Privacy Policy](/en/privacy-policy/); technical measures in [Data Processing & Security](/en/data-security/).

## 8. Fit

A good fit: personal listeners who sign in with their own Epomail account and care about recommendation-profile transparency and erasability; heavy listeners who need multi-source search and word-level lyrics; self-hosters with basic Linux and Docker skills who accept operator responsibilities.

A poor fit: scenarios seeking commercial music-catalogue licensing guarantees. The service grants no catalogue licence or content sublicences; proxying, caching and browser-local storage may occur, so it must not be described as never storing or transmitting music. It is also unsuitable for teams expecting an SLA or commercial support, or users who cannot accept "trials labelled transparently, cross-source completion on a best-effort basis".

## 9. Content and copyright boundary

Sonic is a search, aggregation and playback tool, not a music-catalogue licence. Imported or downloaded local audio file contents are stored in the browser, while embedded cover data URLs may be sent with favorite events into a remote shared-track catalogue; proxying, caching and related metadata requests may also occur. Rights in recordings, lyrics, covers and artist images remain with their owners. An available upstream interface or a deployer's membership credential such as `NETEASE_COOKIE` does not by itself authorise public access, redistribution or extension of that membership's rights.

When using the service you must observe the [Acceptable Use Policy](/en/acceptable-use/); deployers are responsible for confirming that their use complies with local law, upstream terms of service and content licensing requirements.

## 10. Deployment

| Form | Composition | Notes |
| --- | --- | --- |
| Cloudflare Pages edge gateway | Front-end SPA + Pages Functions | Published with `wrangler pages deploy` after build; requires `SONIC_SECRET`, `SONIC_ENGINE_SECRET`, `SONIC_LOCAL_ENGINE_URL` |
| Linux local protocol engine | sonic-engine + ncm-api + SQLite | Deployed with `docker compose up -d --build`; `.env` permissions 600; connected via Cloudflare Tunnel |

The two forms together make the complete service; an edge gateway without a data plane automatically runs in degraded mode. The full environment-variable list is in the upstream repository's `.env.example` and `docs/OPERATIONS.md`.

## 11. Quality assurance

The project grounds its quality in auditability and automated verification:

1. **Security audit and remediation**: the upstream repository carries security audit reports (`SECURITY_AUDIT_REPORT.md`, `SECURITY_FIX_SUMMARY.md`) and an item-by-item remediation record (`docs/AUDIT_REMEDIATION.md`), covering API signing, the OAuth flow, SSRF defences and front-end XSS among other areas;
2. **Automated test gates**: the test suite covers gateway behavior, authentication compatibility, SSRF cases, the local engine and degradation, recommendations and search, front-end XSS, configuration parity (config parity) and the release P0/P1 gate, executed with each release;
3. **Documentation consistency checks**: this site uses automated scripts to verify three things — zero broken in-page anchors and image references, 1:1 structural symmetry across language versions, and GDPR article citations consistent with the verified whitelist;
4. **Fact-verification process**: check the identified source revision against actual configuration and data flows. Source review is not proof of deployed fixes, supplier contracts or compliance, and cannot excuse inaccurate notices; correct contradictions and notify affected users.

## 12. FAQ

**Is the service paid? Are there ads?**
It is an individually maintained, free nonprofit test project with no advertising or in-app purchases. Nonprofit status does not remove data protection or consumer obligations.

**Can I use it without signing in?**
Yes. Core search, playback, lyrics and charts are available without sign-in, but signed-out use is not anonymous. Sign-in does not guarantee cross-device cloud sync or prove age or consent to profiling.

**Where does my data live?**
Favorites, playlists and preferences are primarily in browser storage, with email and avatar data in `auth`; local audio file contents and embedded artwork are stored in IndexedDB, but embedded cover data URLs may also be sent with favorite events into a remote shared-track catalogue used by site-wide search or public suggestions. Metadata, feedback and recommendation context may be transmitted. Playback history locally retains up to 100 tracks and search history up to 20 entries; remote data also includes radar profiles and search statistics. Personalisation off does not switch off local histories, and 90 days is a partial event-cleanup setting, not universal automatic deletion. See the [Privacy Policy](/en/privacy-policy/), sections 4 and 6.

**How do I erase my behavioral profile?**
Settings → Privacy & local data → "reset recommendation profile and dislikes", or `DELETE /api/sonic/events`, requests a partial current-identity reset. It is not complete remote deletion, and failures may be hidden. Local clearing does not prove remote erasure; contact `privacy@epocanvas.com` for broader requests. The interface location is in the [Interface & Features Guide](/en/interface/), section 9.

**Do recommendations track me?**
Recommendations use pseudonymous behavioural profiling, not anonymous data. Personalisation and Auto DJ default to on, which is not valid consent. Turning personalisation off does not stop separate search-term counting and possible public suggestions. Incognito mode does not stop network requests or events.

**Why are some tracks only 30 seconds?**
That is the upstream platform's trial truncation. The player labels trials and, when cross-source completion is enabled, attempts to match an available full track and labels its source. Technical availability does not grant content rights.

**Is the quality badge trustworthy?**
The badge is intended to reflect the available stream tier; actual quality depends on upstream resources. See the [Terms of Service](/en/terms-of-service/), section 4.

**What are the responsibilities of self-hosting?**
Responsibility follows your actual role in determining processing and applicable law. Before public processing, establish identity notices, lawful bases, verified retention and deletion, security and any necessary transfer safeguards. Purely personal testing and public service are assessed separately; neither GDPR applicability nor server country can be inferred from deployment alone. See [Data Processing & Security](/en/data-security/).

**What languages does the service support?**
The player ships with Simplified Chinese, English and Japanese; this documentation site is available in 10 languages.

## 13. Reading guide

| Document | Content |
| --- | --- |
| [Overview](/en/overview/) | Platform identity, data processing roles, document map and order of precedence |
| [Privacy Policy](/en/privacy-policy/) | Notice of data collection, legal bases, retention periods, your rights |
| [Terms of Service](/en/terms-of-service/) | Contractual conditions of use, limitation of liability, governing law |
| [Acceptable Use Policy](/en/acceptable-use/) | Behavioral boundaries, prohibited conduct, enforcement ladder and appeals |
| [Data Processing & Security](/en/data-security/) | Data lifecycle, processing matrix, security measures, incident response |
| [Third Parties & Transfers](/en/sub-processors/) | Recipients, data involved, international transfer safeguards |
| [Key Terms](/en/key-terms/) | Legal terms (GDPR vocabulary) and technical terms |

Reading routes: start here for the product and deployment; start at the [Overview](/en/overview/) for privacy and terms commitments; consult [Key Terms](/en/key-terms/) for specific definitions.
