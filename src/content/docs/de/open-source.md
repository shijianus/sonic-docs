---
title: Open-Source- und Selbst-Hosting-Recht
description: Open-Source und Selbst-Hosting bei Sonic – Lizenzlage, Markengrenzen, Danksagungen und Abhängigkeiten von Dritten, Pflichten der Bereitsteller und Compliance-Grenzen.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

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

## 4. Rechtliche Pflichten selbst gehostender Bereitsteller

Wer tatsächlich Zwecke und Mittel der Verarbeitung bestimmt, ist insoweit Verantwortlicher; rein persönliche Tests sind getrennt von öffentlichen Diensten zu beurteilen (zur Rollenabgrenzung siehe den [Überblick](/de/overview/), Abschnitt 2) und muss je nach anwendbarem Recht Folgendes prüfen und erfüllen:

1. Informationspflicht: die Nutzer über die Datenverarbeitung informieren; die [Datenschutzerklärung](/de/privacy-policy/) dieser Website kann als Grundtext dienen, muss jedoch nach der tatsächlich eigenen Konfiguration angepasst werden (nicht aktivierte Drittanbieter-Kanäle sind aus der Information zu streichen);
2. Aufzeichnung und Bewertung: bei anwendbarer DSGVO die Voraussetzungen für Aufzeichnungen nach Artikel 30 und eine Folgenabschätzung nach Artikel 35 prüfen; fortlaufendes Profiling ist nicht allein wegen geringer Nutzerzahlen gelegentlich;
3. Sicherheitsmaßnahmen: die Maßnahmen aus [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 3, umsetzen und die Aufsicht durch die zuständigen Stellen hinnehmen;
4. Konfigurationskonsistenz: die tatsächlichen Werte der Umgebungsvariablen (Aufbewahrungstage, Drittanbieter-Schalter, Ratenbegrenzung) müssen mit Ihren politischen Zusagen übereinstimmen;
5. Ergänzung nach Rechtsordnung: DSGVO, UK GDPR, LGPD oder CCPA-CPRA sind nur nach ihrem jeweiligen tatsächlichen Anwendungsbereich zu beurteilen; es gibt keine zusätzliche weltweite DSGVO-Vertragsgarantie.

## 5. Übernahme der Dokumente dieser Website

Die Dokumente beschreiben gehostete Testinstanzen und bekannte Umsetzungslücken. Andere Betreiber können sie als Ausgangspunkt prüfen, übernehmen damit aber weder automatisch einen Vertrag noch einen Konformitätsnachweis:

1. die tatsächliche rechtliche Identität, erreichbare Kontakte, Domains, Verarbeitungsorte und Anwendungszeitpunkte angeben;
2. die wahrheitsgemäße Offenlegung der Drittanbieterliste und der Konfigurationsparameter nachprüfen;
3. Pflegegrundlage und Übersetzungen klar angeben; Sprachvorrang darf zwingendes Recht, verbraucherfreundliche Auslegung und verständliche Information nicht ausschließen;
4. vor dem regulären Betrieb anwaltlich beraten lassen; die Dokumente dieser Website stellen keine Rechtsberatung dar.
