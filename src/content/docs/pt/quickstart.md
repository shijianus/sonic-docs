---
title: Início rápido
description: "Guia rápido do Sonic: o caminho mais curto desde a abertura do site até à pesquisa e reprodução, início de sessão e preferências locais, descargas e música local, e utilização móvel."
---

**Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5**

Esta página indica o caminho mais curto para utilizar a instância gerida do Sonic (`sonic.epocanvas.tech`): da abertura do site à pesquisa e reprodução, início de sessão e preferências locais, descargas e música local, e utilização móvel. Os favoritos, as playlists e as preferências ficam apenas no navegador atual e não são sincronizados na nuvem entre dispositivos. A visita completa à interface consta da [Interface e funcionalidades](/pt/interface/); esta página não abrange a implantação própria (para a implantação, ver o [Guia de implantação](/pt/deployment/)).

## 1. Abrir o site

No navegador, aceda a `sonic.epocanvas.tech` (espelho de reserva: `sonic.epocanvas.com`). A língua da interface segue por predefinição a do navegador e pode trocar-se em «Definições → Língua da interface» entre Chinês Simplificado, English e 日本語; o tema (claro/escuro/conforme o sistema) ajusta-se no mesmo lugar. Todas as funções principais utilizam-se sem início de sessão.

## 2. Pesquisar e reproduzir

1. Na caixa de pesquisa no topo da barra lateral esquerda (ou na página «Pesquisa»), introduza palavras-chave de músicas, artistas, álbuns ou playlists; a pesquisa suporta normalização simplificado/tradicional, pinyin e iniciais e tolerância ortográfica;
2. Os resultados dividem-se em três separadores (Faixas/Playlists/MV); clicar numa faixa inicia a reprodução, ou use «Reproduzir tudo» para reproduzir a lista inteira;
3. A barra de reprodução inferior mostra a faixa atual, a linha de pré-visualização da letra e o selo de qualidade (como SQ sem perdas); clicar na capa abre a gaveta do leitor em ecrã inteiro, com a letra palavra a palavra (original/tradução/romanização, com três interruptores independentes).

Perante um fragmento de amostra de 30 segundos, o leitor assinala-o fielmente com o selo de amostra, apresentando-o nunca como faixa completa; com o complemento entre fontes ativado, tenta automaticamente corresponder a faixa gratuita completa.

## 3. Início de sessão e favoritos locais

Inicie sessão com a conta Epomail via OAuth 2.0 (PKCE); o serviço não mantém sistema de registo autónomo:

1. Clique na entrada de início de sessão no fundo da barra lateral, que leva à página de autorização da Epomail, e confirme;
2. Após o início de sessão pode usar as músicas favoritas, as playlists guardadas, os artistas seguidos e as playlists criadas por si; estes dados ficam apenas no navegador atual, não são enviados para o servidor e não são sincronizados na nuvem entre dispositivos;
3. O início de sessão desbloqueia igualmente a recomendação personalizada e a continuação do Auto DJ, ambas desativáveis em «Definições → Privacidade e dados locais»; desativadas, as recomendações passam ao modo puramente público e deixa de registar quaisquer eventos comportamentais.

A sessão tem validade máxima de 30 dias; o término de sessão revoga-a de imediato. As regras de conta constam da secção 3 dos [Termos de Utilização](/pt/terms-of-service/).

## 4. Descargas e música local

1. Descarga: clique em descarregar na coluna de ações da faixa ou na barra de reprodução inferior; a música guarda-se, com os metadados de qualidade, no IndexedDB do navegador e gere-se na página «Descargas»; reproduz-se offline;
2. Música local: a página «Música local» permite adicionar por clique ou arrastar e largar ficheiros de áudio para o navegador; os ficheiros importados guardam-se igualmente no IndexedDB, sem envio para o servidor;
3. Ambos destinam-se apenas à sua audição pessoal e não podem ser redistribuídos (ver a [Política de Utilização Aceitável](/pt/acceptable-use/)).

## 5. Utilização móvel

Acedendo ao mesmo endereço pelo navegador do telemóvel obtém-se a disposição móvel: navegação por separadores no rodapé (Página inicial, Pesquisa, Reproduções recentes, Definições) e barra de leitura mini; a gaveta do leitor oferece a mesma letra palavra a palavra e o mesmo menu de qualidade. Os favoritos, as preferências e as descargas guardam-se em separado no ambiente móvel e no de secretária (cada um no respetivo navegador), sem sincronização entre dispositivos ou na nuvem.

## 6. Primeiros passos na privacidade

Na primeira utilização, conheça três controlos (em «Definições → Privacidade e dados locais»):

1. Pesquisa inteligente e recomendação personalizada: interruptor geral; desativado, os eventos deixam de se recolher;
2. Rádio contínua automática (Auto DJ): controla a continuação automática quando a reprodução termina;
3. Repor o perfil de recomendação e os registos de desinteresse / Limpar todos os dados locais: dois botões de eliminação de efeito imediato.

A formulação integral dos compromissos de privacidade consta da [Política de Privacidade](/pt/privacy-policy/).

## 7. Respostas rápidas às perguntas frequentes

| Pergunta | Resposta |
| --- | --- |
| É pago? | Gratuito, sem publicidade e sem compras internas |
| Posso usar sem início de sessão? | As funções principais usam-se anonimamente (limitação de taxa mais rigorosa) |
| Onde se guardam os dados? | Navegador local + eventos comportamentais pseudonimizados no servidor (90 dias) |
| Como apagar o perfil? | Definições → Repor o perfil de recomendação, com efeito imediato |
| Porque 30 segundos? | Corte de amostra oficial, assinalado fielmente, com complemento entre fontes na medida do possível |
| Os selos de qualidade enganam? | Os selos refletem fielmente o nível da stream atual |

Mais dúvidas na secção 12 da [Apresentação do projeto](/pt/project/); terminologia legal nas [Definições de termos](/pt/key-terms/).
