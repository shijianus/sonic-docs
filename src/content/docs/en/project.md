---
title: Project Overview
description: The epocanvas sonic project — product identity, core capabilities, architecture, recommendation engine, security and privacy design, fit, deployment, and reading guide.
---

**Effective date: 1 November 2026｜Version: 1.4**

This page introduces the epocanvas sonic project (hereinafter "Sonic" or "the project"): its product identity, core capabilities, system architecture, security and privacy design, fit and deployment, together with a reading guide for this site. Whether you intend to use a hosted instance, deploy your own, or review our privacy and terms commitments, start here. The legal commitments are set out in the [Privacy Policy](/en/privacy-policy/) and the [Terms of Service](/en/terms-of-service/).

![Sonic two-plane architecture: users connect to the Cloudflare edge control plane (routing, rate limiting, caching, circuit breaking); the Linux data plane performs protocol parsing, recommendation computation and SQLite storage; audio streams are proxied by the edge from official CDNs by default](/images/sonic/project-architecture.svg)

*Figure: the control plane and data plane of Sonic. The control plane runs on Cloudflare Pages at the edge; the data plane runs on the operator's own Linux node, connected through an encrypted tunnel with mandatory service-key verification. Audio streams are proxied from official CDNs by default (Range 206), with an optional 302 redirect mode.*

## 1. Product identity

Sonic is an independently developed multi-source music streaming platform and aggregation gateway, built on a two-plane architecture of a "Cloudflare edge control plane + Linux local protocol engine data plane", designed for high-quality streaming, millisecond word-level lyrics and user-controllable recommendations. The project is open-source software; the source code is publicly available and anyone may deploy it.

| Item | Description |
| --- | --- |
| Hosted instances | `sonic.epocanvas.tech` (primary) and `sonic.epocanvas.com` (backup mirror), operated by the operations team |
| Self-hosted instances | Private instances deployed by any individual or organization from the open-source code; the deployer is the operator and data controller of that instance |
| Source license | Governed by the `LICENSE` file at the repository root (MIT License); the project is positioned as a non-commercial open-source project, with a historical CC BY-NC-SA 4.0 intent stated in earlier READMEs — the `LICENSE` file governs pending the maintainer's decision; trademarks and brand marks are not licensed with the source code |
| Sign-in | Epomail OAuth 2.0 (PKCE); the project maintains no separate registration system |
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
| Behavioral event control | Playback, completion, skip, favorite and dislike signals can be switched off at any time; "one-click profile erasure" immediately destroys all behavioral records server-side |
| Zero-trust security | HMAC-SHA256 versioned signed API keys, PKCE OAuth, full-chain SSRF interception, keys passed only in request headers |
| Failover | When the data plane goes offline, the edge switches to degraded mode in 0ms with an explicit "degraded mode" notice, keeping already-loaded tracks playing |

## 3. Architecture overview

### 3.1 Control plane (Cloudflare edge)

The control plane runs on Cloudflare Pages and Pages Functions, performing:

1. **Routing and authentication**: the single entry for API requests, auth checks and signed-key verification;
2. **Tiered rate limiting**: 240 requests per minute anonymous, 600 per minute authenticated (defaults, configurable), plus a dedicated 30-per-minute-per-IP limit on authentication endpoints;
3. **Multi-tier caching**: edge cache keyed `sonic:*` with an 8-minute fresh window and a stale fallback state after expiry;
4. **Three-state circuit breaker**: 3 consecutive failures or a call exceeding the 4.5-second budget trips OPEN; further requests switch to the edge fallback (public QQ／Kugou search interfaces and AMLL／LRCLIB) in 0ms; after a 30-second cooldown it enters HALF_OPEN probing and closes on success. Degraded responses carry `X-Sonic-Degraded: 1` and the player shows a degradation capsule.

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

Audio streams are fetched from official CDNs through the same-origin byte-range edge proxy by default, supporting HTTP `Range` and `206 Partial Content`: upstream CDNs see only the proxy's address and never the client IP. The `?mode=redirect` 302 direct mode is provided only for API users who explicitly request it (the web player never uses it); in direct mode your browser connects straight to the official CDN.

## 4. Sources and lyrics chain

| Source | Share | State |
| --- | --- | --- |
| Local native parsing (NetEase／QQ／Kugou／Kuwo official interfaces + ncm-api) | Main chain (over 90%) | On by default |
| AMLL TTML word-level lyrics + LRCLIB synced lyrics | Lyrics fallback (about 10%) | On by default |
| GDStudio／Lyriva third-party aggregation | Emergency backup | Strictly off by default |
| ListenBrainz／MusicBrainz similar-artist enrichment | Optional enhancement | Off by default |

Trial detection probes the audio entity's length and metadata to identify official 30-second truncation; the result is labelled transparently in the front end and may trigger cross-platform full-track matching (against free full tracks on QQ／Kugou／Kuwo), switching smoothly and labelling the substitute source on success. The project integrates no paywall-circumvention components.

## 5. Recommendation engine

The recommendation engine runs entirely on the data plane; signal weights are public in the source code:

| Signal | Weight | Meaning |
| --- | --- | --- |
| favorite (add to favorites) | +4.0 | Very strong positive |
| replay (replay) | +3.5 | Strong positive |
| play_complete (valid completion) | +2.5 | Standard positive |
| play_progress (listening progress) | +0.2 ～ +1.8 | Scored by listening ratio |
| skip (fast skip) | -0.8 | Skipping past the halfway point counts +0.25 |
| dislike (explicit reject) | -5.0 | Hard-filtered and blocklisted |

Noise and false-signal purification: skips caused by network stalls (network_stall), decode failures (playback_error), trial truncation (trial_end), unavailable streams (stream_unavailable), buffer timeouts (buffer_timeout) or auto-switch failures (auto_switch_error) carry zero weight and are never stored.

The trending model combines valid plays (35%), distinct listeners (25%), completion (20%), favorite conversion (15%) and growth slope (5%), with exponential time decay (a 24-hour surging chart and a 7-day cumulative chart) and Bayesian／Wilson Score smoothing; similarity blends the artist-relation graph with audio-feature cosine and applies MMR re-ranking to balance precision and diversity. Session-level search intent is decoupled from the long-term profile: only high-value actions such as completions and favorites settle into the long-term profile.

## 6. Security design

1. **Authentication**: Epomail OAuth 2.0 authorization-code flow with `state` and PKCE (S256) against code interception and replay; OAuth transactional cookies are valid for 600 seconds;
2. **API keys**: the `sonic_live_v2.<header>.<payload>.<signature>` versioned format signed with HMAC-SHA256, payload carrying `sub`／`iat`／`exp`／`jti`／`kid`／`role`／`uid`; 30-day issue validity, 90-day validation cap; server-side constant-time comparison via Web Crypto; unsigned and legacy keys are always rejected (fail-closed); keys travel only in the `X-Sonic-Key` or `Authorization` header — the URL query channel has been removed entirely;
3. **Revocation**: signing out immediately revokes the current session and key identifier (jti); the jti revocation list, subject revocation list and global minimum issuance time are supported, with instant revocation when a KV binding is configured;
4. **Sessions**: the `HttpOnly; Secure; SameSite=Lax` `sonic_session` cookie, valid at most 30 days; keys are never written to URLs, localStorage or any script-readable store;
5. **SSRF defence**: outbound requests to loopback addresses, RFC 1918 private ranges, Docker internal bridges and cloud metadata addresses (such as `169.254.169.254`) are always denied, with IPv4 and IPv6 checks and re-validation of the target and DNS resolution on every redirect.

## 7. Privacy design

1. **Pseudonymisation by default**: behavioral events are keyed by one-way hash identifiers from the moment of collection; e-mail addresses are never persisted;
2. **Personalisation toggle**: you can switch personalisation off in the player settings at any time; when off, events are not stored, and public mode drops them server-side;
3. **One-click erasure**: "clear recommendation profile" in settings immediately destroys all behavioral events server-side; "clear all local data" immediately clears browser local storage and IndexedDB;
4. **Minimised logging**: data-plane access logs contain only path, method, status code and duration.

The full privacy commitments are in the [Privacy Policy](/en/privacy-policy/); technical measures in [Data Processing & Security](/en/data-security/).

## 8. Fit

A good fit: personal listeners who sign in with their own Epomail account and care about recommendation-profile transparency and erasability; heavy listeners who need multi-source search and word-level lyrics; self-hosters with basic Linux and Docker skills who accept operator responsibilities.

A poor fit: scenarios seeking commercial music licensing guarantees — the project stores and hosts no music and grants no content sublicenses; teams expecting an SLA or commercial support; users who cannot accept "trials labelled transparently, cross-source completion on a best-effort basis".

## 9. Content and copyright boundary

Sonic is a search, aggregation and playback tool; it stores and hosts no music files. The rights in recordings, lyrics, covers and artist images belong to their respective owners; the project grants no sublicense to any music content. Licensed member catalogues are mounted by deployers with their own credentials (such as `NETEASE_COOKIE`, which belongs to the deployer's account, not end users), and public catalogues follow the official open protocols.

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
4. **Fact-verification process**: every data-processing fact on this site is re-checked against the source code at each release (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts` and others); where the code and the documents disagree, the code prevails and the documents are corrected immediately.

## 12. FAQ

**Is the service paid? Are there ads?**
Free, with no advertising and no in-app purchases; the hosting costs of the hosted instances are borne by the operations team. The service collects no data for advertising purposes.

**Can I use it without signing in?**
Yes. Search, playback, lyrics, charts and other core functions are available anonymously (with stricter rate limits); signing in unlocks favorites sync, personalised recommendations and Auto DJ.

**Where does my data live?**
In three places: favorites, playlists and player preferences live in your browser's local storage; downloads and local music live in your browser's IndexedDB; the server holds only pseudonymised behavioral events (auto-destroyed after 90 days). E-mail addresses are never persisted. See the [Privacy Policy](/en/privacy-policy/), section 4.

**How do I erase my behavioral profile?**
Settings → Privacy & local data → "reset recommendation profile and dislikes", or call `DELETE /api/sonic/events` directly — effective immediately; "clear all local data" clears the browser and the server-side data together. The interface location is in the [Interface & Features Guide](/en/interface/), section 9.

**Do recommendations track me?**
Recommendations serve the playback ordering only — no cross-site tracking, no advertising profiles; personalisation can be switched off at any time, and when off the service runs in pure public mode and records no events.

**Why are some tracks only 30 seconds?**
That is the official platform's trial truncation, labelled transparently as a trial and never presented as a full track; with cross-source completion enabled, the player automatically attempts to match a free full track and labels the source.

**Is the quality badge trustworthy?**
Yes. The badge reflects the actual tier of the current audio stream; when upstream tiers change it follows in real time, without overstatement (see the [Terms of Service](/en/terms-of-service/), section 4, item 3).

**What are the responsibilities of self-hosting?**
From the moment of deployment you are the data controller of that instance: you must notify your users, keep processing records, carry out an impact assessment where necessary and implement security measures. The starting point is [Data Processing & Security](/en/data-security/), section 6.

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
