---
title: Vue d'ensemble de la confidentialité et des conditions
description: Prestataire, champ d'application de la protection des données, relations entre documents et conditions de mise en œuvre actuelles du projet personnel de test à but non lucratif Sonic.
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Cette page explique les relations entre les documents du service de test hébergé Sonic. Le projet est maintenu par une personne, gratuit et à but non lucratif, à des fins d'apprentissage et d'expérimentation d'intérêt général ; il ne promet ni niveau de service commercial ni exploitation permanente. Lisez d'abord les [Conditions d'utilisation](/fr/terms-of-service/) et la [Politique de confidentialité](/fr/privacy-policy/) pour connaître le périmètre du service et les traitements de données. Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

:::caution[Révision documentaire et déploiement réel]
La RC publique et l'ancien `main` sont deux états distincts du code ; leurs capacités ne doivent pas être confondues. L'environnement en ligne, les contrats fournisseurs et les résultats réels d'effacement n'ont pas été examinés. Le profilage activé par défaut, les suggestions publiques reprenant les termes de recherche, les requêtes d'avatar avec adresse électronique, la couverture de l'effacement et les durées réelles de conservation restent notamment à corriger ou à concrétiser. La mise à jour des politiques ne prouve pas la résolution de ces problèmes. Les traitements sans base licite ni garanties nécessaires doivent être suspendus.
:::

![Relations entre les documents Sonic : conditions du service, information sur la confidentialité, règles d'utilisation et description des données](/images/sonic/legal-architecture.svg)

*Figure : chaque document a une fonction distincte ; le traitement des données personnelles exige une base licite établie indépendamment.*

## 1. Projet et opérateur

Le dépôt public du code est [shijianus/sonic](https://github.com/shijianus/sonic) ; les fichiers `LICENSE` de la racine et du lecteur de la RC `a75f5cb` sont MIT. Dans l'ancien `main@ce443c8`, seule la licence MIT du lecteur est vérifiable et aucune `LICENSE` n'a été trouvée à la racine ; les versions et composants historiques doivent être appréciés séparément. La finalité non lucrative du projet ne révoque pas la licence du code et n'accorde pas de droits sur la musique, les paroles, les pochettes ou les MV.

Cette documentation du service est destinée aux instances hébergées `sonic.epocanvas.tech` et `sonic.epocanvas.com` qui l'adoptent effectivement. L'opérateur réel doit préciser son identité juridique et ses coordonnées ; le compte de maintenance `shijianus` ou la marque EpoCanvas ne remplace pas une information complète sur l'identité. Le code ne prouve ni le nom légal de l'opérateur, ni son lieu d'établissement, ni les pays des serveurs ; aucune déduction n'est faite à ce sujet.

Les autres déploiements ont leurs propres opérateurs et règles. La simple publication de code, contribution de correctifs ou fourniture d'outils hors ligne ne rend pas automatiquement responsable des services et données de toutes les instances ; si une personne les exploite aussi ou participe aux décisions de traitement, elle répond de son rôle réel.

## 2. Rôles dans le traitement des données

| Participant | Critère d'appréciation du rôle | Précision pour ce projet |
| --- | --- | --- |
| Opérateur de l'instance hébergée | Personne déterminant effectivement les finalités et les moyens du traitement des données personnelles | Responsable de ses propres traitements de connexion, de requêtes, de recommandations et des traitements associés |
| Fournisseur d'infrastructure | Traite sur instruction ou pour ses propres finalités | Le rôle de Cloudflare et des autres fournisseurs dépend des services et contrats précis |
| Epomail et fournisseurs de contenus et ressources | Peuvent être responsables indépendants du traitement ; certaines situations exigent une analyse distincte | Tous les tiers ne sont pas qualifiés globalement de sous-traitants |
| Déployeurs indépendants et contributeurs au code | Selon leur décision ou participation effective au traitement | Les étiquettes de déployeur ou de contributeur ne déterminent pas automatiquement une responsabilité unique et exclusive |

Les flux réels comprennent le profilage facultatif, le contexte des requêtes, les données du navigateur, les ressources externes directes et les statistiques de recherche. Les mentions « open source » ou « stockage local » ne signifient pas l'absence d'envoi externe ; ne pas être connecté et utiliser un hash ne signifie pas non plus être anonyme. Les détails sont ceux exposés fidèlement dans la politique de confidentialité, avec laquelle les explications techniques doivent rester cohérentes.

## 3. Finalité des documents

| Document | Finalité |
| --- | --- |
| [Conditions d'utilisation](/fr/terms-of-service/) | Conditions du service hébergé, droits sur les contenus, limites d'exploitation et responsabilité |
| [Politique de confidentialité](/fr/privacy-policy/) | Responsable du traitement, données, finalités, bases, destinataires, conservation et droits |
| [Politique d'utilisation acceptable](/fr/acceptable-use/) | Ressources publiques, tests autorisés, comportements interdits et mesures |
| [Traitement des données et mesures de sécurité](/fr/data-security/) | Conception réelle de la sécurité, lacunes, incidents et mesures adaptées aux risques |
| [Liste des partages avec des tiers et des transferts](/fr/sub-processors/) | Ressources externes, rôles indépendants, configuration et conditions des transferts internationaux |
| [Définitions des termes](/fr/key-terms/) | Données personnelles, pseudonymisation, profilage et termes techniques |
| [Gestion des données](/fr/data-management/) | Actions des utilisateurs et limites de leur couverture |

## 4. Objectif de protection, risques et droit applicable

L'application du RGPD dépend de l'article 3 du RGPD et des faits concrets. Fournir gratuitement des services à des personnes se trouvant dans l'Union européenne ou suivre leur comportement dans l'Union peut relever du règlement ; la seule existence d'accès depuis l'étranger ne suffit pas non plus à trancher. Le caractère non lucratif, l'ouverture du code et l'apprentissage ne créent pas d'exemption globale ; une activité purement personnelle ou domestique doit être appréciée selon sa portée réelle.

Les mesures sont choisies selon l'échelle du traitement, les risques et les coûts de mise en œuvre. Un petit projet personnel n'est pas systématiquement tenu de désigner un délégué à la protection des données, d'obtenir une certification, d'acheter un audit commercial ou de mettre en place une équipe permanente ; les seuils particuliers de l'article 37, de l'article 35 et de l'article 27 du RGPD doivent néanmoins être examinés séparément. Un profilage continu ne peut pas être qualifié d'« occasionnel » au seul motif qu'il concerne peu de personnes. L'information nécessaire sur l'identité, une base valable, la minimisation, la sécurité et le traitement des droits restent obligatoires.

Le respect de la vie privée guide la conception et l'amélioration du service. L'objectif est de faire des efforts raisonnables pour offrir un niveau élevé de protection, avec des mesures rigoureuses et proportionnées aux risques, en prenant pour référence les principes du RGPD de minimisation des données, de limitation des finalités, de transparence et de contrôle par les utilisateurs. Cet objectif n'est ni une certification européenne ni une déclaration de conformité intégrale au RGPD et aux lois de tous les États membres. Il ne garantit ni sécurité absolue, ni absence de fuite ou de perte de données, ni effacement immédiat et complet. La protection effective dépend du déploiement, de la configuration et des traitements des tiers ; les mesures constatées dans le code, les éléments non vérifiés et les risques connus doivent être distingués.

Le droit applicable dépend de la situation réelle ; la référence au RGPD ne crée pas de garantie contractuelle mondiale supplémentaire couvrant tout son régime. Les efforts raisonnables ne réduisent pas les obligations légales applicables, et l'information sur les risques ne vous demande ni d'accepter un traitement illicite ni de renoncer à vos droits. Quelle que soit la loi applicable, les données doivent être décrites avec exactitude, les engagements pris exécutés et les droits non susceptibles de renonciation respectés.

## 5. Interprétation et versions

Le droit impératif prévaut. Les conditions du service relèvent des conditions d'utilisation, et l'information sur les données de la politique de confidentialité. Les explications techniques, images ou anciennes présentations de fonctions ne peuvent pas élargir l'autorisation de traiter ; invoquer « le code fait foi » ne dispense pas de répondre d'une information erronée. Toute contradiction doit être corrigée et les utilisateurs concernés informés.

Le chinois simplifié est la référence de maintenance ; les neuf autres versions linguistiques sont des traductions. La priorité du chinois ne peut exclure une interprétation favorable aux consommateurs ni une information compréhensible. La date indiquée est celle de la révision documentaire ; avant l'adoption par un déploiement ou un changement effectif des traitements, une information valable reste nécessaire, ainsi qu'un consentement distinct lorsqu'il est requis.

## 6. Contact

Service et comptes : `admin@epocanvas.com` ; confidentialité et demandes d'exercice des droits : `privacy@epocanvas.com`. Ces adresses sont proposées par la documentation, mais leur publication dans le code amont examiné n'a pas été confirmée et leur réception n'a pas été testée par l'envoi de courriels. Elles ne constituent pas une déclaration de nomination d'un représentant dans l'Union européenne ou d'un délégué à la protection des données. L'opérateur de l'instance doit confirmer ou corriger les canaux qu'il publie et garantir leur efficacité.

Les problèmes techniques peuvent être signalés dans les [GitHub Issues](https://github.com/shijianus/sonic/issues), sans données personnelles, mots de passe ni justificatifs de session. Pour une instance tierce, contactez son propre opérateur.
