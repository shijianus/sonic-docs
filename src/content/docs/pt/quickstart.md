---
title: Início rápido
description: "Guia rápido do Sonic: o caminho mais curto desde a abertura do site até à pesquisa e reprodução, início de sessão e preferências locais, descargas e música local, e utilização móvel."
---

**Data de revisão: 2 de novembro de 2026｜Versão: 1.8**

Esta página indica o caminho mais curto para utilizar a instância gerida do Sonic (`sonic.epocanvas.tech`): da abertura do site à pesquisa e reprodução, início de sessão e preferências locais, descargas e música local, e utilização móvel. Favoritos, playlists e preferências são principalmente locais; não há sincronização geral nem cópia de segurança duradoura na nuvem. A visita completa à interface consta da [Interface e funcionalidades](/pt/interface/); esta página não abrange a implantação própria (para a implantação, ver o [Guia de implantação](/pt/deployment/)).

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

## 1. Abrir o site

No navegador, aceda a `sonic.epocanvas.tech` (espelho de reserva: `sonic.epocanvas.com`). A língua da interface segue por predefinição a do navegador e pode trocar-se em «Definições → Língua da interface» entre Chinês Simplificado, English e 日本語; o tema (claro/escuro/conforme o sistema) ajusta-se no mesmo lugar. Todas as funções principais utilizam-se sem início de sessão.

## 2. Pesquisar e reproduzir

1. Na caixa de pesquisa no topo da barra lateral esquerda (ou na página «Pesquisa»), introduza palavras-chave de músicas, artistas, álbuns ou playlists; a pesquisa suporta normalização simplificado/tradicional, pinyin e iniciais e tolerância ortográfica. Os termos podem entrar em sugestões públicas; não introduza informações privadas ou sensíveis;
2. Os resultados dividem-se em três separadores (Faixas/Playlists/MV); clicar numa faixa inicia a reprodução, ou use «Reproduzir tudo» para reproduzir a lista inteira;
3. A barra de reprodução inferior mostra a faixa atual, a linha de pré-visualização da letra e o selo de qualidade (como SQ sem perdas); clicar na capa abre a gaveta do leitor em ecrã inteiro, com a letra palavra a palavra (original/tradução/romanização, com três interruptores independentes).

Perante um fragmento de amostra de 30 segundos, o leitor assinala-o com o selo de amostra; com o complemento entre fontes ativado, tenta corresponder a faixa gratuita completa. A disponibilidade técnica não concede licença sobre o conteúdo.

## 3. Início de sessão e favoritos locais

Inicie sessão com a conta Epomail via OAuth 2.0 (PKCE); o serviço não mantém sistema de registo autónomo:

1. Clique na entrada de início de sessão no fundo da barra lateral, que leva à página de autorização da Epomail, e confirme;
2. Favoritos, playlists e artistas seguidos são geridos principalmente no armazenamento local do navegador, sem cópia de segurança geral entre dispositivos; o feedback e parte deste contexto podem, ainda assim, ser enviados;
3. A personalização e o Auto DJ estão ativos por predefinição no código atual; iniciar sessão não constitui consentimento válido para isso. Pode desativá-los em «Definições → Privacidade e dados locais», mas não cessa assim todos os pedidos nem a estatística separada de pesquisa. O radar tenta alguma sincronização remota, sem garantir cópia de segurança duradoura na nuvem.

A sessão dura 30 dias por predefinição; terminar sessão limpa o cookie atual. A revogação remota de credenciais copiadas depende da configuração e do sucesso do pedido. As regras de conta constam da secção 3 dos [Termos de Utilização](/pt/terms-of-service/).

## 4. Descargas e música local

1. Descarga: clique em descarregar na coluna de ações da faixa ou na barra de reprodução inferior; a música guarda-se, com os metadados de qualidade, no IndexedDB do navegador e gere-se na página «Descargas»; reproduz-se offline;
2. Música local: a página «Música local» permite adicionar por clique ou arrastar e largar ficheiros de áudio para o navegador; o corpo do áudio é guardado no IndexedDB e não foi encontrado caminho de envio do corpo, mas a procura de letras, o feedback e as recomendações podem enviar título, artista ou álbum, e as capas incorporadas podem ser transmitidas com eventos;
3. Utilize ou redistribua conteúdos apenas na medida dos seus direitos; importar ou descarregar não concede licença adicional (ver a [Política de Utilização Aceitável](/pt/acceptable-use/)).

## 5. Utilização móvel

Acedendo ao mesmo endereço pelo navegador do telemóvel obtém-se a disposição móvel: navegação por separadores no rodapé (Página inicial, Pesquisa, Reproduções recentes, Definições) e barra de leitura mini; a gaveta do leitor oferece a mesma letra palavra a palavra e o mesmo menu de qualidade. Favoritos, preferências e descargas guardam-se separadamente em cada navegador, o que não exclui pedidos remotos de contexto ou do radar.

## 6. Primeiros passos na privacidade

Na primeira utilização, conheça três controlos (em «Definições → Privacidade e dados locais»):

1. Pesquisa inteligente e recomendação personalizada: controla o caminho previsto de personalização; a estatística de pesquisa separada e os pedidos necessários podem continuar;
2. Rádio contínua automática (Auto DJ): controla a continuação automática quando a reprodução termina;
3. Repor o perfil de recomendação e os registos de desinteresse / Limpar todos os dados locais: operações com cobertura limitada e possíveis falhas não mostradas; podem permanecer identificadores anónimos antigos, radar, agregados, serviços externos e cópias de segurança. A limpeza local da aplicação não remove o cookie HttpOnly nem termina sessão; repor definições e recarregar pode reativar a personalização, pelo que deve verificar novamente a escolha. Para pedidos mais completos, contacte `privacy@epocanvas.com`.

A informação completa e os limites conhecidos constam da [Política de Privacidade](/pt/privacy-policy/). O modo privado do navegador não impede pedidos ou envio de eventos.

## 7. Respostas rápidas às perguntas frequentes

| Pergunta | Resposta |
| --- | --- |
| É pago? | Gratuito, sem publicidade e sem compras internas; projeto individual de teste sem SLA |
| Posso usar sem início de sessão? | As funções principais dispensam sessão, mas não são automaticamente anónimas (limitação de taxa mais rigorosa) |
| Onde se guardam os dados? | Dados do navegador, incluindo `auth`, e eventos, perfis e estatísticas remotos; não há prazo universal de eliminação de 90 dias  |
| Como apagar o perfil? | Definições → Repor o perfil de recomendação; eliminação parcial, com contacto de privacidade para pedidos completos |
| Porque 30 segundos? | Corte de amostra oficial, assinalado fielmente, com complemento entre fontes na medida do possível |
| Os selos de qualidade enganam? | Os selos refletem o nível da stream atual |

Mais dúvidas na secção 12 da [Apresentação do projeto](/pt/project/); terminologia legal nas [Definições de termos](/pt/key-terms/).
