---
title: Presentación del proyecto
description: "Presentación del proyecto epocanvas sonic: identidad del producto, funciones principales, arquitectura técnica, motor de recomendación, diseño de seguridad y privacidad, ámbito de aplicación, formas de despliegue y guía de lectura de la documentación."
---

**Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.4**

Esta página presenta el proyecto epocanvas sonic (en lo sucesivo, «Sonic» o «el proyecto»): su identidad como producto, sus funciones principales, su arquitectura del sistema, su diseño de seguridad y privacidad, su ámbito de aplicación y sus formas de despliegue, y ofrece una ruta de lectura de la documentación de este sitio. Tanto si pretende utilizar una instancia gestionada, como desplegar la suya propia o conocer los compromisos de privacidad y condiciones, puede empezar por esta página. Los compromisos legales de Sonic figuran en la [Política de privacidad](/es/privacy-policy/) y en los [Términos del servicio](/es/terms-of-service/).

![Arquitectura de dos planos de Sonic: los usuarios acceden al plano de control en el borde de Cloudflare (enrutamiento, limitación de peticiones, caché, corte de circuito); el plano de datos en Linux ejecuta el análisis de protocolos, el cálculo de recomendaciones y el almacenamiento SQLite; las transmisiones de audio se obtienen por defecto a través del proxy de borde desde los CDN oficiales](/images/sonic/project-architecture.svg)

*Figura: arquitectura de Sonic con separación entre plano de control y plano de datos. El plano de control se ejecuta en Cloudflare Pages en el borde; el plano de datos se ejecuta en un nodo Linux propio del operador, se comunica por un túnel cifrado y exige la verificación de la clave entre servicios; las transmisiones de audio se obtienen por defecto del CDN oficial a través del proxy de borde (Range 206), con un modo de conexión directa 302 opcional.*

## 1. Posicionamiento del proyecto

Sonic es una plataforma de streaming musical multifuente y una pasarela de agregación desarrolladas de forma independiente, que funcionan con una arquitectura de dos planos, «plano de control en el borde de Cloudflare + plano de datos con motor de protocolos local en Linux», concebida para el streaming de alta calidad de audio, las letras palabra por palabra con precisión de milisegundos y una experiencia de recomendación autónoma y controlable. El proyecto es software de código abierto; su código fuente se publica abiertamente y cualquier persona puede desplegarlo.

| Elemento | Descripción |
| --- | --- |
| Instancia gestionada | `sonic.epocanvas.tech` (sitio principal) y `sonic.epocanvas.com` (espejo de respaldo), operadas por el equipo de operaciones |
| Instancia de autoalojamiento | Instancia privada que cualquier persona u organización despliega en sus propios servidores a partir del código abierto; quien la despliega es su operador y responsable del tratamiento |
| Licencia del código fuente | Rige el archivo `LICENSE` de la raíz del repositorio (MIT License); el proyecto se posiciona como un proyecto de código abierto no comercial, y README históricos declararon la intención de aplicar CC BY-NC-SA 4.0; mientras el mantenimiento no resuelva lo contrario, rige el archivo `LICENSE`; las marcas y los signos de identidad de marca no se licencian con el código fuente |
| Método de inicio de sesión | OAuth 2.0 (PKCE) de Epomail; el proyecto no dispone de un sistema de registro independiente |
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
| Gestión autónoma de eventos de comportamiento | Las señales de reproducción, finalización, salto, favorito y rechazo pueden desactivarse en cualquier momento; el «borrado del perfil con un solo clic» destruye de inmediato en el servidor todos los registros de comportamiento |
| Seguridad de confianza cero | Claves de API firmadas versionadas con HMAC-SHA256, OAuth con PKCE, intercepción SSRF en toda la cadena; las claves viajan únicamente en cabeceras de petición |
| Degradación con continuidad | Cuando el plano de datos queda fuera de línea, la capa de borde conmuta al modo degradado en 0 ms; la interfaz muestra de forma inequívoca el «modo degradado de borde», garantizando la reproducción estable de las pistas ya cargadas |

## 3. Panorama de la arquitectura técnica

### 3.1 Plano de control (borde de Cloudflare)

El plano de control se ejecuta en Cloudflare Pages y Pages Functions y asume las funciones siguientes:

1. Enrutamiento y autenticación: punto de entrada unificado de las peticiones a la API, con comprobación de autenticación y verificación de claves firmadas;
2. Limitación de peticiones por niveles: 240 peticiones por minuto para solicitudes anónimas y 600 por minuto para las autenticadas (valores por defecto, configurables); los extremos de autenticación tienen además una limitación específica de 30 peticiones por minuto y por IP;
3. Caché multinivel: caché de borde con clave `sonic:*`, con una ventana de frescura de 8 minutos y, tras su caducidad, paso a un estado de conservación prorrogada para contingencias;
4. Disyuntor de tres estados: con 3 fallos consecutivos o llamadas que superen el presupuesto de 4,5 segundos pasa al estado OPEN; las peticiones siguientes conmutan en 0 ms a la reserva directa del borde (interfaces públicas de búsqueda de QQ y Kugou, y AMLL y LRCLIB); tras 30 segundos de enfriamiento entra en la sonda HALF_OPEN y se cierra al obtener éxito. Durante la degradación, la cabecera de respuesta indica `X-Sonic-Degraded: 1` y en la parte superior del reproductor se enciende una cápsula de aviso de degradación.

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

Las transmisiones de audio se obtienen por defecto del CDN oficial a través del proxy de borde (proxy de rangos de bytes del mismo origen), con soporte de `Range` HTTP y `206 Partial Content` para la carga por segmentos: el CDN de origen solo ve la dirección del servidor proxy y no contacta con la IP del cliente. El modo de conexión directa 302 de `?mode=redirect` se ofrece únicamente a los usuarios de la API que lo invoquen explícitamente (el reproductor web no lo utiliza); en el modo directo, su navegador establece la conexión directamente con el CDN oficial.

## 4. Fuentes de audio y cadena de letras

| Fuente | Posición y proporción | Estado |
| --- | --- | --- |
| Análisis nativo local (interfaces oficiales de NetEase, QQ, Kugou y Kuwo + ncm-api) | Cadena principal (más del 90 %) | Activado por defecto |
| Letras palabra por palabra AMLL TTML + biblioteca de letras sincronizadas LRCLIB | Complemento de letras (aprox. 10 %) | Activado por defecto |
| Agregador de terceros GDStudio y Lyriva | Reserva de emergencia | Desactivado estrictamente por defecto |
| Refuerzo de artistas similares ListenBrainz y MusicBrainz | Mejora opcional | Desactivado por defecto |

La detección de vistas previas sondea la duración y los metadatos de la entidad de audio para identificar el recorte oficial de vista previa de 30 segundos; el resultado se presenta de forma transparente en el frontal con el indicador de vista previa y puede activar el emparejamiento entre plataformas de la pista completa (sobre las pistas completas gratuitas de QQ, Kugou y Kuwo); si el emparejamiento tiene éxito, la conmutación es fluida y se indica la fuente sustituta. El proyecto no integra ningún componente de elusión de las protecciones de pago de los derechos.

## 5. Motor de recomendación inteligente

El motor de recomendación se ejecuta íntegramente en el plano de datos local; las ponderaciones de las señales de comportamiento son públicas en el código fuente:

| Señal | Ponderación | Significado |
| --- | --- | --- |
| favorite (añadir a favoritos) | +4.0 | Positiva muy fuerte |
| replay (repetición) | +3.5 | Positiva fuerte |
| play_complete (finalización válida) | +2.5 | Positiva estándar |
| play_progress (escucha por progreso) | +0.2 ～ +1.8 | Puntuación escalonada según la proporción escuchada |
| skip (salto rápido) | -0.8 | Saltar tras escuchar más de la mitad computa +0.25 |
| dislike (rechazo explícito) | -5.0 | Filtrado duro e inclusión en la lista negra |

Depuración de ruido y de señales falsas: los saltos causados por cortes de red (network_stall), fallos de decodificación (playback_error), recortes de vista previa (trial_end), flujo no disponible (stream_unavailable), tiempo de espera de búfer agotado (buffer_timeout) o fallo de conmutación automática (auto_switch_error) tienen ponderación cero y no se almacenan.

El modelo de popularidad combina la reproducción válida (35 %), los oyentes independientes (25 %), el comportamiento de finalización (20 %), la conversión a favoritos (15 %) y la pendiente de crecimiento (5 %), con decaimiento temporal exponencial (lista de tendencias de 24 horas y lista acumulada de 7 días) y suavizado bayesiano y de Wilson Score; el cálculo de similitud fusiona el grafo de relaciones entre artistas con el coseno de características de audio, y reordena con la correlación marginal MMR para equilibrar precisión y diversidad. La intención de búsqueda a nivel de sesión y las preferencias a largo plazo quedan desacopladas por capas: solo los comportamientos de alto valor, como las finalizaciones y los favoritos, se depositan en el perfil a largo plazo.

## 6. Panorama del diseño de seguridad

1. Autenticación: flujo de código de autorización OAuth 2.0 de Epomail, con el parámetro `state` y PKCE (S256) contra la interceptación y la reutilización del código; la cookie de transacción OAuth tiene una validez de 600 segundos;
2. Claves de API: formato versionado `sonic_live_v2.<header>.<payload>.<signature>` firmado con HMAC-SHA256, con carga que contiene `sub`, `iat`, `exp`, `jti`, `kid`, `role` y `uid`; validez de emisión de 30 días y tope de validación de 90 días; el servidor compara en tiempo constante mediante Web Crypto y rechaza sin excepción las claves sin firma y las de versiones anteriores (fail-closed); las claves viajan únicamente por las cabeceras de petición `X-Sonic-Key` o `Authorization`; el canal de parámetros de consulta en la URL se ha eliminado por completo;
3. Revocación: cerrar la sesión revoca de inmediato la sesión actual y el identificador de clave (jti); se admiten la lista de revocación de jti, la lista de revocación de sujetos y el mínimo global de tiempo de emisión, con revocación inmediata cuando hay vinculada una KV;
4. Sesiones: cookie `sonic_session` con atributos `HttpOnly; Secure; SameSite=Lax`, válida como máximo 30 días; las claves nunca se escriben en la URL, en localStorage ni en lugares accesibles a los scripts de la página;
5. Defensa SSRF: las peticiones salientes a direcciones de loopback, rangos privados RFC 1918, puentes internos de Docker y direcciones de metadatos en la nube (como `169.254.169.254`) se bloquean sin excepción, con verificación en pila dual IPv4 e IPv6 y nueva verificación del destino y de la resolución DNS en cada redirección.

## 7. Panorama del diseño de privacidad

1. Seudonimización por defecto: los eventos de comportamiento se asocian desde el momento de su recogida a identificadores hash unidireccionales; las direcciones de correo electrónico nunca se persisten;
2. Conmutador autónomo de personalización: la personalización puede desactivarse en cualquier momento en los ajustes del reproductor; desactivada, los eventos no se almacenan y, en modo público, se descartan directamente en el servidor;
3. Borrado con un solo clic: «Borrar el perfil de recomendación» en la página de ajustes destruye de inmediato en el servidor todos los eventos de comportamiento; «Borrar todos los datos locales» borra de inmediato el almacenamiento local del navegador y IndexedDB;
4. Minimización de registros: los registros de acceso del plano de datos contienen únicamente la ruta, el método, el código de estado y la duración.

La formulación completa de los compromisos de privacidad figura en la [Política de privacidad](/es/privacy-policy/); las medidas técnicas, en [Tratamiento de datos y seguridad](/es/data-security/).

## 8. A quién conviene y a quién no

Conviene: a los oyentes individuales que desean iniciar sesión con su propia cuenta de Epomail y valoran la transparencia y la eliminabilidad del perfil de recomendación; a los melómanos intensivos que necesitan búsqueda agregada multifuente y letras palabra por palabra; a los usuarios de autoalojamiento con conocimientos básicos de Linux y Docker, dispuestos a asumir las responsabilidades del operador.

No conviene: a los escenarios que buscan las garantías de licenciamiento de un servicio musical comercial, pues el proyecto no almacena ni aloja música ni concede sublicencia alguna de contenido; a los equipos que esperan un acuerdo de nivel de servicio (SLA) o soporte comercial; a los usuarios que no pueden aceptar que «las vistas previas se etiqueten con transparencia y el completado entre fuentes sea de mejor esfuerzo».

## 9. Límites de contenido y derechos de autor

Sonic es una herramienta de búsqueda, agregación y reproducción que no almacena ni aloja ningún archivo musical. Los derechos sobre las grabaciones, las letras, las portadas, las imágenes de artistas y demás contenidos pertenecen a sus respectivos titulares; el proyecto no concede sublicencia alguna sobre contenido musical. Las pistas de las suscripciones legítimas se montan por quien despliega con sus propias credenciales autorizadas (como `NETEASE_COOKIE`, que pertenece a la cuenta del desplegador y no a cuentas de usuarios finales), y las pistas públicas se rigen por los protocolos abiertos oficiales.

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
4. Proceso de comprobación fáctica: todos los hechos de tratamiento de datos de este sitio se contrastan con el código fuente en cada versión (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`, entre otros); cuando el código y la documentación discrepan, prevalece el código y la documentación se corrige de inmediato.

## 12. Preguntas frecuentes

**¿El servicio es de pago? ¿Tiene publicidad?**
Gratuito, sin publicidad ni compras integradas; los costes de operación de las instancias gestionadas los asume el equipo de operaciones. El servicio no recopila ningún dato con fines publicitarios.

**¿Puedo usarlo sin iniciar sesión?**
Sí. La búsqueda, la reproducción, las letras, las listas de éxitos y demás funciones principales están disponibles de forma anónima (con limitación de peticiones más estricta); iniciar sesión desbloquea la sincronización en la nube de favoritos, la recomendación personalizada y Auto DJ.

**¿Dónde se guardan mis datos?**
En tres lugares: los favoritos, las listas de reproducción y las preferencias del reproductor se guardan en el almacenamiento local de su navegador; las descargas y la música local, en el IndexedDB de su navegador; el servidor solo conserva eventos de comportamiento seudonimizados (destruidos automáticamente a los 90 días). Las direcciones de correo electrónico nunca se persisten. Véase la sección 4 de la [Política de privacidad](/es/privacy-policy/).

**¿Cómo elimino mi perfil de comportamiento?**
Ajustes → Privacidad y datos locales → «Restablecer el perfil de recomendación y el registro de no me gusta», o mediante la llamada directa a `DELETE /api/sonic/events`, con efecto inmediato; «Borrar todos los datos locales» borra a la vez los datos del navegador y los del servidor. La ubicación en la interfaz consta en la sección 9 de la [Guía de la interfaz y funciones](/es/interface/).

**¿Las recomendaciones me rastrean?**
Las recomendaciones solo sirven para ordenar la reproducción: sin rastreo entre sitios ni perfiles publicitarios; la personalización puede desactivarse en cualquier momento y, desactivada, el servicio pasa a modo puramente público y deja de registrar cualquier evento.

**¿Por qué algunas canciones duran solo 30 segundos?**
Es el recorte oficial de vista previa de la plataforma de origen; el reproductor lo etiqueta fielmente como vista previa y jamás lo presenta como pista completa; con el completado entre fuentes activado, intenta automáticamente emparejar una pista completa gratuita e indica la fuente.

**¿Son fiables las insignias de calidad de audio?**
Sí. La insignia refleja el nivel real de la transmisión de audio actual; cuando el nivel de origen cambia, la insignia lo sigue en tiempo real, sin sobredeclaración (véase la sección 4, punto 3, de los [Términos del servicio](/es/terms-of-service/)).

**¿Qué responsabilidades conlleva el autoalojamiento?**
Desde el momento del despliegue, usted es el responsable del tratamiento de esa instancia: debe informar a sus usuarios, mantener los registros de tratamiento, practicar una evaluación de impacto cuando sea necesario y aplicar las medidas de seguridad. El punto de partida está en la sección 6 de [Tratamiento de datos y seguridad](/es/data-security/).

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
