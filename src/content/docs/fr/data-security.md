---
title: Traitement des données et mesures de sécurité
description: "Traitement des données et mesures de sécurité de Sonic : cycle de vie des données, matrice de traitement, mesures de sécurité à quatre couches, limites connues, gestion des violations de données et obligations des opérateurs auto-hébergés."
---

**Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.4**

La présente page décrit le cycle de vie des données du service Sonic (ci-après « le service »), la nature des activités de traitement, les mesures de sécurité, les limites connues et la procédure d'intervention en cas de violation de données. Elle développe la section 10 de la [Politique de confidentialité](/fr/privacy-policy/) ; les faits techniques reposent sur l'implémentation réelle du code open source et peuvent être vérifiés par audit du code.

![Structure de sécurité à quatre couches de Sonic : chiffrement des transports, authentification et signature, défense SSRF à l'edge, isolation du stockage, complétée par des contrôles autonomes de l'utilisateur (effacement en un clic, mode privé, révocation immédiate à la déconnexion)](/images/sonic/security-shield.svg)

*Figure : les couches de mesures de sécurité du service. Couche transport : TLS de bout en bout ; couche authentification : clés signées HMAC-SHA256 et OAuth PKCE ; couche edge : blocage des adresses de réseaux internes et de métadonnées ; couche stockage : isolation par liaison au bouclage et tunnel chiffré. À droite figurent les commandes que vous maîtrisez.*

## 1. Cycle de vie des données

| Phase | Description |
| --- | --- |
| Collecte | obtention des données d'identification du compte via la connexion Epomail OAuth (non persistées) ; rapport groupé des événements comportementaux par le lecteur (désactivable, 50 événements et 64 Ko au plus par lot) ; utilisation temporaire de l'IP pour la limitation anonyme |
| Transfert | HTTPS/TLS sur toute la chaîne ; canal chiffré Cloudflare Tunnel entre le plan de contrôle et le plan de données, avec validation obligatoire de la clé inter-services (X-Sonic-Engine-Key) ; l'en-tête d'adresse client edge vers moteur n'est accepté côté moteur qu'après validation de la clé de service |
| Stockage | SQLite du plan de données (mode WAL), dans `/app/data/sonic-recommend.sqlite` du volume nommé `sonic-data` ; en production, l'échec d'ouverture entraîne un refus de service (fail-closed), sans dégradation silencieuse |
| Utilisation | calculs statistiques associés par identifiants pseudonymisés (recommandation, popularité, similarité) ; sans revue humaine, sans contrôle de contenu, sans décision automatisée |
| Partage | voir la [Liste des partages avec des tiers et des transferts](/fr/sub-processors/) ; aucune vente, aucune utilisation publicitaire |
| Suppression | destruction automatique des événements comportementaux après 90 jours (déclenchée toutes les 1 500 écritures et au démarrage) ; suppression immédiate par l'effacement en un clic ; expiration des enregistrements de limitation après 120 secondes |

## 2. Matrice de traitement

| Activité de traitement | Données concernées | Lien d'identité | Base juridique | Durée de conservation |
| --- | --- | --- | --- | --- |
| Identification du compte et connexion | identifiant Epomail, adresse électronique, pseudonyme, URL de l'avatar, rôle | adresse électronique (dans la session) | nécessité contractuelle | non persisté ; durée de la session |
| Enregistrement d'événements comportementaux | type d'événement, identifiant canonique du morceau, artiste, genre, langue, terme de recherche, proportion de progression, poids du signal | hash pseudonymisé (`usr_`/`anon_`) | intérêt légitime + droit d'opposition | 90 jours (minimum 7 jours) |
| Calcul du profil de recommandation | caractéristiques agrégées des événements comportementaux (artistes de long terme, tendance de genres, intention de session) | hash pseudonymisé | intérêt légitime + droit d'opposition | détruit avec les événements |
| Statistiques globales agrégées | comptages de termes de recherche, co-occurrence de morceaux | aucun lien avec une personne | intérêt légitime | entretien de la base |
| Limitation de débit et prévention des abus | IP (compartiments anonymes), hash d'adresse électronique (compartiments d'authentification), compteurs par IP de l'endpoint d'authentification | utilisation temporaire | intérêt légitime | 120 secondes / fenêtre de 60 secondes |
| Sécurité des sessions et des clés | cookie de session, charge utile de la clé d'API (`sub`/`jti`/`kid`, etc.), listes de révocation | hash d'adresse électronique | nécessité contractuelle, obligation de sécurité | 30 jours au plus |
| Sauvegardes de la base | instantanés cohérents des données comportementales pseudonymisées | hash pseudonymisé | obligation de sécurité | selon la politique de sauvegarde du déployeur |

## 3. Mesures de sécurité

### 3.1 Transport et accès

1. Chiffrement intégral : navigateur vers edge et edge vers plan de données passent par TLS ; le plan de données est raccordé par le canal chiffré Cloudflare Tunnel, sans exposition directe de port sur l'Internet public, l'hôte ne mappant que `127.0.0.1:8080` ;
2. Validation inter-services : le plan de données impose la validation de X-Sonic-Engine-Key sur toutes les routes `/api`, `/proxy` et `/palette` ; côté moteur, les en-têtes entrants non fiables sont retirés et l'en-tête d'adresse client est reconstruit à partir de l'adresse de socket, toute falsification étant inefficace ;
3. Dégradation explicite : en mode dégradé de l'edge, l'en-tête de réponse `X-Sonic-Degraded: 1` est apposé et l'interface affiche simultanément l'avis de dégradation, sans bascule silencieuse.

### 3.2 Authentification et clés

1. Flux OAuth : le paramètre `state` et le PKCE (S256) préviennent l'interception et le rejeu du code d'autorisation ; les cookies de transaction sont valables 600 secondes et limités au chemin `/api/auth` ; au rappel, l'état, le PKCE, le code d'autorisation et l'absence de rejeu sont vérifiés, tout maillon manquant ou anormal entraînant un refus ;
2. Clé d'API : format versionné `sonic_live_v2`, signature HMAC-SHA256, comparaison à temps constant côté serveur via Web Crypto `crypto.subtle.verify` ; vérification stricte de la version, de `kid`, de `iat`/`exp` et de `jti` ; les clés sans signature et les clés v1 de versions antérieures sont systématiquement rejetées (fail-closed) ; durée de validité d'émission de 30 jours et plafond de validation de 90 jours ; les clés ne transitent que par les en-têtes de requête, le canal du paramètre de requête `?api_key=` ayant été intégralement supprimé afin d'éviter toute fuite des clés dans les journaux d'accès, l'historique du navigateur ou le Referer ;
3. Mécanismes de révocation : la déconnexion révoque immédiatement la session courante ; la liste de révocation `jti`, la liste de révocation des sujets et la borne temporelle minimale globale d'émission (`SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT`) permettent l'invalidation par lots ; la révocation immédiate est disponible lorsque la liaison à KV est activée avec `SONIC_ENABLE_KEY_REVOCATION=1` ; en l'absence de configuration de la révocation immédiate, les endpoints concernés renvoient 501 et invitent à utiliser la méthode des listes, sans simuler une révocation réussie ;
4. Attributs de session : `HttpOnly; Secure; SameSite=Lax`, durée de validité de 30 jours au plus ; la redirection du rappel de connexion ne transporte que le paramètre d'état `?auth=success`, sans renvoyer de clé.

### 3.3 Défense des requêtes sortantes

1. Interception SSRF : les requêtes sortantes vers les adresses de bouclage, les réseaux privés RFC 1918, les ponts internes Docker et les adresses de métadonnées du cloud (telles que `169.254.169.254`) sont systématiquement bloquées, avec vérification en pile double IPv4 et IPv6 et nouvelle vérification de la cible et du résultat de résolution DNS à chaque redirection ;
2. Liste blanche de domaines : les proxys audio, pochettes et transfert n'admettent que des cibles HTTPS sur les ports standard, au sein de la liste contrôlée de domaines de CDN musicaux (`SONIC_ALLOWED_MUSIC_DOMAINS`) ;
3. Assainissement des requêtes : les requêtes amont sont débarrassées des en-têtes `Set-Cookie` et d'identifiants et ne portent qu'un User-Agent fixe, le Referer du site officiel correspondant et l'en-tête Range nécessaire ; l'IP de sortie est signalée par l'adresse de substitution configurée par le déployeur (adresse documentaire RFC 5737 par défaut), et non par l'IP d'un utilisateur quelconque.

### 3.4 Stockage et journaux

1. Stockage pseudonymisé : les événements comportementaux sont associés à des identifiants à sens unique par hachage (valeurs SHA-256 tronquées à préfixe `usr_`/`anon_`), sans colonne d'adresse électronique en clair ni colonne d'IP ; le stockage compte 6 tables au total (données canoniques de morceaux, correspondances de morceaux par plateforme, index plein texte, événements comportementaux, co-occurrence de morceaux, agrégation de termes de recherche), une seule, la table des événements comportementaux, étant liée à une personne ;
2. Stockage fail-closed : en production, l'échec d'ouverture de la base entraîne un refus de service plutôt qu'une dégradation silencieuse ; le repli en mémoire est réservé aux tests de développement ou à la configuration explicite `SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK=1` ;
3. Minimisation des journaux : les journaux d'accès du plan de données sont des JSON ligne à ligne, contenant uniquement l'identifiant de requête, la méthode, le chemin, le code d'état et le temps de traitement ; la chaîne de requête, l'IP, le User-Agent, les cookies, l'en-tête Authorization et le corps de requête ne sont jamais journalisés ; les anomalies non traitées ne sont journalisées qu'avec l'identifiant de requête, le nom de l'erreur et le message tronqué ; les journaux sortent sur la sortie standard Docker, la politique de rotation suivant la configuration Docker de l'hôte ; côté Cloudflare Pages, il n'existe aucun journal d'accès global propre au projet ;
4. Sauvegardes : les sauvegardes de la base s'exécutent par instantané cohérent (VACUUM INTO) accompagné d'un contrôle d'intégrité ; les fichiers de sauvegarde contiennent des données comportementales pseudonymisées et doivent bénéficier du même niveau de protection que les données de production ;
5. Isolation des conteneurs : le plan de données fonctionne sur une pile de conteneurs Docker ; le conteneur auxiliaire ncm-api n'est accessible que sur le réseau interne compose (`ncm-api:3000`), sans exposition sur l'Internet public ; les permissions 600 sont exigées pour le fichier de configuration `.env`.

### 3.5 Limites connues

Le service étant un projet open source, l'opérateur publie les limites connues suivantes et les améliore continûment :

1. dans les formes de déploiement sans limiteur natif Cloudflare lié, la limitation repose sur KV ou sur des compteurs en mémoire de processus, sans précision strictement globale ;
2. la protection contre le DNS rebinding n'est pas totalement assurée ; le déployeur doit y adjoindre des mesures au niveau réseau ;
3. le cookie `sonic_session` contient la clé d'API signée ; le vol du cookie équivaut au vol de la clé, d'où la nécessité de sécuriser l'appareil et de se déconnecter rapidement ;
4. SQLite repose sur une architecture à écrivain unique et ne convient pas aux formes de déploiement à fortes écritures concurrentes ;
5. il n'existe pas d'endpoint de métriques Prometheus intégré ; la supervision s'appuie sur les journaux et des sondes externes.

La liste complète de ces limites figure dans `docs/OPERATIONS.md` du dépôt amont ; les opérateurs auto-hébergés doivent les évaluer au regard de leur forme de déploiement.

## 4. Intervention en cas de violation de données

1. Enregistrement interne : toute violation de données à caractère personnel fait l'objet d'un enregistrement (l'article 33, paragraphe 5, du RGPD), sans exemption pour risque jugé faible ;
2. Notification à l'autorité de contrôle : lorsque la violation est susceptible d'engendrer un risque pour les personnes, notification à l'autorité de contrôle compétente du lieu de l'opérateur dans les 72 heures suivant la prise de connaissance, en décrivant la nature de la violation, les catégories et le nombre de données concernées, les conséquences probables et les mesures prises (l'article 33, paragraphes 1 et 3, du RGPD) ;
3. Communication aux personnes concernées : lorsque la violation est susceptible d'engendrer un risque élevé pour les personnes, communication, sans retard indu, aux personnes touchées par annonce sur le site ou tout autre moyen efficace, en décrivant la nature de la violation et les mesures recommandées (l'article 34 du RGPD) ; lorsque le risque a été effectivement éliminé de sorte que le risque élevé a disparu, la communication peut être omise, le motif de la décision étant consigné ;
4. Mesures d'intervention : isolation immédiate des systèmes touchés, révocation des clés et sessions concernées (listes `jti` et borne temporelle minimale globale d'émission comprises), évaluation et correction des causes, consignation de l'ensemble du traitement.

## 5. Protection des données dès la conception et par défaut

Le service met en œuvre, dès la phase de conception, les mesures suivantes (l'article 25 du RGPD) :

1. Pseudonymisation par défaut : les événements comportementaux sont associés, dès la collecte, à des identifiants par hachage ; l'adresse électronique n'est pas persistée ; la base de données n'a pas de colonne d'IP ;
2. Mode de collecte zéro : lorsque la personnalisation est désactivée, les événements ne sont pas stockés ; en mode public, ils sont jetés directement côté serveur, le nombre d'éléments ignorés étant fidèlement indiqué dans l'accusé de réception ;
3. Données clientes minimales : le contexte de recommandation ne transporte qu'un nombre limité de favoris, d'artistes récents et de termes de recherche, utilisés en mémoire sans persistance ; le lecteur ne lit ni n'écrit `document.cookie`, et les clés n'entrent pas dans le localStorage ;
4. Chaînes à risque désactivées par défaut : les agrégateurs tiers (GDStudio, Lyriva) et les chaînes de contournement des restrictions d'accès sont strictement désactivés par défaut et ne prennent effet qu'après activation explicite par le déployeur (variable d'environnement à 1) ;
5. Effacement en un clic : le droit à l'effacement se concrétise directement par une fonction en libre-service, sans demande humaine ; « Effacer toutes les données locales » nettoie simultanément le profil côté serveur, le localStorage, le sessionStorage et l'IndexedDB.

## 6. Obligations des opérateurs auto-hébergés

Dès le moment où vous déployez vous-même le service, vous êtes le responsable du traitement des données de vos utilisateurs et devez remplir les obligations suivantes :

1. Obligation d'information : informer vos utilisateurs du traitement des données (la [Politique de confidentialité](/fr/privacy-policy/) du site peut servir de texte de base) ;
2. Registre des activités de traitement : tenir le registre des activités de traitement (l'article 30 du RGPD) ;
3. Analyse d'impact : lorsque le traitement est susceptible d'engendrer un risque élevé, réaliser une analyse d'impact relative à la protection des données (l'article 35 du RGPD), couvrant au minimum : l'identifiant d'appareil anonyme, les événements comportementaux, l'utilisation temporaire des IP de limitation et la dérivation par hachage des adresses électroniques OAuth ;
4. Vérification de la configuration : confirmer la concordance des paramètres suivants avec les engagements de votre politique : durée de conservation des événements comportementaux (`SONIC_RECOMMEND_RETENTION_DAYS`, 90 par défaut, minimum 7), chemin de persistance (`SONIC_RECOMMEND_DB_PATH`, la valeur `memory` désactivant la persistance), interrupteur de repli mémoire (`SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK`), interrupteurs des chaînes tierces (`SONIC_ENABLE_GDSTUDIO`, etc.), paramètres de limitation de débit (`SONIC_RATE_LIMIT_ANON_RPM`/`SONIC_RATE_LIMIT_AUTH_RPM`) ;
5. Sécurité et supervision : configurer selon les mesures de la section 3 (clé de service d'au moins 32 caractères, permissions 600 sur `.env`, plan de données sans exposition publique), et se soumettre, selon le droit de votre lieu, aux contrôles et à la supervision des autorités compétentes.

## 7. Auditabilité

Les déclarations de sécurité du service sont vérifiables dans le code source : toute la logique de traitement, les valeurs par défaut des interrupteurs, la structure de stockage et la forme des journaux sont publiées dans le dépôt open source ; le dépôt amont comporte en outre le dossier de remédiation de l'audit de sécurité (`docs/AUDIT_REMEDIATION.md`) et le manuel d'exploitation (`docs/OPERATIONS.md`). Les faits techniques de la documentation du site sont confrontés au code source à chaque mise à jour de version ; en cas de divergence constatée, le code source prévaut et la documentation est corrigée sans délai.
