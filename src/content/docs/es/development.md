---
title: Guía de desarrollo
description: "Guía de desarrollo de Sonic: estructura del repositorio, comandos de compilación, suite de pruebas, verificación de la coherencia documental y participación en las contribuciones."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Esta página se dirige a quienes participen en el desarrollo y en el desarrollo derivado, y describe la estructura del repositorio, los comandos de compilación, la suite de pruebas y la verificación de la coherencia documental. La licencia y los límites jurídicos constan en [Código abierto y autoalojamiento](/es/open-source/). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

## 1. Estructura del repositorio

| Ruta | Contenido |
| --- | --- |
| `player/` | Reproductor web Vue 3 (i18n integrado en tres lenguas: zh, en, ja) |
| `functions/` | Pasarela de borde en Cloudflare Pages Functions (enrutamiento, limitación de peticiones, caché, disyuntor) |
| `functions/_lib/sonic/` | Lógica compartida de recomendación, identidad, protocolos de origen y seguridad |
| `server/` | Motor Node.js 22 del plano de datos (incluye el almacenamiento SQLite de `recommend-sqlite.ts`) |
| `Dockerfile` / `docker-compose.yml` | Pila de contenedores del plano de datos (sonic-engine + ncm-api) |
| `docs/` | Documentación de operaciones, conformidad, subsanación de auditoría y problemas conocidos |
| `tests/` | Pruebas de seguridad, pasarela, recomendación y compuertas de publicación |

## 2. Compilación y ejecución local

```bash
npm ci                              # dependencias raíz
pnpm --dir player install --frozen-lockfile
npm run build                       # compilación del reproductor + copia en dist
npx wrangler pages dev dist         # pasarela de borde local (modo de degradación automático sin plano de datos)
npm run build:engine && npm run start:engine   # motor local del plano de datos
```

## 3. Suite de pruebas

Ejecutada antes de cada publicación con `npm test`; cubre:

1. Comportamiento de la pasarela y degradación (`test-sonic-gateway.mjs`, `test-local-engine-and-degradation.mjs`);
2. Compatibilidad de autenticación y seguridad OAuth (`test-auth-compatibility.mjs`, `tests/oauth-security.test.ts`);
3. SSRF y endurecimiento de la seguridad (`tests/ssrf-security.test.ts`, `tests/security*.test.ts`);
4. Recomendación y búsqueda (`tests/recommendation-and-search.test.ts`);
5. XSS del frontal (`tests/frontend-xss.test.ts`);
6. Paridad de configuración: comparación punto por punto de `.env.example` con las variables de entorno que lee el código (`tests/config-parity.test.ts`);
7. Compuerta de publicación P0/P1 (`tests/release-p0-p1-gate.test.ts`).

## 4. Verificación de la coherencia documental

Este sitio (sonicdocs) evoluciona con cada versión y se contrasta con el código fuente; la cadena de herramientas de verificación:

```bash
pnpm validate    # compilación + comprobación de enlaces de ancla internos rotos + verificación de la simetría estructural multilingüe
```

1. `scripts/validate-anchors.cjs`: cero enlaces rotos en las anclas internas y las referencias a imágenes de todo el sitio;
2. `scripts/check-structure.py`: simetría estructural 1:1 de títulos, tablas, imágenes y cuadros de aviso entre las versiones lingüísticas;
3. `doc/legal-reference.md`: lista blanca de las citas de artículos del RGPD (verificada contra EUR-Lex); los documentos no pueden citar artículos fuera de la lista blanca;
4. Esta revisión comprueba el 2026-11-02 la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), distinta de la antigua `main@ce443c8` (2026-10-27 UTC), sin certificar la operación ni los contratos. Compare código, entorno, Compose y rutas reales; corrija discrepancias sin invocar «prevalece el código» para excluir derechos o responsabilidad por información errónea. Las carencias de consentimiento, borrado y privacidad siguen pendientes de corrección.

## 5. Participación en las contribuciones

1. Incidencias y discusión: Issues del repositorio de GitHub (`github.com/shijianus/sonic`);
2. Antes de enviar una contribución, ejecute la suite de pruebas completa y `npm run lint`;
3. Los cambios que afecten al tratamiento de datos (nuevos elementos de recogida, cambios en la política de retención, nuevas comparticiones con terceros) deben actualizar sincrónicamente la documentación correspondiente de este sitio y pasar la verificación de coherencia;
4. La introducción de dependencias de terceros exige actualizar `THIRD_PARTY_NOTICES.md` y evaluar su impacto en la privacidad y en la licencia.

## 6. Contribución a la traducción de la documentación

El chino simplificado de la raíz es la referencia de mantenimiento, con nueve traducciones. Sincronice párrafos y estructura 1:1 sin reducir protecciones; las normas imperativas, la interpretación favorable al consumidor y la información comprensible prevalecen sobre la prioridad lingüística. Para una lengua nueva, registre el locale, traduzca los documentos, actualice el control estructural y respete las citas de `doc/legal-reference.md`.
