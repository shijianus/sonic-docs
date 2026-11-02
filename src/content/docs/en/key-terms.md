---
title: Key Terms
description: Data protection, roles, consent, technology and local-data processing terms used in Sonic's legal documents.
---

**Revision date: 2 November 2026｜Version: 1.8**

This page explains the main terms in the [Privacy Policy](/en/privacy-policy/), [Data Processing & Security](/en/data-security/), [Third Parties & Transfers](/en/sub-processors/) and [Acceptable Use Policy](/en/acceptable-use/). Legal definitions use the GDPR as a reference; source-code review is not certification of operational compliance. Simplified Chinese is the root maintenance baseline; the other nine languages are translations. Language priority does not diminish mandatory law or consumers' right to clear, intelligible terms.

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

![Sonic terminology map: legal roles, data states, processing actions and technical components](/images/sonic/key-terms-map.svg)

*Figure: terms are grouped by legal roles, data states and technical implementation; the diagram does not expand any party's legal identity.*

## 1. Legal terms

| Term | Definition |
| --- | --- |
| Personal data | Any information relating to an identified or identifiable natural person (Article 4, Paragraph 1 of the GDPR). IP addresses, cookies, search terms, avatar URLs, names or text in comments and linkable pseudonymous identifiers may all be personal data. |
| Processing | Any operation performed on personal data, including collection, recording, storage, retrieval, use, transmission, publication, restriction or erasure (Article 4, Paragraph 2 of the GDPR). |
| Restriction of processing | Suspending use of data while retaining it in specified circumstances (Article 18 of the GDPR). |
| Profiling | Automated analysis or evaluation of personal characteristics or behaviour. Playback, searches, skips, favorites, dislikes and context may inform recommendations; profiling is not the same as a decision producing legal or similarly significant effects. |
| Pseudonymisation | Processing in which data cannot be directly attributed to a person without additional information (Article 4, Paragraph 5 of the GDPR). Pseudonymised data may still be combined to identify someone and is not anonymised data. |
| Controller | A natural or legal person that alone or jointly determines the purposes and means of processing (Article 4, Paragraph 7 of the GDPR). For hosted instances, the role depends on the person or organisation actually determining those purposes and means; code authors, contributors and operators need not be the same party. |
| Processor | A natural or legal person processing personal data on behalf of the controller (Article 4, Paragraph 8 of the GDPR). The role depends on actual purposes, instructions and arrangements; Cloudflare, Epomail or another provider does not automatically become a processor by name. |
| Recipient | A natural or legal person to whom personal data is disclosed (Article 4, Paragraph 9 of the GDPR). A service receiving an IP address through a direct browser connection may also be a recipient. |
| Third party | A party other than the data subject, controller, processor or persons authorised by the controller to process data (Article 4, Paragraph 10 of the GDPR). |
| Consent | A freely given, specific, informed and unambiguous affirmative indication (Article 4, Paragraph 11, and Article 7 of the GDPR), withdrawable at any time as easily as it was given. Sign-in, continued use and default-on settings are not consent to optional profiling; a missing consent record is no reason to refuse to stop processing that lacks a basis. |
| Personal data breach | A security incident leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data (Article 4, Paragraph 12 of the GDPR). |
| Supervisory authority | A public authority legally supervising data protection obligations. Where the GDPR applies, data subjects may complain to a competent authority (Article 77 of the GDPR). |
| International transfer | Transfer of personal data to a third country or international organisation outside the EU or European Economic Area; it must be assessed by actual locations, parties and safeguards, not inferred from server names. |
| Special categories of data | Data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade-union membership, genetic data, biometric data used to uniquely identify a natural person, health, sex life or sexual orientation (Article 9 of the GDPR). Music preferences and search terms can indirectly reveal sensitive characteristics and cannot categorically be treated as risk-free. |
| Data subject | The identified or identifiable natural person whose data is processed; “you” here refers to the relevant natural person making a request or using the service. |

## 2. Technical and product terms

| Term | Definition |
| --- | --- |
| Hosted instance | A Sonic deployment to which the project operator actually provides access; see the [Privacy Policy](/en/privacy-policy/) for scope, controller, configuration and contacts. |
| Self-hosting | An independent instance run by someone else. Its deployer separately assesses controller identity, law, configuration and notice; supplying MIT-licensed code does not make this project its operator. |
| Control plane | Deployment components handling webpages, routing, caching, rate limiting or edge APIs; they may encounter IP addresses, cookies, authentication headers, User-Agent, paths and context. |
| Data plane | Components running the engine, recommendation computation, databases and related services. The current audit found that raw IP addresses may be forwarded to the engine with cookies, authentication headers or context; it cannot be described as receiving only pseudonymous data. |
| Epomail OAuth | The OAuth 2.0 sign-in flow through Epomail, using PKCE; it may return a user identifier, email and its verification flag, nickname, avatar URL and role. |
| API Key / `jti` | A signed, time-limited API credential and its unique identifier. Signature verification is not encryption; cookies, credential copying and revocation storage must be assessed separately. |
| fail-closed | Rejecting requests when validation or necessary storage fails rather than silently degrading; actual operation must be checked against configuration. |
| SSRF defence and domain allowlist | Outbound checks for specified private networks, loopback and cloud-metadata addresses, redirects or permitted domains; they do not cover direct browser connections or every upstream HTTP path. |
| SQLite / WAL | A SQLite database usable for data-plane persistence and its write-ahead logging mode; this does not mean profiles, logs, backups and radar data are all in one database or deleted on the same schedule. |
| Circuit breaker | A mechanism temporarily changing request paths after repeated failures or timeouts; thresholds, degradation and enablement depend on the actual version and configuration. |
| Behavioural events | Signals potentially used for recommendations, such as playback, progress, skips, favorites, dislikes, searches and entity feedback. Batch limits, noise filtering and retention depend on the version and configuration. |
| Public search suggestions | A feature path providing historical or statistical search terms to other visitors. Current reuse of raw terms poses a disclosure risk and cannot simply be called anonymous aggregation. |
| Radar | Exploration, recommendation or sync features and their state generated from user data or behaviour. A persistent engine path is not currently confirmed; sync or isolated-storage attempts exist, so neither the presence nor the absence of durable database records can be promised. |
| Local music | Files or Blobs on the user's device. No path uploading local audio Blobs to the server was found; lyrics queries and recommendation context may still send titles, artists, albums, duration or identifiers. |
| Local comments | Comment drafts or content currently written to localStorage; this does not mean publication to a comment server. Reading comments may retrieve other people's names, avatars and text and place them in public caches. |
| Direct connection / proxy | A proxy makes requests on the server side; direct access sends requests from the browser to a content CDN. Direct access exposes browser IP and connection information to the target, and stream requests may use the browser's User-Agent rather than a fixed value. |
| Version and configuration | Source defaults, `.env`, Compose and production environments can differ. GDStudio defaults to on in code when unset, but the environment or Compose may set it off; actual runtime configuration must be verified. |

## 3. Interpretation baseline

1. Legal terms apply only where their actual conditions are met. “Individual project”, “free” and “open source” are not synonyms for controller, processor, consent, anonymisation or security compliance.
2. Check technical terminology against source code, the actual environment and provider request paths together. Where README design goals and documentation differ, goals must not be treated as guarantees. If code, configuration and pages disagree, stop making the stronger claims and correct the relevant pages.
3. Simplified Chinese is the maintenance baseline for this site's legal documents; the other nine languages are reference translations. Differences from the root version should be synchronised promptly, without affecting mandatory law or consumers' right to clarity and intelligibility.
4. The root and player `LICENSE` files in the reviewed RC use MIT. The older `main@ce443c8` has a verifiable player MIT licence but no root `LICENSE`; the RC's licensing must not be inferred for all historical code. Definitions on this page do not restrict copying, modification, distribution or commercial use permitted by the applicable licence. The hosted instance's [Acceptable Use Policy](/en/acceptable-use/) governs only its actual hosted resources and service conduct.
5. Source check: public RC `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02; this page's revision date is 2026-11-02.
