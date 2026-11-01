---
title: Schnellstart
description: Sonic-Schnellstart – der kürzeste Weg vom Öffnen der Website über Suche und Wiedergabe, Anmeldung und Synchronisation bis zu Downloads, lokaler Musik und der Nutzung auf Mobilgeräten.
---

**Datum des Inkrafttretens: 1. November 2026｜Version: 1.4**

Diese Seite zeigt den kürzesten Weg zur Nutzung der gehosteten Sonic-Instanz (`sonic.epocanvas.tech`): vom Öffnen der Website über Suche und Wiedergabe, Anmeldung und Synchronisation bis zu Downloads, lokaler Musik und der Nutzung auf Mobilgeräten. Eine vollständige Wegleitung durch die Oberfläche bietet die [Oberflächen- und Funktionsübersicht](/de/interface/); das Selbst-Hosting behandelt diese Seite nicht (zum Deployment siehe den [Deployment-Leitfaden](/de/deployment/)).

## 1. Öffnen der Website

Rufen Sie `sonic.epocanvas.tech` im Browser auf (Ersatz-Spiegel `sonic.epocanvas.com`). Die Oberflächensprache folgt standardmäßig dem Browser; unter „Einstellungen → Oberflächensprache“ lassen sich vereinfachtes Chinesisch, English und 日本語 wählen; am selben Ort lässt sich auch das Thema (hell/dunkel/System folgen) einstellen. Sämtliche Kernfunktionen sind ohne Anmeldung nutzbar.

## 2. Suche und Wiedergabe

1. Geben Sie im Suchfeld oben in der linken Seitenleiste (oder auf der Suchseite) Stichwörter zu Titel, Künstler, Album oder Playlist ein; die Suche vereinheitlicht vereinfachte und traditionelle Schriftzeichen und unterstützt Pinyin-Abkürzungen sowie Rechtschreibtoleranz;
2. Die Ergebnisse gliedern sich in die drei Registerkarten „Titel/Playlists/MVs“; ein Klick auf einen Titel startet die Wiedergabe, oder Sie spielen die gesamte Liste mit „Alle abspielen“ fortlaufend ab;
3. Die untere Wiedergabeleiste zeigt den aktuellen Titel, die Lyrics-Vorschauzeile und das Audioqualitäts-Abzeichen (z. B. SQ Lossless); ein Klick auf das Cover öffnet den Vollbild-Player-Drawer mit den wortweisen Lyrics (Originaltext, Übersetzung und Umschrift einzeln zuschaltbar).

Bei 30-Sekunden-Hörproben kennzeichnet der Player sie wahrheitsgemäß mit dem Hörproben-Abzeichen und gibt sie nicht als vollständigen Titel aus; mit aktivierter Ergänzung über Quellen hinweg wird automatisch versucht, einen kostenlosen Volltitel zuzuordnen.

## 3. Anmeldung und Favoritensynchronisation

Die Anmeldung erfolgt mit dem Epomail-Konto über OAuth 2.0 (PKCE); der Dienst hat kein eigenes Registrierungssystem:

1. Klicken Sie auf den Anmeldungseingang am unteren Rand der Seitenleiste; Sie gelangen zur Autorisierungsseite von Epomail und bestätigen dort;
2. Nach der Anmeldung können Sie favorisierte Titel, favorisierte Playlists, gefolgte Künstler und selbst erstellte Playlists nutzen (gespeichert im lokalen Browserspeicher);
3. Die Anmeldung schaltet zugleich personalisierte Empfehlungen und die Auto-DJ-Fortsetzung frei; beide lassen sich unter „Einstellungen → Datenschutz und lokale Daten“ abschalten; danach wechseln die Empfehlungen in den rein öffentlichen Modus, und es werden keine Verhaltensereignisse mehr aufgezeichnet.

Die Sitzung ist höchstens 30 Tage gültig; die Abmeldung sperrt sie sofort. Die Kontoregeln finden sich in den [Nutzungsbedingungen](/de/terms-of-service/), Abschnitt 3.

## 4. Downloads und lokale Musik

1. Download: Ein Klick auf Download in der Aktionspalte des Titels oder in der unteren Wiedergabeleiste speichert das Lied samt Qualitätsmetadaten in IndexedDB des Browsers; verwaltet wird es auf der Seite „Downloadliste“; offline abspielbar;
2. Lokale Musik: Die Seite „Lokale Musik“ unterstützt das Hinzufügen per Klick oder das Ziehen von Audiodateien in den Browser; importierte Dateien liegen ebenfalls in IndexedDB und werden nicht auf einen Server hochgeladen;
3. Beides dient ausschließlich dem persönlichen Hören und darf nicht weiterverbreitet werden (siehe die [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/)).

## 5. Nutzung auf Mobilgeräten

Öffnen Sie dieselbe Adresse im Handybrowser, erscheint das Layout für Mobilgeräte: Registerkartennavigation am unteren Rand (Startseite, Suche, Zuletzt wiedergegeben, Einstellungen) und die Mini-Wiedergabeleiste; der Player-Drawer bietet dieselben wortweisen Lyrics und dasselbe Qualitätsmenü. Favoriten, Präferenzen und Downloads werden auf Mobilgeräten und Desktop jeweils unabhängig gespeichert (jeweils im eigenen Browser).

## 6. Erste Schritte bei den Datenschutzeinstellungen

Bei der ersten Nutzung lohnt ein Blick auf drei Steuerungen (zu finden unter „Einstellungen → Datenschutz und lokale Daten“):

1. „Intelligente Suche und personalisierte Empfehlungen“: der Hauptschalter; nach dem Abschalten werden keine Ereignisse mehr erhoben;
2. Auto DJ: steuert die automatische Fortsetzung nach dem Ende der Wiedergabe;
3. „Empfehlungsprofil und Nicht-interessant-Vermerke zurücksetzen“ / „Alle lokalen Daten löschen“: zwei Schaltflächen zur Löschung mit sofortiger Wirkung.

Die vollständige Darstellung der Datenschutzzusagen finden Sie in der [Datenschutzerklärung](/de/privacy-policy/).

## 7. FAQ-Schnellreferenz

| Frage | Antwort |
| --- | --- |
| Muss man bezahlen? | kostenlos, ohne Werbung, ohne In-App-Käufe |
| Geht es ohne Anmeldung? | Kernfunktionen sind anonym nutzbar (mit strengerer Ratenbegrenzung) |
| Wo liegen die Daten? | lokaler Browserspeicher + serverseitig pseudonymisierte Verhaltensereignisse (90 Tage) |
| Wie löscht man das Profil? | Einstellungen → Empfehlungsprofil zurücksetzen, sofortige Wirkung |
| Warum 30 Sekunden? | offizielle Hörproben, wahrheitsgemäß gekennzeichnet und nach bestem Bemühen über Quellen hinweg ergänzt |
| Werden Qualitäten überhöht ausgewiesen? | das Abzeichen gibt die tatsächliche Stufe des aktuellen Streams wieder |

Weitere Fragen beantwortet die [Projektvorstellung](/de/project/), Abschnitt 12; Rechtsbegriffe finden Sie unter [Begriffsdefinitionen](/de/key-terms/).
