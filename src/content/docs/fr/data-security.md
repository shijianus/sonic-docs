---
title: Traitement des données et mesures de sécurité
description: Cycle de vie des données, limites du traitement, mesures de sécurité, limites connues, réponse aux violations et indications pour les déploiements indépendants du service hébergé Sonic.
---

**Date de révision : 2 novembre 2026｜Version : 1.8**

Cette page développe la section 10 de la [Politique de confidentialité](/fr/privacy-policy/) et décrit les limites observables du traitement des données et de la sécurité des instances hébergées Sonic. Ce projet gratuit et à but non lucratif est maintenu par une personne. Son objectif est de respecter la vie privée et, par des efforts raisonnables, d'offrir un niveau élevé de protection au moyen de mesures rigoureuses et proportionnées aux risques. Les principes du RGPD de minimisation des données, de limitation des finalités, de transparence et de contrôle par les utilisateurs guident l'amélioration continue.

Cet objectif ne vaut ni certification européenne ni déclaration de conformité intégrale au RGPD et aux lois de tous les États membres. Il ne garantit ni sécurité absolue, ni absence de fuite ou de perte de données, ni effacement immédiat et complet. La protection effective dépend du déploiement, de la configuration et des traitements des tiers ; cette page distingue les mesures constatées dans le code, les éléments non vérifiés et les risques connus. Les efforts raisonnables ne réduisent pas les obligations légales applicables, et l'information sur les risques ne vous demande ni d'accepter un traitement illicite ni de renoncer à vos droits.

Cette page résulte d'une vérification du code source et des éléments d'audit, non d'une certification de la configuration en ligne, du fonctionnement, des contrats fournisseurs ou de la conformité continue. Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne. Le chinois simplifié est la référence de maintenance à la racine ; les neuf autres versions linguistiques sont des traductions. La priorité linguistique ne réduit ni le droit impératif ni le droit des consommateurs à des conditions claires et compréhensibles.

![Structure de sécurité Sonic à quatre couches : transmission et accès, authentification, requêtes sortantes, stockage et journaux, avec les contrôles nécessitant une configuration d'exploitation](/images/sonic/security-shield.svg)

*Figure : ce schéma présente les contrôles ; il ne signifie pas que tous les déploiements les ont activés ou satisfont aux exigences de conformité.*

## 1. Cycle de vie des données

| Phase | Faits et limites actuellement vérifiables |
| --- | --- |
| Collecte | Epomail OAuth fournit la connexion ; lecture, recherche et recommandations peuvent générer des événements. La personnalisation est activée par défaut dans le code candidat actuel ; ce défaut ne constitue pas un consentement au profilage facultatif. |
| Transmission | Les chemins entre navigateur, edge, plan de données et amont varient selon le déploiement. Les chemins internes et certains chemins amont utilisent HTTP en clair ; TLS sur toute la chaîne ne peut pas être affirmé. Les MV, pochettes, polices ou avatars peuvent être demandés directement par le navigateur. |
| Stockage | Le navigateur peut conserver données de compte, file d'attente, historiques, préférences, musique locale et cache ; les lieux et durées réels des données comportementales, journaux, sauvegardes et enregistrements fournisseurs doivent être vérifiés par déploiement. |
| Utilisation et partage | Recherche, lecture et connexion répondent aux demandes ; profilage, Auto DJ, statistiques de recherche et suggestions publiques peuvent utiliser le contexte comportemental ou de recherche. Les destinataires et réglages figurent dans la [Liste des partages avec des tiers et des transferts](/fr/sub-processors/). |
| Effacement | La réinitialisation actuelle vise principalement certains événements ou retours de l'identité courante, sans garantie de couvrir radar, agrégats de recherche, sauvegardes, journaux, services externes ou anciens identifiants anonymes ; la révocation dépend également du stockage configuré et du succès de la requête. |

## 2. Matrice de traitement

| Activité | Données possibles | Limites et durées du traitement |
| --- | --- | --- |
| Recherche, lecture, paroles et connexion demandées | Requêtes, identifiants de contenu, session et données de compte renvoyées par Epomail | Limité à la réponse à la demande ; les données de connexion peuvent être présentes dans le navigateur et la session. |
| Profilage comportemental, Auto DJ et recommandations | Lecture, progression, sauts, favoris, refus, recherches, identifiants pseudonymes et contexte local | Profilage ou traitement susceptible de le permettre ; actuellement activé par défaut. L'arrêt et l'effacement après refus ou retrait ne doivent pas être présumés effectifs. |
| Statistiques de recherche et suggestions publiques | Texte original des recherches, comptages et contexte associé | Les chemins actuels peuvent afficher les recherches des utilisateurs ; sans filtrage, seuils et durées mis en œuvre, il ne faut pas parler d'agrégation anonyme ou de publication sûre. |
| Limitation de débit et sécurité | IP brute, cookies, en-têtes d'authentification, User-Agent, contexte et clés dérivées du compte ou de la session | Peuvent être transmis avec la requête au moteur du plan de données ; affirmer un usage strictement nécessaire à la prévention des abus, à la connexion et à la sécurité exige de vérifier les routes réelles. |
| Données locales et commentaires | localStorage, IndexedDB, musique importée, cache de téléchargement, commentaires locaux et données des commentaires amont | Aucun chemin de téléversement du corps du Blob audio local constaté ; paroles et recommandations peuvent encore transmettre titre, artiste, album, durée ou identifiant. Les pochettes intégrées extraites en data URL peuvent entrer dans un catalogue distant partagé avec un événement de favori et être renvoyées par la recherche du site ou les suggestions publiques. Les commentaires amont peuvent contenir des noms, avatars et textes d'autrui et entrer dans un cache public. |
| Assistance, litiges et obligations légales | Courriel, explications, preuves nécessaires et enregistrements de traitement communiqués volontairement | Conservation uniquement pendant le temps nécessaire à la demande, au litige ou à l'obligation ; aucune durée uniforme de sauvegarde de l'hôte n'a été vérifiée. |

Les bases juridiques, durées de conservation et destinataires doivent être évalués individuellement selon les finalités, utilisateurs et configurations réels. Gratuité, maintenance personnelle ou code ouvert ne réduisent pas automatiquement les exigences de sécurité ou d'information.

## 3. Mesures de sécurité

### 3.1 Transmission et accès

1. Les points d'entrée publics peuvent être configurés avec HTTPS, OAuth, sessions signées et clés interservices ; ces contrôles du code ne prouvent pas que les points d'entrée, proxys et services amont réels utilisent tous TLS.
2. L'utilisation d'un tunnel chiffré entre plan de contrôle et plan de données, ainsi que la liaison du plan de données uniquement à l'adresse de bouclage, dépendent de l'hébergement. Les chemins HTTP internes en clair suffisent à invalider une affirmation générale de chiffrement sur toute la chaîne.
3. La validation des cibles et les restrictions de domaines des routes proxy ne couvrent que les requêtes passant réellement par elles. L'audit a constaté que l'IP brute peut être transmise au moteur avec cookies, en-têtes d'authentification et contexte ; le moteur ne peut pas être présenté comme recevant uniquement des données pseudonymes.
4. Les requêtes de flux audio peuvent utiliser le User-Agent du navigateur plutôt qu'une valeur fixe ; en cas de connexion directe aux MV, pochettes, Google Fonts ou services d'avatar, ces services peuvent voir l'IP et les métadonnées de connexion.

### 3.2 Authentification et clés

1. La RC publique `a75f5cb` vérifiée utilise OAuth state et PKCE, un cookie de session signé HttpOnly valable par défaut 30 jours et des cookies de transaction OAuth d'environ 600 secondes. La révocation avec KV est facultative et dépend de sa configuration et du succès de la demande. Ces protections ne sont pas établies pour l'ancien `main@ce443c8` ; les attributs et durées réels restent à vérifier dans le déploiement. La signature assure l'intégrité, pas le chiffrement ; la charge utile peut contenir l'adresse électronique et des identifiants d'utilisateur ou de rôle.
2. Les requêtes doivent être refusées si la validation de version, signature, temps ou `jti` de la clé d'API échoue ; un nom, une variable d'environnement ou un commentaire de conception ne prouve pas un contrôle d'authentification complet.
3. L'effet immédiat de la déconnexion ou d'une révocation groupée dépend du stockage de révocation, des réglages et du succès de la requête ; sans activation ou vérification, on ne peut garantir l'invalidation immédiate de tous les justificatifs copiés.

### 3.3 Protection des requêtes sortantes

Le code comprend certaines validations SSRF, de réseaux privés et de redirections, ainsi qu'une liste de domaines musicaux autorisés. Cela ne signifie pas que toutes les requêtes amont ou les requêtes du navigateur vers des tiers sont relayées, assainies ou anonymisées. DiceBear comporte actuellement un chemin d'URL d'avatar utilisant l'adresse électronique en clair comme `seed` ; les connexions directes à Google Fonts, aux MV et aux pochettes peuvent révéler l'IP aux services concernés. Certains fournisseurs utilisent HTTP ; TLS sur toute la chaîne ne peut pas être affirmé.

### 3.4 Stockage et journaux

1. Dans le navigateur, `auth`, `audio`, `library`, `global`, `settings`, `recommend` et IndexedDB conservent des données selon leurs fonctions ; la déconnexion n'efface pas automatiquement toutes les données de l'appareil.
2. Si les données comportementales du serveur sont associées par identifiants pseudonymes, elles peuvent encore être combinées à d'autres informations pour identifier une personne ; la pseudonymisation n'est pas l'anonymisation et ne couvre pas les recherches, le radar ou les données de tiers.
3. La rotation réelle, les droits d'accès et la destruction à échéance des journaux de l'application, de Cloudflare, de l'hôte et de l'amont, ainsi que des sauvegardes, n'ont pas été uniformément confirmés par cette vérification ; aucune durée fictive de sauvegarde ni promesse « zéro journal » ne doit être ajoutée.
4. Meilisearch, facultatif, peut traiter des requêtes brutes ou données de catalogue ; la synchronisation de l'effacement Gorse avec l'effacement local n'a pas été vérifiée. La réussite d'une réinitialisation locale ne remplace pas l'effacement des stockages externes de recommandation ou de recherche.

### 3.5 Limites connues

1. Personnalisation et Auto DJ sont activés par défaut, sans choix préalable, distinct et révocable pouvant être démontré ; cela n'est pas un consentement.
2. Les suggestions publiques peuvent réutiliser les termes bruts de recherche, avec un risque d'exposition d'informations personnelles ou sensibles.
3. L'effacement couvre principalement certains événements de l'identité courante ; la couverture du radar, des sauvegardes, journaux, services externes, Meilisearch, Gorse et anciens identifiants anonymes n'est pas vérifiée. La route de persistance du radar dans le moteur n'est pas confirmée ; aucune affirmation catégorique n'est faite sur son état de stockage. Après désactivation de la personnalisation, Auto DJ peut encore envoyer graines et exclusions, et le radar peut encore envoyer une charge utile que le serveur refuse de conserver sur la base du marqueur de désactivation.
4. HTTP interne en clair, Google Fonts, requêtes directes de MV et pochettes, User-Agent du navigateur et URL DiceBear avec courriel en clair rendent inexactes les affirmations « TLS sur toute la chaîne » ou « le courriel n'est pas transmis à l'extérieur ».
5. Limitation, révocation, journaux et réglages tiers dépendent des variables d'environnement et de la configuration fournisseurs. GDStudio est activé par défaut dans le code en l'absence de réglage, mais l'environnement ou Compose peut le désactiver ; une liste ne suffit pas à affirmer une désactivation par défaut.

## 4. Réponse aux violations de données

Lorsque le RGPD s'applique, les mesures de sécurité doivent être proportionnées à la nature des données, à l'échelle du traitement, au coût de mise en œuvre et aux risques réels, conformément à l'article 32 du RGPD. L'opérateur doit documenter chaque violation. Sauf si elle est peu susceptible d'engendrer un risque pour les droits et libertés des personnes, il doit la notifier à l'autorité de contrôle compétente sans retard injustifié et, si possible, dans les 72 heures après en avoir pris connaissance, en motivant tout retard, conformément à l'article 33 du RGPD. En cas de risque élevé, il doit aussi informer les personnes sans retard injustifié, sous réserve des exceptions légales, conformément à l'article 34 du RGPD. Cela ne promet pas un signalement automatique à l'autorité d'un pays déterminé et ne dispense pas des autres lois applicables.

L'intervention réelle doit isoler les systèmes touchés, protéger ou révoquer les justificatifs, déterminer les catégories de données, l'étendue, les destinataires et la chronologie, et consigner les décisions et remèdes. Un incident suspect peut être signalé à `privacy@epocanvas.com` ; n'envoyez ni mot de passe, ni jeton complet, ni cookie d'abonnement, ni données personnelles inutiles.

## 5. Protection des données dès la conception et par défaut

L'article 25 du RGPD exige de prendre en compte la protection dès la conception et par défaut lors de la détermination des moyens du traitement. Le projet ne peut actuellement pas affirmer l'avoir pleinement mise en œuvre :

1. Le profilage facultatif doit être désactivé par défaut, avec acceptation, refus, retrait et consignation du choix aussi accessibles ; le code actuel l'active par défaut et ni la connexion ni la poursuite de l'utilisation ne remplace le consentement.
2. Les suggestions publiques doivent d'abord être désactivées ou disposer de contrôles de minimisation de l'affichage, de filtrage, de seuils, de durées et d'effacement.
3. Le `seed` d'avatar ne doit pas être une adresse électronique en clair ; Google Fonts, MV, pochettes et autres ressources directes ne doivent être activés qu'après évaluation des transmissions d'IP, de cookies et d'identifiants.
4. Il faut vérifier les anciens identifiants pseudonymes associables, le radar, les recherches, les morceaux partagés et leurs pochettes, les journaux, Meilisearch, Gorse et les sauvegardes, puis effectuer l'effacement dans la portée légalement applicable et, lorsque requis, en informer les destinataires. Les exceptions légales de conservation doivent être motivées et préciser leur portée et leur durée ; un nettoyage partiel de l'identité courante ne peut pas être présenté comme un effacement complet.

## 6. Obligations des opérateurs de déploiements indépendants

Les instances déployées indépendamment sont exploitées séparément. Les indications de contrôle de cette page ne créent pas d'obligations contractuelles dépassant le droit et les licences réellement applicables et ne constituent pas un engagement d'exploitation de l'auteur. L'application du RGPD dépend des liens territoriaux et activités réelles, selon l'article 3 du RGPD, et ne peut être globalement exclue du fait de la gratuité ou du caractère personnel. Les exigences suivantes ne s'appliquent que si leurs conditions légales respectives sont réunies :

1. Adopter des mesures proportionnées à la nature des données, à l'échelle, aux coûts et aux risques réels, selon l'article 32 du RGPD, et vérifier transmissions, clés, journaux, restauration et effacement, sans imposer par défaut une équipe dédiée ou une certification à tout petit projet.
2. Moins de 250 personnes ne signifie pas une exemption automatique du registre des activités. Un traitement non occasionnel, susceptible de présenter un risque pour les droits et libertés, portant sur des catégories particulières de données ou sur des condamnations pénales et infractions peut, dans chacun de ces cas, exclure cette exception, selon l'article 30 du RGPD.
3. Désigner un délégué à la protection des données lorsque les conditions le requièrent, notamment pour les autorités publiques, les activités principales de suivi régulier et systématique à grande échelle, ou le traitement à grande échelle de catégories particulières de données ou de données relatives aux condamnations pénales et infractions, selon l'article 37 du RGPD.
4. L'analyse d'impact vise les activités susceptibles de présenter un risque élevé avant le traitement ; elle n'est pas automatiquement nécessaire pour chaque hachage, connexion ou projet gratuit, selon l'article 35 du RGPD.
5. Une entité établie hors de l'Union relevant de l'article 3, paragraphe 2, du RGPD doit généralement désigner un représentant dans l'Union. L'exception de traitement occasionnel de l'article 27 du RGPD exige cumulativement un traitement occasionnel, l'absence de traitement à grande échelle de catégories particulières ou de données relatives aux condamnations pénales et infractions, et un faible risque compte tenu de la nature, du contexte, de la portée et des finalités. La gratuité ou le caractère non lucratif ne suffit pas à créer l'exception.
6. Vérifier `SONIC_RECOMMEND_RETENTION_DAYS`, le chemin de base, le repli mémoire, les chemins tiers, les réglages de limitation et de révocation ; intégrer les valeurs réelles à votre information, vos durées et vos procédures d'effacement.

## 7. Auditabilité

Cette page repose sur l'examen de la RC publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), vérifiée le 2026-11-02 ; l'ancien `main@ce443c8` (2026-10-27 UTC) est distinct. Il s'agit d'une vérification documentaire, non d'un audit opérationnel, d'une certification ou d'une diligence fournisseur. Les valeurs par défaut du code, variables d'environnement, Compose et services réels peuvent différer. Si documentation, code et déploiement divergent, il faut cesser les affirmations excessives et corriger la documentation.
