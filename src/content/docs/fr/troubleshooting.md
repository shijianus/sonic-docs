---
title: Dépannage
description: "Dépannage de Sonic : problèmes et solutions courants concernant la lecture, les sources audio, la connexion, le mode dégradé, le stockage et la limitation de débit."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Les descriptions fonctionnelles reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne. Le RC n'est pas une GitHub Release officielle.

La présente page récapitule l'identification et le traitement des problèmes courants. Si le problème n'est pas résolu ici, écrivez à `admin@epocanvas.com` ou ouvrez une Issue sur le dépôt GitHub ; lors d'un signalement, n'utilisez que des termes de reproduction non sensibles. Un texte de recherche public peut contenir des informations personnelles ou sensibles.

![Dépannage Sonic en quatre étapes : identifier le symptôme, vérifier l'état, essayer le chemin de secours et signaler](/images/sonic/troubleshooting-flow.svg)

*Figure : identifiez le symptôme, vérifiez l'état, essayez le chemin de secours et signalez ; ce chemin peut aussi échouer.*

## 1. Problèmes de lecture

| Phénomène | Cause | Traitement |
| --- | --- | --- |
| Le morceau est marqué « extrait » et s'interrompt après 30 secondes | troncature officielle en extrait, non un dysfonctionnement | si l'interface propose la complétion inter-sources, essayer d'associer une autre version complète ; ou lire une version d'une autre source, sans garantie de réussite |
| Le badge de qualité audio affiche un niveau inférieur | reflet fidèle du niveau réellement délivré par l'amont | essayer d'autres niveaux dans le menu de qualité ; le niveau amont varie selon la disponibilité |
| La lecture interrompue ne peut pas reprendre | le lien direct amont a peut-être expiré | cliquer à nouveau sur le morceau pour tenter une nouvelle résolution ; le rétablissement n'est pas garanti |

## 2. Mode dégradé

L'avis « mode dégradé de l'edge » indique que le plan de données peut être indisponible ou avoir dépassé le délai, et qu'un chemin de secours est utilisé. Ce chemin peut également échouer ; la recherche, les paroles et la lecture peuvent être limitées ou indisponibles. L'intervalle de 30 secondes après le refroidissement du disjoncteur correspond seulement à une nouvelle sonde et ne garantit pas le rétablissement. Un contenu déjà mis en mémoire tampon peut continuer, sans garantie de continuité. L'avis ne permet pas d'affirmer un rétablissement automatique ni qu'il est inutile d'actualiser.

## 3. Problèmes de recherche

1. Recherche sans résultats : le plus souvent, indisponibilité momentanée d'une interface amont ; réessayez après un instant ; en mode dégradé, la recherche de secours peut encore échouer ou être indisponible, avec une couverture pouvant être légèrement plus étroite ;
2. Résultats dupliqués ou manquants : des métadonnées amont anormales peuvent empêcher une fusion ; ouvrez une Issue uniquement avec des termes de reproduction non sensibles. Le texte de recherche public peut contenir des informations personnelles ou sensibles : ne le copiez pas tel quel.

## 4. Problèmes de connexion

1. Retour immédiat à l'état déconnecté après connexion : vérifiez que le site peut définir et conserver son propre cookie de session, qu'une extension ne le supprime pas, ainsi que la cohérence de HTTPS, de l'URL de rappel et de la configuration OAuth ; effacez ou désactivez uniquement le réglage de l'extension en cause, sans désactiver toutes les protections du navigateur ;
2. Compte Epomail gelé : la connexion s'interrompt du même coup ; réglez d'abord l'état du compte du côté d'Epomail ;
3. Lecture possible par d'autres personnes sur un appareil partagé : dans le RC vérifié, le cookie de session du site a une validité par défaut de 30 jours ; cela ne confirme ni le réglage de l'instance en ligne ni la durée de conservation ou d'expiration des identifiants copiés et des autres copies. Déconnectez-vous après usage sur un appareil partagé (voir la section 5 du [Guide du compte et de la sécurité](/fr/account-security/)).

## 5. Problèmes de stockage

1. Favoris ou téléchargements perdus : le nettoyage du navigateur ou la fin d'une session privée peut supprimer les copies locales, sans garantir une restauration cloud générale. La navigation privée ne bloque pas les envois ; le nettoyage local ou la réussite apparente d'une réinitialisation ne prouvent pas un effacement distant complet (voir [Exportation et stockage des données](/fr/data-management/)) ;
2. Échec des téléchargements : le quota de stockage du navigateur est plein ; supprimez d'anciens téléchargements ou libérez le stockage du navigateur, puis réessayez ;
3. Échec de l'importation de musique locale : le format du fichier dépasse les capacités de décodage du navigateur, ou le fichier est trop volumineux pour le quota.

## 6. Limitation de débit et codes d'erreur

| Phénomène | Signification | Traitement |
| --- | --- | --- |
| 429 (anonyme) | dépassement de la limite anonyme RC par défaut de 240 requêtes par minute ; l'instance en ligne peut différer | suivre l'interface et réessayer plus tard, ou vérifier la configuration de l'instance |
| 429 (authentifié) | dépassement persistant de la limite RC par défaut de 600 requêtes par minute ; l'instance en ligne peut différer | vérifier que le client n'effectue pas de requêtes en boucle |
| 501 (opérations de révocation) | révocation distante prise en charge non configurée | la déconnexion peut ne supprimer que le cookie du navigateur ; demander à l'opérateur de vérifier la configuration de révocation et le rejet des identifiants copiés |
| Déconnexions répétées | clé révoquée ou borne temporelle minimale globale d'émission ajustée | se reconnecter pour obtenir une nouvelle clé ; la cause réelle doit être confirmée par les journaux et la configuration de l'instance |

## 7. Problème non résolu

Lors de l'ouverture d'une Issue publique, joignez l'heure de survenue, la page et les actions effectuées, le navigateur et sa version, ainsi qu'une capture d'écran désensibilisée de l'avis si elle est utile ; n'utilisez que des termes de reproduction non sensibles. Le texte de recherche public peut contenir des informations personnelles ou sensibles. Avant publication, retirez ou masquez les adresses électroniques, les données personnelles ou de profil, les termes de recherche sensibles, les cookies de session, les clés d'API et ces mêmes informations dans les captures. Les demandes de suppression complète ou de copie de données doivent être envoyées à `privacy@epocanvas.com`, et non dans une Issue publique ; un message de réussite de réinitialisation ne prouve pas que chaque enregistrement a été supprimé.
