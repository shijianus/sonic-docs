---
title: Exportación y almacenamiento de datos
description: "Exportación y almacenamiento de datos de Sonic: ubicación de los datos, consulta del resumen del perfil, exportación y copia de seguridad, operaciones de borrado e instancias de autoalojamiento."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página resume los datos presentes en Sonic, dónde se encuentran, qué resumen está disponible y qué opciones existen para copiarlos, borrarlos o presentar una solicitud manual. No constituye una herramienta de exportación completa. Las bases jurídicas y el marco de derechos figuran en las secciones 4, 6 y 9 de la [Política de privacidad](/es/privacy-policy/); las medidas técnicas, en [Tratamiento de datos y seguridad](/es/data-security/).

## 1. Ubicación de los datos

| Datos | Ubicación | Identidad asociada | Conservación |
| --- | --- | --- | --- |
| Favoritos, listas, preferencias | localStorage del navegador | Nunca se suben | Hasta que se borren |
| Historial de reproducción | localStorage del navegador | Nunca se sube | Hasta que se borre |
| Descargas y música local | IndexedDB del navegador | Nunca se suben | Hasta que se borren |
| Eventos de comportamiento | SQLite del servidor (plano de datos) | Hash seudonimizado | Destrucción automática después de 90 días |
| Estadísticas globales agregadas | SQLite del servidor | Sin vínculo con personas | Se mantienen con la base |
| Historial de búsqueda (local) | localStorage del navegador | Nunca se sube | Hasta que se borre |

Los datos de identificación de la cuenta (correo electrónico y similares) nunca se escriben en disco y solo existen durante la sesión; la base de datos no tiene columna de IP.

## 2. Consulta: resumen del perfil de recomendación

Mediante `GET /api/sonic/events` (o el bloque del perfil en la página de ajustes) puede consultar el resumen disponible del perfil que el servidor conserva en este momento: número total de eventos, recuentos de favoritos y rechazos, artistas más escuchados, tendencias de género, términos de búsqueda recientes y forma de almacenamiento. Este resumen no es una exportación completa ni una copia de todos los datos personales; solo muestra los indicadores que ofrece esta función.

## 3. Exportación y copia de seguridad

1. **Datos del navegador**: los favoritos, las listas y las descargas permanecen en el navegador utilizado. Sonic no ofrece una exportación en la nube integrada en el producto ni una exportación general del localStorage o IndexedDB; las herramientas de copia propias del navegador o del dispositivo pueden variar y no están garantizadas. También puede anotar o reconstruir las listas importantes;
2. **Eventos de comportamiento**: el servidor solo conserva eventos de comportamiento seudonimizados y no ofrece un canal de descarga o exportación de esos eventos. Para borrarlos, use las operaciones de la sección 4; si necesita una solicitud con intervención humana, escriba a `privacy@epocanvas.com`;
3. **Música local**: los archivos originales importados siguen en su dispositivo; borrar la copia del navegador no afecta a los originales.

Por tanto, el resumen del perfil no sustituye a una exportación completa. Las solicitudes de acceso, rectificación, limitación, portabilidad u otras solicitudes manuales se tramitan por el canal indicado en la [Política de privacidad](/es/privacy-policy/), sin crear una función de exportación automática.

## 4. Operaciones de borrado

| Operación | Alcance | Efecto |
| --- | --- | --- |
| Restablecer el perfil de recomendación y el registro de no me gusta | Todos los eventos de comportamiento del servidor | Inmediato (`DELETE /api/sonic/events`) |
| Borrar todos los datos locales | localStorage, sessionStorage e IndexedDB del navegador + perfil del servidor | Inmediato tras confirmar |
| «Borrar los datos del sitio» en el navegador | El mismo alcance (lado del navegador) | Inmediato |
| Cerrar sesión | Sesión y claves | Inmediato |

## 5. Instancias de autoalojamiento

En una instancia de autoalojamiento, los datos residen en el plano de datos del desplegador (volumen con nombre de SQLite); el desplegador puede configurar los días de conservación y la ruta en disco (véase la sección 3 de la [Guía de despliegue](/es/deployment/)); sus obligaciones de copia de seguridad y de información figuran asimismo en la sección 4 de [Código abierto y autoalojamiento](/es/open-source/).
