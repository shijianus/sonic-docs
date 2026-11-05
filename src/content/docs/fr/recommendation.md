---
title: Description de l'algorithme de recommandation
description: "Algorithme de recommandation de Sonic : signaux et pondérations, popularité, intention de session, reclassement MMR, Auto DJ et confidentialité."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Cette page décrit les signaux, pondérations, classements et commandes du moteur de recommandation. La personnalisation et Auto DJ sont activés par défaut dans le code candidat, sans preuve de consentement affirmatif ; ni la connexion ni les conditions ne valent consentement au profilage facultatif. Les identifiants hachés ou `anon_` sont pseudonymes, non nécessairement anonymes. Les bases et limites figurent aux sections 4.2 et 5 de la [Politique de confidentialité](/fr/privacy-policy/). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

## 1. Signaux comportementaux et pondérations

| Signal | Poids | Description |
| --- | --- | --- |
| favorite (ajout aux favoris) | +4,0 | très fortement positif |
| replay (relecture) | +3,5 | fortement positif |
| play_complete (lecture intégrale effective) | +2,5 | positif standard |
| play_progress (écoute progressive) | +0,2 à +1,8 | score échelonné selon la proportion écoutée |
| skip (saut rapide) | -0,8 | un saut après avoir écouté plus de la moitié compte +0,25 |
| dislike (refus explicite) | -5,0 | filtre les recommandations correspondantes uniquement dans le cadre de l’identité et des fonctionnalités disponibles ; ne promet pas un blocage permanent et général |

Filtrage du bruit et des faux signaux : les sauts dus à des blocages réseau (network_stall), à des échecs de décodage (playback_error), à des troncatures en extrait (trial_end), à des flux indisponibles (stream_unavailable), à des dépassements de délai de mise en mémoire tampon (buffer_timeout) ou à des échecs de commutation automatique (auto_switch_error), six catégories de sauts sans cause utilisateur, ont un poids constant de zéro et ne sont pas stockés.

## 2. Modèle de popularité

Le « Palmarès des tendances du site » combine cinq facteurs pondérés : lecture effective (35 %), auditeurs uniques (25 %), performance de lecture intégrale (20 %), conversion en favoris (15 %) et pente de croissance (5 %) ; s'y ajoutent une décroissance temporelle exponentielle (palmarès des 24 heures et palmarès cumulé sur 7 jours), un lissage bayésien et un score de Wilson, afin d'éviter qu'un épisode ponctuel peu écouté mais à forte lecture intégrale ne soit anormalement placé en tête.

## 3. Intention de session et préférences de long terme

L'intention de recherche au niveau de la session participe à l'ordonnancement immédiat, mais cela ne signifie pas que les recherches ne sont jamais conservées : les requêtes sont comptabilisées séparément et peuvent apparaître dans les suggestions publiques, même après désactivation de la personnalisation. Les demandes de recommandation peuvent aussi transmettre favoris locaux, artistes récents et contexte de recherche ; les identifiants pseudonymes restent des données potentiellement associables.

## 4. Reclassement de diversité et Auto DJ

1. Similarité : fusion du graphe de relations entre artistes, de la similarité d'ensembles des étiquettes de genre et de langue, et du cosinus des caractéristiques audio ;
2. Reclassement MMR : la pertinence marginale équilibre précision et diversité, afin d'éviter de tomber dans une bulle informationnelle centrée sur un seul artiste ou un seul style ;
3. Auto DJ : une fois la liste de lecture parvenue à son terme naturel, enchaînement automatique de morceaux lisibles selon le style du morceau en cours ; désactivable dans les paramètres. Son interrupteur est indépendant de la personnalisation : lorsque cette dernière est désactivée, des graines et morceaux exclus peuvent encore être envoyés.

## 5. Radar musical et de styles

Après une recherche, le radar affiche des résultats selon l'intention de recherche et les préférences. Il comporte des données locales, des profils, des retours sur les entités et une logique de synchronisation ; affirmer qu'il ne modifie aucune donnée est inexact. Après désactivation de la personnalisation, il peut encore envoyer une charge utile comprenant des morceaux, pochettes et signaux ; le serveur peut refuser de la conserver en raison du marqueur de désactivation. Les requêtes peuvent inclure favoris et contexte de recherche, y compris des métadonnées de musique locale.

## 6. Vos contrôles

| Contrôle | Emplacement | Effet |
| --- | --- | --- |
| Interrupteur général de personnalisation | Paramètres → Confidentialité et données locales | commande les événements concernés, pas les recherches brutes collectées séparément et susceptibles d'apparaître dans les suggestions publiques ; la navigation privée ne bloque pas les envois |
| Interrupteur Auto DJ | Paramètres → Confidentialité et données locales | commande l'enchaînement ; le défaut activé n'est pas une preuve de consentement au profilage |
| Réinitialisation du profil de recommandation | Paramètres → Confidentialité et données locales | effacement partiel de l'identité courante ; anciens identifiants anonymes, radar, agrégats, services externes et sauvegardes peuvent être omis, et des échecs masqués |
| Morceaux refusés | refus (dislike) dans le lecteur | filtre uniquement les recommandations correspondantes dans le cadre de l’identité et des fonctionnalités disponibles ; ne promet pas un blocage permanent et général |

Les comportements techniques doivent être confrontés au code et au déploiement ; une divergence exige une correction, sans que le code autorise un traitement illicite ou écarte les droits des utilisateurs. Les 90 jours par défaut de certains événements ne couvrent pas tout le profil. Pour une suppression complète, contactez `privacy@epocanvas.com` ; la méthode de vérification figure dans le [Guide de développement](/fr/development/).
