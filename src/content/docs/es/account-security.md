---
title: Guía de cuenta y seguridad
description: "Guía de cuenta y seguridad de Sonic: inicio de sesión OAuth de Epomail, mecanismo de sesión, custodia de la clave de API, revocación y consejos de seguridad."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta página explica cómo funciona el sistema de cuentas de Sonic y cómo utilizarlo de forma segura. La descripción técnica completa figura en la sección 3.2 de [Tratamiento de datos y seguridad](/es/data-security/); las condiciones contractuales, en la sección 3 de los [Términos del servicio](/es/terms-of-service/).

## 1. Método de inicio de sesión

El inicio de sesión se realiza con su cuenta de Epomail mediante OAuth 2.0 (PKCE); el servicio no dispone de sistema de registro independiente. El flujo es el siguiente: pulse la entrada de cuenta de la barra lateral → confirme en la página de autorización de Epomail → vuelva al servicio para completar el inicio. La devolución de llamada de autorización pasa cuatro comprobaciones (`state`, PKCE, código de autorización y protección contra la reutilización); los extremos de autenticación tienen además una limitación específica de 30 peticiones por minuto y por IP.

## 2. Mecanismo de sesión

1. Cookie de sesión: después de iniciar sesión se emite una cookie `HttpOnly; Secure; SameSite=Lax`, válida como máximo 30 días; contiene la clave de API firmada y los scripts no pueden leerla;
2. Sincronización entre pestañas: el estado de inicio de sesión se sincroniza automáticamente entre las pestañas del mismo navegador; al cerrar sesión en una pestaña, las demás lo detectan de inmediato;
3. Límites de las claves: las claves de API nunca se escriben en URL, parámetros de consulta ni localStorage; la cookie de transacción OAuth solo es válida durante 600 segundos.

## 3. Custodia de la clave de API

La clave de API es una credencial personal (formato `sonic_live_v2.…`, firmada con HMAC-SHA256):

1. solo se transmite en cabeceras de petición y nunca se coloca en una URL;
2. no debe entregarse a terceros ni integrarse en clientes publicados;
3. para volver a emitirla es necesario presentar la clave vigente; si se filtra, cierre la sesión y revoque la clave de inmediato (véase la sección 4).

## 4. Revocación y cierre de sesión

| Operación | Ubicación | Efecto |
| --- | --- | --- |
| Cerrar sesión | En el reproductor | Revoca de inmediato la sesión actual y el identificador de clave (jti) |
| Revocar la clave | `POST /api/auth/revoke` | Revoca la clave de API actual |
| Invalidación masiva | Configuración del desplegador | Lista de revocación de jti, lista de revocación de sujetos y mínimo global de tiempo de emisión |

## 5. Consejos de seguridad

1. Cierre siempre la sesión después de usar un dispositivo compartido (la cookie de sesión contiene la clave firmada);
2. Active la verificación en dos pasos en su cuenta de Epomail (en Epomail);
3. No preste ni comparta su cuenta: los datos mezclados por compartir una cuenta no pueden separarse ni recuperarse;
4. Si observa reproducciones inusuales o sesiones de origen desconocido, cierre la sesión de inmediato y escriba a `admin@epocanvas.com`;
5. El servicio nunca recoge contraseñas (Epomail gestiona el inicio de sesión); cualquier solicitud de «verificación de contraseña de Sonic» es una suplantación.

## 6. Acceso a la gestión de la cuenta

La entrada de cuenta situada en la parte inferior de la barra lateral muestra el estado actual: cuando no ha iniciado sesión ofrece orientación para hacerlo; cuando sí lo ha hecho muestra el apodo de la cuenta y un enlace de gestión (al perfil y la bandeja de entrada de Epomail). El estado de inicio de sesión se sincroniza automáticamente entre pestañas.
