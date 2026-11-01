---
title: Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen
description: Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen von Sonic – Auftragsverarbeiter, Identitätsanbieter, Upstream-Inhaltsquellen, optionale Kanäle, gesetzliche Anforderungen und Garantien bei internationalen Übermittlungen.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite führt vollständig auf, in welchen Fällen der Sonic-Dienst (nachfolgend „der Dienst“) personenbezogene Daten an Dritte weitergibt, einschließlich der Empfänger, der betroffenen Daten und der Garantiemechanismen. Sie entfaltet Abschnitt 7 der [Datenschutzerklärung](/de/privacy-policy/); das Weitergabeprinzip lautet Mindestnotwendigkeit: kein Verkauf personenbezogener Daten, keine Weitergabe für Werbung, kein Umfang über den für die Dienstfunktionen Erforderlichen hinaus.

![Karte der Drittanbieter-Weitergabe von Sonic: sechs Kanäle (Auftragsverarbeiter, Identitätsanbieter, Upstream-Inhaltsquellen, optionale Anbieter, gesetzliche Anforderungen, internationale Übermittlungen), jeweils um den Betreiber zentriert und mit den Standardwerten der Schalter gekennzeichnet](/images/sonic/sharing-map.svg)

*Abbildung: Die sechs Weitergabe-Kanäle. Kategorie A ist die dauerhaft im Einsatz befindliche Auftragsverarbeitung; Kategorie B die für die Anmeldung erforderliche Identitätsprüfung; Kategorie C die abfragegesteuerte Inhaltsbeschaffung ohne Nutzeridentität; Kategorie D ist standardmäßig abgeschaltet; Kategorie E sind die gesetzlichen Ausnahmen; Kategorie F die Garantiemechanismen für grenzüberschreitende Übermittlungen.*

## 1. Auftragsverarbeiter (dauerhaft im Einsatz)

| Empfänger | Dienstleistung | Betroffene Daten | Garantiemechanismus |
| --- | --- | --- | --- |
| Cloudflare Pages und Functions | Frontend-Hosting, Edge-API-Gateway, Ausführung der Ratenbegrenzung | Anforderungsmetadaten, temporäre Ratenbegrenzungseinträge | Auftragsverarbeitungsklausel nach Artikel 28 der DSGVO |
| Cloudflare Tunnel | verschlüsselter Kanal zwischen Kontrollebene und Datenebene | verschlüsselte Verkehrsmetadaten | wie oben |
| Cloudflare KV und Ratenbegrenzer | Ratenbegrenzungszähler (Ablauf nach 120 Sekunden), Einträge zur sofortigen Schlüsselsperrung (falls aktiviert) | IP-Ratenbegrenzungsschlüssel, `jti`-Sperrungen | wie oben |

Cloudflare hält insgesamt die Zertifizierungen SOC 2 Type II und ISO/IEC 27001 und deckt grenzüberschreitende Übermittlungen mit den EU-Standardvertragsklauseln ab. Wie Cloudflare Metadaten der Netzwerkschicht nach seiner eigenen Richtlinie verarbeitet, ist in seiner Datenschutzerklärung beschrieben.

## 2. Identitätsanbieter (für die Anmeldung erforderlich)

| Empfänger | Dienstleistung | Betroffene Daten | Erläuterung |
| --- | --- | --- | --- |
| Epomail (`mail.epocanvas.com`) | Anmeldung und Identitätsprüfung über OAuth 2.0 (PKCE): Autorisierung, Tokenaustausch, userinfo-Abfrage (mit Zugriffstoken) | bei der Anmeldung zurückgegeben: Nutzerkennung, E-Mail-Adresse (verifiziert), Nickname, Avatar-Link, Kontorolle | die E-Mail wird nicht in die Datenbank des Dienstes geschrieben und nur zur Hash-Ableitung innerhalb der Sitzung verwendet; für die Datenverarbeitung zwischen Ihnen und Epomail gilt dessen Datenschutzerklärung |

## 3. Upstream-Inhaltsquellen (abfragegesteuert, ohne Nutzeridentität)

Die Anforderungen an die folgenden Empfänger enthalten ausschließlich Song-Abfrageparameter, einen festen User-Agent und den jeweiligen offiziellen Referer und enthalten **keine Kontodaten, Cookies oder IP-Adressen**:

| Empfänger | Dienstleistung | Beispiel-Domains | Standardstatus |
| --- | --- | --- | --- |
| NetEase Cloud Music | Suche, Abspieladressen, wortweise Lyrics (YRC), Cover | `music.163.com`, `interface3.music.163.com`; zudem über den ncm-api-Hilfscontainer im Datenebenen-Intranet | aktiviert |
| QQ Music | Suche, Abspieladressen, wortweise Lyrics (QRC), Cover | `c.y.qq.com`, `u.y.qq.com`, `y.gtimg.cn`, `ws.stream.qqmusic.qq.com` | aktiviert |
| Kugou Music | Suche, Abspieladressen, wortweise Lyrics (KRC) | `m.kugou.com`, `mobilecdn.kugou.com`, `songsearch.kugou.com`, `lyrics.kugou.com` | aktiviert |
| Kuwo Music | Suche, Abspieladressen, Cover | `www.kuwo.cn`, `m.kuwo.cn`, `search.kuwo.cn` | aktiviert |
| AMLL | Ergänzung wortweiser Lyrics (TTML) | `api.amll.dev` | aktiviert |
| LRCLIB | Ergänzung synchronisierter Lyrics | `lrclib.net` | aktiviert |
| die offiziellen Inhalts-CDNs | Audiostreams und Cover (standardmäßig über den Edge-Proxy des Dienstes bezogen) | `music.126.net`, `ws.stream.qqmusic.qq.com` usw. | aktiviert |

Erläuterungen:

1. Die ausgehende IP der Upstream-Anforderungen ist die vom Bereitsteller konfigurierte Platzhalteradresse (Standard: RFC-5737-Dokumentationsadresse), nicht die IP eines Nutzers;
2. Audiostreams werden standardmäßig über den Edge-Proxy bezogen; das vorgelagerte CDN sieht nur die Adresse des Proxyservers. Rufen Sie selbst den Direktverbindungsmodus `?mode=redirect` auf, baut Ihr Browser die Verbindung direkt zum CDN auf, und Ihre IP ist für dieses CDN sichtbar (inhärente Bedeutung der 302-Umleitung); der Webplayer verwendet diesen Modus nicht;
3. Der Bereitsteller kann mit eigenen Mitgliedschaftsnachweisen (`NETEASE_COOKIE`/`QQ_COOKIE`/`KUGOU_COOKIE`) seinen lizenzierten Katalog einbinden; diese Nachweise sind Kontodaten des Bereitstellerkontos, haben mit Endnutzern nichts zu tun, und der Code enthält von Haus aus keinerlei echte Konto-Cookies.

## 4. Optionale Kanäle und Standardstatus

Die vier Dienste GDStudio, Lyriva, ListenBrainz/MusicBrainz und Gorse sind standardmäßig abgeschaltet und werden erst nach ausdrücklicher Aktivierung durch den Bereitsteller genutzt. Ihre Schalter stehen in der folgenden Tabelle. Die Ergänzung über Quellen hinweg ist davon getrennt: Sie ist standardmäßig aktiviert und hat keinen Deaktivierungsschalter.

| Empfänger | Dienstleistung | Betroffene Daten | Schalter und Standardwert |
| --- | --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | aggregierte Suche von Drittanbietern und Ergänzungsquelle über Quellen hinweg | nur Titelkennung, Typ und Quellparameter | `SONIC_ENABLE_GDSTUDIO`, Standard 0 |
| Lyriva (`api.lyriva.xyz`) | Ersatzquelle für Lyrics | nur Titelkennungsparameter | `SONIC_ENABLE_LYRIVA`, Standard 0 |
| ListenBrainz / MusicBrainz (`labs.api.listenbrainz.org` usw.) | Erweiterung ähnlicher Künstler | nur Künstler-/Aufnahmenkennung | `SONIC_ENABLE_LISTENBRAINZ`, Standard 0 |
| Ergänzung über Quellen hinweg (separater Kanal) | plattformübergreifende Volltitel-Zuordnung für Hörprobentitel (kostenlose Volltitel von QQ/Kugou/Kuwo) | nur Titelmetadaten (Dauer, Titel, Künstler) | standardmäßig aktiviert; kein Deaktivierungsschalter, ohne Identitätsdaten |
| Gorse (vom Bereitsteller selbst betriebene Empfehlungsengine) | externes Collaborative Filtering | pseudonymisierte Hash-Bezeichner (`subject_key`) und Verhaltensfeedback | `SONIC_GORSE_URL`, Standard leer |

## 5. Weitergabe auf gesetzliche Anforderung

Der Betreiber gibt personenbezogene Daten nur heraus, wenn ein Verlangen eine konkrete Rechtsgrundlage hat: Er prüft die Rechtmäßigkeit und den Umfang des Verlangens, gibt von sich aus nichts über den Verlangensumfang hinaus heraus und benachrichtigt die betroffenen Personen vorab, soweit das Recht dies zulässt (ausgenommen, wenn eine Rechtsvorschrift die Benachrichtigung verbietet). Der Dienst akzeptiert keine beliebigen Abrufe ohne Rechtsgrundlage. Der Verfahrensgang sämtlicher gesetzlicher Verlangen wird aktenkundig erfasst.

## 6. Internationale Übermittlungen

Die Kontrollebene des Dienstes läuft auf dem globalen Edge-Netzwerk von Cloudflare; die Verhaltensereignisse liegen auf dem Datenebenenknoten des Betreibers. Ihre personenbezogenen Daten können an Knoten außerhalb des Landes des Betreibers verarbeitet werden. Garantiemechanismen der Übermittlung:

1. nach Artikel 44 bis 46 der DSGVO: Angemessenheitsbeschluss der Europäischen Kommission (Artikel 45) oder genehmigte Standardvertragsklauseln (Artikel 46 Absatz 2 Buchstabe c der DSGVO) als Grundlage der Hosting- und Auftragsverarbeitungsverhältnisse;
2. Stützung auf die Datenschutz-Zertifizierungen von Cloudflare (SOC 2 Type II, ISO/IEC 27001) und deren Datenverarbeitungsanhang;
3. die Anforderungen an die Upstream-Inhaltsquellen enthalten keine personenbezogenen Daten und stellen keine internationale Übermittlung personenbezogener Daten dar (siehe Abschnitt 3).

Selbst gehostende Betreiber müssen die internationalen Übermittlungen ihrer Deployment-Form selbst bewerten und deren Vereinbarkeit mit den Rechtsanforderungen an ihrem Standort sicherstellen (Kapitel V der DSGVO oder die entsprechende Regelung vor Ort).

## 7. Pflege des Verzeichnisses

1. Vor der Aufnahme eines neuen Weitergabeempfängers trägt der Betreiber ihn auf dieser Seite ein und aktualisiert das Inkrafttretensdatum und die Versionsnummer; wesentliche Änderungen werden vorab durch eine Ankündigung auf der Website mitgeteilt;
2. Weicht dieses Verzeichnis von der Quellcodekonfiguration ab, ist der Quellcode maßgeblich, und diese Seite wird unverzüglich korrigiert;
3. Selbst gehostende Betreiber müssen nach ihrer tatsächlichen Konfiguration ihr eigenes Verzeichnis Dritter pflegen: Nicht aktivierte Kanäle sind aus ihren Informationen zu streichen, um Überoffenlegung oder falsche Offenlegung zu vermeiden.
