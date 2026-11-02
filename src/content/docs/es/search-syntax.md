---
title: Referencia de búsqueda y reglas
description: "Referencia de Sonic sobre búsqueda y reglas: consultas multifuente, tolerancia a errores, pestañas de categorías y acciones sobre los resultados."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Las descripciones funcionales se basan en la rama candidata pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea. La RC no es una versión oficial de GitHub Release.

Esta página reúne las capacidades y reglas de búsqueda de Sonic: qué se puede escribir, cómo se toleran los errores y cómo se organizan los resultados. La ubicación de la interfaz figura en la sección 2 de la [Guía de la interfaz y funciones](/es/interface/).

## 1. Ámbito de la búsqueda

La búsqueda cubre cuatro tipos de objeto: canciones, artistas, álbumes y listas de reproducción. La página de resultados se organiza en tres pestañas (sencillos, listas de reproducción y MV); el acceso a la búsqueda se encuentra en la parte superior de la barra lateral y en la página de búsqueda, donde la interfaz puede mostrar sugerencias de palabras clave populares del sitio.

## 2. Tolerancia a errores y reglas de coincidencia

| Regla | Descripción | Ejemplo |
| --- | --- | --- |
| Normalización de caracteres simplificados y tradicionales | Se pueden probar ambas grafías; la coincidencia real depende del índice y de la disponibilidad de las fuentes de origen | Comparar «周杰伦» y «周傑倫» |
| Búsqueda por pinyin y siglas | Se puede probar el pinyin completo o las abreviaturas por iniciales; no se garantizan resultados en todas las fuentes | Probar «zjl» para canciones relacionadas con Jay Chou (周杰伦／周傑倫) |
| Coincidencia simétrica de alias | El sitio puede vincular los alias chinos e ingleses de un artista; el resultado real depende del índice | Un nombre en inglés puede encontrar al artista con su alias chino |
| Tolerancia por distancia de edición | Una cadena cercana puede proponerse como candidata; no se corrigen todos los errores ortográficos | Introducir una cadena aproximada y comprobar el resultado real |
| Reconocimiento de versiones | Los resultados pueden distinguir versiones de estudio, en directo, interpretadas por otros artistas y otras | Consultar la indicación de versión del resultado |

## 3. Paralelismo multifuente y eliminación de duplicados

Las consultas se envían a las fuentes de origen habilitadas y disponibles en ese momento, y después los resultados se fusionan mediante reglas de normalización. Los registros multifuente de la misma pista con el mismo título pueden agruparse en un único resultado; la dirección de reproducción se obtiene en el momento de reproducir según la disponibilidad. La lista de fuentes de origen y sus conmutadores predeterminados figura en la sección 3 de [Terceros y transferencias](/es/sub-processors/).

## 4. Acciones sobre los resultados

Cada fila de canciones puede ofrecer reproducir, acceder al MV cuando exista, añadir a favoritos, descargar y otras acciones; «reproducir todo», en la parte superior, puede reproducir los resultados en orden. Los resultados de listas de reproducción abren la página de detalles de la lista y los resultados de MV abren la lista de MV; las acciones reales dependen del resultado y de la configuración de la instancia.

## 5. Búsqueda y privacidad

Tratamiento de los términos de búsqueda:

1. **Local**: la lista reciente usa localStorage, pero la consulta se envía para buscar y algunos elementos pueden acompañar a las solicitudes de recomendación; borrar localmente no elimina las copias remotas ya creadas;
2. **Agregación del servidor**: la búsqueda inteligente puede contar o conservar por separado los términos originales y hacer que aparezcan en sugerencias públicas; desactivar la personalización no excluye por sí solo esa vía. Un texto puede identificar a una persona sin un identificador de cuenta; no escriba datos personales o sensibles. Los filtros, umbrales de visualización, controles de conservación y configuración de la instancia deben comprobarse por separado;
3. **Personalización**: las búsquedas y los clics pueden vincularse mediante identificadores seudónimos. El ajuste de personalización no controla todas las vías de estadísticas de búsqueda; un ajuste o restablecimiento de 90 días no significa que cada agregado o copia de búsqueda se elimine con el mismo calendario.

Véanse la sección 4 de la [Política de privacidad](/es/privacy-policy/) y la [Descripción del algoritmo de recomendación](/es/recommendation/).
