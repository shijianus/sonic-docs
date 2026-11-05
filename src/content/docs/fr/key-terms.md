---
title: Définitions des termes
description: Termes de protection des données, de rôles, de consentement, de technique et de traitement local employés dans les documents juridiques de Sonic.
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Cette page explique les principaux termes de la [Politique de confidentialité](/fr/privacy-policy/), de [Traitement des données et mesures de sécurité](/fr/data-security/), de la [Liste des partages avec des tiers et des transferts](/fr/sub-processors/) et de la [Politique d'utilisation acceptable](/fr/acceptable-use/). Les définitions juridiques prennent le RGPD pour référence. Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne. Il ne s'agit pas d'une certification de conformité en exploitation. Le chinois simplifié est la référence de maintenance à la racine ; les neuf autres versions linguistiques sont des traductions. La priorité linguistique ne réduit ni le droit impératif ni le droit des consommateurs à des conditions claires et compréhensibles.

![Carte des termes Sonic : rôles juridiques, états des données, opérations de traitement et composants techniques](/images/sonic/key-terms-map.svg)

*Figure : les termes sont regroupés par rôles juridiques, états des données et mise en œuvre technique ; le schéma n'étend la qualité juridique d'aucune partie.*

## 1. Termes juridiques

| Terme | Définition |
| --- | --- |
| Données à caractère personnel | Toute information se rapportant à une personne physique identifiée ou identifiable, selon l'article 4, paragraphe 1, du RGPD. IP, cookies, recherches, URL d'avatar, noms ou textes de commentaires et identifiants pseudonymes associables à une personne peuvent tous en relever. |
| Traitement | Toute opération sur des données personnelles, notamment collecte, enregistrement, stockage, consultation, utilisation, transmission, divulgation publique, limitation ou effacement, selon l'article 4, paragraphe 2, du RGPD. |
| Limitation du traitement | Suspension de l'utilisation des données dans certaines circonstances, tout en les conservant, selon l'article 18 du RGPD. |
| Profilage | Analyse ou évaluation automatisée des caractéristiques ou comportements d'une personne. Lectures, recherches, sauts, favoris, refus et contexte peuvent servir aux recommandations ; un profilage n'est pas nécessairement une décision produisant des effets juridiques ou des effets significatifs similaires. |
| Pseudonymisation | Traitement empêchant l'attribution directe des données à une personne sans information supplémentaire, selon l'article 4, paragraphe 5, du RGPD. Des données pseudonymisées peuvent encore permettre une identification par rapprochement ; elles ne sont pas anonymes pour autant. |
| Responsable du traitement | Personne physique ou morale déterminant, seule ou conjointement, les finalités et moyens du traitement, selon l'article 4, paragraphe 7, du RGPD. Pour une instance hébergée, il faut identifier la personne ou l'organisation qui les détermine réellement ; auteur, contributeurs et opérateur ne sont pas nécessairement la même entité. |
| Sous-traitant | Personne physique ou morale traitant des données personnelles pour le compte du responsable, selon l'article 4, paragraphe 8, du RGPD. Le rôle dépend des finalités, instructions et modalités réelles ; Cloudflare, Epomail ou un autre fournisseur n'est pas automatiquement sous-traitant du fait de son nom. |
| Destinataire | Personne physique ou morale à laquelle des données personnelles sont communiquées, selon l'article 4, paragraphe 9, du RGPD. Un service recevant l'IP par connexion directe du navigateur peut aussi être destinataire. |
| Tiers | Entité autre que la personne concernée, le responsable, le sous-traitant ou les personnes autorisées par le responsable à traiter les données, selon l'article 4, paragraphe 10, du RGPD. |
| Consentement | Manifestation affirmative libre, spécifique, éclairée et univoque, selon l'article 4, paragraphe 11, et l'article 7 du RGPD, révocable à tout moment aussi facilement qu'elle a été donnée. Connexion, poursuite de l'utilisation ou activation par défaut ne valent pas consentement au profilage facultatif ; l'absence de preuve de consentement ne permet pas de refuser l'arrêt d'un traitement sans base. |
| Violation de données | Incident de sécurité entraînant accidentellement ou illicitement la destruction, la perte, l'altération, la divulgation non autorisée ou l'accès non autorisé à des données personnelles, selon l'article 4, paragraphe 12, du RGPD. |
| Autorité de contrôle compétente | Autorité publique supervisant légalement les obligations de protection des données. Lorsque le RGPD s'applique, la personne concernée peut saisir l'autorité compétente selon l'article 77 du RGPD. |
| Transfert international | Transmission de données personnelles à un pays tiers ou une organisation internationale hors de l'Union européenne ou de l'Espace économique européen ; elle s'apprécie selon les lieux, entités et garanties réels, et non d'après le nom du serveur. |
| Catégories particulières de données | Données révélant l'origine raciale ou ethnique, les opinions politiques, les convictions religieuses ou philosophiques, l'appartenance syndicale, données génétiques, données biométriques utilisées pour identifier une personne de manière unique, données de santé, de vie sexuelle ou d'orientation sexuelle, selon l'article 9 du RGPD. Les préférences musicales et les recherches peuvent également révéler indirectement des caractéristiques sensibles et ne sont pas globalement sans risque. |
| Personne concernée | Personne physique identifiée ou identifiable dont les données sont traitées ; « vous » désigne ici la personne physique concernée qui formule une demande ou utilise le service. |

## 2. Termes techniques et du produit

| Terme | Définition |
| --- | --- |
| Instance hébergée | Déploiement de Sonic auquel l'opérateur du projet donne effectivement accès ; champ d'application, responsable, configuration et contacts figurent dans la [Politique de confidentialité](/fr/privacy-policy/). |
| Déploiement indépendant | Instance distincte exploitée par d'autres personnes. Le déployeur évalue lui-même l'identité du responsable, les lois, la configuration et l'information ; fournir du code MIT ne fait pas du projet son opérateur. |
| Plan de contrôle | Composants traitant les pages, le routage, le cache, la limitation de débit ou l'API edge ; peuvent avoir accès aux IP, cookies, en-têtes d'authentification, User-Agent, chemins et contexte. |
| Plan de données | Composants exécutant le moteur, les recommandations, la base et les services associés. L'audit a constaté que l'IP brute peut être transmise au moteur avec des cookies, en-têtes d'authentification ou du contexte ; on ne peut donc pas dire qu'il reçoit uniquement des données pseudonymes. |
| Epomail OAuth | Flux OAuth 2.0 de connexion par Epomail, avec PKCE ; peut renvoyer identifiant utilisateur, adresse électronique et indicateur de vérification, pseudonyme, URL d'avatar et rôle. |
| API Key / `jti` | Justificatif d'API signé et limité dans le temps, et son identifiant unique. La vérification de signature n'est pas un chiffrement ; cookies, copies de justificatifs et stockage de révocation doivent être évalués séparément. |
| fail-closed | Refus de la requête si la validation ou un stockage nécessaire échoue, plutôt qu'un repli silencieux ; son application réelle doit être vérifiée dans la configuration. |
| Défense SSRF et liste de domaines autorisés | Contrôles sortants concernant certaines adresses internes, de bouclage, de métadonnées cloud, les redirections ou domaines autorisés ; ne couvrent pas les connexions directes du navigateur ni tous les liens HTTP amont. |
| SQLite / WAL | Base SQLite pouvant assurer la persistance du plan de données et son mode de journalisation préalable des écritures ; ne signifie pas que profils, journaux, sauvegardes ou données radar sont tous dans la même base ou effacés au même terme. |
| Disjoncteur | Mécanisme modifiant temporairement le chemin des requêtes après des échecs ou dépassements de délai successifs ; seuils, repli et activation dépendent de la version et de la configuration réelles. |
| Événements comportementaux | Signaux pouvant servir aux recommandations : lectures, progression, sauts, favoris, refus, recherches ou retours sur des entités. Limites par lot, filtrage du bruit et conservation dépendent de la version et de la configuration. |
| Suggestions de recherche publiques | Fonction présentant à d'autres visiteurs des recherches antérieures ou statistiques. La réutilisation actuelle des termes bruts présente un risque et ne peut être simplement qualifiée d'agrégation anonyme. |
| Radar | Fonctions et états d'exploration, de recommandation ou de synchronisation fondés sur les données ou comportements des utilisateurs. Le chemin de persistance dans le moteur n'est pas confirmé ; des tentatives de synchronisation ou de stockage isolé existent, sans garantie de présence ou d'absence d'enregistrements durables en base. |
| Musique locale | Fichiers ou Blobs sur l'appareil utilisateur. Aucun chemin de téléversement des Blobs audio locaux vers le serveur n'a été constaté ; les requêtes de paroles et le contexte de recommandation peuvent néanmoins transmettre titre, artiste, album, durée ou identifiant. |
| Commentaires locaux | Brouillons ou contenus actuellement écrits dans localStorage ; cela ne signifie pas qu'ils ont été publiés sur un serveur de commentaires. La lecture de commentaires peut obtenir les noms, avatars et textes d'autres personnes et les faire entrer dans un cache public. |
| Connexion directe / proxy | Un proxy fait la requête côté serveur ; une connexion directe est effectuée par le navigateur vers le CDN de contenu. Le destinataire voit alors l'IP et les informations de connexion du navigateur ; les requêtes de flux peuvent utiliser le User-Agent du navigateur, pas nécessairement une valeur fixe. |
| Version et configuration | Les valeurs par défaut du code, `.env`, Compose et la production peuvent différer. GDStudio est activé par défaut dans le code en l'absence de réglage, mais l'environnement ou Compose peut le désactiver ; il faut vérifier la configuration réellement exécutée. |

## 3. Base d'interprétation

1. Les termes juridiques ne sont employés que si leurs conditions réelles sont remplies ; « projet personnel », « gratuit » et « open source » ne sont pas synonymes de responsable, sous-traitant, consentement, anonymisation ou conformité de sécurité.
2. Les termes techniques doivent être vérifiés à la fois dans le code, l'environnement réel et les chemins de requête des fournisseurs. Si les objectifs du README diffèrent de la documentation, ils ne doivent pas devenir des garanties. En cas d'écart entre code, configuration et pages, cessez les affirmations excessives et corrigez les pages concernées.
3. Le chinois simplifié est la référence de maintenance des documents juridiques ; les neuf autres langues sont des versions de traduction. Tout écart avec la version racine doit être synchronisé rapidement, sans préjudice du droit impératif ni du droit des consommateurs à la clarté et à la compréhension.
4. Dans la RC `a75f5cb`, les fichiers `LICENSE` de la racine et du lecteur sont MIT ; dans l'ancien `main@ce443c8`, seule la licence MIT du lecteur est vérifiable et aucune `LICENSE` n'a été trouvée à la racine. Les présentes définitions ne limitent pas la copie, la modification, la distribution ou l'utilisation commerciale effectivement autorisées par la licence applicable à chaque version et composant. La [Politique d'utilisation acceptable](/fr/acceptable-use/) de l'instance hébergée ne concerne que ses ressources réellement hébergées et les comportements liés au service.
5. Vérification de la source le 2026-11-02 : RC publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), distincte de l'ancien `main@ce443c8` (2026-10-27 UTC) ; aucun de ces états ne prouve la version en ligne.
