---
title: Referenz zu Suche und Suchregeln
description: Referenz zu Suche und Suchregeln von Sonic – Suchquellen, Toleranzregeln, Registerkarten und Aktionen auf der Ergebnisseite.
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Die Funktionsbeschreibungen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version. Der RC ist kein offizielles GitHub Release.

Diese Seite fasst die Fähigkeiten und Regeln der Sonic-Suche zusammen: Welche Eingaben funktionieren, wie Abweichungen behandelt werden und wie die Ergebnisse geordnet sind. Die Positionen in der Oberfläche stehen in der [Oberflächen- und Funktionsübersicht](/de/interface/), Abschnitt 2.

## 1. Suchumfang

Die Suche deckt vier Arten von Objekten ab: Titel, Künstler, Alben und Playlists. Die Ergebnisse werden in den drei Registerkarten „Titel/Playlists/MVs“ angezeigt. Der Sucheinstieg befindet sich am oberen Rand der Seitenleiste und auf der Suchseite; dort kann die Oberfläche Vorschläge zu häufig gesuchten Begriffen innerhalb des Dienstes einblenden.

## 2. Toleranz- und Abgleichregeln

| Regel | Erläuterung | Beispiel |
| --- | --- | --- |
| Vereinheitlichung vereinfachter und traditioneller Schriftzeichen | Beide Schreibweisen können versucht werden; der tatsächliche Abgleich hängt vom Index und der Verfügbarkeit vorgelagerter Quellen ab | „周杰伦“ und „周傑倫“ vergleichen |
| Suche mit Pinyin und Abkürzungen | Vollständiges Pinyin oder Anfangsbuchstaben können versucht werden; Treffer sind nicht für jede Quelle garantiert | „zjl“ für Titel mit Bezug zu 周杰伦／周傑倫 versuchen |
| Symmetrischer Abgleich von Aliasnamen | Die Website kann chinesische und fremdsprachige Künstlernamen verknüpfen; das tatsächliche Ergebnis hängt vom Index ab | Eine Suche nach dem fremdsprachigen Namen kann den chinesischen Alias finden |
| Toleranz über die Editierdistanz | Eine ähnliche Eingabe kann als Kandidat behandelt werden; nicht jeder Schreibfehler wird korrigiert | Eine ähnliche Zeichenfolge eingeben und das tatsächliche Ergebnis prüfen |
| Erkennung von Fassungen | Studio-, Live-, Cover- und andere Fassungen können unterschieden werden | Die im Ergebnis angegebene Fassung beachten |

## 3. Parallele Quellenabfrage und Duplikatbereinigung

Suchanfragen werden an aktivierte und zu diesem Zeitpunkt verfügbare vorgelagerte Quellen gesendet; anschließend werden die Ergebnisse nach Normalisierungsregeln zusammengeführt. Datensätze für denselben Titel aus mehreren Quellen können in einem einzigen Ergebnis aufgehen. Die Abspieladresse wird zum Zeitpunkt der Wiedergabe nach Verfügbarkeit ausgewählt. Die Quellen sowie ihre Standardschalter stehen im [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/), Abschnitt 3.

## 4. Aktionen auf der Ergebnisseite

Jede Titelzeile kann Wiedergabe, sofern vorhanden einen Einstieg zum MV, Favorisieren, Download und weitere Aktionen bieten; „Alle abspielen“ oben kann die Ergebnisse in ihrer Reihenfolge fortlaufend abspielen. Ein Playlist-Ergebnis öffnet die Playlist-Detailseite, ein MV-Ergebnis die MV-Liste; die tatsächlichen Aktionen hängen vom Ergebnis und der Instanzkonfiguration ab.

## 5. Suche und Datenschutz

Suchbegriffe werden wie folgt verarbeitet:

1. **Lokal**: Die lokale Verlaufsliste liegt im localStorage; Suchanfragen werden jedoch für die Suche übermittelt und ein Teil des Verlaufs kann Empfehlungen begleiten. Lokales Löschen entfernt bereits erstellte entfernte Kopien nicht;
2. **Serverseitige Aggregation**: Die intelligente Suche kann Suchbegriffe gesondert zählen oder speichern und sie in öffentlichen Vorschlägen anzeigen; das Abschalten der Personalisierung schließt diesen Pfad nicht allein aus. Fehlende Kontokennungen machen den Text nicht anonym; geben Sie keine persönlichen oder sensiblen Daten ein. Filter, Anzeigeschwellen, Speichersteuerung und Instanzkonfiguration müssen gesondert geprüft werden;
3. **Personalisierung**: Such- und Klicksignale können pseudonymisierten Kennungen zugeordnet werden. Der Personalisierungsschalter steuert nicht jeden Pfad der Suchstatistik; eine Einstellung oder Zurücksetzung auf 90 Tage bedeutet nicht, dass jedes Suchaggregat oder jede Kopie nach demselben Zeitplan gelöscht wird.

Siehe die [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 4, und die [Erklärung zum Empfehlungsalgorithmus](/de/recommendation/).
