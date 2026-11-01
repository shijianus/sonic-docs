---
title: Guide de développement
description: "Guide de développement de Sonic : structure du dépôt, commandes de construction, suite de tests, vérification de la cohérence documentaire et contribution."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.4**

La présente page s'adresse aux lecteurs participant au développement et aux développements dérivés ; elle expose la structure du dépôt, les commandes de construction, la suite de tests et la vérification de la cohérence documentaire. La licence et les limites juridiques figurent dans [Droit de l'open source et de l'auto-hébergement](/fr/open-source/).

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
4. les faits techniques sont confrontés au code source à chaque version (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`) ; en cas de divergence, le code source prévaut et la documentation est corrigée.

## 5. Contribution

1. issues et discussions : dépôt GitHub (`github.com/shijianus/sonic`) ;
2. exécutez la suite de tests complète et `npm run lint` avant tout dépôt de contribution ;
3. toute modification touchant au traitement des données (nouvel élément collecté, changement de politique de conservation, nouveau partage avec un tiers) doit mettre à jour en parallèle les documents correspondants du site et passer la vérification de cohérence ;
4. toute introduction de dépendance tierce doit mettre à jour `THIRD_PARTY_NOTICES.md` et évaluer les incidences sur la confidentialité et la licence.

## 6. Contribution aux traductions

Le site repose sur une structure multilingue en regard : toute modification d'une langue doit être répercutée sur les autres (la symétrie 1:1 est vérifiée par script). Pour ajouter une langue : enregistrez la locale, traduisez l'ensemble des documents, ajoutez la langue à la liste du script de structure, et vérifiez les références aux textes de loi selon le format de citation de cette langue défini dans `doc/legal-reference.md`.
