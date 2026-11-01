---
title: Lista de partilha com terceiros e transferências
description: "Lista de partilha com terceiros e transferências do Sonic: subcontratantes, fornecedor de identidade, fontes de conteúdos a montante, cadeias opcionais, exigências legais e garantias das transferências internacionais."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.3**

Esta página enumera na íntegra todas as situações de partilha de dados pessoais com terceiros pelo serviço Sonic (a seguir designado «o serviço»), incluindo os destinatários, os dados envolvidos e as garantias. Esta página desenvolve a secção 7 da [Política de Privacidade](/pt/privacy-policy/); o princípio da partilha é o mínimo necessário: não se vendem dados pessoais, não se partilha para fins publicitários e não se ultrapassa o necessário às funções do serviço.

![Mapa de partilha com terceiros do Sonic: seis canais (subcontratantes, fornecedor de identidade, fontes de conteúdos a montante, prestadores opcionais, exigências legais e transferências internacionais), todos centrados no operador e com os valores predefinidos dos interruptores assinalados](/images/sonic/sharing-map.svg)

*Figura: seis tipos de canais de partilha. O tipo A é o tratamento por subcontratante em uso contínuo; o tipo B é a autenticação necessária ao início de sessão; o tipo C é a obtenção de conteúdos acionada por consulta, sem identidade do utilizador; o tipo D está desativado por predefinição; o tipo E é a exceção legal; o tipo F são as garantias das transferências transfronteiriças.*

## 1. Subcontratantes (em uso contínuo)

| Destinatário | Conteúdo do serviço | Dados envolvidos | Garantias |
| --- | --- | --- | --- |
| Cloudflare Pages e Functions | Alojamento do frontend, gateway de API de edge, execução da limitação de taxa | Metadados de pedidos, registos temporários de limitação de taxa | Cláusulas de tratamento por subcontratante do artigo 28.º do RGPD |
| Cloudflare Tunnel | Túnel encriptado entre o plano de controlo e o plano de dados | Metadados de tráfego encriptado | Idem |
| Cloudflare KV e limitador | Contagens de limitação de taxa (expiração de 120 segundos), registos de revogação imediata de chaves (quando ativado) | Chaves de limitação por IP, registos de revogação de `jti` | Idem |

A Cloudflare, no conjunto, detém as certificações SOC 2 Type II e ISO/IEC 27001 e cobre as transferências transfronteiriças com as cláusulas contratuais-tipo da União Europeia. Quanto aos metadados dos pedidos ao nível da rede tratados pela Cloudflare segundo a sua própria política, veja-se a explicação na sua política de privacidade.

## 2. Fornecedor de identidade (necessário ao início de sessão)

| Destinatário | Conteúdo do serviço | Dados envolvidos | Descrição |
| --- | --- | --- | --- |
| Epomail (`mail.epocanvas.com`) | Início de sessão e autenticação via OAuth 2.0 (PKCE): autorização, troca de tokens, consulta userinfo (com token de acesso) | Devolvido no início de sessão: identificador de utilizador, endereço de correio eletrónico (sujeito a verificação), alcunha, link de avatar, papel da conta | O correio eletrónico não se escreve na base de dados do serviço, servindo apenas para derivar hashes dentro da sessão; o tratamento de dados entre si e a Epomail rege-se pela sua política de privacidade |

## 3. Fontes de conteúdos a montante (acionadas por consulta, sem identidade do utilizador)

Os pedidos recebidos pelos destinatários seguintes contêm apenas os parâmetros de consulta de músicas, um User-Agent fixo e o Referer do site oficial correspondente, **sem os dados da sua conta, cookies ou endereço IP**:

| Destinatário | Conteúdo do serviço | Domínios representativos | Estado por predefinição |
| --- | --- | --- | --- |
| Música NetEase Cloud | Pesquisa, endereços de reprodução, letras palavra a palavra (YRC), capas | `music.163.com`, `interface3.music.163.com`; adicionalmente via contentor auxiliar ncm-api na rede interna do plano de dados | Ativa |
| Música QQ | Pesquisa, endereços de reprodução, letras palavra a palavra (QRC), capas | `c.y.qq.com`, `u.y.qq.com`, `y.gtimg.cn`, `ws.stream.qqmusic.qq.com` | Ativa |
| Música KuGou | Pesquisa, endereços de reprodução, letras palavra a palavra (KRC) | `m.kugou.com`, `mobilecdn.kugou.com`, `songsearch.kugou.com`, `lyrics.kugou.com` | Ativa |
| Música KuWo | Pesquisa, endereços de reprodução, capas | `www.kuwo.cn`, `m.kuwo.cn`, `search.kuwo.cn` | Ativa |
| AMLL | Complemento de letras palavra a palavra (TTML) | `api.amll.dev` | Ativa |
| LRCLIB | Complemento de letras sincronizadas | `lrclib.net` | Ativa |
| CDN oficiais de conteúdos | Streams de áudio e capas (por predefinição obtidas via proxy de edge do serviço) | `music.126.net`, `ws.stream.qqmusic.qq.com`, entre outros | Ativa |

Notas:

1. O IP de saída dos pedidos a montante indica-se como o endereço de reserva configurado por quem implanta (por predefinição, o endereço de documentação RFC 5737), e não o IP de qualquer utilizador;
2. Por predefinição, as streams de áudio obtêm-se através do proxy de edge e o CDN a montante vê apenas o endereço do servidor proxy; invocando expressamente o modo de ligação direta `?mode=redirect`, o seu navegador estabelece a ligação diretamente a esse CDN e o seu IP fica visível para esse CDN (semântica inerente ao redirecionamento 302); o leitor web não utiliza este modo;
3. Quem implanta pode montar o seu catálogo licenciado com as próprias credenciais de membro (`NETEASE_COOKIE`/`QQ_COOKIE`/`KUGOU_COOKIE`); essas credenciais são dados da conta de quem implanta, sem relação com os utilizadores finais, e o código não incorpora quaisquer cookies de contas reais.

## 4. Cadeias opcionais desativadas por predefinição

As cadeias seguintes desativam-se rigorosamente por predefinição e ocorrem apenas após a ativação expressa de quem implanta:

| Destinatário | Conteúdo do serviço | Dados envolvidos | Interruptor e valor predefinido |
| --- | --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Pesquisa agregada de terceiros e reserva para o complemento entre fontes | Apenas identificadores de faixas, tipo e parâmetros de origem | `SONIC_ENABLE_GDSTUDIO`, predefinição 0 |
| Lyriva (`api.lyriva.xyz`) | Fonte alternativa de letras | Apenas parâmetros de identificadores de faixas | `SONIC_ENABLE_LYRIVA`, predefinição 0 |
| ListenBrainz / MusicBrainz (`labs.api.listenbrainz.org`, entre outros) | Reforço de artistas semelhantes | Apenas identificadores de artistas/gravações | `SONIC_ENABLE_LISTENBRAINZ`, predefinição 0 |
| Complemento entre fontes | Correspondência entre plataformas da faixa completa para as faixas em amostra (faixas gratuitas da QQ, KuGou e KuWo) | Apenas metadados das faixas (duração, título, artista) | Ativa por predefinição, sem dados de identidade |
| Gorse (motor de recomendação instalado por quem implanta) | Filtragem colaborativa externa | Identificadores hash pseudonimizados (`subject_key`) e feedback comportamental | `SONIC_GORSE_URL`, predefinição vazia |

## 5. Partilha por exigência legal

O operador fornece dados pessoais apenas quando o pedido tiver fundamento legal concreto: verifica a legalidade e o âmbito do pedido, não fornece voluntariamente conteúdo que exceda esse âmbito e notifica previamente os titulares afetados nos limites permitidos pela lei (salvo quando a lei proíba a notificação). O serviço não aceita levantamentos arbitrários sem fundamento legal. Todo o tratamento dos pedidos legais fica registado em dossier.

## 6. Transferências internacionais

O plano de controlo do serviço corre na rede global de edge da Cloudflare e os eventos comportamentais armazenam-se no nó do plano de dados do operador; os seus dados pessoais podem tratar-se em nós fora do país do operador. Garantias das transferências:

1. Ao abrigo dos artigos 44.º a 46.º do RGPD: a decisão de adequação da Comissão Europeia (o artigo 45.º) ou as cláusulas contratuais-tipo aprovadas (o artigo 46.º, n.º 2, alínea c) do RGPD) constituem a base da relação de alojamento e de tratamento por subcontratante;
2. Confiança nas certificações de proteção de dados da Cloudflare (SOC 2 Type II, ISO/IEC 27001) e no respetivo anexo de tratamento de dados;
3. Os pedidos às fontes de conteúdos a montante não contêm dados pessoais e não constituem transferência internacional de dados pessoais (ver a secção 3).

Quem opera implantação própria deve avaliar por si as transferências internacionais na sua forma de implantação e assegurar a conformidade com os requisitos legais do seu local (Capítulo V do RGPD ou o regime local correspondente).

## 7. Manutenção da lista

1. Antes de acrescentar um novo destinatário de partilha, o operador regista-o nesta página e atualiza a data de entrada em vigor e o número de versão, comunicando previamente as alterações substanciais por aviso no site;
2. Havendo divergência entre esta lista e a configuração do código-fonte, prevalece o código-fonte e esta página corrige-se de imediato;
3. Quem opera implantação própria deve manter a sua própria lista de terceiros conforme a sua configuração efetiva: as cadeias não ativadas devem eliminar-se da sua informação, evitando a divulgação excessiva ou a divulgação falsa.
