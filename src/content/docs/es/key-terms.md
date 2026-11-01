---
title: Glosario
description: "Definiciones de los términos de los documentos legales de Sonic: términos jurídicos (vocabulario del RGPD) y términos técnicos, usados de forma uniforme en todo el sitio."
---

**Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.3**

Esta página define los términos jurídicos y los términos técnicos empleados en los documentos legales de este sitio. Cada término tiene el mismo significado en todos los documentos; los definidos se interpretan según su definición y los no definidos, según su acepción usual. Los términos jurídicos se basan en las definiciones del Reglamento General de Protección de Datos (RGPD) de la Unión Europea.

![Mapa de términos de Sonic: dos familias de definiciones, la de los términos jurídicos (vocabulario del RGPD) y la de los términos técnicos, usadas de forma uniforme en todo el sitio, con la versión en chino simplificado como base interpretativa](/images/sonic/key-terms-map.svg)

*Figura: la estructura de las dos familias de términos del sitio. La familia jurídica se ancla en las definiciones del artículo 4 del RGPD; la familia técnica se rige por la implementación del código fuente y se contrasta con él en cada versión.*

## 1. Términos jurídicos

| Término | Definición |
| --- | --- |
| Datos personales | Toda información sobre una persona física identificada o identificable (el artículo 4, apartado 1, del RGPD); en Sonic, por ejemplo, el identificador de inicio de sesión y los registros de eventos de comportamiento |
| Tratamiento | Toda operación u operaciones realizadas sobre datos personales, incluidas la recogida, el registro, el almacenamiento, la utilización, la transmisión y la supresión (el artículo 4, apartado 2, del RGPD) |
| Limitación del tratamiento | Situación en la que el tratamiento se suspende temporalmente en supuestos concretos, conservándose los datos (el artículo 4, apartado 3, y el artículo 18 del RGPD) |
| Elaboración de perfiles | Toda forma de tratamiento automatizado que evalúa características personales y decide o analiza en consecuencia (el artículo 4, apartado 4, del RGPD); el servicio solo lo realiza en el alcance necesario para la función de recomendación, y usted puede borrarlo con un clic |
| Seudonimización | Tratamiento de datos personales de modo que ya no puedan atribuirse a una persona interesada sin utilizar información adicional (el artículo 4, apartado 5, del RGPD); Sonic lo implementa con hashes SHA-256 truncados y salados |
| Responsable del tratamiento | La persona física o jurídica que determina las finalidades y los medios del tratamiento (el artículo 4, apartado 7, del RGPD); en las instancias gestionadas, el equipo de operaciones; en las autoalojadas, quien las despliega |
| Encargado del tratamiento | La persona física o jurídica que trata datos personales por cuenta del responsable (el artículo 4, apartado 8, del RGPD), por ejemplo Cloudflare |
| Destinatario | La persona física o jurídica a la que se comunican datos personales (el artículo 4, apartado 9, del RGPD), sea o no tercero |
| Tercero | Sujeto distinto de la persona interesada, del responsable, del encargado y de las personas autorizadas para tratar (el artículo 4, apartado 10, del RGPD) |
| Consentimiento | Manifestación de voluntad libre, específica, informada e inequívoca de la persona interesada (el artículo 4, apartado 11, y el artículo 7 del RGPD); puede retirarse en cualquier momento con una facilidad no inferior a la con que se otorgó |
| Violación de datos | Violación de la seguridad que provoque la destrucción, pérdida o alteración accidental o ilícita de datos personales, o la divulgación o el acceso no autorizados a ellos (el artículo 4, apartado 12, del RGPD) |
| Autoridad de control | Autoridad pública que supervisa el cumplimiento de los deberes de protección de datos (el artículo 4, apartado 19, del RGPD); los usuarios de la Unión Europea pueden reclamar ante la autoridad de control de su lugar (el artículo 77 del RGPD) |
| Transferencia internacional | Transmisión de datos personales a un tercer país o a una organización internacional fuera de la Unión Europea y el Espacio Económico Europeo (el Capítulo V del RGPD) |
| Categorías especiales de datos | Datos personales que revelen el origen racial o étnico, las opiniones políticas, la salud, la vida sexual u otros atributos sensibles (el artículo 9 del RGPD); el servicio no los recoge |
| Persona interesada | La persona física identificada o identificable por los datos personales (el artículo 4, apartado 25, del RGPD), es decir, usted |

## 2. Términos técnicos

| Término | Definición |
| --- | --- |
| Plano de control | Pasarela en el borde que corre en Cloudflare Pages Functions; se encarga del enrutamiento, la limitación de peticiones, la caché y el disyuntor |
| Plano de datos | Pila de Docker Compose en un nodo Linux propio del operador; se encarga del análisis de protocolos, el cálculo de recomendaciones y el almacenamiento |
| sonic-engine | Contenedor principal del plano de datos (Node.js 22); exige la verificación de la clave entre servicios X-Sonic-Engine-Key y, en el host, solo se vincula a la dirección de loopback |
| ncm-api sidecar | Contenedor auxiliar del protocolo de NetEase, cerrado en la red interna (`ncm-api:3000`), alcanzable únicamente por la red interna de compose |
| OAuth 2.0 + PKCE | Flujo de inicio de sesión de modo de código de autorización con prueba de intercambio de clave (S256); el servicio usa Epomail como proveedor de identidad |
| Clave de API | Clave firmada versionada de formato `sonic_live_v2.<header>.<payload>.<signature>` con HMAC-SHA256; la carga contiene `sub`, `iat`, `exp`, `jti`, `kid`, `role` y `uid`; viaja únicamente en cabeceras de petición |
| jti | Identificador de clave contenido en la carga de la clave de API; se usa para la lista de revocación y la invalidación inmediata al cerrar sesión |
| fail-closed | Política de seguridad que deniega el servicio cuando la validación falla; Sonic la aplica a las claves sin firma, a las de versiones anteriores y a los fallos de almacenamiento en producción |
| Defensa SSRF | Intercepción de las peticiones salientes a direcciones de loopback, rangos privados RFC 1918, puentes de Docker y direcciones de metadatos en la nube, con verificación en pila dual IPv4/IPv6 y nueva verificación en cada redirección |
| Lista blanca de dominios | Los proxies de audio, portadas y reenvío solo admiten los destinos HTTPS dentro de la lista controlada de dominios de CDN musicales (`SONIC_ALLOWED_MUSIC_DOMAINS`) |
| SQLite WAL | Almacenamiento persistente de los eventos de comportamiento y las ponderaciones de entidades del plano de datos, en modo Write-Ahead Logging, en el volumen con nombre `sonic-data` |
| Disyuntor | Máquina de estados de tres estados (CLOSED/OPEN/HALF_OPEN); entra en corte con 3 fallos consecutivos o al superar el presupuesto de 4,5 segundos, y tras 30 segundos de enfriamiento se recupera por sonda |
| Modo degradado de borde | Estado de contingencia en el que, con el plano de datos fuera de línea, la capa de borde se conecta directamente a las interfaces públicas de letras y búsqueda; la cabecera de respuesta indica `X-Sonic-Degraded: 1` y la interfaz muestra el aviso de degradación |
| Caché de borde | Caché de borde con clave `sonic:*`, frescura de 8 minutos y, tras su caducidad, paso a un estado de conservación prorrogada para contingencias |
| Range 206 | Mecanismo HTTP de carga por segmentos; las transmisiones de audio responden por defecto con 206 Partial Content a través del proxy de borde |
| Modo directo | Redirección 302 de `?mode=redirect`, por la que su navegador establece la conexión directamente con el CDN oficial; el reproductor web no lo usa |
| YRC/QRC/KRC | Formatos de letras palabra por palabra de NetEase, QQ y Kugou; el servicio analiza de forma nativa su encapsulación cifrada y comprimida (XOR + Deflate) |
| TTML | Formato de lenguaje de marcado de la línea de tiempo de las letras palabra por palabra de AMLL |
| LRCLIB | Biblioteca global abierta de letras sincronizadas, usada como complemento cuando faltan las letras locales |
| Detección de vistas previas | Sondeo de la duración y los metadatos de la entidad de audio para identificar el recorte oficial de vista previa de 30 segundos y señalarlo expresamente |
| Completado entre fuentes | Mecanismo de emparejamiento entre plataformas de la pista completa desencadenado por las pistas en vista previa; activado por defecto, e indica la fuente sustituta cuando el emparejamiento tiene éxito |
| Eventos de comportamiento | Registros de señales de recomendación como la reproducción, la finalización, el salto, el favorito y el rechazo; máximo 50 por lote y 64 KB; los eventos de ruido (cortes, saltos por recorte de vista previa) no se almacenan |
| Borrado del perfil con un solo clic | `DELETE /api/sonic/events` destruye de inmediato todos los rasgos y registros de comportamiento de su perfil en el motor de recomendación |
| Resumen del perfil de recomendación | Resumen del perfil devuelto por `GET /api/sonic/events`: número total de eventos, recuentos de favoritos y rechazos, artistas más escuchados, tendencias de género, términos de búsqueda recientes y forma de almacenamiento |
| X-Sonic-Context | Contexto local del cliente que acompaña a la petición de recomendación (favoritos, artistas recientes y términos de búsqueda recientes, con límite de elementos); solo se usa en memoria, sin persistencia |
| Filtrado de ruido | Mecanismo por el que el servidor anula la ponderación y no almacena los saltos de las 6 clases no imputables al usuario (network_stall/playback_error/trial_end/stream_unavailable/buffer_timeout/auto_switch_error) |

## 3. Base interpretativa

1. La interpretación de los términos jurídicos toma como referencia el texto oficial del RGPD; la de los términos técnicos se rige por la implementación del código fuente; cuando el código y este documento discrepen, debe corregirse el documento y presentarse un Issue en el repositorio.
2. Los documentos legales de este sitio tienen como versión oficial la versión en chino simplificado; en las versiones en las demás lenguas, incluida la presente versión en español, la correspondencia de los términos se rige por las equivalencias de esta página.
