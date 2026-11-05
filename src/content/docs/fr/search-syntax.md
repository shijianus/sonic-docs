---
title: Référence de la recherche et des règles
description: "Référence de la recherche et des règles de Sonic : récupération multi-sources, tolérance aux erreurs, onglets de catégories et opérations sur les résultats, en une explication complète."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Les descriptions fonctionnelles reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne. Le RC n'est pas une GitHub Release officielle.

La présente page récapitule les capacités et les règles de la recherche Sonic : quoi saisir, comment les erreurs sont tolérées, comment les résultats sont organisés. L'emplacement dans l'interface figure à la section 2 du [Guide de l'interface et des fonctions](/fr/interface/).

## 1. Périmètre de recherche

La recherche couvre quatre types d'objets : titres, artistes, albums et playlists. La page de résultats s'organise en trois onglets de catégories « Titres/Playlists/MV » ; l'entrée de recherche se trouve en haut de la barre latérale et sur la page de recherche, où l'interface peut afficher des suggestions de mots-clés populaires du site.

## 2. Règles de tolérance aux erreurs et de correspondance

| Règle | Explication | Exemple |
| --- | --- | --- |
| Unification des formes de caractères simplifiées et traditionnelles | il est possible d'essayer les deux graphies ; la correspondance réelle dépend de l'index et de la disponibilité des sources amont | comparer « 周杰伦 » et « 周傑倫 » |
| Recherche par pinyin et par abréviations | essayer le pinyin complet ou les initiales ; aucun résultat n'est garanti pour toutes les sources | essayer « zjl » pour les morceaux de Jay Chou (周杰伦／周傑倫) |
| Correspondance symétrique des alias | le site peut associer les alias chinois et étrangers d'un artiste ; le résultat réel dépend de l'index | une recherche du nom étranger peut retrouver l'artiste sous son alias chinois |
| Tolérance aux fautes de frappe par distance d'édition | une saisie proche peut être proposée comme candidate ; toutes les fautes ne sont pas corrigées | saisir une chaîne proche et vérifier le résultat réel |
| Identification des versions | les résultats peuvent distinguer les versions studio, live, reprises, etc. | se reporter à l'indication de version du résultat |

## 3. Récupération parallèle multi-sources et déduplication

Les requêtes sont envoyées aux sources amont activées et disponibles au moment de la demande, puis les résultats sont fusionnés selon des règles de normalisation. Les enregistrements d'un même morceau portant le même nom peuvent être regroupés en un résultat unique ; l'adresse de lecture est obtenue au moment de la lecture selon la disponibilité. La liste des sources amont et leurs commutateurs par défaut figurent à la section 3 de la [Liste des partages avec des tiers et des transferts](/fr/sub-processors/).

## 4. Opérations sur les résultats

Chaque ligne de la liste de titres peut proposer la lecture, une entrée MV le cas échéant, le favori, le téléchargement et d'autres actions ; le bouton « Tout lire » en haut peut enchaîner les résultats. Les résultats de playlists ouvrent la page de détail de la playlist et les résultats de MV la liste des MV ; les actions réelles dépendent du résultat et de la configuration de l'instance.

## 5. Recherche et confidentialité

Le traitement des termes de recherche :

1. **Local** : l'historique récent utilise localStorage, mais la requête est envoyée pour la recherche et certains éléments peuvent accompagner les demandes de recommandation ; l'effacement local ne supprime pas les copies distantes déjà créées ;
2. **Agrégation côté serveur** : la recherche intelligente peut compter ou conserver séparément les termes bruts et les faire apparaître dans des suggestions publiques ; désactiver la personnalisation n'exclut pas à lui seul cette voie. Un texte peut identifier une personne sans identifiant de compte ; n'y saisissez pas de données personnelles ou sensibles. Les filtres, seuils d'affichage, contrôles de conservation et configuration de l'instance doivent être vérifiés séparément ;
3. **Personnalisation** : les recherches et clics peuvent être associés par des identifiants pseudonymes. Le réglage de personnalisation ne contrôle pas toutes les voies de statistiques de recherche ; un réglage ou une réinitialisation à 90 jours ne signifie pas que chaque agrégat ou copie de recherche est supprimé selon le même calendrier.

Les détails figurent à la section 4 de la [Politique de confidentialité](/fr/privacy-policy/) et dans la [Description de l'algorithme de recommandation](/fr/recommendation/).
