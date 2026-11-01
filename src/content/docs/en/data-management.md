---
title: Data Export & Storage
description: Sonic data export and storage — the three classes of data location, the profile-overview query, clearing actions and backup advice.
---

**Effective date: 2 November 2026｜Version: 1.5**

This page gathers the data present in Sonic: where it lives, what summary is available, and which backup, deletion and manual-request options exist. It is not a complete data-export tool. The legal bases and the framework of your rights are in the [Privacy Policy](/en/privacy-policy/), sections 4, 6 and 9; the technical measures are in [Data Processing & Security](/en/data-security/).

## 1. Where your data lives

| Data | Location | Linked identity | Retention |
| --- | --- | --- | --- |
| Favorites, playlists, preferences | Browser localStorage | Never uploaded | Until cleared |
| Play history | Browser localStorage | Never uploaded | Until cleared |
| Downloads and local music | Browser IndexedDB | Never uploaded | Until cleared |
| Behavioral events | Server-side SQLite (data plane) | Pseudonymised hash | Auto-destroyed after 90 days |
| Global aggregate statistics | Server-side SQLite | Not linked to individuals | Maintained with the store |
| Search history (local) | Browser localStorage | Never uploaded | Until cleared |

Account identification data (e-mail addresses and the like) is never persisted to disk and exists only for the duration of the session; the database has no IP column.

## 2. Inspect: the recommendation profile overview

Via `GET /api/sonic/events` (or the profile block on the settings page) you can query the available summary of the server-side profile as it stands: total event count, favorite and dislike counts, frequently played artists, genre leanings, recent search terms and the storage form. This summary is not a complete export or a copy of all personal data; it only presents the indicators exposed by this function.

## 3. Export and backup

1. **Browser data**: favorites, playlists and downloads remain in the browser you use. The service has no built-in cloud export and no general export of browser localStorage or IndexedDB; browser- or device-level backup tools may vary and are not guaranteed. You can also record or rebuild important playlists;
2. **Behavioral events**: the server holds only pseudonymised behavioral events and provides no download or export channel for them; to delete them, use the clearing actions in section 4, or write to `privacy@epocanvas.com` for a request requiring human handling;
3. **Local music**: the imported original files remain on your device; deleting the copy inside the browser does not affect the originals.

The profile summary is not a substitute for a complete export. Access, rectification, restriction, portability and other manual requests are handled through the channel described in the [Privacy Policy](/en/privacy-policy/); this does not create an automatic export function.

## 4. Clearing actions

| Action | Scope | Takes effect |
| --- | --- | --- |
| Reset recommendation profile and dislikes | All behavioral events server-side | Immediately (`DELETE /api/sonic/events`) |
| Clear all local data | Browser localStorage, sessionStorage, IndexedDB + server-side profile | Immediately after confirmation |
| Browser "clear site data" | The same (browser side) | Immediately |
| Sign out | Session and keys | Immediately |

## 5. Self-hosted instances

On a self-hosted instance, data lives on the deployer's data plane (the named SQLite volume); the deployer can configure the retention days and the on-disk path (see the [Deployment Guide](/en/deployment/), section 3); the backup and notice duties are likewise in [Open-Source & Self-Hosting Legal](/en/open-source/), section 4.
