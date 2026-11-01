---
title: Development Guide
description: The Sonic development guide — repository structure, build commands, the test suite, documentation consistency checks and contributing.
---

**Effective date: 2 November 2026｜Version: 1.5**

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
npm ci                              # 根依赖
pnpm --dir player install --frozen-lockfile
npm run build                       # 播放器构建 + 复制至 dist
npx wrangler pages dev dist         # 本地边缘闸道（无数据面时自动降级模式）
npm run build:engine && npm run start:engine   # 本地数据面引擎
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
pnpm validate    # 构建 + 页内锚点断链检查 + 多语言结构对称校验
```

1. `scripts/validate-anchors.cjs`: zero broken in-page anchors or image references site-wide;
2. `scripts/check-structure.py`: 1:1 structural symmetry of headings／tables／images／callouts across language versions;
3. `doc/legal-reference.md`: the GDPR article-citation whitelist (verified against EUR-Lex); articles outside the whitelist must not appear in the documents;
4. Technical facts are refreshed against the source code (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`) with each release; where they disagree, the source code prevails and the documents are corrected.

## 5. Contributing

1. Issues and discussion: GitHub repository Issues (`github.com/shijianus/sonic`);
2. Run the full test suite and `npm run lint` before submitting;
3. Changes touching data processing (new collection items, changed retention policies, new third-party sharing) must update the corresponding documents on this site and pass the consistency checks;
4. Bringing in a third-party dependency requires updating `THIRD_PARTY_NOTICES.md` and assessing the privacy and licensing impact.

## 6. Documentation translations

This site is a multi-language mirrored structure: a change in any language must be propagated to the others (1:1 structure is verified by script). When adding a language: register the locale, complete the full document set, add the language to the structure scripts' language list, and check legal citations against that language's citation format in `doc/legal-reference.md`.
