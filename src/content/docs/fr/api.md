---
title: Plateforme ouverte et accès à l'API
description: "Accès à l'API ouverte de Sonic : structure de réponse unifiée, navigation des endpoints, authentification par clé d'API et règles de transmission, limitation de débit et révocation."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page expose le mode d'accès à l'API ouverte de Sonic : structure de réponse unifiée, endpoints principaux, authentification par clé d'API et règles de transmission, limitation de débit et révocation. Le comportement d'accès est régi par les [Conditions d'utilisation](/fr/terms-of-service/) et la [Politique d'utilisation acceptable](/fr/acceptable-use/) ; la spécification de référence des endpoints figure dans `API.md` du dépôt amont.

## 1. Structure de réponse unifiée

Tous les endpoints garantissent en externe le contrat de compatibilité `brand: "Sonic"` ; la réponse standard est la suivante :

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

Le champ `meta` indique fidèlement le niveau de cache, le fournisseur, l'état de dégradation et l'état du disjoncteur ; le client peut s'en servir pour présenter des avis transparents.

## 2. Navigation des endpoints principaux

| Catégorie | Méthode | Endpoint | Fonction |
| --- | --- | --- | --- |
| Recommandation intelligente | GET | `/api/sonic/recommend/for-you` | Suggestions pour vous / Auto DJ |
| | GET | `/api/sonic/recommend/trending` | palmarès de tendances (24h/7d/surging/new) |
| | GET | `/api/sonic/recommend/similar` | exploration de morceaux/artistes similaires |
| | GET | `/api/sonic/recommend/discover` | radar de genres et de styles |
| Événements comportementaux | POST | `/api/sonic/events` | rapport d'événements comportementaux (50 au plus par lot) |
| | GET | `/api/sonic/events` | consultation de l'aperçu du profil de recommandation |
| | DELETE | `/api/sonic/events` | effacement du profil personnel en un clic |
| Recherche agrégée | GET | `/api/sonic/search/smart` | recherche hybride intelligente et complétion |
| | GET | `/api/sonic/search/nexus` | recherche parallèle multi-sources sur l'ensemble du réseau |
| Paroles dynamiques | GET | `/api/sonic/lyrics/nexus` | paroles mot à mot (YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | paroles synchronisées inter-plateformes (sorties multi-formats) |
| Médias audio | GET | `/api/music/stream` | proxy segmenté audio (Range/206 ; connexion directe `?mode=redirect`) |
| | GET | `/api/music/cover` | proxy de pochettes (haute qualité prioritaire, repli SVG) |
| | GET | `/api/music/palette` | analyse de température de couleur des pochettes |
| Authentification | GET | `/api/auth/user` | données de la session courante |
| | GET/POST | `/api/auth/key` | consultation/émission nouvelle d'une clé d'API |
| | POST | `/api/auth/revoke` | révocation de la clé courante (en-tête de clé explicite requis) |
| | POST | `/api/auth/logout` | déconnexion et révocation de la session |

## 3. Authentification par clé d'API

1. Format : format versionné `sonic_live_v2.<header>.<payload>.<signature>`, signature HMAC-SHA256 ; la charge utile contient `sub` (adresse électronique), `iat`, `exp`, `jti`, `kid`, `role` et `uid` ;
2. Émission : obtenue via `/api/auth/key` après connexion Epomail OAuth ; validité d'émission de 30 jours et plafond de validation de 90 jours ;
3. Transmission : seuls les en-têtes de requête sont admis, à savoir `X-Sonic-Key: <key>` ou `Authorization: Bearer <key>` ; le canal des paramètres de requête URL a été intégralement supprimé afin d'éviter toute fuite des clés dans les journaux d'accès, l'historique du navigateur ou le Referer ;
4. Validation : le serveur compare à temps constant via Web Crypto, en vérifiant strictement la version, `kid`, `iat`/`exp`, `jti` et les listes de révocation ; les clés sans signature et les clés de versions antérieures sont systématiquement rejetées (fail-closed).

## 4. Limitation de débit et révocation

| Élément | Plafond |
| --- | --- |
| Requêtes anonymes | 240 par minute (valeur par défaut) |
| Requêtes authentifiées | 600 par minute (valeur par défaut) |
| Endpoint d'authentification | 30 par minute et par IP |
| Rapport d'événements comportementaux | 50 événements au plus par lot, corps de requête de 64 Ko |

Révocation : la déconnexion révoque immédiatement la session courante et le `jti` ; le déployeur peut configurer les listes statiques `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT`, ou activer la révocation immédiate par liaison à KV. Un usage personnel normal n'atteint pas les plafonds de limitation ; les dépassements persistants entrent dans la gradation des mesures de la [Politique d'utilisation acceptable](/fr/acceptable-use/).

## 5. Obligations des intégrateurs

1. la clé d'API est un identifiant d'usage personnel : elle ne doit être ni remise à un tiers ni intégrée à un client publié ;
2. les clients auto-développés doivent respecter la limitation de débit, présenter les avis de dégradation (`X-Sonic-Degraded: 1`) et observer la liste des comportements interdits de la [Politique d'utilisation acceptable](/fr/acceptable-use/) ;
3. l'obligation d'information envers les utilisateurs finaux lors de l'accès d'un client tiers incombe à l'intégrateur ; les utilisateurs de l'API d'une instance auto-hébergée liront également [Droit de l'open source et de l'auto-hébergement](/fr/open-source/).
