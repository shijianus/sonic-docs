---
title: Richtlinie zur akzeptablen Nutzung
description: Richtlinie zur akzeptablen Nutzung von Sonic – Geltungsbereich, Verbotskatalog, Obergrenzen der Ressourcennutzung, Eskalationsstufen, Kanäle für Null-Toleranz-Fälle und Beschwerdeverfahren.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Richtlinie legt die Grenzen des Verhaltens bei der Nutzung des Sonic-Dienstes (nachfolgend „der Dienst“) fest und beschreibt die verbotenen Verhaltensweisen sowie die Maßnahmen des Betreibers. Sie ist die in Abschnitt 7 der [Nutzungsbedingungen](/de/terms-of-service/) genannte Verhaltensnorm und gilt für Ihre gesamte Nutzung des Dienstes; wer nicht einverstanden ist, stelle die Nutzung des Dienstes ein.

![Eskalationsleiter von Sonic: vier Stufen (Hinweis, Ratenbegrenzung, Aussetzung, Beendigung), anschließend Beweissicherung und gesetzliche Weitergabe; der Kanal für Null-Toleranz-Fälle zum Schutz von Kindern und Jugendlichen und gegen Terrorinhalte verfährt sofort; der Beschwerdekreislauf ermöglicht den Betroffenen eine Nachprüfung](/images/sonic/aup-ladder.svg)

*Abbildung: Die Maßnahmen des Betreibers werden je nach Schwere des Falls aufeinander aufbauend angewendet, und jede Stufe wird mit Begründung protokolliert; für den Kanal der Null-Toleranz-Fälle gilt kein Stufenverfahren; gegen jede Maßnahme steht den Betroffenen die Beschwerde zu.*

## 1. Geltungsbereich

Diese Richtlinie gilt für jedes Verhalten, mit dem Sie den Dienst in irgendeiner Weise nutzen, einschließlich:

1. sämtlicher Funktionen des Webplayers (Suche, Wiedergabe, Lyrics, Empfehlungen, Downloads, Import lokaler Musik);
2. des Zugangs über die offene API, einschließlich von Ihnen selbst erstellter Drittanbieter-Clients und Skripte;
3. selbst gehosteter Instanzen (selbst gehostende Betreiber dürfen diese Richtlinie nach Anpassung anwenden, jedoch nicht unter den Anforderungen des Rechts an ihrem Standort).

## 2. Verbotene Verhaltensweisen

### 2.1 Missbrauch von System und Schnittstellen

1. Umgehen oder Aushebeln von Ratenbegrenzung, Signaturvalidierung, Circuit Breaker, SSRF-Abwehr, Domänen-Whitelist oder anderer technischer Schutzmaßnahmen;
2. Fälschen von API-Schlüsseln, Wiederholen gesperrter Schlüsselkennungen (jti), Entwenden fremder Sitzungen oder Schlüssel sowie jedes Umgehen der fail-closed-Validierung;
3. massenhaftes automatisiertes Abgreifen von Suchergebnissen, Lyrics oder Abspieladressen des Dienstes für Weiterverkauf, Weiterverbreitung oder den Aufbau von Spiegeldatensätzen ohne Bezug zu den Dienstfunktionen;
4. Ausspionieren, Scannen oder anderweitiges Erlangen der internen Topologie, der Dienstschlüssel, der Schlüsselmaterialien oder nicht öffentlicher Endpunkte des Dienstes;
5. Nutzung der Proxy-Endpunkte des Dienstes (`/api/music/stream`, `/api/sonic/forward` usw.) als allgemeiner Netzwerkproxy für Ziele ohne Bezug zur Musikwiedergabe.

### 2.2 Inhalte und Rechte

1. Nutzung der vom Dienst bereitgestellten Schnittstellen, um bezahlte Zugänge oder Rechteschutzmechanismen einer Musikplattform zu knacken, zu umgehen oder zu stören;
2. Verbreiten von Inhalten, die das Urheberrecht, Markenrechte, Bildrechte oder Persönlichkeitsrechte anderer verletzen;
3. Hochladen oder Verbreiten rechtswidriger Inhalte, einschließlich Materialien zur sexuellen Ausbeutung von Kindern und Jugendlichen und terroristischer Propaganda;
4. Handeln unter fremdem Namen oder fremdem Organisationszeichen sowie nicht autorisierte Verwendungen, die mit den Namen und Zeichen `epocanvas` und `Sonic` den Eindruck einer Billigung durch den Dienst erwecken;
5. Hochladen rechtswidriger Dateien, die über den Dienst verbreitet werden sollen, in die Funktionen für lokalen Musikimport oder Downloads.

### 2.3 Rechte anderer

1. Stören oder Beschädigen des ordnungsgemäßen Betriebs des Dienstes oder zugehöriger Systeme, einschließlich der absichtlichen Auslösung von Circuit Breaker und Degradierungsmechanismus;
2. Belästigung, Verleumdung oder Angriffe gegen den Betreiber, vorgelagerte Dienstanbieter oder andere Nutzer;
3. Nutzung des Dienstes für Zwecke, die das Recht an Ihrem Wohnort oder die Bedingungen der vorgelagerten Dienste verletzen;
4. Verkauf, Untervermietung oder kommerzielle Weitergabe des Zugangs zum Dienst.

## 3. Obergrenzen der Ressourcennutzung

| Posten | Obergrenze | Verhalten bei Überschreitung |
| --- | --- | --- |
| Anonyme Anforderungen | 240 pro Minute (Standardwert) | unmittelbare Ablehnung an der Edge-Schicht (429), keine Erfassung als Verstoß |
| Authentifizierte Anforderungen | 600 pro Minute (Standardwert) | unmittelbare Ablehnung an der Edge-Schicht (429); anhaltende Überschreitung führt zur Eskalationsleiter |
| Authentifizierungsendpunkt (Anmeldung/Schlüsselausstellung) | 30 pro Minute und IP | unmittelbare Ablehnung an der Edge-Schicht (429) |
| Übermittlung von Verhaltensereignissen | höchstens 50 Ereignisse pro Stapel, Anforderungskörper 64 KB | überschreitende Anforderungen werden insgesamt abgelehnt |
| Audiostreams | über den Edge-Proxy oder den von Ihnen ausdrücklich verlangten Direktverbindungsmodus | abnormale Parallelität führt zur Eskalationsleiter |

Normale persönliche Nutzung erreicht die vorgenannten Grenzen nicht; der technische Zweck der Ratenbegrenzung ist Missbrauchsprävention und Dienststabilität, keine Strafe. Die Parameter der Ratenbegrenzung sind vom Bereitsteller konfigurierbar; bei selbst gehosteten Instanzen sind die tatsächlich geltenden Werte deren Konfiguration zu entnehmen.

## 4. Eskalationsstufen

Stellt der Betreiber einen Verstoß fest, wendet er je nach Schwere folgende Maßnahmen an; jede Stufe wird mit Begründung protokolliert:

1. Hinweis: Warnung im Player mit Angabe des Grundes;
2. Ratenbegrenzung: Herabsetzung des Anforderungskontingents des Kontos oder Schlüssels;
3. Aussetzung: vorübergehende Sperrung der Sitzung und des API-Schlüssels des Kontos (über die jti-Sperrliste oder den Mechanismus zur sofortigen Sperrung); die Daten bleiben vorläufig aufbewahrt;
4. Beendigung: Ende der Nutzungsberechtigung; die Verhaltensdaten werden nach Ablauf der Speicherdauer (90 Tage, Untergrenze 7 Tage) vernichtet;
5. Beweissicherung und gesetzliche Weitergabe: soweit gesetzlich erforderlich, Aufbewahrung der Aufzeichnungen im notwendigen Umfang und Herausgabe an befugte Stellen nach förmlichem Verfahren.

Für folgende Fälle gilt kein Stufenverfahren; der Betreiber kann sofort aussetzen, weiterleiten oder melden: Materialien zur sexuellen Ausbeutung von Kindern und Jugendlichen, terroristische Propagandainhalte, laufende Systemangriffe.

## 5. Beschwerde und Meldung

- Beschwerde: Halten Sie eine Maßnahme für fehlerhaft, können Sie unter Angabe des betroffenen Kontos und des Sachverhalts an `admin@epocanvas.com` schreiben; der Betreiber prüft innerhalb einer angemessenen Frist nach und antwortet. Auch Beschwerden gegen dringende Maßnahmen (die Null-Toleranz-Fälle in Abschnitt 4) werden entgegengenommen; während der Prüfung bleibt der Rechtsbehelf gegen Fehlentscheidungen zu Ihren Lasten unberührt.
- Meldung: Wer Verstöße gegen diese Richtlinie feststellt, kann sie unter der vorgenannten Adresse melden; gegenüber dem Gemeldeten bleibt die Meldung bis zu ihrer Prüfung vertraulich. Meldungen zum Schutz von Kindern unterliegen nicht der Vertraulichkeitszusage und werden nach förmlichem Verfahren behandelt.

Maßnahmen des Betreibers nach dieser Richtlinie befreien den Verstoßenden nicht von der ihm nach Gesetz obliegenden Verantwortung.
