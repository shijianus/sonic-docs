---
title: Projektvorstellung
description: Vorstellung des epocanvas sonic Projekts – Produktpositionierung, Kernfunktionen, technische Architektur, Empfehlungsengine, Sicherheits- und Datenschutzdesign, Geltungsbereich, Deployment-Formen und Leseführung der Dokumentation.
---

**Datum des Inkrafttretens: 1. November 2026｜Version: 1.3**

Diese Seite stellt das Projekt epocanvas sonic (nachfolgend „Sonic“ oder „das Projekt“) vor: seine Produktpositionierung, Kernfunktionen, Systemarchitektur, sein Sicherheits- und Datenschutzdesign, seinen Geltungsbereich und seine Deployment-Formen, und gibt eine Leseführung für die Dokumentation dieser Website. Ganz gleich, ob Sie eine gehostete Instanz nutzen, selbst eine bereitstellen möchten oder die Regelungen zu Datenschutz und Bedingungen kennenlernen wollen: Von dieser Seite aus gelangen Sie ans Ziel. Die rechtlichen Regelungen von Sonic finden sich in der [Datenschutzerklärung](/de/privacy-policy/) und in den [Nutzungsbedingungen](/de/terms-of-service/).

![Zweiebenenarchitektur von Sonic: Die Nutzer erreichen die Cloudflare-Edge-Kontrollebene (Routing, Ratenbegrenzung, Caching, Circuit Breaker); die Linux-Datenebene führt Protokollparsen, Empfehlungsberechnung und SQLite-Speicherung aus; Audiostreams werden standardmäßig über den Edge-Proxy von den offiziellen CDNs abgerufen](/images/sonic/project-architecture.svg)

*Abbildung: Die getrennte Architektur aus Kontrollebene und Datenebene von Sonic. Die Kontrollebene läuft am Edge auf Cloudflare Pages; die Datenebene läuft auf dem eigenen Linux-Knoten des Betreibers, verbunden über einen verschlüsselten Tunnel mit verpflichtender Validierung der Dienstschlüssel. Audiostreams werden standardmäßig per Proxy von den offiziellen CDNs bezogen (Range 206); optional besteht ein 302-Direktverbindungsmodus.*

## 1. Positionierung des Projekts

Sonic ist eine eigenständig entwickelte Multi-Source-Musikstreaming-Plattform mit Aggregationsgateway, die mit der zweischichtigen Architektur „Cloudflare-Edge-Kontrollebene + Linux-lokale Protokoll-Engine als Datenebene“ betrieben wird und für hochwertiges Audio-Streaming, millisekundengenaue wortweise Lyrics und ein selbstbestimmtes Empfehlungserlebnis gebaut wurde. Das Projekt ist Open-Source-Software; der Quellcode ist öffentlich verfügbar und kann von jedermann selbst bereitgestellt werden.

| Posten | Erläuterung |
| --- | --- |
| Gehostete Instanzen | `sonic.epocanvas.tech` (Hauptstandort) und `sonic.epocanvas.com` (Ersatz-Spiegel), betrieben vom Betreiberteam |
| Selbst gehostete Instanzen | private Instanzen, die eine beliebige Person oder Organisation nach dem Open-Source-Code auf eigenen Servern betreibt; der Bereitsteller ist zugleich Betreiber und Verantwortlicher dieser Instanz |
| Quellcode-Lizenz | maßgeblich ist die Datei `LICENSE` im Stammverzeichnis des Repositorys (MIT License); das Projekt ist als nichtkommerzielles Open-Source-Projekt positioniert; eine frühere README erklärte die Absicht CC BY-NC-SA 4.0, bis zur Entscheidung der Maintainer gilt die Datei `LICENSE`; Marken und Markenzeichen sind von der Quellcode-Lizenz nicht umfasst |
| Anmeldeverfahren | Epomail OAuth 2.0 (PKCE); das Projekt hat kein eigenes Registrierungssystem |
| Softwarebestandteile | Cloudflare Pages Frontend und Edge Functions (Kontrollebene), lokale Node.js-22-Engine und ncm-api-Hilfscontainer (Datenebene), Webplayer in Vue 3 |

## 2. Überblick über die Kernfunktionen

![Sonic-Player-Oberfläche in der Praxis: linke Navigation (Entdecken, Meine Musik, System), auf der Startseite Karussellempfehlungen, intelligente Empfehlungen und Musikradar sowie Empfehlungsplaylists, unten die Mini-Wiedergabeleiste](/images/sonic/ui/ui-home.png)

*Abbildung: Tatsächlicher Betrieb des Webplayers der gehosteten Instanz. Eine Einzelwegleitung durch die Oberflächenbereiche und Funktionspositionen bietet die [Oberflächen- und Funktionsübersicht](/de/interface/).*

| Funktion | Erläuterung |
| --- | --- |
| Multi-Source-Aggregationssuche | fehlertolerante, quellübergreifend vereinheitlichte Suche: Normalisierung vereinfachter und traditioneller Schriftzeichen, Suche über Pinyin und Abkürzungen, symmetrische Zuordnung chinesischer und englischer Künstleraliase, Rechtschreibtoleranz nach Editierdistanz, Versionsidentifikation; paralleler Abruf aus mehreren Quellen mit Zusammenführung nach Regex-Deduplikation |
| Wortweise dynamische Lyrics | native Reverse-Parsung von NetEase YRC, QQ QRC und Kugou KRC (XOR-Entschlüsselung + Deflate-Dekompression), ergänzt um AMLL TTML und die globale Lyrics-Datenbank LRCLIB; mehrsprachige Lyrics, Umschrift und Übersetzungen mit Millisekundensynchronisation |
| Qualitätsstufen und transparente Hörproben-Kennzeichnung | strikte Erkennung tatsächlicher Entitäten unterscheidet vollständige Titel von den offiziellen 30-Sekunden-Hörproben; eine Hörprobe wird niemals als vollständiger Titel ausgegeben; bei Hörprobentiteln wird automatisch die Ergänzung aus einer anderen Quelle ausgelöst (konfigurierbar), die Ergänzungsquelle wird transparent angegeben |
| Intelligente Empfehlungen und Auto DJ | lokale, schlanke Empfehlungsengine: Multi-Faktor-Beliebtheitsmodell, suchbasierte Sitzungsabsicht, quantifiziertes Verhaltensfeedback, Inhaltssimilarität und MMR-Umsortierung für Vielfalt; ohne externe Big-Data-Cluster |
| Selbstbestimmte Verwaltung von Verhaltensereignissen | Signale wie Wiedergabe, vollständig abgespielt, übersprungen, favorisiert und abgelehnt lassen sich jederzeit deaktivieren; mit der Ein-Klick-Löschung des Profils werden sämtliche serverseitigen Verhaltensaufzeichnungen sofort vernichtet |
| Zero-Trust-Sicherheit | versionierte, HMAC-SHA256-signierte API-Schlüssel, PKCE-OAuth, SSRF-Blockierung auf der gesamten Kette, Schlüsselaustausch ausschließlich über Anforderungsheader |
| Disaster-Recovery-Degradierung | Fällt die Datenebene aus, schaltet die Edge-Schicht in 0 ms in den Degradierungsmodus; die Oberfläche zeigt deutlich „Edge-Degradierungsmodus“ an, und das stabile Abspielen bereits geladener Titel bleibt gewährleistet |

## 3. Überblick über die technische Architektur

### 3.1 Kontrollebene (Cloudflare-Edge)

Die Kontrollebene läuft auf Cloudflare Pages und Pages Functions und übernimmt folgende Aufgaben:

1. Routing und Authentifizierung: zentraler Eingang für API-Anforderungen mit Authentifizierungsprüfung und Validierung der signierten Schlüssel;
2. Gestufte Ratenbegrenzung: 240 Anforderungen pro Minute für anonyme und 600 Anforderungen pro Minute für authentifizierte Zugriffe (Standardwerte, konfigurierbar); für Authentifizierungsendpunkte gilt zusätzlich eine spezielle Begrenzung von 30 pro Minute und IP;
3. Mehrstufiges Caching: Edge-Cache mit den Schlüsseln `sonic:*`, Frischefenster von 8 Minuten; nach Ablauf geht er in einen verlängerten Notfallzustand über;
4. Dreizuständiger Circuit Breaker: Nach 3 aufeinanderfolgenden Fehlern oder einer Überschreitung des Budgets von 4,5 Sekunden pro Aufruf springt der Zustand auf OPEN; weitere Anforderungen werden in 0 ms sofort über den Edge-Fallback geleitet (öffentliche Suchschnittstellen von QQ/Kugou sowie AMLL/LRCLIB); nach 30 Sekunden Abklingzeit wechselt er zu HALF_OPEN-Probing und schließt bei Erfolg. Während der Degradierung tragen Antworten den Header `X-Sonic-Degraded: 1`, und im Player erscheint oben ein Degradierungshinweis.

### 3.2 Datenebene (Linux-Protokoll-Engine)

Die Datenebene ist ein Docker-Compose-Stack auf dem eigenen Linux-Knoten des Betreibers:

| Komponente | Erläuterung |
| --- | --- |
| sonic-engine Hauptcontainer | Node.js-22-HTTP-Dienst, lauscht auf Port 8080, auf Hostseite nur auf `127.0.0.1` abgebildet; alle Routen `/api`, `/proxy` und `/palette` erzwingen die Validierung des Dienstschlüssels (X-Sonic-Engine-Key) |
| ncm-api Hilfscontainer | Protokoll-Hilfsdienst für NetEase Cloud Music, nur innerhalb des Compose-Netzwerks erreichbar (`ncm-api:3000`), ohne öffentliche Exposition |
| SQLite 3 (WAL-Modus) | persistenter Speicher für Verhaltensereignisse und Entitätsgewichte, abgelegt im benannten Volume `sonic-data` (im Container `/app/data/sonic-recommend.sqlite`); Backups erfolgen als konsistente Schnappschüsse (VACUUM INTO) mit Integritätsprüfung |
| Native Protokollmodule | in reinem TypeScript implementierte Parsung der Protokolle von NetEase linuxapi/eapi, QQ, Kugou KRC und Kuwo |

Die Kontrollebene und die Datenebene kommunizieren über den verschlüsselten Kanal von Cloudflare Tunnel; die Datenebene stellt keine Ports direkt öffentlich ins Internet.

### 3.3 Pfad des Audiostreams

Audiostreams werden standardmäßig über den Edge-Proxy (same-origin Byte-Range-Proxy) von den offiziellen CDNs bezogen; HTTP `Range` und `206 Partial Content` für segmentiertes Laden werden unterstützt: Das vorgelagerte CDN sieht nur die Adresse des Proxyservers und erhält die Client-IP nicht. Der 302-Direktverbindungsmodus mit `?mode=redirect` steht ausschließlich API-Nutzern mit ausdrücklichem Aufruf zur Verfügung (der Webplayer verwendet ihn nicht); im Direktverbindungsmodus baut Ihr Browser die Verbindung direkt zum offiziellen CDN auf.

## 4. Audioquellen und Lyrics-Pipeline

| Quelle | Rolle und Anteil | Status |
| --- | --- | --- |
| Lokale native Parsung (offizielle Schnittstellen von NetEase/QQ/Kugou/Kuwo + ncm-api) | Hauptpipeline (über 90 %) | standardmäßig aktiviert |
| AMLL TTML wortweise Lyrics + LRCLIB synchronisierte Lyrics-Datenbank | Lyrics-Ergänzung (rund 10 %) | standardmäßig aktiviert |
| GDStudio/Lyriva aggregierte Upstreams von Drittanbietern | Notfall-Fallback | standardmäßig strikt deaktiviert |
| ListenBrainz/MusicBrainz Erweiterung ähnlicher Künstler | optionale Erweiterung | standardmäßig deaktiviert |

Die Hörprobenerkennung prüft Länge und Metadaten der Audio-Entität und erkennt die offiziellen 30-Sekunden-Hörproben; das Ergebnis wird im Frontend transparent mit einem Hörproben-Abzeichen dargestellt und kann eine plattformübergreifende Volltitel-Zuordnung auslösen (Zuordnungsziele sind die kostenlosen Volltitel von QQ/Kugou/Kuwo); bei erfolgreicher Zuordnung wird weich umgeschaltet und die Ersatzquelle angegeben. Das Projekt integriert keinerlei Komponenten zur Umgehung bezahlter Rechteschutzmechanismen.

## 5. Intelligente Empfehlungsengine

Die Empfehlungsengine läuft vollständig lokal auf der Datenebene; die Gewichte der Verhaltenssignale sind im Quellcode offengelegt:

| Signal | Gewicht | Erläuterung |
| --- | --- | --- |
| favorite (zu Favoriten hinzugefügt) | +4,0 | sehr stark positiv |
| replay (erneut abgespielt) | +3,5 | stark positiv |
| play_complete (vollständig und wirksam abgespielt) | +2,5 | Standard positiv |
| play_progress (fortschreitendes Hören) | +0,2 bis +1,8 | Bewertung gestaffelt nach Höranteil |
| skip (schnelles Überspringen) | -0,8 | Wechsel nach mehr als der Hälfte zählt +0,25 |
| dislike (ausdrückliche Ablehnung) | -5,0 | harte Filterung und Eintrag in die Negativliste |

Bereinigung von Rauschen und Falschsignalen: Titelwechsel, die auf Netzwerkstocken (network_stall), Dekodierfehlern (playback_error), Hörprobenabbruch (trial_end), nicht verfügbaren Streams (stream_unavailable), Puffer-Timeouts (buffer_timeout) oder fehlgeschlagener automatischer Umschaltung (auto_switch_error) beruhen, haben durchgängig das Gewicht null und werden nicht gespeichert.

Das Beliebtheitsmodell kombiniert wirksame Wiedergaben (35 %), eigenständige Hörer (25 %), Abspielverhalten bis zum Ende (20 %), Favoritenkonversion (15 %) und Wachstumssteigung (5 %), ergänzt durch exponentielle Zeitabnahme (24-Stunden-Trendcharts und 7-Tage-Kumulativcharts) sowie bayesianische Glättung und Wilson Score; die Ähnlichkeitsberechnung verbindet den Künstlerbeziehungsgraph mit dem Kosinus der Audio-Merkmale, und eine Umsortierung nach marginaler Relevanz (MMR) balanciert Präzision und Vielfalt. Sitzungsbezogene Suchabsicht und langfristige Präferenzen sind schichtweise entkoppelt: Nur hochwertige Verhalten wie vollständiges Abspielen und Favorisieren fließen ins Langzeitprofil ein.

## 6. Überblick über das Sicherheitsdesign

1. Authentifizierung: Epomail OAuth 2.0 im Authorization-Code-Modus; der Parameter `state` und PKCE (S256) verhindern Abfangen und Wiederholung des Autorisierungscodes; die OAuth-Transaktions-Cookies sind 600 Sekunden gültig;
2. API-Schlüssel: versioniertes Format `sonic_live_v2.<header>.<payload>.<signature>` mit HMAC-SHA256-Signatur; die Nutzlast enthält `sub`/`iat`/`exp`/`jti`/`kid`/`role`/`uid`; Ausstellungsdauer 30 Tage, Validierungsgrenze 90 Tage; der Server vergleicht in konstanter Zeit mit Web Crypto; Schlüssel ohne Signatur und Schlüssel alter Versionen werden ausnahmslos abgelehnt (fail-closed); Schlüssel werden ausschließlich über die Anforderungsheader `X-Sonic-Key` oder `Authorization` übermittelt; der Kanal über URL-Abfrageparameter wurde vollständig entfernt;
3. Sperrung: Die Abmeldung sperrt sofort die aktuelle Sitzung und die Schlüsselkennung (jti); unterstützt werden eine jti-Sperrliste, eine Subjekt-Sperrliste und eine globale untere Ausstellungszeitgrenze; bei Anbindung an KV ist eine sofortige Sperrung möglich;
4. Sitzungen: Cookie `sonic_session` mit `HttpOnly; Secure; SameSite=Lax`, gültig für höchstens 30 Tage; Schlüssel werden weder in URLs noch in localStorage oder anderweitig für Seitenskripte erreichbare Bereiche geschrieben;
5. SSRF-Abwehr: Ausgehende Anforderungen an Loopback-Adressen, private RFC-1918-Netze, interne Docker-Bridges und Cloud-Metadaten-Adressen (z. B. `169.254.169.254`) werden ausnahmslos blockiert; die Prüfung erfolgt für IPv4 und IPv6 (Dual Stack); bei jeder Umleitung werden Ziel und DNS-Auflösung neu geprüft.

## 7. Überblick über das Datenschutzdesign

1. Pseudonymisierung als Voreinstellung: Verhaltensereignisse werden ab dem Moment der Erhebung mit einem einseitigen Hash-Bezeichner verknüpft; E-Mail-Adressen werden nicht persistiert;
2. Selbstbestimmte Personalisierung: In den Player-Einstellungen lässt sich die Personalisierung jederzeit abschalten; nach dem Abschalten werden Ereignisse nicht mehr gespeichert, im öffentlichen Modus werden sie serverseitig sofort verworfen;
3. Ein-Klick-Löschung: Die Funktion „Empfehlungsprofil löschen“ in den Einstellungen vernichtet sofort sämtliche serverseitigen Verhaltensereignisse; „Alle lokalen Daten löschen“ entfernt sofort den lokalen Browserspeicher und IndexedDB;
4. Logminimierung: Die Zugriffsprotokolle der Datenebene enthalten nur Pfad, Methode, Statuscode und Dauer.

Die vollständige Darstellung der Datenschutzzusagen finden Sie in der [Datenschutzerklärung](/de/privacy-policy/), die technischen Maßnahmen unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/).

## 8. Für wen das Projekt geeignet ist und für wen nicht

Geeignet: für einzelne Hörer, die sich mit ihrem eigenen Epomail-Konto anmelden möchten und Wert auf Transparenz und Löschbarkeit des Empfehlungsprofils legen; für vielseitige Musikfans, die Multi-Source-Aggregationssuche und wortweise Lyrics benötigen; für Selbst-Hoster mit Linux- und Docker-Grundkenntnissen, die die Betreiberpflichten selbst übernehmen wollen.

Nicht geeignet: für Szenarien, die eine lizenzrechtliche Absicherung wie bei einem kommerziellen Musikdienst erwarten – das Projekt speichert und hostet keine Musik und gewährt keinerlei Weiterlizenzierung von Inhalten; für Teams, die eine Service-Level-Agreement (SLA) oder kommerziellen Support erwarten; für Nutzer, die die Grundsätze „Hörproben transparent kennzeichnen, Ergänzung aus anderen Quellen nach bestem Bemühen“ nicht akzeptieren können.

## 9. Grenzen bei Inhalten und Urheberrecht

Sonic ist ein Werkzeug zum Suchen, Aggregieren und Abspielen; es speichert und hostet keinerlei Musikdateien. Die Rechte an Aufnahmen, Lyrics, Covern, Künstlerbildern und anderen Inhalten liegen bei den jeweiligen Rechteinhabern; das Projekt gewährt keinerlei Weiterlizenzierung von Musikinhalten. Titel mit legaler Mitgliedschaft werden vom Bereitsteller mit eigenen Berechtigungsdaten eingebunden (z. B. `NETEASE_COOKIE`, ein Konto des Bereitstellers, nicht der Endnutzer); öffentlich zugängliche Titel folgen den offiziellen offenen Protokollen.

Bei der Nutzung dieses Dienstes gilt die [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/); Bereitsteller müssen selbst sicherstellen, dass ihr Nutzungsszenario den örtlichen Gesetzen, den Bedingungen der vorgelagerten Dienste und den Anforderungen an die Inhaltslizenzierung entspricht.

## 10. Deployment-Formen

| Form | Bestandteile | Kernpunkte |
| --- | --- | --- |
| Cloudflare Pages Edge-Gateway | Frontend-SPA + Pages Functions | Veröffentlichung nach dem Build mit `wrangler pages deploy`; zu konfigurieren sind `SONIC_SECRET`, `SONIC_ENGINE_SECRET`, `SONIC_LOCAL_ENGINE_URL` |
| Lokale Linux-Protokoll-Engine | sonic-engine + ncm-api + SQLite | Deployment mit `docker compose up -d --build`; Berechtigungen von `.env` auf 600; Anbindung über Cloudflare Tunnel |

Beide Formen zusammen ergeben den vollständigen Dienst; wird nur das Edge-Gateway ohne Datenebene bereitgestellt, läuft der Dienst automatisch im Edge-Degradierungsmodus. Die vollständige Liste der Umgebungsvariablen findet sich in `.env.example` und `docs/OPERATIONS.md` im Upstream-Repository.

## 11. Qualitätssicherung

Das Projekt sichert Qualität durch Auditsbarkeit und automatisierte Verifikation:

1. Sicherheitsaudit und Nachbesserung: Im Upstream-Repository liegen ein Sicherheitsauditbericht (`SECURITY_AUDIT_REPORT.md`, `SECURITY_FIX_SUMMARY.md`) und nach Posten aufgeschlüsselte Behebungsunterlagen (`docs/AUDIT_REMEDIATION.md`), unter anderem zu API-Signatur, OAuth-Ablauf, SSRF-Abwehr und Frontend-XSS;
2. Automatisierte Testgates: Die Testsuite deckt Gateway-Verhalten, Authentifizierungskompatibilität, SSRF-Fälle, lokale Engine und Degradierung, Empfehlung und Suche, Frontend-XSS, Konfigurationskonsistenz (config parity) und Release-Gates P0/P1 ab und wird mit jeder Veröffentlichung ausgeführt;
3. Verifikation der Dokumentenkonsistenz: Diese Website prüft mit automatisierten Skripten drei Dinge: keine defekten Links bei Seitenankern und Bildverweisen, 1:1-symmetrische Struktur der mehrsprachigen Versionen und Übereinstimmung der DSGVO-Zitierweise mit der Verifizierungs-Whitelist;
4. Faktabgleich: Alle Datenverarbeitungsaussagen dieser Website werden bei jedem Versionsupdate gegen den Quellcode (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts` usw.) abgeglichen; weicht der Quellcode ab, ist er maßgeblich, und die Dokumentation wird unverzüglich korrigiert.

## 12. Häufige Fragen

**Ist der Dienst kostenpflichtig? Gibt es Werbung?**
Kostenlos, ohne Werbung und ohne In-App-Käufe; die Betriebskosten der gehosteten Instanzen trägt das Betreiberteam. Der Dienst erhebt keinerlei Daten zu Werbezwecken.

**Kann ich den Dienst ohne Anmeldung nutzen?**
Ja. Suche, Wiedergabe, Lyrics, Charts und weitere Kernfunktionen sind anonym nutzbar (mit strengerer Ratenbegrenzung); die Anmeldung schaltet die Favoritensynchronisation, personalisierte Empfehlungen und Auto DJ frei.

**Wo werden meine Daten gespeichert?**
An drei Orten: Favoriten, Playlists und Player-Einstellungen liegen im lokalen Speicher Ihres Browsers; Downloads und lokale Musik liegen in IndexedDB Ihres Browsers; serverseitig werden ausschließlich pseudonymisierte Verhaltensereignisse gespeichert (automatische Vernichtung nach 90 Tagen). E-Mail-Adressen werden nicht persistiert. Details in der [Datenschutzerklärung](/de/privacy-policy/), Abschnitt 4.

**Wie lösche ich mein Verhaltensprofil?**
Einstellungen → Datenschutz und lokale Daten → „Empfehlungsprofil und Nicht-interessant-Vermerke zurücksetzen“, oder direkt `DELETE /api/sonic/events` aufrufen; die Wirkung tritt sofort ein. „Alle lokalen Daten löschen“ entfernt zugleich die Browserdaten und die serverseitigen Daten. Die Position in der Oberfläche ist in der [Oberflächen- und Funktionsübersicht](/de/interface/), Abschnitt 9, beschrieben.

**Verfolgen mich die Empfehlungen?**
Die Empfehlungen dienen ausschließlich der Wiedergabereihenfolge; es gibt kein standortübergreifendes Tracking und keine Werbeprofile. Die Personalisierung lässt sich jederzeit abschalten; danach läuft der Dienst im rein öffentlichen Modus und zeichnet keine Ereignisse mehr auf.

**Warum sind manche Titel nur 30 Sekunden lang?**
Das ist der offizielle Hörprobenabschnitt der Plattform; der Player kennzeichnet ihn wahrheitsgemäß als Hörprobe und gibt ihn niemals als vollständigen Titel aus. Ist die Ergänzung aus anderen Quellen aktiviert, wird automatisch versucht, einen kostenlosen Volltitel zuzuordnen, dessen Quelle dann angegeben wird.

**Sind die Audioqualitäts-Abzeichen verlässlich?**
Ja. Das Abzeichen spiegelt die tatsächliche Stufe des aktuellen Audiostreams wider; ändern sich die vorgelagerten Stufen, folgt es in Echtzeit und weist nichts überhöht aus (siehe die [Nutzungsbedingungen](/de/terms-of-service/), Abschnitt 4, Nummer 3).

**Welche Pflichten habe ich beim Selbst-Hosting?**
Ab dem Zeitpunkt der Bereitstellung sind Sie der Verantwortliche dieser Instanz: Sie müssen Ihre Nutzer informieren, Verarbeitungsunterlagen führen, erforderlichenfalls eine Folgenabschätzung durchführen und Sicherheitsmaßnahmen umsetzen. Der Einstiegspunkt steht unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 6.

**Welche Sprachen unterstützt der Dienst?**
Der Player enthält von Haus aus vereinfachtes Chinesisch, Englisch und Japanisch; diese Dokumentationswebsite bietet 10 Sprachversionen.

## 13. Leseführung der Dokumentation

| Dokument | Inhalt |
| --- | --- |
| [Überblick](/de/overview/) | Identität der Plattform, Rollen der Datenverarbeitung, Dokumentenlandkarte und Rangfolge der Geltung |
| [Datenschutzerklärung](/de/privacy-policy/) | Informationspflichten bei der Erhebung, Rechtsgrundlagen, Speicherdauer, Betroffenenrechte |
| [Nutzungsbedingungen](/de/terms-of-service/) | Vertragliche Nutzungsbedingungen, Haftungsbeschränkung, anwendbares Recht |
| [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/) | Verhaltensgrenzen, Verbotskatalog, Eskalationsstufen und Beschwerden |
| [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/) | Datenlebenszyklus, Verarbeitungsmatrix, Sicherheitsmaßnahmen, Vorfallreaktion |
| [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/) | Empfänger der Weitergabe, betroffene Daten, Garantiemechanismen bei internationalen Übermittlungen |
| [Begriffsdefinitionen](/de/key-terms/) | Rechtsbegriffe (DSGVO-Vokabular) und technische Begriffe |

Leseführung: für Produkt und Deployment beginnen Sie auf dieser Seite; für Datenschutz und Vertragsregelungen beginnen Sie beim [Überblick](/de/overview/); konkrete Begriffe finden Sie unter [Begriffsdefinitionen](/de/key-terms/).
