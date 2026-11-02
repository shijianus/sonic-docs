---
title: Music Library Management
description: "Sonic music library management — favorites and collections, recent plays, the download list and local music: where they are stored and how to manage them."
---

**Revision date: 2 November 2026｜Version: 1.8**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page explains the local storage of the four "My Music" sections. No upload path was found for local audio file contents, but embedded artwork may be sent with favorite events and added to the remote shared-track catalogue used by site-wide search or public suggestions. Metadata, feedback and recommendation context may also be sent; local storage is not proof of no remote processing or a general cloud backup. For clearing and deletion limits see [Data Export & Storage](/en/data-management/).

## 1. Favorites and collections

"Favorites" aggregates everything you have marked: favorited songs, collected playlists, collected albums, followed artists and collected MVs. The entry points are the heart buttons on track rows, album pages and artist pages. The data lives in the browser's localStorage (the `library` key), takes effect immediately and requires no sign-in.

## 2. Recent plays

The "Recent" page reads playback history from localStorage (`audio`) in reverse chronological order and automatically retains up to 100 tracks. No separate switch for disabling this local playback history was found. Separate playback events and recent-artist context may be sent for recommendations, so a local history list does not mean there is no server-side record. Turning remote personalisation off does not turn off local history; browser incognito mode does not prevent event transmission.

## 3. Download list

Click download on a track row or in the bottom player bar and the song is written, together with its quality metadata, into the browser's IndexedDB (`downloaded_music`); the "Downloads" page manages what you have downloaded, and it also plays while offline. Downloads consume the browser's storage quota; when the quota runs short the browser refuses new downloads — delete old downloads or free up browser storage first.

## 4. Local music

The "Local Music" page imports selected or dragged audio files into IndexedDB (`local_music`). No upload path was found for local audio file contents, but lyric matching, favorite feedback and recommendation context may send titles, artists, albums or track identifiers. Embedded artwork may be extracted as a data URL and sent with favorite events into the remote shared-track catalogue, which can be returned in site-wide search or public suggestions; profile reset does not remove that catalogue. Supported formats depend on browser decoding; deleting a local copy leaves your original file untouched and does not erase related remote data or grant content rights.

## 5. Storage locations at a glance

| Content | Storage location | Lost when browser data is cleared |
| --- | --- | --- |
| Favorites and collections | localStorage (`library`) | Yes |
| Recent plays | localStorage (`audio`) | Yes |
| Downloaded songs | IndexedDB (`downloaded_music`) | Yes |
| Local music copies | IndexedDB (`local_music`) | Yes |

Back up important playlists and downloaded content yourself: the browser's "clear all site data" and the site's "clear all local data" both delete everything listed above (see [Data Export & Storage](/en/data-management/)). The original files of your local music remain on your device.
