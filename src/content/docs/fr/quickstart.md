---
title: Démarrage rapide
description: "Démarrage rapide de Sonic : le chemin le plus court, de l'ouverture du site à la recherche et à la lecture, à la connexion et à l'usage de la bibliothèque locale, au téléchargement et à la musique locale, et à l'usage mobile."
---

**Date de révision : 2 novembre 2026｜Version : 1.8**

La présente page indique le chemin le plus court pour utiliser l'instance hébergée de Sonic (`sonic.epocanvas.tech`) : de l'ouverture du site à la recherche et à la lecture, à la connexion et à l'usage de la bibliothèque locale, au téléchargement et à la musique locale, et à l'usage mobile. Le tour d'horizon complet de l'interface figure dans le [Guide de l'interface et des fonctions](/fr/interface/) ; la présente page ne traite pas de l'auto-hébergement (pour le déploiement, voir le [Guide de déploiement](/fr/deployment/)). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

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
2. les favoris et playlists sont principalement stockés dans le navigateur ; une partie des signaux et du contexte peut être envoyée. Aucune synchronisation cloud générale entre appareils n'est vérifiée, et la route distante du radar manque dans la version contrôlée ;
3. la personnalisation et Auto DJ sont activés par défaut dans le code, y compris sans preuve de consentement affirmatif ; la connexion ne vaut pas consentement. Ils peuvent être désactivés dans « Paramètres → Confidentialité et données locales », mais ce choix n'arrête pas à lui seul les statistiques distinctes de recherche.

La session dure par défaut 30 jours ; la déconnexion efface le cookie courant, mais la révocation distante dépend de la configuration et du succès de la requête. Le stockage `auth` conserve certaines données de compte dans localStorage. Les règles figurent à la section 3 des [Conditions d'utilisation](/fr/terms-of-service/).

## 4. Téléchargement et musique locale

1. Téléchargement : cliquez sur télécharger dans la colonne d'actions du titre ou dans la barre de lecture inférieure ; le morceau, avec ses métadonnées de qualité audio, est stocké dans l'IndexedDB du navigateur et géré depuis la page « Téléchargements » ; la lecture hors ligne reste disponible ;
2. Musique locale : importez les fichiers par sélection ou glisser-déposer ; le corps audio est stocké dans IndexedDB et aucun chemin de téléversement du corps n'a été constaté, mais la recherche de paroles, les retours sur les favoris et les recommandations peuvent envoyer titre, artiste, album ou identifiant, et les pochettes intégrées peuvent être transmises avec des événements ;
3. n'utilisez que des contenus et usages autorisés : l'importation, le téléchargement ou le but personnel de test ne crée pas de licence ni d'exception automatique au droit d'auteur (voir la [Politique d'utilisation acceptable](/fr/acceptable-use/)).

## 5. Usage mobile

L'accès à la même adresse depuis le navigateur d'un téléphone affiche la mise en page mobile : navigation par onglets en bas (Accueil, Recherche, Lectures récentes, Paramètres) et mini-barre de lecture ; le tiroir du lecteur offre les mêmes paroles mot à mot et le même menu de qualité audio. Les favoris, playlists, préférences et téléchargements sont stockés séparément dans le navigateur de chaque appareil et ne sont pas synchronisés entre appareils.

## 6. Premiers réglages de confidentialité

Dès la première utilisation, trois commandes méritent votre attention (dans « Paramètres → Confidentialité et données locales ») :

1. Recherche intelligente et recommandations personnalisées : contrôle les événements concernés, sans arrêter les recherches brutes susceptibles d'alimenter les suggestions publiques ; ne saisissez pas d'informations sensibles. La navigation privée ne bloque pas les envois ;
2. Radio en continu automatique (Auto DJ) : commande l'enchaînement à la fin de la liste ; son activation par défaut ne prouve pas un consentement au profilage ;
3. Réinitialisation du profil / Effacement local : la suppression distante est partielle, avec possibles anciens identifiants anonymes, radar, agrégats, services externes et sauvegardes omis, et échecs masqués. Le nettoyage local ne supprime pas le cookie HttpOnly et ne déconnecte pas ; après rechargement, vérifiez que la personnalisation n'est pas réactivée par défaut. Pour une demande complète, contactez `privacy@epocanvas.com`.

La formulation intégrale des engagements de confidentialité figure dans la [Politique de confidentialité](/fr/privacy-policy/).

## 7. FAQ express

| Question | Réponse |
| --- | --- |
| Faut-il payer ? | projet personnel gratuit, non lucratif, sans publicité, achats intégrés ni SLA |
| Peut-on l'utiliser sans se connecter ? | fonctions de base sans connexion ; cela ne garantit pas l'anonymat |
| Où sont stockées les données ? | navigateur et traitements distants ; les 90 jours de certains événements ne sont pas une durée générale vérifiée  |
| Comment supprimer le profil ? | Paramètres → Réinitialiser le profil ; couverture partielle et échecs possibles, demandes complètes par courriel |
| Pourquoi 30 secondes ? | troncature officielle en extrait, signalée fidèlement, avec complétion inter-sources au mieux |
| La qualité audio est-elle surestimée ? | le badge reflète fidèlement le niveau du flux en cours |

D'autres questions sont traitées à la section 12 de la [Présentation du projet](/fr/project/) ; les termes juridiques figurent dans les [Définitions des termes](/fr/key-terms/).
