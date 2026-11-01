---
title: Open-Source- und Selbst-Hosting-Recht
description: Open-Source und Selbst-Hosting bei Sonic – Lizenzlage, Markengrenzen, Danksagungen und Abhängigkeiten von Dritten, Pflichten der Bereitsteller und Compliance-Grenzen.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite beschreibt die Lage und die Grenzen der Open-Source-Lizenzierung von Sonic, die Danksagungen an Dritte sowie die rechtlichen Pflichten beim Selbst-Hosting. Das Verhältnis von Softwarelizenz und Nutzungsbedingungen ist in den [Nutzungsbedingungen](/de/terms-of-service/), Abschnitt 2 und Abschnitt 10, dargestellt.

## 1. Lizenzlage

| Posten | Lage |
| --- | --- |
| `LICENSE` im Stammverzeichnis des Repositorys | MIT License – **der maßgebliche Lizenztext**; diese Datei ist entscheidend |
| Erklärung in der historischen README | erklärte die Absicht CC BY-NC-SA 4.0 (nichtkommerziell, Namensnennung, Weitergabe unter gleichen Bedingungen); vor einer Entscheidung der Maintainer keine Lizenzgrundlage, sondern nur Ausdruck der nichtkommerziellen Positionierung des Projekts |
| Marken und Markenzeichen | die Namen und Zeichen `epocanvas` und `Sonic` vermitteln mit der Quellcode-Lizenz keinerlei Markennutzungsrechte |

Wie die endgültige Lizenzentscheidung auch ausfällt, die folgende Grenze gilt stets: Die Rechte an Aufnahmen, Lyrics, Covern und anderen Inhalten liegen bei den jeweiligen Rechteinhabern, und das Projekt gewährt keinerlei Weiterlizenzierung von Musikinhalten.

## 2. Positionierung des Projekts

Das Projekt ist ein nichtkommerzielles Open-Source-Projekt: ein Werkzeug zum Suchen, Aggregieren und Abspielen, das keine Musikdateien speichert oder hostet und keinerlei Komponenten zur Umgehung bezahlter Rechteschutzmechanismen integriert. Bei der Nutzung des Dienstes oder beim Selbst-Hosting müssen Sie selbst sicherstellen, dass die örtlichen Gesetze, die Bedingungen der vorgelagerten Dienste und die Anforderungen an die Inhaltslizenzierung eingehalten werden (zu den Verhaltensgrenzen siehe die [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/)).

## 3. Danksagungen und Abhängigkeiten von Dritten

Entwicklung und Multi-Source-Aggregationspraxis stützen sich auf folgende Open-Source-Community-Projekte und danken ihnen: Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, GDStudio Music API und die Linux.do-Community. Die vollständigen Abhängigkeiten und Erklärungen finden sich in `THIRD_PARTY_NOTICES.md` im Repository; die Bedingungen der einzelnen vorgelagerten Dienste unterliegen jeweils deren eigener Hoheit.

## 4. Rechtliche Pflichten selbst gehostender Bereitsteller

Ab dem Zeitpunkt der Bereitstellung ist der Bereitsteller der Verantwortliche für seine Nutzer (zur Rollenabgrenzung siehe den [Überblick](/de/overview/), Abschnitt 2) und hat zu erfüllen:

1. Informationspflicht: die Nutzer über die Datenverarbeitung informieren; die [Datenschutzerklärung](/de/privacy-policy/) dieser Website kann als Grundtext dienen, muss jedoch nach der tatsächlich eigenen Konfiguration angepasst werden (nicht aktivierte Drittanbieter-Kanäle sind aus der Information zu streichen);
2. Aufzeichnung und Bewertung: ein Verzeichnis der Verarbeitungstätigkeiten führen (Artikel 30 der DSGVO) und bei hohem Risiko eine Datenschutz-Folgenabschätzung durchführen (Artikel 35 der DSGVO);
3. Sicherheitsmaßnahmen: die Maßnahmen aus [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 3, umsetzen und die Aufsicht durch die zuständigen Stellen hinnehmen;
4. Konfigurationskonsistenz: die tatsächlichen Werte der Umgebungsvariablen (Aufbewahrungstage, Drittanbieter-Schalter, Ratenbegrenzung) müssen mit Ihren politischen Zusagen übereinstimmen;
5. Ergänzung nach Rechtsordnung: Ergänzend zur DSGVO sind die gesetzlichen Anforderungen der jeweiligen Rechtsordnung der Nutzer zu erfüllen, etwa UK GDPR, LGPD, CCPA-CPRA.

## 5. Übernahme der Dokumente dieser Website

Diese Website ist als Doppelgleis „allgemeine Vorlage + Rechtstexte der gehosteten Instanz“ angelegt; selbst gehostende Betreiber können sämtliche Dokumente dieser Website als Grundlage für die Information und die Bedingungen ihrer Website übernehmen:

1. Identitätsangaben ersetzen (Domain, Kontakt-E-Mail, Inkrafttretensdatum und Versionsnummer);
2. die wahrheitsgemäße Offenlegung der Drittanbieterliste und der Konfigurationsparameter nachprüfen;
3. den Satz „Die vereinfacht chinesische Version ist die rechtsverbindliche Fassung“ beibehalten oder auf die Sprache Ihrer rechtsverbindlichen Fassung umstellen und durchgängig befolgen;
4. vor dem regulären Betrieb anwaltlich beraten lassen; die Dokumente dieser Website stellen keine Rechtsberatung dar.
