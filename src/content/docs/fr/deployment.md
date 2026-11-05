---
title: Guide de déploiement
description: "Guide de déploiement de Sonic : double option passerelle edge Cloudflare Pages et moteur local Linux, variables d'environnement, sauvegarde et restauration, contrôles de santé et retour arrière."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Cette page présente les composants de déploiement, la configuration et l'exploitation de Sonic. Les rôles légaux dépendent des décisions de traitement réelles ; les essais personnels et le service public doivent être évalués séparément. Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne. Avant un service public, vérifiez identité du responsable, pays des nœuds, contrats et garanties applicables, non établis par le seul code. Voir [Traitement des données et mesures de sécurité](/fr/data-security/), [Droit de l'open source et de l'auto-hébergement](/fr/open-source/) et `docs/OPERATIONS.md`.

## 1. Option A : passerelle edge Cloudflare Pages

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

Avant d'exécuter les commandes, remplacez `YOUR_PROJECT_NAME` par le nom réel de votre projet Pages. Configurez dans la console Cloudflare Pages les variables d'environnement chiffrées : `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (identique côté VPS), `SONIC_LOCAL_ENGINE_URL` (pointant vers le domaine de tunnel de votre plan de données).

## 2. Option B : moteur de protocoles Linux local (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
cp .env.example .env
chmod 600 .env    # y saisir un SONIC_ENGINE_SECRET et un SONIC_SECRET forts et aléatoires
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

Composition de la pile : conteneur principal sonic-engine (l'hôte ne mappe que `127.0.0.1:8080`), conteneur auxiliaire ncm-api confiné sur le réseau interne, persistance SQLite (volume nommé `sonic-data`). Le plan de données est raccordé via Cloudflare Tunnel, sans exposition directe sur l'Internet public.

## 3. Variables d'environnement principales

| Variable | Description |
| --- | --- |
| `SONIC_SECRET` | clé de signature des clés d'API, longueur ≥ 32 caractères (`openssl rand -base64 48`) |
| `SONIC_ENGINE_SECRET` | clé inter-services, identique des deux côtés Pages et VPS |
| `SONIC_LOCAL_ENGINE_URL` | adresse de tunnel du plan de données |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | interrupteurs des protocoles de sources audio intégrées (1 par défaut) |
| `SONIC_ENABLE_AMLL/LRCLIB` | interrupteurs du complément de paroles (1 par défaut) |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | chemins tiers facultatifs ; GDStudio est activé si le réglage manque dans le code, mais désactivé dans l'exemple d'environnement et Compose. L'activation ne permet pas de contourner les protections de paiement, d'accès ou de contenu |
| `SONIC_RECOMMEND_DB_PATH` | chemin de stockage des événements ; `memory` ne garantit pas l'absence de données dans les autres stockages, journaux ou services |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 90 jours par défaut, minimum 7 ; ne couvre pas tout le radar, les recherches et agrégats, et un nettoyage à l'écriture utilise encore 90 jours fixes  |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | limitation de débit (240/600 par défaut) |
| `EPOMAIL_BASE_URL` etc. | configuration Epomail OAuth |

La liste complète figure dans `.env.example` du dépôt amont ; l'exigence de concordance de l'information pour les interrupteurs touchant à la confidentialité figure à la section 6 de [Traitement des données et mesures de sécurité](/fr/data-security/).

## 4. Sauvegarde et restauration

1. Sauvegarde : les outils `VACUUM INTO` et `npm run backup:db` ne prouvent pas qu'une sauvegarde est programmée sur l'instance. Protégez les copies comme les données actives et définissez un cycle réel de conservation ;
2. Restauration : vérifiez la compatibilité de version avant `npm run restore:db`, puis réappliquez les suppressions. Les copies non effaçables individuellement doivent être isolées, exclues de l'usage courant et supprimées à échéance définie ;
3. Capacité : le nettoyage de certains événements au démarrage ou à l'écriture n'est pas une destruction immédiate à 90 jours et ne couvre pas tout le radar, les recherches, agrégats, journaux et sauvegardes ; testez les durées et surveillez l'espace.

## 5. Contrôles de santé et retour arrière

1. Contrôle de santé : `GET /api/sonic/engine/health` (clé de service requise) renvoie l'état du moteur et du disjoncteur ; le disjoncteur de la couche edge dégrade automatiquement après des échecs consécutifs du plan de données ;
2. Journaux : la minimisation applicative ne garantit pas zéro journal pour le déploiement ; vérifiez messages d'erreur, hôte, proxy et fournisseurs. L'IP brute peut être utilisée dans KV ou un limiteur, et des en-têtes client/session/contexte sont transmis au moteur ;
3. Retour arrière : côté Pages, il suffit de revenir à la version de déploiement précédente ; côté plan de données, `git checkout` du tag précédent puis nouveau `docker compose up -d --build` ; avant tout retour arrière, vérifiez la compatibilité du schéma SQLite (absence de cadre de migrations).

## 6. Liste de contrôle du déployeur

À vérifier point par point avant la mise en service :

1. les deux clés sont fortes et aléatoires, d'une longueur d'au moins 32 caractères, et `.env` a les permissions 600 ;
2. les interrupteurs des chaînes tierces correspondent à votre information de confidentialité (les chaînes non activées sont retirées de l'information) ;
3. la durée de conservation des événements comportementaux et le chemin de persistance correspondent aux engagements de votre politique ;
4. le plan de données n'est accessible que par le tunnel et le port de l'hôte n'est pas ouvert sur l'Internet public ;
5. un plan de sauvegarde et un exercice de restauration sont en place ;
6. une information exacte et des choix préalables valables sont en place : le profilage/Auto DJ activé par défaut, les suggestions publiques de recherches, l'avatar DiceBear avec courriel, l'effacement partiel et les liens amont HTTP doivent être corrigés ou les traitements concernés suspendus. Vérifiez aussi la révocation et la route distante du radar ; publier la [Politique de confidentialité](/fr/privacy-policy/) ne suffit pas à rendre ces traitements licites.
