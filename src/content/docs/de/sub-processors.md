---
title: Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen
description: Infrastruktur, Identitätsdienste, Inhalts- und Ressourcenempfänger, unterschiedliche Schaltervorgaben und Grenzen internationaler Übermittlungen bei gehosteten Sonic-Instanzen.
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Diese Seite ergänzt Abschnitt 7 der [Datenschutzerklärung](/de/privacy-policy/) und erläutert mögliche Empfänger des individuell gepflegten, kostenlosen und nicht gewinnorientierten gehosteten Sonic-Testdienstes. Eine im Quellcode vorhandene Anbindung belegt weder deren Aktivierung noch eine rechtmäßige Weitergabe. Selbst betriebene Instanzen müssen gesondert über ihre tatsächliche Verarbeitung informieren.

Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version. Anbieterverträge wurden nicht zertifiziert. Vereinfachtes Chinesisch ist die Pflegegrundlage dieser Website, die übrigen neun Sprachfassungen sind Übersetzungen. Zwingendes Recht und das Recht von Verbrauchern auf klare, verständliche Bedingungen werden durch einen vereinbarten Sprachvorrang nicht eingeschränkt.

![Karte der Weitergabe bei Sonic: Infrastruktur, Identitätsdienste, Inhaltsquellen, optionale Pfade, gesetzliche Anforderungen und internationale Übermittlungen](/images/sonic/sharing-map.svg)

*Abbildung: Empfänger sind nach Funktion gegliedert; Schalter- oder Schutzkennzeichnungen belegen weder tatsächliche Aktivierung noch Verträge oder Übermittlungsgrundlagen.*

## 1. Infrastruktur und Auftragsverarbeitung

| Beteiligte | Funktion | Mögliche Daten und Konfigurationsgrenzen |
| --- | --- | --- |
| Cloudflare Pages und Functions | Hosting, Edge-API, Cache und Ratenbegrenzung | IP-Adresse, Anfragepfad, Header und Verbindungsmetadaten; konkrete Aufzeichnungen hängen von Instanz- und Anbieterkonfiguration ab |
| Cloudflare Tunnel | Verbindung zwischen Edge- und Datenebene | Anfrageverkehr und Verbindungsmetadaten; der Tunnel verschlüsselt nicht automatisch sämtliche internen oder vorgelagerten HTTP-Pfade |
| Cloudflare KV und Ratenbegrenzer | Konfigurierbarer Speicher etwa für Ratenbegrenzung und Sperrung von Berechtigungsnachweisen | IP- oder identitätsabgeleitete Schlüssel und Sperrkennungen; Aktivierung und Fristen sind zu prüfen |
| Host oder Hosting-Anbieter der Datenebene | Umgebung für Engine, Datenbank und Protokolle | Die Engine kann von der Edge-Schicht weitergeleitete rohe IP-Adressen, Cookies, Authentifizierungsheader und Kontext erhalten; Hostbetreiber und Knotenländer sind nicht verifiziert |

Ob Auftragsverarbeitung vorliegt, hängt davon ab, wer Zwecke bestimmt, wer auf Weisung handelt und welche Vereinbarungen tatsächlich bestehen; Produktnamen allein entscheiden dies nicht. Bei anwendbarer DSGVO und bestehender Auftragsverarbeitung sind die Anforderungen aus Artikel 28 umzusetzen. Hier wird nicht behauptet, dass Verträge abgeschlossen oder geprüft wurden. Vollständige Identität und zustellfähige Angaben des Verantwortlichen sind weiterhin zu ergänzen; siehe [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 2.

## 2. Identitätsanbieter (für die Anmeldung erforderlich)

Epomail (`mail.epocanvas.com`) stellt die OAuth-Anmeldung bereit. Der Browser interagiert mit dem Identitätsdienst; Sonic tauscht den Autorisierungscode aus und fragt Nutzerdaten ab. Dabei können Nutzerkennung, E-Mail-Adresse und Verifizierungskennzeichen, Nickname, Avatar-URL und Rolle empfangen werden. Teile dieser Angaben liegen im Browserspeicher `auth` und in signierten Sitzungsnachweisen, nicht „nur im Arbeitsspeicher“.

Die Anmeldeanbindung oder eine gemeinsame Marke macht Epomail nicht automatisch zum Auftragsverarbeiter von Sonic. Eigenständige Verarbeitung im Kontosystem und Verarbeitung auf Weisung sind anhand tatsächlicher Zwecke und Vereinbarungen getrennt zu beurteilen. Sonic bleibt für den selbst bestimmten Empfang, die Speicherung und die weitere Offenlegung verantwortlich.

## 3. Vorgelagerte Inhaltsquellen und Browser-Direktzugriffe

| Quelle | Hauptzweck | Möglicherweise übermittelte oder empfangene Daten |
| --- | --- | --- |
| NetEase Cloud Music, QQ Music, Kugou, Kuwo und zugehörige CDNs | Suche, Audio, MVs, Cover und Inhaltsdaten | Unveränderter Suchtext, Inhaltskennungen und Metadaten; Verbindungsinformationen des Proxy-Ausgangs oder des direkt zugreifenden Browsers |
| AMLL, LRCLIB | Lyrics-Abfrage und Ergänzung | Titelkennungen oder Abgleichangaben wie Titel und Künstler sowie Verbindungsmetadaten |
| Google Fonts | Laden von Schriftarten | Browser-IP, User-Agent und weitere Verbindungsinformationen |
| DiceBear | Externe Avatare | Der aktuelle Pfad kann die E-Mail-Adresse im Klartext im URL-Seed enthalten und Verbindungsinformationen des Browsers offenlegen |

Ein Audio-Proxy kann bewirken, dass das Inhalts-CDN den Proxy-Ausgang sieht; daraus folgt nicht, dass sämtliche Anfragen frei von personenbezogenen Daten sind. Stream-Anfragen können den User-Agent des Browsers statt eines einheitlichen festen Werts verwenden. MVs, Cover, Schriftarten und Avatare können direkt vom Browser angefordert werden. Manche Anbieter werden über HTTP angesprochen; TLS für die gesamte Verbindungskette ist nicht garantiert. Der E-Mail-Seed für DiceBear sollte durch lokale Avatare oder Kennungen ohne E-Mail-Adresse ersetzt werden.

Vorgelagerte Kommentare enthalten Namen oder Nicknames, Avatare und Texte anderer Personen und können in öffentliche Caches gelangen; zu den Zwecken gehört die Anzeige von Kommentaren zu einem angeforderten MV. Die Verfasser sind keine Parteien des Anmeldevertrags dieses Dienstes; ihre Daten dürfen nicht allein auf Artikel 6 Absatz 1 Buchstabe b der DSGVO gestützt verarbeitet werden. Bei Geltung der DSGVO befreit eine öffentliche Quelle nicht automatisch von der Information bei indirekter Erhebung nach Artikel 14. Der Betreiber muss eine eigenständige Rechtsgrundlage, Speicherfristen und Informationsausnahmen prüfen und dokumentieren sowie die anwendbaren Informationen innerhalb der gesetzlichen Fristen bereitstellen. Fehlen notwendige Garantien, sind Abruf oder öffentliche Zwischenspeicherung zu deaktivieren; es wird nicht versprochen, jeden Verfasser stets einzeln erreichen zu können. Lokal verfasste Kommentare liegen derzeit nur im localStorage; ein Veröffentlichungspfad zu einem Kommentarserver wurde nicht gefunden.

Für lokale Audioinhalte wurde kein Uploadpfad gefunden. Lyrics-Abgleich und Empfehlungskontext können jedoch Titel, Künstler, Album, Dauer oder Kennungen versenden. Eingebettete Cover, die als data URL extrahiert wurden, können mit Favoritenereignissen versandt und in den entfernten gemeinsamen Titelkatalog aufgenommen werden, wo sie in der Suche der gesamten Website oder in öffentlichen Vorschlägen erscheinen können. Ein Profilreset garantiert keine vollständige Löschung dieses Katalogs oder optionaler externer Indizes; ob die Daten personenbezogen bleiben, ist nach ihrer Verknüpfbarkeit zu beurteilen. Dass lokale Audioinhalte nicht hochgeladen werden, bedeutet daher nicht, dass eingebettete Cover oder zugehörige Informationen das Gerät nie verlassen.

## 4. Optionale Pfade und unterschiedliche Schaltervorgaben

| Pfad | Zweck und mögliche Daten | Grenzen des Abgleichs |
| --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Aggregierte Suche und quellenübergreifende Ergänzung; Suchanfragen oder Inhaltskennungen | Im Quellcode bei fehlendem Schalter standardmäßig aktiv, im Umgebungsbeispiel und in Compose deaktiviert; tatsächlichen Zustand prüfen |
| Lyriva (`api.lyriva.xyz`) | Lyrics-Ersatzquelle; Inhaltskennungen oder Abgleichparameter | Gesteuert unter anderem durch `SONIC_ENABLE_LYRIVA` |
| Musixmatch (`apic-desktop.musixmatch.com`) | Lyrics-Ergänzung | Die Implementierung bleibt in der RC erhalten, aber `isSourceEnabledByPolicy` hat keinen Musixmatch-Zweig und der tatsächliche Aufruf wird durch die false-Schranke blockiert; der Lyrics-Fallback des alten `main` kann aufrufbar sein und ist anhand der Bereitstellung zu prüfen; die RC darf weder als aktiviert noch als über einen gewöhnlichen Schalter verfügbar beschrieben werden |
| Vom Betreiber konfigurierter Warn-Dienst | Nur bei gültigem `SONIC_ALERT_WEBHOOK_URL` und ausgelöster Warnung; übermittelt Systemzähler, Release-Version, Zeitpunkt, eine um Berechtigungsnachweise bereinigte Zusammenfassung und die ausgehende IP des sendenden Knotens | Aktivierung, Empfänger, Rollen, Übermittlung und Speicherfrist hängen von der Instanz ab; Administratornotizen und Fehlermeldungen können personenbezogene Daten enthalten, und Bereinigung ist keine Anonymisierung |
| ListenBrainz / MusicBrainz | Ergänzung ähnlicher Künstler; Künstler- oder Aufnahme-IDs | Gesteuert unter anderem durch `SONIC_ENABLE_LISTENBRAINZ` |
| Gorse | Externe Empfehlungen; pseudonyme Kennungen, Verhaltensfeedback, Zeitangaben, Titelkennungen, Tags, Titelnamen und weitere Katalogmetadaten | Anbindung abhängig unter anderem von `SONIC_GORSE_URL`; aktuelles Zurücksetzen garantiert keine gleichzeitige Löschung externer Rückmeldungen oder Titelaufzeichnungen |
| Meilisearch | Optionaler Suchdienst; unveränderte Suchanfragen und Katalogdaten | Anbindung und Speicherfristen je Instanz prüfen; nicht als anonyme Anfragen behandeln |
| Quellenübergreifende Ergänzung | Plattformübergreifender Inhaltsabgleich; Titelmetadaten | Tatsächliche Anfragen hängen vom Abgleichpfad ab; Verfügbarkeit ist keine Inhaltslizenz |

Eine Schalterkonfiguration ist keine Nutzereinwilligung. Zur Einwilligungslücke der aktuell standardmäßig aktivierten Personalisierung und von Auto DJ siehe [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 5. Optionale Verarbeitung ohne erforderliche Grundlage und Wahlmöglichkeit ist auszusetzen; Anforderungen dürfen nicht durch bloßen Wechsel des Drittanbieternamens umgangen werden.

## 5. Weitergabe aufgrund gesetzlicher Anforderungen

Bei Herausgabeverlangen sind Identität des Anfragenden, Zuständigkeit, konkrete Grundlage und Umfang zu prüfen. Nur gesetzlich notwendige Daten dürfen bereitgestellt werden; die Gründe sind zu dokumentieren. Ob Betroffene informiert werden, richtet sich nach anwendbarem Recht und wirksamen Beschränkungen. Meldungen, Verdacht auf Verstöße oder Dienstbeendigung führen nicht automatisch zur Weitergabe sämtlicher Daten an die Polizei.

Auch eine gesetzliche Offenlegungspflicht ersetzt nicht die Anforderungen an internationale Übermittlungen. Entfernen Sie vor Meldungen in öffentlichen Issues oder Communitys personenbezogene Daten, Berechtigungsnachweise und private Informationen aus Kommentaren anderer Personen.

## 6. Internationale Übermittlungen

Die DSGVO gilt nach Maßgabe ihres Artikels 3; Kostenfreiheit, fehlende Gewinnorientierung oder bloße Erreichbarkeit aus der EU schließen ihre Anwendung weder automatisch aus noch begründen sie diese. Nur wenn Kapitel V der DSGVO auf eine konkrete Übermittlung personenbezogener Daten anwendbar ist, sind anhand der tatsächlichen Empfänger, Orte und Verarbeitungsrollen die Anforderungen aus Artikel 44, anwendbare Angemessenheitsbeschlüsse nach Artikel 45 oder andere wirksame Garantien nach Artikel 46 einzeln zu prüfen. Nicht jede ausländische IP-Adresse oder Inhaltsanfrage ist pauschal eine Übermittlung nach Kapitel V. Diese Website gewährt nicht sämtliche DSGVO-Regelungen als einheitliche weltweite Vertragsgarantie. Der Standort des Verantwortlichen, das Land der Datenebene und die Ziele aller Anfragen sind nicht verifiziert; Hosting in Taiwan oder die Zuständigkeit einer bestimmten Rechtsordnung dürfen nicht vorausgesetzt werden.

1. Drittlandübermittlungen, auf die die DSGVO anwendbar ist, müssen jeweils Artikel 44 erfüllen; zu prüfen sind ein anwendbarer Angemessenheitsbeschluss nach Artikel 45 oder andere wirksame Garantien nach Artikel 46.
2. Bei Standardvertragsklauseln sind weiterhin die erfassten Parteien, der Verarbeitungsumfang, die Übermittlungsbewertung und erforderliche ergänzende Maßnahmen zu bestätigen. Öffentlich angebotene Anbieterklauseln belegen keine Umsetzung durch diese Instanz.
3. ISO-/SOC-Zertifizierungen, Anbieterdatenschutzerklärungen oder die Zustimmung zu dieser Seite allein sind keine automatische rechtmäßige Übermittlungsgrundlage. Suchtexte, IP-Adressen und pseudonyme Kennungen dürfen nicht pauschal aus dem Begriff personenbezogener Daten ausgeschlossen werden.
4. Soweit gesetzlich vorgesehen, können über `privacy@epocanvas.com` Erläuterungen oder Kopien der Garantien angefordert werden. Notwendige Geschäftsgeheimnisse dürfen angemessen geschwärzt werden; Vertraulichkeit beseitigt keine gesetzlichen Transparenzpflichten.

## 7. Pflege des Verzeichnisses

Vor Aktivierung neuer Verarbeitungen oder Empfänger muss der Betreiber Zwecke, Grundlagen, Datenumfang, Fristen, Knoten und tatsächliche Rollen prüfen und die Informationen rechtzeitig aktualisieren. Erforderliche neue Einwilligungen sind gesondert einzuholen. Dieses Dokument belegt nicht, dass dies bereits geschehen ist, und erlaubt keine Aktivierung allein deshalb, weil ein Pfad im Quellcode vorhanden ist.

Weichen Verzeichnis und tatsächliche Verarbeitung voneinander ab, sind die Informationen zu korrigieren und unzulässige Übermittlungen zu behandeln, statt lediglich „maßgeblich ist der Code“ zu erklären. Pflichten selbst betreibender Personen ergeben sich aus dem tatsächlich anwendbaren Recht und den Lizenzen; das Kopieren dieser Seite begründet keine zusätzlichen vertraglichen Pflichten gegenüber dem Projektautor. Rückmeldungen: `privacy@epocanvas.com`.
