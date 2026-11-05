---
title: Fehlerbehebung
description: Fehlerbehebung bei Sonic – häufige Probleme mit Wiedergabe, Quellen, Anmeldung, Degradierungsmodus, Speicherung und Ratenbegrenzung.
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Die Funktionsbeschreibungen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version. Der RC ist kein offizielles GitHub Release.

Diese Seite beschreibt die Erkennung und Behebung häufiger Probleme. Wenn die Hinweise nicht helfen, schreiben Sie an `admin@epocanvas.com` oder melden Sie ein Issue im GitHub-Repository; verwenden Sie für Meldungen nur nicht sensible Reproduktionsbegriffe. Öffentliche Suchtexte können personenbezogene oder sensible Informationen enthalten.

![Fehlerbehebung bei Sonic in vier Schritten: Symptom erkennen, Status prüfen, Ausweichpfad versuchen und melden](/images/sonic/troubleshooting-flow.svg)

*Abbildung: Symptom erkennen, Status prüfen, Ausweichpfad versuchen und melden; auch der Ausweichpfad kann ausfallen.*

## 1. Wiedergabeprobleme

| Erscheinung | Ursache | Lösung |
| --- | --- | --- |
| Ein Titel ist als „Hörprobe“ gekennzeichnet und stoppt nach 30 Sekunden | Offizielle Hörprobe, kein Fehler | Falls die Oberfläche eine Ergänzung über Quellen hinweg anbietet, versuchen Sie eine andere vollständige Fassung; oder spielen Sie eine Fassung aus einer anderen Quelle ab, ohne den Erfolg vorauszusetzen |
| Das Qualitätsabzeichen zeigt eine niedrigere Stufe | Das vorgelagerte Angebot weist diese Stufe tatsächlich aus | Im Qualitätsmenü eine andere Stufe versuchen; die verfügbaren Stufen ändern sich mit der Verfügbarkeit der Quelle |
| Nach einem Abbruch lässt sich die Wiedergabe nicht fortsetzen | Die direkte Adresse der Quelle ist möglicherweise abgelaufen | Den Titel erneut anklicken, um eine neue Auflösung zu versuchen; eine Wiederherstellung ist nicht garantiert |

## 2. Degradierungsmodus

Wenn oben in der Oberfläche ein bernsteinfarbener Hinweis „Edge-Degradierungsmodus“ erscheint, kann der Knoten der Datenebene vorübergehend offline sein oder das Zeitlimit überschritten haben; ein Fallback-Pfad wird verwendet. Auch der Fallback kann ausfallen; Suche, Liedtexte und Wiedergabe können eingeschränkt oder nicht verfügbar sein. Das 30-Sekunden-Intervall nach dem Abkühlen des Circuit Breakers ist nur ein weiterer Prüfversuch und keine Wiederherstellungsgarantie. Bereits gepufferte Inhalte können weiterlaufen, ohne dass die Fortsetzung garantiert ist. Der Hinweis belegt weder eine automatische Wiederherstellung noch, dass eine Aktualisierung unnötig ist.

## 3. Probleme bei der Suche

1. Keine Suchergebnisse: Häufig ist eine vorgelagerte Schnittstelle kurzzeitig nicht verfügbar. Versuchen Sie es später erneut. Im Degradierungsmodus kann die Fallback-Suche ebenfalls fehlschlagen oder nicht verfügbar sein und eine etwas geringere Abdeckung haben;
2. Doppelte oder fehlende Ergebnisse: Bei fehlerhaften Metadaten einer Quelle kann die Zusammenführung misslingen – melden Sie das Problem nur mit nicht sensiblen Reproduktionsbegriffen. Öffentliche Suchtexte können personenbezogene oder sensible Informationen enthalten; fügen Sie sie nicht unverändert in ein öffentliches Issue ein.

## 4. Anmeldeprobleme

1. Nach der Anmeldung sofort wieder abgemeldet: Prüfen Sie, ob die Website ihr eigenes Sitzungs-Cookie setzen und behalten kann, ob eine Erweiterung es entfernt und ob HTTPS, OAuth-Rücksprungadresse und die übrige OAuth-Konfiguration zusammenpassen. Bereinigen oder deaktivieren Sie nur die störende Erweiterungseinstellung; schalten Sie nicht sämtliche Browserschutzfunktionen ab;
2. Epomail-Konto gesperrt: Die Anmeldung wird dadurch unterbrochen. Klären Sie zunächst den Status des Epomail-Kontos;
3. Andere Personen können auf einem gemeinsam genutzten Gerät abspielen: Im geprüften RC hat das Sitzungs-Cookie der Website standardmäßig eine Gültigkeit von 30 Tagen. Das bestätigt weder die Einstellung der Online-Instanz noch die Aufbewahrungs- oder Ablaufdauer kopierter Zugangsdaten und anderer Kopien. Melden Sie sich nach der Nutzung ab (siehe [Leitfaden zu Konto und Sicherheit](/de/account-security/), Abschnitt 5).

## 5. Probleme mit der Speicherung

1. Favoriten oder Downloads fehlen: Browserbereinigung oder das Ende einer privaten Browsersitzung kann lokale Daten entfernen; eine allgemeine Wiederherstellung aus der Cloud ist nicht garantiert. Der private Modus verhindert keine Netzwerk- oder Ereignisübermittlung, und lokale Bereinigung oder ein scheinbar erfolgreicher Profil-Reset beweist keine vollständige entfernte Löschung (siehe [Datenverwaltung und Speicherung](/de/data-management/));
2. Download schlägt fehl: Das Speicherlimit des Browsers ist erreicht. Löschen Sie ältere Downloads oder bereinigen Sie den Browserspeicher und versuchen Sie es erneut;
3. Import lokaler Musik schlägt fehl: Das Dateiformat wird vom Browser nicht dekodiert oder die Datei überschreitet das Speicherlimit.

## 6. Ratenbegrenzung und Fehlercodes

| Erscheinung | Bedeutung | Lösung |
| --- | --- | --- |
| 429 (anonym) | Mehr als das RC-Standardlimit von 240 anonymen Anfragen pro Minute; die Online-Instanz kann abweichen | Oberfläche beachten und später erneut versuchen oder die Instanzkonfiguration prüfen |
| 429 (authentifiziert) | Dauerhaft mehr als das RC-Standardlimit von 600 Anfragen pro Minute; die Online-Instanz kann abweichen | Prüfen, ob der Client eine Anfrageschleife ausführt |
| 501 (Sperrvorgang) | Unterstützte entfernte Sperrung ist nicht konfiguriert | Beim Abmelden wird möglicherweise nur das Browser-Cookie gelöscht; den Betreiber die Sperrkonfiguration und die Ablehnung kopierter Zugangsdaten prüfen lassen |
| Wiederholte Abmeldung | Der Schlüssel wurde gesperrt oder die globale untere Ausstellungszeitgrenze wurde geändert | Erneut anmelden und einen neuen Schlüssel beziehen; die tatsächliche Ursache muss anhand der Instanzprotokolle und -konfiguration bestätigt werden |

## 7. Wenn das Problem bestehen bleibt

Fügen Sie einem öffentlichen Issue den Zeitpunkt, die verwendete Seite und Handlung, Browser und Version sowie bei Bedarf einen bereinigten Hinweis-Screenshot bei; verwenden Sie nur nicht sensible Reproduktionsbegriffe. Öffentliche Suchtexte können personenbezogene oder sensible Informationen enthalten. Entfernen oder schwärzen Sie vor der Veröffentlichung E-Mail-Adressen, personenbezogene oder Profildaten, sensible Suchbegriffe, Sitzungs-Cookies, API-Schlüssel und dieselben Angaben in Screenshots. Vollständige Lösch- oder Datenkopieanfragen gehören an `privacy@epocanvas.com`, nicht in ein öffentliches Issue; eine Erfolgsmeldung beim Zurücksetzen beweist nicht, dass jeder Datensatz gelöscht wurde.
