---
title: Glosario
description: Términos de protección de datos, roles, consentimiento, tecnología y tratamiento de datos locales empleados en los documentos legales de Sonic.
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página explica los términos principales de la [Política de privacidad](/es/privacy-policy/), [Tratamiento de datos y seguridad](/es/data-security/), [Terceros y transferencias](/es/sub-processors/) y la [Política de uso aceptable](/es/acceptable-use/). Las definiciones jurídicas toman el RGPD como referencia. Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea. No es una certificación de cumplimiento operativo. El chino simplificado es la referencia de mantenimiento en la raíz; las otras nueve versiones lingüísticas son traducciones. La prioridad lingüística no reduce las normas imperativas ni el derecho de los consumidores a condiciones claras y comprensibles.

![Mapa de términos de Sonic: roles jurídicos, estados de los datos, operaciones de tratamiento y componentes técnicos](/images/sonic/key-terms-map.svg)

*Figura: los términos se agrupan por roles jurídicos, estados de los datos e implementación técnica; el esquema no amplía la condición jurídica de ninguna parte.*

## 1. Términos jurídicos

| Término | Definición |
| --- | --- |
| Datos personales | Toda información sobre una persona física identificada o identificable, según el artículo 4, apartado 1, del RGPD. IP, cookies, búsquedas, URL de avatar, nombres o textos de comentarios e identificadores seudónimos vinculables pueden ser datos personales. |
| Tratamiento | Cualquier operación sobre datos personales, incluida la recogida, registro, almacenamiento, consulta, uso, transmisión, publicación, limitación o supresión, según el artículo 4, apartado 2, del RGPD. |
| Limitación del tratamiento | Suspensión del uso de los datos en determinadas circunstancias, manteniéndolos conservados, según el artículo 18 del RGPD. |
| Elaboración de perfiles | Análisis o evaluación automatizada de características o conductas personales. Reproducciones, búsquedas, saltos, favoritos, rechazos y contexto pueden utilizarse para recomendar; los perfiles no equivalen necesariamente a decisiones con efectos jurídicos o de importancia similar. |
| Seudonimización | Tratamiento que impide atribuir directamente los datos a una persona sin información adicional, según el artículo 4, apartado 5, del RGPD. Los datos seudonimizados aún pueden combinarse para identificar y no equivalen a datos anónimos. |
| Responsable del tratamiento | Persona física o jurídica que determina sola o conjuntamente los fines y medios del tratamiento, según el artículo 4, apartado 7, del RGPD. En una instancia alojada se atiende a quien los determine realmente; autor del código, colaboradores y operador no tienen por qué ser el mismo sujeto. |
| Encargado del tratamiento | Persona física o jurídica que trata datos personales por cuenta del responsable, según el artículo 4, apartado 8, del RGPD. El rol depende de los fines, instrucciones y disposiciones reales; Cloudflare, Epomail u otros proveedores no son automáticamente encargados por su nombre. |
| Destinatario | Persona física o jurídica a la que se comunican datos personales, según el artículo 4, apartado 9, del RGPD. También puede ser destinatario un servicio que reciba la IP mediante conexión directa del navegador. |
| Tercero | Sujeto distinto de la persona interesada, el responsable, el encargado o las personas autorizadas por el responsable para tratar datos, según el artículo 4, apartado 10, del RGPD. |
| Consentimiento | Manifestación afirmativa libre, específica, informada e inequívoca, según el artículo 4, apartado 11, y el artículo 7 del RGPD, retirable en cualquier momento con una facilidad no inferior a la de otorgarlo. Iniciar sesión, seguir utilizando o tener activado por defecto no equivale a consentir perfiles opcionales; carecer de un registro de consentimiento no permite negarse a detener un tratamiento sin base. |
| Violación de datos | Incidente de seguridad que ocasiona destrucción, pérdida, alteración, comunicación no autorizada o acceso no autorizado a datos personales, de forma accidental o ilícita, según el artículo 4, apartado 12, del RGPD. |
| Autoridad de control competente | Autoridad pública que supervisa legalmente las obligaciones de protección de datos. Cuando se aplica el RGPD, la persona interesada puede reclamar ante la autoridad competente conforme al artículo 77 del RGPD. |
| Transferencia internacional | Transmisión de datos personales a terceros países u organizaciones internacionales fuera de la Unión Europea o del Espacio Económico Europeo; debe evaluarse según los lugares, sujetos y garantías reales, no por el nombre del servidor. |
| Categorías especiales de datos | Datos que revelan origen racial o étnico, opiniones políticas, convicciones religiosas o filosóficas, afiliación sindical, datos genéticos, datos biométricos utilizados para identificar de forma unívoca a una persona, salud, vida sexual u orientación sexual, según el artículo 9 del RGPD. Las preferencias musicales y búsquedas también pueden revelar indirectamente características sensibles y no pueden tratarse globalmente como carentes de riesgo. |
| Persona interesada | Persona física identificada o identificable cuyos datos se tratan; «usted» designa aquí a la persona física correspondiente que solicita algo o utiliza el servicio. |

## 2. Términos técnicos y del producto

| Término | Definición |
| --- | --- |
| Instancia alojada | Despliegue de Sonic al que el operador del proyecto da acceso efectivamente; el ámbito, responsable, configuración y contactos figuran en la [Política de privacidad](/es/privacy-policy/). |
| Despliegue independiente | Instancia separada operada por otras personas. El desplegador evalúa de forma independiente la identidad del responsable, leyes, configuración e información; proporcionar código MIT no convierte al proyecto en su operador. |
| Plano de control | Componentes que gestionan páginas, rutas, cachés, límites de peticiones o API de borde; pueden acceder a IP, cookies, cabeceras de autenticación, User-Agent, rutas y contexto. |
| Plano de datos | Componentes que ejecutan el motor, recomendaciones, base de datos y servicios relacionados. La auditoría encontró que la IP sin transformar puede remitirse al motor junto con cookies, cabeceras de autenticación o contexto; no puede describirse como receptor exclusivo de datos seudónimos. |
| Epomail OAuth | Flujo de inicio de sesión OAuth 2.0 mediante Epomail, con PKCE; puede devolver identificador de usuario, correo y marca de verificación, apodo, URL de avatar y rol. |
| API Key / `jti` | Credencial de API firmada y con plazo de validez, y su identificador único. Verificar la firma no cifra los datos; deben evaluarse por separado las cookies, las copias de credenciales y el almacenamiento de revocación. |
| fail-closed | Rechazar una petición si falla la validación o un almacenamiento necesario, en lugar de degradar silenciosamente; debe comprobarse su aplicación en la configuración real. |
| Defensa SSRF y lista de dominios permitidos | Comprobaciones de salida sobre determinadas direcciones internas, loopback, metadatos de nube, redirecciones o dominios autorizados; no cubren las conexiones directas del navegador ni todos los enlaces HTTP de origen. |
| SQLite / WAL | Base SQLite que puede proporcionar persistencia al plano de datos y su modo de registro previo de escritura; no implica que perfiles, registros, copias de seguridad o radar estén todos en la misma base ni se borren en el mismo plazo. |
| Disyuntor | Mecanismo que cambia temporalmente la ruta de peticiones después de fallos o tiempos de espera consecutivos; umbrales, degradación y activación dependen de la versión y configuración reales. |
| Eventos de comportamiento | Señales que pueden servir para recomendar: reproducción, progreso, saltos, favoritos, rechazos, búsquedas o respuestas sobre entidades. Los límites por lote, filtrado de ruido y conservación dependen de la versión y configuración. |
| Sugerencias públicas de búsqueda | Vía que presenta a otros visitantes términos de búsquedas históricas o estadísticas. La reutilización actual de términos originales plantea un riesgo y no puede calificarse simplemente de agregación anónima. |
| Radar | Funciones y estados de exploración, recomendación o sincronización basados en datos o conductas del usuario. No se ha confirmado la ruta de persistencia del motor; existen intentos de sincronización o almacenamiento aislado, sin poder garantizar presencia o ausencia de registros duraderos en bases de datos. |
| Música local | Archivos o Blobs en el dispositivo del usuario. No se ha encontrado una vía de subida del Blob de audio local al servidor; las consultas de letras y el contexto de recomendación aún pueden transmitir título, artista, álbum, duración o identificador. |
| Comentarios locales | Borradores o contenidos escritos actualmente en localStorage; no equivale a publicarlos en un servidor de comentarios. Leer comentarios puede obtener nombres, avatares y textos de otras personas e incorporarlos a una caché pública. |
| Conexión directa / proxy | El proxy hace la petición desde el servidor; la conexión directa la realiza el navegador hacia el CDN. El destino ve la IP y los datos de conexión del navegador, y las peticiones de flujo pueden usar su User-Agent, no necesariamente un valor fijo. |
| Versión y configuración | Los valores predeterminados del código, `.env`, Compose y producción pueden diferir. GDStudio está activado por defecto en el código si falta el ajuste, pero el entorno o Compose pueden desactivarlo; debe verificarse la configuración realmente ejecutada. |

## 3. Base de interpretación

1. Los términos jurídicos solo se utilizan si se cumplen sus requisitos reales; «proyecto personal», «gratuito» y «código abierto» no son sinónimos de responsable, encargado, consentimiento, anonimización o cumplimiento de seguridad.
2. Los términos técnicos deben contrastarse conjuntamente con el código, el entorno real y las rutas de petición de los proveedores. Cuando los objetivos del README no coincidan con la documentación, no deben convertirse en garantías. Si código, configuración y páginas discrepan, deben cesar las afirmaciones excesivas y corregirse las páginas afectadas.
3. El chino simplificado es la referencia de mantenimiento de los documentos legales; las otras nueve lenguas son traducciones de referencia. Si difieren de la versión raíz, deben sincronizarse cuanto antes, sin afectar a las normas imperativas ni al derecho del consumidor a claridad y comprensión.
4. En la RC `a75f5cb`, los archivos `LICENSE` de la raíz y del reproductor utilizan MIT; en la antigua `main@ce443c8` solo es verificable la licencia MIT del reproductor y no se encontró `LICENSE` en la raíz. Estas definiciones no limitan la copia, modificación, distribución ni uso comercial efectivamente autorizados por la licencia aplicable a cada versión y componente. La [Política de uso aceptable](/es/acceptable-use/) de la instancia alojada solo regula sus recursos efectivamente alojados y las conductas relacionadas con el servicio.
5. Comprobación de la fuente el 2026-11-02: RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), distinta de la antigua `main@ce443c8` (2026-10-27 UTC); ninguna demuestra la versión en línea.
