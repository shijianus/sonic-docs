---
title: Explicação do algoritmo de recomendação
description: "Explicação do algoritmo de recomendação do Sonic: sinais comportamentais e pesos, modelo de popularidade, intenção da sessão, reordenação MMR, Auto DJ e respetivos controlos de privacidade."
---

**Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5**

Esta página explica integralmente a composição do motor de recomendação do Sonic: que sinais entram no modelo, como são ponderados e ordenados e que controlos tem. Todas as regras estão expostas no código-fonte; os fundamentos legais e os limites da recolha de dados constam da [Política de Privacidade](/pt/privacy-policy/), secções 4.2 e 5.

## 1. Sinais comportamentais e pesos

| Sinal | Peso | Descrição |
| --- | --- | --- |
| favorite (adicionar aos favoritos) | +4,0 | Muito fortemente positivo |
| replay (nova reprodução) | +3,5 | Fortemente positivo |
| play_complete (conclusão efetiva) | +2,5 | Positivo padrão |
| play_progress (audição por progresso) | +0,2 a +1,8 | Pontuação escalonada pela proporção ouvida |
| skip (salto rápido) | -0,8 | A troca de faixa depois de ouvida metade pontua +0,25 |
| dislike (rejeição explícita) | -5,0 | Filtragem rígida e inclusão em lista negra |

Purificação de ruído: as trocas de faixa nas seis situações que não resultam de uma ação do utilizador, a saber, paragens de rede (network_stall), falhas de descodificação (playback_error), cortes de amostra (trial_end), indisponibilidade da stream (stream_unavailable), expiração da memória intermédia (buffer_timeout) e falha da comutação automática (auto_switch_error), têm peso permanentemente zero e não entram na base de dados.

## 2. Modelo de popularidade

A tabela de tendências do serviço pondera cinco fatores: a reprodução efetiva (35%), os ouvintes independentes (25%), o desempenho de conclusão (20%), a conversão em favoritos (15%) e o declive de crescimento (5%), complementada com decaimento temporal exponencial (tabela de subida de 24 horas e tabela acumulada de popularidade de 7 dias) e suavização bayesiana e de Wilson Score, para evitar que acontecimentos ocasionais com poucas reproduções e conclusão elevada subam anormalmente ao topo.

## 3. Intenção da sessão e preferências de longo prazo

A intenção de pesquisa ao nível da sessão (termos pesquisados em sequência, cliques em artistas e géneros) participa na ordenação imediata com um peso de curto prazo mais elevado e fica separada, por camadas, das preferências de longo prazo: apenas comportamentos de elevado valor, como a conclusão e os favoritos, se consolidam no perfil de longo prazo; uma pesquisa ocasional não altera de imediato o seu perfil duradouro.

## 4. Reordenação de diversidade e Auto DJ

1. Semelhança: combina a semelhança de conjuntos do grafo de relações entre artistas e das etiquetas de género e língua com a semelhança cosseno das características de áudio;
2. Reordenação MMR: equilibra «precisão» e «novidade» pela correlação marginal, evitando cair numa bolha de informação de um só artista ou género;
3. Auto DJ: quando uma lista de reprodução termina naturalmente, acrescenta automaticamente faixas reproduzíveis segundo o estilo da faixa atual; pode desativá-lo nas definições.

## 5. Radar musical e de estilos

Depois de uma pesquisa, o radar da página inicial apresenta em tempo real resultados compatíveis com a sua intenção de pesquisa e os seus sinais de preferência, com um estilo alinhado com o dos êxitos; o radar altera apenas a ordem das recomendações que vê e não altera quaisquer dados armazenados.

## 6. Os seus controlos

| Controlo | Localização | Efeito |
| --- | --- | --- |
| Interruptor geral da personalização | Definições → Privacidade e dados locais | Desativado, deixa de recolher eventos e as recomendações passam ao modo puramente público |
| Interruptor do Auto DJ | Definições → Privacidade e dados locais | Controla a continuação automática após o fim da reprodução |
| Repor o perfil de recomendação | Definições → Privacidade e dados locais | Destrói de imediato todos os eventos comportamentais no servidor |
| Rejeitar faixa | dislike no leitor | Filtro rígido; a faixa deixa de aparecer nas recomendações |

Os factos técnicos do algoritmo atualizam-se com a evolução do código-fonte; quando este documento divergir do código-fonte, prevalece o código e o documento deve ser corrigido (o processo de verificação consta do [Guia de desenvolvimento](/pt/development/), secção 4).
