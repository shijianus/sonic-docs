---
title: Musikbibliothek verwalten
description: Verwaltung der Sonic-Musikbibliothek – Speicherorte und Bedienung von Favoriten, Playlists, zuletzt wiedergegebenen Titeln, Downloads und lokaler Musik.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite beschreibt die Verwaltung und den Speicherort der vier Bereiche unter „Meine Musik“. Die Bibliothek liegt überwiegend im Browser; für lokale Audioinhalte wurde kein Uploadpfad gefunden, eingebettete Cover können jedoch mit Favoritenereignissen in den entfernten gemeinsamen Titelkatalog gelangen, der in websiteweiter Suche oder öffentlichen Vorschlägen erscheinen kann. Feedback und Empfehlungskontext können ebenfalls übermittelt werden; Radar versucht eine entfernte Synchronisierung, ohne bestätigte entfernte Engine-Route oder allgemeine Cloud-Sicherung. Das Leeren und Löschen ist unter [Datenverwaltung und Speicherung](/de/data-management/) beschrieben. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Favoriten und Sammlungen

„Meine Favoriten“ bündelt die von Ihnen markierten Inhalte: favorisierte Titel, favorisierte Playlists und Alben, gefolgte Künstler sowie favorisierte MVs. Der Zugang erfolgt über die Herzschaltfläche in der Titelzeile sowie auf Album- und Künstlerseiten. Die Daten liegen im localStorage des Browsers (Schlüssel `library`), wirken sofort und erfordern keine Anmeldung.

## 2. Zuletzt wiedergegeben

Der Wiedergabeverlauf wird unter dem Schlüssel `audio` im localStorage des Browsers gespeichert und auf der Seite „Zuletzt wiedergegeben“ in umgekehrter zeitlicher Reihenfolge angezeigt; automatisch bleiben bis zu 100 Titel erhalten. Ein separater Schalter zum Deaktivieren dieses lokalen Verlaufs wurde nicht gefunden. Zugehörige Wiedergabeereignisse können unabhängig davon übermittelt werden. Das Abschalten entfernter Personalisierung beendet den lokalen Verlauf nicht.

## 3. Downloadliste

Über die Downloadschaltfläche in der Titelzeile oder in der unteren Wiedergabeleiste werden Titel samt Qualitätsmetadaten in der IndexedDB des Browsers unter `downloaded_music` gespeichert. Die Seite „Downloadliste“ verwaltet diese Inhalte; sie können auch offline abgespielt werden. Downloads verbrauchen Speicherplatz des Browsers. Wenn das Kontingent erschöpft ist, lehnt der Browser weitere Downloads ab – löschen Sie dann ältere Downloads oder bereinigen Sie den Speicher.

## 4. Lokale Musik

Auf der Seite „Lokale Musik“ können Audiodateien per Klick oder durch Ziehen in den Browser importiert werden; sie werden in `local_music` gespeichert und zusammen mit der Onlinebibliothek angezeigt und abgespielt. Für lokale Audioinhalte wurde kein Uploadpfad gefunden; Lyrics-Abgleich, Favoritenfeedback und Empfehlungen können jedoch Titel-, Künstler-, Albumdaten oder Kennungen senden. Eingebettete Cover können mit Favoritenereignissen in den entfernten gemeinsamen Titelkatalog gelangen, der in websiteweiter Suche oder öffentlichen Vorschlägen erscheinen kann; ein Profilreset entfernt diesen Katalog nicht. Unterstützte Formate richten sich nach den Dekodierungsfähigkeiten des Browsers. Das Löschen eines Titels entfernt nur die Browserkopie und nicht die Originaldatei.

## 5. Überblick über Speicherorte

| Inhalt | Speicherort | Geht beim Löschen der Browserdaten verloren |
| --- | --- | --- |
| Favoriten und Sammlungen | localStorage (`library`) | Ja |
| Wiedergabeverlauf | localStorage (`audio`) | Ja |
| Heruntergeladene Titel | IndexedDB (`downloaded_music`) | Ja |
| Kopien lokaler Musik | IndexedDB (`local_music`) | Ja |

Wichtige Playlists und Downloadinhalte sollten Sie sorgfältig sichern: Sowohl „Alle Daten löschen“ im Browser als auch „Alle lokalen Daten löschen“ auf der Website entfernt die genannten Inhalte (siehe [Datenverwaltung und Speicherung](/de/data-management/)). Die Originaldateien lokaler Musik bleiben erhalten. Browserbereinigung garantiert keine entfernte Löschung; die Website-Funktionen können Teilfehler übergehen. Allgemeine Browser-Synchronisierung überträgt localStorage und IndexedDB nicht notwendigerweise.
