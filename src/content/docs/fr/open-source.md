---
title: Droit de l'open source et de l'auto-hébergement
description: "Droit de l'open source et de l'auto-hébergement de Sonic : état de la licence, périmètre des marques, remerciements et dépendances tierces, obligations des déployeurs et limites de conformité."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page expose l'état et les limites de la licence open source de Sonic, les remerciements aux projets tiers, ainsi que les obligations juridiques de l'auto-hébergement. La relation entre la licence du logiciel et les conditions d'utilisation des utilisateurs figure aux sections 2 et 10 des [Conditions d'utilisation](/fr/terms-of-service/).

## 1. État de la licence

| Élément | État |
| --- | --- |
| `LICENSE` à la racine du dépôt | MIT License, texte de licence faisant foi, ce fichier prévaut |
| Déclaration du README historique | a exprimé l'intention d'adopter CC BY-NC-SA 4.0 (non commercial, attribution, partage à l'identique) ; jusqu'à décision des mainteneurs, elle ne fonde pas la licence et n'exprime que le positionnement non commercial du projet |
| Marques et identité de marque | les noms et signes `epocanvas` et `Sonic` ne confèrent, au titre de la licence du code source, aucun droit d'usage de marque |

Quelle que soit la décision finale sur la licence, les limites suivantes s'appliquent : les droits sur les enregistrements, paroles, pochettes et autres contenus appartiennent à leurs titulaires respectifs, et le projet n'accorde aucune sous-licence sur les contenus musicaux.

## 2. Positionnement du projet

Le projet est un projet open source non commercial : un outil de recherche, d'agrégation et de lecture, qui ne stocke ni n'héberge de fichiers musicaux et n'intègre aucun composant de contournement des mécanismes payants et de protection des droits d'auteur. En utilisant le service ou en procédant à un auto-hébergement, vous devez vérifier vous-même la conformité aux lois locales, aux conditions des services amont et aux exigences de licence des contenus (limites comportementales dans la [Politique d'utilisation acceptable](/fr/acceptable-use/)).

## 3. Remerciements et dépendances tierces

Le développement et la pratique de l'agrégation multi-sources s'inspirent des projets open source communautaires suivants, auxquels nous adressons nos remerciements : Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, GDStudio Music API et la communauté Linux.do. Les dépendances et déclarations complètes figurent dans `THIRD_PARTY_NOTICES.md` du dépôt ; les conditions de chaque service amont relèvent de celui-ci.

## 4. Obligations juridiques de l'auto-hébergement

Dès le moment du déploiement, le déployeur devient le responsable du traitement des données de ses utilisateurs (définition des rôles à la section 2 de la [Vue d'ensemble](/fr/overview/)) et doit remplir les obligations suivantes :

1. Informer : informer les utilisateurs des modalités de traitement des données, en pouvant prendre comme texte de base la [Politique de confidentialité](/fr/privacy-policy/) du site, à ajuster toutefois selon votre configuration réelle (les chaînes tierces non activées doivent être retirées de l'information) ;
2. Consigner et évaluer : tenir le registre des activités de traitement (l'article 30 du RGPD) et, en cas de risque élevé, réaliser une analyse d'impact relative à la protection des données (l'article 35 du RGPD) ;
3. Sécurité : mettre en œuvre les mesures de la section 3 de [Traitement des données et mesures de sécurité](/fr/data-security/) et se soumettre à la supervision des autorités compétentes ;
4. Cohérence de configuration : les valeurs réelles des variables d'environnement (durée de conservation, interrupteurs des chaînes tierces, limitation de débit) doivent correspondre aux engagements de votre politique ;
5. Compléter selon la juridiction : outre le RGPD, compléter selon la juridiction de vos utilisateurs par UK GDPR, LGPD, CCPA-CPRA et les autres exigences légales applicables.

## 5. Adoption des documents du site

Le site suit une conception à deux voies, « modèle général + texte réel de l'instance hébergée » ; les opérateurs auto-hébergés peuvent adopter l'ensemble des documents du site comme base de leur information et de leurs conditions :

1. remplacer les informations d'identité (domaine, courriel de contact, date d'entrée en vigueur et numéro de version) ;
2. revoir la divulgation fidèle de la liste des tiers et des paramètres de configuration ;
3. conserver la clause « la version en chinois simplifié fait foi », ou la remplacer par la langue de votre version officielle, de manière cohérente sur l'ensemble du texte ;
4. consulter un avocat avant toute exploitation ; les documents du site ne constituent pas un avis juridique.
