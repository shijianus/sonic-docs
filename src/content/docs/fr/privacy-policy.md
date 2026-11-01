---
title: Politique de confidentialité
description: "Politique de confidentialité de Sonic : information sur la collecte et l'utilisation des données, bases juridiques, durées de conservation, droits des personnes concernées et transferts internationaux, le RGPD servant de norme minimale pour l'ensemble des utilisateurs."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.4**

La présente politique expose comment le service Sonic (ci-après « le service ») collecte, traite et transmet vos données à caractère personnel, ainsi que les normes et engagements que l'opérateur respecte en matière de protection des données. Avant de vous connecter ou d'utiliser le service, vous devez lire la présente politique ; si vous n'acceptez pas l'une de ses stipulations, n'utilisez pas le service.

Les faits techniques énoncés dans la présente politique reposent sur l'implémentation réelle du code open source du service. Les documents juridiques du site ont pour version officielle la version en chinois simplifié ; les versions en anglais, en japonais et en français sont des traductions de référence ; en cas de doute sur l'interprétation, la version officielle prévaut. Le service prend le règlement général sur la protection des données (RGPD) de l'Union européenne comme norme minimale de protection des données pour l'ensemble des utilisateurs (voir la section 2).

![Cinq piliers de la politique de confidentialité : licéité, limitation des finalités, minimisation et durées de conservation, sécurité, vos droits, le tout posé sur le socle de protection de niveau RGPD](/images/sonic/privacy-pillars.svg)

*Figure : les cinq axes de la présente politique. La licéité s'ancre dans les bases juridiques de l'article 6 du RGPD ; la limitation des finalités exclut le profilage publicitaire ; la minimisation se concrétise par la pseudonymisation et l'effacement en un clic ; les mesures de sécurité figurent à la section 10 ; les droits s'exercent selon la section 9 ; le tout repose sur le socle de niveau RGPD.*

## 1. Périmètre d'application

La présente politique s'applique aux données à caractère personnel générées par votre utilisation du service de quelque manière que ce soit, notamment :

1. la visite du site du service (`sonic.epocanvas.tech`, `sonic.epocanvas.com` ou le domaine d'une instance auto-hébergée) ;
2. l'utilisation de l'ensemble des fonctions du lecteur web (recherche, lecture, paroles, recommandation, téléchargement, importation de musique locale) ;
3. l'accès des clients tiers au service via l'API ouverte.

La présente politique ne s'applique pas aux sites et services tiers auxquels le service renvoie ou qu'il intègre (tels que les sites propres des plateformes musicales amont) ; ces tiers disposent chacun de leur propre politique de confidentialité et en assument la responsabilité. L'opérateur d'une instance Sonic auto-hébergée devient, dès le moment du déploiement, le responsable du traitement des données de ses utilisateurs ; il doit remplir lui-même, envers ses utilisateurs, l'obligation d'information exigée par le droit applicable de son lieu ; la présente politique peut lui servir de texte de base d'information.

## 2. Responsable du traitement et socle de protection des données

| Instance que vous utilisez | Responsable du traitement | Description |
| --- | --- | --- |
| Instance hébergée (`sonic.epocanvas.tech`, `sonic.epocanvas.com`) | équipe d'exploitation | s'agissant des événements comportementaux, des connexions et des journaux de sécurité, l'équipe d'exploitation est le responsable du traitement |
| Instance auto-hébergée | le déployeur de cette instance | le code open source ne contient aucun mécanisme de télémétrie ; hormis les services externes configurés par l'opérateur, aucune donnée d'instance n'est renvoyée aux auteurs amont ni à un tiers quelconque |

**Socle de protection des données** : le service prend le RGPD comme norme minimale de protection des données pour l'ensemble des utilisateurs, où que vous soyez dans le monde. Vos droits d'information, d'accès, de rectification, d'effacement, de limitation, de portabilité, d'opposition et de réclamation concernant vos données à caractère personnel ne sont en aucun cas inférieurs au niveau fixé par le RGPD. Pour les utilisateurs situés dans l'Union européenne et l'Espace économique européen, le RGPD s'applique directement ; pour les utilisateurs d'autres régions, le service honore les normes du RGPD comme obligation contractuelle ; les protections plus fortes accordées par le droit de votre lieu priment dans leur périmètre d'application.

## 3. Informations données lors de la collecte

Lorsque le service collecte des données à caractère personnel auprès de vous, il vous informe expressément des points suivants :

| Élément d'information | Information donnée par le service |
| --- | --- |
| I. Nom du responsable | l'opérateur (voir la section 2 ; pour une instance auto-hébergée, son déployeur) |
| II. Finalités de la collecte | identification du compte et session de connexion ; fourniture des fonctions de lecture, de recherche et de recommandation ; prévention des abus et de la fraude ; limitation de débit et sécurité du service (voir le tableau correspondant de la section 5) |
| III. Catégories de données à caractère personnel | données d'identification du compte (identifiant utilisateur Epomail, adresse électronique, pseudonyme, URL de l'avatar, rôle du compte) ; données comportementales et de préférence (événements de lecture, de lecture intégrale, de saut, de favori, de refus, termes de recherche, etc., associés par identifiants pseudonymisés) ; données techniques (utilisation temporaire de l'IP nécessaire à la limitation de débit, cookie de session, cookies de transaction OAuth) ; voir la section 4 |
| IV. Durée, zone géographique, destinataires et modalités d'utilisation | durée : destruction automatique des événements comportementaux 90 jours après leur enregistrement (configurable par le déployeur, minimum 7 jours) ; les données d'identification du compte ne sont pas persistées et ne subsistent que pendant la session ; zone géographique : le plan de contrôle fonctionne sur le réseau edge mondial de Cloudflare et le plan de données sur les nœuds Linux propres à l'opérateur (voir la section 7) ; destinataires : l'opérateur et ses sous-traitants, ainsi que les autorités habilitées en cas d'exigence légale (voir la section 7) ; modalités : stockage pseudonymisé et calculs statistiques de manière automatisée, sans revue humaine ni contrôle de contenu |
| V. Droits que vous pouvez exercer et modalités | droits d'accès, de rectification, d'effacement, de limitation, de portabilité, d'opposition et de réclamation ; les modalités figurent à la section 9 |
| VI. Conséquences d'un refus de fournir les données | les fonctions de base du service (recherche, lecture, paroles) sont utilisables sans connexion ni rapport d'événements comportementaux ; la connexion est nécessaire aux fonctions de compte telles que la synchronisation cloud des favoris, et la recommandation personnalisée est une fonction optionnelle |

## 4. Données à caractère personnel collectées

### 4.1 Données d'identification du compte (via la connexion Epomail)

Lorsque vous vous connectez avec un compte Epomail selon OAuth 2.0 (PKCE), le service obtient de l'endpoint userinfo d'Epomail les champs suivants et n'obtient aucune autre donnée de compte :

| Champ | Usage | Persisté sur disque |
| --- | --- | --- |
| Identifiant utilisateur (`id`/`sub`) | identification d'identité dans la session | non |
| Adresse électronique (doit être vérifiée) | dérivation du hash pseudonymisé ; champ `sub` de la charge utile de la clé d'API émise en votre nom | non |
| Pseudonyme ou nom d'utilisateur (`name`/`username`/`nickname`) | affichage dans l'interface | non |
| URL de l'avatar (`avatar`/`picture`) | affichage dans l'interface | non |
| Rôle du compte (`role`) | décision d'autorisation | non |

Le service ne dispose pas de système d'inscription autonome et ne collecte ni numéro de téléphone, ni nom réel, ni adresse postale, ni données de paiement. L'adresse électronique n'est utilisée qu'à l'instant, dans la session de connexion : dérivation de l'identifiant pseudonymisé (hash SHA-256 à préfixe `usr_`, tronqué à 12 caractères hexadécimaux), dérivation du hash de l'identifiant utilisateur et clé de compartiment de limitation de débit ; les valeurs hachées obtenues ne permettent pas de reconstituer l'adresse électronique d'origine.

### 4.2 Événements comportementaux

Pour fournir les fonctions de recommandation et Auto DJ, le service enregistre les événements comportementaux liés à la lecture des morceaux. Onze types d'événements existent : recherche, clic sur un résultat de recherche, début de lecture, progression de lecture, lecture intégrale, saut, relecture, ajout aux favoris, retrait des favoris, refus, retrait du refus. Chaque événement est associé à l'un des identifiants pseudonymisés suivants :

1. Utilisateur connecté : hash SHA-256 dérivé de l'adresse électronique (préfixe `usr_`) ;
2. Participant anonyme : identifiant aléatoire généré localement par votre navigateur (préfixe `anon_`), rehaché côté serveur ;
3. Mode public : lorsque la personnalisation est désactivée, les événements ne sont ni stockés ni enregistrés ; ils sont jetés directement côté serveur.

Le rapport des événements s'effectue par lots (50 événements au plus par lot, corps de requête de 64 Ko au plus), et la file d'attente d'envoi est vidée lorsque la page est masquée. Le contenu de chaque enregistrement d'événement se limite à : type d'événement, identifiant canonique du morceau, identifiant de l'artiste, étiquettes de genre et de langue, terme de recherche (le cas échéant), proportion de progression de lecture et poids du signal ; sans adresse IP, sans empreinte d'appareil et sans contenu textuel libre.

Filtrage du bruit et des faux signaux : les sauts dus à des blocages réseau (network_stall), à des échecs de décodage (playback_error), à des troncatures en extrait (trial_end), à des flux indisponibles (stream_unavailable), à des dépassements de délai de mise en mémoire tampon (buffer_timeout) ou à des échecs de commutation automatique (auto_switch_error) ont un poids constant de zéro et ne sont pas stockés ; le client ne signale un saut volontaire que si la lecture est normale et l'écoute comprise entre 0,5 et 25 secondes.

En outre, les requêtes de recommandation sont accompagnées d'un petit contexte local de votre client (quelques morceaux favoris, artistes récents, termes de recherche récents, chacun en nombre limité), utilisé uniquement en mémoire pour l'ordonnancement personnalisé de la requête en cours, sans persistance sur disque ni entrée dans les journaux.

### 4.3 Statistiques globales agrégées

Le service tient en outre des statistiques globales agrégées, sans lien avec un utilisateur quelconque, servant aux palmarès de popularité et aux recommandations similaires :

| Table statistique | Contenu | Lien avec une personne |
| --- | --- | --- |
| Comptage agrégé des termes de recherche | statistique globale de fréquence des termes de recherche | aucun |
| Co-occurrence des morceaux | statistique globale des morceaux écoutés ensemble | aucun |

Ces enregistrements ne contiennent aucun identifiant personnel, ne sont pas liés à votre identité et ne relèvent pas du périmètre de l'« effacement du profil en un clic » (car ils n'appartiennent à aucun utilisateur).

### 4.4 Stockage local de votre navigateur

Les données suivantes ne sont stockées que dans votre navigateur ; les serveurs de l'opérateur n'en détiennent pas de copie complète ; lorsque le stockage est indisponible en navigation privée, une dégradation automatique vers un stockage en mémoire s'opère :

| Emplacement de stockage | Clé | Contenu |
| --- | --- | --- |
| localStorage | `audio` | liste de lecture, morceau en cours, mode de lecture, volume, état de sourdine, historique de lecture |
| localStorage | `library` | titres favoris, playlists suivies, artistes suivis, MV favoris, albums favoris, playlists personnelles |
| localStorage | `global` | thème, préférence de langue, historique de recherche (10 entrées au plus) |
| localStorage | `settings` | préférences d'interface (animation d'arrière-plan, préférence de qualité audio, etc.) |
| localStorage | `recommend` | interrupteur de personnalisation, interrupteur Auto DJ, identifiant anonyme, liste des morceaux refusés |
| localStorage | `sonic-perf-mode` | interrupteur du mode performance |
| IndexedDB | `SonicMusicPlayerDB` | fichiers de musique locale importés (`local_music`) et morceaux téléchargés (`downloaded_music`) |

### 4.5 Données techniques traitées automatiquement

- Limitation de débit : les requêtes anonymes sont limitées par compartiments IP (240 par minute, valeur par défaut) ; l'IP n'est utilisée que brièvement comme clé de limitation : le limiteur natif de l'edge ne conserve pas les données, ou bien un enregistrement KV à expiration automatique de 120 secondes sert de stockage temporaire, ou bien une fenêtre mémoire de 60 secondes (4 096 compartiments au plus) ; l'IP n'est jamais écrite dans la base de données ni dans les journaux d'accès. Les requêtes d'authentification sont limitées par compartiments de hash d'adresse électronique (600 par minute, valeur par défaut), et l'endpoint d'authentification fait l'objet d'une limitation dédiée de 30 requêtes par minute et par IP.
- Session et clés : après une connexion réussie, un cookie `sonic_session` avec attributs `HttpOnly; Secure; SameSite=Lax` (durée de validité de 30 jours au plus) est émis, contenant la clé d'API signée ; les clés ne sont jamais écrites dans l'URL, dans les paramètres de requête ni dans le localStorage. Le processus OAuth utilise les cookies de transaction `sonic_oauth_state` et `sonic_oauth_verifier` (durée de validité de 600 secondes, limités au chemin `/api/auth`). La charge utile de la clé d'API contient `sub` (adresse électronique), `iat`, `exp`, `jti`, `kid`, `role` et `uid` ; `jti` sert aux listes de révocation et à l'invalidation immédiate lors de la déconnexion.
- Journaux d'accès : les journaux d'accès du plan de données sont des JSON ligne à ligne, contenant uniquement l'identifiant de requête, la méthode, le chemin, le code d'état et le temps de traitement ; la chaîne de requête, l'IP, le User-Agent, les cookies, l'en-tête Authorization et le corps de requête ne sont jamais journalisés. Les journaux d'anomalies ne contiennent que l'identifiant de requête, le nom de l'erreur et le message d'erreur tronqué.
- Proxy audio : par défaut, les flux audio transitent par le proxy edge du service ; les requêtes amont ne portent que le User-Agent, le Referer du site officiel selon la configuration du CDN et l'en-tête Range, les en-têtes Set-Cookie et d'identifiants étant retirés ; le CDN amont ne voit que l'adresse du serveur proxy. Si vous invoquez expressément le mode de connexion directe `?mode=redirect`, votre navigateur établit la connexion directement avec le CDN officiel et votre IP est visible de ce CDN (sémantique intrinsèque de la redirection 302) ; le lecteur web n'utilise pas ce mode.
- Réseau edge : Cloudflare traite les métadonnées de requêtes au niveau réseau selon sa propre politique.

### 4.6 Ce que le service ne collecte pas

Le service n'a ni suivi publicitaire, ni cookie intersites, ni script statistique ou d'analyse tiers, ni empreinte d'appareil, ni profil publicitaire comportemental ; il ne collecte ni contacts, ni photos, ni position, ni aucune donnée d'appareil sans rapport avec la lecture musicale ; il ne vend pas de données à caractère personnel, ne les utilise pas à des fins publicitaires et ne se raccorde à aucun réseau publicitaire.

## 5. Bases juridiques et finalités de traitement

Les bases juridiques des activités de traitement sont les suivantes :

| Activité de traitement | Finalité | Base juridique |
| --- | --- | --- |
| Connexion Epomail, maintien de session, émission et révocation des clés d'API | identification du compte et accès au service | nécessité de l'exécution du contrat (l'article 6, paragraphe 1, point b) du RGPD) |
| Événements comportementaux et profil de recommandation (pseudonymisés) | fonctions de recommandation et Auto DJ | intérêt légitime (l'article 6, paragraphe 1, point f) du RGPD) ; vous pouvez désactiver la personnalisation à tout moment (droit d'opposition de la section 9), la collecte s'arrêtant immédiatement |
| Statistiques globales agrégées | palmarès de popularité et recommandations similaires | intérêt légitime (l'article 6, paragraphe 1, point f) du RGPD) ; aucun lien avec une personne |
| Événements à identifiant anonyme (participant anonyme) | fonction de recommandation | votre choix autonome ; prend fin dès la désactivation de la personnalisation |
| Limitation de débit IP, sécurité des sessions, prévention des abus | sécurité et stabilité du service | intérêt légitime (l'article 6, paragraphe 1, point f) du RGPD) ; s'agissant, le cas échéant, également d'une obligation légale (l'article 6, paragraphe 1, point c) du RGPD) |

Vos données à caractère personnel ne sont utilisées qu'aux finalités énumérées ci-dessus et dans le périmètre qui leur est étroitement lié. Le service ne prend aucune décision automatisée au sens de l'article 22 du RGPD (décision produisant des effets juridiques ou des effets significatifs similaires) sur la base de vos données ; l'incidence des résultats de recommandation se limite à la séquence de lecture et à l'ordre des palmarès que vous voyez, et vous pouvez la désactiver à tout moment.

## 6. Durées de conservation et destruction des données

| Catégorie de données | Politique de conservation |
| --- | --- |
| Événements comportementaux | destruction automatique 90 jours après l'enregistrement (configurable par le déployeur, minimum 7 jours), déclenchée par comptage d'écritures et au démarrage ; destruction immédiate par l'« effacement du profil en un clic » |
| Données d'identification du compte (adresse électronique, pseudonyme, URL de l'avatar, rôle) | non persistées sur disque ; ne subsistent que pendant la session |
| Cookie de session | 30 jours au plus ; invalidation immédiate à la déconnexion |
| Cookies de transaction OAuth | expiration automatique après 600 secondes |
| Compteurs de limitation de débit | le limiteur natif de l'edge ne conserve rien ; expiration automatique des enregistrements KV après 120 secondes ; fenêtre mémoire de 60 secondes |
| Listes de révocation des clés | liste statique configurée par le déployeur (variable d'environnement) ou enregistrements de révocation immédiate en KV |
| Sauvegardes de la base de données | les instantanés cohérents contiennent des données comportementales pseudonymisées et doivent bénéficier du même niveau de protection que les données de production |
| Statistiques globales agrégées | sans identifiant personnel, traitées selon la politique de maintenance de la base de données |
| Stockage local du navigateur | conservé sur votre appareil jusqu'à son effacement par vos soins ou l'usage d'« Effacer toutes les données locales » |

## 7. Partage avec des tiers et transferts internationaux

Le service partage des données à caractère personnel avec des tiers selon le principe de minimisation nécessaire ; l'ensemble des cas figure dans la [Liste des partages avec des tiers et des transferts](/fr/sub-processors/) ; en voici l'essentiel :

1. Traitement sous-traité : Cloudflare (hébergement Pages, calcul edge Functions, tunnel chiffré Tunnel, stockage KV, infrastructure de limitation de débit) ;
2. Fournisseur d'identité : Epomail (obtention, lors de la connexion, de l'identifiant, de l'adresse électronique, du pseudonyme, de l'URL de l'avatar et du rôle) ;
3. Sources de contenu amont : NetEase, QQ, Kugou, Kuwo, AMLL, LRCLIB et les CDN officiels de contenu ; les requêtes ne contiennent que les paramètres de requête des morceaux et un User-Agent/Referer fixe du site officiel, sans votre identité ni votre IP ;
4. Exigences légales : fourniture uniquement sur demande d'une autorité habilitée selon une procédure légale, avec notification dans la mesure permise par la loi.

Le plan de contrôle du service fonctionne sur le réseau edge mondial de Cloudflare ; vos données à caractère personnel peuvent être traitées sur des nœuds situés hors du pays de l'opérateur. L'opérateur encadre les transferts internationaux, sur le fondement des relations de déploiement et de traitement sous-traité, par les garanties des articles 44 à 46 du RGPD (y compris les clauses contractuelles types de l'Union européenne) et s'appuie sur les mesures de protection des données de Cloudflare (certifications SOC 2 Type II et ISO/IEC 27001). Les opérateurs auto-hébergés doivent évaluer eux-mêmes leurs transferts internationaux et garantir leur conformité aux exigences légales de leur lieu.

## 8. Protection des enfants

Le service ne s'adresse pas aux enfants de moins de 16 ans et ne collecte délibérément aucune donnée à caractère personnel d'enfants ; lorsque le droit de votre lieu fixe pour les services de la société de l'information un âge de consentement plus bas (13 ans au minimum, l'article 8 du RGPD), cette disposition s'applique. Le représentant légal qui estime qu'un enfant a fourni des données à caractère personnel peut contacter l'opérateur pour demander l'effacement, traité sans délai après vérification. Nul ne doit utiliser le service pour diffuser à l'égard d'enfants et d'adolescents des contenus nuisibles à leur santé physique ou mentale ; les restrictions d'utilisation correspondantes figurent dans la [Politique d'utilisation acceptable](/fr/acceptable-use/).

## 9. Droits des personnes concernées et modalités d'exercice

Vous disposez des droits suivants sur vos données à caractère personnel :

1. Accès et obtention d'une copie (l'article 15 du RGPD) ;
2. Rectification (l'article 16 du RGPD) ;
3. Effacement (l'article 17 du RGPD) ;
4. Limitation du traitement (l'article 18 du RGPD) ;
5. Portabilité des données (l'article 20 du RGPD) ;
6. Opposition (l'article 21 du RGPD), y compris la désactivation de la personnalisation à tout moment ;
7. Ne pas faire l'objet de décisions fondées exclusivement sur un traitement automatisé (l'article 22 du RGPD) ; le service ne procède pas à de telles décisions.

Modalités d'exercice :

![Bloc « Confidentialité et données locales » de la page des paramètres Sonic : interrupteur de recherche intelligente et recommandations personnalisées, interrupteur de radio en continu automatique, bouton de réinitialisation du profil de recommandation et de l'historique de refus, le bloc indiquant « Les données ci-dessous ne sont conservées que dans votre navigateur, sans téléversement vers le serveur »](/images/sonic/ui/ui-privacy.png)

*Figure : bloc « Confidentialité et données locales » de la page des paramètres, c'est-à-dire l'interface réelle des fonctions en libre-service ci-dessous. Le tour d'horizon de l'interface figure à la section 7 du [Guide de l'interface et des fonctions](/fr/interface/).*

1. Fonctions en libre-service (effet immédiat) :
   - « Effacer le profil de recommandation » : destruction immédiate de tous les événements comportementaux du serveur liés à vous (`DELETE /api/sonic/events`) ;
   - « Effacer toutes les données locales » : effacement immédiat du localStorage, du sessionStorage et de l'intégralité de la base IndexedDB du navigateur, avec destruction synchronisée du profil côté serveur ;
   - Aperçu du profil de recommandation : obtention, via `GET /api/sonic/events`, d'un résumé de votre profil actuel (nombre total d'événements, compteurs de favoris et de refus, artistes fréquemment écoutés, tendance de genres, termes de recherche récents, forme de stockage) ;
   - Désactivation de la personnalisation : l'interrupteur de la page des paramètres fait effet immédiatement, la file d'attente d'envoi est vidée et plus aucun événement n'est collecté ;
   - Déconnexion : révocation immédiate de la session courante et de l'identifiant de clé.
2. Demandes humaines : les autres demandes sont adressées à `privacy@epocanvas.com` ; l'opérateur répond dans le mois qui suit la réception de la demande (l'article 12, paragraphe 3, du RGPD) ; en cas de complexité de la situation, le délai peut être prolongé de deux mois au plus, le motif de la prolongation étant communiqué dans le premier mois.

Si vous estimez que le traitement opéré par le service porte atteinte à vos droits, vous pouvez demander réparation à l'opérateur (l'article 79 du RGPD) et déposer une réclamation auprès de l'autorité de contrôle du lieu de l'opérateur (l'article 77 du RGPD) ; les utilisateurs situés dans l'Union européenne et l'Espace économique européen peuvent réclamer auprès de l'autorité de contrôle de leur lieu de résidence habituelle, de leur lieu de travail ou du lieu présumé de l'atteinte. Toute personne subissant un préjudice matériel ou immatériel du fait d'une violation du RGPD peut demander réparation en vertu de l'article 82 du RGPD.

## 10. Mesures de sécurité

L'opérateur établit et améliore continûment, en vertu de l'article 32 du RGPD, des mesures techniques et organisationnelles appropriées contre le vol, l'altération, la destruction, la perte ou la fuite de données à caractère personnel : HTTPS/TLS sur toute la chaîne ; clés d'API signées HMAC-SHA256 versionnées et comparaison à temps constant ; flux OAuth PKCE et durée limitée des cookies de transaction ; attributs HttpOnly/Secure/SameSite du cookie de session et révocation immédiate ; plan de données lié uniquement à l'adresse de bouclage et raccordé par tunnel chiffré ; interception SSRF sur toute la chaîne et liste blanche de domaines ; identifiants pseudonymisés et conception de base de données sans IP ; minimisation des journaux ; validation fail-closed des clés. La liste complète, la matrice de traitement et les limites connues figurent dans [Traitement des données et mesures de sécurité](/fr/data-security/).

## 11. Révision de la politique

La présente politique peut être révisée en cas d'évolution du service ou de la réglementation. Les changements majeurs (ajout de destinataires tiers, modification de la politique de conservation ou du périmètre de collecte, etc.) seront annoncés à l'avance sur le site, avec mise à jour de la date d'entrée en vigueur et du numéro de version en tête de page. En continuant à utiliser le service après l'entrée en vigueur d'un changement, vous êtes réputé accepter la politique révisée ; à défaut d'accord, vous pouvez cesser de l'utiliser et effacer vos données. Les révisions majeures successives sont archivées avec les enregistrements de versions du dépôt open source.

## 12. Points de contact

- Confidentialité, exercice des droits et réclamations : `privacy@epocanvas.com`
- Service et compte : `admin@epocanvas.com`
- Projet open source : Issues du dépôt GitHub (`github.com/shijianus/sonic`)
- Sites auto-hébergés : contactez l'opérateur publié par le site concerné

---

*Le présent document est un document de conformité établi par l'équipe d'exploitation de Sonic ; il ne constitue pas un avis juridique ; les dispositions impératives du droit de votre lieu prévalent sur les stipulations contraires de la présente politique.*
