---
title: Interface e funcionalidades
description: "Guia da interface e das funcionalidades do leitor Sonic: página inicial e recomendações, pesquisa, controlos de reprodução, gaveta do leitor, A minha música, definições e controlos de privacidade, disposição móvel."
---

**Data de revisão: 2 de novembro de 2026｜Versão: 1.8**

Esta página orienta pela disposição da interface e pela localização das funcionalidades do leitor web do Sonic, indicando onde cada funcionalidade se encontra e como se comporta. As capturas de ecrã ilustram a interface em chinês simplificado, mas não comprovam a versão atualmente em produção; o produto permite trocar a língua da interface. A interface pode ser ajustada com a evolução das versões; o âmbito real de disponibilidade das funcionalidades depende do que a instância tenha ativado; os instrumentos legais constam dos [Termos de Utilização](/pt/terms-of-service/) e da [Política de Privacidade](/pt/privacy-policy/).

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

![Página inicial do leitor do Sonic: barra de navegação à esquerda (três zonas: Explorar, A minha música, Sistema), zona principal com carrossel de recomendações, recomendação inteligente e radar musical, playlists recomendadas, e barra de leitura mini no rodapé](/images/sonic/ui/ui-home.png)

*Figura: página inicial na secretária. A barra lateral esquerda divide-se em «Explorar» (Página inicial, MV, Tabelas de classificação, Artistas, Novos álbuns, Pesquisa) e «A minha música» (Favoritas, Reproduções recentes, Descargas, Música local); a zona principal tem, de cima para baixo, o carrossel de recomendações, a recomendação inteligente e o radar musical e as playlists recomendadas; no rodapé permanece a barra de leitura mini.*

## 1. Página inicial e recomendação inteligente

A página inicial agrega três zonas de conteúdos:

1. Carrossel de recomendações: apresenta novas músicas e novos álbuns; os cartões trazem selos de origem como «novidades Sonic» e um clique leva diretamente à reprodução ou aos detalhes;
2. Recomendação inteligente e radar musical: oferece as vistas «Sugestões para si», «Tabela de tendências do site» e «Radar de exploração de estilos», com as ações «Trocar lote» e «Reproduzir a lista de recomendações»; depois de uma pesquisa, o radar apresenta de forma dinâmica correspondências segundo a sua intenção de pesquisa e os seus sinais de preferência. Os cartões de recomendação indicam o motivo da recomendação (como o selo «recomendação personalizada» e as notas «ouve frequentemente este artista» e «próximo dos estilos que prefere»); a página inicial móvel mostra ainda as etiquetas dos sinais de preferência da sessão atual (artista, género, entre outros); as categorias de sinais subjacentes às recomendações constam da secção 4.2 da [Política de Privacidade](/pt/privacy-policy/);
3. Playlists recomendadas e êxitos: geradas a partir das tendências reais de audição de todo o site, com o número de reproduções indicado nos cartões.

![Radar musical e de estilos da página inicial do Sonic: depois de uma pesquisa, o radar mostra correspondências com base nos sinais de preferência, alinhadas com o estilo dos êxitos](/images/sonic/ui/ui-radar.png)

*Figura: radar musical e de estilos após uma pesquisa. Os resultados do radar seguem o estilo dos cartões de «êxitos», com o motivo da recomendação e as etiquetas dos sinais de preferência apresentados de forma transparente.*

As recomendações constituem definição de perfis e afetam sobretudo a ordenação dos conteúdos. Personalização e Auto DJ estão ativos por predefinição, o que não prova consentimento. Desativar a personalização não interrompe estatísticas de pesquisa independentes nem todos os caminhos do radar. O Auto DJ tem interruptor separado e ainda pode enviar sementes e exclusões para preencher a fila; o radar ainda pode enviar uma carga de preferências, embora o servidor recuse conservá-la devido à marca de desativação. Envio e conservação são tratamentos distintos.

### 1.1 Barra lateral: modo recolhido e entrada da conta

O logótipo da marca no topo da barra lateral funciona como interruptor de recolha: clique para reduzir a barra a uma faixa estreita (modo de ícones) e clique novamente para a expandir. A entrada da conta Epomail fica no fundo da barra lateral: sem início de sessão apresenta a orientação para iniciar sessão; depois do início de sessão mostra a alcunha da conta e a entrada de gestão. O estado de início de sessão sincroniza-se entre separadores do mesmo navegador.

## 2. Pesquisa

![Página de resultados de pesquisa do Sonic: pesquisa por «Jay Chou» com 52 resultados, separadores de faixas, playlists e MV, botão Reproduzir tudo, e lista de resultados com capa, artista, álbum, duração e coluna de ações](/images/sonic/ui/ui-search.png)

*Figura: página de resultados de pesquisa. No topo, os separadores de categorias (Faixas/Playlists/MV) e «Reproduzir tudo»; as colunas da lista apresentam capa, música, artista, álbum, duração e ações (reproduzir, MV, favorita, descarregar). A caixa de pesquisa suporta normalização simplificado/tradicional, pinyin e iniciais e tolerância ortográfica.*

A pesquisa fica na parte superior da barra lateral esquerda e na página de pesquisa, cobrindo palavras-chave de músicas, artistas, álbuns e playlists. Os resultados multifuente ordenam-se por relevância após fusão com desduplicação por expressão regular; as faixas cuja fonte é uma amostra assinalam-se fielmente ao abrigo das regras de [fontes de áudio e cadeia de letras](/pt/project/#4-cadeia-de-fontes-de-áudio-e-letras), sem apresentar deliberadamente uma amostra como faixa completa. Os termos podem entrar em sugestões públicas; não introduza informações privadas ou sensíveis.

## 3. Tabelas de classificação e listas oficiais

![Página de tabelas de classificação do Sonic: separadores de novidades e listas oficiais, sub-tabelas de cinco categorias (todas, chinófona, ocidental, Japão, Coreia), e listas com posição, capa, música, artista, álbum e duração](/images/sonic/ui/ui-charts.png)

*Figura: página de tabelas de classificação. À esquerda, o seletor de tabelas (Novidades/Listas oficiais, com as categorias todas/chinófona/ocidental/Japão/Coreia); à direita, a lista da tabela e «Reproduzir tudo». Os dados das tabelas provêm das listas oficiais a montante e das tendências reais de audição do site.*

A «Tabela de tendências do site» da página inicial e a página de tabelas de classificação partilham o mesmo modelo de popularidade: ponderação de cinco fatores (reprodução efetiva, ouvintes independentes, desempenho de conclusão, conversão em favoritos e declive de crescimento), complementada com decaimento temporal exponencial e suavização bayesiana (descrição do modelo na secção 5 da [Apresentação do projeto](/pt/project/)).

## 4. Biblioteca de artistas e álbuns

![Biblioteca de artistas do Sonic: duplo filtro por tipo (todas, cantores, cantoras, bandas) e por região (chinófona, ocidental, Japão, Coreia, outras), pesquisa por inicial A–Z e populares, e cartões de artista com o número de álbuns](/images/sonic/ui/ui-artists.png)

*Figura: biblioteca de artistas. Filtram-se os artistas por tipo, região e inicial; os cartões mostram o avatar, o nome e o número de álbuns. Dentro da página de artista pode percorrer os seus êxitos e os seus álbuns, e a página de álbum enumera as faixas.*

As páginas usam proxy de capas e análise de cor nos caminhos previstos; imagens também podem ser pedidas diretamente, expondo IP e metadados de ligação. Os dados das listas provêm de interfaces a montante; a acessibilidade técnica não prova licença sobre os conteúdos.

## 5. Controlos de reprodução (barra de reprodução inferior)

![Barra de reprodução inferior do Sonic: ao reproduzir «Qing Tian», mostra a linha de pré-visualização da letra, faixa anterior, reprodução, faixa seguinte, modo de reprodução, menu de qualidade (SQ sem perdas), descarga e controlo de volume](/images/sonic/ui/ui-player.png)

*Figura: barra de reprodução inferior em estado de reprodução. À esquerda, a capa, as informações da faixa em curso e a linha de pré-visualização da letra; ao centro, os controlos de reprodução e a troca de modo; à direita, o menu de qualidade (selo atual «SQ sem perdas»), a descarga, o cursor de volume e a entrada da lista de reprodução. Clicar na zona da capa abre a gaveta do leitor em ecrã inteiro.*

A barra de reprodução inferior permanece em todas as páginas e oferece:

1. Menu de qualidade: enumera os níveis realmente disponíveis na fonte de áudio atual (como SQ sem perdas, HQ alta qualidade, padrão); o selo reflete fielmente a qualidade da stream em curso, sem indicação falsa;
2. Linha de pré-visualização da letra: mostra a frase em curso da letra palavra a palavra;
3. Modos de reprodução: troca entre repetição da lista, repetição da faixa, aleatório e outros modos;
4. Descarga: guarda a faixa atual no navegador (IndexedDB); ver a secção 3 da [Gestão da biblioteca musical](/pt/library/).

## 6. Gaveta do leitor e letras palavra a palavra

![Gaveta do leitor em ecrã inteiro do Sonic: à esquerda, animação de capa em disco de vinil e informações da faixa; à direita, painel de letras deslizante; fundo grada com os tons da capa; canto superior direito, troca de fundo e de modo de visualização](/images/sonic/ui/ui-player-drawer.png)

*Figura: gaveta do leitor em ecrã inteiro. À esquerda, a apresentação da capa (animação de disco de vinil) e os controlos de reprodução; à direita, o painel deslizante da letra palavra a palavra; o fundo grada em tempo real com a cor principal da capa. A gaveta abre-se ao clicar na capa da barra de reprodução inferior.*

A gaveta do leitor oferece:

1. Letras palavra a palavra: dá prioridade às linhas temporais ao nível do carácter YRC/QRC/KRC, complementadas por AMLL TTML e LRCLIB; o painel de letras dispõe de três interruptores independentes («original», «tradução», «romanização», também controláveis nas definições); clicar numa linha da letra salta para a posição de reprodução;
2. Modos de capa: animações de capa como disco de vinil e espectro circular;
3. Visualização de áudio: modos de visualização de espectro como barras, onda e círculo, aplicados ao fundo da gaveta ou ao leitor inferior (configurável nas definições);
4. Salto por arrasto: a barra de progresso suporta arrastar, com a letra a deslizar em sincronia com a posição de reprodução.

## 7. A minha música

A zona «A minha música» inclui quatro itens:

| Página | Conteúdo | Local de armazenamento |
| --- | --- | --- |
| Favoritas | Músicas favoritas e playlists, álbuns, artistas e MV guardados | localStorage do navegador (`library`) |
| Reproduções recentes | Histórico de reprodução | localStorage do navegador (`audio`) |
| Descargas | Faixas offline descarregadas (com metadados de qualidade) | IndexedDB do navegador (`downloaded_music`) |
| Música local | Ficheiros de áudio locais importados manualmente (suporta arrastar e largar para o navegador) | IndexedDB do navegador (`local_music`) |

A tabela indica locais de armazenamento no dispositivo, sem garantir ausência de transmissão. Não foi encontrado um caminho de envio do corpo do áudio local, mas capas incorporadas, títulos, artistas, álbuns, identificadores de faixas, feedback de favoritos e contexto de recomendação podem ser enviados. A limpeza do navegador remove a cópia local, não todos os dados remotos; não se garante cópia de segurança geral na nuvem. Importar ou descarregar não concede direitos adicionais (ver a [Política de Utilização Aceitável](/pt/acceptable-use/)).

## 8. Definições

![Página de definições do Sonic: cartões de configuração do modo de tema (conforme o sistema), língua da interface (Chinês), tipo de fundo, qualidade de áudio, letra do leitor inferior, visualização de áudio, entre outros](/images/sonic/ui/ui-settings.png)

*Figura: a página de definições organiza todas as preferências em cartões. Cada cartão corresponde a um tipo de definição: modo de tema (claro/escuro/conforme o sistema), língua da interface (Chinês/English/日本語), tipo de fundo, preferência de qualidade de áudio, exibição da letra no leitor inferior, modo de visualização de áudio, entre outros.*

As definições de interface guardam-se no armazenamento local (como `settings` e `global`). Outros estados locais podem integrar pedidos de rede; «local» não significa ausência de envio. `auth` também guarda dados do utilizador no navegador.

## 9. Privacidade e controlo de dados

![Bloco «Privacidade e dados locais» da página de definições do Sonic: explicação do armazenamento local do navegador e do IndexedDB, interruptores da pesquisa inteligente e da recomendação personalizada, interruptor da rádio contínua automática (Auto DJ) e botão de reposição do perfil de recomendação e dos registos de desinteresse](/images/sonic/ui/ui-privacy.png)

*Figura: bloco «Privacidade e dados locais». Textos antigos da interface podem sugerir armazenamento exclusivamente local ou eliminação integral; na realidade, pode haver envio de contexto e a reposição é parcial. Uma mensagem de sucesso não prova eliminação remota completa.*

Este bloco oferece funções limitadas de self-service, não a concretização integral dos direitos; ver as secções 6 e 9 da [Política de Privacidade](/pt/privacy-policy/):

1. Interruptor «Pesquisa inteligente e recomendação personalizada»: controla o caminho previsto de personalização; nem toda a recolha nem a reutilização pública de pesquisas termina;
2. Interruptor «Rádio contínua automática (Auto DJ)»: controla a continuação automática quando a lista de reprodução termina;
3. «Repor o perfil de recomendação e os registos de desinteresse»: elimina parte dos eventos e feedback da identidade atual (`DELETE /api/sonic/events`), sem garantir cobertura de identificadores antigos, radar, agregados, serviços externos ou cópias de segurança;
4. «Limpar todos os dados locais»: tenta, após confirmação, limpar armazenamento local e IndexedDB e repor parte do perfil remoto; podem subsistir falhas parciais apesar da indicação de sucesso. Não remove o cookie de sessão HttpOnly nem termina a sessão. Repor definições e recarregar pode reativar a personalização predefinida; verifique novamente a escolha. O sucesso local não prova eliminação remota integral; para pedidos mais completos, contacte `privacy@epocanvas.com`.

## 10. Dispositivos móveis

![Página inicial móvel do Sonic: carrossel, recomendação inteligente e radar musical, etiquetas dos sinais de preferência (Jay Chou, mandopop, r&b), cartões de recomendação personalizada com o respetivo motivo, e no rodapé a barra de leitura mini e a navegação por separadores (Página inicial, Pesquisa, Reproduções recentes, Definições)](/images/sonic/ui/ui-mobile-home.png)

*Figura: disposição móvel. Os cartões indicam o motivo da recomendação personalizada e as notas «ouve frequentemente» e «próximo dos estilos que prefere»; os sinais de preferência apresentam-se como etiquetas; no rodapé ficam a navegação por separadores e a barra de leitura mini. A gaveta do leitor móvel (PlayerDrawerMobile) oferece letra palavra a palavra e menu de qualidade equivalentes.*

O ambiente móvel e o de secretária partilham o mesmo sistema de contas e as mesmas regras de armazenamento de dados; a apresentação dos motivos de recomendação observa os mesmos princípios de transparência do ambiente de secretária.

## 11. Documentos relacionados

| Documento | Conteúdo |
| --- | --- |
| [Apresentação do projeto](/pt/project/) | Posicionamento do produto, arquitetura, motor de recomendação e desenho de segurança |
| [Política de Privacidade](/pt/privacy-policy/) | Âmbito dos eventos comportamentais, fundamentos legais e exercício dos direitos |
| [Termos de Utilização](/pt/terms-of-service/) | Condições contratuais de utilização do serviço |
| [Processamento de dados e segurança](/pt/data-security/) | Ciclo de vida dos dados e medidas técnicas |
