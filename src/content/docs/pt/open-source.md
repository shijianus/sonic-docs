---
title: Código aberto e enquadramento legal da implantação própria
description: "Código aberto e enquadramento legal do Sonic: estado da licença, limites das marcas, agradecimentos e dependências de terceiros, deveres de quem implanta e limites de conformidade."
---

**Data de revisão: 2 de novembro de 2026｜Versão: 1.8**

Esta página explica o estado e os limites do licenciamento de código aberto do Sonic, os agradecimentos a terceiros e os deveres legais da implantação própria. A relação entre a licença do software e os termos de utilização consta das secções 2 e 10 dos [Termos de Utilização](/pt/terms-of-service/).

As descrições desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02, distinguindo a versão antiga `main@ce443c8` (2026-10-27 UTC). O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

## 1. Estado da licença

| Elemento | Estado |
| --- | --- |
| Ficheiro `LICENSE` na raiz do repositório | No RC `a75f5cb`, a raiz e o leitor têm licença MIT; no antigo `main@ce443c8`, só a MIT do leitor foi verificada e não foi encontrado `LICENSE` na raiz |
| Declaração dos README históricos | Declarações históricas divergentes, incluindo CC BY-NC-SA 4.0, não substituem a MIT verificada do RC; a licença de cada versão e componente depende do respetivo texto, sem extrapolação para todo o código histórico |
| Marcas e sinais distintivos | Os nomes e sinais distintivos `epocanvas` e `Sonic` não conferem, com a licença do código-fonte, direitos de uso de marca |

A finalidade não lucrativa não é uma restrição adicional da licença. Independentemente disso: os direitos sobre gravações, letras, capas e outros conteúdos pertencem aos respetivos titulares, e o projeto não concede qualquer sublicenciamento de conteúdos musicais.

## 2. Posicionamento do projeto

O projeto é mantido por uma pessoa, gratuito e sem fins lucrativos, para aprendizagem e testes, sem SLA. Isso não restringe direitos MIT. Descargas e música local guardam-se no navegador; disponibilidade técnica, testes e aprendizagem não concedem licença nem exceção geral ao direito de autor. Ao utilizar o serviço ou implantar por si, deve confirmar por si a conformidade com a lei do seu local, os termos dos serviços a montante e os requisitos de licenciamento dos conteúdos (limites de conduta na [Política de Utilização Aceitável](/pt/acceptable-use/)).

## 3. Agradecimentos e dependências de terceiros

O desenvolvimento e a prática de agregação multifuente recorrem e agradecem aos seguintes projetos das comunidades de código aberto: Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, GDStudio Music API e a comunidade Linux.do. As dependências e declarações completas constam de `THIRD_PARTY_NOTICES.md` no repositório; os termos de cada serviço a montante regem-se pelos respetivos documentos.

## 4. Deveres legais de quem implanta por si

Quem determina efetivamente as finalidades e os meios é responsável nessa medida; testes puramente pessoais e serviços públicos exigem avaliações distintas (delimitação dos papéis na secção 2 do [Panorama](/pt/overview/)), devendo avaliar e cumprir, segundo a lei aplicável:

1. Dever de informação: informar os utilizadores das matérias de tratamento de dados, podendo usar como texto base a [Política de Privacidade](/pt/privacy-policy/) deste site, mas alterando-a conforme a sua configuração efetiva (as cadeias de terceiros não ativadas eliminam-se da informação);
2. Registos e avaliação: quando o RGPD se aplique, verificar os requisitos de registo do artigo 30.º e de avaliação de impacto do artigo 35.º; perfis contínuos não são ocasionais só pelo número reduzido de pessoas;
3. Manutenção da segurança: aplicar as medidas da secção 3 de [Processamento de dados e segurança](/pt/data-security/) e sujeitar-se à supervisão da autoridade competente;
4. Coerência da configuração: os valores reais das variáveis de ambiente (dias de retenção, interruptores de terceiros, limitação de taxa) devem coerir com os compromissos da sua política;
5. Complementos por jurisdição: avaliar RGPD, UK GDPR, LGPD ou CCPA-CPRA segundo o âmbito real de cada regime; não há garantia contratual mundial adicional de todo o RGPD.

## 5. Adoção da documentação deste site

Os documentos descrevem instâncias de teste alojadas e lacunas conhecidas. Outros operadores podem avaliá-los como ponto de partida, mas isso não celebra automaticamente um contrato nem comprova conformidade:

1. Indicar a identidade legal real, contactos acessíveis, domínios, locais do tratamento e momentos de aplicação;
2. Rever a divulgação fiel da lista de terceiros e dos parâmetros de configuração;
3. Identificar a base de manutenção e as traduções; a prioridade linguística não afasta lei imperativa, interpretação favorável ao consumidor ou informação compreensível;
4. Consultar um advogado antes de iniciar a operação formal; a documentação deste site não constitui parecer jurídico.
