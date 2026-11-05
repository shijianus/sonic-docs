---
title: Gestión de la biblioteca musical
description: "Gestión de la biblioteca musical de Sonic: favoritos y colecciones, reproducciones recientes, lista de descargas y música local, con sus lugares de almacenamiento y gestión."
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página describe las cuatro secciones de «Mi música» y su almacenamiento principalmente local. No se ha encontrado una vía de subida del cuerpo de audio local, pero pueden transmitirse metadatos, portadas incrustadas, respuestas y contexto de recomendación; las portadas pueden entrar en el catálogo remoto compartido de pistas. El almacenamiento local no demuestra que no haya tratamientos remotos ni constituye una copia de seguridad general en la nube. Los límites de borrado figuran en [Exportación y almacenamiento de datos](/es/data-management/). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

![Ubicaciones de datos de Sonic: favoritos e historial del navegador, descargas y música local en IndexedDB, y tratamiento remoto](/images/sonic/library-storage.svg)

*Figura: tres ubicaciones guardan datos distintos; borrar el navegador no elimina por completo los registros remotos.*

## 1. Favoritos y colecciones

«Me gusta» reúne todo lo que ha marcado: canciones favoritas, listas guardadas, álbumes guardados, artistas seguidos y MV guardados. Los puntos de acceso son los botones con forma de corazón de las filas de canciones y de las páginas de álbumes y artistas. Los datos residen en el localStorage del navegador (clave `library`), se aplican de inmediato y no requieren iniciar sesión.

## 2. Reproducciones recientes

«Reproducciones recientes» lee de localStorage (`audio`) las últimas 100 canciones como máximo, guardadas automáticamente y ordenadas de la más reciente a la más antigua. No se ha encontrado un interruptor separado para desactivar este historial local. Los eventos de reproducción y el contexto de artistas recientes pueden enviarse por separado para recomendaciones; el historial local no significa que el servidor no conserve registros. La personalización activada por defecto no es consentimiento; el modo de incógnito no bloquea el envío de eventos.

## 3. Lista de descargas

Pulse descargar en una fila de canciones o en la barra de reproducción inferior para escribir la canción, junto con sus metadatos de calidad, en el IndexedDB del navegador (`downloaded_music`); la página «Lista de descargas» gestiona lo descargado y también permite reproducirlo sin conexión. Las descargas consumen la cuota de almacenamiento del navegador; cuando no queda cuota suficiente, el navegador rechaza nuevas descargas: elimine antes descargas antiguas o libere espacio.

## 4. Música local

La página «Música local» permite importar archivos de audio al navegador mediante el botón de añadir o arrastrándolos (`local_music`); los archivos importados se muestran y reproducen junto con el catálogo en línea. No se ha encontrado una vía de subida del cuerpo de audio local, pero las letras, favoritos y recomendaciones pueden transmitir título, artista, álbum, duración o identificador, y la portada incrustada puede enviarse con un evento y entrar en el catálogo remoto compartido de pistas. Los formatos compatibles dependen de la capacidad de decodificación del navegador; eliminar una pista solo borra la copia del navegador, no afecta a los archivos originales ni garantiza el borrado remoto.

## 5. Lugares de almacenamiento en resumen

| Contenido | Lugar de almacenamiento | Se pierde al borrar los datos del navegador |
| --- | --- | --- |
| Favoritos y colecciones | localStorage (`library`) | Sí |
| Reproducciones recientes | localStorage (`audio`) | Sí |
| Canciones descargadas | IndexedDB (`downloaded_music`) | Sí |
| Copias de música local | IndexedDB (`local_music`) | Sí |

Haga copias de seguridad de las listas y descargas importantes: tanto la opción «Borrar todos los datos» del navegador como «Borrar todos los datos locales» del sitio eliminan todo lo anterior (véase [Exportación y almacenamiento de datos](/es/data-management/)). Los archivos originales de la música local permanecen en su dispositivo.
