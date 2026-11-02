---
title: Third Parties & Transfers
description: Infrastructure, identity services, content and external-resource recipients, configuration differences and international-transfer limits for Sonic hosted instances.
---

**Revision date: 2 November 2026｜Version: 1.8**

This page expands section 7 of the [Privacy Policy](/en/privacy-policy/), explaining the recipients that may be involved in Sonic's individually maintained, free, nonprofit hosted test instances. Integration capability in source code is not proof that a service is enabled or data sharing is lawful. Self-hosted instances must provide separate notices reflecting their actual processing.

The feature descriptions on this page are based on `shijianus/sonic` and its public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

Live configuration and contracts have not been certified. Simplified Chinese is this site's maintenance baseline; the other nine languages are translations. A language-priority provision does not diminish mandatory law or consumers' right to clear, intelligible terms.

![Sonic third-party sharing map: infrastructure, identity services, content sources, optional paths, legal requirements and international transfers](/images/sonic/sharing-map.svg)

*Figure: recipients are grouped by function; switch or safeguard labels in the diagram do not establish actual enablement, contracts or a transfer basis.*

## 1. Infrastructure and processor relationships

| Recipient | Function | Data potentially involved and configuration limits |
| --- | --- | --- |
| Cloudflare Pages and Functions | Hosting, edge APIs, caching and rate limiting | IP addresses, request paths, headers and connection metadata; actual records depend on instance and provider configuration |
| Cloudflare Tunnel | Connection between the edge and data plane | Request traffic and connection metadata; a tunnel does not automatically encrypt every internal or upstream HTTP path |
| Cloudflare KV and rate limiters | Configurable storage for rate limiting, credential revocation and related functions | IP or identity-derived keys and revocation identifiers; enablement and periods must be verified |
| Data-plane host or hosting provider | Environment containing the engine, database and logs | The engine may receive raw IP addresses, cookies, authentication headers and context forwarded by the edge; the hosting party and node countries are unverified |

Whether a processor relationship exists depends on who determines the purposes, who processes on instructions and the actual arrangements, not product names alone. Where the GDPR applies and a processor relationship exists, the arrangements required by Article 28 must be implemented. This page does not claim that any contract has been signed or verified. The controller's full identity and details for service of notices must still be supplied; see section 2 of the [Privacy Policy](/en/privacy-policy/).

## 2. Identity provider (required for sign-in)

Epomail (`mail.epocanvas.com`) provides OAuth sign-in. The browser interacts with the identity service, while Sonic exchanges the authorisation code and queries user information. It may obtain a user identifier, email address and its verification flag, nickname, avatar URL and role. Some information is stored in browser `auth` storage and signed sessions, not “only in memory”.

Epomail does not automatically become Sonic's processor through sign-in integration or shared branding. Independent processing within its account system and processing on instructions must be assessed separately according to actual purposes and arrangements. Sonic remains responsible for the receipt, retention and subsequent disclosure it determines itself.

## 3. Upstream content sources and direct browser connections

| Source | Main purpose | Data potentially transmitted or obtained |
| --- | --- | --- |
| NetEase Cloud Music, QQ Music, Kugou, Kuwo and related CDNs | Search, audio, MVs, covers and content information | Raw search text, content identifiers and metadata; connection information from proxy egress or direct browser access |
| AMLL, LRCLIB | Lyrics queries and fallback | Track identifiers or matching information such as title and artist, plus connection metadata |
| Google Fonts | Font loading | Browser IP address, User-Agent and other connection information |
| DiceBear | External avatars | The current path may include a plaintext email address in the URL seed and expose browser connection information |

An audio proxy can make a content CDN see the proxy egress address, but does not mean every request is free of personal data. Stream requests may use the browser's User-Agent rather than a uniform fixed value. MVs, covers, fonts and avatars may be requested directly by the browser. Some providers use HTTP, so TLS cannot be guaranteed across every connection. The DiceBear email seed should be replaced with a local avatar or an identifier containing no email address.

Upstream comments contain other people's names or nicknames, avatars and text, and may enter public caches; purposes include displaying comments for the requested MV. Comment authors are not parties to this service's sign-in contract, so their data cannot be processed solely under Article 6, Paragraph 1, point (b) of the GDPR. Where the GDPR applies, a public source does not automatically remove Article 14's notice requirements for indirect collection. Operators must assess and record a separate processing basis, retention period and notice exceptions, and provide applicable notice within statutory periods. Fetching or public caching should be disabled where necessary safeguards have not been implemented. This is not a promise that every author can always be contacted individually. Locally written comments are currently stored only in localStorage; no path publishing them to a comment server was found.

No upload path was found for local audio file contents, but lyric matching or recommendation context may send titles, artists, albums, duration or identifiers. Embedded artwork extracted as a data URL may also be sent with favorite events and enter the remote shared-track catalogue, where it may be returned in site-wide search or public suggestions. Profile reset does not necessarily delete that catalogue or optional external indexes. Therefore, the fact that local audio file contents are not uploaded does not mean that embedded covers or related information never leave the device.

## 4. Optional paths and switch differences

| Path | Purpose and data potentially involved | Review limits |
| --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Aggregated retrieval and cross-source completion; queries or content identifiers | Source code defaults to on when the switch is unset, while the environment example and Compose configuration set it off; actual state must be verified |
| Lyriva (`api.lyriva.xyz`) | Backup lyrics source; content identifiers or matching parameters | Controlled by settings including `SONIC_ENABLE_LYRIVA` |
| Musixmatch (`apic-desktop.musixmatch.com`) | Lyrics fallback | The RC retains the implementation, but `isSourceEnabledByPolicy` has no Musixmatch branch and the actual call is blocked by the false gate; the old `main` lyrics fallback may be callable and must be checked against the deployment; do not describe the RC as enabled or as available through an ordinary switch |
| Operator-configured alert service | Only when a valid `SONIC_ALERT_WEBHOOK_URL` is configured and an alert fires; sends system counts, release version, timestamp, credential-redacted summary and sending-node outbound IP | Enablement, recipient, roles, transfer and retention depend on the instance; administrator notes and error text may contain personal data, and redaction is not anonymisation |
| ListenBrainz / MusicBrainz | Similar-artist enrichment; artist or recording identifiers | Controlled by settings including `SONIC_ENABLE_LISTENBRAINZ` |
| Gorse | External recommendations; pseudonymous identifiers, behavioural feedback, timestamps, track identifiers, labels, titles and other catalogue metadata | Integrated through settings including `SONIC_GORSE_URL`; current reset does not guarantee synchronised deletion of external feedback or track records |
| Meilisearch | Optional search service; raw queries and catalogue data | Integration and retention must be verified per instance; queries cannot be assumed anonymous |
| Cross-source completion | Cross-platform content matching; track metadata | Actual requests depend on the matching path; feature availability does not establish content authorisation |

Switch configuration is not user consent. See section 5 of the [Privacy Policy](/en/privacy-policy/) for the consent gap caused by current default-on personalisation and Auto DJ. Optional processing without the necessary basis and choices implemented should be suspended; changing a third-party name must not be used to bypass these requirements.

## 5. Sharing under legal requirements

When a disclosure request is received, the requester's identity, jurisdiction, specific basis and scope must be verified. Only legally necessary data should be provided, with reasons for handling recorded. Whether individuals are notified depends on applicable law and valid restrictions. A report, suspected violation or service termination does not automatically result in sharing all data with the police.

A legal obligation relied on for disclosure does not replace international-transfer requirements. Before submitting a problem in public Issues or a community, remove personal data, credentials and private information in other people's comments.

## 6. International transfers

GDPR applicability is assessed under Article 3; being free, nonprofit or merely accessible from the EU does not automatically establish or exclude it. Only where Chapter V of the GDPR applies to a particular personal data transfer does this site assess, for each actual recipient, location and processing role, Article 44 requirements, an applicable adequacy decision under Article 45 or other valid safeguards under Article 46. Not every overseas IP or content request can be categorised as a Chapter V transfer. This site does not promise the entire GDPR regime as a uniform worldwide contractual guarantee. The controller's location, data-plane countries and all request destinations have not been verified; hosting in Taiwan or governance by a fixed jurisdiction cannot be assumed.

1. Third-country transfers subject to the GDPR must individually meet Article 44 requirements, verifying an applicable adequacy decision under Article 45 or other valid safeguards under Article 46.
2. Use of Standard Contractual Clauses still requires confirmation of the parties covered, processing scope, transfer assessment and necessary supplementary measures. A provider's public availability of clauses does not establish implementation by this instance.
3. ISO / SOC certifications, provider privacy policies or agreement to this page do not automatically establish a lawful transfer basis. Search text, IP addresses and pseudonymous identifiers cannot categorically be excluded from personal data.
4. An explanation or copy of safeguards may be requested through `privacy@epocanvas.com` as provided by law. Necessary trade secrets may be appropriately redacted, but confidentiality cannot remove statutory transparency duties.

## 7. Maintaining the list

Before enabling new processing or recipients, operators must check purposes, bases, data scope, periods, nodes and actual roles, and update notices promptly. Fresh consent must be obtained separately where required. This document does not prove that this work is complete, and the existence of a source-code path does not authorise enabling it.

If the list and actual processing differ, notices must be corrected and improper transfers addressed, rather than simply declaring that “the code prevails”. Self-hosting operators' responsibilities arise from applicable law and licences; copying this page does not create additional contractual obligations to the project author. Feedback: `privacy@epocanvas.com`.
