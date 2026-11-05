---
title: Lista de partilha com terceiros e transferências
description: Infraestrutura, identidade, destinatários de conteúdos e recursos externos, diferenças de configuração e limites das transferências internacionais nas instâncias alojadas do Sonic.
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta página desenvolve a secção 7 da [Política de Privacidade](/pt/privacy-policy/) e explica os possíveis destinatários das instâncias de teste alojadas do Sonic, mantidas por uma pessoa, gratuitas e sem fins lucrativos. A existência de uma integração no código não prova que esteja ativa nem que a partilha seja lícita. Instâncias próprias devem informar separadamente segundo o seu tratamento real.

As descrições funcionais desta página baseiam-se no repositório `shijianus/sonic`, no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta; as comparações históricas estão assinaladas. O RC não é uma GitHub Release oficial; a versão em produção e os contratos continuam por verificar. O chinês simplificado é a base de manutenção e as restantes nove versões são traduções; a prioridade linguística não reduz a lei imperativa nem o direito dos consumidores a cláusulas claras e compreensíveis.

![Mapa de partilha do Sonic: infraestrutura, identidade, fontes de conteúdos, caminhos opcionais, exigências legais e transferências internacionais](/images/sonic/sharing-map.svg)

*Figura: destinatários classificados por função; os indicadores de configuração ou de garantias não provam ativação real, contratos ou fundamento da transferência.*

## 1. Infraestrutura e relações de subcontratação

| Entidade | Função | Dados possíveis e limites de configuração |
| --- | --- | --- |
| Cloudflare Pages e Functions | Alojamento, API de edge, cache e limitação de taxa | IP, caminho do pedido, cabeçalhos e metadados de ligação; registos concretos dependem da instância e do fornecedor |
| Cloudflare Tunnel | Canal entre a edge e o plano de dados | Tráfego de pedidos e metadados de ligação; o túnel não cifra automaticamente todos os caminhos HTTP internos ou a montante |
| Cloudflare KV e limitadores | Armazenamento configurável para limitação, revogação de credenciais e outras funções | Chaves de IP ou derivadas da identidade, identificadores de revogação; ativação e prazos a verificar |
| Anfitrião ou fornecedor de alojamento do plano de dados | Ambiente do motor, base de dados e registos | O motor pode receber IP em bruto, cookies, cabeçalhos de autenticação e contexto enviados pela edge; entidade anfitriã e países dos nós não verificados |

A existência de subcontratação depende de quem determina finalidades, de quem trata por instruções e dos acordos reais, não apenas do nome do produto. Quando o RGPD se aplique e exista subcontratação, devem concretizar-se as disposições exigidas pelo artigo 28.º; não se afirma aqui que algum contrato foi celebrado ou verificado. A identidade completa e os dados aptos a receber notificações do responsável continuam a ter de ser completados; ver a secção 2 da [Política de Privacidade](/pt/privacy-policy/).

## 2. Fornecedor de identidade (necessário ao início de sessão)

A Epomail (`mail.epocanvas.com`) fornece início de sessão OAuth. O navegador interage com o serviço de identidade; o Sonic troca o código de autorização e consulta os dados do utilizador, podendo receber identificador, correio eletrónico e indicador de verificação, alcunha, URL do avatar e papel. Parte fica no armazenamento `auth` do navegador e na sessão assinada, não «apenas em memória».

A integração do início de sessão ou a marca comum não torna automaticamente a Epomail subcontratante do Sonic. O tratamento independente do sistema de contas e o tratamento por instruções apreciam-se separadamente segundo as finalidades e os acordos reais; o Sonic continua responsável pela receção, conservação e divulgação subsequente que determina.

## 3. Fontes de conteúdos a montante e ligações diretas do navegador

| Fonte | Utilização principal | Dados que podem ser transmitidos ou obtidos |
| --- | --- | --- |
| NetEase Cloud Music, QQ Music, KuGou, KuWo e CDN relacionados | Pesquisa, áudio, MV, capas e dados de conteúdos | Texto original de pesquisa, identificadores e metadados de conteúdos; informação de ligação da saída do proxy ou do navegador direto |
| AMLL, LRCLIB | Consulta e complemento de letras | Identificadores de músicas ou dados de correspondência, como título e artista, e metadados de ligação |
| Google Fonts | Carregamento de tipos de letra | IP do navegador, User-Agent e outras informações de ligação |
| DiceBear | Avatares externos | O caminho atual pode incluir correio eletrónico em texto simples no seed do URL e expor informações de ligação do navegador |

O proxy de áudio pode fazer o CDN ver a saída do proxy, mas isso não significa que todos os pedidos sejam isentos de dados pessoais. Pedidos de stream podem usar o User-Agent do navegador, não um valor fixo uniforme; MV, capas, tipos de letra e avatares podem ser pedidos diretamente pelo navegador. Alguns fornecedores usam HTTP, pelo que não se garante TLS em toda a cadeia. O seed com correio eletrónico da DiceBear deve ser substituído por avatar local ou identificador sem correio eletrónico.

Comentários a montante contêm nomes ou alcunhas, avatares e textos de outras pessoas e podem entrar em cache pública; as finalidades incluem mostrar os comentários do MV solicitado. Os autores não são partes no contrato de início de sessão deste serviço, pelo que os seus dados não podem ser tratados apenas com base no artigo 6.º, n.º 1, alínea b), do RGPD. Quando o RGPD se aplica, a origem pública não dispensa automaticamente a informação sobre recolha indireta do artigo 14.º. O operador deve avaliar e registar fundamento autónomo, prazos de conservação e exceções à informação, prestando a informação aplicável nos prazos legais. Sem garantias necessárias, deve desativar recolha ou cache pública; não se promete contactar individualmente todos os autores. Comentários escritos localmente ficam atualmente apenas no localStorage; não foi encontrado caminho de publicação num servidor de comentários.

Não foi encontrado um caminho de envio do corpo dos ficheiros de áudio locais, mas a correspondência de letras ou o contexto de recomendação pode enviar título, artista, álbum, duração ou identificadores. As capas incorporadas extraídas como data URL também podem ser enviadas com um evento de favorito e entrar no catálogo remoto partilhado de faixas, que pode devolvê-las na pesquisa de todo o site ou nas sugestões públicas. A reposição do perfil não garante a limpeza desse catálogo ou dos seus índices externos; o facto de o corpo do áudio não ser enviado não significa que as imagens e metadados associados permaneçam no dispositivo.

## 4. Caminhos opcionais e diferenças de configuração

| Caminho | Finalidade e dados possíveis | Limites da verificação |
| --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Pesquisa agregada e complemento entre fontes; consultas ou identificadores de conteúdos | Ativo por predefinição no código quando o interruptor não está definido, mas desligado no exemplo de ambiente e no Compose; verificar o estado real |
| Lyriva (`api.lyriva.xyz`) | Fonte alternativa de letras; identificadores ou parâmetros de correspondência | Controlada por `SONIC_ENABLE_LYRIVA` e outras configurações |
| Musixmatch (`apic-desktop.musixmatch.com`) | Complemento de letras | A implementação é mantida na RC, mas `isSourceEnabledByPolicy` não tem um ramo Musixmatch e a chamada efetiva é bloqueada pela condição false; o fallback de letras do `main` antigo pode ser chamável e deve ser confirmado na implementação; não se deve descrever a RC como ativa nem como disponível através de um interruptor comum |
| Serviço de alertas configurado pelo operador | Apenas quando existe um `SONIC_ALERT_WEBHOOK_URL` válido e um alerta é acionado; envia contagens do sistema, versão da publicação, momento, resumo com credenciais ocultadas e IP de saída do nó emissor | Ativação, destinatário, papéis, transferência e conservação dependem da instância; notas do administrador e mensagens de erro podem conter dados pessoais, e a ocultação não é anonimização |
| ListenBrainz / MusicBrainz | Reforço de artistas semelhantes; identificadores de artistas ou gravações | Controlado por `SONIC_ENABLE_LISTENBRAINZ` e outras configurações |
| Gorse | Recomendação externa; identificadores pseudónimos, feedback comportamental, marcas temporais, identificadores de faixas, etiquetas, títulos e artistas do catálogo | Integração através de `SONIC_GORSE_URL` e outras configurações; a reposição atual não garante a eliminação do feedback externo nem dos registos das faixas |
| Meilisearch | Serviço opcional de pesquisa; consultas originais e dados de catálogo | Integração e prazos de conservação a verificar por instância; não tratar como consultas anónimas |
| Complemento entre fontes | Correspondência de conteúdos entre plataformas; metadados de músicas | Pedidos dependem do caminho de correspondência; disponibilidade não significa licença sobre conteúdos |

Configurar um interruptor não equivale a consentimento do utilizador. A lacuna de consentimento da personalização e do Auto DJ ativos por predefinição consta da secção 5 da [Política de Privacidade](/pt/privacy-policy/). Tratamentos opcionais sem fundamento e escolha necessários devem ser suspensos; mudar apenas o nome do terceiro não contorna os requisitos.

## 5. Partilha por exigência legal

Ao receber pedidos de acesso a dados, devem verificar-se a identidade de quem pede, a competência, o fundamento concreto e o âmbito, fornecendo apenas os dados legalmente necessários e registando os motivos. A notificação da pessoa depende da lei aplicável e de restrições válidas; uma denúncia, suspeita de infração ou cessação do serviço não determina automaticamente a entrega de todos os dados à polícia.

A obrigação legal em que assente a divulgação também não substitui requisitos de transferência internacional. Antes de submeter problemas em Issues ou comunidades públicas, remova dados pessoais, credenciais e informações privadas dos comentários de outras pessoas.

## 6. Transferências internacionais

O RGPD aplica-se segundo o artigo 3.º; gratuitidade, natureza não lucrativa ou mera acessibilidade a partir da União Europeia não excluem nem estabelecem automaticamente a aplicação. Só quando o capítulo V do RGPD se aplique à transferência concreta de dados pessoais se verificam, caso a caso e segundo destinatários, locais e papéis reais, os requisitos do artigo 44.º, a decisão de adequação aplicável do artigo 45.º ou outras garantias válidas do artigo 46.º. Nem todo o IP estrangeiro ou pedido de conteúdo pode ser designado indiscriminadamente transferência do capítulo V. O site não transforma todo o RGPD numa garantia contratual mundial e não verificou a localização do responsável, os países do plano de dados ou todos os destinos dos pedidos; não se pode presumir alojamento em Taiwan nem jurisdição fixa.

1. As transferências para países terceiros sujeitas ao RGPD devem cumprir individualmente o artigo 44.º, verificando a decisão de adequação aplicável do artigo 45.º ou outras garantias válidas do artigo 46.º.
2. O uso de cláusulas contratuais-tipo continua a exigir confirmação das partes abrangidas, âmbito do tratamento, avaliação da transferência e medidas suplementares necessárias; a oferta pública de cláusulas pelo fornecedor não prova implementação na instância.
3. Certificações ISO/SOC, políticas dos fornecedores ou aceitação desta página não constituem automaticamente fundamento lícito de transferência; textos de pesquisa, IP e identificadores pseudónimos não podem ser globalmente excluídos dos dados pessoais.
4. Nos termos da lei, pode pedir explicações ou cópias das garantias por `privacy@epocanvas.com`; segredos comerciais necessários podem ser adequadamente ocultados, mas a confidencialidade não elimina deveres legais de transparência.

## 7. Manutenção da lista

Antes de ativar novos tratamentos ou destinatários, o operador deve verificar finalidades, fundamentos, âmbito dos dados, prazos, nós e papéis reais, atualizando atempadamente a informação; novo consentimento necessário deve ser obtido separadamente. O documento não prova que isso foi feito nem autoriza ativação apenas por existir um caminho no código.

Se a lista e o tratamento real divergirem, devem corrigir-se as informações e resolver-se transferências indevidas, não apenas declarar que «prevalece o código». As obrigações de operadores próprios decorrem da lei e das licenças efetivamente aplicáveis; copiar esta página não cria obrigações contratuais adicionais perante o autor do projeto. Contacto: `privacy@epocanvas.com`.
