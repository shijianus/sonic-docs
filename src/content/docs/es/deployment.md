---
title: Guía de despliegue
description: "Guía de despliegue de Sonic: las dos opciones, pasarela de borde en Cloudflare Pages y motor local en Linux, variables de entorno, copias de seguridad y recuperación, comprobaciones de salud y retroceso."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Esta página presenta los componentes de despliegue, la configuración y la operación de Sonic. Los roles legales dependen de las decisiones reales de tratamiento; deben evaluarse por separado las pruebas personales y el servicio público. Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea. Antes de prestar un servicio público, verifique la identidad del responsable, países de los nodos, contratos y garantías aplicables, que el código solo no acredita. Véanse [Tratamiento de datos y seguridad](/es/data-security/), [Código abierto y autoalojamiento](/es/open-source/) y `docs/OPERATIONS.md`.

## 1. Opción A: pasarela de borde en Cloudflare Pages

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME
```

Antes de ejecutar los comandos, sustituya `YOUR_PROJECT_NAME` por el nombre real de su proyecto de Pages. Configure en el panel de Cloudflare Pages las variables de entorno cifradas: `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (idéntica al lado del VPS) y `SONIC_LOCAL_ENGINE_URL` (que apunte al dominio de túnel de su plano de datos).

## 2. Opción B: motor de protocolos local en Linux (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8
cp .env.example .env
chmod 600 .env    # establezca valores fuertes y aleatorios para SONIC_ENGINE_SECRET y SONIC_SECRET
docker compose up -d --build
docker compose ps
curl -H "X-Sonic-Engine-Key: <YOUR_SECRET>" http://127.0.0.1:8080/api/sonic/engine/health
```

La pila se compone del contenedor principal sonic-engine (mapeado en el host únicamente a `127.0.0.1:8080`), del contenedor auxiliar ncm-api cerrado en la red interna y de la persistencia SQLite (volumen con nombre `sonic-data`). El plano de datos se accede por Cloudflare Tunnel y no se expone directamente a la Internet pública.

## 3. Variables de entorno principales

| Variable | Descripción |
| --- | --- |
| `SONIC_SECRET` | Clave de firma de las claves de API, de longitud ≥ 32 caracteres (`openssl rand -base64 48`) |
| `SONIC_ENGINE_SECRET` | Clave entre servicios, idéntica en ambos lados, Pages y VPS |
| `SONIC_LOCAL_ENGINE_URL` | Dirección de túnel del plano de datos |
| `SONIC_ENABLE_NETEASE/QQ/KUGOU/KUWO` | Conmutadores de los protocolos de fuentes integradas (por defecto 1) |
| `SONIC_ENABLE_AMLL/LRCLIB` | Conmutadores del complemento de letras (por defecto 1) |
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | Vías opcionales; GDStudio se activa si falta el ajuste en el código, pero está desactivado en el ejemplo de entorno y Compose. Activarlas no permite eludir protecciones de pago, acceso o contenido |
| `SONIC_RECOMMEND_DB_PATH` | Ruta de almacenamiento de eventos; `memory` no garantiza ausencia de datos en otros almacenamientos, registros o servicios |
| `SONIC_RECOMMEND_RETENTION_DAYS` | 90 días por defecto, mínimo 7; no cubre todo el radar, búsquedas y agregados, y una limpieza al escribir sigue usando 90 días fijos  |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | Limitación de peticiones (por defecto 240/600) |
| `EPOMAIL_BASE_URL`, entre otras | Configuración del OAuth de Epomail |

La lista completa consta en `.env.example` del repositorio de origen; el requisito de concordancia de la información con los conmutadores de privacidad consta en la sección 6 de [Tratamiento de datos y seguridad](/es/data-security/).

## 4. Copia de seguridad y recuperación

1. Copias de seguridad: las herramientas `VACUUM INTO` y `npm run backup:db` no prueban que haya copias programadas en la instancia. Proteja las copias como los datos activos y defina un ciclo real de conservación;
2. Recuperación: verifique la compatibilidad de versión antes de `npm run restore:db` y reaplique las supresiones. Las copias no borrables individualmente deben aislarse, excluirse del uso habitual y eliminarse en un plazo definido;
3. Capacidad: limpiar ciertos eventos al arrancar o escribir no equivale a destruirlos al cumplir 90 días y no cubre todo el radar, búsquedas, agregados, registros ni copias; compruebe los plazos y vigile el espacio.

## 5. Comprobaciones de salud y retroceso

1. Comprobación de salud: `GET /api/sonic/engine/health` (requiere la clave de servicio) devuelve el estado del motor y del disyuntor; el disyuntor del lado del borde se degrada automáticamente ante fallos consecutivos del plano de datos;
2. Registros: la minimización de la aplicación no garantiza cero registros en todo el despliegue; revise errores, anfitrión, proxy y proveedores. La IP sin transformar puede utilizarse en KV o un limitador y se transmiten al motor cabeceras de cliente, sesión y contexto;
3. Retroceso: en el lado de Pages basta volver a la versión de despliegue anterior; en el plano de datos, haga `git checkout` de la etiqueta anterior y ejecute de nuevo `docker compose up -d --build`; antes del retroceso, confirme la compatibilidad del esquema SQLite (no hay marco de migraciones).

## 6. Lista de cotejo del desplegador

Confirme punto por punto antes de pasar a producción:

1. Ambas claves son fuertemente aleatorias y de longitud ≥ 32 caracteres; permisos 600 del `.env`;
2. Los conmutadores de los circuitos de terceros concuerdan con su información de privacidad (los no activados deben eliminarse de la información);
3. Los días de retención de los eventos de comportamiento y la ruta de persistencia cumplen los compromisos de su política;
4. El plano de datos solo es alcanzable por el túnel y los puertos del host no están abiertos a la Internet pública;
5. Existe un plan de copias de seguridad y se ha ensayado la recuperación;
6. Existen información exacta y elecciones previas válidas: deben corregirse los perfiles/Auto DJ activados por defecto, las sugerencias públicas de búsquedas, el avatar DiceBear con correo, el borrado parcial y los enlaces de origen HTTP, o suspenderse los tratamientos afectados. Verifique también la revocación y la ruta de radar ausente; publicar la [Política de privacidad](/es/privacy-policy/) no basta para hacerlos lícitos.
