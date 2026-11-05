---
title: Descripción general de privacidad y condiciones
description: Prestador, ámbito de la protección de datos, relación entre documentos y condiciones actuales de aplicación del proyecto personal de pruebas sin ánimo de lucro Sonic.
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página explica la relación entre los documentos del servicio de pruebas alojado Sonic. Es un proyecto mantenido por una persona, gratuito y sin ánimo de lucro, destinado al aprendizaje y a pruebas de interés general; no promete niveles de servicio comerciales ni funcionamiento permanente. Lea primero los [Términos del servicio](/es/terms-of-service/) y la [Política de privacidad](/es/privacy-policy/) para conocer el alcance del servicio y el tratamiento de datos. Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

:::caution[Revisión documental y despliegue real]
La RC pública y la antigua `main` son dos estados diferentes del código; sus capacidades no deben confundirse. No se han examinado el entorno en línea, los contratos de proveedores ni los resultados reales de supresión. Siguen pendientes cuestiones como los perfiles activados por defecto, las sugerencias públicas de términos buscados, las peticiones de avatar con correo electrónico, la cobertura de la supresión y los plazos reales de conservación. Actualizar las políticas no demuestra que esos problemas estén corregidos. Deben suspenderse los tratamientos sin base lícita y garantías necesarias.
:::

![Relación entre los documentos de Sonic: condiciones del servicio, información de privacidad, reglas de uso y descripción de datos](/images/sonic/legal-architecture.svg)

*Figura: cada documento tiene una finalidad distinta; el tratamiento de datos personales necesita una base lícita establecida de forma independiente.*

## 1. Proyecto y operador

El repositorio público del código es [shijianus/sonic](https://github.com/shijianus/sonic); los archivos `LICENSE` de la raíz y del reproductor de la RC `a75f5cb` son MIT. En la antigua `main@ce443c8` solo es verificable la licencia MIT del reproductor y no se encontró `LICENSE` en la raíz; las versiones y los componentes históricos deben evaluarse por separado. La finalidad no lucrativa del proyecto no revoca la licencia del código ni concede derechos de uso sobre música, letras, portadas o MV.

Esta documentación del servicio está destinada a las instancias alojadas `sonic.epocanvas.tech` y `sonic.epocanvas.com` que la adopten efectivamente. El operador real debe precisar su identidad jurídica y datos de contacto; la cuenta de mantenimiento `shijianus` o la marca EpoCanvas no sustituyen una identificación completa. El código no acredita el nombre legal del operador, su ubicación ni los países donde están los servidores; no se hacen presunciones al respecto.

Otros despliegues tienen sus propios operadores y reglas. Publicar código, aportar parches o facilitar herramientas sin conexión no implica automáticamente asumir la responsabilidad del servicio y los datos de todas las instancias; cuando también se opera una instancia o se participa en las decisiones sobre el tratamiento, se responde según el rol real.

## 2. Roles en el tratamiento de datos

| Participante | Criterio para determinar el rol | Aclaración del proyecto |
| --- | --- | --- |
| Operador de la instancia alojada | Quien determina efectivamente los fines y medios del tratamiento de datos personales | Responde de sus propios tratamientos de inicio de sesión, peticiones, recomendaciones y operaciones relacionadas |
| Proveedor de infraestructura | Trata por instrucciones o para sus propios fines | El rol de Cloudflare y otros depende del servicio concreto y del contrato |
| Epomail y proveedores de contenido y recursos | Pueden ser responsables independientes; algunas situaciones requieren una evaluación separada | No se califica a todos los terceros como encargados del tratamiento |
| Desplegadores independientes y colaboradores del código | Según su decisión o participación efectiva en el tratamiento | La etiqueta de desplegador o colaborador no determina automáticamente una responsabilidad única y exclusiva |

Los flujos reales incluyen perfiles opcionales, contexto de peticiones, datos del navegador, recursos externos directos y estadísticas de búsqueda. Las etiquetas «código abierto» o «almacenamiento local» no significan que no se envíen datos fuera; no iniciar sesión o utilizar hashes tampoco equivale a anonimato. Los detalles son los descritos con exactitud en la política de privacidad, con la que deben mantenerse coherentes las explicaciones técnicas.

## 3. Finalidad de los documentos

| Documento | Finalidad |
| --- | --- |
| [Términos del servicio](/es/terms-of-service/) | Condiciones del servicio alojado, derechos sobre contenidos, límites operativos y responsabilidad |
| [Política de privacidad](/es/privacy-policy/) | Responsable, datos, finalidades, bases, destinatarios, conservación y derechos |
| [Política de uso aceptable](/es/acceptable-use/) | Recursos públicos, pruebas autorizadas, conductas prohibidas y medidas |
| [Tratamiento de datos y seguridad](/es/data-security/) | Diseño real de seguridad, carencias, gestión de incidentes y medidas según el riesgo |
| [Terceros y transferencias](/es/sub-processors/) | Recursos externos, roles independientes, configuración y condiciones internacionales |
| [Glosario](/es/key-terms/) | Datos personales, seudonimización, perfiles y términos técnicos |
| [Gestión de datos](/es/data-management/) | Acciones del usuario y límites de su cobertura |

## 4. Objetivo de protección, riesgos y legislación aplicable

La aplicación del RGPD debe determinarse según el artículo 3 del RGPD y los hechos concretos. Ofrecer servicios gratuitos a personas que estén en la Unión Europea o supervisar su comportamiento dentro de ella puede quedar sujeto al reglamento; el mero acceso desde el extranjero tampoco decide por sí solo la conclusión. El carácter no lucrativo, el código abierto y el aprendizaje no crean una exención general; la actividad puramente personal o doméstica debe evaluarse según su alcance real.

Las medidas se eligen según la escala del tratamiento, el riesgo y los costes de aplicación. Un pequeño proyecto personal no tiene que nombrar siempre un delegado de protección de datos, certificarse, contratar auditorías comerciales o disponer de un equipo permanente; aun así, deben evaluarse por separado los umbrales específicos del artículo 37, del artículo 35 y del artículo 27 del RGPD. La elaboración continua de perfiles no puede calificarse de «ocasional» solo por afectar a pocas personas. No desaparecen la identificación necesaria, la base válida, la minimización, la seguridad ni la gestión de derechos.

El respeto a la privacidad orienta el diseño y la mejora del servicio. El objetivo es realizar esfuerzos razonables para ofrecer un nivel elevado de protección, con medidas rigurosas y proporcionadas a los riesgos, tomando como referencia los principios del RGPD de minimización de datos, limitación de la finalidad, transparencia y control de los usuarios. Este objetivo no es una certificación europea ni una declaración de cumplimiento íntegro del RGPD y de las leyes de todos los Estados miembros. No garantiza seguridad absoluta, ausencia total de filtraciones o pérdidas de datos ni su supresión inmediata y completa. La protección efectiva depende del despliegue, la configuración y los tratamientos de terceros; deben distinguirse las medidas constatadas en el código, los elementos no verificados y los riesgos conocidos.

La legislación aplicable depende de la situación real; tomar el RGPD como referencia no crea una garantía contractual mundial adicional de cumplimiento de todo su régimen. Los esfuerzos razonables no reducen las obligaciones legales aplicables, y comunicar los riesgos no le exige aceptar un tratamiento ilícito ni renunciar a sus derechos. Sea cual sea la ley aplicable, deben describirse los datos con exactitud, cumplirse los compromisos asumidos y respetarse los derechos irrenunciables de los usuarios.

## 5. Interpretación y versiones

Prevalecen las normas imperativas. Las condiciones del servicio se rigen por los términos del servicio y la información de datos por la política de privacidad; las explicaciones técnicas, imágenes o descripciones antiguas de funciones no pueden ampliar la autorización de tratamiento, ni puede invocarse que «prevalece el código» para eludir responsabilidad por información errónea. Las contradicciones detectadas deben corregirse y comunicarse a los usuarios afectados.

El chino simplificado es la referencia de mantenimiento; las otras nueve versiones lingüísticas son traducciones. La prioridad del chino no puede excluir una interpretación favorable al consumidor ni una información comprensible. La fecha indicada es la de revisión documental; antes de adoptar los documentos en un despliegue o cambiar realmente los tratamientos, sigue siendo necesario informar de forma válida y obtener por separado el consentimiento cuando corresponda.

## 6. Contacto

Servicio y cuentas: `admin@epocanvas.com`; privacidad y solicitudes de derechos: `privacy@epocanvas.com`. Estos correos se proponen en la documentación, pero no se ha confirmado su publicación en el código de origen examinado ni se ha probado su recepción enviando mensajes. No constituyen una declaración de nombramiento de representante en la Unión Europea ni de delegado de protección de datos. El operador de la instancia debe confirmar o corregir los canales que publique y garantizar que funcionen.

Los problemas técnicos pueden comunicarse en [GitHub Issues](https://github.com/shijianus/sonic/issues); no envíe datos personales, contraseñas ni credenciales de sesión. Para instancias de terceros, contacte con su propio operador.
