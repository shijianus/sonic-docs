---
title: Panorama de privacidade e termos
description: "Panorama dos documentos legais do Sonic: identidade da plataforma, delimitação dos papéis no tratamento de dados, linha de base de proteção de nível RGPD, arquitetura documental, ordem de prevalência e pontos de contacto."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.3**

Esta página orienta por todos os documentos legais do serviço Sonic (a seguir designado «o serviço») e esclarece os papéis das partes, a arquitetura documental e a ordem de aplicação. Antes de iniciar sessão ou de utilizar o serviço, deve ler esta página, bem como a [Política de Privacidade](/pt/privacy-policy/) e os [Termos de Utilização](/pt/terms-of-service/).

![Arquitetura dos documentos legais do Sonic: os Termos de Utilização na camada contratual, a Política de Privacidade e a Política de Utilização Aceitável na camada de políticas, e o Processamento de dados e segurança, a Lista de partilha com terceiros e transferências e as Definições de termos como documentos de suporte, tudo assente numa linha de base de proteção de dados de nível RGPD](/images/sonic/legal-architecture.svg)

*Figura: arquitetura dos documentos legais deste site. Os Termos de Utilização fixam as condições contratuais; a Política de Privacidade contém a informação e os padrões de tratamento dos dados pessoais; a Política de Utilização Aceitável fixa os limites de conduta; os outros três documentos são de suporte. A linha de base de proteção de dados adota o RGPD como padrão mínimo para todos os utilizadores.*

## 1. Identidade da plataforma

O Sonic é uma plataforma de streaming musical de código aberto que funciona com «plano de controlo na edge da Cloudflare + plano de dados com motor de protocolos local em Linux», publicando o código-fonte conforme o ficheiro `LICENSE` na raiz do repositório (MIT License). O serviço pode prestar-se nas duas formas seguintes:

1. Instância gerida: site público operado ao público pela equipa de operação (`sonic.epocanvas.tech`, site principal, e `sonic.epocanvas.com`, espelho de reserva);
2. Instância de implantação própria: site privado que qualquer pessoa, equipa ou organização implanta por si, com base no código aberto, nos seus próprios servidores e domínios.

As duas formas partilham o mesmo código aberto; a diferença está no operador e no responsável: nas instâncias geridas, assume-a a equipa de operação; nas de implantação própria, quem as implantou.

## 2. Delimitação dos papéis no tratamento de dados

Os documentos legais do serviço adotam a divisão de papéis «responsável pelo tratamento / subcontratante», correspondente à classificação geral do Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia.

| Cenário | Responsável pelo tratamento | Subcontratante |
| --- | --- | --- |
| Instância gerida | Equipa de operação (no que respeita a eventos comportamentais, inícios de sessão e registos de segurança) | Cloudflare, Epomail (autenticação), entre outros; lista completa na [Lista de partilha com terceiros e transferências](/pt/sub-processors/) |
| Instância de implantação própria | Pessoa singular ou organização que implantou a instância (responsável pelo tratamento único e exclusivo) | Fornecedores de infraestrutura configurados por esse responsável pela implantação |

O código aberto em si não recolhe, não envia e não comunica de volta quaisquer dados de telemetria; salvo os serviços externos configurados pelo próprio operador da instância, os autores a montante não acedem aos dados de operação de qualquer instância. A partir do momento da implantação, quem implanta passa a ser o responsável pelo tratamento dos dados dos seus utilizadores, devendo cumprir, nos termos da lei aplicável do seu local, os deveres de informação, de manutenção da segurança e de sujeição a supervisão, podendo usar a documentação deste site como modelo base da sua informação e dos seus termos.

## 3. Arquitetura documental

Os documentos legais deste site organizam-se por temas, citam-se mutuamente e constituem em conjunto o quadro integral das disposições:

| Documento | Conteúdo |
| --- | --- |
| [Apresentação do projeto](/pt/project/) | Posicionamento do produto, funcionalidades principais, arquitetura técnica, desenho de segurança e privacidade e formas de implantação |
| [Política de Privacidade](/pt/privacy-policy/) | Recolha e utilização de dados pessoais, fundamentos legais, prazos de conservação, direitos dos titulares e transferências internacionais |
| [Termos de Utilização](/pt/terms-of-service/) | Condições contratuais de utilização do serviço, regras de conta, limitação de responsabilidade, lei aplicável e resolução de litígios |
| [Política de Utilização Aceitável](/pt/acceptable-use/) | Limites de conduta, lista de condutas proibidas, escadaria de execução e procedimento de reclamação |
| [Processamento de dados e segurança](/pt/data-security/) | Ciclo de vida dos dados, matriz de tratamento, medidas de segurança, limitações conhecidas e resposta a incidentes |
| [Lista de partilha com terceiros e transferências](/pt/sub-processors/) | Destinatários da partilha, dados envolvidos e garantias das transferências |
| [Definições de termos](/pt/key-terms/) | Definição da terminologia legal (vocabulário do RGPD) e da terminologia técnica usada nos documentos legais deste site |

## 4. Linha de base de proteção de dados

O serviço adota o Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia como padrão mínimo de proteção de dados para **todos os utilizadores**: esteja onde estiver no mundo, os seus direitos de informação, acesso, retificação, eliminação, limitação, portabilidade, oposição e reclamação quanto aos dados pessoais não ficam abaixo do nível previsto no RGPD.

1. Para os utilizadores situados na União Europeia e no Espaço Económico Europeu, o RGPD aplica-se diretamente;
2. Para os utilizadores das restantes regiões, o serviço assume o padrão do RGPD como compromisso de self-service, cumprido a título de obrigação contratual;
3. As proteções mais fortes conferidas pela lei do seu local prevalecem, no seu âmbito.

Esta linha de base significa: embora a instância gerida opere em Taiwan e a lei aplicável aos Termos de Utilização seja a do local do operador (ver a secção 11 dos [Termos de Utilização](/pt/terms-of-service/)), as matérias de proteção de dados executam-se tendo o nível do RGPD como limite mínimo; o exercício dos direitos dos titulares, a notificação das violações e os deveres de segurança cumprem-se segundo este padrão.

## 5. Ordem de prevalência

1. Em matéria de privacidade, a [Política de Privacidade](/pt/privacy-policy/) é a disposição especial; em matéria de condições de utilização do serviço, os [Termos de Utilização](/pt/terms-of-service/) são a disposição especial; as restantes matérias interpretam-se segundo a arquitetura enumerada nesta página.
2. Havendo incongruência entre documentos, prevalece o documento diretamente relacionado com a matéria em causa.
3. Os documentos legais deste site têm como versão oficial a versão em Chinês Simplificado; as versões nas restantes línguas, incluindo a presente versão em Português, são traduções de referência e, em caso de dúvida na interpretação, prevalece a versão oficial.

## 6. Pontos de contacto

- Privacidade e pedidos de proteção de dados: `privacy@epocanvas.com`
- Serviço e conta: `admin@epocanvas.com`
- Projeto de código aberto: Issues do repositório GitHub (`github.com/shijianus/sonic`)
- Sites de implantação própria: contacte o operador indicado pelo próprio site
