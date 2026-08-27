# CRMHojaGastosLine - 2026-08-26

## Objetivo

Conservar una tasa de cambio introducida manualmente desde el formulario de
Axapta cuando su valor numerico coincide con la tasa original de la linea.

## Metodo modificado

- `update`: mantiene la proteccion contra una tasa positiva arrastrada junto a
  un `AmountMST` anterior. Cuando el formulario envia una tasa positiva con
  `AmountMST = 0`, conserva la tasa y recalcula el importe de empresa desde
  ella en lugar de borrarla por coincidir con `orig().ExchRate`.

## Compatibilidad

- No cambia `insert`, la validacion general de tabla ni el contrato HTTP.
- Un llamador programatico que cambie `Currency`, conserve una tasa positiva
  igual a la original y envie `AmountMST = 0` obtiene ahora el mismo recalculo
  desde tasa que el formulario de Axapta.
- No cambia el esquema de datos ni requiere sincronizacion de diccionario.

## Validacion pendiente en AX

- Importar y compilar la tabla junto con `CRMHojaGastosLineForm`.
- Probar una tasa manual distinta de la original y otra exactamente igual.
- Confirmar que una tasa heredada con un `AmountMST` anterior sigue
  reinicializandose al cambiar de divisa.
