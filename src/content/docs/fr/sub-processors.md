---
title: Liste des partages avec des tiers et des transferts
description: Infrastructure, services d'identité, destinataires de contenus et ressources externes, différences de configuration et limites des transferts internationaux des instances hébergées Sonic.
---

**Date de révision : 3 novembre 2026｜Version : 1.9**

Cette page développe la section 7 de la [Politique de confidentialité](/fr/privacy-policy/) et décrit les destinataires pouvant intervenir dans les instances de test hébergées de Sonic, maintenues par une personne, gratuites et à but non lucratif. La présence d'une intégration dans le code ne prouve ni son activation ni la licéité d'un partage. Les instances déployées indépendamment doivent fournir une information distincte selon leurs traitements réels.

Les fonctionnalités décrites reposent sur la branche candidate publique `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, vérifiée le 2026-11-02. L'ancien `main@ce443c8` (2026-10-27 UTC) diffère ; aucun de ces états du code ne prouve la version effectivement déployée en ligne. Les contrats fournisseurs ne sont pas certifiés. Le chinois simplifié est la référence de maintenance du site ; les neuf autres versions linguistiques sont des traductions. Aucune clause de priorité linguistique ne réduit le droit impératif ni le droit des consommateurs à des conditions claires et compréhensibles.

![Carte des partages avec des tiers de Sonic : infrastructure, identité, sources de contenu, chemins facultatifs, exigences légales et transferts internationaux](/images/sonic/sharing-map.svg)

*Figure : les destinataires sont classés par fonction ; les étiquettes de configuration ou de garanties ne prouvent ni l'activation réelle, ni les contrats, ni les bases des transferts.*

## 1. Infrastructure et relations de sous-traitance

| Entité | Fonction | Données possibles et limites de configuration |
| --- | --- | --- |
| Cloudflare Pages et Functions | Hébergement, API edge, cache et limitation de débit | IP, chemins, en-têtes et métadonnées de connexion ; les enregistrements précis dépendent de la configuration de l'instance et du fournisseur |
| Cloudflare Tunnel | Canal entre l'edge et le plan de données | Trafic des requêtes et métadonnées de connexion ; le tunnel ne chiffre pas automatiquement tous les chemins HTTP internes ou amont |
| Cloudflare KV et limiteurs de débit | Stockage configurable pour la limitation et la révocation des justificatifs, notamment | IP ou clés dérivées de l'identité, identifiants de révocation ; activation et durées à vérifier |
| Fournisseur de l'hôte ou de l'hébergement du plan de données | Environnement du moteur, de la base et des journaux | Le moteur peut recevoir de l'edge l'IP brute, des cookies, en-têtes d'authentification et du contexte ; identité de l'hébergeur et pays des nœuds non vérifiés |

La qualification de sous-traitant dépend de la personne qui détermine les finalités, de celle qui agit sur instruction et des modalités réelles ; le seul nom du produit ne suffit pas. Lorsque le RGPD s'applique et qu'une relation de sous-traitance existe, les dispositions requises par l'article 28 du RGPD doivent être mises en œuvre. Cette page ne prétend pas qu'un contrat a été signé ou vérifié. L'identité complète du responsable et des coordonnées permettant de le joindre valablement restent à compléter ; voir la section 2 de la [Politique de confidentialité](/fr/privacy-policy/).

## 2. Fournisseur d'identité nécessaire à la connexion

Epomail (`mail.epocanvas.com`) fournit la connexion OAuth. Le navigateur interagit avec le service d'identité ; Sonic échange le code d'autorisation et consulte les données utilisateur, pouvant recevoir l'identifiant utilisateur, l'adresse électronique et son indicateur de vérification, le pseudonyme, l'URL d'avatar et le rôle. Certaines données sont conservées dans le stockage `auth` du navigateur et dans la session signée, et non « uniquement en mémoire ».

L'intégration de connexion ou une marque commune ne fait pas automatiquement d'Epomail un sous-traitant de Sonic. Les traitements indépendants de son système de comptes et les traitements sur instruction doivent être appréciés séparément selon les finalités et modalités réelles. Sonic reste responsable de la réception, de la conservation et des divulgations ultérieures qu'il décide.

## 3. Sources de contenu amont et connexions directes du navigateur

| Source | Usage principal | Données susceptibles d'être transmises ou reçues |
| --- | --- | --- |
| NetEase Cloud Music, QQ Music, Kugou, Kuwo et CDN associés | Recherche, audio, MV, pochettes et données de contenu | Texte original des recherches, identifiants et métadonnées de contenu ; informations de connexion de la sortie du proxy ou du navigateur en accès direct |
| AMLL, LRCLIB | Recherche et complément de paroles | Identifiants de morceaux ou informations de correspondance telles que titre et artiste, ainsi que métadonnées de connexion |
| Google Fonts | Chargement de polices | IP du navigateur, User-Agent et autres informations de connexion |
| DiceBear | Avatars externes | Le chemin actuel peut inclure l'adresse électronique en clair dans le paramètre `seed` de l'URL et exposer les informations de connexion du navigateur |

Le proxy audio peut faire apparaître sa propre adresse de sortie au CDN de contenu, sans que toutes les requêtes soient pour autant exemptes de données personnelles. Les requêtes de flux peuvent utiliser le User-Agent du navigateur plutôt qu'une valeur fixe commune ; les MV, pochettes, polices et avatars peuvent être demandés directement par le navigateur. Certains fournisseurs utilisent HTTP ; TLS sur toute la chaîne ne peut être garanti. Le `seed` DiceBear contenant l'adresse électronique doit être remplacé par un avatar local ou un identifiant sans courriel.

Les commentaires amont contiennent des noms ou pseudonymes, avatars et textes d'autres personnes et peuvent entrer dans un cache public ; les finalités comprennent l'affichage des commentaires du MV demandé. Leurs auteurs ne sont pas parties au contrat de connexion à ce service : leurs données ne peuvent pas être traitées sur le seul fondement de l'article 6, paragraphe 1, point b) du RGPD. Lorsque le RGPD s'applique, une source publique ne dispense pas automatiquement de l'information sur la collecte indirecte prévue à l'article 14 du RGPD. L'opérateur doit évaluer et documenter une base indépendante de traitement, les durées de conservation et les exceptions à l'information, puis fournir l'information applicable dans les délais légaux. Si les garanties nécessaires ne sont pas en place, la collecte ou le cache public doit être désactivé ; il n'est pas promis de pouvoir contacter individuellement chaque auteur. Les commentaires rédigés localement sont actuellement enregistrés uniquement dans localStorage ; aucun chemin de publication vers un serveur de commentaires n'a été constaté.

Aucun chemin de téléversement du corps des fichiers audio locaux n'a été constaté, mais la recherche de paroles correspondantes ou le contexte de recommandation peut envoyer titre, artiste, album, durée ou identifiant. Les pochettes intégrées extraites en data URL peuvent aussi être envoyées avec un événement de favori et entrer dans le catalogue distant partagé de morceaux, puis être renvoyées par la recherche à l'échelle du site ou les suggestions publiques. La réinitialisation du profil ne garantit pas le nettoyage de ce catalogue ni de ses index externes ; le corps audio non téléversé ne signifie donc pas que les images et métadonnées associées restent sur l'appareil.

## 4. Chemins facultatifs et différences de configuration

| Chemin | Usage et données possibles | Limite de la vérification |
| --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Recherche agrégée et complément entre sources ; requêtes ou identifiants de contenu | Activé par défaut dans le code si le réglage est absent, mais désactivé dans l'exemple d'environnement et Compose ; état réel à vérifier |
| Lyriva (`api.lyriva.xyz`) | Source de secours de paroles ; identifiants ou paramètres de correspondance | Dépend notamment de `SONIC_ENABLE_LYRIVA` |
| Musixmatch (`apic-desktop.musixmatch.com`) | Complément de paroles | L'implémentation est conservée dans la RC, mais `isSourceEnabledByPolicy` ne comporte pas de branche Musixmatch et l'appel réel est bloqué par la condition false ; l'ancien fallback de paroles de `main` peut être appelable et doit être vérifié selon le déploiement ; il ne faut pas décrire la RC comme activée ni comme disponible par un simple réglage |
| Service d'alerte configuré par l'opérateur | Uniquement si `SONIC_ALERT_WEBHOOK_URL` est valide et qu'une alerte se déclenche ; compteurs système, version de publication, horodatage, résumé avec justificatifs masqués et IP de sortie du nœud émetteur | Activation, destinataire, rôles, transfert et conservation dépendent de l'instance ; les notes d'administrateur et erreurs peuvent contenir des données personnelles, et le masquage n'est pas une anonymisation |
| ListenBrainz / MusicBrainz | Amélioration des artistes similaires ; identifiants d'artistes ou d'enregistrements | Dépend notamment de `SONIC_ENABLE_LISTENBRAINZ` |
| Gorse | Recommandation externe ; identifiants pseudonymes, retours comportementaux, horodatages, identifiants de morceaux, étiquettes, titres et artistes du catalogue | Intégration via `SONIC_GORSE_URL` et d'autres réglages ; la réinitialisation actuelle ne garantit pas l'effacement des retours externes ni des fiches de morceaux |
| Meilisearch | Service de recherche facultatif ; requêtes brutes et données de catalogue | Intégration et durées à vérifier selon l'instance ; les requêtes ne doivent pas être considérées comme anonymes |
| Complément entre sources | Correspondance de contenus entre plateformes ; métadonnées de morceaux | Les requêtes réelles dépendent du chemin de correspondance ; une fonction disponible ne prouve pas une autorisation sur le contenu |

Une configuration d'activation n'est pas un consentement utilisateur. La lacune de consentement liée à la personnalisation et à Auto DJ activés par défaut est décrite à la section 5 de la [Politique de confidentialité](/fr/privacy-policy/). Les traitements facultatifs sans base et choix nécessaires doivent être suspendus ; changer le nom du tiers ne permet pas de contourner ces exigences.

## 5. Partage sur exigence légale

Lors d'une demande de communication, il faut vérifier l'identité du demandeur, sa compétence, la base précise et la portée de la demande, ne fournir que les données légalement nécessaires et documenter les motifs. L'information des personnes dépend du droit applicable et des restrictions valables ; un signalement, un soupçon de violation ou l'arrêt du service n'entraîne pas automatiquement la remise de toutes les données à la police.

L'obligation légale fondant une divulgation ne remplace pas les exigences relatives aux transferts internationaux. Avant de soumettre un problème dans une Issue publique ou une communauté, retirez les données personnelles, justificatifs d'authentification et informations privées présentes dans les commentaires d'autrui.

## 6. Transferts internationaux

L'application du RGPD s'apprécie selon l'article 3 du RGPD ; la gratuité, le caractère non lucratif ou la seule accessibilité depuis l'Union européenne ne l'excluent ni ne l'établissent automatiquement. Si le chapitre V du RGPD s'applique à un transfert précis de données personnelles, le site doit vérifier au cas par cas, selon le destinataire, le lieu et les rôles réels, les exigences de l'article 44 du RGPD, la décision d'adéquation applicable de l'article 45 du RGPD ou d'autres garanties valables de l'article 46 du RGPD. Toute IP étrangère ou requête de contenu ne doit pas être systématiquement qualifiée de transfert relevant du chapitre V. Le site ne transforme pas l'ensemble du RGPD en garantie contractuelle mondiale et n'a pas vérifié le lieu d'établissement du responsable, les pays du plan de données ni les destinations de toutes les requêtes. Il ne peut être présumé que l'hébergement est à Taïwan ou qu'un ordre juridique déterminé s'applique.

1. Les transferts vers des pays tiers auxquels le RGPD s'applique doivent satisfaire individuellement à l'article 44 du RGPD ; il faut vérifier l'existence d'une décision d'adéquation applicable au titre de l'article 45 du RGPD ou d'autres garanties valables au titre de l'article 46 du RGPD.
2. L'utilisation de clauses contractuelles types exige encore de confirmer les parties concernées, la portée du traitement, l'évaluation du transfert et les mesures supplémentaires nécessaires. La publication de clauses par un fournisseur ne prouve pas leur mise en œuvre pour cette instance.
3. Les certifications ISO / SOC, les politiques de confidentialité des fournisseurs ou l'acceptation de cette page ne constituent pas automatiquement une base licite de transfert. Les textes de recherche, IP et identifiants pseudonymes ne peuvent pas être exclus globalement des données personnelles.
4. Une description ou une copie des garanties peut être demandée conformément à la loi à `privacy@epocanvas.com`. Les secrets commerciaux nécessaires peuvent être occultés de manière appropriée, sans que la confidentialité supprime les obligations légales de transparence.

## 7. Maintenance de la liste

Avant d'activer un nouveau traitement ou destinataire, l'opérateur doit vérifier finalités, base, catégories de données, durées, nœuds et rôles réels, puis mettre à jour l'information en temps utile ; un nouveau consentement doit être recueilli séparément lorsqu'il est requis. Ce document ne prouve pas l'achèvement de ces démarches et n'autorise pas une activation au seul motif que le code comporte le chemin correspondant.

Si la liste ne correspond pas au traitement réel, il faut corriger l'information et remédier aux transferts inadéquats, et non simplement déclarer que « le code fait foi ». Les responsabilités des déployeurs indépendants découlent du droit et des licences réellement applicables ; copier cette page ne crée pas d'obligations contractuelles supplémentaires envers l'auteur du projet. Signalements : `privacy@epocanvas.com`.
