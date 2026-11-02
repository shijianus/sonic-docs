---
title: Recommendation Algorithm
description: The Sonic recommendation algorithm — behavioral signals and weights, the trending model, session intent, MMR re-ranking, Auto DJ and the privacy controls that go with them.
---

**Revision date: 2 November 2026｜Version: 1.8**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page outlines Sonic's recommendation signals, weighting, ordering and controls. In addition to the track signals below, the reviewed code includes artist, album, playlist and MV feedback and radar profiles. Personalisation and Auto DJ default to on; that default, sign-in and continued use are not affirmative consent. Optional profiling without a valid basis must be suspended. See the [Privacy Policy](/en/privacy-policy/), sections 4.2 and 5.

## 1. Behavioral signals and weights

| Signal | Weight | Meaning |
| --- | --- | --- |
| favorite (add to favorites) | +4.0 | Very strong positive |
| replay (replay) | +3.5 | Strong positive |
| play_complete (valid completion) | +2.5 | Standard positive |
| play_progress (listening progress) | +0.2 ～ +1.8 | Scored by listening ratio |
| skip (fast skip) | -0.8 | Skipping past the halfway point counts +0.25 |
| dislike (explicit reject) | -5.0 | Filters matching recommendations only within the available identity and feature scope; does not promise a permanent universal block |

**Noise purification**: six classes of skip not initiated by the user — network stalls (network_stall), decode failures (playback_error), trial truncation (trial_end), unavailable streams (stream_unavailable), buffer timeouts (buffer_timeout) and auto-switch failures (auto_switch_error) — always carry zero weight and are never stored.

## 2. The trending model

The on-site trending chart weights five factors: valid plays (35%), distinct listeners (25%), completion (20%), favorite conversion (15%) and growth slope (5%); it adds exponential time decay (a 24-hour surging chart and a 7-day cumulative chart) and Bayesian／Wilson Score smoothing, so that occasional events with few plays but high completion do not abnormally top the chart.

## 3. Session intent and long-term preferences

Session search intent and longer-term signals affect ranking differently, but this does not mean searches are never retained. Recommendation requests may send local favorites, recent artists and search context. Smart search separately counts raw terms that may appear in public suggestions even with personalisation off; do not enter private or sensitive information. Pseudonymous identifiers remain potentially linkable personal data.

## 4. Diversity re-ranking and Auto DJ

1. **Similarity**: blends the artist-relation graph, set similarity over genre and language tags, and cosine similarity of audio features;
2. **MMR re-ranking**: marginal relevance balances "precision" and "novelty", avoiding an information cocoon locked onto a single artist or genre;
3. **Auto DJ**: when a playlist finishes naturally, playable tracks in the current track's style are appended automatically; it has a separate switch, and may still send seed and excluded-track data when personalisation is off.

## 5. The music and genre radar

The home-page radar uses search intent and preference signals. The code includes local radar state, profiles and remote-sync paths; it is not a display-only feature that changes no stored data. With personalisation off, a radar sync payload containing tracks, covers and signals may still be sent, although the server may reject storage based on the off marker; transmission does not establish persistent storage. Remote route availability is limited and general cloud sync is not guaranteed. Radar data is not fully covered by event cleanup or profile reset.

## 6. Your controls

| Control | Location | Effect |
| --- | --- | --- |
| Personalisation master switch | Settings → Privacy & local data | Controls covered recommendation events, not separate search statistics or necessarily every radar path |
| Auto DJ switch | Settings → Privacy & local data | Controls automatic continuation; the default-on setting does not establish consent |
| Reset recommendation profile | Settings → Privacy & local data | Deletes some current-identity events and feedback; may omit older identifiers, radar, aggregates, external services and backups, with failures possibly hidden |
| Dislike a track | dislike in the player | Filters matching recommendations only within the available identity and feature scope; does not promise a permanent universal block |

The default 90-day event setting is not per-record expiry or a deadline for every data category. Browser incognito mode does not stop requests or events. For broader deletion or a data copy, contact `privacy@epocanvas.com`. Source-code checks inform corrections but do not excuse inaccurate notices or replace a lawful basis (see the [Development Guide](/en/development/), section 4).
