---
title: Third Parties & Transfers
description: The Sonic list of third-party sharing and international transfers — processors, identity provider, upstream content sources, optional chains and transfer safeguards.
---

**Effective date: 30 October 2026｜Version: 1.0**

This page lists every situation in which the Sonic service (hereinafter "the service") shares personal data with third parties, the data involved and the safeguard mechanisms. It expands section 7 of the [Privacy Policy](/en/privacy-policy/). The sharing principle is minimum necessity: personal data is never sold, never shared for advertising, and never shared beyond what the service functions require.

![The Sonic third-party sharing map: six channels — processors under contract, the identity provider, upstream content sources, optional providers, lawful requests and international transfers — centred on the operator, each labelled with its default switch state](/images/sonic/sharing-map.svg)

*Figure: the six sharing channels. A is always-on entrusted processing; B is the identity verification required for sign-in; C is query-driven content retrieval carrying no user identity; D is off by default; E is the lawful-requests exception; F is the international transfer safeguard regime.*

## 1. Processors (always on)

| Recipient | Service | Data involved | Safeguards |
| --- | --- | --- | --- |
| Cloudflare (Pages, Functions, Tunnel, KV, rate limiter) | Edge hosting, routing, caching, encrypted tunnel, rate-limiting infrastructure | Request metadata, transient rate-limit records (IP keys expiring after 120 seconds), processing of the session cookie | Article 28 processor terms of the GDPR; SOC 2 Type II, ISO/IEC 27001; EU Standard Contractual Clauses |

Cloudflare processes data as a processor only on the operator's instructions. Network-layer request metadata that Cloudflare handles under its own policies is described in its privacy policy.

## 2. Identity provider (required for sign-in)

| Recipient | Service | Data involved | Notes |
| --- | --- | --- | --- |
| Epomail (`mail.epocanvas.com`) | OAuth 2.0 (PKCE) sign-in and identity verification | Returned at sign-in: user identifier, e-mail address (verified), nickname, avatar link, account role | The e-mail address is never written into the service's database and is used only to derive hashes within sessions; the processing between you and Epomail is governed by its privacy policy |

## 3. Upstream content sources (query-driven, no user identity)

The following recipients receive requests containing only song query parameters with a fixed User-Agent and the corresponding official Referer — **never your account data, cookies or IP address**:

| Recipient | Service | Default state |
| --- | --- | --- |
| NetEase Cloud Music (`music.163.com` and others, plus the data-plane internal sidecar) | Search, playback addresses, word-level lyrics (YRC), covers | On |
| QQ Music (`c.y.qq.com`, `u.y.qq.com`, `y.gtimg.cn` and others) | Search, playback addresses, word-level lyrics (QRC), covers | On |
| Kugou Music (`mobilecdn.kugou.com`, `lyrics.kugou.com` and others) | Search, playback addresses, word-level lyrics (KRC) | On |
| Kuwo Music (`www.kuwo.cn`, `search.kuwo.cn` and others) | Search, playback addresses, covers | On |
| AMLL (`api.amll.dev`) | Word-level lyrics (TTML) fallback | On |
| LRCLIB (`lrclib.net`) | Synced-lyrics fallback | On |
| Official content CDNs (`music.126.net`, `ws.stream.qqmusic.qq.com` and others) | Audio streams and covers (proxied by the service's edge by default) | On |

Notes:

1. The egress IP marked on upstream requests is the deployer-configured placeholder address (a documentation address under RFC 5737 by default), never the IP of any user;
2. Audio streams are fetched through the edge proxy by default, so upstream CDNs see only the proxy's address; when you actively invoke the `?mode=redirect` direct mode, your browser connects straight to that CDN and your IP becomes visible to it (an inherent property of 302 redirects);
3. Deployers may mount their own licensed catalogue with their own membership credentials (such as `NETEASE_COOKIE`); those credentials are the deployer's account data, unrelated to end users.

## 4. Optional chains (off by default)

The following chains are strictly disabled by default and occur only when the deployer explicitly enables them:

| Recipient | Service | Data involved | Switch |
| --- | --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Third-party aggregated search | Song identifiers and type parameters only | `SONIC_ENABLE_GDSTUDIO`, default 0 |
| Lyriva (`api.lyriva.xyz`) | Lyrics backup source | Song identifier parameters only | `SONIC_ENABLE_LYRIVA`, default 0 |
| ListenBrainz / MusicBrainz | Similar-artist enrichment | Artist／recording identifiers only | `SONIC_ENABLE_LISTENBRAINZ`, default 0 |
| Cross-source completion | Full-track matching for trial clips | Track metadata only | Cross-source matching switch, default on (no identity data involved) |
| Gorse (self-built recommendation engine) | External collaborative filtering | Pseudonymous hash identifier (`subject_key`) and behavioral feedback | `SONIC_GORSE_URL`, default empty |

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
