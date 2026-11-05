---
title: Código aberto e enquadramento legal da implantação própria
description: "Código aberto e enquadramento legal do Sonic: estado da licença, limites das marcas, agradecimentos e dependências de terceiros, deveres de quem implanta e limites de conformidade."
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

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

## 4. Deveres legais de quem aloja por si

O papel depende de quem determina efetivamente o tratamento; publicar ou contribuir com código não estabelece, por si só, responsabilidade exclusiva. Testes puramente pessoais e serviço público devem ser avaliados separadamente (ver o [Panorama](/pt/overview/), secção 2). Quando opera o serviço:

1. **Dever de informação**: publicar antes da recolha a identidade legal real, contactos, finalidades, destinatários, países dos nós e prazos de conservação; adaptar a [Política de Privacidade](/pt/privacy-policy/) aos factos verificados, sem presumir que o repositório fornece essas informações;
2. **Registos e avaliação**: quando o RGPD se aplique e as condições se verifiquem, manter o registo do artigo 30.º e avaliar os tratamentos de risco elevado nos termos do artigo 35.º. A reduzida escala não torna ocasional a definição contínua de perfis;
3. **Manutenção da segurança**: aplicar medidas adequadas, escolhas prévias válidas e eliminação verificada. A definição de perfis ativada por omissão, a reutilização pública de pesquisas em bruto, os pedidos de avatar por correio eletrónico e a reposição incompleta continuam a ser bloqueios; a divulgação não os resolve;
4. **Coerência da configuração**: verificar a conservação, limpeza, revogação, recursos externos e cópias de segurança reais, não apenas as variáveis de ambiente; suspender o tratamento opcional sem base legal ou garantias necessárias;
5. **Lei aplicável e transferências**: determinar o âmbito territorial e os fornecedores e países reais. O RGPD não é uma garantia contratual mundial; certificações ou políticas públicas de fornecedores não estabelecem contratos nem garantias de transferência internacional.

## 5. Adoção dos documentos deste site

Estes documentos descrevem instâncias de teste alojadas determinadas e a versão candidata pública revista; não são uma certificação de conformidade nem condições automaticamente aplicáveis a qualquer implantação. Qualquer adoção exige:

1. indicar a identidade legal real do operador, contactos, domínios, data de revisão e data de adoção;
2. verificar os fluxos reais, os papéis de terceiros, os contratos, os mecanismos de transferência, as escolhas, a conservação e a eliminação antes do tratamento;
3. manter traduções inteligíveis de forma coerente: a referência de manutenção em chinês simplificado e as nove traduções não prevalecem sobre a lei imperativa nem sobre a interpretação favorável ao consumidor;
4. obter aconselhamento jurídico adequado e, quando necessário, aceitação válida ou consentimento separado; copiar o texto ou continuar a utilizá-lo não estabelece nenhum dos dois.
