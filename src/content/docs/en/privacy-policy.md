---
title: Privacy Policy
description: The Sonic Privacy Policy — collection and use of data, legal bases, retention periods, your rights and international transfers, with the GDPR as the minimum standard for every user.
---

**Effective date: 30 October 2026｜Version: 1.0**

This policy explains how the Sonic service (hereinafter "the service") collects, processes and transfers your personal data, and the standards and commitments the operator observes to protect it. Read this policy before signing in to or using the service; if you do not agree with any part of it, do not use the service.

The technical statements in this policy follow the actual implementation of the service's open-source code. The Simplified Chinese version of this site's legal documents is the authoritative version; the English and Japanese versions are reference translations, and in case of doubt the authoritative version prevails. The service applies the EU General Data Protection Regulation (GDPR) as the minimum data protection standard for every user (see section 2).

![The five pillars of the Sonic privacy policy: lawfulness, purpose limitation, minimisation and retention, security, and your rights, resting on the GDPR-level baseline](/images/sonic/privacy-pillars.svg)

*Figure: the five axes of this policy. Lawfulness anchors on the legal bases of Article 6 of the GDPR; purpose limitation excludes advertising profiles; minimisation is implemented through pseudonymisation and one-click erasure; security measures are in section 10; rights are exercised under section 9; all five rest on the GDPR-level baseline.*

## 1. Scope

This policy applies to the personal data arising from your use of the service in any form, including:

1. Visiting the service's sites (`sonic.epocanvas.tech`, `sonic.epocanvas.com`, or the domain of a self-hosted instance);
2. Using the web player and third-party clients connecting through the open API.

This policy does not apply to third-party websites and services linked or embedded in the service; those third parties have their own privacy policies, for which they are responsible. An operator who self-hosts Sonic becomes the data controller of its users from the moment of deployment and must perform the notice duties required by the law applicable at its location; this policy may serve as the baseline text for its notice.

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
| 2. Purposes of collection | Account identification and sign-in; provision of playback and recommendation functions; abuse and fraud prevention; service security (see the matrix in section 5) |
| 3. Categories of personal data | Account identification (Epomail user identifier, e-mail address, nickname, avatar link); behavioral and preference data (play, completion, skip, favorite, dislike, search terms and similar events, linked by a pseudonymous identifier); technical data (transient use of IP for rate limiting, session cookie) — see section 4 |
| 4. Period, region, recipients and manner of use | Period: behavioral events are destroyed automatically 90 days after recording (configurable, minimum 7 days); account identification data exists only within sessions; region: the control plane runs on the Cloudflare global edge network and the data plane on the operator's own Linux node (section 7); recipients: the operator and its processors, and competent authorities under legal requirement (section 7); manner: automated pseudonymised storage and statistical computation, never human content review |
| 5. Your rights and how to exercise them | Access, rectification, erasure, restriction, portability, objection and complaint, as set out in section 9 |
| 6. Consequences of not providing | The core functions (search, playback, lyrics) are usable without signing in and without reporting behavioral events; sign-in and personalisation are both optional |

## 4. Personal data collected

### 4.1 Account identification data (via Epomail sign-in)

When you sign in with an Epomail account over OAuth 2.0 (PKCE), the service obtains from Epomail: your user identifier, e-mail address (which must be verified), nickname, avatar link and account role. The service maintains no separate registration system and collects no phone number, legal name or payment data.

The e-mail address is never written into any database of the service: it is used only (a) to derive pseudonymous identifiers and rate-limit bucket keys on the fly as SHA-256 hashes, and (b) as the `sub` claim of the API key issued to you personally. The derived hashes cannot be reversed into the original e-mail address.

### 4.2 Behavioral events

To provide the recommendation and Auto DJ functions, the service records behavioral events related to track playback; event types include search, search click, play start, play progress, play completion, skip, replay, favorite, unfavorite, dislike and undislike. Each event is linked to one of the following pseudonymous identifiers:

1. **Signed-in users**: a SHA-256 hash derived from the e-mail address (prefix `usr_`);
2. **Anonymous participants**: a hash (prefix `anon_`) of a random identifier generated in your browser and re-hashed server-side;
3. **Public mode**: with personalisation off, events are neither stored nor persisted — they are dropped.

Skip events caused by network stalls, decode failures or trial truncation carry zero weight and are never stored. In addition, recommendation requests carry a small amount of client-side context (a truncated set of favorites, recent artists and recent search terms), used in memory for that request only and never persisted.

### 4.3 Global aggregate statistics

The service also maintains global aggregate statistics unrelated to any user (popular search-term counts and track co-occurrence relations) for the trending lists and similar-track recommendations. These records contain no personal identifiers, are not linked to your identity, and are outside the scope of "one-click profile erasure" (since they belong to no user).

### 4.4 Local storage in your browser

The following data lives only in your browser; the operator's servers never receive a full copy:

| Storage location | Content |
| --- | --- |
| localStorage | Playlists and play history (`audio`); favorites and follows (`library`); theme, language and search history (`global`); interface preferences (`settings`); personalisation toggle and anonymous identifier (`recommend`); performance mode (`sonic-perf-mode`) |
| IndexedDB | Locally imported music files and downloaded tracks (`SonicMusicPlayerDB`) |

### 4.5 Technical data processed automatically

- **Rate limiting**: anonymous requests are rate-limited per IP bucket (240 per minute); the IP is used only transiently as a rate-limit key (not retained by the native edge limiter, or held in a KV record that auto-expires after 120 seconds, or in a 60-second in-memory window), never written to the database and never written to access logs.
- **Session**: a signed-in session issues an `HttpOnly; Secure; SameSite=Lax` cookie (valid at most 30 days) containing the signed API key; keys are never written to URLs, query parameters or localStorage. The OAuth handshake uses transactional cookies valid for 10 minutes.
- **Access logs**: data-plane logs contain only the request path, method, status code and duration — never query strings, IP addresses, User-Agent, cookies or request bodies.
- **Audio proxy**: audio streams are proxied through the service's edge by default, so upstream CDNs see only the proxy's address; if you actively invoke the `?mode=redirect` direct mode, your browser connects straight to the official CDN and your IP becomes visible to that CDN (an inherent property of 302 redirects).

### 4.6 What the service never collects

The service has no advertising trackers, no cross-site cookies, no third-party analytics scripts and no device fingerprinting; it collects no contacts, photo library, location or any device data unrelated to music playback; it never sells personal data or uses it for advertising.

## 5. Legal bases and purposes

The legal bases of each processing activity are as follows:

| Processing activity | Purpose | Legal basis |
| --- | --- | --- |
| Epomail sign-in, session maintenance, API key issuance | Account identification and service access | Necessity for the contract (Article 6, Paragraph 1, point (b) of the GDPR) |
| Behavioral events and recommendation profile (pseudonymised) | Recommendation and Auto DJ functions | Legitimate interests (Article 6, Paragraph 1, point (f)); you may switch off personalisation at any time (the objection right in section 9), which stops collection immediately |
| Global aggregate statistics | Trending lists and similar recommendations | Legitimate interests (Article 6, Paragraph 1, point (f)); not linked to individuals |
| Anonymous-identifier events (anonymous participants) | Recommendation functions | Your own choice; switching personalisation off terminates it |
| IP rate limiting, session security, abuse prevention | Service security and stability | Legitimate interests (Article 6, Paragraph 1, point (f)); where applicable also a legal obligation (Article 6, Paragraph 1, point (c)) |

Your personal data is used only for the purposes above and the scope closely related to them. The service never uses your data for automated decision-making within the meaning of Article 22 of the GDPR (decisions producing legal effects or similarly significantly affecting you); the impact of recommendations is limited to the playback sequence you see, and you can turn it off.

## 6. Retention periods and erasure

| Data category | Retention policy |
| --- | --- |
| Behavioral events | Destroyed automatically 90 days after recording (deployer-configurable, minimum 7 days); "one-click profile erasure" destroys them immediately |
| Account identification data (e-mail, nickname) | Never persisted; exists only within sessions |
| Session cookie | At most 30 days; invalidated immediately on sign-out |
| Rate-limit counters | Not retained by the native edge limiter; KV records auto-expire after 120 seconds; in-memory window 60 seconds |
| Global aggregate statistics | Contain no personal identifiers; handled under database maintenance policy |
| Browser local storage | Remains on your device until you clear it or use "clear all local data" |

## 7. Sharing with third parties and international transfers

The service shares personal data with third parties on a strict minimum-necessity principle; the complete list is in [Third Parties & Transfers](/en/sub-processors/), in summary:

1. **Processors**: Cloudflare (edge computing, hosting, encrypted tunnel, rate-limiting infrastructure);
2. **Identity provider**: Epomail (identifier, e-mail address, nickname, avatar link and role obtained at sign-in);
3. **Upstream content sources**: NetEase, QQ, Kugou, Kuwo, AMLL, LRCLIB and others — requests carry only song query parameters with a fixed User-Agent／Referer, never your identity or IP;
4. **Legal requirement**: provided only upon a request from a competent authority following legal procedure, with notice to you to the extent the law allows.

The control plane of the service runs on the Cloudflare global edge network, so your personal data may be processed at nodes outside the operator's country. The operator manages international transfers under the safeguards of Articles 44 to 46 of the GDPR (including the EU Standard Contractual Clauses) governing the hosting and processor relationships, and relies on Cloudflare's data protection certifications (SOC 2 Type II, ISO/IEC 27001). Self-hosted operators must assess and ensure that their international transfers meet the requirements of the law at their own location.

## 8. Protection of children

The service is not directed at children under 16 and does not knowingly collect children's personal data; where the law of your location sets a lower age of consent for information society services (no lower than 13, Article 8 of the GDPR), that age applies. A guardian who believes a child has provided personal data may contact the operator for deletion, which is processed immediately after verification.

## 9. Your rights and how to exercise them

You have the following rights regarding your personal data:

1. Access and obtain a copy (Article 15 of the GDPR);
2. Rectification (Article 16);
3. Erasure (Article 17);
4. Restriction of processing (Article 18);
5. Data portability (Article 20);
6. Objection (Article 21), including switching personalisation off at any time.

How to exercise them:

1. **Self-service functions (immediate effect)**: "clear recommendation profile" immediately destroys all behavioral events server-side; "clear all local data" immediately clears browser local storage and IndexedDB; the recommendation profile summary (total events, favorite and dislike counts, most-played artists and genres, recent search terms) can be queried via `GET /api/sonic/events`; switching personalisation off stops event collection immediately;
2. **Manual requests**: all other requests go to `privacy@epocanvas.com`; the operator responds within one month of receipt (Article 12, Paragraph 3 of the GDPR).

If you believe the service's processing has infringed your rights, you may seek a remedy from the operator (Article 79) and lodge a complaint with a supervisory authority at the operator's location (Article 77); users in the European Union and the European Economic Area may lodge a complaint with the supervisory authority of their habitual residence, place of work or the place of the alleged infringement.

## 10. Security measures

Under Article 32 of the GDPR, the operator maintains and continually improves appropriate technical and organisational measures against theft, alteration, damage, loss or disclosure of personal data: HTTPS/TLS across the chain; HMAC-SHA256 versioned signed API keys; the PKCE OAuth flow; HttpOnly／Secure／SameSite cookie attributes with immediate revocation; the data plane bound to loopback only and reachable through an encrypted tunnel; full-chain SSRF interception; pseudonymous identifiers; and minimised logging. The complete list, with a statement of known residual risks, is in [Data Processing & Security](/en/data-security/).

## 11. Changes to this policy

This policy may be revised as the service or the law changes. Material changes (adding third-party recipients, changing retention policies or collection scopes, and the like) will be announced in advance on the site, and the effective date and version at the top of this page updated. Continuing to use the service after a change takes effect constitutes acceptance of the revised policy; if you do not agree, stop using the service and erase your data. Material revisions are archived with the version history of the open-source repository.

## 12. Contact

- **Privacy matters, rights and appeals**: `privacy@epocanvas.com`
- **Service and account matters**: `admin@epocanvas.com`
- **Open-source project**: GitHub repository Issues (`github.com/shijianus/sonic`)
- **Self-hosted sites**: contact the operator published by that site

---

*This document is a compliance document prepared by the Sonic operations team and is not legal advice; mandatory provisions of the law of your location prevail over any inconsistent part of this policy.*
