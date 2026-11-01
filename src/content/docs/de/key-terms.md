---
title: Begriffsdefinitionen
description: Begriffsdefinitionen der rechtlichen Dokumente von Sonic – Definitionen der Rechtsbegriffe (DSGVO-Vokabular) und der technischen Begriffe, einheitlich auf der gesamten Website verwendet.
---

**Datum des Inkrafttretens: 1. November 2026｜Version: 1.4**

Diese Seite definiert die Rechts- und Fachbegriffe der rechtlichen Dokumente dieser Website. Derselbe Begriff hat in allen Dokumenten dieselbe Bedeutung; definierte Begriffe sind nach ihrer Definition auszulegen, undefinierte nach ihrer üblichen Bedeutung. Die Rechtsbegriffe stützen sich auf die Definitionen der EU-Datenschutz-Grundverordnung (DSGVO).

![Begriffskarte von Sonic: zwei Begriffsfamilien, die Familie der Rechtsbegriffe (DSGVO-Vokabular) und die Familie der technischen Begriffe, einheitlich auf der gesamten Website verwendet, ausgelegt nach der maßgeblichen vereinfacht chinesischen Fassung](/images/sonic/key-terms-map.svg)

*Abbildung: Die Familienstruktur der Begriffe dieser Website. Die Familie der Rechtsbegriffe verankert sich in den Definitionen von Artikel 4 der DSGVO; die Familie der Fachbegriffe richtet sich nach der Quellcodeimplementierung und wird bei jedem Versionsupdate abgeglichen.*

## 1. Rechtsbegriffe

| Begriff | Definition |
| --- | --- |
| personenbezogene Daten | alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen (Artikel 4 Absatz 1 der DSGVO); in Sonic etwa die Anmeldekennung und die Verhaltensereignisaufzeichnungen |
| Verarbeitung | jedes mit personenbezogenen Daten vorgenommene Verfahren wie Erhebung, Erfassung, Speicherung, Verwendung, Übermittlung und Löschung (Artikel 4 Absatz 2 der DSGVO) |
| Einschränkung der Verarbeitung | Zustand, in dem die Verarbeitung in bestimmten Fällen vorübergehend eingestellt wird, die Daten jedoch aufbewahrt bleiben (Artikel 4 Absatz 3 und Artikel 18 der DSGVO) |
| Profiling | jede automatisierte Verarbeitung zur Bewertung persönlicher Aspekte und darauf gestützte Entscheidungen oder Analysen (Artikel 4 Absatz 4 der DSGVO); der Dienst tut dies nur im für die Empfehlungsfunktion notwendigen Umfang, und Sie können das Profil mit einem Klick löschen |
| Pseudonymisierung | Verarbeitung personenbezogener Daten so, dass sie ohne Hinzuziehung zusätzlicher Informationen keiner spezifischen betroffenen Person zugeordnet werden können (Artikel 4 Absatz 5 der DSGVO); Sonic setzt dies mit gesalzenen, gekürzten SHA-256-Hashs um |
| Verantwortlicher | die natürliche oder juristische Person, die über Zwecke und Mittel der Verarbeitung entscheidet (Artikel 4 Absatz 7 der DSGVO); bei der gehosteten Instanz das Betreiberteam, bei selbst gehosteten Instanzen der Bereitsteller |
| Auftragsverarbeiter | die natürliche oder juristische Person, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet (Artikel 4 Absatz 8 der DSGVO), etwa Cloudflare |
| Empfänger | die natürliche oder juristische Person, der personenbezogene Daten offengelegt werden (Artikel 4 Absatz 9 der DSGVO), unabhängig davon, ob es sich um einen Dritten handelt |
| Dritter | jede Person außer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den zur Verarbeitung befugten Personen (Artikel 4 Absatz 10 der DSGVO) |
| Einwilligung | eine Willensbekundung der betroffenen Person, die freiwillig und in Kenntnis der Sachlage abgegeben wird (Artikel 4 Absatz 11 und Artikel 7 der DSGVO); sie kann jederzeit mit nicht geringerem Aufwand als bei ihrer Erteilung widerrufen werden |
| Verletzung des Schutzes personenbezogener Daten | eine Sicherheitsverletzung, die zur unbeabsichtigten oder unrechtmäßigen Vernichtung, zum Verlust, zur Veränderung, zur unbefugten Offenlegung oder zum unbefugten Zugriff auf personenbezogene Daten führt (Artikel 4 Absatz 12 der DSGVO) |
| zuständige Aufsichtsbehörde | die unabhängige öffentliche Stelle, die die Einhaltung der Datenschutzpflichten überwacht (Artikel 4 Absatz 19 der DSGVO); Nutzer in der EU können sich an die Aufsichtsbehörde ihres Ortes wenden (Artikel 77 der DSGVO) |
| Übermittlung in Drittländer | Übermittlung personenbezogener Daten an Drittländer oder internationale Organisationen außerhalb der Europäischen Union und des Europäischen Wirtschaftsraums (Kapitel V der DSGVO) |
| besondere Kategorien von Daten | personenbezogene Daten, die etwa Ethnizität, politische Ansichten, Gesundheit und Sexualleben offenlegen (Artikel 9 der DSGVO); der Dienst erhebt sie nicht |
| betroffene Person | die identifizierte oder identifizierbare natürliche Person, auf die sich die personenbezogenen Daten beziehen (Artikel 4 Absatz 25 der DSGVO), das heißt Sie |

## 2. Fachbegriffe

| Begriff | Definition |
| --- | --- |
| Kontrollebene | das auf Cloudflare Pages Functions laufende Edge-Gateway, zuständig für Routing, Ratenbegrenzung, Caching und Circuit Breaker |
| Datenebene | der auf dem eigenen Linux-Knoten des Betreibers laufende Docker-Compose-Stack, zuständig für Protokollparsen, Empfehlungsberechnung und Speicherung |
| sonic-engine | Hauptcontainer der Datenebene (Node.js 22); erzwingt die Validierung des Dienstschlüssels X-Sonic-Engine-Key und bindet sich auf Hostseite nur an die Loopback-Adresse |
| ncm-api Sidecar | netzintern abgeschotteter NetEase-Protokoll-Hilfscontainer (`ncm-api:3000`), nur über das Compose-Netzwerk erreichbar |
| OAuth 2.0 + PKCE | Anmeldeverfahren aus Authorization-Code-Modus mit Proof Key for Code Exchange (S256); der Dienst verwendet Epomail als Identitätsanbieter |
| API-Schlüssel | versionierter, HMAC-SHA256-signierter Schlüssel im Format `sonic_live_v2.<header>.<payload>.<signature>`; die Nutzlast enthält `sub`/`iat`/`exp`/`jti`/`kid`/`role`/`uid`; Übermittlung ausschließlich über Anforderungsheader |
| jti | die Schlüsselkennung in der API-Schlüssel-Nutzlast, verwendet für die Sperrliste und das sofortige Erlöschen bei Abmeldung |
| fail-closed | Sicherheitsstrategie, bei der ein fehlgeschlagener Validierungsdurchgang die Dienstleistung verweigert; Sonic wendet fail-closed auf Schlüssel ohne Signatur, alte Schlüsselversionen und Speicherstörungen in der Produktionsumgebung an |
| SSRF-Abwehr | Blockierung ausgehender Anforderungen an Loopback-Adressen, private RFC-1918-Netze, Docker-Bridges und Cloud-Metadaten-Adressen; Prüfung für IPv4/IPv6 (Dual Stack); Neuprüfung bei Umleitungen |
| Domänen-Whitelist | der Audio-, Cover- und Weiterleitungs-Proxy erlaubt nur HTTPS-Ziele innerhalb der kontrollierten Musik-CDN-Domänenliste (`SONIC_ALLOWED_MUSIC_DOMAINS`) |
| SQLite WAL | persistenter Speicher für Verhaltensereignisse und Entitätsgewichte auf der Datenebene, im Write-Ahead-Logging-Modus, abgelegt im benannten Volume `sonic-data` |
| Circuit Breaker | dreizuständige Zustandsmaschine (CLOSED/OPEN/HALF_OPEN); nach 3 aufeinanderfolgenden Fehlern oder Überschreitung des Budgets von 4,5 Sekunden öffnet er, und nach 30 Sekunden Abklingzeit stellt Probing wieder her |
| Edge-Degradierungsmodus | Notfallzustand, in dem die Edge-Schicht bei Ausfall der Datenebene direkt die öffentlichen Lyrics- und Suchschnittstellen verbindet; Antworten tragen den Header `X-Sonic-Degraded: 1`, und die Oberfläche zeigt den Degradierungshinweis |
| Edge-Cache | Edge-Cache mit den Schlüsseln `sonic:*`, Frischefenster 8 Minuten; nach Ablauf Übergang in den verlängerten Notfallzustand |
| Range 206 | HTTP-Mechanismus für segmentiertes Laden; Audiostreams werden standardmäßig über den Edge-Proxy mit 206 Partial Content beantwortet |
| Direktverbindungsmodus | 302-Umleitung mit `?mode=redirect`, bei der Ihr Browser die Verbindung direkt zum offiziellen CDN aufbaut; der Webplayer verwendet ihn nicht |
| YRC/QRC/KRC | die wortweisen Lyrics-Formate von NetEase, QQ und Kugou; der Dienst parst ihre Verschlüsselungs- und Kompressionshülle nativ (XOR + Deflate) |
| TTML | das Zeitachsen-Markupformat der wortweisen Lyrics von AMLL |
| LRCLIB | die globale offene Datenbank synchronisierter Lyrics, als Ergänzungsquelle, wenn lokale Lyrics fehlen |
| Hörprobenerkennung | Prüfung der Länge und Metadaten der Audio-Entität, um offizielle 30-Sekunden-Hörproben zu erkennen und ausdrücklich zu kennzeichnen |
| Ergänzung über Quellen hinweg | Mechanismus, der bei Hörprobentiteln eine plattformübergreifende Volltitel-Zuordnung auslöst; standardmäßig aktiviert, bei Erfolg wird die Ersatzquelle angegeben |
| Verhaltensereignisse | Aufzeichnungen der Empfehlungssignale wie Wiedergabe, vollständig abgespielt, übersprungen, favorisiert, abgelehnt; höchstens 50 Ereignisse pro Stapel, 64 KB; Rauschereignisse (Stocken, Wechsel nach Hörprobenabbruch) werden nicht gespeichert |
| Ein-Klick-Löschung des Profils | `DELETE /api/sonic/events` vernichtet sofort sämtliche Verhaltensmerkmale und Aufzeichnungen in der Empfehlungsengine |
| Profilübersicht | die Zusammenfassung des Profils aus `GET /api/sonic/events`: Gesamtzahl der Ereignisse, Zähler für Favoriten und Ablehnungen, häufig gehörte Künstler, Genreneigung, letzte Suchbegriffe, Speicherform |
| X-Sonic-Context | der lokale Clientkontext, den Empfehlungsanforderungen beilegen (begrenzte Zahlen von Favoriten, letzten Künstlern und Suchbegriffen); nur Arbeitsspeichernutzung, keine Persistenz |
| Rauschfilter | serverseitiger Mechanismus, der Titelwechsel aus 6 nicht nutzerseitigen Ursachen (network_stall/playback_error/trial_end/stream_unavailable/buffer_timeout/auto_switch_error) auf das Gewicht null setzt und nicht speichert |

## 3. Auslegungsgrundlage

1. Rechtsbegriffe sind nach dem offiziellen DSGVO-Text auszulegen; Fachbegriffe nach der Quellcodeimplementierung. Weicht der Quellcode von diesem Dokument ab, ist das Dokument zu korrigieren und im Repository ein Issue zu eröffnen.
2. Die rechtsverbindliche Fassung der rechtlichen Dokumente dieser Website ist die vereinfacht chinesische Version; für die Übersetzung der Begriffe in der englischen, japanischen und deutschen Fassung sind die Entsprechungen auf dieser Seite maßgeblich.
