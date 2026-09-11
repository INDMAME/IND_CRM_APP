# Acciones de estado de una hoja de gastos

## Propósito

Este documento describe el comportamiento actual del detalle de una hoja de gastos. La política React y la validación del controlador son la fuente final de verdad.

Fuentes principales:

- `Web/wwwroot/react/src/pages/gastos/detail/expenseSheetDetailPolicy.ts`
- `Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailPageController.tsx`
- `Web/Controllers/Gastos/GastosController.cs`

## Reglas generales

- `Status` siempre es de solo lectura.
- Un estado cambia únicamente mediante las acciones inferiores.
- Los modos que devuelve la política actual son `full_edit` y `read_only`.
- Una acción de estado puede estar disponible aunque el contenido sea de solo lectura.
- El comentario del estado se edita dentro de la confirmación de la transición.
- Una hoja pagada o con justificante contable queda bloqueada.
- Una hoja de subordinado siempre mantiene su contenido en solo lectura.
- Solo puede eliminarse una hoja propia cuando la política permite edición completa.
- Un estado desconocido se trata como solo lectura y sin acciones.

## Estados

- `0`: Borrador.
- `1`: Aprobación solicitada.
- `2`: Aprobado.
- `3`: Rechazado.
- `4`: Pagado.

## Hoja propia con autoaprobación

| Estado | Contenido | Acciones |
| --- | --- | --- |
| Borrador | Edición completa; alta de líneas y eliminación permitidas | Aprobar -> Aprobado |
| Aprobación solicitada | Solo lectura | Ninguna |
| Aprobado | Solo lectura | Deshacer aprobación -> Borrador |
| Rechazado | Solo lectura | Ninguna |
| Pagado | Solo lectura | Ninguna |

La autoaprobación devuelve una aprobación deshecha a Borrador, no a Aprobación solicitada.

## Hoja propia sin autoaprobación

| Estado | Contenido | Acciones |
| --- | --- | --- |
| Borrador | Edición completa; alta de líneas y eliminación permitidas | Solicitar aprobación -> Aprobación solicitada |
| Aprobación solicitada | Solo lectura | Deshacer solicitud -> Borrador |
| Aprobado | Solo lectura | Ninguna |
| Rechazado | Solo lectura | Pasar a Borrador -> Borrador |
| Pagado | Solo lectura | Ninguna |

Una hoja rechazada debe volver primero a Borrador antes de poder corregirse y enviarse otra vez.

## Hoja de un subordinado

| Estado | Contenido | Acciones del responsable |
| --- | --- | --- |
| Borrador | Solo lectura | Ninguna |
| Aprobación solicitada | Solo lectura | Aprobar -> Aprobado; Rechazar -> Rechazado |
| Aprobado | Solo lectura | Deshacer aprobación -> Aprobación solicitada |
| Rechazado | Solo lectura | Deshacer rechazo -> Aprobación solicitada |
| Pagado | Solo lectura | Ninguna |

El comportamiento del responsable no depende de su configuración de autoaprobación. El servidor limita el actor a los subordinados autorizados.

## Confirmación y contenido mínimo

La confirmación muestra el estado actual, el destino, la acción y el comentario de estado. Una transición correcta cierra el diálogo, invalida la lista almacenada y vuelve a consultar el detalle.

Las acciones quedan deshabilitadas solo cuando la hoja no tiene líneas y tampoco tiene un total positivo. Esta comprobación de interfaz no sustituye la validación del servidor.

## Validación del servidor

El controlador vuelve a resolver:

- propietario de la hoja;
- alcance propio o de subordinado;
- autoaprobación de la empresa seleccionada;
- estado actual y bloqueo por pago o justificante;
- estados de destino permitidos.

Una acción que solo cambia estado conserva los demás campos de negocio. El servidor rechaza transiciones no admitidas, modificaciones de contenido de subordinados, eliminaciones no autorizadas y cualquier mutación de una hoja bloqueada.
