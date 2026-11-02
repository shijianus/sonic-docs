---
title: Erklärung zum Empfehlungsalgorithmus
description: Erklärung des Sonic-Empfehlungsalgorithmus – Verhaltenssignale und Gewichte, Popularitätsmodell, Sitzungsabsicht, MMR-Neusortierung, Auto DJ und Datenschutzeinstellungen.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite beschreibt den Aufbau der Sonic-Empfehlungsengine: Welche Signale in das Modell eingehen, wie sie gewichtet und sortiert werden und welche Steuerungsmöglichkeiten Sie haben. Alle Regeln sind im Quellcode einsehbar. Rechtsgrundlagen und Grenzen der Datenerhebung stehen in der [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 4.2 und 5. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Verhaltenssignale und Gewichte

| Signal | Gewicht | Erläuterung |
| --- | --- | --- |
| favorite (zu Favoriten hinzugefügt) | +4,0 | sehr stark positiv |
| replay (erneut abgespielt) | +3,5 | stark positiv |
| play_complete (vollständig und wirksam abgespielt) | +2,5 | Standard positiv |
| play_progress (fortschreitendes Hören) | +0,2 bis +1,8 | Bewertung gestaffelt nach Höranteil |
| skip (schnelles Überspringen) | -0,8 | Wechsel nach mehr als der Hälfte zählt +0,25 |
| dislike (ausdrückliche Ablehnung) | -5,0 | Filtert passende Empfehlungen nur im Rahmen der verfügbaren Identität und Funktionen; verspricht keine dauerhafte, umfassende Sperre |

**Rauschbereinigung**: Titelwechsel, die auf Netzwerkstocken (network_stall), Dekodierfehlern (playback_error), Hörprobenabbruch (trial_end), nicht verfügbaren Streams (stream_unavailable), Puffer-Timeouts (buffer_timeout) oder fehlgeschlagener automatischer Umschaltung (auto_switch_error) beruhen, gehen nicht auf den Nutzer zurück. Ihr Gewicht ist durchgängig null und sie werden nicht gespeichert.

## 2. Popularitätsmodell

Das „Trend-Chart der Instanz“ gewichtet fünf Faktoren: wirksame Wiedergaben (35 %), eigenständige Hörer (25 %), Abspielverhalten bis zum Ende (20 %), Favoritenkonversion (15 %) und Wachstumssteigung (5 %). Hinzu kommen eine exponentielle Zeitabnahme (24-Stunden-Trendcharts und 7-Tage-Kumulativcharts) sowie eine bayesianische Glättung und Wilson Score, damit einmalige Ereignisse mit wenigen Wiedergaben und hoher Abschlussquote nicht ausnahmsweise an die Spitze gelangen.

## 3. Sitzungsabsicht und langfristige Präferenzen

Die Suchabsicht einer Sitzung (aufeinanderfolgende Suchbegriffe sowie angeklickte Künstler und Genres) fließt mit hohem kurzfristigem Gewicht in die unmittelbare Sortierung ein und bleibt von den langfristigen Präferenzen schichtweise entkoppelt: Die Gewichtung ist keine Aussage über Löschfristen. Auch Entitätsfeedback, Radar-Profile und gesonderte Suchstatistiken bestehen; Suchtexte können in öffentliche Vorschläge gelangen.

## 4. Diversitäts-Neusortierung und Auto DJ

1. Ähnlichkeit: Verknüpfung des Künstlerbeziehungsgraphen mit der Ähnlichkeit der Mengen aus Genre- und Sprach-Tags sowie der Kosinusähnlichkeit der Audio-Merkmale;
2. MMR-Neusortierung: Die Neusortierung nach marginaler Relevanz balanciert Präzision und Neuheit aus und verhindert, dass die Empfehlungen in einer Filterblase aus einem einzigen Künstler oder einer einzigen Stilrichtung verharren;
3. Auto DJ: Nach dem natürlichen Ende einer Wiedergabeliste wird anhand des Stils des aktuellen Titels automatisch ein abspielbarer Titel angehängt; der Schalter ist unabhängig von der Personalisierung und kann auch bei ausgeschalteter Personalisierung Starttitel und auszuschließende Titel senden.

## 5. Musik- und Stilradar

Das Radar auf der Startseite nutzt Suchabsicht und Präferenzsignale; der Code enthält lokalen Radarzustand, Profile und entfernte Synchronisierungspfade. Es ist keine reine Anzeigefunktion ohne Änderungen an gespeicherten Daten. Auch bei ausgeschalteter Personalisierung kann eine Synchronisierungsnutzlast mit Titeln, Covern und Signalen gesendet werden; der Server kann die Speicherung anhand des Abschaltkennzeichens ablehnen. Übermittlung und erfolgreiche Speicherung sind getrennt zu beurteilen. Die entfernten Routen sind nur eingeschränkt verfügbar und garantieren keine allgemeine Cloud-Synchronisierung. Ereignisbereinigung und Profilreset erfassen Radardaten nicht vollständig.

## 6. Ihre Steuerungsmöglichkeiten

| Steuerung | Ort | Wirkung |
| --- | --- | --- |
| Hauptschalter für Personalisierung | Einstellungen → Datenschutz und lokale Daten | Steuert den vorgesehenen Personalisierungspfad; gesonderte Suchstatistik und notwendige Anfragen können weiterlaufen |
| Auto-DJ-Schalter | Einstellungen → Datenschutz und lokale Daten | Steuert das automatische Fortsetzen nach dem Ende der Wiedergabeliste |
| Empfehlungsprofil zurücksetzen | Einstellungen → Datenschutz und lokale Daten | Löscht nur Teile der aktuellen Identität; alte anonyme Kennungen, Radar, Aggregate, externe Dienste und Backups können verbleiben, Fehler können unbemerkt bleiben |
| Titel ablehnen | dislike im Player | Filtert passende Empfehlungen nur im Rahmen der verfügbaren Identität und Funktionen; verspricht keine dauerhafte, umfassende Sperre |

Personalisierung und Auto DJ sind derzeit standardmäßig aktiviert; dies belegt keine wirksame vorherige Einwilligung. Hash- und `anon_`-Kennungen bleiben möglicherweise personenbezogen. Die 90-tägige Standardfrist für Ereignisse ist keine Löschung jedes Datensatzes genau bei Ablauf und keine Frist für sämtliche Datenkategorien. Privater Browsermodus verhindert keine Anfragen oder Ereignisübermittlung. Für umfassendere Löschung oder eine Datenkopie kontaktieren Sie `privacy@epocanvas.com`. Technische Abweichungen sind zu korrigieren; Quellcode ersetzt weder richtige Informationen noch Rechtsgrundlagen. Der Abgleich ist im [Entwicklungsleitfaden](/de/development/), Abschnitt 4, beschrieben.
