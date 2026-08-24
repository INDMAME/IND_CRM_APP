# PurchParameters.INDProjIdVarious - nota de integracion AX

Revision de alineacion con la regla funcional: 2026-08-24.

## Regla del parametro

- Debe contener un valor no vacio, reservado y estable por empresa.
- No debe existir como proyecto real seleccionable o imputable en `ProjTable`.
- Nunca debe persistirse en `CRMHojaGastosLine` ni en sus asignaciones.

## Hook obligatorio en `PurchParameters.update()`

El repositorio incluye el export completo
`.codex/Axapta/PurchParameters.xpo`. El campo `INDProjIdVarious` es obligatorio
en metadatos y el `update()` existente incorpora el hook sin sustituir el resto
de la tabla.

El hook compara el valor recibido sin normalizar con el valor original para que
un cambio a solo espacios no pase inadvertido. Cuando el parametro cambia,
recorta espacios, rechaza el resultado vacio y rechaza cualquier valor que ya
exista en `ProjTable`. La migracion `A -> B` y `super()` se ejecutan en la misma
transaccion. Cuando el marcador no cambia, el hook `update()` no anade una
validacion ni una migracion. La propiedad `Mandatory #Yes` puede seguir
aplicandose desde la validacion estandar o la interfaz al guardar otros campos.

No se usa `modified()` del formulario: dejaria fuera actualizaciones por codigo,
importaciones y otros formularios.

El helper trabaja en la empresa actual y actualiza solo cabeceras con
`ProjId == oldMarker`. No modifica lineas ni asignaciones. El cambio debe
repetirse en cada empresa cuyo parametro se actualice.

## Datos historicos

Las lineas contaminadas con marcadores o proyectos inexistentes requieren una
auditoria y correccion controlada independiente. No deben incluirse en la
migracion automatica del parametro.

## Pruebas de aceptacion

- `A -> B`: solo las cabeceras con `ProjId=A` pasan a `B`.
- `A -> ""` y `A -> "   "`: se rechaza el guardado y no cambia ningun dato.
- `A -> proyecto real`: se rechaza el guardado y no cambia ningun dato.
- `"" -> B`: permite la configuracion inicial y no migra cabeceras vacias.
- `A -> A` y `"" -> ""` al guardar otro campo: no validan ni migran el marcador.
- Las lineas y `CRMHojaGastosLineCust` no cambian.
- Otra empresa permanece intacta.
- Un error forzado revierte tanto el parametro como las cabeceras.

## Activacion

Importe y compile `PurchParameters.xpo` junto con los XPO relacionados. Configure
un marcador reservado valido en cada empresa antes de provocar una hoja mixta:
`recalculateProjectFromLines()` aborta si necesita representar `VARIOS` y el
parametro sigue vacio. El repositorio no contiene un XPO del formulario de
`PurchParameters`: el export de tabla no demuestra que el campo sea visible en
la interfaz y debe comprobarse y configurarse por empresa despues de importar.
Publicar API o IIS no activa codigo AX.
