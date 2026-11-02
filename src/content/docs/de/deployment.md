---
title: Deployment-Leitfaden
description: Sonic-Deployment-Leitfaden – die beiden Wege Cloudflare-Pages-Edge-Gateway und lokale Linux-Engine, Umgebungsvariablen, Backup und Wiederherstellung, Gesundheitsprüfungen und Rollback.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite beschreibt die beiden Bereitstellungswege für Sonic, die Kernumgebungsvariablen, Backup und Wiederherstellung sowie die Betriebsgrundlagen. Wer die Zwecke und Mittel bestimmt, trägt die entsprechenden Datenschutzpflichten; rein persönliche Tests und öffentliche Dienste sind gesondert zu beurteilen; die einschlägigen Pflichten stehen in [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 6, und unter [Open-Source- und Selbst-Hosting-Recht](/de/open-source/); die maßgebliche Darstellung der betrieblichen Einzelheiten findet sich in `docs/OPERATIONS.md` im Upstream-Repository. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Weg A: Cloudflare-Pages-Edge-Gateway

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME
```

Ersetzen Sie vor dem Ausführen der Befehle `YOUR_PROJECT_NAME` durch den tatsächlichen Namen Ihres Pages-Projekts. Konfigurieren Sie im Cloudflare-Pages-Dashboard die verschlüsselten Umgebungsvariablen: `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (identisch zur VPS-Seite) und `SONIC_LOCAL_ENGINE_URL` (verweist auf die Tunnel-Domain Ihrer Datenebene).

## 2. Weg B: Lokale Linux-Protokoll-Engine (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
cp .env.example .env
chmod 600 .env    # starke zufällige SONIC_ENGINE_SECRET und SONIC_SECRET eintragen
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

Der Stack besteht aus dem sonic-engine-Hauptcontainer (auf dem Host nur auf `127.0.0.1:8080` abgebildet), dem netzintern abgeschotteten ncm-api-Hilfscontainer und der SQLite-Persistenz (benanntes Volume `sonic-data`). Die Datenebene ist über Cloudflare Tunnel angebunden und nicht direkt öffentlich exponiert.

## 3. Kernumgebungsvariablen

| Variable | Erläuterung |
| --- | --- |
| `SONIC_SECRET` | Signaturschlüssel der API-Schlüssel, Länge ≥ 32 Zeichen (`openssl rand -base64 48`) |
| `SONIC_ENGINE_SECRET` | Dienstschlüssel, auf Pages- und VPS-Seite jeweils identisch |
| `SONIC_LOCAL_ENGINE_URL` | Tunneladresse der Datenebene |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | Schalter der eingebauten Quellprotokolle (Standard 1) |
| `SONIC_ENABLE_AMLL/LRCLIB` | Schalter der Lyrics-Ergänzung (Standard 1) |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | Drittanbieter- und Ergänzungspfade; Beispiel-/Composewerte 0, GDStudio im Code bei fehlender Einstellung aktiv. Tatsächliche Schalter prüfen; keine Berechtigung zur Umgehung von Schutzmaßnahmen |
| `SONIC_RECOMMEND_DB_PATH` | Speicherpfad der Verhaltensereignisse; `memory` schaltet die Persistenz dieses Speichers ab, garantiert aber keine Datenfreiheit anderer Speicher, Protokolle oder Dienste |
| `SONIC_RECOMMEND_RETENTION_DAYS` | Konfigurierbare Ereignisfrist (Standard 90, mindestens 7); fester 90-Tage-Schreibpfad und andere Datenarten werden nicht vollständig erfasst |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | Ratenbegrenzung (Standard 240/600) |
| `EPOMAIL_BASE_URL` usw. | Epomail-OAuth-Konfiguration |

Die vollständige Liste findet sich in `.env.example` im Upstream-Repository; die Anforderungen an die Übereinstimmung der datenschutzrelevanten Schalter mit der Datenschutzauskunft stehen in [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 6.

## 4. Backup und Wiederherstellung

1. Backup: Mit dem Skript für konsistente Schnappschüsse wird `VACUUM INTO` samt Integritätsprüfung ausgeführt (`npm run backup:db`); Backup-Dateien können personenbezogene Daten enthalten; konkrete Fristen, Zugriffsbeschränkung und Isolation nach Löschanfragen sind einzurichten, nicht bereits garantiert;
2. Wiederherstellung: Nach dem Herunterfahren wird der Schnappschuss mit dem Wiederherstellungsskript zurückgespielt (`npm run restore:db`); das Repository hat kein versioniertes Migrationsframework, sodass die Zielversion kompatibel sein muss. Löschvermerke sind bei Wiederherstellung erneut anzuwenden;
3. Kapazität: Bereinigung erfolgt beim Start und bei bestimmten Schreibvorgängen, nicht für jeden Datensatz exakt nach 90 Tagen; Radar, Suchaggregate und Backups haben keine damit belegte Frist; die Datenbankgröße wächst mit den kanonischen Titeldaten; achten Sie auf den Platz des Volumes.

## 5. Gesundheitsprüfung und Rollback

1. Gesundheitsprüfung: `GET /api/sonic/engine/health` (Dienstschlüssel erforderlich) liefert den Zustand von Engine und Circuit Breaker; der Circuit Breaker der Edge-Seite degradiert bei fortlaufenden Fehlern der Datenebene automatisch;
2. Protokolle: Die Zugriffsprotokolle der Engine-Seite enthalten nur Pfad, Methode, Statuscode und Dauer (`docker compose logs`); das ist keine globale Null-Protokollierungszusage: Fehler, Hostsystem, Proxys und Dritte können weitere Daten erfassen, und IP-Adressen werden zur Ratenbegrenzung und Engine-Weiterleitung verarbeitet;
3. Rollback: Auf der Pages-Seite genügt das Zurückrollen auf die vorherige Deployment-Version; die Datenebene wird mit `git checkout` auf das vorherige Tag erneut mit `docker compose up -d --build` gestartet; vor dem Rollback ist die SQLite-Schemakompatibilität zu bestätigen (kein Migrationsframework).

## 6. Prüfliste für Bereitsteller

Vor dem Go-live Posten für Posten bestätigen:

1. Beide Schlüssel sind stark zufällig und mindestens 32 Zeichen lang; die Berechtigungen von `.env` stehen auf 600;
2. Die Schalter der Drittanbieter-Kanäle stimmen mit Ihrer Datenschutzauskunft überein (nicht aktivierte Kanäle sind aus der Auskunft zu streichen);
3. Fristen für Ereignisse, Radar, Suchtexte, Protokolle und Backups sind festgelegt und Löschabdeckung samt Fehleranzeigen geprüft;
4. Die Datenebene ist nur über den Tunnel erreichbar; der Host-Port ist nicht öffentlich offen;
5. Ein Backup-Plan und eine Wiederherstellungsübung bestehen;
6. Identität, Regionen, Empfänger und notwendige Transfergrundlagen sind geklärt; optionale Verarbeitung ist vor wirksamer Einwilligung ausgeschaltet. Öffentliche Suchwortwiederverwendung, E-Mail-Avatarpfade und HTTP-Verbindungen sind geprüft und ohne nötige Grundlage oder Schutz ausgesetzt. Die [Datenschutzerklärung](/de/privacy-policy/) benennt offene Punkte, bestätigt aber keine erfolgte Behebung.
