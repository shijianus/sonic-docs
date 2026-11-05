---
title: Explicação do algoritmo de recomendação
description: "Explicação do algoritmo de recomendação do Sonic: sinais comportamentais e pesos, modelo de popularidade, intenção da sessão, reordenação MMR, Auto DJ e respetivos controlos de privacidade."
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta página explica integralmente a composição do motor de recomendação do Sonic: que sinais entram no modelo, como são ponderados e ordenados e que controlos tem. Todas as regras estão expostas no código-fonte; os fundamentos legais e os limites da recolha de dados constam da [Política de Privacidade](/pt/privacy-policy/), secções 4.2 e 5.

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

## 1. Sinais comportamentais e pesos

| Sinal | Peso | Descrição |
| --- | --- | --- |
| favorite (adicionar aos favoritos) | +4,0 | Muito fortemente positivo |
| replay (nova reprodução) | +3,5 | Fortemente positivo |
| play_complete (conclusão efetiva) | +2,5 | Positivo padrão |
| play_progress (audição por progresso) | +0,2 a +1,8 | Pontuação escalonada pela proporção ouvida |
| skip (salto rápido) | -0,8 | A troca de faixa depois de ouvida metade pontua +0,25 |
| dislike (rejeição explícita) | -5,0 | Filtra as recomendações correspondentes apenas no âmbito da identidade e das funcionalidades disponíveis; não promete um bloqueio permanente e abrangente |

Purificação de ruído: as trocas de faixa nas seis situações que não resultam de uma ação do utilizador, a saber, paragens de rede (network_stall), falhas de descodificação (playback_error), cortes de amostra (trial_end), indisponibilidade da stream (stream_unavailable), expiração da memória intermédia (buffer_timeout) e falha da comutação automática (auto_switch_error), têm peso permanentemente zero e não entram na base de dados.

## 2. Modelo de popularidade

A tabela de tendências do serviço pondera cinco fatores: a reprodução efetiva (35%), os ouvintes independentes (25%), o desempenho de conclusão (20%), a conversão em favoritos (15%) e o declive de crescimento (5%), complementada com decaimento temporal exponencial (tabela de subida de 24 horas e tabela acumulada de popularidade de 7 dias) e suavização bayesiana e de Wilson Score, para evitar que acontecimentos ocasionais com poucas reproduções e conclusão elevada subam anormalmente ao topo.

## 3. Intenção da sessão e preferências de longo prazo

A intenção de pesquisa ao nível da sessão participa na ordenação imediata, mas isso não significa que as pesquisas nunca sejam conservadas: as consultas são contabilizadas separadamente e podem aparecer em sugestões públicas mesmo depois de desativar a personalização. Os pedidos de recomendação também podem transportar favoritos locais, artistas recentes e contexto de pesquisa; os identificadores pseudónimos continuam a poder ser dados associáveis.

## 4. Reordenação de diversidade e Auto DJ

1. Semelhança: combina a semelhança de conjuntos do grafo de relações entre artistas e das etiquetas de género e língua com a semelhança cosseno das características de áudio;
2. Reordenação MMR: equilibra «precisão» e «novidade» pela correlação marginal, evitando cair numa bolha de informação de um só artista ou género;
3. Auto DJ: quando uma lista de reprodução termina naturalmente, acrescenta automaticamente faixas reproduzíveis segundo o estilo da faixa atual; pode desativá-lo nas definições. O interruptor é independente da personalização: quando esta está desativada, ainda podem ser enviadas sementes e faixas excluídas.

## 5. Radar musical e de estilos

Depois de uma pesquisa, o radar da página inicial apresenta resultados compatíveis com a sua intenção de pesquisa e os seus sinais de preferência. O radar trata dados locais, perfis, feedback de entidades e lógica de sincronização; depois de desativar a personalização, ainda pode enviar uma carga com faixas, capas e sinais, embora o servidor possa recusar conservá-la devido à marca de desativação. As limitações das rotas e da persistência impedem tratá-lo como cópia de segurança geral na nuvem.

## 6. Os seus controlos

| Controlo | Localização | Efeito |
| --- | --- | --- |
| Interruptor geral da personalização | Definições → Privacidade e dados locais | Controla o caminho previsto de personalização; estatísticas separadas de pesquisa e pedidos necessários podem continuar |
| Interruptor do Auto DJ | Definições → Privacidade e dados locais | Controla a continuação automática após o fim da reprodução |
| Repor o perfil de recomendação | Definições → Privacidade e dados locais | Elimina apenas parte da identidade atual; podem ficar identificadores antigos, radar, agregados, serviços externos e cópias de segurança, com falhas não mostradas |
| Rejeitar faixa | dislike no leitor | Filtra as recomendações correspondentes apenas no âmbito da identidade e das funcionalidades disponíveis; não promete um bloqueio permanente e abrangente |

A configuração predefinida de 90 dias para eventos não significa destruição de cada registo ao expirar nem define o prazo de todas as categorias. Para pedidos mais completos de eliminação ou cópia, contacte `privacy@epocanvas.com`. Personalização e Auto DJ estão ativos por predefinição, sem que isso prove consentimento prévio válido. Hashes e identificadores `anon_` podem continuar a ser dados pessoais, e o modo privado não impede eventos. Divergências técnicas exigem correção; o código não substitui informação correta nem fundamento lícito (o processo de verificação consta do [Guia de desenvolvimento](/pt/development/), secção 4).
