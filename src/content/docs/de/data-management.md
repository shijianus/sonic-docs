---
title: Datenverwaltung und Speicherung
description: Datenverwaltung und Speicherung bei Sonic – Speicherorte, Profilübersicht, Löschvorgänge, verfügbare Anfragewege und Hinweise zur Sicherung.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite fasst zusammen, wo Sonic-Daten gespeichert sind, was Sie einsehen können und welche Lösch- und Anfragewege bestehen. Sie ist keine Zusage eines vollständigen Exports sämtlicher personenbezogener Daten. Rechtsgrundlagen und Rechte stehen in der [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 4, 6 und 9; technische Maßnahmen unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/).

## 1. Überblick über die Speicherorte

| Daten | Ort | Personenbezug | Speicherdauer |
| --- | --- | --- | --- |
| Favoriten, Playlists und Präferenzen | localStorage des Browsers | nicht hochgeladen | bis zur Löschung |
| Wiedergabeverlauf | localStorage des Browsers | nicht hochgeladen | bis zur Löschung |
| Downloads und lokale Musik | IndexedDB des Browsers | nicht hochgeladen | bis zur Löschung |
| Verhaltensereignisse | serverseitiges SQLite (Datenebene) | pseudonymisierter Hash | automatische Vernichtung nach 90 Tagen |
| Globale aggregierte Statistiken | serverseitiges SQLite | nicht mit einer Person verknüpft | gemäß Datenbankwartung |
| Suchverlauf (lokal) | localStorage des Browsers | nicht hochgeladen | bis zur Löschung |

Identifikationsdaten des Kontos, etwa die E-Mail-Adresse, werden nicht dauerhaft in einer Datenbank gespeichert und bestehen nur während der Sitzung. Die Datenbank enthält keine IP-Spalte.

## 2. Abfrage: Übersicht des Empfehlungsprofils

Mit `GET /api/sonic/events` oder dem Profilbereich der Einstellungen lässt sich eine Zusammenfassung des aktuell serverseitig vorhandenen Profils abfragen: Gesamtzahl der Ereignisse, Zähler für Favoriten und Ablehnungen, häufig gehörte Künstler, Genre-Tendenzen, letzte Suchbegriffe und Speicherform. Diese Übersicht ist keine vollständige Kopie sämtlicher personenbezogener Daten und kein vollständiger Export der Ereignisse; ein Download der vollständigen Ereignisdatensätze wird nicht angeboten.

## 3. Sicherung und verfügbare Anfragewege

1. **Browserdaten**: Favoriten, Playlists und Downloads liegen ausschließlich in Ihrem Browser. Sonic bietet weder eine eingebaute Cloud-Synchronisation noch einen allgemeinen Export von localStorage- oder IndexedDB-Daten. Für die Übertragung auf ein anderes Gerät müssen Sie Inhalte selbst neu anlegen oder nach den tatsächlich verfügbaren Browserfunktionen sichern; eine allgemeine Exportmöglichkeit wird nicht zugesagt;
2. **Verhaltensereignisse**: Serverseitige Ereignisse werden pseudonymisiert gespeichert, aber es gibt keinen Download- oder Exportkanal dafür. Wenn Sie die Ereignisse löschen möchten, nutzen Sie die Löschfunktion in Abschnitt 4;
3. **Lokale Musik**: Die ursprünglichen importierten Dateien bleiben auf Ihrem Gerät. Das Löschen der Browserkopie verändert die Originaldatei nicht;
4. **Manuelle Anfragen**: Für weitere Datenschutz- oder Löschanfragen wenden Sie sich an `privacy@epocanvas.com`. Die Bearbeitung richtet sich nach Abschnitt 9 der [Datenschutzerklärung](/de/privacy-policy/).

## 4. Löschvorgänge

| Vorgang | Umfang | Wirkung |
| --- | --- | --- |
| Empfehlungsprofil und Nicht-interessant-Vermerke zurücksetzen | alle serverseitigen Verhaltensereignisse | sofort (`DELETE /api/sonic/events`) |
| Alle lokalen Daten löschen | localStorage, sessionStorage und IndexedDB des Browsers sowie das serverseitige Profil | nach Bestätigung sofort |
| Website-Daten im Browser löschen | dasselbe auf der Browserseite | sofort |
| Abmeldung | Sitzung und Schlüssel | sofort |

## 5. Selbst bereitgestellte Instanzen

Bei einer selbst bereitgestellten Instanz liegen die Daten auf der Datenebene des Bereitstellers (benanntes SQLite-Volume). Der Bereitsteller kann Aufbewahrungstage und Speicherpfad konfigurieren (siehe [Deployment-Leitfaden](/de/deployment/), Abschnitt 3); seine Pflichten zur Sicherung und Information stehen zudem unter [Open-Source- und Selbst-Hosting-Recht](/de/open-source/), Abschnitt 4.
