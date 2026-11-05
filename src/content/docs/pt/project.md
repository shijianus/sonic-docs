---
title: Apresentação do projeto
description: "Apresentação do projeto epocanvas sonic: produto, funcionalidades, arquitetura, recomendação, segurança e privacidade, implantação e guia de leitura."
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta página apresenta o posicionamento do produto epocanvas sonic (a seguir designado «Sonic» ou «o projeto»), as suas funcionalidades principais, a arquitetura do sistema, o desenho de segurança e privacidade, o âmbito de aplicação e as formas de implantação, e indica o percurso de leitura da documentação deste site. Quer pretenda utilizar a instância gerida, implantar a sua própria ou conhecer as disposições de privacidade e dos termos, pode começar por esta página. Os instrumentos legais do Sonic constam da [Política de Privacidade](/pt/privacy-policy/) e dos [Termos de Utilização](/pt/terms-of-service/).

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar, e as imagens não comprovam a implantação atual.

![Arquitetura de duas camadas do Sonic: os utilizadores acedem ao plano de controlo na edge da Cloudflare (encaminhamento, limitação de taxa, cache, corte de circuito); o plano de dados em Linux executa a análise de protocolos, o cálculo das recomendações e o armazenamento SQLite; as streams de áudio são, por predefinição, obtidas dos CDN oficiais através do proxy de edge](/images/sonic/project-architecture.svg)

*Figura: arquitetura do Sonic com separação entre o plano de controlo e o plano de dados. O plano de controlo corre na edge do Cloudflare Pages; o plano de dados corre em nós Linux próprios do operador, comunica através de um túnel encriptado e impõe a verificação da chave entre serviços; as streams de áudio são obtidas, por predefinição, dos CDN oficiais através do proxy de edge (Range 206), com o modo de ligação direta 302 opcional.*

## 1. Posicionamento do projeto

O Sonic é um projeto gratuito e sem fins lucrativos, mantido por uma pessoa para aprendizagem e testes de pesquisa e reprodução musical. Usa a arquitetura «plano de controlo na edge da Cloudflare + motor de protocolos em Linux no plano de dados». O código é público e pode ser implantado por qualquer pessoa. Não há SLA nem promessa de funcionamento permanente; isso não dispensa obrigações legais.

| Elemento | Descrição |
| --- | --- |
| Instância gerida | `sonic.epocanvas.tech` e `sonic.epocanvas.com`, quando efetivamente operadas pelo projeto; a identidade legal e a localização do operador continuam por esclarecer |
| Instância de implantação própria | Instâncias em servidores próprios; a responsabilidade depende de quem determina efetivamente as finalidades e os meios do tratamento |
| Licenciamento do código-fonte | No RC `a75f5cb`, o `LICENSE` da raiz e `player/LICENSE` são MIT; no antigo `main@ce443c8`, só a MIT do leitor foi verificada e falta o `LICENSE` da raiz. A finalidade não lucrativa não restringe os direitos MIT; marcas e conteúdos têm regras próprias |
| Modo de início de sessão | A RC pública mais recente utiliza OAuth 2.0 da Epomail (PKCE), sem sistema de registo autónomo; a versão antiga `main@ce443c8` não tem estes controlos do RC e a versão em produção é desconhecida |
| Composição do software | Frontend e funções de edge do Cloudflare Pages (plano de controlo); motor local Node.js 22 e contentor auxiliar ncm-api (plano de dados); leitor web em Vue 3 |

## 2. Panorama das funcionalidades principais

![Interface real do leitor do Sonic: navegação à esquerda (Explorar, A minha música, Sistema), página inicial com carrossel de recomendações, recomendação inteligente e radar musical, playlists recomendadas, e barra de leitura mini no rodapé](/images/sonic/ui/ui-home.png)

*Figura: vista ilustrativa do leitor web, sem confirmação da versão atualmente em produção. A visita detalhada, função a função, consta da [Interface e funcionalidades](/pt/interface/).*

| Capacidade | Descrição |
| --- | --- |
| Pesquisa agregada multifuente | Recuperação isomórfica em todas as fontes com tolerância a falhas: normalização de caracteres simplificado/tradicional, pesquisa por pinyin e iniciais, correspondência simétrica de alcunhas de artistas em chinês e em inglês, tolerância ortográfica por distância de edição e reconhecimento de versões; recuperação paralela de múltiplas fontes com fusão e desduplicação por expressão regular |
| Letras dinâmicas palavra a palavra | Análise inversa nativa de YRC da NetEase, QRC da QQ e KRC da KuGou (desencriptação XOR + descompressão Deflate), continuada por AMLL TTML e pela base global de letras LRCLIB; letras multilingues, romanização e traduções sincronizadas ao milissegundo |
| Níveis de qualidade e transparência das amostras | A sondagem rigorosa das entidades distingue as faixas completas dos cortes oficiais de amostra de 30 segundos, apresentando uma amostra nunca como faixa completa; as faixas em amostra acionam automaticamente o complemento da faixa completa entre fontes (configurável), com a origem do complemento indicada de forma transparente |
| Recomendação inteligente e Auto DJ | Motor de recomendação ligeiro local: modelo de popularidade multifatorial, intenção de pesquisa por sessão, quantificação do feedback comportamental, semelhança de conteúdo com reordenação de diversidade por MMR; sem necessidade de cluster externo de big data |
| Gestão autónoma dos eventos comportamentais | Os sinais de reprodução, conclusão, salto, favorito e rejeição podem desativar-se a qualquer momento; a reposição elimina apenas parte da identidade atual e pode falhar apesar de indicar sucesso |
| Limites de segurança | O RC inclui PKCE, sessões assinadas, chaves de API versionadas e algumas verificações SSRF; cookies, transmissão de credenciais e configuração têm de ser verificados. A versão antiga `main@ce443c8` não prova as funções do RC nem as da instância em produção |
| Contingência e degradação | Se o plano de dados estiver indisponível, a edge tenta um caminho alternativo e pode apresentar «modo degradado de edge»; não há promessa de latência zero, sucesso da alternativa ou reprodução ininterrupta |

## 3. Panorama da arquitetura técnica

### 3.1 Plano de controlo (edge da Cloudflare)

O plano de controlo corre no Cloudflare Pages e nas Pages Functions e desempenha as funções seguintes:

1. Encaminhamento e autenticação: ponto de entrada unificado dos pedidos de API, com verificação de autenticação e validação de chaves assinadas;
2. Limitação de taxa escalonada: 240 pedidos anónimos por minuto e 600 pedidos autenticados por minuto (valores predefinidos, configuráveis), além de uma limitação dedicada de 30 pedidos por minuto por IP nos endpoints de autenticação;
3. Cache multinível: cache de edge com chave `sonic:*`, janela de frescura de 8 minutos e estado de prorrogação de contingência após a expiração;
4. Circuit breaker de três estados: 3 falhas consecutivas ou uma chamada que exceda o orçamento de 4,5 segundos abrem o circuito; os pedidos seguintes deixam de esperar pelo plano de dados em estado aberto e tentam a resposta direta de reserva na edge (interfaces de pesquisa públicas da QQ e da KuGou e AMLL/LRCLIB), sem prometer latência zero; após 30 segundos de arrefecimento entra em HALF_OPEN para sondagem, fechando em caso de sucesso. As respostas degradadas transportam `X-Sonic-Degraded: 1` e o leitor exibe uma cápsula de aviso de degradação no topo.

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

Por predefinição, as streams de áudio são obtidas dos CDN oficiais através do proxy de edge (proxy de intervalo de bytes na mesma origem), com suporte para carregamento por segmentos HTTP `Range` e `206 Partial Content`: o CDN a montante pode ver o endereço de saída do proxy, mas alguns pedidos podem ainda transportar informações do navegador; isto não garante anonimato em toda a cadeia. O modo de ligação direta 302 de `?mode=redirect` destina-se apenas a utilizadores da API que o invoquem expressamente (o leitor web não o utiliza); no modo direto, o navegador liga-se ao CDN. MV, imagens, avatares e Google Fonts também podem expor diretamente o IP; um caminho da DiceBear inclui o correio eletrónico como seed. Alguns pedidos a montante usam HTTP.

## 4. Cadeia de fontes de áudio e letras

| Fonte | Posição em proporção | Estado |
| --- | --- | --- |
| Análise nativa local (interfaces integradas da NetEase, QQ, KuGou e KuWo + ncm-api) | Cadeia principal (mais de 90%) | Ativa por predefinição |
| Letras palavra a palavra AMLL TTML + base de letras sincronizadas LRCLIB | Complemento de letras (cerca de 10%) | Ativa por predefinição |
| A montante agregado de terceiros GDStudio/Lyriva | Reserva de emergência | Depende da configuração; GDStudio ativo no código sem opção definida, desligado no exemplo de ambiente e Compose; verificar Lyriva separadamente |
| Reforço de artistas semelhantes ListenBrainz/MusicBrainz | Reforço opcional | Desativada por predefinição |

A deteção de amostras sonda a duração e os metadados das entidades de áudio para identificar os cortes oficiais de amostra de 30 segundos; o resultado é apresentado de forma transparente no frontend mediante o selo de amostra e pode acionar a correspondência da faixa completa entre plataformas (com as faixas gratuitas da QQ, KuGou e KuWo como alvo da correspondência); havendo correspondência, a comutação é suave e a origem substituta é identificada. A disponibilidade técnica ou a correspondência não concede licença nem autoriza contornar medidas de pagamento, acesso ou direitos de autor.

## 5. Motor de recomendação inteligente

O motor integrado corre no plano de dados do operador, não exclusivamente no dispositivo do utilizador; fornecedores externos dependem da configuração; os pesos dos sinais comportamentais são públicos no código-fonte:

| Sinal | Peso | Descrição |
| --- | --- | --- |
| favorite (adicionar aos favoritos) | +4,0 | Muito fortemente positivo |
| replay (nova reprodução) | +3,5 | Fortemente positivo |
| play_complete (conclusão efetiva) | +2,5 | Positivo padrão |
| play_progress (audição por progresso) | +0,2 a +1,8 | Pontuação escalonada pela proporção ouvida |
| skip (salto rápido) | -0,8 | A troca de faixa depois de ouvida metade pontua +0,25 |
| dislike (rejeição explícita) | -5,0 | Filtragem rígida e inclusão em lista negra |

Purificação de ruído e falsos sinais: as trocas de faixa causadas por paragens de rede (network_stall), falhas de descodificação (playback_error), cortes de amostra (trial_end), indisponibilidade da stream (stream_unavailable), expiração da memória intermédia (buffer_timeout) ou falha da comutação automática (auto_switch_error) têm peso permanentemente zero e não entram na base de dados.

O modelo de popularidade combina a reprodução efetiva (35%), os ouvintes independentes (25%), o desempenho de conclusão (20%), a conversão em favoritos (15%) e o declive de crescimento (5%), complementado com decaimento temporal exponencial (tabela de subida de 24 horas e tabela acumulada de popularidade de 7 dias) e suavização bayesiana e de Wilson Score; o cálculo de semelhança integra o grafo de relações entre artistas com o cosseno das características de áudio, e a reordenação por correlação marginal MMR equilibra precisão e diversidade. A intenção de pesquisa da sessão influencia a ordenação imediata, mas as consultas também são contabilizadas separadamente e podem aparecer em sugestões públicas; os pedidos de recomendação podem transportar favoritos locais, artistas recentes e contexto de pesquisa. Os identificadores pseudónimos continuam a poder ser associáveis.

## 6. Panorama do desenho de segurança

1. Autenticação: modo de código de autorização OAuth 2.0 da Epomail; o parâmetro `state` e o PKCE (S256) impedem a interceção e a repetição do código de autorização; os cookies de transação OAuth têm validade de 600 segundos no RC; a implantação real exige verificação, e a versão antiga `main@ce443c8` serve apenas de comparação;
2. Chave de API: credencial assinada `sonic_live_v2`, no formato versionado `sonic_live_v2.<header>.<payload>.<signature>`, com assinatura HMAC-SHA256 e payload contendo `sub`, `iat`, `exp`, `jti`, `kid`, `role` e `uid`; validade predefinida de emissão e reemissão de 30 dias; os 90 dias são apenas o limite máximo do validador, não um prazo de reemissão; o servidor compara em tempo constante com Web Crypto; as chaves sem assinatura e as chaves de versões antigas recusam-se sempre (fail-closed); as chaves transitam apenas pelos cabeçalhos de pedido `X-Sonic-Key` ou `Authorization`; o RC não aceita chaves em parâmetros de consulta do URL, sem eliminar credenciais antigas de URL ou armazenamento de `main`;
3. Revogação: terminar sessão limpa o cookie atual; revogar credenciais copiadas depende do armazenamento configurado, incluindo KV opcional, e do sucesso dos pedidos. Existem listas de jti e de titulares e um limite mínimo global de emissão;
4. Sessão: no RC, cookie assinado `sonic_session` com `HttpOnly; SameSite=Lax`, `Secure` em HTTPS e validade predefinida de 30 dias; a assinatura não cifra o conteúdo. Separadamente da chave de sessão, `auth` guarda dados do utilizador, incluindo correio eletrónico, no localStorage, com caminhos de compatibilidade para armazenamento antigo;
5. Defesa SSRF: o RC aplica verificações de endereços privados, loopback, metadados da nuvem, DNS e redirecionamentos em determinados caminhos de saída do servidor; a cobertura depende da rota e não abrange automaticamente todos os pedidos a montante nem ligações diretas do navegador.

## 7. Panorama do desenho de privacidade

1. Pseudonimização: hashes e identificadores `anon_` continuam a poder ser dados pessoais; `auth` guarda, entre outros dados, o correio eletrónico no navegador;
2. Personalização e Auto DJ estão ativos por predefinição, o que não substitui consentimento prévio. Desativar afeta o caminho previsto de eventos, não todos os pedidos nem a reutilização pública separada de pesquisas;
3. Limites da eliminação: podem permanecer identificadores anónimos antigos, radar, agregados, serviços externos e cópias de segurança; podem existir falhas apesar da mensagem de sucesso. A limpeza local não é eliminação remota integral;
4. Minimização dos registos: os registos de acesso da aplicação são reduzidos; erros, anfitrião, proxies e terceiros podem tratar outras informações. O IP participa na limitação de taxa e no envio ao motor; não se verificou uma garantia global de zero registos.

A formulação integral dos compromissos de privacidade consta da [Política de Privacidade](/pt/privacy-policy/) e as medidas técnicas, de [Processamento de dados e segurança](/pt/data-security/).

## 8. Para quem é adequado e para quem não é

É adequado a: ouvintes individuais que pretendam iniciar sessão com a sua própria conta Epomail e que avaliem as lacunas conhecidas de consentimento e eliminação do serviço de teste; melómanos intensivos que necessitem de pesquisa agregada multifuente e de letras palavra a palavra; utilizadores de implantação própria com bases de Linux e Docker, dispostos a assumir as responsabilidades de operador.

Não é adequado a: cenários que procurem garantias de licenciamento de um serviço musical comercial, já que o projeto não concede qualquer sublicenciamento de conteúdos; equipas que esperem um acordo de nível de serviço (SLA) ou suporte comercial; utilizadores que não aceitem «amostras assinaladas de forma transparente e complemento entre fontes a título de melhor esforço».

## 9. Limites de conteúdos e direitos de autor

O Sonic é uma ferramenta de pesquisa, agregação e reprodução; descargas e ficheiros importados guardam-se no navegador. Os direitos sobre gravações, letras, capas, imagens e outros conteúdos pertencem aos respetivos titulares. Interfaces tecnicamente acessíveis e credenciais próprias de subscrição, como `NETEASE_COOKIE`, não conferem ao operador ou aos seus utilizadores direitos adicionais de distribuição. A gratuitidade, a aprendizagem e os testes não constituem automaticamente uma exceção ao direito de autor.

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
4. Processo de verificação factual: todos os factos de tratamento de dados deste site se atualizam a cada versão por confronto com o código-fonte (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`, entre outros); as divergências exigem verificação e correção. O código não substitui informação correta nem fundamento lícito; a comparação não verifica a instância em produção.

## 12. Perguntas frequentes

**O serviço é pago? Tem publicidade?**
Gratuito, sem publicidade e sem compras internas; os custos de operação são suportados pela pessoa que opera o projeto. O serviço não recolhe quaisquer dados para fins publicitários.

**Posso utilizar sem iniciar sessão?**
Sim. Pesquisa, reprodução, letras e tabelas dispensam início de sessão, mas não são automaticamente anónimas. Não existe sincronização geral de favoritos na nuvem. Personalização e Auto DJ estão ativos por predefinição; iniciar sessão não constitui consentimento para perfis.

**Onde estão guardados os meus dados?**
Favoritos, playlists e preferências ficam principalmente no navegador; `auth` pode conservar correio eletrónico e avatar. O corpo do áudio e as capas incorporadas são armazenados no IndexedDB, mas as imagens de capa também podem ser enviadas com eventos de favoritos e entrar no catálogo remoto de faixas: não se garante que sejam exclusivamente locais. Metadados, feedback e contexto de recomendação podem ser enviados; também existem tratamentos remotos do radar e estatísticas de pesquisa. O RC prevê 90 dias por predefinição para eventos, com um mínimo de 7 dias, mas a limpeza e a eliminação são incompletas. Consulte as secções 4 e 6 da [Política de Privacidade](/pt/privacy-policy/).

**Como apagar o meu perfil comportamental?**
Definições → Privacidade e dados locais → «Repor o perfil de recomendação e os registos de desinteresse», ou `DELETE /api/sonic/events`, abrange apenas parte da identidade atual. «Limpar todos os dados locais» também não garante eliminação remota integral; falhas podem não ser mostradas. Para pedidos completos, contacte `privacy@epocanvas.com`. A interface consta da secção 9 de [Interface e funcionalidades](/pt/interface/).

**As recomendações seguem-me?**
As recomendações usam perfis comportamentais para ordenar conteúdos, não para publicidade. Desativar não termina toda a recolha, nomeadamente a estatística separada de pesquisa; o modo privado não impede envios. A personalização ativa por predefinição não prova consentimento válido.

**Porque é que algumas músicas têm apenas 30 segundos?**
São os cortes de amostra oficiais da plataforma; o leitor assinala-os fielmente com o selo de amostra, apresentando-os nunca como faixas completas; com o complemento entre fontes ativado, tenta automaticamente corresponder a faixa gratuita completa e identifica a origem.

**Os selos de qualidade de áudio são fiáveis?**
São. O selo reflete o nível real da stream de áudio atual; acompanha em tempo real as variações dos níveis a montante, sem indicação falsa (ver a secção 4 dos [Termos de Utilização](/pt/terms-of-service/)).

**Quais são as responsabilidades de quem implanta por si?**
Quem determina as finalidades e os meios do tratamento assume as obrigações correspondentes. Testes puramente pessoais e serviços públicos exigem avaliações distintas; informação, fundamentos, segurança e eventuais registos e avaliações de impacto dependem da lei aplicável. O ponto de partida consta da secção 6 de [Processamento de dados e segurança](/pt/data-security/).

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
