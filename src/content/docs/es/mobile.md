---
title: Guía móvil
description: "Guía móvil de Sonic: diseño para teléfonos, navegación por pestañas, panel del reproductor móvil y comportamientos propios de los dispositivos móviles."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Esta página presenta el diseño y los principales aspectos de uso de Sonic en un navegador móvil. El móvil y el escritorio utilizan la misma instancia y el mismo sistema de cuenta, con las mismas funciones; el diseño cambia automáticamente según el ancho de la pantalla y no es necesario instalar ninguna aplicación. Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

## 1. Diseño y navegación

En el móvil, la navegación por pestañas inferiores sustituye a la barra lateral del escritorio: cuatro entradas, inicio, búsqueda, reproducidos recientemente y ajustes. La pista que se está reproduciendo permanece en la mini barra inferior, que al tocarla se abre como panel del reproductor móvil (PlayerDrawerMobile).

## 2. Panel del reproductor

El panel del reproductor móvil ofrece las mismas capacidades que el de escritorio: letras palabra por palabra (original, traducción y romanización), menú de calidad, modos de reproducción y descarga. Su fondo adopta un degradado basado en el color dominante de la portada y permite arrastrar la barra de progreso y saltar a una parte de la letra al tocarla.

## 3. Inicio y radar

La página de inicio móvil coincide con la de escritorio: carrusel de recomendaciones, recomendación inteligente y radar musical (que muestra coincidencias de preferencia tras una búsqueda), además de listas recomendadas. Los motivos de recomendación de las tarjetas y las etiquetas de señales de preferencia se muestran con la misma transparencia en el móvil, apiladas verticalmente.

## 4. Límites del almacenamiento y la sincronización

Los almacenamientos del navegador móvil y del escritorio son independientes; no se garantiza sincronización general en la nube, copia de seguridad ni exportación de localStorage/IndexedDB. No se ha encontrado una vía de subida del cuerpo de audio local, pero pueden transmitirse portadas incrustadas, metadatos, señales y contexto de recomendación; el radar también tiene una vía de sincronización remota cuya disponibilidad es limitada. El estado de la cuenta depende de cada navegador; migrar de dispositivo no garantiza recuperar todos los datos de Sonic. Véase la [Política de privacidad](/es/privacy-policy/).

## 5. Consejos de uso

1. Añadir el sitio a la pantalla de inicio ofrece una experiencia de lanzamiento similar a la de una aplicación nativa;
2. La reproducción en segundo plano depende de las políticas multimedia del navegador móvil: el sistema puede pausarla al cambiar de aplicación y reanudarla al volver a la página;
3. El modo de ahorro de energía y el ahorro de datos pueden limitar el audio en segundo plano; es un comportamiento del navegador, no una limitación del servicio;
4. Incógnito puede eliminar datos locales al terminar la sesión, pero no bloquea peticiones ni eventos. La personalización y Auto DJ están activados por defecto en el código sin consentimiento demostrado; tras limpiar los ajustes, compruebe de nuevo su elección. La limpieza de la aplicación no elimina la cookie HttpOnly ni equivale a cerrar sesión.
