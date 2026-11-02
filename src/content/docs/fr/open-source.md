---
title: Droit de l'open source et de l'auto-hébergement
description: "Droit de l'open source et de l'auto-hébergement de Sonic : état de la licence, périmètre des marques, remerciements et dépendances tierces, obligations des déployeurs et limites de conformité."
---

**Date de révision : 2 novembre 2026｜Version : 1.8**

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

## 4. Obligations juridiques de l'auto-hébergement

Le rôle dépend des finalités et moyens de traitement effectivement décidés ; publier du code ne rend pas automatiquement responsable de toutes les instances. Distinguez les essais purement personnels et le service public. Selon le droit réellement applicable et votre rôle (voir la [Vue d'ensemble](/fr/overview/)), les obligations comprennent :

1. Informer : informer les utilisateurs des modalités de traitement des données, en pouvant prendre comme texte de base la [Politique de confidentialité](/fr/privacy-policy/) du site, à ajuster toutefois selon votre configuration réelle (les chaînes tierces non activées doivent être retirées de l'information) ;
2. Consigner et évaluer : lorsque le RGPD s'applique et que les conditions correspondantes sont réunies, tenir le registre de l'article 30 du RGPD et réaliser l'analyse d'impact exigée par l'article 35 du RGPD ; un profilage continu n'est pas occasionnel du seul fait du petit nombre d'utilisateurs ;
3. Sécurité : mettre en œuvre les mesures de la section 3 de [Traitement des données et mesures de sécurité](/fr/data-security/) et se soumettre à la supervision des autorités compétentes ;
4. Cohérence de configuration : les valeurs réelles des variables d'environnement (durée de conservation, interrupteurs des chaînes tierces, limitation de débit) doivent correspondre aux engagements de votre politique ;
5. Déterminer la juridiction : vérifier l'application effective du RGPD, du UK GDPR, de la LGPD, de la CCPA-CPRA ou d'autres lois ; le projet ne transforme pas le RGPD en garantie contractuelle mondiale. Identité juridique, pays des nœuds, contrats et mécanismes de transfert doivent être vérifiés séparément du code.

## 5. Adoption des documents du site

Le site suit une conception à deux voies, « modèle général + texte réel de l'instance hébergée » ; les opérateurs auto-hébergés peuvent adopter l'ensemble des documents du site comme base de leur information et de leurs conditions :

1. remplacer les informations d'identité (domaine, courriel de contact, date d'entrée en vigueur et numéro de version) ;
2. revoir la divulgation fidèle de la liste des tiers et des paramètres de configuration ;
3. le chinois simplifié est la référence de maintenance de ce site, avec neuf traductions ; toute règle linguistique choisie doit préserver le droit impératif, l'interprétation favorable aux consommateurs et l'information compréhensible ;
4. consulter un avocat avant toute exploitation ; les documents du site ne constituent pas un avis juridique.
