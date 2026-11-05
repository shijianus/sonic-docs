---
title: Offene Plattform und API-Anbindung
description: Anbindung an die offene API von Sonic – einheitliche Antwortstruktur, Endpunkt-Navigation, API-Key-Authentifizierung und Übermittlungsregeln, Ratenbegrenzung und Sperrung.
---

**Überarbeitet am: 3. November 2026｜Version: 1.9**

Diese Seite beschreibt die Anbindung an die offene API von Sonic: einheitliche Antwortstruktur, Kernendpunkte, API-Key-Authentifizierung und Übermittlungsregeln, Ratenbegrenzung und Sperrung. Das Integrationsverhalten unterliegt den [Nutzungsbedingungen](/de/terms-of-service/) und der [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/); die maßgebliche Darstellung der Endpunktspezifikationen findet sich in `API.md` im Upstream-Repository.

Der gehostete Dienst ist ein kostenloses, individuell betreutes gemeinnütziges Testprojekt ohne SLA oder Wiederherstellungsgarantie. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version. Standardmäßig aktiviertes Profiling ist keine Einwilligung; das Zurücksetzen ist unvollständig und kann Fehler verbergen; der Widerruf von Zugangsdaten hängt von Konfiguration und erfolgreicher Anfrage ab. Übermitteln Sie keine unnötigen Daten oder Zugangsdaten.

## 1. Einheitliche Antwortstruktur

Die derzeit beschriebene Standardantwort verwendet `brand: "Sonic"`; dies ist keine Zusage dauerhafter API-Kompatibilität oder eines Service-Levels:

```json
{
  "brand": "Sonic",
  "data": { "id": "191254", "title": "红豆", "quality": "320k" },
  "meta": {
    "cached": true,
    "cacheLevel": "edge",
    "provider": "nexus",
    "degraded": false,
    "circuitState": "CLOSED"
  }
}
```

Die Felder unter `meta` kennzeichnen wahrheitsgemäß die Cache-Ebene, den Anbieter, den Degradierungszustand und den Zustand des Circuit Breaker; Clients können darauf transparente Hinweise stützen.

## 2. Kernendpunkte im Überblick

| Kategorie | Methode | Endpunkt | Funktion |
| --- | --- | --- | --- |
| Intelligente Empfehlungen | GET | `/api/sonic/recommend/for-you` | Empfohlen für dich/Auto DJ |
| | GET | `/api/sonic/recommend/trending` | Trending-Charts (24h/7d/surging/new) |
| | GET | `/api/sonic/recommend/similar` | ähnliche Titel/Künstler-Erkundung |
| | GET | `/api/sonic/recommend/discover` | Genre-Radar |
| Verhaltensereignisse | POST | `/api/sonic/events` | Verhaltensereignisse übermitteln (Stapel von höchstens 50)  |
| | GET | `/api/sonic/events` | Übersicht des Empfehlungsprofils abfragen  |
| | DELETE | `/api/sonic/events` | Teile der Ereignisse und Rückmeldungen der aktuellen Identität löschen; keine vollständige Profil- oder Backuplöschung  |
| Aggregierte Suche | GET | `/api/sonic/search/smart` | intelligente hybride Suche und Vervollständigung |
| | GET | `/api/sonic/search/nexus` | parallele Multi-Source-Recherche im ganzen Netz |
| Wortweise Lyrics | GET | `/api/sonic/lyrics/nexus` | wortweise Lyrics (YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | plattformübergreifende synchronisierte Lyrics (Ausgabe in mehreren Formaten) |
| Audio-Medien | GET | `/api/music/stream` | Audio-Segmentproxy (Range/206; `?mode=redirect` Direktverbindung) |
| | GET | `/api/music/cover` | Cover-Proxy (hohe Qualität zuerst, SVG-Rückfallebene) |
| | GET | `/api/music/palette` | Farbtemperaturanalyse des Covers |
| Authentifizierung | GET | `/api/auth/user` | Profil der aktuellen Sitzung |
| | GET/POST | `/api/auth/key` | API-Schlüssel ansehen/neu ausstellen |
| | POST | `/api/auth/revoke` | Sperrversuch abhängig von Sperrspeicher und Anfrageerfolg; ausdrücklicher Schlüsselheader erforderlich |
| | POST | `/api/auth/logout` | aktuelles Cookie entfernen; entfernte Sperrung ist konfigurations- und erfolgsabhängig |

## 3. API-Key-Authentifizierung

1. Format: versioniertes Format `sonic_live_v2.<header>.<payload>.<signature>` mit HMAC-SHA256-Signatur; die Nutzlast enthält `sub` (E-Mail-Adresse), `iat`, `exp`, `jti`, `kid`, `role`, `uid`; eine Signatur verschlüsselt diese Angaben nicht;
2. Ausstellung: nach der Anmeldung über Epomail OAuth unter `/api/auth/key` zu beziehen; standardmäßige Ausstellungsdauer 30 Tage; 90 Tage sind nur die Obergrenze des Validators, keine Dauer für eine Neuausstellung;
3. Übermittlung: nur über Anforderungsheader erlaubt, nämlich `X-Sonic-Key: <key>` oder `Authorization: Bearer <key>`; der Kanal über URL-Abfrageparameter wurde vollständig entfernt, damit Schlüssel nicht in Zugriffsprotokolle, Browserhistorie oder Referer gelangen;
4. Validierung: Der Server vergleicht in konstanter Zeit mit Web Crypto und prüft streng Version, `kid`, `iat`/`exp`, `jti` und die Sperrlisten; Schlüssel ohne Signatur und Schlüssel alter Versionen werden ausnahmslos abgelehnt (fail-closed).

## 4. Ratenbegrenzung und Sperrung

| Posten | Obergrenze |
| --- | --- |
| Anonyme Anforderungen | 240 pro Minute (Standardwert) |
| Authentifizierte Anforderungen | 600 pro Minute (Standardwert) |
| Authentifizierungsendpunkt | 30 pro Minute und IP |
| Übermittlung von Verhaltensereignissen | höchstens 50 Ereignisse pro Stapel, Anforderungskörper 64 KiB |

Abmeldung entfernt das aktuelle Cookie; kopierte Nachweise werden nur bei wirksamer Sperrkonfiguration und erfolgreicher Anfrage gesperrt. Betreiber können `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT` oder KV konfigurieren; prüfen Sie Fehlerantworten. Auch legitime Nutzung kann Grenzen erreichen, etwa bei gemeinsamer IP-Adresse; befolgen Sie Wartehinweise und die [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/).

## 5. Pflichten der Anbindenden

1. Der API-Schlüssel ist ein persönlicher Berechtigungsnachweis und darf nicht an Dritte weitergegeben oder in öffentlich veröffentlichte Clients eingebettet werden;
2. Selbst erstellte Clients müssen die Ratenbegrenzung beachten, Degradierungshinweise darstellen (`X-Sonic-Degraded: 1`) und den Verbotskatalog der [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/) einhalten;
3. Die Informationspflichten gegenüber den Endnutzern beim Anschluss von Drittanbieter-Clients trägt die anbindende Partei selbst; Nutzer der API einer selbst gehosteten Instanz lesen zusätzlich das [Open-Source- und Selbst-Hosting-Recht](/de/open-source/).
