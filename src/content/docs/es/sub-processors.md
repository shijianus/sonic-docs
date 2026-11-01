---
title: Terceros y transferencias
description: "Lista de compartición con terceros y transferencias de Sonic: encargados del tratamiento, proveedor de identidad, fuentes de contenido de origen, circuitos opcionales, requerimientos legales y garantías de las transferencias internacionales."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página enumera de forma completa todos los supuestos de compartición de datos personales del servicio Sonic (en lo sucesivo, «el servicio») con terceros, incluidos los destinatarios, los datos afectados y las garantías. Es el desarrollo de la sección 7 de la [Política de privacidad](/es/privacy-policy/); el principio de la compartición es el mínimo necesario: no se venden datos personales, no se comparten con fines publicitarios y no se excede lo necesario para las funciones del servicio.

![Mapa de compartición con terceros de Sonic: seis canales (encargados del tratamiento, proveedor de identidad, fuentes de contenido de origen, proveedores opcionales, requerimientos legales y transferencias internacionales), todos centrados en el operador y con los valores por defecto de los conmutadores indicados](/images/sonic/sharing-map.svg)

*Figura: los seis canales de compartición. El tipo A es el tratamiento por encargo en uso continuo; el B, la verificación de identidad necesaria para el inicio de sesión; el C, la obtención de contenido dirigida por consultas, sin identidad de usuario; el D reúne los circuitos opcionales desactivados por defecto; el E es la excepción legal; el F son las garantías de las transferencias transfronterizas.*

## 1. Encargados del tratamiento (en uso continuo)

| Destinatario | Contenido del servicio | Datos afectados | Garantía |
| --- | --- | --- | --- |
| Cloudflare Pages y Functions | Alojamiento del frontal, pasarela de API en el borde, ejecución de la limitación de peticiones | Metadatos de las peticiones, registros temporales de limitación | Cláusula de tratamiento por encargo del artículo 28 del RGPD |
| Cloudflare Tunnel | Túnel cifrado entre el plano de control y el plano de datos | Metadatos del tráfico cifrado | Ídem |
| Cloudflare KV y limitadores | Contadores de limitación de peticiones (caducidad de 120 segundos), registros de revocación inmediata de claves (si está activada) | Claves de limitación de IP, registros de revocación de `jti` | Ídem |

Cloudflare, en su conjunto, posee las certificaciones SOC 2 Type II e ISO/IEC 27001 y cubre las transferencias transfronterizas con las cláusulas contractuales tipo de la Unión Europea. El tratamiento por Cloudflare, conforme a su propia política, de los metadatos de las peticiones a nivel de red se describe en su política de privacidad.

## 2. Proveedor de identidad (necesario para el inicio de sesión)

| Destinatario | Contenido del servicio | Datos afectados | Explicación |
| --- | --- | --- | --- |
| Epomail (`mail.epocanvas.com`) | Inicio de sesión y verificación de identidad OAuth 2.0 (PKCE): autorización, intercambio de tokens y consulta userinfo (con el token de acceso) | Devueltos al iniciar sesión: identificador de usuario, dirección de correo electrónico (verificada), apodo, enlace de avatar y rol de la cuenta | El correo electrónico no se escribe en la base de datos de este servicio y solo se usa para derivar hashes dentro de la sesión; el tratamiento de datos entre usted y Epomail se rige por su política de privacidad |

## 3. Fuentes de contenido de origen (dirigidas por consultas, sin identidad de usuario)

Las peticiones que reciben los destinatarios siguientes solo contienen los parámetros de consulta de canciones, un User-Agent fijo y el Referer oficial correspondiente, **sin sus datos de cuenta, cookies ni direcciones IP**:

| Destinatario | Contenido del servicio | Dominios representativos | Estado por defecto |
| --- | --- | --- | --- |
| NetEase Cloud Music | Búsqueda, direcciones de reproducción, letras palabra por palabra (YRC), portadas | `music.163.com`, `interface3.music.163.com`; además, a través del contenedor auxiliar ncm-api en la red interna del plano de datos | Activado |
| QQ Music | Búsqueda, direcciones de reproducción, letras palabra por palabra (QRC), portadas | `c.y.qq.com`, `u.y.qq.com`, `y.gtimg.cn`, `ws.stream.qqmusic.qq.com` | Activado |
| Kugou Music | Búsqueda, direcciones de reproducción, letras palabra por palabra (KRC) | `m.kugou.com`, `mobilecdn.kugou.com`, `songsearch.kugou.com`, `lyrics.kugou.com` | Activado |
| Kuwo Music | Búsqueda, direcciones de reproducción, portadas | `www.kuwo.cn`, `m.kuwo.cn`, `search.kuwo.cn` | Activado |
| AMLL | Complemento de letras palabra por palabra (TTML) | `api.amll.dev` | Activado |
| LRCLIB | Complemento de letras sincronizadas | `lrclib.net` | Activado |
| CDN oficiales de contenido | Transmisiones de audio y portadas (por defecto a través del proxy de borde del servicio) | `music.126.net`, `ws.stream.qqmusic.qq.com`, entre otros | Activado |

Aclaraciones:

1. La IP de salida de las peticiones de origen se presenta como dirección de marcador configurada por el desplegador (por defecto, las direcciones de documentación RFC 5737), nunca la IP de un usuario;
2. Las transmisiones de audio se obtienen por defecto a través del proxy de borde y el CDN de origen solo ve la dirección del servidor proxy; si usted invoca por sí mismo el modo directo `?mode=redirect`, su navegador se conecta directamente con ese CDN y su IP es visible para él (semántica inherente a la redirección 302); el reproductor web no usa ese modo;
3. El desplegador puede montar su catálogo autorizado con sus propias credenciales de membresía (`NETEASE_COOKIE`/`QQ_COOKIE`/`KUGOU_COOKIE`); esas credenciales son datos de cuenta del desplegador, ajenos a los usuarios finales, y el código no incorpora ninguna cookie de cuenta real.

## 4. Circuitos opcionales y estados predeterminados

Las cuatro primeras filas de la tabla siguiente forman la tabla de conmutadores de los circuitos opcionales, desactivados por defecto y activados solo por el desplegador. El completado entre fuentes aparece por separado en la última fila: está activado por defecto y no forma parte de los circuitos desactivados por defecto ni de su tabla de conmutadores.

| Destinatario | Contenido del servicio | Datos afectados | Conmutador y valor por defecto |
| --- | --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Búsqueda agregada de terceros | Solo identificadores de canciones, tipo y parámetros de fuente | `SONIC_ENABLE_GDSTUDIO`, por defecto 0 |
| Lyriva (`api.lyriva.xyz`) | Fuente alternativa de letras | Solo parámetros de identificadores de canciones | `SONIC_ENABLE_LYRIVA`, por defecto 0 |
| ListenBrainz / MusicBrainz (`labs.api.listenbrainz.org`, entre otros) | Refuerzo de artistas similares | Solo identificadores de artistas o grabaciones | `SONIC_ENABLE_LISTENBRAINZ`, por defecto 0 |
| Gorse (motor de recomendación autoalojado por el desplegador) | Filtrado colaborativo externo | Identificadores hash seudonimizados (`subject_key`) y retroalimentación de comportamiento | `SONIC_GORSE_URL`, por defecto vacío |
| Completado entre fuentes | Emparejamiento entre plataformas de la pista completa para las pistas en vista previa (pistas completas gratuitas de QQ, Kugou y Kuwo) | Solo metadatos de canciones (duración, título, artista) | Activado por defecto, sin datos de identidad |

## 6. Compartición por requerimiento legal

El operador solo facilita datos personales cuando la solicitud dispone de una base jurídica concreta: verifica la legalidad y el alcance de la solicitud, no facilita voluntariamente contenido que la exceda y notifica previamente a las personas interesadas en la medida permitida por la ley (salvo que la ley prohíba la notificación). El servicio no acepta requerimientos arbitrarios sin base jurídica. La tramitación de todas las solicitudes legales queda registrada en expediente.

## 7. Transferencias internacionales

El plano de control del servicio funciona en la red global de borde de Cloudflare y los eventos de comportamiento se almacenan en el nodo del plano de datos del operador; sus datos personales pueden tratarse en nodos situados fuera del país del operador. Garantías de las transferencias:

1. Conforme a los artículos 44 a 46 del RGPD, la base de las relaciones de alojamiento y de tratamiento por encargo es la decisión de adecuación de la Comisión Europea (artículo 45) o las cláusulas contractuales tipo aprobadas (el artículo 46, apartado 2, letra c) del RGPD);
2. Se apoya en las certificaciones de protección de datos de Cloudflare (SOC 2 Type II, ISO/IEC 27001) y en su anexo de tratamiento de datos;
3. Las peticiones a las fuentes de contenido de origen no contienen datos personales y no constituyen transferencias internacionales de datos personales (véase la sección 3).

Quien opere un autoalojamiento debe evaluar por sí mismo las transferencias internacionales de su forma de despliegue y asegurar su conformidad con los requisitos legales de su lugar (el Capítulo V del RGPD o la normativa local correspondiente).

## 8. Mantenimiento de la lista

1. Antes de añadir un destinatario de compartición, el operador lo inscribe en esta página y actualiza la fecha de entrada en vigor y el número de versión; los cambios sustanciales se anuncian previamente en el sitio;
2. Si esta lista discrepa de la configuración del código fuente, prevalece el código fuente y esta página se corrige de inmediato;
3. Quien opere un autoalojamiento debe mantener su propia lista de terceros según su configuración real: los circuitos no activados deben eliminarse de su información, para evitar la sobredivulgación o la divulgación falsa.
