---
title: Troubleshooting
description: Sonic troubleshooting — common problems and fixes for playback, sources, sign-in, degraded mode, storage and rate limiting.
---

**Effective date: 2 November 2026｜Version: 1.5**

This page lists how to recognize and handle common problems. If nothing here resolves yours, write to `admin@epocanvas.com` or open an Issue on the GitHub repository.

## 1. Playback problems

| Symptom | Cause | What to do |
| --- | --- | --- |
| Track labelled "trial" stops after 30 seconds | Official trial truncation, not a fault | Turn on cross-source completion to match a free full track automatically; or play another source's version |
| The quality badge shows a lower tier | An honest reflection of the tier the upstream actually issued | Try other tiers in the quality menu; upstream tiers change with availability |
| Playback stops and will not resume | The upstream direct link expired | Click the track again to re-resolve it |

## 2. Degraded mode

When the amber "edge degraded mode" notice appears at the top of the interface: the data-plane node is temporarily offline or timed out, and the edge has switched to connecting directly to public interfaces — search and lyrics remain available, while full source resolution and recommendation updates may be limited. Recovery is usually automatic within tens of seconds (probing resumes after the 30-second circuit-breaker cooldown); already-loaded tracks are unaffected and there is no need to refresh.

## 3. Search problems

1. **No search results**: usually a momentary upstream outage — retry shortly; in degraded mode search goes through the edge directly to public interfaces, so coverage may be somewhat narrower;
2. **Duplicate or missing results**: multi-source deduplication merges by normalized identity; abnormal upstream metadata can slip through unmerged — you can open an Issue with the keywords attached.

## 4. Sign-in problems

1. **Signed in, immediately signed out again**: usually the browser blocking third-party cookies or a security extension clearing them — allow-list the site and retry;
2. **Your Epomail account is frozen**: sign-in ends with it; resolve the account status on the Epomail side first;
3. **Others can play on a shared device**: the session cookie is kept for at most 30 days; sign out after use on shared devices (see the [Account & Security Guide](/en/account-security/), section 5).

## 5. Storage problems

1. **Favorites or downloads lost**: the browser's "clear site data" or private mode deletes local storage (see [Data Export & Storage](/en/data-management/), section 1); record important playlists yourself;
2. **Downloads fail**: the browser's storage quota is full — delete old downloads or free up browser storage and retry;
3. **Local music import fails**: the file format exceeds the browser's decoding capability, or the file is too large for the quota.

## 6. Rate limiting and error codes

| Symptom | Meaning | What to do |
| --- | --- | --- |
| 429 (anonymous) | Past the 240-per-minute anonymous rate limit | Signing in grants a higher quota (600 rpm) |
| 429 (authenticated) | Sustained excess past 600 per minute | Check whether the client loops requests |
| 501 (revocation actions) | The instance has no instant revocation configured | For the deployer to configure a KV binding or list-based revocation |
| Signed out repeatedly | The key has been revoked or the global minimum issuance time was adjusted | Sign in again to obtain a new key |

## 7. Still unresolved

When opening an Issue, please attach: when it happened, the page and actions you used, any interface notice (such as a screenshot of the degradation notice), and your browser and version. Do not attach session cookies or API keys.
