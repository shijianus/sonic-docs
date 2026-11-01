---
title: Définitions des termes
description: "Définitions des termes des documents juridiques de Sonic : termes juridiques (vocabulaire du RGPD) et termes techniques, utilisés de manière uniforme sur tout le site."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page définit les termes juridiques et techniques employés dans les documents juridiques du site. Un même terme a la même signification dans tous les documents ; les termes définis s'interprètent selon leur définition, les autres selon leur sens usuel. Les termes juridiques s'appuient sur les définitions du règlement général sur la protection des données (RGPD) de l'Union européenne.

![Carte des termes de Sonic : deux familles de définitions, termes juridiques (vocabulaire du RGPD) et termes techniques, utilisées de manière uniforme sur tout le site, avec la version en chinois simplifié comme base d'interprétation](/images/sonic/key-terms-map.svg)

*Figure : les deux familles de termes du site. La famille juridique s'ancre dans les définitions de l'article 4 du RGPD ; la famille technique se réfère à l'implémentation du code source, vérifiée à chaque mise à jour de version.*

## 1. Termes juridiques

| Terme | Définition |
| --- | --- |
| Données à caractère personnel | toute information se rapportant à une personne physique identifiée ou identifiable (l'article 4, paragraphe 1, du RGPD) ; dans Sonic, par exemple l'identifiant de connexion et les enregistrements d'événements comportementaux |
| Traitement | toute opération portant sur des données à caractère personnel, y compris la collecte, l'enregistrement, le stockage, l'utilisation, la transmission, l'effacement, etc. (l'article 4, paragraphe 2, du RGPD) |
| Limitation du traitement | état dans lequel le traitement est provisoirement suspendu dans certains cas, les données restant conservées (l'article 4, paragraphe 3, et l'article 18 du RGPD) |
| Profilage | toute forme de traitement automatisé consistant à évaluer des caractéristiques personnelles pour fonder des décisions ou des analyses (l'article 4, paragraphe 4, du RGPD) ; le service ne le pratique que dans le périmètre nécessaire à la fonction de recommandation, et vous pouvez tout effacer en un clic |
| Pseudonymisation | traitement des données à caractère personnel de manière à ne plus pouvoir attribuer les données à une personne concernée précise sans recours à des informations supplémentaires (l'article 4, paragraphe 5, du RGPD) ; Sonic la met en œuvre par des hash SHA-256 salés et tronqués |
| Responsable du traitement | la personne physique ou morale qui détermine les finalités et les moyens du traitement (l'article 4, paragraphe 7, du RGPD) ; l'équipe d'exploitation pour l'instance hébergée, le déployeur pour l'instance auto-hébergée |
| Sous-traitant | la personne physique ou morale qui traite des données à caractère personnel pour le compte du responsable (l'article 4, paragraphe 8, du RGPD), par exemple Cloudflare |
| Destinataire | la personne physique ou morale qui reçoit des données à caractère personnel (l'article 4, paragraphe 9, du RGPD), qu'elle soit ou non un tiers |
| Tiers | tout sujet autre que la personne concernée, le responsable, le sous-traitant et les personnes autorisées à traiter (l'article 4, paragraphe 10, du RGPD) |
| Consentement | manifestation de volonté, libre et éclairée, par laquelle la personne concernée accepte (l'article 4, paragraphe 11, et l'article 7 du RGPD) ; il peut être retiré à tout moment avec la même facilité qu'au moment de son expression |
| Violation de données | incident de sécurité entraînant la destruction, la perte, l'altération, la divulgation ou l'accès non autorisés, accidentels ou illégaux, de données à caractère personnel (l'article 4, paragraphe 12, du RGPD) |
| Autorité de contrôle | autorité publique qui veille au respect des obligations de protection des données (l'article 4, paragraphe 19, du RGPD) ; les utilisateurs de l'Union peuvent réclamer auprès de l'autorité de contrôle de leur lieu (l'article 77 du RGPD) |
| Transfert international | transfert de données à caractère personnel vers un pays tiers ou une organisation internationale situés hors de l'Union et de l'Espace économique européen (chapitre V du RGPD) |
| Catégories particulières de données | données à caractère personnel révélant l'origine raciale ou ethnique, les opinions politiques, la santé, la vie sexuelle et autres attributs sensibles (l'article 9 du RGPD) ; le service n'en collecte pas |
| Personne concernée | la personne physique identifiée ou identifiable par les données à caractère personnel (l'article 4, paragraphe 25, du RGPD), c'est-à-dire vous |

## 2. Termes techniques

| Terme | Définition |
| --- | --- |
| Plan de contrôle | passerelle edge s'exécutant sur Cloudflare Pages Functions, chargée du routage, de la limitation de débit, du cache et du disjoncteur |
| Plan de données | pile Docker Compose s'exécutant sur les nœuds Linux propres à l'opérateur, chargée de l'analyse des protocoles, du calcul des recommandations et du stockage |
| sonic-engine | conteneur principal du plan de données (Node.js 22), imposant la validation de la clé inter-services X-Sonic-Engine-Key et lié côté hôte uniquement à l'adresse de bouclage |
| ncm-api sidecar | conteneur auxiliaire du protocole NetEase, confiné sur le réseau interne (`ncm-api:3000`), accessible uniquement via le réseau interne compose |
| OAuth 2.0 + PKCE | flux de connexion en mode code d'autorisation avec preuve d'échange de code (S256) ; le service utilise Epomail comme fournisseur d'identité |
| Clé d'API | clé signée HMAC-SHA256 versionnée au format `sonic_live_v2.<header>.<payload>.<signature>` ; la charge utile contient `sub`/`iat`/`exp`/`jti`/`kid`/`role`/`uid` ; transmission uniquement par en-têtes de requête |
| jti | identifiant de clé dans la charge utile de la clé d'API, servant aux listes de révocation et à l'invalidation immédiate à la déconnexion |
| fail-closed | politique de sécurité refusant le service en cas d'échec de validation ; Sonic l'applique aux clés sans signature, aux clés de versions antérieures et aux pannes de stockage en production |
| Défense SSRF | interception des requêtes sortantes vers les adresses de bouclage, les réseaux privés RFC 1918, les ponts Docker et les adresses de métadonnées du cloud, avec vérification en pile double IPv4/IPv6 et nouvelle vérification à chaque redirection |
| Liste blanche de domaines | les proxys audio, pochettes et transfert n'admettent que des cibles HTTPS de la liste contrôlée de domaines de CDN musicaux (`SONIC_ALLOWED_MUSIC_DOMAINS`) |
| SQLite WAL | stockage persistant des événements comportementaux et des poids d'entités du plan de données, en mode Write-Ahead Logging, dans le volume nommé `sonic-data` |
| Disjoncteur | machine à états à trois états (CLOSED/OPEN/HALF_OPEN) ; après 3 échecs consécutifs ou dépassement du budget de 4,5 secondes, passage en disjonction, puis sonde de reprise après 30 secondes de refroidissement |
| Mode dégradé de l'edge | état de continuité dans lequel, le plan de données étant hors ligne, la couche edge se connecte directement aux interfaces publiques de paroles et de recherche ; l'en-tête de réponse `X-Sonic-Degraded: 1` est apposé et l'interface affiche l'avis de dégradation |
| Cache edge | cache edge indexé par les clés `sonic:*`, période de fraîcheur de 8 minutes, puis état de prolongation de continuité après expiration |
| Range 206 | mécanisme HTTP de chargement segmenté ; par défaut, les flux audio répondent via le proxy edge en 206 Partial Content |
| Mode direct | redirection 302 via `?mode=redirect` : votre navigateur établit la connexion directement avec le CDN officiel ; le lecteur web ne l'utilise pas |
| YRC/QRC/KRC | formats de paroles mot à mot de NetEase, QQ et Kugou ; le service analyse nativement leur encapsulation chiffrée et compressée (XOR + Deflate) |
| TTML | format de langage de balisage temporel des paroles mot à mot d'AMLL |
| LRCLIB | bibliothèque mondiale ouverte de paroles synchronisées, servant de complément lorsque les paroles locales font défaut |
| Détection des extraits | sondage de la durée des entités audio et de leurs métadonnées pour identifier les troncatures officielles en extrait de 30 secondes et les signaler clairement |
| Complétion inter-sources | mécanisme d'appariement inter-plateformes du morceau complet déclenché pour les morceaux en extrait ; activé par défaut, la source de substitution étant indiquée en cas de succès |
| Événements comportementaux | enregistrements de signaux de recommandation tels que lecture, lecture intégrale, saut, favori, refus ; 50 événements et 64 Ko au plus par lot ; les événements de bruit (blocages, sauts dus à des troncatures d'extrait) ne sont pas stockés |
| Effacement du profil en un clic | `DELETE /api/sonic/events` détruit immédiatement l'ensemble des caractéristiques comportementales et des enregistrements vous concernant dans le moteur de recommandation |
| Aperçu du profil de recommandation | résumé du profil renvoyé par `GET /api/sonic/events` : nombre total d'événements, compteurs de favoris et de refus, artistes fréquemment écoutés, tendance de genres, termes de recherche récents, forme de stockage |
| X-Sonic-Context | contexte local du client accompagnant les requêtes de recommandation (favoris, artistes récents et termes de recherche récents, en nombre limité), utilisé uniquement en mémoire sans persistance |
| Filtrage du bruit | mécanisme par lequel le serveur ramène à zéro, sans stockage, le poids des sauts pour les 6 catégories sans cause utilisateur (network_stall/playback_error/trial_end/stream_unavailable/buffer_timeout/auto_switch_error) |

## 3. Base d'interprétation

1. Les termes juridiques s'interprètent sur la base du texte officiel du RGPD ; les termes techniques s'interprètent selon l'implémentation du code source ; en cas de divergence entre le code source et le présent document, il convient de corriger la documentation et de signaler le problème via une Issue du dépôt.
2. Les documents juridiques du site ont pour version officielle la version en chinois simplifié ; les versions anglaise, japonaise et française s'appuient, pour la traduction des termes, sur les correspondances de la présente page.
