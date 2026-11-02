---
title: Código abierto y autoalojamiento
description: "Código abierto y autoalojamiento de Sonic: estado de la licencia, límites de marca, agradecimientos y dependencias de terceros, deberes del desplegador y límites de conformidad."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Esta página describe el estado y los límites de la licencia de código abierto de Sonic, los agradecimientos a terceros y las obligaciones jurídicas del autoalojamiento. La relación entre la licencia del software y las condiciones de uso consta en las secciones 2 y 10 de los [Términos del servicio](/es/terms-of-service/). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

## 1. Estado de la licencia

| Elemento | Estado |
| --- | --- |
| `LICENSE` de la raíz y del reproductor | MIT en la RC `a75f5cb`; permite los usos previstos por la licencia, incluidos los comerciales. En la antigua `main@ce443c8` solo es verificable la licencia MIT del reproductor y no se encontró `LICENSE` en la raíz; debe verificarse cada versión y componente |
| Declaración de los README históricos | Las antiguas menciones de CC BY-NC-SA 4.0 no determinan la licencia de todos los archivos históricos; debe verificarse el texto aplicable a cada versión y componente. La finalidad no lucrativa no revoca los derechos efectivamente concedidos por MIT |
| Marcas y marca | Los nombres y los signos de `epocanvas` y `Sonic` no conceden, junto con la licencia del código fuente, derecho de uso de marca |

La licencia del código y los derechos sobre contenidos son distintos: las grabaciones, letras, portadas y otros contenidos pertenecen a sus titulares y el proyecto no concede licencias musicales. La exclusión de garantías de MIT no elimina las obligaciones imperativas del servicio alojado hacia los usuarios.

## 2. Posicionamiento del proyecto

Sonic es un proyecto personal gratuito y sin ánimo de lucro para aprendizaje y pruebas de interés general, sin SLA ni garantía de funcionamiento permanente. El reproductor puede guardar archivos importados o descargados en el dispositivo; su accesibilidad no concede derechos adicionales. La finalidad personal, educativa o no lucrativa no crea automáticamente excepciones a los derechos de autor ni a la protección de datos. Verifique las leyes y autorizaciones aplicables, sin eludir protecciones de pago o acceso (véase la [Política de uso aceptable](/es/acceptable-use/)).

## 3. Agradecimientos y dependencias de terceros

El desarrollo y la práctica de la agregación multifuente se inspiran en los siguientes proyectos comunitarios de código abierto, a quienes se agradece: Meting, Meting-API-Serverless, ourcraft-music-api, music-lib, NeteaseCloudMusicApi, QQMusicApi, AMLL TTML API, LRCLIB, GDStudio Music API y la comunidad de Linux.do. Las dependencias completas y las declaraciones constan en el `THIRD_PARTY_NOTICES.md` del repositorio; las condiciones de cada servicio de origen las rige cada uno por sí mismo.

## 4. Obligaciones jurídicas de quien se autoaloja

El rol depende de los fines y medios de tratamiento realmente decididos; publicar código no convierte automáticamente a alguien en responsable de todas las instancias. Distinga las pruebas puramente personales del servicio público. Según la ley realmente aplicable y su rol (véase la [Descripción general](/es/overview/)), las obligaciones incluyen:

1. Deber de información: informar a los usuarios de las materias de tratamiento de datos; puede tomar como texto base la [Política de privacidad](/es/privacy-policy/) de este sitio, si bien debe adaptarla a su configuración real (los circuitos de terceros no activados deben eliminarse de la información);
2. Registros y evaluación: cuando se aplique el RGPD y se cumplan los requisitos correspondientes, mantener el registro del artículo 30 del RGPD y realizar la evaluación de impacto exigida por el artículo 35 del RGPD; los perfiles continuos no son ocasionales por afectar a pocos usuarios;
3. Mantenimiento de la seguridad: aplicar las medidas de la sección 3 de [Tratamiento de datos y seguridad](/es/data-security/) y someterse a la supervisión de las autoridades competentes;
4. Coherencia de la configuración: los valores reales de las variables de entorno (días de retención, conmutadores de terceros, limitación de peticiones) deben concordar con los compromisos de su política;
5. Determinar la jurisdicción: verificar la aplicación real del RGPD, UK GDPR, LGPD, CCPA-CPRA u otras leyes; el proyecto no convierte el RGPD en garantía contractual mundial. La identidad jurídica, países de los nodos, contratos y mecanismos de transferencia deben verificarse por separado del código.

## 5. Adopción de la documentación de este sitio

Este sitio adopta un diseño de doble vía, «plantilla general + texto vigente de la instancia gestionada»; los operadores de autoalojamiento pueden adoptar toda la documentación de este sitio como base de la información y las condiciones de su sitio:

1. Sustituya los datos de identidad (dominio, correo de contacto, fecha de entrada en vigor y número de versión);
2. Revise la divulgación fiel de la lista de terceros y de los parámetros de configuración;
3. El chino simplificado es la referencia de mantenimiento de este sitio, con nueve traducciones; cualquier regla lingüística elegida debe preservar las normas imperativas, la interpretación favorable al consumidor y la información comprensible;
4. Consulte a un abogado antes de operar formalmente; la documentación de este sitio no constituye asesoramiento jurídico.
