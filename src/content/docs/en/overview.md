---
title: Privacy & Terms Overview
description: Service identity, data protection scope, document relationships and outstanding implementation requirements for Sonic's individual nonprofit test project.
---

**Revision date: 2 November 2026｜Version: 1.8**

This page explains the relationships between the documents for Sonic's hosted test service. The project is individually maintained, free and nonprofit, for learning and public-benefit testing. It offers no commercial service level or commitment to permanent operation. Read the [Terms of Service](/en/terms-of-service/) and [Privacy Policy](/en/privacy-policy/) first to understand the service scope and data processing.

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

:::caution[Document revision and actual deployment]
Live environments, supplier contracts and actual deletion results were not examined. Default-on profiling, public search-term suggestions, email-based avatar requests, deletion coverage and actual retention periods still require implementation work. A policy update does not prove that these issues have been fixed. Processing without a lawful basis and necessary safeguards should be suspended.
:::

![Sonic document relationships: service terms, privacy notice, usage rules and data explanations](/images/sonic/legal-architecture.svg)

*Figure: the documents serve different purposes; personal data processing requires a separately established lawful basis.*

## 1. Project and operator

The public code repository is [shijianus/sonic](https://github.com/shijianus/sonic). The root and player `LICENSE` files in RC `a75f5cb` use MIT; the older `main@ce443c8` has a verifiable player MIT licence but no root `LICENSE`. The RC's licensing must not be inferred for all historical code. The project's nonprofit purpose does not revoke the code licence or grant rights to use music, lyrics, covers or MVs.

This set of service documents is for hosted instances at `sonic.epocanvas.tech` and `sonic.epocanvas.com` that actually adopt it. The actual operator must state its legal identity and contact details. The maintainer account `shijianus` or the EpoCanvas brand alone cannot replace full identity disclosure. The source code does not establish the operator's legal name, location or the countries where servers are located; this review makes no assumptions about them.

Other deployments have their own operators and rules. Merely publishing code, contributing patches or providing offline tools does not automatically confer responsibility for every instance's services and data. Anyone also operating an instance or participating in decisions about processing must be responsible according to their actual role.

## 2. Data roles

| Participant | How the role is determined | Explanation for this project |
| --- | --- | --- |
| Hosted-instance operator | The party actually determining the purposes and means of personal data processing | Responsible for its own sign-in, requests, recommendations and related processing |
| Infrastructure provider | Processing on instructions or for its own independent purposes | The roles of Cloudflare and others depend on the particular service and contract |
| Epomail and content and resource providers | May be independent controllers; some situations require separate assessment | Not every third party is categorised as a processor |
| Self-hosting operators and code contributors | Whether they actually determine or participate in processing | A deployment or contribution label does not automatically establish sole, exclusive responsibility |

Actual data flows include optional profiling, request context, browser data, direct external resources and search statistics. Open-source or local-storage labels do not mean that no data leaves the device; being signed out and using hashes do not mean anonymity. Details must follow accurate disclosure in the Privacy Policy, and technical documentation must be kept consistent with it.

## 3. Document purposes

| Document | Purpose |
| --- | --- |
| [Terms of Service](/en/terms-of-service/) | Hosted-service conditions, content rights, operational limits and liability |
| [Privacy Policy](/en/privacy-policy/) | Controller, data, purposes, bases, recipients, retention and rights |
| [Acceptable Use Policy](/en/acceptable-use/) | Public resources, authorised testing, prohibited conduct and enforcement |
| [Data Processing & Security](/en/data-security/) | Actual security design, gaps, incident handling and risk-based measures |
| [Third Parties & Transfers](/en/sub-processors/) | External resources, independent roles, configuration and international-transfer conditions |
| [Key Terms](/en/key-terms/) | Personal data, pseudonymisation, profiling and technical terminology |
| [Data Management](/en/data-management/) | User actions and their coverage limits |

## 4. Protection objective, risks and legal applicability

GDPR applicability must be assessed under Article 3 and the specific facts. Offering free services to people in the EU or monitoring their behaviour there may still fall within its scope; overseas access alone is not conclusive either. Nonprofit, open-source and learning purposes provide no blanket exemption. Purely personal or household activities must be assessed according to their actual scope.

Measures are selected according to the scale of processing, risks and implementation costs. Small individual projects do not universally have to appoint a data protection officer, obtain certification, purchase commercial audits or establish round-the-clock teams. The specific thresholds in Article 37, Article 35 and Article 27 of the GDPR must still be assessed separately. Continuous profiling cannot be described as “occasional” processing merely because few people are involved. Necessary identity disclosure, a valid basis, minimisation, security and rights handling are not removed by project size.

Rigorous privacy principles guide the project's design and continuous improvement. Our goal is to make reasonable efforts to provide a high level of protection proportionate to actual risks, drawing on the GDPR principles of data minimisation, purpose limitation, transparency and user control. These are goals, not evidence of EU certification or full compliance with the GDPR and all Member State laws, or guarantees of absolute security, freedom from data breaches or loss, or immediate and complete deletion. Actual protection depends on the deployed version, configuration and third-party processing; goals, measures verified in code, unverified deployment details and remaining risks must be distinguished. Neither reasonable efforts nor risk disclosure reduces legal duties or requires users to accept unlawful processing or waive rights. Legal applicability depends on the facts, without extending the entire GDPR regime into an additional worldwide contractual guarantee. Whatever law applies, data must be described accurately, commitments must be implemented, and non-waivable user rights must be respected.

## 5. Interpretation and versions

Mandatory law takes precedence. Service conditions are governed by the Terms of Service and data notices by the Privacy Policy. Technical descriptions, images or old feature introductions cannot expand authorisation for processing, and saying “the source code prevails” cannot excuse inaccurate notice. Contradictions must be corrected and affected users notified.

Simplified Chinese is the maintenance baseline; the other nine languages are translations. Chinese-language priority cannot exclude interpretation favourable to consumers or intelligible notice. The date shown is the document's revision date. Before adopting it in a deployment or actually changing processing, effective notice must still be given and separate consent obtained where necessary.

## 6. Contact

Service and accounts: `admin@epocanvas.com`; privacy and rights requests: `privacy@epocanvas.com`. These addresses are proposed in the current documentation; their announcement in the reviewed upstream source was not confirmed, and delivery has not been verified by sending email. They do not constitute a statement that an EU representative or data protection officer has been appointed. Instance operators must ensure that their published contact channels work.

Technical issues may be reported through [GitHub Issues](https://github.com/shijianus/sonic/issues). Do not submit personal data, passwords or session credentials. For third-party instances, contact their own operators.
