---
title: Política de privacidad
description: "Política de privacidad de Sonic: información sobre la recogida y utilización de datos, bases jurídicas, plazos de conservación, derechos de la persona interesada y transferencias internacionales, con el RGPD como norma mínima para todos los usuarios."
---

**Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.3**

Esta política explica cómo el servicio Sonic (en lo sucesivo, «el servicio») recoge, trata y transfiere sus datos personales, así como las normas y los compromisos de protección de datos que observa el operador. Antes de iniciar sesión o utilizar el servicio, debe leer esta política; si no está de acuerdo con cualquiera de sus contenidos, no utilice el servicio.

Los hechos técnicos descritos en esta política se rigen por la implementación real del código de fuente abierta del servicio. Los documentos legales de este sitio tienen como versión oficial la versión en chino simplificado; las versiones en las demás lenguas, incluida la presente versión en español, son traducciones de referencia y, en caso de duda en la interpretación, prevalece la versión oficial. El servicio adopta el Reglamento General de Protección de Datos (RGPD) de la Unión Europea como norma mínima de protección de datos para todos los usuarios (véase la sección 2).

![Cinco pilares de la Política de privacidad de Sonic: licitud, limitación de las finalidades, minimización y plazos de conservación, seguridad y sus derechos, asentados sobre la línea base de protección de nivel RGPD](/images/sonic/privacy-pillars.svg)

*Figura: los cinco ejes de esta política. La licitud se ancla en las bases jurídicas del artículo 6 del RGPD; la limitación de las finalidades excluye el perfil publicitario; la minimización se concreta en la seudonimización y el borrado con un solo clic; las medidas de seguridad constan en la sección 10; los derechos se ejercen conforme a la sección 9; los cinco se asientan en la línea base de nivel RGPD.*

## 1. Ámbito de aplicación

Esta política se aplica a los datos personales generados por su uso del servicio por cualquier vía, incluidos:

1. La visita a los sitios web del servicio (`sonic.epocanvas.tech`, `sonic.epocanvas.com` o el dominio de una instancia de autoalojamiento);
2. El uso de todas las funciones del reproductor web (búsqueda, reproducción, letras, recomendaciones, descargas e importación de música local);
3. El acceso a este servicio de clientes de terceros a través de la API abierta.

Esta política no se aplica a los sitios web y servicios de terceros que el servicio enlace o incruste (como los sitios propios de las plataformas musicales de origen); cada uno de esos terceros tiene su propia política de privacidad, de la que responde por sí mismo. Quien opere una instancia de Sonic autoalojada es, desde el momento del despliegue, el responsable del tratamiento de sus usuarios y debe cumplir por sí mismo, ante ellos, los deberes de información exigidos por la legislación aplicable de su lugar; esta política puede servirle de texto base para esa información.

## 2. Responsable del tratamiento y línea base de protección de datos

| Instancia que utiliza | Responsable del tratamiento | Explicación |
| --- | --- | --- |
| Instancia gestionada (`sonic.epocanvas.tech`, `sonic.epocanvas.com`) | El equipo de operaciones | Respecto de los eventos de comportamiento, los inicios de sesión y los registros de seguridad, el equipo de operaciones es el responsable del tratamiento |
| Instancia de autoalojamiento | Quien despliega esa instancia | El código de fuente abierta no contiene mecanismos de telemetría; salvo los servicios externos que el operador configure por sí mismo, no se devuelve ningún dato de la instancia a los autores de origen ni a terceros |

**Línea base de protección de datos**: el servicio adopta el RGPD como norma mínima de protección de datos para todos los usuarios, esté donde esté en el mundo. Sus derechos de información, acceso, rectificación, supresión, limitación, portabilidad, oposición y reclamación respecto de sus datos personales no quedan por debajo del nivel fijado por el RGPD. Para los usuarios situados en la Unión Europea y en el Espacio Económico Europeo, el RGPD se aplica directamente; para los usuarios de las demás regiones, el servicio cumple las normas del RGPD a título de obligación contractual; las protecciones más fuertes que confiera la ley de su lugar prevalecen en su ámbito.

## 3. Información debida en la recogida

Cuando el servicio le recoge datos personales, le comunica expresamente lo siguiente:

| Información debida | Contenido informado por el servicio |
| --- | --- |
| 1. Nombre del responsable | El operador (véase la sección 2; en las instancias de autoalojamiento, quien las despliega) |
| 2. Finalidades de la recogida | Identificación de la cuenta y sesiones de inicio; prestación de las funciones de reproducción, búsqueda y recomendación; prevención del abuso y del fraude; limitación de peticiones y mantenimiento de la seguridad del servicio (detalle en la tabla de la sección 5) |
| 3. Categorías de datos personales | Categoría de identificación de cuenta (identificador de usuario de Epomail, dirección de correo electrónico, apodo, enlace de avatar y rol de la cuenta); categoría de comportamiento y preferencias (eventos de reproducción, finalización, salto, favorito, rechazo y términos de búsqueda, vinculados mediante identificadores seudonimizados); categoría técnica (uso temporal de la IP para la limitación de peticiones, cookie de sesión y cookie de transacción OAuth); detalle en la sección 4 |
| 4. Plazo, territorio, destinatarios y forma de la utilización | Plazo: los eventos de comportamiento se destruyen automáticamente 90 días después de su registro (configurable por el desplegador, mínimo 7 días); los datos de identificación de cuenta no se persisten y se conservan solo durante la sesión. Territorio: el plano de control funciona en la red global de borde de Cloudflare y el plano de datos en nodos Linux propios del operador (véase la sección 7). Destinatarios: el operador y sus encargados del tratamiento, y las autoridades competentes conforme a requerimientos legales (véase la sección 7). Forma: almacenamiento seudonimizado y cálculos estadísticos de forma automatizada; sin revisión humana de contenidos y sin moderación de contenido |
| 5. Derechos que puede ejercer y forma de hacerlo | Derechos de acceso, rectificación, supresión, limitación, portabilidad, oposición y reclamación; la forma de ejercicio consta en la sección 9 |
| 6. Consecuencias de no facilitar los datos personales | Las funciones básicas del servicio (búsqueda, reproducción y letras) pueden usarse sin iniciar sesión ni comunicar eventos de comportamiento; iniciar sesión es necesario para las funciones de cuenta como la sincronización en la nube de favoritos, y la recomendación personalizada es una función opcional |

## 4. Datos personales recogidos

### 4.1 Datos de identificación de cuenta (inicio de sesión mediante Epomail)

Cuando inicia sesión con su cuenta de Epomail mediante OAuth 2.0 (PKCE), el servicio obtiene del extremo userinfo de Epomail los campos siguientes, sin obtener ningún otro dato de cuenta:

| Campo | Uso | ¿Se persiste? |
| --- | --- | --- |
| Identificador de usuario (`id`/`sub`) | Identificación de la identidad dentro de la sesión | No |
| Dirección de correo electrónico (verificada) | Derivación del hash seudonimizado; se usa como declaración `sub` en la carga de la clave de API emitida a usted | No |
| Apodo o nombre de usuario (`name`/`username`/`nickname`) | Presentación en la interfaz | No |
| Enlace de avatar (`avatar`/`picture`) | Presentación en la interfaz | No |
| Rol de la cuenta (`role`) | Determinación de permisos | No |

El servicio no dispone de sistema de registro independiente ni recoge números de teléfono, nombres reales, domicilios ni datos de pago. La dirección de correo electrónico se usa únicamente, en tiempo real dentro de la sesión de inicio, para derivar el identificador seudonimizado (hash SHA-256 con prefijo `usr_`, truncado a 12 caracteres hexadecimales), el hash del identificador de usuario y la clave del cubo de limitación de peticiones; de los valores hash derivados no puede recuperarse la dirección de correo electrónico original.

### 4.2 Eventos de comportamiento

Para prestar las funciones de recomendación y Auto DJ, el servicio registra eventos de comportamiento vinculados a la reproducción de pistas. Existen 11 tipos de eventos: búsqueda, clic en resultado de búsqueda, inicio de reproducción, progreso de reproducción, finalización, salto, repetición, favorito, retirada de favorito, rechazo y retirada de rechazo. Cada evento se asocia a uno de los identificadores seudonimizados siguientes:

1. Usuario con sesión iniciada: hash SHA-256 derivado de la dirección de correo electrónico (prefijo `usr_`);
2. Participante anónimo: identificador aleatorio generado localmente por su navegador (prefijo `anon_`) y hasheado de nuevo en el servidor;
3. Modo público: con la personalización desactivada, los eventos no se almacenan ni se registran; se descartan directamente en el servidor.

La comunicación de eventos se realiza por lotes (como máximo 50 eventos por lote y 64 KB por cuerpo de petición) y la cola pendiente de envío se vacía cuando la página se oculta. El contenido registrado de cada evento se limita a: tipo de evento, identificador canónico de la pista, identificador del artista, etiquetas de género e idioma, término de búsqueda (si procede), proporción de progreso de reproducción y ponderación de la señal; sin direcciones IP, sin huellas de dispositivo y sin contenido de texto libre.

Depuración de ruido y de señales falsas: los saltos causados por cortes de red (network_stall), fallos de decodificación (playback_error), recortes de vista previa (trial_end), flujo no disponible (stream_unavailable), tiempo de espera de búfer agotado (buffer_timeout) o fallo de conmutación automática (auto_switch_error) tienen ponderación cero y no se almacenan; el cliente solo comunica saltos activos cuando la reproducción es normal y la escucha está entre 0,5 y 25 segundos.

Además, las peticiones de recomendación acompañan un pequeño contexto local de su cliente (algunas pistas favoritas, artistas recientes y términos de búsqueda recientes, cada uno con límite de elementos), que se usa solo en memoria durante esa petición para la ordenación personalizada, sin persistencia y sin entrar en los registros.

### 4.3 Estadísticas globales agregadas

El servicio mantiene aparte estadísticas globales agregadas sin vínculo con usuario alguno, destinadas a las listas de popularidad y a las recomendaciones por similitud:

| Tabla estadística | Contenido | Vínculo con personas |
| --- | --- | --- |
| Recuento agregado de términos de búsqueda | Estadística global de la frecuencia de los términos de búsqueda | Ninguno |
| Relaciones de coincidencia entre pistas | Estadística global de las pistas escuchadas conjuntamente | Ninguno |

Estos registros no contienen identificadores personales, no se asocian a su identidad y tampoco aparecen en el alcance del «borrado del perfil con un solo clic» (pues no pertenecen a usuario alguno).

### 4.4 Almacenamiento local de su navegador

Los datos siguientes se guardan únicamente en su navegador y los servidores del operador no obtienen copia completa; si el almacenamiento no está disponible en el modo de privacidad del navegador, se degrada automáticamente a memoria temporal:

| Lugar de almacenamiento | Clave | Contenido |
| --- | --- | --- |
| localStorage | `audio` | Lista de reproducción, pista actual, modo de reproducción, volumen, estado de silencio, historial de reproducción |
| localStorage | `library` | Canciones favoritas, listas guardadas, artistas seguidos, MV guardados, álbumes guardados, listas de reproducción propias |
| localStorage | `global` | Tema, preferencia de idioma, historial de búsqueda (máximo 10 elementos) |
| localStorage | `settings` | Preferencias de la interfaz (animación de fondo, preferencia de calidad y demás ajustes) |
| localStorage | `recommend` | Conmutador de personalización, conmutador de Auto DJ, identificador anónimo, lista de pistas rechazadas |
| localStorage | `sonic-perf-mode` | Conmutador del modo de rendimiento |
| IndexedDB | `SonicMusicPlayerDB` | Archivos de música local que usted importe (`local_music`) y canciones descargadas (`downloaded_music`) |

### 4.5 Datos técnicos tratados automáticamente

- Limitación de peticiones: las peticiones anónimas se limitan por cubos de IP (240 por minuto, valor por defecto); la IP se usa solo brevemente como clave de limitación: el limitador nativo del borde no retiene datos, o se guarda temporalmente en un registro KV con caducidad automática a los 120 segundos, o en una ventana de memoria de 60 segundos (máximo 4096 cubos); la IP no se escribe en la base de datos ni en los registros de acceso. Las peticiones de autenticación se limitan por cubos de hash de correo electrónico (600 por minuto, valor por defecto); los extremos de autenticación tienen además una limitación específica de 30 peticiones por minuto y por IP.
- Sesiones y claves: tras iniciar la sesión se emite la cookie `sonic_session` con atributos `HttpOnly; Secure; SameSite=Lax` (válida como máximo 30 días), que contiene la clave de API firmada; las claves nunca se escriben en la URL, en parámetros de consulta ni en localStorage. El proceso OAuth usa las cookies de transacción `sonic_oauth_state` y `sonic_oauth_verifier` (validez de 600 segundos, restringidas a la ruta `/api/auth`). La carga de la clave de API contiene `sub` (correo electrónico), `iat`, `exp`, `jti`, `kid`, `role` y `uid`; el `jti` se usa para la lista de revocación y la invalidación inmediata al cerrar sesión.
- Registros de acceso: los registros de acceso del plano de datos son JSON línea a línea y contienen únicamente el identificador de petición, el método, la ruta, el código de estado y la duración; la cadena de consulta, la IP, el User-Agent, las cookies, la cabecera Authorization y el cuerpo de la petición no se registran en ningún caso. Los registros de excepciones contienen solo el identificador de petición, el nombre del error y el mensaje truncado.
- Proxy de audio: las transmisiones de audio se obtienen por defecto a través del proxy de borde del servicio; la petición de origen solo lleva el User-Agent, el Referer oficial configurado según el CDN y la cabecera Range, y se eliminan Set-Cookie y las cabeceras de credenciales; el CDN de origen solo ve la dirección del servidor proxy. Si usted invoca por sí mismo el modo directo `?mode=redirect`, su navegador establece la conexión directamente con el CDN oficial y su IP es visible para ese CDN (semántica inherente a la redirección 302); el reproductor web no usa ese modo.
- Red de borde: Cloudflare trata los metadatos de las peticiones a nivel de red conforme a su propia política.

### 4.6 Lo que el servicio no recoge

El servicio no tiene rastreo publicitario, ni cookies entre sitios, ni scripts estadísticos o de análisis de terceros, ni huellas de dispositivo, ni perfiles de comportamiento publicitarios; no recoge contactos, galería fotográfica, ubicación ni ningún dato de dispositivo ajeno a la reproducción musical; no vende datos personales, no los utiliza con fines publicitarios y no se conecta a ninguna red publicitaria.

## 5. Bases jurídicas y finalidades del tratamiento

Las bases jurídicas de cada actividad de tratamiento son las siguientes:

| Actividad de tratamiento | Finalidad | Base jurídica |
| --- | --- | --- |
| Inicio de sesión Epomail, mantenimiento de la sesión, emisión y revocación de claves de API | Identificación de la cuenta y acceso al servicio | Necesidad contractual; el artículo 6, apartado 1, letra b) del RGPD |
| Eventos de comportamiento y perfil de recomendación (seudonimizados) | Funciones de recomendación y Auto DJ | Interés legítimo; el artículo 6, apartado 1, letra f) del RGPD; puede desactivar la personalización en cualquier momento (derecho de oposición, sección 9) y la recogida cesa de inmediato |
| Estadísticas globales agregadas | Listas de popularidad y recomendaciones por similitud | Interés legítimo; el artículo 6, apartado 1, letra f) del RGPD; sin vínculo con personas |
| Eventos con identificador anónimo (participantes anónimos) | Funciones de recomendación | Su elección autónoma; cesa al desactivar la personalización |
| Limitación de peticiones por IP, seguridad de sesión y prevención del abuso | Seguridad y estabilidad del servicio | Interés legítimo; el artículo 6, apartado 1, letra f) del RGPD; cuando proceda, constituye asimismo obligación legal, al amparo del artículo 6, apartado 1, letra c) del RGPD |

Sus datos personales se usan únicamente para las finalidades enumeradas y el ámbito estrechamente vinculado a ellas. El servicio no usa sus datos para decisiones automatizadas (entendidas según el artículo 22 del RGPD como decisiones que produzcan efectos jurídicos o le afecten de forma similarmente significativa); el efecto de los resultados de recomendación se limita a la secuencia de reproducción que usted ve y a la ordenación de las listas, y puede desactivarlos en cualquier momento.

## 6. Plazos de conservación y supresión de los datos

| Categoría de datos | Política de conservación |
| --- | --- |
| Eventos de comportamiento | Destrucción automática 90 días después del registro (configurable por el desplegador, mínimo 7 días), con limpieza disparada por el recuento de escrituras y en el arranque; el «borrado del perfil con un solo clic» destruye de inmediato |
| Datos de identificación de cuenta (correo electrónico, apodo, enlace de avatar, rol) | Sin persistencia; se conservan solo durante la sesión |
| Cookie de sesión | Como máximo 30 días; invalidación inmediata al cerrar sesión |
| Cookie de transacción OAuth | Caduca automáticamente a los 600 segundos |
| Contadores de limitación de peticiones | El limitador nativo del borde no retiene datos; los registros KV caducan automáticamente a los 120 segundos; la ventana de memoria, a los 60 segundos |
| Lista de revocación de claves | Lista estática configurada por el desplegador (variables de entorno) o registros de revocación inmediata en KV |
| Copias de seguridad de la base de datos | Instantáneas coherentes con datos de comportamiento seudonimizados; deben protegerse al mismo nivel que los datos de producción |
| Estadísticas globales agregadas | Sin identificadores personales; se tratan según la política de mantenimiento de la base de datos |
| Almacenamiento local del navegador | Permanece en su dispositivo hasta que usted lo borre o use «Borrar todos los datos locales» |

## 7. Compartición con terceros y transferencias internacionales

El servicio comparte datos personales con terceros según el principio de mínimo necesario; todos los supuestos constan en [Terceros y transferencias](/es/sub-processors/). En síntesis:

1. Tratamiento por encargo: Cloudflare (alojamiento Pages, computación en el borde con Functions, túnel cifrado Tunnel, almacenamiento KV, infraestructura de limitación de peticiones);
2. Proveedor de identidad: Epomail (al iniciar sesión se obtienen el identificador, el correo electrónico, el apodo, el enlace de avatar y el rol);
3. Fuentes de contenido de origen: NetEase, QQ, Kugou, Kuwo, AMLL, LRCLIB y los CDN oficiales de contenido; las peticiones solo contienen los parámetros de consulta de canciones y el User-Agent y el Referer fijos, sin su identidad ni su IP;
4. Requerimientos legales: solo se facilitan cuando una autoridad competente lo solicita por el procedimiento legal, notificándoselo en la medida permitida por la ley.

El plano de control del servicio funciona en la red global de borde de Cloudflare y sus datos personales pueden tratarse en nodos situados fuera del país del operador. El operador gestiona las transferencias internacionales al amparo de las garantías de los artículos 44 a 46 del RGPD (incluidas las cláusulas contractuales tipo de la Unión Europea) sobre la base de las relaciones de alojamiento y de tratamiento por encargo, y se apoya en las medidas de protección de datos de Cloudflare (certificaciones SOC 2 Type II e ISO/IEC 27001). Quien opere un despliegue propio debe evaluar por sí mismo y asegurar que sus transferencias internacionales cumplen los requisitos legales de su lugar.

## 8. Protección de la infancia

El servicio no se dirige a menores de 16 años ni recoge intencionadamente datos personales de niños; si la ley de su lugar fija para los servicios de la sociedad de la información una edad de consentimiento inferior (mínimo 13 años, el artículo 8 del RGPD), prevalece esa disposición. El tutor que considere que un niño ha facilitado datos personales puede contactar con el operador para pedir su supresión, tramitada de inmediato tras la verificación. Nadie puede utilizar el servicio para difundir, entre niños y adolescentes, contenidos perjudiciales para su salud física y mental; las restricciones de uso pertinentes constan en la [Política de uso aceptable](/es/acceptable-use/).

## 9. Derechos de la persona interesada y forma de ejercicio

Usted disfruta de los derechos siguientes sobre sus datos personales:

1. Acceso y obtención de copia (el artículo 15 del RGPD);
2. Rectificación (el artículo 16 del RGPD);
3. Supresión (el artículo 17 del RGPD);
4. Limitación del tratamiento (el artículo 18 del RGPD);
5. Portabilidad de los datos (el artículo 20 del RGPD);
6. Oposición (el artículo 21 del RGPD), incluida la desactivación de la personalización en cualquier momento;
7. No quedar sujeto a decisiones basadas únicamente en el tratamiento automatizado (el artículo 22 del RGPD); el servicio no adopta este tipo de decisiones.

Forma de ejercicio:

![Bloque de privacidad y datos locales de la página de ajustes de Sonic: conmutadores de búsqueda inteligente y recomendación personalizada, conmutador de radio continua automática y botón de restablecimiento del perfil de recomendación y del registro de no me gusta; el bloque explica que «los siguientes datos se guardan solo en tu navegador y no se suben al servidor»](/images/sonic/ui/ui-privacy.png)

*Figura: bloque «Privacidad y datos locales» de la página de ajustes, es decir, la interfaz real de las funciones de autoservicio siguientes. Para la visita de la interfaz, véase la sección 7 de la [Guía de la interfaz y funciones](/es/interface/).*

1. Funciones de autoservicio (efecto inmediato):
   - «Borrar el perfil de recomendación»: destruye de inmediato en el servidor todos los eventos de comportamiento vinculados a usted (`DELETE /api/sonic/events`);
   - «Borrar todos los datos locales»: borra de inmediato el localStorage, el sessionStorage y toda la base de datos IndexedDB del navegador, y destruye a la vez el perfil en el servidor;
   - Consulta del resumen del perfil de recomendación: mediante `GET /api/sonic/events` obtiene un resumen de su perfil actual (número total de eventos, recuentos de favoritos y rechazos, artistas más escuchados, tendencias de género, términos de búsqueda recientes y forma de almacenamiento);
   - Desactivar la personalización: el conmutador de la página de ajustes surte efecto de inmediato; la cola pendiente de envío se vacía y los eventos posteriores dejan de recogerse;
   - Cerrar sesión: revoca de inmediato la sesión actual y el identificador de clave.
2. Solicitudes con intervención humana: las demás solicitudes se envían a `privacy@epocanvas.com`; el operador responde en el plazo de un mes desde su recepción (el artículo 12, apartado 3, del RGPD); en los casos complejos el plazo puede prorrogarse otros dos meses, comunicando el motivo de la prórroga dentro del primer mes.

Si considera que el tratamiento realizado por el servicio vulnera sus derechos, puede pedir reparación al operador (el artículo 79 del RGPD) y presentar una reclamación ante la autoridad de control competente del lugar del operador (el artículo 77 del RGPD); los usuarios situados en la Unión Europea y en el Espacio Económico Europeo pueden reclamar ante la autoridad de control de su lugar de residencia habitual, de trabajo o del presunto lugar de la infracción. Quien sufra un daño material o inmaterial por una infracción del RGPD puede solicitar la indemnización correspondiente conforme al artículo 82 del RGPD.

## 10. Medidas de mantenimiento de la seguridad

Conforme al artículo 32 del RGPD, el operador establece y mejora continuamente medidas técnicas y organizativas adecuadas para impedir que los datos personales sean sustraídos, alterados, destruidos, perdidos o divulgados: HTTPS/TLS en toda la cadena; claves de API firmadas versionadas con HMAC-SHA256 y comparación en tiempo constante; flujo OAuth con PKCE y cookies de transacción con plazo limitado; atributos HttpOnly, Secure y SameSite de la cookie de sesión y revocación inmediata; plano de datos vinculado solo a la dirección de loopback y accesido por túnel cifrado; intercepción SSRF en toda la cadena y lista blanca de dominios; identificadores seudonimizados y diseño de la base de datos sin columnas de IP; minimización de registros; validación de claves fail-closed. La lista completa, la matriz de tratamiento y la descripción de las limitaciones conocidas constan en [Tratamiento de datos y seguridad](/es/data-security/).

## 11. Cambios en la política

Esta política puede revisarse por cambios en el servicio o en la normativa. Los cambios sustanciales (nuevos destinatarios de compartición, cambios en la política de conservación o en el alcance de la recogida, entre otros) se anunciarán previamente en el sitio, actualizándose la fecha de entrada en vigor y el número de versión de la parte superior de esta página. Si tras la entrada en vigor de un cambio usted sigue utilizando el servicio, se entenderá que acepta la política revisada; si no está de acuerdo, puede dejar de usarlo y borrar sus datos. Las revisiones sustanciales anteriores se archivan con el historial de versiones del repositorio de código abierto.

## 12. Canales de contacto

- Privacidad, ejercicio de derechos y reclamaciones: `privacy@epocanvas.com`
- Servicios y cuentas: `admin@epocanvas.com`
- Proyecto de código abierto: Issues del repositorio de GitHub (`github.com/shijianus/sonic`)
- Sitios de autoalojamiento: diríjase al operador publicado en ese sitio

---

*Este documento es un documento de conformidad elaborado por el equipo de operaciones de Sonic y no constituye asesoramiento jurídico; las normas imperativas de la ley de su lugar prevalecen sobre lo que de esta política les sea contrario.*
