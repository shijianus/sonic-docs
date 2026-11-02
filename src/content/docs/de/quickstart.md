---
title: Schnellstart
description: Sonic-Schnellstart – der kürzeste Weg vom Öffnen der Website über Suche und Wiedergabe, Anmeldung, lokale Favoriten, Downloads, lokale Musik und die Nutzung auf Mobilgeräten.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite zeigt den kürzesten Weg zur Nutzung der gehosteten Sonic-Instanz (`sonic.epocanvas.tech`): vom Öffnen der Website über Suche und Wiedergabe, Anmeldung, lokale Favoriten, Downloads, lokale Musik und die Nutzung auf Mobilgeräten. Eine vollständige Wegleitung durch die Oberfläche bietet die [Oberflächen- und Funktionsübersicht](/de/interface/); das Selbst-Hosting behandelt diese Seite nicht (zum Deployment siehe den [Deployment-Leitfaden](/de/deployment/)). Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Öffnen der Website

Rufen Sie `sonic.epocanvas.tech` im Browser auf (Ersatz-Spiegel `sonic.epocanvas.com`). Die Oberflächensprache folgt standardmäßig dem Browser; unter „Einstellungen → Oberflächensprache“ lassen sich vereinfachtes Chinesisch, English und 日本語 wählen; am selben Ort lässt sich auch das Thema (hell/dunkel/System folgen) einstellen. Sämtliche Kernfunktionen sind ohne Anmeldung nutzbar.

## 2. Suche und Wiedergabe

1. Geben Sie im Suchfeld oben in der linken Seitenleiste (oder auf der Suchseite) Stichwörter zu Titel, Künstler, Album oder Playlist ein; die Suche vereinheitlicht vereinfachte und traditionelle Schriftzeichen und unterstützt Pinyin-Abkürzungen sowie Rechtschreibtoleranz. Suchtexte können in öffentliche Vorschläge gelangen; geben Sie keine privaten oder sensiblen Informationen ein;
2. Die Ergebnisse gliedern sich in die drei Registerkarten „Titel/Playlists/MVs“; ein Klick auf einen Titel startet die Wiedergabe, oder Sie spielen die gesamte Liste mit „Alle abspielen“ fortlaufend ab;
3. Die untere Wiedergabeleiste zeigt den aktuellen Titel, die Lyrics-Vorschauzeile und das Audioqualitäts-Abzeichen (z. B. SQ Lossless); ein Klick auf das Cover öffnet den Vollbild-Player-Drawer mit den wortweisen Lyrics (Originaltext, Übersetzung und Umschrift einzeln zuschaltbar).

Bei 30-Sekunden-Hörproben kennzeichnet der Player sie als Hörprobe und gibt sie nicht als vollständigen Titel aus; die standardmäßig aktivierte Ergänzung über Quellen hinweg versucht automatisch, einen kostenlosen Volltitel zuzuordnen. Technische Verfügbarkeit erteilt keine Inhaltslizenz.

## 3. Anmeldung und lokale Favoriten

Die Anmeldung erfolgt mit dem Epomail-Konto über OAuth 2.0 (PKCE); der Dienst hat kein eigenes Registrierungssystem:

1. Klicken Sie auf den Anmeldungseingang am unteren Rand der Seitenleiste; Sie gelangen zur Autorisierungsseite von Epomail und bestätigen dort;
2. Favoriten, Playlists und gefolgte Künstler werden überwiegend im lokalen Browserspeicher verwaltet; eine allgemeine geräteübergreifende Cloud-Sicherung besteht nicht. Feedback und Teile dieses Kontexts können dennoch übermittelt werden;
3. Personalisierung und Auto DJ sind im aktuellen Code standardmäßig aktiviert; Anmeldung ist keine wirksame Einwilligung dafür. Auto DJ hat einen unabhängigen Schalter und kann weiterhin Starttitel und auszuschließende Titel senden. Das Abschalten der Personalisierung beendet nicht alle Anfragen oder die gesonderte Suchwortstatistik. Radar versucht teilweise entfernte Synchronisierung; bei ausgeschalteter Personalisierung kann eine Präferenz-Nutzlast weiterhin gesendet werden, obwohl der Server ihre Speicherung ablehnen kann. Die entfernte Engine-Route ist in der geprüften RC nicht bestätigt; eine dauerhafte Cloud-Sicherung ist nicht garantiert.

Die Sitzung gilt standardmäßig 30 Tage; Abmelden entfernt das aktuelle Cookie. Entfernte Sperrung kopierter Nachweise hängt von Konfiguration und Anfrageerfolg ab. Die Kontoregeln finden sich in den [Nutzungsbedingungen](/de/terms-of-service/), Abschnitt 3. Eine allgemeine geräteübergreifende Synchronisierung von Favoriten und Playlists ist nicht zugesagt.

## 4. Downloads und lokale Musik

1. Download: Ein Klick auf Download in der Aktionspalte des Titels oder in der unteren Wiedergabeleiste speichert das Lied samt Qualitätsmetadaten in IndexedDB des Browsers; verwaltet wird es auf der Seite „Downloadliste“; offline abspielbar;
2. Lokale Musik: Die Seite „Lokale Musik“ unterstützt das Hinzufügen per Klick oder das Ziehen von Audiodateien in den Browser. Für lokale Audioinhalte wurde kein Uploadpfad gefunden; Lyrics-Abgleich, Feedback und Empfehlungen können Titel-, Künstler-, Albumdaten oder Kennungen übermitteln. Eingebettete Cover können als data URL mit Favoritenereignissen in den entfernten gemeinsamen Titelkatalog gelangen, der für websiteweite Suche und öffentliche Vorschläge genutzt wird; ein Profilreset entfernt diesen Katalog nicht;
3. Nutzen oder verbreiten Sie Inhalte nur, soweit Sie dazu berechtigt sind; Import und Download erteilen keine zusätzliche Lizenz (siehe die [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/)).

## 5. Nutzung auf Mobilgeräten

Öffnen Sie dieselbe Adresse im Handybrowser, erscheint das Layout für Mobilgeräte: Registerkartennavigation am unteren Rand (Startseite, Suche, Zuletzt wiedergegeben, Einstellungen) und die Mini-Wiedergabeleiste; der Player-Drawer bietet dieselben wortweisen Lyrics und dasselbe Qualitätsmenü. Favoriten, Präferenzen und Downloads werden auf Mobilgeräten und Desktop jeweils unabhängig gespeichert (jeweils im eigenen Browser); dies schließt einzelne entfernte Kontext- oder Radar-Anfragen nicht aus.

## 6. Erste Schritte bei den Datenschutzeinstellungen

Bei der ersten Nutzung lohnt ein Blick auf drei Steuerungen (zu finden unter „Einstellungen → Datenschutz und lokale Daten“):

1. „Intelligente Suche und personalisierte Empfehlungen“: Schalter für den vorgesehenen Personalisierungspfad; gesonderte Suchstatistik und notwendige Anfragen können weiterlaufen;
2. Auto DJ: steuert die automatische Fortsetzung nach dem Ende der Wiedergabe;
3. „Empfehlungsprofil und Nicht-interessant-Vermerke zurücksetzen“ / „Alle lokalen Daten löschen“: Löschfunktionen mit begrenzter Abdeckung und möglichen unbemerkten Fehlern; alte anonyme Kennungen, Radar, Aggregate, externe Dienste und Backups können verbleiben. Die lokale App-Bereinigung entfernt das HttpOnly-Sitzungs-Cookie nicht und meldet nicht ab; nach Einstellungsreset und Neuladen kann Personalisierung wieder aktiviert sein, daher die Auswahl erneut prüfen. Umfassendere Anfragen richten Sie an `privacy@epocanvas.com`.

Die vollständige Darstellung der Datenschutzinformationen und bekannten Grenzen finden Sie in der [Datenschutzerklärung](/de/privacy-policy/). Privater Browsermodus verhindert keine Anfragen oder Ereignisübermittlung.

## 7. FAQ-Schnellreferenz

| Frage | Antwort |
| --- | --- |
| Muss man bezahlen? | kostenlos, ohne Werbung, ohne In-App-Käufe; individuelles Testprojekt ohne SLA |
| Geht es ohne Anmeldung? | Kernfunktionen sind ohne Anmeldung nutzbar, aber nicht automatisch anonym (strengere Ratenbegrenzung) |
| Wo liegen die Daten? | Browserdaten einschließlich `auth` sowie entfernte Ereignisse, Profile und Statistiken; keine universelle 90-Tage-Löschfrist |
| Wie löscht man das Profil? | Einstellungen → Empfehlungsprofil zurücksetzen; nur teilweise Löschung, für umfassende Anfragen Datenschutzkontakt nutzen |
| Warum 30 Sekunden? | offizielle Hörproben, wahrheitsgemäß gekennzeichnet und nach bestem Bemühen über Quellen hinweg ergänzt |
| Werden Qualitäten überhöht ausgewiesen? | das Abzeichen gibt die tatsächliche Stufe des aktuellen Streams wieder |

Weitere Fragen beantwortet die [Projektvorstellung](/de/project/), Abschnitt 12; Rechtsbegriffe finden Sie unter [Begriffsdefinitionen](/de/key-terms/).
