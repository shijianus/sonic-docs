---
title: Présentation du projet
description: "Présentation du projet epocanvas sonic : positionnement du produit, fonctions principales, architecture technique, moteur de recommandation, conception de la sécurité et de la confidentialité, périmètre d'application, formes de déploiement et guide de lecture de la documentation."
---

**Date de révision : 2 novembre 2026｜Version : 1.8**

La présente page présente epocanvas sonic (ci-après « Sonic » ou « le projet ») : son positionnement produit, ses fonctions principales, son architecture système, sa conception de la sécurité et de la confidentialité, son périmètre d'application et ses formes de déploiement, et propose un itinéraire de lecture de la documentation du site. Que vous envisagiez d'utiliser l'instance hébergée, de procéder à votre propre déploiement ou de vous informer des stipulations de confidentialité et des conditions, vous pouvez partir de cette page. Les stipulations juridiques de Sonic figurent dans la [Politique de confidentialité](/fr/privacy-policy/) et les [Conditions d'utilisation](/fr/terms-of-service/). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

![Architecture à deux niveaux de Sonic : les utilisateurs accèdent au plan de contrôle edge de Cloudflare (routage, limitation de débit, cache, disjoncteur) ; le plan de données Linux exécute l'analyse des protocoles, le calcul des recommandations et le stockage SQLite ; les flux audio sont par défaut récupérés depuis le CDN officiel via le proxy edge](/images/sonic/project-architecture.svg)

*Figure : architecture de Sonic à plans de contrôle et de données séparés. Le plan de contrôle s'exécute sur l'edge de Cloudflare Pages ; le plan de données s'exécute sur les nœuds Linux propres à l'opérateur, communique par tunnel chiffré et impose la vérification des clés inter-services ; les flux audio sont par défaut récupérés depuis le CDN officiel via le proxy edge (Range 206), avec un mode de connexion directe 302 en option.*

## 1. Positionnement du projet

Sonic est un projet personnel mené à titre accessoire, gratuit et à but non lucratif, consacré à l'apprentissage et aux tests d'intérêt général, sans SLA ni garantie d'exploitation permanente. Il fournit une plateforme musicale multi-sources et une passerelle d'agrégation selon une architecture « plan de contrôle edge Cloudflare + plan de données moteur de protocoles Linux ». Le code est ouvert et peut être déployé indépendamment ; « local » pour le moteur désigne le serveur de l'opérateur, pas nécessairement l'appareil de l'utilisateur.

| Élément | Description |
| --- | --- |
| Instance hébergée | `sonic.epocanvas.tech` et `sonic.epocanvas.com`, pour les instances effectivement exploitées par le projet ; l'identité juridique de l'opérateur et les pays des nœuds ne sont pas vérifiés par le code |
| Instance auto-hébergée | instance déployée indépendamment ; les rôles et obligations dépendent de l'exploitation et des décisions de traitement réelles |
| Licence du code source | le `LICENSE` de la racine et `player/LICENSE` sont MIT dans la RC `a75f5cb` ; l'ancien `main@ce443c8` n'a pas de `LICENSE` racine vérifiée et seule la licence MIT du lecteur y est vérifiable. Le caractère non lucratif n'interdit pas l'usage commercial autorisé par MIT ; marques et médias relèvent de droits distincts |
| Mode de connexion | La dernière RC publique utilise Epomail OAuth 2.0 (PKCE), sans système d'inscription autonome ; l'ancien `main@ce443c8` n'offre pas ces contrôles RC et la version en ligne reste inconnue |
| Composition logicielle | frontend Cloudflare Pages et fonctions edge (plan de contrôle), moteur local Node.js 22 et conteneur auxiliaire ncm-api (plan de données), lecteur web Vue 3 |

## 2. Aperçu des fonctions principales

![Interface réelle du lecteur Sonic : navigation à gauche (Découvrir, Ma musique, Système), page d'accueil agrégeant le carrousel de recommandations, la recommandation intelligente et le radar musical, les playlists recommandées, avec mini-barre de lecture en bas](/images/sonic/ui/ui-home.png)

*Figure : écran réel du lecteur web de l'instance hébergée. Le tour d'horizon détaillé des zones de l'interface et de l'emplacement de chaque fonction figure dans le [Guide de l'interface et des fonctions](/fr/interface/).*

| Capacité | Description |
| --- | --- |
| Recherche agrégée multi-sources | recherche unifiée sur toutes les sources avec tolérance aux erreurs : unification des formes de caractères simplifiées et traditionnelles, recherche par pinyin et par abréviations, correspondance symétrique des alias d'artistes en chinois et en langue étrangère, tolérance aux fautes de frappe par distance d'édition, identification des versions ; récupération parallèle multi-sources, fusion avec déduplication par expression régulière |
| Paroles dynamiques mot à mot | analyse par rétro-ingénierie native des formats YRC de NetEase, QRC de QQ et KRC de Kugou (déchiffrement XOR + décompression Deflate), complétée par AMLL TTML et la bibliothèque mondiale de paroles LRCLIB ; paroles multilingues, romanisation et traductions synchronisées à la milliseconde |
| Graduation de la qualité audio et transparence des extraits | vérification stricte des entités distinguant les morceaux complets des troncatures officielles en extrait de 30 secondes ; un extrait n'est jamais présenté comme un morceau complet ; les morceaux en extrait déclenchent automatiquement la complétion inter-sources du morceau complet (configurable), la source de complétion étant indiquée de manière transparente |
| Recommandation intelligente et Auto DJ | moteur de recommandation léger local : modèle de popularité multi-facteurs, intention de recherche en session, quantification des retours comportementaux, similarité de contenu et reclassement de diversité MMR ; sans cluster de big data externe |
| Gestion autonome des événements comportementaux | commandes de personnalisation et de réinitialisation ; l'effacement actuel est partiel et certains échecs ne sont pas affichés, voir la politique de confidentialité |
| Conception de sécurité | La RC comprend PKCE, sessions signées, clés d'API versionnées et certaines validations SSRF ; cookies, transmission des justificatifs et configuration doivent être vérifiés. L'ancien `main@ce443c8` ne prouve pas les fonctionnalités de la RC ni celles en ligne |
| Résilience et dégradation | la couche edge dispose d'un mode dégradé et d'un avis dans l'interface ; cela ne garantit ni un délai nul de bascule ni la continuité de la lecture |

## 3. Aperçu de l'architecture technique

### 3.1 Plan de contrôle (edge Cloudflare)

Le plan de contrôle s'exécute sur Cloudflare Pages et Pages Functions et assume les responsabilités suivantes :

1. Routage et authentification : point d'entrée unifié des requêtes API, contrôle d'authentification et vérification des clés signées ;
2. Limitation de débit graduée : 240 requêtes par minute pour les requêtes anonymes et 600 par minute pour les requêtes authentifiées (valeurs par défaut, configurables) ; l'endpoint d'authentification fait en outre l'objet d'une limitation dédiée de 30 requêtes par minute et par IP ;
3. Cache multiniveau : cache edge indexé par les clés `sonic:*`, période de fraîcheur de 8 minutes, passage à l'état de prolongation de continuité après expiration ;
4. Disjoncteur à trois états : après 3 échecs consécutifs ou un appel dépassant le budget de 4,5 secondes, passage à l'état OPEN ; les requêtes suivantes n'attendent plus le plan de données défaillant et tentent le chemin de secours edge (interfaces publiques de recherche de QQ/Kugou et AMLL/LRCLIB), mais le réseau peut encore introduire un délai ; après 30 secondes de refroidissement, passage en HALF_OPEN pour sonde, puis fermeture en cas de succès. Pendant la dégradation, l'en-tête de réponse `X-Sonic-Degraded: 1` est apposé et une pastille d'avis de dégradation s'allume en haut du lecteur.

### 3.2 Plan de données (moteur de protocoles Linux)

Le plan de données est une pile Docker Compose exécutée sur les nœuds Linux propres à l'opérateur :

| Composant | Description |
| --- | --- |
| Conteneur principal sonic-engine | service HTTP Node.js 22 écoutant sur le port 8080, mappé côté hôte uniquement sur `127.0.0.1` ; toutes les routes `/api`, `/proxy` et `/palette` imposent la validation de la clé inter-services (X-Sonic-Engine-Key) |
| Conteneur auxiliaire ncm-api | service auxiliaire du protocole NetEase Cloud Music, accessible uniquement sur le réseau interne compose (`ncm-api:3000`), sans exposition sur l'Internet public |
| SQLite 3 (mode WAL) | stockage persistant des événements comportementaux et des poids d'entités, dans le volume nommé `sonic-data` (`/app/data/sonic-recommend.sqlite` dans le conteneur) ; les sauvegardes s'exécutent par instantané cohérent (VACUUM INTO) accompagné d'un contrôle d'intégrité |
| Modules de protocoles natifs | analyse en TypeScript pur des protocoles NetEase linuxapi/eapi, QQ, KRC de Kugou et Kuwo |

Le plan de contrôle et le plan de données communiquent par le canal chiffré Cloudflare Tunnel ; le plan de données n'expose aucun port directement sur l'Internet public.

### 3.3 Chemin des flux audio

Les flux audio passant par le proxy edge utilisent `Range` et `206 Partial Content` ; pour ces requêtes, l'amont peut voir l'adresse du proxy plutôt que celle du client. Ce n'est pas une protection générale de l'IP : les MV, images, avatars, Google Fonts et autres ressources directes peuvent être demandés par le navigateur. Un chemin DiceBear transmet même l'adresse électronique en clair comme `seed` et doit être corrigé. Le mode `?mode=redirect` établit aussi une connexion directe ; certains liens amont utilisent HTTP, sans garantie de chiffrement de bout en bout.

## 4. Sources audio et chaîne des paroles

| Source | Positionnement en parts | État |
| --- | --- | --- |
| Analyse native locale (interfaces officielles NetEase/QQ/Kugou/Kuwo + ncm-api) | chaîne principale (plus de 90 %) | activée par défaut |
| Paroles mot à mot AMLL TTML + bibliothèque de paroles synchronisées LRCLIB | complément de paroles (environ 10 %) | activé par défaut |
| Agrégateurs tiers GDStudio/Lyriva | chemins facultatifs | GDStudio est activé si le réglage manque dans le code, mais désactivé dans l'exemple d'environnement et Compose ; vérifier l'instance |
| Renforcement par artistes similaires ListenBrainz/MusicBrainz | renforcement optionnel | désactivé par défaut |

La détection des extraits sonde la durée des entités audio et leurs métadonnées pour identifier les troncatures officielles en extrait de 30 secondes ; le résultat est présenté de manière transparente dans le frontend au moyen de l'indicateur d'extrait et peut déclencher l'appariement inter-plateformes du morceau complet (parmi les morceaux complets gratuits de QQ/Kugou/Kuwo) ; en cas d'appariement réussi, la commutation est fluide et la source de substitution est indiquée. Le projet n'intègre aucun composant de contournement des mécanismes payants et de protection des droits d'auteur.

## 5. Moteur de recommandation intelligent

Le moteur principal de recommandation s'exécute sur le plan de données de l'opérateur ; cela ne signifie pas un traitement limité au navigateur et des fournisseurs externes optionnels peuvent être configurés. La personnalisation et Auto DJ sont activés par défaut dans le code candidat, sans que ce défaut prouve un consentement valable ; les poids des signaux sont publics dans le code source :

| Signal | Poids | Description |
| --- | --- | --- |
| favorite (ajout aux favoris) | +4,0 | très fortement positif |
| replay (relecture) | +3,5 | fortement positif |
| play_complete (lecture intégrale effective) | +2,5 | positif standard |
| play_progress (écoute progressive) | +0,2 à +1,8 | score échelonné selon la proportion écoutée |
| skip (saut rapide) | -0,8 | un saut après avoir écouté plus de la moitié compte +0,25 |
| dislike (refus explicite) | -5,0 | filtrage dur et inscription sur liste noire |

Filtrage du bruit et des faux signaux : les sauts dus à des blocages réseau (network_stall), à des échecs de décodage (playback_error), à des troncatures en extrait (trial_end), à des flux indisponibles (stream_unavailable), à des dépassements de délai de mise en mémoire tampon (buffer_timeout) ou à des échecs de commutation automatique (auto_switch_error) ont un poids constant de zéro et ne sont pas stockés.

Le modèle de popularité combine la lecture effective (35 %), les auditeurs uniques (25 %), la performance de lecture intégrale (20 %), la conversion en favoris (15 %) et la pente de croissance (5 %), complété par une décroissance temporelle exponentielle (palmarès des 24 heures et palmarès cumulé sur 7 jours), un lissage bayésien et un score de Wilson ; le calcul de similarité fusionne le graphe de relations entre artistes et le cosinus des caractéristiques audio, et le reclassement par pertinence marginale MMR équilibre précision et diversité. L'intention de recherche de session influe sur le classement immédiat, mais les requêtes sont aussi comptabilisées séparément et peuvent apparaître dans les suggestions publiques ; les demandes de recommandation peuvent transmettre favoris locaux, artistes récents et contexte de recherche. Les identifiants pseudonymes restent potentiellement associables.

## 6. Aperçu de la conception de la sécurité

1. Authentification : mode code d'autorisation Epomail OAuth 2.0 ; le paramètre `state` et le PKCE (S256) préviennent l'interception et le rejeu du code d'autorisation ; les cookies de transaction OAuth ont une durée de validité de 600 secondes ;
2. Clé d'API : justificatif signé `sonic_live_v2`, au format versionné `sonic_live_v2.<header>.<payload>.<signature>`, signature HMAC-SHA256, charge utile contenant `sub`, `iat`, `exp`, `jti`, `kid`, `role` et `uid` ; durée d'émission par défaut de 30 jours ; les 90 jours sont uniquement le plafond accepté par le validateur, non une durée de réémission ; le serveur compare à temps constant via Web Crypto ; les clés sans signature et les clés de versions antérieures sont systématiquement rejetées (fail-closed) ; les clés ne transitent que par les en-têtes de requête `X-Sonic-Key` ou `Authorization`, le canal des paramètres de requête URL ayant été intégralement supprimé ;
3. Révocation : la déconnexion efface le cookie courant ; la révocation côté serveur des justificatifs copiés dépend du stockage configuré et du succès de la requête. Les listes de jti, de sujets et la borne temporelle minimale d'émission doivent être vérifiées sur l'instance ;
4. Session : cookie `sonic_session` avec attributs `HttpOnly; Secure; SameSite=Lax`, durée par défaut de 30 jours ; la signature n'est pas un chiffrement. Le stockage local `auth` conserve notamment l'adresse électronique et l'avatar, même si le cookie HttpOnly n'est pas lisible par les scripts ;
5. Défense SSRF : la RC contient des validations de cible propres à certaines routes pour les adresses de bouclage, réseaux privés, métadonnées cloud et redirections. Leur couverture doit être vérifiée par route ; elles ne couvrent pas toutes les requêtes ni les connexions directes du navigateur.

## 7. Aperçu de la conception de la confidentialité

1. Pseudonymisation : les identifiants hachés ou `anon_` restent potentiellement associables à une personne ; l'adresse électronique et l'avatar sont notamment conservés dans `auth` localStorage ;
2. Personnalisation : le commutateur commande les événements concernés, mais ne suffit pas à arrêter la collecte distincte de recherches brutes ou leur affichage dans les suggestions publiques. Les réglages par défaut et la connexion ne valent pas consentement au profilage facultatif ;
3. Effacement : la réinitialisation ne couvre qu'une partie des événements et retours de l'identité courante ; anciens identifiants anonymes, radar, agrégats, services externes et sauvegardes peuvent être omis, et des échecs masqués. L'effacement local n'est pas une preuve de suppression distante ;
4. Minimisation des journaux : elle ne constitue pas une garantie zéro journal pour l'hôte et les tiers ; la limitation utilise notamment l'IP brute ou des clés KV et l'edge transmet des informations de connexion au moteur.

La formulation intégrale des engagements de confidentialité figure dans la [Politique de confidentialité](/fr/privacy-policy/) et les mesures techniques dans [Traitement des données et mesures de sécurité](/fr/data-security/).

## 8. À qui ce projet convient et à qui il ne convient pas

Convient : aux auditeurs particuliers qui souhaitent se connecter avec leur propre compte Epomail et tiennent à la transparence et à l'effaçabilité du profil de recommandation ; aux mélomanes assidus ayant besoin d'une recherche agrégée multi-sources et de paroles mot à mot ; aux utilisateurs auto-hébergés disposant de bases en Linux et Docker et disposés à assumer la responsabilité d'opérateur.

Ne convient pas : aux scénarios recherchant les garanties d'exploitation d'un service musical commercial ; le projet ne fournit aucune licence de catalogue, mais des chemins de proxy, de cache et de stockage local existent, et il ne faut pas en déduire une absence totale de stockage ou de transmission de musique ; aux équipes attendant un accord de niveau de service (SLA) ou un support commercial ; aux utilisateurs ne pouvant accepter que « les extraits soient signalés de manière transparente et la complétion inter-sources fournie au mieux ».

## 9. Périmètre des contenus et du droit d'auteur

Sonic est un outil de recherche, d'agrégation et de lecture ; les fichiers importés et téléchargés peuvent être stockés dans le navigateur. Les droits sur les enregistrements, paroles, pochettes et images appartiennent à leurs titulaires ; aucune licence musicale n'est accordée. Des identifiants tels que `NETEASE_COOKIE` peuvent donner accès à un abonnement du déployeur, sans autoriser pour autant sa mise à disposition publique. Ni l'accessibilité d'une interface ni un usage personnel, éducatif ou non lucratif ne prouvent une autorisation ou une exception au droit d'auteur.

Lors de votre utilisation du service, vous devez respecter la [Politique d'utilisation acceptable](/fr/acceptable-use/) ; le déployeur doit vérifier lui-même que son scénario d'utilisation est conforme aux lois locales, aux conditions des services amont et aux exigences de licence des contenus.

## 10. Formes de déploiement

| Forme | Composition | Points clés |
| --- | --- | --- |
| Passerelle edge Cloudflare Pages | SPA frontend + Pages Functions | publication après construction via `wrangler pages deploy` ; configuration requise de `SONIC_SECRET`, `SONIC_ENGINE_SECRET` et `SONIC_LOCAL_ENGINE_URL` |
| Moteur de protocoles Linux local | sonic-engine + ncm-api + SQLite | déploiement via `docker compose up -d --build` ; permissions 600 sur `.env` ; raccordement via Cloudflare Tunnel |

Les deux formes constituent ensemble le service complet ; en l'absence de plan de données, le service fonctionne automatiquement en mode dégradé de l'edge. La liste complète des variables d'environnement figure dans `.env.example` et `docs/OPERATIONS.md` du dépôt amont.

## 11. Assurance qualité

Le projet garantit la qualité par l'auditabilité et la vérification automatisée :

1. Audit de sécurité et remédiation : le dépôt amont comporte un rapport d'audit de sécurité (`SECURITY_AUDIT_REPORT.md`, `SECURITY_FIX_SUMMARY.md`) et un dossier de remédiation point par point (`docs/AUDIT_REMEDIATION.md`), couvrant la signature des API, le flux OAuth, la défense SSRF et le XSS frontend, entre autres ;
2. Portes de tests automatisés : la suite de tests couvre le comportement de la passerelle, la compatibilité de l'authentification, les cas SSRF, le moteur local et la dégradation, les recommandations et la recherche, le XSS frontend, la cohérence de configuration (config parity) et les portes de publication P0/P1, et s'exécute à chaque publication ;
3. Vérification de la cohérence documentaire : le site vérifie automatiquement trois points : absence de liens rompus dans les ancres internes et les références d'images, symétrie structurelle 1:1 des versions multilingues, et conformité des références aux articles du RGPD avec la liste blanche du dossier de vérification ;
4. Vérification factuelle : cette révision s'appuie sur la RC publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), vérifiée le 2026-11-02, distincte de l'ancien `main@ce443c8` (2026-10-27 UTC) ; aucun de ces états ne certifie l'environnement en ligne. Les écarts documentaires doivent être corrigés ; le code ne remplace ni une base licite ni les engagements et droits applicables.

## 12. Questions fréquentes

**Le service est-il payant ? Y a-t-il des publicités ?**
Ce projet personnel de test est gratuit, sans publicité ni achats intégrés, et à but non lucratif ; il ne propose pas de SLA. Le projet n'a pas de finalité publicitaire.

**Peut-on l'utiliser sans se connecter ?**
Les fonctions de base sont utilisables sans connexion, ce qui ne garantit pas l'anonymat. La personnalisation et Auto DJ sont activés par défaut dans le code, sans consentement affirmatif démontré ; la connexion ne crée pas de synchronisation cloud générale. Le radar comporte une logique de synchronisation, mais sa route distante manque dans la version vérifiée.

**Où mes données sont-elles stockées ?**
Favoris, playlists et préférences sont principalement dans le navigateur ; `auth` peut conserver l'adresse électronique et l'avatar. Les corps audio et les pochettes intégrées sont dans IndexedDB, mais les images de pochette peuvent aussi être envoyées avec les événements de favoris et entrer dans le catalogue distant de morceaux : elles ne sont pas garanties exclusivement locales. Métadonnées, retours et contexte de recommandation peuvent être transmis ; des traitements distants concernent aussi le radar et les statistiques de recherche. La RC prévoit 90 jours par défaut pour les événements, avec un minimum de 7 jours, mais le nettoyage et l'effacement sont incomplets. Voir les sections 4 et 6 de la [Politique de confidentialité](/fr/privacy-policy/).

**Comment supprimer mon profil comportemental ?**
Utilisez Paramètres → Confidentialité et données locales → « Réinitialiser le profil de recommandation et l'historique de refus », ou `DELETE /api/sonic/events`, en sachant que l'effacement est partiel et peut échouer sans message. Les anciens identifiants anonymes, le radar, les agrégats, services externes et sauvegardes peuvent être omis. Pour une demande complète, contactez `privacy@epocanvas.com` ; voir le [Guide de l'interface et des fonctions](/fr/interface/).

**La recommandation me suit-elle ?**
Elle constitue un profilage de préférences, sans finalité publicitaire déclarée. La désactivation agit sur les événements concernés, pas sur tous les envois : les recherches brutes peuvent encore alimenter les suggestions publiques. La navigation privée ne bloque pas ces requêtes.

**Pourquoi certains morceaux ne durent-ils que 30 secondes ?**
Ce sont des troncatures en extrait officielles de la plateforme source ; le lecteur les signale fidèlement au moyen de l'indicateur d'extrait et ne les présente jamais comme des morceaux complets ; lorsque la complétion inter-sources est activée, l'appariement automatique d'un morceau complet gratuit est tenté et la source est indiquée.

**Les badges de qualité audio sont-ils fiables ?**
Oui. Le badge reflète le niveau réel du flux audio en cours ; il suit en temps réel les variations du niveau amont, sans fausse étiquette (voir la section 4, paragraphe 3, des [Conditions d'utilisation](/fr/terms-of-service/)).

**Quelles sont mes responsabilités en cas d'auto-hébergement ?**
Vos rôles dépendent des finalités et moyens que vous décidez réellement. Pour un service public, vérifiez l'identité du responsable, la loi applicable, les choix préalables, la sécurité, la conservation et l'effacement ; les registres, analyses d'impact et garanties internationales dépendent des conditions légales applicables. Voir [Traitement des données et mesures de sécurité](/fr/data-security/).

**Quelles langues le service prend-il en charge ?**
Le lecteur intègre le chinois simplifié, l'anglais et le japonais ; la documentation du site est offerte en 10 langues.

## 13. Guide de lecture des documents

| Document | Contenu |
| --- | --- |
| [Vue d'ensemble](/fr/overview/) | identité de la plateforme, rôles de traitement des données, carte documentaire et ordre de prévalence |
| [Politique de confidentialité](/fr/privacy-policy/) | information sur la collecte des données, bases juridiques, durées de conservation, droits des personnes concernées |
| [Conditions d'utilisation](/fr/terms-of-service/) | conditions contractuelles d'utilisation du service, limitation de responsabilité, droit applicable |
| [Politique d'utilisation acceptable](/fr/acceptable-use/) | limites comportementales, liste des comportements interdits, gradation des mesures et recours |
| [Traitement des données et mesures de sécurité](/fr/data-security/) | cycle de vie des données, matrice de traitement, mesures de sécurité, gestion des incidents |
| [Liste des partages avec des tiers et des transferts](/fr/sub-processors/) | destinataires, données concernées, garanties des transferts internationaux |
| [Définitions des termes](/fr/key-terms/) | termes juridiques (vocabulaire du RGPD) et termes techniques |

Itinéraire de lecture : pour connaître le produit et le déploiement, partez de cette page ; pour les stipulations de confidentialité et des conditions, partez de la [Vue d'ensemble](/fr/overview/) ; pour la définition d'un terme précis, consultez les [Définitions des termes](/fr/key-terms/).
