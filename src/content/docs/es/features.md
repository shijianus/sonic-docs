---
title: Guía de funciones
description: "Guía de funciones de Sonic: niveles de calidad y transparencia de las vistas previas, letras palabra por palabra, recomendación y Auto DJ, descargas y música local, listas de éxitos, MV y tolerancia de la búsqueda."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Esta página explica en profundidad cómo se comportan las funciones de Sonic y las decisiones de diseño que conllevan. La ubicación en la interfaz consta en la [Guía de la interfaz y funciones](/es/interface/); la explicación técnica de las señales de comportamiento y del modelo de recomendación, en la sección 5 de la [Presentación del proyecto](/es/project/); las condiciones contractuales del uso de las funciones, en los [Términos del servicio](/es/terms-of-service/). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

## 1. Niveles de calidad y transparencia de las vistas previas

Sonic distingue estrictamente las pistas completas de los fragmentos de vista previa:

1. Niveles de calidad: los niveles disponibles de la fuente (SQ sin pérdida, HQ alta calidad, estándar, entre otros) dependen del enlace directo emitido realmente por el origen; el menú de calidad solo enumera las opciones realmente disponibles y la insignia etiqueta fielmente el flujo actual;
2. Detección de vistas previas: el sondeo de la duración y los metadatos de la entidad de audio identifica el recorte oficial de vista previa de 30 segundos, cuyo resultado se presenta con el indicador de vista previa; una vista previa nunca se presenta como pista completa;
3. Completado entre fuentes: activado, empareja automáticamente las pistas en vista previa con las pistas completas gratuitas de QQ, Kugou y Kuwo; si el emparejamiento tiene éxito, la conmutación es fluida y se indica la fuente sustituta; si no, se conserva la vista previa y, al terminar, se pasa con naturalidad a la pista siguiente;
4. Límites: poder reproducir técnicamente un recurso no prueba autorización de uso; las credenciales de suscripción de un desplegador no conceden automáticamente derecho a compartir su catálogo. No eluda protecciones de pago ni de acceso.

## 2. Cadena de letras palabra por palabra

Las letras se obtienen según una prioridad de tres niveles:

| Prioridad | Fuente | Formato |
| --- | --- | --- |
| 1 | Análisis nativo local (NetEase, QQ, Kugou) | Línea de tiempo por carácter YRC/QRC/KRC |
| 2 | AMLL | Formato palabra por palabra TTML |
| 3 | LRCLIB | Letras sincronizadas por línea |

El panel de letras admite tres conmutadores independientes para el original, la traducción y la romanización; al pulsar una línea de letra se salta a la posición de reproducción; la animación por carácter se sincroniza con el progreso de la reproducción. Los datos de las letras pasan asimismo por la caché de borde y, sin letras nativas locales, se degradan automáticamente a la biblioteca global de letras.

## 3. Recomendación y Auto DJ

1. Puede que te guste: recomendación personalizada que fusiona la tasa de finalización, los favoritos, la intención de búsqueda por sesión y la reordenación de diversidad MMR; las tarjetas muestran el motivo de la recomendación (como «escuchas a menudo a este artista») y el móvil muestra además las etiquetas de señales de preferencia;
2. Lista de tendencias del sitio: lista de tendencias de 24 horas y lista acumulada de 7 días, basadas en las señales reales de reproducción de todo el sitio;
3. Radar de exploración de estilos: exploración por género, con un parámetro de temperatura para ajustar la amplitud de la exploración;
4. Auto DJ: al terminar de forma natural la lista de reproducción, continúa automáticamente con pistas reproducibles según el estilo de la pista actual; puede desactivarse en los ajustes;
5. Depuración de señales: los saltos de las 6 clases no imputables al usuario, como cortes, fallos de decodificación y recortes de vista previa, no entran en el conjunto de datos de la recomendación;
6. Datos: la personalización y Auto DJ están activados por defecto en el código sin prueba de consentimiento afirmativo. Los identificadores son seudónimos; los 90 días de ciertos eventos no cubren todo el radar, búsquedas o agregados. El borrado puede omitir identificadores anónimos antiguos, servicios externos y copias de seguridad, con fallos ocultos. Falta la ruta remota del radar en la versión comprobada; no se confirma una sincronización general (véase la [Política de privacidad](/es/privacy-policy/)).

## 4. Descargas y música local

1. Descarga: las pistas se guardan, junto con sus metadatos de calidad, en el IndexedDB del navegador (`downloaded_music`), se gestionan en la página de lista de descargas y pueden reproducirse sin conexión;
2. Música local: los archivos de audio locales se importan al navegador arrastrándolos o seleccionándolos (`local_music`) y se presentan de forma unificada con el catálogo en línea;
3. Límites: no se ha encontrado una vía de subida del cuerpo de audio local. La búsqueda de letras, las señales de favoritos y el contexto de recomendación pueden transmitir título, artista, álbum o identificador; las portadas incrustadas también pueden enviarse con eventos y entrar en el catálogo remoto compartido de pistas. El almacenamiento local no es una copia de seguridad general en la nube; importar y descargar no concede derechos adicionales sobre el contenido.

## 5. Listas de éxitos y listas oficiales

La página de listas de éxitos ofrece novedades y listas oficiales, cada una dividida en cinco categorías: todas, chino, occidental, japonés y coreano; las listas admiten la reproducción continua con un clic. La lista de tendencias de la página de inicio y la página de listas comparten el mismo modelo de popularidad (ponderación de cinco factores + decaimiento temporal + suavizado bayesiano); el detalle consta en la sección 5 de la [Presentación del proyecto](/es/project/).

## 6. Reproducción de MV

Los resultados de búsqueda y páginas de canciones abren el reproductor de MV según la disponibilidad del origen. Las conexiones directas a MV, imágenes, avatares o fuentes pueden revelar la IP, aunque el audio pase por un proxy. Las escrituras actuales de comentarios, respuestas y «Me gusta» son simulaciones locales; los comentarios leídos del origen pueden contener datos personales y almacenarse en caché en la instancia. «Publicar» no prueba un envío al origen.

## 7. Tolerancia de la búsqueda

La búsqueda combina normalización simplificado-tradicional, pinyin, alias, tolerancia ortográfica y reconocimiento de versiones, y fusiona los resultados multifuente. Sin embargo, los términos originales pueden registrarse por separado y aparecer en sugerencias públicas; desactivar la personalización o usar incógnito no bloquea esta vía. No escriba datos personales ni sensibles.

## 8. Modo degradado

La capa de borde prevé un modo degradado ante fallos del motor, con búsqueda y letras por vías de respaldo. No se garantizan su disponibilidad, la reproducción de pistas ya cargadas ni el plazo de recuperación; la resolución de audio y las recomendaciones pueden seguir indisponibles. Este proyecto personal gratuito no ofrece SLA. Véase [Tratamiento de datos y seguridad](/es/data-security/).
