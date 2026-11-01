---
title: Descripción general
description: "Descripción general de los documentos legales de Sonic: identidad de la plataforma, delimitación de los roles de tratamiento de datos, línea base de protección de nivel RGPD, arquitectura documental, orden de prevalencia y canales de contacto."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página es la guía de la totalidad de los documentos legales del servicio Sonic (en lo sucesivo, «el servicio»); explica los roles de las partes, la arquitectura documental y el orden de aplicación. Antes de iniciar sesión o utilizar el servicio, debe leer esta página, además de la [Política de privacidad](/es/privacy-policy/) y los [Términos del servicio](/es/terms-of-service/).

![Arquitectura de los documentos legales de Sonic: los Términos del servicio constituyen la capa contractual; la Política de privacidad y la Política de uso aceptable, la capa de políticas; Tratamiento de datos y seguridad, Terceros y transferencias y Glosario son los documentos de apoyo; todo se asienta sobre la línea base de protección de datos de nivel RGPD](/images/sonic/legal-architecture.svg)

*Figura: arquitectura de los documentos legales de este sitio. Los Términos del servicio fijan las condiciones contractuales; la Política de privacidad recoge la información y las normas de tratamiento de los datos personales; la Política de uso aceptable fija los límites de conducta; los otros tres documentos son documentos de apoyo. La línea base de protección de datos adopta el RGPD como norma mínima para todos los usuarios.*

## 1. Identidad de la plataforma

Sonic es una plataforma de streaming musical de código abierto que funciona con la arquitectura «plano de control en el borde de Cloudflare + plano de datos con motor de protocolos local en Linux»; su código fuente se publica según el archivo `LICENSE` de la raíz del repositorio (MIT License). El servicio puede prestarse en las dos formas siguientes:

1. Instancia gestionada: sitio público operado hacia el exterior por el equipo de operaciones (sitio principal `sonic.epocanvas.tech` y espejo de respaldo `sonic.epocanvas.com`);
2. Instancia de autoalojamiento: sitio privado que cualquier persona, equipo u organización despliega por sí mismo a partir del código abierto en sus propios servidores y dominios.

Ambas formas comparten el mismo código de fuente abierta; la diferencia está en el operador y en el sujeto responsable: en la instancia gestionada lo asume el equipo de operaciones y, en la de autoalojamiento, quien la despliega.

## 2. Delimitación de los roles de tratamiento de datos

Los documentos legales del servicio adoptan la división de roles «responsable del tratamiento / encargado del tratamiento», equivalente a la clasificación general del Reglamento General de Protección de Datos (RGPD) de la Unión Europea.

| Escenario | Responsable del tratamiento | Encargado del tratamiento |
| --- | --- | --- |
| Instancia gestionada | El equipo de operaciones (respecto de los eventos de comportamiento, los inicios de sesión y los registros de seguridad) | Cloudflare, Epomail (verificación de identidad), entre otros; la lista completa figura en [Terceros y transferencias](/es/sub-processors/) |
| Instancia de autoalojamiento | La persona u organización que despliega la instancia (responsable del tratamiento único y exclusivo) | Los proveedores de infraestructura que ese desplegador configure |

El código de fuente abierta por sí mismo no recopila, no sube ni devuelve ningún dato de telemetría; salvo los servicios externos que el operador de la instancia configure por sí mismo, los autores de origen no acceden a los datos de operación de ninguna instancia. Desde el momento del despliegue, quien despliega se convierte en responsable del tratamiento de sus usuarios y debe cumplir, conforme a la legislación aplicable de su lugar, los deberes de información, mantenimiento de la seguridad y sometimiento a supervisión, pudiendo tomar los documentos de este sitio como texto base de su información y sus condiciones.

## 3. Arquitectura documental

Los documentos legales de este sitio se organizan por materias; se citan entre sí y constituyen en conjunto el acuerdo completo:

| Documento | Contenido |
| --- | --- |
| [Presentación del proyecto](/es/project/) | Identidad del producto, funciones principales, arquitectura técnica, diseño de seguridad y privacidad, formas de despliegue |
| [Política de privacidad](/es/privacy-policy/) | Recogida y utilización de los datos personales, bases jurídicas, plazos de conservación, derechos de la persona interesada y transferencias internacionales |
| [Términos del servicio](/es/terms-of-service/) | Condiciones contractuales de uso, reglas de cuenta, limitación de responsabilidad, ley aplicable y resolución de controversias |
| [Política de uso aceptable](/es/acceptable-use/) | Límites de conducta, catálogo de conductas prohibidas y escala de aplicación, procedimiento de reclamación |
| [Tratamiento de datos y seguridad](/es/data-security/) | Ciclo de vida de los datos, matriz de tratamiento, medidas de seguridad, limitaciones conocidas y respuesta a incidentes |
| [Terceros y transferencias](/es/sub-processors/) | Destinatarios de la compartición, datos afectados, garantías de las transferencias |
| [Glosario](/es/key-terms/) | Definición de los términos jurídicos (vocabulario del RGPD) y de los términos técnicos usados en los documentos legales de este sitio |

## 4. Línea base de protección de datos

El servicio adopta el Reglamento General de Protección de Datos (RGPD) de la Unión Europea como norma mínima de protección de datos para **todos los usuarios**: esté donde esté en el mundo, sus derechos de información, acceso, rectificación, supresión, limitación, portabilidad, oposición y reclamación respecto de sus datos personales no quedan en ningún caso por debajo del nivel fijado por el RGPD.

1. Para los usuarios situados en la Unión Europea y en el Espacio Económico Europeo, el RGPD se aplica directamente;
2. Para los usuarios de las demás regiones, el servicio asume las normas del RGPD como compromiso de autoservicio y las honra a título de obligación contractual;
3. Las protecciones más fuertes que confiera la ley de su lugar prevalecen en su ámbito.

Esta línea base significa: aunque la instancia gestionada opera en Taiwán y la ley aplicable de los Términos del servicio es la del lugar del operador (véase la sección 11 de los [Términos del servicio](/es/terms-of-service/)), las materias de protección de datos se aplican con el nivel del RGPD como suelo; el ejercicio de los derechos de las personas interesadas, la notificación de violaciones y los deberes de mantenimiento de la seguridad se ejecutan conforme a esta norma.

## 5. Orden de prevalencia

1. En materia de privacidad, la norma especial es la [Política de privacidad](/es/privacy-policy/); en las condiciones de uso del servicio, lo son los [Términos del servicio](/es/terms-of-service/); las demás materias se interpretan según la arquitectura enumerada en esta página.
2. Si los documentos discrepan entre sí, prevalece el documento directamente vinculado a la materia de que se trate.
3. Los documentos legales de este sitio tienen como versión oficial la versión en chino simplificado; las versiones en las demás lenguas, incluida la presente versión en español, son traducciones de referencia y, en caso de duda en la interpretación, prevalece la versión oficial.

## 6. Canales de contacto

- Privacidad y solicitudes de protección de datos: `privacy@epocanvas.com`
- Servicios y cuentas: `admin@epocanvas.com`
- Proyecto de código abierto: Issues del repositorio de GitHub (`github.com/shijianus/sonic`)
- Sitios de autoalojamiento: diríjase a los datos de contacto del operador publicados en ese sitio
