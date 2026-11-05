---
title: Tratamiento de datos y seguridad
description: Ciclo de vida de los datos, límites del tratamiento, medidas de seguridad, limitaciones conocidas, respuesta a violaciones y orientación para despliegues independientes del servicio alojado Sonic.
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página desarrolla la sección 10 de la [Política de privacidad](/es/privacy-policy/) y explica los límites observables del tratamiento de datos y la seguridad en las instancias alojadas de Sonic. Este proyecto gratuito y sin ánimo de lucro está mantenido por una persona. Su objetivo es respetar la privacidad y, mediante esfuerzos razonables, ofrecer un nivel elevado de protección con medidas rigurosas y proporcionadas a los riesgos. Los principios del RGPD de minimización de datos, limitación de la finalidad, transparencia y control de los usuarios orientan la mejora continua.

Este objetivo no constituye una certificación europea ni una declaración de cumplimiento íntegro del RGPD y de las leyes de todos los Estados miembros. No garantiza seguridad absoluta, ausencia total de filtraciones o pérdidas de datos ni su supresión inmediata y completa. La protección efectiva depende del despliegue, la configuración y los tratamientos de terceros; esta página distingue las medidas constatadas en el código, los elementos no verificados y los riesgos conocidos. Los esfuerzos razonables no reducen las obligaciones legales aplicables, y comunicar los riesgos no le exige aceptar un tratamiento ilícito ni renunciar a sus derechos.

Esta página es el resultado de contrastar código fuente y materiales de auditoría, no una certificación de la configuración en línea, funcionamiento, contratos de proveedores o cumplimiento continuado. Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea. El chino simplificado es la referencia de mantenimiento en la raíz; las otras nueve versiones lingüísticas son traducciones. La prioridad lingüística no reduce las normas imperativas ni el derecho de los consumidores a condiciones claras y comprensibles.

![Estructura de seguridad Sonic en cuatro capas: transmisión y acceso, autenticación, peticiones salientes, almacenamiento y registros, con controles que requieren configuración operativa](/images/sonic/security-shield.svg)

*Figura: el esquema muestra los controles; no significa que todos los despliegues los hayan activado ni que cumplan los requisitos de conformidad.*

## 1. Ciclo de vida de los datos

| Fase | Hechos y límites actualmente comprobables |
| --- | --- |
| Recogida | Epomail OAuth proporciona el inicio de sesión; reproducción, búsqueda y recomendaciones pueden generar eventos. La personalización está activada por defecto en el código candidato actual; ese valor no constituye consentimiento para los perfiles opcionales. |
| Transmisión | Las rutas entre navegador, borde, plano de datos y origen dependen del despliegue. Las rutas internas y algunas de origen usan HTTP en texto claro; no puede afirmarse TLS en toda la cadena. Los MV, portadas, fuentes o avatares pueden solicitarse directamente desde el navegador. |
| Almacenamiento | El navegador puede conservar datos de cuenta, cola, historiales, preferencias, música local y caché; deben verificarse por despliegue los lugares y plazos reales de los datos de comportamiento, registros, copias y datos de proveedores. |
| Uso y comunicación | Búsqueda, reproducción e inicio de sesión responden a solicitudes; perfiles, Auto DJ, estadísticas de búsqueda y sugerencias públicas pueden usar contexto de comportamiento o búsquedas. Los destinatarios y ajustes figuran en [Terceros y transferencias](/es/sub-processors/). |
| Supresión | El restablecimiento actual afecta principalmente a algunos eventos o respuestas de la identidad actual, sin garantizar cobertura de radar, agregados de búsqueda, copias, registros, servicios externos o identificadores anónimos antiguos; la revocación también depende del almacenamiento configurado y del éxito de la petición. |

## 2. Matriz de tratamiento

| Actividad | Datos posibles | Límites y plazos del tratamiento |
| --- | --- | --- |
| Búsqueda, reproducción, letras e inicio de sesión solicitados | Consultas, identificadores de contenido, sesión y datos de cuenta devueltos por Epomail | Limitado a responder a la solicitud; los datos de inicio de sesión pueden estar en el navegador y la sesión. |
| Perfiles de comportamiento, Auto DJ y recomendaciones | Reproducción, progreso, saltos, favoritos, rechazos, búsquedas, identificadores seudónimos y contexto local | Elaboración de perfiles o tratamiento que puede apoyarla; actualmente activado por defecto. No debe presumirse que el cese y borrado tras rechazar o retirar ya se hayan realizado. |
| Estadísticas de búsqueda y sugerencias públicas | Texto original de búsquedas, recuentos y contexto relacionado | Las vías actuales pueden mostrar búsquedas de usuarios; sin aplicar filtros, umbrales y plazos, no deben calificarse de agregación anónima ni publicación segura. |
| Limitación de peticiones y seguridad | IP sin transformar, cookies, cabeceras de autenticación, User-Agent, contexto y claves derivadas de cuenta o sesión | Pueden remitirse con la petición al motor del plano de datos; afirmar que se limitan a lo necesario para evitar abusos, conectar y proteger exige comprobar las rutas reales. |
| Datos locales y comentarios | localStorage, IndexedDB, música importada, caché de descargas, comentarios locales y datos de comentarios del origen | No se ha encontrado subida del cuerpo del Blob de audio local; letras y recomendaciones pueden enviar título, artista, álbum, duración o identificador. Las portadas incrustadas extraídas como data URL pueden entrar en un catálogo remoto compartido con un evento de favorito y devolverse mediante la búsqueda del sitio o sugerencias públicas. Los comentarios del origen pueden contener nombres, avatares y textos ajenos y entrar en caché pública. |
| Soporte, controversias y obligaciones legales | Correo, explicaciones, pruebas necesarias y registros de tramitación aportados voluntariamente | Conservación solo durante el tiempo necesario para la solicitud, controversia u obligación; no hay un plazo uniforme verificado para copias del anfitrión. |

Las bases jurídicas, plazos y destinatarios deben evaluarse individualmente según los fines, usuarios y configuración reales. La gratuidad, el mantenimiento personal o el código abierto no reducen automáticamente las exigencias de seguridad o información.

## 3. Medidas de seguridad

### 3.1 Transmisión y acceso

1. Los puntos de entrada públicos pueden configurarse con HTTPS, OAuth, sesiones firmadas y claves entre servicios; esos controles del código no prueban que las entradas, proxies y servicios de origen reales usen todos TLS.
2. El túnel cifrado entre el plano de control y el de datos y la vinculación del plano de datos solo a loopback dependen del alojamiento. Las rutas HTTP internas en claro bastan para invalidar una afirmación general de cifrado de toda la cadena.
3. La validación de destinos y restricciones de dominios de las rutas proxy solo cubren las peticiones que realmente pasan por ellas. La auditoría encontró que la IP sin transformar puede remitirse al motor con cookies, cabeceras de autenticación y contexto; no puede describirse como receptor exclusivo de datos seudónimos.
4. Las peticiones de audio pueden utilizar el User-Agent del navegador en lugar de un valor fijo; al conectar directamente con MV, portadas, Google Fonts o servicios de avatar, esos servicios pueden ver la IP y los metadatos de conexión.

### 3.2 Autenticación y claves

1. La RC pública `a75f5cb` comprobada utiliza OAuth state y PKCE, una cookie de sesión HttpOnly firmada con validez predeterminada de 30 días y cookies de transacción OAuth de unos 600 segundos. La revocación mediante KV es opcional y depende de la configuración y del éxito de la solicitud. Estas protecciones no están acreditadas para la antigua `main@ce443c8`; los atributos y plazos reales deben comprobarse en el despliegue. La firma aporta integridad, no cifrado; la carga puede contener correo e identificadores de usuario o rol.
2. Deben rechazarse las peticiones si falla la validación de versión, firma, tiempo o `jti` de la clave de API; un nombre, variable de entorno o comentario de diseño no prueba un control completo de autenticación.
3. La eficacia inmediata del cierre de sesión o revocación masiva depende del almacenamiento, ajustes y éxito de la petición; sin activación o verificación no puede garantizarse invalidación inmediata de todas las credenciales copiadas.

### 3.3 Protección de peticiones salientes

El código incluye algunas validaciones SSRF, de redes privadas y redirecciones, y una lista de dominios musicales permitidos. No significa que todas las peticiones de origen o del navegador a terceros pasen por proxy, se depuren o se anonimicen. DiceBear incluye actualmente una vía de URL de avatar que usa el correo en texto claro como `seed`; las conexiones directas a Google Fonts, MV y portadas pueden revelar la IP a esos servicios. Algunos proveedores usan HTTP; no puede afirmarse TLS en toda la cadena.

### 3.4 Almacenamiento y registros

1. En el navegador, `auth`, `audio`, `library`, `global`, `settings`, `recommend` e IndexedDB conservan datos según sus funciones; cerrar sesión no elimina automáticamente todos los datos del dispositivo.
2. Si los datos de comportamiento del servidor se asocian mediante identificadores seudónimos, aún pueden combinarse con otra información para identificar personas; seudonimizar no equivale a anonimizar ni cubre búsquedas, radar o datos de terceros.
3. Esta comprobación no ha confirmado uniformemente la rotación real, permisos de acceso y destrucción al vencimiento de registros de aplicación, Cloudflare, anfitrión, origen y copias de seguridad; no deben inventarse plazos de copia ni promesas de «cero registros».
4. Meilisearch, opcional, puede tratar consultas originales o datos de catálogo; no se ha verificado si el borrado de Gorse se sincroniza con el local. El éxito de un restablecimiento local no sustituye el borrado de almacenamientos externos de recomendación o búsqueda.

### 3.5 Limitaciones conocidas

1. La personalización y Auto DJ están activados por defecto, sin elección previa, separada y revocable demostrable; eso no es consentimiento.
2. Las sugerencias públicas pueden reutilizar términos originales de búsqueda y exponer información personal o sensible.
3. La supresión cubre principalmente algunos eventos de la identidad actual; no se ha verificado cobertura de radar, copias, registros, servicios externos, Meilisearch, Gorse e identificadores anónimos antiguos. No se ha confirmado la ruta persistente del radar en el motor; no se hacen afirmaciones categóricas sobre su almacenamiento. Tras desactivar la personalización, Auto DJ aún puede enviar semillas y exclusiones, y el radar aún puede enviar una carga que el servidor rechace conservar debido a la marca de desactivación.
4. HTTP interno en claro, Google Fonts, peticiones directas de MV y portadas, User-Agent del navegador y URL de DiceBear con correo en claro hacen inexactas afirmaciones como «TLS en toda la cadena» o «el correo no sale al exterior».
5. Límites, revocación, registros y ajustes de terceros dependen del entorno de la instancia y la configuración del proveedor. GDStudio está activado por defecto en el código si falta el ajuste, pero el entorno o Compose pueden desactivarlo; una lista no basta para afirmar que está desactivado por defecto.

## 4. Respuesta a violaciones de datos

Cuando se aplica el RGPD, las medidas de seguridad deben ser proporcionales a la naturaleza de los datos, la escala, los costes de aplicación y los riesgos reales, conforme al artículo 32 del RGPD. El operador debe registrar cada violación. Salvo que sea improbable que entrañe un riesgo para los derechos y libertades de las personas, debe notificarla a la autoridad competente sin dilación indebida y, de ser posible, dentro de las 72 horas desde que tenga conocimiento, justificando cualquier retraso, conforme al artículo 33 del RGPD. En caso de riesgo alto debe informar también a las personas sin dilación indebida, salvo excepciones legales, conforme al artículo 34 del RGPD. Esto no promete notificar automáticamente a la autoridad de un país concreto ni exime de otras leyes aplicables.

La actuación real debe aislar los sistemas afectados, proteger o revocar credenciales, determinar categorías de datos, alcance, destinatarios y cronología, y registrar decisiones y remedios. Los incidentes sospechosos pueden comunicarse a `privacy@epocanvas.com`; no envíe contraseñas, tokens completos, cookies de suscripción ni datos personales innecesarios.

## 5. Protección de datos desde el diseño y por defecto

El artículo 25 del RGPD exige considerar la protección desde el diseño y por defecto al determinar los medios de tratamiento. El proyecto no puede afirmar actualmente su aplicación completa:

1. Los perfiles opcionales deben estar desactivados por defecto, con aceptación, rechazo, retirada y registro de la elección igualmente accesibles; el código actual los activa por defecto y ni iniciar sesión ni continuar usando sustituye al consentimiento.
2. Las sugerencias públicas deben desactivarse primero o aplicar controles de presentación mínima, filtrado, umbrales, plazos y supresión.
3. El `seed` del avatar no debe usar el correo en texto claro; Google Fonts, MV, portadas y otros recursos directos solo deben activarse tras evaluar las transmisiones de IP, cookies e identificadores.
4. Deben comprobarse los identificadores seudónimos antiguos vinculables, el radar, las búsquedas, las pistas compartidas y sus portadas, los registros, Meilisearch, Gorse y las copias de seguridad; debe aplicarse la supresión dentro del alcance legal correspondiente y notificarse a los destinatarios cuando proceda. Las excepciones legales de conservación deben explicar los motivos, el alcance y el plazo; una limpieza parcial de la identidad actual no puede presentarse como supresión completa.

## 6. Obligaciones de operadores de despliegues independientes

Las instancias independientes tienen operación propia. Las indicaciones de esta página no crean obligaciones contractuales que excedan la ley y las licencias realmente aplicables ni constituyen un compromiso operativo del autor. La aplicación del RGPD depende de conexiones territoriales y actividades reales, conforme al artículo 3 del RGPD, y no puede excluirse de forma general por gratuidad o carácter personal. Los requisitos siguientes solo se aplican cuando se cumplen sus respectivas condiciones legales:

1. Adoptar medidas proporcionales a la naturaleza de datos, escala, costes y riesgos reales, conforme al artículo 32 del RGPD, comprobando transmisión, claves, registros, recuperación y supresión, sin exigir por defecto equipos dedicados o certificaciones a todos los pequeños proyectos.
2. Tener menos de 250 personas no exime automáticamente del registro de actividades. Un tratamiento no ocasional, que pueda entrañar riesgos para derechos y libertades, que incluya categorías especiales o datos de condenas e infracciones penales puede, en cualquiera de esos casos, excluir la excepción, conforme al artículo 30 del RGPD.
3. Designar delegado de protección de datos cuando concurran los supuestos legales, incluidas autoridades públicas, actividades principales de seguimiento regular y sistemático a gran escala o tratamiento a gran escala de categorías especiales o de condenas e infracciones penales, conforme al artículo 37 del RGPD.
4. La evaluación de impacto se dirige a actividades que puedan entrañar alto riesgo antes del tratamiento; no se exige automáticamente para cada hash, inicio de sesión o proyecto gratuito, conforme al artículo 35 del RGPD.
5. Una entidad externa sujeta al artículo 3, apartado 2, del RGPD debe, por regla general, designar representante en la Unión Europea. La excepción de tratamiento ocasional del artículo 27 del RGPD exige conjuntamente que sea ocasional, no incluya tratamiento a gran escala de categorías especiales o de condenas e infracciones penales y sea improbable que entrañe riesgo por su naturaleza, contexto, alcance y fines. La gratuidad o el carácter no lucrativo no crean por sí solos la excepción.
6. Verificar `SONIC_RECOMMEND_RETENTION_DAYS`, ruta de base de datos, respaldo en memoria, vías de terceros y ajustes de limitación y revocación, e incorporar los valores reales a la información, plazos y procedimientos de supresión propios.

## 7. Auditabilidad

Esta página se basa en la revisión de la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), comprobada el 2026-11-02; la antigua `main@ce443c8` (2026-10-27 UTC) es distinta. Se trata de una comprobación documental, no de una auditoría operativa, certificación ni diligencia de proveedores. Los valores predeterminados del código, variables de entorno, Compose y servicios reales pueden diferir. Si documentación, código y despliegue discrepan, deben cesar las afirmaciones excesivas y corregirse la documentación.
