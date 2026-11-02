---
title: Guia para dispositivos móveis
description: "Guia para dispositivos móveis do Sonic: disposição no telemóvel, navegação por separadores, gaveta do leitor móvel e comportamentos específicos do uso móvel."
---

**Data de revisão: 2 de novembro de 2026｜Versão: 1.8**

Esta página explica a disposição e os pontos essenciais de utilização do Sonic no navegador do telemóvel. A versão móvel e a versão de secretária utilizam a mesma instância e o mesmo sistema de conta, com funções equivalentes; a disposição muda automaticamente com a largura do ecrã e não é necessário instalar uma aplicação.

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

## 1. Disposição e navegação

No telemóvel, a navegação por separadores no rodapé substitui a barra lateral de secretária: Página inicial, Pesquisa, Reproduções recentes e Definições. A faixa em reprodução permanece na barra de leitura mini no rodapé; toque nela para abrir a gaveta do leitor móvel (PlayerDrawerMobile).

## 2. Gaveta do leitor

A gaveta do leitor móvel oferece as mesmas capacidades que a versão de secretária: letras palavra a palavra (original/tradução/romanização), menu de qualidade, modo de reprodução e descarga. O fundo da gaveta usa um gradiente baseado na cor dominante da capa e permite arrastar o progresso e saltar para uma linha da letra.

## 3. Página inicial e radar

A página inicial móvel corresponde à de secretária: carrossel de recomendações, recomendação inteligente e radar musical (mostra correspondências de preferências depois de uma pesquisa), além de playlists recomendadas. Os motivos da recomendação e as etiquetas dos sinais de preferência apresentam-se com a mesma transparência no telemóvel, numa disposição empilhada verticalmente.

## 4. Limites de armazenamento e sincronização

Os armazenamentos do navegador móvel e do navegador de secretária são independentes; não se garante sincronização geral na nuvem, cópia de segurança ou exportação de localStorage/IndexedDB. Não foi encontrado um caminho de envio do corpo do áudio local, mas capas incorporadas, metadados, feedback e contexto de recomendação podem ser enviados; o radar também tem um caminho de sincronização remota com disponibilidade limitada. O estado da conta depende de cada navegador; a migração de dispositivo não garante recuperar todos os dados do Sonic. Consulte a [Política de Privacidade](/pt/privacy-policy/).

## 5. Sugestões de utilização

1. Adicionar o site ao ecrã inicial proporciona uma experiência de arranque próxima da de uma aplicação;
2. A reprodução em segundo plano depende das políticas de multimédia do navegador móvel: ao mudar de aplicação, o sistema pode interromper a reprodução; volte à página para continuar;
3. O modo de poupança de bateria e o economizador de dados podem limitar o áudio em segundo plano; trata-se de um comportamento do navegador, não de uma limitação do serviço;
4. No modo privado, favoritos e descargas podem perder-se ao terminar a sessão privada, conforme o navegador. O modo privado não impede pedidos ou eventos. Personalização e Auto DJ estão ativos por predefinição, sem que isso prove consentimento; desativá-los não termina todos os caminhos de dados.
