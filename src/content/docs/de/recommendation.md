---
title: Erklärung zum Empfehlungsalgorithmus
description: Erklärung des Sonic-Empfehlungsalgorithmus – Verhaltenssignale und Gewichte, Popularitätsmodell, Sitzungsabsicht, MMR-Neusortierung, Auto DJ und Datenschutzeinstellungen.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite beschreibt den Aufbau der Sonic-Empfehlungsengine: Welche Signale in das Modell eingehen, wie sie gewichtet und sortiert werden und welche Steuerungsmöglichkeiten Sie haben. Alle Regeln sind im Quellcode einsehbar. Rechtsgrundlagen und Grenzen der Datenerhebung stehen in der [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 4.2 und 5.

## 1. Verhaltenssignale und Gewichte

| Signal | Gewicht | Erläuterung |
| --- | --- | --- |
| favorite (zu Favoriten hinzugefügt) | +4,0 | sehr stark positiv |
| replay (erneut abgespielt) | +3,5 | stark positiv |
| play_complete (vollständig und wirksam abgespielt) | +2,5 | Standard positiv |
| play_progress (fortschreitendes Hören) | +0,2 bis +1,8 | Bewertung gestaffelt nach Höranteil |
| skip (schnelles Überspringen) | -0,8 | Wechsel nach mehr als der Hälfte zählt +0,25 |
| dislike (ausdrückliche Ablehnung) | -5,0 | harte Filterung und Eintrag in die Negativliste |

**Rauschbereinigung**: Titelwechsel, die auf Netzwerkstocken (network_stall), Dekodierfehlern (playback_error), Hörprobenabbruch (trial_end), nicht verfügbaren Streams (stream_unavailable), Puffer-Timeouts (buffer_timeout) oder fehlgeschlagener automatischer Umschaltung (auto_switch_error) beruhen, gehen nicht auf den Nutzer zurück. Ihr Gewicht ist durchgängig null und sie werden nicht gespeichert.

## 2. Popularitätsmodell

Das „Trend-Chart der Instanz“ gewichtet fünf Faktoren: wirksame Wiedergaben (35 %), eigenständige Hörer (25 %), Abspielverhalten bis zum Ende (20 %), Favoritenkonversion (15 %) und Wachstumssteigung (5 %). Hinzu kommen eine exponentielle Zeitabnahme (24-Stunden-Trendcharts und 7-Tage-Kumulativcharts) sowie eine bayesianische Glättung und Wilson Score, damit einmalige Ereignisse mit wenigen Wiedergaben und hoher Abschlussquote nicht ausnahmsweise an die Spitze gelangen.

## 3. Sitzungsabsicht und langfristige Präferenzen

Die Suchabsicht einer Sitzung (aufeinanderfolgende Suchbegriffe sowie angeklickte Künstler und Genres) fließt mit hohem kurzfristigem Gewicht in die unmittelbare Sortierung ein und bleibt von den langfristigen Präferenzen schichtweise entkoppelt: Nur hochwertige Verhalten wie vollständiges Abspielen und Favorisieren fließen in das Langzeitprofil ein; eine gelegentliche Suche verändert Ihr langfristiges Profil nicht sofort.

## 4. Diversitäts-Neusortierung und Auto DJ

1. Ähnlichkeit: Verknüpfung des Künstlerbeziehungsgraphen mit der Ähnlichkeit der Mengen aus Genre- und Sprach-Tags sowie der Kosinusähnlichkeit der Audio-Merkmale;
2. MMR-Neusortierung: Die Neusortierung nach marginaler Relevanz balanciert Präzision und Neuheit aus und verhindert, dass die Empfehlungen in einer Filterblase aus einem einzigen Künstler oder einer einzigen Stilrichtung verharren;
3. Auto DJ: Nach dem natürlichen Ende einer Wiedergabeliste wird anhand des Stils des aktuellen Titels automatisch ein abspielbarer Titel angehängt; die Funktion lässt sich in den Einstellungen abschalten.

## 5. Musik- und Stilradar

Nach einer Suche zeigt das Radar auf der Startseite auf Grundlage Ihrer Suchabsicht und Präferenzsignale sofort passende Ergebnisse an, ausgerichtet am Stil der Karten beliebter Titel. Das Radar verändert nur die Reihenfolge der Empfehlungen, die Sie sehen, und keine gespeicherten Daten.

## 6. Ihre Steuerungsmöglichkeiten

| Steuerung | Ort | Wirkung |
| --- | --- | --- |
| Hauptschalter für Personalisierung | Einstellungen → Datenschutz und lokale Daten | Nach dem Abschalten werden keine Ereignisse mehr erhoben; die Empfehlungen wechseln in den rein öffentlichen Modus |
| Auto-DJ-Schalter | Einstellungen → Datenschutz und lokale Daten | Steuert das automatische Fortsetzen nach dem Ende der Wiedergabeliste |
| Empfehlungsprofil zurücksetzen | Einstellungen → Datenschutz und lokale Daten | Vernichtet sofort alle serverseitig gespeicherten Verhaltensereignisse |
| Titel ablehnen | dislike im Player | Harte Filterung; der Titel erscheint nicht mehr in Empfehlungen |

Technische Einzelheiten werden mit dem Quellcode weiterentwickelt. Wenn dieser Text und der Quellcode voneinander abweichen, gilt der Quellcode und die Dokumentation wird korrigiert. Der Abgleich ist im [Entwicklungsleitfaden](/de/development/), Abschnitt 4, beschrieben.
