---
title: Definições de termos
description: Termos de proteção de dados, papéis, consentimento, tecnologia e tratamento de dados locais nos documentos legais do Sonic.
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta página explica os termos principais da [Política de Privacidade](/pt/privacy-policy/), de [Processamento de dados e segurança](/pt/data-security/), da [Lista de partilha com terceiros e transferências](/pt/sub-processors/) e da [Política de Utilização Aceitável](/pt/acceptable-use/). As definições legais usam o RGPD como referência; as descrições técnicas baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção e a sua conformidade continuam por verificar. O chinês simplificado da raiz é a base de manutenção e as restantes nove versões são traduções; a prioridade linguística não reduz a lei imperativa nem o direito dos consumidores a cláusulas claras e compreensíveis.

![Mapa de termos do Sonic: papéis legais, estados dos dados, operações de tratamento e componentes técnicos](/images/sonic/key-terms-map.svg)

*Figura: termos agrupados por papéis legais, estados dos dados e implementação técnica; o esquema não amplia a qualidade jurídica de qualquer participante.*

## 1. Terminologia legal

| Termo | Definição |
| --- | --- |
| Dados pessoais | Qualquer informação relativa a pessoa singular identificada ou identificável (artigo 4.º, n.º 1, do RGPD). IP, cookies, termos de pesquisa, URLs de avatares, nomes ou textos em comentários e identificadores pseudónimos associáveis podem ser dados pessoais. |
| Tratamento | Qualquer operação sobre dados pessoais, incluindo recolha, registo, conservação, consulta, utilização, transmissão, divulgação, limitação ou eliminação (artigo 4.º, n.º 2, do RGPD). |
| Limitação do tratamento | Suspender a utilização em determinadas situações, conservando os dados (artigo 18.º do RGPD). |
| Definição de perfis | Análise ou avaliação automatizada de características ou comportamentos pessoais. Reprodução, pesquisa, saltos, favoritos, rejeições e contexto podem servir recomendações; um perfil não equivale a uma decisão com efeitos jurídicos ou similarmente significativos. |
| Pseudonimização | Tratamento que impede a atribuição direta a uma pessoa sem informações adicionais (artigo 4.º, n.º 5, do RGPD). Os dados pseudonimizados podem continuar a ser identificados por combinação e não equivalem a anonimização. |
| Responsável pelo tratamento | Pessoa singular ou coletiva que determina, individualmente ou em conjunto, finalidades e meios do tratamento (artigo 4.º, n.º 7, do RGPD). Na instância alojada, depende de quem efetivamente decide; autor do código, colaboradores e operador podem ser diferentes. |
| Subcontratante | Pessoa singular ou coletiva que trata dados pessoais por conta do responsável (artigo 4.º, n.º 8, do RGPD). O papel depende de finalidades, instruções e acordos reais; Cloudflare, Epomail ou outros fornecedores não são automaticamente subcontratantes pelo nome. |
| Destinatário | Pessoa singular ou coletiva a quem os dados pessoais são divulgados (artigo 4.º, n.º 9, do RGPD). Um serviço que recebe IP por ligação direta do navegador também pode ser destinatário. |
| Terceiro | Entidade distinta do titular, do responsável, do subcontratante ou das pessoas autorizadas a tratar os dados (artigo 4.º, n.º 10, do RGPD). |
| Consentimento | Manifestação afirmativa livre, específica, informada e inequívoca (artigo 4.º, n.º 11, e artigo 7.º do RGPD), que pode ser retirada a qualquer momento de forma tão fácil como foi prestada. Início de sessão, continuação do uso ou ativação predefinida não constituem consentimento para perfis opcionais; a falta de registo de consentimento não justifica recusar cessar tratamento sem fundamento. |
| Violação de dados pessoais | Incidente de segurança que provoque destruição, perda, alteração, divulgação ou acesso não autorizados a dados pessoais, de forma acidental ou ilícita (artigo 4.º, n.º 12, do RGPD). |
| Autoridade de controlo competente | Autoridade pública que supervisiona legalmente obrigações de proteção de dados. Quando se aplica o RGPD, o titular pode reclamar à autoridade competente (artigo 77.º do RGPD). |
| Transferência internacional | Transferência de dados pessoais para países terceiros ou organizações internacionais fora da União Europeia ou do Espaço Económico Europeu; exige avaliar locais, entidades e garantias reais, não presumir pelo nome do servidor. |
| Categorias especiais de dados | Dados que revelem origem racial ou étnica, opiniões políticas, crenças religiosas ou filosóficas, filiação sindical, dados genéticos ou dados biométricos destinados à identificação inequívoca de uma pessoa singular, saúde, vida sexual ou orientação sexual, entre outros (artigo 9.º do RGPD). Preferências musicais e pesquisas também podem revelar indiretamente características sensíveis e não são globalmente isentas de risco. |
| Titular dos dados | Pessoa singular identificada ou identificável cujos dados são tratados; «você» ou «si» designa nesta página a pessoa que apresenta um pedido ou utiliza o serviço. |

## 2. Terminologia técnica e do produto

| Termo | Definição |
| --- | --- |
| Instância alojada | Implantação Sonic cujo acesso é efetivamente prestado pelo operador do projeto; âmbito, responsável, configuração e contactos na [Política de Privacidade](/pt/privacy-policy/). |
| Implantação própria | Instância independente operada por outra pessoa. O operador avalia por si identidade do responsável, lei, configuração e informação; fornecer código MIT não torna o projeto seu operador. |
| Plano de controlo | Componentes que tratam páginas, encaminhamento, cache, limitação ou API de edge; podem contactar IP, cookies, cabeçalhos de autenticação, User-Agent, caminhos e contexto. |
| Plano de dados | Componentes do motor, cálculo de recomendações, bases de dados e serviços relacionados. A verificação atual encontrou possível envio de IP em bruto ao motor com cookies, cabeçalhos ou contexto; não se pode afirmar que recebe apenas dados pseudónimos. |
| Epomail OAuth | Início de sessão OAuth 2.0 via Epomail com PKCE; pode devolver identificador, correio eletrónico e indicador de verificação, alcunha, URL do avatar e papel. |
| API Key / `jti` | Credencial de API assinada e com prazo, e o seu identificador único. Verificar a assinatura não é cifrar; cookies, cópias de credenciais e armazenamento de revogação exigem avaliação separada. |
| fail-closed | Recusar pedidos quando a validação ou o armazenamento necessário falha, em vez de degradar silenciosamente; a ocorrência real depende da verificação da configuração. |
| Defesa SSRF e lista de domínios permitidos | Verificações de saída de determinados endereços internos, loopback, metadados da nuvem, redirecionamentos ou domínios autorizados; não abrangem ligações diretas do navegador nem todo o HTTP a montante. |
| SQLite / WAL | Base SQLite e modo de registo antecipado que podem persistir dados do plano de dados; não significa que perfis, registos, cópias de segurança e radar estejam na mesma base ou sejam eliminados no mesmo prazo. |
| Circuit breaker | Mecanismo que altera temporariamente o percurso dos pedidos após falhas ou tempos excedidos; limiares, degradação e ativação dependem da versão e configuração reais. |
| Eventos comportamentais | Sinais como reprodução, progresso, saltos, favoritos, rejeições, pesquisa ou feedback de entidades que podem alimentar recomendações. Limites dos lotes, filtragem de ruído e conservação dependem da versão e configuração. |
| Sugestões públicas de pesquisa | Caminho que fornece a outros visitantes termos históricos ou estatísticos. Há atualmente possibilidade de reutilização do texto original; não basta chamar-lhe agregação anónima. |
| Radar | Funções e estados de exploração, recomendação ou sincronização gerados a partir de dados ou comportamento do utilizador. Não se confirmou caminho persistente no motor; existem tentativas de sincronização ou armazenamento isolado, sem poder prometer existência ou ausência de registos duradouros na base de dados. |
| Música local | Ficheiros ou Blobs no dispositivo. Não foi encontrado caminho de envio dos Blobs de áudio local ao servidor; consultas de letras e contexto de recomendação podem ainda enviar título, artista, álbum, duração ou identificadores. |
| Comentários locais | Rascunhos ou conteúdos atualmente escritos no localStorage; isso não significa publicação num servidor de comentários. Ler comentários pode obter nomes, avatares e textos de outras pessoas e colocá-los em cache pública. |
| Ligação direta / proxy | O proxy pede recursos pelo servidor; a ligação direta é feita pelo navegador ao CDN de conteúdos. A ligação direta expõe IP e informação de ligação ao destino; pedidos de stream podem usar o User-Agent do navegador, não necessariamente um valor fixo. |
| Versão e configuração | Predefinições do código, `.env`, Compose e produção podem diferir. O GDStudio fica ativo no código se a opção não estiver definida, mas ambiente ou Compose podem desligá-lo; verificar a configuração efetiva. |

## 3. Base de interpretação

1. Termos legais só se usam quando os requisitos reais estejam preenchidos; «projeto individual», «gratuito» e «código aberto» não são sinónimos de responsável, subcontratante, consentimento, anonimização ou conformidade de segurança.
2. Termos técnicos verificam-se conjuntamente com código, ambiente real e caminhos de pedidos aos fornecedores. Se objetivos dos README e documentação divergirem, não se podem tratar objetivos como garantias. Divergências entre código, configuração e páginas exigem cessar afirmações mais fortes e corrigir as páginas correspondentes.
3. O chinês simplificado é a base de manutenção dos documentos legais, e as outras nove línguas são versões de comparação. Divergências entre traduções e raiz devem ser sincronizadas rapidamente, sem afetar lei imperativa ou direitos dos consumidores a informação clara e compreensível.
4. No RC `a75f5cb`, os ficheiros de licença da raiz e do leitor são MIT; na versão antiga `main@ce443c8`, apenas a licença MIT do leitor foi verificada e não foi encontrado `LICENSE` na raiz. Estas definições não restringem cópia, modificação, distribuição ou uso comercial permitidos pela licença aplicável. A [Política de Utilização Aceitável](/pt/acceptable-use/) só regula os recursos realmente alojados e a conduta nesse serviço.
5. Fonte funcional verificada: candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), distinto da versão antiga `main@ce443c8` (2026-10-27 UTC); revisão em 2026-11-02. O RC não é uma GitHub Release oficial e não confirma a versão em produção.
