---
title: Datenverwaltung und Speicherung
description: Datenverwaltung und Speicherung bei Sonic – Speicherorte, Profilübersicht, Löschvorgänge, verfügbare Anfragewege und Hinweise zur Sicherung.
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Diese Seite fasst zusammen, wo Sonic-Daten gespeichert sind, was Sie einsehen können und welche Lösch- und Anfragewege bestehen. Sie ist keine Zusage eines vollständigen Exports sämtlicher personenbezogener Daten. Rechtsgrundlagen und Rechte stehen in der [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 4, 6 und 9; technische Maßnahmen unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/). Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Überblick über die Speicherorte

| Daten | Ort | Personenbezug | Speicherdauer |
| --- | --- | --- | --- |
| Favoriten, Playlists und Präferenzen | localStorage des Browsers; Radar mit Synchronisierungsversuchen, jedoch ohne bestätigte entfernte Engine-Route | Feedback und Empfehlungskontext können übermittelt werden | Lokal bis zur Bereinigung; Radar ohne verifizierte einheitliche Frist |
| Wiedergabeverlauf | localStorage des Browsers; Verhaltensereignisse können gesondert übermittelt werden | Ereignisse können pseudonym zugeordnet werden | Lokaler Verlauf bis zur Bereinigung; entfernte Speicherung gesondert |
| Downloads und lokale Musik | IndexedDB des Browsers | Kein Uploadpfad für lokale Audioinhalte gefunden; Titel, Künstler, Alben, Kennungen und eingebettete Cover können übermittelt werden | Bis zur Bereinigung oder Speicherfreigabe durch den Browser; entfernte Daten gesondert behandelt |
| Verhaltensereignisse und Entitätsfeedback | Bei tatsächlicher Aktivierung möglicherweise in serverseitigen Datenbanken oder externen Diensten | Pseudonyme Kennung, nicht anonym | RC-Standard 90 Tage, mindestens 7; unvollständige Bereinigung, nicht für jeden Datensatz exakt bei Fristablauf; keine Zusage umfassender automatischer Löschung |
| Suchaggregate und Radarprofile | Entfernte Suchspeicherung; dauerhafter Radar-Engine-Speicher nicht bestätigt | Suchtexte können Personen identifizieren und öffentlich erscheinen | Keine verifizierte einheitliche automatische Frist; Reset deckt nicht alles ab |
| Gemeinsamer Titelkatalog und optionale externe Indizes | Serverseitiger Titelkatalog und optionale Empfehlungs-/Suchsysteme | Nutzungsereignisse können Titel, Künstler und eingebettete Coverdaten enthalten; für die websiteweite Suche verfügbar | Durch Profilreset nicht vollständig gelöscht; nach Zuordenbarkeit beurteilen |
| Suchverlauf (lokal) | localStorage des Browsers | Suchanfragen werden auch zur Suche übermittelt und können in Statistiken oder Kontext eingehen | Lokale Bereinigung entfernt keine entfernten Kopien |

`auth` im localStorage speichert Nutzerdaten einschließlich E-Mail-Adresse und Avatar. Signierte Sitzungsnachweise können Identitätsdaten enthalten und sind nicht verschlüsselt. Eine fehlende IP-Spalte in einer Ereignistabelle bedeutet nicht, dass keine IP-Adressen verarbeitet werden: Ratenbegrenzung, Engine-Weiterleitung und Infrastruktur verarbeiten sie ebenfalls.

## 2. Abfrage: Übersicht des Empfehlungsprofils

Der aktuelle öffentliche RC stellt `GET /api/sonic/events` (oder den Profilbereich der Einstellungen) bereit, um eine Zusammenfassung des serverseitigen Profils abzufragen; der ältere `main@ce443c8` dient nur als Kompatibilitätsvergleich und belegt keine Bereitstellung des RC. Auch wenn eine Instanz die Zusammenfassung anbietet, ist sie weder eine vollständige Kopie personenbezogener Daten noch ein übertragbarer Export. Ein vollständiger Download serverseitiger Ereignisse darf nicht zugesagt werden.

## 3. Sicherung und verfügbare Anfragewege

1. **Browserdaten**: Favoriten, Playlists, Einstellungen, Downloads und lokale Musik werden überwiegend im Browser gespeichert; Feedback, Metadaten und Kontext können zusätzlich übermittelt werden. Es gibt kein allgemeines Exportwerkzeug für localStorage oder IndexedDB, keine integrierte Cloud-Sicherung und keinen geräteübergreifenden Import. Notieren Sie wichtige Playlists, bewahren Sie Originaldateien lokaler Musik auf oder verwenden Sie vertrauenswürdige Sicherungsfunktionen, die Ihr Browser oder Betriebssystem tatsächlich anbietet;
2. **Entfernte Daten**: Die Verarbeitung kann Ereignisse, Entitätsfeedback, Suchdaten und Radar-Synchronisierung umfassen, nicht nur Titelereignisse; ein dauerhafter Speicher der Radar-Engine ist nicht bestätigt. Die Zusammenfassung ist kein vollständiger Export und das Zurücksetzen nur teilweise wirksam. Eine umfassendere Kopie oder Löschung ist über die Wege in Abschnitt 5 anzufragen, gegebenenfalls auch für frühere Identitäten;
3. **Zusammenfassung des Empfehlungsprofils**: Sie ist möglicherweise nur abfragbar, wenn die Funktion aktiviert ist und die Instanz Einstellungsseite oder API bereitstellt; die produktive Verfügbarkeit ist nicht verifiziert. Sie ist kein vollständiger Export aller personenbezogenen Daten;
4. **Lokale Musik**: Die importierten Originaldateien bleiben auf Ihrem Gerät. Das Löschen der Browserkopie verändert sie nicht.

## 4. Löschvorgänge

| Vorgang | Umfang | Wirkung |
| --- | --- | --- |
| Empfehlungsprofil und Nicht-interessant-Vermerke zurücksetzen | Teile der Ereignisse und Rückmeldungen der aktuellen Identität; alte Kennungen, Radar, Aggregate, externe Dienste und Backups können fehlen | RC-Route: `DELETE /api/sonic/events`; Fehler können unbemerkt bleiben, Erfolg belegt keine vollständige Löschung |
| Alle lokalen Daten löschen | Fordert Browserspeicherbereinigung und möglicherweise eine teilweise entfernte Rücksetzung an; das Entfernen von Cookies oder URL-Zugangsdaten oder eine Abmeldung darf nicht vorausgesetzt werden | Ergebnisse einzeln prüfen; nach Einstellungsreset und Neuladen können Standardwerte zurückkehren, daher Auswahl erneut prüfen |
| Website-Daten im Browser löschen | Gerätespeicher dieser Website | Entfernte Daten werden nicht mitgelöscht |
| Abmeldung | Aktuelles Sitzungs-Cookie; beantragte Sperrung | Sperrung kopierter Nachweise hängt von Konfiguration und erfolgreicher Anfrage ab |

## 5. Selbst bereitgestellte Instanzen und Betroffenenanfragen

Nutzer einer selbst bereitgestellten Instanz wenden sich über den vom tatsächlichen Betreiber veröffentlichten Kontaktweg an diesen. Die in dieser Dokumentation vorgeschlagenen Sonic-E-Mail-Adressen sind keine Kontaktwege für alle unabhängig Verantwortlichen. Nutzer gehosteter Instanzen finden den Kanal für Anfragen zu Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit, Widerspruch und Widerruf in Abschnitt 9 der [Datenschutzerklärung](/de/privacy-policy/).

Selbst betreibende Personen müssen ein Verzeichnis sämtlicher tatsächlicher Speicher und Empfänger führen, das nicht auf das SQLite-Volume beschränkt ist. Aufbewahrungseinstellungen allein erfassen Radar, Suchdaten, Protokolle und Backups nicht. Notwendige Fristen und überprüfte Löschung sind umzusetzen; Backups sind bis zur fristgerechten Bereinigung zu isolieren und Löschvermerke nach einer Wiederherstellung erneut anzuwenden. Siehe [Deployment-Leitfaden](/de/deployment/), Abschnitt 3, und [Open-Source- und Selbst-Hosting-Recht](/de/open-source/), Abschnitt 4.
