---
title: Funktionsleitfaden
description: Sonic-Funktionsleitfaden – vertiefte Erläuterungen zu Qualitätsstufen und Hörproben-Transparenz, wortweisen Lyrics, Empfehlungen und Auto DJ, Downloads und lokaler Musik, Charts, MVs und Suchtoleranz.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite erläutert vertieft, wie sich die einzelnen Funktionen von Sonic verhalten und welche Abwägungen ihrem Entwurf zugrunde liegen. Die Position in der Oberfläche zeigt die [Oberflächen- und Funktionsübersicht](/de/interface/); die technische Beschreibung der Verhaltenssignale und des Empfehlungsmodells steht in der [Projektvorstellung](/de/project/), Abschnitt 5; die vertraglichen Bedingungen der Funktionsnutzung regeln die [Nutzungsbedingungen](/de/terms-of-service/). Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Qualitätsstufen und Hörproben-Transparenz

Sonic unterscheidet streng zwischen vollständigen Titeln und Hörproben:

1. Qualitätsstufen: Die verfügbaren Stufen der Quelle (SQ Lossless, HQ High Quality, Standard usw.) richten sich nach der tatsächlich vom Upstream ausgestellten Direktverknüpfung; das Qualitätsmenü listet nur real verfügbare Posten auf, und das Abzeichen kennzeichnet den aktuellen Stream wahrheitsgemäß;
2. Hörprobenerkennung: Die Prüfung von Länge und Metadaten der Audio-Entität erkennt die offiziellen 30-Sekunden-Hörproben; das Ergebnis erscheint als Hörproben-Kennzeichnung – eine Hörprobe wird niemals als vollständiger Titel ausgegeben;
3. Ergänzung über Quellen hinweg: Bei Aktivierung werden für Hörprobentitel automatisch die kostenlosen Volltitel von QQ/Kugou/Kuwo zugeordnet; bei Erfolg wechselt die Wiedergabe weich und gibt die Ersatzquelle an; ohne Zuordnung bleibt die Hörprobe erhalten und geht nach ihrem Ende natürlich zum nächsten Titel über;
4. Strenge Grenze: Technischer Zugriff oder eigene Mitgliedschaftsnachweise erteilen keine zusätzliche Inhaltslizenz; Zahlungs-, Zugriffs- und Urheberrechtsschutzmaßnahmen dürfen nicht umgangen werden.

## 2. Die Kette der wortweisen Lyrics

Die Lyrics werden nach dreistufiger Priorität bezogen:

| Priorität | Quelle | Format |
| --- | --- | --- |
| 1 | lokale native Parsung (NetEase/QQ/Kugou) | YRC/QRC/KRC zeichengenaue Zeitachse |
| 2 | AMLL | TTML wortweises Format |
| 3 | LRCLIB | synchronisierte Lyrics auf Zeilenebene |

Das Lyrics-Panel bietet drei unabhängige Schalter für Originaltext, Übersetzung und Umschrift; ein Klick auf eine Lyrics-Zeile springt an die Wiedergabeposition; die Animation auf Zeichenebene synchronisiert sich mit dem Wiedergabefortschritt. Auch die Lyrics-Daten durchlaufen den Edge-Cache; fehlt eine lokal nativ geparste Fassung, wird automatisch auf die globale Lyrics-Datenbank ausgewichen.

## 3. Empfehlungen und Auto DJ

1. „Empfohlen für dich“: persönliche Empfehlungen aus Abspielquote bis zum Ende, Favoriten, Sitzungsabsicht der Suche und MMR-Umsortierung für Vielfalt; die Karten nennen den Empfehlungsgrund (etwa „Häufig gehörter Künstler“), auf Mobilgeräten erscheinen zusätzlich die Präferenzsignale als Tags;
2. „Trend-Chart der Instanz“: 24-Stunden-Sprungchart und 7-Tage-Kumulativchart auf Grundlage der realen Wiedergabesignale der gesamten Instanz;
3. „Stil-Entdeckungsradar“: Erkundung nach Genre, mit einem Temperaturparameter zur Regulierung der Breite der Erkundung;
4. Auto DJ: Nach dem natürlichen Ende der Wiedergabeliste schließt es automatisch abspielbare Titel im Stil des aktuellen Titels an; der Schalter ist unabhängig von der Personalisierung und kann auch bei ausgeschalteter Personalisierung Starttitel und auszuschließende Titel senden;
5. Signalaufbereitung: 6 Klassen nicht nutzerseitiger Titelwechsel wie Stocken, Dekodierfehler und Hörprobenabbruch fließen nicht in den Empfehlungsdatenpool ein;
6. Datenkontrolle: Pseudonyme Kennungen bleiben möglicherweise personenbezogen. Personalisierung und Auto DJ sind standardmäßig aktiv, ohne dass dies Einwilligung belegt. 90 Tage sind keine universelle Löschfrist; Zurücksetzen kann Radar, alte Identitäten, Aggregate, externe Dienste und Backups auslassen sowie Fehler übergehen (siehe [Datenschutzerklärung](/de/privacy-policy/), Abschnitte 5, 6 und 9).

## 4. Downloads und lokale Musik

1. Download: Der Titel wird samt Qualitätsmetadaten in IndexedDB des Browsers gespeichert (`downloaded_music`), die Verwaltung erfolgt auf der Downloadlistenseite, offline abspielbar;
2. Lokale Musik: Lokale Audiodateien werden durch Ziehen oder Auswählen in den Browser importiert (`local_music`) und zusammen mit der Online-Titelbibliothek einheitlich dargestellt;
3. Grenze: Für lokale Audioinhalte wurde kein Uploadpfad gefunden; Lyrics-Abgleich, Feedback und Empfehlungskontext können Titel, Künstler, Album oder Kennungen übermitteln. Eingebettete Cover können mit Favoritenereignissen in den entfernten gemeinsamen Titelkatalog gelangen, der in websiteweiter Suche oder öffentlichen Vorschlägen erscheinen kann; ein Profilreset löscht diesen Katalog nicht. Nutzen und verbreiten Sie Dateien nur im Rahmen Ihrer Rechte.

## 5. Charts und offizielle Ranglisten

Die Chartseite bietet neue Titel und offizielle Ranglisten an, jeweils in fünf Unterkategorien (alle/chinesisch/westlich/japanisch/koreanisch); Ranglisten lassen sich mit einem Klick fortlaufend abspielen. Das Trend-Chart der Startseite und die Chartseite nutzen dasselbe Beliebtheitsmodell (Fünf-Faktor-Gewichtung + Zeitabnahme + bayesianische Glättung); Details in der [Projektvorstellung](/de/project/), Abschnitt 5.

## 6. MV-Wiedergabe

Von Suchergebnissen und Titelseite gelangen Sie zum MV-Player; Verfügbarkeit hängt vom Upstream ab. Direkte MV- und Bildanfragen können IP-Adressen offenlegen. Kommentare, Antworten und Likes werden derzeit nur lokal simuliert geschrieben; gelesene Upstream-Kommentare können personenbezogene Angaben enthalten und werden zwischengespeichert.

## 7. Suchtoleranz

Die Suchkette ist mit mehrstufiger Toleranz ausgestattet: Normalisierung vereinfachter und traditioneller Schriftzeichen, Suche über Pinyin und Abkürzungen, symmetrische Zuordnung chinesischer und englischer Künstleraliase, Rechtschreibtoleranz nach Editierdistanz und Versionsidentifikation; nach paralleler Suche in mehreren Quellen werden die Ergebnisse per Regex dedupliziert und zusammengeführt. Selbst fehlerhafte Stichwörter können Treffer liefern. Suchtexte können gesondert in öffentliche Vorschläge gelangen; das Abschalten der Personalisierung beendet diesen Pfad nicht.

## 8. Degradierungsmodus

Geht der Datenebenenknoten offline oder überschreitet er die Zeitgrenze, schaltet die Edge-Schicht automatisch in den Degradierungsmodus: Suche und Lyrics gehen vom Edge direkt an die öffentlichen Schnittstellen, die Oberfläche zeigt den Hinweis „Edge-Degradierungsmodus“ an, bereits gepufferte Inhalte können weiterlaufen, doch Verfügbarkeit und Wiederherstellungszeit sind nicht garantiert. Während der Degradierung können die vollständige Quellparsung und die Empfehlungsaktualisierung nicht verfügbar sein; nach der Wiederherstellung schließt sich der Zustand automatisch (zur Beschreibung des Notfallmechanismus siehe [Projektvorstellung](/de/project/), Abschnitt 3.1).
