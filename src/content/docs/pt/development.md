---
title: Guia de desenvolvimento
description: "Guia de desenvolvimento do Sonic: estrutura do repositório, comandos de compilação, conjunto de testes, verificação da consistência da documentação e contribuição."
---

**Data de revisão: 2 de novembro de 2026｜Versão: 1.8**

Esta página destina-se a quem participa no desenvolvimento e no desenvolvimento derivado e explica a estrutura do repositório, os comandos de compilação, o conjunto de testes e a verificação da consistência da documentação. A licença e os limites legais constam do [Código aberto e enquadramento legal da implantação própria](/pt/open-source/).

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

## 1. Estrutura do repositório

| Caminho | Conteúdo |
| --- | --- |
| `player/` | Leitor web em Vue 3 (i18n integrado em três línguas: zh/en/ja) |
| `functions/` | Gateway de edge das Cloudflare Pages Functions (encaminhamento, limitação de taxa, cache, circuit breaker) |
| `functions/_lib/sonic/` | Lógica partilhada de recomendação, identidade, protocolos a montante e segurança |
| `server/` | Motor do plano de dados em Node.js 22 (com o armazenamento SQLite `recommend-sqlite.ts`) |
| `Dockerfile` / `docker-compose.yml` | Pilha de contentores do plano de dados (sonic-engine + ncm-api) |
| `docs/` | Documentação de operações, conformidade, remediação de auditoria e problemas conhecidos |
| `tests/` | Testes de segurança, gateway, recomendação e portões de publicação |

## 2. Compilação e execução local

```bash
npm ci                              # dependências da raiz
pnpm --dir player install --frozen-lockfile
npm run build                       # compilar o leitor + copiar para dist
npx wrangler pages dev dist         # gateway de edge local (modo de degradação automático sem plano de dados)
npm run build:engine && npm run start:engine   # motor local do plano de dados
```

## 3. Conjunto de testes

Executado por `npm test` antes da publicação, cobre:

1. Comportamento do gateway e degradação (`test-sonic-gateway.mjs`, `test-local-engine-and-degradation.mjs`);
2. Compatibilidade da autenticação e segurança OAuth (`test-auth-compatibility.mjs`, `tests/oauth-security.test.ts`);
3. SSRF e endurecimento da segurança (`tests/ssrf-security.test.ts`, `tests/security*.test.ts`);
4. Recomendação e pesquisa (`tests/recommendation-and-search.test.ts`);
5. XSS do frontend (`tests/frontend-xss.test.ts`);
6. Paridade de configuração: confronto item a item entre `.env.example` e as variáveis de ambiente lidas pelo código (`tests/config-parity.test.ts`);
7. Portões de publicação P0/P1 (`tests/release-p0-p1-gate.test.ts`).

## 4. Verificação da consistência da documentação

Este site (sonicdocs) confere-se com o código-fonte a cada versão; a cadeia de ferramentas de verificação:

```bash
pnpm validate    # compilação + verificação de ligações quebradas em âncoras internas + verificação da simetria estrutural multilingue
```

1. `scripts/validate-anchors.cjs`: zero ligações quebradas nas âncoras internas e nas referências a imagens de todo o site;
2. `scripts/check-structure.py`: estrutura de títulos/tabelas/imagens/avisos 1:1 entre as versões linguísticas;
3. `doc/legal-reference.md`: lista branca das citações de artigos do RGPD (dossiê de verificação EUR-Lex); a documentação não pode conter artigos fora da lista branca;
4. Os factos técnicos atualizam-se a cada versão por confronto com o código-fonte (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`); as divergências exigem avaliação e correção documental. O código não legitima tratamentos nem afasta responsabilidade por informação incorreta. A revisão de 2026-11-02 do candidato `rc/sonic-20261031@a75f5cb`, distinguindo a versão antiga `main@ce443c8`, não certifica a instância em produção.

## 5. Contribuir

1. Questões e discussão: Issues do repositório GitHub (`github.com/shijianus/sonic`);
2. Antes de submeter, execute o conjunto de testes completo e `npm run lint`;
3. As alterações que envolvam tratamento de dados (novo item de recolha, alteração da política de retenção, novo destinatário de partilha com terceiros) exigem a atualização em sincronia dos documentos correspondentes deste site e a passagem pela verificação da consistência;
4. A introdução de dependências de terceiros exige atualizar `THIRD_PARTY_NOTICES.md` e avaliar os impactos na privacidade e nas licenças.

## 6. Contribuir com traduções da documentação

O chinês simplificado é a base de manutenção e as nove outras versões são traduções; lei imperativa, interpretação favorável ao consumidor e informação compreensível prevalecem sobre prioridade linguística. Este site tem uma estrutura multilingue em paralelo: qualquer alteração numa língua sincroniza-se com as restantes (a simetria estrutural 1:1 verifica-se por script). Ao acrescentar uma língua: registe o locale, complete toda a documentação, acrescente a língua à lista de línguas do script de estrutura e confira as citações legais conforme o formato de citação dessa língua fixado em `doc/legal-reference.md`.
