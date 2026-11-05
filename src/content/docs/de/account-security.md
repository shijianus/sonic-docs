---
title: Leitfaden zu Konto und Sicherheit
description: Leitfaden zu Sonic-Konten und Sicherheit – Epomail-OAuth-Anmeldung, Sitzungen, API-Schlüssel, Sperrung und sichere Nutzung.
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Diese Seite erklärt die Funktionsweise des Sonic-Kontosystems und gibt Hinweise zur sicheren Nutzung. Die vollständige technische Beschreibung steht unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 3.2; die vertraglichen Regeln stehen in den [Nutzungsbedingungen](/de/terms-of-service/), Abschnitt 3. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Anmeldung

Der Dienst verwendet für die Anmeldung ein Epomail-Konto über OAuth 2.0 (PKCE) und hat kein eigenes Registrierungssystem. Ablauf: Konto unten in der Seitenleiste öffnen → auf der Epomail-Autorisierungsseite bestätigen → Rückkehr zum Dienst. Der Autorisierungsrückruf wird vierfach mit state, PKCE, Autorisierungscode und Wiederholungsschutz geprüft. Für den Authentifizierungsendpunkt gilt eine Begrenzung von 30 Anfragen pro Minute und IP.

## 2. Sitzungsmechanismus

1. Sitzungs-Cookie: Nach erfolgreicher Anmeldung wird ein `HttpOnly; Secure; SameSite=Lax`-Sitzungs-Cookie mit einer standardmäßigen Gültigkeit von 30 Tagen ausgestellt. Es enthält den signierten API-Schlüssel und ist für Skripte nicht lesbar; die Signatur ist keine Verschlüsselung der Nutzlast;
2. Synchronisation zwischen Tabs: Der Anmeldestatus wird zwischen Tabs desselben Browsers automatisch synchronisiert. Eine Abmeldung in einem Tab wird in den anderen Tabs erkannt;
3. Schlüsselgrenzen: Der API-Schlüssel wird weder in URLs oder Abfrageparametern noch im localStorage gespeichert. Davon getrennt speichert `auth` Nutzerdaten einschließlich E-Mail-Adresse und Avatar im localStorage. Transaktions-Cookies des OAuth-Ablaufs sind ungefähr 600 Sekunden gültig; die Anmeldefelder verifizieren kein Alter.

## 3. Aufbewahrung des API-Schlüssels

Der API-Schlüssel ist Ihr persönlicher Berechtigungsnachweis (Format `sonic_live_v2.…`, signiert mit HMAC-SHA256):

1. Er wird nur über Anfrage-Header übertragen und niemals in einer URL verwendet;
2. Sie dürfen ihn nicht an Dritte weitergeben oder in einen öffentlich veröffentlichten Client einbetten;
3. Für eine Neuausstellung muss der aktuell gültige Schlüssel vorgelegt werden. Bei einem Verdacht auf Offenlegung melden Sie sich sofort ab und lassen Sie ihn sperren (siehe Abschnitt 4).

## 4. Sperrung und Abmeldung

| Vorgang | Ort | Wirkung |
| --- | --- | --- |
| Abmeldung | im Player | Entfernt das aktuelle Cookie; Sperrung kopierter Nachweise hängt von Konfiguration und Anfrageerfolg ab |
| Schlüsselsperrung | `POST /api/auth/revoke` | Entfernte Sperrung nur bei eingerichtetem Sperrspeicher und erfolgreichem Request; Antwort prüfen |
| Massenwiderruf | Konfiguration des Bereitstellers | jti-Sperrliste, Subjekt-Sperrliste und eine globale untere Ausstellungszeitgrenze |

## 5. Hinweise zur sicheren Nutzung

1. Melden Sie sich auf gemeinsam verwendeten Geräten ab und bereinigen Sie die lokalen Nutzerdaten; das Cookie enthält einen signierten Nachweis und `auth` kann personenbezogene Angaben behalten;
2. Für das Epomail-Konto empfiehlt sich die Aktivierung der Zwei-Schritt-Verifizierung (Einstellung auf Epomail-Seite);
3. Verleihen oder teilen Sie Ihr Konto nicht. Bei gemeinsam genutzten Konten lassen sich Daten nicht zuverlässig trennen oder wiederherstellen;
4. Wenn ungewöhnliche Wiedergaben oder eine unbekannte Sitzung auffallen, melden Sie sich sofort ab und schreiben Sie an `admin@epocanvas.com`;
5. Der Dienst erhebt kein Passwort, weil die Anmeldung bei Epomail erfolgt. Jede Aufforderung zur „Sonic-Passwortprüfung“ ist ein Identitätsbetrug.

## 6. Konto verwalten

Der Kontoeingang am unteren Rand der Seitenleiste zeigt den aktuellen Anmeldestatus. Im abgemeldeten Zustand führt er zur Anmeldung; nach der Anmeldung zeigt er den Kontonamen und einen Link zur Kontoverwaltung bei Epomail, einschließlich Profil und Posteingang. Der Anmeldestatus wird zwischen Tabs desselben Browsers automatisch synchronisiert.
