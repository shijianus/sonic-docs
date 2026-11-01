---
title: Processamento de dados e segurança
description: "Processamento de dados e segurança do Sonic: ciclo de vida dos dados, matriz de tratamento, medidas de segurança em quatro camadas, limitações conhecidas, resposta a violações de dados e deveres de quem implanta."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.3**

Esta página explica o ciclo de vida dos dados do serviço Sonic (a seguir designado «o serviço»), a natureza de cada atividade de tratamento, as medidas de segurança, as limitações conhecidas e o procedimento de resposta a violações de dados. Esta página desenvolve a secção 10 da [Política de Privacidade](/pt/privacy-policy/); os factos técnicos prevalecem conforme a implementação real do código aberto e podem rever-se por auditoria ao código-fonte.

![Estrutura de segurança em quatro camadas do Sonic: encriptação da transmissão, autenticação e assinatura, defesa SSRF na edge e isolamento do armazenamento, complementada pelo controlo autónomo do utilizador (limpeza com um clique, modo incógnito, revogação imediata no término de sessão)](/images/sonic/security-shield.svg)

*Figura: camadas das medidas de segurança do serviço. A camada de transmissão usa TLS em toda a extensão; a camada de autenticação constrói-se com chaves assinadas HMAC-SHA256 e OAuth com PKCE; a camada de edge bloqueia os endereços de redes internas e de metadados; a camada de armazenamento isola-se por ligação ao loopback e túnel encriptado. À direita, os controlos que o utilizador domina autonomamente.*

## 1. Ciclo de vida dos dados

| Fase | Descrição |
| --- | --- |
| Recolha | Obtenção dos dados de identificação da conta pelo início de sessão OAuth Epomail (sem persistência); comunicação em lote dos eventos comportamentais pelo leitor (desativável, máximo de 50 eventos por lote e 64 KB); utilização temporária do IP para a limitação de taxa anónima |
| Transmissão | HTTPS/TLS em toda a cadeia; entre o plano de controlo e o plano de dados, túnel encriptado Cloudflare Tunnel com verificação obrigatória da chave entre serviços (X-Sonic-Engine-Key); o cabeçalho do endereço do cliente de edge para o motor só se aceita depois de o motor validar a chave de serviço |
| Armazenamento | SQLite no plano de dados (modo WAL), em `/app/data/sonic-recommend.sqlite` no volume nomeado `sonic-data`; em produção, a falha de abertura recusa o serviço (fail-closed), sem degradação silenciosa |
| Utilização | Cálculos estatísticos associados por identificadores pseudonimizados (recomendações, popularidade, semelhança); sem revisão humana, sem moderação de conteúdos, sem decisões automatizadas |
| Partilha | Ver a [Lista de partilha com terceiros e transferências](/pt/sub-processors/); sem venda, sem utilização publicitária |
| Eliminação | Destruição automática dos eventos comportamentais aos 90 dias (limpeza acionada a cada 1500 escritas e nos momentos de arranque); eliminação imediata pela limpeza com um clique; os registos de limitação de taxa expiram aos 120 segundos |

## 2. Matriz de tratamento

| Atividade de tratamento | Dados envolvidos | Associação à identidade | Fundamento legal | Prazo de conservação |
| --- | --- | --- | --- | --- |
| Identificação da conta e início de sessão | Identificador Epomail, correio eletrónico, alcunha, link de avatar, papel | Correio eletrónico (dentro da sessão) | Necessidade contratual | Sem persistência; durante a sessão |
| Registo de eventos comportamentais | Tipo de evento, identificador canónico da faixa, artista, género, língua, termo de pesquisa, proporção de progresso, peso do sinal | Hash pseudonimizado (`usr_`/`anon_`) | Interesse legítimo + direito de oposição | 90 dias (mínimo de 7 dias) |
| Cálculo do perfil de recomendação | Características agregadas dos eventos comportamentais (artistas de longo prazo, tendências de género, intenção de sessão) | Hash pseudonimizado | Interesse legítimo + direito de oposição | Destruição com os eventos |
| Estatísticas globais agregadas | Contagens de termos de pesquisa, coocorrência de faixas | Sem associação a indivíduos | Interesse legítimo | Manutenção da base de dados |
| Limitação de taxa e prevenção do abuso | IP (baldes anónimos), hash do correio eletrónico (baldes de autenticação), contagens por IP no endpoint de autenticação | Utilização temporária | Interesse legítimo | 120 segundos / janela de 60 segundos |
| Segurança da sessão e das chaves | Cookie de sessão, payload da chave de API (`sub`/`jti`/`kid`, entre outros), listas de revogação | Hash do correio eletrónico | Necessidade contratual e dever de segurança | Máximo de 30 dias |
| Cópias de segurança da base de dados | Snapshots consistentes dos dados comportamentais pseudonimizados | Hash pseudonimizado | Dever de segurança | Conforme a política de cópias de segurança de quem implanta |

## 3. Medidas de segurança

### 3.1 Transmissão e acesso

1. Encriptação integral: do navegador à edge e da edge ao plano de dados, tudo via TLS; o plano de dados acede-se pelo túnel encriptado Cloudflare Tunnel, sem exposição direta de portos à Internet pública, com mapeamento apenas para `127.0.0.1:8080` no lado do anfitrião;
2. Verificação entre serviços: o plano de dados impõe a verificação do X-Sonic-Engine-Key em todas as rotas `/api`, `/proxy` e `/palette`; o lado do motor remove os cabeçalhos de entrada não fidedignos e reconstrói o cabeçalho do endereço do cliente a partir do endereço do socket, invalidando qualquer falsificação;
3. Degradação sempre anunciada: no modo degradado de edge, o cabeçalho de resposta assinala `X-Sonic-Degraded: 1` e a interface exibe em simultâneo o aviso de degradação, sem comutação silenciosa.

### 3.2 Autenticação e chaves

1. Fluxo OAuth: o parâmetro `state` e o PKCE (S256) impedem a interceção e a repetição do código de autorização; os cookies de transação têm validade de 600 segundos, restritos ao caminho `/api/auth`; na devolução de chamada verificam-se o state, o PKCE, o código de autorização e a repetição, recusando-se sempre qualquer elo em falta ou anómalo;
2. Chave de API: formato versionado `sonic_live_v2`, assinatura HMAC-SHA256, comparação em tempo constante no servidor com Web Crypto `crypto.subtle.verify`; verificação rigorosa da versão, do `kid`, do `iat`/`exp` e do `jti`; as chaves sem assinatura e as chaves v1 de versões antigas recusam-se sempre (fail-closed); validade de emissão de 30 dias e limite de validação de 90 dias; as chaves transitam apenas por cabeçalhos de pedido, com o canal do parâmetro de consulta `?api_key=` integralmente removido, evitando a fuga das chaves para os registos de acesso, o histórico do navegador ou o Referer;
3. Mecanismo de revogação: o término de sessão revoga de imediato a sessão atual; a lista de revogação de `jti`, a lista de revogação de titulares e o limite temporal mínimo global de emissão (`SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT`) suportam a invalidação em massa; com ligação a KV e `SONIC_ENABLE_KEY_REVOCATION=1`, suporta-se a revogação imediata; sem revogação imediata configurada, os endpoints relevantes devolvem 501 e sugerem o método das listas, sem fingir uma revogação bem-sucedida;
4. Atributos da sessão: `HttpOnly; Secure; SameSite=Lax`, validade máxima de 30 dias; o redirecionamento da devolução de chamada do início de sessão transporta apenas o parâmetro de estado `?auth=success`, sem devolver chaves.

### 3.3 Defesa dos pedidos de saída

1. Interceção SSRF: os pedidos de saída para endereços de loopback, redes privadas RFC 1918, ponte interna Docker e endereços de metadados da nuvem (como `169.254.169.254`) bloqueiam-se sempre, com verificação em pilha dupla IPv4 e IPv6 e nova verificação do destino e do resultado da resolução DNS em cada redirecionamento;
2. Lista branca de domínios: os proxies de áudio, de capas e de reencaminhamento admitem apenas destinos HTTPS em portos padrão dentro da lista controlada de domínios de CDN musicais (`SONIC_ALLOWED_MUSIC_DOMAINS`);
3. Purificação dos pedidos: os pedidos a montante removem o `Set-Cookie` e os cabeçalhos de credenciais, transportando apenas o User-Agent fixo, o Referer do site oficial correspondente e os cabeçalhos Range necessários; o IP de saída indica-se como o endereço de reserva configurado por quem implanta (por predefinição, o endereço de documentação RFC 5737), e não o IP de qualquer utilizador.

### 3.4 Armazenamento e registos

1. Armazenamento pseudonimizado: os eventos comportamentais associam-se por identificadores hash unidirecionais (valores SHA-256 truncados com prefixo `usr_`/`anon_`), sem coluna de correio eletrónico em texto claro e sem coluna de IP; o armazenamento tem 6 tabelas no total (dados canónicos das faixas, mapeamento das faixas por plataforma, índice de texto integral, eventos comportamentais, coocorrência de faixas e agregação de termos de pesquisa), estando apenas a tabela de eventos comportamentais associada a indivíduos;
2. Armazenamento fail-closed: em produção, a falha de abertura da base de dados recusa o serviço em vez de degradar silenciosamente; a queda para memória limita-se ao desenvolvimento e teste ou à configuração explícita `SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK=1`;
3. Minimização dos registos: os registos de acesso do plano de dados são JSON linha a linha, contendo apenas o identificador do pedido, o método, o caminho, o código de estado e o tempo despendido; cadeia de consulta, IP, User-Agent, cookies, Authorization e corpo do pedido nunca se registam; as exceções não tratadas registam apenas o identificador do pedido, o nome do erro e a mensagem truncada; os registos seguem a saída padrão do Docker, com política de rotação conforme a configuração do Docker do anfitrião; no lado do Cloudflare Pages não existem registos globais de acesso criados pelo próprio projeto;
4. Cópias de segurança: as cópias executam-se com snapshots consistentes (VACUUM INTO) acompanhados de verificação de integridade; os ficheiros de cópia contêm dados comportamentais pseudonimizados e devem proteger-se ao mesmo nível dos dados de produção;
5. Isolamento dos contentores: o plano de dados corre numa pilha de contentores Docker; o contentor auxiliar ncm-api é acessível apenas na rede interna do compose (`ncm-api:3000`), sem exposição à Internet pública; o ficheiro de configuração `.env` exige permissões 600.

### 3.5 Limitações conhecidas

Sendo o serviço um projeto de código aberto, o operador divulga as limitações conhecidas seguintes, que melhora continuamente:

1. Nas formas de implantação sem o limitador nativo da Cloudflare ligado, a limitação de taxa conta por KV ou memória de processo, sem precisão global estrita;
2. A proteção contra DNS rebinding não está integralmente eliminada; quem implanta deve adotar medidas complementares ao nível da rede;
3. O cookie `sonic_session` contém a chave de API assinada; o furto do cookie equivale ao furto da chave, devendo conjugar-se com a segurança do dispositivo e com o término de sessão atempado;
4. O SQLite tem uma arquitetura de escritor único, não sendo adequado a formas de implantação com escrita de alta concorrência;
5. Não há endpoint de métricas Prometheus integrado; a monitorização depende dos registos e das sondagens externas.

A lista completa destas limitações consta de `docs/OPERATIONS.md` no repositório a montante; quem opera a implantação própria deve avaliá-las conforme a sua forma de implantação.

## 4. Resposta a violações de dados

1. Registo interno: todas as violações de dados pessoais registam-se (o artigo 33.º, n.º 5, do RGPD), sem isenção do registo por avaliação de baixo risco;
2. Notificação à autoridade de controlo: podendo a violação acarretar risco para os titulares, comunica-se à autoridade de controlo competente do local do operador no prazo de 72 horas após o conhecimento, descrevendo a natureza da violação, as categorias e o número aproximado dos dados envolvidos, as consequências possíveis e as medidas tomadas (o artigo 33.º, n.º 1, e n.º 3, do RGPD);
3. Notificação aos titulares: podendo a violação acarretar alto risco para os titulares, comunicam-se a natureza da violação e as medidas recomendadas aos titulares afetados, sem atraso indevido, por aviso no site ou outro meio eficaz (o artigo 34.º do RGPD); efetivamente neutralizado o risco a ponto de o alto risco já não existir, a notificação pode dispensar-se, devendo o motivo da decisão ficar registado;
4. Medidas de resposta: isolar de imediato os sistemas afetados, revogar as chaves e as sessões afetadas (incluindo a lista de `jti` e o limite temporal mínimo global de emissão), avaliar e corrigir a causa, e registar todo o processo de tratamento.

## 5. Proteção de dados desde o desenho e por predefinição

O serviço concretiza na fase de desenho as medidas seguintes (o artigo 25.º do RGPD):

1. Pseudonimização por predefinição: os eventos comportamentais associam-se por identificadores hash desde o início da recolha, o endereço de correio eletrónico não se persiste e a base de dados não tem coluna de IP;
2. Modo de recolha zero: desativada a personalização, os eventos não entram na base de dados; no modo público, descartam-se diretamente no servidor, com o número de ignorados indicado fielmente na resposta;
3. Dados mínimos do cliente: o contexto de recomendação transporta apenas números limitados de favoritos, artistas recentes e termos de pesquisa, usados em memória sem persistência; o leitor não lê nem escreve `document.cookie`, e as chaves não entram no localStorage;
4. Cadeias de alto risco desativadas por predefinição: o a montante agregado de terceiros (GDStudio, Lyriva) e a cadeia de desbloqueio desativam-se rigorosamente por predefinição, produzindo efeito apenas com a ativação expressa de quem implanta (variável de ambiente a 1);
5. Limpeza com um clique: o direito de eliminação concretiza-se diretamente por função de self-service, sem pedido manual; «Limpar todos os dados locais» limpa em simultâneo o perfil no servidor, o localStorage, o sessionStorage e o IndexedDB.

## 6. Deveres de quem opera implantação própria

A partir do momento em que implanta o serviço por si, é o responsável pelo tratamento dos dados dos seus utilizadores, devendo cumprir os deveres seguintes:

1. Dever de informação: informar os seus utilizadores das matérias de tratamento de dados (podendo usar como texto base a [Política de Privacidade](/pt/privacy-policy/) deste site);
2. Registo das atividades de tratamento: manter o registo das atividades de tratamento (o artigo 30.º do RGPD);
3. Avaliação de impacto: podendo o tratamento acarretar alto risco, realizar a avaliação de impacto sobre a proteção de dados (o artigo 35.º do RGPD), abrangendo no mínimo: o identificador anónimo do dispositivo, os eventos comportamentais, a utilização temporária do IP para a limitação de taxa e a derivação por hash do correio eletrónico OAuth;
4. Verificação da configuração: confirmar que os parâmetros seguintes coerem com os compromissos da sua política: dias de retenção dos eventos comportamentais (`SONIC_RECOMMEND_RETENTION_DAYS`, predefinição 90, mínimo 7), caminho de persistência (`SONIC_RECOMMEND_DB_PATH`, com `memory` para desativar a persistência), interruptor da queda para memória (`SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK`), interruptores das cadeias de terceiros (`SONIC_ENABLE_GDSTUDIO`, entre outras) e parâmetros da limitação de taxa (`SONIC_RATE_LIMIT_ANON_RPM`/`SONIC_RATE_LIMIT_AUTH_RPM`);
5. Segurança e supervisão: configurar conforme as medidas da secção 3 (incluindo chave de serviço com força não inferior a 32 caracteres, permissões 600 do `.env` e plano de dados sem exposição à Internet pública) e submeter-se à inspeção e à supervisão da autoridade competente nos termos da lei do seu local.

## 7. Auditabilidade

As declarações de segurança do serviço verificam-se pelo código-fonte: toda a lógica de tratamento, os valores predefinidos dos interruptores, a estrutura de armazenamento e a forma dos registos são públicos no repositório de código aberto; o repositório a montante contém ainda os registos de remediação da auditoria de segurança (`docs/AUDIT_REMEDIATION.md`) e o manual de operações (`docs/OPERATIONS.md`). Os factos técnicos da documentação deste site conferem-se a cada atualização de versão; detetada divergência do código-fonte, prevalece o código-fonte e a documentação corrige-se de imediato.
