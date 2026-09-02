# Consistencia de proyectos en hojas de gastos

Estado de Axapta: la presencia del código en Git no demuestra que los XPO estén importados, compilados, sincronizados o activos en el runtime instalado.

## Objetivo

Mantener una única semántica para el proyecto de cabecera, los proyectos de línea y el marcador que representa varios proyectos, conservando la compatibilidad de los contratos antiguos.

## Reglas de negocio

- `CRMHojaGastosTable.ProjId` representa el proyecto agregado de la hoja.
- Cero líneas o todas las líneas sin proyecto producen una cabecera sin proyecto.
- Si todas las líneas tienen el mismo proyecto real, la cabecera contiene ese proyecto.
- Cualquier mezcla de proyectos, incluidos valores vacíos mezclados con un proyecto, produce el marcador configurado en `PurchParameters.INDProjIdVarious`.
- El marcador nunca debe persistirse como proyecto real de una línea.
- Un proyecto nuevo debe existir, permitir imputación de gastos y no tener cerrados sus costes.
- Un proyecto histórico que después quede cerrado puede conservarse mientras no se cambie el proyecto de esa línea o cabecera.
- Una hoja sin líneas puede adoptar un proyecto válido como valor predeterminado.
- Una hoja con líneas solo propaga un cambio de proyecto tras una confirmación explícita.
- Cabecera, líneas, asignaciones y costes se actualizan dentro de la misma transacción cuando la operación exige propagación.

## Contratos compatibles

- El alta de línea distingue entre proyecto omitido, proyecto vacío intencionado y proyecto informado.
- `getExpenseSheet` expone `DefaultLineProjId` al final del contenedor de cabecera.
- La propagación del proyecto acepta un indicador `projectProvided` para diferenciar un cuerpo ausente de un borrado intencionado.
- La actualización de cabecera modifica el proyecto solo cuando el cliente declara que lo ha cambiado.
- La actualización de línea conserva el formato antiguo cuando no existe la posición opcional nueva.
- Las posiciones nuevas se agregan al final y se leen solo después de comprobar `conLen`.

## Marcador de varios proyectos

`PurchParameters.INDProjIdVarious` debe ser un valor no vacío, estable por empresa y distinto de cualquier proyecto real de `ProjTable`.

El `update()` de `PurchParameters`:

1. Detecta el cambio del valor sin perder un cambio compuesto solo por espacios.
2. Normaliza el marcador.
3. Rechaza un valor vacío o coincidente con un proyecto real.
4. Migra solo las cabeceras cuyo `ProjId` coincide exactamente con el marcador anterior.
5. Ejecuta la validación, la migración y `super()` dentro de la misma transacción.

Las líneas o asignaciones históricas contaminadas no se corrigen automáticamente. Requieren una auditoría y una corrección controlada independiente.

## Fuentes XPO

- `.codex/Axapta/PurchParameters.xpo`
- `.codex/Axapta/CRMHojaGastosTable.xpo`
- `.codex/Axapta/CRMHojaGastosLine.xpo`
- `.codex/Axapta/INDCRMExpenseSheetService.xpo`

Métodos principales:

- `CRMHojaGastosTable.defaultProjectForNewLine`
- `CRMHojaGastosTable.recalculateProjectFromLines`
- `CRMHojaGastosTable.migrateVariousProjectMarker`
- `CRMHojaGastosLine.resolveEligibleProjectId`

## Validación

La metodología de edición, formato, paridad entre repositorios, importación y cierre se define una sola vez en la [metodología común para AX y XPO](../../../.codex/AX_XPO_WORKFLOW.md).

Este contrato funcional debe probar específicamente:

- hojas sin líneas, con líneas vacías, con un único proyecto y con proyectos mezclados;
- proyecto válido, inexistente, cerrado, no imputable y marcador reservado;
- conservación de proyectos históricos que no se modifican;
- alta, cambio y borrado concurrentes;
- cambio del marcador por empresa y reversión completa ante error;
- productores y consumidores antiguos y nuevos de los containers.

La validación local de archivos no demuestra que la regla esté activa en Axapta.

Cuando una versión nueva del API o de la web dependa de estas posiciones opcionales, el orden seguro es:

1. Axapta.
2. `IND_CRM_API`.
3. `IND_CRM_APP`.

La publicación del API o de IIS no activa código X++.
