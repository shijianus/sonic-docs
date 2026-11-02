---
title: Guide mobile
description: "Guide mobile de Sonic : mise en page sur téléphone, navigation par onglets, tiroir du lecteur mobile et comportements propres au mobile."
---

**Date de révision : 2 novembre 2026｜Version : 1.8**

La présente page décrit la mise en page de Sonic dans le navigateur d'un téléphone et les points d'usage à connaître. La version mobile et la version ordinateur partagent la même instance et le même système de comptes, avec des fonctions équivalentes ; la disposition de l'interface s'adapte automatiquement à la largeur de l'écran, sans installation d'application. Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

## 1. Mise en page et navigation

Sur mobile, la navigation par onglets en bas remplace la barre latérale de la version ordinateur : quatre entrées, Accueil, Recherche, Lectures récentes et Paramètres ; la lecture en cours reste en permanence dans la mini-barre de lecture en bas, dont un clic déploie le tiroir du lecteur mobile (PlayerDrawerMobile).

## 2. Tiroir du lecteur

Le tiroir du lecteur mobile offre les mêmes capacités que la version ordinateur : paroles mot à mot (texte original, traduction, romanisation), menu de qualité audio, mode de lecture et téléchargement. L'arrière-plan du tiroir se fond dans la couleur dominante de la pochette, avec déplacement de la position de lecture et saut par les paroles pris en charge.

## 3. Accueil et radar

L'accueil mobile est identique à celui de la version ordinateur : carrousel de recommandations, recommandation intelligente et radar musical (après une recherche, présentation des correspondances avec vos préférences), playlists recommandées. Les motifs de recommandation des cartes et les étiquettes de signaux de préférence y sont tout aussi transparents, avec une disposition empilée verticalement.

## 4. Limites de stockage et de synchronisation

Les stockages du navigateur mobile et du navigateur de bureau sont indépendants ; aucune synchronisation cloud générale, sauvegarde ou exportation de localStorage/IndexedDB n'est garantie. Aucun chemin de téléversement du corps audio local n'a été constaté, mais les pochettes intégrées, métadonnées, retours et contextes de recommandation peuvent être transmis ; le radar a aussi une route de synchronisation distante dont la disponibilité est limitée. L'état du compte dépend de chaque navigateur ; la migration des appareils ne garantit pas la restauration de toutes les données Sonic. Voir la [Politique de confidentialité](/fr/privacy-policy/).

## 5. Conseils d'usage

1. L'ajout du site à l'écran d'accueil procure une expérience de lancement proche d'une application ;
2. La lecture en arrière-plan dépend de la politique média du navigateur mobile : après un changement d'application, la lecture peut être suspendue par le système et reprend dès le retour sur la page ;
3. Le mode d'économie d'énergie et l'économiseur de données peuvent restreindre l'audio en arrière-plan ; il s'agit d'un comportement du navigateur, non d'une limitation du service ;
4. La navigation privée peut effacer les données locales à la fin de la session, mais ne bloque pas les requêtes ni événements. Personnalisation et Auto DJ sont activés par défaut dans le code sans consentement démontré ; après un nettoyage des paramètres, vérifiez à nouveau votre choix. Le nettoyage de l'application ne supprime pas le cookie HttpOnly et ne vaut pas déconnexion.
