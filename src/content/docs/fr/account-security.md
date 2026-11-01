---
title: Guide du compte et de la sécurité
description: "Guide du compte et de la sécurité de Sonic : connexion Epomail OAuth, mécanisme de session, conservation des clés d'API, révocation et conseils d'utilisation sûre."
---

**Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5**

La présente page décrit le fonctionnement du système de comptes de Sonic et les conseils d'utilisation sûre. La description technique complète figure à la section 3.2 de [Traitement des données et mesures de sécurité](/fr/data-security/) ; les stipulations contractuelles à la section 3 des [Conditions d'utilisation](/fr/terms-of-service/).

## 1. Mode de connexion

Le service se connecte avec un compte Epomail selon OAuth 2.0 (PKCE), sans système d'inscription autonome. Déroulement de la connexion : clic sur l'entrée de compte de la barre latérale, confirmation sur la page d'autorisation d'Epomail, puis retour au service, qui achève la connexion. Le rappel d'autorisation fait l'objet d'une quadruple vérification : paramètre `state`, PKCE, code d'autorisation et protection contre le rejeu ; l'endpoint d'authentification est limité à 30 requêtes par minute et par IP.

## 2. Mécanisme de session

1. Cookie de session : après une connexion réussie, un cookie de session avec attributs `HttpOnly; Secure; SameSite=Lax` est émis, d'une durée de validité de 30 jours au plus ; il contient la clé d'API signée, inaccessible aux scripts ;
2. Synchronisation entre onglets : l'état de connexion se synchronise automatiquement entre les onglets d'un même navigateur ; la déconnexion dans l'un des onglets est aussitôt perçue par les autres ;
3. Périmètre des clés : les clés d'API ne sont jamais écrites dans l'URL, dans les paramètres de requête ni dans le localStorage ; les cookies de transaction OAuth ont une durée de validité de 600 secondes seulement.

## 3. Conservation des clés d'API

La clé d'API est votre identifiant d'accès personnel (format `sonic_live_v2.…`, signature HMAC-SHA256) :

1. Transmission uniquement par en-têtes de requête, jamais dans l'URL ;
2. Aucune remise à un tiers ni incorporation dans un client destiné à la publication ;
3. La réémission exige la présentation de la clé actuellement valide ; en cas de fuite, déconnectez-vous immédiatement et procédez à sa révocation (voir la section 4).

## 4. Révocation et déconnexion

| Opération | Emplacement | Effet |
| --- | --- | --- |
| Déconnexion | dans le lecteur | révocation immédiate de la session courante et de l'identifiant de clé (jti) |
| Révocation de clé | `POST /api/auth/revoke` | révoque la clé d'API courante |
| Invalidation en masse | configuration du déployeur | liste de jti, liste des sujets et borne temporelle minimale globale d'émission |

## 5. Conseils d'utilisation sûre

1. Déconnectez-vous toujours après usage sur un appareil partagé (le cookie de session contient la clé signée) ;
2. Activez la vérification en deux étapes de votre compte Epomail (réglage du côté d'Epomail) ;
3. Ne prêtez pas votre compte et ne le partagez pas ; les données mêlées d'un compte partagé ne peuvent être ni distinguées ni restaurées ;
4. En cas d'enregistrements de lecture anormaux ou de sessions d'origine inconnue, déconnectez-vous immédiatement et écrivez à `admin@epocanvas.com` ;
5. Le service ne collecte aucun mot de passe (la connexion s'accomplit du côté d'Epomail) ; toute demande de « vérification du mot de passe Sonic » est une usurpation.

## 6. Entrée de gestion du compte

L'entrée de compte au bas de la barre latérale affiche l'état de connexion courant : avant connexion, elle propose un guide de connexion ; après connexion, elle affiche le pseudonyme du compte et un lien de gestion du compte (vers le profil et la boîte de réception d'Epomail). L'état de connexion se synchronise automatiquement entre les onglets.
