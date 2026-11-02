---
title: Processamento de dados e segurança
description: Ciclo de vida dos dados, limites do tratamento, medidas de segurança, limitações conhecidas, resposta a violações e orientação para implantação própria do Sonic.
---

**Data de revisão: 2 de novembro de 2026｜Versão: 1.8**

Esta página desenvolve a secção 10 da [Política de Privacidade](/pt/privacy-policy/) e explica os limites visíveis do tratamento e da segurança das instâncias alojadas do Sonic. Este projeto gratuito e sem fins lucrativos é mantido por uma pessoa. O seu objetivo é respeitar a privacidade e, mediante esforços razoáveis, proporcionar um nível elevado de proteção com medidas rigorosas e proporcionais aos riscos. Os princípios do RGPD da minimização dos dados, da limitação das finalidades, da transparência e do controlo pelos utilizadores orientam a melhoria contínua.

Este objetivo não constitui uma certificação europeia nem uma declaração de conformidade integral com o RGPD e com as leis de todos os Estados-Membros. Não garante segurança absoluta, ausência de fugas ou perdas de dados nem a sua eliminação imediata e integral. A proteção efetiva depende da implantação, da configuração e dos tratamentos de terceiros; esta página distingue as medidas constatadas no código, os elementos não verificados e os riscos conhecidos. Os esforços razoáveis não reduzem as obrigações legais aplicáveis, e a divulgação dos riscos não lhe exige aceitar um tratamento ilícito nem renunciar aos seus direitos.

Esta página resulta da comparação de código e materiais de auditoria, não certifica configuração em produção, funcionamento, contratos de fornecedores ou conformidade contínua. As descrições funcionais baseiam-se no repositório `shijianus/sonic`, no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as proteções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar. O chinês simplificado da raiz é a base de manutenção e as outras nove versões são traduções; a prioridade linguística não reduz a lei imperativa nem o direito dos consumidores a cláusulas claras e compreensíveis.

![Estrutura de segurança do Sonic em quatro camadas: transmissão e acesso, autenticação, pedidos de saída, armazenamento e registos, com controlos que exigem configuração do operador](/images/sonic/security-shield.svg)

*Figura: estrutura dos controlos; não significa que estejam ativados ou cumpram requisitos de conformidade em todas as implantações.*

## 1. Ciclo de vida dos dados

| Fase | Factos e limites atualmente verificáveis |
| --- | --- |
| Recolha | O início de sessão é prestado por Epomail OAuth; reprodução, pesquisa e recomendação podem gerar eventos. A personalização está ativa por predefinição no código candidato atual; isso não é consentimento para perfis opcionais. |
| Transmissão | Percursos entre navegador, edge, plano de dados e origens variam por implantação. Caminhos internos e alguns a montante usam HTTP em texto simples, impedindo afirmar TLS em toda a cadeia; MV, capas, tipos de letra ou avatares podem ser pedidos diretamente pelo navegador. |
| Armazenamento | O navegador pode guardar conta, fila, histórico, preferências, música local e cache; locais e prazos reais de dados comportamentais, registos, cópias e registos dos fornecedores devem ser verificados por implantação. |
| Utilização e partilha | Pesquisa, reprodução e sessão respondem a pedidos; perfis, Auto DJ, estatísticas e sugestões públicas podem usar contexto comportamental ou de pesquisa. Destinatários e interruptores na [Lista de partilha com terceiros e transferências](/pt/sub-processors/). |
| Eliminação | A reposição atual abrange principalmente parte dos eventos ou feedback da identidade atual, sem garantir radar, agregados de pesquisa, cópias, registos, serviços externos ou identificadores anónimos antigos; revogação também depende da configuração do armazenamento e do sucesso do pedido. |

## 2. Matriz de tratamento

| Atividade | Dados que podem estar envolvidos | Limites e prazos |
| --- | --- | --- |
| Pesquisa, reprodução, letras e início de sessão solicitados | Consultas, identificadores de conteúdos, sessão e dados de conta devolvidos pela Epomail | Limitados à resposta; dados de início de sessão podem existir no navegador e na sessão. |
| Perfis comportamentais, Auto DJ e recomendações | Reprodução, progresso, saltos, favoritos, rejeições, pesquisa, identificadores pseudónimos e contexto local | Tratamento de perfis ou que pode apoiá-los; ativo por predefinição, sem presumir cessação e eliminação concluídas após recusa ou retirada. |
| Estatísticas de pesquisa e sugestões públicas | Textos originais, contagens e contexto associado | Caminhos atuais podem mostrar pesquisas dos utilizadores; sem filtros, limiares e prazos, não descrever como agregação anónima ou publicação segura. |
| Limitação de taxa e segurança | IP em bruto, cookies, cabeçalhos de autenticação, User-Agent, contexto e chaves derivadas de conta ou sessão | Podem acompanhar pedidos enviados ao motor; a alegação de limitação ao necessário à prevenção de abuso, ligação e segurança deve ser verificada nas rotas reais. |
| Dados locais e comentários | localStorage, IndexedDB, música importada, cache de descargas, comentários locais e a montante | Não foi encontrado envio do corpo dos Blobs de áudio local; letras e recomendações podem enviar título, artista, álbum, duração ou identificadores. As capas incorporadas extraídas como data URL podem entrar num catálogo remoto partilhado com um evento de favorito e ser devolvidas pela pesquisa do site ou por sugestões públicas. Comentários a montante podem conter nomes, avatares e textos alheios e entrar em cache pública. |
| Apoio, litígios e obrigações legais | Correio eletrónico, descrição, provas necessárias e registos de tratamento enviados por iniciativa do utilizador | Conservar apenas durante o necessário ao pedido, litígio ou obrigação; não há prazo uniforme verificado para cópias do anfitrião. |

Fundamentos legais, prazos e destinatários devem ser avaliados individualmente segundo finalidades, utilizadores e configuração reais. Gratuitidade, manutenção individual e código aberto não reduzem automaticamente exigências de segurança ou informação.

## 3. Medidas de segurança

### 3.1 Transmissão e acesso

1. Os pontos públicos podem configurar HTTPS, OAuth, sessões assinadas e chaves entre serviços; os controlos no código não provam TLS em todos os pontos reais, proxies e serviços a montante.
2. O túnel cifrado entre planos e a ligação do plano de dados apenas ao loopback dependem da configuração de alojamento. Caminhos HTTP internos em texto simples bastam para refutar uma afirmação geral de cifragem em toda a cadeia.
3. A validação de destinos e restrições de domínio das rotas proxy só cobre pedidos que passam efetivamente pelo proxy. A auditoria encontrou possível envio de IP em bruto com cookies, autenticação e contexto ao motor; não se pode dizer que recebe apenas dados pseudónimos.
4. Pedidos de áudio podem usar o User-Agent do navegador, não um valor fixo; ligações diretas do navegador a MV, capas, Google Fonts ou avatares podem expor IP e metadados de ligação aos respetivos serviços.

### 3.2 Autenticação e chaves

1. O RC verificado usa OAuth state e PKCE, com sessão assinada de 30 dias por predefinição; atributos dos cookies e prazos reais continuam a exigir verificação da implantação. A assinatura protege integridade, não cifra; o payload pode conter correio eletrónico, utilizador ou papel. Os riscos de credenciais em URL da versão antiga `main@ce443c8` são um aviso de compatibilidade, não uma prova de que essa versão disponha das proteções do RC.
2. Falhas de validação da versão, assinatura, tempo ou `jti` da API Key devem recusar o pedido; nomes, variáveis de ambiente ou comentários de desenho não provam controlos completos de autenticação.
3. A eficácia imediata do término de sessão ou revogação em lote depende do armazenamento, dos interruptores e do sucesso do pedido; sem ativação ou verificação, não se garante invalidação imediata de todas as credenciais copiadas.

### 3.3 Defesa dos pedidos de saída

O código inclui algumas verificações SSRF, de redes privadas e redirecionamentos e uma lista de domínios musicais permitidos. Isso não significa que todos os pedidos a montante ou do navegador para terceiros sejam enviados por proxy, limpos ou anonimizados. A DiceBear tem um caminho de URL de avatar com correio eletrónico em texto simples como seed; ligações diretas a Google Fonts, MV e capas podem mostrar o IP aos serviços. Alguns fornecedores usam HTTP, impedindo afirmar TLS em toda a cadeia.

### 3.4 Armazenamento e registos

1. `auth`, `audio`, `library`, `global`, `settings`, `recommend` e IndexedDB conservam dados no navegador conforme a função; terminar sessão não limpa automaticamente todo o dispositivo.
2. Associar dados comportamentais no servidor por pseudónimos não impede identificação por combinação com outros dados. Pseudonimização não é anonimização nem abrange automaticamente pesquisa, radar ou dados de terceiros.
3. Não se confirmaram uniformemente rotação real, permissões e destruição no prazo dos registos da aplicação, Cloudflare, anfitrião, origens e cópias de segurança; não inventar prazos nem prometer «zero registos».
4. O Meilisearch opcional pode tratar consultas originais ou catálogo; não foi verificada a sincronização da eliminação no Gorse com a local. O sucesso de uma reposição local não substitui eliminação em armazenamento externo de pesquisa ou recomendação.

### 3.5 Limitações conhecidas

1. Personalização e Auto DJ estão ativos por predefinição, sem escolha prévia, separada e revogável demonstrável; isso não é consentimento.
2. Sugestões públicas podem reutilizar textos originais de pesquisa, expondo informação pessoal ou sensível.
3. A eliminação cobre principalmente parte dos eventos da identidade atual; não se verificou cobertura de radar, cópias, registos, serviços externos, Meilisearch, Gorse e identificadores antigos. O caminho persistente do radar no motor não foi confirmado, sem afirmar conclusivamente o seu estado de armazenamento. Depois de desativar a personalização, o Auto DJ ainda pode enviar sementes e exclusões, e o radar ainda pode enviar uma carga que o servidor recuse conservar devido à marca de desativação.
4. HTTP interno em texto simples, Google Fonts, pedidos diretos de MV e capas, User-Agent do navegador e URLs DiceBear com correio eletrónico tornam inexatas afirmações de «TLS integral» ou «o correio eletrónico não é transmitido».
5. Limitação, revogação, registos e interruptores de terceiros dependem do ambiente da instância e do fornecedor. GDStudio está ativo no código sem configuração, mas ambiente ou Compose podem desligá-lo; a lista, por si, não prova desativação predefinida.

## 4. Resposta a violações de dados

Quando se aplica o RGPD, as medidas devem ser proporcionais à natureza dos dados, escala, custo de implementação e risco real (artigo 32.º do RGPD). O operador deve registar cada violação; salvo se for improvável que resulte em risco para direitos e liberdades, deve notificá-la à autoridade competente sem demora injustificada e, quando possível, até 72 horas após o conhecimento, justificando atrasos (artigo 33.º do RGPD). Se o risco for elevado, deve ainda informar os titulares sem demora injustificada, salvo exceções legais aplicáveis (artigo 34.º do RGPD). Isto não promete comunicação automática à autoridade de um país específico nem dispensa outra lei aplicável.

A resposta real deve isolar sistemas afetados, proteger ou revogar credenciais, determinar categorias, âmbito, destinatários e cronologia, e documentar avaliação e reparação. Pode comunicar incidentes suspeitos a `privacy@epocanvas.com`; não envie palavras-passe, tokens completos, cookies de subscrição ou dados pessoais desnecessários.

## 5. Proteção de dados desde a conceção e por predefinição

O artigo 25.º do RGPD exige considerar proteção desde a conceção e por predefinição ao determinar os meios de tratamento. O projeto não pode atualmente afirmar implementação completa:

1. Perfis opcionais devem estar desligados por predefinição, com aceitação, recusa, retirada e registo igualmente acessíveis; o código atual ativa-os, e iniciar sessão ou continuar a usar não substitui consentimento.
2. Sugestões públicas devem ser primeiro desativadas ou dotadas de apresentação mínima, filtros, limiares, prazos e controlos de eliminação.
3. O seed do avatar não deve usar correio eletrónico em texto simples; Google Fonts, MV, capas e outros recursos diretos só devem ativar-se após avaliar transmissões de IP, cookies e identificadores.
4. Devem verificar-se identificadores pseudónimos antigos associáveis, radar, pesquisas, faixas partilhadas e respetivas capas, registos, Meilisearch, Gorse e cópias de segurança, procedendo à eliminação no âmbito legalmente aplicável e notificando os destinatários quando exigido. As exceções legais de conservação devem indicar motivo, âmbito e prazo; a limpeza parcial da identidade atual não pode ser apresentada como eliminação integral.

## 6. Deveres dos operadores de implantação própria

As instâncias próprias operam independentemente. As verificações desta página não criam obrigações contratuais além da lei e da licença reais nem compromissos operacionais do autor. A aplicação do RGPD depende da ligação territorial e atividade efetiva (artigo 3.º do RGPD), não sendo globalmente excluída pela gratuitidade ou manutenção individual. Os requisitos seguintes só se aplicam quando preenchidas as respetivas condições legais:

1. Adotar medidas proporcionais à natureza dos dados, escala, custos e risco real (artigo 32.º do RGPD), verificando transmissão, chaves, registos, restauro e eliminação, sem exigir indiscriminadamente equipa dedicada ou certificação a pequenos projetos.
2. Ter menos de 250 trabalhadores não dispensa automaticamente registos de atividades; tratamento não ocasional, possível risco para direitos e liberdades, categorias especiais ou dados de condenações penais e infrações podem, cada um, afastar a exceção (artigo 30.º do RGPD).
3. Designar encarregado quando se verificarem os requisitos, incluindo autoridades públicas e atividades principais de controlo regular e sistemático em grande escala ou tratamento em grande escala de categorias especiais, condenações penais e infrações (artigo 37.º do RGPD).
4. A avaliação de impacto incide, antes do tratamento, em atividades suscetíveis de alto risco; não é automaticamente exigida por cada hash, início de sessão ou projeto gratuito (artigo 35.º do RGPD).
5. Entidades fora da União sujeitas ao artigo 3.º, n.º 2, do RGPD devem, em regra, designar representante na União. A exceção de tratamento ocasional do artigo 27.º exige cumulativamente caráter ocasional, ausência de tratamento em grande escala de categorias especiais ou dados de condenações penais e infrações, e improbabilidade de risco considerando natureza, contexto, âmbito e finalidades. Gratuitidade ou natureza não lucrativa não constituem, por si, exceção.
6. Verificar `SONIC_RECOMMEND_RETENTION_DAYS`, caminho da base, alternativa em memória, ligações de terceiros e interruptores de limitação e revogação, refletindo os valores reais na informação, prazos e procedimentos de eliminação próprios.

## 7. Auditabilidade

Esta página baseia-se na revisão de 2026-11-02 do ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), distinguindo a versão antiga `main@ce443c8` (2026-10-27 UTC). É uma verificação documental, não uma GitHub Release oficial, auditoria operacional, certificação ou diligência de fornecedores; a versão em produção continua por verificar. Predefinições do código, variáveis de ambiente, Compose e serviço real podem diferir; divergências entre documentação, código e implantação exigem cessar afirmações mais fortes e corrigir os documentos.
