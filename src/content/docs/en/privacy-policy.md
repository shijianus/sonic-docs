---
title: Privacy Policy
description: Data sources, processing bases, browser and remote storage, retention and deletion limits, recipients and individual rights for Sonic's nonprofit test service.
---

**Revision date: 2 November 2026｜Version: 1.8**

This policy explains personal data processing by Sonic's hosted test instances and this project's documentation site. The project is individually maintained, free and nonprofit, for learning and public-benefit testing; these characteristics do not remove applicable data protection obligations. We value your privacy and use rigorous, verifiable data protection requirements to guide design and continuous improvement. Drawing on GDPR principles of data minimisation, purpose limitation, transparency and user control, we aim through reasonable efforts to provide a high level of protection proportionate to actual risks and reduce unnecessary collection, retention and transmission.

This objective is not a claim of EU certification or full compliance with the GDPR and every Member State's laws, nor a guarantee of absolute security, freedom from data breaches or loss, or immediate and complete deletion. Actual protection depends on the deployed version, configuration and third-party processing; the policy distinguishes measures verified in the reviewed code from unverified deployment details, known risks and operational limits. Reasonable efforts do not reduce applicable legal duties, and risk disclosures do not require you to accept unlawful processing or waive rights. Reading this policy, signing in, accepting the Terms of Service or continuing to use the service is not consent to optional profiling.

On 2026-11-02, the public `main@ce443c8` (2026-10-27 UTC) and the newer public release-candidate branch `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) of `shijianus/sonic` were reviewed. The technical descriptions below are based on the candidate branch, with differences from the older main branch expressly identified. There is no official GitHub Release, and the version running live has not been verified. Source-code capabilities, defaults and sample configurations do not establish the actual deployment. Simplified Chinese is this site's maintenance baseline; the other nine languages are translations for reference. Language priority does not exclude mandatory law or clear, intelligible notice.

:::caution[Current limitations on applicability]
The controller's true identity, actual infrastructure nodes, recipient arrangements and complete retention periods still require confirmation by the operator. The candidate code still has issues involving default-on profiling, public reuse of search terms, avatar requests carrying email addresses and incomplete deletion. Protections in the candidate version must not be presumed to exist in the older main branch. The disclosures below do not make processing without a lawful basis lawful. Necessary notices and safeguards must be in place before lawful collection; optional processing that does not meet the requirements must be disabled rather than leaving users responsible for remediation. This page is not evidence that corrections have been deployed or a certification of live compliance.
:::

![Sonic privacy structure: legal bases, purposes, data minimisation, security and individual rights](/images/sonic/privacy-pillars.svg)

*Figure: protection principles must be implemented in actual features and operational settings, not merely stated in a policy.*

## 1. Scope

This policy is for the `sonic.epocanvas.tech` and `sonic.epocanvas.com` test instances and their APIs that are actually operated by this project and expressly adopt it. It also describes processing that can be verified on the documentation site at `docs.epocanvas.com/sonic/`; merely reading the documentation does not sign you into the player, import music or start player profiling. The documentation site's connections, preferences and search are described in section 4.6; its controller, infrastructure and retention periods still require confirmation against the actual deployment.

Self-hosted instances have independent operators, settings and notices. This policy does not automatically bind every deployer or mean that the author can see data from all instances. Third parties have their own policies for their independent processing; Sonic remains responsible for the collection, receipt, disclosure and integrations it determines itself.

## 2. Who is responsible and how the law applies

The public maintainer account is [shijianus](https://github.com/shijianus), and the project name is Sonic / EpoCanvas. The controller is the operator who actually determines the purposes and means of processing for this instance; code authors, contributors and operators are not necessarily the same parties. A brand or account is not a full legal identity and does not establish where the entity is located.

The available public information is insufficient to verify the controller's legal name, effective contact details, actual deployment countries and representative arrangements where applicable. Before collection, the operator must provide this information and any geographical address required by law. If an EU representative or data protection officer must legally be appointed, their contact details must also be published. The contact addresses proposed in the current documentation are `privacy@epocanvas.com` and `admin@epocanvas.com`; their announcement in the reviewed upstream source was not confirmed, and no email was sent to verify delivery. They do not establish the controller's identity. Before adopting this policy, the operator must confirm and publish usable contact channels. Unconfirmed facts do not postpone rights or obligations that have already arisen.

The GDPR applies according to Article 3 and the actual circumstances, including activities of an establishment in the EU, and the offering of services to people in the EU or monitoring of their behaviour there by entities outside the EU. Nationality, being free or nonprofit, or website accessibility is not the sole test. Elsewhere, the applicable local law governs; the project does not additionally extend all EU regimes into a uniform worldwide contractual guarantee.

Measures must be proportionate to scale, risks and implementation costs. An ordinary individual project does not automatically need a dedicated compliance team, commercial certification or a data protection officer. However, the legal thresholds for an EU representative, processing records, impact assessments and a data protection officer must each be assessed separately; ongoing processing cannot be called occasional merely because there are few users. If necessary safeguards cannot be sustained, the relevant processing must be reduced or suspended rather than dispensing with notices and responses to rights requests.

## 3. Data overview and sources

| Source or action | Data that may be processed | Purpose and destination |
| --- | --- | --- |
| Visiting the website or API | IP address, time, request path, browser and connection metadata | Establishing connections, rate limiting and security; the instance and infrastructure may process it |
| Reading documentation and page preferences | `Accept-Language` request header, theme, sidebar state and documentation search input | Language entry and local reading functions; search-index requests still create connection records, see section 4.6 |
| Epomail sign-in | User identifier, email address and verification flag, nickname, avatar URL, role, session and token identifiers | Requested identity functions; supplied by Epomail, with some data stored in the browser |
| Search and content requests | Raw search text, track / artist / album / MV identifiers, lyrics matching and resource requests | Returning the requested content; may be sent upstream |
| Candidate-version personalisation and Auto DJ | Pseudonymous identifier, playback progress, skips, favorites, dislikes, searches and context | Optional profiling; defaults are not consent, see section 5 |
| Local use and candidate-version radar | Favorites, playlists, settings, local audio and embedded cover artwork; radar albums and signals | No local audio file-content upload path was found; some metadata, cover data and context may be sent and may enter the shared-track catalogue |
| Public content such as upstream comments | Other people's nicknames, avatars, identifiers, text, times and images | Displaying requested content and caching it; a public source does not make it anonymous |
| Contact, reports and rights requests | Contact details, explanations, necessary evidence and handling records that you provide | Responding to requests, meeting statutory obligations and handling specific disputes |

Basic requests require the relevant connection information; without sign-in data, functions requiring identification are unavailable. Optional profiling is not necessary for basic search or playback. Do not submit passwords, complete tokens, identity documents, health information or other people's private data in queries, playlists, messages or public Issues. This reminder does not shift responsibility for preventing excessive collection to users. Music preferences and queries may indirectly reveal sensitive characteristics and cannot categorically be treated as non-personal data.

Sign-in data comes from Epomail; comments and related data come from content providers and public sources. Where Article 14 of the GDPR applies to indirect collection, sources, categories and other necessary information must be provided within the statutory period, or applicable exceptions and safeguards must be documented. Public visibility or a user's playback request alone does not establish that third-party comment authors have consented to Sonic's reuse. See [Third Parties & Transfers](/en/sub-processors/) for specific sources.

## 4. Processing in the code and version differences

### 4.1 Sign-in and sessions

Epomail OAuth in candidate version `a75f5cb` uses state validation and PKCE. `sonic_session` is an HttpOnly signed session cookie with a default lifetime of 30 days; the `sonic_oauth_state` and `sonic_oauth_verifier` transaction cookies last approximately 600 seconds, with Secure set in HTTPS environments. Signing protects integrity; it is not encryption. The credential payload may include an email address and user and role identifiers. These source-code defaults do not establish the actual lifetimes in a live deployment.

The frontend's `auth` local storage retains some user data, including email and avatar information, and has compatibility paths that read legacy sign-in storage. Account data therefore cannot be described as being held only in memory. Signing out clears the current cookies, but immediate revocation of copied or exported credentials still depends on revocation storage, settings and request outcomes. Signing out must not be equated with immediate invalidation of every copy.

The callback and compatibility frontend in the older `main@ce443c8` have paths that pass and store sign-in data and credentials through URLs and localStorage, without the full PKCE, signature-verification and revocation protections described above. Descriptions in the older README must not be treated as implemented features. Deployments whose necessary safeguards are not yet in place should not process real user credentials. If URLs, screenshots or logs contain credentials, do not forward them; contact the operator for handling.
### 4.2 Behavioural events, profiling and search statistics

The following behavioural-event, SQLite-profile and search-statistics paths are verifiable in the candidate version. The same complete implementations were not found in the older `main`, so these features must not be presumed to exist there.

The candidate version links events using email-derived identifiers or browser-generated `anon_` identifiers, processing playback, favorites, dislikes and other behaviour, as well as feedback on artists, albums, playlists and MVs. Recommendation requests may also carry local favorites, recent artists and search context. Being signed out does not mean being anonymous. Hashes and random identifiers can be used to link data and must be treated as pseudonymised personal data; supposed “irreversibility” is not a reason to exclude the GDPR.

Smart search separately accumulates queries, and public search suggestions may display those terms. Turning personalisation off alone does not stop this path. Queries may contain names, contact details or sensitive information; aggregating counts does not itself make them anonymous. The path that generates public suggestions from user queries must be disabled until necessity, a lawful basis, filtering, display thresholds, retention and deletion controls have been addressed.

### 4.3 Browser storage and local files

| Storage | Main contents | Clearing and limits |
| --- | --- | --- |
| `audio`, `library`, `global` and `settings` in localStorage | Queue, favorites, playlists, playback / search history and settings | Until cleared by the user or browser; not a general cloud backup |
| Candidate-version `recommend`, `auth`, radar and legacy sign-in compatibility storage | Toggles, identifiers, dislike records, user data, radar and legacy sign-in state | Some data is used in network requests; not every sign-out action necessarily clears legacy keys |
| IndexedDB `SonicMusicPlayerDB` | Imported music files, metadata, covers and download cache | No local audio file-content upload path was found; embedded cover data URLs may be sent with favorite events; browser clearing may cause permanent loss |
| Candidate-version session and OAuth cookies | Identity sessions and sign-in transactions | See section 4.1; device clearing is not remote deletion |

No upload path was found for local audio file contents, but lyrics matching, favorite feedback and recommendation context may send titles, artists, albums or track identifiers. Embedded artwork extracted as a data URL may also be sent with favorite or unfavorite events and added to a remote shared-track catalogue that can appear in site-wide search or public suggestions. Profile reset does not guarantee removal of this catalogue or optional external search and recommendation indexes; whether the records remain personal data depends on their linkability. Comment / reply / like writes in the candidate version are local simulations; comments read from upstream may contain other people's data and be cached. Interface labels do not establish remote publication or anonymisation.

Playback history in the candidate version automatically retains up to the most recent 100 tracks, and local search history retains up to 20 entries. No separate switch for disabling local playback history was found. Turning off remote personalisation does not turn off these local histories.

Only terminal storage or access that is strictly necessary to carry out playback, sign-in or settings expressly requested by you may qualify for the necessity exemption under electronic-privacy rules. Optional profiling identifiers and nonessential storage or access require prior valid consent. Cookies, localStorage and IndexedDB are not automatically exempt merely because they are “first-party” or stored on the device. Specific requirements also depend on applicable Member State implementing laws.

### 4.4 Networks, logs and external resources

The instance and infrastructure may process IP addresses, paths, times and connection information. Candidate-version rate limiting may use raw IP addresses or identity-derived keys, and the edge may also forward addresses, sessions and context to the configured data engine. Minimised application logs do not mean that hosts, proxies, error logs, Cloudflare or recipients record nothing. No verified end-to-end “zero logs” guarantee exists.

When an alert webhook is configured and an alert is triggered, the receiving service may receive system counts, the release version, timestamps and summaries with credentials redacted, and may also see the sending node's outbound IP address. Standard payloads do not automatically include end-user identifiers or queries, but administrator notes and error messages may still contain personal data; redaction is not full anonymisation. Before enabling the webhook, minimise the content and verify the recipient and the retention and transfer arrangements.

An audio proxy can make upstream services see the proxy's outbound address, but some requests may still carry browser information. MVs, covers, avatars, fonts and direct content can expose IP addresses and other metadata to external services. The code loads Google Fonts and has a path that uses a plaintext email address as a DiceBear avatar seed. The operator should avoid automatic, nonessential external connections and replace that avatar path with local resources or a method containing no email address. Some upstream services use HTTP, so the entire connection chain cannot be described as end-to-end encrypted. See [Third Parties & Transfers](/en/sub-processors/) for actual recipients and optional controls.

### 4.5 Purposes for which data is not used

The project does not pursue the sale of personal data, advertising, cross-site advertising profiling or training of general-purpose AI models. This code review also found no function for Sonic to obtain Epomail email message bodies. Identity sign-in does not grant access to mailbox contents. Recommendation algorithms do not imply that content is sent to general-purpose AI providers; new purposes require separate prior assessment and notice.

The service does not aim to collect special-category data or infer sensitive characteristics. If such data is received unexpectedly, access must be restricted, necessity and applicable conditions assessed, and the data erased or otherwise handled lawfully. General consent or legitimate interests alone cannot satisfy Article 9 of the GDPR. The project cannot guarantee third parties' independent processing on their behalf.

### 4.6 Documentation site reading, preferences and search

The documentation site and player do not use the same storage. The current documentation source and its Starlight / Pagefind components support the following description:

| Feature or storage | Contents and purpose | Retention and transmission limits |
| --- | --- | --- |
| `starlight-theme` (`localStorage`) | Light, dark or system display preference; initialisation may also write an empty value | Until replaced, cleared by the user or evicted by the browser; this key was not found to be used for profiling |
| `sl-sidebar-state` (`sessionStorage`) | Sidebar expansion state, structural identifier and scroll position | Stored within a browser-managed tab session; session restoration may extend it, so this is not a precise deletion time |
| Pagefind documentation search | Input is matched in the browser; static index and result excerpts are requested from this site as needed | No submission of raw input to the player search API or an external search service was found; index paths, visited pages and connection information may still be recorded by hosting networks, so search behaviour cannot be guaranteed untraceable |

The language entry point reads the `Accept-Language` request header and does not set a language cookie for that purpose. No advertising or separate analytics script was found in the current documentation configuration; this does not prove that the hosting network keeps no logs. These preferences serve the reading interface and are not automatically exempt from consent merely because they are first-party: the exemption applies only where the applicable terminal-access necessity test is met; otherwise, obtain consent or disable the access. Clearing documentation-site data does not automatically clear player data on other domains. The actual hosting recipients, controller, log periods and rights contact must still be confirmed before adopting this policy.

## 5. Purposes, legal bases and choices

| Processing | Purpose | Basis and limits where the GDPR applies |
| --- | --- | --- |
| Requested search, playback, sign-in and sessions | Providing the requested functions | Article 6, Paragraph 1, point (b), only where objectively necessary within a valid contract or requested pre-contractual steps; a visit alone cannot justify relying on it without a contract |
| Optional profiling, persistent identifiers and radar-preference sync | Personalised recommendations | Article 6, Paragraph 1, point (a), and Article 7; valid consent that is prior, separate, freely given and withdrawable |
| Necessary connection security, rate limiting and abuse prevention | Protecting the service and users | Article 6, Paragraph 1, point (f); document necessity and the balancing of interests, respect the right to object, and do not extend this basis to additional profiling |
| Documentation delivery, navigation and reading preferences | Providing requested documentation and its reading interface | Article 6, Paragraph 1, point (f), only where necessity and balancing of interests are established; any consent required for terminal access is assessed separately |
| User search-term statistics and public suggestions | Improving retrieval and reusing queries | An immediate query does not authorise additional public reuse; the current path lacks fully verified conditions and should be suspended, not described as already having a lawful basis |
| Third-party comments and public-content caching | Displaying requested content | Independently assess the basis, minimisation and indirect-collection notice; the viewer's contract does not automatically provide a contractual basis for processing comment authors' data |
| Rights requests and legally necessary disclosures | Meeting specific applicable obligations | Article 6, Paragraph 1, point (c); an actual legal obligation is required, not a blanket reference to all foreign requests |
| General support and specific dispute records | Responding to voluntary enquiries and establishing or defending claims | Proportionate legitimate interests under Article 6, Paragraph 1, point (f), or point (b) where contractual necessity genuinely exists; neither is a reason for indefinite retention |

The candidate version enables personalisation and Auto DJ by default. Defaults, signing in and ticking a Terms of Service checkbox do not establish valid consent. Deployments subject to EU rules must perform no nonessential storage, access or transmission before a choice is made, make acceptance and refusal equally easy, offer choices without tying them to the basic service, and allow withdrawal by means no harder than giving consent. Clearing settings must not turn an absence of choice back into consent. The current documentation does not establish that this mechanism has been implemented.

Turning personalisation off does not delete existing data or stop necessary requests or separate search statistics. Auto DJ has its own switch and may still send seed and excluded-track data to fill the queue. Radar sync may still send a preference payload with personalisation off, even if the server rejects storage based on the off marker. Transmission, receipt and persistent storage are distinct operations; the switch is not a guarantee that all outbound data is blocked. The operator must stop future processing within the scope of withdrawal and lawfully handle data already collected. Collection that lacked a basis cannot retrospectively be made lawful by relabelling it. If there are insufficient resources to implement consent, retention and deletion for optional profiling, the feature can be disabled without building unnecessary enterprise-scale systems.

Recommendations generally adjust ordering based on playback, favorites, dislikes, artist preferences and content relationships; they do not guarantee accuracy. This is profiling, but the reviewed purposes concern content recommendations only, and no solely automated decisions producing legal or similarly significant effects were found. A change of purpose requires reassessment under Article 22 of the GDPR and other applicable rules, with prior notice.

## 6. Retention periods and deletion limits

| Data | Behaviour verifiable in the candidate code | Actual retention requirements and limits |
| --- | --- | --- |
| Behavioural events and entity feedback | SQLite defaults to 90 days, with a 7-day minimum; cleanup at startup and on some writes, plus a separate write path fixed at 90 days | Not destruction of each record at expiry; settings must be aligned and cleanup run regularly, without treating example values as live guarantees |
| Radar profiles, query aggregates and co-occurrence data | Not fully covered by the cleanup above | Specific automatic periods have not been verified; necessary periods and deletion methods must be set before enabling processing, with no indefinite retention of identifiable data |
| Shared-track catalogue and optional external indexes | Behavioural input may create track records, including cover fields; not fully cleared by the current profile reset | Do not treat the catalogue as anonymous; where it contains identifiable data or images, assess necessity, sharing scope, retention and deletion |
| Browser data and music files | Until device clearing or browser eviction | Users can clear it; remote data is handled separately |
| Sessions, OAuth, rate-limit and revocation records | Session default: 30 days; OAuth: 600 seconds; some rate-limit KV records: 120 seconds; in-memory counting windows: about 60 seconds | Session validity is not the retention period for all copies; actual settings and revocation-record periods require separate verification |
| Request caches and upstream comments | Handled according to resource type, instance and upstream caching policies | Caches may contain queries or other people's data; cache expiry does not establish deletion of all copies, and actual periods must be published |
| Logs, backups, support and dispute records | No uniform actual rotation or expiry-destruction cycle was found | Limited to the period necessary for security, request handling or specific statutory retention; publish specific periods or intelligible criteria and clear data on schedule |

The same event databases, retention tasks or remote-deletion paths have not been verified in the older `main`; the candidate-version figures in this table must not be applied to it. Every instance must explain actual periods before enabling processing. Unknown periods do not authorise indefinite retention, and “as needed” cannot replace intelligible criteria.

The candidate version's “reset recommendation profile” mainly deletes some events and feedback for the current identity. It may omit pre-sign-in identifiers, radar data, search aggregates, the shared-track catalogue and covers, external recommendation systems, caches, database logs and backups; some failures may also go unreported in the interface. A profile summary is not a complete personal data copy or portable export. For comprehensive handling, submit a request under section 9; an interface button cannot replace statutory obligations.

Erasure must cover data that can actually be linked, within the scope required by applicable law and subject to statutory exceptions. Recipients must be notified where applicable. If backups cannot be erased item by item, they must be removed from routine use, isolated and cleared on a defined cycle. Deletions already carried out must be reapplied on restoration so that old data does not return to use. For portions that must legally be retained, the reason, scope and period must be explained and use restricted. This policy does not invent backup cycles or background jobs that are already live.

## 7. Recipients and international transfers

Cloudflare may provide hosting, edge services, tunnels and storage; Epomail provides identity services; music platforms, lyrics sources and content CDNs receive queries or connection information; Google Fonts, avatar services and configured recommendation, retrieval or alert providers may receive other data. Public query suggestions, the shared-track catalogue and upstream comment caches may also make content accessible to other users. Whether optional paths such as Gorse, Meilisearch and alert webhooks are enabled must be expressly disclosed for the particular instance, not inferred from sample configurations.

Not every recipient is a processor. Whether a party processes on instructions, independently determines uses or jointly determines purposes must be assessed against the actual arrangements. Where a processor relationship exists and the GDPR applies, Article 28 requirements must be implemented. A shared brand or the name of an open-source component does not establish that a processing contract has been signed.

Actual contracting parties, countries and safeguards remain unverified. Each transfer subject to Chapter V of the GDPR requires confirmation of an adequacy decision or another valid mechanism. Using Standard Contractual Clauses also requires the corresponding assessment and necessary supplementary safeguards. Vendor certifications, policy links, proxies or a user's acceptance of this page are not in themselves a transfer basis; derogations for specific situations must not become a general solution for routine, ongoing transfers. As provided by law, you may request an explanation or copy of safeguards from `privacy@epocanvas.com`. Necessary trade secrets may be appropriately redacted, but this must not remove transparency obligations. See [Third Parties & Transfers](/en/sub-processors/) for details.

## 8. Age and test data

The project's minimum age is 16. Minors must also meet the legal-capacity and guardianship requirements where they are located. Article 8 of the GDPR concerns only the child-consent situations it specifies, not a uniform age rule for all contracts and processing. Current identity fields do not prove age, and the project does not claim to have verified it.

Guardians may report data that does not meet the age requirement through the privacy email address. Development, demonstrations and learning should prioritise clearly labelled synthetic data, your own test accounts and authorised content. Testing involving real users' data should not be opened up before identity-disclosure and safeguard requirements are met. A public service or processing of other people's data is not a purely personal or household activity merely because it is for “learning”.

## 9. Your rights and available actions

To the extent provided by applicable law, you may request confirmation of processing, access and a copy, rectification, erasure, restriction of processing and data portability, object to processing based on legitimate interests, and withdraw consent. Portability covers data you provided that is processed automatically on the basis of consent or a contract, within the statutory scope; it does not necessarily cover every inference or internal record. Withdrawal does not affect earlier processing that already had a lawful basis. Erasure is also subject to statutory exceptions, which must be explained individually rather than used for a blanket refusal.

**Right to object:** You may object at any time, on grounds relating to your particular situation, to processing based on legitimate interests. The relevant processing must stop unless overriding compelling legitimate grounds can lawfully be demonstrated, or processing is necessary to establish, exercise or defend legal claims. Contact `privacy@epocanvas.com` to object; turning personalisation off is not the only means of doing so.

When using available controls, sign-out and local-clearing tools, note the limits in section 6. Local clearing does not guarantee removal of HttpOnly cookies, credentials in legacy URLs or storage, or remote data, and is not account closure. Clearing settings may restore defaults; the operator must not treat this as renewed consent. Incognito mode itself does not stop requests or events from being sent.

You may withdraw consent to optional processing without deleting your account, using an available withdrawal control that is no harder than giving consent or contacting `privacy@epocanvas.com`. For remote erasure, a data copy or checks linking multiple identities, state the instance and request type and provide only the clues needed to locate the data. Locating an older pseudonymous record is distinct from additional identity verification: only where there is reasonable doubt about the requester's identity may the operator request extra information necessary to verify it; identity documents must not be required by default. You may make a request without an account. Do not send passwords or complete tokens, or disclose private information publicly. If an old pseudonymous record cannot be identified, explain the limitation and allow appropriate clues rather than collecting unrelated information or issuing a blanket refusal. The operator must confirm that this email address works before adopting the policy; the current documentation proves neither receipt of a request nor its execution.

Where the GDPR applies, action or a response is required without undue delay and, as a rule, within one month of receipt. An extension of up to two further months is permitted where genuinely necessary because of complexity or the number of requests, with reasons given within the first month. Requests are generally free. Charging, refusing or taking no action must meet specific statutory conditions, with reasons and information about complaints and judicial remedies provided. Individual maintenance or a lack of automated tools is not an automatic ground for an extension.

You may complain directly to a competent supervisory authority at your habitual residence, place of work or the place of the alleged infringement, without first exhausting internal channels. Compensation under Article 82 of the GDPR and other judicial remedies are not affected by the Terms of Service's liability limits.

## 10. Security and incident handling

The operator must take appropriate measures according to the nature and scale of the data, costs and risks, including least privilege, credential and transmission protection, updates, and deletion and restoration checks. An individual project makes no additional promise of absolute security, uninterrupted operation, a dedicated security team or certification, but must still implement necessary measures. Protections differ between the older and candidate versions; one branch's design alone cannot guarantee live security.

Personal data breaches subject to the GDPR must be documented. Unless a breach is unlikely to pose a risk to rights and freedoms, the competent authority must be notified without undue delay and, where feasible, within 72 hours of awareness, with reasons given for late notification. Individuals must also be notified without undue delay where the risk is high, subject to statutory exceptions. No particular country's authority should be presumed to replace the authority that actually has jurisdiction. See [Data Processing & Security](/en/data-security/) for details.

## 11. Updates and effect

The date on this page is the document's revision date. It does not retrospectively authorise earlier processing or establish that an instance has adopted this version. Before adopting a new policy or changing purposes, data categories, recipients or periods, the actual details must be accurately disclosed; fresh consent must be obtained separately where required. A policy cannot conceal undisclosed processing by saying that “the actual code governs”. Continued use is not privacy consent and does not waive requests or remedies that have already arisen.

## 12. Contact

Privacy and data requests: `privacy@epocanvas.com`; service and account matters: `admin@epocanvas.com`. Technical issues may be reported on [GitHub](https://github.com/shijianus/sonic/issues), after removing personal data and credentials. Self-hosted instances must provide their own controller identity and effective contact channels.
