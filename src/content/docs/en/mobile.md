---
title: Mobile Guide
description: The Sonic mobile guide — the phone layout, tab navigation, the mobile player drawer and mobile-specific behavior.
---

**Revision date: 2 November 2026｜Version: 1.8**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page explains the layout and the main points of using Sonic in a mobile browser. Mobile and desktop share the same instance and account system with feature parity; the layout switches automatically with screen width, and no app installation is needed.

## 1. Layout and navigation

On mobile, bottom tab navigation replaces the desktop sidebar: four entries — Home, Search, Recent, Settings; the currently playing track stays in the bottom mini player bar, which expands into the mobile player drawer (PlayerDrawerMobile) when tapped.

## 2. The player drawer

The mobile player drawer matches the desktop's capabilities: word-level lyrics (original／translation／romanization), the quality menu, play modes and download. The drawer background gradients with the cover's dominant colour and supports dragging the progress bar and seeking by tapping lyrics.

## 3. Home and radar

The mobile home matches the desktop: banner carousel, smart recommendation and music radar (shown after a search, matching your preferences), and recommended playlists. Recommendation reasons on cards and preference-signal tags are presented just as transparently on mobile, stacked vertically.

## 4. Storage and sync boundaries

Mobile and desktop browser storage are separate; general cross-device cloud sync, backup and export are not guaranteed. No upload path was found for local audio file contents, but embedded artwork may be sent with favorite events into the remote shared-track catalogue, and metadata, feedback and recommendation context may also be sent. Radar has remote-sync paths with availability limits; with personalisation off, a radar preference payload may still be sent, although the server may reject its storage. Sign-in is per browser; browser- or device-level migration depends on those tools and must not be assumed to restore all Sonic data. See the [Privacy Policy](/en/privacy-policy/).

## 5. Usage tips

1. Adding the site to your home screen gives a launch experience close to a native app;
2. Background playback is subject to mobile browser media policies: the system may pause playback when you switch apps, and it continues once you return to the page;
3. Power-saving modes and data savers may restrict background audio — this is browser behavior, not a limitation of the service;
4. Private browsing may discard local data when the private session ends, but does not stop requests or events. Personalisation and Auto DJ default to on, not affirmative consent; their controls and partial reset have the same limits as desktop, and failures may be hidden.
