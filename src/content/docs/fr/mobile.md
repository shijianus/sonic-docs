---
title: Guide mobile
description: "Guide mobile de Sonic : mise en page sur téléphone, navigation par onglets, tiroir du lecteur mobile et comportements propres au mobile."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page décrit la mise en page de Sonic dans le navigateur d'un téléphone et les points d'usage à connaître. La version mobile et la version ordinateur partagent la même instance et le même système de comptes, avec des fonctions équivalentes ; la disposition de l'interface s'adapte automatiquement à la largeur de l'écran, sans installation d'application.

## 1. Mise en page et navigation

Sur mobile, la navigation par onglets en bas remplace la barre latérale de la version ordinateur : quatre entrées, Accueil, Recherche, Lectures récentes et Paramètres ; la lecture en cours reste en permanence dans la mini-barre de lecture en bas, dont un clic déploie le tiroir du lecteur mobile (PlayerDrawerMobile).

## 2. Tiroir du lecteur

Le tiroir du lecteur mobile offre les mêmes capacités que la version ordinateur : paroles mot à mot (texte original, traduction, romanisation), menu de qualité audio, mode de lecture et téléchargement. L'arrière-plan du tiroir se fond dans la couleur dominante de la pochette, avec déplacement de la position de lecture et saut par les paroles pris en charge.

## 3. Accueil et radar

L'accueil mobile est identique à celui de la version ordinateur : carrousel de recommandations, recommandation intelligente et radar musical (après une recherche, présentation des correspondances avec vos préférences), playlists recommandées. Les motifs de recommandation des cartes et les étiquettes de signaux de préférence y sont tout aussi transparents, avec une disposition empilée verticalement.

## 4. Limites de stockage et de synchronisation

Le stockage local du navigateur mobile est indépendant de celui de la version ordinateur : favoris, téléchargements et musique locale résident dans le navigateur de chaque appareil, sans synchronisation entre appareils. Sonic ne fournit pas de synchronisation cloud des favoris, playlists ou préférences. L'état de connexion se maintient indépendamment avec la session de chaque navigateur. En cas de besoin de migration, reconstruisez vos favoris sur chaque appareil ou recourez, si elle existe, à une fonction de synchronisation propre au navigateur ou à l'appareil, hors du service Sonic ; Sonic ne fournit pas d'exportation générale du localStorage ou de l'IndexedDB.

## 5. Conseils d'usage

1. L'ajout du site à l'écran d'accueil procure une expérience de lancement proche d'une application ;
2. La lecture en arrière-plan dépend de la politique média du navigateur mobile : après un changement d'application, la lecture peut être suspendue par le système et reprend dès le retour sur la page ;
3. Le mode d'économie d'énergie et l'économiseur de données peuvent restreindre l'audio en arrière-plan ; il s'agit d'un comportement du navigateur, non d'une limitation du service ;
4. En navigation privée, le stockage local n'est pas persistant et favoris et téléchargements se perdent à la fermeture de la page ; pour un usage durable, utilisez le mode normal.
