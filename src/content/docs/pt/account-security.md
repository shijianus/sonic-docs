---
title: Guia de conta e segurança
description: "Guia de conta e segurança do Sonic: início de sessão OAuth da Epomail, mecanismo de sessão, proteção das chaves de API, revogação e recomendações de utilização segura."
---

**Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5**

Esta página explica o funcionamento do sistema de conta do Sonic e recomendações para uma utilização segura. A implementação técnica completa consta de [Processamento de dados e segurança](/pt/data-security/), secção 3.2; as disposições contratuais constam dos [Termos de Utilização](/pt/terms-of-service/), secção 3.

## 1. Modo de início de sessão

O serviço utiliza uma conta Epomail através de OAuth 2.0 (PKCE) e não tem um sistema de registo autónomo. Fluxo de início de sessão: clique na entrada da conta na barra lateral → confirme na página de autorização da Epomail → o regresso ao serviço conclui o início de sessão. A devolução de chamada de autorização está sujeita a uma quádrupla verificação (state, PKCE, código de autorização e repetição); o endpoint de autenticação limita-se a 30 pedidos por minuto por IP.

## 2. Mecanismo de sessão

1. Cookie de sessão: depois do início de sessão bem-sucedido é emitido um cookie de sessão `HttpOnly; Secure; SameSite=Lax`, válido por um máximo de 30 dias; o cookie contém uma chave de API assinada, que os scripts não podem ler;
2. Sincronização entre separadores: o estado de início de sessão sincroniza-se automaticamente entre os separadores do mesmo navegador; terminar a sessão num deles é imediatamente percecionado pelos restantes;
3. Limites da chave: a chave de API não se escreve no URL, nos parâmetros de consulta nem no localStorage; os cookies de transação OAuth são válidos apenas por 600 segundos.

## 3. Proteção da chave de API

A chave de API é a sua credencial pessoal (formato `sonic_live_v2.…`, assinada com HMAC-SHA256):

1. É transmitida apenas em cabeçalhos de pedido, nunca no URL;
2. Não a entregue a terceiros nem a incorpore em clientes destinados a distribuição pública;
3. A reemissão exige a apresentação da chave atualmente válida; em caso de fuga, termine a sessão e revogue-a de imediato (ver a secção 4).

## 4. Revogação e término de sessão

| Operação | Localização | Efeito |
| --- | --- | --- |
| Terminar sessão | No leitor | Revoga de imediato a sessão atual e o identificador de chave (jti) |
| Revogar chave | `POST /api/auth/revoke` | Revoga a chave de API atual |
| Invalidar em lote | Configuração de quem implanta | Lista de jti, lista de sujeitos e limite inferior global do momento de emissão |

## 5. Recomendações de utilização segura

1. Termine sempre a sessão depois de utilizar um dispositivo partilhado (o cookie de sessão contém a chave assinada);
2. Recomenda-se ativar a verificação em dois passos na conta Epomail (nas definições da Epomail);
3. Não empreste nem partilhe a conta: os dados de uma conta partilhada misturam-se e não podem ser distinguidos nem recuperados;
4. Ao detetar reproduções anormais ou uma sessão de origem desconhecida, termine a sessão de imediato e escreva para `admin@epocanvas.com`;
5. O serviço não recolhe palavras-passe (o início de sessão é concluído pela Epomail); qualquer pedido de «verificação da palavra-passe Sonic» constitui uma usurpação.

## 6. Entrada de gestão da conta

A entrada da conta no fundo da barra lateral mostra o estado atual de início de sessão: sem início de sessão, oferece a orientação para iniciar sessão; com início de sessão, mostra a alcunha da conta e disponibiliza uma ligação para a gestão da conta (o perfil pessoal e a caixa de entrada da Epomail). O estado de início de sessão sincroniza-se automaticamente entre separadores.
