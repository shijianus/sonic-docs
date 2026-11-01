---
title: Guía de funciones
description: "Guía de funciones de Sonic: niveles de calidad y transparencia de las vistas previas, letras palabra por palabra, recomendación y Auto DJ, descargas y música local, listas de éxitos, MV y tolerancia de la búsqueda."
---

**Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.4**

Esta página explica en profundidad cómo se comportan las funciones de Sonic y las decisiones de diseño que conllevan. La ubicación en la interfaz consta en la [Guía de la interfaz y funciones](/es/interface/); la explicación técnica de las señales de comportamiento y del modelo de recomendación, en la sección 5 de la [Presentación del proyecto](/es/project/); las condiciones contractuales del uso de las funciones, en los [Términos del servicio](/es/terms-of-service/).

## 1. Niveles de calidad y transparencia de las vistas previas

Sonic distingue estrictamente las pistas completas de los fragmentos de vista previa:

1. Niveles de calidad: los niveles disponibles de la fuente (SQ sin pérdida, HQ alta calidad, estándar, entre otros) dependen del enlace directo emitido realmente por el origen; el menú de calidad solo enumera las opciones realmente disponibles y la insignia etiqueta fielmente el flujo actual;
2. Detección de vistas previas: el sondeo de la duración y los metadatos de la entidad de audio identifica el recorte oficial de vista previa de 30 segundos, cuyo resultado se presenta con el indicador de vista previa; una vista previa nunca se presenta como pista completa;
3. Completado entre fuentes: activado, empareja automáticamente las pistas en vista previa con las pistas completas gratuitas de QQ, Kugou y Kuwo; si el emparejamiento tiene éxito, la conmutación es fluida y se indica la fuente sustituta; si no, se conserva la vista previa y, al terminar, se pasa con naturalidad a la pista siguiente;
4. Límites estrictos: el servicio no integra ningún componente de elusión de las protecciones de pago de los derechos; el catálogo de las suscripciones legítimas lo monta el desplegador con sus propias credenciales.

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
6. Control de los datos: todos los eventos de comportamiento se asocian a identificadores seudonimizados, se destruyen automáticamente a los 90 días y pueden borrarse con un clic (véase la sección 9 de la [Política de privacidad](/es/privacy-policy/)).

## 4. Descargas y música local

1. Descarga: las pistas se guardan, junto con sus metadatos de calidad, en el IndexedDB del navegador (`downloaded_music`), se gestionan en la página de lista de descargas y pueden reproducirse sin conexión;
2. Música local: los archivos de audio locales se importan al navegador arrastrándolos o seleccionándolos (`local_music`) y se presentan de forma unificada con el catálogo en línea;
3. Límites: ambos se guardan únicamente en su navegador, no se suben al servidor, son solo para su escucha personal y no pueden redistribuirse.

## 5. Listas de éxitos y listas oficiales

La página de listas de éxitos ofrece novedades y listas oficiales, cada una dividida en cinco categorías: todas, chino, occidental, japonés y coreano; las listas admiten la reproducción continua con un clic. La lista de tendencias de la página de inicio y la página de listas comparten el mismo modelo de popularidad (ponderación de cinco factores + decaimiento temporal + suavizado bayesiano); el detalle consta en la sección 5 de la [Presentación del proyecto](/es/project/).

## 6. Reproducción de MV

Los resultados de búsqueda y las páginas de las canciones dan acceso directo al reproductor de MV; los MV provienen de las interfaces oficiales de origen, su disponibilidad varía con el origen y, si no están disponibles, la interfaz lo indica fielmente.

## 7. Tolerancia de la búsqueda

La cadena de búsqueda incorpora una tolerancia multinivel: normalización de los caracteres simplificados y tradicionales, búsqueda por pinyin y siglas, simetría de alias de artistas en chino e inglés, tolerancia ortográfica por distancia de edición y reconocimiento de versiones; tras la búsqueda en paralelo de todas las fuentes, se fusiona con desduplicación por expresiones regulares. Un error tipográfico en la palabra clave suele seguir encontrando el objetivo.

## 8. Modo degradado

Cuando el nodo del plano de datos queda fuera de línea o excede el tiempo de espera, la capa de borde conmuta automáticamente al modo degradado: la búsqueda y las letras pasan por conexión directa del borde a las interfaces públicas, la interfaz muestra el aviso de «modo degradado de borde» y las pistas ya cargadas no se ven afectadas. Durante la degradación, el análisis completo de fuentes y la actualización de las recomendaciones pueden no estar disponibles; al recuperarse, el disyuntor se cierra automáticamente (la descripción del mecanismo de contingencia consta en la sección 3.1 de [Tratamiento de datos y seguridad](/es/data-security/)).
