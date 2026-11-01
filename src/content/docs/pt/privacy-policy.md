---
title: Política de Privacidade
description: "Política de Privacidade do Sonic: informação sobre a recolha e utilização de dados, fundamentos legais, prazos de conservação, direitos dos titulares e transferências internacionais, com o RGPD como padrão mínimo para todos os utilizadores."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.4**

Esta política explica como o serviço Sonic (a seguir designado «o serviço») recolhe, trata e transmite os seus dados pessoais, bem como os padrões e os compromissos de proteção de dados observados pelo operador. Antes de iniciar sessão ou de utilizar o serviço, deve ler esta política; se discordar de qualquer ponto da mesma, não utilize o serviço.

Os factos técnicos descritos nesta política prevalecem conforme a implementação real do código aberto do serviço. Os documentos legais deste site têm como versão oficial a versão em Chinês Simplificado; as versões nas restantes línguas, incluindo a presente versão em Português, são traduções de referência e, em caso de dúvida na interpretação, prevalece a versão oficial. O serviço adota o Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia como padrão mínimo de proteção de dados para todos os utilizadores (ver a secção 2).

![Cinco pilares da Política de Privacidade do Sonic: licitude, limitação das finalidades, minimização e prazos de conservação, segurança e os seus direitos, assentes numa linha de base de proteção de nível RGPD](/images/sonic/privacy-pillars.svg)

*Figura: os cinco eixos desta política. A licitude ancora-se nos fundamentos legais do artigo 6.º do RGPD; a limitação das finalidades exclui o perfil publicitário; a minimização concretiza-se pela pseudonimização e pela limpeza com um clique; as medidas de segurança constam da secção 10; os direitos exercem-se na secção 9; todos assentam na linha de base de nível RGPD.*

## 1. Âmbito de aplicação

Esta política aplica-se aos dados pessoais gerados por qualquer utilização do serviço, incluindo:

1. Aceder aos sites do serviço (`sonic.epocanvas.tech`, `sonic.epocanvas.com` ou os domínios de instâncias de implantação própria);
2. Utilizar a totalidade das funções do leitor web (pesquisa, reprodução, letras, recomendações, descargas e importação de música local);
3. Clientes de terceiros que acedam ao serviço através da API aberta.

Esta política não se aplica a sites e serviços de terceiros a que o serviço remeta ou incorpore (como os sites próprios das plataformas musicais a montante); esses terceiros têm as suas próprias políticas de privacidade, da sua exclusiva responsabilidade. Quem opera uma implantação própria do Sonic é, a partir do momento da implantação, o responsável pelo tratamento dos dados dos seus utilizadores, devendo cumprir por si, perante os seus utilizadores, os deveres de informação previstos na lei aplicável do seu local; esta política pode servir-lhe de texto base dessa informação.

## 2. Responsável pelo tratamento e linha de base de proteção de dados

| Instância que utiliza | Responsável pelo tratamento | Descrição |
| --- | --- | --- |
| Instância gerida (`sonic.epocanvas.tech`, `sonic.epocanvas.com`) | Equipa de operação | No que respeita a eventos comportamentais, inícios de sessão e registos de segurança, a equipa de operação é o responsável pelo tratamento |
| Instância de implantação própria | Quem implantou a instância | O código aberto não contém mecanismos de telemetria; salvo os serviços externos configurados pelo próprio operador, os dados da instância não se comunicam aos autores a montante nem a quaisquer terceiros |

**Linha de base de proteção de dados**: o serviço adota o RGPD como padrão mínimo de proteção de dados para todos os utilizadores, esteja onde estiver no mundo. Os seus direitos de informação, acesso, retificação, eliminação, limitação, portabilidade, oposição e reclamação quanto aos dados pessoais não ficam abaixo do nível previsto no RGPD. Para os utilizadores situados na União Europeia e no Espaço Económico Europeu, o RGPD aplica-se diretamente; para os utilizadores das restantes regiões, o serviço cumpre o padrão do RGPD a título de obrigação contratual; as proteções mais fortes conferidas pela lei do seu local prevalecem, no seu âmbito.

## 3. Deveres de informação na recolha

Ao recolher dados pessoais, o serviço informa-o expressamente do seguinte:

| Informação a prestar | Conteúdo informado pelo serviço |
| --- | --- |
| 1. Identidade do responsável | O operador (ver a secção 2; nas instâncias de implantação própria, quem as implantou) |
| 2. Finalidades da recolha | Identificação da conta e sessão de início de sessão; prestação das funções de reprodução, pesquisa e recomendação; prevenção do abuso e da fraude; limitação de taxa e manutenção da segurança do serviço (tabela correspondente na secção 5) |
| 3. Categorias de dados pessoais | Dados de identificação da conta (identificador de utilizador Epomail, endereço de correio eletrónico, alcunha, link de avatar e papel da conta); dados comportamentais e de preferência (eventos de reprodução, conclusão, salto, favorito, rejeição, termos de pesquisa, entre outros, associados por identificadores pseudonimizados); dados técnicos (utilização temporária do IP necessária à limitação de taxa, cookies de sessão e cookies de transação OAuth). Detalhe na secção 4 |
| 4. Prazo, território, destinatários e modo da utilização | Prazo: os eventos comportamentais destroem-se automaticamente 90 dias após o registo (configurável por quem implanta, mínimo de 7 dias); os dados de identificação da conta não se persistem e existem apenas durante a sessão. Território: o plano de controlo corre na rede global de edge da Cloudflare e o plano de dados em nós Linux próprios do operador (ver a secção 7). Destinatários: o operador e os seus subcontratantes, e as autoridades competentes mediante exigência legal (ver a secção 7). Modo: armazenamento pseudonimizado e cálculos estatísticos de forma automatizada, sem revisão humana e sem moderação de conteúdos |
| 5. Direitos que pode exercer e modo de exercício | Direitos de acesso, retificação, eliminação, limitação, portabilidade, oposição e reclamação; o modo de exercício consta da secção 9 |
| 6. Consequências da não prestação dos dados | As funções básicas do serviço (pesquisa, reprodução, letras) estão disponíveis sem início de sessão e sem comunicação de eventos comportamentais; o início de sessão é necessário para as funções de conta, como a sincronização na nuvem dos favoritos, e a recomendação personalizada é opcional |

## 4. Dados pessoais recolhidos

### 4.1 Dados de identificação da conta (início de sessão via Epomail)

Quando inicia sessão com a conta Epomail via OAuth 2.0 (PKCE), o serviço obtém do endpoint userinfo da Epomail os campos seguintes e não obtém quaisquer outros dados da conta:

| Campo | Finalidade | Persistido? |
| --- | --- | --- |
| Identificador de utilizador (`id`/`sub`) | Identificação dentro da sessão | Não |
| Endereço de correio eletrónico (sujeito a verificação) | Derivação do hash pseudonimizado; declaração `sub` no payload da chave de API emitida para si | Não |
| Alcunha ou nome de utilizador (`name`/`username`/`nickname`) | Apresentação na interface | Não |
| Link do avatar (`avatar`/`picture`) | Apresentação na interface | Não |
| Papel da conta (`role`) | Determinação de permissões | Não |

O serviço não mantém sistema de registo autónomo e não recolhe número de telefone, nome verdadeiro, morada ou dados de pagamento. O endereço de correio eletrónico usa-se apenas, em tempo real, dentro da sessão de início de sessão: para derivar o identificador pseudonimizado (hash SHA-256 com prefixo `usr_`, truncado a 12 caracteres hexadecimais), o hash de identificador de utilizador derivado e a chave do balde de limitação de taxa; os hashes derivados não permitem reconstituir o endereço de correio eletrónico original.

### 4.2 Eventos comportamentais

Para prestar as funções de recomendação e Auto DJ, o serviço regista eventos comportamentais relacionados com a reprodução de faixas. Existem 11 tipos de eventos: pesquisa, clique em resultado de pesquisa, início de reprodução, progresso de reprodução, conclusão, salto, nova reprodução, favorito, remoção de favorito, rejeição e remoção de rejeição. Cada evento associa-se a um dos identificadores pseudonimizados seguintes:

1. Utilizador autenticado: hash SHA-256 derivado do endereço de correio eletrónico (prefixo `usr_`);
2. Participante anónimo: identificador aleatório gerado localmente no seu navegador (prefixo `anon_`), submetido a novo hash no servidor;
3. Modo público: desativada a personalização, os eventos não entram na base de dados nem se armazenam, descartando-se diretamente no servidor.

A comunicação dos eventos faz-se em lotes (máximo de 50 eventos por lote e limite de 64 KB no corpo do pedido), com descarga da fila de envio pendente quando a página se oculta. O conteúdo registado de cada evento limita-se a: tipo de evento, identificador canónico da faixa, identificador do artista, etiquetas de género e língua, termo de pesquisa (quando aplicável), proporção de progresso de reprodução e peso do sinal; não inclui endereço IP, não inclui impressão digital do dispositivo e não inclui conteúdo em texto livre.

Purificação de ruído e falsos sinais: as trocas de faixa causadas por paragens de rede (network_stall), falhas de descodificação (playback_error), cortes de amostra (trial_end), indisponibilidade da stream (stream_unavailable), expiração da memória intermédia (buffer_timeout) ou falha da comutação automática (auto_switch_error) têm peso permanentemente zero e não entram na base de dados; o cliente só comunica saltos voluntários quando a reprodução corre normalmente e a audição se situa entre 0,5 e 25 segundos.

Além disso, os pedidos de recomendação incluem um reduzido contexto local do seu cliente (algumas faixas favoritas, artistas recentes e termos de pesquisa recentes, cada um com número limitado), usado apenas em memória, no pedido em causa, para a ordenação personalizada, sem persistência e sem entrada nos registos.

### 4.3 Estatísticas globais agregadas

O serviço mantém, em separado, estatísticas globais agregadas sem relação com qualquer utilizador, destinadas às tabelas de popularidade e às recomendações por semelhança:

| Tabela estatística | Conteúdo | Relação com o indivíduo |
| --- | --- | --- |
| Contagens agregadas de termos de pesquisa | Estatística global da frequência dos termos de pesquisa | Nenhuma |
| Coocorrência de faixas | Estatística global das faixas ouvidas em conjunto | Nenhuma |

Estes registos não contêm identificadores pessoais, não se associam à sua identidade e não entram no âmbito da «limpeza do perfil com um clique» (por não pertencerem, por natureza, a qualquer utilizador).

### 4.4 Armazenamento local do seu navegador

Os dados seguintes guardam-se apenas no seu navegador, sem que o servidor do operador obtenha cópia integral; em modo de navegação privada, com o armazenamento indisponível, degrada-se automaticamente para memória temporária:

| Local de armazenamento | Chave | Conteúdo |
| --- | --- | --- |
| localStorage | `audio` | Lista de reprodução, faixa atual, modo de reprodução, volume, estado de silêncio e histórico de reprodução |
| localStorage | `library` | Músicas favoritas, playlists guardadas, artistas seguidos, MV guardados, álbuns guardados e playlists criadas pelo utilizador |
| localStorage | `global` | Tema, preferência de língua e histórico de pesquisa (máximo de 10 itens) |
| localStorage | `settings` | Preferências da interface (animação de fundo, preferência de qualidade de áudio, entre outras definições) |
| localStorage | `recommend` | Interruptor da personalização, interruptor do Auto DJ, identificador anónimo e lista de faixas rejeitadas |
| localStorage | `sonic-perf-mode` | Interruptor do modo de desempenho |
| IndexedDB | `SonicMusicPlayerDB` | Ficheiros de música local importados por si (`local_music`) e músicas descarregadas (`downloaded_music`) |

### 4.5 Dados técnicos tratados automaticamente

- Limitação de taxa: os pedidos anónimos limitam-se por balde por IP (240 por minuto, valor predefinido); o IP usa-se apenas brevemente como chave de limitação, pois o limitador nativo de edge não retém dados, ou estes guardam-se temporariamente num registo KV com expiração automática de 120 segundos, ou numa janela de memória de 60 segundos (máximo de 4096 baldes); o IP não se escreve na base de dados nem nos registos de acesso. Os pedidos autenticados limitam-se por balde por hash do correio eletrónico (600 por minuto, valor predefinido), e o endpoint de autenticação tem ainda uma limitação dedicada de 30 pedidos por minuto por IP.
- Sessão e chaves: após o início de sessão bem-sucedido emite-se o cookie `sonic_session` com `HttpOnly; Secure; SameSite=Lax` (validade máxima de 30 dias), contendo a chave de API assinada; as chaves não se escrevem no URL, nos parâmetros de consulta nem no localStorage. O processo OAuth usa os cookies de transação `sonic_oauth_state` e `sonic_oauth_verifier` (validade de 600 segundos, restritos ao caminho `/api/auth`). O payload da chave de API inclui `sub` (correio eletrónico), `iat`, `exp`, `jti`, `kid`, `role` e `uid`; o `jti` serve às listas de revogação e à invalidação imediata no término de sessão.
- Registos de acesso: os registos de acesso do plano de dados são JSON linha a linha, contendo apenas o identificador do pedido, o método, o caminho, o código de estado e o tempo despendido; cadeia de consulta, IP, User-Agent, cookies, Authorization e corpo do pedido nunca se registam. Os registos de exceção contêm apenas o identificador do pedido, o nome do erro e a mensagem truncada.
- Proxy de áudio: por predefinição, as streams de áudio obtêm-se através do proxy de edge do serviço; os pedidos a montante transportam apenas o User-Agent, o Referer do site oficial conforme a configuração do CDN e os cabeçalhos Range, com remoção de Set-Cookie e dos cabeçalhos de credenciais; o CDN a montante vê apenas o endereço do servidor proxy. Se invocar expressamente o modo de ligação direta `?mode=redirect`, o seu navegador estabelece a ligação diretamente ao CDN oficial e o seu IP fica visível para esse CDN (semântica inerente ao redirecionamento 302); o leitor web não utiliza este modo.
- Rede de edge: a Cloudflare trata os metadados dos pedidos ao nível da rede segundo a sua própria política.

### 4.6 O que o serviço não recolhe

O serviço não tem rastreio publicitário, não tem cookies entre sites, não tem scripts de terceiros de estatística ou análise, não tem impressão digital do dispositivo e não tem perfil publicitário comportamental; não recolhe contactos, galeria de fotos, localização ou quaisquer dados do dispositivo sem relação com a reprodução musical; não vende dados pessoais, não os utiliza para fins publicitários e não se liga a qualquer rede de publicidade.

## 5. Fundamentos legais e finalidades do tratamento

Os fundamentos legais das atividades de tratamento são os seguintes:

| Atividade de tratamento | Finalidade | Fundamento legal |
| --- | --- | --- |
| Início de sessão Epomail, manutenção da sessão, emissão e revogação de chaves de API | Identificação da conta e acesso ao serviço | Necessidade contratual; o artigo 6.º, n.º 1, alínea b) do RGPD |
| Eventos comportamentais e perfil de recomendação (pseudonimizados) | Funções de recomendação e Auto DJ | Interesse legítimo; o artigo 6.º, n.º 1, alínea f) do RGPD; pode desativar a personalização a qualquer momento (direito de oposição da secção 9) e a recolha cessa de imediato |
| Estatísticas globais agregadas | Tabelas de popularidade e recomendações por semelhança | Interesse legítimo; o artigo 6.º, n.º 1, alínea f) do RGPD; sem associação a indivíduos |
| Eventos com identificador anónimo (participante anónimo) | Função de recomendação | Escolha autónoma sua; cessa com a desativação da personalização |
| Limitação de taxa por IP, segurança da sessão e prevenção do abuso | Segurança e estabilidade do serviço | Interesse legítimo; o artigo 6.º, n.º 1, alínea f) do RGPD; quando aplicável, constitui igualmente obrigação legal, ao abrigo do artigo 6.º, n.º 1, alínea c) do RGPD |

Os seus dados pessoais usam-se apenas para as finalidades enumeradas e para o âmbito estreitamente ligado a estas. O serviço não usa os seus dados para decisões individuais automatizadas (decisões que produzam efeitos jurídicos ou o afetem de forma semelhante e significativa, nos termos do artigo 22.º do RGPD); o efeito dos resultados de recomendação limita-se à sequência de reprodução que vê e à ordenação das tabelas, e pode desativá-la a qualquer momento.

## 6. Prazos de conservação e destruição dos dados

| Categoria de dados | Política de conservação |
| --- | --- |
| Eventos comportamentais | Destruição automática 90 dias após o registo (configurável por quem implanta, mínimo de 7 dias), com limpeza acionada pela contagem de escritas e pelos momentos de arranque; «limpeza do perfil com um clique» destrói de imediato |
| Dados de identificação da conta (correio eletrónico, alcunha, link de avatar, papel) | Sem persistência; existem apenas durante a sessão |
| Cookie de sessão | Máximo de 30 dias; invalidação imediata no término de sessão |
| Cookie de transação OAuth | Expiração automática aos 600 segundos |
| Contagens da limitação de taxa | O limitador nativo de edge não retém; os registos KV expiram automaticamente aos 120 segundos; janela de memória de 60 segundos |
| Listas de revogação de chaves | Lista estática configurada por quem implanta (variáveis de ambiente) ou registos de revogação imediata em KV |
| Cópias de segurança da base de dados | Snapshots consistentes contendo dados comportamentais pseudonimizados, a proteger ao mesmo nível dos dados de produção |
| Estatísticas globais agregadas | Sem identificadores pessoais; tratadas conforme a política de manutenção da base de dados |
| Armazenamento local do navegador | Permanece no seu dispositivo até que o limpe ou use «Limpar todos os dados locais» |

## 7. Partilha com terceiros e transferências internacionais

O serviço partilha dados pessoais com terceiros segundo o princípio do mínimo necessário; a totalidade dos casos consta da [Lista de partilha com terceiros e transferências](/pt/sub-processors/); em síntese:

1. Tratamento por subcontratante: Cloudflare (alojamento Pages, computação de edge nas Functions, túnel encriptado Tunnel, armazenamento KV e infraestrutura de limitação de taxa);
2. Fornecedor de identidade: Epomail (obtenção, no início de sessão, do identificador, do correio eletrónico, da alcunha, do link de avatar e do papel);
3. Fontes de conteúdos a montante: NetEase, QQ, KuGou, KuWo, AMLL, LRCLIB e os respetivos CDN oficiais de conteúdos; os pedidos contêm apenas os parâmetros de consulta de músicas e User-Agent/Referer fixos, sem os seus dados de identidade nem o seu IP;
4. Exigências legais: fornecimento apenas quando solicitado por autoridade competente mediante procedimento legal, com notificação sua nos limites permitidos pela lei.

O plano de controlo do serviço corre na rede global de edge da Cloudflare e os seus dados pessoais podem tratar-se em nós fora do país do operador. O operador gere as transferências internacionais ao abrigo das garantias dos artigos 44.º a 46.º do RGPD (incluindo as cláusulas contratuais-tipo da União Europeia), com base na relação de alojamento e de tratamento por subcontratante, e confia nas medidas de proteção de dados da Cloudflare (certificações SOC 2 Type II e ISO/IEC 27001). Quem opera uma implantação própria deve avaliar por si e assegurar que as suas transferências internacionais cumprem os requisitos legais do seu local.

## 8. Proteção de crianças

O serviço não se dirige a menores de 16 anos e não recolhe intencionalmente dados pessoais de crianças; se a lei do seu local fixar para os serviços da sociedade da informação uma idade de consentimento inferior (mínimo de 13 anos, o artigo 8.º do RGPD), prevalece essa disposição. O tutor que considere que uma criança forneceu dados pessoais pode contactar o operador para pedir a eliminação, tratada de imediato após verificação. Ninguém pode utilizar o serviço para difundir, junto de crianças e jovens, conteúdos prejudiciais à sua saúde física e mental; as restrições de utilização constam da [Política de Utilização Aceitável](/pt/acceptable-use/).

## 9. Direitos dos titulares e modo de exercício

Quanto aos seus dados pessoais, goza dos direitos seguintes:

1. Acesso e obtenção de cópia (o artigo 15.º do RGPD);
2. Retificação (o artigo 16.º do RGPD);
3. Eliminação (o artigo 17.º do RGPD);
4. Limitação do tratamento (o artigo 18.º do RGPD);
5. Portabilidade dos dados (o artigo 20.º do RGPD);
6. Oposição (o artigo 21.º do RGPD), incluindo a desativação da personalização a qualquer momento;
7. Não ficar sujeito a decisões baseadas apenas no tratamento automatizado (o artigo 22.º do RGPD); o serviço não toma tais decisões.

Modo de exercício:

![Bloco «Privacidade e dados locais» da página de definições do Sonic: interruptores da pesquisa inteligente e da recomendação personalizada, interruptor da rádio contínua automática, botão de reposição do perfil de recomendação e dos registos de desinteresse, com o bloco a explicar que «os dados seguintes guardam-se apenas no seu navegador e não são enviados para o servidor»](/images/sonic/ui/ui-privacy.png)

*Figura: bloco «Privacidade e dados locais» da página de definições, a interface real das funções de self-service seguintes. A visita à interface consta da secção 7 da [Interface e funcionalidades](/pt/interface/).*

1. Funções de self-service (efeito imediato):
   - «Limpar o perfil de recomendação»: destrói de imediato todos os eventos comportamentais associados a si no servidor (`DELETE /api/sonic/events`);
   - «Limpar todos os dados locais»: limpa de imediato o localStorage, o sessionStorage e a totalidade da base de dados IndexedDB do navegador, destruindo em sincronia o perfil no servidor;
   - Consulta do resumo do perfil de recomendação: via `GET /api/sonic/events`, obtém o resumo do seu perfil atual (total de eventos, contagens de favoritos e rejeições, artistas mais ouvidos, tendências de género, termos de pesquisa recentes e forma de armazenamento);
   - Desativação da personalização: o interruptor da página de definições produz efeito imediato; a fila de envio esvazia-se e os eventos seguintes deixam de se recolher;
   - Término de sessão: revoga de imediato a sessão atual e o identificador de chave.
2. Pedidos manuais: os restantes pedidos dirigem-se a `privacy@epocanvas.com`; o operador responde no prazo de um mês após a receção (o artigo 12.º, n.º 3, do RGPD); sendo o caso complexo, o prazo pode prolongar-se por mais dois meses, comunicando o motivo da extensão no primeiro mês.

Se considerar que o tratamento pelo serviço viola os seus direitos, pode pedir reparação ao operador (o artigo 79.º do RGPD) e reclamar junto da autoridade de controlo competente do local do operador (o artigo 77.º do RGPD); os utilizadores situados na União Europeia e no Espaço Económico Europeu podem reclamar junto da autoridade de controlo do seu local de residência habitual, de trabalho ou do local da presumida infração. Quem sofrer dano material ou imaterial por violação do RGPD pode pedir indemnização ao abrigo do artigo 82.º do RGPD.

## 10. Medidas de segurança

O operador estabelece e melhora continuamente, ao abrigo do artigo 32.º do RGPD, medidas técnicas e organizativas adequadas para impedir que os dados pessoais sejam subtraídos, alterados, destruídos, perdidos ou divulgados: HTTPS/TLS em toda a cadeia; chaves de API assinadas com HMAC-SHA256 versionadas e comparação em tempo constante; fluxo OAuth com PKCE e cookies de transação com prazo limitado; atributos HttpOnly/Secure/SameSite do cookie de sessão e revogação imediata; plano de dados ligado apenas ao endereço de loopback e acedido por túnel encriptado; interceção SSRF em toda a cadeia e lista branca de domínios; identificadores pseudonimizados e desenho da base de dados sem coluna de IP; minimização dos registos; validação de chaves fail-closed. A lista completa, a matriz de tratamento e a descrição das limitações conhecidas constam de [Processamento de dados e segurança](/pt/data-security/).

## 11. Alterações à política

Esta política pode ser revista por alterações ao serviço ou à legislação. As alterações substanciais (novo destinatário de partilha com terceiros, alteração da política de conservação ou do âmbito de recolha, entre outras) comunicam-se previamente por aviso no site, com atualização da data de entrada em vigor e do número de versão no topo desta página. Continuando a utilizar o serviço após a entrada em vigor da alteração, considera-se que aceita a política revista; quem discordar pode cessar a utilização e limpar os seus dados. As revisões substanciais sucessivas arquivam-se com os registos de versões do repositório de código aberto.

## 12. Pontos de contacto

- Privacidade, exercício de direitos e reclamações: `privacy@epocanvas.com`
- Serviço e conta: `admin@epocanvas.com`
- Projeto de código aberto: Issues do repositório GitHub (`github.com/shijianus/sonic`)
- Sites de implantação própria: contacte o operador indicado pelo próprio site

---

*Este documento é um documento de conformidade elaborado pela equipa de operação do Sonic e não constitui parecer jurídico; as disposições imperativas da lei do seu local prevalecem sobre esta política nos pontos em que com ela diverjam.*
