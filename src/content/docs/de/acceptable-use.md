---
title: Richtlinie zur akzeptablen Nutzung
description: Verhaltensgrenzen für gehostete Sonic-Ressourcen, Schutz vor Systemmissbrauch, Regeln zu Inhalten und fremden Rechten sowie Maßnahmen und Beschwerden.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Richtlinie gilt für die tatsächlich von Sonic betriebenen gehosteten Testinstanzen und ihre öffentlichen APIs. Sie schützt gemeinsam genutzte Ressourcen, Nutzer und vorgelagerte Dienste und enthält die Verhaltensregeln zu den [Nutzungsbedingungen](/de/terms-of-service/). Wenn Sie nicht zustimmen, stellen Sie die Nutzung der gehosteten Instanz ein. Sie macht aus einem kostenlosen, nicht gewinnorientierten Open-Source-Projekt keine unbedingte Sicherheitsgarantie und ersetzt weder die [Datenschutzerklärung](/de/privacy-policy/) noch die [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/).

Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version. Vereinfachtes Chinesisch im Stammverzeichnis ist die Pflegegrundlage; die übrigen neun Sprachfassungen sind Übersetzungen. Zwingendes Recht und das Recht von Verbrauchern auf klare, verständliche Bedingungen werden durch einen Sprachvorrang nicht eingeschränkt.

![Nutzungsgrenzen und Maßnahmen bei Sonic: normale Nutzung, Ressourcenschutz, Einschränkung, Aussetzung, Beendigung und Überprüfung](/images/sonic/aup-ladder.svg)

*Abbildung: Maßnahmen berücksichtigen Verhalten, Auswirkungen, Wiederholung und Risiken; die Grafik ist weder ein fester Sanktionskatalog noch eine Zusage von Bearbeitungsfristen.*

## 1. Geltungsbereich

1. Die Richtlinie gilt für Ihre Nutzung des gehosteten Sonic-Webplayers, öffentlicher APIs, Anmeldung, Suche, Wiedergabe, Lyrics, Empfehlungen und sonstiger öffentlicher Endpunkte.
2. Selbstbetriebene Bereitstellungen sind unabhängige Instanzen. Deren Betreiber bestimmen ihre Richtlinien, Konfiguration, rechtlichen Grundlagen und Nutzerbeziehungen selbst; diese Seite übernimmt für sie keine Betriebs- oder Vertragspflichten.
3. Im RC `a75f5cb` stehen die `LICENSE`-Dateien im Stammverzeichnis und im Player unter MIT, einschließlich Vervielfältigung, Änderung, Verbreitung und kommerzieller Nutzung nach deren Bedingungen. Im alten `main@ce443c8` ist nur die MIT-Lizenz des Players verifizierbar; im Stammverzeichnis wurde keine `LICENSE` gefunden. Daraus folgt keine MIT-Lizenz für den gesamten historischen Code. Diese Richtlinie schützt die gehostete Instanz und ihre Ressourcen, ohne lizenzgemäß erlaubte kommerzielle Nutzung pauschal zu verbieten.
4. Beim aktuellen Abgleich wurde kein Pfad gefunden, der importierte lokale Audio-Blobs auf den Server hochlädt. Lyrics- und Empfehlungsfunktionen können weiterhin Titel, Künstler, Album, Dauer oder Kennungen übermitteln; siehe [Datenschutzerklärung](/de/privacy-policy/).

## 2. Verbotene Handlungen

### 2.1 Missbrauch von Systemen und Schnittstellen

1. Unbefugtes Erlangen, Verwenden oder Teilen fremder Konten, Sitzungen, Cookies, API Keys oder Dienstschlüssel, Fälschen von Berechtigungsnachweisen sowie Umgehen von Authentifizierung, Ratenbegrenzung, Signaturprüfung, SSRF-Schutz oder anderen Zugriffskontrollen der gehosteten Instanz.
2. Unbefugtes Untersuchen oder Ausnutzen nicht öffentlicher Endpunkte, interner Adressen oder Zugangsdaten der gehosteten Instanz sowie Erlangen oder Offenlegen privater Daten anderer. Öffentliche Suchvorschläge dürfen nicht zum Sammeln, Bloßstellen oder Verifizieren fremder Daten missbraucht werden.
3. Beanspruchung gemeinsamer Ressourcen durch massenhaftes Abrufen von Suchergebnissen, Lyrics, Abspieladressen oder API-Antworten für nicht erlaubten Weiterverkauf, Spiegel oder Datensätze. Normale persönliche Wiedergabe, maßvolle API-Nutzung und autorisierte Integrationen sind davon ausgenommen.
4. Nutzung des gehosteten Proxys als allgemeiner Netzwerkproxy, Scanner oder Angriffssprungbrett sowie absichtliche Erzeugung unnötiger Parallelität, Datenlast, Fehler oder Cache-Belastung.

Das Lesen des Quellcodes, Tests mit synthetischen oder autorisierten Daten auf einer eigenen lokalen Instanz und verantwortungsvolle Schwachstellenmeldungen sind nicht verboten. Aktive Sicherheitstests an öffentlichen Instanzen benötigen vorherige angemessene Erlaubnis und müssen Auswirkungen auf andere, Zugriff auf deren Daten und die Ausweitung von Schwachstellen vermeiden. Eine minimale Reproduktion kann vertraulich an `admin@epocanvas.com` gesendet werden; veröffentlichen Sie keine echten Berechtigungsnachweise.

### 2.2 Inhalte und Rechte

1. Der gehostete Dienst darf nicht zur Durchführung oder Förderung von Piraterie, Umgehung von Zahlungs- oder Urheberrechtsschutzmaßnahmen sowie Verletzung von Urheber-, Marken-, Bild-, Persönlichkeits-, Datenschutz- oder sonstigen Rechten genutzt werden.
2. Der Dienst darf nicht zur Verbreitung rechtswidriger Inhalte, Schadsoftware, Darstellungen sexueller Ausbeutung von Kindern oder rechtswidriger terroristischer Propaganda sowie zur rechtswidrigen oder unbefugten Offenlegung fremder Zugangsdaten oder personenbezogener Daten verwendet werden. Normale Anmeldung und notwendige vertrauliche Betroffenenanfragen sind dadurch nicht verboten; auch der Import lokaler Musik ist kein Datei-Upload zu Sonic.
3. Es ist untersagt, sich als andere Personen oder Organisationen auszugeben oder durch Namen und Zeichen von `Sonic`, `Epomail` oder `EpoCanvas` eine nicht autorisierte Unterstützung, Zusammenarbeit oder Sicherheitszertifizierung vorzutäuschen.
4. Suchtexte, Kommentare oder Meldungsunterlagen dürfen nicht eingereicht werden, wenn wissentlich private Angaben anderer enthalten sind. Öffentliche Kommentare können Namen, Avatare und Texte anderer Personen enthalten; das Schreiben lokaler Kommentare in localStorage bedeutet nicht, dass eine Veröffentlichung erlaubt ist.

### 2.3 Rechte anderer und Dienststabilität

1. Betreiber, vorgelagerte Anbieter, Mitwirkende und andere Nutzer dürfen nicht belästigt, bedroht, verleumdet, verfolgt, diskriminiert oder angegriffen werden. Öffentliche Caches oder Vorschlagsfunktionen dürfen nicht zur Offenlegung fremder Daten genutzt werden.
2. Verfügbarkeit, Integrität und Sicherheit der gehosteten Instanz, vorgelagerter Inhalts- und Identitätsdienste oder Netzwerke dürfen nicht beeinträchtigt werden, auch nicht durch absichtliches Auslösen von Circuit Breakern, Fallback oder Ressourcenerschöpfung.
3. Das an Ihrem Ort anwendbare Recht darf nicht verletzt werden; Inhaltsschnittstellen dürfen nicht entgegen den Regeln vorgelagerter Dienste genutzt werden. Lizenzgemäße Codenutzung verleiht nicht automatisch Rechte an externen Inhalten, Konten oder Musik.

## 3. Grenzen der Ressourcennutzung

Gehostete Instanzen können Anfragen nach Anmeldezustand, IP-Adresse, Sitzung, Schnittstelle und Ereignisstapel begrenzen. Konkrete Werte hängen von der tatsächlichen Konfiguration ab und sind keine einheitliche Vertragszusage dieser Website für alle Bereitstellungen. Bei Überschreitung können `429`, Verzögerungen, Ablehnung oder vorübergehende Beschränkungen auftreten; dies bedeutet nicht zwangsläufig einen Verstoß.

Verwenden Sie angemessene persönliche Anfrageraten und vermeiden Sie paralleles Massenabrufen, wiederholte Wiederholungsversuche, lang andauernde Belegung von Audiostreams und unnötige Verhaltensmeldungen. Ratenparameter, Sperrung und Datenspeicherung können wegen Unterschieden zwischen Umgebungsvariablen, Compose und Quellcodevorgaben voneinander abweichen. Der Betriebszustand lässt sich nicht allein aus dieser Seite ableiten.

## 4. Maßnahmenstufen

Der Betreiber kann nach Auswirkungen, Absicht, Wiederholung, betroffenen Daten und Dringlichkeit eine oder mehrere Maßnahmen ergreifen und die notwendigen Gründe dokumentieren:

1. Hinweis oder Aufforderung, das betreffende Verhalten einzustellen;
2. Beschränkung von Schnittstellen, Parallelität, Cache, Ereignisübermittlung oder sonstiger Ressourcennutzung;
3. Aussetzung von Konten, Sitzungen, Berechtigungsnachweisen oder Netzwerkquellen; ob eine Sperrung sofort greift, hängt vom Sperrspeicher, den Schaltern und dem Erfolg der Anfrage ab;
4. Beendigung des Zugangs zur gehosteten Instanz oder Sperrung weiterer Nutzung betroffener Endpunkte;
5. Aufbewahrung notwendiger Aufzeichnungen und Weitergabe an berechtigte Empfänger im Umfang anwendbarer gesetzlicher Anforderungen, wirksamer Verlangen oder des notwendigen Schutzes anderer und der Systeme.

Bei laufenden Angriffen, entwendeten Zugangsdaten, schweren Sicherheitsbedrohungen oder offensichtlich rechtswidrigen Inhalten können erforderliche vorläufige Maßnahmen zuerst erfolgen und Erläuterung sowie Überprüfung anschließend nachgeholt werden. Maßnahmen nach dieser Richtlinie ersetzen nicht die mögliche gesetzliche Verantwortung der handelnden Person. Sie versprechen weder automatische Polizeimeldung noch feste Speicherfristen, Personalreaktion binnen 24 Stunden oder dauerhafte Löschung sämtlicher zugehöriger Aufzeichnungen.

## 5. Beschwerden und Meldungen

- **Beschwerden**: Bei Einwänden gegen Beschränkung, Aussetzung oder Beendigung können Sie `admin@epocanvas.com` Konto, Zeitpunkt, betroffene Endpunkte und Gründe mitteilen. Der Betreiber überprüft innerhalb einer unter den verfügbaren Ressourcen angemessenen Frist; anwendbare gesetzliche Fristen, Rechte und Rechtsbehelfe bleiben unberührt. Feste Fristen, ein hauptberufliches Team oder zwingende Wiederherstellung des Zugangs werden nicht zugesagt. Senden Sie keine Passwörter, vollständigen Token oder sachfremden personenbezogenen Daten.
- **Meldungen**: Vermuteter Missbrauch, Rechtsverletzungen, Sicherheitsprobleme oder Schädigungen anderer können an dieselbe Adresse gemeldet werden. Übermitteln Sie notwendige Tatsachen, aber leiten Sie keine rechtswidrigen oder sensiblen Materialien weiter. Ob Maßnahmen oder Offenlegungen gegenüber zuständigen Stellen erfolgen, beurteilt der Betreiber nach Risiken, Datenminimierung und anwendbarem Recht.

Für Datenschutzrechte, Löschanfragen und Mitteilungen zu Datenschutzverletzungen verwenden Sie `privacy@epocanvas.com`. Diese Richtlinie betrifft nur tatsächlich gehostete Ressourcen; selbst betriebene Instanzen müssen eigene Betreiberangaben und Beschwerdewege bereitstellen.
