---
title: Resolução de problemas
description: "Resolução de problemas do Sonic: problemas comuns de reprodução, fontes, início de sessão, modo degradado, armazenamento e limitação de taxa."
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão e a configuração em produção continuam por verificar.

Esta página enumera a identificação e o tratamento dos problemas mais comuns. Se não resolver o problema aqui, escreva para `admin@epocanvas.com` ou abra uma Issue no repositório GitHub; ao comunicar, use apenas termos de reprodução não sensíveis. O texto de pesquisa público pode conter informações pessoais ou sensíveis.

![Resolução de problemas do Sonic em quatro passos: identificar o sintoma, verificar o estado, tentar a via alternativa e comunicar](/images/sonic/troubleshooting-flow.svg)

*Figura: identifique o sintoma, verifique o estado, tente a via alternativa e comunique; a via alternativa também pode falhar.*

## 1. Problemas de reprodução

| Sintoma | Causa | Tratamento |
| --- | --- | --- |
| A faixa está marcada «amostra» e para após 30 segundos | Corte da amostra oficial, não uma falha | Se a interface oferecer complemento entre fontes, tente outra versão completa; ou reproduza outra versão disponível, sem presumir que funcionará |
| O selo de qualidade mostra um nível inferior | Reflete fielmente o nível efetivamente emitido pela fonte a montante | Experimente outro nível no menu de qualidade; os níveis a montante variam com a disponibilidade |
| Não é possível retomar após uma interrupção | O URL direto a montante pode ter expirado | Clique novamente na faixa para tentar resolvê-la; a recuperação não é garantida |

## 2. Modo degradado

Quando aparece no topo da interface o aviso âmbar «modo degradado de edge», o nó do plano de dados pode estar temporariamente indisponível ou ter excedido o tempo limite, e está a ser usado um caminho alternativo. A alternativa também pode falhar; a pesquisa, as letras e a reprodução podem ficar limitadas ou indisponíveis. Os 30 segundos após o arrefecimento do disjuntor são apenas uma nova sonda, não uma garantia de recuperação. Conteúdo já colocado em memória intermédia pode continuar, mas a continuidade não é garantida. O aviso não prova uma recuperação automática nem que não seja necessário atualizar.

## 3. Problemas de pesquisa

1. Sem resultados: normalmente uma interface a montante está momentaneamente indisponível; tente novamente mais tarde. No modo degradado, a pesquisa alternativa também pode falhar ou ficar indisponível e a cobertura pode ser um pouco menor;
2. Resultados repetidos ou em falta: anomalias nos metadados a montante podem impedir a fusão; abra uma Issue apenas com termos de reprodução não sensíveis. O texto de pesquisa público pode conter informações pessoais ou sensíveis; não o cole sem alterações numa Issue pública.

## 4. Problemas de início de sessão

1. Volta imediatamente ao estado sem sessão: verifique se o site pode definir e conservar o seu próprio cookie de sessão, se uma extensão o remove e se HTTPS, o URL de retorno e a configuração OAuth coincidem; limpe ou desative apenas a definição da extensão que interfere e não desative todas as proteções do navegador;
2. Conta congelada na Epomail: o início de sessão é interrompido; trate primeiro do estado da conta na Epomail;
3. Outra pessoa consegue reproduzir num dispositivo partilhado: no RC verificado, o cookie de sessão do site tem validade predefinida de 30 dias. Isto não confirma a configuração da instância em produção nem o prazo de conservação ou expiração de credenciais copiadas e outras cópias. Termine a sessão depois de usar um dispositivo partilhado (ver a secção 5 do [Guia de conta e da segurança](/pt/account-security/)).

## 5. Problemas de armazenamento

1. Favoritos ou descargas desapareceram: a limpeza do navegador ou o fim de uma sessão privada pode remover dados locais; não há garantia de recuperação geral na nuvem. O modo privado não impede pedidos de rede ou eventos, e a limpeza local ou um reinício aparentemente bem-sucedido não prova a eliminação remota completa (ver [Gestão e armazenamento de dados](/pt/data-management/));
2. Falha na descarga: a quota de armazenamento do navegador está cheia; elimine descargas antigas ou limpe o armazenamento do navegador e tente novamente;
3. Falha na importação de música local: o formato excede a capacidade de descodificação do navegador ou o ficheiro é demasiado grande para a quota.

## 6. Limitação de taxa e códigos de erro

| Sintoma | Significado | Tratamento |
| --- | --- | --- |
| 429 (anónimo) | Excedeu o limite anónimo predefinido no RC de 240 pedidos por minuto; a instância em produção pode ser diferente | Siga a interface e tente novamente mais tarde, ou verifique a configuração da instância |
| 429 (autenticado) | Continua acima do limite predefinido no RC de 600 pedidos por minuto; a instância em produção pode ser diferente | Verifique se o cliente tem pedidos em ciclo |
| 501 (operação de revogação) | A revogação remota suportada não está configurada | Terminar a sessão pode eliminar apenas o cookie do navegador; peça ao operador para verificar a configuração de revogação e a rejeição das credenciais copiadas |
| Términos de sessão repetidos | A chave foi revogada ou o limite inferior global do momento de emissão foi ajustado | Inicie sessão novamente para obter uma chave nova; a causa real deve ser confirmada pelos registos e pela configuração da instância |

## 7. Se o problema persistir

Ao abrir uma Issue pública, inclua a hora da ocorrência, a página e as ações realizadas, o navegador e a versão e, se for útil, uma captura do aviso sem dados identificáveis; use apenas termos de reprodução não sensíveis. O texto de pesquisa público pode conter informações pessoais ou sensíveis. Antes de publicar, remova ou oculte endereços de e-mail, dados pessoais ou de perfil, termos de pesquisa sensíveis, cookies de sessão, chaves de API e os mesmos dados nas capturas. Os pedidos de eliminação completa ou de cópia de dados devem ser enviados para `privacy@epocanvas.com`, não para uma Issue pública; uma mensagem de sucesso do reinício não prova que todos os registos foram eliminados.
