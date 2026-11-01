---
title: Acceptable Use Policy
description: The Sonic Acceptable Use Policy — scope, prohibited conduct, resource limits, the enforcement ladder, the zero-tolerance channel and appeals.
---

**Effective date: 1 November 2026｜Version: 1.3**

This policy sets the behavioral boundaries for using the Sonic service (hereinafter "the service") and describes prohibited conduct and the operator's enforcement measures. This policy is the standard of conduct referred to in section 7 of the [Terms of Service](/en/terms-of-service/) and binds you upon use of the service; if you do not agree, stop using the service.

![The Sonic enforcement ladder: notice, throttling, suspension and termination as four graduated actions, followed by evidence preservation and legal referral; the zero-tolerance channel for child protection and terrorist content applies immediately; an appeal loop lets the affected party seek review](/images/sonic/aup-ladder.svg)

*Figure: the operator applies enforcement measures on a graduated ladder according to severity, recording the reason at each step; the zero-tolerance channel bypasses the ladder; any enforcement action may be appealed.*

## 1. Scope

This policy applies to your use of the service in any form, including:

1. Every function of the web player (search, playback, lyrics, recommendations, downloads, local music import);
2. Connections through the open API, including your own third-party clients and scripts;
3. Self-hosted instances (self-hosted operators may adapt this policy for their own use, but not below the requirements of the law at their location).

## 2. Prohibited conduct

### 2.1 System and interface abuse

1. Circumventing or breaking rate limiting, signature verification, the circuit breaker, SSRF defences, the domain allowlist or other technical protection measures;
2. Forging API keys, replaying revoked key identifiers (jti), stealing another person's session or keys, or bypassing fail-closed verification in any way;
3. Mass-harvesting the service's search results, lyrics or playback addresses with automated scripts for resale, redistribution or mirror datasets unrelated to the service's functions;
4. Probing, scanning or otherwise obtaining the service's internal topology, service keys, key material or non-public endpoints;
5. Using the service's proxy endpoints (`/api/music/stream`, `/api/sonic/forward` and others) as a general-purpose network proxy for targets unrelated to music playback.

### 2.2 Content and rights

1. Using the service's interfaces to crack, bypass or interfere with any music platform's payment and copyright protection mechanisms;
2. Disseminating content that infringes copyright, trademark, portrait or personality rights;
3. Uploading or spreading unlawful content, including child sexual exploitation material and terrorist propaganda;
4. Impersonating any person or organization, or using the `epocanvas` and `Sonic` names and marks to suggest an endorsement the service has not given;
5. Uploading unlawful files into the local music import or download functions for distribution through the service.

### 2.3 Rights of others

1. Interfering with or disrupting the normal operation of the service or any related system, including deliberately tripping the circuit breaker and degradation mechanisms;
2. Harassing, defaming or attacking the operator, upstream providers or other users;
3. Using the service for any purpose that violates the law of your location or upstream terms of service;
4. Selling, subletting or providing access to the service for commercial resale purposes.

## 3. Resource usage limits

| Item | Limit | Handling when exceeded |
| --- | --- | --- |
| Anonymous requests | 240 per minute (default) | Rejected at the edge (429); not recorded as a violation |
| Authenticated requests | 600 per minute (default) | Rejected at the edge (429); sustained excess enters the enforcement ladder |
| Authentication endpoints (sign-in／key issuance) | 30 per minute per IP | Rejected at the edge (429) |
| Behavioral event reporting | At most 50 events per batch, 64 KB per body | The oversized request is rejected as a whole |
| Audio streams | Through the edge proxy, or direct mode at your explicit request | Abnormal concurrency enters the enforcement ladder |

Normal personal use never approaches these limits; rate limiting exists for abuse prevention and service stability, not as a penalty. Rate-limit parameters are deployer-configurable; the actual values of a self-hosted instance follow its configuration.

## 4. Enforcement ladder

Upon discovering a violation, the operator applies the following measures according to severity, recording the reason for each step:

1. **Notice**: a warning in the player stating the reason;
2. **Throttling**: lowering the request quota of that account or key;
3. **Suspension**: temporarily blocking that account's sessions and API keys (via the `jti` revocation list or instant revocation), with data retained for the time being;
4. **Termination**: ending the right of use; behavioral data destroyed when its retention period (90 days, minimum 7) expires;
5. **Evidence preservation and legal referral**: where the law requires, records are preserved to the necessary extent and provided to competent authorities through legal process.

The following situations bypass the graduated ladder; the operator may suspend immediately and refer or report: child sexual exploitation material, terrorist propaganda, and ongoing attacks on the system.

## 5. Appeals and reports

- **Appeals**: if you believe an enforcement action is mistaken, write to `admin@epocanvas.com` stating the account and the circumstances; the operator reviews and replies within a reasonable time. Appeals against urgent enforcement (the zero-tolerance cases in section 4) are likewise accepted, and review does not delay remedying a proven mistake against you.
- **Reports**: anyone who discovers conduct violating this policy may report it to the mailbox above; the identity of a reporter is kept confidential until the report is verified. Reports involving child protection are not bound by that confidentiality promise and follow legal procedure.

Enforcement under this policy does not exempt the violating person from liability under the law.
