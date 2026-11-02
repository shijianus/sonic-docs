---
title: Exportation et stockage des données
description: "Exportation et stockage des données de Sonic : emplacements des données, consultation de l'aperçu du profil, opérations d'effacement et conseils de sauvegarde."
---

**Date de révision : 2 novembre 2026｜Version : 1.8**

La présente page récapitule les données présentes dans Sonic, leur emplacement, le résumé disponible et les possibilités de sauvegarde, d'effacement ou de demande manuelle. Elle ne constitue pas un outil d'exportation complète. La base juridique et le cadre des droits figurent aux sections 4, 6 et 9 de la [Politique de confidentialité](/fr/privacy-policy/) ; les mesures techniques dans [Traitement des données et mesures de sécurité](/fr/data-security/). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

## 1. Aperçu des emplacements des données

| Données | Emplacement | Lien avec l'identité | Durée de conservation |
| --- | --- | --- | --- |
| Favoris, playlists et préférences | Principalement localStorage ; le radar a aussi une route distante | Certains retours et contextes de recommandation peuvent être envoyés | Copie locale jusqu'à l'effacement ; traitement distant distinct |
| Historique de lecture | localStorage et événements de lecture transmis séparément | Les événements peuvent utiliser un identifiant pseudonyme associable | Le nettoyage local ne supprime pas les événements distants |
| Téléchargements et musique locale | IndexedDB du navigateur | Aucun téléversement du corps audio constaté ; titre, artiste, album, identifiant et pochette intégrée peuvent être transmis | Localement jusqu'à l'effacement ou à l'éviction du navigateur ; traitement distant distinct |
| Événements comportementaux et retours sur les entités | Si le traitement est activé, base de données du serveur ou service externe | Identifiant pseudonyme, non anonyme | RC : 90 jours par défaut, minimum 7 ; nettoyage incomplet et non effectué à l'échéance de chaque ligne, sans garantie d'effacement automatique complet |
| Agrégats de recherche et profils radar | Stockage distant des recherches ; stockage persistant du radar dans le moteur non confirmé | Les recherches brutes peuvent identifier une personne et être affichées publiquement | Aucune durée automatique uniforme vérifiée ; réinitialisation incomplète |
| Catalogue partagé de morceaux et index externes | Bibliothèque de morceaux du serveur et services facultatifs de recommandation ou recherche | Les événements peuvent inclure titre, artiste et pochette intégrée ; éléments accessibles à la recherche du site | Pas d'effacement complet lors de la réinitialisation du profil ; apprécier selon la possibilité d'association |
| Historique de recherche local | localStorage ; les requêtes sont aussi transmises pour la recherche et peuvent entrer dans des statistiques ou le contexte | Le contexte peut être envoyé même si l'historique est local | L'effacement local ne supprime pas les copies distantes |

`auth` dans localStorage conserve notamment l'adresse électronique et l'avatar. La limitation peut utiliser l'IP brute dans KV ou un limiteur natif ; l'edge transmet aussi adresse du client, session et contexte au moteur. L'absence de colonne IP dans une table d'événements ne prouve pas l'absence de traitement d'IP ailleurs.

## 2. Consultation : aperçu du profil de recommandation

La dernière RC publique propose `GET /api/sonic/events` (ou le bloc de profil des paramètres) pour consulter un résumé du profil côté serveur, seulement si la fonction concernée est activée et si l'instance expose cette page ou cette API. L'ancien `main@ce443c8` sert uniquement de comparaison et ne prouve pas le déploiement de la RC ; la disponibilité en ligne n'est pas vérifiée. Même disponible, le résumé n'est ni un export complet de données personnelles ni une copie de tous les événements bruts ; aucune possibilité de téléchargement intégral des événements du serveur ne peut être promise.

## 3. Exportation et sauvegarde

1. **Données du navigateur** : favoris, playlists et téléchargements restent dans le navigateur utilisé. Sonic ne fournit ni exportation cloud intégrée au produit ni exportation générale du localStorage ou de l'IndexedDB ; les outils de sauvegarde propres au navigateur ou à l'appareil peuvent varier et ne sont pas garantis. Vous pouvez aussi noter ou recréer vos playlists importantes ;
2. **Données distantes** : elles comprennent aussi événements, retours sur les entités, recherches et synchronisation du radar ; le stockage persistant du radar dans le moteur n'est pas confirmé. Le résumé n'est pas une exportation complète et la réinitialisation n'est qu'un effacement partiel ; pour une demande concernant une instance hébergée par le projet, utilisez le canal de la section 9 de la [Politique de confidentialité](/fr/privacy-policy/), en incluant au besoin les anciennes identités ; les utilisateurs d'instances auto-hébergées doivent contacter leur propre opérateur ;
3. **Résumé du profil de recommandation** : le résumé peut être consultable uniquement si la fonction est activée et si l'instance fournit la page Paramètres ou l'API ; sa disponibilité en ligne n'est pas vérifiée. Il ne s'agit pas d'une exportation complète et il ne prouve pas que toutes les données personnelles ont été obtenues ;
4. **Musique locale** : les fichiers audio d'origine importés demeurent sur votre appareil ; le corps audio n'a pas de chemin de téléversement constaté, mais les métadonnées et pochettes intégrées peuvent être transmises séparément. La suppression de la copie dans le navigateur n'affecte pas les fichiers d'origine.

Le résumé du profil ne remplace pas une exportation complète. Les demandes d'accès, de rectification, de limitation, de portabilité ou autres demandes manuelles sont traitées par le canal indiqué dans la [Politique de confidentialité](/fr/privacy-policy/), sans créer de fonction d'exportation automatique.

## 4. Opérations d'effacement

| Opération | Périmètre | Prise d'effet |
| --- | --- | --- |
| Réinitialisation du profil de recommandation et de l'historique de refus | certains événements et retours de l'identité courante | `DELETE /api/sonic/events` ; anciens identifiants anonymes, radar, agrégats, services externes et sauvegardes peuvent être omis ; des échecs peuvent être masqués  |
| Effacement de toutes les données locales | nettoyage local et réinitialisation distante partielle ; ne supprime pas le cookie HttpOnly et ne déconnecte pas | un succès affiché ne prouve pas l'effacement distant ; recharger après nettoyage des paramètres peut réactiver la personnalisation par défaut, vérifiez votre choix  |
| Effacement des données du site par le navigateur | stockages de ce navigateur uniquement | selon le navigateur ; ne supprime pas les copies distantes |
| Déconnexion | cookie de session courant ; révocation distante distincte | l'invalidation des justificatifs copiés dépend de la configuration et du succès de la requête |

## 5. Instances auto-hébergées

Les utilisateurs d'une instance auto-hébergée doivent contacter l'opérateur de cette instance par le canal de demandes de droits qu'il a publié ; l'adresse proposée dans le présent document pour Sonic n'est pas le canal du responsable de toutes les instances. Pour les demandes de droits concernant une instance hébergée par le projet, voir la section 9 de la [Politique de confidentialité](/fr/privacy-policy/) ; le résumé existant et les commandes de nettoyage ne constituent pas un export complet.

L'opérateur doit inventorier tous les stockages et destinataires réels, pas seulement le volume SQLite. Le réglage de conservation ne couvre pas à lui seul le radar, les recherches, les journaux et les sauvegardes ; il faut fixer des durées nécessaires et une procédure d'effacement vérifiée, isoler les sauvegardes jusqu'à leur nettoyage prévu et réappliquer les suppressions après restauration. Voir le [Guide de déploiement](/fr/deployment/) et [Droit de l'open source et de l'auto-hébergement](/fr/open-source/).
