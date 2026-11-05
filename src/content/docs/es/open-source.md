---
title: Código abierto y autoalojamiento
description: "Código abierto y autoalojamiento de Sonic: estado de la licencia, límites de marca, agradecimientos y dependencias de terceros, deberes del desplegador y límites de conformidad."
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

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

El papel depende de quién determina efectivamente el tratamiento; publicar el código o contribuir a él no establece por sí solo una responsabilidad exclusiva. Las pruebas puramente personales y el servicio público deben evaluarse por separado (véase la [Descripción general](/es/overview/), sección 2). Cuando opere el servicio:

1. **Deber de información**: publicar antes de la recogida la identidad jurídica real, los datos de contacto, las finalidades, los destinatarios, los países de los nodos y los plazos de conservación; adaptar la [Política de privacidad](/es/privacy-policy/) a los hechos verificados, sin suponer que el repositorio facilita esa información;
2. **Registros y evaluación**: cuando se aplique el RGPD y se cumplan sus condiciones, mantener el registro del artículo 30 y evaluar los tratamientos de alto riesgo conforme al artículo 35. La escala reducida no convierte en ocasional un perfilado continuo;
3. **Mantenimiento de la seguridad**: aplicar medidas adecuadas, elecciones previas válidas y supresión verificada. El perfilado activado por defecto, la reutilización pública de consultas en bruto, las solicitudes de avatar por correo y el restablecimiento incompleto siguen siendo bloqueos; su divulgación no los resuelve;
4. **Coherencia de la configuración**: verificar la conservación, limpieza, revocación, recursos externos y copias de seguridad reales, no solo las variables de entorno; suspender el tratamiento opcional que carezca de base jurídica o garantías necesarias;
5. **Ley aplicable y transferencias**: determinar el ámbito territorial y los proveedores y países reales. El RGPD no es una garantía contractual mundial; las certificaciones o políticas públicas de proveedores no establecen contratos ni garantías de transferencia internacional.

## 5. Adopción de los documentos de este sitio

Estos documentos describen instancias de prueba alojadas determinadas y la versión candidata pública revisada; no son una certificación de cumplimiento ni condiciones automáticamente aplicables a todo despliegue. Toda adopción exige:

1. indicar la identidad jurídica real del operador, sus contactos, dominios, fecha de revisión y fecha de adopción;
2. verificar los flujos reales, los papeles de terceros, los contratos, los mecanismos de transferencia, las elecciones, la conservación y la supresión antes del tratamiento;
3. mantener traducciones inteligibles de forma coherente: la referencia de mantenimiento en chino simplificado y las nueve traducciones no prevalecen sobre la ley imperativa ni la interpretación favorable al consumidor;
4. obtener asesoramiento jurídico adecuado y, cuando sea necesario, una aceptación válida o un consentimiento separado; copiar el texto o seguir usándolo no establece ninguno de los dos.
