---
title: Search & Rules Reference
description: The Sonic search and rules reference — multi-source retrieval, fault-tolerance rules, category tabs and result actions, explained in full.
---

**Revision date: 3 November 2026｜Version: 1.9**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page brings together the capabilities and rules of Sonic search: what you can type in, how fault tolerance works, and how results are organized. The interface location is in the [Interface & Features Guide](/en/interface/), section 2.

## 1. Scope of retrieval

Search covers four kinds of object: tracks, artists, albums and playlists. The results page is organized into three tabs — tracks／playlists／MV; the search entry lives at the top of the sidebar and on the search page, where the interface may show on-site trending-keyword suggestions.

## 2. Fault tolerance and matching rules

| Rule | Description | Example |
| --- | --- | --- |
| Simplified/traditional glyph normalization | You can try either simplified or traditional glyphs; actual matching depends on the index and upstream availability | Compare searches for "周杰伦" and "周傑倫" |
| Pinyin and initials retrieval | You can try full pinyin or initial-letter abbreviations; results are not guaranteed for every source | Try "zjl" for tracks related to Jay Chou (周杰伦／周傑倫) |
| Alias-symmetric matching | The site may link an artist's Chinese and English aliases; actual results depend on the index | Searching an English name may find the artist under a Chinese alias |
| Edit-distance tolerance | A near string may be treated as a candidate; not every spelling error is corrected | Enter a near-match and check the actual results |
| Version recognition | Results may distinguish studio, live, cover and other versions | Use the version label shown in the result |

## 3. Multi-source parallelism and deduplication

Search requests are sent to enabled upstream sources that are available at the time, and results are then merged using normalization rules. Records for the same track under the same name may be merged into one result, while a playback address is obtained at playing time according to availability. The list of upstream sources and their default switches is in [Third Parties & Transfers](/en/sub-processors/), section 3.

## 4. Result actions

Each row of the track list may provide play, an MV entry where available, favorite, download and further actions; "play all" at the top may play through the results in order. Playlist results open the playlist detail page and MV results open the MV list; actual actions depend on the result and instance configuration.

## 5. Search and privacy

How search terms are handled:

1. **Local**: recent search history uses browser localStorage, but the query itself is sent for search and some history may accompany recommendation requests; local clearing does not delete remote copies already created;
2. **Server-side aggregation**: smart search may separately count or retain raw terms and may expose them in public suggestions; turning personalisation off does not by itself rule out that path. Text can identify people without an account ID; do not submit private or sensitive data. Actual filtering, display thresholds, retention controls and instance configuration require separate verification;
3. **Personalisation**: search and click signals can be linked by pseudonymous identifiers. The personalisation switch does not control every search-statistics path; a 90-day setting or reset function does not mean that every search aggregate or copy is deleted on the same schedule.

See the [Privacy Policy](/en/privacy-policy/), section 4, and the [Recommendation Algorithm](/en/recommendation/).
