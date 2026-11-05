---
title: Guide de développement
description: "Guide de développement de Sonic : structure du dépôt, commandes de construction, suite de tests, vérification de la cohérence documentaire et contribution."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

La présente page s'adresse aux lecteurs participant au développement et aux développements dérivés ; elle expose la structure du dépôt, les commandes de construction, la suite de tests et la vérification de la cohérence documentaire. La licence et les limites juridiques figurent dans [Droit de l'open source et de l'auto-hébergement](/fr/open-source/). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

## 1. Structure du dépôt

| Chemin | Contenu |
| --- | --- |
| `player/` | lecteur web Vue 3 (i18n trilingue intégré : zh/en/ja) |
| `functions/` | passerelle edge Cloudflare Pages Functions (routage, limitation de débit, cache, disjoncteur) |
| `functions/_lib/sonic/` | logique partagée de recommandation, d'identité, de protocoles amont et de sécurité |
| `server/` | moteur Node.js 22 du plan de données (stockage SQLite dans `recommend-sqlite.ts`) |
| `Dockerfile` / `docker-compose.yml` | pile de conteneurs du plan de données (sonic-engine + ncm-api) |
| `docs/` | documents d'exploitation, de conformité, de remédiation d'audit et d'anomalies connues |
| `tests/` | tests de sécurité, de passerelle, de recommandation et de portes de publication |

## 2. Construction et exécution locale

```bash
npm ci                              # dépendances racines
pnpm --dir player install --frozen-lockfile
npm run build                       # construction du lecteur + copie dans dist
npx wrangler pages dev dist         # passerelle edge locale (mode dégradé automatique sans plan de données)
npm run build:engine && npm run start:engine   # moteur de plan de données local
```

## 3. Suite de tests

Exécutée avant publication par `npm test`, elle couvre :

1. comportement de la passerelle et dégradation (`test-sonic-gateway.mjs`, `test-local-engine-and-degradation.mjs`) ;
2. compatibilité de l'authentification et sécurité OAuth (`test-auth-compatibility.mjs`, `tests/oauth-security.test.ts`) ;
3. SSRF et durcissement de la sécurité (`tests/ssrf-security.test.ts`, `tests/security*.test.ts`) ;
4. recommandation et recherche (`tests/recommendation-and-search.test.ts`) ;
5. XSS frontend (`tests/frontend-xss.test.ts`) ;
6. cohérence de configuration : comparaison point par point des variables d'environnement lues par le code avec `.env.example` (`tests/config-parity.test.ts`) ;
7. portes de publication P0/P1 (`tests/release-p0-p1-gate.test.ts`).

## 4. Vérification de la cohérence documentaire

Ce site (sonicdocs) est confronté au code source à chaque évolution de version ; chaîne d'outils de vérification :

```bash
pnpm validate    # construction + contrôle des ancres internes rompues + vérification de la symétrie multilingue
```

1. `scripts/validate-anchors.cjs` : zéro lien rompu dans les ancres internes et les références d'images de tout le site ;
2. `scripts/check-structure.py` : symétrie 1:1 des titres/tableaux/images/blocs de notes entre versions multilingues ;
3. `doc/legal-reference.md` : liste blanche des références aux articles du RGPD (dossier de vérification EUR-Lex), aucun article hors liste ne devant apparaître dans les documents ;
4. cette révision vérifie le 2026-11-02 la RC publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), distincte de l'ancien `main@ce443c8` (2026-10-27 UTC), sans certifier l'exploitation ni les contrats. Comparez code, environnement, Compose et routes réelles ; corrigez les écarts sans invoquer « le code fait foi » pour écarter les droits ou une information erronée. Les défauts de consentement, d'effacement et de confidentialité restent des défauts à corriger.

## 5. Contribution

1. issues et discussions : dépôt GitHub (`github.com/shijianus/sonic`) ;
2. exécutez la suite de tests complète et `npm run lint` avant tout dépôt de contribution ;
3. toute modification touchant au traitement des données (nouvel élément collecté, changement de politique de conservation, nouveau partage avec un tiers) doit mettre à jour en parallèle les documents correspondants du site et passer la vérification de cohérence ;
4. toute introduction de dépendance tierce doit mettre à jour `THIRD_PARTY_NOTICES.md` et évaluer les incidences sur la confidentialité et la licence.

## 6. Contribution aux traductions

Le chinois simplifié à la racine est la référence de maintenance, avec neuf traductions. Synchronisez les paragraphes et la structure 1:1 sans réduire les protections ; le droit impératif, l'interprétation favorable aux consommateurs et l'information compréhensible priment sur la priorité linguistique. Pour une nouvelle langue, enregistrez la locale, traduisez les documents, mettez à jour le contrôle de structure et respectez les citations de `doc/legal-reference.md`.
