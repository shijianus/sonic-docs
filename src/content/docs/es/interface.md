---
title: Guía de la interfaz y funciones
description: "Guía de la interfaz y funciones del reproductor de Sonic: página de inicio y recomendaciones, búsqueda, controles de reproducción, panel del reproductor, mi música, ajustes y controles de privacidad, disposición en móvil."
---

**Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.3**

Esta página orienta por la disposición de la interfaz y la ubicación de las funciones del reproductor web de Sonic, y explica dónde está cada función y cómo se comporta. Las capturas proceden de la instancia gestionada en funcionamiento (con la interfaz en chino simplificado; el producto permite cambiar la lengua de la interfaz). La interfaz puede ajustarse con la evolución de las versiones; el alcance real de disponibilidad de cada función es el que tenga activado la instancia. Los compromisos legales figuran en los [Términos del servicio](/es/terms-of-service/) y en la [Política de privacidad](/es/privacy-policy/).

![Página de inicio del reproductor de Sonic: barra de navegación izquierda con tres zonas (Explorar, Mi música, Sistema); la zona principal muestra el carrusel de recomendaciones, la recomendación inteligente y el radar musical, y las listas recomendadas; barra de reproducción mini en la parte inferior](/images/sonic/ui/ui-home.png)

*Figura: página de inicio en escritorio. La barra lateral se divide en dos zonas, «Explorar» (inicio, MV, listas de éxitos, artistas, novedades de álbumes, búsqueda) y «Mi música» (me gusta, reproducidos recientemente, lista de descargas, música local); la zona principal presenta, de arriba abajo, el carrusel de recomendaciones, la recomendación inteligente y el radar musical, y las listas recomendadas; en la parte inferior permanece la barra de reproducción mini.*

## 1. Página de inicio y recomendación inteligente

La página de inicio agrega tres zonas de contenido:

1. Carrusel de recomendaciones: presenta canciones y álbumes nuevos; las tarjetas llevan etiquetas de fuente como «novedad de Sonic»; al pulsar se accede directamente a la reproducción o al detalle;
2. Recomendación inteligente y radar musical: ofrece tres vistas, «puede que te guste», «lista de tendencias del sitio» y «radar de exploración de estilos», con las acciones «cambiar lote» y «reproducir la lista recomendada». Las tarjetas de recomendación indican el motivo de la recomendación (como la insignia de «recomendación personalizada» y las aclaraciones del tipo «escuchas a menudo a este artista» o «se parece a los estilos que prefieres»); la página de inicio en móvil muestra además las etiquetas de señales de preferencia de la sesión actual (como artistas y géneros). Las categorías de señales que sustentan la recomendación figuran en la sección 4.2 de la [Política de privacidad](/es/privacy-policy/);
3. Listas recomendadas y sencillos populares: se generan según las tendencias reales de escucha de todo el sitio; el número de reproducciones se indica en la tarjeta.

El orden de las recomendaciones solo afecta a la secuencia de reproducción que usted ve; puede desactivar la personalización en los ajustes (véase la sección 7); desactivada, las recomendaciones pasan a modo puramente público.

## 2. Búsqueda

![Página de resultados de búsqueda de Sonic: búsqueda de «周杰伦» con 52 resultados, pestañas de sencillos, listas de reproducción y MV, botón de reproducir todo, y lista con portada, artista, álbum, duración y columna de acciones](/images/sonic/ui/ui-search.png)

*Figura: página de resultados de búsqueda. En la parte superior, pestañas por categoría (sencillos, listas de reproducción, MV) y «reproducir todo»; la lista presenta portada, canción, artista, álbum, duración y acciones (reproducir, MV, favorito, descargar). El cuadro de búsqueda admite la normalización simplificado-tradicional, el pinyin y las siglas, y la tolerancia ortográfica.*

La entrada de búsqueda está en la parte superior de la barra lateral izquierda y en la página de búsqueda, y admite palabras clave de canciones, artistas, álbumes y listas. Los resultados multifuente se fusionan con desduplicación por expresiones regulares y se ordenan por relevancia; las pistas cuya fuente es una vista previa se etiquetan fielmente conforme a las reglas de [calidad de audio e indicadores de vista previa](/es/project/#4-fuentes-de-audio-y-cadena-de-letras); una vista previa jamás se presenta como pista completa.

## 3. Listas de éxitos y listas oficiales

![Página de listas de éxitos de Sonic: pestañas de novedades y de listas oficiales; clasificaciones por todas, chino, occidental, japonés y coreano; la lista incluye puesto, portada, canción, artista, álbum y duración](/images/sonic/ui/ui-charts.png)

*Figura: página de listas de éxitos. A la izquierda, el selector de listas (novedades y listas oficiales, con las categorías todas, chino, occidental, japonés y coreano); a la derecha, la lista y «reproducir todo». Los datos provienen de las listas oficiales de origen y de las tendencias reales de escucha del sitio.*

La «lista de tendencias del sitio» de la página de inicio y la página de listas de éxitos comparten el mismo modelo de popularidad: ponderación de cinco factores (reproducción válida, oyentes independientes, comportamiento de finalización, conversión a favoritos y pendiente de crecimiento), con decaimiento temporal exponencial y suavizado bayesiano (la descripción del modelo consta en la sección 5 de la [Presentación del proyecto](/es/project/)).

## 4. Artistas y álbumes

![Página de biblioteca de artistas de Sonic: filtros duales por tipo (todos, hombres, mujeres, bandas) y por región (chino, occidental, japonés, coreano, otros), búsqueda por inicial de la A a la Z y por popularidad; las tarjetas de artista muestran el número de álbumes](/images/sonic/ui/ui-artists.png)

*Figura: biblioteca de artistas. Filtra los artistas por tres dimensiones: tipo, región e inicial; las tarjetas muestran el avatar, el nombre y el número de álbumes. Al entrar en la página del artista puede explorar sus canciones populares y su lista de álbumes; la página del álbum detalla además sus pistas.*

Las páginas de detalle de artistas, álbumes y canciones comparten un proxy de portadas y un análisis de temperatura de color uniformes (el color dominante de la portada tiñe el degradado de la página); todos los datos de las listas se obtienen de las interfaces abiertas oficiales de origen y se presentan tras pasar por la caché y la desduplicación.

## 5. Controles de reproducción (barra inferior)

![Barra de reproducción inferior de Sonic: al reproducir «晴天» muestra la línea de vista previa de la letra, anterior, reproducir, siguiente, modo de reproducción, menú de calidad (SQ sin pérdida), descarga y control de volumen](/images/sonic/ui/ui-player.png)

*Figura: barra inferior en estado de reproducción. A la izquierda, portada, información de la pista actual y línea de vista previa de la letra; en el centro, los controles de reproducción y el cambio de modo de reproducción; a la derecha, el menú de calidad (insignia actual «SQ sin pérdida»), la descarga, el deslizador de volumen y el acceso a la lista de reproducción. Al pulsar la zona de la portada se despliega el panel completo del reproductor.*

La barra de reproducción inferior está presente en todas las páginas y ofrece:

1. Menú de calidad: enumera los niveles realmente disponibles de la fuente actual (como SQ sin pérdida, HQ alta calidad y estándar); la insignia refleja fielmente la calidad del flujo actual, sin sobredeclaración;
2. Línea de vista previa de la letra: muestra la frase en curso de la letra palabra por palabra;
3. Modo de reproducción: conmutación entre lista en bucle, repetición de una sola pista, aleatorio y demás modos;
4. Descarga: guarda la pista actual en el navegador (IndexedDB); véase la sección 5.

## 6. Panel del reproductor y letras palabra por palabra

![Panel completo del reproductor de Sonic: a la izquierda la animación de la portada en disco de vinilo y la información de la pista; a la derecha el panel de letras deslizante; el fondo degrada con los tonos de la portada; arriba a la derecha, conmutación de fondo y de modo de visualización](/images/sonic/ui/ui-player-drawer.png)

*Figura: panel completo del reproductor. A la izquierda, la portada (animación de disco de vinilo) y los controles de reproducción; a la derecha, el panel deslizante de letras palabra por palabra; el fondo degrada en tiempo real con el color dominante de la portada. El panel se despliega al pulsar la portada de la barra inferior.*

El panel del reproductor ofrece:

1. Letras palabra por palabra: presenta con prioridad la línea de tiempo por carácter de YRC, QRC y KRC, complementada con AMLL TTML y LRCLIB; el panel de letras admite tres conmutadores independientes, «original», «traducción» y «romanización» (también controlables en los ajustes), y al pulsar una línea salta a la posición de reproducción;
2. Modos de portada: animaciones de portada como el disco de vinilo y el espectro circular;
3. Visualización de audio: modos de espectro como barras, onda y círculo, aplicados al fondo del panel o al reproductor inferior (configurable en los ajustes);
4. Salto por arrastre: la barra de progreso admite arrastre y la letra se desplaza en sincronía con la posición de reproducción.

## 7. Mi música

La zona «Mi música» contiene cuatro apartados:

| Página | Contenido | Lugar de almacenamiento |
| --- | --- | --- |
| Me gusta | Canciones favoritas y listas de reproducción, álbumes, artistas y MV guardados | localStorage del navegador (`library`) |
| Reproducidos recientemente | Historial de reproducción | localStorage del navegador (`audio`) |
| Lista de descargas | Pistas descargadas para uso sin conexión (con metadatos de calidad) | IndexedDB del navegador (`downloaded_music`) |
| Música local | Archivos de audio locales importados manualmente (admite arrastrar y soltar hacia el navegador) | IndexedDB del navegador (`local_music`) |

Todo ello se guarda únicamente en su navegador y no se sube al servidor; se elimina al borrar los datos del navegador o al usar «Borrar todos los datos locales». Los archivos descargados o importados localmente son solo para su escucha personal y no pueden redistribuirse (véase la [Política de uso aceptable](/es/acceptable-use/)).

## 8. Ajustes

![Página de ajustes de Sonic: tarjetas de configuración del modo de tema (según el sistema), la lengua de la interfaz (chino), el tipo de fondo, la calidad de audio, la letra del reproductor inferior, la visualización de audio y demás preferencias](/images/sonic/ui/ui-settings.png)

*Figura: la página de ajustes organiza todas las preferencias en tarjetas. Cada tarjeta corresponde a un grupo de ajustes: modo de tema (claro, oscuro, según el sistema), lengua de la interfaz (chino, English, 日本語), tipo de fondo, preferencia de calidad de audio, visualización de la letra en el reproductor inferior, modos de visualización de audio, entre otros.*

Los ajustes surten efecto de inmediato y se guardan en el almacenamiento local del navegador (claves `settings`, `global`, entre otras); no se vinculan a la cuenta ni se suben al servidor.

## 9. Privacidad y control de datos

![Bloque de privacidad y datos locales de la página de ajustes de Sonic: explicación del almacenamiento local del navegador y de IndexedDB, conmutadores de búsqueda inteligente y recomendación personalizada, conmutador de radio continua automática (Auto DJ) y botón de restablecimiento del perfil de recomendación y del registro de no me gusta](/images/sonic/ui/ui-privacy.png)

*Figura: bloque «Privacidad y datos locales» de la página de ajustes. El bloque explica que «los siguientes datos se guardan solo en tu navegador y no se suben al servidor»; el conmutador de «búsqueda inteligente y recomendación personalizada» indica que, al desactivarlo, se pasa de inmediato a modo puramente público y deja de registrar cualquier evento de comportamiento; el botón de «restablecer el perfil de recomendación y el registro de no me gusta» borra de inmediato los datos de comportamiento del servidor.*

Este bloque materializa en la interfaz los derechos de autoservicio descritos en la sección 9 de la [Política de privacidad](/es/privacy-policy/):

1. Conmutador de búsqueda inteligente y recomendación personalizada: al desactivarlo, los eventos dejan de recogerse y las recomendaciones pasan a modo puramente público;
2. Conmutador de radio continua automática (Auto DJ): controla la continuación automática al terminar la lista de reproducción;
3. Restablecer el perfil de recomendación y el registro de no me gusta: destruye de inmediato en el servidor todos los eventos de comportamiento asociados a usted (`DELETE /api/sonic/events`);
4. Borrar todos los datos locales: tras un cuadro de confirmación, borra todo el contenido del almacenamiento local del navegador y de IndexedDB, y restablece a la vez el perfil en el servidor.

## 10. Móvil

![Página de inicio en móvil de Sonic: carrusel, recomendación inteligente y radar musical, etiquetas de señales de preferencia (周杰伦, mandopop, r&b), tarjetas de recomendación personalizada con sus motivos, y en la parte inferior la barra de reproducción mini y la navegación por pestañas (inicio, búsqueda, reproducidos recientemente, ajustes)](/images/sonic/ui/ui-mobile-home.png)

*Figura: disposición en móvil. Las tarjetas indican el motivo de la recomendación personalizada con las aclaraciones «escuchas a menudo» y «se parece a los estilos que prefieres»; las señales de preferencia se presentan como etiquetas; en la parte inferior están la navegación por pestañas y la barra de reproducción mini. El panel del reproductor en móvil (PlayerDrawerMobile) ofrece la misma letra palabra por palabra y el mismo menú de calidad.*

El móvil y el escritorio comparten el mismo sistema de cuentas y las mismas reglas de almacenamiento de datos; la presentación de los motivos de recomendación sigue los mismos principios de transparencia que en escritorio.

## 11. Documentación relacionada

| Documento | Contenido |
| --- | --- |
| [Presentación del proyecto](/es/project/) | Identidad del producto, arquitectura, motor de recomendación y diseño de seguridad |
| [Política de privacidad](/es/privacy-policy/) | Alcance de los eventos de comportamiento, bases jurídicas y ejercicio de derechos |
| [Términos del servicio](/es/terms-of-service/) | Condiciones contractuales de uso del servicio |
| [Tratamiento de datos y seguridad](/es/data-security/) | Ciclo de vida de los datos y medidas técnicas |
