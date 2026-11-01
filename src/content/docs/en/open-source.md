---
title: Open-Source & Self-Hosting Legal
description: Sonic open-source and self-hosting legal matters — license status, trademark boundaries, third-party acknowledgements and dependencies, deployer obligations and compliance boundaries.
---

**Effective date: 2 November 2026｜Version: 1.5**

This page describes the current status and boundaries of Sonic's open-source licensing, third-party acknowledgements, and the legal obligations of self-hosting. The relationship between the software license and the user terms is in the [Terms of Service](/en/terms-of-service/), sections 2 and 10.

## 1. License status

| Item | Status |
| --- | --- |
| The `LICENSE` file at the repository root | MIT License — **the authoritative license text**; that file governs |
| Historical README statements | Stated a CC BY-NC-SA 4.0 intent (non-commercial, attribution, share-alike); not a basis for licensing pending the maintainer's decision, and an expression only of the project's non-commercial positioning |
| Trademarks and branding | The `epocanvas` and `Sonic` names and marks grant no trademark rights along with the source code |

Whatever the final license decision, the following boundary applies in all cases: the rights in recordings, lyrics, covers and other content belong to their respective owners, and the project grants no sublicense to any music content.

## 2. Project positioning

The project is a non-commercial open-source project: a search, aggregation and playback tool that stores and hosts no music files and integrates no paywall-circumvention components. When you use the service or deploy it yourself, you are responsible for confirming compliance with local law, upstream terms of service and content licensing requirements (behavioral boundaries in the [Acceptable Use Policy](/en/acceptable-use/)).

## 3. Third-party acknowledgements and dependencies

Development and the practice of multi-source aggregation draw on, and acknowledge, the following open-source community projects: Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, the GDStudio Music API and the Linux.do community. The complete dependency and notice list is in the repository's `THIRD_PARTY_NOTICES.md`; each upstream service is governed by its own terms.

## 4. Legal obligations of self-hosting deployers

From the moment of self-hosted deployment, the deployer is the data controller for that deployment's users (role definitions in the [Overview](/en/overview/), section 2) and must fulfil:

1. **Notice duty**: inform users of data-processing matters; this site's [Privacy Policy](/en/privacy-policy/) can serve as the base text, edited to match your actual configuration (third-party chains you have not enabled must be removed from the notice);
2. **Records and assessment**: maintain records of processing activities (Article 30 of the GDPR) and, where processing is high risk, carry out a data protection impact assessment (Article 35 of the GDPR);
3. **Security maintenance**: implement the measures in [Data Processing & Security](/en/data-security/), section 3, and accept supervision by the competent authorities;
4. **Configuration consistency**: the actual environment-variable values (retention days, third-party switches, rate limits) must match the commitments in your policy;
5. **Jurisdictional supplements**: beyond the GDPR, supplement with the statutory requirements of your users' jurisdictions, such as the UK GDPR, LGPD and CCPA-CPRA.

## 5. Adopting this site's documents

This site follows a dual-track design of "common template + hosted-instance live text"; self-hosted operators may adopt the site's documents in full as the basis for their own site's notices and terms:

1. Replace the identity information (domain, contact e-mail, effective date and version number);
2. Review the third-party list and the truthful disclosure of the configuration parameters;
3. Keep "the Simplified Chinese version is the authoritative version" or change it to your authoritative language, consistently throughout;
4. Consult a lawyer before formal operation; this site's documents do not constitute legal advice.
