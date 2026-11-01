---
title: Référence de la recherche et des règles
description: "Référence de la recherche et des règles de Sonic : récupération multi-sources, tolérance aux erreurs, onglets de catégories et opérations sur les résultats, en une explication complète."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page récapitule les capacités et les règles de la recherche Sonic : quoi saisir, comment les erreurs sont tolérées, comment les résultats sont organisés. L'emplacement dans l'interface figure à la section 2 du [Guide de l'interface et des fonctions](/fr/interface/).

## 1. Périmètre de recherche

La recherche couvre quatre types d'objets : titres, artistes, albums et playlists. La page de résultats s'organise en trois onglets de catégories « Titres/Playlists/MV » ; l'entrée de recherche se trouve en haut de la barre latérale et sur la page de recherche, avec suggestions de mots-clés des recherches populaires du site.

## 2. Règles de tolérance aux erreurs et de correspondance

| Règle | Explication | Exemple |
| --- | --- | --- |
| Unification des formes de caractères simplifiées et traditionnelles | les saisies en caractères simplifiés et en caractères traditionnels correspondent de manière équivalente | la saisie de « 周杰伦 » et de « 周杰倫 » donne les mêmes résultats |
| Recherche par pinyin et par abréviations | correspondance par pinyin complet ou par initiales | la saisie de « zyy » retrouve les morceaux de 周杰伦 (Jay Chou) |
| Correspondance symétrique des alias | les alias d'artistes en chinois et en langue étrangère sont associés dans les deux sens | la recherche du nom en langue étrangère retrouve l'artiste sous son alias chinois |
| Tolérance aux fautes de frappe par distance d'édition | les fautes de frappe sont corrigées selon la distance d'édition | une saisie approximative retrouve tout de même la cible |
| Identification des versions | distinction des versions de studio, versions live, reprises, etc. | les résultats indiquent la version à laquelle ils appartiennent |

## 3. Récupération parallèle multi-sources et déduplication

Les requêtes de recherche sont envoyées en parallèle aux sources amont activées et les résultats sont fusionnés avec déduplication par expression régulière : les enregistrements multi-sources d'un même morceau portant le même nom sont fusionnés en un résultat unique, et l'adresse de lecture est obtenue au moment de la lecture en retenant le flux disponible le meilleur. La liste des sources amont et leurs commutateurs par défaut figurent à la section 3 de la [Liste des partages avec des tiers et des transferts](/fr/sub-processors/).

## 4. Opérations sur les résultats

Chaque ligne de la liste de titres offre : lecture, entrée MV (le cas échéant), favori, téléchargement et actions supplémentaires ; le bouton « Tout lire » en haut enchaîne la lecture dans l'ordre des résultats. Les résultats de playlists ouvrent la page de détail de la playlist, et les résultats de MV ouvrent la liste des MV.

## 5. Recherche et confidentialité

Le traitement des termes de recherche :

1. Local : les termes de recherche récents (10 entrées au plus) ne sont conservés que dans le localStorage du navigateur et peuvent être effacés avec « Effacer toutes les données locales » ;
2. Agrégation côté serveur : les termes de recherche alimentent le comptage agrégé global (sans identifiant personnel, pour le palmarès des recherches populaires) ;
3. Personnalisation : lorsque la personnalisation est activée, les clics issus de la recherche sont enregistrés comme signaux de recommandation (pseudonymisation, 90 jours) ; une fois désactivée, aucun événement n'est enregistré.

Les détails figurent à la section 4 de la [Politique de confidentialité](/fr/privacy-policy/) et dans la [Description de l'algorithme de recommandation](/fr/recommendation/).
