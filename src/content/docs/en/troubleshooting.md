---
title: Troubleshooting
description: Sonic troubleshooting — common problems and fixes for playback, sources, sign-in, degraded mode, storage and rate limiting.
---

**Revision date: 3 November 2026｜Version: 1.9**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page lists how to recognize and handle common problems. If nothing here resolves yours, write to `admin@epocanvas.com` or open an Issue on the GitHub repository; when reporting, provide only non-sensitive reproduction terms. Public search text may contain personal or sensitive information.

![Sonic troubleshooting in four steps: identify the symptom, check the status, try the fallback and report](/images/sonic/troubleshooting-flow.svg)

*Figure: identify the symptom, check the status, try the fallback and report; the fallback can also fail.*

## 1. Playback problems

| Symptom | Cause | What to do |
| --- | --- | --- |
| Track labelled "trial" stops after 30 seconds | Official trial truncation, not a fault | If the interface offers cross-source completion, try matching another full version; or play another source's version, without assuming it will work |
| The quality badge shows a lower tier | An honest reflection of the tier the upstream actually issued | Try other tiers in the quality menu; upstream tiers change with availability |
| Playback stops and will not resume | The upstream direct link may have expired | Click the track again to try re-resolving it; recovery is not guaranteed |

## 2. Degraded mode

When the amber "edge degraded mode" notice appears at the top of the interface: the data-plane node may be temporarily offline or timed out, and a fallback path is being used. The fallback can also fail; search, lyrics and playback may be limited or unavailable. The 30-second interval after the circuit-breaker cooldown is only another probe, not a recovery guarantee. Already-buffered content may continue, but continued playback is not guaranteed. The notice does not establish automatic recovery or that a refresh is unnecessary.

## 3. Search problems

1. **No search results**: usually a momentary upstream outage — retry shortly; in degraded mode the fallback search may still fail or be unavailable, and coverage may be somewhat narrower;
2. **Duplicate or missing results**: abnormal upstream metadata can affect deduplication. Report only non-sensitive reproduction terms; public search text may contain personal or sensitive information, so do not paste it into a public Issue.

## 4. Sign-in problems

1. **Signed in, immediately signed out again**: check whether the site can set and retain its own session cookie, whether an extension removes it, and whether HTTPS, the OAuth callback URL and related OAuth configuration match; clear or disable only the setting that interferes, and do not turn off all browser protections;
2. **Your Epomail account is frozen**: sign-in ends with it; resolve the account status on the Epomail side first;
3. **Others can play on a shared device**: in the reviewed RC, the site's session cookie has a default validity of 30 days; this does not confirm the live deployment's setting or the retention or expiry of copied credentials and other copies. Sign out after use on shared devices (see the [Account & Security Guide](/en/account-security/), section 5).

## 5. Storage problems

1. **Favorites or downloads lost**: browser clearing or the end of a private browsing session may remove local data; general cloud recovery is not guaranteed. Incognito does not prevent network events, and local clearing or profile-reset success does not prove complete remote deletion (see [Data Export & Storage](/en/data-management/));
2. **Downloads fail**: the browser's storage quota is full — delete old downloads or free up browser storage and retry;
3. **Local music import fails**: the file format exceeds the browser's decoding capability, or the file is too large for the quota.

## 6. Rate limiting and error codes

| Symptom | Meaning | What to do |
| --- | --- | --- |
| 429 (anonymous) | Past the RC default anonymous limit of 240 per minute; the live instance may differ | Follow the interface and retry later, or check the instance configuration |
| 429 (authenticated) | Sustained excess past the RC default of 600 per minute; the live instance may differ | Check whether the client loops requests |
| 501 (revocation actions) | Supported remote revocation is not configured | Sign-out may clear only the browser cookie; ask the operator to check revocation configuration and verify that copied credentials are rejected |
| Signed out repeatedly | The key has been revoked or the global minimum issuance time was adjusted | Sign in again to obtain a new key; the actual cause still requires the instance logs and configuration |

## 7. Still unresolved

For a public Issue, provide the time, page, actions, browser version and a redacted notice screenshot where useful; use only non-sensitive reproduction terms. Public search text may contain personal or sensitive information. Before posting, remove or redact email addresses, personal or profile data, sensitive search terms, session cookies, API keys and the same information in screenshots. Broader deletion or data-copy requests belong at `privacy@epocanvas.com`, not in public Issues; a reset success message is not proof that every record was deleted.
