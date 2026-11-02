---
title: Referência da pesquisa e das regras
description: "Referência da pesquisa e das regras do Sonic: pesquisa em várias fontes, tolerância a erros, separadores de categorias e operações sobre os resultados."
---

**Data de revisão: 2 de novembro de 2026｜Versão: 1.8**

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão e a configuração em produção continuam por verificar.

Esta página reúne as capacidades e regras da pesquisa do Sonic: o que introduzir, como são tolerados os erros e como se organizam os resultados. A localização na interface consta da [Interface e funcionalidades](/pt/interface/), secção 2.

## 1. Âmbito da pesquisa

A pesquisa abrange quatro tipos de objeto: músicas, artistas, álbuns e playlists. A página de resultados organiza-se nos separadores «Faixas/Playlists/MV»; a entrada da pesquisa encontra-se no topo da barra lateral e na página de pesquisa, onde a interface pode mostrar sugestões de termos populares pesquisados no serviço.

## 2. Regras de tolerância e correspondência

| Regra | Descrição | Exemplo |
| --- | --- | --- |
| Normalização dos caracteres simplificados/tradicionais | É possível experimentar as duas grafias; a correspondência real depende do índice e da disponibilidade das fontes a montante | Comparar «周杰伦» e «周傑倫» |
| Pesquisa por pinyin e abreviaturas | É possível experimentar o pinyin completo ou as iniciais; não se garantem resultados em todas as fontes | Experimentar «zjl» para faixas relacionadas com Jay Chou (周杰伦／周傑倫) |
| Correspondência simétrica de aliases | O site pode associar os aliases chineses e estrangeiros dos artistas; o resultado real depende do índice | Pesquisar o nome estrangeiro pode encontrar o artista pelo alias chinês |
| Tolerância pela distância de edição | Uma sequência próxima pode ser tratada como candidata; nem todos os erros são corrigidos | Introduzir uma sequência aproximada e verificar o resultado real |
| Identificação da versão | Os resultados podem distinguir versões de estúdio, ao vivo, covers e outras | Consultar a versão indicada no resultado |

## 3. Paralelismo entre fontes e deduplicação

Os pedidos de pesquisa são enviados às fontes a montante ativadas e disponíveis no momento, e os resultados são combinados segundo regras de normalização. Os registos da mesma faixa com o mesmo título podem ser fundidos num único resultado; o endereço de reprodução é obtido no momento da reprodução segundo a disponibilidade. A lista de fontes a montante e os interruptores predefinidos constam da [Lista de partilha com terceiros e transferências](/pt/sub-processors/), secção 3.

## 4. Operações sobre os resultados

Cada linha de faixas pode disponibilizar reprodução, entrada para MV quando exista, favorito, descarga e mais operações; «Reproduzir tudo», no topo, pode reproduzir as faixas pela ordem dos resultados. Um resultado de playlist abre a página de detalhes da playlist e um resultado de MV abre a lista de MV; as operações efetivas dependem do resultado e da configuração da instância.

## 5. Pesquisa e privacidade

Os termos de pesquisa são tratados da seguinte forma:

1. **Local**: a lista local de pesquisas recentes usa localStorage, mas o pedido é enviado para pesquisa e alguns elementos podem acompanhar pedidos de recomendação; limpar localmente não elimina cópias remotas já criadas;
2. **Agregação no servidor**: a pesquisa inteligente pode contar ou conservar separadamente os termos originais e fazê-los aparecer em sugestões públicas; desativar a personalização não exclui por si só esse caminho. Um texto pode identificar uma pessoa sem identificador de conta; não introduza dados pessoais ou sensíveis. Filtros, limiares de apresentação, controlos de conservação e configuração da instância devem ser verificados separadamente;
3. **Personalização**: pesquisas e cliques podem ser associados por identificadores pseudonimizados. O interruptor de personalização não controla todos os caminhos das estatísticas de pesquisa; uma definição ou reposição de 90 dias não significa que cada agregado ou cópia da pesquisa seja eliminado no mesmo calendário.

Para mais informações, consulte a [Política de Privacidade](/pt/privacy-policy/), secção 4, e a [Explicação do algoritmo de recomendação](/pt/recommendation/).
