---
title: Tratamiento de datos y seguridad
description: "Tratamiento de datos y seguridad de Sonic: ciclo de vida de los datos, matriz de tratamiento, medidas de seguridad en cuatro capas, limitaciones conocidas, respuesta a las violaciones de datos y deberes del autoalojamiento."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página describe el ciclo de vida de los datos del servicio Sonic (en lo sucesivo, «el servicio»), la naturaleza de cada actividad de tratamiento, las medidas de mantenimiento de la seguridad, las limitaciones conocidas y los procedimientos de respuesta a las violaciones de datos. Es el desarrollo de la sección 10 de la [Política de privacidad](/es/privacy-policy/); los hechos técnicos se rigen por la implementación real del código de fuente abierta y pueden verificarse auditando el código fuente.

![Estructura de seguridad en cuatro capas de Sonic: cifrado del transporte, autenticación y firma, defensa SSRF en el borde y aislamiento del almacenamiento, complementada con el control autónomo del usuario (borrado con un clic, modo incógnito, revocación inmediata al cerrar sesión)](/images/sonic/security-shield.svg)

*Figura: las capas de las medidas de seguridad del servicio. La capa de transporte cifra todo el trayecto con TLS; la capa de autenticación se compone de claves firmadas con HMAC-SHA256 y OAuth con PKCE; la capa de borde bloquea las direcciones de la red interna y de los metadatos; la capa de almacenamiento se aísla por vinculación a loopback y túnel cifrado. A la derecha, los controles que usted gestiona por sí mismo.*

## 1. Ciclo de vida de los datos

| Fase | Descripción |
| --- | --- |
| Recogida | Datos de identificación de cuenta obtenidos al iniciar sesión mediante OAuth de Epomail (sin persistencia); eventos de comportamiento comunicados por lotes desde el reproductor (desactivables, máximo 50 por lote y 64 KB); uso temporal de la IP para la limitación anónima |
| Transferencia | HTTPS/TLS en toda la cadena; entre el plano de control y el plano de datos, túnel cifrado de Cloudflare Tunnel con verificación obligatoria de la clave entre servicios (X-Sonic-Engine-Key); la cabecera de dirección del cliente de borde a motor solo se acepta en el motor tras verificar la clave de servicio |
| Almacenamiento | SQLite del plano de datos (modo WAL), en `/app/data/sonic-recommend.sqlite` del volumen con nombre `sonic-data`; si la apertura falla en producción se deniega el servicio (fail-closed), sin degradación silenciosa |
| Utilización | Cálculos estadísticos vinculados por identificadores seudonimizados (recomendación, popularidad, similitud); sin revisión humana de contenidos, sin moderación de contenido y sin decisiones automatizadas |
| Compartición | Véase [Terceros y transferencias](/es/sub-processors/); sin venta ni uso publicitario |
| Supresión | Destrucción automática de los eventos de comportamiento a los 90 días (limpieza disparada cada 1500 escrituras y en el arranque); borrado inmediato con el borrado con un clic; los registros de limitación de peticiones caducan a los 120 segundos |

## 2. Matriz de tratamiento

| Actividad de tratamiento | Datos afectados | Vínculo de identidad | Base jurídica | Plazo de conservación |
| --- | --- | --- | --- | --- |
| Identificación de cuenta e inicio de sesión | Identificador de Epomail, correo electrónico, apodo, enlace de avatar, rol | Correo electrónico (dentro de la sesión) | Necesidad contractual | Sin persistencia; durante la sesión |
| Registro de eventos de comportamiento | Tipo de evento, identificador canónico de la pista, artista, género, idioma, término de búsqueda, proporción de progreso, ponderación de la señal | Hash seudonimizado (`usr_`/`anon_`) | Interés legítimo + derecho de oposición | 90 días (mínimo 7 días) |
| Cálculo del perfil de recomendación | Rasgos agregados de los eventos de comportamiento (artistas de largo plazo, tendencias de género, intención de sesión) | Hash seudonimizado | Interés legítimo + derecho de oposición | Se destruye con los eventos |
| Estadísticas globales agregadas | Recuento de términos de búsqueda, coincidencia entre pistas | Sin vínculo con personas | Interés legítimo | Con el mantenimiento de la base de datos |
| Limitación de peticiones y prevención del abuso | IP (cubos anónimos), hash de correo electrónico (cubos de autenticación), recuento por IP en el extremo de autenticación | Uso temporal | Interés legítimo | Ventana de 120 segundos / 60 segundos |
| Seguridad de sesiones y claves | Cookie de sesión, carga de la clave de API (`sub`, `jti`, `kid`, entre otros), lista de revocación | Hash de correo electrónico | Necesidad contractual, deber de seguridad | Máximo 30 días |
| Copias de seguridad de la base de datos | Instantáneas coherentes de los datos de comportamiento seudonimizados | Hash seudonimizado | Deber de seguridad | Según la política de copias del desplegador |

## 3. Medidas de mantenimiento de la seguridad

### 3.1 Transporte y acceso

1. Cifrado en todo el trayecto: del navegador al borde y del borde al plano de datos todo pasa por TLS; el plano de datos accede por el túnel cifrado de Cloudflare Tunnel, sin exposición directa de puertos a la Internet pública, mapeado en el host únicamente a `127.0.0.1:8080`;
2. Verificación entre servicios: el plano de datos exige la verificación de X-Sonic-Engine-Key en todas las rutas `/api`, `/proxy` y `/palette`; el motor elimina las cabeceras entrantes no fiables y reconstruye la cabecera de dirección del cliente a partir de la dirección del socket, de modo que toda falsificación queda sin efecto;
3. Degradación siempre explícita: en el modo degradado de borde, la cabecera de respuesta indica `X-Sonic-Degraded: 1` y la interfaz muestra a la vez el aviso de degradación, sin conmutación silenciosa.

### 3.2 Autenticación y claves

1. Flujo OAuth: el parámetro `state` y PKCE (S256) previenen la interceptación y la reutilización del código de autorización; las cookies de transacción caducan a los 600 segundos y están restringidas a la ruta `/api/auth`; en la devolución de llamada se verifican state, PKCE, el código de autorización y la reutilización, y se rechaza cualquier eslabón ausente o anómalo;
2. Claves de API: formato versionado `sonic_live_v2`, firmado con HMAC-SHA256, con comparación en tiempo constante en el servidor mediante Web Crypto `crypto.subtle.verify`; comprobación estricta de la versión, del `kid`, del `iat`/`exp` y del `jti`; las claves sin firma y las de la versión anterior v1 se rechazan sin excepción (fail-closed); validez de emisión de 30 días y tope de validación de 90 días; las claves viajan únicamente en cabeceras de petición, el canal del parámetro de consulta `?api_key=` se ha eliminado por completo para evitar que la clave acabe en los registros de acceso, en los historiales del navegador o en el Referer;
3. Mecanismo de revocación: cerrar la sesión revoca de inmediato la sesión actual; la lista de revocación de `jti`, la lista de revocación de sujetos y el mínimo global de tiempo de emisión (`SONIC_REVOKED_JTIS`/`SONIC_REVOKED_SUBS`/`SONIC_TOKEN_MIN_IAT`) admiten la anulación por lotes; con una KV vinculada y `SONIC_ENABLE_KEY_REVOCATION=1` activado se admite la revocación inmediata; si no se configura la revocación inmediata, los extremos pertinentes responden 501 y sugieren el método de lista, sin fingir una revocación exitosa;
4. Atributos de sesión: `HttpOnly; Secure; SameSite=Lax`, validez máxima de 30 días; la redirección de la devolución de llamada solo lleva el parámetro de estado `?auth=success` y no devuelve ninguna clave.

### 3.3 Defensa de las peticiones salientes

1. Intercepción SSRF: las peticiones salientes a direcciones de loopback, rangos privados RFC 1918, puentes internos de Docker y direcciones de metadatos en la nube (como `169.254.169.254`) se bloquean sin excepción, con verificación en pila dual IPv4 e IPv6 y nueva verificación del destino y de la resolución DNS en cada redirección;
2. Lista blanca de dominios: los proxies de audio, portadas y reenvío solo admiten los destinos HTTPS y los puertos estándar dentro de la lista controlada de dominios de CDN musicales (`SONIC_ALLOWED_MUSIC_DOMAINS`);
3. Depuración de las peticiones: las peticiones de origen eliminan `Set-Cookie` y las cabeceras de credenciales, y solo llevan el User-Agent fijo, el Referer oficial correspondiente y la cabecera Range necesaria; la IP de salida se presenta como dirección de marcador configurada por el desplegador (por defecto, las direcciones de documentación RFC 5737), nunca la IP de un usuario.

### 3.4 Almacenamiento y registros

1. Almacenamiento seudonimizado: los eventos de comportamiento se asocian a identificadores hash unidireccionales (valores SHA-256 truncados con prefijo `usr_` o `anon_`), sin columna de correo electrónico en claro ni columna de IP; el almacenamiento consta de 6 tablas (datos canónicos de pistas, mapa de pistas por plataforma, índice de texto completo, eventos de comportamiento, coincidencia entre pistas, agregación de términos de búsqueda), y solo la tabla de eventos de comportamiento tiene vínculo con personas;
2. Almacenamiento fail-closed: si la base de datos no abre en producción se deniega el servicio en lugar de degradarse silenciosamente; la reserva en memoria se limita al desarrollo y las pruebas o a la configuración explícita `SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK=1`;
3. Minimización de registros: los registros de acceso del plano de datos son JSON línea a línea y contienen únicamente el identificador de petición, el método, la ruta, el código de estado y la duración; la cadena de consulta, la IP, el User-Agent, las cookies, la cabecera Authorization y el cuerpo de la petición no se registran en ningún caso; las excepciones no tratadas se registran solo con el identificador de petición, el nombre del error y el mensaje truncado; los registros se entregan a la salida estándar de Docker y la política de rotación sigue la configuración de Docker del host; en el lado de Cloudflare Pages, el proyecto no mantiene registros de acceso globales propios;
4. Copias de seguridad: se realizan mediante instantáneas coherentes (VACUUM INTO) con comprobación de integridad; los archivos de copia contienen datos de comportamiento seudonimizados y deben protegerse al mismo nivel que los datos de producción;
5. Aislamiento de contenedores: el plano de datos corre en una pila de contenedores Docker; el contenedor auxiliar ncm-api solo es alcanzable en la red interna de compose (`ncm-api:3000`), sin exposición a la Internet pública; el archivo de configuración `.env` exige permisos 600.

### 3.5 Limitaciones conocidas

Este servicio es un proyecto de código abierto y su operador publica las limitaciones conocidas siguientes, que mejora de forma continua:

1. En las formas de despliegue sin el limitador nativo de Cloudflare, la limitación de peticiones se apoya en la KV o en contadores en la memoria del proceso, sin precisión global estricta;
2. La protección contra el DNS rebinding no está completamente eliminada; quien despliegue debe añadir medidas complementarias a nivel de red;
3. La cookie `sonic_session` contiene la clave de API firmada; el robo de la cookie equivale al robo de la clave, por lo que debe combinarse con la seguridad del dispositivo y el cierre de sesión oportuno;
4. SQLite es una arquitectura de escritor único, inadecuada para las formas de despliegue con escrituras de alta concurrencia;
5. No hay extremo de métricas Prometheus incorporado; la supervisión depende de los registros y de las sondas externas.

La lista completa de estas limitaciones consta en `docs/OPERATIONS.md` del repositorio de origen; quien opere un autoalojamiento debe evaluarlas según su forma de despliegue.

## 4. Respuesta a las violaciones de datos

1. Registro interno: toda violación de datos personales se registra (el artículo 33, apartado 5, del RGPD), también las evaluadas como de bajo riesgo;
2. Notificación a la autoridad de control: cuando la violación pueda suponer riesgo para las personas interesadas, se notifica a la autoridad de control competente del lugar del operador dentro de las 72 horas siguientes a su conocimiento, describiendo la naturaleza de la violación, las categorías y el número aproximado de datos afectados, las posibles consecuencias y las medidas ya adoptadas (el artículo 33, apartados 1 y 3, del RGPD);
3. Comunicación a las personas interesadas: cuando la violación pueda suponer un alto riesgo para ellas, se comunica sin dilación indebida, mediante anuncio en el sitio u otro medio eficaz, a las personas afectadas, describiendo la naturaleza de la violación y las medidas recomendadas (el artículo 34 del RGPD); si el riesgo se ha neutralizado eficazmente de modo que el alto riesgo ya no exista, puede omitirse la comunicación, dejando constancia razonada de esa decisión;
4. Medidas de respuesta: aislar de inmediato los sistemas afectados, revocar las claves y sesiones afectadas (incluida la lista de `jti` y el mínimo global de tiempo de emisión), evaluar y reparar las causas, y documentar todo el proceso de tramitación.

## 5. Protección de datos desde el diseño y por defecto

El servicio aplica en la fase de diseño las medidas siguientes (el artículo 25 del RGPD):

1. Seudonimización por defecto: los eventos de comportamiento se asocian desde su recogida a identificadores hash; las direcciones de correo electrónico no se persisten y la base de datos no tiene columnas de IP;
2. Modo de cero recogida: con la personalización desactivada, los eventos no se almacenan; en modo público se descartan directamente en el servidor, con el número de ignorados indicado fielmente en el acuse de recibo;
3. Mínimos datos en el cliente: el contexto de recomendación solo lleva favoritos, artistas recientes y términos de búsqueda recientes con límite de elementos, usados en memoria y sin persistencia; el reproductor no lee ni escribe `document.cookie` y las claves no entran en localStorage;
4. Circuitos de alto riesgo desactivados por defecto: el agregador de terceros (GDStudio, Lyriva) y el circuito de elusión quedan estrictamente desactivados por defecto y solo surten efecto si el desplegador los activa expresamente (variable de entorno a 1);
5. Borrado con un solo clic: el derecho de supresión se materializa directamente como función de autoservicio, sin solicitud manual; «Borrar todos los datos locales» limpia a la vez el perfil del servidor, localStorage, sessionStorage e IndexedDB.

## 6. Deberes de quien opere un autoalojamiento

Desde el momento en que usted despliegue por sí mismo este servicio, se convierte en el responsable del tratamiento de sus usuarios y debe cumplir los deberes siguientes:

1. Deber de información: informar a sus usuarios de las materias de tratamiento de datos (puede tomar como texto base la [Política de privacidad](/es/privacy-policy/) de este sitio);
2. Registro de las actividades de tratamiento: mantener un registro de las actividades de tratamiento (el artículo 30 del RGPD);
3. Evaluación de impacto: cuando el tratamiento pueda suponer un alto riesgo, practicar una evaluación de impacto en la protección de datos (el artículo 35 del RGPD), cuyo alcance comprenderá al menos el identificador anónimo de dispositivo, los eventos de comportamiento, el uso temporal de la IP en la limitación de peticiones y la derivación hash del correo electrónico en el OAuth;
4. Cotejo de la configuración: confirmar que los parámetros siguientes concuerdan con los compromisos de su política: días de retención de los eventos de comportamiento (`SONIC_RECOMMEND_RETENTION_DAYS`, por defecto 90, mínimo 7), ruta de persistencia (`SONIC_RECOMMEND_DB_PATH`, con `memory` se desactiva la persistencia), conmutador de reserva en memoria (`SONIC_RECOMMEND_ALLOW_MEMORY_FALLBACK`), conmutadores de los circuitos de terceros (`SONIC_ENABLE_GDSTUDIO`, entre otros) y parámetros de limitación de peticiones (`SONIC_RATE_LIMIT_ANON_RPM`/`SONIC_RATE_LIMIT_AUTH_RPM`);
5. Mantenimiento de la seguridad y sometimiento a supervisión: configurar las medidas de la sección 3 (con una clave de servicio de al menos 32 caracteres, permisos 600 del `.env` y plano de datos sin exposición a la Internet pública) y someterse, conforme a la ley de su lugar, a la inspección y supervisión de las autoridades competentes.

## 7. Auditabilidad

Las declaraciones de seguridad del servicio pueden verificarse en el código fuente: toda la lógica de tratamiento, los valores por defecto de los conmutadores, la estructura de almacenamiento y la forma de los registros son públicos en el repositorio de código abierto; el repositorio de origen incluye además el registro de subsanación de la auditoría de seguridad (`docs/AUDIT_REMEDIATION.md`) y el manual de operaciones (`docs/OPERATIONS.md`). Los hechos técnicos de la documentación de este sitio se contrastan con el código en cada versión; cuando se detecte discrepancia con el código, prevalece el código y la documentación se corrige de inmediato.
