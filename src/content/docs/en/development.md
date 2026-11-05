---
title: Development Guide
description: The Sonic development guide — repository structure, build commands, the test suite, documentation consistency checks and contributing.
---

**Revision date: 3 November 2026｜Version: 1.9**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page is for readers joining development or building on the project, and covers the repository structure, build commands, the test suite and the documentation consistency checks. Licensing and legal boundaries are in [Open-Source & Self-Hosting Legal](/en/open-source/).

## 1. Repository structure

| Path | Contents |
| --- | --- |
| `player/` | Vue 3 web player (built-in i18n in zh／en／ja) |
| `functions/` | Cloudflare Pages Functions edge gateway (routing, rate limiting, caching, circuit breaking) |
| `functions/_lib/sonic/` | Shared logic for recommendations, identity, upstream protocols and security |
| `server/` | Data-plane Node.js 22 engine (including the `recommend-sqlite.ts` SQLite storage) |
| `Dockerfile` / `docker-compose.yml` | Data-plane container stack (sonic-engine + ncm-api) |
| `docs/` | Operations, compliance, audit remediation and known-issues documents |
| `tests/` | Security, gateway, recommendation and release-gate tests |

## 2. Build and local run

```bash
npm ci                              # root dependencies
pnpm --dir player install --frozen-lockfile
npm run build                       # build the player + copy to dist
npx wrangler pages dev dist         # local edge gateway (automatic degradation mode without the data plane)
npm run build:engine && npm run start:engine   # local data-plane engine
```

## 3. Test suite

Run before each release with `npm test`; coverage:

1. Gateway behavior and degradation (`test-sonic-gateway.mjs`, `test-local-engine-and-degradation.mjs`);
2. Authentication compatibility and OAuth security (`test-auth-compatibility.mjs`, `tests/oauth-security.test.ts`);
3. SSRF and security hardening (`tests/ssrf-security.test.ts`, `tests/security*.test.ts`);
4. Recommendations and search (`tests/recommendation-and-search.test.ts`);
5. Front-end XSS (`tests/frontend-xss.test.ts`);
6. Configuration parity — an item-by-item comparison of `.env.example` against the environment variables the code reads (`tests/config-parity.test.ts`);
7. The release P0/P1 gate (`tests/release-p0-p1-gate.test.ts`).

## 4. Documentation consistency checks

This site (sonicdocs) evolves release by release and is checked against the source code; the verification toolchain:

```bash
pnpm validate    # build + broken in-page anchor check + multilingual structural symmetry check
```

1. `scripts/validate-anchors.cjs`: zero broken in-page anchors or image references site-wide;
2. `scripts/check-structure.py`: 1:1 structural symmetry of headings／tables／images／callouts across language versions;
3. `doc/legal-reference.md`: the GDPR article-citation whitelist (verified against EUR-Lex); articles outside the whitelist must not appear in the documents;
4. Check technical statements against the identified revision and actual deployment, including default-on profiling, public raw-query reuse, email avatar requests, HTTP upstream connections, partial deletion and hidden failures. Source-code review is not live compliance certification and cannot excuse inaccurate notice; correct contradictions and notify affected users.

## 5. Contributing

1. Issues and discussion: GitHub repository Issues (`github.com/shijianus/sonic`);
2. Run the full test suite and `npm run lint` before submitting;
3. Changes touching data processing (new collection items, changed retention policies, new third-party sharing) must update the corresponding documents on this site and pass the consistency checks;
4. Bringing in a third-party dependency requires updating `THIRD_PARTY_NOTICES.md` and assessing the privacy and licensing impact.

## 6. Documentation translations

Simplified Chinese is the maintenance baseline with nine translations; mandatory law, intelligible notice and interpretation favourable to consumers override language-priority rules. Translate full paragraphs, including blockers and mandatory clauses, and preserve H2/H3 counts, table dimensions, image URLs and callout counts while localising internal links. Revised documents use their own revision date and version, not retroactive consent or an assumed deployment date. New locales need registration, complete files, structural checks and citation-format review against `doc/legal-reference.md`.
