---
title: Referencia de búsqueda y reglas
description: "Referencia de Sonic sobre búsqueda y reglas: consultas multifuente, tolerancia a errores, pestañas de categorías y acciones sobre los resultados."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página reúne las capacidades y reglas de búsqueda de Sonic: qué se puede escribir, cómo se toleran los errores y cómo se organizan los resultados. La ubicación de la interfaz figura en la sección 2 de la [Guía de la interfaz y funciones](/es/interface/).

## 1. Ámbito de la búsqueda

La búsqueda cubre cuatro tipos de objeto: canciones, artistas, álbumes y listas de reproducción. La página de resultados se organiza en tres pestañas (sencillos, listas de reproducción y MV); el acceso a la búsqueda se encuentra en la parte superior de la barra lateral y en la página de búsqueda, con sugerencias de palabras clave populares del sitio.

## 2. Tolerancia a errores y reglas de coincidencia

| Regla | Descripción | Ejemplo |
| --- | --- | --- |
| Normalización de caracteres simplificados y tradicionales | Las entradas en caracteres simplificados y tradicionales producen coincidencias equivalentes | Buscar «周杰伦» y «周杰倫» devuelve los mismos resultados |
| Búsqueda por pinyin y siglas | Se aceptan el pinyin completo y las abreviaturas por iniciales | Escribir «zyy» encuentra canciones relacionadas con Jay Chou (周杰伦) |
| Coincidencia simétrica de alias | Los alias chinos e ingleses de un artista se vinculan en ambos sentidos | Un nombre en inglés puede encontrar al artista con su alias chino |
| Tolerancia por distancia de edición | Los errores ortográficos se corrigen mediante distancia de edición | Una cadena aproximada aún puede encontrar el objetivo |
| Reconocimiento de versiones | Se distinguen las versiones de estudio, las versiones en directo, las versiones interpretadas por otros artistas y otras versiones | Los resultados indican la versión correspondiente |

## 3. Paralelismo multifuente y eliminación de duplicados

Las consultas de búsqueda se envían en paralelo a las fuentes de origen habilitadas y los resultados se fusionan mediante desduplicación por expresiones regulares: los registros multifuente de la misma pista con el mismo título se agrupan en un único resultado, y la dirección de reproducción se elige según su disponibilidad en el momento de la reproducción. La lista de fuentes de origen y sus conmutadores predeterminados figura en la sección 3 de [Terceros y transferencias](/es/sub-processors/).

## 4. Acciones sobre los resultados

Cada fila de canciones ofrece reproducir, acceder al MV cuando exista, añadir a favoritos, descargar y otras acciones; «reproducir todo», en la parte superior, reproduce los resultados en orden. Los resultados de listas de reproducción abren la página de detalles de la lista; los resultados de MV abren la lista de MV.

## 5. Búsqueda y privacidad

Tratamiento de los términos de búsqueda:

1. Local: los términos recientes (10 como máximo) permanecen únicamente en el localStorage del navegador y se borran junto con «Borrar todos los datos locales»;
2. Agregación en el servidor: los términos se incorporan a las estadísticas globales agregadas, sin identificadores personales, utilizadas para la lista de búsquedas populares;
3. Personalización: con la personalización activada, los clics en los resultados se registran como señales de recomendación (seudonimizados, durante 90 días); con ella desactivada, no se registra ningún evento.

Véanse la sección 4 de la [Política de privacidad](/es/privacy-policy/) y la [Descripción del algoritmo de recomendación](/es/recommendation/).
