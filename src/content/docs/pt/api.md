---
title: Plataforma aberta e acesso à API
description: "Acesso à API aberta do Sonic: estrutura de resposta uniforme, navegação pelos endpoints, autenticação e transmissão da chave de API, limitação de taxa e revogação."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.4**

Esta página explica como aceder à API aberta do Sonic: estrutura de resposta uniforme, endpoints principais, autenticação e transmissão da chave de API, limitação de taxa e revogação. O comportamento do acesso vincula-se aos [Termos de Utilização](/pt/terms-of-service/) e à [Política de Utilização Aceitável](/pt/acceptable-use/); a formulação autoritativa das especificações dos endpoints consta de `API.md` no repositório a montante.

## 1. Estrutura de resposta uniforme

Todos os endpoints comprometem-se publicamente com o contrato de compatibilidade `brand: "Sonic"`; a resposta padrão é a seguinte:

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
| Eventos comportamentais | POST | `/api/sonic/events` | Comunicação de eventos comportamentais (lotes até 50) |
| | GET | `/api/sonic/events` | Consulta do resumo do perfil de recomendação |
| | DELETE | `/api/sonic/events` | Limpeza do perfil pessoal com um clique |
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
| | POST | `/api/auth/logout` | Terminar a sessão e revogá-la |

## 3. Autenticação da chave de API

1. Formato: formato versionado `sonic_live_v2.<header>.<payload>.<signature>`, com assinatura HMAC-SHA256; o payload contém `sub` (correio eletrónico), `iat`, `exp`, `jti`, `kid`, `role` e `uid`;
2. Emissão: obtida em `/api/auth/key` após o início de sessão OAuth Epomail; validade de emissão de 30 dias e limite de validação de 90 dias;
3. Transmissão: apenas os cabeçalhos de pedido são admitidos, `X-Sonic-Key: <key>` ou `Authorization: Bearer <key>`; o canal dos parâmetros de consulta no URL foi integralmente removido, evitando a fuga da chave para os registos de acesso, o histórico do navegador ou o Referer;
4. Validação: o servidor compara em tempo constante com Web Crypto, verificando rigorosamente a versão, o `kid`, o `iat`/`exp`, o `jti` e as listas de revogação; as chaves sem assinatura e as chaves de versões antigas recusam-se sempre (fail-closed).

## 4. Limitação de taxa e revogação

| Item | Limite |
| --- | --- |
| Pedidos anónimos | 240 por minuto (valor predefinido) |
| Pedidos autenticados | 600 por minuto (valor predefinido) |
| Endpoint de autenticação | 30 por minuto por IP |
| Comunicação de eventos comportamentais | Máximo de 50 por lote e corpo de pedido de 64 KB |

Mecanismo de revogação: o término de sessão revoga de imediato a sessão atual e o `jti`; quem implanta pode configurar as listas estáticas `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT`, ou ligar o KV para ativar a revogação imediata. A utilização pessoal normal não atinge os limites de taxa; o excesso persistente entra na escadaria de execução da [Política de Utilização Aceitável](/pt/acceptable-use/).

## 5. Deveres de quem acede

1. A chave de API é uma credencial pessoal e não pode entregar-se a terceiros nem incorporar-se em clientes publicamente distribuídos;
2. Os clientes próprios devem respeitar a limitação de taxa, apresentar os avisos de degradação (`X-Sonic-Degraded: 1`) e cumprir a lista de condutas proibidas da [Política de Utilização Aceitável](/pt/acceptable-use/);
3. O dever de informar os utilizadores finais, quando clientes de terceiros acedem, cabe a quem acede; os utilizadores da API de instâncias de implantação própria devem ler igualmente o [Código aberto e enquadramento legal da implantação própria](/pt/open-source/).
