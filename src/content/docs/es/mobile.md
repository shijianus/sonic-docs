---
title: Guía móvil
description: "Guía móvil de Sonic: diseño para teléfonos, navegación por pestañas, panel del reproductor móvil y comportamientos propios de los dispositivos móviles."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página presenta el diseño y los principales aspectos de uso de Sonic en un navegador móvil. El móvil y el escritorio utilizan la misma instancia y el mismo sistema de cuenta, con las mismas funciones; el diseño cambia automáticamente según el ancho de la pantalla y no es necesario instalar ninguna aplicación.

## 1. Diseño y navegación

En el móvil, la navegación por pestañas inferiores sustituye a la barra lateral del escritorio: cuatro entradas, inicio, búsqueda, reproducidos recientemente y ajustes. La pista que se está reproduciendo permanece en la mini barra inferior, que al tocarla se abre como panel del reproductor móvil (PlayerDrawerMobile).

## 2. Panel del reproductor

El panel del reproductor móvil ofrece las mismas capacidades que el de escritorio: letras palabra por palabra (original, traducción y romanización), menú de calidad, modos de reproducción y descarga. Su fondo adopta un degradado basado en el color dominante de la portada y permite arrastrar la barra de progreso y saltar a una parte de la letra al tocarla.

## 3. Inicio y radar

La página de inicio móvil coincide con la de escritorio: carrusel de recomendaciones, recomendación inteligente y radar musical (que muestra coincidencias de preferencia tras una búsqueda), además de listas recomendadas. Los motivos de recomendación de las tarjetas y las etiquetas de señales de preferencia se muestran con la misma transparencia en el móvil, apiladas verticalmente.

## 4. Límites del almacenamiento y la sincronización

El almacenamiento local del navegador móvil es independiente del almacenamiento del navegador de escritorio: los favoritos, las descargas y la música local permanecen en el navegador de cada dispositivo y no se sincronizan entre dispositivos. Sonic no ofrece sincronización en la nube de favoritos, listas ni preferencias. El estado de inicio de sesión también se mantiene por separado en cada sesión del navegador. Para migrar, reconstruya sus favoritos en ambos dispositivos o utilice, si existe, una función de sincronización propia del navegador o del dispositivo, fuera del servicio Sonic; Sonic no ofrece una exportación general del localStorage o IndexedDB.

## 5. Consejos de uso

1. Añadir el sitio a la pantalla de inicio ofrece una experiencia de lanzamiento similar a la de una aplicación nativa;
2. La reproducción en segundo plano depende de las políticas multimedia del navegador móvil: el sistema puede pausarla al cambiar de aplicación y reanudarla al volver a la página;
3. El modo de ahorro de energía y el ahorro de datos pueden limitar el audio en segundo plano; es un comportamiento del navegador, no una limitación del servicio;
4. En el modo privado o de incógnito, el almacenamiento local no es persistente: los favoritos y las descargas se pierden al cerrar la página; use el modo normal si necesita conservarlos.
