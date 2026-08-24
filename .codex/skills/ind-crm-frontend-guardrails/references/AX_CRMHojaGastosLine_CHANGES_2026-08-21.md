# CRMHojaGastosLine - 2026-08-21

Revision de alineacion con la regla funcional: 2026-08-24.

## Objetivo

Evitar proyectos heredados invalidos y mantener el proyecto agregado de la
cabecera despues de altas, cambios y borrados de lineas.

## Metodos modificados

- `resolveRealProjectId`: devuelve el identificador canonico o vacio para un
  marcador reservado, un valor vacio o un proyecto inexistente.
- `resolveEligibleProjectId`: ademas exige `INDPermitirImputarGastos` y una
  `INDTransDateCierreCostes` vacia, igual que el catalogo de gastos.
- `InitFromHojaGastosTable` e `InitFromPreviousLine`: usan exclusivamente el
  proyecto elegible de cabecera; una cabecera vacia o con el marcador de varios
  proyectos deja la linea nueva sin proyecto.
- `insert`, `update` y `delete`: bloquean primero la cabecera y recalculan sus
  agregados dentro de la misma transaccion. El borrado recalcula proyecto y
  reembolso una sola vez y persiste la cabecera cuando cambia cualquiera.
- `insert` y `update`: validan tambien en la frontera programatica de tabla. Un
  alta con proyecto no vacio y un cambio de proyecto deben ser elegibles; una
  linea historica conserva su proyecto si no se modifica.
- `validateField` y `validateWrite`: rechazan proyectos nuevos cerrados, no
  imputables, inexistentes o reservados, pero permiten editar otros campos sin
  sustituir un proyecto historico que se haya cerrado despues.
  `ProjTable::PermitirCambioProyecto` solo se ejecuta al crear la linea o
  cambiar realmente su proyecto.

## Compatibilidad

- No cambia el esquema de tabla.
- Una linea puede conservar o recibir explicitamente un proyecto vacio.
- El marcador de varios proyectos nunca se persiste en una linea nueva.

## Validacion pendiente en AX

- Importar y compilar la tabla en Axapta.
- Probar alta, cambio y borrado concurrentes en AOS.
- Confirmar la sincronizacion de asignaciones y costes por proyecto.
