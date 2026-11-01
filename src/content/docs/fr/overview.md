---
title: Vue d'ensemble de la confidentialité et des conditions
description: "Vue d'ensemble des documents juridiques de Sonic : identité de la plateforme, définition des rôles de traitement des données, socle de protection de niveau RGPD, architecture documentaire, ordre de prévalence et points de contact."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.3**

La présente page sert de guide à l'ensemble des documents juridiques du service Sonic (ci-après « le service ») ; elle décrit les rôles des parties, l'architecture documentaire et l'ordre d'application. Avant de vous connecter ou d'utiliser le service, vous devez lire la présente page ainsi que la [Politique de confidentialité](/fr/privacy-policy/) et les [Conditions d'utilisation](/fr/terms-of-service/).

![Architecture des documents juridiques de Sonic : les Conditions d'utilisation forment la couche contractuelle, la Politique de confidentialité et la Politique d'utilisation acceptable la couche des politiques, le Traitement des données et les mesures de sécurité, la Liste des partages avec des tiers et des transferts et les Définitions des termes les documents de soutien, l'ensemble reposant sur le socle de protection des données de niveau RGPD](/images/sonic/legal-architecture.svg)

*Figure : architecture des documents juridiques du site. Les Conditions d'utilisation fixent les conditions contractuelles ; la Politique de confidentialité énonce l'information et les normes de traitement des données à caractère personnel ; la Politique d'utilisation acceptable fixe les limites comportementales ; les trois autres documents sont des documents de soutien. Le socle de protection des données prend le RGPD comme norme minimale pour l'ensemble des utilisateurs.*

## 1. Identité de la plateforme

Sonic est une plateforme de streaming musical open source fonctionnant selon l'architecture « plan de contrôle edge Cloudflare + plan de données moteur de protocoles Linux local » ; son code source est publié sous le fichier `LICENSE` à la racine du dépôt (MIT License). Le service peut être fourni sous les deux formes suivantes :

1. Instance hébergée : site public exploité par l'équipe d'exploitation (`sonic.epocanvas.tech`, site principal, et `sonic.epocanvas.com`, miroir de secours) ;
2. Instance auto-hébergée : site privé que toute personne, équipe ou organisation déploie elle-même, à partir du code open source, sur ses propres serveurs et son propre domaine.

Les deux formes partagent le même code open source ; la différence réside dans l'opérateur et le sujet responsable : l'équipe d'exploitation pour l'instance hébergée, le déployeur pour l'instance auto-hébergée.

## 2. Définition des rôles de traitement des données

Les documents juridiques du service adoptent la répartition des rôles « responsable du traitement / sous-traitant », qui correspond aux catégories générales du règlement général sur la protection des données (RGPD) de l'Union européenne.

| Scénario | Responsable du traitement | Sous-traitant |
| --- | --- | --- |
| Instance hébergée | équipe d'exploitation (s'agissant des événements comportementaux, des connexions et des journaux de sécurité) | Cloudflare, Epomail (authentification d'identité), entre autres ; la liste complète figure dans la [Liste des partages avec des tiers et des transferts](/fr/sub-processors/) |
| Instance auto-hébergée | la personne ou l'organisation qui déploie l'instance (responsable du traitement unique et exclusif) | les fournisseurs d'infrastructure configurés par ce déployeur |

Le code open source lui-même ne collecte, ne téléverse et ne renvoie aucune donnée de télémétrie ; hormis les services externes configurés par l'opérateur de l'instance, les auteurs amont n'accèdent à aucune donnée d'exploitation des instances. Dès le moment du déploiement, le déployeur devient le responsable du traitement des données de ses utilisateurs ; il doit remplir, selon le droit applicable de son lieu, ses obligations d'information, de sécurité et de supervision, et peut utiliser la documentation du site comme modèle de base pour son information et ses conditions.

## 3. Architecture documentaire

Les documents juridiques du site sont organisés par thème ; ils se citent mutuellement et forment ensemble un ensemble complet de stipulations :

| Document | Contenu |
| --- | --- |
| [Présentation du projet](/fr/project/) | positionnement du produit, fonctions principales, architecture technique, conception de la sécurité et de la confidentialité, formes de déploiement |
| [Politique de confidentialité](/fr/privacy-policy/) | collecte et utilisation des données à caractère personnel, bases juridiques, durées de conservation, droits des personnes concernées et transferts internationaux |
| [Conditions d'utilisation](/fr/terms-of-service/) | conditions contractuelles d'utilisation du service, règles de compte, limitation de responsabilité, droit applicable et règlement des litiges |
| [Politique d'utilisation acceptable](/fr/acceptable-use/) | limites d'utilisation, liste des comportements interdits, gradation des mesures et procédure de recours |
| [Traitement des données et mesures de sécurité](/fr/data-security/) | cycle de vie des données, matrice de traitement, mesures de sécurité, limites connues, gestion des incidents |
| [Liste des partages avec des tiers et des transferts](/fr/sub-processors/) | destinataires, données concernées, garanties de transfert |
| [Définitions des termes](/fr/key-terms/) | définitions des termes juridiques (vocabulaire du RGPD) et des termes techniques utilisés dans les documents juridiques du site |

## 4. Socle de protection des données

Le service prend le règlement général sur la protection des données (RGPD) de l'Union européenne comme norme minimale de protection des données pour **l'ensemble des utilisateurs** : où que vous soyez dans le monde, vos droits d'information, d'accès, de rectification, d'effacement, de limitation, de portabilité, d'opposition et de réclamation concernant vos données à caractère personnel ne sont en aucun cas inférieurs au niveau fixé par le RGPD.

1. Pour les utilisateurs situés dans l'Union européenne ou l'Espace économique européen, le RGPD s'applique directement ;
2. Pour les utilisateurs d'autres régions, le service prend les normes du RGPD comme engagement d'initiative et les honore comme obligation contractuelle ;
3. Les protections plus fortes accordées par le droit de votre lieu priment dans leur périmètre d'application.

Ce socle signifie : bien que l'instance hébergée soit exploitée à Taïwan et que le droit applicable des Conditions d'utilisation soit celui du lieu de l'opérateur (voir la section 11 des [Conditions d'utilisation](/fr/terms-of-service/)), les matières de protection des données sont appliquées avec le niveau du RGPD comme plancher ; l'exercice des droits des personnes concernées, la notification des violations et les obligations de sécurité sont mis en œuvre selon cette norme.

## 5. Ordre de prévalence

1. En matière de confidentialité, la [Politique de confidentialité](/fr/privacy-policy/) constitue la disposition spéciale ; en matière de conditions d'utilisation du service, les [Conditions d'utilisation](/fr/terms-of-service/) constituent la disposition spéciale ; les autres matières s'interprètent selon l'architecture énoncée dans la présente page.
2. En cas d'incohérence entre les documents, prévaut le document directement lié à la matière concernée.
3. Les documents juridiques du site ont pour version officielle la version en chinois simplifié ; les versions en anglais, en japonais et en français sont des traductions de référence ; en cas de doute sur l'interprétation, la version officielle prévaut.

## 6. Points de contact

- Confidentialité et demandes de protection des données : `privacy@epocanvas.com`
- Service et compte : `admin@epocanvas.com`
- Projet open source : Issues du dépôt GitHub (`github.com/shijianus/sonic`)
- Sites auto-hébergés : contactez les coordonnées de l'opérateur publiées par le site concerné
