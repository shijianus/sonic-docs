---
title: Überblick über Datenschutz und Nutzungsbedingungen
description: Gesamtüberblick über die rechtlichen Dokumente von Sonic – Identität der Plattform, Abgrenzung der Rollen bei der Datenverarbeitung, DSGVO-Niveau als Schutzuntergrenze, Dokumentenaufbau, Rangfolge der Geltung und Kontaktstellen.
---

**Datum des Inkrafttretens: 1. November 2026｜Version: 1.3**

Diese Seite ist die Wegleitung zu allen rechtlichen Dokumenten des Sonic-Dienstes (nachfolgend „der Dienst“); sie erläutert die Rollen der Beteiligten, den Aufbau der Dokumente und ihre Geltungsreihenfolge. Vor der Anmeldung oder Nutzung des Dienstes sollten Sie diese Seite sowie die [Datenschutzerklärung](/de/privacy-policy/) und die [Nutzungsbedingungen](/de/terms-of-service/) lesen.

![Rechtsdokumenten-Architektur von Sonic: die Nutzungsbedingungen als Vertragsschicht, Datenschutzerklärung und Richtlinie zur akzeptablen Nutzung als Richtlinienschicht, Datenverarbeitung und Sicherheitsmaßnahmen, Verzeichnis der Weitergabe an Dritte und Begriffsdefinitionen als Stützdokumente, alles auf der DSGVO-Untergrenze des Datenschutzes ruhend](/images/sonic/legal-architecture.svg)

*Abbildung: Der Aufbau der rechtlichen Dokumente dieser Website. Die Nutzungsbedingungen bestimmen die vertraglichen Bedingungen; die Datenschutzerklärung trägt die Information und die Verarbeitungsstandards für personenbezogene Daten; die Richtlinie zur akzeptablen Nutzung legt die Verhaltensgrenzen fest; die übrigen drei Dokumente sind Stützdokumente. Die Datenschutz-Untergrenze legt die DSGVO als Mindeststandard für alle Nutzer fest.*

## 1. Identität der Plattform

Sonic ist eine Open-Source-Musikstreaming-Plattform, die mit der Architektur „Cloudflare-Edge-Kontrollebene + Linux-lokale Protokoll-Engine als Datenebene“ betrieben wird; der Quellcode wird gemäß der Datei `LICENSE` im Stammverzeichnis des Repositorys (MIT License) veröffentlicht. Der Dienst kann in zwei Formen bereitgestellt werden:

1. Gehostete Instanz: öffentliche Website, betrieben vom Betreiberteam (`sonic.epocanvas.tech` als Hauptstandort und `sonic.epocanvas.com` als Ersatz-Spiegel);
2. Selbst gehostete Instanz: private Website, die eine beliebige Person, ein Team oder eine Organisation nach dem Open-Source-Code auf eigenen Servern und eigenen Domains betreibt.

Beide Formen teilen sich denselben Open-Source-Code; sie unterscheiden sich hinsichtlich Betreiber und Verantwortlichkeit: Bei der gehosteten Instanz trägt sie das Betreiberteam, bei der selbst gehosteten Instanz der Bereitsteller.

## 2. Abgrenzung der Rollen bei der Datenverarbeitung

Die rechtlichen Dokumente des Dienstes verwenden die Rollenunterscheidung „Verantwortlicher/Auftragsverarbeiter“, die der allgemeinen Systematik der EU-Datenschutz-Grundverordnung (DSGVO) entspricht.

| Szenario | Verantwortlicher | Auftragsverarbeiter |
| --- | --- | --- |
| Gehostete Instanz | Betreiberteam (hinsichtlich Verhaltensereignissen, Anmeldungen und Sicherheitsaufzeichnungen) | Cloudflare, Epomail (Identitätsprüfung) und weitere; die vollständige Liste steht im [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/) |
| Selbst gehostete Instanz | die Person oder Organisation, die die Instanz bereitstellt (einziger und ausschließlicher Verantwortlicher) | die vom Bereitsteller konfigurierten Infrastrukturdienste |

Der Open-Source-Code selbst erhebt keine Telemetrie, lädt nichts hoch und sendet nichts zurück; abgesehen von externen Diensten, die der Instanzbetreiber selbst konfiguriert, erhalten die Upstream-Autoren keinerlei Betriebsdaten einer Instanz. Ab dem Zeitpunkt der Bereitstellung wird der Bereitsteller zum Verantwortlichen für seine Nutzer und muss die Informationspflichten, Sicherheitsmaßnahmen und die Unterwerfung unter die Aufsicht nach dem an seinem Ort anwendbaren Recht erfüllen; die Dokumente dieser Website kann er als Grundvorlage für seine Informationen und Bedingungen verwenden.

## 3. Aufbau der Dokumente

Die rechtlichen Dokumente dieser Website sind nach Themen gegliedert, verweisen aufeinander und bilden zusammen die vollständigen Vereinbarungen:

| Dokument | Inhalt |
| --- | --- |
| [Projektvorstellung](/de/project/) | Produktpositionierung, Kernfunktionen, technische Architektur, Sicherheits- und Datenschutzdesign, Deployment-Formen |
| [Datenschutzerklärung](/de/privacy-policy/) | Erhebung und Nutzung personenbezogener Daten, Rechtsgrundlagen, Speicherdauer, Betroffenenrechte und internationale Übermittlungen |
| [Nutzungsbedingungen](/de/terms-of-service/) | Vertragliche Nutzungsbedingungen, Kontoregeln, Haftungsbeschränkung, anwendbares Recht und Streitbeilegung |
| [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/) | Grenzen des Nutzungsverhaltens, Verbotskatalog, Eskalationsstufen und Beschwerdeverfahren |
| [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/) | Datenlebenszyklus, Verarbeitungsmatrix, Sicherheitsmaßnahmen, bekannte Grenzen, Vorfallreaktion |
| [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/) | Empfänger der Weitergabe, betroffene Daten, Übermittlungsgarantien |
| [Begriffsdefinitionen](/de/key-terms/) | Definitionen der in den rechtlichen Dokumenten dieser Website verwendeten Rechtsbegriffe (DSGVO-Vokabular) und technischen Begriffe |

## 4. Datenschutz-Untergrenze

Der Dienst legt die EU-Datenschutz-Grundverordnung (DSGVO) als Mindeststandard des Datenschutzes für **alle Nutzer** zugrunde: Wo auf der Welt Sie sich auch befinden, fallen Ihre Rechte in Bezug auf personenbezogene Daten (Information, Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch und Beschwerde) nie unter das von der DSGVO bestimmte Niveau.

1. Für Nutzer in der Europäischen Union und im Europäischen Wirtschaftsraum gilt die DSGVO unmittelbar;
2. Für Nutzer in anderen Regionen setzt der Dienst den DSGVO-Standard als Selbstverpflichtung ein und erfüllt ihn als Vertragspflicht;
3. Stärkere Schutzvorschriften des Rechts an Ihrem Wohnort gehen im Umfang ihrer Geltung vor.

Diese Untergrenze bedeutet: Auch wenn die gehostete Instanz in Taiwan betrieben wird und das auf die Nutzungsbedingungen anwendbare Recht das Recht am Ort des Betreibers ist (siehe die [Nutzungsbedingungen](/de/terms-of-service/), Abschnitt 11), werden Datenschutzangelegenheiten mit dem DSGVO-Niveau als Untergrenze ausgeführt; die Ausübung der Betroffenenrechte, die Meldung von Datenschutzverletzungen und die Sicherheitspflichten richten sich sämtlich nach diesem Standard.

## 5. Rangfolge der Geltung

1. Für Datenschutzangelegenheiten ist die [Datenschutzerklärung](/de/privacy-policy/) die spezielle Regelung; für die Bedingungen der Dienstnutzung sind es die [Nutzungsbedingungen](/de/terms-of-service/); im Übrigen ist der auf dieser Seite dargestellte Aufbau maßgeblich.
2. Bestehen zwischen den Dokumenten Widersprüche, geht das Dokument vor, das unmittelbar den betreffenden Gegenstand regelt.
3. Die rechtsverbindliche Fassung der rechtlichen Dokumente dieser Website ist die vereinfacht chinesische Version; die englische, japanische und deutsche Fassung sind Referenzübersetzungen. Im Zweifel über die Auslegung gilt die rechtsverbindliche Fassung.

## 6. Kontaktstellen

- Datenschutzangelegenheiten und Anliegen zum Datenschutz: `privacy@epocanvas.com`
- Dienst- und Kontoangelegenheiten: `admin@epocanvas.com`
- Open-Source-Projekt: Issues im GitHub-Repository (`github.com/shijianus/sonic`)
- Selbst gehostete Websites: wenden Sie sich an die vom jeweiligen Standort veröffentlichten Betreiberkontakte
