---
title: Oberflächen- und Funktionsübersicht
description: "Überblick über Oberfläche und Funktionen des Sonic-Players – Startseite, Suche, Wiedergabe, Player-Drawer, Meine Musik, Einstellungen, Datenschutz, Mobil."
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Diese Seite führt durch das Layout der Oberfläche des Sonic-Webplayers und die Position der einzelnen Funktionen und erläutert, wo sich jede Funktion befindet und wie sie sich verhält. Die Screenshots veranschaulichen die Oberfläche in vereinfachtem Chinesisch; die Oberflächensprache lässt sich wechseln. Sie belegen nicht die aktuell bereitgestellte Version. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version. Die Oberfläche kann sich mit künftigen Versionen ändern; der tatsächlich verfügbare Funktionsumfang richtet sich nach dem, was die jeweilige Instanz aktiviert hat. Die rechtlichen Regelungen finden sich in den [Nutzungsbedingungen](/de/terms-of-service/) und in der [Datenschutzerklärung](/de/privacy-policy/).

![Sonic-Player-Startseite: linke Navigationsleiste (drei Bereiche Entdecken, Meine Musik, System), im Hauptbereich Karussellempfehlungen, intelligente Empfehlungen und Musikradar sowie Empfehlungsplaylists, unten die Mini-Wiedergabeleiste](/images/sonic/ui/ui-home.png)

*Abbildung: Startseite der Desktopversion. Die linke Seitenleiste gliedert sich in „Entdecken“ (Startseite, MVs, Charts, Künstler, neue Alben, Suche) und „Meine Musik“ (Meine Favoriten, Zuletzt wiedergegeben, Downloadliste, Lokale Musik); der Hauptbereich zeigt von oben nach unten den Karussellempfehlungsbereich, intelligente Empfehlungen und Musikradar sowie Empfehlungsplaylists; unten bleibt dauerhaft die Mini-Wiedergabeleiste.*

## 1. Startseite und intelligente Empfehlungen

Die Startseite bündelt drei Inhaltsbereiche:

1. Karussellempfehlungsbereich: zeigt Empfehlungen für neue Lieder, neue Alben und beliebte Lieder; die Karten tragen Quellenkennzeichnungen wie „sonic Neue Lieder“ und „sonic Empfehlung beliebter Lieder“, ein Klick startet direkt die Wiedergabe oder öffnet die Details;
2. Intelligente Empfehlungen und Musikradar: drei Ansichten „Empfohlen für dich“, „Trend-Chart der Instanz“ und „Stil-Entdeckungsradar“ mit den Aktionen „Weitere anzeigen“ und „Empfehlungsliste abspielen“. Nach einer vollzogenen Suche zeigt das Radar dynamisch passende Ergebnisse entsprechend Ihrer Suchabsicht und Ihrer Präferenzsignale. Die Empfehlungskarten nennen den Empfehlungsgrund (etwa das Abzeichen „Personalisierte Empfehlung“ und Hinweise wie „Häufig gehörter Künstler“ oder „Ähnlich deinem bevorzugten Stil“); die Startseite auf Mobilgeräten zeigt zudem die Präferenzsignale der aktuellen Sitzung als Tags (z. B. Künstler, Genre); zu den Signalkategorien der Empfehlungsgrundlage siehe die [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 4.2;
3. Empfehlungsplaylists und beliebte Titel: erzeugt aus den realen Hörtrends der gesamten Instanz; die Wiedergabezahl steht auf der Karte.

![Musik- und Stilradar auf der Sonic-Startseite: Nach Abschluss einer Suche zeigt das Radar passende Ergebnisse auf Grundlage der Präferenzsignale an, ausgerichtet am Stil der beliebten Titel](/images/sonic/ui/ui-radar.png)

*Abbildung: Das Musik- und Stilradar nach einer Suche. Die Radarergebnisse sind an den Karten „Beliebte Titel“ ausgerichtet; Empfehlungsgründe und Tags der Präferenzsignale werden transparent dargestellt.*

Die Sortierung beeinflusst gewöhnlich die Reihenfolge der Inhalte; der aktuelle Code verarbeitet jedoch auch Entitätsfeedback und Radarprofile. Personalisierung und Auto DJ sind standardmäßig aktiv, was keine Einwilligung darstellt. Das Abschalten der Personalisierung in den Einstellungen (Abschnitt 9) beendet weder die getrennte Suchstatistik noch zwangsläufig jeden Radar-Anfragepfad. Optionale Verarbeitung ohne gültige Grundlage ist auszusetzen.

### 1.1 Seitenleiste: Einklappmodus und Kontoeingang

Das Marken-Logo am oberen Rand der Seitenleiste ist zugleich der Einklappschalter: Ein Klick zieht die Seitenleiste zu einem schmalen Streifen (Symbolmodus) zusammen, ein weiterer Klick klappt sie wieder aus. Am unteren Rand der Seitenleiste ist der Epomail-Kontoeingang integriert: Im abgemeldeten Zustand zeigt er eine Anleitung zur Anmeldung; nach der Anmeldung zeigt er den Kontonamen und den Eingang, und der Anmeldestatus wird über die Registerkarten hinweg synchronisiert.

## 2. Suche

![Sonic-Suchergebnisseite: Suche nach „周杰伦“ mit insgesamt 52 Ergebnissen, drei Registerkarten für Titel, Playlists und MVs, Schaltfläche „Alle abspielen“, Ergebnisliste mit Cover, Künstler, Album, Dauer und Aktionspalte](/images/sonic/ui/ui-search.png)

*Abbildung: Suchergebnisseite. Oben die Registerkarten (Titel/Playlists/MVs) und „Alle abspielen“; die Liste zeigt Cover, Titel, Künstler, Album, Dauer und Aktionen (Wiedergabe, MV, Favorit, Download). Das Suchfeld vereinheitlicht vereinfachte und traditionelle Schriftzeichen und unterstützt Pinyin-Abkürzungen sowie Rechtschreibtoleranz.*

Der Sucheinstieg befindet sich oben in der linken Seitenleiste und auf der Suchseite; unterstützt werden Stichwörter zu Titeln, Künstlern, Alben und Playlists. Die Ergebnisse aus mehreren Quellen werden nach Regex-Deduplikation zusammengeführt und nach Relevanz sortiert; Titel, die eine Hörprobe treffen, werden gemäß den Regeln unter [Audioqualität und Hörproben-Kennzeichnung](/de/project/#4-audioquellen-und-lyrics-pipeline) wahrheitsgemäß gekennzeichnet; eine Hörprobe soll nicht als vollständiger Titel ausgegeben werden. Suchtexte können in öffentliche Vorschläge gelangen; geben Sie keine privaten oder sensiblen Informationen ein.

## 3. Charts und offizielle Ranglisten

![Sonic-Chartseite: zwei Registerkarten für neue Titel und offizielle Ranglisten, fünf Unterkategorien (alle, chinesisch, westlich, japanisch, koreanisch), Ranglisten mit Platzierung, Cover, Titel, Künstler, Album und Dauer](/images/sonic/ui/ui-charts.png)

*Abbildung: Chartseite. Links die Chartauswahl (Neue Titel/Offizielle Ranglisten, darunter die Unterkategorien alle/chinesisch/westlich/japanisch/koreanisch), rechts die Rangliste mit „Alle abspielen“. Die Chartdaten stammen aus den offiziellen Ranglisten der Upstream-Anbieter und aus den realen Hörtrends der Instanz.*

Das „Trend-Chart der Instanz“ auf der Startseite und die Chartseite nutzen dasselbe Beliebtheitsmodell: fünf gewichtete Faktoren (wirksame Wiedergaben, eigenständige Hörer, Abspielverhalten bis zum Ende, Favoritenkonversion und Wachstumssteigung), ergänzt durch exponentielle Zeitabnahme und bayesianische Glättung (zur Beschreibung des Modells siehe [Projektvorstellung](/de/project/), Abschnitt 5).

## 4. Künstler- und Albenbibliothek

![Sonic-Künstlerbibliothek: doppelte Filterung nach Typ (alle, männliche, weibliche, Bands) und Region (chinesisch, westlich, japanisch, koreanisch, andere), Suche nach Anfangsbuchstabe A–Z und Beliebtheit, Künstlerkarten zeigen die Anzahl der Alben](/images/sonic/ui/ui-artists.png)

*Abbildung: Künstlerbibliothek. Künstler lassen sich nach Typ, Region und Anfangsbuchstabe filtern; die Karten zeigen Avatar, Name und Anzahl der Alben. Auf der Künstlerseite lassen sich deren beliebte Titel und Albenlisten durchsehen, die Albumseite führt die Titel im Einzelnen auf.*

Die Detailseiten verwenden Cover-Proxy und Farbanalyse, soweit der jeweilige Pfad sie nutzt; Bilder können auch direkt geladen werden und dann IP-Adresse und Verbindungsdaten offenlegen. Listendaten stammen aus vorgelagerten Schnittstellen; deren Erreichbarkeit belegt keine Inhaltslizenz.

## 5. Wiedergabesteuerung (untere Wiedergabeleiste)

![Sonic untere Wiedergabeleiste: bei Wiedergabe von „晴天“ erscheinen Lyrics-Vorschauzeile, vorheriger Titel, Wiedergabe, nächster Titel, Wiedergabemodus, Qualitätsmenü (SQ Lossless), Download und Lautstärkeregelung](/images/sonic/ui/ui-player.png)

*Abbildung: Die untere Wiedergabeleiste im Wiedergabezustand. Links Cover, Informationen zum aktuellen Titel und Lyrics-Vorschauzeile; in der Mitte die Wiedergabesteuerung und der Moduswechsel; rechts das Qualitätsmenü (aktuelles Abzeichen „SQ 无损“ = SQ Lossless), Download, Lautstärkeregler und Eingang zur Wiedergabeliste. Ein Klick auf den Coverbereich öffnet den Vollbild-Player-Drawer.*

Die untere Wiedergabeleiste ist auf allen Seiten dauerhaft vorhanden und bietet:

1. Qualitätsmenü: listet die beim jeweiligen Quellwerk tatsächlich verfügbaren Stufen auf (z. B. SQ Lossless, HQ High Quality, Standard); das Abzeichen gibt die tatsächliche Qualität des aktuellen Streams wieder und weist nichts überhöht aus;
2. Lyrics-Vorschauzeile: zeigt den aktuellen Satz der wortweisen Lyrics;
3. Wiedergabemodi: Umschalten zwischen Listenwiederholung, Titelwiederholung, Zufall und anderen Modi;
4. Download: speichert den aktuellen Titel im Browser (IndexedDB); siehe Abschnitt 3 von [Musikbibliothek verwalten](/de/library/).

## 6. Player-Drawer und wortweise Lyrics

![Sonic Vollbild-Player-Drawer: links Vinyl-Cover-Animation und Titelinformationen, rechts scrollendes Lyrics-Panel, Hintergrund verläuft in den Farbtönen des Covers, oben rechts Umschalter für Hintergrund und Visualisierung](/images/sonic/ui/ui-player-drawer.png)

*Abbildung: Vollbild-Player-Drawer. Links die Coveranzeige (Vinyl-Animation) und die Wiedergabesteuerung; rechts das scrollende Panel der wortweisen Lyrics; der Hintergrund verläuft in Echtzeit in der Hauptfarbe des Covers. Der Drawer öffnet sich nach einem Klick auf das Cover der unteren Wiedergabeleiste.*

Der Player-Drawer bietet:

1. Wortweise Lyrics: vorrangig werden die zeichengenauen Zeitachsen von YRC/QRC/KRC dargestellt, ergänzt um AMLL TTML und LRCLIB; das Lyrics-Panel bietet drei unabhängige Schalter für „Originaltext“, „Übersetzung“ und „Umschrift“ (auch in den Einstellungen steuerbar); ein Klick auf eine Lyrics-Zeile springt an die Wiedergabeposition;
2. Cover-Modi: Coveranimationen wie Vinylplatte und kreisförmiges Spektrum;
3. Audio-Visualisierung: Spektrum-Visualisierungen als Balken-, Wellen- und Kreisdiagramm, wirksam auf den Drawer-Hintergrund oder den unteren Player (in den Einstellungen konfigurierbar);
4. Sprung per Ziehen: Die Fortschrittsleiste lässt sich ziehen; die Lyrics scrollen synchron zur Wiedergabeposition.

## 7. Meine Musik

Der Bereich „Meine Musik“ umfasst vier Einträge:

| Seite | Inhalt | Speicherort |
| --- | --- | --- |
| Meine Favoriten | favorisierte Titel sowie favorisierte Playlists, Alben, Künstler und MVs | Browser localStorage (`library`) |
| Zuletzt wiedergegeben | Wiedergabeverlauf | Browser localStorage (`audio`) |
| Downloadliste | heruntergeladene Offline-Titel (mit Qualitätsmetadaten) | Browser IndexedDB (`downloaded_music`) |
| Lokale Musik | manuell importierte lokale Audiodateien (Hochladen per Drag-and-drop in den Browser möglich) | Browser IndexedDB (`local_music`) |

Die Tabelle nennt lokale Speicherorte und garantiert keine vollständige Vermeidung von Übermittlungen. Für lokale Audioinhalte wurde kein Uploadpfad gefunden; eingebettete Coverbilder, Titel, Künstler, Alben, Titelkennungen, Favoritenfeedback und Empfehlungskontext können jedoch übermittelt werden. Browserbereinigung entfernt lokale Kopien, nicht sämtliche entfernten Aufzeichnungen; eine allgemeine Cloud-Sicherung wird nicht garantiert. Downloads und Importe erteilen keine zusätzlichen Inhaltsrechte (siehe [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/)).

## 8. Einstellungen

![Sonic-Einstellungsseite: Konfigurationskarten für Themenmodus (System folgen), Oberflächensprache (Chinesisch), Hintergrundtyp, Audioqualität, Lyrics des unteren Players, Audio-Visualisierung und mehr](/images/sonic/ui/ui-settings.png)

*Abbildung: Die Einstellungsseite ordnet sämtliche Präferenzpunkte in Karten an. Jede Karte entspricht einer Kategorie: Themenmodus (hell/dunkel/System folgen), Oberflächensprache (中文/English/日本語), Hintergrundtyp, bevorzugte Audioqualität, Lyrics-Anzeige des unteren Players, Audio-Visualisierungsmodus und mehr.*

Oberflächeneinstellungen werden im lokalen Browserspeicher (etwa `settings` und `global`) abgelegt. Andere lokale Zustände können in Netzwerkanfragen enthalten sein; „lokal“ bedeutet nicht generell „ohne Übermittlung“. Auch `auth` speichert Nutzerdaten im Browser.

## 9. Datenschutz und Datenkontrolle

![Datenschutz- und lokale-Daten-Bereich der Sonic-Einstellungsseite: Erläuterung von Browser-Speicher und IndexedDB, Schalter für intelligente Suche und personalisierte Empfehlungen, Schalter für Auto DJ, Schaltfläche zum Zurücksetzen des Empfehlungsprofils und der Nicht-interessant-Vermerke](/images/sonic/ui/ui-privacy.png)

*Abbildung: Der Bereich „Datenschutz und lokale Daten“. Ältere Oberflächentexte können vollständige Lokalität oder Löschung suggerieren; tatsächlich können Kontextdaten übermittelt werden, und das Zurücksetzen ist nur teilweise wirksam. Eine Erfolgsmeldung beweist keine vollständige entfernte Löschung.*

Dieser Bereich bietet begrenzte Selbstbedienungsfunktionen, keine vollständige Umsetzung aller Betroffenenrechte; siehe [Datenschutzerklärung](/de/privacy-policy/), Abschnitte 6 und 9:

1. Schalter „Intelligente Suche und personalisierte Empfehlungen“: steuert den vorgesehenen Personalisierungspfad; nicht jede Datenerhebung oder öffentliche Suchwortverwendung endet damit;
2. Schalter „Auto DJ“: steuert das automatische Fortsetzen nach dem Ende der Wiedergabeliste;
3. „Empfehlungsprofil und Nicht-interessant-Vermerke zurücksetzen“: löscht Teile der Ereignisse und Rückmeldungen der aktuellen Identität (`DELETE /api/sonic/events`), nicht garantiert alte anonyme Kennungen, Radar, Aggregate, externe Dienste oder Backups;
4. „Alle lokalen Daten löschen“: versucht nach Bestätigung Browser-Speicher und IndexedDB zu bereinigen sowie Teile des entfernten Profils zurückzusetzen; Teilfehler können trotz Erfolgsmeldung bestehen. Das HttpOnly-Sitzungs-Cookie wird dadurch nicht entfernt, und dies ist keine Abmeldung. Nach Einstellungsreset und Neuladen kann Personalisierung wieder standardmäßig aktiv sein; prüfen Sie Ihre Auswahl erneut. Lokaler Erfolg belegt keine vollständige entfernte Löschung. Umfassendere Anfragen richten Sie an `privacy@epocanvas.com`.

## 10. Mobilgeräte

![Sonic Startseite auf Mobilgeräten: Karussell, intelligente Empfehlungen und Musikradar, Präferenzsignale als Tags (周杰伦, mandopop, r&b), personalisierte Empfehlungskarten mit Empfehlungsgrund, unten Mini-Wiedergabeleiste und Registerkartennavigation (Startseite, Suche, Zuletzt wiedergegeben, Einstellungen)](/images/sonic/ui/ui-mobile-home.png)

*Abbildung: Layout auf Mobilgeräten. Die Karten nennen den personalisierten Empfehlungsgrund und Hinweise wie „Häufig gehört“ und „Ähnlich deinem bevorzugten Stil“; die Präferenzsignale erscheinen als Tags; unten die Registerkartennavigation und die Mini-Wiedergabeleiste. Der Player-Drawer auf Mobilgeräten (PlayerDrawerMobile) bietet dieselben wortweisen Lyrics und dasselbe Qualitätsmenü.*

Mobil- und Desktopversion teilen sich dasselbe Kontosystem und dieselben Regeln zur Datenspeicherung; die Darstellung der Empfehlungsgründe folgt denselben Transparenzgrundsätzen wie auf dem Desktop.

## 11. Zugehörige Dokumente

| Dokument | Inhalt |
| --- | --- |
| [Projektvorstellung](/de/project/) | Produktpositionierung, Architektur, Empfehlungsengine und Sicherheitsdesign |
| [Datenschutzerklärung](/de/privacy-policy/) | Umfang der Verhaltensereignisse, Rechtsgrundlagen und Rechteausübung |
| [Nutzungsbedingungen](/de/terms-of-service/) | Vertragliche Nutzungsbedingungen |
| [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/) | Datenlebenszyklus und technische Maßnahmen |
