---
title: Gestão e armazenamento de dados
description: "Gestão e armazenamento de dados do Sonic: localização dos dados, consulta do resumo do perfil, operações de limpeza e recomendações de cópia de segurança."
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta página resume os locais dos dados e os meios de consulta, limpeza e pedido, sem prometer exportação integral. Os fundamentos e direitos constam da [Política de Privacidade](/pt/privacy-policy/), secções 4, 6 e 9; as medidas técnicas constam de [Processamento de dados e segurança](/pt/data-security/).

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções de armazenamento e eliminação do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

## 1. Visão geral dos locais dos dados

| Dados | Local | Associados à identidade | Prazo de conservação |
| --- | --- | --- | --- |
| Favoritos, playlists e preferências | Principalmente localStorage; o radar também tem um caminho remoto | Podem ser enviados feedback e contexto de recomendação | Cópia local até à limpeza; tratamento remoto separado |
| Histórico de reprodução | localStorage e eventos de reprodução enviados separadamente | Os eventos podem utilizar identificador pseudónimo associável | A limpeza local não elimina eventos remotos |
| Descargas e música local | IndexedDB do navegador | Não foi encontrado envio do corpo de áudio; título, artista, álbum, identificador e capa incorporada podem ser enviados | Localmente até à limpeza ou recuperação de espaço pelo navegador; tratamento remoto separado |
| Eventos comportamentais e feedback sobre entidades | Se o tratamento for ativado, base de dados do servidor ou serviço externo | Identificador pseudónimo, não anónimo | RC: 90 dias por predefinição, mínimo 7; limpeza incompleta e não executada no vencimento de cada registo, sem garantia de eliminação automática integral |
| Agregados de pesquisa e perfis do radar | Armazenamento remoto de pesquisas; armazenamento persistente do radar no motor não confirmado | Pesquisas originais podem identificar uma pessoa e ser apresentadas publicamente | Sem prazo automático uniforme verificado; reposição incompleta |
| Catálogo partilhado de faixas e índices externos | Biblioteca de faixas do servidor e serviços opcionais de recomendação ou pesquisa | Eventos podem incluir título, artista e capa incorporada; acessíveis à pesquisa do site | Não é integralmente limpo ao repor o perfil; avaliar segundo a possibilidade de associação |
| Histórico de pesquisa local | localStorage; as consultas também são enviadas para pesquisa e podem integrar estatísticas ou contexto | O contexto pode ser enviado mesmo que o histórico seja local | A limpeza local não elimina cópias remotas |

`auth` no localStorage conserva dados do utilizador, incluindo correio eletrónico e avatar. As credenciais assinadas podem conter identidade e não estão cifradas. A ausência de coluna de IP numa tabela não implica ausência de tratamento de IP: limitação de taxa, envio ao motor e infraestrutura também o tratam.

## 2. Consulta: resumo do perfil de recomendação

A RC pública mais recente disponibiliza `GET /api/sonic/events` (ou o bloco do perfil nas definições) para consultar um resumo do perfil no servidor, apenas se a função estiver ativada e a instância disponibilizar essa página ou API. A versão antiga `main@ce443c8` serve apenas de comparação e não prova que a RC esteja implantada; a disponibilidade em produção não foi verificada. Mesmo quando disponível, o resumo não é uma exportação integral de dados pessoais nem uma cópia de todos os eventos originais; não pode prometer-se uma descarga integral dos eventos do servidor.

## 3. Exportação e cópias de segurança

1. Dados do navegador: favoritos, playlists, preferências, descargas e música local são principalmente locais. Não existe cópia de segurança geral na nuvem nem exportação universal garantida de localStorage e IndexedDB; as tentativas de sincronização do radar não salvaguardam toda a biblioteca nem garantem persistência. A sincronização normal do navegador não transfere necessariamente estes dados do site;
2. Dados remotos: podem incluir eventos, feedback sobre entidades, dados de pesquisa e caminhos de sincronização do radar; o armazenamento persistente do radar no motor não foi confirmado. O resumo não é uma exportação integral e a reposição é apenas uma eliminação parcial. Para pedidos relativos a uma instância alojada pelo projeto, use o canal da secção 9 da [Política de Privacidade](/pt/privacy-policy/), incluindo identificadores antigos quando necessário; utilizadores de instâncias próprias devem contactar o respetivo operador;
3. Resumo do perfil de recomendação: só pode ser consultado se a função estiver ativada e a instância disponibilizar a página de definições ou a API; a disponibilidade em produção não foi verificada. Não é uma exportação integral nem prova que todos os dados pessoais foram obtidos;
4. Música local: os ficheiros de áudio originais importados continuam no seu dispositivo; não foi encontrado um caminho de envio do corpo do áudio, mas metadados e capas incorporadas podem ser enviados separadamente. Eliminar a cópia no navegador não afeta os ficheiros originais.

## 4. Operações de limpeza

| Operação | Âmbito | Efeito |
| --- | --- | --- |
| Repor o perfil de recomendação e os registos de desinteresse | Parte dos eventos e feedback da identidade atual | `DELETE /api/sonic/events`; pode omitir identidades antigas, radar, agregados, serviços externos e cópias de segurança, com falhas não mostradas  |
| Limpar todos os dados locais | Tentativa de limpeza de localStorage, sessionStorage e IndexedDB e reposição parcial do perfil | Após confirmação; não garante eliminação remota completa e pode ignorar falhas. Não remove o cookie HttpOnly; repor definições e recarregar pode reativar a personalização predefinida: verificar novamente a escolha  |
| Limpar os dados do site no navegador | Armazenamento do site no dispositivo | Não elimina os dados remotos |
| Terminar sessão | Cookie atual e pedido de revogação | Revogar credenciais copiadas depende da configuração e do sucesso do pedido |

## 5. Instâncias de implantação própria

Os utilizadores de uma instância própria devem contactar o operador efetivo dessa instância através do canal para pedidos de direitos por ele publicado; o endereço proposto neste documento para o Sonic não é o canal do responsável por todas as implantações. Para pedidos de direitos relativos a uma instância alojada pelo projeto, consulte a secção 9 da [Política de Privacidade](/pt/privacy-policy/); o resumo e os controlos de limpeza existentes não constituem uma exportação integral.

O operador deve inventariar todos os armazenamentos e destinatários efetivos, não apenas o volume SQLite. A definição de conservação não abrange, por si só, radar, pesquisas, registos e cópias de segurança; devem fixar-se prazos necessários e um procedimento de eliminação verificado, isolar as cópias até à limpeza prevista e reaplicar as eliminações após o restauro. Consulte o [Guia de implantação](/pt/deployment/) e a secção 4 de [Código aberto e enquadramento legal da implantação própria](/pt/open-source/).
