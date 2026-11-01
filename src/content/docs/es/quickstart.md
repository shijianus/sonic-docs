---
title: Primeros pasos
description: "Primeros pasos con Sonic: la ruta más corta desde abrir el sitio hasta buscar y reproducir, iniciar sesión y usar la biblioteca local, descargar e importar música local y usar el móvil."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página ofrece la ruta más corta para usar la instancia gestionada de Sonic (`sonic.epocanvas.tech`): desde abrir el sitio hasta buscar y reproducir, iniciar sesión y usar la biblioteca local, descargar e importar música local y usar el móvil. Para la visita completa de la interfaz, véase la [Guía de la interfaz y funciones](/es/interface/); esta página no cubre el autoalojamiento (el despliegue consta en la [Guía de despliegue](/es/deployment/)).

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
2. Las canciones favoritas, las listas guardadas, los artistas seguidos y las listas propias se almacenan únicamente en el navegador utilizado; no se sincronizan en la nube ni entre dispositivos;
3. Iniciar sesión desbloquea asimismo la recomendación personalizada y la continuación automática de Auto DJ; ambas pueden desactivarse en «Ajustes → Privacidad y datos locales»; desactivadas, las recomendaciones pasan a modo puramente público y deja de registrar cualquier evento de comportamiento.

La sesión es válida como máximo 30 días y se revoca de inmediato al cerrar sesión. Las reglas de cuenta constan en la sección 3 de los [Términos del servicio](/es/terms-of-service/).

## 4. Descargas y música local

1. Descarga: pulse descargar en la columna de acciones de la pista o en la barra de reproducción inferior; la canción se guarda, junto con sus metadatos de calidad, en el IndexedDB del navegador y se gestiona en la página «lista de descargas»; puede reproducirse sin conexión;
2. Música local: la página «Música local» admite añadir con un clic o arrastrar y soltar archivos de audio hacia el navegador; los archivos importados se guardan asimismo en el IndexedDB y no se suben al servidor;
3. Ambos son solo para su escucha personal y no pueden redistribuirse (véase la [Política de uso aceptable](/es/acceptable-use/)).

## 5. Uso en móvil

Al acceder desde el navegador del teléfono a la misma dirección se obtiene la disposición móvil: navegación por pestañas en la parte inferior (inicio, búsqueda, reproducidos recientemente, ajustes) y barra de reproducción mini; el panel del reproductor ofrece la misma letra palabra por palabra y el mismo menú de calidad. Los favoritos, las listas, las preferencias y las descargas se almacenan por separado en el navegador de cada dispositivo y no se sincronizan entre dispositivos.

## 6. Primeros pasos en privacidad

Al usar el servicio por primera vez conviene conocer tres controles (ubicados en «Ajustes → Privacidad y datos locales»):

1. Búsqueda inteligente y recomendación personalizada: conmutador general; al desactivarlo, los eventos dejan de recogerse;
2. Radio continua automática (Auto DJ): controla la continuación automática al terminar la reproducción;
3. Restablecer el perfil de recomendación y el registro de no me gusta / Borrar todos los datos locales: dos botones de borrado de efecto inmediato.

La formulación completa de los compromisos de privacidad figura en la [Política de privacidad](/es/privacy-policy/).

## 7. Respuestas rápidas a preguntas frecuentes

| Pregunta | Respuesta |
| --- | --- |
| ¿Hay que pagar? | Gratuito, sin publicidad ni compras integradas |
| ¿Puede usarse sin iniciar sesión? | Las funciones principales pueden usarse de forma anónima (con limitación de peticiones más estricta) |
| ¿Dónde se guardan los datos? | Almacenamiento local del navegador + eventos de comportamiento seudonimizados en el servidor (90 días) |
| ¿Cómo se borra el perfil? | Ajustes → restablecer el perfil de recomendación, con efecto inmediato |
| ¿Por qué 30 segundos? | Recorte oficial de vista previa; se etiqueta fielmente y se procura el completado entre fuentes |
| ¿Se sobredeclara la calidad? | La insignia refleja fielmente el nivel del flujo actual |

Más preguntas en la sección 12 de la [Presentación del proyecto](/es/project/); los términos jurídicos, en el [Glosario](/es/key-terms/).
