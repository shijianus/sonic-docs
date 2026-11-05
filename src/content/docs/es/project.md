---
title: Presentación del proyecto
description: "Presentación del proyecto epocanvas sonic: producto, funciones, arquitectura, recomendación, seguridad y privacidad, despliegue y guía de lectura."
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página presenta el proyecto epocanvas sonic (en lo sucesivo, «Sonic» o «el proyecto»): su identidad como producto, sus funciones principales, su arquitectura del sistema, su diseño de seguridad y privacidad, su ámbito de aplicación y sus formas de despliegue, y ofrece una ruta de lectura de la documentación de este sitio. Tanto si pretende utilizar una instancia gestionada, como desplegar la suya propia o conocer los compromisos de privacidad y condiciones, puede empezar por esta página. Los compromisos legales de Sonic figuran en la [Política de privacidad](/es/privacy-policy/) y en los [Términos del servicio](/es/terms-of-service/). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

![Arquitectura de dos planos de Sonic: los usuarios acceden al plano de control en el borde de Cloudflare (enrutamiento, limitación de peticiones, caché, corte de circuito); el plano de datos en Linux ejecuta el análisis de protocolos, el cálculo de recomendaciones y el almacenamiento SQLite; las transmisiones de audio se obtienen por defecto a través del proxy de borde desde los CDN oficiales](/images/sonic/project-architecture.svg)

*Figura: arquitectura de Sonic con separación entre plano de control y plano de datos. El plano de control se ejecuta en Cloudflare Pages en el borde; el plano de datos se ejecuta en un nodo Linux propio del operador, se comunica por un túnel cifrado y exige la verificación de la clave entre servicios; las transmisiones de audio se obtienen por defecto del CDN oficial a través del proxy de borde (Range 206), con un modo de conexión directa 302 opcional.*

## 1. Posicionamiento del proyecto

Sonic es un proyecto personal secundario, gratuito y sin ánimo de lucro, destinado al aprendizaje y a pruebas de interés general, sin SLA ni garantía de funcionamiento permanente. Ofrece una plataforma musical multifuente y una pasarela de agregación con arquitectura «plano de control en el borde de Cloudflare + plano de datos con motor de protocolos Linux». Su código es abierto y puede desplegarse de forma independiente; «local» para el motor se refiere al servidor del operador, no necesariamente al dispositivo del usuario.

| Elemento | Descripción |
| --- | --- |
| Instancia gestionada | `sonic.epocanvas.tech` y `sonic.epocanvas.com`, en las instancias realmente operadas por el proyecto; el código no verifica la identidad jurídica del operador ni los países de los nodos |
| Instancia de autoalojamiento | Instancia desplegada de forma independiente; los roles y obligaciones dependen de la operación y de las decisiones reales de tratamiento |
| Licencia del código fuente | El `LICENSE` de la raíz y `player/LICENSE` son MIT en la RC `a75f5cb`; en la antigua `main@ce443c8` no se encontró `LICENSE` en la raíz y solo es verificable la licencia MIT del reproductor. El carácter no lucrativo no prohíbe los usos comerciales autorizados por MIT; marcas y medios tienen derechos propios |
| Método de inicio de sesión | La última RC pública utiliza OAuth 2.0 (PKCE) de Epomail, sin sistema de registro independiente; la antigua `main@ce443c8` no incorpora estos controles de la RC y la versión en línea es desconocida |
| Composición del software | Frontal de Cloudflare Pages y funciones de borde (plano de control), motor local Node.js 22 y contenedor auxiliar ncm-api (plano de datos), reproductor web Vue 3 |

## 2. Panorama de funciones principales

![Interfaz real del reproductor de Sonic: navegación izquierda (Explorar, Mi música, Sistema); la página de inicio agrega el carrusel de recomendaciones, la recomendación inteligente y el radar musical, y las listas recomendadas; barra de reproducción mini en la parte inferior](/images/sonic/ui/ui-home.png)

*Figura: pantalla real del reproductor web de la instancia gestionada. Para una visita detallada, elemento por elemento, de las zonas de la interfaz y la ubicación de cada función, véase la [Guía de la interfaz y funciones](/es/interface/).*

| Capacidad | Descripción |
| --- | --- |
| Búsqueda agregada multifuente | Recuperación isomórfica en todas las fuentes con tolerancia a fallos: normalización de caracteres simplificados y tradicionales, búsqueda por pinyin y siglas, simetría de alias de artistas en chino e inglés, tolerancia ortográfica por distancia de edición y reconocimiento de versiones; obtención en paralelo de todas las fuentes con fusión y desduplicación por expresiones regulares |
| Letras dinámicas palabra por palabra | Análisis inverso nativo del YRC de NetEase, el QRC de QQ y el KRC de Kugou (descifrado XOR + descompresión Deflate), complementado con AMLL TTML y la biblioteca global de letras LRCLIB; letras multilingües, romanización y traducciones sincronizadas al milisegundo |
| Niveles de calidad y transparencia de las vistas previas | Sondeo estricto de entidades que distingue las pistas completas del recorte oficial de vista previa de 30 segundos; una vista previa nunca se presenta como pista completa; las pistas en vista previa activan automáticamente el completado entre fuentes con la pista completa (configurable), indicando de forma transparente la fuente del completado |
| Recomendación inteligente y Auto DJ | Motor de recomendación local ligero: modelo de popularidad multifactor, intención de búsqueda por sesión, cuantificación de la retroalimentación de comportamiento, similitud de contenido con reordenación de diversidad MMR; sin necesidad de clústeres externos de macrodatos |
| Gestión autónoma de eventos de comportamiento | Controles de personalización y restablecimiento; el borrado actual es parcial y algunos fallos no se muestran, véase la política de privacidad |
| Diseño de seguridad | La RC incluye PKCE, sesiones firmadas, claves de API versionadas y algunas comprobaciones SSRF; deben verificarse las cookies, la transmisión de credenciales y la configuración. La antigua `main@ce443c8` no demuestra las funciones de la RC ni las del servicio en línea |
| Degradación con continuidad | La capa de borde dispone de un modo degradado y de un aviso en la interfaz; no garantiza una conmutación sin demora ni la continuidad de reproducción |

## 3. Panorama de la arquitectura técnica

### 3.1 Plano de control (borde de Cloudflare)

El plano de control se ejecuta en Cloudflare Pages y Pages Functions y asume las funciones siguientes:

1. Enrutamiento y autenticación: punto de entrada unificado de las peticiones a la API, con comprobación de autenticación y verificación de claves firmadas;
2. Limitación de peticiones por niveles: 240 peticiones por minuto para solicitudes anónimas y 600 por minuto para las autenticadas (valores por defecto, configurables); los extremos de autenticación tienen además una limitación específica de 30 peticiones por minuto y por IP;
3. Caché multinivel: caché de borde con clave `sonic:*`, con una ventana de frescura de 8 minutos y, tras su caducidad, paso a un estado de conservación prorrogada para contingencias;
4. Disyuntor de tres estados: con 3 fallos consecutivos o llamadas que superen el presupuesto de 4,5 segundos pasa al estado OPEN; las peticiones siguientes ya no esperan al plano de datos fallido e intentan la vía de respaldo del borde (interfaces públicas de búsqueda de QQ y Kugou, y AMLL y LRCLIB), pero la red todavía puede introducir latencia; tras 30 segundos de enfriamiento entra en la sonda HALF_OPEN y se cierra al obtener éxito. Durante la degradación, la cabecera de respuesta indica `X-Sonic-Degraded: 1` y en la parte superior del reproductor se enciende una cápsula de aviso de degradación.

### 3.2 Plano de datos (motor de protocolos en Linux)

El plano de datos es una pila de Docker Compose en un nodo Linux propio del operador:

| Componente | Descripción |
| --- | --- |
| Contenedor principal sonic-engine | Servicio HTTP Node.js 22 que escucha en el puerto 8080, mapeado en el host únicamente a `127.0.0.1`; todas las rutas `/api`, `/proxy` y `/palette` exigen la verificación obligatoria de la clave entre servicios (X-Sonic-Engine-Key) |
| Contenedor auxiliar ncm-api | Servicio auxiliar del protocolo de NetEase Cloud Music, alcanzable únicamente dentro de la red interna de compose (`ncm-api:3000`), sin exposición a la Internet pública |
| SQLite 3 (modo WAL) | Almacenamiento persistente de los eventos de comportamiento y las ponderaciones de entidades, en el volumen con nombre `sonic-data` (`/app/data/sonic-recommend.sqlite` dentro del contenedor); las copias de seguridad se realizan mediante instantáneas coherentes (VACUUM INTO) con comprobación de integridad |
| Módulos de protocolo nativos | Análisis de protocolos implementado íntegramente en TypeScript: linuxapi/eapi de NetEase, QQ, KRC de Kugou y Kuwo |

El plano de control y el plano de datos se comunican por el túnel cifrado de Cloudflare Tunnel; el plano de datos no expone ningún puerto directamente a la Internet pública.

### 3.3 Ruta de la transmisión de audio

Las transmisiones de audio que pasan por el proxy de borde usan `Range` y `206 Partial Content`; en esas peticiones, el origen puede ver la dirección del proxy en lugar de la del cliente. No es una protección general de la IP: los MV, imágenes, avatares, Google Fonts y otros recursos directos pueden solicitarse desde el navegador. Una vía de DiceBear incluso envía el correo en texto claro como `seed` y debe corregirse. El modo `?mode=redirect` también establece una conexión directa; algunos enlaces de origen usan HTTP, sin garantía de cifrado de extremo a extremo.

## 4. Fuentes de audio y cadena de letras

| Fuente | Posición y proporción | Estado |
| --- | --- | --- |
| Análisis nativo local (interfaces oficiales de NetEase, QQ, Kugou y Kuwo + ncm-api) | Cadena principal (más del 90 %) | Activado por defecto |
| Letras palabra por palabra AMLL TTML + biblioteca de letras sincronizadas LRCLIB | Complemento de letras (aprox. 10 %) | Activado por defecto |
| Agregadores GDStudio y Lyriva | Vías opcionales | GDStudio se activa si falta el ajuste en el código, pero está desactivado en el ejemplo de entorno y Compose; verificar la instancia |
| Refuerzo de artistas similares ListenBrainz y MusicBrainz | Mejora opcional | Desactivado por defecto |

La detección de vistas previas sondea la duración y los metadatos de la entidad de audio para identificar el recorte oficial de vista previa de 30 segundos; el resultado se presenta de forma transparente en el frontal con el indicador de vista previa y puede activar el emparejamiento entre plataformas de la pista completa (sobre las pistas completas gratuitas de QQ, Kugou y Kuwo); si el emparejamiento tiene éxito, la conmutación es fluida y se indica la fuente sustituta. El proyecto no integra ningún componente de elusión de las protecciones de pago de los derechos.

## 5. Motor de recomendación inteligente

El motor principal de recomendación se ejecuta en el plano de datos del operador; eso no significa que el tratamiento quede en el navegador y pueden configurarse proveedores externos opcionales. La personalización y Auto DJ están activados por defecto en el código candidato, sin que ese valor pruebe consentimiento válido; las ponderaciones de las señales son públicas en el código fuente:

| Señal | Ponderación | Significado |
| --- | --- | --- |
| favorite (añadir a favoritos) | +4.0 | Positiva muy fuerte |
| replay (repetición) | +3.5 | Positiva fuerte |
| play_complete (finalización válida) | +2.5 | Positiva estándar |
| play_progress (escucha por progreso) | +0.2 ～ +1.8 | Puntuación escalonada según la proporción escuchada |
| skip (salto rápido) | -0.8 | Saltar tras escuchar más de la mitad computa +0.25 |
| dislike (rechazo explícito) | -5.0 | Filtrado duro e inclusión en la lista negra |

Depuración de ruido y de señales falsas: los saltos causados por cortes de red (network_stall), fallos de decodificación (playback_error), recortes de vista previa (trial_end), flujo no disponible (stream_unavailable), tiempo de espera de búfer agotado (buffer_timeout) o fallo de conmutación automática (auto_switch_error) tienen ponderación cero y no se almacenan.

El modelo de popularidad combina la reproducción válida (35 %), los oyentes independientes (25 %), el comportamiento de finalización (20 %), la conversión a favoritos (15 %) y la pendiente de crecimiento (5 %), con decaimiento temporal exponencial (lista de tendencias de 24 horas y lista acumulada de 7 días) y suavizado bayesiano y de Wilson Score; el cálculo de similitud fusiona el grafo de relaciones entre artistas con el coseno de características de audio, y reordena con la correlación marginal MMR para equilibrar precisión y diversidad. La intención de búsqueda de la sesión influye en el orden inmediato, pero las consultas también se cuentan por separado y pueden aparecer en sugerencias públicas; las solicitudes de recomendación pueden transmitir favoritos locales, artistas recientes y contexto de búsqueda. Los identificadores seudónimos siguen siendo potencialmente vinculables.

## 6. Panorama del diseño de seguridad

1. Autenticación: flujo de código de autorización OAuth 2.0 de Epomail, con el parámetro `state` y PKCE (S256) contra la interceptación y la reutilización del código; la cookie de transacción OAuth tiene una validez de 600 segundos;
2. Claves de API: credencial firmada `sonic_live_v2`, con formato versionado `sonic_live_v2.<header>.<payload>.<signature>` firmado con HMAC-SHA256, con carga que contiene `sub`, `iat`, `exp`, `jti`, `kid`, `role` y `uid`; validez de emisión predeterminada de 30 días; los 90 días son solo el máximo admitido por el validador, no un plazo de reemisión; el servidor compara en tiempo constante mediante Web Crypto y rechaza sin excepción las claves sin firma y las de versiones anteriores (fail-closed); las claves viajan únicamente por las cabeceras de petición `X-Sonic-Key` o `Authorization`; el canal de parámetros de consulta en la URL se ha eliminado por completo;
3. Revocación: cerrar sesión borra la cookie actual; la revocación en el servidor de credenciales copiadas depende del almacenamiento configurado y del éxito de la petición. Las listas de jti, de sujetos y la hora mínima de emisión deben verificarse en la instancia;
4. Sesiones: cookie `sonic_session` con atributos `HttpOnly; Secure; SameSite=Lax` y duración predeterminada de 30 días; la firma no cifra los datos. El almacenamiento local `auth` conserva, entre otros, el correo y el avatar, aunque los scripts no puedan leer la cookie HttpOnly;
5. Defensa SSRF: la RC contiene validaciones de destino específicas de determinadas rutas para direcciones de loopback, redes privadas, metadatos de nube y redirecciones. Debe verificarse la cobertura por ruta; no abarca todas las peticiones ni las conexiones directas del navegador.

## 7. Panorama del diseño de privacidad

1. Seudonimización: los identificadores hash o `anon_` siguen siendo potencialmente vinculables a una persona; el correo y el avatar se conservan, entre otros lugares, en `auth` de localStorage;
2. Personalización: el conmutador controla los eventos correspondientes, pero no basta para detener la recogida separada de búsquedas originales ni su aparición en sugerencias públicas. Los valores predeterminados y el inicio de sesión no equivalen a consentimiento para los perfiles opcionales;
3. Borrado: el restablecimiento solo cubre parte de los eventos y respuestas de la identidad actual; puede omitir identificadores anónimos antiguos, radar, agregados, servicios externos y copias de seguridad, y ocultar fallos. El borrado local no prueba la supresión remota;
4. Minimización de registros: no garantiza cero registros en el anfitrión ni en terceros; la limitación utiliza, entre otros, la IP sin transformar o claves KV y el borde transmite información de conexión al motor.

La formulación completa de los compromisos de privacidad figura en la [Política de privacidad](/es/privacy-policy/); las medidas técnicas, en [Tratamiento de datos y seguridad](/es/data-security/).

## 8. A quién conviene y a quién no

Conviene: a los oyentes individuales que desean iniciar sesión con su propia cuenta de Epomail y valoran la transparencia y la eliminabilidad del perfil de recomendación; a los melómanos intensivos que necesitan búsqueda agregada multifuente y letras palabra por palabra; a los usuarios de autoalojamiento con conocimientos básicos de Linux y Docker, dispuestos a asumir las responsabilidades del operador.

No conviene: a los escenarios que buscan las garantías de licenciamiento de un servicio musical comercial; el proyecto no ofrece una licencia de catálogo, pero existen vías de proxy, caché y almacenamiento local, por lo que no debe afirmarse una ausencia total de almacenamiento o transmisión de música; a los equipos que esperan un acuerdo de nivel de servicio (SLA) o soporte comercial; a los usuarios que no pueden aceptar que «las vistas previas se etiqueten con transparencia y el completado entre fuentes sea de mejor esfuerzo».

## 9. Límites de contenido y derechos de autor

Sonic es una herramienta de búsqueda, agregación y reproducción; los archivos importados y descargados pueden guardarse en el navegador. Los derechos de grabaciones, letras, portadas e imágenes pertenecen a sus titulares; no se concede licencia musical. Credenciales como `NETEASE_COOKIE` pueden dar acceso a la suscripción del desplegador, sin autorizar por ello su puesta a disposición pública. Ni la accesibilidad de una interfaz ni el uso personal, educativo o sin ánimo de lucro prueban una autorización o excepción a los derechos de autor.

Al utilizar este servicio debe observar la [Política de uso aceptable](/es/acceptable-use/); quien despliegue una instancia debe verificar por sí mismo que su escenario de uso cumple la legislación local, las condiciones de los servicios de origen y los requisitos de licenciamiento de contenidos.

## 10. Formas de despliegue

| Forma | Composición | Aspectos clave |
| --- | --- | --- |
| Pasarela de borde en Cloudflare Pages | SPA frontal + Pages Functions | Publicación tras la compilación con `wrangler pages deploy`; requiere configurar `SONIC_SECRET`, `SONIC_ENGINE_SECRET` y `SONIC_LOCAL_ENGINE_URL` |
| Motor de protocolos local en Linux | sonic-engine + ncm-api + SQLite | Despliegue con `docker compose up -d --build`; permisos 600 del `.env`; conexión mediante Cloudflare Tunnel |

Ambas formas constituyen conjuntamente el servicio completo; si solo se despliega la pasarela de borde sin plano de datos, el servicio funciona automáticamente en modo degradado de borde. La lista completa de variables de entorno figura en `.env.example` y `docs/OPERATIONS.md` del repositorio de origen.

## 11. Garantía de calidad

El proyecto fundamenta la calidad en la auditabilidad y la verificación automatizada:

1. Auditoría de seguridad y subsanación: el repositorio de origen incluye los informes de auditoría de seguridad (`SECURITY_AUDIT_REPORT.md`, `SECURITY_FIX_SUMMARY.md`) y un registro de subsanación punto por punto (`docs/AUDIT_REMEDIATION.md`), que cubren la firma de la API, el flujo OAuth, la defensa SSRF y el XSS del frontal, entre otros ámbitos;
2. Compuertas de pruebas automatizadas: la suite de pruebas cubre el comportamiento de la pasarela, la compatibilidad de autenticación, los casos SSRF, el motor local y la degradación, las recomendaciones y la búsqueda, el XSS del frontal, la paridad de configuración (config parity) y las compuertas de publicación P0/P1, y se ejecuta con cada versión;
3. Verificación de la coherencia documental: este sitio verifica automáticamente tres puntos: ausencia de enlaces rotos en las anclas internas y las referencias a imágenes, simetría estructural 1:1 entre las versiones lingüísticas y concordancia de las citas de artículos del RGPD con la lista blanca verificada;
4. Comprobación fáctica: esta revisión se basa en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), comprobada el 2026-11-02, distinta de la antigua `main@ce443c8` (2026-10-27 UTC); ninguna certifica el entorno en línea. Las contradicciones documentales deben corregirse; el código no sustituye una base lícita ni los compromisos y derechos aplicables.

## 12. Preguntas frecuentes

**¿El servicio es de pago? ¿Tiene publicidad?**
Este proyecto personal de pruebas es gratuito, sin publicidad ni compras integradas y sin ánimo de lucro; no ofrece SLA. El proyecto no tiene finalidad publicitaria.

**¿Puedo usarlo sin iniciar sesión?**
Las funciones básicas pueden usarse sin iniciar sesión, lo que no garantiza anonimato. La personalización y Auto DJ están activados por defecto en el código, sin consentimiento afirmativo demostrado; iniciar sesión no crea una sincronización general en la nube. El radar incluye lógica de sincronización, pero su ruta remota debe verificarse según el despliegue.

**¿Dónde se guardan mis datos?**
Los favoritos, listas y preferencias se guardan principalmente en el navegador; `auth` puede conservar el correo y el avatar. El cuerpo del audio y las portadas incrustadas están en IndexedDB, pero las imágenes de portada también pueden enviarse con eventos de favoritos y entrar en el catálogo remoto de pistas: no se garantiza que sean exclusivamente locales. Pueden transmitirse metadatos, señales y contexto de recomendación; también existen tratamientos remotos del radar y estadísticas de búsqueda. La RC prevé 90 días por defecto para los eventos, con un mínimo de 7 días, pero la limpieza y la supresión son incompletas. Véanse las secciones 4 y 6 de la [Política de privacidad](/es/privacy-policy/).

**¿Cómo elimino mi perfil de comportamiento?**
Use Ajustes → Privacidad y datos locales → «Restablecer el perfil de recomendación y el registro de no me gusta», o `DELETE /api/sonic/events`, sabiendo que el borrado es parcial y puede fallar sin aviso. Puede omitir identificadores anónimos antiguos, radar, agregados, servicios externos y copias de seguridad. Para una solicitud completa, contacte con `privacy@epocanvas.com`; véase la [Guía de la interfaz y funciones](/es/interface/).

**¿Las recomendaciones me rastrean?**
Constituyen perfiles de preferencias, sin finalidad publicitaria declarada. Desactivarlas actúa sobre los eventos correspondientes, no sobre todos los envíos: las búsquedas originales pueden seguir alimentando sugerencias públicas. El modo de incógnito no bloquea esas peticiones.

**¿Por qué algunas canciones duran solo 30 segundos?**
Es el recorte oficial de vista previa de la plataforma de origen; el reproductor lo etiqueta fielmente como vista previa y jamás lo presenta como pista completa; con el completado entre fuentes activado, intenta automáticamente emparejar una pista completa gratuita e indica la fuente.

**¿Son fiables las insignias de calidad de audio?**
Sí. La insignia refleja el nivel real de la transmisión de audio actual; cuando el nivel de origen cambia, la insignia lo sigue en tiempo real, sin sobredeclaración (véase la sección 4, punto 3, de los [Términos del servicio](/es/terms-of-service/)).

**¿Qué responsabilidades conlleva el autoalojamiento?**
Sus roles dependen de los fines y medios que decida realmente. Para un servicio público, compruebe la identidad del responsable, la ley aplicable, las elecciones previas, la seguridad, la conservación y la supresión; los registros, evaluaciones de impacto y garantías internacionales dependen de los requisitos legales aplicables. Véase [Tratamiento de datos y seguridad](/es/data-security/).

**¿En qué lenguas está disponible el servicio?**
El reproductor incorpora chino simplificado, inglés y japonés; esta documentación se ofrece en 10 lenguas.

## 13. Guía de lectura

| Documento | Contenido |
| --- | --- |
| [Descripción general](/es/overview/) | Identidad de la plataforma, roles de tratamiento de datos, mapa documental y orden de prevalencia |
| [Política de privacidad](/es/privacy-policy/) | Información sobre la recogida de datos, bases jurídicas, plazos de conservación y derechos de la persona interesada |
| [Términos del servicio](/es/terms-of-service/) | Condiciones contractuales de uso, limitación de responsabilidad y ley aplicable |
| [Política de uso aceptable](/es/acceptable-use/) | Límites de conducta, catálogo de conductas prohibidas, escala de aplicación y reclamaciones |
| [Tratamiento de datos y seguridad](/es/data-security/) | Ciclo de vida de los datos, matriz de tratamiento, medidas de seguridad y respuesta a incidentes |
| [Terceros y transferencias](/es/sub-processors/) | Destinatarios de la compartición, datos afectados y garantías de las transferencias internacionales |
| [Glosario](/es/key-terms/) | Términos jurídicos (vocabulario del RGPD) y términos técnicos |

Ruta de lectura: para conocer el producto y el despliegue, empiece en esta página; para conocer los compromisos de privacidad y condiciones, empiece en la [Descripción general](/es/overview/); para consultar términos concretos, vea el [Glosario](/es/key-terms/).
