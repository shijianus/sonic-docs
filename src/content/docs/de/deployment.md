---
title: Deployment-Leitfaden
description: Sonic-Deployment-Leitfaden – die beiden Wege Cloudflare-Pages-Edge-Gateway und lokale Linux-Engine, Umgebungsvariablen, Backup und Wiederherstellung, Gesundheitsprüfungen und Rollback.
---

**Datum des Inkrafttretens: 2. November 2026｜Version: 1.5**

Diese Seite beschreibt die beiden Bereitstellungswege für Sonic, die Kernumgebungsvariablen, Backup und Wiederherstellung sowie die Betriebsgrundlagen. Ab dem Zeitpunkt der Bereitstellung ist der Bereitsteller der Verantwortliche für seine Nutzer; die einschlägigen Pflichten stehen in [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 6, und unter [Open-Source- und Selbst-Hosting-Recht](/de/open-source/); die maßgebliche Darstellung der betrieblichen Einzelheiten findet sich in `docs/OPERATIONS.md` im Upstream-Repository.

## 1. Weg A: Cloudflare-Pages-Edge-Gateway

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <你的项目名>
```

Konfigurieren Sie im Cloudflare-Pages-Dashboard die verschlüsselten Umgebungsvariablen: `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (identisch zur VPS-Seite) und `SONIC_LOCAL_ENGINE_URL` (verweist auf die Tunnel-Domain Ihrer Datenebene).

## 2. Weg B: Lokale Linux-Protokoll-Engine (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
cp .env.example .env
chmod 600 .env    # 填入强随机 SONIC_ENGINE_SECRET 与 SONIC_SECRET
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
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | Drittanbieter-Aggregation und Umgehungskanäle (Standard 0; ausgeschaltet lassen, sofern nicht zwingend erforderlich) |
| `SONIC_RECOMMEND_DB_PATH` | Persistenzpfad der Verhaltensdaten; mit `memory` wird die Persistenz abgeschaltet |
| `SONIC_RECOMMEND_RETENTION_DAYS` | Aufbewahrungstage der Verhaltensereignisse (Standard 90, Untergrenze 7) |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | Ratenbegrenzung (Standard 240/600) |
| `EPOMAIL_BASE_URL` usw. | Epomail-OAuth-Konfiguration |

Die vollständige Liste findet sich in `.env.example` im Upstream-Repository; die Anforderungen an die Übereinstimmung der datenschutzrelevanten Schalter mit der Datenschutzauskunft stehen in [Datenverarbeitung und Sicherheitsmaßnahmen](/de/data-security/), Abschnitt 6.

## 4. Backup und Wiederherstellung

1. Backup: Mit dem Skript für konsistente Schnappschüsse wird `VACUUM INTO` samt Integritätsprüfung ausgeführt (`npm run backup:db`); Backup-Dateien enthalten pseudonymisierte Verhaltensdaten und sind auf demselben Schutzniveau wie die Produktionsdaten zu halten;
2. Wiederherstellung: Nach dem Herunterfahren wird der Schnappschuss mit dem Wiederherstellungsskript zurückgespielt (`npm run restore:db`); das Repository hat kein versioniertes Migrationsframework, sodass die wiederherzustellende Zielversion mit der Backup-Version übereinstimmen sollte;
3. Kapazität: Verhaltensereignisse werden nach 90 Tagen Aufbewahrung automatisch bereinigt; die Datenbankgröße wächst mit den kanonischen Titeldaten; achten Sie auf den Platz des Volumes.

## 5. Gesundheitsprüfung und Rollback

1. Gesundheitsprüfung: `GET /api/sonic/engine/health` (Dienstschlüssel erforderlich) liefert den Zustand von Engine und Circuit Breaker; der Circuit Breaker der Edge-Seite degradiert bei fortlaufenden Fehlern der Datenebene automatisch;
2. Protokolle: Die Zugriffsprotokolle der Engine-Seite enthalten nur Pfad, Methode, Statuscode und Dauer (`docker compose logs`); Abfragezeichenfolgen, IP, Cookies und Anforderungskörper werden nicht aufgezeichnet;
3. Rollback: Auf der Pages-Seite genügt das Zurückrollen auf die vorherige Deployment-Version; die Datenebene wird mit `git checkout` auf das vorherige Tag erneut mit `docker compose up -d --build` gestartet; vor dem Rollback ist die SQLite-Schemakompatibilität zu bestätigen (kein Migrationsframework).

## 6. Prüfliste für Bereitsteller

Vor dem Go-live Posten für Posten bestätigen:

1. Beide Schlüssel sind stark zufällig und mindestens 32 Zeichen lang; die Berechtigungen von `.env` stehen auf 600;
2. Die Schalter der Drittanbieter-Kanäle stimmen mit Ihrer Datenschutzauskunft überein (nicht aktivierte Kanäle sind aus der Auskunft zu streichen);
3. Aufbewahrungstage der Verhaltensereignisse und Persistenzpfad entsprechen Ihren politischen Zusagen;
4. Die Datenebene ist nur über den Tunnel erreichbar; der Host-Port ist nicht öffentlich offen;
5. Ein Backup-Plan und eine Wiederherstellungsübung bestehen;
6. Der Informationstext wurde Ihren Nutzern veröffentlicht (die [Datenschutzerklärung](/de/privacy-policy/) dieser Website kann als Grundlage dienen).
