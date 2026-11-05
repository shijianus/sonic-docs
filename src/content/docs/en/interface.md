---
title: Interface & Features Guide
description: A guided tour of the Sonic web player — home and recommendations, search, playback controls, the player drawer, my music, settings and privacy controls, and the mobile layout.
---

**Revision date: 3 November 2026｜Version: 1.9**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page is a guided tour of the Sonic web player's interface and the location of every function. The screenshots were taken from the hosted instance running live (the interface language shown is Simplified Chinese; the product supports switching the interface language). The interface may evolve with releases, and the functions actually available depend on what the instance enables; the legal commitments are in the [Terms of Service](/en/terms-of-service/) and the [Privacy Policy](/en/privacy-policy/).

![The Sonic player home page: left navigation sidebar (Explore, My Music, System sections), the main area with banner carousel, smart recommendations and music radar, recommended playlists, and the bottom mini player bar](/images/sonic/ui/ui-home.png)

*Figure: the desktop home page. The left sidebar is divided into "Explore" (Home, MV, Charts, Artists, New Albums, Search) and "My Music" (Favorites, Recent, Downloads, Local Music); the main area holds, from top to bottom, the banner carousel, the smart recommendation and music radar, and recommended playlists; the bottom mini player bar is always present.*

## 1. Home and smart recommendations

The home page aggregates three content areas:

1. **Banner carousel**: new songs and new albums, with source labels such as the "sonic 新歌" (sonic new release) badge; clicking plays or opens details;
2. **Smart recommendation and music radar**: three views — "For You", "Trending", and "Genre Radar" — with "refresh" and "play the recommendation list" actions. After you complete a search, the radar dynamically displays matching results based on your search intent and preference signals. Recommendation cards carry reasons (the "personalised" badge with notes such as "you often listen to this artist" or "similar to the genres you favour"); the mobile home also shows the current session's preference-signal tags (artists, genres). The signal categories behind recommendations are in the [Privacy Policy](/en/privacy-policy/), section 4.2;
3. **Recommended playlists and hot tracks**: generated from real listening trends across the instance, with play counts on the cards.

![The Sonic home page's music and genre radar: after a search is completed, the radar shows matching results based on preference signals, styled consistently with hot tracks](/images/sonic/ui/ui-radar.png)

*Figure: the music and genre radar after a search. Radar results are styled consistently with the "hot tracks" cards, and recommendation reasons and preference-signal tags are presented transparently.*

Recommendation ordering generally affects content order, but the current code also processes entity feedback and radar profiles. Personalisation and Auto DJ are on by default; this is not affirmative consent. Turning personalisation off in settings (section 9) does not by itself stop separate search statistics or every radar path. Optional processing without a valid basis must be suspended.

### 1.1 The sidebar: collapse mode and the account entry

The brand logo at the top of the sidebar is the collapse switch: clicking it collapses the sidebar into a narrow strip (icon mode); clicking again expands it. The bottom of the sidebar integrates the Epomail account entry: when signed out it shows sign-in guidance; when signed in it shows the account nickname and the entry, with the sign-in state synced across tabs.

## 2. Search

![The Sonic search results page: searching "周杰伦" (Jay Chou) returns 52 results across three tabs — tracks, playlists, MV — with a play-all button, and a result table with cover, track, artist, album, duration and action columns](/images/sonic/ui/ui-search.png)

*Figure: the search results page. Tabs at the top (tracks／playlists／MV) and "play all"; the table shows cover, track, artist, album, duration and actions (play, MV, favorite, download). The search box supports simplified/traditional normalization, pinyin initials and spelling tolerance.*

Search lives at the top of the left sidebar and on the search page, covering tracks, artists, albums and playlists. Multi-source results are merged with normalized deduplication and ordered by relevance; tracks whose source is a trial clip are labelled under the [quality and trial transparency](/en/project/#4-sources-and-lyrics-chain) rules — a trial is never presented as a full track.

## 3. Charts and official rankings

![The Sonic charts page: "New releases" and "Official charts" tabs, five category lists (all, Mandarin, Western, Japanese, Korean), and a ranked table with position, cover, track, artist, album and duration](/images/sonic/ui/ui-charts.png)

*Figure: the charts page. A chart selector on the left (new releases／official charts, with all／Mandarin／Western／Japanese／Korean categories) and the ranked list with "play all" on the right. Chart data comes from upstream official charts and real listening trends across the instance.*

The "Trending" view on the home page and the charts page share the same trending model: five weighted factors — valid plays, distinct listeners, completion, favorite conversion and growth slope — with exponential time decay and Bayesian smoothing (the model is described in the [Project Overview](/en/project/), section 5).

## 4. Artists and albums

![The Sonic artist library page: two-dimensional filters by type (all, male, female, bands) and region (Mandarin, Western, Japanese, Korean, others), initials A–Z and hot search, with artist cards showing album counts](/images/sonic/ui/ui-artists.png)

*Figure: the artist library page. Artists are filtered by type, region and initial; cards show the artist's picture, name and album count. An artist page lists their hot tracks and albums, and an album page lists its tracks.*

The artist, album and track-detail pages use cover and palette features, with lists obtained from upstream interfaces and cached before display. Not every image or resource is proxied: external covers, avatars, MVs and Google Fonts may expose IP and connection metadata; the current DiceBear avatar path may also carry a plaintext email address. See the [Privacy Policy](/en/privacy-policy/), section 4.4.

## 5. Playback controls (bottom player bar)

![The Sonic bottom player bar: playing "晴天" (Qing Tian) with a lyric preview line, previous, play, next, play-mode, quality menu (SQ lossless), download and volume controls](/images/sonic/ui/ui-player.png)

*Figure: the bottom player bar in the playing state. Left: cover, current track and lyric preview; middle: playback controls and mode switching; right: the quality menu (badge "SQ 无损" = SQ lossless), download, volume slider and the play-queue entry. Clicking the cover area opens the full player drawer.*

The bottom player bar is present on every page and provides:

1. **Quality menu**: listing the tiers actually available from the current source (such as SQ lossless, HQ high quality, standard); the badge honestly reflects the current stream's tier and never overstates it;
2. **Lyric preview line**: the current word-level lyric line;
3. **Play modes**: list loop, single-track loop, shuffle and other modes;
4. **Download**: saving the current track into the browser (IndexedDB); see section 3 of [Music Library Management](/en/library/).

## 6. The player drawer and word-level lyrics

![The Sonic full-screen player drawer: a vinyl-record cover animation and track information on the left, a scrolling lyrics panel on the right, a background gradient following the cover palette, and background／visualizer mode switches at the top right](/images/sonic/ui/ui-player-drawer.png)

*Figure: the full-screen player drawer. Left: the cover display (vinyl animation) and playback controls; right: the word-level scrolling lyrics panel; the background gradient follows the cover's palette in real time. The drawer opens when you click the cover in the bottom player bar.*

The player drawer provides:

1. **Word-level lyrics**: YRC／QRC／KRC character-level timelines first, then AMLL TTML and LRCLIB; the lyrics panel has independent toggles for "original", "translation" and "romanization" (also configurable in settings), and clicking a line seeks to it;
2. **Cover modes**: vinyl-record and circular-spectrum cover animations;
3. **Audio visualizer**: bars, wave and circular spectrum modes, applied to the drawer background or the bottom bar (configured in settings);
4. **Drag to seek**: the progress bar supports dragging, with lyrics scrolling in sync.

## 7. My Music

The "My Music" section contains four pages:

| Page | Content | Stored in |
| --- | --- | --- |
| Favorites | Liked songs and collected playlists, albums, artists, MVs | Browser localStorage (`library`) |
| Recent | Play history | Browser localStorage (`audio`) |
| Downloads | Downloaded offline tracks (with quality metadata) | Browser IndexedDB (`downloaded_music`) |
| Local Music | Manually imported local audio files (drag-and-drop into the browser) | Browser IndexedDB (`local_music`) |

These are local storage locations, not a promise that no information leaves the device. No upload path was found for local audio file contents; however, embedded covers may be extracted as data URLs and sent with favorite events into a remote shared-track catalogue used by site-wide search or public suggestions. Titles, artists, albums, track identifiers, favorite feedback and recommendation context may also be sent. Profile reset does not remove the shared-track catalogue. Browser clearing removes local copies, not all remote records; general cloud backup is not guaranteed. Downloads and imports grant no additional content rights (see the [Acceptable Use Policy](/en/acceptable-use/)).

## 8. Settings

![The Sonic settings page: configuration cards for theme mode (follow system), interface language (Chinese), background type, quality, bottom-bar lyrics and audio visualization](/images/sonic/ui/ui-settings.png)

*Figure: the settings page organizes all preferences as cards. Each card covers one category: theme mode (light／dark／follow system), interface language (中文／English／日本語), background type, quality preference, bottom-bar lyrics display, audio-visualizer mode and more.*

Settings primarily use browser local storage (`settings`, `global` and related keys). This does not exclude transmission of search context or other preference signals; radar has separate remote-sync paths, and `auth` stores email and avatar details locally. A general cross-device backup is not provided.

## 9. Privacy and data controls

![The "Privacy & local data" section of the Sonic settings page: browser local storage and IndexedDB explanations, the smart search and personalised recommendation toggle, the Auto DJ toggle, and the reset-profile-and-dislikes button](/images/sonic/ui/ui-privacy.png)

*Figure: the "Privacy & local data" section. The screenshot's “never uploaded” and immediate-erasure wording is too broad: metadata and context can be sent, and reset is partial with potentially hidden failures. The screenshot is not proof of consent, complete deletion or deployed corrections.*

These controls cover only some actions described in the [Privacy Policy](/en/privacy-policy/), sections 6 and 9. Browser incognito mode does not stop requests or events:

1. **Smart search and personalisation toggle**: controls covered recommendation processing, not independent search-term counting or possible public suggestions; do not enter personal or sensitive text into search;
2. **Auto DJ toggle**: controls automatic continuation after a playlist finishes; being enabled by default does not establish consent;
3. **Reset recommendation profile and dislikes**: requests deletion of some current-identity events and feedback (`DELETE /api/sonic/events`), not necessarily old anonymous identifiers, radar data, search aggregates, external providers or backups; failures may not be shown;
4. **Clear all local data**: requests browser-storage clearing and a partial remote reset after confirmation, but does not clear HttpOnly session cookies or sign out. Reloading cleared settings may restore default-on personalisation; recheck choices. Local success does not prove complete remote erasure. For broader requests contact `privacy@epocanvas.com`.

## 10. Mobile layout

![The Sonic mobile home page: banner carousel, smart recommendation and music radar, preference-signal tags (Jay Chou, mandopop, r&b), personalised recommendation cards with their reasons, and the bottom mini player with tab navigation (Home, Search, Recent, Settings)](/images/sonic/ui/ui-mobile-home.png)

*Figure: the mobile layout. Cards show personalisation reasons and notes such as "often listened" and "similar to the genres you favour"; preference signals appear as tags; the bottom holds tab navigation and the mini player. The mobile player drawer (PlayerDrawerMobile) offers the same word-level lyrics and quality menu.*

Mobile and desktop share the same account system and data-storage rules; recommendation reasons are displayed under the same transparency principles as on desktop.

## 11. Related documents

| Document | Content |
| --- | --- |
| [Project Overview](/en/project/) | Product identity, architecture, recommendation engine and security design |
| [Privacy Policy](/en/privacy-policy/) | Behavioral event scope, legal bases and rights enforcement |
| [Terms of Service](/en/terms-of-service/) | Contractual conditions of use |
| [Data Processing & Security](/en/data-security/) | Data lifecycle and technical measures |
