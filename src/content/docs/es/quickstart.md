---
title: Primeros pasos
description: "Primeros pasos con Sonic: la ruta más corta desde abrir el sitio hasta buscar y reproducir, iniciar sesión y usar la biblioteca local, descargar e importar música local y usar el móvil."
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página ofrece la ruta más corta para usar la instancia gestionada de Sonic (`sonic.epocanvas.tech`): desde abrir el sitio hasta buscar y reproducir, iniciar sesión y usar la biblioteca local, descargar e importar música local y usar el móvil. Para la visita completa de la interfaz, véase la [Guía de la interfaz y funciones](/es/interface/); esta página no cubre el autoalojamiento (el despliegue consta en la [Guía de despliegue](/es/deployment/)). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

![Inicio rápido de Sonic en cuatro pasos: abrir el sitio, buscar, reproducir y ajustar preferencias](/images/sonic/quickstart-steps.svg)

*Figura: cuatro pasos desde la apertura hasta los ajustes; las funciones reales dependen de lo que habilite la instancia.*

## 1. Abrir el sitio

Acceda con el navegador a `sonic.epocanvas.tech` (espejo de respaldo `sonic.epocanvas.com`). La lengua de la interfaz sigue por defecto la del navegador y puede cambiarse en «Ajustes → lengua de la interfaz» entre chino simplificado, English y 日本語; el tema (claro, oscuro o según el sistema) se ajusta en el mismo lugar. Todas las funciones principales pueden usarse sin iniciar sesión.

## 2. Búsqueda y reproducción

1. Escriba palabras clave de canciones, artistas, álbumes o listas de reproducción en el cuadro de búsqueda de la parte superior de la barra lateral izquierda (o en la página «Búsqueda»); la búsqueda admite la normalización simplificado-tradicional, el pinyin y las siglas, y la tolerancia ortográfica;
2. Los resultados se dividen en tres pestañas, «sencillos», «listas de reproducción» y «MV»; al pulsar un sencillo comienza la reproducción, o use «reproducir todo» para reproducir la lista completa de una vez;
3. La barra de reproducción inferior muestra la pista actual, la línea de vista previa de la letra y la insignia de calidad (como SQ sin pérdida); al pulsar la portada se despliega el panel completo del reproductor, con las letras palabra por palabra (con tres conmutadores independientes: original, traducción y romanización).

Ante un fragmento de vista previa de 30 segundos, el reproductor lo etiqueta fielmente con el indicador de vista previa y no lo presenta como pista completa; con el completado entre fuentes activado, intenta automáticamente emparejar la pista completa gratuita.

## 3. Inicio de sesión y biblioteca local

Inicie sesión con su cuenta de Epomail mediante OAuth 2.0 (PKCE); el servicio no dispone de sistema de registro independiente:

1. Pulse la entrada de inicio de sesión de la parte inferior de la barra lateral; será remitido a la página de autorización de Epomail para confirmar;
2. Los favoritos y listas se guardan principalmente en el navegador; parte de las señales y del contexto pueden enviarse. No se ha verificado una sincronización general en la nube entre dispositivos y la ruta remota del radar debe verificarse según el despliegue;
3. La personalización y Auto DJ están activados por defecto en el código, sin prueba de consentimiento afirmativo; iniciar sesión no equivale a consentir. Pueden desactivarse en «Ajustes → Privacidad y datos locales», pero esa elección no detiene por sí sola las estadísticas de búsqueda separadas.

La sesión dura 30 días por defecto; cerrar sesión borra la cookie actual, pero la revocación remota depende de la configuración y del éxito de la petición. El almacenamiento `auth` conserva parte de los datos de cuenta en localStorage. Las reglas figuran en la sección 3 de los [Términos del servicio](/es/terms-of-service/).

## 4. Descargas y música local

1. Descarga: pulse descargar en la columna de acciones de la pista o en la barra de reproducción inferior; la canción se guarda, junto con sus metadatos de calidad, en el IndexedDB del navegador y se gestiona en la página «lista de descargas»; puede reproducirse sin conexión;
2. Música local: importe archivos seleccionándolos o arrastrándolos; el cuerpo de audio se guarda en IndexedDB y no se ha encontrado una vía de subida del cuerpo, pero la búsqueda de letras, las señales de favoritos y las recomendaciones pueden enviar título, artista, álbum o identificador, y las portadas incrustadas pueden transmitirse con eventos;
3. utilice solo contenidos y usos autorizados: importar, descargar o probar de forma personal no crea una licencia ni una excepción automática a los derechos de autor (véase la [Política de uso aceptable](/es/acceptable-use/)).

## 5. Uso en móvil

Al acceder desde el navegador del teléfono a la misma dirección se obtiene la disposición móvil: navegación por pestañas en la parte inferior (inicio, búsqueda, reproducidos recientemente, ajustes) y barra de reproducción mini; el panel del reproductor ofrece la misma letra palabra por palabra y el mismo menú de calidad. Los favoritos, las listas, las preferencias y las descargas se almacenan por separado en el navegador de cada dispositivo y no se sincronizan entre dispositivos.

## 6. Primeros pasos en privacidad

Al usar el servicio por primera vez conviene conocer tres controles (ubicados en «Ajustes → Privacidad y datos locales»):

1. Búsqueda inteligente y recomendación personalizada: controla los eventos correspondientes, sin detener las búsquedas originales que pueden alimentar sugerencias públicas; no escriba información sensible. El modo de incógnito no bloquea los envíos;
2. Radio continua automática (Auto DJ): controla la continuación al terminar la lista; su activación predeterminada no prueba consentimiento para los perfiles;
3. Restablecer el perfil / Borrado local: la supresión remota es parcial, con posibles identificadores anónimos antiguos, radar, agregados, servicios externos y copias omitidos, y fallos ocultos. La limpieza local no elimina la cookie HttpOnly ni cierra sesión; al recargar compruebe que no se haya reactivado la personalización por defecto. Para una solicitud completa, contacte con `privacy@epocanvas.com`.

La formulación completa de los compromisos de privacidad figura en la [Política de privacidad](/es/privacy-policy/).

## 7. Respuestas rápidas a preguntas frecuentes

| Pregunta | Respuesta |
| --- | --- |
| ¿Hay que pagar? | Proyecto personal gratuito, sin ánimo de lucro, publicidad, compras integradas ni SLA |
| ¿Puede usarse sin iniciar sesión? | Funciones básicas sin iniciar sesión; eso no garantiza anonimato |
| ¿Dónde se guardan los datos? | Navegador y tratamientos remotos; los 90 días de ciertos eventos no son un plazo general verificado  |
| ¿Cómo se borra el perfil? | Ajustes → restablecer el perfil; cobertura parcial y posibles fallos, solicitudes completas por correo |
| ¿Por qué 30 segundos? | Recorte oficial de vista previa; se etiqueta fielmente y se procura el completado entre fuentes |
| ¿Se sobredeclara la calidad? | La insignia refleja fielmente el nivel del flujo actual |

Más preguntas en la sección 12 de la [Presentación del proyecto](/es/project/); los términos jurídicos, en el [Glosario](/es/key-terms/).
