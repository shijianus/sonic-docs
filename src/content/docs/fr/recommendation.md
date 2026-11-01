---
title: Description de l'algorithme de recommandation
description: "Description de l'algorithme de recommandation de Sonic : signaux comportementaux et pondérations, modèle de popularité, intention de session, reclassement MMR, Auto DJ et contrôles de confidentialité correspondants."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page explique intégralement la composition du moteur de recommandation de Sonic : quels signaux entrent dans le modèle, comment ils sont pondérés, comment l'ordonnancement s'opère et quels contrôles vous détenez. L'ensemble des règles est public dans le code source ; la base juridique et les limites de la collecte des données figurent aux sections 4.2 et 5 de la [Politique de confidentialité](/fr/privacy-policy/).

## 1. Signaux comportementaux et pondérations

| Signal | Poids | Description |
| --- | --- | --- |
| favorite (ajout aux favoris) | +4,0 | très fortement positif |
| replay (relecture) | +3,5 | fortement positif |
| play_complete (lecture intégrale effective) | +2,5 | positif standard |
| play_progress (écoute progressive) | +0,2 à +1,8 | score échelonné selon la proportion écoutée |
| skip (saut rapide) | -0,8 | un saut après avoir écouté plus de la moitié compte +0,25 |
| dislike (refus explicite) | -5,0 | filtrage dur et inscription sur liste noire |

Filtrage du bruit et des faux signaux : les sauts dus à des blocages réseau (network_stall), à des échecs de décodage (playback_error), à des troncatures en extrait (trial_end), à des flux indisponibles (stream_unavailable), à des dépassements de délai de mise en mémoire tampon (buffer_timeout) ou à des échecs de commutation automatique (auto_switch_error), six catégories de sauts sans cause utilisateur, ont un poids constant de zéro et ne sont pas stockés.

## 2. Modèle de popularité

Le « Palmarès des tendances du site » combine cinq facteurs pondérés : lecture effective (35 %), auditeurs uniques (25 %), performance de lecture intégrale (20 %), conversion en favoris (15 %) et pente de croissance (5 %) ; s'y ajoutent une décroissance temporelle exponentielle (palmarès des 24 heures et palmarès cumulé sur 7 jours), un lissage bayésien et un score de Wilson, afin d'éviter qu'un épisode ponctuel peu écouté mais à forte lecture intégrale ne soit anormalement placé en tête.

## 3. Intention de session et préférences de long terme

L'intention de recherche au niveau de la session (recherches de mots-clés consécutives, clics sur des artistes et des genres) participe à l'ordonnancement immédiat avec une forte pondération de court terme, découplée par niveaux des préférences de long terme : seuls les comportements à forte valeur tels que la lecture intégrale et les favoris alimentent le profil de long terme, et une recherche ponctuelle ne modifie pas immédiatement votre profil durable.

## 4. Reclassement de diversité et Auto DJ

1. Similarité : fusion du graphe de relations entre artistes, de la similarité d'ensembles des étiquettes de genre et de langue, et du cosinus des caractéristiques audio ;
2. Reclassement MMR : la pertinence marginale équilibre précision et diversité, afin d'éviter de tomber dans une bulle informationnelle centrée sur un seul artiste ou un seul style ;
3. Auto DJ : une fois la liste de lecture parvenue à son terme naturel, enchaînement automatique de morceaux lisibles selon le style du morceau en cours ; désactivable dans les paramètres.

## 5. Radar musical et de styles

Après une recherche, le radar de l'accueil présente immédiatement les résultats correspondant à votre intention de recherche et à vos signaux de préférence, dans un style aligné sur celui des titres populaires ; le radar n'affecte que la séquence de recommandation que vous voyez et ne modifie aucune donnée stockée.

## 6. Vos contrôles

| Contrôle | Emplacement | Effet |
| --- | --- | --- |
| Interrupteur général de personnalisation | Paramètres → Confidentialité et données locales | une fois désactivé, les événements ne sont plus collectés et la recommandation passe en mode purement public |
| Interrupteur Auto DJ | Paramètres → Confidentialité et données locales | commande l'enchaînement automatique une fois la liste de lecture terminée |
| Réinitialisation du profil de recommandation | Paramètres → Confidentialité et données locales | détruit immédiatement tous les événements comportementaux du serveur |
| Morceaux refusés | refus (dislike) dans le lecteur | filtrage dur ; les morceaux refusés ne réapparaissent plus dans la recommandation |

Les faits techniques de l'algorithme évoluent avec le code source ; en cas de divergence entre le présent document et le code source, celui-ci prévaut et la documentation est corrigée (procédure de vérification à la section 4 du [Guide de développement](/fr/development/)).
