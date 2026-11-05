---
title: Política de uso aceptable
description: Límites de conducta sobre recursos alojados de Sonic, restricciones al abuso del sistema, contenidos y derechos ajenos, medidas y canales de reclamación.
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta política se aplica a las instancias de pruebas alojadas que Sonic opere efectivamente y a sus API públicas, para proteger los recursos compartidos, los usuarios y los servicios de origen. Es la regla de conducta relacionada con los [Términos del servicio](/es/terms-of-service/); si no la acepta, deje de utilizar la instancia alojada. No convierte la gratuidad, el carácter no lucrativo o el código abierto en una garantía incondicional de seguridad ni sustituye a la [Política de privacidad](/es/privacy-policy/) o a [Tratamiento de datos y seguridad](/es/data-security/).

Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea. El chino simplificado es la referencia de mantenimiento en la raíz; las otras nueve versiones lingüísticas son traducciones. La prioridad lingüística no reduce las normas imperativas ni el derecho de los consumidores a condiciones claras y comprensibles.

![Límites de uso y medidas de Sonic: uso normal, protección de recursos, limitación, suspensión, terminación y revisión](/images/sonic/aup-ladder.svg)

*Figura: las medidas consideran la conducta, el impacto, la repetición y el riesgo; el esquema no es una tabla fija de sanciones ni una promesa de plazos.*

## 1. Ámbito de aplicación

1. Esta política se aplica al uso del reproductor web Sonic alojado, la API pública, inicio de sesión, búsqueda, reproducción, letras, recomendaciones y otros extremos públicos.
2. Los despliegues propios son instancias independientes. Quien despliega debe determinar sus políticas, configuración, leyes y relación con los usuarios; esta página no asume por él obligaciones operativas ni contractuales.
3. En la RC `a75f5cb`, los archivos `LICENSE` de la raíz y del reproductor utilizan MIT, que permite copiar, modificar, distribuir y utilizar comercialmente el código conforme a sus condiciones. En la antigua `main@ce443c8` solo es verificable la licencia MIT del reproductor y no se encontró `LICENSE` en la raíz; no puede atribuirse MIT a todo el código histórico. Esta política protege la instancia alojada y sus recursos, sin prohibir en general los usos comerciales autorizados por la licencia aplicable.
4. En la comprobación actual de importación de música local no se ha encontrado una vía que suba el Blob de audio al servidor; las funciones de letras y recomendaciones aún pueden enviar título, artista, álbum, duración o identificador. Véase la [Política de privacidad](/es/privacy-policy/).

## 2. Conductas prohibidas

### 2.1 Abuso del sistema y de las interfaces

1. Obtener, usar o compartir sin autorización cuentas, sesiones, cookies, claves de API o de servicio ajenas, falsificar credenciales o eludir autenticación, límites de peticiones, firmas, protecciones SSRF u otros controles de acceso de la instancia alojada.
2. Sondear o explotar sin autorización extremos no públicos, direcciones internas o material de credenciales de la instancia, u obtener o divulgar datos privados ajenos; no deben utilizarse las sugerencias públicas para recoger, exponer o verificar información de otras personas.
3. Ocupar recursos compartidos extrayendo masivamente resultados de búsqueda, letras, direcciones de reproducción o respuestas de interfaces para reventa, espejos o conjuntos de datos no autorizados; esta restricción no abarca la reproducción personal normal, el uso moderado de la API ni las integraciones autorizadas.
4. Utilizar el proxy alojado como proxy de red general, escáner o punto de apoyo para ataques, o provocar deliberadamente concurrencia, tráfico, errores o presión de caché innecesarios.

Esta política no prohíbe leer el código, probar una instancia local propia con datos sintéticos o autorizados ni comunicar vulnerabilidades responsablemente. Las pruebas activas de seguridad sobre instancias públicas requieren autorización adecuada previa y deben evitar afectar a otras personas, obtener sus datos o ampliar la vulnerabilidad. Puede enviarse una reproducción mínima en privado a `admin@epocanvas.com`; no publique credenciales reales.

### 2.2 Contenidos y derechos

1. No utilizar el servicio alojado para realizar o facilitar piratería, eludir pagos o protecciones de derechos de autor, ni vulnerar derechos de autor, marcas, imagen, personalidad, privacidad u otros derechos.
2. No difundir mediante el servicio contenido ilícito, malware, material de explotación sexual infantil o propaganda terrorista ilícita, ni revelar ilegalmente o sin autorización credenciales y datos personales ajenos. Esto no prohíbe el inicio de sesión normal ni las solicitudes privadas necesarias de derechos; importar música local tampoco equivale a subir archivos a Sonic.
3. No suplantar personas u organizaciones ni usar los nombres y logotipos `Sonic`, `Epomail` o `EpoCanvas` para sugerir respaldo, colaboración o certificación de seguridad no autorizados.
4. No enviar términos de búsqueda, comentarios o materiales de denuncia sabiendo que contienen información privada ajena. Los comentarios públicos pueden incluir nombres, avatares y textos de otras personas; escribir comentarios locales en localStorage no equivale a tener permiso para publicarlos.

### 2.3 Derechos ajenos y estabilidad del servicio

1. No acosar, amenazar, difamar, perseguir, discriminar o atacar al operador, proveedores de origen, colaboradores u otros usuarios, ni utilizar cachés o sugerencias públicas para exponer datos ajenos.
2. No interferir en la disponibilidad, integridad o seguridad de la instancia alojada, servicios de contenido de origen, servicios de identidad o redes, incluida la activación deliberada de disyuntores, degradación o agotamiento de recursos.
3. No infringir las leyes aplicables de su lugar ni utilizar interfaces de contenido de forma contraria a las reglas de los servicios de origen. El uso del código permitido por la licencia no concede automáticamente derechos sobre contenidos, cuentas o música de terceros.

## 3. Límites de uso de recursos

La instancia alojada puede establecer límites según el estado sin autenticar o autenticado, la IP, sesión, interfaz y lotes de eventos. Los valores dependen de la configuración real y no son una promesa contractual uniforme del sitio para todos los despliegues. Superarlos puede producir respuestas `429`, retrasos, rechazo o restricciones temporales, sin implicar necesariamente una infracción.

Mantenga una frecuencia razonable de peticiones personales; evite extracciones concurrentes, reintentos repetidos, ocupación prolongada de flujos de audio y envíos innecesarios de eventos. Los parámetros de limitación, revocación y conservación pueden diferir entre variables de entorno, Compose y valores predeterminados del código; una página no basta para deducir el estado operativo real.

## 4. Escala de medidas

El operador puede adoptar una o varias medidas según el impacto, intención, repetición, datos implicados y urgencia de la conducta, registrando los motivos necesarios:

1. Advertir o requerir que cese la conducta correspondiente;
2. Limitar interfaces, concurrencia, caché, envío de eventos u otros recursos;
3. Suspender cuentas, sesiones, credenciales u orígenes de red; la eficacia inmediata de la revocación depende del almacenamiento, los ajustes y el éxito de la petición en la instancia;
4. Terminar el acceso a la instancia alojada o impedir seguir utilizando los extremos afectados;
5. Conservar los registros necesarios y facilitarlos a destinatarios habilitados en la medida exigida por la ley aplicable, una solicitud válida o la necesidad de proteger a otras personas y a los sistemas.

Ante ataques en curso, robo de credenciales, amenazas graves de seguridad o contenido manifiestamente ilícito, pueden adoptarse medidas temporales necesarias antes de explicar y revisar. Las medidas de esta política no sustituyen la responsabilidad legal de quien actúa ni prometen denuncia automática a la policía, plazos fijos de conservación, respuesta humana en 24 horas o supresión permanente de todos los registros relacionados.

## 5. Reclamaciones y denuncias

- **Reclamaciones**: si discrepa de una limitación, suspensión o terminación, escriba a `admin@epocanvas.com` indicando cuenta, momento, extremos relacionados y motivos. El operador revisará en un plazo razonable según sus recursos, sin afectar a los plazos, derechos y recursos de la ley aplicable. No se prometen plazos fijos, equipo dedicado ni restitución segura del acceso. No envíe contraseñas, tokens completos ni datos personales ajenos al asunto.
- **Denuncias**: el mismo correo admite sospechas de abuso, infracción de derechos, problemas de seguridad o daños a otras personas. Aporte los hechos necesarios, sin reenviar materiales ilícitos o sensibles; el operador evaluará las medidas o comunicaciones a autoridades habilitadas según el riesgo, la minimización de datos y la ley aplicable.

Para derechos de privacidad, solicitudes de supresión y avisos de violaciones de datos, use `privacy@epocanvas.com`. Esta política solo regula los recursos efectivamente alojados; las instancias independientes deben facilitar su propio operador y canales de reclamación.
