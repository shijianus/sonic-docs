---
title: Entwicklungsleitfaden
description: Sonic-Entwicklungsleitfaden – Repository-Struktur, Build-Befehle, Testsuite, Verifikation der Dokumentenkonsistenz und Beteiligung am Projekt.
---

**Datum des Inkrafttretens: 1. November 2026｜Version: 1.4**

Diese Seite richtet sich an Leser, die an der Entwicklung oder Weiterentwicklung mitwirken möchten, und beschreibt Repository-Struktur, Build-Befehle, Testsuite und die Verifikation der Dokumentenkonsistenz. Lizenz und rechtliche Grenzen sind unter [Open-Source- und Selbst-Hosting-Recht](/de/open-source/) dargestellt.

## 1. Repository-Struktur

| Pfad | Inhalt |
| --- | --- |
| `player/` | Vue-3-Webplayer (eingebautes i18n in zh/en/ja) |
| `functions/` | Cloudflare Pages Functions Edge-Gateway (Routing, Ratenbegrenzung, Caching, Circuit Breaker) |
| `functions/_lib/sonic/` | geteilte Logik für Empfehlungen, Identität, Upstream-Protokolle und Sicherheit |
| `server/` | Node.js-22-Engine der Datenebene (einschließlich des SQLite-Speichers `recommend-sqlite.ts`) |
| `Dockerfile` / `docker-compose.yml` | Container-Stack der Datenebene (sonic-engine + ncm-api) |
| `docs/` | Dokumente zu Betrieb, Compliance, Audit-Nachbesserung und bekannten Problemen |
| `tests/` | Tests zu Sicherheit, Gateway, Empfehlung und Release-Gates |

## 2. Build und lokaler Betrieb

```bash
npm ci                              # 根依赖
pnpm --dir player install --frozen-lockfile
npm run build                       # 播放器构建 + 复制至 dist
npx wrangler pages dev dist         # 本地边缘闸道（无数据面时自动降级模式）
npm run build:engine && npm run start:engine   # 本地数据面引擎
```

## 3. Testsuite

Vor der Veröffentlichung durch `npm test` ausgeführt; abgedeckt werden:

1. Gateway-Verhalten und Degradierung (`test-sonic-gateway.mjs`, `test-local-engine-and-degradation.mjs`);
2. Authentifizierungskompatibilität und OAuth-Sicherheit (`test-auth-compatibility.mjs`, `tests/oauth-security.test.ts`);
3. SSRF und Sicherheitshärtung (`tests/ssrf-security.test.ts`, `tests/security*.test.ts`);
4. Empfehlung und Suche (`tests/recommendation-and-search.test.ts`);
5. Frontend-XSS (`tests/frontend-xss.test.ts`);
6. Konfigurationskonsistenz – Posten für Posten Vergleich der Umgebungsvariablen aus `.env.example` und den im Code gelesenen Werten (`tests/config-parity.test.ts`);
7. Release-Gates P0/P1 (`tests/release-p0-p1-gate.test.ts`).

## 4. Verifikation der Dokumentenkonsistenz

Diese Website (sonicdocs) wird mit jeder Version gegen den Quellcode abgeglichen; die Verifikations-Werkzeugkette:

```bash
pnpm validate    # 构建 + 页内锚点断链检查 + 多语言结构对称校验
```

1. `scripts/validate-anchors.cjs`: null defekte Links bei allen Seitenankern und Bildverweisen der Website;
2. `scripts/check-structure.py`: Struktur der mehrsprachigen Versionen (Überschriften/Tabellen/Bilder/Hinweiskästen) 1:1;
3. `doc/legal-reference.md`: Whitelist der DSGVO-Zitierweise (EUR-Lex-Verifizierungsunterlage); Zitierweisen außerhalb der Whitelist dürfen in den Dokumenten nicht auftreten;
4. Technische Fakten werden bei jeder Version gegen den Quellcode (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`) abgeglichen; weichen sie ab, ist der Quellcode maßgeblich, und das Dokument ist zu korrigieren.

## 5. Mitwirken

1. Anliegen und Diskussionen: Issues im GitHub-Repository (`github.com/shijianus/sonic`);
2. Vor der Einreichung die vollständige Testsuite und `npm run lint` ausführen;
3. Änderungen mit Datenverarbeitungsbezug (neue Erhebungsmerkmale, geänderte Aufbewahrungsstrategien, neue Weitergabe an Dritte) müssen die entsprechenden Dokumente dieser Website gleichzeitig aktualisieren und die Konsistenzverifikation durchlaufen;
4. Bei der Einführung von Drittanbieter-Abhängigkeiten ist `THIRD_PARTY_NOTICES.md` zu aktualisieren und die Datenschutz- und Lizenzwirkung zu bewerten.

## 6. Beiträge zur Dokumentübersetzung

Diese Website hat eine mehrsprachige Gegenüberstruktur: Änderungen in einer Sprache sind in den übrigen Sprachen gleich mitzuführen (die 1:1-Struktur wird von Skripten geprüft). Bei einer neuen Sprache: locale registrieren, sämtliche Dokumente ergänzen, die Sprache in die Liste der Strukturskripte aufnehmen und die Gesetzeszitate nach dem Zitierformat der betreffenden Sprache in `doc/legal-reference.md` prüfen.
