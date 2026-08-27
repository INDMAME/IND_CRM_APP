# CRMHojaGastosLineForm - 2026-08-26

## Objetivo

Exigir en Axapta una tasa de cambio manual cuando una linea nueva use una
divisa distinta de `CompanyInfo::standardCurrency()` o cuando una linea
existente cambie a otra divisa extranjera.

## Metodos modificados

- `requiresManualExchangeRate`: limita la regla a lineas nuevas y cambios
  reales de `Currency`, sin bloquear lineas historicas que no cambian divisa.
  Mantiene un estado transitorio por registro para cubrir tambien una secuencia
  extranjera A-B-A hasta que el guardado termine correctamente. Un cambio
  explicito de `ExchRate` tambien activa la regla manual.
- `refreshExchangeRateEditState`: asigna `100` a la divisa de empresa y `0` a
  una divisa extranjera al inicializarla o cambiarla. Marca `ExchRate` como
  obligatorio y deja `AmountMST` en solo lectura durante la transicion.
- `Currency.modified`, `create` e `initValue`: aplican la regla tanto al cambiar
  la divisa como despues de heredar los valores de la linea anterior.
- Los eventos de importe y tasa vuelven a aplicar el estado para evitar que una
  normalizacion intermedia complete automaticamente la conversion pendiente.
- `validateWrite`: impide guardar si la tasa manual no es mayor que cero y
  ejecuta esta regla antes de la validacion monetaria heredada.
- `write`: hace que la tasa manual sea la fuente autoritativa y fuerza el
  recalculo de `AmountMST` antes de guardar.
- `reread`: limpia el estado transitorio despues de guardar o restaurar el
  registro desde base de datos.

## Compatibilidad

- No cambia el contrato HTTP ni el comportamiento de la aplicacion web.
- Una linea extranjera historica sin cambio de `Currency` conserva el
  comportamiento anterior.
- No cambia el esquema de datos ni requiere sincronizacion de diccionario.

## Validacion pendiente en AX

- Importar y compilar `CRMHojaGastosLineForm` y `CRMHojaGastosLine`.
- Probar alta local, alta extranjera y copia de una linea extranjera.
- Probar cambios local-extranjera y extranjera-extranjera, incluida una tasa
  manual numericamente igual a la tasa anterior.
- Confirmar en runtime que el indicador obligatorio dinamico funciona en la
  version instalada de Axapta.
