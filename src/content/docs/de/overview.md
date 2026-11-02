---
title: Überblick über Datenschutz und Nutzungsbedingungen
description: Diensteanbieter, Geltungsbereich des Datenschutzes, Verhältnis der Dokumente und noch umzusetzende Voraussetzungen des individuellen, nicht gewinnorientierten Sonic-Testprojekts.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite erläutert das Verhältnis der Dokumente zum gehosteten Sonic-Testdienst. Das Projekt wird von einer Einzelperson kostenlos und ohne Gewinnerzielungsabsicht für Lernzwecke und gemeinwohlorientierte Tests gepflegt; es gibt keine kommerziellen Service-Level oder Zusage eines dauerhaften Betriebs. Lesen Sie zuerst die [Nutzungsbedingungen](/de/terms-of-service/) und die [Datenschutzerklärung](/de/privacy-policy/), um Dienstumfang und Datenverarbeitung zu verstehen. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

:::caution[Dokumentüberarbeitung und tatsächliche Bereitstellung]
Der öffentliche RC und der alte `main` sind unterschiedliche Codestände; ihre Fähigkeiten dürfen nicht gleichgesetzt werden. Produktivumgebung, Anbieterverträge und tatsächliche Löschresultate wurden nicht geprüft. Standardmäßig aktiviertes Profiling, öffentliche Suchbegriffvorschläge, Avatar-Anfragen mit E-Mail-Adressen, Löschabdeckung und tatsächliche Speicherfristen müssen weiterhin geklärt und korrigiert werden. Eine aktualisierte Erklärung belegt keine bereits erfolgte Behebung dieser Probleme. Verarbeitungen ohne rechtmäßige Grundlage und notwendige Garantien sind auszusetzen.
:::

![Dokumentbeziehungen bei Sonic: Nutzungsbedingungen, Datenschutzinformationen, Nutzungsregeln und Datenbeschreibungen](/images/sonic/legal-architecture.svg)

*Abbildung: Die Dokumente haben unterschiedliche Aufgaben; die Verarbeitung personenbezogener Daten benötigt eine eigenständig tragfähige Rechtsgrundlage.*

## 1. Projekt und Betreiber

Das öffentliche Code-Repository ist [shijianus/sonic](https://github.com/shijianus/sonic). Im RC `a75f5cb` stehen die `LICENSE`-Dateien im Stammverzeichnis und im Player unter MIT. Im alten `main@ce443c8` ist nur die MIT-Lizenz des Players verifizierbar; im Stammverzeichnis wurde keine `LICENSE` gefunden. Historische Versionen und Komponenten sind gesondert zu beurteilen. Die nicht gewinnorientierte Ausrichtung des Projekts widerruft die Codelizenz nicht und erteilt keine Nutzungsrechte an Musik, Lyrics, Covern oder MVs.

Diese Dienstdokumente sind für gehostete Instanzen unter `sonic.epocanvas.tech` und `sonic.epocanvas.com` bestimmt, die sie tatsächlich übernehmen. Der tatsächliche Betreiber muss seine rechtliche Identität und erreichbare Kontaktdaten angeben. Das Wartungskonto `shijianus` oder die Marke EpoCanvas ersetzt keine vollständige Identitätsinformation. Der Quellcode belegt weder den rechtlichen Namen und Standort des Betreibers noch das Land der Server; hierzu werden keine Annahmen getroffen.

Andere Bereitstellungen haben eigene Betreiber und Regeln. Die bloße Veröffentlichung von Code, Mitwirkung an Patches oder Bereitstellung eines Offline-Werkzeugs begründet nicht automatisch Dienst- und Datenverantwortung für sämtliche Instanzen. Wer zugleich tatsächlich betreibt oder an der Festlegung der Verarbeitung beteiligt ist, trägt Verantwortung entsprechend seiner tatsächlichen Rolle.

## 2. Rollen bei der Datenverarbeitung

| Beteiligte | Beurteilung der Rolle | Erläuterung für dieses Projekt |
| --- | --- | --- |
| Betreiber einer gehosteten Instanz | Entscheidet tatsächlich über Zwecke und Mittel der Verarbeitung personenbezogener Daten | Verantwortet eigene Anmeldung, Anfragen, Empfehlungen und zugehörige Verarbeitungen |
| Infrastrukturanbieter | Verarbeitung auf Weisung oder für eigene Zwecke | Rollen von Cloudflare und anderen hängen vom konkreten Dienst und Vertrag ab |
| Epomail sowie Inhalts- und Ressourcenanbieter | Möglicherweise eigenständige Verantwortliche; einzelne Fälle gesondert beurteilen | Nicht alle Dritten werden pauschal als Auftragsverarbeiter bezeichnet |
| Selbst betreibende Personen und Code-Mitwirkende | Entscheidend ist, ob sie tatsächlich Verarbeitung bestimmen oder daran beteiligt sind | Die Bezeichnungen Betreiber oder Mitwirkender legen nicht automatisch alleinige, ausschließliche Verantwortung fest |

Die tatsächlichen Datenflüsse umfassen optionales Profiling, Anfragekontext, Browserdaten, direkte externe Ressourcen und Suchstatistiken. „Open Source“ oder „lokale Speicherung“ bedeutet nicht, dass keine Daten übermittelt werden; fehlende Anmeldung und Hashwerte sind ebenfalls keine Anonymität. Maßgeblich sind die präzisen Angaben der Datenschutzerklärung; technische Beschreibungen müssen damit übereinstimmen.

## 3. Zweck der Dokumente

| Dokument | Zweck |
| --- | --- |
| [Nutzungsbedingungen](/de/terms-of-service/) | Bedingungen des gehosteten Dienstes, Inhaltsrechte, Betriebsgrenzen und Haftung |
| [Datenschutzerklärung](/de/privacy-policy/) | Verantwortlicher, Daten, Zwecke, Grundlagen, Empfänger, Speicherung und Rechte |
| [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/) | Öffentliche Ressourcen, autorisierte Tests, verbotene Handlungen und Maßnahmen |
| [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/) | Tatsächliches Sicherheitsdesign, Lücken, Vorfallbearbeitung und risikogerechte Maßnahmen |
| [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/) | Externe Ressourcen, eigenständige Rollen, Konfiguration und internationale Voraussetzungen |
| [Begriffsdefinitionen](/de/key-terms/) | Personenbezogene Daten, Pseudonymisierung, Profiling und technische Begriffe |
| [Datenverwaltung](/de/data-management/) | Nutzeraktionen und Grenzen ihrer Abdeckung |

## 4. Schutzziel, Risiken und rechtliche Anwendbarkeit

Die Anwendbarkeit der DSGVO ist anhand ihres Artikels 3 und der konkreten Tatsachen zu prüfen. Auch kostenlose Angebote an Personen in der EU oder die Beobachtung ihres dortigen Verhaltens können erfasst sein; bloße Zugriffe aus dem Ausland entscheiden allein ebenso wenig. Fehlende Gewinnorientierung, Open Source und Lernzwecke sind keine pauschale Ausnahme; ausschließlich persönliche oder familiäre Tätigkeiten sind nach ihrem tatsächlichen Umfang zu beurteilen.

Maßnahmen werden nach Verarbeitungsumfang, Risiken und Umsetzungskosten ausgewählt. Ein kleines Einzelprojekt muss nicht pauschal einen Datenschutzbeauftragten bestellen, Zertifizierungen erwerben, kommerzielle Audits bezahlen oder ein Team rund um die Uhr vorhalten. Die besonderen Voraussetzungen von Artikel 37, Artikel 35 und Artikel 27 der DSGVO müssen dennoch jeweils geprüft werden. Fortlaufendes Profiling wird nicht allein wegen geringer Nutzerzahlen zu einer „gelegentlichen“ Verarbeitung. Notwendige Identitätsinformation, wirksame Rechtsgrundlagen, Minimierung, Sicherheit und die Bearbeitung von Betroffenenrechten entfallen dadurch nicht.

Strenge Datenschutzgrundsätze leiten die Gestaltung und fortlaufende Verbesserung des Projekts. Ziel ist es, mit angemessenen Anstrengungen ein hohes, den tatsächlichen Risiken entsprechendes Schutzniveau zu erreichen; Orientierung bieten die DSGVO-Grundsätze Datenminimierung, Zweckbindung, Transparenz und Kontrolle durch die Nutzer. Diese Ziele belegen weder eine EU-Zertifizierung noch die vollständige Einhaltung der DSGVO und der Gesetze sämtlicher Mitgliedstaaten. Sie garantieren keine absolute Sicherheit, keinen Ausschluss von Datenlecks oder Datenverlusten und keine sofortige, vollständige Löschung. Der tatsächliche Schutz hängt von eingesetzter Version, Konfiguration und Verarbeitung durch Dritte ab; Ziele, im Code nachgewiesene Maßnahmen, nicht verifizierte Einsatzbedingungen und verbleibende Risiken sind zu unterscheiden. Angemessene Anstrengungen und Risikohinweise mindern keine gesetzlichen Pflichten und verlangen von Nutzern weder, eine rechtswidrige Verarbeitung zu akzeptieren, noch auf Rechte zu verzichten. Die rechtliche Geltung richtet sich nach den Tatsachen; sämtliche Regelungen der DSGVO werden nicht zu einer zusätzlichen weltweiten Vertragsgarantie. Unabhängig vom anwendbaren Recht sind Daten zutreffend zu beschreiben, Zusagen umzusetzen und unverzichtbare Nutzerrechte zu achten.

## 5. Auslegung und Versionen

Zwingendes Recht geht vor. Dienstbedingungen richten sich nach den Nutzungsbedingungen, Dateninformationen nach der Datenschutzerklärung. Technische Erläuterungen, Bilder oder ältere Funktionsbeschreibungen können keine Verarbeitungserlaubnis erweitern; auch der Hinweis „maßgeblich ist der Quellcode“ befreit nicht von Verantwortung für unzutreffende Informationen. Erkannte Widersprüche sind zu korrigieren und betroffene Nutzer zu informieren.

Vereinfachtes Chinesisch ist die Pflegegrundlage, die übrigen neun Sprachfassungen sind Übersetzungen. Ein Vorrang des Chinesischen darf weder verbraucherfreundliche Auslegung noch verständliche Information ausschließen. Das angegebene Datum ist das Überarbeitungsdatum des Dokuments. Vor seiner Übernahme in eine Bereitstellung oder einer tatsächlichen Verarbeitungsänderung sind weiterhin wirksame Information und nötigenfalls eine gesonderte Einwilligung erforderlich.

## 6. Kontakt

Dienst und Konto: `admin@epocanvas.com`; Datenschutz und Betroffenenanfragen: `privacy@epocanvas.com`. Diese in der aktuellen Dokumentation vorgeschlagenen Adressen wurden im geprüften Upstream nicht als veröffentlicht bestätigt und nicht durch Test-E-Mails auf Zustellbarkeit geprüft. Ihre Angabe ist keine Erklärung, dass ein EU-Vertreter oder Datenschutzbeauftragter bestellt wurde. Instanzbetreiber müssen sicherstellen, dass ihre veröffentlichten Kontaktwege funktionieren.

Technische Probleme können über [GitHub Issues](https://github.com/shijianus/sonic/issues) gemeldet werden; übermitteln Sie keine personenbezogenen Daten, Passwörter oder Sitzungsnachweise. Bei Instanzen Dritter wenden Sie sich an deren eigene Betreiber.
