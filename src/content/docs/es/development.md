---
title: Guía de desarrollo
description: "Guía de desarrollo de Sonic: estructura del repositorio, comandos de compilación, suite de pruebas, verificación de la coherencia documental y participación en las contribuciones."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página se dirige a quienes participen en el desarrollo y en el desarrollo derivado, y describe la estructura del repositorio, los comandos de compilación, la suite de pruebas y la verificación de la coherencia documental. La licencia y los límites jurídicos constan en [Código abierto y autoalojamiento](/es/open-source/).

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
npm ci                              # 根依赖
pnpm --dir player install --frozen-lockfile
npm run build                       # 播放器构建 + 复制至 dist
npx wrangler pages dev dist         # 本地边缘闸道（无数据面时自动降级模式）
npm run build:engine && npm run start:engine   # 本地数据面引擎
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
pnpm validate    # 构建 + 页内锚点断链检查 + 多语言结构对称校验
```

1. `scripts/validate-anchors.cjs`: cero enlaces rotos en las anclas internas y las referencias a imágenes de todo el sitio;
2. `scripts/check-structure.py`: simetría estructural 1:1 de títulos, tablas, imágenes y cuadros de aviso entre las versiones lingüísticas;
3. `doc/legal-reference.md`: lista blanca de las citas de artículos del RGPD (verificada contra EUR-Lex); los documentos no pueden citar artículos fuera de la lista blanca;
4. Los hechos técnicos se actualizan con cada versión contrastándolos con el código fuente (`.env.example`, `server/recommend-sqlite.ts`, `functions/_lib/sonic/security.ts`); ante discrepancia, prevalece el código fuente y se corrige la documentación.

## 5. Participación en las contribuciones

1. Incidencias y discusión: Issues del repositorio de GitHub (`github.com/shijianus/sonic`);
2. Antes de enviar una contribución, ejecute la suite de pruebas completa y `npm run lint`;
3. Los cambios que afecten al tratamiento de datos (nuevos elementos de recogida, cambios en la política de retención, nuevas comparticiones con terceros) deben actualizar sincrónicamente la documentación correspondiente de este sitio y pasar la verificación de coherencia;
4. La introducción de dependencias de terceros exige actualizar `THIRD_PARTY_NOTICES.md` y evaluar su impacto en la privacidad y en la licencia.

## 6. Contribución a la traducción de la documentación

Este sitio tiene una estructura multilingüe espejo: toda modificación en una lengua debe sincronizarse con las demás (la simetría estructural 1:1 la verifican los scripts). Al añadir una lengua: registre el locale, complete toda la documentación, incorpore la lengua a la lista del script de estructura y coteje las citas de las normas legales según el formato de cita de esa lengua previsto en `doc/legal-reference.md`.
