---
title: Guide de déploiement
description: "Guide de déploiement de Sonic : double option passerelle edge Cloudflare Pages et moteur local Linux, variables d'environnement, sauvegarde et restauration, contrôles de santé et retour arrière."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page expose les deux options d'auto-hébergement de Sonic, les variables d'environnement principales, la sauvegarde et la restauration, et les points d'exploitation essentiels. Dès le moment du déploiement, le déployeur devient le responsable du traitement des données de ses utilisateurs ; les obligations correspondantes figurent à la section 6 de [Traitement des données et mesures de sécurité](/fr/data-security/) et dans [Droit de l'open source et de l'auto-hébergement](/fr/open-source/) ; la référence des détails d'exploitation est `docs/OPERATIONS.md` du dépôt amont.

## 1. Option A : passerelle edge Cloudflare Pages

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <nom-de-votre-projet>
```

Configurez dans la console Cloudflare Pages les variables d'environnement chiffrées : `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (identique côté VPS), `SONIC_LOCAL_ENGINE_URL` (pointant vers le domaine de tunnel de votre plan de données).

## 2. Option B : moteur de protocoles Linux local (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
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
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | agrégation tierce et contournement des restrictions (0 par défaut, à maintenir désactivé sauf nécessité réelle) |
| `SONIC_RECOMMEND_DB_PATH` | chemin de persistance des données comportementales ; la valeur `memory` désactive la persistance |
| `SONIC_RECOMMEND_RETENTION_DAYS` | durée de conservation des événements comportementaux (90 par défaut, minimum 7) |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | limitation de débit (240/600 par défaut) |
| `EPOMAIL_BASE_URL` etc. | configuration Epomail OAuth |

La liste complète figure dans `.env.example` du dépôt amont ; l'exigence de concordance de l'information pour les interrupteurs touchant à la confidentialité figure à la section 6 de [Traitement des données et mesures de sécurité](/fr/data-security/).

## 4. Sauvegarde et restauration

1. Sauvegarde : exécution de `VACUUM INTO` par script d'instantané cohérent, accompagné d'un contrôle d'intégrité (`npm run backup:db`) ; les fichiers de sauvegarde contiennent des données comportementales pseudonymisées et doivent bénéficier du même niveau de protection que les données de production ;
2. Restauration : après arrêt du service, restitution de l'instantané par le script de restauration (`npm run restore:db`) ; le dépôt n'embarque pas de cadre de migrations versionné, la version cible de restauration doit correspondre à la version de la sauvegarde ;
3. Capacité : les événements comportementaux sont purgés automatiquement selon la durée de conservation de 90 jours ; le volume de la base croît avec les données canoniques de morceaux, veillez à l'espace disponible du volume.

## 5. Contrôles de santé et retour arrière

1. Contrôle de santé : `GET /api/sonic/engine/health` (clé de service requise) renvoie l'état du moteur et du disjoncteur ; le disjoncteur de la couche edge dégrade automatiquement après des échecs consécutifs du plan de données ;
2. Journaux : les journaux d'accès côté moteur ne contiennent que le chemin, la méthode, le code d'état et le temps de traitement (`docker compose logs`) ; la chaîne de requête, l'IP, les cookies et le corps de requête ne sont pas journalisés ;
3. Retour arrière : côté Pages, il suffit de revenir à la version de déploiement précédente ; côté plan de données, `git checkout` du tag précédent puis nouveau `docker compose up -d --build` ; avant tout retour arrière, vérifiez la compatibilité du schéma SQLite (absence de cadre de migrations).

## 6. Liste de contrôle du déployeur

À vérifier point par point avant la mise en service :

1. les deux clés sont fortes et aléatoires, d'une longueur d'au moins 32 caractères, et `.env` a les permissions 600 ;
2. les interrupteurs des chaînes tierces correspondent à votre information de confidentialité (les chaînes non activées sont retirées de l'information) ;
3. la durée de conservation des événements comportementaux et le chemin de persistance correspondent aux engagements de votre politique ;
4. le plan de données n'est accessible que par le tunnel et le port de l'hôte n'est pas ouvert sur l'Internet public ;
5. un plan de sauvegarde et un exercice de restauration sont en place ;
6. un texte d'information a été publié à vos utilisateurs (la [Politique de confidentialité](/fr/privacy-policy/) du site peut servir de base).
