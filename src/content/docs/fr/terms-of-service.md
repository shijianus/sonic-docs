---
title: Conditions d'utilisation
description: "Conditions d'utilisation de Sonic : acceptation des conditions, périmètre détaillé du service, règles de compte, autorisation des données comportementales, qualité audio et indicateurs d'extrait, limitation de responsabilité, droit applicable et règlement des litiges."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.3**

Les présentes conditions constituent l'accord conclu entre vous et l'opérateur de l'instance que vous utilisez au sujet de l'utilisation du service Sonic (ci-après « le service »). En vous connectant ou en utilisant le service de toute autre manière, vous déclarez avoir lu les présentes conditions et en accepter l'intégralité ; si vous n'y consentez pas, n'utilisez pas le service.

Les présentes conditions sont des conditions types, intégralement publiées pour votre examen ; les versions historiques sont archivées avec le dépôt open source. Le consentement que vous donnez par voie électronique produit les mêmes effets qu'un document papier et une signature. Les droits que le droit applicable interdit d'exclure ou de limiter par des conditions types ne sont pas affectés par les présentes conditions. Les documents juridiques du site ont pour version officielle la version en chinois simplifié ; les versions en anglais, en japonais et en français sont des traductions de référence ; en cas de doute sur l'interprétation, la version officielle prévaut.

![Cycle de vie contractuel des Conditions d'utilisation de Sonic : consentement électronique (la connexion vaut acceptation) → exécution (sécurité du compte, vos contenus, limitation de responsabilité) → révision (annonce avant l'entrée en vigueur des changements majeurs) → fin (arrêt d'utilisation, effacement du profil en un clic) ; socle : droit applicable et protection des données](/images/sonic/tos-contract.svg)

*Figure : cycle de vie du contrat, de sa formation à sa fin. Le consentement électronique produit les mêmes effets que l'écrit ; le périmètre du service figure à la section 2, les comptes à la section 3, vos contenus et données comportementales à la section 5, la limitation de responsabilité à la section 10, la révision à la section 12, le droit applicable et le règlement des litiges à la section 11.*

## 1. Définitions

1. Le « service » : l'ensemble des fonctions exécutées sur une instance Sonic, comprenant le lecteur web, la passerelle edge, le moteur de protocoles local, l'API ouverte et les composants associés ; la disposition de l'interface et l'emplacement des fonctions figurent dans le [Guide de l'interface et des fonctions](/fr/interface/).
2. L'« opérateur » : la personne ou l'équipe qui déploie et exploite l'instance que vous utilisez. S'agissant des instances hébergées (`sonic.epocanvas.tech`, `sonic.epocanvas.com`), il s'agit de l'équipe d'exploitation ; s'agissant des instances auto-hébergées, du déployeur.
3. « Vous (l'utilisateur) » : la personne physique ou l'organisation qui se connecte au service ou l'utilise de toute autre manière.
4. Formation du contrat : vous concluez le contrat avec l'opérateur de l'instance sur laquelle vous vous connectez. Les présentes conditions constituent un modèle général : elles s'appliquent directement à l'instance hébergée ; l'opérateur auto-hébergé peut les modifier pour en faire les conditions de son site, et doit remplir envers ses utilisateurs l'obligation d'information exigée par le droit applicable de son lieu.
5. Plan de données : le nœud Linux qui assure, pour l'instance que vous utilisez, l'analyse des protocoles et le calcul des recommandations ; son indisponibilité ne porte pas atteinte au service dégradé dont vous bénéficiez en vertu de la section 4, paragraphe 2.

## 2. Description et périmètre du service

Le service est un outil de recherche, d'agrégation et de lecture : il ne stocke ni n'héberge aucun fichier musical ; le contenu audio provient des CDN officiels et des interfaces ouvertes amont, et les paroles de l'analyse native et des bibliothèques publiques de paroles. Le périmètre des fonctions et l'emplacement des données sont les suivants :

| Catégorie de fonctions | Fonctions incluses | Emplacement de stockage des données | Connexion requise |
| --- | --- | --- | --- |
| Fonctions principales (disponibles anonymement) | recherche agrégée multi-sources, paroles mot à mot, lecture à qualité graduée, indicateurs d'extrait, classements, MV | navigateur local (état de lecture) | non |
| Fonctions de compte | synchronisation cloud des favoris et playlists, recommandations personnalisées et Auto DJ, gestion des événements comportementaux | serveur : événements comportementaux pseudonymisés uniquement ; préférences de favoris dans le navigateur | oui |
| Fonctions de données personnelles | liste de téléchargements, importation et gestion de musique locale | IndexedDB du navigateur | non |
| API ouverte | accès des clients tiers via clé d'API signée | sessions serveur et listes de révocation | oui |

Le service est bâti sur un projet open source et le demeure : le code source est public et auditable, et vous pouvez le déployer vous-même pour obtenir les mêmes capacités. Le logiciel est fourni « en l'état », et ses termes de licence sont cohérents avec les stipulations de responsabilité des présentes conditions (voir la section 10).

## 3. Obtention et sécurité du compte

1. Mode de connexion : le service se connecte via un compte Epomail selon OAuth 2.0 (PKCE), sans système d'inscription autonome ; les stipulations de compte entre vous et Epomail relèvent des conditions de ce service. En cas de gel ou de résiliation de votre compte Epomail, votre connexion au service cesse en conséquence.
2. Conditions d'âge : vous devez avoir 16 ans révolus ; lorsque le droit de votre lieu fixe pour les services de la société de l'information un autre âge de consentement, l'âge le plus bas s'applique (13 ans au minimum), mais le consentement du représentant légal reste requis si vous êtes un enfant. L'âge fait foi sur les données du compte Epomail utilisé pour la connexion ; le service ne dispose d'aucun mécanisme autonome de vérification de l'âge.
3. Un compte par personne : vous ne devez ni prêter, ni louer, ni vendre votre compte, ni le partager avec autrui ; l'opérateur n'assume ni le tri ni la restauration des litiges et des mélanges de données résultant d'un compte partagé.
4. Garde des identifiants : vous êtes responsable de la garde des identifiants de votre compte Epomail, de votre clé d'API et de la sécurité de votre session. Les opérations effectuées au moyen de vos identifiants sont présumées être les vôtres. Le cookie de session contient la clé signée : ne restez pas connecté sans vous déconnecter sur un appareil partagé ; dès qu'une fuite d'identifiants est constatée, vous devez vous déconnecter immédiatement et demander la révocation.
5. Mécanisme de session : après une connexion réussie, un cookie de session `HttpOnly; Secure; SameSite=Lax` est émis (durée de validité de 30 jours au plus) ; la clé d'API n'est jamais écrite dans l'URL, dans les paramètres de requête ni dans le localStorage. Vous pouvez vous déconnecter à tout moment ; la déconnexion révoque immédiatement la session courante et l'identifiant de clé correspondant (jti).
6. Émission des clés : la clé d'API adopte le format de signature versionné HMAC-SHA256, valable 30 jours à l'émission et 90 jours au plafond de validation ; les clés sans signature ou révoquées sont systématiquement rejetées. Toute réémission exige la présentation de votre clé actuellement valide. La clé d'API est un identifiant d'usage personnel : elle ne doit être ni remise à un tiers ni intégrée à un client publié.
7. Protection de la connexion : le rappel OAuth fait l'objet d'une quadruple vérification (state, PKCE, code d'autorisation, rejeu) ; l'endpoint d'authentification est limité à 30 requêtes par minute et par IP.

## 4. Fourniture et évolution du service

1. Disponibilité : l'opérateur fait des efforts raisonnables pour maintenir la disponibilité, sans s'engager sur un taux de disponibilité, un délai de mise en mémoire tampon ou un délai de rétablissement particuliers, ni fournir d'accord de niveau de service (SLA).
2. Mécanisme de dégradation : en cas de 3 échecs consécutifs du nœud de plan de données ou d'un appel dépassant le budget de 4,5 secondes, la couche edge disjoncte et bascule automatiquement en mode dégradé (connexion directe aux interfaces publiques de paroles et de recherche), la sonde de reprise s'exécutant après 30 secondes de refroidissement ; pendant la dégradation, l'interface affiche l'avis « mode dégradé de l'edge » et certaines fonctions (analyse complète des sources audio, mise à jour des recommandations, par exemple) peuvent être indisponibles. Il s'agit d'un comportement de continuité inhérent à la conception du système, et non d'un manquement contractuel.
3. Qualité audio et indicateurs d'extrait : le badge de qualité du lecteur (SQ sans perte, HQ haute qualité, par exemple) reflète fidèlement le niveau réel du flux audio en cours ; les extraits officiels de 30 secondes sont expressément signalés par l'indicateur d'extrait, sans se faire passer pour des morceaux complets. En cas de variation du niveau amont, la qualité réellement disponible varie en conséquence, sans constituer un manquement contractuel.
4. Évolution des fonctions : le projet open source évolue continûment ; des fonctions peuvent être ajoutées, ajustées ou retirées ; les changements majeurs affectant la capacité de suppression de données feront l'objet d'une annonce préalable.
5. Maintenance et interruptions : l'opérateur peut suspendre tout ou partie du service pour mise à niveau, correction ou traitement des abus ; l'indisponibilité due à une panne de Cloudflare, des interfaces musicales amont ou du CDN ne constitue pas un manquement de l'opérateur.
6. Fonctions expérimentales : les fonctions signalées comme expérimentales ou en période d'essai sont fournies en l'état, peuvent être instables et être ajustées ou retirées à tout moment.

## 5. Vos contenus et données comportementales

1. Favoris et préférences : vos favoris, playlists et préférences du lecteur sont stockés dans le stockage local de votre navigateur ; l'effacement des données du navigateur ou l'usage d'« Effacer toutes les données locales » les supprime ; l'opérateur ne répond pas de leur perte, et il vous appartient de consigner vos playlists importantes.
2. Musique locale et téléchargements : les fichiers de musique locale importés et les morceaux téléchargés sont stockés dans l'IndexedDB de votre navigateur ; ces contenus vous appartiennent et les serveurs de l'opérateur n'en conservent aucune copie. Les fichiers téléchargés ou importés localement ne servent qu'à votre écoute personnelle ; leur redistribution, leur diffusion publique ou leur usage commercial sont interdits.
3. Autorisation des événements comportementaux : pour fournir la fonction de recommandation, le service enregistre des événements comportementaux lorsque vous lisez un morceau jusqu'au bout, le sautez, l'ajoutez aux favoris ou le refusez (les catégories de signaux et leurs poids sont publics dans le code source). Si vous désactivez la personnalisation ou utilisez le mode purement local ou privé, aucun nouvel enregistrement d'événement n'est produit ; pendant la période d'activation, l'autorisation précédente se limite au périmètre nécessaire à la fonction de recommandation et prend fin dès que vous détruisez l'ensemble des enregistrements par l'« effacement du profil en un clic ».
4. Responsabilité des contenus : vous répondez des contenus que vous soumettez de votre propre initiative (nom de playlist personnalisée, comportements d'appel API, par exemple) ; les litiges et les responsabilités juridiques qui en découlent sont à votre charge.
5. Contenus musicaux : les droits sur les enregistrements, paroles, pochettes et autres contenus appartiennent à leurs titulaires respectifs. Le service n'accorde aucune sous-licence sur les contenus musicaux ; la responsabilité de votre écoute légale sur votre lieu relève de vous.

## 6. Services tiers

1. Sources musicales amont : la recherche, les adresses de lecture et les paroles proviennent des interfaces ouvertes officielles de NetEase, QQ, Kugou, Kuwo, etc., et des bibliothèques publiques de paroles telles qu'AMLL et LRCLIB ; les interfaces tierces peuvent changer, limiter leur débit ou cesser leur service ; l'opérateur ne garantit pas la disponibilité amont.
2. Proxy edge : par défaut, les flux audio transitent par le proxy edge et le CDN amont ne touche pas votre adresse IP ; si vous utilisez expressément le mode de connexion directe `?mode=redirect`, votre navigateur établit la connexion directement avec le CDN officiel et votre IP est visible de ce CDN.
3. Authentification d'identité : Epomail est le fournisseur d'identité du service ; le traitement de ses données figure dans la [Liste des partages avec des tiers et des transferts](/fr/sub-processors/).
4. Conditions des tiers : en utilisant les services ci-dessus, vous êtes également lié par les conditions de ces tiers.

## 7. Utilisation acceptable

L'utilisation du service doit respecter l'intégralité de la [Politique d'utilisation acceptable](/fr/acceptable-use/), y compris l'interdiction d'abuser des ressources d'interfaces, d'attaquer le système, de diffuser des contenus illicites ou de gêner l'utilisation par autrui. En cas de violation, l'opérateur peut procéder selon la procédure fixée par cette politique, jusqu'à la résiliation du droit d'utilisation, et conserver les preuves pour coopérer avec les autorités habilitées selon la loi.

## 8. Conservation des données, retrait et fin d'utilisation

1. Fin à votre initiative : vous pouvez cesser d'utiliser le service à tout moment ; effacer les enregistrements comportementaux par l'« effacement du profil en un clic » et révoquer la session en vous déconnectant. La résiliation du compte Epomail lui-même relève des règles d'Epomail.
2. Enregistrements comportementaux : les événements comportementaux sont stockés dans la base SQLite du plan de données et détruits automatiquement 90 jours après leur enregistrement (configurable par le déployeur, minimum 7 jours) ; destruction immédiate sur votre demande d'effacement ou de vidage. Aucun profil commercial de long terme n'est constitué automatiquement.
3. Fin à l'initiative de l'opérateur : en cas de violation de la [Politique d'utilisation acceptable](/fr/acceptable-use/) de votre part, l'opérateur peut suspendre ou résilier votre droit d'utilisation selon cette politique.
4. Conservation légale : la conservation nécessaire en raison d'exigences légales ou de procédures judiciaires peut différer l'effacement dans le périmètre nécessaire, selon la procédure légale.

## 9. Notification des mesures et recours

Avant de suspendre ou de résilier votre droit d'utilisation au titre de l'« utilisation acceptable » ou de la section précédente, l'opérateur, sauf urgence (attaque en cours, par exemple), doit vous en informer et vous donner l'occasion de vous expliquer ou de régulariser. Si vous estimez la mesure erronée, vous pouvez exercer un recours selon la procédure de la section « Recours » de la [Politique d'utilisation acceptable](/fr/acceptable-use/) ; l'opérateur réexamine et répond dans un délai raisonnable.

Les notifications prévues aux présentes conditions s'effectuent par voie électronique ; le compte Epomail utilisé pour votre connexion constitue le lieu de signification des notifications électroniques, et vous devez veiller à ce qu'il reste en mesure de les recevoir.

## 10. Exclusion de garanties et limitation de responsabilité

1. Fourniture en l'état : le service (logiciel compris) est fourni « en l'état » et « selon la disponibilité », sans aucune garantie expresse ou implicite, y compris les garanties de qualité marchande, d'adéquation à un usage particulier et d'absence de contrefaçon ; ce périmètre d'exclusion est identique à celui de la licence MIT du logiciel.
2. Périmètre d'efficacité : les stipulations du précédent alinéa et les autres clauses exonérant ou réduisant la responsabilité de l'opérateur, alourdissant la vôtre ou limitant vos droits sont privées d'effet dans la mesure où elles seraient manifestement déloyales au cas d'espèce ou interdites par le droit applicable.
3. Limitation de responsabilité : dans la mesure maximale permise par la loi, la responsabilité cumulative de l'opérateur envers vous est plafonnée au montant le plus élevé entre les sommes effectivement versées à l'opérateur au cours des 12 derniers mois (nulles en général pour un service gratuit) et 100 dollars US. L'opérateur ne répond pas des dommages indirects, de la perte de données, des pertes d'exploitation ni de l'atteinte à la réputation commerciale.
4. Responsabilités légales non plafonnées : les responsabilités que le droit applicable interdit d'exonérer ou de limiter par convention (y compris celles résultant d'un manquement de l'opérateur à ses obligations de protection des données) ne sont ni exonérées ni plafonnées par le plafond du précédent alinéa.
5. Force majeure : pour les interruptions de service et les pertes de données dues à des catastrophes naturelles, à des actes gouvernementaux, à des pannes de réseau dorsal, à des attaques massives ou à l'arrêt d'interfaces amont ou du CDN, l'opérateur ne répond pas, sous réserve d'avoir fait des efforts raisonnables.

## 11. Droit applicable, règlement des litiges et supervision de la protection des données

1. L'interprétation, la validité et l'exécution des présentes conditions relèvent du droit du lieu de l'opérateur : droit de Taïwan pour l'instance hébergée ; droit du lieu du déployeur pour l'instance auto-hébergée.
2. Les litiges nés des présentes conditions font d'abord l'objet d'une négociation ; à défaut d'accord, les litiges relatifs à l'instance hébergée relèvent en première instance du tribunal de district de Taipei, Taïwan. Si vous êtes un consommateur et que le droit de votre lieu prévoit une compétence ou une protection des consommateurs impérative différente, celle-ci s'applique.
3. La protection des données n'est pas abaissée par les deux alinéas précédents : le service prend le RGPD comme norme minimale de protection des données pour l'ensemble des utilisateurs (voir la section 4 de la [Vue d'ensemble](/fr/overview/)) ; les utilisateurs de l'Union européenne et de l'Espace économique européen jouissent de l'ensemble des droits et voies de recours énumérés dans la [Politique de confidentialité](/fr/privacy-policy/).

## 12. Révision des conditions

Les présentes conditions peuvent être révisées au fil de l'évolution du service. Les changements majeurs seront annoncés à l'avance sur le site, avec mise à jour de la date d'entrée en vigueur et du numéro de version en tête de page. En continuant à utiliser le service après l'entrée en vigueur d'un changement, vous êtes réputé accepter les conditions révisées ; à défaut d'accord, vous devez cesser de l'utiliser et effacer ou exporter vos données. Les versions historiques des révisions majeures sont archivées avec les enregistrements de versions du dépôt open source ; les conditions révisées sont publiées pour examen selon la voie décrite ci-dessus avant leur entrée en vigueur.

## 13. Coordonnées

- Instance hébergée : `admin@epocanvas.com` ; pour la confidentialité et la protection des données, `privacy@epocanvas.com`
- Projet open source : Issues du dépôt GitHub (`github.com/shijianus/sonic`)
- Sites auto-hébergés : contactez l'opérateur publié par le site concerné

---

*Les présentes conditions forment, avec la [Politique de confidentialité](/fr/privacy-policy/) et la [Politique d'utilisation acceptable](/fr/acceptable-use/), l'ensemble des stipulations entre vous et l'opérateur ; l'ordre d'application entre les documents figure dans la [Vue d'ensemble](/fr/overview/). Le présent document est un modèle général établi par la communauté open source ; il ne constitue pas un avis juridique ; l'opérateur doit consulter un avocat avant toute exploitation et l'adapter à son activité réelle.*
