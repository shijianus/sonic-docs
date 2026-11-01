---
title: Exportation et stockage des données
description: "Exportation et stockage des données de Sonic : emplacements des données, consultation de l'aperçu du profil, opérations d'effacement et conseils de sauvegarde."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page récapitule les données présentes dans Sonic, leur emplacement, le résumé disponible et les possibilités de sauvegarde, d'effacement ou de demande manuelle. Elle ne constitue pas un outil d'exportation complète. La base juridique et le cadre des droits figurent aux sections 4, 6 et 9 de la [Politique de confidentialité](/fr/privacy-policy/) ; les mesures techniques dans [Traitement des données et mesures de sécurité](/fr/data-security/).

## 1. Aperçu des emplacements des données

| Données | Emplacement | Lien avec l'identité | Durée de conservation |
| --- | --- | --- | --- |
| Favoris, playlists, préférences | localStorage du navigateur | sans téléversement | jusqu'à l'effacement |
| Historique de lecture | localStorage du navigateur | sans téléversement | jusqu'à l'effacement |
| Téléchargements et musique locale | IndexedDB du navigateur | sans téléversement | jusqu'à l'effacement |
| Événements comportementaux | SQLite côté serveur (plan de données) | hash pseudonymisé | destruction automatique après 90 jours |
| Statistiques globales agrégées | SQLite côté serveur | aucun lien avec une personne | maintenance de la base |
| Historique de recherche (local) | localStorage du navigateur | sans téléversement | jusqu'à l'effacement |

Les données d'identification du compte (adresse électronique, par exemple) ne sont pas persistées sur disque et ne subsistent que pendant la session ; la base de données ne comporte aucune colonne d'IP.

## 2. Consultation : aperçu du profil de recommandation

Via `GET /api/sonic/events` (ou le bloc de profil de la page des paramètres), vous pouvez consulter le résumé disponible du profil actuel côté serveur : nombre total d'événements, compteurs de favoris et de refus, artistes fréquemment écoutés, tendance de genres, termes de recherche récents et forme de stockage. Ce résumé ne constitue ni une exportation complète ni une copie de l'ensemble des données personnelles ; il présente seulement les indicateurs exposés par cette fonction.

## 3. Exportation et sauvegarde

1. **Données du navigateur** : favoris, playlists et téléchargements restent dans le navigateur utilisé. Sonic ne fournit ni exportation cloud intégrée au produit ni exportation générale du localStorage ou de l'IndexedDB ; les outils de sauvegarde propres au navigateur ou à l'appareil peuvent varier et ne sont pas garantis. Vous pouvez aussi noter ou recréer vos playlists importantes ;
2. **Événements comportementaux** : le serveur ne conserve que des événements comportementaux pseudonymisés et ne propose aucun canal de téléchargement ou d'exportation de ces événements ; pour les supprimer, utilisez les opérations d'effacement de la section 4 ou écrivez à `privacy@epocanvas.com` pour une demande nécessitant une intervention humaine ;
3. **Musique locale** : les fichiers d'origine importés demeurent sur votre appareil ; la suppression de la copie présente dans le navigateur ne les affecte pas.

Le résumé du profil ne remplace pas une exportation complète. Les demandes d'accès, de rectification, de limitation, de portabilité ou autres demandes manuelles sont traitées par le canal indiqué dans la [Politique de confidentialité](/fr/privacy-policy/), sans créer de fonction d'exportation automatique.

## 4. Opérations d'effacement

| Opération | Périmètre | Prise d'effet |
| --- | --- | --- |
| Réinitialisation du profil de recommandation et de l'historique de refus | tous les événements comportementaux du serveur | immédiate (`DELETE /api/sonic/events`) |
| Effacement de toutes les données locales | localStorage, sessionStorage et IndexedDB du navigateur + profil côté serveur | immédiate après confirmation |
| Effacement des données du site par le navigateur | même périmètre (côté navigateur) | immédiate |
| Déconnexion | session et clés | immédiate |

## 5. Instances auto-hébergées

Les données d'une instance auto-hébergée résident dans le plan de données du déployeur (volume nommé SQLite) ; le déployeur peut configurer la durée de conservation en jours et le chemin d'écriture sur disque (voir la section 3 du [Guide de déploiement](/fr/deployment/)) ; ses obligations de sauvegarde et d'information figurent également à la section 4 de [Droit de l'open source et de l'auto-hébergement](/fr/open-source/).
