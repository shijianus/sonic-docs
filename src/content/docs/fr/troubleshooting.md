---
title: Dépannage
description: "Dépannage de Sonic : problèmes et solutions courants concernant la lecture, les sources audio, la connexion, le mode dégradé, le stockage et la limitation de débit."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page récapitule l'identification et le traitement des problèmes courants. Si le problème n'est pas résolu ici, écrivez à `admin@epocanvas.com` ou ouvrez une Issue sur le dépôt GitHub.

## 1. Problèmes de lecture

| Phénomène | Cause | Traitement |
| --- | --- | --- |
| Le morceau est marqué « extrait » et s'interrompt après 30 secondes | troncature officielle en extrait, non un dysfonctionnement | activer la complétion inter-sources pour l'appariement automatique d'un morceau complet gratuit ; ou lire une autre version depuis une autre source |
| Le badge de qualité audio affiche un niveau inférieur | reflet fidèle du niveau réellement délivré par l'amont | essayer d'autres niveaux dans le menu de qualité ; le niveau amont varie selon la disponibilité (availability) |
| La lecture interrompue ne peut pas reprendre | lien direct amont expiré | cliquer à nouveau sur le morceau pour relancer la résolution |

## 2. Mode dégradé

Lorsque l'avis ambré « mode dégradé de l'edge » apparaît en haut de l'interface : les nœuds du plan de données sont momentanément hors ligne ou en dépassement de délai, et la couche edge est passée automatiquement en connexion directe avec les interfaces publiques ; la recherche et les paroles restent utilisables, mais la résolution complète des sources audio et la mise à jour des recommandations peuvent être limitées. Le retour à la normale s'opère d'ordinaire en quelques dizaines de secondes (sonde de reprise après 30 secondes de refroidissement du disjoncteur) ; les morceaux déjà chargés ne sont pas affectés, sans besoin de rafraîchir la page.

## 3. Problèmes de recherche

1. Recherche sans résultats : le plus souvent, indisponibilité momentanée d'une interface amont ; réessayez après un instant ; en mode dégradé, la recherche passe par la connexion directe edge vers les interfaces publiques, avec une couverture pouvant être légèrement plus étroite ;
2. Résultats dupliqués ou manquants : la déduplication multi-sources fusionne d'après les identifiants canoniques ; des métadonnées amont anormales peuvent empêcher une fusion ; ouvrez une Issue en joignant les mots-clés.

## 4. Problèmes de connexion

1. Retour immédiat à l'état déconnecté après connexion : le plus souvent, blocage des cookies tiers par le navigateur ou effacement des cookies par une extension de sécurité ; ajoutez le site à la liste autorisée puis réessayez ;
2. Compte Epomail gelé : la connexion s'interrompt du même coup ; réglez d'abord l'état du compte du côté d'Epomail ;
3. Lecture possible par d'autres personnes sur un appareil partagé : le cookie de session se conserve 30 jours au plus ; déconnectez-vous après usage sur un appareil partagé (voir la section 5 du [Guide du compte et de la sécurité](/fr/account-security/)).

## 5. Problèmes de stockage

1. Favoris ou téléchargements perdus : l'option « Effacer les données du site » du navigateur ou le mode privé suppriment le stockage local (voir la section 1 d'[Exportation et stockage des données](/fr/data-management/)) ; consignez vous-même vos playlists importantes ;
2. Échec des téléchargements : le quota de stockage du navigateur est plein ; supprimez d'anciens téléchargements ou libérez le stockage du navigateur, puis réessayez ;
3. Échec de l'importation de musique locale : le format du fichier dépasse les capacités de décodage du navigateur, ou le fichier est trop volumineux pour le quota.

## 6. Limitation de débit et codes d'erreur

| Phénomène | Signification | Traitement |
| --- | --- | --- |
| 429 (anonyme) | dépassement de la limitation anonyme de 240 requêtes par minute | la connexion ouvre un quota supérieur (600 rpm) |
| 429 (authentifié) | dépassement persistant de 600 requêtes par minute | vérifier que le client n'effectue pas de requêtes en boucle |
| 501 (opérations de révocation) | révocation immédiate non configurée sur l'instance | configuration du mode KV ou de liste par le déployeur |
| Déconnexions répétées | clé révoquée ou borne temporelle minimale globale d'émission ajustée | se reconnecter pour obtenir une nouvelle clé |

## 7. Problème non résolu

Lors de l'ouverture d'une Issue, joignez : l'heure de survenue, la page et les actions effectuées, les avis de l'interface (capture d'écran de l'avis de dégradation, par exemple), le navigateur et sa version. N'y joignez ni cookie de session ni clé d'API.
