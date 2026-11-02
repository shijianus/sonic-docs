---
title: Guide du compte et de la sécurité
description: "Guide du compte et de la sécurité de Sonic : connexion Epomail OAuth, mécanisme de session, conservation des clés d'API, révocation et conseils d'utilisation sûre."
---

**Date de révision : 2 novembre 2026｜Version : 1.8**

La présente page décrit le fonctionnement du système de comptes de Sonic et les conseils d'utilisation sûre. La description technique complète figure à la section 3.2 de [Traitement des données et mesures de sécurité](/fr/data-security/) ; les stipulations contractuelles à la section 3 des [Conditions d'utilisation](/fr/terms-of-service/). Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne.

## 1. Mode de connexion

Le service utilise Epomail OAuth 2.0 avec PKCE, sans inscription Sonic distincte : ouvrez l'entrée de compte, confirmez sur Epomail puis revenez au service. Le flux vérifie notamment `state`, PKCE et le code d'autorisation, avec une limite par défaut de 30 requêtes par minute et par IP. Les données reçues comprennent l'adresse électronique et son indicateur de vérification ; l'absence de `email_verified` n'est pas systématiquement rejetée dans le code vérifié. Les champs ne prouvent pas l'âge : le minimum de 16 ans est une règle d'accès, pas une vérification effectuée. La connexion ne vaut pas consentement au profilage.

## 2. Mécanisme de session

1. Cookie de session : `sonic_session`, avec attributs `HttpOnly; Secure; SameSite=Lax`, dure par défaut 30 jours et contient un justificatif signé ; HttpOnly en limite la lecture par script, mais la signature ne chiffre pas la charge utile, qui peut contenir l'adresse électronique et des identifiants ;
2. Synchronisation entre onglets : l'état de connexion peut se synchroniser dans un même navigateur ; cela ne garantit ni synchronisation cloud de la bibliothèque ni révocation de toutes les copies d'un justificatif ;
3. Stockage du compte : `auth` dans localStorage conserve notamment l'adresse électronique et l'avatar ; les données de compte ne sont donc pas uniquement en mémoire. Les cookies de transaction OAuth durent environ 600 secondes ; protégez aussi les données lisibles par les scripts.

## 3. Conservation des clés d'API

La clé d'API est votre identifiant d'accès personnel (format `sonic_live_v2.…`, signature HMAC-SHA256) :

1. Transmission uniquement par en-têtes de requête, jamais dans l'URL ;
2. Aucune remise à un tiers ni incorporation dans un client destiné à la publication ;
3. La réémission exige la présentation de la clé actuellement valide ; en cas de fuite, déconnectez-vous immédiatement et procédez à sa révocation (voir la section 4).

## 4. Révocation et déconnexion

| Opération | Emplacement | Effet |
| --- | --- | --- |
| Déconnexion | dans le lecteur | efface le cookie courant ; l'invalidation distante des copies dépend de la configuration et de la requête |
| Révocation de clé | `POST /api/auth/revoke` | exige un stockage de révocation fonctionnel et une requête réussie ; peut échouer ou être indisponible |
| Invalidation en masse | configuration du déployeur | liste de jti, liste des sujets et borne temporelle minimale globale d'émission |

## 5. Conseils d'utilisation sûre

1. Déconnectez-vous toujours après usage sur un appareil partagé (le cookie de session contient la clé signée) ;
2. Activez la vérification en deux étapes de votre compte Epomail (réglage du côté d'Epomail) ;
3. Ne prêtez pas votre compte et ne le partagez pas ; les données mêlées d'un compte partagé ne peuvent être ni distinguées ni restaurées ;
4. En cas d'enregistrements de lecture anormaux ou de sessions d'origine inconnue, déconnectez-vous immédiatement et écrivez à `admin@epocanvas.com` ;
5. Le service ne collecte aucun mot de passe (la connexion s'accomplit du côté d'Epomail) ; toute demande de « vérification du mot de passe Sonic » est une usurpation.

## 6. Entrée de gestion du compte

L'entrée de compte au bas de la barre latérale affiche l'état de connexion courant : avant connexion, elle propose un guide de connexion ; après connexion, elle affiche le pseudonyme du compte et un lien de gestion du compte (vers le profil et la boîte de réception d'Epomail). L'état de connexion se synchronise automatiquement entre les onglets.
