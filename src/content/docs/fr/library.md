---
title: Gestion de la bibliothèque musicale
description: "Gestion de la bibliothèque musicale de Sonic : favoris et collections, lectures récentes, téléchargements et musique locale, leur emplacement de stockage et leurs opérations de gestion."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Cette page décrit les quatre contenus de « Ma musique » et leur stockage principalement local. Aucun chemin de téléversement du corps audio local n'a été constaté, mais les métadonnées, pochettes intégrées, retours et contextes de recommandation peuvent être transmis ; les pochettes peuvent entrer dans le catalogue distant partagé de morceaux. Le stockage local ne prouve pas l'absence de traitement distant et ne constitue pas une sauvegarde cloud générale. Les limites d'effacement figurent dans [Exportation et stockage des données](/fr/data-management/). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

![Emplacements des données Sonic : favoris et historique du navigateur, téléchargements et musique locale dans IndexedDB, traitement distant](/images/sonic/library-storage.svg)

*Figure : trois emplacements conservent des données différentes ; effacer le navigateur ne supprime pas entièrement les enregistrements distants.*

## 1. Favoris et collections

La page « Titres favoris » agrège les contenus que vous avez marqués : titres aimés, playlists mises en favori, albums mis en favori, artistes suivis et MV mis en favori. Point d'entrée : le bouton en forme de cœur sur les lignes de morceaux, les pages d'albums et les pages d'artistes. Les données résident dans le localStorage du navigateur (clé `library`), prennent effet immédiatement et ne requièrent aucune connexion.

## 2. Lectures récentes

« Lectures récentes » lit dans localStorage (`audio`) les 100 derniers morceaux au maximum, conservés automatiquement et présentés du plus récent au plus ancien. Aucun interrupteur distinct permettant de désactiver cet historique local n'a été trouvé. Des événements de lecture et le contexte des artistes récents peuvent être transmis séparément pour la recommandation ; l'historique local ne signifie pas que le serveur ne conserve rien. La personnalisation activée par défaut n'est pas un consentement ; la navigation privée ne bloque pas l'envoi d'événements.

## 3. Téléchargements

En cliquant sur télécharger dans la ligne d'un morceau ou dans la barre de lecture inférieure, le morceau est écrit, avec ses métadonnées de qualité audio, dans l'IndexedDB du navigateur (`downloaded_music`) ; la page « Téléchargements » gère le contenu téléchargé, qui reste lisible hors ligne. Les téléchargements occupent le quota de stockage du navigateur ; lorsque le quota est insuffisant, le navigateur refuse les nouveaux téléchargements ; supprimez d'abord d'anciens téléchargements ou libérez le stockage du navigateur.

## 4. Musique locale

La page « Musique locale » permet d'ajouter des fichiers audio par clic ou par glisser-déposer pour les importer dans le navigateur (`local_music`) ; les fichiers importés sont présentés et lus au même titre que le catalogue en ligne. Aucun chemin de téléversement du corps audio local n'a été constaté, mais la recherche de paroles, les favoris et les recommandations peuvent transmettre titre, artiste, album, durée ou identifiant, et la pochette intégrée peut être envoyée avec un événement et entrer dans le catalogue distant partagé de morceaux. Les formats pris en charge dépendent des capacités de décodage du navigateur ; la suppression d'un morceau ne retire que la copie présente dans le navigateur, sans toucher à vos fichiers d'origine ni garantir l'effacement distant.

## 5. Aperçu des emplacements de stockage

| Contenu | Emplacement de stockage | Perdu lors de l'effacement des données du navigateur |
| --- | --- | --- |
| Favoris et collections | localStorage (`library`) | oui |
| Lectures récentes | localStorage (`audio`) | oui |
| Morceaux téléchargés | IndexedDB (`downloaded_music`) | oui |
| Copies de la musique locale | IndexedDB (`local_music`) | oui |

Veillez à sauvegarder vos playlists importantes et vos téléchargements : l'option « Effacer toutes les données » du navigateur comme « Effacer toutes les données locales » du site suppriment les contenus ci-dessus (voir [Exportation et stockage des données](/fr/data-management/)). Les fichiers d'origine de la musique locale demeurent sur votre appareil.
