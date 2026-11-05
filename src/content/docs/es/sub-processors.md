---
title: Terceros y transferencias
description: "Infraestructura, identidad, contenidos y recursos externos, diferencias de configuración y transferencias internacionales en las instancias de Sonic."
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página desarrolla la sección 7 de la [Política de privacidad](/es/privacy-policy/) y explica los destinatarios que pueden intervenir en las instancias de pruebas alojadas de Sonic, mantenidas por una persona, gratuitas y sin ánimo de lucro. La posibilidad de integración en el código no prueba que esté activada ni que la comunicación de datos sea lícita. Las instancias desplegadas por terceros deben informar por separado según sus tratamientos reales.

Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea. No se certifican los contratos de proveedores. El chino simplificado es la referencia de mantenimiento del sitio; las otras nueve versiones lingüísticas son traducciones. Ninguna cláusula de prioridad lingüística reduce las normas imperativas ni el derecho de los consumidores a condiciones claras y comprensibles.

![Mapa de compartición con terceros de Sonic: infraestructura, identidad, fuentes de contenido, vías opcionales, exigencias legales y transferencias internacionales](/images/sonic/sharing-map.svg)

*Figura: los destinatarios se agrupan por función; las etiquetas de configuración o garantías no prueban el estado real de activación, los contratos ni las bases de transferencia.*

## 1. Infraestructura y relaciones de encargo del tratamiento

| Entidad | Función | Datos posibles y límites de configuración |
| --- | --- | --- |
| Cloudflare Pages y Functions | Alojamiento, API de borde, caché y limitación de peticiones | IP, rutas, cabeceras y metadatos de conexión; los registros concretos dependen de la configuración de la instancia y del proveedor |
| Cloudflare Tunnel | Canal entre el borde y el plano de datos | Tráfico de peticiones y metadatos de conexión; el túnel no cifra automáticamente todas las vías HTTP internas o de origen |
| Cloudflare KV y limitadores | Almacenamiento configurable para límites y revocación de credenciales, entre otros | IP o claves derivadas de identidad, identificadores de revocación; deben verificarse activación y plazos |
| Proveedor del anfitrión o alojamiento del plano de datos | Entorno del motor, base de datos y registros | El motor puede recibir del borde la IP sin transformar, cookies, cabeceras de autenticación y contexto; no se han verificado la entidad anfitriona ni los países de los nodos |

La condición de encargado depende de quién determine los fines, quién trate por instrucciones y las disposiciones reales, no solo del nombre del producto. Cuando se aplique el RGPD y exista una relación de encargo, deben cumplirse las disposiciones exigidas por el artículo 28 del RGPD. No se afirma aquí haber firmado ni verificado contrato alguno. Sigue siendo necesario completar la identidad del responsable y datos válidos para recibir comunicaciones; véase la sección 2 de la [Política de privacidad](/es/privacy-policy/).

## 2. Proveedor de identidad necesario para iniciar sesión

Epomail (`mail.epocanvas.com`) presta el inicio de sesión OAuth. El navegador interactúa con el servicio de identidad; Sonic intercambia el código de autorización y consulta los datos del usuario, pudiendo obtener identificador, correo y marca de verificación, apodo, URL de avatar y rol. Parte de la información se conserva en el almacenamiento `auth` del navegador y en la sesión firmada, no «solo en memoria».

Integrar el inicio de sesión o compartir una marca no convierte automáticamente a Epomail en encargado de Sonic. Los tratamientos independientes de su sistema de cuentas y los realizados por instrucciones deben evaluarse por separado según las finalidades y disposiciones reales. Sonic sigue respondiendo de la recepción, conservación y posteriores comunicaciones que decida.

## 3. Fuentes de contenido y conexiones directas del navegador

| Fuente | Uso principal | Datos que pueden transmitirse u obtenerse |
| --- | --- | --- |
| NetEase Cloud Music, QQ Music, Kugou, Kuwo y CDN relacionados | Búsqueda, audio, MV, portadas e información de contenido | Texto original de búsqueda, identificadores y metadatos de contenido; información de conexión de la salida del proxy o del navegador directo |
| AMLL, LRCLIB | Búsqueda y complemento de letras | Identificadores de canciones o datos de coincidencia como título y artista, además de metadatos de conexión |
| Google Fonts | Carga de fuentes | IP del navegador, User-Agent y otros datos de conexión |
| DiceBear | Avatares externos | La vía actual puede incluir el correo en texto claro en el parámetro `seed` de la URL y revelar información de conexión del navegador |

El proxy de audio puede hacer que el CDN vea la salida del proxy, pero eso no significa que todas las peticiones estén libres de datos personales. Las peticiones de flujo pueden utilizar el User-Agent del navegador en lugar de un valor fijo común; los MV, portadas, fuentes y avatares pueden solicitarse directamente desde el navegador. Algunos proveedores usan HTTP, por lo que no puede garantizarse TLS en toda la cadena. El `seed` de DiceBear con correo debe sustituirse por un avatar local o un identificador sin correo.

Los comentarios del origen contienen nombres o apodos, avatares y textos de otras personas y pueden entrar en cachés públicas; entre sus finalidades está mostrar los comentarios del MV solicitado. Sus autores no son parte del contrato de inicio de sesión del servicio: no puede tratarse su información únicamente con base en el artículo 6, apartado 1, letra b) del RGPD. Cuando se aplica el RGPD, la fuente pública no exime automáticamente de informar sobre la recogida indirecta conforme al artículo 14 del RGPD. El operador debe evaluar y documentar una base independiente de tratamiento, los plazos de conservación y las excepciones de información, y facilitar la información aplicable en los plazos legales. Si no se han aplicado las garantías necesarias, debe desactivarse la recogida o la caché pública; no se promete poder contactar individualmente a cada autor. Los comentarios redactados localmente se guardan actualmente solo en localStorage; no se ha encontrado una vía de publicación en un servidor de comentarios.

No se ha encontrado una vía de subida del cuerpo de los archivos de audio locales, pero la búsqueda de letras coincidentes o el contexto de recomendación pueden enviar título, artista, álbum, duración o identificador. Las portadas incrustadas extraídas como data URL también pueden enviarse con un evento de favorito y entrar en el catálogo remoto compartido de pistas, que puede devolverlas la búsqueda de todo el sitio o las sugerencias públicas. Restablecer el perfil no garantiza limpiar ese catálogo ni sus índices externos; que no se suba el cuerpo del audio no significa que las imágenes y metadatos relacionados permanezcan en el dispositivo.

## 4. Vías opcionales y diferencias de configuración

| Vía | Uso y datos posibles | Límite de la comprobación |
| --- | --- | --- |
| GDStudio (`music-api.gdstudio.xyz`) | Búsqueda agregada y completado entre fuentes; consultas o identificadores de contenido | Activado por defecto en el código si falta el ajuste, pero desactivado en el ejemplo de entorno y Compose; debe verificarse el estado real |
| Lyriva (`api.lyriva.xyz`) | Fuente de respaldo de letras; identificadores o parámetros de coincidencia | Controlado por `SONIC_ENABLE_LYRIVA` y otros ajustes |
| Musixmatch (`apic-desktop.musixmatch.com`) | Complemento de letras | La implementación se conserva en la RC, pero `isSourceEnabledByPolicy` no tiene una rama para Musixmatch y la llamada real está bloqueada por la condición false; el fallback de letras del antiguo `main` puede ser invocable y debe comprobarse según el despliegue; no debe describirse la RC como activada ni como disponible mediante un interruptor ordinario |
| Servicio de alertas configurado por el operador | Solo cuando se configura un `SONIC_ALERT_WEBHOOK_URL` válido y se activa una alerta; envía contadores del sistema, versión de lanzamiento, fecha y hora, resumen con credenciales ocultas e IP de salida del nodo emisor | Activación, destinatario, roles, transferencia y conservación dependen de la instancia; las notas del administrador y los errores pueden contener datos personales, y ocultar credenciales no es anonimización |
| ListenBrainz / MusicBrainz | Refuerzo de artistas similares; identificadores de artistas o grabaciones | Controlado por `SONIC_ENABLE_LISTENBRAINZ` y otros ajustes |
| Gorse | Recomendaciones externas; identificadores seudónimos, respuestas de comportamiento, marcas de tiempo, identificadores de pistas, etiquetas, títulos y artistas del catálogo | Integración mediante `SONIC_GORSE_URL` y otros ajustes; el restablecimiento actual no garantiza borrar las respuestas externas ni las fichas de pistas |
| Meilisearch | Servicio opcional de búsqueda; consultas originales y datos de catálogo | Deben verificarse la integración y los plazos según la instancia; las consultas no pueden considerarse anónimas |
| Completado entre fuentes | Correspondencia de contenido entre plataformas; metadatos de canciones | Las peticiones reales dependen de la vía de coincidencia; disponer de la función no demuestra autorización sobre el contenido |

Configurar un interruptor no equivale a consentimiento del usuario. La carencia de consentimiento de la personalización y Auto DJ activados por defecto se explica en la sección 5 de la [Política de privacidad](/es/privacy-policy/). Deben suspenderse los tratamientos opcionales sin las bases y elecciones necesarias; no deben eludirse los requisitos cambiando el nombre del tercero.

## 5. Comunicación por exigencia legal

Ante una solicitud de entrega de datos, deben comprobarse la identidad del solicitante, su competencia, la base concreta y el alcance; solo deben proporcionarse los datos legalmente necesarios y registrarse los motivos. Informar a la persona depende de la ley aplicable y de las restricciones válidas; una denuncia, sospecha de incumplimiento o terminación del servicio no implica entregar automáticamente todos los datos a la policía.

La obligación legal que sustenta una comunicación no sustituye los requisitos de transferencia internacional. Antes de enviar un problema a una Issue pública o comunidad, elimine los datos personales, credenciales e información privada de comentarios ajenos.

## 6. Transferencias internacionales

La aplicación del RGPD se determina conforme al artículo 3 del RGPD; la gratuidad, el carácter no lucrativo o la mera accesibilidad desde la Unión Europea no la excluyen ni la establecen automáticamente. Si el capítulo V del RGPD se aplica a una transferencia concreta de datos personales, el sitio debe comprobar individualmente, según los destinatarios, lugares y roles reales, los requisitos del artículo 44 del RGPD, la decisión de adecuación aplicable del artículo 45 del RGPD u otras garantías válidas del artículo 46 del RGPD. No debe calificarse indiscriminadamente toda IP extranjera o petición de contenido como transferencia del capítulo V. El sitio no convierte todo el régimen del RGPD en garantía contractual mundial y no ha verificado la ubicación del responsable, los países del plano de datos ni los destinos de todas las peticiones. No puede presumirse que el alojamiento esté en Taiwán ni que rija una jurisdicción fija.

1. Las transferencias a terceros países sujetas al RGPD deben cumplir individualmente el artículo 44 del RGPD, verificando una decisión de adecuación aplicable conforme al artículo 45 del RGPD u otras garantías válidas conforme al artículo 46 del RGPD.
2. Al utilizar cláusulas contractuales tipo, deben confirmarse las partes afectadas, el alcance del tratamiento, la evaluación de la transferencia y las medidas complementarias necesarias; que un proveedor publique cláusulas no significa que esta instancia las haya aplicado.
3. Las certificaciones ISO / SOC, las políticas de privacidad del proveedor o aceptar esta página no constituyen automáticamente una base lícita para transferir datos; los textos de búsqueda, IP e identificadores seudónimos tampoco pueden excluirse de forma general de los datos personales.
4. Conforme a la ley, puede solicitarse a `privacy@epocanvas.com` una descripción o copia de las garantías. Los secretos comerciales necesarios pueden ocultarse adecuadamente, sin usar la confidencialidad para anular deberes legales de transparencia.

## 7. Mantenimiento de la lista

Antes de activar un nuevo tratamiento o destinatario, el operador debe comprobar finalidad, base, categorías de datos, plazos, nodos y roles reales, y actualizar la información oportunamente; si se necesita un nuevo consentimiento, debe obtenerse por separado. Este texto no prueba que se hayan completado esas tareas ni autoriza activar una vía por el mero hecho de existir en el código.

Si la lista y el tratamiento real no coinciden, debe corregirse la información y remediarse la transferencia indebida, en lugar de limitarse a declarar que «prevalece el código». La responsabilidad de los desplegadores independientes deriva de la ley y las licencias realmente aplicables; copiar esta página no crea obligaciones contractuales adicionales hacia el autor del proyecto. Comunicaciones: `privacy@epocanvas.com`.
