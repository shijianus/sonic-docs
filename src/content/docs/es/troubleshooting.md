---
title: Solución de problemas
description: "Solución de problemas de Sonic: problemas habituales y medidas para la reproducción, las fuentes, el inicio de sesión, el modo degradado, el almacenamiento y la limitación de peticiones."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Las descripciones funcionales se basan en la rama candidata pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea. La RC no es una versión oficial de GitHub Release.

Esta página explica cómo reconocer y resolver los problemas habituales. Si nada de lo indicado resuelve el suyo, escriba a `admin@epocanvas.com` o abra una Issue en el repositorio de GitHub; al informar, use únicamente términos de reproducción no sensibles. El texto de búsqueda público puede contener información personal o sensible.

## 1. Problemas de reproducción

| Síntoma | Causa | Qué hacer |
| --- | --- | --- |
| La canción marcada como «vista previa» se detiene a los 30 segundos | Recorte oficial de la vista previa, no una avería | Si la interfaz ofrece completado entre fuentes, pruebe a buscar otra versión completa; o reproduzca la versión de otra fuente, sin dar por garantizado el resultado |
| La insignia de calidad muestra un nivel inferior | Refleja fielmente el nivel que la fuente de origen ha entregado realmente | Pruebe otros niveles en el menú de calidad; los niveles de origen cambian según la disponibilidad |
| La reproducción se interrumpe y no continúa | Puede haber caducado el enlace directo de origen | Pulse de nuevo la pista para intentar resolverla otra vez; no se garantiza la recuperación |

## 2. Modo degradado

El aviso «modo degradado de borde» indica que el plano de datos puede estar indisponible o haber agotado el tiempo de espera y que se está usando una vía de respaldo. La vía de respaldo también puede fallar; la búsqueda, las letras y la reproducción pueden estar limitadas o indisponibles. Los 30 segundos posteriores al enfriamiento del disyuntor son solo otra comprobación, no una garantía de recuperación. El contenido ya almacenado en búfer puede continuar, pero no se garantiza la continuidad. El aviso no demuestra una recuperación automática ni que no sea necesario actualizar.

## 3. Problemas de búsqueda

1. No hay resultados: normalmente se debe a una indisponibilidad momentánea de una fuente de origen; vuelva a intentarlo después de unos instantes. En modo degradado, la búsqueda de respaldo también puede fallar o no estar disponible y la cobertura puede ser algo menor;
2. Resultados duplicados o ausentes: los metadatos anómalos de una fuente pueden impedir la fusión; abra una Issue únicamente con términos de reproducción no sensibles. El texto de búsqueda público puede contener información personal o sensible: no lo pegue tal cual.

## 4. Problemas de inicio de sesión

1. La sesión se cierra inmediatamente: compruebe si el sitio puede establecer y conservar su propia cookie de sesión, si una extensión la elimina y si coinciden HTTPS, la URL de retorno y la configuración de OAuth; borre o desactive solo el ajuste de la extensión que interfiera y no desactive todas las protecciones del navegador;
2. La cuenta de Epomail está bloqueada: el inicio de sesión en el servicio se interrumpe con ella; resuelva primero el estado de la cuenta en Epomail;
3. Otra persona puede reproducir contenido en un dispositivo compartido: en la RC revisada, la cookie de sesión del sitio tiene una validez predeterminada de 30 días; esto no confirma la configuración de la instancia en línea ni el plazo de conservación o caducidad de credenciales copiadas y otras copias. Cierre la sesión después de usar dispositivos compartidos (véase la sección 5 de la [Guía de cuenta y seguridad](/es/account-security/)).

## 5. Problemas de almacenamiento

1. Favoritos o descargas perdidos: limpiar el navegador o terminar una sesión privada puede borrar copias locales, sin garantizar una recuperación general desde la nube. Incógnito no bloquea envíos; la limpieza local o un restablecimiento aparentemente correcto no prueban el borrado remoto completo (véase [Exportación y almacenamiento de datos](/es/data-management/));
2. Fallan las descargas: la cuota de almacenamiento del navegador está llena; elimine descargas antiguas o libere espacio y vuelva a intentarlo;
3. Falla la importación de música local: el formato supera la capacidad de decodificación del navegador o el archivo es demasiado grande para la cuota.

## 6. Limitación de peticiones y códigos de error

| Síntoma | Significado | Qué hacer |
| --- | --- | --- |
| 429 (anónimo) | Se ha superado el límite anónimo predeterminado de la RC de 240 peticiones por minuto; la instancia en línea puede ser distinta | Siga la interfaz y vuelva a intentarlo más tarde, o compruebe la configuración de la instancia |
| 429 (autenticado) | Se superan de forma sostenida las 600 peticiones por minuto predeterminadas de la RC; la instancia en línea puede ser distinta | Compruebe si el cliente está realizando peticiones en bucle |
| 501 (operaciones de revocación) | La revocación remota admitida no está configurada | Cerrar sesión puede borrar solo la cookie del navegador; pida al operador que compruebe la configuración de revocación y que las credenciales copiadas se rechacen |
| Cierres de sesión repetidos | La clave ha sido revocada o se ha ajustado la hora mínima global de emisión | Inicie sesión de nuevo para obtener una clave nueva; la causa real debe confirmarse con los registros y la configuración de la instancia |

## 7. El problema persiste

Al abrir una Issue pública, indique cuándo ocurrió, qué página y acciones utilizó, el navegador y su versión, y adjunte solo capturas de avisos sin datos identificables si son útiles; use únicamente términos de reproducción no sensibles. El texto de búsqueda público puede contener información personal o sensible. Antes de publicar, elimine o oculte direcciones de correo, datos personales o de perfil, términos de búsqueda sensibles, cookies de sesión, claves de API y esos mismos datos en las capturas. Las solicitudes de borrado completo o de copia de datos deben enviarse a `privacy@epocanvas.com`, no a una Issue pública; un mensaje de restablecimiento correcto no demuestra que se haya borrado cada registro.
