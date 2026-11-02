---
title: Terms of Service
description: Conditions of use, content rights, individual-developer liability limits and non-excludable user rights for Sonic's free nonprofit test service.
---

**Revision date: 2 November 2026｜Version: 1.8**

These terms apply to Sonic hosted test instances actually operated by this project that expressly adopt them. Sonic is an individually maintained, free, nonprofit side project for learning and public benefit. It provides experimental music search and playback tools, does not sell subscriptions, and offers no additional commercial service level or guarantee of permanent operation. Respect for privacy and reasonable efforts towards a high level of protection proportionate to actual risks are project goals. GDPR principles of data minimisation, purpose limitation, transparency and user control guide continuing improvements, not a promise of EU certification, full compliance with the GDPR and all Member State laws, absolute security, freedom from data breaches or loss, or immediate and complete deletion. Protection depends on deployment, configuration and third-party processing; the Privacy Policy distinguishes verified code measures, unverified matters and concrete risks. The project's status, its reasonable-efforts goal and its risk disclosures do not reduce applicable legal obligations or require you to accept unlawful processing or waive rights.

Before you enter into a service contract, the operator must provide terms that you can retain, together with the applicable pre-contractual information, and obtain acceptance as required by law. Reading the Privacy Policy, OAuth identity verification and consent to optional personal data processing are separate matters; merely visiting or signing in does not necessarily satisfy all legal requirements. If you disagree with conditions of use that have been validly presented, stop using the service; existing personal data rights and statutory remedies remain unaffected.

Simplified Chinese is this site's maintenance baseline; the other nine languages are translations for reference. Language priority must not exclude mandatory law, interpretation favourable to consumers or clear, intelligible notice. On 2026-11-02, the public `main@ce443c8` (2026-10-27 UTC) and the newer public release-candidate branch `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) were reviewed. The feature descriptions below are based on the candidate branch, with differences from the older main branch identified separately. The candidate branch is not an official GitHub Release and does not establish the live version, vendor contracts or security certification.

:::caution[Requirements before adopting these terms]
The actual operator's identity, effective contact details, deployed version and data processing arrangements have not yet been fully verified from the public repository. This page alone is not evidence that all pre-contractual disclosures or EU compliance requirements have been met. Before adopting these terms, the operator must supply the missing instance information and implement the necessary measures identified in the Privacy Policy. Processing without a lawful basis or necessary safeguards must not continue merely in reliance on these terms.
:::

![Sonic service relationship: notice and valid acceptance, actual service, change notifications and termination of use](/images/sonic/tos-contract.svg)

*Figure: conditions of use, privacy notice and consent to optional processing have different functions.*

## 1. Service provider and scope

Hosted instances are the sites at `sonic.epocanvas.tech` and `sonic.epocanvas.com` actually operated by this project that adopt these terms. The public maintainer account is [shijianus](https://github.com/shijianus). The proposed service contact in the current documentation is `admin@epocanvas.com`; this review did not confirm its announcement in the reviewed upstream source or send email to verify delivery. Neither the brand nor the repository account is a separate legal entity or sufficient to identify the contracting party. Before a contract is concluded, the actual provider must disclose its true legal identity, effective contact details, and any geographical address, telephone number where legally required, and other information required by applicable law. The available information is insufficient to fill in these details on the provider's behalf; this does not postpone statutory obligations that have already arisen.

Authors', contributors' and operators' responsibilities depend on their actual roles. Merely publishing code or contributing changes does not automatically make someone the service provider, data controller or guarantor for other instances. Anyone who actually operates an instance or otherwise bears legal responsibility is assessed by their conduct. Self-hosted instances must have terms provided separately by their operators; these terms do not automatically form contracts on their behalf.

## 2. Service features and open-source licence

| Feature | Scope in the candidate branch | Data and availability notes |
| --- | --- | --- |
| Search, lyrics, audio and MVs | Aggregation, resolution, proxying or direct access to third-party resources | Subject to upstream permissions, regions, interfaces and network conditions |
| Favorites, playlists and player settings | Primarily browser storage | No general cross-device cloud backup or promise of permanent retention |
| Recommendations, Auto DJ and radar | Experimental personalisation, entity feedback and some sync paths | Default settings, deletion and remote radar routes still have limitations; favorite events may send embedded cover data to a shared-track catalogue; see the Privacy Policy |
| Local music, downloads and comments | No upload path was found for local audio file contents, but metadata and embedded artwork may be sent with events; current comment / reply / like writes are local simulations | A “Publish” button does not prove publication upstream; no media rights are granted |
| API | Access through available endpoints and quotas | May be adjusted in accordance with the law; no additional guarantee of compatibility with future versions or service levels |

These descriptions do not guarantee that the older `main` or any live instance implements the candidate branch's features. Before use, an instance must explain its version, available features and necessary technical requirements. Having promised a feature that has not been implemented, the operator cannot avoid responsibility merely by saying that “the code governs”.

The root and player `LICENSE` files at candidate commit `a75f5cb` both use MIT. On the older `main@ce443c8`, only the player's MIT licence is verifiable; no root `LICENSE` was found, and some older metadata contains inconsistent statements. Licensing must be assessed version by version and component by component against the actual licence text, rather than inferred for all historical code. These hosted-service terms do not revoke rights granted by MIT, and nonprofit status is not a blanket prohibition on commercial use of MIT-licensed code. Rights in dependencies, trademarks and media content must be assessed separately.

## 3. Eligibility, accounts and security

The minimum age for using the service is 16. Minors must also meet the legal-capacity and guardianship requirements where they are located. The project does not claim to have verified age through Epomail. Users acting for organisations must have the relevant authority.

Epomail provides identity services; Sonic does not require you to submit your Epomail password to Sonic. Take reasonable care of devices, sessions and API credentials, and do not steal or sell others' credentials or publicly disclose keys. Use of a credential does not make you irrebuttably liable for every unauthorised act. Responsibility depends on each party's fault, including intent or negligence, the actual circumstances and applicable law.

Sessions in the candidate branch default to 30 days. Signing out, token expiry and server-side revocation are separate operations, and revocation depends on configuration and request outcomes. The older `main` still has paths that handle credentials through URLs and browser storage; protections in the candidate branch must not be assumed to exist in the older version. If credentials appear in URLs, browsing history, logs or screenshots, stop sharing the affected material and contact the service email address. Do not submit real production credentials to test a deployment whose necessary safeguards are not yet in place. Do not put passwords, complete tokens or private information in public Issues.

## 4. Operational limits of a free test service

Individual maintenance means that time and resources are limited. The project makes no additional promise of round-the-clock human support, a particular uptime, commercial repair deadlines, continued feature additions, a complete music catalogue or permanent operation. Do not use it as a production-critical system, your only archive or a reliable backup. These limits do not exclude supply, conformity, necessary security updates or remedies required by law.

Network failures, upstream changes, resource limits, maintenance and security incidents may affect the service. Audio quality, previews and source labels depend on the resources actually available. Technical playability does not establish that rights have been licensed.

The operator may lawfully adjust, suspend or discontinue features in response to upstream interfaces being withdrawn or changed, compatibility or security issues, legal requirements, or an unsustainable resource burden. Measures must be proportionate to the actual reason. Ordinary changes must explain their effects and allow a reasonable opportunity to preserve or request data; in emergencies, action may precede an explanation to the extent permitted by law. Mandatory notice, termination and remedy requirements are not removed by limited resources or a qualification such as “where reasonably practicable”. Special rules appear in section 11.

## 5. Content, learning, testing and personal data

Rights in music, recordings, lyrics, covers, MVs and third-party comments belong to the respective rights holders. The project grants no music-catalogue licence and does not guarantee that third-party interfaces are licensed open interfaces. Personal, nonprofit, educational or “testing only” use does not automatically qualify for a copyright exception; applicability depends on local law and the particular use.

Testing should prioritise clearly labelled synthetic data, your own test accounts and licensed content. Do not bypass payment, access or copyright protections, or treat downloading or cross-source matching as authorisation for redistribution, public communication or extension of a membership licence. Importing or downloading does not expand your existing content rights.

You retain the rights in content that you lawfully own. You permit processing only to the extent and for the period necessary to perform the functions you request, without granting a perpetual, irrevocable licence for advertising, model training or arbitrary reuse. This functional permission does not replace a lawful basis for personal data processing. You are legally responsible for your own unlawful acts, but are not subject to a blanket indemnity for the operator's own fault, whether intentional or negligent, all third-party claims or all legal fees.

The purposes, bases, recipients and retention limits for data are set out in the [Privacy Policy](/en/privacy-policy/). Accepting these terms is not consent to optional profiling; turning recommendations off, stopping use or exercising the right to erasure does not waive existing rights.

## 6. Third parties and independent deployments

Third parties may change their services, terms and access rules. When using third-party services, comply with conditions that actually apply and have been validly presented. The project does not grant rights or guarantee conduct on their behalf, but remains responsible for its own choices, disclosures and processing for which it is legally accountable.

An audio proxy cannot conceal every network connection. MVs, images, fonts, avatars and direct content may disclose IP addresses and other information to external services. This is not an anonymity tool. See [Third Parties & Transfers](/en/sub-processors/).

Self-hosting operators are responsible for the processing they determine under applicable law. Purely personal testing on your own device must be assessed separately from offering a public service. The open-source licence does not require the author to host, audit, certify compliance for, or assume operational responsibility for other instances. Actual joint decision-making or participation in processing remains subject to legal assessment.

## 7. Reasonable use and enforcement

Do not attack systems, steal accounts, bypass access restrictions, infringe others' rights or clearly abuse public resources. Lawful API use, learning in your own environment and responsible issue reporting are not categorically prohibited simply because they involve “testing”. Publicly available code does not authorise testing other people's systems. See the [Acceptable Use Policy](/en/acceptable-use/) for details.

The operator may rate-limit, suspend or terminate use according to severity and necessity, and must explain the reasons and provide a review channel as required by law. Emergency security measures need not follow every escalation step. Information whose disclosure is prohibited by law or would specifically undermine security may temporarily be withheld to the extent permitted, without removing non-waivable appeal rights.

To report unlawful content or an infringement of rights, send the relevant URL or content identifier, specific reasons, any necessary explanation of your rights and effective contact details to `admin@epocanvas.com`. You need not disclose private information publicly to make a report. The operator may request proportionate additional information and take measures in accordance with the law. Whether the Digital Services Act and its intermediary-service rules apply depends on the actual service activities. Music aggregation, nonprofit status or being a small project does not automatically confer every exemption, nor does the project promise indiscriminate monitoring of all content.

## 8. Stopping use, data retention and deletion

You may stop using the service at any time. To terminate the service relationship, send a clear statement to `admin@epocanvas.com` or use another method the instance provides as required by law; then sign out and clear device data as needed. Closing an Epomail account is separately governed by that identity service's rules and does not automatically delete data already processed by Sonic.

Profile reset in the candidate branch is neither complete deletion nor a complete export, and corresponding remote tools for exercising data rights have not been verified in the older `main`. Your current identity, pre-sign-in identifiers, radar data, search aggregates, external recommendation services and backups may need separate handling. Send requests for comprehensive data handling to `privacy@epocanvas.com`; see the [Privacy Policy](/en/privacy-policy/) for the limits. Service closure does not remove obligations to handle existing data lawfully.

Where the law requires the return of non-personal content you provided or created, it must, within the applicable scope, be made available on request free of charge, within a reasonable period and in a commonly used, machine-readable format, and its further use must cease as required by law, subject to statutory exceptions. This obligation grants no rights in third-party music and is not the same as the GDPR rights of access or portability. Local files may be lost through device failure, browser clearing or version changes. Keep copies of important content that you are entitled to retain; this reminder does not exclude the operator's statutory liability.

## 9. Contact, notices and appeals

Service matters and enforcement appeals: `admin@epocanvas.com`; privacy and data requests: `privacy@epocanvas.com`. General support is handled reasonably according to the matter and available resources, with no additional commercial customer-service deadline. Statutory response periods must still be met.

Material information must be effectively communicated through appropriate channels. Where the law requires a durable medium, it must be provided by email, a document or another means that can be retained and cannot be unilaterally altered, not solely through a webpage that can be changed at any time. You may seek remedies directly from supervisory authorities or courts without first negotiating internally. The email addresses proposed in the current documentation were not confirmed as announced in the reviewed upstream source, and no emails were sent to verify delivery during this review. The operator must confirm contact channels before adopting these terms and ensure they actually work.

## 10. Warranties and limits of liability

The free test service is provided as actually available, without additional guarantees of continued availability, fitness for a particular purpose, accuracy of every result or freedom of all third-party resources from rights disputes. These descriptions must not deny service standards and remedies required by law. MIT's code-warranty exclusions and hosted-service liability must be assessed separately; MIT does not remove the operator's data protection or consumer obligations.

To the extent permitted by applicable law, liability for losses caused by ordinary negligence in breach of obligations under the service contract is limited to typical losses reasonably foreseeable when the contract was concluded. No additional liability is assumed for purely indirect loss of commercial profits or goodwill to the extent that liability for such loss may lawfully be limited. This provision does not limit non-excludable consumer compensation or remove core service obligations. Causation, each party's fault, including intent or negligence, the burden of proof and reasonable mitigation are governed by applicable law; this does not shift the entire burden of proof to you.

The liability limits do not apply to intent, fraud, gross negligence, death or personal injury for which liability arises by law, express guarantees assumed under law, liability under Article 82 of the GDPR, or any other liability that cannot validly be limited. There is no universal zero-compensation rule or arbitrary fixed monetary cap, and loss of personal or local data is not automatically excluded. Legal responsibility does not amount to a no-fault guarantee against every failure or third-party act; being free or nonprofit is not a basis for exemption.

The terms themselves do not create a limited-liability entity for the author or shield personal assets. They do not require the author to give a personal guarantee, buy particular insurance or assume responsibility for every independent deployment. Responsibility depends on applicable law, actual roles and valid agreements; public-benefit testing is not a general exemption.

Terms that are unfair to consumers and legally non-binding have no effect. The rest of the contract continues only to the extent that it can lawfully stand independently; different wording must not reimpose an invalid limitation.

## 11. Consumer rights, governing law and jurisdiction

### 11.1 Conditions for applicability

Whether consumer rules apply depends on whether the operator acts in a business or professional capacity, whether the user acts for non-professional purposes, the contract's content, geographical connections and applicable law. Being an individual, free, nonprofit or open source does not automatically establish either applicability or exemption. Under applicable national laws implementing the Digital Content and Digital Services Directive and the Consumer Rights Directive, contracts without monetary payment may also fall within scope where users provide or undertake to provide personal data. Processing solely to supply the service or meet legal obligations, without any other purpose, and certain free and open-source software require separate assessment of their respective exemption conditions. Personal data is not a commodity whose protection can be waived, and contract rules cannot replace a basis for data processing.

### 11.2 Withdrawal, conformity and remedies

Where a statutory right of withdrawal applies, you can generally withdraw without giving a reason within 14 days after concluding the contract. Sending a clear, unambiguous statement before the period expires is effective. If the operator failed to provide the required withdrawal information, the period may be extended by up to 12 months after the original period ends; if the information is supplied during that extension, the applicable 14-day period then runs under the relevant rules. You may send a statement to `admin@epocanvas.com`; no prescribed format is required, and you need not sign out or delete your account. Before the contract is concluded, the operator must provide complete withdrawal information and the statutory model form and online withdrawal function where required. An online withdrawal function must be prominently displayed, clearly labelled with words such as “Withdraw from contract here” or another equally unambiguous formulation, easy to access and continuously available throughout the withdrawal period. It must let you review the contract and receipt details, confirm the withdrawal separately, and receive without undue delay on a durable medium an acknowledgement containing the statement and the date and time of submission. This paragraph is not evidence that the form, interface or receipt mechanism is implemented. Signing in does not necessarily mean a continuing service has been fully performed, and the withdrawal exceptions for digital content and digital services must not be conflated. Contract withdrawal, ordinary termination, withdrawal of profiling consent and data-erasure requests are handled separately.

For a clear email statement, you may write: “I withdraw from my service contract with Sonic”, adding the instance, contract date if known, the account or email identifying the contract, and contact details for confirmation. Do not attach passwords or tokens. This is a practical example of a statement, not the statutory model form, and does not restrict other valid methods.

Where applicable consumer law requires supply, conformity or necessary updates, including security updates, those rights are not removed by the service being “experimental” or free. In the event of failure to supply or lack of conformity, you may contact the service email address to request supply or correction as required by law and, where the statutory conditions are met, terminate the contract or obtain an appropriate price reduction, refund or other remedy. You are not required to wait for unlimited repair attempts for the same serious problem. Refunds concern only amounts actually due for repayment; they do not assign an invented monetary price to personal data. Amounts legally due must be refunded within the statutory period, whose commencement does not depend on the operator's discretionary approval.

### 11.3 Feature changes and disputes

Where the rules on digital services apply, changes beyond those necessary to maintain conformity must have a valid reason stated in these terms, involve no additional charge and be clearly communicated. If a change adversely affects access or use by more than a minor degree, advance notice of the change, its timing and the user's rights must be given on a durable medium as required by law. You may terminate free of charge as provided by law within 30 days from receipt of the notice or the change taking effect, whichever is later. The corresponding exception applies if an unchanged version that remains in conformity is lawfully made available for continued use without additional charge. These rules do not automatically permit arbitrary service closure or remove other mandatory protections.

Applicable law and competent courts are determined by actual connecting factors and mandatory law. The operator's location has not been verified, so Taiwanese law and Taipei courts are not preselected as the sole choice. Where EU consumer protection applies, a choice of law must not deprive consumers of non-derogable protections at their habitual residence, and consumers need not give up courts in which they are legally entitled to sue. Data protection complaints, judicial remedies and compensation rights remain separately available.

## 12. Revisions and effect

The date on this page is a revision date, not a verified live effective date. Before adopting these terms or making material changes, an instance must explain the version, content, reasons and actual effective time, provide contract confirmation as required by law and obtain renewed acceptance where necessary. Silence, signing in or continued use alone cannot retrospectively increase liability or discharge obligations that have already arisen. Users who disagree with future conditions may stop using the service or terminate as provided by law, without affecting existing rights. The operator must retain the text actually adopted and records of notices; repository history alone cannot establish which version a user received.

## 13. Document relationships and contact

These terms govern service conditions, the [Privacy Policy](/en/privacy-policy/) explains personal data processing, and the [Acceptable Use Policy](/en/acceptable-use/) explains conduct and public-resource boundaries. They are not blanket authorisation to process data, and technical guides or older versions cannot expand the processing purposes already disclosed. See the [Overview](/en/overview/) for how the documents relate; mandatory law takes precedence.

Service: `admin@epocanvas.com`; privacy: `privacy@epocanvas.com`; code: [shijianus/sonic](https://github.com/shijianus/sonic). For other instances, contact their actual operators.
