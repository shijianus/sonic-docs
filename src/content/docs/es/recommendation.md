---
title: Descripción del algoritmo de recomendación
description: "Algoritmo de recomendación de Sonic: señales y ponderaciones de comportamiento, modelo de popularidad, intención de sesión, reordenación MMR, Auto DJ y controles de privacidad asociados."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página describe en detalle el motor de recomendación de Sonic: qué señales se incorporan, cómo se ponderan, cómo se ordenan los resultados y qué controles tiene usted. Todas las reglas son públicas en el código fuente; las bases jurídicas y los límites de la recogida figuran en las secciones 4.2 y 5 de la [Política de privacidad](/es/privacy-policy/).

## 1. Señales y ponderaciones de comportamiento

| Señal | Ponderación | Significado |
| --- | --- | --- |
| favorite (añadir a favoritos) | +4.0 | Positivo muy fuerte |
| replay (repetición) | +3.5 | Positivo fuerte |
| play_complete (finalización válida) | +2.5 | Positivo estándar |
| play_progress (escucha por progreso) | +0.2 ～ +1.8 | Puntuación graduada según la proporción escuchada |
| skip (salto rápido) | -0.8 | Saltar tras escuchar más de la mitad computa +0.25 |
| dislike (rechazo explícito) | -5.0 | Filtrado estricto y lista de bloqueo |

**Depuración de ruido**: los saltos causados por cortes de red (network_stall), fallos de decodificación (playback_error), recortes de vista previa (trial_end), flujos no disponibles (stream_unavailable), tiempos de espera de búfer agotados (buffer_timeout) o fallos de conmutación automática (auto_switch_error), seis clases de saltos no imputables al usuario, tienen ponderación cero y no se almacenan.

## 2. Modelo de popularidad

La lista de tendencias del sitio pondera cinco factores: reproducciones válidas (35 %), oyentes independientes (25 %), finalizaciones (20 %), conversión a favoritos (15 %) y pendiente de crecimiento (5 %). También aplica una atenuación temporal exponencial (lista de tendencias de 24 horas y lista acumulada de 7 días) y suavizado bayesiano y de Wilson Score, para evitar que un hecho ocasional con pocas reproducciones pero alta finalización ocupe anormalmente los primeros puestos.

## 3. Intención de sesión y preferencias a largo plazo

La intención de búsqueda de la sesión (palabras clave consecutivas, clics en artistas y géneros) participa en el orden inmediato con una ponderación alta a corto plazo y se mantiene separada por capas de las preferencias a largo plazo: solo los comportamientos de alto valor, como las finalizaciones y los favoritos, se depositan en el perfil a largo plazo; una búsqueda ocasional no modifica de inmediato su perfil a largo plazo.

## 4. Reordenación por diversidad y Auto DJ

1. Similitud: combina el grafo de relaciones entre artistas, la similitud de conjuntos de etiquetas de género e idioma y el coseno de características de audio;
2. Reordenación MMR: la correlación marginal equilibra la «precisión» y la «novedad» para evitar quedar atrapado en la burbuja informativa de un único artista o estilo;
3. Auto DJ: cuando la lista de reproducción termina de forma natural, añade automáticamente pistas reproducibles que continúan según el estilo de la pista actual; puede desactivarlo en los ajustes.

## 5. Radar musical y de estilos

Después de completar una búsqueda, el radar de la página de inicio muestra de inmediato los resultados coincidentes según su intención de búsqueda y sus señales de preferencia, con un estilo alineado con el de los sencillos populares; el radar solo afecta a la secuencia de recomendaciones que usted ve y no modifica ningún dato almacenado.

## 6. Sus controles

| Control | Ubicación | Efecto |
| --- | --- | --- |
| Conmutador general de personalización | Ajustes → Privacidad y datos locales | Al desactivarlo dejan de recogerse eventos y las recomendaciones pasan a modo puramente público |
| Conmutador de Auto DJ | Ajustes → Privacidad y datos locales | Controla la continuación automática al terminar una lista |
| Restablecer el perfil de recomendación y el registro de no me gusta | Ajustes → Privacidad y datos locales | Destruye de inmediato en el servidor todos los eventos de comportamiento |
| Rechazar una pista | Botón de rechazo (dislike) del reproductor | Filtrado estricto; la pista deja de aparecer en recomendaciones |

Los hechos técnicos del algoritmo se actualizan con la evolución del código fuente; si este documento y el código fuente discrepan, prevalece el código y se corrige el documento (el procedimiento de verificación figura en la sección 4 de la [Guía de desarrollo](/es/development/)).
