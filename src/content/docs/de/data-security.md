---
title: Datenverarbeitung und Sicherheitsmaßnahmen
description: Datenverarbeitung und Sicherheitsmaßnahmen von Sonic – Datenlebenszyklus, Verarbeitungsmatrix, vier Sicherheitsschichten, bekannte Grenzen, Reaktion auf Datenschutzverletzungen und Pflichten beim Selbst-Hosting.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite erläutert den Datenlebenszyklus des Sonic-Dienstes (nachfolgend „der Dienst“), die Art der einzelnen Verarbeitungstätigkeiten, die Sicherheitsmaßnahmen, die bekannten Grenzen und das Verfahren bei Datenschutzverletzungen. Sie entfaltet Abschnitt 10 der [Datenschutzerklärung](/de/privacy-policy/); die technischen Aussagen folgen der tatsächlichen Implementierung des Open-Source-Codes und lassen sich durch Quellcodeaudits nachprüfen.

![Vierschichtiges Sicherheitsgefüge von Sonic: Transportverschlüsselung, Authentifizierung und Signatur, SSRF-Abwehr am Edge, Speicherisolierung, ergänzt durch die Selbstbestimmung der Nutzer (Ein-Klick-Löschung, privater Modus, sofortige Sperrung bei Abmeldung)](/images/sonic/security-shield.svg)

*Abbildung: Die Schichten der Sicherheitsmaßnahmen des Dienstes. Die Transportschicht läuft durchgehend über TLS; die Authentifizierungsschicht besteht aus HMAC-SHA256-signierten Schlüsseln und PKCE-OAuth; die Edge-Schicht blockiert Intranet- und Metadaten-Adressen; die Speicherschicht wird durch Loopback-Bindung und verschlüsselten Tunnel isoliert. Rechts stehen die Steuerungen, die Sie selbst in der Hand haben.*

## 1. Datenlebenszyklus

| Phase | Erläuterung |
| --- | --- |
| Erhebung | über die Epomail-OAuth-Anmeldung werden Konto-Identifikationsdaten erlangt (keine Persistenz); Verhaltensereignisse werden stapelweise vom Player übermittelt (abschaltbar, höchstens 50 Ereignisse pro Stapel, 64 KB); für die anonyme Ratenbegrenzung wird die IP vorübergehend verwendet |
| Übertragung | durchgehend HTTPS/TLS; zwischen Kontrollebene und Datenebene der verschlüsselte Kanal von Cloudflare Tunnel mit erzwungener Validierung des Dienstschlüssels (X-Sonic-Engine-Key); der Client-Adress-Header von der Edge-Schicht zur Engine wird erst akzeptiert, nachdem die Engine den Dienstschlüssel geprüft hat |
| Speicherung | SQLite auf der Datenebene (WAL-Modus), abgelegt unter `/app/data/sonic-recommend.sqlite` im benannten Volume `sonic-data`; schlägt das Öffnen in der Produktionsumgebung fehl, wird der Dienst verweigert (fail-closed), kein stiller Abstieg |
| Nutzung | statistische Berechnungen, verknüpft über pseudonymisierte Bezeichner (Empfehlungen, Beliebtheit, Ähnlichkeit); keine manuelle Prüfung, keine Inhaltsprüfung, keine automatisierten Entscheidungen |
| Weitergabe | siehe das [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/); kein Verkauf, keine Nutzung für Werbung |
| Löschung | Verhaltensereignisse werden nach 90 Tagen automatisch vernichtet (Auslösung nach je 1500 Schreibvorgängen und zum Startzeitpunkt); die Ein-Klick-Löschung entfernt sofort; Ratenbegrenzungseinträge laufen nach 120 Sekunden ab |

## 2. Verarbeitungsmatrix

| Verarbeitungstätigkeit | Betroffene Daten | Identitätsbezug | Rechtsgrundlage | Speicherdauer |
| --- | --- | --- | --- | --- |
| Konto-Identifikation und Anmeldung | Epomail-Kennung, E-Mail, Nickname, Avatar-Link, Rolle | E-Mail (innerhalb der Sitzung) | Vertragserfordernis | keine Persistenz; Sitzungsdauer |
| Aufzeichnung von Verhaltensereignissen | Ereignistyp, kanonische Titelkennung, Künstler, Genre, Sprache, Suchbegriff, Fortschrittsanteil, Signalgewicht | pseudonymisierter Hash (`usr_`/`anon_`) | berechtigtes Interesse + Widerspruchsrecht | 90 Tage (Untergrenze 7 Tage) |
| Berechnung des Empfehlungsprofils | aggregierte Merkmale der Verhaltensereignisse (Langzeit-Künstler, Genreneigung, Sitzungsabsicht) | pseudonymisierter Hash | berechtigtes Interesse + Widerspruchsrecht | wird mit den Ereignissen vernichtet |
| Globale aggregierte Statistiken | Suchbegriffzähler, Titel-Kookkurrenz | kein Personenbezug | berechtigtes Interesse | mit der Datenbankwartung |
| Ratenbegrenzung und Missbrauchsprävention | IP (anonyme Buckets), E-Mail-Hash (Authentifizierungs-Buckets), Zähler je IP am Authentifizierungsendpunkt | vorübergehende Verwendung | berechtigtes Interesse | 120 Sekunden/60-Sekunden-Fenster |
| Sitzungs- und Schlüsselsicherheit | Sitzungs-Cookie, API-Schlüssel-Nutzlast (`sub`/`jti`/`kid` usw.), Sperrlisten | E-Mail-Hash | Vertragserfordernis, Sicherheitspflicht | höchstens 30 Tage |
| Datenbankbackups | konsistente Schnappschüsse pseudonymisierter Verhaltensdaten | pseudonymisierter Hash | Sicherheitspflicht | nach der Backup-Strategie des Bereitstellers |

## 3. Sicherheitsmaßnahmen

### 3.1 Übertragung und Zugang

1. Durchgehende Verschlüsselung: vom Browser zur Edge-Schicht und von der Edge-Schicht zur Datenebene jeweils TLS; die Datenebene ist über den verschlüsselten Kanal von Cloudflare Tunnel angebunden, ohne direkt offengelegte öffentliche Ports, auf Hostseite nur auf `127.0.0.1:8080` abgebildet;
2. Dienstübergreifende Validierung: die Datenebene erzwingt für alle Routen `/api`, `/proxy` und `/palette` die Validierung von X-Sonic-Engine-Key; die Engine entfernt nicht vertrauenswürdige eingehende Header und rekonstruiert den Client-Adress-Header aus der Socket-Adresse; Fälschungen laufen stets ins Leere;
3. Degradierung nur mit Kennzeichnung: Im Edge-Degradierungsmodus tragen Antworten den Header `X-Sonic-Degraded: 1`, und die Oberfläche zeigt den Hinweis synchron an; kein stiller Wechsel.

### 3.2 Authentifizierung und Schlüssel

1. OAuth-Ablauf: der Parameter `state` und PKCE (S256) verhindern Abfangen und Wiederholung des Autorisierungscodes; Transaktions-Cookies sind 600 Sekunden gültig und auf den Pfad `/api/auth` beschränkt; beim Rückruf werden state, PKCE, Autorisierungscode und Wiederholung geprüft; fehlt oder fehlerhaft eine der Stufen, wird ausnahmslos abgelehnt;
2. API-Schlüssel: versioniertes Format `sonic_live_v2`, HMAC-SHA256-Signatur; der Server vergleicht in konstanter Zeit mit Web Crypto `crypto.subtle.verify`; strenge Prüfung von Version, `kid`, `iat`/`exp` und `jti`; Schlüssel ohne Signatur und alte v1-Schlüssel werden ausnahmslos abgelehnt (fail-closed); Ausstellungsdauer 30 Tage, Validierungsgrenze 90 Tage; Schlüssel werden ausschließlich über Anforderungsheader übermittelt; der Kanal über den Abfrageparameter `?api_key=` wurde vollständig entfernt, damit Schlüssel nicht in Zugriffsprotokolle, Browserhistorie oder Referer gelangen;
3. Sperrmechanismus: die Abmeldung sperrt sofort die aktuelle Sitzung; die jti-Sperrliste, die Subjekt-Sperrliste und die globale untere Ausstellungszeitgrenze (`SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT`) unterstützen massenhafte Ungültigmachung; bei Anbindung an KV und aktiviertem `SONIC_ENABLE_KEY_REVOCATION=1` ist eine sofortige Sperrung möglich; ohne konfigurierte sofortige Sperrung antworten die betroffenen Endpunkte mit 501 und dem Hinweis auf das Listenverfahren, statt eine Sperrung vorzutäuschen;
4. Sitzungsattribute: `HttpOnly; Secure; SameSite=Lax`, gültig für höchstens 30 Tage; die Umleitung des Anmelde-Rückrufs trägt nur den Statusparameter `?auth=success` und gibt keinen Schlüssel zurück.

### 3.3 Abwehr ausgehender Anforderungen

1. SSRF-Blockierung: ausgehende Anforderungen an Loopback-Adressen, private RFC-1918-Netze, interne Docker-Bridges und Cloud-Metadaten-Adressen (z. B. `169.254.169.254`) werden ausnahmslos blockiert; die Prüfung erfolgt für IPv4 und IPv6 (Dual Stack); bei jeder Umleitung werden Ziel und DNS-Auflösung neu geprüft;
2. Domänen-Whitelist: der Audio-, Cover- und Weiterleitungs-Proxy erlaubt nur HTTPS-Ziele und Standardports innerhalb der kontrollierten Musik-CDN-Domänenliste (`SONIC_ALLOWED_MUSIC_DOMAINS`);
3. Anforderungsreinigung: Anforderungen an die vorgelagerte Quelle werden von `Set-Cookie` und Berechtigungsheadern befreit und tragen nur den festen User-Agent, den zugehörigen offiziellen Referer und den erforderlichen Range-Header; die ausgehende IP ist die vom Bereitsteller konfigurierte Platzhalteradresse (Standard: RFC-5737-Dokumentationsadresse), nicht die IP eines Nutzers.

### 3.4 Speicherung und Protokolle

1. Pseudonyme Speicherung: Verhaltensereignisse werden mit einseitigen Hash-Bezeichnern (SHA-256, gekürzt, mit den Präfixen `usr_`/`anon_`) verknüpft; es gibt keine Spalte für Klartext-E-Mails und keine IP-Spalte; die Speicherung umfasst insgesamt 6 Tabellen (kanonische Titeldaten, Plattform-Titelzuordnung, Volltextindex, Verhaltensereignisse, Titel-Kookkurrenz, Suchbegriff-Aggregation), von denen nur die Tabelle der Verhaltensereignisse einen Personenbezug hat;
2. fail-closed-Speicherung: Schlägt das Öffnen der Datenbank in der Produktionsumgebung fehl, wird der Dienst verweigert statt still herabgestuft; der Arbeitsspeicher-Fallback ist auf Entwicklungs- und Testzwecke oder die ausdrückliche Konfiguration `SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK=1` beschränkt;
3. Logminimierung: Die Zugriffsprotokolle der Datenebene sind zeilenweise JSON und enthalten nur Anforderungskennung, Methode, Pfad, Statuscode und Dauer; Abfragezeichenfolgen, IP, User-Agent, Cookies, Authorization und Anforderungskörper werden ausnahmslos nicht aufgezeichnet; unbehandelte Ausnahmen werden nur mit Anforderungskennung, Fehlernamen und gekürzter Meldung erfasst; die Protokolle gehen an die Standardausgabe von Docker, die Rotationsstrategie folgt der Docker-Konfiguration des Hosts; auf der Cloudflare-Seite gibt es kein vom Projekt selbst angelegtes globales Zugriffsprotokoll;
4. Backups: Datenbankbackups erfolgen als konsistente Schnappschüsse (VACUUM INTO) mit Integritätsprüfung; Backup-Dateien enthalten pseudonymisierte Verhaltensdaten und sind auf demselben Schutzniveau wie die Produktionsdaten zu halten;
5. Containerisolierung: Die Datenebene läuft als Docker-Container-Stack; der ncm-api-Hilfscontainer ist nur innerhalb des Compose-Netzwerks erreichbar (`ncm-api:3000`) und nicht öffentlich exponiert; die Berechtigungen der Datei `.env` sind auf 600 zu setzen.

### 3.5 Bekannte Grenzen

Der Dienst ist ein Open-Source-Projekt; der Betreiber legt die folgenden bekannten Grenzen offen und arbeitet an ihrer Verbesserung:

1. In Deployment-Formen ohne Anbindung an den nativen Cloudflare-Ratenbegrenzer erfolgt die Begrenzung über KV oder Prozessspeicherzähler und ist nicht streng global exakt;
2. Der Schutz vor DNS-Rebinding ist nicht vollständig ausgereift; Bereitsteller sollten ergänzende Maßnahmen auf Netzwerkebene vorsehen;
3. Das Cookie `sonic_session` enthält den signierten API-Schlüssel; der Diebstahl des Cookies gleicht dem Diebstahl des Schlüssels, weshalb Gerätesicherheit und zeitnahe Abmeldung geboten sind;
4. SQLite ist eine Ein-Schreiber-Architektur und für Deployment-Formen mit stark parallelen Schreibvorgängen ungeeignet;
5. Es gibt keinen eingebauten Prometheus-Metrik-Endpunkt; das Monitoring beruht auf Protokollen und externem Probing.

Die vollständige Liste dieser Grenzen steht in `docs/OPERATIONS.md` im Upstream-Repository; selbst gehostende Betreiber müssen sie nach ihrer Deployment-Form bewerten.

## 4. Reaktion auf Datenschutzverletzungen

1. Interne Erfassung: Jede Verletzung des Schutzes personenbezogener Daten wird erfasst (Artikel 33 Absatz 5 der DSGVO); die Einstufung als geringes Risiko befreit nicht von der Erfassung;
2. Meldung an die Aufsichtsbehörde: Droht der Verletzung ein Risiko für die betroffenen Personen, wird sie binnen 72 Stunden nach Kenntnis der zuständigen Aufsichtsbehörde am Ort des Betreibers gemeldet, mit Angaben zur Art der Verletzung, zu den Kategorien und dem Umfang der betroffenen Daten, zu den wahrscheinlichen Folgen und zu den ergriffenen Maßnahmen (Artikel 33 Absatz 1 und Absatz 3 der DSGVO);
3. Benachrichtigung der betroffenen Personen: Droht ein hohes Risiko, werden die betroffenen Personen ohne unangemessene Verzögerung durch eine Ankündigung auf der Website oder auf andere wirksame Weise benachrichtigt, mit Angaben zur Art der Verletzung und zu empfohlenen Maßnahmen (Artikel 34 der DSGVO); ist das Risiko wirksam beseitigt, sodass ein hohes Risiko nicht mehr besteht, kann auf die Benachrichtigung verzichtet werden, wobei die Gründe der Entscheidung zu protokollieren sind;
4. Maßnahmen: sofortige Isolierung der betroffenen Systeme, Sperrung der betroffenen Schlüssel und Sitzungen (einschließlich jti-Sperrliste und globaler unterer Ausstellungszeitgrenze), Bewertung und Behebung der Ursache, Protokollierung des gesamten Verfahrens.

## 5. Datenschutz durch Technikgestaltung und Voreinstellungen

Der Dienst setzt bereits bei der Konstruktion folgende Maßnahmen um (Artikel 25 der DSGVO):

1. Pseudonymisierung als Voreinstellung: Verhaltensereignisse werden ab der Erhebung mit Hash-Bezeichnern verknüpft, E-Mail-Adressen werden nicht persistiert, die Datenbank hat keine IP-Spalte;
2. Null-Erhebungs-Modus: Bei ausgeschalteter Personalisierung werden Ereignisse nicht gespeichert, im öffentlichen Modus serverseitig sofort verworfen, und die Antwort weist die Anzahl der ignorierten Ereignisse wahrheitsgemäß aus;
3. Minimale Clientdaten: Der Empfehlungskontext trägt nur begrenzte Zahlen von Favoriten, letzten Künstlern und Suchbegriffen, wird nur im Arbeitsspeicher verwendet und nicht persistiert; der Player liest und schreibt `document.cookie` nicht, Schlüssel gelangen nicht ins localStorage;
4. Standardmäßig abgeschaltete Hochrisiko-Kanäle: Der aggregierte Upstream von Drittanbietern (GDStudio, Lyriva) und die Umgehungskanäle sind standardmäßig strikt abgeschaltet und wirken erst nach ausdrücklicher Aktivierung durch den Bereitsteller (Umgebungsvariable auf 1);
5. Ein-Klick-Löschung: Das Löschungsrecht wird unmittelbar als Selbstbedienungsfunktion umgesetzt, ohne manuellen Antrag; „Alle lokalen Daten löschen“ entfernt zugleich das serverseitige Profil, localStorage, sessionStorage und IndexedDB.

## 6. Pflichten selbst gehostender Betreiber

Ab dem Zeitpunkt, zu dem Sie den Dienst selbst bereitstellen, sind Sie der Verantwortliche für Ihre Nutzer und müssen folgende Pflichten erfüllen:

1. Informationspflicht: Ihre Nutzer über die Datenverarbeitung informieren (die [Datenschutzerklärung](/de/privacy-policy/) dieser Website kann als Grundtext dienen);
2. Verzeichnis von Verarbeitungstätigkeiten: ein Verzeichnis der Verarbeitungstätigkeiten führen (Artikel 30 der DSGVO);
3. Folgenabschätzung: bei möglicherweise hohem Risiko eine Datenschutz-Folgenabschätzung durchführen (Artikel 35 der DSGVO); der Prüfumfang umfasst mindestens: anonyme Gerätebezeichner, Verhaltensereignisse, die vorübergehende Verwendung von IPs für die Ratenbegrenzung und die Hash-Ableitung der OAuth-E-Mail;
4. Konfigurationsabgleich: prüfen, dass folgende Parameter mit den Zusagen Ihrer Erklärung übereinstimmen: Aufbewahrungstage für Verhaltensereignisse (`SONIC_RECOMMEND_RETENTION_DAYS`, Standard 90, Untergrenze 7), Persistenzpfad (`SONIC_RECOMMEND_DB_PATH`, mit `memory` wird die Persistenz abgeschaltet), Schalter für den Arbeitsspeicher-Fallback (`SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK`), Schalter für Drittanbieter-Kanäle (`SONIC_ENABLE_GDSTUDIO` usw.), Ratenbegrenzungsparameter (`SONIC_RATE_LIMIT_ANON_RPM`/`SONIC_RATE_LIMIT_AUTH_RPM`);
5. Sicherheitsmaßnahmen und Aufsicht: die Konfiguration nach Abschnitt 3 umsetzen (einschließlich Dienstschlüssel mit mindestens 32 Zeichen, `.env`-Berechtigungen 600, keine öffentliche Exposition der Datenebene) und sich nach dem Recht an Ihrem Standort der Prüfung und Aufsicht durch die zuständigen Stellen unterwerfen.

## 7. Auditsbarkeit

Die Sicherheitssaussagen des Dienstes lassen sich am Quellcode verifizieren: Sämtliche Verarbeitungslogik, Schalter-Standardwerte, Speicherstrukturen und Protokollformen sind im Open-Source-Repository offengelegt; das Upstream-Repository enthält zusätzlich die Nachbesserungsaufzeichnungen des Sicherheitsaudits (`docs/AUDIT_REMEDIATION.md`) und das Betriebshandbuch (`docs/OPERATIONS.md`). Die technischen Aussagen der Dokumente dieser Website werden bei jedem Versionsupdate abgeglichen; weicht der Quellcode ab, ist er maßgeblich, und die Dokumente werden unverzüglich korrigiert.
