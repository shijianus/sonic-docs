---
title: Guía de cuenta y seguridad
description: "Guía de cuenta y seguridad de Sonic: inicio de sesión OAuth de Epomail, mecanismo de sesión, custodia de la clave de API, revocación y consejos de seguridad."
---

**Fecha de revisión: 2 de noviembre de 2026｜Versión: 1.8**

Esta página explica cómo funciona el sistema de cuentas de Sonic y cómo utilizarlo de forma segura. La descripción técnica completa figura en la sección 3.2 de [Tratamiento de datos y seguridad](/es/data-security/); las condiciones contractuales, en la sección 3 de los [Términos del servicio](/es/terms-of-service/). Las funciones descritas se basan en la RC pública `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) de `shijianus/sonic`, comprobada el 2026-11-02. La antigua `main@ce443c8` (2026-10-27 UTC) es distinta; ninguna de las dos demuestra qué versión está desplegada en línea.

## 1. Método de inicio de sesión

El servicio usa Epomail OAuth 2.0 con PKCE, sin registro Sonic separado: abra el acceso a la cuenta, confirme en Epomail y vuelva al servicio. El flujo comprueba, entre otros, `state`, PKCE y el código de autorización, con un límite predeterminado de 30 peticiones por minuto y por IP. Los datos recibidos incluyen el correo y su indicador de verificación; la ausencia de `email_verified` no se rechaza sistemáticamente en el código comprobado. Los campos no acreditan la edad: el mínimo de 16 años es una regla de acceso, no una verificación realizada. Iniciar sesión no equivale a consentir los perfiles.

## 2. Mecanismo de sesión

1. Cookie de sesión: `sonic_session`, con atributos `HttpOnly; Secure; SameSite=Lax`, dura 30 días por defecto y contiene una credencial firmada; HttpOnly limita la lectura por scripts, pero la firma no cifra la carga, que puede incluir correo e identificadores;
2. Sincronización entre pestañas: el estado de sesión puede sincronizarse en un mismo navegador; eso no garantiza sincronización de la biblioteca en la nube ni revocación de todas las copias de una credencial;
3. Almacenamiento de cuenta: `auth` de localStorage conserva, entre otros, el correo y el avatar; por tanto, los datos de cuenta no están solo en memoria. Las cookies de transacción OAuth duran unos 600 segundos; proteja también los datos legibles por scripts.

## 3. Custodia de la clave de API

La clave de API es una credencial personal (formato `sonic_live_v2.…`, firmada con HMAC-SHA256):

1. solo se transmite en cabeceras de petición y nunca se coloca en una URL;
2. no debe entregarse a terceros ni integrarse en clientes publicados;
3. para volver a emitirla es necesario presentar la clave vigente; si se filtra, cierre la sesión y revoque la clave de inmediato (véase la sección 4).

## 4. Revocación y cierre de sesión

| Operación | Ubicación | Efecto |
| --- | --- | --- |
| Cerrar sesión | En el reproductor | Borra la cookie actual; invalidar copias remotas depende de la configuración y de la petición |
| Revocar la clave | `POST /api/auth/revoke` | Requiere almacenamiento de revocación operativo y una petición correcta; puede fallar o no estar disponible |
| Invalidación masiva | Configuración del desplegador | Lista de revocación de jti, lista de revocación de sujetos y mínimo global de tiempo de emisión |

## 5. Consejos de seguridad

1. Cierre siempre la sesión después de usar un dispositivo compartido (la cookie de sesión contiene la clave firmada);
2. Active la verificación en dos pasos en su cuenta de Epomail (en Epomail);
3. No preste ni comparta su cuenta: los datos mezclados por compartir una cuenta no pueden separarse ni recuperarse;
4. Si observa reproducciones inusuales o sesiones de origen desconocido, cierre la sesión de inmediato y escriba a `admin@epocanvas.com`;
5. El servicio nunca recoge contraseñas (Epomail gestiona el inicio de sesión); cualquier solicitud de «verificación de contraseña de Sonic» es una suplantación.

## 6. Acceso a la gestión de la cuenta

La entrada de cuenta situada en la parte inferior de la barra lateral muestra el estado actual: cuando no ha iniciado sesión ofrece orientación para hacerlo; cuando sí lo ha hecho muestra el apodo de la cuenta y un enlace de gestión (al perfil y la bandeja de entrada de Epomail). El estado de inicio de sesión se sincroniza automáticamente entre pestañas.
