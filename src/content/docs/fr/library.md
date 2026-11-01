---
title: Gestion de la bibliothèque musicale
description: "Gestion de la bibliothèque musicale de Sonic : favoris et collections, lectures récentes, téléchargements et musique locale, leur emplacement de stockage et leurs opérations de gestion."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page décrit la gestion et l'emplacement de stockage des quatre contenus de la zone « Ma musique ». L'ensemble des données ne réside que dans votre navigateur, sans téléversement vers le serveur ; les opérations de vidage et de suppression figurent dans [Exportation et stockage des données](/fr/data-management/).

## 1. Favoris et collections

La page « Titres favoris » agrège les contenus que vous avez marqués : titres aimés, playlists mises en favori, albums mis en favori, artistes suivis et MV mis en favori. Point d'entrée : le bouton en forme de cœur sur les lignes de morceaux, les pages d'albums et les pages d'artistes. Les données résident dans le localStorage du navigateur (clé `library`), prennent effet immédiatement et ne requièrent aucune connexion.

## 2. Lectures récentes

L'historique de lecture s'enregistre automatiquement dans le localStorage du navigateur (clé `audio`) ; la page « Lectures récentes » le présente du plus récent au plus ancien, et un clic suffit à relire un morceau. L'historique ne réside que sur votre appareil et n'est pas synchronisé avec le serveur.

## 3. Téléchargements

En cliquant sur télécharger dans la ligne d'un morceau ou dans la barre de lecture inférieure, le morceau est écrit, avec ses métadonnées de qualité audio, dans l'IndexedDB du navigateur (`downloaded_music`) ; la page « Téléchargements » gère le contenu téléchargé, qui reste lisible hors ligne. Les téléchargements occupent le quota de stockage du navigateur ; lorsque le quota est insuffisant, le navigateur refuse les nouveaux téléchargements ; supprimez d'abord d'anciens téléchargements ou libérez le stockage du navigateur.

## 4. Musique locale

La page « Musique locale » permet d'ajouter des fichiers audio par clic ou par glisser-déposer pour les importer dans le navigateur (`local_music`) ; les fichiers importés sont présentés et lus au même titre que le catalogue en ligne. L'importation s'accomplit entièrement dans le navigateur, sans téléversement des fichiers. Les formats pris en charge dépendent des capacités de décodage du navigateur ; la suppression d'un morceau ne retire que la copie présente dans le navigateur, sans toucher à vos fichiers d'origine.

## 5. Aperçu des emplacements de stockage

| Contenu | Emplacement de stockage | Perdu lors de l'effacement des données du navigateur |
| --- | --- | --- |
| Favoris et collections | localStorage (`library`) | oui |
| Lectures récentes | localStorage (`audio`) | oui |
| Morceaux téléchargés | IndexedDB (`downloaded_music`) | oui |
| Copies de la musique locale | IndexedDB (`local_music`) | oui |

Veillez à sauvegarder vos playlists importantes et vos téléchargements : l'option « Effacer toutes les données » du navigateur comme « Effacer toutes les données locales » du site suppriment les contenus ci-dessus (voir [Exportation et stockage des données](/fr/data-management/)). Les fichiers d'origine de la musique locale demeurent sur votre appareil.
