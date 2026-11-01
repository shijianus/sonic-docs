---
title: Referência da pesquisa e das regras
description: "Referência da pesquisa e das regras do Sonic: pesquisa em várias fontes, tolerância a erros, separadores de categorias e operações sobre os resultados."
---

**Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5**

Esta página reúne as capacidades e regras da pesquisa do Sonic: o que introduzir, como são tolerados os erros e como se organizam os resultados. A localização na interface consta da [Interface e funcionalidades](/pt/interface/), secção 2.

## 1. Âmbito da pesquisa

A pesquisa abrange quatro tipos de objeto: músicas, artistas, álbuns e playlists. A página de resultados organiza-se nos separadores «Faixas/Playlists/MV»; a entrada da pesquisa encontra-se no topo da barra lateral e na página de pesquisa, com sugestões de termos populares pesquisados no serviço.

## 2. Regras de tolerância e correspondência

| Regra | Descrição | Exemplo |
| --- | --- | --- |
| Normalização dos caracteres simplificados/tradicionais | As introduções em chinês simplificado e tradicional correspondem de forma equivalente | Introduzir «周杰伦» ou «周杰倫» produz os mesmos resultados |
| Pesquisa por pinyin e abreviaturas | A correspondência pode usar o pinyin completo ou as iniciais | Introduzir «zyy» encontra faixas relacionadas com 周杰伦 |
| Correspondência simétrica de aliases | Os aliases chineses e ingleses dos artistas ficam associados nos dois sentidos | Pesquisar o nome inglês pode encontrar o artista pelo alias chinês |
| Tolerância pela distância de edição | Os erros ortográficos são corrigidos com base na distância de edição | Uma sequência aproximada ainda pode encontrar o alvo |
| Identificação da versão | Distingue versões de estúdio, ao vivo, covers e outras | Os resultados indicam a versão correspondente |

## 3. Paralelismo entre fontes e deduplicação

Os pedidos de pesquisa são enviados em paralelo às fontes a montante ativadas e os resultados são normalizados e combinados: os registos da mesma faixa com o mesmo título são fundidos num único resultado, e o endereço de reprodução é escolhido no momento da reprodução segundo a disponibilidade. A lista de fontes a montante e os interruptores predefinidos constam da [Lista de partilha com terceiros e transferências](/pt/sub-processors/), secção 3.

## 4. Operações sobre os resultados

Cada linha de faixas disponibiliza: reprodução, entrada para MV (quando exista), favorito, descarga e mais operações; «Reproduzir tudo», no topo, reproduz as faixas pela ordem dos resultados. Um resultado de playlist abre a página de detalhes da playlist e um resultado de MV abre a lista de MV.

## 5. Pesquisa e privacidade

Os termos de pesquisa são tratados da seguinte forma:

1. Local: os termos pesquisados recentemente (até 10) ficam apenas no localStorage do navegador e podem ser apagados com «Limpar todos os dados locais»;
2. Agregação no servidor: os termos entram numa contagem global agregada (sem identificadores pessoais, para a tabela de pesquisas populares);
3. Personalização: com a personalização ativada, os cliques na pesquisa são registados como sinais de recomendação (pseudonimizados, durante 90 dias); depois de desativada, não se registam eventos.

Para mais informações, consulte a [Política de Privacidade](/pt/privacy-policy/), secção 4, e a [Explicação do algoritmo de recomendação](/pt/recommendation/).
