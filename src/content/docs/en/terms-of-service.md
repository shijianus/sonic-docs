---
title: Terms of Service
description: The Sonic Terms of Service — acceptance, account rules, service description, limitation of liability, governing law and dispute resolution.
---

**Effective date: 30 October 2026｜Version: 1.0**

These terms are the agreement between you and the operator of the instance you use, concerning the use of the Sonic service (hereinafter "the service"). By completing sign-in or otherwise using the service, you confirm that you have read and accepted the entire content of these terms; if you do not agree, do not use the service.

These are standard terms, published in full for your review, with historical versions archived in the open-source repository. Your electronic consent has the same effect as a signed paper document. Rights that applicable law does not permit to be excluded or limited by standard terms are unaffected by these terms. The Simplified Chinese version of this site's legal documents is the authoritative version; the English and Japanese versions are reference translations, and in case of doubt the authoritative version prevails.

![The contract lifecycle of the Sonic Terms of Service: electronic acceptance (signing in equals consent) → performance (account security, your content, limitation of liability) → amendments (material changes announced in advance) → termination (leaving, one-click profile erasure), resting on governing law and the data protection baseline](/images/sonic/tos-contract.svg)

*Figure: the lifecycle of the contract from formation to termination. Electronic consent has the same effect as writing; account, content and liability clauses are in sections 3, 5 and 10; amendments in section 12; termination in section 8; governing law and dispute resolution in section 11.*

## 1. Definitions

1. **The service**: all functions running on a Sonic instance, including the web player, the edge gateway, the local protocol engine, the open API and related components.
2. **Operator**: the individual or team that deploys and runs the instance you use. For the hosted instances (`sonic.epocanvas.tech`, `sonic.epocanvas.com`), the operations team; for self-hosted instances, their deployer.
3. **You (the user)**: the natural person or organization that signs in to or otherwise uses the service.
4. **Formation of the contract**: you form a contract with the operator of the instance at which you sign in. These terms are a common template: hosted instances apply them directly; self-hosted operators may adapt them for their own sites and must perform the notice duties required by the law applicable at their location.

## 2. Description of the service

The service provides multi-source aggregated search, word-level lyrics, quality-tiered playback, smart recommendations with Auto DJ sequencing, behavioral event management, edge-proxied audio streaming and other functions; the functions actually available depend on what the instance enables. The service is a search, aggregation and playback tool; it stores and hosts no music files; audio content is obtained from official CDNs and upstream open interfaces.

The service is built on an open-source project and remains open-source: the source code is public and auditable, and you may deploy it yourself to obtain the same capabilities. The software is provided "as is", and its license is consistent with the liability terms of this agreement (section 10).

## 3. Accounts and security

1. **Sign-in method**: the service signs you in with an Epomail account over OAuth 2.0 (PKCE) and maintains no separate registration system; the agreement between you and Epomail is governed by that service's terms.
2. **Eligibility**: you must be at least 16 years old; where the law of your location sets a lower age of consent for information society services (no lower than 13), that age applies, and children always require the consent of their guardian. Age is taken from your Epomail account data; the service maintains no separate age-verification mechanism.
3. **Credential care**: you are responsible for safeguarding your Epomail credentials, API keys and session security. Operations performed with your credentials are presumed to be your own acts.
4. **Session mechanism**: a successful sign-in issues an `HttpOnly; Secure; SameSite=Lax` session cookie; API keys are never written into URLs, query parameters or localStorage. You may sign out at any time; signing out immediately revokes the current session and its key identifier (jti).
5. **Key issuance**: API keys use the HMAC-SHA256 versioned signed format; unsigned or revoked keys are always rejected. Re-issuing a key requires presenting the current valid key.

## 4. Provision and change of the service

1. **Availability**: the operator makes reasonable efforts to keep the service available, but promises no specific availability rate, buffering latency or recovery time, and provides no service level agreement (SLA).
2. **Degraded mode**: when the data-plane node is offline or timing out, the edge layer automatically switches to degraded mode (connecting directly to public lyrics and search interfaces) and the interface shows a degradation notice; some functions may be unavailable during degradation. This is designed failover behavior, not a breach.
3. **Feature changes**: the open-source project keeps evolving; functions may be added, adjusted or removed; material changes affecting data deletion capabilities will be announced in advance.
4. **Maintenance and interruption**: the operator may suspend part or all of the service for upgrades, repairs or abuse handling; unavailability caused by failures of Cloudflare, upstream music interfaces or CDNs is not a breach by the operator.

## 5. Your content and behavioral data

1. **Favorites and preferences**: the favorites, playlists and player preferences you build are stored in your browser's local storage; they are deleted when you clear browser data, and the operator is not responsible for their loss.
2. **Behavioral events**: to provide recommendations, the service records behavioral events when you play, complete, skip, favorite or reject tracks (signal categories and weights are public in the source code). You may destroy all behavioral records at any time with the "one-click profile erasure" function (or `DELETE /api/sonic/events`); if you turn off event reporting or use local／incognito playback, no new event records are produced.
3. **Content responsibility**: you are responsible for content you actively submit (such as custom playlist names or API call behavior); disputes and legal liability arising from that content are yours.
4. **Music content**: the rights in recordings, lyrics and covers belong to their respective owners. The service grants no sublicense to any music content; your responsibility to listen lawfully in your jurisdiction is your own.

## 6. Third-party services

1. **Upstream music sources**: search, playback addresses and lyrics are obtained from the official open interfaces of NetEase, QQ, Kugou and Kuwo and from public lyrics libraries such as AMLL and LRCLIB; third-party interfaces may change, throttle or cease service, and the operator gives no assurance of upstream availability.
2. **Edge proxy**: audio streams are obtained through the edge proxy by default, so upstream CDNs do not see your IP address; if you actively use the `?mode=redirect` direct mode, your browser connects directly to the official CDN.
3. **Authentication**: Epomail is the identity provider of the service; its data processing is described in [Third Parties & Transfers](/en/sub-processors/).
4. **Third-party terms**: when you use the services above, their own terms also bind you.

## 7. Acceptable use

You must observe the entire [Acceptable Use Policy](/en/acceptable-use/), including the prohibitions on abusing interface resources, attacking the system, disseminating unlawful content or interfering with others' use. On violation, the operator may handle the matter under the procedures of that policy, up to termination of the right of use, and preserve evidence to cooperate with competent authorities as required by law.

## 8. Retention, removal and termination of use

1. **Your termination**: you may stop using the service at any time; erase behavioral records with "one-click profile erasure" and revoke sessions by signing out. The closing of the Epomail account itself follows Epomail's rules.
2. **Behavioral records**: behavioral events are kept in the data-plane SQLite store and destroyed immediately upon your deletion or erasure request; no long-term commercial profile is built automatically.
3. **Operator termination**: if you violate the [Acceptable Use Policy](/en/acceptable-use/), the operator may suspend or terminate your right of use under that policy.
4. **Statutory retention**: where retention is required by law or judicial process, the operator may defer deletion to the necessary extent and handle it under legal procedure.

## 9. Notice of and remedy for enforcement actions

Before suspending or terminating your right of use under "Acceptable use" or the preceding section, the operator shall notify you and give you an opportunity to explain or remedy, except in urgent circumstances (such as an ongoing attack). If you believe an enforcement action is mistaken, you may appeal under the "Appeals" section of the [Acceptable Use Policy](/en/acceptable-use/), and the operator shall review and reply within a reasonable time.

## 10. Disclaimer and limitation of liability

1. **As-is provision**: the service (including its software) is provided "as is" and "as available", without any express or implied warranty, including warranties of merchantability, fitness for a particular purpose and non-infringement; this is consistent with the disclaimer scope of the software's MIT license.
2. **Effect boundary**: the preceding item, and any other term exempting or reducing the operator's liability, increasing yours, or limiting your rights, does not take effect to the extent it is unconscionable in the circumstances or not permitted by applicable law.
3. **Limitation of liability**: to the maximum extent permitted by law, the operator's aggregate liability to you is limited to the higher of the amounts you actually paid to the operator in the past 12 months (usually zero for a free service) and 100 US dollars. The operator is not liable for indirect damages, loss of data, loss of business or damage to goodwill.
4. **Statutory liability unaffected**: liability that applicable law does not allow to be excluded or limited by agreement (including the operator's breach of its data protection obligations) is not exempted or limited by the preceding item.
5. **Force majeure**: for service interruption and data loss caused by natural disasters, government action, backbone network failures, large-scale cyberattacks, or outages of upstream interfaces or CDNs, the operator is not liable, having made reasonable efforts.

## 11. Governing law, dispute resolution and data protection supervision

1. These terms are construed, and their validity and performance determined, under the law of the operator's location: for the hosted instances, the law of Taiwan; for self-hosted instances, the law of their deployer's location.
2. Disputes arising from these terms are first settled by negotiation; failing that, disputes concerning the hosted instances are brought before the Taipei District Court as the court of first instance. Where you are a consumer and the law of your location provides mandatory rules on jurisdiction or consumer protection, those rules prevail.
3. Data protection matters are not lowered by the preceding two items: the service applies the GDPR as the minimum data protection standard for every user (see [Overview](/en/overview/), section 4); users in the European Union and the European Economic Area enjoy all the rights and remedies listed in the [Privacy Policy](/en/privacy-policy/).

## 12. Amendments

These terms may be amended as the service evolves. Material changes will be notified in advance by on-site announcement, and the effective date and version at the top of this page will be updated. Continuing to use the service after a change takes effect constitutes acceptance of the amended terms; if you do not agree, stop using the service and erase or export your data. Material amendments are archived with the version history of the open-source repository.

## 13. Contact

- **Hosted instances**: `admin@epocanvas.com`; privacy and appeals `privacy@epocanvas.com`
- **Open-source project**: GitHub repository Issues (`github.com/shijianus/sonic`)
- **Self-hosted sites**: contact the operator published by that site

---

*These terms, the [Privacy Policy](/en/privacy-policy/) and the [Acceptable Use Policy](/en/acceptable-use/) together form the complete agreement between you and the operator; their order of precedence is in the [Privacy & Terms Overview](/en/overview/). This document is a common template prepared by the open-source community and is not legal advice; operators should consult a lawyer and adapt it to their actual business before formal operation.*
