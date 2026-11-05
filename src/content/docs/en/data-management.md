---
title: Data Export & Storage
description: Sonic data export and storage — the three classes of data location, the profile-overview query, clearing actions and backup advice.
---

**Revision date: 3 November 2026｜Version: 1.9**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page gathers the data present in Sonic: where it lives, what summary is available, and which backup, deletion and manual-request options exist. It is not a complete data-export tool. The legal bases and the framework of your rights are in the [Privacy Policy](/en/privacy-policy/), sections 4, 6 and 9; the technical measures are in [Data Processing & Security](/en/data-security/).

## 1. Where your data lives

| Data | Location | Linked identity | Retention |
| --- | --- | --- | --- |
| Favorites, playlists, preferences | Primarily browser localStorage; radar has remote paths | Some feedback and recommendation context may be sent | Local copies until cleared; remote data needs separate handling |
| Play history | Browser localStorage and separately reported playback events | Events may use linkable pseudonymous identifiers | Local clearing does not erase remote events |
| Downloads and local music | Browser IndexedDB | No local audio file-content upload path was found; titles, artists, albums, identifiers and embedded covers may be sent | Until cleared or browser eviction; remote data handled separately |
| Behavioural events and entity feedback | If actually enabled, server-side databases or external services | Pseudonymous identifiers, not anonymity | RC default 90 days, minimum 7; cleanup is incomplete and not per-record expiry, so comprehensive automatic deletion cannot be promised |
| Search aggregates and radar profiles | Remote search storage; durable radar engine storage is unconfirmed | Raw terms can identify people and appear publicly | No verified uniform automatic deadline; not fully covered by reset |
| Shared-track catalogue and optional external indexes | Server-side track catalogue and optional recommendation / search systems | User events may carry titles, artists and embedded cover data; available for site-wide search | Not fully cleared by profile reset; assess according to linkability |
| Search history (local) | Browser localStorage | Queries are also sent for search and may enter statistics / context | Local clearing does not remove remote copies |

Email and avatar information persist under browser `auth`; signed credentials are not encrypted. Raw IP keys can enter KV or rate limiters, and client addresses, sessions and context can be forwarded to the engine. A table without an IP column is not proof of no IP processing. General cross-device cloud backup is not guaranteed.

## 2. Inspect: the recommendation profile overview

The latest public RC provides `GET /api/sonic/events` (or the profile section in settings) to query a summary of the server-side profile; the older `main@ce443c8` is only a compatibility comparison and does not prove that the RC is deployed. Even where an instance provides it, the summary is not a complete copy of personal data or a portable export. A complete download of server-side events must not be promised.

## 3. Export and backup

1. **Browser data**: favorites, playlists, preferences, downloads and local music are primarily stored in your browser; some feedback, metadata and context are also sent. There is no general localStorage or IndexedDB export tool, built-in cloud backup or cross-device import. Record important playlists, keep original local music files, or use backup tools actually provided by a browser or operating system and that you trust;
2. **Remote data**: remote processing may involve events, entity feedback, search data and radar-sync paths, not only track events; durable radar engine storage is unconfirmed. The summary is not a full export and reset is partial. Request a fuller copy or deletion through the channels in section 5, including earlier identities where relevant;
3. **Recommendation profile summary**: a summary may be available only when the feature is enabled and the instance provides the settings page or API; live availability is unverified. It is not a complete export and cannot be described as all personal data;
4. **Local music**: the imported original files remain on your device; deleting the copy inside the browser does not affect the originals.

## 4. Clearing actions

| Action | Scope | Takes effect |
| --- | --- | --- |
| Reset recommendation profile and dislikes | Some events and feedback for the current identity; older identifiers, radar, aggregates, external services and backups may be omitted | RC route: `DELETE /api/sonic/events`; failures may be hidden, and success does not prove complete deletion |
| Clear all local data | Requests browser-storage clearing and possibly a partial remote reset; do not assume this removes cookies or URL credentials or signs you out | Verify results separately; reloading cleared settings may restore defaults, so recheck choices |
| Browser "clear site data" | Browser-side data only | According to browser controls; does not delete remote data |
| Sign out | Clears the current cookie; copied credentials need server revocation | Remote effect depends on configured revocation storage and request success |

## 5. Self-hosted instances and rights requests

For a self-hosted instance, contact the actual operator through the contact channel that operator publishes; Sonic's proposed email addresses are not contact channels for every independently operated controller. Users of hosted instances may send rights requests through the channel in section 9 of the [Privacy Policy](/en/privacy-policy/).

Self-hosted operators must identify every actual data store and recipient, not just the SQLite volume. Retention settings alone do not cover radar, search data, logs or backups. Implement necessary periods and verified deletion, isolate backups pending expiry, and reapply deletion records after restoration. See the [Deployment Guide](/en/deployment/), section 3, and [Open-Source & Self-Hosting Legal](/en/open-source/), section 4.
