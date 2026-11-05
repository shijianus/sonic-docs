---
title: Politique d'utilisation acceptable
description: Règles de comportement sur les ressources hébergées Sonic, limites des abus du système, contenus et droits d'autrui, mesures et voies de réclamation.
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Cette politique s'applique aux instances de test hébergées effectivement exploitées par Sonic et à leurs API publiques, afin de protéger les ressources partagées, les utilisateurs et les services amont. Elle précise les règles de comportement des [Conditions d'utilisation](/fr/terms-of-service/) ; si vous ne l'acceptez pas, cessez d'utiliser l'instance hébergée. Elle ne transforme pas la gratuité, le caractère non lucratif ou l'ouverture du code en garantie inconditionnelle de sécurité et ne remplace ni la [Politique de confidentialité](/fr/privacy-policy/) ni [Traitement des données et mesures de sécurité](/fr/data-security/).

Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne. Le chinois simplifié est la référence de maintenance à la racine ; les neuf autres versions linguistiques sont des traductions. La priorité linguistique ne réduit ni le droit impératif ni le droit des consommateurs à des conditions claires et compréhensibles.

![Limites d'utilisation et mesures Sonic : usage normal, protection des ressources, limitation, suspension, résiliation et réexamen](/images/sonic/aup-ladder.svg)

*Figure : les mesures tiennent compte des actes, de leur impact, de leur répétition et des risques ; le schéma n'est ni un barème fixe de sanctions ni un engagement de délai.*

## 1. Champ d'application

1. Cette politique s'applique à votre utilisation du lecteur web Sonic hébergé, de l'API publique, de la connexion, de la recherche, de la lecture, des paroles, des recommandations et des autres points d'accès publics.
2. Les déploiements indépendants sont des instances distinctes. Le déployeur doit déterminer ses propres politiques, configuration, lois applicables et relations avec les utilisateurs ; cette page n'assume pas pour lui des obligations d'exploitation ou contractuelles.
3. Dans la RC `a75f5cb`, les fichiers `LICENSE` de la racine et du lecteur sont sous MIT, qui autorise la copie, la modification, la distribution et l'utilisation commerciale selon ses conditions. Dans l'ancien `main@ce443c8`, seule la licence MIT du lecteur est vérifiable et aucune `LICENSE` n'a été trouvée à la racine ; cela ne permet pas d'attribuer MIT à tout le code historique. Cette politique protège l'instance hébergée et ses ressources ; elle n'interdit pas globalement l'utilisation commerciale du code autorisée par sa licence.
4. La vérification actuelle de l'importation de musique locale n'a pas identifié de chemin téléversant le Blob audio vers le serveur ; les paroles et recommandations peuvent néanmoins transmettre titre, artiste, album, durée ou identifiant. Voir la [Politique de confidentialité](/fr/privacy-policy/).

## 2. Comportements interdits

### 2.1 Abus du système et des interfaces

1. Obtenir, utiliser ou partager sans autorisation les comptes, sessions, cookies, clés d'API ou clés de service d'autrui, falsifier des justificatifs ou contourner l'authentification, la limitation de débit, les signatures, les protections SSRF ou autres contrôles d'accès de l'instance hébergée.
2. Sonder ou exploiter sans autorisation les points d'accès non publics, adresses internes et éléments d'authentification de l'instance, ou obtenir ou divulguer les données privées d'autrui ; les suggestions publiques de recherche ne doivent pas servir à collecter, exposer ou vérifier des informations sur autrui.
3. Accaparer les ressources partagées par l'extraction massive de résultats de recherche, paroles, adresses de lecture ou réponses d'API à des fins non autorisées de revente, de miroir ou de constitution de jeux de données ; la lecture personnelle normale, l'usage modéré de l'API et les intégrations autorisées ne sont pas concernés par cette restriction.
4. Employer le proxy hébergé comme proxy réseau généraliste, scanner ou relais d'attaque, ou provoquer intentionnellement une concurrence, un trafic, des erreurs ou une pression sur le cache inutiles.

Cette politique n'interdit pas de lire le code, de tester sur sa propre instance locale avec des données synthétiques ou autorisées, ni de signaler des vulnérabilités de manière responsable. Les tests actifs de sécurité d'une instance publique exigent une autorisation appropriée préalable, sans affecter autrui, obtenir ses données ni aggraver une vulnérabilité. Une reproduction minimale peut être communiquée en privé à `admin@epocanvas.com` ; ne publiez pas de véritables justificatifs d'authentification.

### 2.2 Contenus et droits

1. Ne pas utiliser le service hébergé pour commettre ou faciliter le piratage, contourner des protections payantes ou du droit d'auteur, ni porter atteinte au droit d'auteur, aux marques, à l'image, aux droits de la personnalité, à la vie privée ou à d'autres droits.
2. Ne pas diffuser au moyen du service des contenus illicites, des logiciels malveillants, des contenus d'exploitation sexuelle d'enfants ou de la propagande terroriste illicite, ni divulguer illégalement ou sans autorisation les justificatifs ou données personnelles d'autrui. Cela n'interdit pas la connexion normale ni les demandes privées nécessaires à l'exercice des droits ; importer de la musique locale n'équivaut pas non plus à téléverser un fichier vers Sonic.
3. Ne pas usurper l'identité d'une personne ou d'une organisation, ni utiliser les noms ou logos `Sonic`, `Epomail` ou `EpoCanvas` pour suggérer un soutien, une coopération ou une certification de sécurité sans autorisation.
4. Ne pas soumettre sciemment des termes de recherche, commentaires ou éléments de signalement contenant des informations privées d'autrui. Les commentaires publics peuvent comporter des noms, avatars et textes d'autres personnes ; écrire un commentaire local dans localStorage ne constitue pas une autorisation de publication.

### 2.3 Droits d'autrui et stabilité du service

1. Ne pas harceler, menacer, diffamer, traquer, discriminer ou attaquer l'opérateur, les fournisseurs amont, les contributeurs ou les autres utilisateurs, ni exposer les données d'autrui au moyen des caches ou suggestions publics.
2. Ne pas perturber la disponibilité, l'intégrité ou la sécurité de l'instance hébergée, des services de contenu amont, du service d'identité ou du réseau, notamment en déclenchant volontairement les disjoncteurs, la dégradation ou l'épuisement des ressources.
3. Ne pas enfreindre le droit applicable de votre lieu ni utiliser les interfaces de contenu d'une manière contraire aux règles des services amont. L'utilisation du code autorisée par la licence n'accorde pas automatiquement des droits sur les contenus, comptes ou musiques de tiers.

## 3. Limites d'utilisation des ressources

L'instance hébergée peut appliquer des limites selon l'état non authentifié ou authentifié, l'IP, la session, l'interface et les lots d'événements. Les valeurs dépendent de la configuration réelle et ne constituent pas une promesse contractuelle uniforme du site pour tous les déploiements. Un dépassement peut entraîner une réponse `429`, un délai, un refus ou une restriction temporaire, sans signifier nécessairement une violation.

Conservez une fréquence raisonnable de requêtes personnelles ; évitez les extractions concurrentes, tentatives répétées, occupations prolongées de flux audio et envois inutiles d'événements. Les paramètres de limitation, de révocation et de conservation peuvent différer entre variables d'environnement, Compose et valeurs par défaut du code ; une page ne suffit pas à déduire l'état réel d'exploitation.

## 4. Gradation des mesures

L'opérateur peut adopter une ou plusieurs mesures selon l'impact, l'intention, la répétition, les données concernées et l'urgence des actes, en documentant les motifs nécessaires :

1. Avertir ou demander l'arrêt du comportement concerné ;
2. Limiter les interfaces, la concurrence, le cache, l'envoi d'événements ou l'utilisation d'autres ressources ;
3. Suspendre un compte, une session, des justificatifs ou une source réseau ; l'effet immédiat d'une révocation dépend du stockage de révocation de l'instance, de ses réglages et du succès de la requête ;
4. Mettre fin à l'accès à l'instance hébergée ou empêcher la poursuite de l'utilisation des points d'accès concernés ;
5. Conserver les enregistrements nécessaires et les communiquer aux destinataires habilités dans la mesure exigée par le droit applicable, par une demande valable ou nécessaire à la protection d'autrui et des systèmes.

En cas d'attaque en cours, de vol de justificatifs, de menace grave pour la sécurité ou de contenu manifestement illicite, des mesures temporaires nécessaires peuvent précéder l'explication et le réexamen. Les mesures de cette politique ne remplacent pas les responsabilités légales de l'auteur des actes et ne promettent ni signalement automatique à la police, ni durée fixe de conservation, ni intervention humaine sous 24 heures, ni effacement définitif de tous les enregistrements concernés.

## 5. Réclamations et signalements

- **Réclamations** : pour contester une limitation, suspension ou résiliation, écrivez à `admin@epocanvas.com` avec le compte, l'heure, les points d'accès concernés et les motifs. L'opérateur procédera au réexamen dans un délai raisonnable selon ses ressources, sans préjudice des délais, droits et recours du droit applicable. Aucun délai fixe, équipe dédiée ou rétablissement certain de l'accès n'est promis. N'envoyez ni mot de passe, ni jeton complet, ni données personnelles sans rapport avec la demande.
- **Signalements** : la même adresse reçoit les soupçons d'abus, d'atteinte aux droits, de problème de sécurité ou de préjudice à autrui. Fournissez les faits nécessaires sans retransmettre de contenus illicites ou sensibles ; l'opérateur évaluera les mesures ou divulgations aux autorités habilitées selon les risques, la minimisation des données et le droit applicable.

Pour les droits de confidentialité, les demandes d'effacement et les notifications de violation de données, utilisez `privacy@epocanvas.com`. Cette politique ne régit que les ressources réellement hébergées ; les instances indépendantes doivent indiquer leur propre opérateur et leurs voies de réclamation.
