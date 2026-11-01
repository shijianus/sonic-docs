---
title: Démarrage rapide
description: "Démarrage rapide de Sonic : le chemin le plus court, de l'ouverture du site à la recherche et à la lecture, à la connexion et à l'usage de la bibliothèque locale, au téléchargement et à la musique locale, et à l'usage mobile."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page indique le chemin le plus court pour utiliser l'instance hébergée de Sonic (`sonic.epocanvas.tech`) : de l'ouverture du site à la recherche et à la lecture, à la connexion et à l'usage de la bibliothèque locale, au téléchargement et à la musique locale, et à l'usage mobile. Le tour d'horizon complet de l'interface figure dans le [Guide de l'interface et des fonctions](/fr/interface/) ; la présente page ne traite pas de l'auto-hébergement (pour le déploiement, voir le [Guide de déploiement](/fr/deployment/)).

## 1. Ouvrir le site

Accédez à `sonic.epocanvas.tech` dans votre navigateur (miroir de secours `sonic.epocanvas.com`). La langue de l'interface suit par défaut celle du navigateur ; vous pouvez basculer entre chinois simplifié, anglais et japonais via « Paramètres → Langue de l'interface » ; le thème (clair/sombre/suivre le système) se règle au même endroit. Toutes les fonctions principales sont utilisables sans connexion.

## 2. Recherche et lecture

1. saisissez des mots-clés de titre, d'artiste, d'album ou de playlist dans le champ de recherche en haut de la barre latérale gauche (ou sur la page « Recherche ») ; la recherche gère l'unification simplifié-traditionnel, les abréviations pinyin et la tolérance aux fautes de frappe ;
2. les résultats se répartissent en trois onglets « Titres/Playlists/MV » ; un clic sur un titre lance la lecture, ou « Tout lire » enchaîne toute la liste ;
3. la barre de lecture inférieure affiche le morceau en cours, la ligne d'aperçu des paroles et le badge de qualité audio (SQ sans perte, par exemple) ; un clic sur la pochette déploie le tiroir du lecteur plein écran, où consulter les paroles mot à mot (texte original, traduction et romanisation commutables indépendamment).

En présence d'un extrait officiel de 30 secondes, le lecteur l'indique fidèlement au moyen de l'indicateur d'extrait et ne le présente jamais comme un morceau complet ; lorsque la complétion inter-sources est activée, l'appariement automatique d'un morceau complet gratuit est tenté.

## 3. Connexion et bibliothèque locale

Connectez-vous avec un compte Epomail selon OAuth 2.0 (PKCE) ; le service ne dispose pas de système d'inscription autonome :

1. cliquez sur l'entrée de connexion en bas de la barre latérale ; vous êtes dirigé vers la page d'autorisation d'Epomail, où vous confirmez ;
2. les titres favoris, les playlists enregistrées, les artistes suivis et vos playlists personnelles sont stockés uniquement dans le navigateur utilisé ; ils ne sont pas synchronisés dans le cloud ni entre appareils ;
3. la connexion débloque en outre les recommandations personnalisées et l'enchaînement Auto DJ ; tous deux peuvent être désactivés dans « Paramètres → Confidentialité et données locales » ; une fois désactivés, la recommandation passe en mode purement public et plus aucun événement comportemental n'est enregistré.

La session est valable 30 jours au plus ; la déconnexion révoque immédiatement. Les règles de compte figurent à la section 3 des [Conditions d'utilisation](/fr/terms-of-service/).

## 4. Téléchargement et musique locale

1. Téléchargement : cliquez sur télécharger dans la colonne d'actions du titre ou dans la barre de lecture inférieure ; le morceau, avec ses métadonnées de qualité audio, est stocké dans l'IndexedDB du navigateur et géré depuis la page « Téléchargements » ; la lecture hors ligne reste disponible ;
2. Musique locale : la page « Musique locale » permet d'ajouter des fichiers audio par clic ou par glisser-déposer dans le navigateur ; les fichiers importés sont également stockés dans l'IndexedDB, sans téléversement vers le serveur ;
3. dans les deux cas, l'écoute est réservée à un usage personnel et la redistribution est interdite (voir la [Politique d'utilisation acceptable](/fr/acceptable-use/)).

## 5. Usage mobile

L'accès à la même adresse depuis le navigateur d'un téléphone affiche la mise en page mobile : navigation par onglets en bas (Accueil, Recherche, Lectures récentes, Paramètres) et mini-barre de lecture ; le tiroir du lecteur offre les mêmes paroles mot à mot et le même menu de qualité audio. Les favoris, playlists, préférences et téléchargements sont stockés séparément dans le navigateur de chaque appareil et ne sont pas synchronisés entre appareils.

## 6. Premiers réglages de confidentialité

Dès la première utilisation, trois commandes méritent votre attention (dans « Paramètres → Confidentialité et données locales ») :

1. Recherche intelligente et recommandations personnalisées : interrupteur général ; une fois désactivé, les événements ne sont plus collectés ;
2. Radio en continu automatique (Auto DJ) : commande l'enchaînement automatique une fois la liste de lecture terminée ;
3. Réinitialisation du profil de recommandation et de l'historique de refus / Effacement de toutes les données locales : deux boutons de suppression à effet immédiat.

La formulation intégrale des engagements de confidentialité figure dans la [Politique de confidentialité](/fr/privacy-policy/).

## 7. FAQ express

| Question | Réponse |
| --- | --- |
| Faut-il payer ? | gratuit, sans publicité, sans achats intégrés |
| Peut-on l'utiliser sans se connecter ? | les fonctions principales sont utilisables de manière anonyme (limitation de débit plus stricte) |
| Où sont stockées les données ? | stockage local du navigateur + événements comportementaux pseudonymisés côté serveur (90 jours) |
| Comment supprimer le profil ? | Paramètres → Réinitialiser le profil de recommandation, effet immédiat |
| Pourquoi 30 secondes ? | troncature officielle en extrait, signalée fidèlement, avec complétion inter-sources au mieux |
| La qualité audio est-elle surestimée ? | le badge reflète fidèlement le niveau du flux en cours |

D'autres questions sont traitées à la section 12 de la [Présentation du projet](/fr/project/) ; les termes juridiques figurent dans les [Définitions des termes](/fr/key-terms/).
