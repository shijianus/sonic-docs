---
title: Referenz zu Suche und Suchregeln
description: Referenz zu Suche und Suchregeln von Sonic – Suchquellen, Toleranzregeln, Registerkarten und Aktionen auf der Ergebnisseite.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite fasst die Fähigkeiten und Regeln der Sonic-Suche zusammen: Welche Eingaben funktionieren, wie Abweichungen behandelt werden und wie die Ergebnisse geordnet sind. Die Positionen in der Oberfläche stehen in der [Oberflächen- und Funktionsübersicht](/de/interface/), Abschnitt 2.

## 1. Suchumfang

Die Suche deckt vier Arten von Objekten ab: Titel, Künstler, Alben und Playlists. Die Ergebnisse werden in den drei Registerkarten „Titel/Playlists/MVs“ angezeigt. Der Sucheinstieg befindet sich am oberen Rand der Seitenleiste und auf der Suchseite; dort werden Vorschläge zu häufig gesuchten Begriffen innerhalb des Dienstes eingeblendet.

## 2. Toleranz- und Abgleichregeln

| Regel | Erläuterung | Beispiel |
| --- | --- | --- |
| Vereinheitlichung vereinfachter und traditioneller Schriftzeichen | Eingaben in vereinfachten und traditionellen Schriftzeichen werden gleichwertig abgeglichen | „周杰伦“ und „周杰倫“ liefern dieselben Ergebnisse |
| Suche mit Pinyin und Abkürzungen | Treffer werden sowohl über die vollständige Pinyin-Schreibweise als auch über Anfangsbuchstaben gefunden | „zyy“ findet Titel mit Bezug zu 周杰伦 |
| Symmetrischer Abgleich von Aliasnamen | Chinesische und englische Künstlernamen werden in beide Richtungen miteinander verknüpft | Eine Suche nach dem englischen Namen kann den chinesischen Alias finden |
| Toleranz über die Editierdistanz | Schreibfehler werden anhand der Editierdistanz korrigiert | Auch eine annähernde Eingabe kann den gesuchten Treffer liefern |
| Erkennung von Fassungen | Studio-, Live-, Cover- und andere Fassungen werden unterschieden | In den Ergebnissen wird die Fassung gekennzeichnet |

## 3. Parallele Quellenabfrage und Duplikatbereinigung

Suchanfragen werden parallel an die aktivierten vorgelagerten Quellen gesendet, und die Ergebnisse werden nach der Regex-Deduplikation zusammengeführt: Datensätze für denselben Titel aus mehreren Quellen gehen in einem einzigen Ergebnis auf. Die Abspieladresse wird zum Zeitpunkt der Wiedergabe nach Verfügbarkeit ausgewählt. Die Quellen sowie ihre Standardschalter stehen im [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/), Abschnitt 3.

## 4. Aktionen auf der Ergebnisseite

Jede Titelzeile bietet Wiedergabe, sofern vorhanden einen Einstieg zum MV, Favorisieren, Download und weitere Aktionen; „Alle abspielen“ oben in der Liste spielt die Ergebnisse in ihrer Reihenfolge fortlaufend ab. Ein Playlist-Ergebnis öffnet die Playlist-Detailseite, ein MV-Ergebnis die MV-Liste.

## 5. Suche und Datenschutz

Suchbegriffe werden wie folgt verarbeitet:

1. Lokal: Die letzten Suchbegriffe (höchstens 10) werden ausschließlich im localStorage des Browsers gespeichert und mit „Alle lokalen Daten löschen“ entfernt;
2. Serverseitige Aggregation: Suchbegriffe fließen in globale Zählungen ohne persönliche Kennung für die Rangliste häufig gesuchter Begriffe ein;
3. Personalisierung: Bei aktivierter Personalisierung wird ein Suchklick als pseudonymisiertes Empfehlungssignal 90 Tage gespeichert; nach dem Abschalten werden keine Ereignisse aufgezeichnet.

Siehe die [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 4, und die [Erklärung zum Empfehlungsalgorithmus](/de/recommendation/).
