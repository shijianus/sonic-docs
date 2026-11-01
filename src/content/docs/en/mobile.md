---
title: Mobile Guide
description: The Sonic mobile guide — the phone layout, tab navigation, the mobile player drawer and mobile-specific behavior.
---

**Effective date: 2 November 2026｜Version: 1.5**

This page explains the layout and the main points of using Sonic in a mobile browser. Mobile and desktop share the same instance and account system with feature parity; the layout switches automatically with screen width, and no app installation is needed.

## 1. Layout and navigation

On mobile, bottom tab navigation replaces the desktop sidebar: four entries — Home, Search, Recent, Settings; the currently playing track stays in the bottom mini player bar, which expands into the mobile player drawer (PlayerDrawerMobile) when tapped.

## 2. The player drawer

The mobile player drawer matches the desktop's capabilities: word-level lyrics (original／translation／romanization), the quality menu, play modes and download. The drawer background gradients with the cover's dominant colour and supports dragging the progress bar and seeking by tapping lyrics.

## 3. Home and radar

The mobile home matches the desktop: banner carousel, smart recommendation and music radar (shown after a search, matching your preferences), and recommended playlists. Recommendation reasons on cards and preference-signal tags are presented just as transparently on mobile, stacked vertically.

## 4. Storage and sync boundaries

Mobile browser local storage is independent of the desktop's: favorites, downloads and local music live in each device's own browser and do not sync across devices. The signed-in state is maintained independently per browser session. To migrate, rebuild your favorites on both ends or, if available, use a browser- or device-level sync feature outside the Sonic service; Sonic does not provide a general localStorage or IndexedDB export.

## 5. Usage tips

1. Adding the site to your home screen gives a launch experience close to a native app;
2. Background playback is subject to mobile browser media policies: the system may pause playback when you switch apps, and it continues once you return to the page;
3. Power-saving modes and data savers may restrict background audio — this is browser behavior, not a limitation of the service;
4. In private (incognito) mode local storage is not persistent: favorites and downloads are lost when you close the page — use the normal mode if you need them to persist.
