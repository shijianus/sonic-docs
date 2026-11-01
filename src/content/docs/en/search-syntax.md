---
title: Search & Rules Reference
description: The Sonic search and rules reference — multi-source retrieval, fault-tolerance rules, category tabs and result actions, explained in full.
---

**Effective date: 2 November 2026｜Version: 1.5**

This page brings together the capabilities and rules of Sonic search: what you can type in, how fault tolerance works, and how results are organized. The interface location is in the [Interface & Features Guide](/en/interface/), section 2.

## 1. Scope of retrieval

Search covers four kinds of object: tracks, artists, albums and playlists. The results page is organized into three tabs — tracks／playlists／MV; the search entry lives at the top of the sidebar and on the search page, with on-site trending-keyword suggestions.

## 2. Fault tolerance and matching rules

| Rule | Description | Example |
| --- | --- | --- |
| Simplified/traditional glyph normalization | Simplified and traditional input match equivalently | Searching "周杰伦" and "周杰倫" returns identical results |
| Pinyin and initials retrieval | Full pinyin or initial-letter abbreviations hit | Typing "zyy" hits tracks related to Jay Chou (周杰伦) |
| Alias-symmetric matching | An artist's Chinese and English aliases are linked in both directions | Searching an English name hits the artist under its Chinese alias |
| Edit-distance tolerance | Spelling mistakes are corrected by edit distance | A near-miss string still hits the target |
| Version recognition | Distinguishes studio, live, cover and other versions | Results are labelled with their version |

## 3. Multi-source parallelism and deduplication

Search requests are sent in parallel to the enabled upstream sources, and results are merged with normalization: multi-source records for the same track under the same name are merged into a single result, and a playback address is picked by availability at playing time. The list of upstream sources and their default switches is in [Third Parties & Transfers](/en/sub-processors/), section 3.

## 4. Result actions

Each row of the track list provides: play, an MV entry (where available), favorite, download and further actions; "play all" at the top plays through the results in order. Playlist results open the playlist detail page; MV results open the MV list.

## 5. Search and privacy

How search terms are handled:

1. **Local**: recent search terms (at most 10) live only in the browser's localStorage and are cleared along with "clear all local data";
2. **Server-side aggregation**: search terms count into global aggregate statistics (carrying no personal identifier; used for the trending-searches list);
3. **Personalisation**: with personalisation on, search clicks are recorded as recommendation signals (pseudonymised, 90 days); with it off, no events are recorded at all.

See the [Privacy Policy](/en/privacy-policy/), section 4, and the [Recommendation Algorithm](/en/recommendation/).
