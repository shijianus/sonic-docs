---
title: Gestão da biblioteca musical
description: "Gestão da biblioteca musical do Sonic: favoritos, guardados, reproduções recentes, lista de descargas e localização e gestão da música local."
---

**Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5**

Esta página explica como gerir os quatro conteúdos de «A minha música» e onde são guardados. Todos os dados ficam apenas no seu navegador, sem envio para o servidor; as operações de limpeza e eliminação constam de [Gestão e armazenamento de dados](/pt/data-management/).

## 1. Favoritos e guardados

«Favoritas» reúne os conteúdos que marcou: faixas favoritas, playlists guardadas, álbuns guardados, artistas seguidos e MV guardados. O acesso encontra-se no botão em forma de coração da linha da faixa, da página do álbum e da página do artista. Os dados ficam no localStorage do navegador (chave `library`), com efeito imediato e sem necessidade de início de sessão.

## 2. Reproduções recentes

O histórico de reprodução é registado automaticamente no localStorage do navegador (chave `audio`) e a página «Reproduções recentes» apresenta-o por ordem cronológica inversa; clique para reproduzir novamente. O histórico permanece apenas no dispositivo atual e não é sincronizado com o servidor.

## 3. Lista de descargas

Clique em descarregar na linha da faixa ou na barra de reprodução inferior para gravar a música, com os metadados de qualidade, no IndexedDB do navegador (`downloaded_music`); a página «Descargas» permite gerir os conteúdos descarregados e reproduzi-los offline. As descargas ocupam a quota de armazenamento do navegador. Quando a quota se esgota, o navegador recusa novas descargas: elimine primeiro descargas antigas ou limpe o armazenamento do navegador.

## 4. Música local

A página «Música local» permite adicionar por clique ou arrastar e largar ficheiros de áudio no navegador (`local_music`); os ficheiros importados aparecem e reproduzem-se juntamente com a biblioteca online. A importação ocorre inteiramente no navegador e os ficheiros não são enviados. Os formatos suportados dependem da capacidade de descodificação do navegador; eliminar uma faixa remove apenas a cópia no navegador e não afeta o ficheiro original.

## 5. Resumo dos locais de armazenamento

| Conteúdo | Local de armazenamento | Perde-se ao limpar os dados do navegador |
| --- | --- | --- |
| Favoritos e guardados | localStorage (`library`) | Sim |
| Reproduções recentes | localStorage (`audio`) | Sim |
| Músicas descarregadas | IndexedDB (`downloaded_music`) | Sim |
| Cópias de música local | IndexedDB (`local_music`) | Sim |

Faça uma cópia de segurança das playlists importantes e dos conteúdos descarregados: «Limpar todos os dados» do navegador ou «Limpar todos os dados locais» do site elimina os conteúdos acima (ver [Gestão e armazenamento de dados](/pt/data-management/)). Os ficheiros originais da música local continuam no seu dispositivo.
