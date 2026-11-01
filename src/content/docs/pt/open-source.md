---
title: Código aberto e enquadramento legal da implantação própria
description: "Código aberto e enquadramento legal do Sonic: estado da licença, limites das marcas, agradecimentos e dependências de terceiros, deveres de quem implanta e limites de conformidade."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.4**

Esta página explica o estado e os limites do licenciamento de código aberto do Sonic, os agradecimentos a terceiros e os deveres legais da implantação própria. A relação entre a licença do software e os termos de utilização consta das secções 2 e 10 dos [Termos de Utilização](/pt/terms-of-service/).

## 1. Estado da licença

| Elemento | Estado |
| --- | --- |
| Ficheiro `LICENSE` na raiz do repositório | MIT License, **texto de licença autoritativo**, prevalecendo esse ficheiro |
| Declaração dos README históricos | Declarou a intenção de adotar CC BY-NC-SA 4.0 (não comercial, com atribuição, partilha pela mesma licença); até decisão dos mantenedores não serve de fundamento de licenciamento, sendo apenas a expressão do posicionamento não comercial do projeto |
| Marcas e sinais distintivos | Os nomes e sinais distintivos `epocanvas` e `Sonic` não conferem, com a licença do código-fonte, direitos de uso de marca |

Qualquer que seja a decisão final sobre a licença, aplicam-se os limites seguintes: os direitos sobre gravações, letras, capas e outros conteúdos pertencem aos respetivos titulares, e o projeto não concede qualquer sublicenciamento de conteúdos musicais.

## 2. Posicionamento do projeto

O projeto é um projeto de código aberto não comercial: uma ferramenta de pesquisa, agregação e reprodução que não armazena nem aloja ficheiros musicais e não integra componentes de desbloqueio que contornem os mecanismos de copyright pago. Ao utilizar o serviço ou implantar por si, deve confirmar por si a conformidade com a lei do seu local, os termos dos serviços a montante e os requisitos de licenciamento dos conteúdos (limites de conduta na [Política de Utilização Aceitável](/pt/acceptable-use/)).

## 3. Agradecimentos e dependências de terceiros

O desenvolvimento e a prática de agregação multifuente recorrem e agradecem aos seguintes projetos das comunidades de código aberto: Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, GDStudio Music API e a comunidade Linux.do. As dependências e declarações completas constam de `THIRD_PARTY_NOTICES.md` no repositório; os termos de cada serviço a montante regem-se pelos respetivos documentos.

## 4. Deveres legais de quem implanta por si

A partir do momento da implantação própria, quem implanta é o responsável pelo tratamento dos dados dos seus utilizadores (delimitação dos papéis na secção 2 do [Panorama](/pt/overview/)), devendo cumprir:

1. Dever de informação: informar os utilizadores das matérias de tratamento de dados, podendo usar como texto base a [Política de Privacidade](/pt/privacy-policy/) deste site, mas alterando-a conforme a sua configuração efetiva (as cadeias de terceiros não ativadas eliminam-se da informação);
2. Registos e avaliação: manter o registo das atividades de tratamento (o artigo 30.º do RGPD) e, sendo o tratamento de alto risco, realizar a avaliação de impacto sobre a proteção de dados (o artigo 35.º do RGPD);
3. Manutenção da segurança: aplicar as medidas da secção 3 de [Processamento de dados e segurança](/pt/data-security/) e sujeitar-se à supervisão da autoridade competente;
4. Coerência da configuração: os valores reais das variáveis de ambiente (dias de retenção, interruptores de terceiros, limitação de taxa) devem coerir com os compromissos da sua política;
5. Complementos por jurisdição: para além do RGPD, completar com os requisitos legais das jurisdições dos seus utilizadores, como o UK GDPR, o LGPD e o CCPA-CPRA.

## 5. Adoção da documentação deste site

Este site tem um desenho de dupla via, «modelo geral + texto real da instância gerida», e quem opera implantação própria pode adotar a totalidade da documentação deste site como base da informação e dos termos do seu site:

1. Substituir os dados de identidade (domínios, correios de contacto, data de entrada em vigor e número de versão);
2. Rever a divulgação fiel da lista de terceiros e dos parâmetros de configuração;
3. Manter «a versão em Chinês Simplificado como versão oficial» ou alterá-la para a língua da sua versão oficial, de forma integralmente coerente;
4. Consultar um advogado antes de iniciar a operação formal; a documentação deste site não constitui parecer jurídico.
