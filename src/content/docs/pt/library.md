---
title: Gestão da biblioteca musical
description: "Gestão da biblioteca musical do Sonic: favoritos, guardados, reproduções recentes, lista de descargas e localização e gestão da música local."
---

**Data de revisão: 3 de novembro de 2026｜Versão: 1.9**

Esta página explica os quatro conteúdos de «A minha música» e o seu armazenamento principalmente local. Não foi encontrado um caminho de envio do corpo do áudio local, mas metadados, capas incorporadas, feedback e contexto de recomendação podem ser enviados; as capas podem entrar no catálogo remoto partilhado de faixas. O armazenamento local não prova ausência de tratamento remoto nem constitui cópia de segurança geral na nuvem. Os limites de limpeza e eliminação constam de [Gestão e armazenamento de dados](/pt/data-management/).

As descrições funcionais desta página baseiam-se no ramo candidato público `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), revisto em 2026-11-02. A versão antiga `main@ce443c8` (2026-10-27 UTC) é distinta e não se presumem nela as funções do candidato. O RC não é uma GitHub Release oficial; a versão em produção continua por verificar.

![Localizações de dados do Sonic: favoritos e histórico do navegador, transferências e música local no IndexedDB, e tratamento remoto](/images/sonic/library-storage.svg)

*Figura: três localizações guardam dados diferentes; limpar o navegador não elimina totalmente os registos remotos.*

## 1. Favoritos e guardados

«Favoritas» reúne os conteúdos que marcou: faixas favoritas, playlists guardadas, álbuns guardados, artistas seguidos e MV guardados. O acesso encontra-se no botão em forma de coração da linha da faixa, da página do álbum e da página do artista. Os dados ficam no localStorage do navegador (chave `library`), com efeito imediato e sem necessidade de início de sessão.

## 2. Reproduções recentes

«Reproduções recentes» lê do localStorage (`audio`) as últimas 100 músicas, no máximo, guardadas automaticamente e apresentadas por ordem cronológica inversa. Não foi encontrado um interruptor separado para desativar este histórico local. Eventos de reprodução e contexto dos artistas recentes podem ser enviados separadamente para recomendação; a lista local não significa ausência de registos no servidor. A personalização ativa por predefinição não é consentimento; o modo privado não impede o envio de eventos.

## 3. Lista de descargas

Clique em descarregar na linha da faixa ou na barra de reprodução inferior para gravar a música, com os metadados de qualidade, no IndexedDB do navegador (`downloaded_music`); a página «Descargas» permite gerir os conteúdos descarregados e reproduzi-los offline. As descargas ocupam a quota de armazenamento do navegador. Quando a quota se esgota, o navegador recusa novas descargas: elimine primeiro descargas antigas ou limpe o armazenamento do navegador.

## 4. Música local

A página «Música local» permite adicionar por clique ou arrastar e largar ficheiros de áudio no navegador (`local_music`); os ficheiros importados aparecem e reproduzem-se juntamente com a biblioteca online. Não foi encontrado um caminho de envio do corpo do áudio local, mas a procura de letras, o feedback de favoritos e as recomendações podem enviar título, artista, álbum, duração ou identificadores, e a capa incorporada pode ser enviada com um evento e entrar no catálogo remoto partilhado de faixas. Os formatos suportados dependem da capacidade de descodificação do navegador; eliminar uma faixa remove apenas a cópia no navegador, não afeta o ficheiro original nem garante eliminação remota.

## 5. Resumo dos locais de armazenamento

| Conteúdo | Local de armazenamento | Perde-se ao limpar os dados do navegador |
| --- | --- | --- |
| Favoritos e guardados | localStorage (`library`) | Sim |
| Reproduções recentes | localStorage (`audio`) | Sim |
| Músicas descarregadas | IndexedDB (`downloaded_music`) | Sim |
| Cópias de música local | IndexedDB (`local_music`) | Sim |

Faça uma cópia de segurança das playlists importantes e dos conteúdos descarregados: «Limpar todos os dados» do navegador ou «Limpar todos os dados locais» do site elimina os conteúdos acima (ver [Gestão e armazenamento de dados](/pt/data-management/)). Os ficheiros originais continuam no dispositivo. Limpar o navegador não garante eliminação remota e as funções do site podem ignorar falhas parciais. A sincronização normal do navegador não transfere necessariamente localStorage e IndexedDB.
