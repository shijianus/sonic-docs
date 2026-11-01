---
title: Apresentação do projeto
description: "Apresentação do projeto epocanvas sonic: posicionamento do produto, funcionalidades principais, arquitetura técnica, motor de recomendação, desenho de segurança e privacidade, âmbito de aplicação, formas de implantação e guia de leitura da documentação."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.3**

Esta página apresenta o posicionamento do produto epocanvas sonic (a seguir designado «Sonic» ou «o projeto»), as suas funcionalidades principais, a arquitetura do sistema, o desenho de segurança e privacidade, o âmbito de aplicação e as formas de implantação, e indica o percurso de leitura da documentação deste site. Quer pretenda utilizar a instância gerida, implantar a sua própria ou conhecer as disposições de privacidade e dos termos, pode começar por esta página. Os instrumentos legais do Sonic constam da [Política de Privacidade](/pt/privacy-policy/) e dos [Termos de Utilização](/pt/terms-of-service/).

![Arquitetura de duas camadas do Sonic: os utilizadores acedem ao plano de controlo na edge da Cloudflare (encaminhamento, limitação de taxa, cache, corte de circuito); o plano de dados em Linux executa a análise de protocolos, o cálculo das recomendações e o armazenamento SQLite; as streams de áudio são, por predefinição, obtidas dos CDN oficiais através do proxy de edge](/images/sonic/project-architecture.svg)

*Figura: arquitetura do Sonic com separação entre o plano de controlo e o plano de dados. O plano de controlo corre na edge do Cloudflare Pages; o plano de dados corre em nós Linux próprios do operador, comunica através de um túnel encriptado e impõe a verificação da chave entre serviços; as streams de áudio são obtidas, por predefinição, dos CDN oficiais através do proxy de edge (Range 206), com o modo de ligação direta 302 opcional.*

## 1. Posicionamento do projeto

O Sonic é uma plataforma de streaming musical multifuente e um gateway de agregação desenvolvidos de forma independente, que funciona com uma arquitetura de duas camadas «plano de controlo na edge da Cloudflare + plano de dados com motor de protocolos local em Linux», concebida para streaming de alta qualidade sonora, letras palavra a palavra sincronizadas ao milissegundo e uma experiência de recomendação autónoma e controlável pelo utilizador. O projeto é software de código aberto, com o código-fonte publicado, e qualquer pessoa o pode implantar por si.

| Elemento | Descrição |
| --- | --- |
| Instância gerida | `sonic.epocanvas.tech` (site principal) e `sonic.epocanvas.com` (espelho de reserva), operadas pela equipa de operação |
| Instância de implantação própria | Instância privada implantada por qualquer pessoa singular ou organização nos seus próprios servidores, com base no código aberto; quem implanta é o operador e o responsável pelo tratamento dessa instância |
| Licenciamento do código-fonte | Regido pelo ficheiro `LICENSE` na raiz do repositório (MIT License); o projeto posiciona-se como um projeto de código aberto não comercial e os README históricos declararam a intenção de adotar CC BY-NC-SA 4.0, prevalecendo o ficheiro `LICENSE` até decisão dos mantenedores; as marcas e os sinais distintivos de marca não são licenciados com o código-fonte |
| Modo de início de sessão | OAuth 2.0 da Epomail (PKCE); o projeto não mantém sistema de registo autónomo |
| Composição do software | Frontend e funções de edge do Cloudflare Pages (plano de controlo); motor local Node.js 22 e contentor auxiliar ncm-api (plano de dados); leitor web em Vue 3 |

## 2. Panorama das funcionalidades principais

![Interface real do leitor do Sonic: navegação à esquerda (Explorar, A minha música, Sistema), página inicial com carrossel de recomendações, recomendação inteligente e radar musical, playlists recomendadas, e barra de leitura mini no rodapé](/images/sonic/ui/ui-home.png)

*Figura: funcionamento real do leitor web da instância gerida. A visita detalhada, função a função, consta da [Interface e funcionalidades](/pt/interface/).*

| Capacidade | Descrição |
| --- | --- |
| Pesquisa agregada multifuente | Recuperação isomórfica em todas as fontes com tolerância a falhas: normalização de caracteres simplificado/tradicional, pesquisa por pinyin e iniciais, correspondência simétrica de alcunhas de artistas em chinês e em inglês, tolerância ortográfica por distância de edição e reconhecimento de versões; recuperação paralela de múltiplas fontes com fusão e desduplicação por expressão regular |
| Letras dinâmicas palavra a palavra | Análise inversa nativa de YRC da NetEase, QRC da QQ e KRC da KuGou (desencriptação XOR + descompressão Deflate), continuada por AMLL TTML e pela base global de letras LRCLIB; letras multilingues, romanização e traduções sincronizadas ao milissegundo |
| Níveis de qualidade e transparência das amostras | A sondagem rigorosa das entidades distingue as faixas completas dos cortes oficiais de amostra de 30 segundos, apresentando uma amostra nunca como faixa completa; as faixas em amostra acionam automaticamente o complemento da faixa completa entre fontes (configurável), com a origem do complemento indicada de forma transparente |
| Recomendação inteligente e Auto DJ | Motor de recomendação ligeiro local: modelo de popularidade multifatorial, intenção de pesquisa por sessão, quantificação do feedback comportamental, semelhança de conteúdo com reordenação de diversidade por MMR; sem necessidade de cluster externo de big data |
| Gestão autónoma dos eventos comportamentais | Os sinais de reprodução, conclusão, salto, favorito e rejeição podem desativar-se a qualquer momento; «limpar o perfil com um clique» destrói de imediato todos os registos comportamentais no servidor |
| Segurança zero trust | Chaves de API assinadas com HMAC-SHA256 e versionadas, OAuth com PKCE, interceção SSRF em toda a cadeia, chaves transmitidas apenas em cabeçalhos de pedido |
| Contingência e degradação | Com o plano de dados offline, a camada de edge comuta para o modo degradado em 0 ms, com o aviso expresso «modo degradado de edge» na interface, mantendo estável a reprodução das faixas já carregadas |

## 3. Panorama da arquitetura técnica

### 3.1 Plano de controlo (edge da Cloudflare)

O plano de controlo corre no Cloudflare Pages e nas Pages Functions e desempenha as funções seguintes:

1. Encaminhamento e autenticação: ponto de entrada unificado dos pedidos de API, com verificação de autenticação e validação de chaves assinadas;
2. Limitação de taxa escalonada: 240 pedidos anónimos por minuto e 600 pedidos autenticados por minuto (valores predefinidos, configuráveis), além de uma limitação dedicada de 30 pedidos por minuto por IP nos endpoints de autenticação;
3. Cache multinível: cache de edge com chave `sonic:*`, janela de frescura de 8 minutos e estado de prorrogação de contingência após a expiração;
4. Circuit breaker de três estados: 3 falhas consecutivas ou uma chamada que exceda o orçamento de 4,5 segundos abrem o circuito; os pedidos seguintes comutam em 0 ms para a resposta direta de reserva na edge (interfaces de pesquisa públicas da QQ e da KuGou e AMLL/LRCLIB); após 30 segundos de arrefecimento entra em HALF_OPEN para sondagem, fechando em caso de sucesso. As respostas degradadas transportam `X-Sonic-Degraded: 1` e o leitor exibe uma cápsula de aviso de degradação no topo.

### 3.2 Plano de dados (motor de protocolos em Linux)

O plano de dados é uma pilha Docker Compose num nó Linux próprio do operador:

| Componente | Descrição |
| --- | --- |
| Contentor principal sonic-engine | Serviço HTTP em Node.js 22 à escuta no porto 8080, mapeado apenas para `127.0.0.1` no lado do anfitrião; todas as rotas `/api`, `/proxy` e `/palette` impõem a verificação da chave entre serviços (X-Sonic-Engine-Key) |
| Contentor auxiliar ncm-api | Auxiliar do protocolo NetEase Cloud, acessível apenas na rede interna do compose (`ncm-api:3000`), sem exposição à Internet pública |
| SQLite 3 (modo WAL) | Armazenamento persistente dos eventos comportamentais e dos pesos das entidades, gravado no volume nomeado `sonic-data` (`/app/data/sonic-recommend.sqlite` dentro do contentor); as cópias de segurança executam-se com snapshots consistentes (VACUUM INTO) acompanhados de verificação de integridade |
| Módulos de protocolo nativos | Análise dos protocolos NetEase linuxapi/eapi, QQ, KRC da KuGou e KuWo, implementada em TypeScript puro |

O plano de controlo e o plano de dados comunicam através do túnel encriptado Cloudflare Tunnel; o plano de dados não expõe portos diretamente à Internet pública.

### 3.3 Percurso das streams de áudio

Por predefinição, as streams de áudio são obtidas dos CDN oficiais através do proxy de edge (proxy de intervalo de bytes na mesma origem), com suporte para carregamento por segmentos HTTP `Range` e `206 Partial Content`: o CDN a montante vê apenas o endereço do servidor proxy e nunca o IP do cliente. O modo de ligação direta 302 de `?mode=redirect` destina-se apenas a utilizadores da API que o invoquem expressamente (o leitor web não o utiliza); no modo de ligação direta, o seu navegador estabelece a ligação diretamente ao CDN oficial.

## 4. Cadeia de fontes de áudio e letras

| Fonte | Posição em proporção | Estado |
| --- | --- | --- |
| Análise nativa local (interfaces oficiais da NetEase, QQ, KuGou e KuWo + ncm-api) | Cadeia principal (mais de 90%) | Ativa por predefinição |
| Letras palavra a palavra AMLL TTML + base de letras sincronizadas LRCLIB | Complemento de letras (cerca de 10%) | Ativa por predefinição |
| A montante agregado de terceiros GDStudio/Lyriva | Reserva de emergência | Desativada rigorosamente por predefinição |
| Reforço de artistas semelhantes ListenBrainz/MusicBrainz | Reforço opcional | Desativada por predefinição |

A deteção de amostras sonda a duração e os metadados das entidades de áudio para identificar os cortes oficiais de amostra de 30 segundos; o resultado é apresentado de forma transparente no frontend mediante o selo de amostra e pode acionar a correspondência da faixa completa entre plataformas (com as faixas gratuitas da QQ, KuGou e KuWo como alvo da correspondência); havendo correspondência, a comutação é suave e a origem substituta é identificada. O projeto não integra qualquer componente de desbloqueio que contorne os mecanismos de copyright pago.

## 5. Motor de recomendação inteligente

O motor de recomendação funciona inteiramente no plano de dados local; os pesos dos sinais comportamentais são públicos no código-fonte:

| Sinal | Peso | Descrição |
| --- | --- | --- |
| favorite (adicionar aos favoritos) | +4,0 | Muito fortemente positivo |
| replay (nova reprodução) | +3,5 | Fortemente positivo |
| play_complete (conclusão efetiva) | +2,5 | Positivo padrão |
| play_progress (audição por progresso) | +0,2 a +1,8 | Pontuação escalonada pela proporção ouvida |
| skip (salto rápido) | -0,8 | A troca de faixa depois de ouvida metade pontua +0,25 |
| dislike (rejeição explícita) | -5,0 | Filtragem rígida e inclusão em lista negra |

Purificação de ruído e falsos sinais: as trocas de faixa causadas por paragens de rede (network_stall), falhas de descodificação (playback_error), cortes de amostra (trial_end), indisponibilidade da stream (stream_unavailable), expiração da memória intermédia (buffer_timeout) ou falha da comutação automática (auto_switch_error) têm peso permanentemente zero e não entram na base de dados.

O modelo de popularidade combina a reprodução efetiva (35%), os ouvintes independentes (25%), o desempenho de conclusão (20%), a conversão em favoritos (15%) e o declive de crescimento (5%), complementado com decaimento temporal exponencial (tabela de subida de 24 horas e tabela acumulada de popularidade de 7 dias) e suavização bayesiana e de Wilson Score; o cálculo de semelhança integra o grafo de relações entre artistas com o cosseno das características de áudio, e a reordenação por correlação marginal MMR equilibra precisão e diversidade. A intenção de pesquisa ao nível da sessão e as preferências de longo prazo desacoplam-se por camadas: apenas os comportamentos de elevado valor, como a conclusão e os favoritos, se consolidam no perfil de longo prazo.

## 6. Panorama do desenho de segurança

1. Autenticação: modo de código de autorização OAuth 2.0 da Epomail; o parâmetro `state` e o PKCE (S256) impedem a interceção e a repetição do código de autorização; os cookies de transação OAuth têm validade de 600 segundos;
2. Chave de API: formato versionado `sonic_live_v2.<header>.<payload>.<signature>`, com assinatura HMAC-SHA256 e payload contendo `sub`, `iat`, `exp`, `jti`, `kid`, `role` e `uid`; validade de emissão de 30 dias e limite de validação de 90 dias; o servidor compara em tempo constante com Web Crypto; as chaves sem assinatura e as chaves de versões antigas recusam-se sempre (fail-closed); as chaves transitam apenas pelos cabeçalhos de pedido `X-Sonic-Key` ou `Authorization`; o canal dos parâmetros de consulta no URL foi integralmente removido;
3. Revogação: o término de sessão revoga de imediato a sessão atual e o identificador de chave (jti); suporta lista de revogação de jti, lista de revogação de titulares e limite temporal mínimo global de emissão; com ligação a KV, suporta revogação imediata;
4. Sessão: cookie `sonic_session` com `HttpOnly; Secure; SameSite=Lax` e validade máxima de 30 dias; as chaves não se escrevem no URL, no localStorage nem em qualquer lugar acessível aos scripts da página;
5. Defesa SSRF: os pedidos de saída para endereços de loopback, redes privadas RFC 1918, ponte interna Docker e endereços de metadados da nuvem (como `169.254.169.254`) bloqueiam-se sempre, com verificação em pilha dupla IPv4 e IPv6 e nova verificação do destino e do resultado da resolução DNS em cada redirecionamento.

## 7. Panorama do desenho de privacidade

1. Pseudonimização por predefinição: os eventos comportamentais associam-se, desde a recolha, a identificadores hash unidirecionais; o endereço de correio eletrónico não se persiste;
2. Comutador autónomo da personalização: a personalização pode desativar-se a qualquer momento nas definições do leitor; desativada, os eventos não entram na base de dados e, no modo público, descartam-se diretamente;
3. Limpeza com um clique: «Limpar o perfil de recomendação» na página de definições destrói de imediato todos os eventos comportamentais no servidor; «Limpar todos os dados locais» limpa de imediato o armazenamento local do navegador e o IndexedDB;
4. Minimização dos registos: os registos de acesso do plano de dados contêm apenas o caminho, o método, o código de estado e o tempo despendido.

A formulação integral dos compromissos de privacidade consta da [Política de Privacidade](/pt/privacy-policy/) e as medidas técnicas, de [Processamento de dados e segurança](/pt/data-security/).

## 8. Para quem é adequado e para quem não é

É adequado a: ouvintes individuais que pretendam iniciar sessão com a sua própria conta Epomail e que valorizem a transparência e a eliminabilidade do perfil de recomendação; melómanos intensivos que necessitem de pesquisa agregada multifuente e de letras palavra a palavra; utilizadores de implantação própria com bases de Linux e Docker, dispostos a assumir as responsabilidades de operador.

Não é adequado a: cenários que procurem garantias de licenciamento de um serviço musical comercial, já que o projeto não armazena nem aloja música e não concede qualquer sublicenciamento de conteúdos; equipas que esperem um acordo de nível de serviço (SLA) ou suporte comercial; utilizadores que não aceitem «amostras assinaladas de forma transparente e complemento entre fontes a título de melhor esforço».

## 9. Limites de conteúdos e direitos de autor

O Sonic é uma ferramenta de pesquisa, agregação e reprodução que não armazena nem aloja quaisquer ficheiros musicais. Os direitos sobre gravações, letras, capas, imagens de artistas e outros conteúdos pertencem aos respetivos titulares; o projeto não concede qualquer sublicenciamento de conteúdos musicais. As faixas de membros legítimas montam-se com as credenciais de licenciamento próprias de quem implanta (por exemplo, `NETEASE_COOKIE`, conta de quem implanta e não conta do utilizador final); as faixas públicas seguem os protocolos abertos oficiais.

Ao utilizar o serviço, deve cumprir a [Política de Utilização Aceitável](/pt/acceptable-use/); quem implanta deve confirmar por si que o seu cenário de utilização cumpre a lei do seu local, os termos dos serviços a montante e os requisitos de licenciamento dos conteúdos.

## 10. Formas de implantação

| Forma | Composição | Pontos essenciais |
| --- | --- | --- |
| Gateway de edge Cloudflare Pages | Frontend SPA + Pages Functions | Publicado após a compilação com `wrangler pages deploy`; requer a configuração de `SONIC_SECRET`, `SONIC_ENGINE_SECRET` e `SONIC_LOCAL_ENGINE_URL` |
| Motor de protocolos local em Linux | sonic-engine + ncm-api + SQLite | Implantação com `docker compose up -d --build`; permissões 600 para o `.env`; acesso via Cloudflare Tunnel |

As duas formas constituem em conjunto o serviço completo; implantando apenas o gateway de edge sem plano de dados, o serviço funciona automaticamente no modo degradado de edge. A lista completa das variáveis de ambiente consta de `.env.example` e `docs/OPERATIONS.md` no repositório a montante.

## 11. Garantia de qualidade

O projeto garante a qualidade pela auditabilidade e pela verificação automatizada:

1. Auditoria de segurança e remediação: o repositório a montante contém o relatório de auditoria de segurança (`SECURITY_AUDIT_REPORT.md`, `SECURITY_FIX_SUMMARY.md`) e os registos de remediação item a item (`docs/AUDIT_REMEDIATION.md`), abrangendo a assinatura de API, o fluxo OAuth, a defesa SSRF e o XSS do frontend, entre outros;
2. Portões de testes automatizados: o conjunto de testes cobre o comportamento do gateway, a compatibilidade da autenticação, os casos SSRF, o motor local e a degradação, a recomendação e a pesquisa, o XSS do frontend, a paridade de configuração (config parity) e os portões de publicação P0/P1, executados a cada lançamento de versão;
3. Verificação da consistência da documentação: este site verifica por script automatizado três aspetos: zero ligações quebradas nas âncoras internas e nas referências a imagens, simetria estrutural 1:1 entre as versões linguísticas e correspondência das citações de artigos do RGPD com a lista de verificação da documentação de suporte;
4. Processo de verificação factual: todos os factos de tratamento de dados deste site se atualizam a cada versão por confronto com o código-fonte (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`, entre outros); havendo divergência do código-fonte, prevalece o código-fonte e a documentação corrige-se de imediato.

## 12. Perguntas frequentes

**O serviço é pago? Tem publicidade?**
Gratuito, sem publicidade e sem compras internas; os custos de operação da instância gerida são suportados pela equipa de operação. O serviço não recolhe quaisquer dados para fins publicitários.

**Posso utilizar sem iniciar sessão?**
Sim. A pesquisa, a reprodução, as letras e as tabelas de classificação estão disponíveis anonimamente (com limitação de taxa mais rigorosa); o início de sessão desbloqueia a sincronização na nuvem dos favoritos, a recomendação personalizada e o Auto DJ.

**Onde estão guardados os meus dados?**
Em três lugares: os favoritos, as playlists e as preferências do leitor guardam-se no armazenamento local do seu navegador; as descargas e a música local guardam-se no IndexedDB do seu navegador; o servidor guarda apenas eventos comportamentais pseudonimizados (destruição automática aos 90 dias). O endereço de correio eletrónico não se persiste. Detalhes na secção 4 da [Política de Privacidade](/pt/privacy-policy/).

**Como apagar o meu perfil comportamental?**
Definições → Privacidade e dados locais → «Repor o perfil de recomendação e os registos de desinteresse», ou invocando diretamente `DELETE /api/sonic/events`, com efeito imediato; «Limpar todos os dados locais» limpa em simultâneo os dados do navegador e do servidor. A localização na interface consta da secção 9 da [Interface e funcionalidades](/pt/interface/).

**As recomendações seguem-me?**
As recomendações servem apenas para ordenar a reprodução, sem rastreio entre sites e sem perfil publicitário; a personalização pode desativar-se a qualquer momento e, desativada, entra-se em modo puramente público e deixa de registar qualquer evento.

**Porque é que algumas músicas têm apenas 30 segundos?**
São os cortes de amostra oficiais da plataforma; o leitor assinala-os fielmente com o selo de amostra, apresentando-os nunca como faixas completas; com o complemento entre fontes ativado, tenta automaticamente corresponder a faixa gratuita completa e identifica a origem.

**Os selos de qualidade de áudio são fiáveis?**
São. O selo reflete o nível real da stream de áudio atual; acompanha em tempo real as variações dos níveis a montante, sem indicação falsa (ver a secção 4, n.º 3, dos [Termos de Utilização](/pt/terms-of-service/)).

**Quais são as responsabilidades de quem implanta por si?**
A partir do momento da implantação própria, é o responsável pelo tratamento dos dados dessa instância: deve cumprir o dever de informação para com os seus utilizadores, manter os registos do tratamento, realizar, quando necessário, avaliações de impacto e aplicar as medidas de segurança. O ponto de partida consta da secção 6 de [Processamento de dados e segurança](/pt/data-security/).

**Que línguas o serviço suporta?**
O leitor inclui nativamente Chinês Simplificado, Inglês e Japonês; a documentação deste site está disponível em 10 línguas.

## 13. Guia de leitura da documentação

| Documento | Conteúdo |
| --- | --- |
| [Panorama](/pt/overview/) | Identidade da plataforma, papéis no tratamento de dados, mapa documental e ordem de prevalência |
| [Política de Privacidade](/pt/privacy-policy/) | Deveres de informação sobre a recolha de dados, fundamentos legais, prazos de conservação e direitos dos titulares |
| [Termos de Utilização](/pt/terms-of-service/) | Condições contratuais de utilização do serviço, limitação de responsabilidade e lei aplicável |
| [Política de Utilização Aceitável](/pt/acceptable-use/) | Limites de conduta, lista de condutas proibidas, escadaria de execução e reclamações |
| [Processamento de dados e segurança](/pt/data-security/) | Ciclo de vida dos dados, matriz de tratamento, medidas de segurança e resposta a incidentes |
| [Lista de partilha com terceiros e transferências](/pt/sub-processors/) | Destinatários da partilha, dados envolvidos e garantias das transferências internacionais |
| [Definições de termos](/pt/key-terms/) | Terminologia legal (vocabulário do RGPD) e terminologia técnica |

Percurso de leitura: para conhecer o produto e a implantação, comece por esta página; para conhecer as disposições de privacidade e de termos, comece pelo [Panorama](/pt/overview/); para consultar termos concretos, veja as [Definições de termos](/pt/key-terms/).
