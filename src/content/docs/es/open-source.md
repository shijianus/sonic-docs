---
title: Código abierto y autoalojamiento
description: "Código abierto y autoalojamiento de Sonic: estado de la licencia, límites de marca, agradecimientos y dependencias de terceros, deberes del desplegador y límites de conformidad."
---

**Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.4**

Esta página describe el estado y los límites de la licencia de código abierto de Sonic, los agradecimientos a terceros y las obligaciones jurídicas del autoalojamiento. La relación entre la licencia del software y las condiciones de uso consta en las secciones 2 y 10 de los [Términos del servicio](/es/terms-of-service/).

## 1. Estado de la licencia

| Elemento | Estado |
| --- | --- |
| `LICENSE` de la raíz del repositorio | MIT License, **texto de licencia autoritativo**; rige ese archivo |
| Declaración de los README históricos | Declararon la intención de aplicar CC BY-NC-SA 4.0 (no comercial, con atribución y compartir igual); hasta que el mantenimiento resuelva, no sirve de base de licencia y constituye solo la expresión del posicionamiento no comercial del proyecto |
| Marcas y marca | Los nombres y los signos de `epocanvas` y `Sonic` no conceden, junto con la licencia del código fuente, derecho de uso de marca |

Cualquiera que sea la resolución final de la licencia, se aplican los límites siguientes: los derechos sobre las grabaciones, las letras, las portadas y demás contenidos pertenecen a sus respectivos titulares, y el proyecto no concede sublicencia alguna sobre contenido musical.

## 2. Posicionamiento del proyecto

Este proyecto es un proyecto de código abierto no comercial: una herramienta de búsqueda, agregación y reproducción que no almacena ni aloja archivos musicales ni integra componentes de elusión de las protecciones de pago de los derechos. Al usar el servicio o desplegarlo por sí mismo, debe verificar por sí mismo el cumplimiento de la legislación local, de las condiciones de los servicios de origen y de los requisitos de licenciamiento de contenidos (los límites de conducta constan en la [Política de uso aceptable](/es/acceptable-use/)).

## 3. Agradecimientos y dependencias de terceros

El desarrollo y la práctica de la agregación multifuente se inspiran en los siguientes proyectos comunitarios de código abierto, a quienes se agradece: Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, GDStudio Music API y la comunidad de Linux.do. Las dependencias completas y las declaraciones constan en el `THIRD_PARTY_NOTICES.md` del repositorio; las condiciones de cada servicio de origen las rige cada uno por sí mismo.

## 4. Obligaciones jurídicas de quien se autoaloja

Desde el momento del autoalojamiento, quien despliega es el responsable del tratamiento de sus usuarios (la delimitación de roles consta en la sección 2 de la [Descripción general](/es/overview/)) y debe cumplir:

1. Deber de información: informar a los usuarios de las materias de tratamiento de datos; puede tomar como texto base la [Política de privacidad](/es/privacy-policy/) de este sitio, si bien debe adaptarla a su configuración real (los circuitos de terceros no activados deben eliminarse de la información);
2. Registros y evaluación: mantener el registro de las actividades de tratamiento (el artículo 30 del RGPD) y practicar, ante alto riesgo, una evaluación de impacto en la protección de datos (el artículo 35 del RGPD);
3. Mantenimiento de la seguridad: aplicar las medidas de la sección 3 de [Tratamiento de datos y seguridad](/es/data-security/) y someterse a la supervisión de las autoridades competentes;
4. Coherencia de la configuración: los valores reales de las variables de entorno (días de retención, conmutadores de terceros, limitación de peticiones) deben concordar con los compromisos de su política;
5. Complemento por jurisdicción: además del RGPD, complete los requisitos legales de la jurisdicción de sus usuarios, como el UK GDPR, la LGPD o la CCPA-CPRA.

## 5. Adopción de la documentación de este sitio

Este sitio adopta un diseño de doble vía, «plantilla general + texto vigente de la instancia gestionada»; los operadores de autoalojamiento pueden adoptar toda la documentación de este sitio como base de la información y las condiciones de su sitio:

1. Sustituya los datos de identidad (dominio, correo de contacto, fecha de entrada en vigor y número de versión);
2. Revise la divulgación fiel de la lista de terceros y de los parámetros de configuración;
3. Conserve la cláusula «la versión en chino simplificado es la versión oficial» o cámbiela por la lengua oficial que elija, de forma coherente en todo el texto;
4. Consulte a un abogado antes de operar formalmente; la documentación de este sitio no constituye asesoramiento jurídico.
