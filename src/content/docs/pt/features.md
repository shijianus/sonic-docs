---
title: Guia de funcionalidades
description: "Guia de funcionalidades do Sonic: qualidade e amostras, letras palavra a palavra, recomendação e Auto DJ, descargas, música local, tabelas, MV e pesquisa."
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta página explica em profundidade o comportamento de cada função do Sonic e as escolhas de desenho subjacentes. As localizações na interface constam da [Interface e funcionalidades](/pt/interface/); a explicação técnica dos sinais comportamentais e do modelo de recomendação consta da secção 5 da [Apresentação do projeto](/pt/project/); as condições contratuais de utilização das funções constam dos [Termos de Utilização](/pt/terms-of-service/).

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

![Os seis grupos de funcionalidades do Sonic: pesquisa, reprodução, letras, biblioteca, recomendações e privacidade](/images/sonic/features-map.svg)

*Figura: seis grupos de funcionalidades; o âmbito real das recomendações e dos controlos de privacidade depende da configuração da instância.*

## 1. Níveis de qualidade e transparência das amostras

O Sonic distingue rigorosamente as faixas completas dos fragmentos de amostra:

1. Níveis de qualidade: os níveis disponíveis na fonte de áudio (SQ sem perdas, HQ alta qualidade, padrão, entre outros) dependem das ligações diretas realmente emitidas a montante; o menu de qualidade enumera apenas os itens realmente disponíveis e o selo assinala fielmente a stream em curso;
2. Deteção de amostras: a sondagem da duração e dos metadados das entidades de áudio identifica os cortes oficiais de amostra de 30 segundos, apresentados com o selo de amostra, apresentando uma amostra nunca como faixa completa;
3. Complemento entre fontes: ativado, corresponde automaticamente, para as faixas em amostra, às faixas gratuitas completas da QQ, KuGou e KuWo; havendo correspondência, a comutação é suave e a origem substituta é identificada; sem correspondência, mantém-se a amostra e passa-se naturalmente à faixa seguinte no seu final;
4. Limites rigorosos: o acesso técnico ou credenciais próprias de subscrição não concedem licença adicional; não contorne medidas de pagamento, acesso ou proteção de direitos de autor.

## 2. Cadeia das letras palavra a palavra

As letras obtêm-se por três níveis de prioridade:

| Prioridade | Origem | Formato |
| --- | --- | --- |
| 1 | Análise nativa local (NetEase/QQ/KuGou) | Linhas temporais ao nível do carácter YRC/QRC/KRC |
| 2 | AMLL | Formato palavra a palavra TTML |
| 3 | LRCLIB | Letras sincronizadas linha a linha |

O painel de letras dispõe de três interruptores independentes (original, tradução e romanização); clicar numa linha da letra salta para a posição de reprodução; a animação ao nível do carácter sincroniza-se com o progresso da reprodução. Os dados das letras passam igualmente pela cache de edge e, faltando letras de análise nativa local, degrada-se automaticamente para a base global de letras.

## 3. Recomendação e Auto DJ

1. Sugestões para si: recomendação pessoal que combina a taxa de conclusão, os favoritos, a intenção de pesquisa da sessão e a reordenação de diversidade por MMR; os cartões mostram o motivo da recomendação (como «ouve frequentemente este artista»), e o ambiente móvel mostra ainda as etiquetas dos sinais de preferência;
2. Tabela de tendências do site: tabela de subida de 24 horas e tabela acumulada de popularidade de 7 dias, baseadas nos sinais reais de reprodução de todo o site;
3. Radar de exploração de estilos: exploração por género, com parâmetro de temperatura para ajustar a amplitude da exploração;
4. Auto DJ: terminada naturalmente a lista de reprodução, continua automaticamente com faixas reproduzíveis conforme o estilo da faixa em curso; pode desativar-se nas definições;
5. Purificação dos sinais: 6 tipos de trocas de faixa não imputáveis ao utilizador, como paragens de rede, falhas de descodificação e cortes de amostra, não entram no conjunto de dados da recomendação;
6. Controlo dos dados: identificadores pseudónimos podem continuar a ser pessoais. Personalização e Auto DJ estão ativos por predefinição, sem que isso prove consentimento. Não há eliminação universal aos 90 dias; a reposição pode omitir radar, identidades antigas, agregados, serviços externos e cópias de segurança e ignorar falhas (ver as secções 5, 6 e 9 da [Política de Privacidade](/pt/privacy-policy/)).

## 4. Descargas e música local

1. Descargas: as faixas guardam-se, com os metadados de qualidade, no IndexedDB do navegador (`downloaded_music`) e gere-se na página de descargas, com reprodução offline;
2. Música local: ficheiros de áudio locais importados por arrastar e largar ou por seleção para o navegador (`local_music`), apresentados de forma unificada com a biblioteca online;
3. Limites: não foi encontrado um caminho de envio do corpo do áudio local. A procura de letras, o feedback de favoritos e o contexto de recomendação podem enviar título, artista, álbum ou identificadores; as capas incorporadas também podem ser enviadas com eventos e entrar no catálogo remoto partilhado de faixas. O armazenamento local não é uma cópia de segurança geral na nuvem; importar e descarregar não concede direitos adicionais sobre os conteúdos.

## 5. Tabelas de classificação e listas oficiais

A página de tabelas de classificação oferece novidades e listas oficiais, cada uma com cinco categorias (todas, chinófona, ocidental, Japão e Coreia); as tabelas suportam a reprodução contínua com um clique. A tabela de tendências da página inicial e a página de tabelas partilham o mesmo modelo de popularidade (ponderação de cinco fatores + decaimento temporal + suavização bayesiana); detalhe na secção 5 da [Apresentação do projeto](/pt/project/).

## 6. Reprodução de MV

Os resultados e a página da música levam ao leitor de MV; a disponibilidade depende da origem. Pedidos diretos de MV e imagens podem expor o IP. A escrita de comentários, respostas e gostos é uma simulação local; comentários lidos a montante podem conter dados pessoais e são colocados em cache.

## 7. Tolerância a falhas na pesquisa

A cadeia de pesquisa inclui tolerância multinível: normalização dos caracteres simplificado/tradicional, pesquisa por pinyin e iniciais, correspondência simétrica das alcunhas dos artistas em chinês e em inglês, tolerância ortográfica por distância de edição e reconhecimento de versões; após a recuperação paralela de múltiplas fontes, faz-se a fusão com desduplicação por expressão regular. Mesmo palavras-chave incorretas podem encontrar resultados. Os textos podem entrar separadamente em sugestões públicas; desativar a personalização não termina esse caminho.

## 8. Modo degradado

Quando o nó do plano de dados fica offline ou excede o tempo, a camada de edge comuta automaticamente para o modo degradado: a pesquisa e as letras ligam-se diretamente, na edge, às interfaces públicas; a interface exibe o aviso «modo degradado de edge»; conteúdos já carregados podem continuar, mas disponibilidade e tempo de recuperação não são garantidos. Durante a degradação, a análise integral das fontes de áudio e a atualização das recomendações podem ficar indisponíveis, com fecho automático após a recuperação (explicação do mecanismo de contingência na secção 3.1 da [Apresentação do projeto](/pt/project/)).
