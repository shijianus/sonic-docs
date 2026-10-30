---
title: Project Overview
description: The epocanvas sonic project — product identity, two-plane architecture, core capabilities, compliance boundary, and reading guide.
---

**Effective date: 30 October 2026｜Version: 1.0**

This page introduces the epocanvas sonic project (hereinafter "Sonic" or "the project"): its product identity, system architecture, core capabilities and compliance boundary, together with a reading guide for this site. Whether you intend to use a hosted instance, deploy your own, or review our privacy and terms commitments, start here. The legal commitments are set out in the [Privacy Policy](/en/privacy-policy/) and the [Terms of Service](/en/terms-of-service/).

![Sonic two-plane architecture: users connect to the Cloudflare edge control plane (routing, rate limiting, caching, circuit breaking); the Linux data plane performs protocol parsing, recommendation computation and SQLite storage; audio streams are proxied by the edge from official CDNs by default](/images/sonic/project-architecture.svg)

*Figure: the control plane and data plane of Sonic. The control plane runs on Cloudflare Pages at the edge; the data plane runs on the operator's own Linux node, connected through an encrypted tunnel with mandatory service-key verification. Audio streams are proxied from official CDNs by default (Range 206), with an optional 302 redirect mode.*

## 1. Product identity

Sonic is an independently developed multi-source music streaming platform and aggregation gateway, built on a two-plane architecture of a "Cloudflare edge control plane + Linux local protocol engine data plane". The project is open-source software; the source code is publicly available and anyone may deploy it.

| Item | Description |
| --- | --- |
| Hosted instances | `sonic.epocanvas.tech` (primary) and `sonic.epocanvas.com` (backup mirror), operated by the operations team |
| Self-hosted instances | Private instances deployed by any individual or organization from the open-source code; the deployer is the operator and data controller of that instance |
| Source license | Governed by the `LICENSE` file at the repository root (MIT License); the project is positioned as a non-commercial open-source project; trademarks and brand marks are not licensed with the source code |
| Sign-in | Epomail OAuth 2.0 (PKCE); the project maintains no separate registration system |

## 2. System architecture

The control plane (Cloudflare Pages Functions) handles routing, tiered rate limiting (240 rpm anonymous, 600 rpm authenticated), multi-tier caching and three-state circuit breaking (CLOSED／OPEN／HALF_OPEN). The data plane (a Docker Compose stack on a Linux node) runs the sonic-engine main container, a loopback-only ncm-api sidecar and SQLite 3 (WAL mode) persistence. The data plane connects through a Cloudflare Tunnel encrypted channel, and every request must pass service-key verification (X-Sonic-Engine-Key).

Source resolution relies primarily on local native TypeScript protocol modules (the official open interfaces of NetEase, QQ, Kugou and Kuwo); the lyrics chain parses YRC／QRC／KRC word-level formats natively and falls back to AMLL TTML and LRCLIB. Third-party free aggregation upstreams (GDStudio, Lyriva) are strictly disabled by default. Audio streams are proxied from official CDNs by default with HTTP Range support; the operator may enable the 302 redirect mode for direct client pickup.

## 3. Core capabilities

| Capability | Description |
| --- | --- |
| Multi-source aggregated search | Simplified/traditional normalization, pinyin and initials lookup, alias-symmetric matching, spelling tolerance; parallel multi-source retrieval with normalized deduplication |
| Word-level dynamic lyrics | Native parsing of NetEase YRC, QQ QRC and Kugou KRC; AMLL TTML and LRCLIB as fallbacks; translations and romanization supported |
| Quality tiers and trial transparency | Strict distinction between complete tracks and 30-second trial clips, never presenting a trial as a full track; cross-source completion of trials can be triggered automatically (configurable) |
| Smart recommendations and Auto DJ | A local recommendation engine based on playback, completion, skip, favorite and dislike signals; signal weights and noise-filtering rules are public in the source code |
| One-click profile erasure | `DELETE /api/sonic/events` immediately destroys all behavioral features and records held about you in the recommendation engine |
| Zero-trust security | HMAC-SHA256 versioned signed API keys, PKCE OAuth, full-chain SSRF interception, keys passed only in request headers |

## 4. Content and copyright boundary

Sonic is a search, aggregation and playback tool; it stores and hosts no music files. The rights in recordings, lyrics, covers and artist images belong to their respective owners; the project grants no sublicense to any music content. The project integrates no paywall-circumvention components; legitimately licensed member catalogues are mounted by deployers with their own authorization credentials, and public catalogues follow the official open protocols.

When using the service you must observe the [Acceptable Use Policy](/en/acceptable-use/); deployers are responsible for confirming that their use complies with local law, upstream terms of service and content licensing requirements.

## 5. Privacy and data protection stance

The project applies the EU General Data Protection Regulation (GDPR) as the minimum data protection standard for every user, wherever they live. The hosted instance collects no e-mail addresses, phone numbers or payment data; the scope of behavioral event collection, retention periods and rights enforcement are set out in the [Privacy Policy](/en/privacy-policy/), the technical measures in [Data Processing & Security](/en/data-security/), and the third-party sharing list in [Third Parties & Transfers](/en/sub-processors/).

## 6. Reading guide

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
