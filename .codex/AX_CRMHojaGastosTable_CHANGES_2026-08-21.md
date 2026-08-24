# CRMHojaGastosTable - 2026-08-21

Revision de alineacion con la regla funcional: 2026-08-24.

## Objetivo

Representar correctamente el proyecto agregado de una hoja y proporcionar un
default valido para la siguiente linea.

## Metodos modificados

- `defaultProjectForNewLine`: devuelve solo el proyecto de cabecera cuando sigue
  siendo elegible. Una cabecera vacia, con el marcador de varios proyectos o
  con un proyecto inelegible produce vacio, sin consultar lineas anteriores.
- `recalculateProjectFromLines`: aplica 0 lineas o todas vacias igual a vacio;
  un unico `ProjIdHornos` real igual a ese proyecto; cualquier mezcla, incluso
  con vacio, marcador reservado o un `ProjIdHornos` inexistente, igual al
  marcador configurado.
- `markHeaderVariousFromLine`: recalcula el agregado completo.
- `updateProjectDefaultInLines`: valida el destino y actualiza cabecera, lineas,
  asignaciones y costes dentro de una transaccion.
- `migrateVariousProjectMarker`: migra solo cabeceras cuyo `ProjId` coincide
  exactamente con el marcador anterior.
- `validateField`: la confirmacion del formulario AX guarda y propaga de forma
  atomica.
- `insert`, `update` y `validateWrite`: un proyecto inicial no vacio o un cambio
  de proyecto solo admite un proyecto elegible. Rechazan el marcador de varios,
  proyectos inexistentes, cerrados o no imputables, pero permiten conservar sin
  cambios un proyecto historico. Los recalculos internos del marcador persisten
  mediante `doUpdate()`.

## Limites

- La migracion no toca lineas ni asignaciones historicas.
- `ProjIdHornos` es el proyecto operativo de linea. Una diferencia respecto al
  campo oculto `ProjId` no convierte por si sola la cabecera en varios.
- `INDProjIdVarious` es obligatorio. Si falta al detectar una mezcla, AX aborta
  la operacion para no representar incorrectamente la cabecera como vacia.

## Validacion pendiente en AX

- Importar y compilar la tabla.
- Probar hojas con 0, 1 y varias lineas, incluida mezcla con vacio.
- Probar cambios simultaneos y el cambio del parametro por empresa.
