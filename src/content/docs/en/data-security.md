---
title: Data Processing & Security
description: Data lifecycle, processing limits, security measures, known limitations, breach response and self-hosting guidance for Sonic's hosted service.
---

**Revision date: 2 November 2026｜Version: 1.8**

This page expands section 10 of the [Privacy Policy](/en/privacy-policy/), explaining the data processing and security boundaries visible in Sonic hosted instances. The privacy objective is to use reasonable efforts to provide a high level of protection proportionate to actual risks, improving measures in light of verification findings and GDPR principles of data minimisation, purpose limitation, transparency and user control. That objective does not establish certification or full compliance with the GDPR and all Member State laws, or guarantee absolute security, freedom from data breaches or loss, or immediate and complete deletion. Measures found in the reviewed code, unverified deployment details and known gaps are identified separately: actual protection depends on the deployed version, configuration and third-party processing. Reasonable efforts and risk disclosures do not reduce statutory duties or require users to accept unlawful processing or waive rights. It records findings from source-code and audit-material checks, not certification of live configuration, operational status, supplier contracts or continued compliance. Simplified Chinese is the root maintenance baseline; the other nine languages are translations. Language priority does not diminish mandatory law or consumers' right to clear, intelligible terms.

The feature descriptions on this page are based on `shijianus/sonic` and its public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

![Sonic four-layer security structure: transmission and access, authentication, outbound requests, storage and logs, identifying controls requiring operator configuration](/images/sonic/security-shield.svg)

*Figure: this diagram organises controls; it does not mean every deployment has enabled them or meets compliance requirements.*

## 1. Data lifecycle

| Stage | Currently verifiable facts and limits |
| --- | --- |
| Collection | Epomail OAuth provides sign-in; playback, search and recommendations may generate events. Personalisation defaults to on in the current release-candidate source; this default is not consent to optional profiling. |
| Transmission | Paths between the browser, edge, data plane and upstream services vary by deployment. Internal and some upstream paths use plaintext HTTP, so TLS cannot be claimed across every connection; MVs, covers, fonts or avatars may be requested directly by the browser. |
| Storage | The browser may retain account data, queues, history, preferences, local music and caches; actual locations and periods for behavioural data, logs, backups and provider records must be verified per deployment. |
| Use and sharing | Search, playback and sign-in respond to requests; profiling, Auto DJ, search statistics and public suggestions may use behaviour or search context. See [Third Parties & Transfers](/en/sub-processors/) for recipients and switches. |
| Deletion | Current profile reset mainly addresses some events or feedback for the current identity. It does not guarantee coverage of radar, search aggregates, backups, logs, external services or old anonymous identifiers; revocation also depends on revocation-store configuration and request success. |

## 2. Processing matrix

| Activity | Data potentially involved | Processing limits and periods |
| --- | --- | --- |
| Requested search, playback, lyrics and sign-in | Queries, content identifiers, sessions and account data returned by Epomail | Limited to responding to requests; sign-in data may exist in browser storage and sessions. |
| Behavioural profiling, Auto DJ and recommendations | Playback, progress, skips, favorites, dislikes, searches, pseudonymous identifiers and local context | Profiling or processing that may support profiling; currently on by default. Stopping and deletion after refusal or withdrawal must not be assumed complete. |
| Search statistics and public suggestions | Raw search terms, counts and related context | Existing paths may display users' search terms; without filtering, thresholds and periods implemented, they should not be described as anonymous aggregation or safe publication. |
| Rate limiting and security | Raw IP addresses, cookies, authentication headers, User-Agent, context and account- or session-derived keys | May be forwarded with requests to the data-plane engine; claims that use is limited to abuse prevention, connections and security must be verified against actual routes. |
| Local data and comments | localStorage, IndexedDB, imported music, download caches, local comments and upstream comment data | No upload path was found for local audio file contents; lyrics and recommendations may still send titles, artists, albums, duration or identifiers, and embedded artwork may enter the remote shared-track catalogue with favorite events. Upstream comments may contain others' names, avatars and text and enter public caches. |
| Support, disputes and legal obligations | Voluntarily submitted email addresses, explanations, necessary evidence and handling records | Retained only as long as needed for requests, disputes or obligations; no uniform host-backup period has been verified. |

Legal bases, retention periods and recipients must be assessed individually according to actual purposes, users and deployment configuration. Being free, individually maintained or open source does not automatically lower security or notice requirements.

## 3. Security measures

### 3.1 Transmission and access

1. Public entry points can be configured with HTTPS, OAuth, signed sessions and service-to-service secrets. These code controls do not prove that actual entry points, proxies and upstream services all use TLS.
2. Whether the control and data planes use an encrypted tunnel, and whether the data plane binds only to loopback, depends on hosting configuration. Internal plaintext HTTP paths alone invalidate a blanket “all connections encrypted” claim.
3. Target validation and domain restrictions on proxy routes cover only requests actually passing through them. The audit found that raw IP addresses may be forwarded to the engine with cookies, authentication headers and context; the engine cannot be described as receiving only pseudonymous data.
4. Audio-stream requests may use the browser's User-Agent rather than a fixed value. When browsers connect directly to MVs, covers, Google Fonts or avatar services, those services may see IP addresses and connection metadata.

### 3.2 Authentication and keys

1. The reviewed RC uses OAuth state and PKCE, with signed sessions lasting 30 days by default. Actual cookie attributes and periods still require deployment verification. Signing provides integrity, not encryption; credential payloads may include email addresses, user or role identifiers. URL credentials in the older `main@ce443c8` are a legacy-compatibility warning, not evidence of these RC protections.
2. Requests should be rejected when API-key version, signature, time or `jti` checks fail. Names, environment variables and design comments must not be treated as proof of complete authentication controls.
3. Immediate sign-out or bulk-revocation effects depend on revocation storage, switches and request success. Without enablement or verification, immediate invalidation of every copied credential cannot be guaranteed.

### 3.3 Outbound request defences

The code contains some SSRF, private-network and redirect checks and a music-domain allowlist. These do not mean every upstream or third-party browser request is proxied, sanitised or anonymised. DiceBear currently has an avatar URL path using a plaintext email address as its seed. Direct Google Fonts, MV and cover requests may expose IP addresses to those services. Some providers use HTTP, so TLS cannot be claimed across every connection.

### 3.4 Storage and logs

1. Browser `auth`, `audio`, `library`, `global`, `settings`, `recommend` and IndexedDB retain data by function. Signing out does not automatically clear all device data.
2. Where server-side behavioural data uses pseudonymous identifiers, it may still be combined with other data to identify someone. Pseudonymisation is not anonymisation and does not cover search, radar or third-party data.
3. Actual rotation, access permissions and expiry deletion for application, Cloudflare, host and upstream logs and backups were not uniformly confirmed by this review. Fictional backup periods or “zero logs” promises must not be supplied.
4. Optional Meilisearch may process raw queries or catalogue data. Gorse may receive pseudonymous feedback and track-catalogue metadata; whether deletion is synchronised with local deletion is unverified. A successful local reset cannot stand in for deletion from the shared-track catalogue or external recommendation and search stores.

### 3.5 Known limitations

1. Personalisation and Auto DJ default to on without a demonstrable prior, separate and withdrawable choice. This is not consent. Auto DJ has an independent switch and may still send seed and excluded-track data; turning personalisation off does not stop that request.
2. Public search suggestions may reuse raw search terms, exposing personal or sensitive information.
3. Deletion mainly covers some current-identity events; coverage of radar, search aggregates, the shared-track catalogue and embedded covers, backups, logs, external services, Meilisearch, Gorse and old anonymous identifiers is unverified. A durable radar engine route is unconfirmed, so no definite assertion is made about its storage state.
4. Internal plaintext HTTP, Google Fonts, direct MV / cover requests, browser User-Agent and DiceBear plaintext-email URLs make claims of “TLS across every connection” or “email never transmitted externally” inaccurate.
5. Rate limiting, revocation, logs and third-party switches depend on instance environment variables and provider configuration. GDStudio defaults to on in code when unset, but the environment or Compose may set it off; a list alone cannot support a default-off claim.

## 4. Breach response

Where the GDPR applies, security measures must be proportionate to the nature of the data, processing scale, implementation costs and actual risks (Article 32 of the GDPR). Operators must record every personal data breach. Unless a breach is unlikely to pose a risk to individuals' rights and freedoms, the competent supervisory authority must be notified without undue delay and, where feasible, within 72 hours of awareness, with reasons for delayed notification (Article 33 of the GDPR). Where the risk is high, data subjects must also be notified without undue delay, unless a statutory exception applies (Article 34 of the GDPR). This is not a promise of automatic reporting to a particular country's authority, nor does it displace other applicable law.

Actual handling should isolate affected systems, protect or revoke credentials, establish data categories, scope, recipients and the timeline, and record decisions and remedies. Report suspected incidents through `privacy@epocanvas.com`; do not send passwords, complete tokens, membership cookies or unnecessary personal data.

## 5. Data protection by design and by default

Article 25 of the GDPR requires consideration of protection by design and by default when determining the means of processing. This project cannot currently claim full implementation:

1. Optional profiling should be off by default, with equally easy acceptance, refusal and withdrawal and records of choices. The current source defaults to on; sign-in or continued use cannot replace consent.
2. Public search suggestions should first be disabled or given minimal display, filtering, thresholds, periods and deletion controls.
3. Avatar seeds should not use plaintext email addresses. Google Fonts, MVs, covers and other direct resources should be enabled only after assessing transmission of IP addresses, cookies and identifiers.
4. Review linkable old pseudonymous identifiers, radar, search, shared tracks and covers, logs, Meilisearch, Gorse and backups; carry out erasure within the applicable statutory scope and notify recipients where required. Explain the reason, scope and period of any statutory retention exception. Partial cleanup for the current identity must not be presented as complete deletion.

## 6. Duties of self-hosting operators

Self-hosted instances operate independently. This page's checks do not create contractual duties beyond applicable law and licences or constitute an operational commitment by the author. GDPR applicability must be assessed according to territorial connections and actual activities (Article 3 of the GDPR), not categorically excluded for free services or individual projects. The following requirements apply only where their respective statutory conditions are met:

1. Take proportionate measures according to the nature and scale of data, implementation costs and actual risks (Article 32 of the GDPR), checking transmission, keys, logs, recovery and deletion rather than automatically requiring a small project to maintain dedicated teams or certification.
2. Fewer than 250 people does not automatically exempt processing records. Processing that is not occasional, may endanger individuals' rights and freedoms, or involves special-category data or criminal-conviction and offence data may each disqualify the exception (Article 30 of the GDPR).
3. Appoint a data protection officer when the triggering conditions apply, including public authorities, core activities involving large-scale regular and systematic monitoring, or large-scale processing of special-category data or criminal-conviction and offence data (Article 37 of the GDPR).
4. A data protection impact assessment concerns activities likely to create high risk before processing begins; it is not automatically required for every hash, sign-in or free project (Article 35 of the GDPR).
5. An overseas party subject to Article 3, Paragraph 2 of the GDPR generally must appoint an EU representative. Article 27's occasional-processing exception requires all conditions together: occasional processing, no large-scale processing of special-category or criminal-conviction and offence data, and processing unlikely to pose a risk considering its nature, context, scope and purposes. Being free or nonprofit is not itself an exception.
6. Check `SONIC_RECOMMEND_RETENTION_DAYS`, database paths, memory fallback, third-party paths, rate-limit and revocation switches, and use actual values in your own notices, periods and deletion procedures.

## 7. Auditability

This page is based on the 2026-11-02 source review of the public RC `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), a documentation check rather than an operational audit, certification or supplier due-diligence exercise; the older `main@ce443c8` is only a compatibility comparison. Source defaults, environment variables, Compose and actual services may differ. If documentation, code and deployment disagree, stop making the stronger claims and correct the documentation.
