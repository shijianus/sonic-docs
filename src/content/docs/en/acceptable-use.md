---
title: Acceptable Use Policy
description: Conduct boundaries, system-abuse limits, content and third-party rights, enforcement and appeal channels for Sonic hosted resources.
---

**Revision date: 3 November 2026｜Version: 1.9**

This policy applies to Sonic's actually operated hosted test instances and their public APIs, protecting shared resources, users and upstream services. It sets the conduct rules related to the [Terms of Service](/en/terms-of-service/); if you disagree, stop using the hosted instance. It does not turn a free, nonprofit or open-source project into an unconditional security guarantee, or replace the [Privacy Policy](/en/privacy-policy/) and [Data Processing & Security](/en/data-security/).

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

Simplified Chinese is the root maintenance baseline; the other nine languages are translations. Language priority does not diminish mandatory law or consumers' right to clear, intelligible terms.

![Sonic use boundaries and enforcement path: normal use, resource protection, limits, suspension, termination and review](/images/sonic/aup-ladder.svg)

*Figure: enforcement considers conduct, impact, repetition and risk; the diagram is not a fixed penalty schedule or handling-time commitment.*

## 1. Scope

1. This policy applies to your use of the hosted Sonic web player, public APIs, sign-in, search, playback, lyrics, recommendations and other public endpoints.
2. A self-hosted deployment is an independent instance. Its deployer must determine its own policies, configuration, applicable law and user relationships; this page does not assume operational or contractual obligations on the deployer's behalf.
3. MIT permits copying, modification, distribution and commercial use of code. This policy protects hosted instances and their resources; it is not a universal commercial-use prohibition on the code or all Sonic deployments.
4. The current review found no path uploading local audio Blobs to the server through music import. Lyrics and recommendation features may still send titles, artists, albums, duration or identifiers; see the [Privacy Policy](/en/privacy-policy/).

## 2. Prohibited conduct

### 2.1 System and interface abuse

1. Obtaining, using or sharing others' accounts, sessions, cookies, API keys or service secrets without authorisation; forging credentials; or bypassing hosted-instance access controls such as authentication, rate limits, signatures or SSRF defences.
2. Probing or exploiting hosted-instance non-public endpoints, internal addresses or credential material without authorisation, or obtaining or disclosing others' private data. Public search suggestions must not be used to collect, expose or verify other people's data.
3. Consuming shared resources by mass-harvesting search results, lyrics, playback addresses or interface responses for unauthorised resale, mirrors or datasets. Normal personal playback, moderate API use and authorised integrations are not prohibited by this rule.
4. Using the hosted proxy as a general-purpose network proxy, scanner or attack relay, or deliberately causing unnecessary concurrency, traffic, errors or cache pressure.

This policy does not prohibit reading source code, testing with synthetic or authorised data on your own local instance, or responsibly reporting vulnerabilities. Active security testing of public instances requires appropriate prior authorisation and must avoid affecting others, obtaining their data or expanding exploitation. Send a minimal reproduction privately to `admin@epocanvas.com`; do not publish real credentials.

### 2.2 Content and rights

1. Do not use the hosted service to commit or facilitate piracy, evade payment or copyright protections, or infringe copyright, trademark, image, personality, privacy or other rights.
2. Do not use the service to disseminate unlawful content, malware, child sexual exploitation material or unlawful terrorist propaganda, or unlawfully or without authorisation disclose others' credentials or personal data. This does not prohibit normal sign-in or necessary private rights requests; importing local music is not uploading files to Sonic.
3. Do not impersonate people or organisations, or use the `Sonic`, `Epomail` or `EpoCanvas` names and logos to imply unauthorised endorsement, cooperation or security certification.
4. Do not submit search terms, comments or reports that you know contain others' private information. Public comments may include other people's names, avatars and text; writing a local comment to localStorage does not establish permission to publish it.

### 2.3 Others' rights and service stability

1. Do not harass, threaten, defame, stalk, discriminate against or attack operators, upstream providers, contributors or other users, or expose others' data through public caches or suggestion features.
2. Do not interfere with the availability, integrity or security of hosted instances, upstream content services, identity services or networks, including deliberately triggering circuit breakers, degradation or resource exhaustion.
3. Do not violate the law applicable where you are located or use content interfaces contrary to upstream service rules. Licensed code use does not automatically grant rights to third-party content, accounts or music.

## 3. Resource limits

Hosted instances may set rate limits by signed-out or authenticated status, IP address, session, interface and event batch. Actual values depend on configuration; they are not a uniform contractual promise for every deployment. Exceeding a limit may result in `429`, delays, rejection or temporary restrictions, and does not necessarily indicate misconduct.

Use reasonable personal request rates. Avoid concurrent scraping, repeated retries, prolonged occupation of audio streams and unnecessary behavioural-event reporting. Rate-limit parameters, credential revocation and data retention can differ because environment variables, Compose and source defaults differ; runtime state cannot be inferred from this page alone.

## 4. Enforcement ladder

The operator may take one or more measures according to the conduct's impact, intent, repetition, data involved and urgency, recording necessary reasons:

1. Remind you of the rules or require the conduct to stop;
2. Limit interfaces, concurrency, caching, event reporting or other resource use;
3. Suspend accounts, sessions, credentials or network sources; immediate revocation depends on the instance's revocation storage, switches and successful requests;
4. Terminate access to the hosted instance or prevent further use of affected endpoints;
5. Retain necessary records and provide them to authorised recipients to the extent required by applicable law, a valid request or protection of others and systems.

For ongoing attacks, credential theft, serious security threats or clearly unlawful content, necessary temporary measures may be taken before explanation and review. Policy enforcement does not replace liability that the person responsible may bear under law. It also does not promise automatic police reporting, fixed retention periods, a staff response within 24 hours or permanent deletion of all related records.

## 5. Appeals and reports

- **Appeals**: if you dispute a restriction, suspension or termination, write to `admin@epocanvas.com` with the account, time, relevant endpoints and reasons. The operator will review within a reasonable period as resources permit, without affecting applicable statutory periods, rights or remedies. No fixed deadline, dedicated team or assured restoration of access is promised. Do not send passwords, complete tokens or unrelated personal data.
- **Reports**: use the same address to report suspected abuse, infringement, security issues or harm to others. Provide necessary facts without forwarding unlawful or sensitive material. The operator will decide whether to act or disclose to competent authorities based on risk, data minimisation and applicable law.

For privacy rights, deletion requests and data-breach notifications, use `privacy@epocanvas.com`. This policy governs only actual hosted resources; self-hosted instances must provide their own operator and appeal channels.
