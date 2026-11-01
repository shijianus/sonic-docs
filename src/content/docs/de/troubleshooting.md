---
title: Fehlerbehebung
description: Fehlerbehebung bei Sonic – häufige Probleme mit Wiedergabe, Quellen, Anmeldung, Degradierungsmodus, Speicherung und Ratenbegrenzung.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite beschreibt die Erkennung und Behebung häufiger Probleme. Wenn die Hinweise nicht helfen, schreiben Sie an `admin@epocanvas.com` oder melden Sie ein Issue im GitHub-Repository.

## 1. Wiedergabeprobleme

| Erscheinung | Ursache | Lösung |
| --- | --- | --- |
| Ein Titel ist als „Hörprobe“ gekennzeichnet und stoppt nach 30 Sekunden | Offizielle Hörprobe, kein Fehler | Ergänzung über Quellen hinweg aktivieren, damit automatisch ein kostenloser vollständiger Titel gesucht wird, oder eine andere Quellenfassung abspielen |
| Das Qualitätsabzeichen zeigt eine niedrigere Stufe | Das vorgelagerte Angebot weist diese Stufe tatsächlich aus | Im Qualitätsmenü eine andere Stufe versuchen; die verfügbaren Stufen ändern sich mit der Verfügbarkeit der Quelle |
| Nach einem Abbruch lässt sich die Wiedergabe nicht fortsetzen | Die direkte Adresse der Quelle ist abgelaufen | Den Titel erneut anklicken, damit die Adresse neu aufgelöst wird |

## 2. Degradierungsmodus

Wenn oben in der Oberfläche ein bernsteinfarbener Hinweis „Edge-Degradierungsmodus“ erscheint, ist der Knoten der Datenebene vorübergehend offline oder hat das Zeitlimit überschritten; die Edge-Schicht ist automatisch auf die direkte Anbindung öffentlicher Schnittstellen umgeschaltet. Suche und Lyrics bleiben verfügbar, während die vollständige Quellauflösung und Empfehlungsaktualisierungen eingeschränkt sein können. Normalerweise wird der Betrieb nach einigen Dutzend Sekunden automatisch wiederhergestellt (Probing nach 30 Sekunden Abklingzeit des Circuit Breakers). Bereits geladene Titel bleiben unbeeinträchtigt; eine Aktualisierung ist nicht nötig.

## 3. Probleme bei der Suche

1. Keine Suchergebnisse: Häufig ist eine vorgelagerte Schnittstelle kurzzeitig nicht verfügbar. Versuchen Sie es später erneut. Im Degradierungsmodus läuft die Suche direkt über öffentliche Schnittstellen der Edge-Schicht und kann eine etwas geringere Abdeckung haben;
2. Doppelte oder fehlende Ergebnisse: Die Quellen werden anhand kanonischer Kennungen dedupliziert. Bei fehlerhaften Metadaten einer Quelle kann die Zusammenführung misslingen – melden Sie das Problem mit dem Suchbegriff als Issue.

## 4. Anmeldeprobleme

1. Nach der Anmeldung sofort wieder abgemeldet: Meist blockiert der Browser Drittanbieter-Cookies oder eine Sicherheitserweiterung löscht das Cookie. Fügen Sie die Website zur Ausnahmeliste hinzu und versuchen Sie es erneut;
2. Epomail-Konto gesperrt: Die Anmeldung wird dadurch unterbrochen. Klären Sie zunächst den Status des Epomail-Kontos;
3. Andere Personen können auf einem gemeinsam genutzten Gerät abspielen: Das Sitzungs-Cookie bleibt höchstens 30 Tage erhalten. Melden Sie sich nach der Nutzung ab (siehe [Leitfaden zu Konto und Sicherheit](/de/account-security/), Abschnitt 5).

## 5. Probleme mit der Speicherung

1. Favoriten oder Downloads fehlen: Das Löschen der Website-Daten im Browser oder der private Modus entfernt den lokalen Speicher (siehe [Datenexport und Speicherung](/de/data-management/), Abschnitt 1). Wichtige Playlists sollten Sie selbst notieren;
2. Download schlägt fehl: Das Speicherlimit des Browsers ist erreicht. Löschen Sie ältere Downloads oder bereinigen Sie den Browserspeicher und versuchen Sie es erneut;
3. Import lokaler Musik schlägt fehl: Das Dateiformat wird vom Browser nicht dekodiert oder die Datei überschreitet das Speicherlimit.

## 6. Ratenbegrenzung und Fehlercodes

| Erscheinung | Bedeutung | Lösung |
| --- | --- | --- |
| 429 (anonym) | Mehr als 240 anonyme Anfragen pro Minute | Anmeldung ermöglicht ein höheres Kontingent (600 pro Minute) |
| 429 (authentifiziert) | Dauerhaft mehr als 600 Anfragen pro Minute | Prüfen, ob der Client eine Anfrageschleife ausführt |
| 501 (Sperrvorgang) | Die Instanz hat keine sofortige Sperrung konfiguriert | Der Bereitsteller muss KV oder eine Listenmethode konfigurieren |
| Wiederholte Abmeldung | Der Schlüssel wurde gesperrt oder die globale untere Ausstellungszeitgrenze wurde geändert | Erneut anmelden und einen neuen Schlüssel beziehen |

## 7. Wenn das Problem bestehen bleibt

Fügen Sie einem Issue den Zeitpunkt, die verwendete Seite und Handlung, den Hinweis in der Oberfläche (bei einem Degradierungshinweis möglichst einen Screenshot) sowie Browser und Version bei. Senden Sie niemals ein Sitzungs-Cookie oder einen API-Schlüssel mit.
