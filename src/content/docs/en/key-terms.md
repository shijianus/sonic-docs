---
title: Key Terms
description: Definitions of the legal terms (GDPR vocabulary) and technical terms used across the Sonic legal documents, applied consistently site-wide.
---

**Effective date: 1 November 2026｜Version: 1.4**

This page defines the legal and technical terms used in the legal documents of this site. Every term carries the same meaning across all documents; defined terms are construed by their definitions, undefined ones by their ordinary meaning. Legal terms are based on the definitions of the EU General Data Protection Regulation (GDPR).

![The Sonic key terms map: the legal terms family (GDPR vocabulary) and the technical terms family, used consistently across the site, interpreted under the authoritative Simplified Chinese version](/images/sonic/key-terms-map.svg)

*Figure: the two families of terms on this site. The legal family anchors on Article 4 of the GDPR; the technical family follows the source code implementation and is re-verified against it at every release.*

## 1. Legal terms

| Term | Definition |
| --- | --- |
| Personal data | Any information relating to an identified or identifiable natural person (Article 4, Paragraph 1 of the GDPR); in Sonic, for example, the sign-in identifier and behavioral event records |
| Processing | Any operation performed on personal data, including collection, recording, storage, use, transmission and erasure (Article 4, Paragraph 2) |
| Restriction of processing | The temporary suspension of processing with the data retained, in the specific circumstances (Article 4, Paragraph 3; Article 18) |
| Profiling | Automated processing to evaluate personal characteristics for decisions or analysis (Article 4, Paragraph 4); in this service, performed only to the extent necessary for recommendations, and erasable in one click |
| Pseudonymisation | Processing such that data can no longer be attributed to a specific data subject without additional information (Article 4, Paragraph 5); implemented in Sonic with salted truncated SHA-256 hashes |
| Controller | The natural or legal person that determines the purposes and means of processing (Article 4, Paragraph 7); the operations team for hosted instances, the deployer for self-hosted ones |
| Processor | The natural or legal person that processes personal data on behalf of the controller (Article 4, Paragraph 8), for example Cloudflare |
| Recipient | The natural or legal person to whom personal data is disclosed (Article 4, Paragraph 9), whether or not a third party |
| Third party | Any body other than the data subject, controller, processor and persons authorised to process (Article 4, Paragraph 10) |
| Consent | A freely given, specific, informed and unambiguous indication of the data subject's wishes (Article 4, Paragraph 11; Article 7); it may be withdrawn at any time by a means no less convenient than the one by which it was given |
| Personal data breach | A breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data (Article 4, Paragraph 12) |
| Supervisory authority | The public authority that supervises compliance with data protection duties (Article 4, Paragraph 19); users in the EU may lodge a complaint with the authority of their location (Article 77) |
| International transfer | A transfer of personal data to a third country or international organisation outside the EU and the EEA (Chapter V of the GDPR) |
| Special categories of data | Personal data revealing racial or ethnic origin, political opinions, health, sex life and the like (Article 9); this service collects none |
| Data subject | The identified or identifiable natural person to whom personal data relates (Article 4, Paragraph 25); that is, you |

## 2. Technical terms

| Term | Definition |
| --- | --- |
| Control plane | The edge gateway running on Cloudflare Pages Functions, handling routing, rate limiting, caching and circuit breaking |
| Data plane | The Docker Compose stack running on the operator's own Linux node, handling protocol parsing, recommendation computation and storage |
| sonic-engine | The main container on the data plane (Node.js 22), enforcing the X-Sonic-Engine-Key service key and bound to loopback on the host |
| ncm-api sidecar | The loopback-only NetEase protocol helper container (`ncm-api:3000`), reachable only inside the compose network |
| OAuth 2.0 + PKCE | The authorization-code flow with Proof Key for Code Exchange (S256); Epomail is this service's identity provider |
| API key | A key in the format `sonic_live_v2.<header>.<payload>.<signature>` signed with HMAC-SHA256; the payload carries `sub`／`iat`／`exp`／`jti`／`kid`／`role`／`uid`; passed only in request headers |
| jti | The key identifier carried in the API key payload, used for revocation lists and immediate invalidation on sign-out |
| fail-closed | The policy of refusing service when verification fails; Sonic applies it to unsigned keys, legacy keys and production storage failures |
| SSRF defence | Outbound blocking of loopback addresses, RFC 1918 private ranges, Docker bridges and cloud metadata addresses, with dual IPv4／IPv6 checks and re-validation on every redirect |
| Domain allowlist | The audio, cover and forwarding proxies allow only HTTPS targets on the controlled music CDN domain list (`SONIC_ALLOWED_MUSIC_DOMAINS`) |
| SQLite WAL | The persistence store for behavioral events and entity weights on the data plane, in Write-Ahead Logging mode on the named volume `sonic-data` |
| Circuit breaker | A three-state machine (CLOSED／OPEN／HALF_OPEN); 3 consecutive failures or a 4.5-second budget overrun trips it, with a 30-second cooldown before probing |
| Degraded mode | The failover state in which the edge connects directly to public lyrics and search interfaces while the data plane is offline; responses carry `X-Sonic-Degraded: 1` and the interface shows a notice |
| Edge cache | The edge cache keyed `sonic:*` with an 8-minute fresh window and a stale fallback state after expiry |
| Range 206 | The HTTP partial-content mechanism; audio streams are served by the edge proxy with 206 Partial Content by default |
| Direct mode | The `?mode=redirect` 302 redirect, in which your browser connects straight to the official CDN; the web player never uses it |
| YRC／QRC／KRC | The word-level lyrics formats of NetEase, QQ and Kugou; parsed natively with their encryption and compression wrappers (XOR + Deflate) |
| TTML | The timed-text markup format of AMLL word-level lyrics |
| LRCLIB | The global open synced-lyrics library, used as the fallback when local lyrics are missing |
| Trial detection | Probing the audio entity's length and metadata to identify official 30-second trial truncation, always labelled transparently |
| Cross-source completion | The cross-platform full-track matching triggered for trial clips, on by default, with the substitute source labelled on success |
| Behavioral events | Recommendation signals such as play, completion, skip, favorite and dislike; at most 50 events／64 KB per batch; noise events (stalls, trial-truncation skips) are never stored |
| One-click profile erasure | `DELETE /api/sonic/events`, which immediately destroys all behavioral features and records about you in the recommendation engine |
| Recommendation profile summary | The profile overview returned by `GET /api/sonic/events`: total events, favorite and dislike counts, most-played artists, genre affinities, recent search terms, storage kind |
| X-Sonic-Context | The client-side context carried with recommendation requests (truncated favorites, recent artists, recent search terms), used in memory only and never persisted |
| Noise filtering | The server-side mechanism that zeroes the weight of 6 non-user skip reasons (network_stall／playback_error／trial_end／stream_unavailable／buffer_timeout／auto_switch_error) and never stores them |

## 3. Rule of interpretation

1. Legal terms are construed against the official GDPR text; technical terms against the source code implementation. Where the source code and this page disagree, the source code prevails and this page must be corrected and reported via the repository's Issues.
2. The Simplified Chinese version of this site's legal documents is the authoritative version; the term correspondences on this page govern the translations used in the English and Japanese versions.
