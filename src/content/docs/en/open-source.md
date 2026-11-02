---
title: Open-Source & Self-Hosting Legal
description: Sonic open-source and self-hosting legal matters — license status, trademark boundaries, third-party acknowledgements and dependencies, deployer obligations and compliance boundaries.
---

**Revision date: 2 November 2026｜Version: 1.8**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page describes the current status and boundaries of Sonic's open-source licensing, third-party acknowledgements, and the legal obligations of self-hosting. The relationship between the software license and the user terms is in the [Terms of Service](/en/terms-of-service/), sections 2 and 10.

## 1. License status

| Item | Status |
| --- | --- |
| Root and player `LICENSE` files | Both use MIT in RC `a75f5cb`, governing code use, modification, distribution and permitted commercial use; the older `main@ce443c8` has a verifiable player MIT licence but no root `LICENSE`, so the RC's licensing must not be inferred for all historical code |
| Nonprofit project positioning | Describes the hosted learning and public-benefit test project; it is not an NC restriction on code and does not revoke rights already granted by MIT |
| Trademarks and branding | The `epocanvas` and `Sonic` names and marks grant no trademark rights along with the source code |

MIT does not grant rights in music, recordings, lyrics, covers or MVs, and its code disclaimer does not remove hosted operators' data protection or consumer obligations. Dependencies and media retain their separate licences and rights.

## 2. Project positioning

The hosted service is an individually maintained, free nonprofit learning and public-benefit test project. Music file contents imported or downloaded in the browser stay on the device, but metadata, feedback and context may be transmitted. Nonprofit, educational or test use is not automatically a copyright or data-protection exemption, and a technical interface is not proof of a content licence. Use and deployments must meet applicable law, upstream terms and content rights (see the [Acceptable Use Policy](/en/acceptable-use/)).

## 3. Third-party acknowledgements and dependencies

Development and the practice of multi-source aggregation draw on, and acknowledge, the following open-source community projects: Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, the GDStudio Music API and the Linux.do community. The complete dependency and notice list is in the repository's `THIRD_PARTY_NOTICES.md`; each upstream service is governed by its own terms.

## 4. Legal obligations of self-hosting deployers

Roles depend on who actually determines processing; deploying code or contributing it alone does not establish sole responsibility. Purely personal testing and public service must be assessed separately (see the [Overview](/en/overview/), section 2). Where you operate the service:

1. **Notice duty**: disclose your real legal identity, contact details, purposes, recipients, node countries and retention before collection; adapt the [Privacy Policy](/en/privacy-policy/) to verified facts rather than assuming the repository supplies them;
2. **Records and assessment**: where the GDPR applies and its conditions are met, maintain processing records under Article 30 and assess high-risk processing under Article 35. Small scale does not make continuous profiling occasional;
3. **Security maintenance**: implement appropriate measures, valid prior choices and verified deletion. Default-on profiling, public raw-query reuse, email avatar requests and incomplete reset remain blockers; disclosure alone does not resolve them;
4. **Configuration consistency**: verify actual retention, cleanup, revocation, external-resource and backup behaviour, not merely environment values; suspend optional processing lacking a lawful basis or necessary safeguards;
5. **Applicable law and transfers**: determine territorial scope and actual providers and countries. The GDPR is not a worldwide contractual guarantee, and certifications or public supplier policies do not establish contracts or international-transfer safeguards.

## 5. Adopting this site's documents

These documents describe specified hosted test instances and the reviewed public RC, not a compliance certification or automatically applicable terms for every deployment. Any adoption requires:

1. Stating the actual operator's legal identity, contacts, domains, revision date and adoption date;
2. Verifying actual data flows, third-party roles, contracts, transfer mechanisms, choices, retention and deletion before processing;
3. Maintaining intelligible translations consistently: this site's Simplified Chinese maintenance baseline and nine translations do not override mandatory law or interpretation favourable to consumers;
4. Obtaining appropriate legal advice and valid acceptance or separate consent where needed; copying text or continued use does not establish either.
