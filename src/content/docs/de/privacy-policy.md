---
title: Datenschutzerklärung
description: Datenschutzerklärung von Sonic – Information über Erhebung und Nutzung von Daten, Rechtsgrundlagen, Speicherdauer, Betroffenenrechte und internationale Übermittlungen, mit der DSGVO als Mindeststandard für alle Nutzer.
---

**Datum des Inkrafttretens: 1. November 2026｜Version: 1.3**

Diese Erklärung beschreibt, wie der Sonic-Dienst (nachfolgend „der Dienst“) Ihre personenbezogenen Daten erhebt, verarbeitet und übermittelt, und welche Standards und Zusagen der Betreiber beim Datenschutz befolgt. Vor der Anmeldung oder Nutzung des Dienstes sollten Sie diese Erklärung lesen; wenn Sie mit irgendeinem Inhalt dieser Erklärung nicht einverstanden sind, nutzen Sie den Dienst bitte nicht.

Die technischen Aussagen dieser Erklärung folgen der tatsächlichen Implementierung des Open-Source-Codes des Dienstes. Die rechtsverbindliche Fassung der rechtlichen Dokumente dieser Website ist die vereinfacht chinesische Version; die englische, japanische und deutsche Fassung sind Referenzübersetzungen. Im Zweifel über die Auslegung gilt die rechtsverbindliche Fassung. Der Dienst legt die EU-Datenschutz-Grundverordnung (DSGVO) als Mindeststandard des Datenschutzes für alle Nutzer zugrunde (siehe Abschnitt 2).

![Fünf Säulen der Datenschutzerklärung von Sonic: Rechtmäßigkeit, Zweckbindung, Minimierung und Speicherdauer, Sicherheit, Ihre Rechte, ruhend auf der DSGVO-Untergrenze des Datenschutzes](/images/sonic/privacy-pillars.svg)

*Abbildung: Die fünf Hauptsäulen dieser Erklärung. Die Rechtmäßigkeit verankert sich in den Rechtsgrundlagen nach Artikel 6 DSGVO; die Zweckbindung schließt Werbeprofile aus; die Minimierung wird durch Pseudonymisierung und Ein-Klick-Löschung umgesetzt; die Sicherheitsmaßnahmen stehen in Abschnitt 10; die Rechte werden nach Abschnitt 9 ausgeübt; alles ruht auf der Untergrenze des DSGVO-Niveaus.*

## 1. Geltungsbereich

Diese Erklärung gilt für die personenbezogenen Daten, die bei jeder Art der Nutzung des Dienstes anfallen, einschließlich:

1. des Besuchs der Website des Dienstes (`sonic.epocanvas.tech`, `sonic.epocanvas.com` oder die Domain einer selbst gehosteten Instanz);
2. der Nutzung sämtlicher Funktionen des Webplayers (Suche, Wiedergabe, Lyrics, Empfehlungen, Downloads, Import lokaler Musik);
3. von Drittanbieter-Clients, die sich über die offene API mit dem Dienst verbinden.

Diese Erklärung gilt nicht für Websites und Dienste Dritter, auf die der Dienst verlinkt oder die er einbettet (etwa die eigenen Websites der vorgelagerten Musikplattformen); diese Dritten unterliegen ihren eigenen Datenschutzerklärungen und sind dafür selbst verantwortlich. Wer Sonic selbst bereitstellt, wird ab dem Zeitpunkt der Bereitstellung zum Verantwortlichen für seine Nutzer und muss die Informationspflichten nach dem an seinem Ort anwendbaren Recht selbst gegenüber seinen Nutzern erfüllen; diese Erklärung kann als Grundtext für diese Information dienen.

## 2. Verantwortlicher und Datenschutz-Untergrenze

| Von Ihnen genutzte Instanz | Verantwortlicher | Erläuterung |
| --- | --- | --- |
| Gehostete Instanzen (`sonic.epocanvas.tech`, `sonic.epocanvas.com`) | Betreiberteam | hinsichtlich Verhaltensereignissen, Anmeldungen und Sicherheitsaufzeichnungen ist das Betreiberteam der Verantwortliche |
| Selbst gehostete Instanz | der Bereitsteller der Instanz | der Open-Source-Code enthält keine Telemetriemechanismen; abgesehen von externen Diensten, die der Betreiber selbst konfiguriert, werden keine Instanzdaten an die Upstream-Autoren oder Dritte zurückgesendet |

**Datenschutz-Untergrenze**: Der Dienst legt die DSGVO als Mindeststandard des Datenschutzes für alle Nutzer zugrunde, wo auf der Welt Sie sich auch befinden. Ihre Rechte in Bezug auf personenbezogene Daten (Information, Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch und Beschwerde) fallen nie unter das von der DSGVO bestimmte Niveau. Für Nutzer in der Europäischen Union und im Europäischen Wirtschaftsraum gilt die DSGVO unmittelbar; für Nutzer in anderen Regionen erfüllt der Dienst den DSGVO-Standard als Vertragspflicht; stärkere Schutzvorschriften des Rechts an Ihrem Wohnort gehen im Umfang ihrer Geltung vor.

## 3. Informationspflichten bei der Erhebung

Wenn der Dienst personenbezogene Daten von Ihnen erhebt, informiert er Sie klar über folgende Punkte:

| Informationspflicht | Information des Dienstes |
| --- | --- |
| I. Name des Verantwortlichen | der Betreiber (siehe Abschnitt 2; bei selbst gehosteten Instanzen deren Bereitsteller) |
| II. Zweck der Erhebung | Konto-Identifikation und Anmeldesitzungen; Bereitstellung von Wiedergabe, Suche und Empfehlungen; Missbrauchs- und Betrugsprävention; Ratenbegrenzung und Wartung der Dienstsicherheit (Details in der entsprechenden Tabelle in Abschnitt 5) |
| III. Kategorien personenbezogener Daten | Konto-Identifikation (Epomail-Nutzerkennung, E-Mail-Adresse, Nickname, Avatar-Link, Kontorolle); Verhalten und Präferenzen (Ereignisse wie Wiedergabe, vollständig abgespielt, übersprungen, favorisiert, abgelehnt, Suchbegriffe, verknüpft über pseudonymisierte Bezeichner); Technik (zeitweise IP-Verwendung für die Ratenbegrenzung, Sitzungs-Cookie, OAuth-Transaktions-Cookies) – Details in Abschnitt 4 |
| IV. Dauer, Region, Empfänger und Art der Nutzung | Dauer: Verhaltensereignisse werden 90 Tage nach Aufzeichnung automatisch vernichtet (durch den Bereitsteller konfigurierbar, Untergrenze 7 Tage); Konto-Identifikationsdaten werden nicht persistiert und bestehen nur für die Dauer der Sitzung. Region: Die Kontrollebene läuft auf dem globalen Edge-Netzwerk von Cloudflare, die Datenebene auf dem eigenen Linux-Knoten des Betreibers (siehe Abschnitt 7). Empfänger: der Betreiber und seine Auftragsverarbeiter sowie befugte Stellen auf Grundlage gesetzlicher Anforderungen (siehe Abschnitt 7). Art: automatisierte pseudonyme Speicherung und statistische Berechnung; keine manuelle Prüfung, keine Inhaltsprüfung |
| V. Die Ihnen zustehenden Rechte und ihre Ausübung | Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch und Beschwerde; zur Ausübung siehe Abschnitt 9 |
| VI. Folgen der Nichtbereitstellung | Die Grundfunktionen des Dienstes (Suche, Wiedergabe, Lyrics) sind ohne Anmeldung und ohne Übermittlung von Verhaltensereignissen nutzbar; die Anmeldung ist für Kontofunktionen wie die Favoritensynchronisation erforderlich, personalisierte Empfehlungen sind optional |

## 4. Erhobene personenbezogene Daten

### 4.1 Konto-Identifikationsdaten (über die Epomail-Anmeldung)

Wenn Sie sich mit Ihrem Epomail-Konto über OAuth 2.0 (PKCE) anmelden, ruft der Dienst vom userinfo-Endpunkt von Epomail folgende Felder ab; darüber hinaus werden keinerlei weitere Kontodaten abgerufen:

| Feld | Verwendungszweck | Persistiert |
| --- | --- | --- |
| Nutzerkennung (`id`/`sub`) | Identitätsfeststellung innerhalb der Sitzung | Nein |
| E-Mail-Adresse (verifiziert) | Ableitung des pseudonymisierten Hashs; als `sub`-Claim in der Nutzlast des an Sie persönlich ausgestellten API-Schlüssels | Nein |
| Nickname oder Benutzername (`name`/`username`/`nickname`) | Anzeige in der Oberfläche | Nein |
| Avatar-Link (`avatar`/`picture`) | Anzeige in der Oberfläche | Nein |
| Kontorolle (`role`) | Berechtigungsprüfung | Nein |

Der Dienst hat kein eigenes Registrierungssystem und erhebt keine Telefonnummern, bürgerlichen Namen, Adressen oder Zahlungsdaten. Die E-Mail-Adresse wird nur unmittelbar innerhalb der Anmeldesitzung verwendet: zur Ableitung des pseudonymisierten Bezeichners (SHA-256-Hash mit dem Präfix `usr_`, gekürzt auf 12 hexadezimale Zeichen), zur Ableitung des Nutzerkennungs-Hashs und des Ratenbegrenzungs-Bucketschlüssels; aus den abgeleiteten Hashwerten lässt sich die ursprüngliche E-Mail-Adresse nicht rekonstruieren.

### 4.2 Verhaltensereignisse

Um die Funktionen Empfehlungen und Auto DJ bereitzustellen, zeichnet der Dienst Verhaltensereignisse im Zusammenhang mit der Titelwiedergabe auf. Es gibt insgesamt 11 Ereignistypen: Suche, Suchklick, Wiedergabestart, Wiedergabefortschritt, vollständig abgespielt, übersprungen, erneut abgespielt, favorisiert, Favorit aufgehoben, abgelehnt, Ablehnung aufgehoben. Jedes Ereignis wird mit einem der folgenden pseudonymisierten Bezeichner verknüpft:

1. Angemeldete Nutzer: ein von der E-Mail-Adresse abgeleiteter SHA-256-Hash (Präfix `usr_`);
2. Anonyme Teilnehmende: ein in Ihrem Browser lokal erzeugter Zufallsbezeichner (Präfix `anon_`), serverseitig erneut gehasht;
3. Öffentlicher Modus: bei ausgeschalteter Personalisierung werden Ereignisse nicht gespeichert oder vorgehalten, sondern serverseitig sofort verworfen.

Die Ereignisübermittlung erfolgt stapelweise (höchstens 50 Ereignisse pro Stapel, Anforderungskörper höchstens 64 KB); die Warteschlange wird abgearbeitet, sobald die Seite verborgen wird. Der Inhalt jedes Ereignisdatensatzes beschränkt sich auf: Ereignistyp, kanonische Titelkennung, Künstlerkennung, Genre- und Sprach-Tags, Suchbegriff (falls zutreffend), Wiedergabefortschrittsanteil und Signalgewicht; IP-Adressen sind nicht enthalten, ebenso wenig Gerätefingerabdrücke oder Freitextinhalte.

Bereinigung von Rauschen und Falschsignalen: Titelwechsel, die auf Netzwerkstocken (network_stall), Dekodierfehlern (playback_error), Hörprobenabbruch (trial_end), nicht verfügbaren Streams (stream_unavailable), Puffer-Timeouts (buffer_timeout) oder fehlgeschlagener automatischer Umschaltung (auto_switch_error) beruhen, erhalten durchgängig das Gewicht null und werden nicht gespeichert; der Client übermittelt aktives Überspringen nur, wenn die Wiedergabe normal läuft und zwischen 0,5 und 25 Sekunden gehört wurde.

Empfehlungsanforderungen übermitteln zudem einen geringen lokalen Kontext Ihres Clients (einige favorisierte Titel, zuletzt gehörte Künstler, letzte Suchbegriffe, jeweils in begrenzter Anzahl); er wird ausschließlich im Speicher der jeweiligen Anforderung zur personalisierten Sortierung verwendet, nicht persistiert und nicht in Protokolle geschrieben.

### 4.3 Globale aggregierte Statistiken

Zudem führt der Dienst globale aggregierte Statistiken, die mit keinem Nutzer verknüpft sind, für Beliebtheitscharts und ähnliche Empfehlungen:

| Statistiktabelle | Inhalt | Personenbezug |
| --- | --- | --- |
| Aggregierte Suchbegriffzähler | globale Häufigkeitsstatistik der Suchbegriffe | keiner |
| Titel-Kookkurrenz | globale Statistik gemeinsam gehörter Titel | keiner |

Diese Datensätze enthalten keine persönlichen Bezeichner, sind nicht mit Ihrer Identität verknüpft und fallen auch nicht unter die Ein-Klick-Löschung des Profils (da sie ohnehin keinem Nutzer zugeordnet sind).

### 4.4 Lokaler Speicher Ihres Browsers

Folgende Daten werden ausschließlich in Ihrem Browser gespeichert; der Server des Betreibers erhält keine vollständige Kopie. Steht der Speicher im privaten Modus des Browsers nicht zur Verfügung, wird automatisch auf eine vorübergehende Speicherung im Arbeitsspeicher ausgewichen:

| Speicherort | Schlüssel | Inhalt |
| --- | --- | --- |
| localStorage | `audio` | Wiedergabeliste, aktueller Titel, Wiedergabemodus, Lautstärke, Stummschaltzustand, Wiedergabeverlauf |
| localStorage | `library` | favorisierte Titel, favorisierte Playlists, gefolgte Künstler, favorisierte MVs, favorisierte Alben, selbst erstellte Playlists |
| localStorage | `global` | Thema, Sprachpräferenz, Suchverlauf (höchstens 10 Einträge) |
| localStorage | `settings` | Oberflächeneinstellungen (Hintergrundanimation, bevorzugte Audioqualität usw.) |
| localStorage | `recommend` | Schalter für Personalisierung, Schalter für Auto DJ, anonymer Bezeichner, Liste abgelehnter Titel |
| localStorage | `sonic-perf-mode` | Schalter für den Leistungsmodus |
| IndexedDB | `SonicMusicPlayerDB` | importierte lokale Musikdateien (`local_music`) und heruntergeladene Titel (`downloaded_music`) |

### 4.5 Automatisch verarbeitete technische Daten

- Ratenbegrenzung: Anonyme Anforderungen werden nach IP in Buckets begrenzt (240 pro Minute, Standardwert); die IP wird nur kurzfristig als Ratenbegrenzungsschlüssel verwendet: Der native Edge-Ratenbegrenzer speichert nichts, oder ein KV-Eintrag mit 120 Sekunden automatischem Ablauf wird vorgehalten, oder eine vorübergehende Speicherung im 60-Sekunden-Speicherfenster erfolgt (höchstens 4096 Buckets); die IP wird weder in eine Datenbank noch in Zugriffsprotokolle geschrieben. Authentifizierte Anforderungen werden nach E-Mail-Hash in Buckets begrenzt (600 pro Minute, Standardwert); für Authentifizierungsendpunkte gilt zusätzlich eine spezielle Begrenzung von 30 pro Minute und IP.
- Sitzung und Schlüssel: Nach erfolgreicher Anmeldung wird ein Cookie `sonic_session` mit `HttpOnly; Secure; SameSite=Lax` ausgestellt (gültig für höchstens 30 Tage), das den signierten API-Schlüssel enthält; Schlüssel werden nicht in URLs, Abfrageparameter oder localStorage geschrieben. Der OAuth-Ablauf nutzt die Transaktions-Cookies `sonic_oauth_state` und `sonic_oauth_verifier` (600 Sekunden gültig, auf den Pfad `/api/auth` beschränkt). Die API-Schlüssel-Nutzlast enthält `sub` (E-Mail), `iat`, `exp`, `jti`, `kid`, `role`, `uid`; `jti` dient der Sperrliste und dem sofortigen Erlöschen bei Abmeldung.
- Zugriffsprotokolle: Die Zugriffsprotokolle der Datenebene sind zeilenweise JSON und enthalten nur Anforderungskennung, Methode, Pfad, Statuscode und Dauer; Abfragezeichenfolgen, IP, User-Agent, Cookies, Authorization und Anforderungskörper werden ausnahmslos nicht aufgezeichnet. Fehlerprotokolle enthalten nur die Anforderungskennung, den Fehlernamen und die gekürzte Fehlermeldung.
- Audio-Proxy: Audiostreams werden standardmäßig über den Edge-Proxy des Dienstes bezogen; die Anforderung an die vorgelagerte Quelle trägt nur User-Agent, den je nach CDN konfigurierten offiziellen Referer und Range-Header, während Set-Cookie und Berechtigungsheader entfernt werden; das vorgelagerte CDN sieht nur die Adresse des Proxyservers. Rufen Sie selbst den Direktverbindungsmodus `?mode=redirect` auf, baut Ihr Browser die Verbindung direkt zum offiziellen CDN auf, und Ihre IP ist für dieses CDN sichtbar (inhärente Bedeutung der 302-Umleitung); der Webplayer verwendet diesen Modus nicht.
- Edge-Netzwerk: Cloudflare verarbeitet Metadaten der Netzwerkschicht nach seiner eigenen Richtlinie.

### 4.6 Was der Dienst nicht erhebt

Der Dienst verwendet kein Werbetracking, keine standortübergreifenden Cookies, keine Statistik- oder Analyse-Skripte von Dritten, keine Gerätefingerabdrücke und keine Werbeprofile; er erhebt weder Kontaktverzeichnisse, Fotoalben, Standorte noch sonstige gerätebezogene Daten ohne Bezug zur Musikwiedergabe; er verkauft keine personenbezogenen Daten, nutzt sie nicht zu Werbezwecken und bindet keine Werbenetzwerke ein.

## 5. Rechtsgrundlagen und Verarbeitungszwecke

Die Rechtsgrundlagen der einzelnen Verarbeitungstätigkeiten lauten:

| Verarbeitungstätigkeit | Zweck | Rechtsgrundlage |
| --- | --- | --- |
| Epomail-Anmeldung, Sitzungserhalt, Ausstellung und Sperrung von API-Schlüsseln | Konto-Identifikation und Dienstzugang | Erforderlichkeit für den Vertrag (Artikel 6 Absatz 1 Buchstabe b der DSGVO) |
| Verhaltensereignisse und Empfehlungsprofil (pseudonymisiert) | Empfehlungs- und Auto-DJ-Funktionen | Berechtigtes Interesse (Artikel 6 Absatz 1 Buchstabe f der DSGVO); Sie können die Personalisierung jederzeit abschalten (Widerspruchsrecht, Abschnitt 9); nach dem Abschalten wird die Erhebung sofort eingestellt |
| Globale aggregierte Statistiken | Beliebtheitscharts und ähnliche Empfehlungen | Berechtigtes Interesse (Artikel 6 Absatz 1 Buchstabe f der DSGVO); kein Personenbezug |
| Ereignisse mit anonymem Bezeichner (anonyme Teilnehmende) | Empfehlungsfunktion | Ihre freie Wahl; endet mit dem Abschalten der Personalisierung |
| IP-Ratenbegrenzung, Sitzungssicherheit, Missbrauchsprävention | Sicherheit und Stabilität des Dienstes | Berechtigtes Interesse (Artikel 6 Absatz 1 Buchstabe f der DSGVO); wo anwendbar zugleich gesetzliche Pflicht (Artikel 6 Absatz 1 Buchstabe c der DSGVO) |

Ihre personenbezogenen Daten werden ausschließlich für die oben genannten Zwecke und den damit eng verbundenen Umfang verwendet. Der Dienst nutzt Ihre Daten nicht für automatisierte Entscheidungen im Sinne von Artikel 22 der DSGVO (Entscheidungen mit rechtlicher Wirkung oder ähnlich erheblicher Beeinträchtigung); die Wirkung der Empfehlungsergebnisse beschränkt sich auf die Wiedergabefolge und die Chartreihenfolge, die Sie sehen, und Sie können sie jederzeit abschalten.

## 6. Speicherdauer und Löschung

| Datenkategorie | Speicherstrategie |
| --- | --- |
| Verhaltensereignisse | automatische Vernichtung 90 Tage nach Aufzeichnung (durch den Bereitsteller konfigurierbar, Untergrenze 7 Tage), ausgelöst nach Schreibzähler und Startzeitpunkt; die Ein-Klick-Löschung des Profils vernichtet sofort |
| Konto-Identifikationsdaten (E-Mail, Nickname, Avatar-Link, Rolle) | keine Persistenz; nur für die Dauer der Sitzung |
| Sitzungs-Cookie | höchstens 30 Tage; Erlöschen sofort bei Abmeldung |
| OAuth-Transaktions-Cookies | automatischer Ablauf nach 600 Sekunden |
| Ratenbegrenzungszähler | der native Edge-Ratenbegrenzer speichert nichts; KV-Einträge laufen nach 120 Sekunden ab; Speicherfenster 60 Sekunden |
| Schlüssel-Sperrliste | statische Liste des Bereitstellers (Umgebungsvariable) oder KV-Einträge zur sofortigen Sperrung |
| Datenbankbackups | konsistente Schnappschüsse mit pseudonymisierten Verhaltensdaten; Schutz auf demselben Niveau wie die Produktionsdaten |
| Globale aggregierte Statistiken | ohne Personenbezug; Behandlung gemäß der Datenbank-Wartungsstrategie |
| Lokaler Browserspeicher | verbleibt auf Ihrem Gerät, bis Sie ihn löschen oder „Alle lokalen Daten löschen“ verwenden |

## 7. Weitergabe an Dritte und internationale Übermittlungen

Der Dienst gibt personenbezogene Daten nach dem Prinzip der Mindestnotwendigkeit an Dritte weiter; alle Fälle sind im [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/) aufgeführt. Die Kernaussagen:

1. Auftragsverarbeitung: Cloudflare (Pages-Hosting, Functions-Edge-Rechenleistung, verschlüsselter Tunnelkanal, KV-Speicher, Ratenbegrenzungsinfrastruktur);
2. Identitätsanbieter: Epomail (bei der Anmeldung werden Kennung, E-Mail, Nickname, Avatar-Link und Rolle abgerufen);
3. Vorgelagerte Inhaltsquellen: NetEase, QQ, Kugou, Kuwo, AMLL, LRCLIB und die offiziellen Inhalts-CDNs; die Anfragen enthalten nur Suchparameter zum Titel und festen User-Agent/Referer, nicht Ihre Identität oder IP;
4. Gesetzliche Anforderungen: Herausgabe nur nach förmlichem Verfahren auf Verlangen befugter Stellen und Benachrichtigung an Sie, soweit das Recht es zulässt.

Die Kontrollebene des Dienstes läuft auf dem globalen Edge-Netzwerk von Cloudflare; Ihre personenbezogenen Daten können an Knoten außerhalb des Landes des Betreibers verarbeitet werden. Der Betreiber verwaltet die internationalen Übermittlungen nach den Garantiemechanismen der Artikel 44 bis 46 der DSGVO (einschließlich der EU-Standardvertragsklauseln) im Rahmen der Hosting- und Auftragsverarbeitungsverhältnisse und stützt sich auf die Datenschutzmaßnahmen von Cloudflare (Zertifizierungen SOC 2 Type II, ISO/IEC 27001). Selbst gehostende Betreiber müssen selbst bewerten und sicherstellen, dass ihre internationalen Übermittlungen den Rechtsanforderungen an ihrem Standort entsprechen.

## 8. Schutz von Kindern

Der Dienst richtet sich nicht an Kinder unter 16 Jahren und erhebt wissentlich keine personenbezogenen Daten von Kindern. Sieht das Recht an Ihrem Wohnort für Dienstleistungen der Informationsgesellschaft ein niedrigeres Einwilligungsalter vor (mindestens 13 Jahre, Artikel 8 der DSGVO), gilt diese Regelung. Halten Sorgeberechtigte fest, dass ein Kind personenbezogene Daten übermittelt hat, können sie den Betreiber um Löschung ersuchen; nach Prüfung wird unverzüglich verfahren. Niemand darf den Dienst nutzen, um Kindern und Jugendlichen Inhalte zu verbreiten, die ihre körperliche oder seelische Gesundheit gefährden; die einschlägigen Nutzungsbeschränkungen finden sich in der [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/).

## 9. Rechte der betroffenen Person und Ausübung

In Bezug auf Ihre personenbezogenen Daten haben Sie folgende Rechte:

1. Auskunft und Erhalt einer Kopie (Artikel 15 der DSGVO);
2. Berichtigung (Artikel 16 der DSGVO);
3. Löschung (Artikel 17 der DSGVO);
4. Einschränkung der Verarbeitung (Artikel 18 der DSGVO);
5. Datenübertragbarkeit (Artikel 20 der DSGVO);
6. Widerspruch (Artikel 21 der DSGVO), einschließlich der jederzeitigen Abschaltung der Personalisierung;
7. Freiheit von Entscheidungen, die ausschließlich auf automatisierter Verarbeitung beruhen (Artikel 22 der DSGVO); der Dienst trifft solche Entscheidungen nicht.

Ausübungswege:

![Datenschutz- und lokale-Daten-Bereich der Sonic-Einstellungsseite: Schalter für intelligente Suche und personalisierte Empfehlungen, Schalter für Auto DJ, Schaltfläche zum Zurücksetzen des Empfehlungsprofils und der Nicht-interessant-Vermerke, Bereichshinweis „die folgenden Daten werden nur in deinem Browser gespeichert und nicht auf einen Server hochgeladen“](/images/sonic/ui/ui-privacy.png)

*Abbildung: Der Bereich „Datenschutz und lokale Daten“ der Einstellungsseite; die tatsächliche Oberfläche der folgenden Selbstbedienungsfunktionen. Die Wegleitung durch die Oberfläche findet sich in der [Oberflächen- und Funktionsübersicht](/de/interface/), Abschnitt 7.*

1. Selbstbedienungsfunktionen (sofortige Wirkung):
   - „Empfehlungsprofil löschen“: vernichtet sofort sämtliche serverseitig mit Ihnen verknüpften Verhaltensereignisse (`DELETE /api/sonic/events`);
   - „Alle lokalen Daten löschen“: entfernt sofort localStorage, sessionStorage und die gesamte IndexedDB-Datenbank des Browsers und vernichtet zugleich das serverseitige Profil;
   - Abfrage der Profilübersicht: über `GET /api/sonic/events` erhalten Sie eine Zusammenfassung Ihres aktuellen Profils (Gesamtzahl der Ereignisse, Zähler für Favoriten und Ablehnungen, häufig gehörte Künstler, Genreneigung, letzte Suchbegriffe, Speicherform);
   - Personalisierung abschalten: der Schalter auf der Einstellungsseite wirkt sofort; die Warteschlange wird geleert, und es werden keine weiteren Ereignisse erhoben;
   - Abmeldung: sperrt sofort die aktuelle Sitzung und die Schlüsselkennung.
2. Manuelle Anträge: Richten Sie andere Anfragen an `privacy@epocanvas.com`; der Betreiber antwortet innerhalb eines Monats nach Eingang (Artikel 12 Absatz 3 der DSGVO); bei komplexen Sachverhalten kann die Frist um zwei weitere Monate verlängert werden, wobei der Grund der Verlängerung innerhalb des ersten Monats mitzuteilen ist.

Halten Sie die Verarbeitung durch den Dienst für eine Verletzung Ihrer Rechte, können Sie beim Betreiber Abhilfe verlangen (Artikel 79 der DSGVO) und bei der zuständigen Aufsichtsbehörde am Ort des Betreibers Beschwerde einlegen (Artikel 77 der DSGVO); Nutzer in der Europäischen Union und im Europäischen Wirtschaftsraum können sich an die Aufsichtsbehörde ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsorts oder des Ortes des mutmaßlichen Verstoßes wenden. Wer durch einen Verstoß gegen die DSGVO einen materiellen oder immateriellen Schaden erlitten hat, kann Schadensersatz nach Artikel 82 der DSGVO verlangen.

## 10. Sicherheitsmaßnahmen

Der Betreiber richtet nach Artikel 32 der DSGVO geeignete technische und organisatorische Maßnahmen ein und verbessert sie laufend, um Diebstahl, Veränderung, Beschädigung, Verlust oder Offenlegung personenbezogener Daten zu verhindern: HTTPS/TLS auf der gesamten Kette; versionierte, HMAC-SHA256-signierte API-Schlüssel mit Vergleich in konstanter Zeit; PKCE-OAuth-Ablauf mit befristeten Transaktions-Cookies; HttpOnly/Secure/SameSite-Attribute des Sitzungs-Cookies und sofortige Sperrung; die Datenebene bindet sich nur an die Loopback-Adresse und ist über einen verschlüsselten Tunnel angebunden; SSRF-Blockierung auf der gesamten Kette und Domänen-Whitelist; pseudonymisierte Bezeichner und IP-freies Datenbankdesign; Logminimierung; Schlüsselvalidierung nach dem fail-closed-Prinzip. Die vollständige Liste, die Verarbeitungsmatrix und die bekannten Grenzen sind unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/) beschrieben.

## 11. Änderungen dieser Erklärung

Diese Erklärung kann bei Änderungen des Dienstes oder der Rechtslage überarbeitet werden. Wesentliche Änderungen (etwa neue Weitergabeempfänger, geänderte Speicherstrategien oder Erhebungsumfänge) werden vorab durch eine Ankündigung auf der Website mitgeteilt; das Inkrafttretensdatum und die Versionsnummer am Anfang dieser Seite werden aktualisiert. Wer nach Inkrafttreten einer Änderung den Dienst weiter nutzt, gilt als mit der überarbeiteten Erklärung einverstanden; wer nicht einverstanden ist, kann die Nutzung einstellen und seine Daten löschen lassen. Die früheren wesentlichen Fassungen werden mit den Versionsaufzeichnungen des Open-Source-Repositorys archiviert.

## 12. Kontaktstellen

- Datenschutzangelegenheiten, Rechteausübung und Beschwerden: `privacy@epocanvas.com`
- Dienst- und Kontoangelegenheiten: `admin@epocanvas.com`
- Open-Source-Projekt: Issues im GitHub-Repository (`github.com/shijianus/sonic`)
- Selbst gehostete Websites: wenden Sie sich an den dort veröffentlichten Betreiber

---

*Dieses Dokument ist ein vom Betreiberteam von Sonic erstelltes Compliance-Dokument und stellt keine Rechtsberatung dar; zwingende Vorschriften des Rechts an Ihrem Wohnort gehen dieser Erklärung vor, soweit sie mit ihr nicht vereinbar sind.*
