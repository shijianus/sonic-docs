---
title: Privacy & Terms Overview
description: The Sonic legal documents overview — platform identity, data processing roles, the GDPR-level baseline, document map, order of precedence, and contact points.
---

**Effective date: 1 November 2026｜Version: 1.4**

This page is the guide to all legal documents of the Sonic service (hereinafter "the service"). It explains the roles of the parties, the document architecture and the order of precedence. Before signing in to or using the service, you should read this page together with the [Privacy Policy](/en/privacy-policy/) and the [Terms of Service](/en/terms-of-service/).

![Sonic legal document architecture: the Terms of Service as the contract layer, the Privacy Policy and Acceptable Use Policy as the policy layer, the Data Processing & Security, Third Parties & Transfers and Key Terms as supporting documents, all resting on the GDPR-level protection baseline](/images/sonic/legal-architecture.svg)

*Figure: the architecture of this site's legal documents. The Terms of Service set the contractual conditions; the Privacy Policy states the notice and processing standards for personal data; the Acceptable Use Policy sets behavioral boundaries; the remaining three documents are supporting documents. The data protection baseline applies GDPR-level standards to every user.*

## 1. Platform identity

Sonic is an open-source music streaming platform built on a two-plane architecture of a Cloudflare edge control plane and a Linux local protocol engine data plane, with its source code published under the `LICENSE` file at the repository root (MIT License). The service may be provided in two forms:

1. **Hosted instances**: public sites operated by the operations team (`sonic.epocanvas.tech` primary and `sonic.epocanvas.com` backup mirror);
2. **Self-hosted instances**: private sites deployed by any individual, team or organization on their own servers and domains from the open-source code.

Both forms run the same open-source code; they differ in the operator and the responsible party: the operations team bears responsibility for hosted instances, and the deployer for self-hosted ones.

## 2. Data processing roles

The legal documents of the service follow the "data controller／processor" division of roles, equivalent to the general classification of the EU General Data Protection Regulation (GDPR).

| Scenario | Data controller | Processor |
| --- | --- | --- |
| Hosted instances | The operations team (for behavioral events, sign-in and security records) | Cloudflare, Epomail (authentication) and others; see the full list in [Third Parties & Transfers](/en/sub-processors/) |
| Self-hosted instances | The individual or organization deploying the instance (sole and exclusive data controller) | The infrastructure providers configured by that deployer |

The open-source code itself collects, uploads and sends back no telemetry; apart from external services configured by the instance operator, the upstream authors never touch any instance's operating data. From the moment of deployment, the deployer becomes the data controller of its users and must perform the notice, security and supervisory duties required by the law applicable at its location; this site's documents may serve as the baseline text for its notice and terms.

## 3. Document architecture

The legal documents on this site are organized by topic and refer to one another, together forming one complete set of commitments:

| Document | Content |
| --- | --- |
| [Project Overview](/en/project/) | Product identity, core capabilities, architecture, security and privacy design, deployment |
| [Privacy Policy](/en/privacy-policy/) | Collection and use of personal data, legal bases, retention periods, your rights and international transfers |
| [Terms of Service](/en/terms-of-service/) | Contractual conditions of use, account rules, limitation of liability, governing law and dispute resolution |
| [Acceptable Use Policy](/en/acceptable-use/) | Behavioral boundaries, prohibited conduct, the enforcement ladder and appeals |
| [Data Processing & Security](/en/data-security/) | Data lifecycle, processing matrix, security measures, known limitations, incident response |
| [Third Parties & Transfers](/en/sub-processors/) | Recipients, data involved, transfer safeguard mechanisms |
| [Key Terms](/en/key-terms/) | Definitions of the legal terms (GDPR vocabulary) and technical terms used on this site |

## 4. Data protection baseline

The service applies the EU General Data Protection Regulation (GDPR) as the **minimum** data protection standard for **every user**: wherever in the world you are, your rights of notice, access, rectification, erasure, restriction, portability, objection and complaint in respect of your personal data are no lower than the level set by the GDPR.

1. For users in the European Union and the European Economic Area, the GDPR applies directly;
2. For users elsewhere, the service carries the GDPR standard as a self-imposed commitment and performs it as a contractual obligation;
3. Where the law of your location grants stronger protection, that law prevails to its extent.

This baseline means: although the hosted instance is operated from Taiwan and the governing law of the Terms of Service is that of the operator's location (see the [Terms of Service](/en/terms-of-service/), section 11), data protection matters are executed with the GDPR level as the floor; rights enforcement, breach notification and security duties all follow this standard.

## 5. Order of precedence

1. For privacy matters, the [Privacy Policy](/en/privacy-policy/) is the specific provision; for conditions of use, the [Terms of Service](/en/terms-of-service/) is the specific provision; all other matters are construed under the architecture listed on this page.
2. Where the documents are inconsistent, the document directly concerned with the subject matter prevails.
3. The Simplified Chinese version of this site's legal documents is the authoritative version; the English and Japanese versions are reference translations, and in case of doubt the authoritative version prevails.

## 6. Contact points

- **Privacy matters and data protection requests**: `privacy@epocanvas.com`
- **Service and account matters**: `admin@epocanvas.com`
- **Open-source project**: GitHub repository Issues (`github.com/shijianus/sonic`)
- **Self-hosted sites**: contact the operator contact published by that site
