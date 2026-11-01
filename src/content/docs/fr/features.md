---
title: Guide des fonctions
description: "Guide des fonctions de Sonic : graduation de la qualité audio et transparence des extraits, paroles mot à mot, recommandation et Auto DJ, téléchargement et musique locale, classements, MV et tolérance aux erreurs de recherche, en profondeur."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.4**

La présente page explique en profondeur le comportement de chaque fonction de Sonic et les arbitrages de conception qui les sous-tendent. L'emplacement des fonctions dans l'interface figure dans le [Guide de l'interface et des fonctions](/fr/interface/) ; la description technique des signaux comportementaux et du modèle de recommandation se trouve à la section 5 de la [Présentation du projet](/fr/project/) ; les conditions contractuelles d'utilisation des fonctions figurent dans les [Conditions d'utilisation](/fr/terms-of-service/).

## 1. Graduation de la qualité audio et transparence des extraits

Sonic distingue strictement les morceaux complets des extraits :

1. Niveaux de qualité : les niveaux disponibles de la source audio (SQ sans perte, HQ haute qualité, standard, etc.) sont déterminés par les liens directs réellement délivrés par l'amont ; le menu de qualité n'énumère que les options réellement disponibles et le badge indique fidèlement le flux en cours ;
2. Détection des extraits : la sonde portant sur la durée des entités audio et leurs métadonnées identifie les troncatures officielles en extrait de 30 secondes ; le résultat est présenté au moyen de l'indicateur d'extrait, un extrait n'étant jamais présenté comme un morceau complet ;
3. Complétion inter-sources : une fois activée, l'appariement automatique d'un morceau complet gratuit de QQ/Kugou/Kuwo est tenté pour les morceaux en extrait ; en cas d'appariement réussi, la commutation est fluide et la source de substitution est indiquée ; à défaut, l'extrait est conservé et la lecture enchaîne naturellement sur le morceau suivant ;
4. Limites strictes : le service n'intègre aucun composant de contournement des mécanismes payants et de protection des droits d'auteur ; les catalogues d'abonnement légaux sont montés par le déployeur avec ses propres identifiants.

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
6. Maîtrise des données : tous les événements comportementaux sont associés à des identifiants pseudonymisés, détruits automatiquement après 90 jours, avec effacement en un clic (voir la section 9 de la [Politique de confidentialité](/fr/privacy-policy/)).

## 4. Téléchargement et musique locale

1. Téléchargement : le morceau, avec ses métadonnées de qualité audio, est stocké dans l'IndexedDB du navigateur (`downloaded_music`) et géré depuis la page de la liste de téléchargements ; la lecture hors ligne reste disponible ;
2. Musique locale : importation de fichiers audio locaux par glisser-déposer ou sélection dans le navigateur (`local_music`), présentés de manière unifiée avec la bibliothèque en ligne ;
3. Limites : dans les deux cas, le stockage reste exclusivement dans votre navigateur, sans téléversement vers le serveur ; l'écoute est réservée à un usage personnel et la redistribution est interdite.

## 5. Classements et palmarès officiels

La page des classements propose deux catégories, Nouveautés et Palmarès officiels, chacune déclinée en cinq sous-catégories (Tous/Chinois/Occidental/Japonais/Coréen) ; l'enchaînement de la lecture d'un classement se lance en un clic. Le palmarès des tendances de l'accueil et la page des classements partagent le même modèle de popularité (pondération de cinq facteurs + décroissance temporelle + lissage bayésien), décrit à la section 5 de la [Présentation du projet](/fr/project/).

## 6. Lecture des MV

Les résultats de recherche et les pages de titres donnent un accès direct au lecteur de MV ; les MV proviennent des interfaces officielles amont, leur disponibilité varie avec l'amont, et l'interface en informe fidèlement en cas d'indisponibilité.

## 7. Tolérance aux erreurs de recherche

La chaîne de recherche intègre une tolérance multiniveau : unification des formes de caractères simplifiées et traditionnelles, recherche par pinyin et par abréviations, correspondance symétrique des alias d'artistes en chinois et en langue étrangère, tolérance aux fautes de frappe par distance d'édition et identification des versions ; la recherche parallèle multi-sources est suivie d'une fusion avec déduplication par expression régulière. Une faute de frappe dans les mots-clés atteint généralement néanmoins la cible.

## 8. Mode dégradé

Lorsque le nœud de plan de données est hors ligne ou dépasse les délais, la couche edge bascule automatiquement en mode dégradé : la recherche et les paroles passent en connexion directe edge vers les interfaces publiques, l'interface affiche l'avis « mode dégradé de l'edge » et les morceaux déjà chargés ne sont pas affectés. Pendant la dégradation, l'analyse complète des sources audio et la mise à jour des recommandations peuvent être indisponibles ; la fermeture s'opère automatiquement au rétablissement (description du mécanisme de continuité à la section 3.1 de [Traitement des données et mesures de sécurité](/fr/data-security/)).
