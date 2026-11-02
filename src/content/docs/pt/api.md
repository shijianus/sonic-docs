---
title: Plataforma aberta e acesso à API
description: "Acesso à API aberta do Sonic: estrutura de resposta uniforme, navegação pelos endpoints, autenticação e transmissão da chave de API, limitação de taxa e revogação."
---

**Data de revisão: 2 de novembro de 2026｜Versão: 1.8**

Esta página explica como aceder à API aberta do Sonic: estrutura de resposta uniforme, endpoints principais, autenticação e transmissão da chave de API, limitação de taxa e revogação. O comportamento do acesso vincula-se aos [Termos de Utilização](/pt/terms-of-service/) e à [Política de Utilização Aceitável](/pt/acceptable-use/); a formulação autoritativa das especificações dos endpoints consta de `API.md` no repositório a montante.

O serviço alojado é um projeto individual de testes, gratuito e sem fins lucrativos, sem SLA nem garantia de recuperação. As descrições funcionais deste guia baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar. Perfis ativos por predefinição não constituem consentimento; a reposição é parcial e pode ocultar falhas; a revogação depende da configuração e do êxito do pedido. Não envie dados nem credenciais desnecessários.

## 1. Estrutura de resposta uniforme

A resposta padrão atualmente descrita usa `brand: "Sonic"`; isto não promete compatibilidade permanente da API nem nível de serviço:

```json
{
  "brand": "Sonic",
  "data": { "id": "191254", "title": "红豆", "quality": "320k" },
  "meta": {
    "cached": true,
    "cacheLevel": "edge",
    "provider": "nexus",
    "degraded": false,
    "circuitState": "CLOSED"
  }
}
```

O campo `meta` assinala fielmente o nível da cache, o fornecedor, o estado de degradação e o estado do circuit breaker, permitindo ao cliente apresentar avisos transparentes com base neles.

## 2. Navegação pelos endpoints principais

| Categoria | Método | Endpoint | Função |
| --- | --- | --- | --- |
| Recomendação inteligente | GET | `/api/sonic/recommend/for-you` | Sugestões para si/Auto DJ |
| | GET | `/api/sonic/recommend/trending` | Tabelas de tendência (24h/7d/surging/new) |
| | GET | `/api/sonic/recommend/similar` | Faixas semelhantes/exploração de artistas |
| | GET | `/api/sonic/recommend/discover` | Radar de géneros e estilos |
| Eventos comportamentais | POST | `/api/sonic/events` | Comunicação de eventos comportamentais (lotes até 50)  |
| | GET | `/api/sonic/events` | Consulta do resumo do perfil de recomendação  |
| | DELETE | `/api/sonic/events` | Eliminação parcial de eventos e feedback da identidade atual; não elimina integralmente perfis ou cópias de segurança  |
| Pesquisa agregada | GET | `/api/sonic/search/smart` | Pesquisa híbrida inteligente e complementos |
| | GET | `/api/sonic/search/nexus` | Recuperação paralela multifuente de toda a rede |
| Letras dinâmicas | GET | `/api/sonic/lyrics/nexus` | Letras palavra a palavra (YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | Letras sincronizadas entre plataformas (saída multiformato) |
| Media de áudio | GET | `/api/music/stream` | Proxy por segmentos de áudio (Range/206; ligação direta `?mode=redirect`) |
| | GET | `/api/music/cover` | Proxy de capas (alta qualidade primeiro, com queda para SVG) |
| | GET | `/api/music/palette` | Análise da temperatura de cor das capas |
| Autenticação | GET | `/api/auth/user` | Dados da sessão atual |
| | GET/POST | `/api/auth/key` | Ver/reescrever a chave de API |
| | POST | `/api/auth/revoke` | Revogar a chave atual (requer cabeçalho de chave explícito) |
| | POST | `/api/auth/logout` | Limpar o cookie atual; revogação remota depende da configuração e do sucesso |

## 3. Autenticação da chave de API

1. Formato: formato versionado `sonic_live_v2.<header>.<payload>.<signature>`, com assinatura HMAC-SHA256; o payload contém `sub` (correio eletrónico), `iat`, `exp`, `jti`, `kid`, `role` e `uid`; a assinatura não cifra estes dados;
2. Emissão: obtida em `/api/auth/key` após o início de sessão OAuth Epomail; no RC, a emissão e a reemissão usam 30 dias por predefinição. Os 90 dias são apenas o limite máximo aceite pelo validador, não um prazo de reemissão;
3. Transmissão: no RC, a autenticação por chave de API admite os cabeçalhos `X-Sonic-Key: <key>` ou `Authorization: Bearer <key>`, não parâmetros de consulta no URL. Isto não elimina credenciais de URL, histórico ou armazenamento da versão antiga de `main` e não prova a proteção da instância em produção;
4. Validação: o servidor compara em tempo constante com Web Crypto, verificando rigorosamente a versão, o `kid`, o `iat`/`exp`, o `jti` e as listas de revogação; as chaves sem assinatura e as chaves de versões antigas recusam-se sempre (fail-closed).

## 4. Limitação de taxa e revogação

| Item | Limite |
| --- | --- |
| Pedidos anónimos | 240 por minuto (valor predefinido) |
| Pedidos autenticados | 600 por minuto (valor predefinido) |
| Endpoint de autenticação | 30 por minuto por IP |
| Comunicação de eventos comportamentais | Máximo de 50 por lote e corpo de pedido até 64 KiB |

Terminar sessão limpa o cookie atual; credenciais copiadas só são revogadas com configuração eficaz e pedido bem-sucedido. O operador pode configurar `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT` ou KV; verifique erros na resposta. Mesmo uso legítimo pode atingir limites, por exemplo com IP partilhado; respeite esperas e a [Política de Utilização Aceitável](/pt/acceptable-use/).

## 5. Deveres de quem acede

1. A chave de API é uma credencial pessoal e não pode entregar-se a terceiros nem incorporar-se em clientes publicamente distribuídos;
2. Os clientes próprios devem respeitar a limitação de taxa, apresentar os avisos de degradação (`X-Sonic-Degraded: 1`) e cumprir a lista de condutas proibidas da [Política de Utilização Aceitável](/pt/acceptable-use/);
3. O dever de informar os utilizadores finais, quando clientes de terceiros acedem, cabe a quem acede; os utilizadores da API de instâncias de implantação própria devem ler igualmente o [Código aberto e enquadramento legal da implantação própria](/pt/open-source/).
