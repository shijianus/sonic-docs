---
title: Guide de l'interface et des fonctions
description: "Guide de l'interface et des fonctions du lecteur Sonic : accueil et recommandations, recherche, commandes de lecture, tiroir du lecteur, ma musique, paramètres et contrôles de confidentialité, mise en page mobile."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.4**

La présente page fait le tour de la disposition de l'interface du lecteur web Sonic et de l'emplacement de chaque fonction, en expliquant où se trouve chaque fonction et comment elle se comporte. Les captures d'écran proviennent de l'écran réel de l'instance hébergée (langue de l'interface en chinois simplifié ; le produit permet de changer la langue de l'interface). L'interface pouvant évoluer avec les versions, le périmètre réel de disponibilité des fonctions dépend de ce que l'instance a activé ; les stipulations juridiques figurent dans les [Conditions d'utilisation](/fr/terms-of-service/) et la [Politique de confidentialité](/fr/privacy-policy/).

![Accueil du lecteur Sonic : barre de navigation à gauche (trois zones : Découvrir, Ma musique, Système), zone principale avec carrousel de recommandations, recommandation intelligente et radar musical, playlists recommandées, mini-barre de lecture en bas](/images/sonic/ui/ui-home.png)

*Figure : page d'accueil sur ordinateur. La barre latérale gauche se divise en deux zones : « Découvrir » (Accueil, MV, Classements, Artistes, Nouveaux albums, Recherche) et « Ma musique » (Titres favoris, Lectures récentes, Téléchargements, Musique locale) ; la zone principale comprend, de haut en bas, l'emplacement carrousel de recommandations, la recommandation intelligente et le radar musical, puis les playlists recommandées ; la mini-barre de lecture est présente en permanence en bas.*

## 1. Accueil et recommandation intelligente

L'accueil agrège trois zones de contenu :

1. Emplacement carrousel de recommandations : présente les nouveaux titres et les nouveaux albums ; les cartes portent des marqueurs de source tels que « sonic 新歌 » (nouveautés Sonic) ; un clic lance directement la lecture ou ouvre la fiche détaillée ;
2. Recommandation intelligente et radar musical : propose trois vues « Suggestions pour vous », « Palmarès des tendances du site » et « Radar d'exploration de styles », avec les actions « Afficher d'autres suggestions » et « Lire la liste de recommandations ». Les cartes de recommandation indiquent le motif de la recommandation (comme le badge « Recommandation personnalisée » et les mentions « Artiste fréquemment écouté », « Proche des styles que vous préférez ») ; l'accueil mobile affiche en outre les étiquettes des signaux de préférence de la session en cours (artistes, genres, par exemple) ; les catégories de signaux sur lesquels repose la recommandation figurent à la section 4.2 de la [Politique de confidentialité](/fr/privacy-policy/) ;
3. Playlists recommandées et titres populaires : générées d'après les tendances d'écoute réelles de tout le site ; le nombre d'écoutes est indiqué sur les cartes.

L'ordonnancement des recommandations n'affecte que la séquence de lecture que vous voyez ; vous pouvez désactiver la personnalisation dans les paramètres (voir la section 7), et la recommandation passe alors en mode purement public.

## 2. Recherche

![Page de résultats de recherche Sonic : recherche de « 周杰伦 » (Jay Chou) donnant 52 résultats, trois onglets de catégories (titres, playlists, MV), bouton Tout lire, liste de résultats avec pochette, artiste, album, durée et colonne d'actions](/images/sonic/ui/ui-search.png)

*Figure : page de résultats de recherche. En haut, les onglets de catégories (Titres/Playlists/MV) et « Tout lire » ; la liste présente pochette, titre, artiste, album, durée et actions (lire, MV, favori, télécharger). Le champ de recherche gère l'unification simplifié-traditionnel, les abréviations pinyin et la tolérance aux fautes de frappe.*

L'entrée de recherche se trouve en haut de la barre latérale gauche et sur la page de recherche, pour les mots-clés de titres, d'artistes, d'albums et de playlists. Les résultats multi-sources sont fusionnés avec déduplication par expression régulière puis ordonnés par pertinence ; les morceaux correspondant à un extrait sont signalés fidèlement au titre des règles de [qualité audio et indicateurs d'extrait](/fr/project/#4-sources-audio-et-chaîne-des-paroles), et un extrait n'est jamais présenté comme un morceau complet.

## 3. Classements et palmarès officiels

![Page des classements Sonic : deux onglets Nouveautés et Palmarès officiels, cinq sous-classements (tous, chinois, occidental, japonais, coréen), liste de classement avec rang, pochette, titre, artiste, album et durée](/images/sonic/ui/ui-charts.png)

*Figure : page des classements. À gauche, le sélecteur de palmarès (Nouveautés/Palmarès officiels, et leurs catégories Tous/Chinois/Occidental/Japonais/Coréen) ; à droite, la liste du classement et « Tout lire ». Les données des classements proviennent des palmarès officiels amont et des tendances d'écoute réelles du site.*

Le « Palmarès des tendances du site » de l'accueil et la page des classements partagent le même modèle de popularité : pondération des cinq facteurs de lecture effective, d'auditeurs uniques, de performance de lecture intégrale, de conversion en favoris et de pente de croissance, complétée par une décroissance temporelle exponentielle et un lissage bayésien (description du modèle à la section 5 de la [Présentation du projet](/fr/project/)).

## 4. Bibliothèque d'artistes et d'albums

![Bibliothèque d'artistes Sonic : double filtrage par type (tous, artistes masculins, artistes féminins, groupes) et par région (chinois, occidental, japonais, coréen, autres), recherche par initiale A-Z et par popularité, cartes d'artistes affichant le nombre d'albums](/images/sonic/ui/ui-artists.png)

*Figure : bibliothèque d'artistes. Filtrage des artistes selon trois dimensions : type, région et initiale ; les cartes affichent l'avatar, le nom de l'artiste et le nombre d'albums. La page d'un artiste permet de parcourir ses titres populaires et ses albums, et la page d'un album énumère ses pistes.*

Les pages de détail des artistes, des albums et des titres partagent un proxy de pochettes unifié et une analyse de température de couleur (la couleur dominante de la pochette se fond dans le dégradé de la page) ; toutes les données de listes proviennent des interfaces ouvertes officielles amont, après mise en cache et déduplication.

## 5. Commandes de lecture (barre de lecture inférieure)

![Barre de lecture inférieure Sonic : pendant la lecture de « 晴天 » (Sunny Day), affichage de la ligne d'aperçu des paroles, titre précédent, lecture, titre suivant, mode de lecture, menu de qualité (SQ sans perte), téléchargement et contrôle du volume](/images/sonic/ui/ui-player.png)

*Figure : barre de lecture inférieure en état de lecture. À gauche, la pochette et les informations du morceau en cours, avec la ligne d'aperçu des paroles ; au centre, les commandes de lecture et la commutation du mode de lecture ; à droite, le menu de qualité (badge actuel « SQ sans perte »), le téléchargement, le curseur de volume et l'entrée de la liste de lecture. Un clic sur la zone de la pochette déploie le tiroir du lecteur plein écran.*

La barre de lecture inférieure est présente sur toutes les pages et offre :

1. Menu de qualité audio : énumère les niveaux réellement disponibles de la source actuelle (SQ sans perte, HQ haute qualité, standard, par exemple) ; le badge reflète fidèlement la qualité du flux en cours, sans fausse étiquette ;
2. Ligne d'aperçu des paroles : affiche la phrase en cours des paroles mot à mot ;
3. Mode de lecture : commutation entre lecture de la liste en boucle, lecture du morceau unique en boucle, lecture aléatoire, etc. ;
4. Téléchargement : enregistre le morceau en cours dans le navigateur (IndexedDB), voir la section 5.

## 6. Tiroir du lecteur et paroles mot à mot

![Tiroir du lecteur plein écran Sonic : à gauche, animation de pochette disque vinyle et informations du morceau ; à droite, panneau de paroles défilant ; arrière-plan en dégradé selon la teinte de la pochette ; en haut à droite, commutation du mode d'arrière-plan et de visualisation](/images/sonic/ui/ui-player-drawer.png)

*Figure : tiroir du lecteur plein écran. À gauche, la présentation de la pochette (animation de disque vinyle) et les commandes de lecture ; à droite, le panneau défilant des paroles mot à mot ; l'arrière-plan se fond en temps réel dans la couleur dominante de la pochette. Le tiroir se déploie après un clic sur la pochette de la barre de lecture inférieure.*

Le tiroir du lecteur offre :

1. Paroles mot à mot : présentation privilégiée de la timeline au niveau du mot des formats YRC/QRC/KRC, complétée par AMLL TTML et LRCLIB ; le panneau des paroles comporte trois commutateurs indépendants « texte original », « traduction » et « romanisation » (également réglables dans les paramètres) ; un clic sur une ligne de paroles déplace la position de lecture ;
2. Mode de pochette : animations de pochette telles que disque vinyle et spectre circulaire ;
3. Visualisation audio : modes de visualisation spectrale tels que barres, onde et cercle, appliqués à l'arrière-plan du tiroir ou au lecteur inférieur (configuration dans les paramètres) ;
4. Déplacement de la position : la barre de progression se déplace au doigt et les paroles défilent en synchronisation avec la position de lecture.

## 7. Ma musique

La zone « Ma musique » comprend quatre entrées :

| Page | Contenu | Emplacement de stockage |
| --- | --- | --- |
| Titres favoris | titres aimés et playlists, albums, artistes, MV mis en favori | localStorage du navigateur (`library`) |
| Lectures récentes | historique de lecture | localStorage du navigateur (`audio`) |
| Téléchargements | morceaux hors ligne téléchargés (avec métadonnées de qualité audio) | IndexedDB du navigateur (`downloaded_music`) |
| Musique locale | fichiers audio locaux importés manuellement (glisser-déposer vers le navigateur pris en charge) | IndexedDB du navigateur (`local_music`) |

Ces contenus ne sont stockés que dans votre navigateur, sans téléversement vers le serveur ; l'effacement des données du navigateur ou l'usage d'« Effacer toutes les données locales » les supprime. Les fichiers téléchargés ou importés localement ne servent qu'à votre écoute personnelle et ne doivent pas être redistribués (voir la [Politique d'utilisation acceptable](/fr/acceptable-use/)).

## 8. Paramètres

![Page des paramètres Sonic : cartes de configuration du mode de thème (suivre le système), de la langue de l'interface (chinois), du type d'arrière-plan, de la qualité audio, des paroles du lecteur inférieur, de la visualisation audio, etc.](/images/sonic/ui/ui-settings.png)

*Figure : la page des paramètres organise toutes les préférences en cartes. Chaque carte correspond à une catégorie de réglages : mode de thème (clair/sombre/suivre le système), langue de l'interface (中文/English/日本語), type d'arrière-plan, préférence de qualité audio, affichage des paroles du lecteur inférieur, mode de visualisation audio, etc.*

Les réglages prennent effet immédiatement et sont enregistrés dans le stockage local du navigateur (clés `settings`, `global`, etc.), sans liaison au compte ni téléversement vers le serveur.

## 9. Confidentialité et contrôle des données

![Bloc « Confidentialité et données locales » de la page des paramètres Sonic : explication du stockage local du navigateur et de l'IndexedDB, interrupteur de recherche intelligente et recommandations personnalisées, interrupteur de radio en continu automatique (Auto DJ), bouton de réinitialisation du profil de recommandation et de l'historique de refus](/images/sonic/ui/ui-privacy.png)

*Figure : bloc « Confidentialité et données locales » de la page des paramètres. Le bloc indique « Les données ci-dessous ne sont conservées que dans votre navigateur, sans téléversement vers le serveur » ; la description de l'interrupteur « Recherche intelligente et recommandations personnalisées » précise qu'une fois désactivé, le mode purement public s'installe immédiatement et plus aucun événement comportemental n'est enregistré ; le bouton « Réinitialiser le profil de recommandation et l'historique de refus » efface immédiatement les données comportementales du serveur.*

Ce bloc est la mise en œuvre, dans l'interface, des droits d'initiative décrits à la section 9 de la [Politique de confidentialité](/fr/privacy-policy/) :

1. Interrupteur « Recherche intelligente et recommandations personnalisées » : une fois désactivé, les événements ne sont plus collectés et la recommandation passe en mode purement public ;
2. Interrupteur « Radio en continu automatique (Auto DJ) » : commande l'enchaînement automatique une fois la liste de lecture terminée ;
3. Réinitialisation du profil de recommandation et de l'historique de refus : détruit immédiatement tous les événements comportementaux du serveur liés à vous (`DELETE /api/sonic/events`) ;
4. Effacement de toutes les données locales : après une boîte de dialogue de confirmation, efface l'intégralité du stockage local et de l'IndexedDB du navigateur, et réinitialise en même temps le profil côté serveur.

## 10. Version mobile

![Accueil mobile Sonic : carrousel, recommandation intelligente et radar musical, étiquettes de signaux de préférence (周杰伦, mandopop, r&b), cartes de recommandation personnalisée et leurs motifs, mini-barre de lecture et navigation par onglets en bas (accueil, recherche, lectures récentes, paramètres)](/images/sonic/ui/ui-mobile-home.png)

*Figure : mise en page mobile. Les cartes indiquent les motifs de recommandation personnalisée et les mentions « Artiste fréquemment écouté », « Proche des styles que vous préférez » ; les signaux de préférence sont présentés sous forme d'étiquettes ; en bas, la navigation par onglets et la mini-barre de lecture. Le tiroir du lecteur mobile (PlayerDrawerMobile) offre les mêmes paroles mot à mot et le même menu de qualité audio.*

La version mobile partage avec la version ordinateur le même système de comptes et les mêmes règles de stockage des données ; la présentation des motifs de recommandation obéit aux mêmes principes de transparence que sur ordinateur.

## 11. Documents associés

| Document | Contenu |
| --- | --- |
| [Présentation du projet](/fr/project/) | positionnement du produit, architecture, moteur de recommandation et conception de la sécurité |
| [Politique de confidentialité](/fr/privacy-policy/) | périmètre des événements comportementaux, bases juridiques et exercice des droits |
| [Conditions d'utilisation](/fr/terms-of-service/) | conditions contractuelles d'utilisation du service |
| [Traitement des données et mesures de sécurité](/fr/data-security/) | cycle de vie des données et mesures techniques |
