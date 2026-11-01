---
title: Términos del servicio
description: "Términos del servicio de Sonic: aceptación de las condiciones, detalle del alcance del servicio, reglas de cuenta, autorización de los datos de comportamiento, calidad e indicadores de vista previa, limitación de responsabilidad, ley aplicable y resolución de controversias."
---

**Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.4**

Estas condiciones constituyen el acuerdo entre usted y el operador de la instancia que utilice sobre el uso del servicio Sonic (en lo sucesivo, «el servicio»). Al completar el inicio de sesión o utilizar el servicio por cualquier otra vía, declara que ha leído y acepta la totalidad de estas condiciones; si no está de acuerdo, no utilice el servicio.

Estas condiciones son condiciones generales, publicadas íntegramente para su examen, y las versiones anteriores se archivan con el repositorio de código abierto. Su aceptación electrónica tiene la misma eficacia que un documento y una firma en soporte papel. Los derechos que la legislación aplicable no permita excluir o limitar mediante condiciones generales no quedan afectados por estas condiciones. Los documentos legales de este sitio tienen como versión oficial la versión en chino simplificado; las versiones en las demás lenguas, incluida la presente versión en español, son traducciones de referencia y, en caso de duda en la interpretación, prevalece la versión oficial.

![Ciclo de vida contractual de los Términos del servicio de Sonic: consentimiento electrónico (aceptación al iniciar sesión) → cumplimiento (seguridad de la cuenta, sus contenidos, limitación de responsabilidad) → modificación (anuncio previo de los cambios sustanciales) → terminación (cese de uso, borrado del perfil con un solo clic), sobre la base de la ley aplicable y la línea base de protección de datos](/images/sonic/tos-contract.svg)

*Figura: ciclo de vida del contrato, desde su perfeccionamiento hasta su terminación. El consentimiento electrónico equivale al escrito; el alcance del servicio consta en la sección 2, la cuenta en la sección 3, sus contenidos y datos de comportamiento en la sección 5, la limitación de responsabilidad en la sección 10, la modificación en la sección 12, y la ley aplicable y la resolución de controversias en la sección 11.*

## 1. Definiciones

1. El servicio: el conjunto de funciones que se ejecutan sobre una instancia de Sonic, incluidos el reproductor web, la pasarela de borde, el motor de protocolos local, la API abierta y demás componentes; la disposición de la interfaz y la ubicación de las funciones constan en la [Guía de la interfaz y funciones](/es/interface/).
2. Operador: la persona o el equipo que despliega y explota la instancia que usted utilice. En las instancias gestionadas (`sonic.epocanvas.tech`, `sonic.epocanvas.com`) se refiere al equipo de operaciones; en las instancias de autoalojamiento, a quien las despliega.
3. Usted (usuario): la persona física u organización que inicia sesión o usa el servicio por cualquier otra vía.
4. Perfeccionamiento del contrato: usted celebra el contrato con el operador de la instancia en la que inicie sesión. Estas condiciones son una plantilla general: se aplican directamente a las instancias gestionadas; los operadores de autoalojamiento pueden modificarlas y adoptarlas como condiciones de su sitio, y deben cumplir ante sus usuarios los deberes de información exigidos por la legislación aplicable de su lugar.
5. Plano de datos: el nodo Linux que presta a su instancia el análisis de protocolos y el cálculo de recomendaciones; su ausencia no afecta al servicio degradado que usted obtiene conforme al punto 2 de la sección 4.

## 2. Descripción y alcance del servicio

El servicio es una herramienta de búsqueda, agregación y reproducción que no almacena ni aloja ningún archivo musical; el contenido de audio se obtiene de los CDN oficiales y de las interfaces abiertas de origen, y las letras, del análisis nativo y de las bibliotecas públicas de letras. El alcance de cada función y el lugar de los datos son los siguientes:

| Categoría de función | Funciones incluidas | Lugar de almacenamiento de los datos | ¿Requiere inicio de sesión? |
| --- | --- | --- | --- |
| Funciones principales (uso anónimo) | Búsqueda agregada multifuente, letras palabra por palabra, reproducción por niveles de calidad, indicadores de vista previa, listas de éxitos, MV | Navegador local (estado de reproducción) | No |
| Funciones de cuenta | Sincronización en la nube de favoritos y listas, recomendación personalizada y Auto DJ, gestión de eventos de comportamiento | El servidor solo conserva eventos de comportamiento seudonimizados; las preferencias de favoritos, en el navegador | Sí |
| Funciones de datos personales | Lista de descargas, importación y gestión de música local | IndexedDB del navegador | No |
| API abierta | Acceso de clientes de terceros mediante claves de API firmadas | Sesiones y lista de revocación en el servidor | Sí |

El servicio se construye sobre un proyecto de código abierto y continúa siéndolo: el código fuente es público y auditable, y usted puede desplegarlo por sí mismo para obtener capacidades equivalentes. El software se presta «tal cual»; sus términos de licencia concuerdan con la regulación de responsabilidad de estas condiciones (véase la sección 10).

## 3. Obtención y seguridad de la cuenta

1. Método de inicio de sesión: el servicio inicia sesión con cuenta de Epomail mediante OAuth 2.0 (PKCE) y no dispone de sistema de registro independiente; el acuerdo de cuenta entre usted y Epomail se rige por las condiciones de ese servicio. Si la cuenta de Epomail se congela o se da de baja, su inicio de sesión en este servicio cesa con ella.
2. Requisito de edad: usted debe tener 16 años cumplidos; si la ley de su lugar fija otra edad de consentimiento para los servicios de la sociedad de la información, se aplica la edad inferior (mínimo 13 años), y siendo usted un menor sigue siendo necesario el consentimiento del tutor. La edad se toma de los datos de la cuenta de Epomail con la que usted inicie sesión; el servicio no dispone de mecanismo independiente de verificación de edad.
3. Una cuenta por persona: usted no puede prestar, alquilar, vender ni compartir la cuenta; el operador no responde de discriminar ni de recuperar las controversias y las mezclas de datos derivadas de la compartición de cuentas.
4. Custodia de credenciales: usted responde de la custodia de las credenciales de su cuenta de Epomail, de las claves de API y de la seguridad de la sesión. Las operaciones realizadas con sus credenciales se presumen realizadas por usted. Las cookies de sesión contienen claves firmadas: no abandone un dispositivo compartido sin cerrar sesión; si detecta una fuga de credenciales, cierre la sesión y solicite la revocación de inmediato.
5. Mecanismo de sesión: tras iniciar la sesión se emite la cookie de sesión con atributos `HttpOnly; Secure; SameSite=Lax` (válida como máximo 30 días); las claves de API no se escriben en la URL, en parámetros de consulta ni en localStorage. Puede cerrar sesión en cualquier momento, y al hacerlo se revocan de inmediato la sesión actual y el identificador de clave correspondiente (jti).
6. Emisión de claves: las claves de API adoptan el formato versionado de firma HMAC-SHA256, con validez de emisión de 30 días y tope de validación de 90 días; las claves sin firma o revocadas se rechazan sin excepción. Para volver a emitir una clave debe aportar la clave vigente actual. La clave de API es una credencial de uso personal; no puede entregarla a terceros ni incrustarla en clientes de distribución pública.
7. Protección del inicio de sesión: la devolución de llamada de OAuth se verifica en cuatro niveles (state, PKCE, código de autorización y reutilización); los extremos de autenticación tienen una limitación de 30 peticiones por minuto y por IP.

## 4. Prestación y cambio del servicio

1. Disponibilidad: el operador emplea esfuerzos razonables para mantener la disponibilidad, pero no promete niveles concretos de disponibilidad, tiempos de amortiguación ni plazos de recuperación, y no presta acuerdos de nivel de servicio (SLA).
2. Mecanismo de degradación: cuando el nodo del plano de datos acumula 3 fallos consecutivos o una llamada supera el presupuesto de 4,5 segundos, la capa de borde abre el disyuntor y conmuta automáticamente al modo degradado (conexión directa a las interfaces públicas de letras y búsqueda); tras 30 segundos de enfriamiento se realiza la sonda y se recupera; durante la degradación, la interfaz muestra el aviso de «modo degradado de borde» y algunas funciones (como el análisis completo de fuentes o la actualización de recomendaciones) pueden no estar disponibles. Se trata de un comportamiento de contingencia del diseño del sistema y no constituye incumplimiento.
3. Calidad e indicadores de vista previa: las insignias de calidad del reproductor (como SQ sin pérdida, HQ alta calidad) reflejan fielmente el nivel real de la transmisión de audio actual; los fragmentos de vista previa oficiales de 30 segundos se señalan expresamente como tales y no se presentan como pistas completas. Cuando el nivel de la fuente de origen cambia, la calidad realmente disponible cambia con él, sin que ello constituya incumplimiento.
4. Cambios de funciones: el proyecto de código abierto evoluciona de forma continua y las funciones pueden añadirse, ajustarse o retirarse; los cambios sustanciales que afecten a la capacidad de borrado de datos se anunciarán previamente.
5. Mantenimiento e interrupciones: el operador puede suspender parte o la totalidad del servicio por actualizaciones, reparaciones o tratamiento de abusos; la indisponibilidad causada por fallos de Cloudflare, de las interfaces musicales de origen o de los CDN no constituye incumplimiento del operador.
6. Funciones experimentales: las funciones marcadas como experimentales o en periodo de pruebas se prestan tal cual, pueden ser inestables y pueden ajustarse o retirarse en cualquier momento.

## 5. Sus contenidos y datos de comportamiento

1. Favoritos y preferencias: los favoritos, las listas de reproducción y las preferencias del reproductor que usted cree se guardan en el almacenamiento local de su navegador; se eliminan al borrar los datos del navegador o al usar «Borrar todos los datos locales»; el operador no responde de su pérdida, y le conviene registrar por su cuenta las listas importantes.
2. Música local y descargas: los archivos de música local que usted importe y las canciones descargadas se guardan en el IndexedDB de su navegador; esos contenidos son suyos y los servidores del operador no conservan copia. Los archivos descargados o importados localmente son solo para su escucha personal; usted no puede redistribuirlos, difundirlos públicamente ni usarlos con fines comerciales.
3. Autorización de los eventos de comportamiento: para prestar la función de recomendación, el servicio registra eventos de comportamiento cuando usted reproduce, completa, salta, añade a favoritos o rechaza pistas (las categorías de señales y sus ponderaciones son públicas en el código fuente). Si desactiva la personalización o usa el modo puramente local o de incógnito, no se generan nuevos registros de eventos; mientras esté activada, la autorización anterior se limita al alcance necesario para la función de recomendación y termina cuando usted destruye todos los registros con el «borrado del perfil con un solo clic».
4. Responsabilidad por los contenidos: usted responde de los contenidos que envíe por sí mismo (como los nombres personalizados de las listas o el comportamiento de sus llamadas a la API); las controversias y las responsabilidades legales derivadas de esos contenidos son de su cargo.
5. Contenido musical: los derechos sobre las grabaciones, las letras, las portadas y demás contenidos pertenecen a sus respectivos titulares. El servicio no concede sublicencia alguna sobre contenido musical; la responsabilidad de escuchar legalmente en su lugar recae en usted.

## 6. Servicios de terceros

1. Fuentes musicales de origen: la búsqueda, las direcciones de reproducción y las letras se obtienen de las interfaces abiertas oficiales de NetEase, QQ, Kugou, Kuwo y otras, y de bibliotecas públicas de letras como AMLL y LRCLIB; las interfaces de terceros pueden cambiar, limitarse o cesar, y el operador no garantiza la disponibilidad de origen.
2. Proxy de borde: las transmisiones de audio se obtienen por defecto a través del proxy de borde y el CDN de origen no contacta con su dirección IP; si usted usa por sí mismo el modo directo `?mode=redirect`, su navegador establece la conexión directamente con el CDN oficial y su IP es visible para ese CDN.
3. Verificación de identidad: Epomail es el proveedor de identidad del servicio; su tratamiento de datos consta en [Terceros y transferencias](/es/sub-processors/).
4. Condiciones de terceros: al utilizar los servicios anteriores, usted queda asimismo vinculado por las condiciones de esos terceros.

## 7. Uso aceptable

Al utilizar el servicio debe observar la totalidad de la [Política de uso aceptable](/es/acceptable-use/), incluida la prohibición de abusar de los recursos de las interfaces, atacar el sistema, difundir contenidos ilícitos o perturbar el uso por terceros. En caso de incumplimiento, el operador puede tramitarlo según el procedimiento previsto en esa política, hasta terminar el derecho de uso, y conservar las pruebas conforme a la ley y colaborar con las investigaciones de las autoridades competentes.

## 8. Conservación, retirada de datos y fin del uso

1. Terminación por usted: puede dejar de usar el servicio en cualquier momento; borre los registros de comportamiento con el «borrado del perfil con un solo clic» y cierre la sesión para revocarla. La baja de la propia cuenta de Epomail se rige por las reglas de Epomail.
2. Registros de comportamiento: los eventos de comportamiento se guardan en el almacenamiento SQLite del plano de datos y se destruyen automáticamente 90 días después de su registro (configurable por el desplegador, mínimo 7 días); si usted solicita el borrado o lo ejecuta, se destruyen de inmediato. No existe perfil comercial de largo plazo creado automáticamente.
3. Terminación por el operador: si usted infringe la [Política de uso aceptable](/es/acceptable-use/), el operador puede suspender o terminar su derecho de uso conforme a esa política.
4. Conservación legal: cuando la ley o un procedimiento judicial exijan conservar datos, el operador puede aplazar la supresión en la medida necesaria y tramitarlos por el procedimiento legal.

## 9. Notificación y recursos contra las medidas

Antes de suspender o terminar su derecho de uso conforme a la sección de uso aceptable o a la sección anterior, salvo situación de urgencia (como un ataque en curso), el operador debe notificárselo y darle oportunidad de explicar o subsanar. Si considera que la medida es errónea, puede reclamar por el procedimiento de la sección de reclamaciones de la [Política de uso aceptable](/es/acceptable-use/), y el operador debe revisar y responder en un plazo razonable.

Las notificaciones previstas en estas condiciones se hacen por vía electrónica; la cuenta de Epomail con la que usted inicia sesión es el lugar de notificación electrónico, y usted debe mantenerla operativa para la recepción.

## 10. Renuncia de garantías y limitación de responsabilidad

1. Prestación tal cual: el servicio (incluido su software) se presta «tal cual» y «según disponibilidad», sin garantía alguna expresa o implícita, incluidas las garantías de comercialización, de aptitud para un fin concreto y de no infracción; coincide con el alcance de exoneración de la licencia MIT que adopta el software.
2. Límite de eficacia: lo dispuesto en el punto anterior, y las demás cláusulas que exoneren o atenúen la responsabilidad del operador, agraven la suya o limiten sus derechos, no surten efecto en la parte que, según las circunstancias, resulte manifiestamente injusta o que la legislación aplicable no admita.
3. Limitación de responsabilidad: en la máxima medida permitida por la ley, la responsabilidad acumulada del operador frente a usted se limita al importe mayor entre lo que usted haya pagado efectivamente al operador en los últimos 12 meses (en los servicios gratuitos, normalmente cero) y 100 dólares estadounidenses. El operador no responde de los daños indirectos, la pérdida de datos, la pérdida de negocio ni el menoscabo de la buena voluntad comercial.
4. Responsabilidad legal no limitada: las responsabilidades que la legislación aplicable no permita excluir o limitar por pacto (incluidas las derivadas de que el operador incumpla sus deberes de protección de datos) no quedan exoneradas ni limitadas por el tope anterior.
5. Fuerza mayor: el operador, previa dedicación de esfuerzos razonables, no responde de las interrupciones del servicio ni de las pérdidas de datos causadas por catástrofes naturales, actos de gobierno, fallos de redes troncales, ciberataques a gran escala o cese de las interfaces de origen o de los CDN.

## 11. Ley aplicable, resolución de controversias y supervisión de la protección de datos

1. La interpretación, la validez y el cumplimiento de estas condiciones se rigen por la ley del lugar del operador: en las instancias gestionadas, la ley de Taiwán; en las de autoalojamiento, la del lugar del desplegador.
2. Las controversias derivadas de estas condiciones se resolverán primero por negociación; si esta fracasa, en las instancias gestionadas el tribunal de primera instancia competente es el Tribunal de Primera Instancia de Taipéi (Taiwán). Si usted es consumidor y la ley de su lugar establece otra jurisdicción imperativa u otras normas de protección del consumidor, prevalecen estas.
3. La protección de datos no queda rebajada por los dos puntos anteriores: el servicio adopta el RGPD como norma mínima de protección de datos para todos los usuarios (véase la sección 4 de la [Descripción general](/es/overview/)); los usuarios de la Unión Europea y del Espacio Económico Europeo disfrutan de todos los derechos y recursos enumerados en la [Política de privacidad](/es/privacy-policy/) respecto de sus datos personales.

## 12. Modificación de las condiciones

Estas condiciones pueden modificarse con la evolución del servicio. Los cambios sustanciales se anunciarán previamente en el sitio, actualizándose la fecha de entrada en vigor y el número de versión de la parte superior de esta página. Si tras la entrada en vigor de un cambio usted sigue utilizando el servicio, se entenderá que acepta las condiciones revisadas; si no está de acuerdo, debe dejar de usarlo y borrar o exportar sus datos. Las versiones anteriores de las modificaciones sustanciales se archivan con el historial de versiones del repositorio de código abierto; las condiciones modificadas se publican, conforme a lo indicado, para su examen antes de su entrada en vigor.

## 13. Contacto

- Instancia gestionada: `admin@epocanvas.com`; privacidad y protección de datos, `privacy@epocanvas.com`
- Proyecto de código abierto: Issues del repositorio de GitHub (`github.com/shijianus/sonic`)
- Sitios de autoalojamiento: diríjase al operador publicado en ese sitio

---

*Estas condiciones, junto con la [Política de privacidad](/es/privacy-policy/) y la [Política de uso aceptable](/es/acceptable-use/), constituyen el acuerdo completo entre usted y el operador; el orden de aplicación entre los documentos consta en la [Descripción general](/es/overview/). Este documento es una plantilla general elaborada por la comunidad de código abierto y no constituye asesoramiento jurídico; el operador debe consultar a un abogado y ajustarla a su negocio real antes de operar formalmente.*
