---
title: Definições de termos
description: "Definições dos termos dos documentos legais do Sonic: terminologia legal (vocabulário do RGPD) e terminologia técnica, usadas de forma uniforme em todo o site."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.3**

Esta página define a terminologia legal e a terminologia técnica usadas nos documentos legais deste site. O mesmo termo tem o mesmo significado em todos os documentos; os termos definidos interpretam-se conforme a definição, e os não definidos, conforme o seu sentido usual. A terminologia legal baseia-se nas definições do Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia.

![Mapa de termos do Sonic: duas famílias de definições (família da terminologia legal, vocabulário do RGPD, e família da terminologia técnica), usadas de forma uniforme em todo o site, com a versão em Chinês Simplificado como base de interpretação](/images/sonic/key-terms-map.svg)

*Figura: estrutura em duas famílias da terminologia deste site. A família da terminologia legal ancora-se nas definições do artigo 4.º do RGPD; a família da terminologia técnica prevalece conforme a implementação do código-fonte, conferindo-se a cada atualização de versão.*

## 1. Terminologia legal

| Termo | Definição |
| --- | --- |
| Dados pessoais | Qualquer informação relativa a uma pessoa singular identificada ou identificável (o artigo 4.º, n.º 1, do RGPD); no Sonic, por exemplo, o identificador de início de sessão e os registos de eventos comportamentais |
| Tratamento | Qualquer operação efetuada sobre dados pessoais, incluindo recolha, registo, armazenamento, utilização, transmissão e eliminação (o artigo 4.º, n.º 2, do RGPD) |
| Limitação do tratamento | Situação em que o tratamento se suspende temporariamente, com conservação dos dados, em casos específicos (o artigo 4.º, n.º 3, e o artigo 18.º do RGPD) |
| Elaboração de perfis | Qualquer forma de avaliação automatizada de características pessoais, incluindo a análise destinada a tomar decisões ou a extrair conclusões (o artigo 4.º, n.º 4, do RGPD); o serviço fá-lo apenas no âmbito necessário à função de recomendação, e pode limpar o perfil com um clique |
| Pseudonimização | Tratamento de dados pessoais de modo a que não possam atribuir-se a um titular sem informação suplementar (o artigo 4.º, n.º 5, do RGPD); o Sonic concretiza-o com hash SHA-256 truncado com sal |
| Responsável pelo tratamento | A pessoa singular ou coletiva que determina as finalidades e os meios do tratamento (o artigo 4.º, n.º 7, do RGPD); nas instâncias geridas, a equipa de operação; nas de implantação própria, quem implantou |
| Subcontratante | A pessoa singular ou coletiva que trata dados pessoais por conta do responsável (o artigo 4.º, n.º 8, do RGPD), por exemplo a Cloudflare |
| Destinatário | A pessoa singular ou coletiva a quem os dados pessoais se comunicam (o artigo 4.º, n.º 9, do RGPD), terceiro ou não |
| Terceiro | A entidade que não o titular, o responsável, o subcontratante nem qualquer pessoa autorizada a tratar dados sob autoridade direta do responsável ou do subcontratante (o artigo 4.º, n.º 10, do RGPD) |
| Consentimento | A manifestação de vontade, livre, específica e informada, pela qual o titular aceita (o artigo 4.º, n.º 11, e o artigo 7.º do RGPD); pode retirar-se a qualquer momento por meio tão fácil como o da sua prestação |
| Violação de dados | A falha de segurança que provoque a destruição, a perda ou a alteração acidental ou ilícita, ou a divulgação ou o acesso não autorizados, de dados pessoais (o artigo 4.º, n.º 12, do RGPD) |
| Autoridade de controlo | A autoridade pública que, por lei, supervisiona o cumprimento das obrigações de proteção de dados (o artigo 4.º, n.º 19, do RGPD); os utilizadores da União Europeia podem reclamar junto da autoridade de controlo do seu local (o artigo 77.º do RGPD) |
| Transferência internacional | A transferência de dados pessoais para um país terceiro ou uma organização internacional fora da União Europeia e do Espaço Económico Europeu (Capítulo V do RGPD) |
| Categorias especiais de dados | Dados pessoais que revelem raça, opiniões políticas, saúde, vida sexual e outros atributos sensíveis (o artigo 9.º do RGPD); o serviço não os recolhe |
| Titular dos dados | A pessoa singular identificada ou identificável pelos dados pessoais (o artigo 4.º, n.º 25, do RGPD), ou seja, você |

## 2. Terminologia técnica

| Termo | Definição |
| --- | --- |
| Plano de controlo | Gateway de edge que corre nas Cloudflare Pages Functions, encarregue do encaminhamento, da limitação de taxa, da cache e do circuit breaker |
| Plano de dados | Pilha Docker Compose que corre no nó Linux próprio do operador, encarregue da análise de protocolos, do cálculo das recomendações e do armazenamento |
| sonic-engine | Contentor principal do plano de dados (Node.js 22), com verificação obrigatória da chave entre serviços X-Sonic-Engine-Key e ligação, no lado do anfitrião, apenas ao endereço de loopback |
| ncm-api sidecar | Contentor auxiliar do protocolo NetEase, fechado na rede interna (`ncm-api:3000`), acessível apenas pela rede interna do compose |
| OAuth 2.0 + PKCE | Fluxo de início de sessão de modo de código de autorização com chave de prova para troca de código (S256); o serviço usa a Epomail como fornecedor de identidade |
| API Key | Chave assinada versionada com HMAC-SHA256, no formato `sonic_live_v2.<header>.<payload>.<signature>`; o payload inclui `sub`/`iat`/`exp`/`jti`/`kid`/`role`/`uid`; transmitida apenas por cabeçalhos de pedido |
| jti | Identificador da chave no payload da chave de API, usado nas listas de revogação e na invalidação imediata no término de sessão |
| fail-closed | Política de segurança que recusa o serviço quando a validação falha; o Sonic aplica fail-closed às chaves sem assinatura, às chaves de versões antigas e às falhas de armazenamento em produção |
| Defesa SSRF | Bloqueio dos pedidos de saída para endereços de loopback, redes privadas RFC 1918, pontes Docker e endereços de metadados da nuvem, com verificação em pilha dupla IPv4/IPv6 e nova verificação nos redirecionamentos |
| Lista branca de domínios | Os proxies de áudio, de capas e de reencaminhamento admitem apenas destinos HTTPS dentro da lista controlada de domínios de CDN musicais (`SONIC_ALLOWED_MUSIC_DOMAINS`) |
| SQLite WAL | Armazenamento persistente dos eventos comportamentais e dos pesos das entidades no plano de dados, em modo Write-Ahead Logging, no volume nomeado `sonic-data` |
| Circuit breaker | Máquina de estados de três estados (CLOSED/OPEN/HALF_OPEN); entra em circuito aberto após 3 falhas consecutivas ou orçamento excedido de 4,5 segundos, com recuperação por sondagem após 30 segundos de arrefecimento |
| Modo degradado de edge | Estado de contingência em que, com o plano de dados offline, a camada de edge liga diretamente às interfaces públicas de letras e pesquisa; o cabeçalho de resposta assinala `X-Sonic-Degraded: 1` e a interface exibe o aviso de degradação |
| Cache de edge | Cache de edge com chave `sonic:*`, período de frescura de 8 minutos e entrada em estado de prorrogação de contingência após a expiração |
| Range 206 | Mecanismo de carregamento por segmentos HTTP; as streams de áudio respondem, por predefinição via proxy de edge, com 206 Partial Content |
| Modo de ligação direta | Redirecionamento 302 de `?mode=redirect`, pelo qual o seu navegador estabelece a ligação diretamente ao CDN oficial; o leitor web não o utiliza |
| YRC/QRC/KRC | Formatos de letras palavra a palavra da NetEase, QQ e KuGou; o serviço analisa nativamente o respetivo encapsulamento de encriptação e compressão (XOR + Deflate) |
| TTML | Formato de linguagem de marcação temporal das letras palavra a palavra da AMLL |
| LRCLIB | Base global aberta de letras sincronizadas, fonte de complemento quando faltam letras locais |
| Deteção de amostras | Sondagem da duração e dos metadados das entidades de áudio para identificar os cortes oficiais de amostra de 30 segundos e indicá-los com selo expresso |
| Complemento entre fontes | Mecanismo de correspondência entre plataformas da faixa completa acionado pelas faixas em amostra, ativo por predefinição, com indicação da origem substituta em caso de sucesso |
| Eventos comportamentais | Registos de sinais de recomendação como reprodução, conclusão, salto, favorito e rejeição; máximo de 50 por lote e 64 KB; os eventos de ruído (paragens, trocas por corte de amostra) não entram na base de dados |
| Limpeza do perfil com um clique | `DELETE /api/sonic/events` destrói de imediato todas as características e registos comportamentais no motor de recomendação |
| Resumo do perfil de recomendação | Resumo do perfil devolvido por `GET /api/sonic/events`: total de eventos, contagens de favoritos e rejeições, artistas mais ouvidos, tendências de género, termos de pesquisa recentes, forma de armazenamento |
| X-Sonic-Context | Contexto local do cliente incluído nos pedidos de recomendação (números limitados de favoritos, artistas recentes e termos de pesquisa recentes), usado apenas em memória, sem persistência |
| Filtragem de ruído | Mecanismo pelo qual o servidor atribui peso zero e não regista as trocas de faixa de 6 causas não imputáveis ao utilizador (network_stall/playback_error/trial_end/stream_unavailable/buffer_timeout/auto_switch_error) |

## 3. Base de interpretação

1. A terminologia legal interpreta-se com base no texto oficial do RGPD; a terminologia técnica interpreta-se conforme a implementação do código-fonte; havendo divergência entre o código-fonte e este documento, deve corrigir-se o documento e reportar um Issue no repositório de código.
2. Os documentos legais deste site têm como versão oficial a versão em Chinês Simplificado; nas versões de referência noutras línguas, a tradução dos termos segue as correspondências desta página.
