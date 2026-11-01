---
title: Guía de despliegue
description: "Guía de despliegue de Sonic: las dos opciones, pasarela de borde en Cloudflare Pages y motor local en Linux, variables de entorno, copias de seguridad y recuperación, comprobaciones de salud y retroceso."
---

**Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.4**

Esta página describe las dos opciones para desplegar Sonic por sí mismo, las variables de entorno principales, la copia de seguridad y la recuperación, y los puntos operativos esenciales. Desde el momento del despliegue, quien despliega es el responsable del tratamiento de sus usuarios; las obligaciones pertinentes constan en la sección 6 de [Tratamiento de datos y seguridad](/es/data-security/) y en [Código abierto y autoalojamiento](/es/open-source/); el detalle operativo autoritativo consta en `docs/OPERATIONS.md` del repositorio de origen.

## 1. Opción A: pasarela de borde en Cloudflare Pages

```bash
git clone git@github.com:shijianus/sonic.git
cd sonic
corepack enable
corepack prepare pnpm@10.34.5 --activate
npm ci
pnpm --dir player install --frozen-lockfile
npm run build
npx wrangler pages deploy dist --project-name <你的项目名>
```

Configure en el panel de Cloudflare Pages las variables de entorno cifradas: `SONIC_SECRET`, `SONIC_ENGINE_SECRET` (idéntica al lado del VPS) y `SONIC_LOCAL_ENGINE_URL` (que apunte al dominio de túnel de su plano de datos).

## 2. Opción B: motor de protocolos local en Linux (Docker Compose)

```bash
mkdir -p /opt/sonic && cd /opt/sonic
git clone git@github.com:shijianus/sonic.git .
cp .env.example .env
chmod 600 .env    # 填入强随机 SONIC_ENGINE_SECRET 与 SONIC_SECRET
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
| `SONIC_ENABLE_GDSTUDIO/LYRIVA/UNBLOCK` | Agregación de terceros y elusión (por defecto 0; deben permanecer desactivados salvo necesidad real) |
| `SONIC_RECOMMEND_DB_PATH` | Ruta de persistencia de los datos de comportamiento; con `memory` se desactiva la persistencia |
| `SONIC_RECOMMEND_RETENTION_DAYS` | Días de retención de los eventos de comportamiento (por defecto 90, mínimo 7) |
| `SONIC_RATE_LIMIT_ANON_RPM / AUTH_RPM` | Limitación de peticiones (por defecto 240/600) |
| `EPOMAIL_BASE_URL`, entre otras | Configuración del OAuth de Epomail |

La lista completa consta en `.env.example` del repositorio de origen; el requisito de concordancia de la información con los conmutadores de privacidad consta en la sección 6 de [Tratamiento de datos y seguridad](/es/data-security/).

## 4. Copia de seguridad y recuperación

1. Copia de seguridad: ejecute `VACUUM INTO` con el script de instantáneas coherentes y su comprobación de integridad (`npm run backup:db`); los archivos de copia contienen datos de comportamiento seudonimizados y deben protegerse al mismo nivel que los datos de producción;
2. Recuperación: tras detener el servicio, restaure la instantánea con el script de recuperación (`npm run restore:db`); el repositorio no dispone de un marco de migraciones versionado, por lo que la versión destino de la recuperación debe coincidir con la versión de la copia;
3. Capacidad: los eventos de comportamiento se limpian automáticamente con la retención de 90 días; el volumen de la base de datos crece con los datos canónicos de pistas, por lo que conviene vigilar el espacio del volumen.

## 5. Comprobaciones de salud y retroceso

1. Comprobación de salud: `GET /api/sonic/engine/health` (requiere la clave de servicio) devuelve el estado del motor y del disyuntor; el disyuntor del lado del borde se degrada automáticamente ante fallos consecutivos del plano de datos;
2. Registros: los registros de acceso del lado del motor contienen únicamente la ruta, el método, el código de estado y la duración (`docker compose logs`); no registran la cadena de consulta, la IP, las cookies ni el cuerpo de la petición;
3. Retroceso: en el lado de Pages basta volver a la versión de despliegue anterior; en el plano de datos, haga `git checkout` de la etiqueta anterior y ejecute de nuevo `docker compose up -d --build`; antes del retroceso, confirme la compatibilidad del esquema SQLite (no hay marco de migraciones).

## 6. Lista de cotejo del desplegador

Confirme punto por punto antes de pasar a producción:

1. Ambas claves son fuertemente aleatorias y de longitud ≥ 32 caracteres; permisos 600 del `.env`;
2. Los conmutadores de los circuitos de terceros concuerdan con su información de privacidad (los no activados deben eliminarse de la información);
3. Los días de retención de los eventos de comportamiento y la ruta de persistencia cumplen los compromisos de su política;
4. El plano de datos solo es alcanzable por el túnel y los puertos del host no están abiertos a la Internet pública;
5. Existe un plan de copias de seguridad y se ha ensayado la recuperación;
6. Ha publicado ante sus usuarios el texto de información (puede tomar como base la [Política de privacidad](/es/privacy-policy/) de este sitio).
