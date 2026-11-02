---
title: Exportación y almacenamiento de datos
description: "Exportación y almacenamiento de datos de Sonic: ubicación de los datos, consulta del resumen del perfil, exportación y copia de seguridad, operaciones de borrado e instancias de autoalojamiento."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Esta página resume los datos presentes en Sonic, dónde se encuentran, qué resumen está disponible y qué opciones existen para copiarlos, borrarlos o presentar una solicitud manual. No constituye una herramienta de exportación completa. Las bases jurídicas y el marco de derechos figuran en las secciones 4, 6 y 9 de la [Política de privacidad](/es/privacy-policy/); las medidas técnicas, en [Tratamiento de datos y seguridad](/es/data-security/). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

## 1. Ubicación de los datos

| Datos | Ubicación | Identidad asociada | Conservación |
| --- | --- | --- | --- |
| Favoritos, listas y preferencias | Principalmente localStorage; el radar también tiene una vía remota | Pueden enviarse algunas respuestas y contexto de recomendación | Copia local hasta el borrado; tratamiento remoto separado |
| Historial de reproducción | localStorage y eventos de reproducción enviados por separado | Los eventos pueden usar un identificador seudónimo vinculable | El borrado local no elimina los eventos remotos |
| Descargas y música local | IndexedDB del navegador | No se ha encontrado subida del cuerpo de audio; pueden enviarse título, artista, álbum, identificador y portada incrustada | Localmente hasta el borrado o la recuperación de espacio por el navegador; tratamiento remoto separado |
| Eventos de comportamiento y respuestas sobre entidades | Si se activa el tratamiento, base de datos del servidor o servicio externo | Identificador seudónimo, no anónimo | RC: 90 días por defecto, mínimo 7; limpieza incompleta y no realizada al vencer cada registro, sin garantía de borrado automático completo |
| Agregados de búsqueda y perfiles de radar | Almacenamiento remoto de búsquedas; no se ha confirmado el almacenamiento persistente del radar en el motor | Las búsquedas originales pueden identificar a una persona y mostrarse públicamente | Sin plazo automático uniforme verificado; restablecimiento incompleto |
| Catálogo compartido de pistas e índices externos | Biblioteca de pistas del servidor y servicios opcionales de recomendación o búsqueda | Los eventos pueden incluir título, artista y portada incrustada; accesibles a la búsqueda del sitio | No se limpia por completo al restablecer el perfil; valorar según la posibilidad de vinculación |
| Historial de búsqueda local | localStorage; las consultas también se envían para buscar y pueden incorporarse a estadísticas o contexto | Puede enviarse contexto aunque el historial sea local | El borrado local no elimina las copias remotas |

`auth` de localStorage conserva, entre otros, el correo y el avatar. La limitación puede utilizar la IP sin transformar en KV o en un limitador nativo; el borde también transmite la dirección del cliente, la sesión y el contexto al motor. La ausencia de columna IP en una tabla de eventos no demuestra que no se trate la IP en otro lugar.

## 2. Consulta: resumen del perfil de recomendación

La última RC pública ofrece `GET /api/sonic/events` (o el bloque del perfil en ajustes) para consultar un resumen del perfil del servidor, solo si la función correspondiente está activada y la instancia ofrece esa página o API. La antigua `main@ce443c8` solo sirve de comparación y no demuestra que la RC esté desplegada; no se ha verificado la disponibilidad en línea. Aunque esté disponible, el resumen no es una exportación completa de datos personales ni una copia de todos los eventos originales; no puede prometerse la descarga íntegra de los eventos del servidor.

## 3. Exportación y copia de seguridad

1. **Datos del navegador**: los favoritos, las listas y las descargas permanecen en el navegador utilizado. Sonic no ofrece una exportación en la nube integrada en el producto ni una exportación general del localStorage o IndexedDB; las herramientas de copia propias del navegador o del dispositivo pueden variar y no están garantizadas. También puede anotar o reconstruir las listas importantes;
2. **Datos remotos**: también incluyen eventos, respuestas sobre entidades, búsquedas y vías de sincronización del radar; no se ha confirmado el almacenamiento persistente del radar en el motor. El resumen no es una exportación completa y el restablecimiento solo es un borrado parcial. Para solicitudes sobre una instancia alojada por el proyecto, utilice el canal de la sección 9 de la [Política de privacidad](/es/privacy-policy/), incluyendo identificadores antiguos cuando sea necesario; quienes usan instancias autoalojadas deben dirigirse a su propio operador;
3. **Resumen del perfil de recomendación**: solo puede consultarse si la función está activada y la instancia ofrece la página de ajustes o la API; no se ha verificado su disponibilidad en línea. No es una exportación completa ni demuestra que se hayan obtenido todos los datos personales;
4. **Música local**: los archivos de audio originales importados siguen en su dispositivo; no se ha encontrado una vía de subida del cuerpo de audio, pero los metadatos y las portadas incrustadas pueden transmitirse por separado. Borrar la copia del navegador no afecta a los archivos originales.

Por tanto, el resumen del perfil no sustituye a una exportación completa. Las solicitudes de acceso, rectificación, limitación, portabilidad u otras solicitudes manuales se tramitan por el canal indicado en la [Política de privacidad](/es/privacy-policy/), sin crear una función de exportación automática.

## 4. Operaciones de borrado

| Operación | Alcance | Efecto |
| --- | --- | --- |
| Restablecer el perfil de recomendación y el registro de no me gusta | Parte de los eventos y respuestas de la identidad actual | `DELETE /api/sonic/events`; puede omitir identificadores anónimos antiguos, radar, agregados, servicios externos y copias de seguridad; algunos fallos pueden ocultarse  |
| Borrar todos los datos locales | Limpieza local y restablecimiento remoto parcial; no elimina la cookie HttpOnly ni cierra sesión | El éxito mostrado no prueba supresión remota; recargar tras borrar los ajustes puede reactivar la personalización por defecto, compruebe su elección  |
| «Borrar los datos del sitio» en el navegador | Solo los almacenamientos de ese navegador | Según el navegador; no elimina copias remotas |
| Cerrar sesión | Cookie de sesión actual; revocación remota separada | Invalidar credenciales copiadas depende de la configuración y del éxito de la petición |

## 5. Instancias de autoalojamiento

Los usuarios de una instancia autoalojada deben dirigirse al operador efectivo de esa instancia mediante el canal de solicitudes de derechos que haya publicado; el correo propuesto en este documento para Sonic no es el canal del responsable de todas las instancias. Para solicitudes de derechos sobre una instancia alojada por el proyecto, véase la sección 9 de la [Política de privacidad](/es/privacy-policy/); el resumen y los controles de borrado existentes no constituyen una exportación completa.

El operador debe inventariar todos los almacenamientos y destinatarios reales, no solo el volumen SQLite. El ajuste de conservación no cubre por sí mismo el radar, las búsquedas, los registros y las copias de seguridad; deben fijarse plazos necesarios y un procedimiento de borrado verificado, aislar las copias hasta su limpieza programada y volver a aplicar las supresiones tras restaurarlas. Véanse la [Guía de despliegue](/es/deployment/) y [Código abierto y autoalojamiento](/es/open-source/).
