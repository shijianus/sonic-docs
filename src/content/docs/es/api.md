---
title: Plataforma abierta y acceso a la API
description: "Acceso a la API abierta de Sonic: estructura uniforme de respuesta, navegación de los extremos, autenticación y transmisión de las claves de API, limitación de peticiones y revocación."
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página explica cómo acceder a la API abierta de Sonic: la estructura uniforme de respuesta, los extremos principales, la autenticación y la transmisión de las claves de API, y la limitación de peticiones y la revocación. El comportamiento del acceso está sujeto a los [Términos del servicio](/es/terms-of-service/) y a la [Política de uso aceptable](/es/acceptable-use/); la especificación autoritativa de los extremos consta en el `API.md` del repositorio de origen.

El servicio alojado es un proyecto individual de pruebas, gratuito y sin ánimo de lucro, sin SLA ni garantía de recuperación. Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea. La personalización activada por defecto no es consentimiento; el restablecimiento es parcial y puede ocultar fallos; la revocación depende de la configuración y del éxito de la solicitud. No envíe datos ni credenciales innecesarios.

## 1. Estructura uniforme de respuesta

Las respuestas JSON estándar pueden utilizar `brand: "Sonic"` según el ejemplo siguiente; los flujos, redirecciones y errores tienen respuestas propias. Esta API experimental no promete compatibilidad permanente ni SLA:

```json
{
  "brand": "Sonic",
  "data": { "id": "191254", "title": "红豆", "quality": "320k" },
  "meta": {
    "cached": true,
    "cacheLevel": "edge",
    "provider": "nexus",
    "degraded": false,
    "circuitState": "CLOSED"
  }
}
```

El campo `meta` etiqueta fielmente el nivel de caché, el proveedor, el estado de degradación y el estado del disyuntor, lo que permite al cliente presentar avisos transparentes.

## 2. Navegación de los extremos principales

| Categoría | Método | Extremo | Función |
| --- | --- | --- | --- |
| Recomendación inteligente | GET | `/api/sonic/recommend/for-you` | Puede que te guste / Auto DJ |
| | GET | `/api/sonic/recommend/trending` | Listas de tendencias (24h/7d/surging/new) |
| | GET | `/api/sonic/recommend/similar` | Pistas similares / exploración de artistas |
| | GET | `/api/sonic/recommend/discover` | Radar de géneros y estilos |
| Eventos de comportamiento | POST | `/api/sonic/events` | Comunicación de eventos de comportamiento (máximo 50 por lote)  |
| | GET | `/api/sonic/events` | Consulta del resumen del perfil de recomendación  |
| | DELETE | `/api/sonic/events` | Borrado parcial de eventos y respuestas de la identidad actual, no una supresión completa del perfil  |
| Búsqueda agregada | GET | `/api/sonic/search/smart` | Búsqueda híbrida inteligente y autocompletado |
| | GET | `/api/sonic/search/nexus` | Recuperación en paralelo multifuente de toda la red |
| Letras dinámicas | GET | `/api/sonic/lyrics/nexus` | Letras palabra por palabra (YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | Letras sincronizadas entre plataformas (salida multiformato) |
| Medios de audio | GET | `/api/music/stream` | Proxy por segmentos del audio (Range/206; `?mode=redirect` conexión directa) |
| | GET | `/api/music/cover` | Proxy de portadas (prioridad a la alta definición, degradación a SVG) |
| | GET | `/api/music/palette` | Análisis de temperatura de color de la portada |
| Autenticación | GET | `/api/auth/user` | Datos de la sesión actual |
| | GET/POST | `/api/auth/key` | Consulta / reemisión de la clave de API |
| | POST | `/api/auth/revoke` | Intento de revocación según almacenamiento y éxito de la petición; requiere cabecera de clave explícita |
| | POST | `/api/auth/logout` | Borrado de la cookie actual; revocación remota condicionada |

## 3. Autenticación de la clave de API

1. Formato: formato versionado `sonic_live_v2.<header>.<payload>.<signature>` firmado con HMAC-SHA256; la carga contiene `sub` (correo electrónico), `iat`, `exp`, `jti`, `kid`, `role` y `uid`;
2. Emisión: se obtiene por `/api/auth/key` tras iniciar sesión mediante OAuth de Epomail; validez de emisión predeterminada de 30 días; los 90 días son solo el máximo admitido por el validador, no un plazo de reemisión;
3. Transmisión: solo se admite por cabeceras de petición, `X-Sonic-Key: <key>` o `Authorization: Bearer <key>`; el canal de parámetros de consulta en la URL se ha eliminado por completo, para evitar que la clave acabe en los registros de acceso, en los historiales del navegador o en el Referer;
4. Validación: el servidor compara en tiempo constante mediante Web Crypto y comprueba estrictamente la versión, el `kid`, el `iat`/`exp`, el `jti` y las listas de revocación; las claves sin firma y las de versiones anteriores se rechazan sin excepción (fail-closed).

## 4. Limitación de peticiones y revocación

| Concepto | Límite |
| --- | --- |
| Peticiones anónimas | 240 por minuto (valor por defecto) |
| Peticiones autenticadas | 600 por minuto (valor por defecto) |
| Extremo de autenticación | 30 por minuto y por IP |
| Comunicación de eventos de comportamiento | Máximo 50 por lote y 64 KiB por cuerpo de petición |

Cerrar sesión borra la cookie actual; invalidar credenciales copiadas depende de un almacenamiento de revocación operativo y de una petición correcta. Deben verificarse en la instancia las listas `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT` y KV; un fallo o una respuesta 501 no equivale a revocación. Respete las respuestas de limitación y la [Política de uso aceptable](/es/acceptable-use/), sin presumir que el uso personal nunca puede agotar una cuota.

## 5. Deberes de quien accede

1. La clave de API es una credencial personal; no puede entregarse a terceros ni incrustarse en clientes de distribución pública;
2. Los clientes propios deben respetar la limitación de peticiones, presentar los avisos de degradación (`X-Sonic-Degraded: 1`) y observar el catálogo de conductas prohibidas de la [Política de uso aceptable](/es/acceptable-use/);
3. Quien integra debe informar según su rol real, sin eximir al operador de sus obligaciones propias. No envíe eventos opcionales sin base válida ni presente `DELETE /api/sonic/events` como supresión completa: puede omitir identificadores anónimos antiguos, radar, agregados, servicios externos y copias de seguridad, con fallos ocultos en la interfaz. Véase [Código abierto y autoalojamiento](/es/open-source/).
