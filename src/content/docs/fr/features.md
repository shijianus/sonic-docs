---
title: Guide des fonctions
description: "Guide des fonctions Sonic : qualité audio et extraits, paroles mot à mot, recommandation et Auto DJ, musique locale, classements, MV et recherche."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

La présente page explique en profondeur le comportement de chaque fonction de Sonic et les arbitrages de conception qui les sous-tendent. L'emplacement des fonctions dans l'interface figure dans le [Guide de l'interface et des fonctions](/fr/interface/) ; la description technique des signaux comportementaux et du modèle de recommandation se trouve à la section 5 de la [Présentation du projet](/fr/project/) ; les conditions contractuelles d'utilisation des fonctions figurent dans les [Conditions d'utilisation](/fr/terms-of-service/). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

![Les six groupes de fonctions de Sonic : recherche, lecture, paroles, bibliothèque, recommandations et confidentialité](/images/sonic/features-map.svg)

*Figure : six groupes de fonctions ; l'étendue réelle des recommandations et des contrôles de confidentialité dépend de la configuration de l'instance.*

## 1. Graduation de la qualité audio et transparence des extraits

Sonic distingue strictement les morceaux complets des extraits :

1. Niveaux de qualité : les niveaux disponibles de la source audio (SQ sans perte, HQ haute qualité, standard, etc.) sont déterminés par les liens directs réellement délivrés par l'amont ; le menu de qualité n'énumère que les options réellement disponibles et le badge indique fidèlement le flux en cours ;
2. Détection des extraits : la sonde portant sur la durée des entités audio et leurs métadonnées identifie les troncatures officielles en extrait de 30 secondes ; le résultat est présenté au moyen de l'indicateur d'extrait, un extrait n'étant jamais présenté comme un morceau complet ;
3. Complétion inter-sources : une fois activée, l'appariement automatique d'un morceau complet gratuit de QQ/Kugou/Kuwo est tenté pour les morceaux en extrait ; en cas d'appariement réussi, la commutation est fluide et la source de substitution est indiquée ; à défaut, l'extrait est conservé et la lecture enchaîne naturellement sur le morceau suivant ;
4. Limites : le fait qu'une ressource soit techniquement lisible ne prouve pas l'autorisation de l'utiliser ; les identifiants d'abonnement d'un déployeur ne donnent pas automatiquement le droit de partager son catalogue. Ne contournez pas les protections de paiement ou d'accès.

## 2. Chaîne des paroles mot à mot

Les paroles sont obtenues selon une priorité à trois niveaux :

| Priorité | Source | Format |
| --- | --- | --- |
| 1 | analyse native locale (NetEase/QQ/Kugou) | timeline au niveau du mot YRC/QRC/KRC |
| 2 | AMLL | format mot à mot TTML |
| 3 | LRCLIB | paroles synchronisées au niveau de la ligne |

Le panneau des paroles comporte trois commutateurs indépendants : texte original, traduction et romanisation ; un clic sur une ligne de paroles déplace la position de lecture ; l'animation au niveau du mot est synchronisée avec la progression de la lecture. Les données de paroles passent également par le cache edge ; en l'absence de paroles natives locales, la bascule automatique vers la bibliothèque mondiale de paroles s'opère.

## 3. Recommandation et Auto DJ

1. Suggestions pour vous : recommandations personnelles fusionnant taux de lecture intégrale, favoris, intention de recherche en session et reclassement de diversité MMR ; les cartes indiquent le motif de la recommandation (comme « Artiste fréquemment écouté ») et la version mobile affiche en outre les étiquettes de signaux de préférence ;
2. Palmarès des tendances du site : palmarès des 24 heures et palmarès cumulé sur 7 jours, fondés sur les signaux de lecture réels de tout le site ;
3. Radar d'exploration de styles : exploration par genre, avec un paramètre de température permettant de régler l'amplitude de l'exploration ;
4. Auto DJ : une fois la liste de lecture naturellement terminée, enchaînement automatique sur des morceaux jouables selon le style du morceau en cours ; désactivable dans les paramètres ;
5. Assainissement des signaux : les 6 catégories de sauts sans cause utilisateur (blocage réseau, échec de décodage, troncature en extrait, etc.) n'entrent pas dans le bassin de données de recommandation ;
6. Données : personnalisation et Auto DJ sont activés par défaut dans le code sans preuve de consentement affirmatif. Les identifiants sont pseudonymes ; les 90 jours de certains événements ne couvrent pas tout le radar, les recherches ou agrégats. La suppression peut omettre anciens identifiants anonymes, services externes et sauvegardes, avec des échecs masqués. La route distante du radar doit être vérifiée selon le déploiement ; aucune synchronisation générale n'est confirmée (voir la [Politique de confidentialité](/fr/privacy-policy/)).

## 4. Téléchargement et musique locale

1. Téléchargement : le morceau, avec ses métadonnées de qualité audio, est stocké dans l'IndexedDB du navigateur (`downloaded_music`) et géré depuis la page de la liste de téléchargements ; la lecture hors ligne reste disponible ;
2. Musique locale : importation de fichiers audio locaux par glisser-déposer ou sélection dans le navigateur (`local_music`), présentés de manière unifiée avec la bibliothèque en ligne ;
3. Limites : aucun chemin de téléversement du corps audio local n'a été constaté. La recherche de paroles, les retours sur les favoris et le contexte de recommandation peuvent transmettre titre, artiste, album ou identifiant ; les pochettes intégrées peuvent aussi être envoyées avec des événements et entrer dans le catalogue distant partagé de morceaux. Le stockage local n'est pas une sauvegarde cloud générale ; l'importation et le téléchargement ne confèrent aucun droit supplémentaire sur le contenu.

## 5. Classements et palmarès officiels

La page des classements propose deux catégories, Nouveautés et Palmarès officiels, chacune déclinée en cinq sous-catégories (Tous/Chinois/Occidental/Japonais/Coréen) ; l'enchaînement de la lecture d'un classement se lance en un clic. Le palmarès des tendances de l'accueil et la page des classements partagent le même modèle de popularité (pondération de cinq facteurs + décroissance temporelle + lissage bayésien), décrit à la section 5 de la [Présentation du projet](/fr/project/).

## 6. Lecture des MV

Les résultats de recherche et pages de titres ouvrent le lecteur de MV selon la disponibilité amont. Les connexions directes aux MV, images, avatars ou polices peuvent révéler l'IP, même si l'audio passe par un proxy. Les écritures actuelles de commentaires, réponses et mentions « J'aime » sont simulées localement ; les commentaires lus en amont peuvent contenir des données personnelles et être mis en cache par l'instance. « Publier » ne prouve pas un envoi à l'amont.

## 7. Tolérance aux erreurs de recherche

La recherche combine normalisation simplifié-traditionnel, pinyin, alias, tolérance orthographique et reconnaissance des versions, puis fusionne les résultats multi-sources. Les termes bruts peuvent toutefois être enregistrés séparément et apparaître dans les suggestions publiques ; désactiver la personnalisation ou utiliser la navigation privée ne bloque pas ce chemin. N'y saisissez pas de données personnelles ou sensibles.

## 8. Mode dégradé

La couche edge prévoit un mode dégradé en cas d'échec du moteur, avec recherche et paroles via des chemins de secours. Leur disponibilité, la lecture des morceaux déjà chargés et le délai de reprise ne sont pas garantis ; la résolution audio et les recommandations peuvent rester indisponibles. Le projet personnel gratuit ne fournit pas de SLA. Voir [Traitement des données et mesures de sécurité](/fr/data-security/).
