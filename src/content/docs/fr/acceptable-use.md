---
title: Politique d'utilisation acceptable
description: "Politique d'utilisation acceptable de Sonic : périmètre d'application, liste des comportements interdits, plafonds d'utilisation des ressources, gradation des mesures, circuit de tolérance zéro et procédure de recours."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.3**

La présente politique fixe les limites comportementales de l'utilisation du service Sonic (ci-après « le service ») et expose les comportements interdits ainsi que les mesures que peut prendre l'opérateur. Elle constitue les règles de conduite visées à la section 7 des [Conditions d'utilisation](/fr/terms-of-service/) ; son respect s'impose à tout utilisateur du service ; si vous n'acceptez pas la présente politique, cessez d'utiliser le service.

![Gradation des mesures de Sonic : quatre niveaux d'action (avertissement, limitation de débit, suspension, résiliation), suivis de la conservation des preuves et de la transmission légale ; circuit de tolérance zéro pour la protection des mineurs et les contenus terroristes traité immédiatement ; boucle de recours permettant à la personne concernée de demander un réexamen](/images/sonic/aup-ladder.svg)

*Figure : les mesures de l'opérateur s'appliquent par gradation selon la gravité, chaque niveau étant motivé ; le circuit de tolérance zéro échappe à la procédure graduée ; la personne concernée peut exercer un recours contre toute mesure.*

## 1. Périmètre d'application

La présente politique s'applique à toute utilisation du service de votre part, notamment :

1. l'ensemble des fonctions du lecteur web (recherche, lecture, paroles, recommandation, téléchargement, importation de musique locale) ;
2. l'accès via l'API ouverte, y compris vos propres clients et scripts tiers ;
3. les instances auto-hébergées (l'opérateur auto-hébergé peut adapter la présente politique avant de l'appliquer, sans descendre toutefois sous les exigences du droit de son lieu).

## 2. Comportements interdits

### 2.1 Abus du système et des interfaces

1. contourner ou neutraliser la limitation de débit, la vérification des signatures, le disjoncteur, la défense SSRF, la liste blanche de domaines ou toute autre mesure technique de protection ;
2. falsifier des clés d'API, rejouer des identifiants de clé révoqués (jti), détourner la session ou les clés d'autrui, ou contourner de quelque manière la validation fail-closed ;
3. aspirer massivement, à l'aide de scripts automatisés, les résultats de recherche, les paroles ou les adresses de lecture du service, en vue d'une revente, d'une redistribution ou de la constitution de jeux de données miroir sans rapport avec les fonctions du service ;
4. sonder, scanner ou obtenir autrement la topologie interne du service, les clés inter-services, le matériel de signature ou les endpoints non publics ;
5. utiliser les endpoints de proxy du service (`/api/music/stream`, `/api/sonic/forward`, etc.) comme proxy réseau généraliste pour atteindre des cibles sans rapport avec la lecture musicale.

### 2.2 Contenus et droits

1. utiliser les interfaces du service pour déchiffrer, contourner ou perturber les mécanismes de paiement et de protection des droits d'auteur d'une plateforme musicale ;
2. diffuser des contenus portant atteinte aux droits d'auteur, aux marques, au droit à l'image ou aux droits de la personnalité d'autrui ;
3. téléverser ou diffuser des contenus illicites, notamment des contenus d'exploitation sexuelle de mineurs et des contenus de propagande terroriste ;
4. agir sous le nom ou l'identité d'autrui ou d'une institution, ou utiliser les noms et signes `epocanvas` et `Sonic` pour laisser croire à un soutien du service sans autorisation ;
5. téléverser des fichiers illicites destinés à être diffusés par le service vers les fonctions d'importation de musique locale ou de téléchargement.

### 2.3 Droits d'autrui

1. perturber ou entraver le fonctionnement normal du service ou de tout système associé, y compris par le déclenchement délibéré du disjoncteur et des mécanismes de dégradation ;
2. harceler, diffamer ou attaquer l'opérateur, les fournisseurs de services amont ou d'autres utilisateurs ;
3. utiliser le service à des fins contraires au droit de votre lieu ou aux conditions des services amont ;
4. vendre, sous-louer ou offrir l'accès au service aux fins d'une revente commerciale.

## 3. Plafonds d'utilisation des ressources

| Élément | Plafond | Mesure en cas de dépassement |
| --- | --- | --- |
| Requêtes anonymes | 240 par minute (valeur par défaut) | rejet direct à la couche edge (429), non comptabilisé comme infraction |
| Requêtes authentifiées | 600 par minute (valeur par défaut) | rejet direct à la couche edge (429) ; les dépassements persistants entrent dans la gradation des mesures |
| Endpoint d'authentification (connexion/émission de clé) | 30 par minute et par IP | rejet direct à la couche edge (429) |
| Rapport d'événements comportementaux | 50 événements au plus par lot, corps de requête de 64 Ko | rejet du lot entier en cas de dépassement |
| Flux audio | via le proxy edge, ou via le mode direct expressément demandé | les anomalies de concurrence entrent dans la gradation des mesures |

Un usage personnel normal n'atteint pas ces plafonds ; la limitation de débit poursuit une finalité technique de prévention des abus et de stabilité du service, et non punitive. Les paramètres de limitation sont configurables par le déployeur ; pour une instance auto-hébergée, les valeurs réelles dépendent de sa configuration.

## 4. Gradation des mesures

Lorsque l'opérateur constate une infraction, il applique les mesures suivantes selon la gravité ; chaque niveau de mesure est motivé :

1. Avertissement : notification dans le lecteur, avec énoncé des motifs ;
2. Limitation de débit : réduction du quota de requêtes du compte ou de la clé concernés ;
3. Suspension : blocage temporaire de la session et de la clé d'API du compte (via la liste de révocation `jti` ou le mécanisme de révocation immédiate), les données étant conservées provisoirement ;
4. Résiliation : fin du droit d'utilisation ; les données comportementales sont détruites à l'expiration de leur durée de conservation (90 jours, minimum 7 jours) ;
5. Conservation des preuves et transmission légale : lorsque la loi l'exige, conservation des enregistrements dans le périmètre nécessaire et communication aux autorités habilitées selon la procédure légale.

Les cas suivants échappent à la procédure graduée et l'opérateur peut suspendre immédiatement, puis transmettre ou signaler : contenus d'exploitation sexuelle de mineurs, contenus de propagande terroriste, attaque de système en cours.

## 5. Recours et signalement

- Recours : si vous estimez qu'une mesure est erronée, vous pouvez écrire à `admin@epocanvas.com` en précisant le compte et les faits concernés ; l'opérateur réexamine et répond dans un délai raisonnable. Les recours contre les mesures d'urgence (cas de tolérance zéro de la section 4) sont également reçus ; le réexamen n'ajourne pas la réparation des erreurs de jugement qui vous concernent personnellement.
- Signalement : quiconque constate un comportement contraire à la présente politique peut le signaler à la même adresse ; l'identité du signalant reste confidentielle vis-à-vis de la personne signalée jusqu'à vérification. Les signalements relevant de la protection des mineurs ne sont pas soumis à cette confidentialité et sont traités selon la procédure légale.

Les mesures prises par l'opérateur en vertu de la présente politique n'exonèrent pas l'auteur de l'infraction des responsabilités que le droit lui impose.
