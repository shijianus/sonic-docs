---
title: Gestão e armazenamento de dados
description: "Gestão e armazenamento de dados do Sonic: localização dos dados, consulta do resumo do perfil, operações de limpeza e recomendações de cópia de segurança."
---

**Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5**

Esta página resume a totalidade dos seus dados no Sonic: onde se guardam, como os consultar, como os exportar e como os limpar. Os fundamentos legais e o quadro de direitos constam da [Política de Privacidade](/pt/privacy-policy/), secções 4, 6 e 9; as medidas técnicas constam de [Processamento de dados e segurança](/pt/data-security/).

## 1. Visão geral dos locais dos dados

| Dados | Local | Associados à identidade | Prazo de conservação |
| --- | --- | --- | --- |
| Favoritos, playlists e preferências | localStorage do navegador | Não são enviados | Até serem limpos |
| Histórico de reprodução | localStorage do navegador | Não é enviado | Até ser limpo |
| Descargas e música local | IndexedDB do navegador | Não são enviados | Até serem limpos |
| Eventos comportamentais | SQLite no servidor (plano de dados) | Hash pseudonimizado | Destruição automática após 90 dias |
| Estatísticas globais agregadas | SQLite no servidor | Sem associação a indivíduos | Conforme a manutenção da base de dados |
| Histórico de pesquisa (local) | localStorage do navegador | Não é enviado | Até ser limpo |

Os dados de identificação da conta (como o endereço de correio eletrónico) não se persistem em disco e existem apenas durante a sessão; a base de dados não tem coluna de IP.

## 2. Consulta: resumo do perfil de recomendação

Através de `GET /api/sonic/events` (ou do bloco de perfil na página de definições) pode consultar o resumo do perfil atual no servidor: total de eventos, contagens de favoritos e de rejeições, artistas mais ouvidos, tendências de género, termos de pesquisa recentes e forma de armazenamento. Esta é a concretização imediata do direito de acesso em self-service (o artigo 15 do RGPD); o arquivo completo são os próprios eventos comportamentais, cujo âmbito pode verificar eliminando-os e reconstruindo-os.

## 3. Exportação e cópias de segurança

1. Dados do navegador: os favoritos, as playlists e as descargas guardam-se no seu navegador e podem salvaguardar-se através das capacidades de exportação ou sincronização do próprio navegador; o serviço não tem exportação para a nuvem incorporada: é o preço do desenho de minimização de privacidade, os dados pertencem ao seu dispositivo;
2. Eventos comportamentais: o servidor guarda apenas eventos comportamentais pseudonimizados, sem canal de exportação; para os eliminar, use as operações de limpeza da secção 4;
3. Música local: os ficheiros originais importados continuam no seu dispositivo; eliminar a cópia no navegador não afeta os ficheiros originais.

## 4. Operações de limpeza

| Operação | Âmbito | Efeito |
| --- | --- | --- |
| Repor o perfil de recomendação e os registos de desinteresse | Totalidade dos eventos comportamentais no servidor | Imediato (`DELETE /api/sonic/events`) |
| Limpar todos os dados locais | localStorage, sessionStorage e IndexedDB do navegador + perfil no servidor | Imediato após confirmação |
| Limpar os dados do site no navegador | O mesmo, no lado do navegador | Imediato |
| Terminar sessão | Sessão e chave | Imediato |

## 5. Instâncias de implantação própria

Nas instâncias de implantação própria, os dados guardam-se no plano de dados de quem implanta (volume nomeado SQLite); quem implanta pode configurar os dias de retenção e o caminho de persistência em disco (ver a secção 3 do [Guia de implantação](/pt/deployment/)); os deveres de cópia de segurança e de informação constam igualmente da secção 4 de [Código aberto e enquadramento legal da implantação própria](/pt/open-source/).
