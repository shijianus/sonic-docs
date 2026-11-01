---
title: Quick Start
description: The Sonic quick start — the shortest path from opening the site to search and playback, sign-in and sync, downloads and local music, and mobile use.
---

**Effective date: 1 November 2026｜Version: 1.4**

This page gives the shortest path to using the hosted Sonic instance (`sonic.epocanvas.tech`): from opening the site to search and playback, sign-in and sync, downloads and local music, and mobile use. A full tour of the interface is in the [Interface & Features Guide](/en/interface/); this page does not cover self-hosting (see the [Deployment Guide](/en/deployment/)).

## 1. Open the site

Visit `sonic.epocanvas.tech` in your browser (backup mirror `sonic.epocanvas.com`). The interface language follows your browser by default and can be switched among Simplified Chinese, English and Japanese under "Settings → Interface language"; the theme (light／dark／follow system) is adjusted in the same place. All core functions are available without signing in.

## 2. Search and playback

1. In the search box at the top of the left sidebar (or on the "Search" page), enter keywords for a track, artist, album or playlist; search supports simplified/traditional normalization, pinyin initials and spelling tolerance;
2. Results are split into three tabs — tracks／playlists／MV; clicking a track starts playback, or use "Play all" to run through the whole list;
3. The bottom player bar shows the current track, a lyric preview line and the quality badge (such as SQ lossless); clicking the cover expands the full-screen player drawer with word-level lyrics (original text, translation and romanization, each independently switchable).

When a 30-second trial clip comes up, the player labels it honestly as a trial and never presents it as a full track; with cross-source completion enabled, it automatically attempts to match a free full track.

## 3. Sign-in and favorites sync

Sign in with an Epomail account over OAuth 2.0 (PKCE); the service maintains no separate registration system:

1. Click the sign-in entry at the bottom of the sidebar, which takes you to the Epomail authorization page to confirm;
2. After signing in you can use favorite tracks, saved playlists, followed artists and self-built playlists (stored in your browser's local storage);
3. Signing in also unlocks personalised recommendations and Auto DJ continuous playback — both can be switched off under "Settings → Privacy & local data"; when off, recommendations run in pure public mode and no behavioral events are recorded.

A session is valid for at most 30 days and is revoked immediately on sign-out. The account rules are in the [Terms of Service](/en/terms-of-service/), section 3.

## 4. Downloads and local music

1. **Download**: click download in a track's action column or in the bottom player bar; the song is saved together with its quality metadata into the browser's IndexedDB and managed on the "Downloads" page; it plays offline;
2. **Local music**: the "Local Music" page supports adding audio files by click or by dragging them into the browser; imported files are likewise stored in IndexedDB and are never uploaded to a server;
3. Both are for personal listening only and must not be redistributed (see the [Acceptable Use Policy](/en/acceptable-use/)).

## 5. Mobile use

Opening the same address in a phone browser gives the mobile layout: bottom tab navigation (Home, Search, Recent, Settings) and a mini player bar; the player drawer offers the same word-level lyrics and quality menu. Favorites, preferences and downloads are stored independently on mobile and on desktop (each within its own browser).

## 6. First steps in privacy settings

On first use, three controls are worth knowing (located under "Settings → Privacy & local data"):

1. **Smart search and personalised recommendations**: the master switch; when off, events are no longer collected;
2. **Auto DJ**: controls automatic continuation after a playlist finishes playing;
3. **Reset recommendation profile and dislikes／clear all local data**: two deletion buttons that take effect immediately.

The full statement of our privacy commitments is in the [Privacy Policy](/en/privacy-policy/).

## 7. FAQ quick reference

| Question | Answer |
| --- | --- |
| Is the service paid? | Free, with no advertising and no in-app purchases |
| Can I use it without signing in? | Core functions are available anonymously (with stricter rate limits) |
| Where does my data live? | Browser local storage + server-side pseudonymised behavioral events (90 days) |
| How do I delete my profile? | Settings → reset recommendation profile, effective immediately |
| Why only 30 seconds? | Official trial truncation, labelled honestly with best-effort cross-source completion |
| Is the quality badge overstated? | The badge honestly reflects the current stream's tier |

For more questions see the [Project Overview](/en/project/), section 12; for legal terms see [Key Terms](/en/key-terms/).
