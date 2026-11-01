---
title: Musikbibliothek verwalten
description: Verwaltung der Sonic-Musikbibliothek – Speicherorte und Bedienung von Favoriten, Playlists, zuletzt wiedergegebenen Titeln, Downloads und lokaler Musik.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite beschreibt die Verwaltung und den Speicherort der vier Bereiche unter „Meine Musik“. Alle diese Daten werden ausschließlich in Ihrem Browser gespeichert und nicht auf einen Server hochgeladen; das Leeren und Löschen ist unter [Datenexport und Speicherung](/de/data-management/) beschrieben.

## 1. Favoriten und Sammlungen

„Meine Favoriten“ bündelt die von Ihnen markierten Inhalte: favorisierte Titel, favorisierte Playlists und Alben, gefolgte Künstler sowie favorisierte MVs. Der Zugang erfolgt über die Herzschaltfläche in der Titelzeile sowie auf Album- und Künstlerseiten. Die Daten liegen im localStorage des Browsers (Schlüssel `library`), wirken sofort und erfordern keine Anmeldung.

## 2. Zuletzt wiedergegeben

Der Wiedergabeverlauf wird automatisch unter dem Schlüssel `audio` im localStorage des Browsers gespeichert und auf der Seite „Zuletzt wiedergegeben“ in umgekehrter zeitlicher Reihenfolge angezeigt. Ein Klick startet die Wiedergabe erneut. Der Verlauf bleibt auf diesem Gerät und wird nicht mit dem Server synchronisiert.

## 3. Downloadliste

Über die Downloadschaltfläche in der Titelzeile oder in der unteren Wiedergabeleiste werden Titel samt Qualitätsmetadaten in der IndexedDB des Browsers unter `downloaded_music` gespeichert. Die Seite „Downloadliste“ verwaltet diese Inhalte; sie können auch offline abgespielt werden. Downloads verbrauchen Speicherplatz des Browsers. Wenn das Kontingent erschöpft ist, lehnt der Browser weitere Downloads ab – löschen Sie dann ältere Downloads oder bereinigen Sie den Speicher.

## 4. Lokale Musik

Auf der Seite „Lokale Musik“ können Audiodateien per Klick oder durch Ziehen in den Browser importiert werden; sie werden in `local_music` gespeichert und zusammen mit der Onlinebibliothek angezeigt und abgespielt. Der Import findet vollständig im Browser statt, die Datei wird nicht hochgeladen. Unterstützte Formate richten sich nach den Dekodierungsfähigkeiten des Browsers. Das Löschen eines Titels entfernt nur die Browserkopie und nicht die Originaldatei.

## 5. Überblick über Speicherorte

| Inhalt | Speicherort | Geht beim Löschen der Browserdaten verloren |
| --- | --- | --- |
| Favoriten und Sammlungen | localStorage (`library`) | Ja |
| Wiedergabeverlauf | localStorage (`audio`) | Ja |
| Heruntergeladene Titel | IndexedDB (`downloaded_music`) | Ja |
| Kopien lokaler Musik | IndexedDB (`local_music`) | Ja |

Wichtige Playlists und Downloadinhalte sollten Sie sorgfältig sichern: Sowohl „Alle Daten löschen“ im Browser als auch „Alle lokalen Daten löschen“ auf der Website entfernt die genannten Inhalte (siehe [Datenexport und Speicherung](/de/data-management/)). Die Originaldateien lokaler Musik bleiben auf Ihrem Gerät erhalten.
