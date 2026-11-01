---
title: Política de uso aceptable
description: "Política de uso aceptable de Sonic: ámbito de aplicación, catálogo de conductas prohibidas, límites de uso de recursos, escala de aplicación, canal de tolerancia cero y procedimiento de reclamación."
---

**Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5**

Esta política fija los límites de conducta para el uso del servicio Sonic (en lo sucesivo, «el servicio») y describe las conductas prohibidas y las medidas que puede adoptar el operador. Esta política es la norma de conducta a la que remite la sección 7 de los [Términos del servicio](/es/terms-of-service/) y debe observarse al utilizar el servicio; si no está de acuerdo con ella, deje de utilizar el servicio.

![Escala de aplicación de Sonic: cuatro niveles de actuación (advertencia, limitación, suspensión, terminación), seguidos de la conservación de pruebas y la remisión legal; canal de tolerancia cero con tramitación inmediata para la protección de menores y los contenidos terroristas; circuito de reclamación para la revisión por la parte interesada](/images/sonic/aup-ladder.svg)

*Figura: el operador aplica las medidas por niveles según la gravedad, registrando el motivo en cada escalón; el canal de tolerancia cero no sigue el procedimiento escalonado; toda medida es reclamable por la parte afectada.*

## 1. Ámbito de aplicación

Esta política se aplica a su uso del servicio por cualquier vía, incluido:

1. La totalidad de las funciones del reproductor web (búsqueda, reproducción, letras, recomendaciones, descargas e importación de música local);
2. El acceso a través de la API abierta, incluidos los clientes y scripts de terceros que usted construya;
3. Las instancias de autoalojamiento (los operadores de autoalojamiento pueden modificar esta política antes de aplicarla, pero no por debajo de lo exigido por la ley de su lugar).

## 2. Conductas prohibidas

### 2.1 Abuso del sistema y de las interfaces

1. Eludir o vulnerar la limitación de peticiones, la verificación de firmas, el mecanismo del disyuntor, la defensa SSRF, la lista blanca de dominios u otras medidas de protección técnica;
2. Falsificar claves de API, reutilizar identificadores de clave revocados (jti), apropiarse de sesiones o claves ajenas o eludir por cualquier medio la validación fail-closed;
3. Extraer masivamente con scripts automatizados los resultados de búsqueda, las letras o las direcciones de reproducción del servicio, para su reventa, redistribución o la construcción de conjuntos de datos espejo ajenos a las funciones del servicio;
4. Sondear, escanear u obtener por otros medios la topología interna del servicio, las claves entre servicios, el material de claves o los extremos no públicos;
5. Utilizar los extremos de proxy del servicio (`/api/music/stream`, `/api/sonic/forward`, entre otros) como proxy de red genérico para acceder a objetivos ajenos a la reproducción musical.

### 2.2 Contenidos y derechos

1. Utilizar las interfaces del servicio para descifrar, eludir o interferir los mecanismos de pago y de protección de derechos de autor de cualquier plataforma musical;
2. Difundir contenidos que vulneren derechos de autor, derechos de marca, derechos de imagen u otros derechos de la personalidad de terceros;
3. Subir o difundir contenidos ilícitos, incluidos los materiales de explotación sexual de menores y la propaganda terrorista;
4. Actuar suplantando a personas o entidades, o usar el nombre y los signos de `epocanvas` y `Sonic` para insinuar el respaldo del servicio en usos no autorizados;
5. Subir a las funciones de importación de música local o de descargas archivos ilícitos distribuidos mediante el servicio.

### 2.3 Derechos de terceros

1. Perturbar o alterar el funcionamiento normal del servicio o de cualquier sistema relacionado, incluida la activación deliberada del disyuntor y del mecanismo de degradación;
2. Hostigar, difamar o atacar al operador, a los proveedores de origen o a otros usuarios;
3. Emplear el servicio para cualquier fin que infrinja la ley de su lugar o las condiciones de los servicios de origen;
4. Vender, subarrendar o facilitar el acceso al servicio con fines de reventa comercial.

## 3. Límites de uso de recursos

| Concepto | Límite | Tratamiento del exceso |
| --- | --- | --- |
| Peticiones anónimas | 240 por minuto (valor por defecto) | Rechazo directo en la capa de borde (429); no se registra como infracción |
| Peticiones autenticadas | 600 por minuto (valor por defecto) | Rechazo directo en la capa de borde (429); el exceso sostenido entra en la escala de aplicación |
| Extremo de autenticación (inicio de sesión y emisión de claves) | 30 por minuto y por IP | Rechazo directo en la capa de borde (429) |
| Comunicación de eventos de comportamiento | Máximo 50 por lote y 64 KB por cuerpo de petición | La petición que exceda los límites se rechaza íntegramente |
| Flujo de audio | A través del proxy de borde o del modo directo solicitado por usted | La concurrencia anómala entra en la escala de aplicación |

El uso personal normal no alcanza los límites anteriores; la finalidad técnica de la limitación de peticiones es prevenir el abuso y sostener el servicio, no castigar. Los parámetros de limitación son configurables por el desplegador; en las instancias de autoalojamiento rige el valor efectivo de su configuración.

## 4. Escala de aplicación

Cuando el operador detecte una conducta infractora, aplicará las medidas siguientes según su gravedad, registrando el motivo en cada escalón:

1. Advertencia: aviso dentro del reproductor con explicación del motivo;
2. Limitación: reducción de la cuota de peticiones de esa cuenta o clave;
3. Suspensión: bloqueo temporal de la sesión y de la clave de API de esa cuenta (mediante la lista de revocación de `jti` o el mecanismo de revocación inmediata), con conservación temporal de los datos;
4. Terminación: fin del derecho de uso; los datos de comportamiento se destruyen al cumplirse el plazo de conservación (90 días, mínimo 7 días);
5. Conservación de pruebas y remisión legal: cuando la ley lo exija, conservar los registros en la medida necesaria y facilitarlos a las autoridades competentes por el procedimiento legal.

Las situaciones siguientes no siguen el procedimiento escalonado y el operador puede suspender de inmediato, remitir o denunciar: materiales de explotación sexual de menores, propaganda terrorista y ataques al sistema en curso.

## 5. Reclamaciones y denuncias

- Reclamación: si considera que una medida es errónea, puede escribir a `admin@epocanvas.com` exponiendo la cuenta afectada y el motivo; el operador revisa y responde en un plazo razonable. Las reclamaciones contra las medidas urgentes (supuestos de tolerancia cero de la sección 4) se admiten igualmente, y la revisión no suspende el recurso contra los errores de apreciación que le afecten.
- Denuncia: cualquiera que detecte una conducta infractora de esta política puede denunciarla al buzón anterior; la identidad de quien denuncia se mantiene reservada frente al denunciado mientras la denuncia no se verifique. Las denuncias sobre protección de menores no quedan limitadas por ese compromiso de reserva y se tramitan por el procedimiento legal.

Las medidas adoptadas por el operador conforme a esta política no exoneran al infractor de las responsabilidades que la ley le corresponde asumir.
