---
title: Recommendation Algorithm
description: The Sonic recommendation algorithm — behavioral signals and weights, the trending model, session intent, MMR re-ranking, Auto DJ and the privacy controls that go with them.
---

**Effective date: 2 November 2026｜Version: 1.5**

This page explains the composition of the Sonic recommendation engine in full: which signals enter the model, how they are weighted, how ordering works, and which controls you hold. All rules are public in the source code; the legal bases and boundaries of data collection are in the [Privacy Policy](/en/privacy-policy/), sections 4.2 and 5.

## 1. Behavioral signals and weights

| Signal | Weight | Meaning |
| --- | --- | --- |
| favorite (add to favorites) | +4.0 | Very strong positive |
| replay (replay) | +3.5 | Strong positive |
| play_complete (valid completion) | +2.5 | Standard positive |
| play_progress (listening progress) | +0.2 ～ +1.8 | Scored by listening ratio |
| skip (fast skip) | -0.8 | Skipping past the halfway point counts +0.25 |
| dislike (explicit reject) | -5.0 | Hard-filtered and blocklisted |

**Noise purification**: six classes of skip not initiated by the user — network stalls (network_stall), decode failures (playback_error), trial truncation (trial_end), unavailable streams (stream_unavailable), buffer timeouts (buffer_timeout) and auto-switch failures (auto_switch_error) — always carry zero weight and are never stored.

## 2. The trending model

The on-site trending chart weights five factors: valid plays (35%), distinct listeners (25%), completion (20%), favorite conversion (15%) and growth slope (5%); it adds exponential time decay (a 24-hour surging chart and a 7-day cumulative chart) and Bayesian／Wilson Score smoothing, so that occasional events with few plays but high completion do not abnormally top the chart.

## 3. Session intent and long-term preferences

Session-level search intent (consecutive search keywords, clicks on artists and genres) joins immediate ordering with a high short-term weight, decoupled in layers from long-term preferences: only high-value actions such as completions and favorites settle into the long-term profile — an occasional search does not immediately change your long-term profile.

## 4. Diversity re-ranking and Auto DJ

1. **Similarity**: blends the artist-relation graph, set similarity over genre and language tags, and cosine similarity of audio features;
2. **MMR re-ranking**: marginal relevance balances "precision" and "novelty", avoiding an information cocoon locked onto a single artist or genre;
3. **Auto DJ**: when a playlist finishes naturally, playable tracks in the current track's style are appended automatically; you can switch it off in settings.

## 5. The music and genre radar

After you complete a search, the home-page radar immediately shows matching results based on your search intent and preference signals, styled consistently with hot tracks; the radar only affects the recommendation sequence you see and changes no stored data.

## 6. Your controls

| Control | Location | Effect |
| --- | --- | --- |
| Personalisation master switch | Settings → Privacy & local data | When off, events are no longer collected and recommendations run in pure public mode |
| Auto DJ switch | Settings → Privacy & local data | Controls automatic continuation after a playlist finishes |
| Reset recommendation profile | Settings → Privacy & local data | Immediately destroys all behavioral events server-side |
| Dislike a track | dislike in the player | Hard-filtered; never appears in recommendations again |

The algorithm's technical facts are updated as the source code evolves; where this document and the source code disagree, the code prevails and the document is corrected (the verification process is in the [Development Guide](/en/development/), section 4).
