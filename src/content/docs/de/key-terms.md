---
title: Begriffsdefinitionen
description: Begriffe zu Datenschutz, Rollen, Einwilligung, Technik und lokaler Datenverarbeitung in den Rechtsdokumenten von Sonic.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite erläutert die wichtigsten Begriffe der [Datenschutzerklärung](/de/privacy-policy/), der [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), des [Verzeichnisses der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/) und der [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/). Die Rechtsbegriffe orientieren sich an der DSGVO. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version. Dies ist keine Zertifizierung rechtskonformen Betriebs. Vereinfachtes Chinesisch im Stammverzeichnis ist die Pflegegrundlage, die übrigen neun Sprachfassungen sind Übersetzungen. Zwingendes Recht und das Recht von Verbrauchern auf klare, verständliche Bedingungen werden durch einen Sprachvorrang nicht eingeschränkt.

![Begriffskarte von Sonic: rechtliche Rollen, Datenzustände, Verarbeitungsvorgänge und technische Komponenten](/images/sonic/key-terms-map.svg)

*Abbildung: Die Begriffe sind nach rechtlichen Rollen, Datenzuständen und technischer Umsetzung gegliedert; die Grafik erweitert keine rechtliche Rolle eines Beteiligten.*

## 1. Rechtsbegriffe

| Begriff | Definition |
| --- | --- |
| Personenbezogene Daten | Alle Informationen über eine identifizierte oder identifizierbare natürliche Person (Artikel 4 Absatz 1 der DSGVO). IP-Adressen, Cookies, Suchbegriffe, Avatar-URLs, Namen oder Texte in Kommentaren und zuordenbare pseudonyme Kennungen können personenbezogene Daten sein. |
| Verarbeitung | Jeder Vorgang im Zusammenhang mit personenbezogenen Daten, etwa Erheben, Erfassen, Speichern, Abfragen, Verwenden, Übermitteln, Offenlegen, Einschränken oder Löschen (Artikel 4 Absatz 2 der DSGVO). |
| Einschränkung der Verarbeitung | In bestimmten Fällen die Nutzung von Daten aussetzen, während die Daten erhalten bleiben (Artikel 18 der DSGVO). |
| Profiling | Automatisierte Analyse oder Bewertung persönlicher Merkmale oder Verhaltensweisen. Wiedergabe, Suche, Überspringen, Favoriten, Ablehnungen und Kontext können Empfehlungen beeinflussen; Profiling ist nicht gleichbedeutend mit einer Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung. |
| Pseudonymisierung | Verarbeitung, bei der Daten ohne zusätzliche Informationen nicht unmittelbar einer bestimmten Person zugeordnet werden können (Artikel 4 Absatz 5 der DSGVO). Pseudonymisierte Daten können durch Verknüpfung weiterhin identifizierbar sein und sind nicht anonymisiert. |
| Verantwortlicher | Natürliche oder juristische Person, die allein oder gemeinsam Zwecke und Mittel der Verarbeitung bestimmt (Artikel 4 Absatz 7 der DSGVO). Bei gehosteten Instanzen ist maßgeblich, welche Person oder Organisation tatsächlich entscheidet; Codeautor, Mitwirkende und Betreiber müssen nicht dieselbe Person sein. |
| Auftragsverarbeiter | Natürliche oder juristische Person, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet (Artikel 4 Absatz 8 der DSGVO). Entscheidend sind tatsächliche Zwecke, Weisungen und Vereinbarungen; Cloudflare, Epomail oder andere Anbieter werden nicht durch ihren Namen automatisch zu Auftragsverarbeitern. |
| Empfänger | Natürliche oder juristische Person, der personenbezogene Daten offengelegt werden (Artikel 4 Absatz 9 der DSGVO). Auch ein Dienst, der bei Browser-Direktzugriffen IP-Adressen erhält, kann Empfänger sein. |
| Dritter | Eine Stelle außer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter oder den zur Verarbeitung ermächtigten Personen (Artikel 4 Absatz 10 der DSGVO). |
| Einwilligung | Freiwillige, bestimmte, informierte und unmissverständliche bestätigende Willensbekundung (Artikel 4 Absatz 11 und Artikel 7 der DSGVO), jederzeit ebenso einfach widerrufbar wie erteilbar. Anmeldung, weitere Nutzung oder standardmäßige Aktivierung sind keine Einwilligung in optionales Profiling; fehlende Einwilligungsaufzeichnungen rechtfertigen nicht, grundlose Verarbeitung weiterzuführen. |
| Verletzung des Schutzes personenbezogener Daten | Sicherheitsvorfall, der zur unbeabsichtigten oder unrechtmäßigen Vernichtung, zum Verlust, zur Veränderung oder zur unbefugten Offenlegung beziehungsweise zum unbefugten Zugriff auf personenbezogene Daten führt (Artikel 4 Absatz 12 der DSGVO). |
| Zuständige Aufsichtsbehörde | Öffentliche Stelle, die gesetzlich Datenschutzpflichten überwacht. Bei anwendbarer DSGVO können Betroffene bei einer zuständigen Behörde Beschwerde einlegen (Artikel 77 der DSGVO). |
| Internationale Übermittlung | Übermittlung personenbezogener Daten in Drittländer oder an internationale Organisationen außerhalb der EU beziehungsweise des EWR; tatsächliche Orte, Beteiligte und Garantien sind zu beurteilen, statt sie aus Servernamen abzuleiten. |
| Besondere Datenkategorien | Daten, die etwa rassische oder ethnische Herkunft, politische Meinungen, religiöse oder weltanschauliche Überzeugungen, Gewerkschaftszugehörigkeit, genetische Daten oder biometrische Daten zur eindeutigen Identifizierung einer natürlichen Person, Gesundheit, Sexualleben oder sexuelle Orientierung offenlegen (Artikel 9 der DSGVO). Auch Musikvorlieben und Suchbegriffe können sensible Merkmale mittelbar offenbaren und dürfen nicht pauschal als unbedenklich gelten. |
| Betroffene Person | Identifizierte oder identifizierbare natürliche Person, deren Daten verarbeitet werden; „Sie“ bezeichnet hier die betreffende natürliche Person, die eine Anfrage stellt oder den Dienst nutzt. |

## 2. Technische und Produktbegriffe

| Begriff | Definition |
| --- | --- |
| Gehostete Instanz | Sonic-Bereitstellung, zu der der Projektbetreiber tatsächlich Zugang gewährt; Geltungsbereich, Verantwortlicher, Konfiguration und Kontakte siehe [Datenschutzerklärung](/de/privacy-policy/). |
| Selbstbetrieb | Unabhängige Instanz einer anderen Person. Betreiber prüfen Verantwortlichkeit, Recht, Konfiguration und Informationen selbst; die Bereitstellung von MIT-Code macht das Projekt nicht zu deren Betreiber. |
| Kontrollebene | Komponenten für Webseiten, Routing, Cache, Ratenbegrenzung oder Edge-API; sie können IP-Adressen, Cookies, Authentifizierungsheader, User-Agent, Pfade und Kontext verarbeiten. |
| Datenebene | Komponenten für Engine, Empfehlungsberechnung, Datenbanken und zugehörige Dienste. Der aktuelle Abgleich zeigt, dass rohe IP-Adressen zusammen mit Cookies, Authentifizierungsheadern oder Kontext an die Engine gelangen können; sie empfängt nicht ausschließlich pseudonyme Daten. |
| Epomail OAuth | OAuth-2.0-Anmeldung über Epomail mit PKCE; kann Nutzerkennung, E-Mail-Adresse und Verifizierungskennzeichen, Nickname, Avatar-URL und Rolle zurückgeben. |
| API Key / `jti` | Signierter, befristeter API-Berechtigungsnachweis und dessen eindeutige Kennung. Signaturprüfung ist keine Verschlüsselung; Cookies, kopierte Nachweise und Sperrspeicher sind getrennt zu beurteilen. |
| fail-closed | Ablehnung einer Anfrage bei fehlgeschlagener Prüfung oder notwendigem Speicherzugriff statt stiller Rückstufung; ob dies in der tatsächlichen Umgebung gilt, muss anhand der Konfiguration geprüft werden. |
| SSRF-Abwehr und Domänen-Allowlist | Ausgehende Prüfungen bestimmter interner, Loopback- und Cloud-Metadatenadressen, Umleitungen oder erlaubter Domains; erfassen nicht Browser-Direktzugriffe und sämtliche vorgelagerten HTTP-Verbindungen. |
| SQLite / WAL | SQLite-Datenbank und Write-Ahead-Logging als mögliche persistente Speicherung der Datenebene; keine Aussage, dass Profile, Protokolle, Backups und Radar-Daten in derselben Datenbank liegen oder nach derselben Frist gelöscht werden. |
| Circuit Breaker | Mechanismus, der nach wiederholten Fehlern oder Zeitüberschreitungen vorübergehend Anfragepfade ändert; Schwellen, Fallback und Aktivierung hängen von tatsächlicher Version und Konfiguration ab. |
| Verhaltensereignisse | Signale wie Wiedergabe, Fortschritt, Überspringen, Favoriten, Ablehnungen, Suche oder Entitätsfeedback, die Empfehlungen beeinflussen können. Stapelgrenzen, Rauschfilterung und Speicherung hängen von Version und Konfiguration ab. |
| Öffentliche Suchvorschläge | Funktionspfad, der frühere oder statistisch erfasste Suchbegriffe anderen Besuchern anbietet. Derzeit besteht die Gefahr der Wiederverwendung unveränderter Suchtexte; sie dürfen nicht bloß als anonyme Aggregate bezeichnet werden. |
| Radar | Erkundungs-, Empfehlungs- oder Synchronisierungsfunktionen und Zustände auf Basis von Nutzerangaben oder Verhalten. Ein dauerhafter Engine-Speicherpfad ist derzeit nicht bestätigt; Synchronisierungs- oder isolierte Speicherversuche bestehen, sodass weder vorhandene noch fehlende dauerhafte Datenbankaufzeichnungen zugesagt werden können. |
| Lokale Musik | Dateien oder Blobs auf dem Nutzergerät. Ein Uploadpfad für lokale Audio-Blobs wurde nicht gefunden; Lyrics-Anfragen und Empfehlungskontext können dennoch Titel, Künstler, Album, Dauer oder Kennungen übermitteln. |
| Lokale Kommentare | Derzeit in localStorage geschriebene Kommentarentwürfe oder -inhalte; dies ist keine Veröffentlichung auf einem Kommentarserver. Beim Lesen können Namen, Avatare und Texte anderer Personen empfangen werden und in öffentliche Caches gelangen. |
| Direktzugriff / Proxy | Ein Proxy ruft Ressourcen serverseitig ab; beim Direktzugriff kontaktiert der Browser das Inhalts-CDN. Der Zieldienst sieht dabei Browser-IP und Verbindungsinformationen; Stream-Anfragen können den Browser-User-Agent statt eines festen Werts verwenden. |
| Version und Konfiguration | Quellcodevorgaben, `.env`, Compose und Produktion können voneinander abweichen. GDStudio ist bei fehlender Einstellung im Code standardmäßig aktiv, kann jedoch in Umgebung oder Compose ausgeschaltet sein; tatsächliche Laufzeitkonfiguration prüfen. |

## 3. Auslegungsgrundlage

1. Rechtsbegriffe gelten nur bei Erfüllung ihrer tatsächlichen Voraussetzungen. „Einzelprojekt“, „kostenlos“ oder „Open Source“ sind keine Synonyme für Verantwortlichkeit, Auftragsverarbeitung, Einwilligung, Anonymisierung oder Sicherheitskonformität.
2. Technische Begriffe werden gemeinsam anhand von Quellcode, tatsächlicher Umgebung und Anfragepfaden der Anbieter geprüft. Weichen README-Entwurfsziele und Dokumentation voneinander ab, dürfen Ziele nicht als Garantien ausgegeben werden. Bei Widersprüchen zwischen Code, Konfiguration und Seiten sind weitergehende Behauptungen einzustellen und die betroffenen Seiten zu korrigieren.
3. Die Rechtsdokumente verwenden vereinfachtes Chinesisch als Pflegegrundlage und neun weitere Sprachfassungen als Übersetzungen. Abweichungen zwischen Übersetzung und Stammfassung sind zeitnah zu synchronisieren; zwingendes Recht und Verbraucherrechte auf klare, verständliche Informationen bleiben unberührt.
4. Im RC `a75f5cb` sind die `LICENSE`-Dateien im Stammverzeichnis und im Player MIT; im alten `main@ce443c8` ist nur die MIT-Lizenz des Players verifizierbar, und im Stammverzeichnis wurde keine `LICENSE` gefunden. Diese Definitionen beschränken keine nach der tatsächlich geltenden Lizenz der jeweiligen Version und Komponente erlaubte Vervielfältigung, Änderung, Verbreitung oder kommerzielle Nutzung. Die [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/) betrifft nur tatsächlich gehostete Ressourcen und Handlungen im gehosteten Dienst.
5. Quellenabgleich am 2026-11-02: öffentlicher RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), getrennt vom alten `main@ce443c8` (2026-10-27 UTC); keiner der Codestände belegt die produktive Version.
