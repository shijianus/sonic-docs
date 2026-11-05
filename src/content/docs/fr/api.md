---
title: Plateforme ouverte et accès à l'API
description: "Accès à l'API ouverte de Sonic : structure de réponse unifiée, navigation des endpoints, authentification par clé d'API et règles de transmission, limitation de débit et révocation."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

La présente page expose le mode d'accès à l'API ouverte de Sonic : structure de réponse unifiée, endpoints principaux, authentification par clé d'API et règles de transmission, limitation de débit et révocation. Le comportement d'accès est régi par les [Conditions d'utilisation](/fr/terms-of-service/) et la [Politique d'utilisation acceptable](/fr/acceptable-use/) ; la spécification de référence des endpoints figure dans `API.md` du dépôt amont.

Le service hébergé est un projet de test individuel, gratuit et sans but lucratif, sans SLA ni garantie de récupération. Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne. Le profilage activé par défaut n'est pas un consentement ; la réinitialisation est partielle et peut masquer des échecs ; la révocation dépend de la configuration et du succès de la demande. Ne transmettez pas de données ou identifiants inutiles.

## 1. Structure de réponse unifiée

Les réponses JSON standard peuvent utiliser `brand: "Sonic"` selon le modèle ci-dessous ; les flux, redirections et erreurs ont leurs propres réponses. Cette API expérimentale ne promet ni compatibilité permanente ni SLA :

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
| Événements comportementaux | POST | `/api/sonic/events` | rapport d'événements comportementaux (50 au plus par lot)  |
| | GET | `/api/sonic/events` | consultation de l'aperçu du profil de recommandation  |
| | DELETE | `/api/sonic/events` | effacement partiel des événements et retours de l'identité courante, pas une suppression complète du profil  |
| Recherche agrégée | GET | `/api/sonic/search/smart` | recherche hybride intelligente et complétion |
| | GET | `/api/sonic/search/nexus` | recherche parallèle multi-sources sur l'ensemble du réseau |
| Paroles dynamiques | GET | `/api/sonic/lyrics/nexus` | paroles mot à mot (YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | paroles synchronisées inter-plateformes (sorties multi-formats) |
| Médias audio | GET | `/api/music/stream` | proxy segmenté audio (Range/206 ; connexion directe `?mode=redirect`) |
| | GET | `/api/music/cover` | proxy de pochettes (haute qualité prioritaire, repli SVG) |
| | GET | `/api/music/palette` | analyse de température de couleur des pochettes |
| Authentification | GET | `/api/auth/user` | données de la session courante |
| | GET/POST | `/api/auth/key` | consultation/émission nouvelle d'une clé d'API |
| | POST | `/api/auth/revoke` | tentative de révocation, selon stockage et succès de la requête ; en-tête de clé explicite requis |
| | POST | `/api/auth/logout` | effacement du cookie courant ; révocation distante conditionnelle |

## 3. Authentification par clé d'API

1. Format : format versionné `sonic_live_v2.<header>.<payload>.<signature>`, signature HMAC-SHA256 ; la charge utile contient `sub` (adresse électronique), `iat`, `exp`, `jti`, `kid`, `role` et `uid` ;
2. Émission : obtenue via `/api/auth/key` après connexion Epomail OAuth ; validité d'émission par défaut de 30 jours ; les 90 jours sont uniquement le plafond accepté par le validateur, non une durée de réémission ;
3. Transmission : seuls les en-têtes de requête sont admis, à savoir `X-Sonic-Key: <key>` ou `Authorization: Bearer <key>` ; le canal des paramètres de requête URL a été intégralement supprimé afin d'éviter toute fuite des clés dans les journaux d'accès, l'historique du navigateur ou le Referer ;
4. Validation : le serveur compare à temps constant via Web Crypto, en vérifiant strictement la version, `kid`, `iat`/`exp`, `jti` et les listes de révocation ; les clés sans signature et les clés de versions antérieures sont systématiquement rejetées (fail-closed).

## 4. Limitation de débit et révocation

| Élément | Plafond |
| --- | --- |
| Requêtes anonymes | 240 par minute (valeur par défaut) |
| Requêtes authentifiées | 600 par minute (valeur par défaut) |
| Endpoint d'authentification | 30 par minute et par IP |
| Rapport d'événements comportementaux | 50 événements au plus par lot, corps de requête de 64 KiB |

La déconnexion efface le cookie courant ; l'invalidation des justificatifs copiés dépend d'un stockage de révocation opérationnel et d'une requête réussie. Les listes `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT` et KV doivent être vérifiés sur l'instance ; un échec ou une réponse 501 ne vaut pas révocation. Respectez les réponses de limitation et la [Politique d'utilisation acceptable](/fr/acceptable-use/), sans présumer qu'un usage personnel ne peut jamais atteindre un quota.

## 5. Obligations des intégrateurs

1. la clé d'API est un identifiant d'usage personnel : elle ne doit être ni remise à un tiers ni intégrée à un client publié ;
2. les clients auto-développés doivent respecter la limitation de débit, présenter les avis de dégradation (`X-Sonic-Degraded: 1`) et observer la liste des comportements interdits de la [Politique d'utilisation acceptable](/fr/acceptable-use/) ;
3. l'intégrateur doit informer selon son rôle réel, sans exonérer l'opérateur de ses obligations propres. Ne transmettez pas d'événements facultatifs sans base valable et ne présentez pas `DELETE /api/sonic/events` comme une suppression complète : anciens identifiants anonymes, radar, agrégats, services externes et sauvegardes peuvent être omis, avec des échecs masqués dans l'interface. Voir [Droit de l'open source et de l'auto-hébergement](/fr/open-source/).
