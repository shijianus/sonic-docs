---
title: Open-Source- und Selbst-Hosting-Recht
description: Open-Source und Selbst-Hosting bei Sonic – Lizenzlage, Markengrenzen, Danksagungen und Abhängigkeiten von Dritten, Pflichten der Bereitsteller und Compliance-Grenzen.
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Diese Seite beschreibt die Lage und die Grenzen der Open-Source-Lizenzierung von Sonic, die Danksagungen an Dritte sowie die rechtlichen Pflichten beim Selbst-Hosting. Das Verhältnis von Softwarelizenz und Nutzungsbedingungen ist in den [Nutzungsbedingungen](/de/terms-of-service/), Abschnitt 2 und Abschnitt 10, dargestellt. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Lizenzlage

| Posten | Lage |
| --- | --- |
| `LICENSE` im Stammverzeichnis des Repositorys | Im RC `a75f5cb` sind die `LICENSE`-Dateien im Stammverzeichnis und im Player MIT, einschließlich kommerzieller Codenutzung nach ihren Bedingungen. Im alten `main@ce443c8` ist nur die MIT-Lizenz des Players verifizierbar; im Stammverzeichnis wurde keine `LICENSE` gefunden. Versionen und Komponenten gesondert prüfen |
| Erklärung in der historischen README | Frühere Aussagen zu CC BY-NC-SA 4.0 bestimmen nicht die Lizenz aller historischen Dateien; maßgebliche Texte je Version und Komponente prüfen. Die nicht gewinnorientierte Ausrichtung widerruft keine tatsächlich durch MIT gewährten Rechte |
| Marken und Markenzeichen | die Namen und Zeichen `epocanvas` und `Sonic` vermitteln mit der Quellcode-Lizenz keinerlei Markennutzungsrechte |

Die nicht gewinnorientierte Projektausrichtung ist keine zusätzliche Lizenzbeschränkung. Unabhängig davon gilt: Die Rechte an Aufnahmen, Lyrics, Covern und anderen Inhalten liegen bei den jeweiligen Rechteinhabern, und das Projekt gewährt keinerlei Weiterlizenzierung von Musikinhalten.

## 2. Positionierung des Projekts

Das Projekt ist ein individuell gepflegtes, kostenloses und nicht gewinnorientiertes Lern- und Testprojekt ohne SLA. Die MIT-Rechte werden dadurch nicht eingeschränkt. Downloads und lokale Musik werden im Browser gespeichert; technische Abspielbarkeit, Tests und Lernzwecke erteilen keine Inhaltslizenz oder pauschale Urheberrechtsausnahme. Bei der Nutzung des Dienstes oder beim Selbst-Hosting müssen Sie selbst sicherstellen, dass die örtlichen Gesetze, die Bedingungen der vorgelagerten Dienste und die Anforderungen an die Inhaltslizenzierung eingehalten werden (zu den Verhaltensgrenzen siehe die [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/)).

## 3. Danksagungen und Abhängigkeiten von Dritten

Entwicklung und Multi-Source-Aggregationspraxis stützen sich auf folgende Open-Source-Community-Projekte und danken ihnen: Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, GDStudio Music API und die Linux.do-Community. Die vollständigen Abhängigkeiten und Erklärungen finden sich in `THIRD_PARTY_NOTICES.md` im Repository; die Bedingungen der einzelnen vorgelagerten Dienste unterliegen jeweils deren eigener Hoheit.

## 4. Rechtliche Pflichten selbst hostender Betreiber

Die Rolle richtet sich danach, wer die Verarbeitung tatsächlich bestimmt; das Veröffentlichen oder Beitragen von Code begründet allein keine ausschließliche Verantwortung. Rein persönliche Tests und öffentliche Dienste sind getrennt zu beurteilen (siehe [Überblick](/de/overview/), Abschnitt 2). Wer den Dienst betreibt, muss:

1. **Informationspflicht**: vor der Erhebung die tatsächliche rechtliche Identität, Kontaktdaten, Zwecke, Empfänger, Länder der Knoten und Aufbewahrungsfristen veröffentlichen; die [Datenschutzerklärung](/de/privacy-policy/) an verifizierte Tatsachen anpassen und nicht annehmen, dass das Repository diese Informationen bereitstellt;
2. **Aufzeichnungen und Bewertung**: bei anwendbarer DSGVO und erfüllten Voraussetzungen Aufzeichnungen nach Artikel 30 führen und Verarbeitungen mit hohem Risiko nach Artikel 35 bewerten. Geringe Größe macht fortlaufendes Profiling nicht gelegentlich;
3. **Sicherheitserhaltung**: geeignete Maßnahmen, gültige vorherige Auswahl und verifizierte Löschung umsetzen. Standardmäßig aktives Profiling, öffentliche Wiederverwendung von Rohsuchen, E-Mail-Avatar-Anfragen und unvollständige Zurücksetzung bleiben Blockaden; ihre Offenlegung beseitigt sie nicht;
4. **Konfigurationskonsistenz**: tatsächliche Aufbewahrung, Bereinigung, Widerruf, externe Ressourcen und Sicherungen prüfen, nicht nur Umgebungsvariablen; optionale Verarbeitung ohne Rechtsgrundlage oder notwendige Garantien aussetzen;
5. **Anwendbares Recht und Übermittlungen**: territorialen Anwendungsbereich sowie tatsächliche Anbieter und Länder bestimmen. Die DSGVO ist keine weltweite Vertragsgarantie; Zertifizierungen oder öffentliche Anbieterrichtlinien begründen weder Verträge noch Garantien für internationale Übermittlungen.

## 5. Übernahme der Dokumente dieser Website

Diese Dokumente beschreiben bestimmte gehostete Testinstanzen und den geprüften öffentlichen RC; sie sind weder eine Konformitätszertifizierung noch automatisch für jede Bereitstellung geltende Bedingungen. Jede Übernahme erfordert:

1. die Angabe der tatsächlichen rechtlichen Identität des Betreibers, erreichbarer Kontakte, Domains, des Überarbeitungsdatums und des Übernahmedatums;
2. die Prüfung tatsächlicher Datenflüsse, Rollen Dritter, Verträge, Übermittlungsmechanismen, Auswahlmöglichkeiten, Aufbewahrung und Löschung vor der Verarbeitung;
3. die konsistente Pflege verständlicher Übersetzungen: Die chinesische Referenz und die neun Übersetzungen gehen zwingendem Recht und verbraucherfreundlicher Auslegung nicht vor;
4. angemessene Rechtsberatung und, soweit erforderlich, gültige Annahme oder gesonderte Einwilligung; das Kopieren des Textes oder die weitere Nutzung begründet keines von beiden.
