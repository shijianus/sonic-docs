---
title: Gestión de la biblioteca musical
description: "Gestión de la biblioteca musical de Sonic: favoritos y colecciones, reproducciones recientes, lista de descargas y música local, con sus lugares de almacenamiento y gestión."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página explica cómo se gestionan las cuatro secciones de «Mi música» y dónde se almacenan. Estos datos permanecen únicamente en su navegador y nunca se suben al servidor; las operaciones de borrado y eliminación se describen en [Exportación y almacenamiento de datos](/es/data-management/).

## 1. Favoritos y colecciones

«Me gusta» reúne todo lo que ha marcado: canciones favoritas, listas guardadas, álbumes guardados, artistas seguidos y MV guardados. Los puntos de acceso son los botones con forma de corazón de las filas de canciones y de las páginas de álbumes y artistas. Los datos residen en el localStorage del navegador (clave `library`), se aplican de inmediato y no requieren iniciar sesión.

## 2. Reproducciones recientes

El historial de reproducción se registra automáticamente en el localStorage del navegador (clave `audio`); la página «Reproducidos recientemente» lo muestra en orden cronológico inverso y al pulsar una entrada se vuelve a reproducir. El historial permanece solo en su dispositivo y nunca se sincroniza con el servidor.

## 3. Lista de descargas

Pulse descargar en una fila de canciones o en la barra de reproducción inferior para escribir la canción, junto con sus metadatos de calidad, en el IndexedDB del navegador (`downloaded_music`); la página «Lista de descargas» gestiona lo descargado y también permite reproducirlo sin conexión. Las descargas consumen la cuota de almacenamiento del navegador; cuando no queda cuota suficiente, el navegador rechaza nuevas descargas: elimine antes descargas antiguas o libere espacio.

## 4. Música local

La página «Música local» permite importar archivos de audio al navegador mediante el botón de añadir o arrastrándolos (`local_music`); los archivos importados se muestran y reproducen junto con el catálogo en línea. La importación se realiza por completo dentro del navegador y los archivos nunca se suben. Los formatos compatibles dependen de la capacidad de decodificación del navegador; eliminar una pista solo borra la copia del navegador y no afecta a los archivos originales.

## 5. Lugares de almacenamiento en resumen

| Contenido | Lugar de almacenamiento | Se pierde al borrar los datos del navegador |
| --- | --- | --- |
| Favoritos y colecciones | localStorage (`library`) | Sí |
| Reproducciones recientes | localStorage (`audio`) | Sí |
| Canciones descargadas | IndexedDB (`downloaded_music`) | Sí |
| Copias de música local | IndexedDB (`local_music`) | Sí |

Haga copias de seguridad de las listas y descargas importantes: tanto la opción «Borrar todos los datos» del navegador como «Borrar todos los datos locales» del sitio eliminan todo lo anterior (véase [Exportación y almacenamiento de datos](/es/data-management/)). Los archivos originales de la música local permanecen en su dispositivo.
