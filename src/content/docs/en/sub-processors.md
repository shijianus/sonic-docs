---
title: Third Parties & Transfers
description: The Sonic list of third-party sharing and international transfers — processors, identity provider, upstream content sources, optional chains, lawful requests and transfer safeguards.
---

**Effective date: 1 November 2026｜Version: 1.3**

This page lists every situation in which the Sonic service (hereinafter "the service") shares personal data with third parties, the data involved and the safeguard mechanisms. It expands section 7 of the [Privacy Policy](/en/privacy-policy/). The sharing principle is minimum necessity: personal data is never sold, never shared for advertising, and never shared beyond what the service functions require.

![The Sonic third-party sharing map: six channels — processors under contract, the identity provider, upstream content sources, optional providers, lawful requests and international transfers — centred on the operator, each labelled with its default switch state](/images/sonic/sharing-map.svg)

*Figure: the six sharing channels. A is always-on entrusted processing; B is the identity verification required for sign-in; C is query-driven content retrieval carrying no user identity; D is off by default; E is the lawful-requests exception; F is the international transfer safeguard regime.*

## 1. Processors (always on)

| Recipient | Service | Data involved | Safeguards |
| --- | --- | --- | --- |
| Cloudflare Pages and Functions | Front-end hosting, edge API gateway, rate-limit enforcement | Request metadata, transient rate-limit records | Article 28 processor terms of the GDPR |
| Cloudflare Tunnel | Encrypted channel between control plane and data plane | Encrypted traffic metadata | Same as above |
| Cloudflare KV and rate limiter | Rate-limit counters (expiring after 120 seconds), instant key-revocation records (when enabled) | IP rate-limit keys, `jti` revocation records | Same as above |

Cloudflare as a whole holds SOC 2 Type II and ISO/IEC 27001 certifications and covers cross-border transfers with the EU Standard Contractual Clauses. Network-layer request metadata that Cloudflare handles under its own policies is described in its privacy policy.

## 2. Identity provider (required for sign-in)

| Recipient | Service | Data involved | Notes |
| --- | --- | --- | --- |
| Epomail (`mail.epocanvas.com`) | OAuth 2.0 (PKCE) sign-in and identity verification: authorization, token exchange, userinfo query (carrying the access token) | Returned at sign-in: user identifier, e-mail address (verified), nickname, avatar link, account role | The e-mail address is never written into the service's database and is used only to derive hashes within sessions; the processing between you and Epomail is governed by its privacy policy |

## 3. Upstream content sources (query-driven, no user identity)

The following recipients receive requests containing only song query parameters with a fixed User-Agent and the corresponding official Referer — **never your account data, cookies or IP address**:

| Recipient | Service | Representative domains | Default state |
| --- | --- | --- | --- |
| NetEase Cloud Music | Search, playback addresses, word-level lyrics (YRC), covers | `music.163.com`, `interface3.music.163.com`; plus the data-plane internal ncm-api helper | On |
| QQ Music | Search, playback addresses, word-level lyrics (QRC), covers | `c.y.qq.com`, `u.y.qq.com`, `y.gtimg.cn`, `ws.stream.qqmusic.qq.com` | On |
| Kugou Music | Search, playback addresses, word-level lyrics (KRC) | `m.kugou.com`, `mobilecdn.kugou.com`, `songsearch.kugou.com`, `lyrics.kugou.com` | On |
| Kuwo Music | Search, playback addresses, covers | `www.kuwo.cn`, `m.kuwo.cn`, `search.kuwo.cn` | On |
| AMLL | Word-level lyrics (TTML) fallback | `api.amll.dev` | On |
| LRCLIB | Synced-lyrics fallback | `lrclib.net` | On |
| Official content CDNs | Audio streams and covers (proxied by the service's edge by default) | `music.126.net`, `ws.stream.qqmusic.qq.com` and others | On |

Notes:

1. The egress IP marked on upstream requests is the deployer-configured placeholder address (a documentation address under RFC 5737 by default), never the IP of any user;
2. Audio streams are fetched through the edge proxy by default, so upstream CDNs see only the proxy's address; when you actively invoke the `?mode=redirect` direct mode, your browser connects straight to that CDN and your IP becomes visible to it (an inherent property of 302 redirects); the web player never uses this mode;
3. Deployers may mount their own licensed catalogue with their own membership credentials (`NETEASE_COOKIE`／`QQ_COOKIE`／`KUGOU_COOKIE`); those credentials are the deployer's account data, unrelated to end users, and the code embeds no real account cookies.

## 4. Optional chains (off by default)

The following chains are strictly disabled by default and occur only when the deployer explicitly enables them:

| Recipient | Service | Data involved | Switch and default |
| --- | --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Third-party aggregated search and a cross-source completion alternative | Song identifiers, type and source parameters only | `SONIC_ENABLE_GDSTUDIO`, default 0 |
| Lyriva (`api.lyriva.xyz`) | Lyrics backup source | Song identifier parameters only | `SONIC_ENABLE_LYRIVA`, default 0 |
| ListenBrainz / MusicBrainz (`labs.api.listenbrainz.org` and others) | Similar-artist enrichment | Artist／recording identifiers only | `SONIC_ENABLE_LISTENBRAINZ`, default 0 |
| Cross-source completion | Cross-platform full-track matching for trial clips (free full tracks on QQ／Kugou／Kuwo) | Track metadata only (duration, title, artist) | On by default; no identity data involved |
| Gorse (deployer-built recommendation engine) | External collaborative filtering | Pseudonymous hash identifier (`subject_key`) and behavioral feedback | `SONIC_GORSE_URL`, default empty |

## 5. Sharing under legal requirement

The operator provides personal data only where a request rests on a concrete legal basis: the legality and scope of the request are verified, nothing beyond its scope is volunteered, and the affected data subjects are notified in advance to the extent the law allows (unless the law forbids it). The service does not accept arbitrary access without a legal basis. Every legally compelled disclosure is documented.

## 6. International transfers

The control plane of the service runs on the Cloudflare global edge network and behavioral events are stored on the operator's data-plane node; your personal data may be processed at nodes outside the operator's country. The transfer safeguards are:

1. Under Articles 44 to 46 of the GDPR: relying on adequacy decisions of the European Commission (Article 45) or approved Standard Contractual Clauses (Article 46, Paragraph 2, point (c)) as the basis of the hosting and processor relationships;
2. Relying on Cloudflare's data protection certifications (SOC 2 Type II, ISO/IEC 27001) and its data processing addendum;
3. Requests to upstream content sources carry no personal data and do not constitute an international transfer of personal data (see section 3).

Self-hosted operators must assess the international transfers of their own deployment shape and ensure compliance with the law at their location (Chapter V of the GDPR or its local equivalent).

## 7. Maintaining this list

1. Before adding a recipient, the operator records it on this page and updates the effective date and version; material changes are announced on the site in advance;
2. Where this list and the source-code configuration disagree, the source code prevails and this page is corrected immediately;
3. Self-hosted operators must maintain their own third-party list according to their actual configuration: chains they have not enabled should be removed from their notice, avoiding over-disclosure as much as false disclosure.
