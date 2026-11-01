---
title: Plataforma abierta y acceso a la API
description: "Acceso a la API abierta de Sonic: estructura uniforme de respuesta, navegación de los extremos, autenticación y transmisión de las claves de API, limitación de peticiones y revocación."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página explica cómo acceder a la API abierta de Sonic: la estructura uniforme de respuesta, los extremos principales, la autenticación y la transmisión de las claves de API, y la limitación de peticiones y la revocación. El comportamiento del acceso está sujeto a los [Términos del servicio](/es/terms-of-service/) y a la [Política de uso aceptable](/es/acceptable-use/); la especificación autoritativa de los extremos consta en el `API.md` del repositorio de origen.

## 1. Estructura uniforme de respuesta

Todos los extremos garantizan hacia el exterior el contrato de compatibilidad `brand: "Sonic"`; la respuesta estándar es la siguiente:

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
| Eventos de comportamiento | POST | `/api/sonic/events` | Comunicación de eventos de comportamiento (máximo 50 por lote) |
| | GET | `/api/sonic/events` | Consulta del resumen del perfil de recomendación |
| | DELETE | `/api/sonic/events` | Borrado del perfil personal con un solo clic |
| Búsqueda agregada | GET | `/api/sonic/search/smart` | Búsqueda híbrida inteligente y autocompletado |
| | GET | `/api/sonic/search/nexus` | Recuperación en paralelo multifuente de toda la red |
| Letras dinámicas | GET | `/api/sonic/lyrics/nexus` | Letras palabra por palabra (YRC/QRC/KRC → AMLL → LRCLIB) |
| | GET | `/api/sonic/lyrics/sync` | Letras sincronizadas entre plataformas (salida multiformato) |
| Medios de audio | GET | `/api/music/stream` | Proxy por segmentos del audio (Range/206; `?mode=redirect` conexión directa) |
| | GET | `/api/music/cover` | Proxy de portadas (prioridad a la alta definición, degradación a SVG) |
| | GET | `/api/music/palette` | Análisis de temperatura de color de la portada |
| Autenticación | GET | `/api/auth/user` | Datos de la sesión actual |
| | GET/POST | `/api/auth/key` | Consulta / reemisión de la clave de API |
| | POST | `/api/auth/revoke` | Revocación de la clave actual (requiere cabecera de clave explícita) |
| | POST | `/api/auth/logout` | Cierre de sesión y revocación de la sesión |

## 3. Autenticación de la clave de API

1. Formato: formato versionado `sonic_live_v2.<header>.<payload>.<signature>` firmado con HMAC-SHA256; la carga contiene `sub` (correo electrónico), `iat`, `exp`, `jti`, `kid`, `role` y `uid`;
2. Emisión: se obtiene por `/api/auth/key` tras iniciar sesión mediante OAuth de Epomail; validez de emisión de 30 días y tope de validación de 90 días;
3. Transmisión: solo se admite por cabeceras de petición, `X-Sonic-Key: <key>` o `Authorization: Bearer <key>`; el canal de parámetros de consulta en la URL se ha eliminado por completo, para evitar que la clave acabe en los registros de acceso, en los historiales del navegador o en el Referer;
4. Validación: el servidor compara en tiempo constante mediante Web Crypto y comprueba estrictamente la versión, el `kid`, el `iat`/`exp`, el `jti` y las listas de revocación; las claves sin firma y las de versiones anteriores se rechazan sin excepción (fail-closed).

## 4. Limitación de peticiones y revocación

| Concepto | Límite |
| --- | --- |
| Peticiones anónimas | 240 por minuto (valor por defecto) |
| Peticiones autenticadas | 600 por minuto (valor por defecto) |
| Extremo de autenticación | 30 por minuto y por IP |
| Comunicación de eventos de comportamiento | Máximo 50 por lote y 64 KB por cuerpo de petición |

Mecanismo de revocación: cerrar la sesión revoca de inmediato la sesión actual y el `jti`; el desplegador puede configurar las listas estáticas `SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT`, o vincular una KV para activar la revocación inmediata. El uso personal normal no alcanza la limitación de peticiones; el exceso sostenido entra en la escala de aplicación de la [Política de uso aceptable](/es/acceptable-use/).

## 5. Deberes de quien accede

1. La clave de API es una credencial personal; no puede entregarse a terceros ni incrustarse en clientes de distribución pública;
2. Los clientes propios deben respetar la limitación de peticiones, presentar los avisos de degradación (`X-Sonic-Degraded: 1`) y observar el catálogo de conductas prohibidas de la [Política de uso aceptable](/es/acceptable-use/);
3. El deber de informar a los usuarios finales al acceder con un cliente de terceros corresponde a quien accede; los usuarios de la API de las instancias de autoalojamiento deben leer asimismo [Código abierto y autoalojamiento](/es/open-source/).
