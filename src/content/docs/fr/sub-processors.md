---
title: Liste des partages avec des tiers et des transferts
description: "Liste des partages avec des tiers et des transferts de Sonic : sous-traitants, fournisseur d'identité, sources de contenu amont, chaînes optionnelles, exigences légales et garanties des transferts internationaux."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page énumère intégralement les cas de partage de données à caractère personnel entre le service Sonic (ci-après « le service ») et des tiers, avec les destinataires, les données concernées et les garanties. Elle développe la section 7 de la [Politique de confidentialité](/fr/privacy-policy/) ; le principe de partage est la minimisation nécessaire : aucune vente de données à caractère personnel, aucun partage publicitaire, aucun dépassement de ce que les fonctions du service exigent.

![Carte des partages avec des tiers de Sonic : six canaux (sous-traitants, fournisseur d'identité, sources de contenu amont, fournisseurs optionnels, exigences légales et transferts internationaux), tous centrés sur l'opérateur avec mention des valeurs par défaut des interrupteurs](/images/sonic/sharing-map.svg)

*Figure : les six canaux de partage. Catégorie A : traitement sous-traité en usage continu ; catégorie B : authentification d'identité nécessaire à la connexion ; catégorie C : obtention de contenu pilotée par les requêtes, sans identité d'utilisateur ; catégorie D : chaînes optionnelles désactivées par défaut ; catégorie E : exceptions légales ; catégorie F : garanties des transferts transfrontières.*

## 1. Sous-traitants (usage continu)

| Destinataire | Contenu du service | Données concernées | Garanties |
| --- | --- | --- | --- |
| Cloudflare Pages et Functions | hébergement du frontend, passerelle API edge, exécution de la limitation de débit | métadonnées de requêtes, enregistrements provisoires de limitation | clause de sous-traitance de l'article 28 du RGPD |
| Cloudflare Tunnel | canal chiffré entre le plan de contrôle et le plan de données | métadonnées de trafic chiffré | idem |
| Cloudflare KV et limiteur de débit | compteurs de limitation (expiration 120 secondes), enregistrements de révocation immédiate des clés (si activé) | clés de limitation d'IP, enregistrements de révocation `jti` | idem |

Cloudflare détient globalement les certifications SOC 2 Type II et ISO/IEC 27001 et couvre les transferts transfrontières par les clauses contractuelles types de l'Union européenne. Le traitement par Cloudflare des métadonnées de requêtes au niveau réseau, selon sa propre politique, est décrit dans sa politique de confidentialité.

## 2. Fournisseur d'identité (nécessaire à la connexion)

| Destinataire | Contenu du service | Données concernées | Description |
| --- | --- | --- | --- |
| Epomail (`mail.epocanvas.com`) | connexion et authentification d'identité OAuth 2.0 (PKCE) : autorisation, échange de jetons, interrogation userinfo (avec jeton d'accès) | renvoyées lors de la connexion : identifiant utilisateur, adresse électronique (vérifiée), pseudonyme, URL de l'avatar, rôle du compte | l'adresse électronique n'est pas écrite dans la base de données du service et ne sert qu'à la dérivation de hash dans la session ; le traitement des données entre vous et Epomail relève de sa politique de confidentialité |

## 3. Sources de contenu amont (pilotées par les requêtes, sans identité d'utilisateur)

Les destinataires suivants reçoivent des requêtes ne contenant que les paramètres de requête des morceaux, un User-Agent fixe et le Referer du site officiel correspondant, **sans vos données de compte, cookies ni adresse IP** :

| Destinataire | Contenu du service | Domaines représentatifs | État par défaut |
| --- | --- | --- | --- |
| NetEase Cloud Music | recherche, adresses de lecture, paroles mot à mot (YRC), pochettes | `music.163.com`, `interface3.music.163.com` ; en outre via le conteneur auxiliaire ncm-api sur le réseau interne du plan de données | activé |
| QQ Music | recherche, adresses de lecture, paroles mot à mot (QRC), pochettes | `c.y.qq.com`, `u.y.qq.com`, `y.gtimg.cn`, `ws.stream.qqmusic.qq.com` | activé |
| Kugou Music | recherche, adresses de lecture, paroles mot à mot (KRC) | `m.kugou.com`, `mobilecdn.kugou.com`, `songsearch.kugou.com`, `lyrics.kugou.com` | activé |
| Kuwo Music | recherche, adresses de lecture, pochettes | `www.kuwo.cn`, `m.kuwo.cn`, `search.kuwo.cn` | activé |
| AMLL | complément de paroles mot à mot (TTML) | `api.amll.dev` | activé |
| LRCLIB | complément de paroles synchronisées | `lrclib.net` | activé |
| CDN officiels de contenu | flux audio et pochettes (par défaut via le proxy edge du service) | `music.126.net`, `ws.stream.qqmusic.qq.com`, etc. | activé |

Remarques :

1. l'IP de sortie des requêtes amont est signalée par l'adresse de substitution configurée par le déployeur (adresse documentaire RFC 5737 par défaut), et non par l'IP d'un utilisateur quelconque ;
2. par défaut, les flux audio transitent par le proxy edge et le CDN amont ne voit que l'adresse du serveur proxy ; si vous invoquez expressément le mode de connexion directe `?mode=redirect`, votre navigateur établit la connexion directement avec ce CDN et votre IP est visible de lui (sémantique intrinsèque de la redirection 302) ; le lecteur web n'utilise pas ce mode ;
3. le déployeur peut monter son catalogue autorisé à l'aide de ses propres identifiants d'abonnement (`NETEASE_COOKIE`/`QQ_COOKIE`/`KUGOU_COOKIE`) ; ces identifiants relèvent du compte du déployeur, sans lien avec les utilisateurs finaux, et le code n'embarque aucun cookie de compte réel.

## 4. Chaînes optionnelles et états par défaut

Les quatre premières lignes du tableau ci-dessous forment le tableau des interrupteurs des chaînes optionnelles, désactivées par défaut et activées uniquement par le déployeur. La complétion inter-sources figure séparément à la dernière ligne : elle est activée par défaut et ne fait pas partie des chaînes désactivées par défaut ni de leur tableau d'interrupteurs.

| Destinataire | Contenu du service | Données concernées | Interrupteur et valeur par défaut |
| --- | --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | recherche agrégée tierce | identifiants de morceaux, type et paramètres de source uniquement | `SONIC_ENABLE_GDSTUDIO`, 0 par défaut |
| Lyriva (`api.lyriva.xyz`) | source de repli de paroles | paramètres d'identifiant de morceau uniquement | `SONIC_ENABLE_LYRIVA`, 0 par défaut |
| ListenBrainz / MusicBrainz (`labs.api.listenbrainz.org`, etc.) | renforcement par artistes similaires | identifiants d'artistes/enregistrements uniquement | `SONIC_ENABLE_LISTENBRAINZ`, 0 par défaut |
| Gorse (moteur de recommandation auto-hébergé du déployeur) | filtrage collaboratif externe | identifiants hachés pseudonymisés (`subject_key`) et retours comportementaux | `SONIC_GORSE_URL`, vide par défaut |
| Complétion inter-sources | appariement inter-plateformes du morceau complet pour les morceaux en extrait (morceaux complets gratuits de QQ/Kugou/Kuwo) | métadonnées de morceaux uniquement (durée, titre, artiste) | activée par défaut, sans données d'identité |

## 6. Partages sur exigence légale

L'opérateur ne fournit des données à caractère personnel que si la demande repose sur une base légale concrète : vérification de la légalité et du périmètre de la demande, aucune fourniture volontaire au-delà du périmètre demandé, et notification préalable de la personne concernée dans la mesure permise par la loi (sauf interdiction légale de notification). Le service n'accepte aucune réquisition arbitraire dépourvue de base légale. Le traitement de l'ensemble des réquisitions légales fait l'objet d'une consignation.

## 7. Transferts internationaux

Le plan de contrôle du service fonctionne sur le réseau edge mondial de Cloudflare et les événements comportementaux sont stockés sur le nœud de plan de données de l'opérateur ; vos données à caractère personnel peuvent être traitées sur des nœuds situés hors du pays de l'opérateur. Garanties de transfert :

1. en vertu des articles 44 à 46 du RGPD : la décision d'adéquation de la Commission européenne (article 45) ou les clauses contractuelles types approuvées (l'article 46, paragraphe 2, point c) du RGPD) fondent les relations entre responsable du traitement et sous-traitant ;
2. les certifications de protection des données de Cloudflare (SOC 2 Type II, ISO/IEC 27001) et son annexe de traitement des données sont invoquées ;
3. les requêtes vers les sources de contenu amont ne contiennent aucune donnée à caractère personnel et ne constituent pas un transfert international de données à caractère personnel (voir la section 3).

Les opérateurs auto-hébergés doivent évaluer eux-mêmes les transferts internationaux résultant de leur forme de déploiement et garantir leur conformité aux exigences légales de leur lieu (chapitre V du RGPD ou équivalent local).

## 8. Tenue de la liste

1. avant tout ajout de destinataire, l'opérateur l'inscrit sur la présente page et met à jour la date d'entrée en vigueur et le numéro de version ; les changements majeurs sont annoncés à l'avance sur le site ;
2. en cas de divergence entre la présente liste et la configuration du code source, le code source prévaut et la page est corrigée sans délai ;
3. les opérateurs auto-hébergés doivent tenir leur propre liste de tiers selon leur configuration réelle : les chaînes non activées doivent être retirées de leur information, afin d'éviter toute divulgation excessive ou inexacte.
