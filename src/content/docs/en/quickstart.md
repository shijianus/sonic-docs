---
title: Quick Start
description: The Sonic quick start — the shortest path from opening the site to search and playback, sign-in and local library use, downloads and local music, and mobile use.
---

**Revision date: 2 November 2026｜Version: 1.8**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page gives the shortest path to using the hosted Sonic instance (`sonic.epocanvas.tech`): from opening the site to search and playback, sign-in and local library use, downloads and local music, and mobile use. A full tour of the interface is in the [Interface & Features Guide](/en/interface/); this page does not cover self-hosting (see the [Deployment Guide](/en/deployment/)).

## 1. Open the site

Visit `sonic.epocanvas.tech` in your browser (backup mirror `sonic.epocanvas.com`). The interface language follows your browser by default and can be switched among Simplified Chinese, English and Japanese under "Settings → Interface language"; the theme (light／dark／follow system) is adjusted in the same place. All core functions are available without signing in.

## 2. Search and playback

1. In the search box at the top of the left sidebar (or on the "Search" page), enter keywords for a track, artist, album or playlist; search supports simplified/traditional normalization, pinyin initials and spelling tolerance;
2. Results are split into three tabs — tracks／playlists／MV; clicking a track starts playback, or use "Play all" to run through the whole list;
3. The bottom player bar shows the current track, a lyric preview line and the quality badge (such as SQ lossless); clicking the cover expands the full-screen player drawer with word-level lyrics (original text, translation and romanization, each independently switchable).

When a 30-second trial clip comes up, the player labels it honestly as a trial and never presents it as a full track; with cross-source completion enabled, it automatically attempts to match a free full track.

## 3. Sign-in and local library

Sign in with an Epomail account over OAuth 2.0 (PKCE); the service maintains no separate registration system:

1. Click the sign-in entry at the bottom of the sidebar, which takes you to the Epomail authorization page to confirm;
2. Favorite tracks, saved playlists, followed artists and self-built playlists primarily use browser storage; some favorite feedback and recommendation context may be sent. General cross-device cloud sync is not guaranteed, while radar has separate remote-sync paths;
3. Personalisation and Auto DJ currently default to on, even without affirmative consent. Signing in is not consent. You can turn them off under "Settings → Privacy & local data", but this does not stop separate search statistics or necessarily every radar path; optional processing without a valid basis must be suspended.

A session lasts 30 days by default. Sign-out clears the current cookie; remote revocation of copied credentials depends on configuration and request success. The service is for ages 16 and over, but sign-in does not verify age. See the [Terms of Service](/en/terms-of-service/), section 3.

## 4. Downloads and local music

1. **Download**: click download in a track's action column or in the bottom player bar; the song is saved together with its quality metadata into the browser's IndexedDB and managed on the "Downloads" page; it plays offline;
2. **Local music**: add audio files by selection or drag-and-drop. No upload path was found for local audio file contents; lyric matching, favorite feedback and recommendation context may send titles, artists, albums or track identifiers. Embedded artwork may be sent as a data URL with favorite events into the remote shared-track catalogue, used by site-wide search or public suggestions; profile reset does not remove that catalogue;
3. Both are for personal listening only and must not be redistributed (see the [Acceptable Use Policy](/en/acceptable-use/)).

## 5. Mobile use

Opening the same address in a phone browser gives the mobile layout: bottom tab navigation (Home, Search, Recent, Settings) and a mini player bar; the player drawer offers the same word-level lyrics and quality menu. Local libraries and downloads are separate per browser; general cross-device sync is not guaranteed, and this does not exclude metadata transmission or separate radar-sync paths.

## 6. First steps in privacy settings

On first use, three controls are worth knowing (located under "Settings → Privacy & local data"):

1. **Smart search and personalised recommendations**: controls covered recommendation processing, not all network requests or independent search-term reuse. Raw queries may appear in public suggestions, so do not enter private or sensitive information;
2. **Auto DJ**: controls automatic continuation after a playlist finishes playing; the default-on setting is not consent;
3. **Reset recommendation profile and dislikes／clear all local data**: reset covers only some current-identity events and feedback and may hide failures; local clearing does not prove complete remote deletion. For broader requests, contact `privacy@epocanvas.com`. Incognito mode does not stop requests or events.

The full statement of our privacy commitments is in the [Privacy Policy](/en/privacy-policy/).

## 7. FAQ quick reference

| Question | Answer |
| --- | --- |
| Is the service paid? | Free, with no advertising and no in-app purchases |
| Can I use it without signing in? | Core functions are available without sign-in, which does not make use anonymous |
| Where does my data live? | Browser storage plus remote events, feedback, radar and search data; 90 days does not cover every record  |
| How do I delete my profile? | Settings → reset recommendation profile is partial; request broader deletion through the privacy contact |
| Why only 30 seconds? | Official trial truncation, labelled honestly with best-effort cross-source completion |
| Is the quality badge overstated? | The badge honestly reflects the current stream's tier |

For more questions see the [Project Overview](/en/project/), section 12; for legal terms see [Key Terms](/en/key-terms/).
