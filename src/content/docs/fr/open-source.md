---
title: Droit de l'open source et de l'auto-hébergement
description: "Droit de l'open source et de l'auto-hébergement de Sonic : état de la licence, périmètre des marques, remerciements et dépendances tierces, obligations des déployeurs et limites de conformité."
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

La présente page expose l'état et les limites de la licence open source de Sonic, les remerciements aux projets tiers, ainsi que les obligations juridiques de l'auto-hébergement. La relation entre la licence du logiciel et les conditions d'utilisation des utilisateurs figure aux sections 2 et 10 des [Conditions d'utilisation](/fr/terms-of-service/). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

## 1. État de la licence

| Élément | État |
| --- | --- |
| `LICENSE` de la racine et du lecteur | MIT dans la RC `a75f5cb` ; autorise les usages prévus par cette licence, y compris commerciaux. Dans l'ancien `main@ce443c8`, seule la licence MIT du lecteur est vérifiable et aucune `LICENSE` n'a été trouvée à la racine ; vérifier chaque version et composant |
| Déclaration du README historique | les anciennes mentions CC BY-NC-SA 4.0 ne suffisent pas à établir la licence de tous les fichiers historiques ; vérifier le texte applicable à chaque version et composant. La finalité non lucrative ne révoque pas les droits effectivement accordés par MIT |
| Marques et identité de marque | les noms et signes `epocanvas` et `Sonic` ne confèrent, au titre de la licence du code source, aucun droit d'usage de marque |

La licence du code et les droits sur les contenus sont distincts : les enregistrements, paroles, pochettes et autres contenus appartiennent à leurs titulaires respectifs, et le projet n'accorde aucune licence musicale. L'exclusion de garantie de MIT n'écarte pas les obligations impératives du service hébergé envers les utilisateurs.

## 2. Positionnement du projet

Sonic est un projet personnel gratuit et à but non lucratif, consacré à l'apprentissage et aux tests d'intérêt général, sans SLA ni garantie d'exploitation permanente. Le lecteur peut stocker des fichiers importés ou téléchargés sur l'appareil ; leur accessibilité n'accorde aucun droit supplémentaire. Une finalité personnelle, éducative ou non lucrative ne constitue pas automatiquement une exception au droit d'auteur ou à la protection des données. Vérifiez les lois et autorisations applicables, sans contourner les protections de paiement ou d'accès (voir la [Politique d'utilisation acceptable](/fr/acceptable-use/)).

## 3. Remerciements et dépendances tierces

Le développement et la pratique de l'agrégation multi-sources s'inspirent des projets open source communautaires suivants, auxquels nous adressons nos remerciements : Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, GDStudio Music API et la communauté Linux.do. Les dépendances et déclarations complètes figurent dans `THIRD_PARTY_NOTICES.md` du dépôt ; les conditions de chaque service amont relèvent de celui-ci.

## 4. Obligations juridiques des personnes qui auto-hébergent

Le rôle dépend de qui détermine effectivement le traitement ; publier du code ou y contribuer ne crée pas à soi seul une responsabilité exclusive. Les essais purement personnels et le service public doivent être évalués séparément (voir la [Vue d'ensemble](/fr/overview/), section 2). Lorsque vous exploitez le service :

1. **Obligation d'information** : publier avant la collecte l'identité juridique réelle, les coordonnées, les finalités, les destinataires, les pays des nœuds et les durées de conservation ; adapter la [Politique de confidentialité](/fr/privacy-policy/) aux faits vérifiés, sans supposer que le dépôt fournit ces informations ;
2. **Registres et évaluation** : lorsque le RGPD s'applique et que ses conditions sont réunies, tenir le registre de l'article 30 et évaluer les traitements à risque élevé au titre de l'article 35. Une échelle réduite ne rend pas occasionnel un profilage continu ;
3. **Maintien de la sécurité** : mettre en œuvre des mesures appropriées, des choix préalables valides et une suppression vérifiée. Le profilage activé par défaut, la réutilisation publique des requêtes brutes, les demandes d'avatar par courriel et la réinitialisation incomplète restent des points bloquants ; la simple divulgation ne les résout pas ;
4. **Cohérence de la configuration** : vérifier la conservation, le nettoyage, la révocation, les ressources externes et les sauvegardes réels, et pas seulement les variables d'environnement ; suspendre tout traitement facultatif dépourvu de base licite ou de garanties nécessaires ;
5. **Droit applicable et transferts** : déterminer le champ territorial ainsi que les fournisseurs et pays réels. Le RGPD n'est pas une garantie contractuelle mondiale ; les certifications ou politiques publiques de fournisseurs n'établissent ni contrats ni garanties de transfert international.

## 5. Adoption des documents de ce site

Ces documents décrivent des instances de test hébergées déterminées et la RC publique examinée ; ils ne constituent ni une certification de conformité ni des conditions automatiquement applicables à tout déploiement. Toute adoption exige :

1. d'indiquer l'identité juridique réelle de l'opérateur, ses coordonnées, ses domaines, la date de révision et la date d'adoption ;
2. de vérifier les flux réels, les rôles des tiers, les contrats, les mécanismes de transfert, les choix, la conservation et la suppression avant le traitement ;
3. de maintenir des traductions intelligibles de façon cohérente : la référence de maintenance en chinois simplifié et les neuf traductions ne prévalent pas sur le droit impératif ni sur l'interprétation favorable aux consommateurs ;
4. d'obtenir un avis juridique approprié et, lorsque nécessaire, une acceptation valable ou un consentement distinct ; copier le texte ou continuer à l'utiliser n'établit ni l'un ni l'autre.
