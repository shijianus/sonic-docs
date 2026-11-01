---
title: Présentation du projet
description: "Présentation du projet epocanvas sonic : positionnement du produit, fonctions principales, architecture technique, moteur de recommandation, conception de la sécurité et de la confidentialité, périmètre d'application, formes de déploiement et guide de lecture de la documentation."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.3**

La présente page présente epocanvas sonic (ci-après « Sonic » ou « le projet ») : son positionnement produit, ses fonctions principales, son architecture système, sa conception de la sécurité et de la confidentialité, son périmètre d'application et ses formes de déploiement, et propose un itinéraire de lecture de la documentation du site. Que vous envisagiez d'utiliser l'instance hébergée, de procéder à votre propre déploiement ou de vous informer des stipulations de confidentialité et des conditions, vous pouvez partir de cette page. Les stipulations juridiques de Sonic figurent dans la [Politique de confidentialité](/fr/privacy-policy/) et les [Conditions d'utilisation](/fr/terms-of-service/).

![Architecture à deux niveaux de Sonic : les utilisateurs accèdent au plan de contrôle edge de Cloudflare (routage, limitation de débit, cache, disjoncteur) ; le plan de données Linux exécute l'analyse des protocoles, le calcul des recommandations et le stockage SQLite ; les flux audio sont par défaut récupérés depuis le CDN officiel via le proxy edge](/images/sonic/project-architecture.svg)

*Figure : architecture de Sonic à plans de contrôle et de données séparés. Le plan de contrôle s'exécute sur l'edge de Cloudflare Pages ; le plan de données s'exécute sur les nœuds Linux propres à l'opérateur, communique par tunnel chiffré et impose la vérification des clés inter-services ; les flux audio sont par défaut récupérés depuis le CDN officiel via le proxy edge (Range 206), avec un mode de connexion directe 302 en option.*

## 1. Positionnement du projet

Sonic est une plateforme de streaming musical multi-sources et une passerelle d'agrégation développée de manière indépendante, fonctionnant selon une architecture à deux niveaux « plan de contrôle edge Cloudflare + plan de données moteur de protocoles Linux local », conçue pour le streaming haute fidélité, les paroles mot à mot à la milliseconde et une expérience de recommandation autonome et maîtrisée. Le projet est un logiciel open source dont le code source est publié ; chacun peut le déployer lui-même.

| Élément | Description |
| --- | --- |
| Instance hébergée | `sonic.epocanvas.tech` (site principal) et `sonic.epocanvas.com` (miroir de secours), exploitées par l'équipe d'exploitation |
| Instance auto-hébergée | instance privée que toute personne ou organisation déploie sur ses propres serveurs à partir du code open source ; le déployeur est l'opérateur de cette instance et son responsable du traitement |
| Licence du code source | régie par le fichier `LICENSE` à la racine du dépôt (MIT License) ; le projet se positionne comme un projet open source non commercial ; le README historique a exprimé l'intention d'adopter CC BY-NC-SA 4.0, mais jusqu'à décision des mainteneurs, le fichier `LICENSE` prévaut ; les marques et identités de marque ne sont pas couvertes par la licence du code source |
| Mode de connexion | Epomail OAuth 2.0 (PKCE) ; le projet ne dispose pas de système d'inscription autonome |
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
| Gestion autonome des événements comportementaux | les signaux tels que lecture, lecture intégrale, saut, favori et refus peuvent être désactivés à tout moment ; l'« effacement du profil en un clic » détruit immédiatement l'ensemble des enregistrements comportementaux côté serveur |
| Sécurité zéro confiance | clés d'API signées HMAC-SHA256 versionnées, OAuth PKCE, interception SSRF sur toute la chaîne, clés transmises uniquement par en-têtes de requête |
| Résilience et dégradation | lorsque le plan de données est hors ligne, la couche edge bascule en 0 ms vers le mode dégradé ; l'interface affiche clairement l'avis « mode dégradé de l'edge » et la lecture stable des morceaux déjà chargés reste garantie |

## 3. Aperçu de l'architecture technique

### 3.1 Plan de contrôle (edge Cloudflare)

Le plan de contrôle s'exécute sur Cloudflare Pages et Pages Functions et assume les responsabilités suivantes :

1. Routage et authentification : point d'entrée unifié des requêtes API, contrôle d'authentification et vérification des clés signées ;
2. Limitation de débit graduée : 240 requêtes par minute pour les requêtes anonymes et 600 par minute pour les requêtes authentifiées (valeurs par défaut, configurables) ; l'endpoint d'authentification fait en outre l'objet d'une limitation dédiée de 30 requêtes par minute et par IP ;
3. Cache multiniveau : cache edge indexé par les clés `sonic:*`, période de fraîcheur de 8 minutes, passage à l'état de prolongation de continuité après expiration ;
4. Disjoncteur à trois états : après 3 échecs consécutifs ou un appel dépassant le budget de 4,5 secondes, passage à l'état OPEN ; les requêtes suivantes basculent en 0 ms vers la connexion directe edge de secours (interfaces publiques de recherche de QQ/Kugou et AMLL/LRCLIB) ; après 30 secondes de refroidissement, passage en HALF_OPEN pour sonde, puis fermeture en cas de succès. Pendant la dégradation, l'en-tête de réponse `X-Sonic-Degraded: 1` est apposé et une pastille d'avis de dégradation s'allume en haut du lecteur.

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

Par défaut, les flux audio transitent par le proxy edge (proxy de plage d'octets de même origine) depuis les CDN officiels, avec prise en charge du chargement segmenté HTTP `Range` et `206 Partial Content` : le CDN amont ne voit que l'adresse du serveur proxy et ne touche pas l'IP du client. Le mode de connexion directe 302 `?mode=redirect` est réservé aux consommateurs de l'API qui l'invoquent expressément (le lecteur web ne l'utilise pas) ; en mode direct, votre navigateur établit la connexion directement avec le CDN officiel.

## 4. Sources audio et chaîne des paroles

| Source | Positionnement en parts | État |
| --- | --- | --- |
| Analyse native locale (interfaces officielles NetEase/QQ/Kugou/Kuwo + ncm-api) | chaîne principale (plus de 90 %) | activée par défaut |
| Paroles mot à mot AMLL TTML + bibliothèque de paroles synchronisées LRCLIB | complément de paroles (environ 10 %) | activé par défaut |
| Agrégateurs tiers GDStudio/Lyriva | secours d'urgence | strictement désactivé par défaut |
| Renforcement par artistes similaires ListenBrainz/MusicBrainz | renforcement optionnel | désactivé par défaut |

La détection des extraits sonde la durée des entités audio et leurs métadonnées pour identifier les troncatures officielles en extrait de 30 secondes ; le résultat est présenté de manière transparente dans le frontend au moyen de l'indicateur d'extrait et peut déclencher l'appariement inter-plateformes du morceau complet (parmi les morceaux complets gratuits de QQ/Kugou/Kuwo) ; en cas d'appariement réussi, la commutation est fluide et la source de substitution est indiquée. Le projet n'intègre aucun composant de contournement des mécanismes payants et de protection des droits d'auteur.

## 5. Moteur de recommandation intelligent

Le moteur de recommandation s'exécute entièrement en local sur le plan de données ; les poids des signaux comportementaux sont publics dans le code source :

| Signal | Poids | Description |
| --- | --- | --- |
| favorite (ajout aux favoris) | +4,0 | très fortement positif |
| replay (relecture) | +3,5 | fortement positif |
| play_complete (lecture intégrale effective) | +2,5 | positif standard |
| play_progress (écoute progressive) | +0,2 à +1,8 | score échelonné selon la proportion écoutée |
| skip (saut rapide) | -0,8 | un saut après avoir écouté plus de la moitié compte +0,25 |
| dislike (refus explicite) | -5,0 | filtrage dur et inscription sur liste noire |

Filtrage du bruit et des faux signaux : les sauts dus à des blocages réseau (network_stall), à des échecs de décodage (playback_error), à des troncatures en extrait (trial_end), à des flux indisponibles (stream_unavailable), à des dépassements de délai de mise en mémoire tampon (buffer_timeout) ou à des échecs de commutation automatique (auto_switch_error) ont un poids constant de zéro et ne sont pas stockés.

Le modèle de popularité combine la lecture effective (35 %), les auditeurs uniques (25 %), la performance de lecture intégrale (20 %), la conversion en favoris (15 %) et la pente de croissance (5 %), complété par une décroissance temporelle exponentielle (palmarès des 24 heures et palmarès cumulé sur 7 jours), un lissage bayésien et un score de Wilson ; le calcul de similarité fusionne le graphe de relations entre artistes et le cosinus des caractéristiques audio, et le reclassement par pertinence marginale MMR équilibre précision et diversité. L'intention de recherche au niveau de la session et les préférences de long terme sont découplées par niveaux : seuls les comportements à forte valeur tels que lecture intégrale et favoris alimentent le profil de long terme.

## 6. Aperçu de la conception de la sécurité

1. Authentification : mode code d'autorisation Epomail OAuth 2.0 ; le paramètre `state` et le PKCE (S256) préviennent l'interception et le rejeu du code d'autorisation ; les cookies de transaction OAuth ont une durée de validité de 600 secondes ;
2. Clé d'API : format versionné `sonic_live_v2.<header>.<payload>.<signature>`, signature HMAC-SHA256, charge utile contenant `sub`, `iat`, `exp`, `jti`, `kid`, `role` et `uid` ; durée de validité d'émission de 30 jours et plafond de validation de 90 jours ; le serveur compare à temps constant via Web Crypto ; les clés sans signature et les clés de versions antérieures sont systématiquement rejetées (fail-closed) ; les clés ne transitent que par les en-têtes de requête `X-Sonic-Key` ou `Authorization`, le canal des paramètres de requête URL ayant été intégralement supprimé ;
3. Révocation : la déconnexion révoque immédiatement la session courante et l'identifiant de clé (jti) ; liste de révocation de jti, liste de révocation des sujets et borne temporelle minimale globale d'émission sont prises en charge ; la révocation immédiate est disponible en cas de liaison à KV ;
4. Session : cookie `sonic_session` avec attributs `HttpOnly; Secure; SameSite=Lax`, durée de validité de 30 jours au plus ; les clés ne sont jamais écrites dans l'URL, dans le localStorage ni à un emplacement accessible aux scripts de la page ;
5. Défense SSRF : les requêtes sortantes vers les adresses de bouclage, les réseaux privés RFC 1918, les ponts internes Docker et les adresses de métadonnées du cloud (telles que `169.254.169.254`) sont systématiquement bloquées, avec vérification en pile double IPv4 et IPv6 et nouvelle vérification de la cible et du résultat de résolution DNS à chaque redirection.

## 7. Aperçu de la conception de la confidentialité

1. Pseudonymisation par défaut : les événements comportementaux sont associés, dès la collecte, à des identifiants à sens unique par hachage ; l'adresse électronique n'est jamais persistée ;
2. Interrupteur autonome de personnalisation : la personnalisation peut être désactivée à tout moment dans les paramètres du lecteur ; une fois désactivée, les événements ne sont plus stockés et, en mode public, ils sont directement jetés ;
3. Effacement en un clic : le bouton « Effacer le profil de recommandation » de la page des paramètres détruit immédiatement l'ensemble des événements comportementaux côté serveur ; « Effacer toutes les données locales » efface immédiatement le stockage local du navigateur et l'IndexedDB ;
4. Minimisation des journaux : les journaux d'accès du plan de données ne contiennent que le chemin, la méthode, le code d'état et le temps de traitement.

La formulation intégrale des engagements de confidentialité figure dans la [Politique de confidentialité](/fr/privacy-policy/) et les mesures techniques dans [Traitement des données et mesures de sécurité](/fr/data-security/).

## 8. À qui ce projet convient et à qui il ne convient pas

Convient : aux auditeurs particuliers qui souhaitent se connecter avec leur propre compte Epomail et tiennent à la transparence et à l'effaçabilité du profil de recommandation ; aux mélomanes assidus ayant besoin d'une recherche agrégée multi-sources et de paroles mot à mot ; aux utilisateurs auto-hébergés disposant de bases en Linux et Docker et disposés à assumer la responsabilité d'opérateur.

Ne convient pas : aux scénarios recherchant les garanties d'exploitation d'un service musical commercial, le projet ne stockant ni n'hébergeant de musique et n'accordant aucune sous-licence sur les contenus ; aux équipes attendant un accord de niveau de service (SLA) ou un support commercial ; aux utilisateurs ne pouvant accepter que « les extraits soient signalés de manière transparente et la complétion inter-sources fournie au mieux ».

## 9. Périmètre des contenus et du droit d'auteur

Sonic est un outil de recherche, d'agrégation et de lecture qui ne stocke ni n'héberge aucun fichier musical. Les droits sur les enregistrements, paroles, pochettes, images d'artistes et autres contenus appartiennent à leurs titulaires respectifs ; le projet n'accorde aucune sous-licence sur les contenus musicaux. Les morceaux des abonnements légaux sont montés par le déployeur à l'aide de ses propres identifiants autorisés (tels que `NETEASE_COOKIE`, qui correspond au compte du déployeur et non à celui de l'utilisateur final) ; les contenus publics suivent les protocoles ouverts officiels.

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
4. Processus de vérification factuelle : à chaque mise à jour de version, l'ensemble des faits de traitement des données du site est confronté au code source (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`, etc.) ; en cas de divergence avec le code source, celui-ci prévaut et la documentation est corrigée sans délai.

## 12. Questions fréquentes

**Le service est-il payant ? Y a-t-il des publicités ?**
Le service est gratuit, sans publicité et sans achats intégrés ; les coûts d'exploitation de l'instance hébergée sont assumés par l'équipe d'exploitation. Le service ne collecte aucune donnée à des fins publicitaires.

**Peut-on l'utiliser sans se connecter ?**
Oui. La recherche, la lecture, les paroles, les classements et les autres fonctions principales sont utilisables de manière anonyme (avec une limitation de débit plus stricte) ; la connexion débloque la synchronisation cloud des favoris, les recommandations personnalisées et Auto DJ.

**Où mes données sont-elles stockées ?**
À trois endroits : les favoris, les playlists et les préférences du lecteur sont stockés dans le stockage local de votre navigateur ; les téléchargements et la musique locale dans l'IndexedDB de votre navigateur ; le serveur ne conserve que les événements comportementaux pseudonymisés (destruction automatique après 90 jours). L'adresse électronique n'est jamais persistée. Voir la section 4 de la [Politique de confidentialité](/fr/privacy-policy/).

**Comment supprimer mon profil comportemental ?**
Paramètres → Confidentialité et données locales → « Réinitialiser le profil de recommandation et l'historique de refus », ou appel direct de `DELETE /api/sonic/events`, avec effet immédiat ; « Effacer toutes les données locales » vide à la fois les données du navigateur et celles du serveur. Emplacement dans l'interface : section 9 du [Guide de l'interface et des fonctions](/fr/interface/).

**La recommandation me suit-elle ?**
La recommandation ne sert qu'à l'ordonnancement de la lecture : aucun suivi intersites, aucun profil publicitaire ; la personnalisation peut être désactivée à tout moment et, une fois désactivée, le service passe en mode purement public et ne enregistre plus aucun événement.

**Pourquoi certains morceaux ne durent-ils que 30 secondes ?**
Ce sont des troncatures en extrait officielles de la plateforme source ; le lecteur les signale fidèlement au moyen de l'indicateur d'extrait et ne les présente jamais comme des morceaux complets ; lorsque la complétion inter-sources est activée, l'appariement automatique d'un morceau complet gratuit est tenté et la source est indiquée.

**Les badges de qualité audio sont-ils fiables ?**
Oui. Le badge reflète le niveau réel du flux audio en cours ; il suit en temps réel les variations du niveau amont, sans fausse étiquette (voir la section 4, paragraphe 3, des [Conditions d'utilisation](/fr/terms-of-service/)).

**Quelles sont mes responsabilités en cas d'auto-hébergement ?**
Dès le moment du déploiement, vous êtes le responsable du traitement des données de votre instance : vous devez remplir votre obligation d'information envers vos utilisateurs, tenir le registre des activités de traitement, réaliser au besoin une analyse d'impact et mettre en œuvre les mesures de sécurité. Point de départ : section 6 de [Traitement des données et mesures de sécurité](/fr/data-security/).

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
