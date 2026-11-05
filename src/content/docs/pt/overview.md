---
title: Panorama de privacidade e termos
description: Prestador, âmbito da proteção de dados, relação entre documentos e condições de implementação atuais do projeto individual de teste Sonic sem fins lucrativos.
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta página explica a relação entre os documentos do serviço de teste alojado do Sonic. O projeto é mantido por uma pessoa, é gratuito e sem fins lucrativos e destina-se à aprendizagem e a testes de interesse público; não há nível de serviço comercial nem compromisso de funcionamento perpétuo. Leia primeiro os [Termos de Utilização](/pt/terms-of-service/) e a [Política de Privacidade](/pt/privacy-policy/) para conhecer o âmbito do serviço e o tratamento dos dados.

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

:::caution[Revisão documental e implantação efetiva]
A revisão documental distingue o candidato público da versão antiga de `main`. Não foram examinados o ambiente em produção, os contratos com fornecedores nem os resultados reais da eliminação. Perfis ativos por predefinição, sugestões públicas de termos de pesquisa, pedidos de avatares com correio eletrónico, cobertura da eliminação e prazos reais de conservação continuam a exigir concretização; atualizar a política não prova que estes problemas foram corrigidos. Os tratamentos sem fundamento lícito e garantias necessárias devem ser suspensos.
:::

![Relação entre os documentos do Sonic: termos de serviço, informação de privacidade, regras de utilização e informação sobre dados](/images/sonic/legal-architecture.svg)

*Figura: os documentos têm finalidades diferentes; o tratamento de dados pessoais exige um fundamento de licitude que se sustente autonomamente.*

## 1. Projeto e operador

O repositório público de código é [shijianus/sonic](https://github.com/shijianus/sonic); no RC `a75f5cb`, a raiz e o leitor usam a licença MIT. Na versão antiga `main@ce443c8`, apenas a licença MIT do leitor foi verificada e não foi encontrado `LICENSE` na raiz; não se extrapola a licença do RC para todas as versões históricas. A finalidade não lucrativa do projeto não revoga a licença do código nem concede direitos de utilização sobre músicas, letras, capas ou MV.

Estes documentos do serviço destinam-se às instâncias alojadas `sonic.epocanvas.tech` e `sonic.epocanvas.com` que efetivamente os adotem. O operador real deve indicar a sua identidade legal e contactos acessíveis; a conta de manutenção `shijianus` ou a marca EpoCanvas não substitui a informação completa sobre a identidade. O código-fonte não prova o nome legal, a localização do operador ou os países dos servidores, que aqui não se presumem.

Outras implantações têm os seus próprios operadores e regras. Publicar código, contribuir com correções ou fornecer uma ferramenta offline não implica automaticamente responsabilidade pelos serviços e dados de todas as instâncias; quando exista também operação efetiva ou participação na decisão sobre o tratamento, a responsabilidade depende do papel real.

## 2. Papéis relativos aos dados

| Participante | Como se aprecia o papel | Informação deste projeto |
| --- | --- | --- |
| Operador da instância alojada | Quem determina efetivamente as finalidades e os meios dos dados pessoais | Responde pelo seu início de sessão, pedidos, recomendações e tratamentos relacionados |
| Fornecedor de infraestrutura | Trata por instruções ou para finalidades próprias | O papel da Cloudflare e de outros depende do serviço e do contrato concretos |
| Epomail e fornecedores de conteúdos e recursos | Podem ser responsáveis independentes; certos casos exigem avaliação específica | Nem todos os terceiros são designados indiscriminadamente subcontratantes |
| Operadores de instâncias próprias e colaboradores do código | Depende de determinarem ou participarem efetivamente no tratamento | A designação de implantação ou colaboração não fixa automaticamente responsabilidade única e exclusiva |

Os fluxos reais incluem perfis opcionais, contexto de pedidos, dados do navegador, recursos externos diretos e estatísticas de pesquisa. As designações de código aberto ou armazenamento local não significam ausência de envio, e não iniciar sessão ou usar hashes não equivale a anonimato. Os detalhes devem seguir a informação rigorosa da política de privacidade, e as descrições técnicas devem manter-se alinhadas.

## 3. Finalidade dos documentos

| Documento | Finalidade |
| --- | --- |
| [Termos de Utilização](/pt/terms-of-service/) | Condições do serviço alojado, direitos sobre conteúdos, limites de funcionamento e responsabilidade |
| [Política de Privacidade](/pt/privacy-policy/) | Responsável, dados, finalidades, fundamentos, destinatários, conservação e direitos |
| [Política de Utilização Aceitável](/pt/acceptable-use/) | Recursos públicos, testes autorizados, condutas proibidas e medidas |
| [Processamento de dados e segurança](/pt/data-security/) | Desenho real de segurança, lacunas, gestão de incidentes e medidas segundo o risco |
| [Lista de partilha com terceiros e transferências](/pt/sub-processors/) | Recursos externos, papéis independentes, configuração e condições internacionais |
| [Definições de termos](/pt/key-terms/) | Dados pessoais, pseudonimização, definição de perfis e termos técnicos |
| [Gestão de dados](/pt/data-management/) | Operações do utilizador e limites da sua cobertura |

## 4. Objetivo de proteção, riscos e lei aplicável

A aplicação do RGPD depende do seu artigo 3.º e dos factos concretos; oferecer serviços gratuitos a pessoas na União Europeia ou controlar o seu comportamento na União pode estar abrangido, e o simples acesso a partir do estrangeiro também não determina, isoladamente, a conclusão. A natureza não lucrativa, o código aberto e a aprendizagem não constituem isenção global; a atividade exclusivamente pessoal ou doméstica aprecia-se pelo âmbito efetivo.

As medidas escolhem-se conforme a escala do tratamento, o risco e o custo de implementação. Um pequeno projeto individual não tem de nomear indiscriminadamente um encarregado da proteção de dados, obter certificações, contratar auditorias comerciais ou criar uma equipa permanente; os limiares específicos do artigo 37.º, do artigo 35.º e do artigo 27.º do RGPD continuam a exigir avaliação separada. A definição contínua de perfis não pode ser chamada «ocasional» apenas pelo número reduzido de pessoas. Mantêm-se a identificação necessária, o fundamento válido, a minimização, a segurança e o tratamento dos direitos.

O respeito pela privacidade orienta a conceção e a melhoria do serviço. O objetivo é desenvolver esforços razoáveis para proporcionar um nível elevado de proteção, com medidas rigorosas e proporcionais aos riscos, tomando como referência os princípios do RGPD da minimização dos dados, da limitação das finalidades, da transparência e do controlo pelos utilizadores. Este objetivo não é uma certificação europeia nem uma declaração de conformidade integral com o RGPD e com as leis de todos os Estados-Membros. Não garante segurança absoluta, ausência de fugas ou perdas de dados nem a sua eliminação imediata e integral. A proteção efetiva depende da implantação, da configuração e dos tratamentos de terceiros; devem distinguir-se as medidas constatadas no código, os elementos não verificados e os riscos conhecidos.

A lei aplicável depende da situação real; tomar o RGPD como referência não cria uma garantia contratual mundial adicional de cumprimento de todo o seu regime. Os esforços razoáveis não reduzem as obrigações legais aplicáveis, e a divulgação dos riscos não lhe exige aceitar um tratamento ilícito nem renunciar aos seus direitos. Independentemente da lei aplicável, devem descrever-se os dados com exatidão, cumprir os compromissos assumidos e respeitar os direitos irrenunciáveis dos utilizadores.

## 5. Interpretação e versões

A lei imperativa prevalece. As condições do serviço seguem os termos de utilização, e a informação dos dados segue a política de privacidade; explicações técnicas, imagens ou apresentações antigas de funções não ampliam autorizações de tratamento, nem a expressão «prevalece o código-fonte» dispensa responsabilidade por informação incorreta. As contradições identificadas devem ser corrigidas e comunicadas aos utilizadores afetados.

O chinês simplificado é a base de manutenção e as restantes nove versões linguísticas são traduções; a prioridade do chinês não pode excluir interpretação favorável ao consumidor nem informação compreensível. A data indicada é a data de revisão documental; antes da adoção numa implantação ou de alterações reais do tratamento, continuam a ser necessárias informação eficaz e, quando aplicável, obtenção separada de consentimento.

## 6. Contactos

Serviço e conta: `admin@epocanvas.com`; privacidade e pedidos de direitos: `privacy@epocanvas.com`. Estes endereços são propostos na documentação, mas a sua publicação no código a montante examinado não foi confirmada nem foi testada a entrega através do envio de mensagens. Não constituem uma declaração de nomeação de representante na União Europeia ou de encarregado da proteção de dados. O operador de cada instância deve confirmar ou corrigir os canais que publica e assegurar que funcionam.

Os problemas técnicos podem ser comunicados em [GitHub Issues](https://github.com/shijianus/sonic/issues); não submeta dados pessoais, palavras-passe ou credenciais de sessão. As instâncias de terceiros devem ser tratadas com o respetivo operador.
