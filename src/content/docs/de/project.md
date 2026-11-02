---
title: Projektvorstellung
description: Vorstellung des epocanvas sonic Projekts – Produktpositionierung, Kernfunktionen, technische Architektur, Empfehlungsengine, Sicherheits- und Datenschutzdesign, Geltungsbereich, Deployment-Formen und Leseführung der Dokumentation.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite stellt das Projekt epocanvas sonic (nachfolgend „Sonic“ oder „das Projekt“) vor: seine Produktpositionierung, Kernfunktionen, Systemarchitektur, sein Sicherheits- und Datenschutzdesign, seinen Geltungsbereich und seine Deployment-Formen, und gibt eine Leseführung für die Dokumentation dieser Website. Ganz gleich, ob Sie eine gehostete Instanz nutzen, selbst eine bereitstellen möchten oder die Regelungen zu Datenschutz und Bedingungen kennenlernen wollen: Von dieser Seite aus gelangen Sie ans Ziel. Die rechtlichen Regelungen von Sonic finden sich in der [Datenschutzerklärung](/de/privacy-policy/) und in den [Nutzungsbedingungen](/de/terms-of-service/). Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

![Zweiebenenarchitektur von Sonic: Die Nutzer erreichen die Cloudflare-Edge-Kontrollebene (Routing, Ratenbegrenzung, Caching, Circuit Breaker); die Linux-Datenebene führt Protokollparsen, Empfehlungsberechnung und SQLite-Speicherung aus; Audiostreams werden standardmäßig über den Edge-Proxy von den offiziellen CDNs abgerufen](/images/sonic/project-architecture.svg)

*Abbildung: Die getrennte Architektur aus Kontrollebene und Datenebene von Sonic. Die Kontrollebene läuft am Edge auf Cloudflare Pages; die Datenebene läuft auf dem eigenen Linux-Knoten des Betreibers, verbunden über einen verschlüsselten Tunnel mit verpflichtender Validierung der Dienstschlüssel. Audiostreams werden standardmäßig per Proxy von den offiziellen CDNs bezogen (Range 206); optional besteht ein 302-Direktverbindungsmodus.*

## 1. Positionierung des Projekts

Sonic ist ein von einer Einzelperson gepflegtes, kostenloses, nicht gewinnorientiertes Lern- und Testprojekt für Musiksuche und Wiedergabe. Es verwendet die zweischichtige Architektur „Cloudflare-Edge-Kontrollebene + Linux-Protokoll-Engine als Datenebene“. Der Quellcode ist öffentlich und kann selbst bereitgestellt werden. Es gibt keine SLA oder Zusage dauerhaften Betriebs; dies befreit nicht von gesetzlichen Pflichten.

| Posten | Erläuterung |
| --- | --- |
| Gehostete Instanzen | `sonic.epocanvas.tech` und `sonic.epocanvas.com`, soweit tatsächlich vom Projekt betrieben; rechtliche Identität und Standort des Betreibers sind noch zu klären |
| Selbst gehostete Instanzen | Instanzen auf eigenen Servern; Verantwortlichkeit richtet sich danach, wer tatsächlich Zwecke und Mittel der Verarbeitung bestimmt |
| Quellcode-Lizenz | Im neuesten öffentlichen RC gelten MIT-Lizenzen im Repository-Stammverzeichnis und in `player/LICENSE`; die fehlende Stammlizenz im älteren `main@ce443c8` dient nur als Vergleich zur Altversion. Fehlende Gewinnorientierung verbietet keine zulässige kommerzielle Codenutzung; Marken- und Medienrechte sind gesondert zu prüfen |
| Anmeldeverfahren | Der neueste öffentliche RC nutzt Epomail OAuth 2.0 (PKCE), ohne eigenes Registrierungssystem; der ältere `main@ce443c8` besitzt diese RC-Kontrollen nicht, die produktive Version ist unbekannt |
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
| Selbstbestimmte Verwaltung von Verhaltensereignissen | Signale wie Wiedergabe, vollständig abgespielt, übersprungen, favorisiert und abgelehnt lassen sich jederzeit deaktivieren; das Zurücksetzen löscht nur Teile der aktuellen Identität und kann trotz Erfolgsmeldung fehlschlagen |
| Sicherheitsgrenzen | Der RC enthält PKCE, signierte Sitzungen, versionierte API-Schlüssel und einzelne SSRF-Prüfungen. Tatsächliche Cookie-Einstellungen, Übermittlung von Zugangsdaten und Bereitstellungskonfiguration sind zu prüfen; der ältere `main@ce443c8` belegt weder RC- noch Produktivfunktionen |
| Disaster-Recovery-Degradierung | Bei Ausfall der Datenebene versucht die Edge-Schicht einen Fallback und zeigt „Edge-Degradierungsmodus“ an; weder verzögerungsfreie Umschaltung noch ununterbrochene Wiedergabe sind garantiert |

## 3. Überblick über die technische Architektur

### 3.1 Kontrollebene (Cloudflare-Edge)

Die Kontrollebene läuft auf Cloudflare Pages und Pages Functions und übernimmt folgende Aufgaben:

1. Routing und Authentifizierung: zentraler Eingang für API-Anforderungen mit Authentifizierungsprüfung und Validierung der signierten Schlüssel;
2. Gestufte Ratenbegrenzung: 240 Anforderungen pro Minute für anonyme und 600 Anforderungen pro Minute für authentifizierte Zugriffe (Standardwerte, konfigurierbar); für Authentifizierungsendpunkte gilt zusätzlich eine spezielle Begrenzung von 30 pro Minute und IP;
3. Mehrstufiges Caching: Edge-Cache mit den Schlüsseln `sonic:*`, Frischefenster von 8 Minuten; nach Ablauf geht er in einen verlängerten Notfallzustand über;
4. Dreizuständiger Circuit Breaker: Nach 3 aufeinanderfolgenden Fehlern oder einer Überschreitung des Budgets von 4,5 Sekunden pro Aufruf springt der Zustand auf OPEN; weitere Anforderungen warten nicht weiter auf die ausgefallene Datenebene, sondern versuchen den Edge-Fallback (öffentliche Suchschnittstellen von QQ/Kugou sowie AMLL/LRCLIB), wobei das Netzwerk weiterhin Verzögerungen verursachen kann; nach 30 Sekunden Abklingzeit wechselt er zu HALF_OPEN-Probing und schließt bei Erfolg. Während der Degradierung tragen Antworten den Header `X-Sonic-Degraded: 1`, und im Player erscheint oben ein Degradierungshinweis.

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

Audiostreams werden standardmäßig über den Edge-Proxy (same-origin Byte-Range-Proxy) von den offiziellen CDNs bezogen; HTTP `Range` und `206 Partial Content` für segmentiertes Laden werden unterstützt: Das vorgelagerte CDN sieht nur die Adresse des Proxyservers und erhält die Client-IP nicht. Der 302-Direktverbindungsmodus mit `?mode=redirect` steht ausschließlich API-Nutzern mit ausdrücklichem Aufruf zur Verfügung (der Webplayer verwendet ihn nicht); im Direktverbindungsmodus verbindet sich der Browser direkt mit dem CDN. MVs, Bilder, Avatare und Google Fonts können ebenfalls IP-Adressen direkt offenlegen; ein DiceBear-Pfad enthält die E-Mail-Adresse als Seed. Einige Upstream-Anfragen verwenden HTTP.

## 4. Audioquellen und Lyrics-Pipeline

| Quelle | Rolle und Anteil | Status |
| --- | --- | --- |
| Lokale native Parsung (eingebundene Schnittstellen von NetEase/QQ/Kugou/Kuwo + ncm-api) | Hauptpipeline (über 90 %) | standardmäßig aktiviert |
| AMLL TTML wortweise Lyrics + LRCLIB synchronisierte Lyrics-Datenbank | Lyrics-Ergänzung (rund 10 %) | standardmäßig aktiviert |
| GDStudio/Lyriva aggregierte Upstreams von Drittanbietern | Notfall-Fallback | Konfigurationsabhängig; GDStudio im Code ohne Einstellung aktiv, in Umgebungsbeispiel und Compose deaktiviert; Lyriva gesondert prüfen |
| ListenBrainz/MusicBrainz Erweiterung ähnlicher Künstler | optionale Erweiterung | standardmäßig deaktiviert |

Die Hörprobenerkennung prüft Länge und Metadaten der Audio-Entität und erkennt die offiziellen 30-Sekunden-Hörproben; das Ergebnis wird im Frontend transparent mit einem Hörproben-Abzeichen dargestellt und kann eine plattformübergreifende Volltitel-Zuordnung auslösen (Zuordnungsziele sind die kostenlosen Volltitel von QQ/Kugou/Kuwo); bei erfolgreicher Zuordnung wird weich umgeschaltet und die Ersatzquelle angegeben. Technische Verfügbarkeit oder Abgleich erteilen keine Inhaltslizenz und berechtigen nicht zur Umgehung von Zahlungs-, Zugriffs- oder Urheberrechtsschutzmaßnahmen.

## 5. Intelligente Empfehlungsengine

Die integrierte Empfehlungsengine läuft auf der Datenebene des Betreibers, nicht ausschließlich auf dem Nutzergerät; externe Empfehlungsanbieter sind konfigurationsabhängig; die Gewichte der Verhaltenssignale sind im Quellcode offengelegt:

| Signal | Gewicht | Erläuterung |
| --- | --- | --- |
| favorite (zu Favoriten hinzugefügt) | +4,0 | sehr stark positiv |
| replay (erneut abgespielt) | +3,5 | stark positiv |
| play_complete (vollständig und wirksam abgespielt) | +2,5 | Standard positiv |
| play_progress (fortschreitendes Hören) | +0,2 bis +1,8 | Bewertung gestaffelt nach Höranteil |
| skip (schnelles Überspringen) | -0,8 | Wechsel nach mehr als der Hälfte zählt +0,25 |
| dislike (ausdrückliche Ablehnung) | -5,0 | harte Filterung und Eintrag in die Negativliste |

Bereinigung von Rauschen und Falschsignalen: Titelwechsel, die auf Netzwerkstocken (network_stall), Dekodierfehlern (playback_error), Hörprobenabbruch (trial_end), nicht verfügbaren Streams (stream_unavailable), Puffer-Timeouts (buffer_timeout) oder fehlgeschlagener automatischer Umschaltung (auto_switch_error) beruhen, haben durchgängig das Gewicht null und werden nicht gespeichert.

Das Beliebtheitsmodell kombiniert wirksame Wiedergaben (35 %), eigenständige Hörer (25 %), Abspielverhalten bis zum Ende (20 %), Favoritenkonversion (15 %) und Wachstumssteigung (5 %), ergänzt durch exponentielle Zeitabnahme (24-Stunden-Trendcharts und 7-Tage-Kumulativcharts) sowie bayesianische Glättung und Wilson Score; die Ähnlichkeitsberechnung verbindet den Künstlerbeziehungsgraph mit dem Kosinus der Audio-Merkmale, und eine Umsortierung nach marginaler Relevanz (MMR) balanciert Präzision und Vielfalt. Sitzungsbezogene Suchabsicht und langfristige Präferenzen sind schichtweise entkoppelt: Auch Entitätsfeedback und Radar-Profile bestehen; die Gewichtung belegt nicht, dass andere Such- oder Verhaltensdaten ungespeichert bleiben.

## 6. Überblick über das Sicherheitsdesign

1. Authentifizierung: Der neueste öffentliche RC nutzt OAuth state und PKCE; OAuth-Transaktions-Cookies gelten 600 Sekunden. Die tatsächliche Bereitstellung ist zu prüfen; der ältere `main@ce443c8` dient nur als Kompatibilitätsvergleich;
2. API-Schlüssel: Der RC implementiert signierte `sonic_live_v2`-Nachweise sowie Versions-, Signatur-, Zeit- und konfigurierte Sperrprüfungen. Die Ausstellung gilt standardmäßig 30 Tage; die maximale Lebensdauer des Validators von 90 Tagen ist kein Standardwert. Signaturen sind keine Verschlüsselung; Nachweise gehören nicht in URLs, Protokolle oder öffentliche Clients. Produktivkonfiguration und Sperrverbreitung bleiben zu prüfen;
3. Sperrung: Abmeldung, Sperrendpunkte und sofortige Ungültigkeit hängen von tatsächlichen Routen, Speicher, Schaltern und Anfrageergebnissen ab. Der RC bietet Sperrpfade, belegt aber keine sofortige Wirkung in jeder Bereitstellung;
4. Sitzungen: Cookie-Attribute, Gültigkeitsdauer und serverseitiger Zustand sind in der tatsächlichen Bereitstellung zu prüfen; das Frontend kann E-Mail-Adresse und Avatar unter `auth` speichern;
5. SSRF-Abwehr: Die RC enthält routenspezifische Zielprüfungen für Loopback-Adressen, private Netze, Cloud-Metadaten und Umleitungen. Die Abdeckung ist je Route zu prüfen; nicht alle Anfragen oder direkten Browserverbindungen werden erfasst.

## 7. Überblick über das Datenschutzdesign

1. Pseudonymisierung: Hash- und `anon_`-Kennungen können weiterhin personenbezogen sein; `auth` speichert unter anderem die E-Mail-Adresse im Browser;
2. Personalisierung und Auto DJ sind derzeit standardmäßig aktiv; das ersetzt keine vorherige Einwilligung. Auto DJ hat einen unabhängigen Schalter und kann weiterhin Starttitel und auszuschließende Titel senden; Abschalten der Personalisierung beendet nicht sämtliche Anfragen oder die gesonderte öffentliche Suchwortverwendung;
3. Löschgrenzen: Alte anonyme Kennungen, Radar, Suchaggregate, der gemeinsame Titelkatalog einschließlich eingebetteter Cover, externe Dienste und Backups können verbleiben; Fehler können trotz Erfolgsmeldung bestehen. Lokale Bereinigung ist keine vollständige entfernte Löschung;
4. Logminimierung: Anwendungszugriffsprotokolle sind reduziert; Fehler, Hostsystem, Proxys und Dritte können weitere Anfrageinformationen verarbeiten. IP-Adressen werden zur Ratenbegrenzung und Weiterleitung an die Engine verwendet; globale Null-Protokollierung ist nicht belegt.

Die vollständige Darstellung der Datenschutzzusagen finden Sie in der [Datenschutzerklärung](/de/privacy-policy/), die technischen Maßnahmen unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/).

## 8. Für wen das Projekt geeignet ist und für wen nicht

Geeignet: für einzelne Hörer, die sich mit ihrem eigenen Epomail-Konto anmelden möchten und die bekannten Einwilligungs- und Löschlücken des Testdienstes prüfen; für vielseitige Musikfans, die Multi-Source-Aggregationssuche und wortweise Lyrics benötigen; für Selbst-Hoster mit Linux- und Docker-Grundkenntnissen, die die Betreiberpflichten selbst übernehmen wollen.

Nicht geeignet: für Szenarien, die eine lizenzrechtliche Absicherung wie bei einem kommerziellen Musikdienst erwarten – das Projekt gewährt keinerlei Weiterlizenzierung von Inhalten; für Teams, die eine Service-Level-Agreement (SLA) oder kommerziellen Support erwarten; für Nutzer, die die Grundsätze „Hörproben transparent kennzeichnen, Ergänzung aus anderen Quellen nach bestem Bemühen“ nicht akzeptieren können.

## 9. Grenzen bei Inhalten und Urheberrecht

Sonic ist ein Werkzeug zum Suchen, Aggregieren und Abspielen; lokale Audioinhalte importierter oder heruntergeladener Dateien werden im Browser gespeichert, eingebettete Cover können jedoch als data URL mit Favoritenereignissen an einen entfernten gemeinsamen Titelkatalog übermittelt werden. Rechte an Aufnahmen, Lyrics, Covern, Künstlerbildern und anderen Inhalten liegen bei den jeweiligen Rechteinhabern. Technisch erreichbare Schnittstellen und eigene Mitgliedschaftsdaten wie `NETEASE_COOKIE` erteilen weder dem Betreiber noch seinen Nutzern zusätzliche Verbreitungsrechte. Auch kostenlose Lern- und Testzwecke sind keine automatische Urheberrechtsausnahme.

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
4. Faktabgleich: Alle Datenverarbeitungsaussagen dieser Website werden bei jedem Versionsupdate gegen den Quellcode (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts` usw.) abgeglichen; Abweichungen sind zu prüfen und zu korrigieren. Quellcode ersetzt weder zutreffende Information noch Rechtsgrundlagen; der Abgleich ist keine Prüfung der Produktivinstanz.

## 12. Häufige Fragen

**Ist der Dienst kostenpflichtig? Gibt es Werbung?**
Kostenlos, ohne Werbung und ohne In-App-Käufe; die Betriebskosten trägt die betreibende Einzelperson. Der Dienst erhebt keinerlei Daten zu Werbezwecken.

**Kann ich den Dienst ohne Anmeldung nutzen?**
Ja. Suche, Wiedergabe, Lyrics und Charts sind ohne Anmeldung nutzbar, aber nicht automatisch anonym. Es gibt keine allgemeine Cloud-Synchronisierung von Favoriten. Personalisierung und Auto DJ sind derzeit standardmäßig aktiv; Anmeldung ist keine Profiling-Einwilligung.

**Wo werden meine Daten gespeichert?**
Favoriten, Playlists, Einstellungen und `auth`-Nutzerdaten liegen im Browser; lokale Audioinhalte und eingebettete Cover werden in IndexedDB gespeichert, doch Cover als data URL können mit Favoritenereignissen an einen entfernten gemeinsamen Titelkatalog übermittelt werden, der in websiteweiter Suche oder öffentlichen Vorschlägen erscheinen kann. Titelmetadaten, Feedback und Empfehlungskontext können ebenfalls übermittelt werden. Der lokale Wiedergabeverlauf speichert bis zu 100 Titel, der lokale Suchverlauf bis zu 20 Einträge. Das Abschalten der Personalisierung beendet diese lokalen Verläufe nicht. Serverseitig bestehen auch Profile, Suchstatistiken und weitere Daten; 90 Tage sind keine universelle Löschfrist. Details in der [Datenschutzerklärung](/de/privacy-policy/), Abschnitte 4 und 6.

**Wie lösche ich mein Verhaltensprofil?**
Einstellungen → Datenschutz und lokale Daten → „Empfehlungsprofil und Nicht-interessant-Vermerke zurücksetzen“ oder `DELETE /api/sonic/events` betreffen nur Teile der aktuellen Identität. Auch „Alle lokalen Daten löschen“ garantiert keine vollständige entfernte Löschung; Fehler können unbemerkt bleiben. Für umfassende Anfragen kontaktieren Sie `privacy@epocanvas.com`. Die Oberfläche ist in der [Oberflächen- und Funktionsübersicht](/de/interface/), Abschnitt 9, beschrieben.

**Verfolgen mich die Empfehlungen?**
Empfehlungen verwenden Verhaltensprofiling zur Inhaltsreihenfolge, nicht für Werbeprofile. Abschalten beendet nicht jede Datenerhebung, insbesondere nicht die gesonderte Suchstatistik; privater Browsermodus verhindert keine Übermittlung. Standardmäßig aktive Personalisierung belegt keine wirksame Einwilligung.

**Warum sind manche Titel nur 30 Sekunden lang?**
Das ist der offizielle Hörprobenabschnitt der Plattform; der Player kennzeichnet ihn wahrheitsgemäß als Hörprobe und gibt ihn niemals als vollständigen Titel aus. Ist die Ergänzung aus anderen Quellen aktiviert, wird automatisch versucht, einen kostenlosen Volltitel zuzuordnen, dessen Quelle dann angegeben wird.

**Sind die Audioqualitäts-Abzeichen verlässlich?**
Ja. Das Abzeichen spiegelt die tatsächliche Stufe des aktuellen Audiostreams wider; ändern sich die vorgelagerten Stufen, folgt es in Echtzeit und weist nichts überhöht aus (siehe die [Nutzungsbedingungen](/de/terms-of-service/), Abschnitt 4).

**Welche Pflichten habe ich beim Selbst-Hosting?**
Wer Zwecke und Mittel der Verarbeitung bestimmt, trägt die entsprechenden Pflichten. Rein persönliche Tests und öffentliche Dienste sind getrennt zu prüfen; Information, Rechtsgrundlagen, Sicherheit und gegebenenfalls Aufzeichnungen und Folgenabschätzungen richten sich nach anwendbarem Recht. Der Einstiegspunkt steht unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 6.

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
