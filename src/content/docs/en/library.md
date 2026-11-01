---
title: Music Library Management
description: "Sonic music library management — favorites and collections, recent plays, the download list and local music: where they are stored and how to manage them."
---

**Effective date: 2 November 2026｜Version: 1.5**

This page explains how the four sections of "My Music" are managed and where they live. All data is kept only in your browser and never uploaded to the server; for clearing and deletion see [Data Export & Storage](/en/data-management/).

## 1. Favorites and collections

"Favorites" aggregates everything you have marked: favorited songs, collected playlists, collected albums, followed artists and collected MVs. The entry points are the heart buttons on track rows, album pages and artist pages. The data lives in the browser's localStorage (the `library` key), takes effect immediately and requires no sign-in.

## 2. Recent plays

Play history is recorded automatically in the browser's localStorage (the `audio` key); the "Recent" page presents it in reverse chronological order, and clicking an entry plays it again. History is kept on your device only and is never synced with the server.

## 3. Download list

Click download on a track row or in the bottom player bar and the song is written, together with its quality metadata, into the browser's IndexedDB (`downloaded_music`); the "Downloads" page manages what you have downloaded, and it also plays while offline. Downloads consume the browser's storage quota; when the quota runs short the browser refuses new downloads — delete old downloads or free up browser storage first.

## 4. Local music

The "Local Music" page lets you import audio files into the browser by clicking to add or by drag-and-drop (`local_music`); imported files are presented and played together with the online catalogue. The import happens entirely inside the browser and files are never uploaded. Supported formats depend on your browser's decoding capability; deleting a track removes only the copy inside the browser and leaves your original files untouched.

## 5. Storage locations at a glance

| Content | Storage location | Lost when browser data is cleared |
| --- | --- | --- |
| Favorites and collections | localStorage (`library`) | Yes |
| Recent plays | localStorage (`audio`) | Yes |
| Downloaded songs | IndexedDB (`downloaded_music`) | Yes |
| Local music copies | IndexedDB (`local_music`) | Yes |

Back up important playlists and downloaded content yourself: the browser's "clear all site data" and the site's "clear all local data" both delete everything listed above (see [Data Export & Storage](/en/data-management/)). The original files of your local music remain on your device.
