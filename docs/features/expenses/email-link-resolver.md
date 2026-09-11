# Resolución de enlaces de hojas de gastos

## Responsabilidad

`IND_CRM_APP` solo resuelve el enlace recibido y abre el detalle autorizado. No envía correos ni aprueba, rechaza, paga, elimina o modifica una hoja.

Axapta decide las notificaciones de estados de hojas de gastos. `IND_INTERNAL_API` aporta el transporte genérico de correo. El enlace nunca concede permisos por sí mismo.

## Contrato de entrada

Ruta:

```text
GET /Gastos/ExpenseSheetLink
```

Parámetros:

- `hojaGastosId`: identificador obligatorio de la hoja.
- `targetCompanyId`: empresa obligatoria en la que se encuentra la hoja.
- `source`: dato opcional de trazabilidad; nunca participa en la autorización.

Formato esperado:

```text
{CRMAppUrl}/Gastos/ExpenseSheetLink?hojaGastosId={id}&targetCompanyId={companyId}&source={source}
```

Axapta debe construir la URL con la dirección pública de CRM, no con la dirección de `IND_INTERNAL_API`.

## Flujo actual

1. Normaliza y valida `hojaGastosId` y `targetCompanyId`.
2. Si falta autenticación, redirige al login conservando solo un `returnUrl` local y seguro.
3. Fuerza una lectura actualizada del contexto autenticado.
4. Comprueba que la empresa pertenece al usuario y que el módulo `GASTOS_HOJA_GASTO` concede al menos lectura.
5. Si la empresa activa es distinta, actualiza `INDCompanySelected`, conserva la selección y vuelve a cargar el contexto.
6. Realiza una única consulta fresca del detalle mediante `ICrmApiClient.GetExpenseSheetDetailAsync`.
7. El API decide en esa consulta si el actor firmado es propietario o tiene acceso como responsable de un subordinado autorizado. El navegador no envía una lista de usuarios para intentar accesos sucesivos.
8. Si la consulta devuelve la hoja, conserva temporalmente su `OwnerAxUserId` para que la pantalla de detalle utilice el mismo alcance autorizado.
9. Redirige a `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.

La apertura del enlace no utiliza una copia cacheada de la hoja. Cada apertura consulta de nuevo el API. El identificador de usuario efectivo se transfiere una sola vez con `TempData` y el frontend lo guarda durante un máximo de 12 horas en una clave de sesión acotada por `entraOid + companyId`. Las llamadas posteriores siguen pasando por la autorización del servidor.

## Fallos seguros

Se vuelve a `Home/Index` con un mensaje localizado cuando:

- faltan parámetros;
- el usuario no puede acceder a la empresa o al módulo;
- la hoja no existe o no pertenece a un alcance autorizado;
- falla el cambio de empresa;
- no existe token de sesión;
- el API no responde correctamente.

Los errores técnicos se registran en servidor. No se muestran trazas ni detalles internos al usuario.

## Reglas de seguridad

- Todos los parámetros son datos no confiables.
- `source` sirve solo para diagnóstico.
- Solo se aceptan retornos locales durante el login.
- La empresa activa se valida antes de consultar la hoja.
- La autorización de propietario o subordinado se resuelve en API/AX con el actor firmado.
- El detalle mantiene las mismas restricciones de lectura y acciones que una apertura normal desde la aplicación.
- No se admiten tokens de acción ni operaciones de un clic desde el correo.

## Fuentes de implementación

- `Program.cs`: ruta explícita.
- `Web/Controllers/Gastos/ExpenseSheetLinkController.cs`: validación, cambio de empresa y consulta única.
- `App/Infrastructure/Security/Auth/LocalReturnUrlHelper.cs`: retorno local seguro.
- `App/Infrastructure/Security/Filters/INDModuleAuthorizeFilter.cs`: integración con autorización de módulo.
- `Web/Controllers/Gastos/GastosController.cs`: entrega del usuario efectivo al detalle.
- `Web/wwwroot/react/src/pages/gastos/utils/expenseActingUser.ts`: almacenamiento temporal y acotado.
- `Web/wwwroot/react/src/pages/gastos/utils/expenseScope.ts`: alcance `entraOid + companyId`.

## Comprobaciones manuales

- Usuario sin sesión: inicia sesión y vuelve al mismo enlace.
- Usuario en la empresa correcta: abre el detalle.
- Usuario en otra empresa permitida: cambia de empresa y abre el detalle.
- Responsable autorizado: abre una hoja de subordinado con alcance de responsable.
- Usuario sin relación autorizada: recibe una denegación segura.
- Hoja inexistente o parámetros incompletos: recibe un mensaje seguro.
- La apertura no produce ninguna mutación de la hoja.
