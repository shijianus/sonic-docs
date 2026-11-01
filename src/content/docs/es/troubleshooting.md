---
title: Solución de problemas
description: "Solución de problemas de Sonic: problemas habituales y medidas para la reproducción, las fuentes, el inicio de sesión, el modo degradado, el almacenamiento y la limitación de peticiones."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página explica cómo reconocer y resolver los problemas habituales. Si nada de lo indicado resuelve el suyo, escriba a `admin@epocanvas.com` o abra una Issue en el repositorio de GitHub.

## 1. Problemas de reproducción

| Síntoma | Causa | Qué hacer |
| --- | --- | --- |
| La canción marcada como «vista previa» se detiene a los 30 segundos | Recorte oficial de la vista previa, no una avería | Active el completado entre fuentes para que empareje automáticamente una pista completa gratuita; o reproduzca la versión de otra fuente |
| La insignia de calidad muestra un nivel inferior | Refleja fielmente el nivel que la fuente de origen ha entregado realmente | Pruebe otros niveles en el menú de calidad; los niveles de origen cambian según la availability |
| La reproducción se interrumpe y no continúa | Ha caducado el enlace directo de origen | Pulse de nuevo la pista para que el enlace se resuelva de nuevo |

## 2. Modo degradado

Cuando aparece en la parte superior de la interfaz el aviso ámbar «modo degradado de borde», el nodo del plano de datos está temporalmente desconectado o ha agotado el tiempo de espera y el borde ha cambiado a conexiones directas con las interfaces públicas: la búsqueda y las letras siguen disponibles, mientras que la resolución completa de fuentes de audio y las actualizaciones de recomendaciones pueden estar limitadas. La recuperación suele ser automática en unas decenas de segundos (la sonda de actividad se reactiva tras los 30 segundos de enfriamiento del disyuntor); las canciones ya cargadas no se ven afectadas y no es necesario actualizar.

## 3. Problemas de búsqueda

1. No hay resultados: normalmente se debe a una indisponibilidad momentánea de una fuente de origen; vuelva a intentarlo después de unos instantes. En modo degradado, la búsqueda pasa directamente por el borde hacia las interfaces públicas, por lo que la cobertura puede ser algo menor;
2. Resultados duplicados o ausentes: la eliminación de duplicados multifuente fusiona por identidad normalizada; los metadatos anómalos de una fuente pueden impedir la fusión; abra una Issue e incluya las palabras clave.

## 4. Problemas de inicio de sesión

1. La sesión se cierra inmediatamente: normalmente el navegador bloquea las cookies de terceros o una extensión de seguridad las elimina; añada el sitio a la lista de permitidos y vuelva a intentarlo;
2. La cuenta de Epomail está bloqueada: el inicio de sesión en el servicio se interrumpe con ella; resuelva primero el estado de la cuenta en Epomail;
3. Otra persona puede reproducir contenido en un dispositivo compartido: la cookie de sesión se conserva como máximo 30 días; cierre la sesión después de usar dispositivos compartidos (véase la sección 5 de la [Guía de cuenta y seguridad](/es/account-security/)).

## 5. Problemas de almacenamiento

1. Se han perdido favoritos o descargas: «borrar los datos del sitio» del navegador o el modo privado elimina el almacenamiento local (véase la sección 1 de [Exportación y almacenamiento de datos](/es/data-management/)); anote sus listas importantes;
2. Fallan las descargas: la cuota de almacenamiento del navegador está llena; elimine descargas antiguas o libere espacio y vuelva a intentarlo;
3. Falla la importación de música local: el formato supera la capacidad de decodificación del navegador o el archivo es demasiado grande para la cuota.

## 6. Limitación de peticiones y códigos de error

| Síntoma | Significado | Qué hacer |
| --- | --- | --- |
| 429 (anónimo) | Se ha superado el límite anónimo de 240 peticiones por minuto | Iniciar sesión ofrece una cuota superior (600 rpm) |
| 429 (autenticado) | Se superan de forma sostenida las 600 peticiones por minuto | Compruebe si el cliente está realizando peticiones en bucle |
| 501 (operaciones de revocación) | La instancia no ha configurado la revocación inmediata | Debe configurarlo el desplegador por el método KV o de listas |
| Cierres de sesión repetidos | La clave ha sido revocada o se ha ajustado la hora mínima global de emisión | Inicie sesión de nuevo para obtener una clave nueva |

## 7. El problema persiste

Al abrir una Issue, indique cuándo ocurrió, qué página y acciones utilizó, cualquier aviso de la interfaz (por ejemplo, una captura del aviso de modo degradado) y el navegador y su versión. No adjunte cookies de sesión ni claves de API.
