---
title: Resolução de problemas
description: "Resolução de problemas do Sonic: problemas comuns de reprodução, fontes, início de sessão, modo degradado, armazenamento e limitação de taxa."
---

**Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5**

Esta página enumera a identificação e o tratamento dos problemas mais comuns. Se não resolver o problema aqui, escreva para `admin@epocanvas.com` ou abra uma Issue no repositório GitHub.

## 1. Problemas de reprodução

| Sintoma | Causa | Tratamento |
| --- | --- | --- |
| A faixa está marcada «amostra» e para após 30 segundos | Corte da amostra oficial, não uma falha | Ative o complemento entre fontes para procurar automaticamente a faixa completa gratuita, ou reproduza outra versão disponível |
| O selo de qualidade mostra um nível inferior | Reflete fielmente o nível efetivamente emitido pela fonte a montante | Experimente outro nível no menu de qualidade; os níveis a montante variam com a disponibilidade |
| Não é possível retomar após uma interrupção | O URL direto a montante expirou | Clique novamente na faixa para a resolver de novo |

## 2. Modo degradado

Quando aparece no topo da interface o aviso âmbar «modo degradado de edge», o nó do plano de dados está temporariamente indisponível ou excedeu o tempo limite e a camada de edge mudou automaticamente para interfaces públicas diretas: a pesquisa e as letras continuam disponíveis, mas a resolução integral das fontes de áudio e a atualização das recomendações podem ficar limitadas. Normalmente recupera em algumas dezenas de segundos (a sonda ocorre após 30 segundos de arrefecimento do circuito); as faixas já carregadas não são afetadas e não é necessário atualizar a página.

## 3. Problemas de pesquisa

1. Sem resultados: normalmente uma interface a montante está momentaneamente indisponível; tente novamente mais tarde. No modo degradado, a pesquisa usa interfaces públicas diretas através do edge e a cobertura pode ser um pouco menor;
2. Resultados repetidos ou em falta: a deduplicação entre fontes faz a fusão pelos identificadores canónicos; anomalias nos metadados a montante podem impedir a fusão; pode abrir uma Issue indicando os termos de pesquisa.

## 4. Problemas de início de sessão

1. Volta imediatamente ao estado sem sessão: o navegador pode estar a bloquear cookies de terceiros ou uma extensão de segurança pode estar a limpar cookies; adicione o site à lista de sites permitidos e tente novamente;
2. Conta congelada na Epomail: o início de sessão é interrompido; trate primeiro do estado da conta na Epomail;
3. Outra pessoa consegue reproduzir num dispositivo partilhado: o cookie de sessão permanece no máximo 30 dias; termine a sessão depois de usar um dispositivo partilhado (ver a secção 5 do [Guia de conta e segurança](/pt/account-security/)).

## 5. Problemas de armazenamento

1. Favoritos ou descargas desapareceram: «Limpar os dados do site» no navegador ou o modo privado eliminam o armazenamento local (ver a secção 1 de [Gestão e armazenamento de dados](/pt/data-management/)); registe por sua conta as playlists importantes;
2. Falha na descarga: a quota de armazenamento do navegador está cheia; elimine descargas antigas ou limpe o armazenamento do navegador e tente novamente;
3. Falha na importação de música local: o formato excede a capacidade de descodificação do navegador ou o ficheiro é demasiado grande para a quota.

## 6. Limitação de taxa e códigos de erro

| Sintoma | Significado | Tratamento |
| --- | --- | --- |
| 429 (anónimo) | Excedeu o limite anónimo de 240 pedidos por minuto | O início de sessão permite uma quota superior (600 rpm) |
| 429 (autenticado) | Continua acima de 600 pedidos por minuto | Verifique se o cliente tem pedidos em ciclo |
| 501 (operação de revogação) | A instância não configurou a revogação imediata | A configurar por quem implanta, via KV ou por lista |
| Términos de sessão repetidos | A chave foi revogada ou o limite inferior global do momento de emissão foi ajustado | Inicie sessão novamente para obter uma chave nova |

## 7. Se o problema persistir

Ao abrir uma Issue, inclua: hora da ocorrência, página e ações realizadas, aviso mostrado na interface (por exemplo, captura do aviso de degradação), navegador e versão. Não anexe cookies de sessão nem chaves de API.
