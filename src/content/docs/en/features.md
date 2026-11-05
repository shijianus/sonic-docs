---
title: Features Guide
description: The Sonic features guide — in-depth notes on quality tiers and trial transparency, word-level lyrics, recommendations and Auto DJ, downloads and local music, charts, MV and search fault tolerance.
---

**Revision date: 3 November 2026｜Version: 1.9**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page explains in depth how each Sonic function behaves and the design trade-offs behind it. Interface locations are in the [Interface & Features Guide](/en/interface/); the technical account of behavioral signals and the recommendation model is in the [Project Overview](/en/project/), section 5; the contractual conditions of use are in the [Terms of Service](/en/terms-of-service/).

![Sonic's six feature groups: search, playback, lyrics, library, recommendations and privacy](/images/sonic/features-map.svg)

*Figure: six feature groups; the actual scope of recommendations and privacy controls depends on the instance configuration.*

## 1. Quality tiers and trial transparency

Sonic strictly distinguishes complete tracks from trial clips:

1. **Quality tiers**: the tiers available from the source (SQ lossless, HQ high quality, standard and so on) are determined by the direct link actually issued upstream; the quality menu lists only genuinely available items, and the badge labels the current stream honestly;
2. **Trial detection**: probing the audio entity's length and metadata identifies official 30-second trial truncation, and the result is presented with a trial label — a trial is never passed off as a full track;
3. **Cross-source completion**: when enabled, trial tracks are automatically matched against free full tracks on QQ／Kugou／Kuwo; on success the player switches smoothly and labels the substitute source; if no match is found, the trial is kept and playback moves naturally to the next track when it ends;
4. **Strict boundary**: do not bypass payment or copyright protections. A deployer's membership credentials and a technically playable resource do not authorise public access, redistribution or extension of membership rights.

## 2. The word-level lyrics chain

Lyrics are fetched under a three-level priority:

| Priority | Source | Format |
| --- | --- | --- |
| 1 | Native local parsing (NetEase／QQ／Kugou) | YRC／QRC／KRC word-level timelines |
| 2 | AMLL | TTML word-level format |
| 3 | LRCLIB | Synced line-level lyrics |

The lyrics panel provides independent switches for the original text, the translation and romanization; clicking a lyric line seeks playback to that position; word-level animations stay in step with playback. Lyrics data also passes through the edge cache, and when no native local lyrics exist the player falls back automatically to the global lyrics library.

## 3. Recommendations and Auto DJ

1. **For You**: personal recommendations blending completion rate, favorites, session search intent and MMR diversity re-ranking; cards show the recommendation reason (such as "you often listen to this artist"), and mobile additionally shows preference-signal tags;
2. **Site-wide trending charts**: a 24-hour surging chart and a 7-day cumulative chart, based on real playback signals across the instance;
3. **Genre exploration radar**: exploration by genre, with a temperature parameter to adjust the breadth of exploration;
4. **Auto DJ**: when a playlist finishes playing naturally, playable tracks matching the current track's style are queued automatically; it can be switched off in settings;
5. **Signal purification**: six categories of non-user track changes, such as stalls, decode failures and trial truncation, are excluded from the recommendation data pool;
6. **Data control**: personalisation and Auto DJ default to on, not affirmative consent. Pseudonymous events remain personal data; the 90-day setting is partial cleanup, and reset may omit older identities, radar, aggregates, external services and backups, with failures hidden. Optional processing without a valid basis must be suspended (see the [Privacy Policy](/en/privacy-policy/), sections 5, 6 and 9).

## 4. Downloads and local music

1. **Downloads**: tracks are saved together with their quality metadata into the browser's IndexedDB (`downloaded_music`), managed on the downloads page and playable offline;
2. **Local music**: local audio files are imported into the browser by drag-and-drop or file selection (`local_music`) and presented together with the online library;
3. **Boundary**: no upload path was found for local audio file contents; lyric matching, favorite feedback and recommendation context may send titles, artists, albums or track identifiers, and embedded artwork may be sent with favorite events and added to the remote shared-track catalogue used by site-wide search or public suggestions. Profile reset does not remove that catalogue. Local storage is not general cloud backup, and importing or downloading grants no additional content rights.

## 5. Charts and official rankings

The charts page offers new releases and official charts, each divided into five categories — all／Mandarin／Western／Japanese／Korean; charts support one-click continuous playback. The home trending chart and the charts page share the same trending model (five-factor weighting + time decay + Bayesian smoothing), described in the [Project Overview](/en/project/), section 5.

## 6. MV playback

Search results and track pages lead to the MV player, subject to upstream availability. MVs and external images may connect directly, exposing IP and connection metadata rather than receiving audio-proxy protection. Current comment, reply and like writes are local simulations, not proof of upstream publication; upstream comments may contain nicknames, avatars, identifiers and text cached by the instance, not anonymous content.

## 7. Search fault tolerance

Search supports simplified/traditional normalisation, pinyin and initials, artist aliases, spelling tolerance, version recognition and multi-source merging. Smart search also counts raw terms that may appear in public suggestions, independently of the personalisation switch; do not enter private or sensitive information. Incognito mode does not stop these requests. See [Search & Rules Reference](/en/search-syntax/), section 5.

## 8. Degraded mode

When the data-plane node goes offline or times out, the edge layer switches to degraded mode automatically: search and lyrics are served by the edge connecting directly to public interfaces, the interface shows an "edge degraded mode" notice, and already-loaded tracks are unaffected. During degradation, full source resolution and recommendation updates may be unavailable, and the circuit closes automatically on recovery (the resilience mechanism is described in [Project Overview](/en/project/), section 3.1).
