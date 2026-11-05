---
title: Datenverarbeitung und Sicherheitsmaßnahmen
description: Datenlebenszyklus, Verarbeitungsgrenzen, Sicherheitsmaßnahmen, bekannte Grenzen, Reaktion auf Datenschutzverletzungen und Hinweise zum Selbst-Hosting von Sonic.
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Diese Seite ergänzt Abschnitt 10 der [Datenschutzerklärung](/de/privacy-policy/) und beschreibt die erkennbaren Grenzen der Datenverarbeitung und Sicherheitsmaßnahmen gehosteter Sonic-Instanzen. Datenschutzziel ist ein hohes, den tatsächlichen Risiken entsprechendes Schutzniveau durch angemessene Anstrengungen. Die Maßnahmen sollen anhand von Prüfergebnissen und den DSGVO-Grundsätzen Datenminimierung, Zweckbindung, Transparenz und Kontrolle durch die Nutzer fortlaufend verbessert werden. Dieses Ziel belegt weder eine Zertifizierung noch die vollständige Einhaltung der DSGVO und der Gesetze sämtlicher Mitgliedstaaten; es garantiert weder absolute Sicherheit noch den Ausschluss von Datenlecks oder Datenverlusten oder eine sofortige, vollständige Löschung. Im geprüften Code nachgewiesene Maßnahmen, nicht verifizierte Einsatzbedingungen und bekannte Lücken werden getrennt benannt; der tatsächliche Schutz hängt von eingesetzter Version, Konfiguration und Verarbeitung durch Dritte ab. Angemessene Anstrengungen und Risikohinweise mindern keine gesetzlichen Pflichten und verlangen von Nutzern weder, eine rechtswidrige Verarbeitung zu akzeptieren, noch auf Rechte zu verzichten. Sie beruht auf einem Abgleich von Quellcode und Prüfunterlagen, nicht auf einer Zertifizierung der Produktivkonfiguration, des Betriebszustands, von Anbieterverträgen oder fortlaufender Konformität. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version. Vereinfachtes Chinesisch im Stammverzeichnis ist die Pflegegrundlage, die übrigen neun Sprachfassungen sind Übersetzungen. Zwingendes Recht und das Recht von Verbrauchern auf klare, verständliche Bedingungen werden durch einen Sprachvorrang nicht eingeschränkt.

![Vierschichtige Sicherheitsstruktur von Sonic: Übertragung und Zugang, Authentifizierung, ausgehende Anfragen, Speicherung und Protokolle sowie betreiberseitig zu konfigurierende Kontrollen](/images/sonic/security-shield.svg)

*Abbildung: Die Grafik strukturiert Kontrollmaßnahmen; sie belegt weder deren Aktivierung in jeder Bereitstellung noch erfüllte Konformitätsanforderungen.*

## 1. Datenlebenszyklus

| Phase | Derzeit prüfbare Tatsachen und Grenzen |
| --- | --- |
| Erhebung | Die Anmeldung erfolgt über Epomail OAuth; Wiedergabe, Suche und Empfehlungen können Ereignisse erzeugen. Personalisierung ist im aktuellen Release-Candidate-Code standardmäßig aktiv; dies ist keine Einwilligung in optionales Profiling. |
| Übertragung | Pfade zwischen Browser, Edge, Datenebene und vorgelagerten Diensten hängen von der Bereitstellung ab. Interne und einige vorgelagerte Pfade verwenden unverschlüsseltes HTTP; durchgängiges TLS darf nicht behauptet werden. MVs, Cover, Schriftarten oder Avatare können direkt vom Browser angefordert werden. |
| Speicherung | Der Browser kann Kontodaten, Warteschlange, Verlauf, Präferenzen, lokale Musik und Cache speichern; tatsächliche Orte und Fristen für Verhaltensdaten, Protokolle, Backups und Anbieteraufzeichnungen sind je Bereitstellung zu prüfen. |
| Nutzung und Weitergabe | Suche, Wiedergabe und Anmeldung beantworten Anfragen; Profiling, Auto DJ, Suchstatistiken und öffentliche Vorschläge können Verhaltens- oder Suchkontext verwenden. Empfänger und Schalter siehe [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/). |
| Löschung | Die aktuelle Profilrücksetzung betrifft hauptsächlich Teile der Ereignisse oder Rückmeldungen der aktuellen Identität; Radar, Suchaggregate, Backups, Protokolle, externe Dienste oder alte anonyme Kennungen sind nicht garantiert erfasst. Sperrung hängt ebenfalls von Sperrspeicherkonfiguration und Anfrageerfolg ab. |

## 2. Verarbeitungsmatrix

| Tätigkeit | Möglicherweise betroffene Daten | Verarbeitungsgrenzen und Fristen |
| --- | --- | --- |
| Angeforderte Suche, Wiedergabe, Lyrics und Anmeldung | Suchanfragen, Inhaltskennungen, Sitzungen und von Epomail zurückgegebene Kontodaten | Auf die Beantwortung der Anfrage beschränkt; Anmeldedaten können im Browser und in Sitzungsnachweisen vorliegen. |
| Verhaltensprofiling, Auto DJ und Empfehlungen | Wiedergabe, Fortschritt, Überspringen, Favoriten, Ablehnungen, Suche, pseudonyme Kennungen und lokaler Kontext | Profiling oder profilunterstützende Verarbeitung; derzeit standardmäßig aktiv. Einstellung und Löschung nach Ablehnung oder Widerruf dürfen nicht als bereits umgesetzt vorausgesetzt werden. |
| Suchstatistiken und öffentliche Vorschläge | Unveränderte Suchtexte, Zähler und zugehöriger Kontext | Vorhandene Pfade können Suchbegriffe der Nutzer anzeigen; ohne Filter, Schwellen und Fristen nicht als anonyme Aggregate oder sichere Veröffentlichung bezeichnen. |
| Ratenbegrenzung und Sicherheit | Rohe IP-Adressen, Cookies, Authentifizierungsheader, User-Agent, Kontext sowie konto- oder sitzungsabgeleitete Schlüssel | Können mit Anfragen an die Engine der Datenebene weitergeleitet werden; die Behauptung einer Beschränkung auf notwendige Missbrauchsabwehr, Verbindung und Sicherheit ist anhand tatsächlicher Routen zu prüfen. |
| Lokale Daten und Kommentare | localStorage, IndexedDB, importierte Musik, Downloadcache, lokale und vorgelagerte Kommentardaten | Für lokale Audioinhalte wurde kein Uploadpfad gefunden; Lyrics und Empfehlungen können dennoch Titel, Künstler, Album, Dauer oder Kennungen senden, und eingebettete Cover können mit Favoritenereignissen in den entfernten gemeinsamen Titelkatalog gelangen. Vorgelagerte Kommentare können Namen, Avatare und Texte anderer enthalten und in öffentliche Caches gelangen. |
| Support, Streitigkeiten und gesetzliche Pflichten | Freiwillig übermittelte E-Mail-Adresse, Beschreibung, notwendige Nachweise und Bearbeitungsaufzeichnungen | Nur so lange aufbewahren, wie Anfrage, Streit oder Pflicht dies erfordern; keine einheitliche verifizierte Frist für Host-Backups. |

Rechtsgrundlagen, Speicherfristen und Empfänger sind jeweils anhand tatsächlicher Zwecke, Nutzer und Bereitstellungskonfiguration zu beurteilen. Kostenfreiheit, individuelle Pflege oder Open Source mindern Sicherheits- und Informationsanforderungen nicht automatisch.

## 3. Sicherheitsmaßnahmen

### 3.1 Übertragung und Zugang

1. Öffentliche Zugangspunkte können HTTPS, OAuth, signierte Sitzungen und Dienstschlüssel verwenden. Diese Codekontrollen belegen nicht, dass tatsächliche Zugangspunkte, Proxys und vorgelagerte Dienste sämtlich TLS nutzen.
2. Ob Kontroll- und Datenebene über einen verschlüsselten Tunnel kommunizieren und die Datenebene nur an Loopback gebunden ist, hängt von der Hosting-Konfiguration ab. Schon interne unverschlüsselte HTTP-Pfade widerlegen eine pauschale Behauptung durchgängiger Verschlüsselung.
3. Zielprüfungen und Domainbeschränkungen von Proxy-Routen erfassen nur tatsächlich über den Proxy laufende Anfragen. Der Abgleich zeigt mögliche Weiterleitung roher IP-Adressen zusammen mit Cookies, Authentifizierungsheadern und Kontext an die Engine; diese empfängt nicht ausschließlich pseudonyme Daten.
4. Audiostream-Anfragen können den User-Agent des Browsers statt eines festen Werts verwenden. Bei direktem Browserzugriff auf MVs, Cover, Google Fonts oder Avatardienste können die Empfänger IP-Adresse und Verbindungsmetadaten sehen.

### 3.2 Authentifizierung und Schlüssel

1. Der geprüfte öffentliche RC `a75f5cb` verwendet OAuth state und PKCE, ein signiertes HttpOnly-Sitzungs-Cookie mit standardmäßig 30 Tagen Gültigkeit und OAuth-Transaktions-Cookies von ungefähr 600 Sekunden. Die Sperrung über KV ist optional und hängt von Konfiguration und Anfrageerfolg ab. Diese Schutzmaßnahmen sind für den alten `main@ce443c8` nicht belegt; tatsächliche Cookie-Attribute und Fristen sind weiterhin in der Bereitstellung zu prüfen. Signaturen sichern Integrität, nicht Vertraulichkeit; die Nutzlast kann E-Mail-Adresse, Nutzer- oder Rollenkennungen enthalten.
2. Scheitert die Prüfung von API-Key-Version, Signatur, Zeit oder `jti`, muss die Anfrage abgelehnt werden. Namen, Umgebungsvariablen oder Entwurfskommentare sind kein Nachweis vollständiger Authentifizierungskontrollen.
3. Ob Abmeldung oder Massensperrung sofort wirken, hängt von Sperrspeicher, Schaltern und Anfrageerfolg ab. Ohne Aktivierung oder Verifikation ist keine sofortige Ungültigkeit sämtlicher kopierter Nachweise garantiert.

### 3.3 Abwehr bei ausgehenden Anfragen

Der Code enthält einzelne SSRF-, Privatnetz- und Umleitungsprüfungen sowie eine Musik-Domain-Allowlist. Daraus folgt nicht, dass sämtliche vorgelagerten oder externen Browseranfragen über einen Proxy laufen, bereinigt oder anonymisiert werden. Bei DiceBear besteht derzeit ein Avatar-URL-Pfad mit der E-Mail-Adresse im Klartext als Seed. Direkte Zugriffe auf Google Fonts, MVs und Cover können den jeweiligen Diensten IP-Adressen offenlegen. Manche Anbieter werden über HTTP angesprochen; durchgängiges TLS darf nicht behauptet werden.

### 3.4 Speicherung und Protokolle

1. Im Browser bewahren `auth`, `audio`, `library`, `global`, `settings`, `recommend` und IndexedDB Daten funktionsabhängig auf. Abmelden löscht nicht automatisch sämtliche Gerätedaten.
2. Werden serverseitige Verhaltensdaten über pseudonyme Kennungen zugeordnet, können sie weiterhin zusammen mit anderen Daten identifizierbar sein. Pseudonymisierung ist keine Anonymisierung und erfasst nicht automatisch Suche, Radar oder Daten Dritter.
3. Tatsächliche Rotation, Zugriffsrechte und fristgerechte Vernichtung von Anwendungs-, Cloudflare-, Host- und Upstream-Protokollen sowie Backups wurden durch diesen Abgleich nicht einheitlich bestätigt. Fiktive Backupfristen oder „Null-Protokollierung“ dürfen nicht zugesagt werden.
4. Optionales Meilisearch kann unveränderte Suchanfragen oder Katalogdaten verarbeiten. Gorse kann pseudonymes Feedback und Metadaten des Titelkatalogs erhalten; ob Löschungen mit lokalen Löschungen synchronisiert sind, wurde nicht verifiziert. Erfolgreiches lokales Zurücksetzen ersetzt keine Löschung aus dem gemeinsamen Titelkatalog oder externen Empfehlungs- und Suchspeichern.

### 3.5 Bekannte Grenzen

1. Personalisierung und Auto DJ sind standardmäßig aktiviert, ohne nachweisbare vorherige, gesonderte und widerrufliche Wahl. Dies ist keine Einwilligung.
2. Öffentliche Suchvorschläge können unveränderte Suchtexte wiederverwenden und persönliche oder sensible Informationen offenlegen.
3. Löschung betrifft hauptsächlich Teile der Ereignisse der aktuellen Identität. Die Abdeckung von Radar, Suchaggregaten, dem gemeinsamen Titelkatalog und eingebetteten Covern, Backups, Protokollen, externen Diensten, Meilisearch, Gorse und alten anonymen Kennungen ist nicht verifiziert. Ein dauerhafter Engine-Pfad für Radar ist nicht bestätigt; sein Speicherzustand wird nicht abschließend behauptet.
4. Internes Klartext-HTTP, Google Fonts, direkte MV- und Cover-Anfragen, Browser-User-Agent und DiceBear-URLs mit E-Mail-Adressen im Klartext machen Behauptungen wie „durchgängiges TLS“ oder „E-Mail-Adressen werden nicht übermittelt“ unzutreffend.
5. Ratenbegrenzung, Sperrung, Protokolle und Drittanbieterschalter hängen von Umgebungsvariablen der Instanz und Anbieterkonfiguration ab. GDStudio ist ohne Einstellung im Code standardmäßig aktiv, kann aber in Umgebung oder Compose ausgeschaltet sein; eine Liste allein belegt keine standardmäßige Deaktivierung.

## 4. Reaktion auf Datenschutzverletzungen

Bei Geltung der DSGVO müssen Sicherheitsmaßnahmen Art der Daten, Verarbeitungsumfang, Umsetzungskosten und tatsächlichen Risiken angemessen sein (Artikel 32 der DSGVO). Der Betreiber muss jede Datenschutzverletzung dokumentieren. Sofern ein Risiko für Rechte und Freiheiten natürlicher Personen nicht unwahrscheinlich ist, muss er sie der zuständigen Aufsichtsbehörde unverzüglich und möglichst binnen 72 Stunden nach Bekanntwerden melden und Verzögerungen begründen (Artikel 33 der DSGVO). Bei hohem Risiko müssen zudem Betroffene unverzüglich informiert werden, soweit keine gesetzliche Ausnahme gilt (Artikel 34 der DSGVO). Dies ist weder eine Zusage automatischer Meldung an eine bestimmte nationale Behörde noch eine Befreiung von anderem anwendbarem Recht.

Bei der tatsächlichen Reaktion sind betroffene Systeme zu isolieren, Berechtigungsnachweise zu schützen oder zu sperren, Datenkategorien, Umfang, Empfänger und Zeitablauf festzustellen sowie Bewertungen und Abhilfe zu dokumentieren. Vermutete Vorfälle können an `privacy@epocanvas.com` gemeldet werden. Senden Sie keine Passwörter, vollständigen Token, Mitgliedschafts-Cookies oder unnötigen personenbezogenen Daten.

## 5. Datenschutz durch Technikgestaltung und Voreinstellungen

Artikel 25 der DSGVO verlangt, Datenschutz durch Technikgestaltung und Voreinstellungen bei der Festlegung der Verarbeitungsmittel zu berücksichtigen. Das Projekt kann derzeit keine vollständige Umsetzung behaupten:

1. Optionales Profiling muss standardmäßig ausgeschaltet sein und gleich einfache Annahme, Ablehnung, Widerruf und dokumentierte Wahl bieten. Im aktuellen Code ist es standardmäßig aktiv; Anmeldung oder weitere Nutzung ersetzt keine Einwilligung.
2. Öffentliche Suchvorschläge sind zunächst zu deaktivieren oder mit minimaler Anzeige, Filtern, Schwellen, Fristen und Löschkontrollen auszustatten.
3. Avatar-Seeds dürfen keine E-Mail-Adresse im Klartext verwenden. Google Fonts, MVs, Cover und sonstige direkt eingebundene Ressourcen sind erst nach Prüfung der Übermittlung von IP-Adressen, Cookies und Kennungen zu aktivieren.
4. Zuordenbare alte pseudonyme Kennungen, Radar, Suche, gemeinsame Titel und Cover, Protokolle, Meilisearch, Gorse und Backups sind zu prüfen und im anwendbaren gesetzlichen Umfang zu löschen; Empfänger sind, soweit erforderlich, zu benachrichtigen. Gesetzliche Aufbewahrungsausnahmen sind mit Grund, Umfang und Frist zu erläutern. Eine Teilbereinigung der aktuellen Identität darf nicht als vollständige Löschung ausgegeben werden.

## 6. Pflichten selbst betreibender Personen

Selbst bereitgestellte Instanzen werden unabhängig betrieben. Diese Prüfhilfen begründen keine Vertragspflichten über das tatsächlich anwendbare Recht und die Lizenz hinaus und sind keine Betriebszusage des Autors. Die DSGVO-Anwendung richtet sich nach territorialen Anknüpfungen und tatsächlichen Tätigkeiten (Artikel 3 der DSGVO); Kostenfreiheit oder ein Einzelprojekt schließen sie nicht pauschal aus. Die folgenden Anforderungen gelten nur bei Erfüllung ihrer jeweiligen gesetzlichen Voraussetzungen:

1. Treffen Sie Maßnahmen nach Art der Daten, Umfang, Umsetzungskosten und tatsächlichen Risiken (Artikel 32 der DSGVO). Prüfen Sie Übertragung, Schlüssel, Protokolle, Wiederherstellung und Löschung, statt kleinen Projekten pauschal hauptberufliche Teams oder Zertifizierungen vorzuschreiben.
2. Weniger als 250 Beschäftigte befreien nicht automatisch von Aufzeichnungen der Verarbeitungstätigkeiten. Nicht nur gelegentliche Verarbeitung, mögliche Risiken für Rechte und Freiheiten, besondere Datenkategorien oder Daten über strafrechtliche Verurteilungen und Straftaten können jeweils die Ausnahme ausschließen (Artikel 30 der DSGVO).
3. Datenschutzbeauftragte sind bei den gesetzlichen Auslösern zu benennen, unter anderem bei öffentlichen Stellen und bei Kerntätigkeiten mit umfangreicher regelmäßiger und systematischer Überwachung oder umfangreicher Verarbeitung besonderer Datenkategorien beziehungsweise Daten über strafrechtliche Verurteilungen und Straftaten (Artikel 37 der DSGVO).
4. Datenschutz-Folgenabschätzungen betreffen vor Beginn zu prüfende Verarbeitungen mit voraussichtlich hohem Risiko. Nicht jeder Hashvorgang, jede Anmeldung oder jedes kostenlose Projekt erfordert automatisch eine solche Prüfung (Artikel 35 der DSGVO).
5. Unterliegt eine außerhalb der EU ansässige Stelle Artikel 3 Absatz 2 der DSGVO, ist grundsätzlich ein EU-Vertreter zu benennen. Die Ausnahme für gelegentliche Verarbeitung in Artikel 27 verlangt gleichzeitig nur gelegentliche Verarbeitung, keine umfangreiche Verarbeitung besonderer Kategorien oder von Daten über strafrechtliche Verurteilungen und Straftaten sowie unter Berücksichtigung von Art, Umständen, Umfang und Zwecken voraussichtlich kein Risiko. Kostenfreiheit oder fehlende Gewinnorientierung allein begründen keine Ausnahme.
6. Prüfen Sie `SONIC_RECOMMEND_RETENTION_DAYS`, Datenbankpfad, Arbeitsspeicher-Fallback, Drittanbieterpfade sowie Ratenbegrenzungs- und Sperrschalter. Verwenden Sie tatsächliche Werte in eigenen Informationen, Fristen und Löschabläufen.

## 7. Prüfbarkeit

Diese Seite beruht auf der Prüfung des öffentlichen RC-Zweigs `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) am 2026-11-02; der alte `main@ce443c8` (2026-10-27 UTC) ist ein anderer Codestand. Dies ist ein Dokumentationsabgleich, kein Betriebsaudit, keine Zertifizierung oder Anbieterprüfung. Quellcodevorgaben, Umgebungsvariablen, Compose und tatsächlicher Dienst können abweichen. Bei Widersprüchen zwischen Dokumentation, Code und Bereitstellung sind weitergehende Behauptungen einzustellen und die Dokumente zu korrigieren.
