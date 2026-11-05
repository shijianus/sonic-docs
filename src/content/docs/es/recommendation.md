---
title: Descripción del algoritmo de recomendación
description: "Algoritmo de recomendación de Sonic: señales y ponderaciones de comportamiento, modelo de popularidad, intención de sesión, reordenación MMR, Auto DJ y controles de privacidad asociados."
---

**Fecha de revisión: 3 de noviembre de 2026｜Versión: 1.9**

Esta página describe señales, ponderaciones, ordenación y controles del motor de recomendación. La personalización y Auto DJ están activados por defecto en el código candidato, sin prueba de consentimiento afirmativo; ni iniciar sesión ni aceptar las condiciones equivale a consentir los perfiles opcionales. Los identificadores hash o `anon_` son seudónimos, no necesariamente anónimos. Las bases y los límites figuran en las secciones 4.2 y 5 de la [Política de privacidad](/es/privacy-policy/). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

## 1. Señales y ponderaciones de comportamiento

| Señal | Ponderación | Significado |
| --- | --- | --- |
| favorite (añadir a favoritos) | +4.0 | Positivo muy fuerte |
| replay (repetición) | +3.5 | Positivo fuerte |
| play_complete (finalización válida) | +2.5 | Positivo estándar |
| play_progress (escucha por progreso) | +0.2 ～ +1.8 | Puntuación graduada según la proporción escuchada |
| skip (salto rápido) | -0.8 | Saltar tras escuchar más de la mitad computa +0.25 |
| dislike (rechazo explícito) | -5.0 | Filtra las recomendaciones coincidentes solo dentro del alcance de la identidad y las funciones disponibles; no promete un bloqueo permanente y universal |

**Depuración de ruido**: los saltos causados por cortes de red (network_stall), fallos de decodificación (playback_error), recortes de vista previa (trial_end), flujos no disponibles (stream_unavailable), tiempos de espera de búfer agotados (buffer_timeout) o fallos de conmutación automática (auto_switch_error), seis clases de saltos no imputables al usuario, tienen ponderación cero y no se almacenan.

## 2. Modelo de popularidad

La lista de tendencias del sitio pondera cinco factores: reproducciones válidas (35 %), oyentes independientes (25 %), finalizaciones (20 %), conversión a favoritos (15 %) y pendiente de crecimiento (5 %). También aplica una atenuación temporal exponencial (lista de tendencias de 24 horas y lista acumulada de 7 días) y suavizado bayesiano y de Wilson Score, para evitar que un hecho ocasional con pocas reproducciones pero alta finalización ocupe anormalmente los primeros puestos.

## 3. Intención de sesión y preferencias a largo plazo

La intención de búsqueda de la sesión participa en el orden inmediato, pero eso no significa que las búsquedas nunca se conserven: las consultas se cuentan por separado y pueden aparecer en sugerencias públicas incluso después de desactivar la personalización. Las solicitudes de recomendación también pueden transmitir favoritos locales, artistas recientes y contexto de búsqueda; los identificadores seudónimos siguen siendo datos potencialmente vinculables.

## 4. Reordenación por diversidad y Auto DJ

1. Similitud: combina el grafo de relaciones entre artistas, la similitud de conjuntos de etiquetas de género e idioma y el coseno de características de audio;
2. Reordenación MMR: la correlación marginal equilibra la «precisión» y la «novedad» para evitar quedar atrapado en la burbuja informativa de un único artista o estilo;
3. Auto DJ: cuando la lista de reproducción termina de forma natural, añade automáticamente pistas reproducibles que continúan según el estilo de la pista actual; puede desactivarlo en los ajustes. Su interruptor es independiente de la personalización: cuando esta se desactiva, todavía pueden enviarse semillas y pistas excluidas.

## 5. Radar musical y de estilos

Después de una búsqueda, el radar muestra resultados según la intención de búsqueda y las preferencias. Incluye datos locales, perfiles, respuestas sobre entidades y lógica de sincronización; es inexacto afirmar que no modifica datos. Después de desactivar la personalización, todavía puede enviar una carga con pistas, portadas y señales; el servidor puede rechazar conservarla debido a la marca de desactivación. Las peticiones pueden incluir favoritos y contexto de búsqueda, incluidos metadatos de música local.

## 6. Sus controles

| Control | Ubicación | Efecto |
| --- | --- | --- |
| Conmutador general de personalización | Ajustes → Privacidad y datos locales | Controla los eventos correspondientes, no las búsquedas originales recogidas por separado que pueden aparecer en sugerencias públicas; el modo de incógnito no bloquea los envíos |
| Conmutador de Auto DJ | Ajustes → Privacidad y datos locales | Controla la continuación; estar activado por defecto no prueba consentimiento para los perfiles |
| Restablecer el perfil de recomendación y el registro de no me gusta | Ajustes → Privacidad y datos locales | Borrado parcial de la identidad actual; puede omitir identificadores anónimos antiguos, radar, agregados, servicios externos y copias de seguridad, y ocultar fallos |
| Rechazar una pista | Botón de rechazo (dislike) del reproductor | Filtra las recomendaciones coincidentes solo dentro del alcance de la identidad y las funciones disponibles; no promete un bloqueo permanente y universal |

Los comportamientos técnicos deben contrastarse con el código y el despliegue; una contradicción exige corregirse, sin que el código autorice tratamientos ilícitos o excluya derechos. Los 90 días predeterminados de ciertos eventos no cubren todo el perfil. Para una supresión completa, contacte con `privacy@epocanvas.com`; el método de comprobación figura en la [Guía de desarrollo](/es/development/).
