---
title: Guia de implantação
description: "Guia de implantação do Sonic: duplo cenário de gateway de edge no Cloudflare Pages e motor local em Linux, variáveis de ambiente, cópias de segurança e restauro, verificações de saúde e reversão."
---

**Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.4**

Esta página explica os dois cenários de implantação própria do Sonic, as variáveis de ambiente principais, as cópias de segurança e o restauro e os pontos essenciais da operação. A partir do momento da implantação, quem implanta é o responsável pelo tratamento dos dados dos seus utilizadores; os deveres correspondentes constam da secção 6 de [Processamento de dados e segurança](/pt/data-security/) e do [Código aberto e enquadramento legal da implantação própria](/pt/open-source/); a formulação autoritativa dos detalhes operativos consta de `docs/OPERATIONS.md` no repositório a montante.

## 1. Cenário A: gateway de edge no Cloudflare Pages

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <你的项目名>
```

Na consola do Cloudflare Pages, configure as variáveis de ambiente encriptadas: `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (igual ao lado do VPS) e `SONIC_LOCAL_ENGINE_URL` (apontando para o domínio do túnel do seu plano de dados).

## 2. Cenário B: motor de protocolos local em Linux (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
cp .env.example .env
chmod 600 .env    # 填入强随机 SONIC_ENGINE_SECRET 与 SONIC_SECRET
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

Composição da pilha: contentor principal sonic-engine (mapeado no anfitrião apenas para `127.0.0.1:8080`), contentor auxiliar ncm-api fechado na rede interna e persistência SQLite (volume nomeado `sonic-data`). O plano de dados acede-se via Cloudflare Tunnel, sem exposição direta à Internet pública.

## 3. Variáveis de ambiente principais

| Variável | Descrição |
| --- | --- |
| `SONIC_SECRET` | Chave de assinatura das chaves de API, com comprimento ≥ 32 caracteres (`openssl rand -base64 48`) |
| `SONIC_ENGINE_SECRET` | Chave entre serviços, igual nos dois lados, Pages e VPS |
| `SONIC_LOCAL_ENGINE_URL` | Endereço do túnel do plano de dados |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | Interruptores dos protocolos de fontes de áudio integradas (predefinição 1) |
| `SONIC_ENABLE_AMLL/LRCLIB` | Interruptores do complemento de letras (predefinição 1) |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | Agregação de terceiros e desbloqueio (predefinição 0; devem permanecer desativados, salvo necessidade efetiva) |
| `SONIC_RECOMMEND_DB_PATH` | Caminho de persistência dos dados comportamentais; com `memory`, desativa-se a persistência |
| `SONIC_RECOMMEND_RETENTION_DAYS` | Dias de retenção dos eventos comportamentais (predefinição 90, mínimo 7) |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | Limitação de taxa (predefinição 240/600) |
| `EPOMAIL_BASE_URL`, entre outras | Configuração do OAuth Epomail |

A lista completa consta de `.env.example` no repositório a montante; os requisitos de coerência da informação sobre os interruptores ligados à privacidade constam da secção 6 de [Processamento de dados e segurança](/pt/data-security/).

## 4. Cópias de segurança e restauro

1. Cópia de segurança: o script de snapshot consistente executa `VACUUM INTO` com verificação de integridade (`npm run backup:db`); os ficheiros de cópia contêm dados comportamentais pseudonimizados e devem proteger-se ao mesmo nível dos dados de produção;
2. Restauro: após a paragem, o script de restauro repõe o snapshot (`npm run restore:db`); o repositório não tem estrutura de migrações versionadas e a versão de destino do restauro deve coincidir com a da cópia;
3. Capacidade: os eventos comportamentais limpam-se automaticamente com a retenção de 90 dias; o volume da base de dados cresce com os dados canónicos das faixas; atenção ao espaço do volume.

## 5. Verificações de saúde e reversão

1. Verificação de saúde: `GET /api/sonic/engine/health` (requer a chave de serviço) devolve o estado do motor e do circuit breaker; o circuit breaker do lado da edge degrada automaticamente perante falhas consecutivas do plano de dados;
2. Registos: os registos de acesso do lado do motor contêm apenas o caminho, o método, o código de estado e o tempo despendido (`docker compose logs`); a cadeia de consulta, o IP, os cookies e o corpo do pedido não se registam;
3. Reversão: no lado do Pages, basta reverter para a versão de implantação anterior; no plano de dados, `git checkout` da etiqueta anterior e novo `docker compose up -d --build`; antes de reverter, confirme a compatibilidade do esquema SQLite (não há estrutura de migrações).

## 6. Lista de verificação de quem implanta

Confirme item a item antes de entrar em produção:

1. Ambas as chaves são fortemente aleatórias e com comprimento ≥ 32 caracteres, e o `.env` tem permissões 600;
2. Os interruptores das cadeias de terceiros coerem com a sua informação de privacidade (as cadeias não ativadas eliminam-se da informação);
3. Os dias de retenção dos eventos comportamentais e o caminho de persistência cumprem os compromissos da sua política;
4. O plano de dados é acessível apenas via túnel e os portos do anfitrião não estão abertos à Internet pública;
5. Existe um plano de cópias de segurança e um exercício de restauro;
6. Publicou junto dos seus utilizadores o texto de informação (podendo baseá-lo na [Política de Privacidade](/pt/privacy-policy/) deste site).
