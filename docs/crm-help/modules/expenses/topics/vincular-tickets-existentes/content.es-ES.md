# Vincular tickets existentes

<!-- Fuente: Manual App CRM 1.5.docx, sección 8.9. -->

## Objetivo

Asociar tickets existentes a una hoja.

## Antes de empezar

Compruebe compañía, identificador y edición de la hoja de destino. Use tickets existentes.

## Pasos

### Desde una hoja

1. En una hoja editable, abra Acciones rápidas y pulse Vincular ticket.

2. Si necesita buscar, complete los filtros y pulse **Aplicar**. Marque los tickets después: aplicar filtros limpia la selección previa.

3. Marque uno o varios tickets disponibles. Revise la selección y el importe mostrado.

4. Pulse Vincular ticket(s) y confirme.

5. Revise los totales solicitados, vinculados, omitidos y fallidos. Anote los motivos antes de cerrar.
> **SI UN TICKET FALLA:** Ábralo, corrija lo indicado y guarde antes de volver a vincularlo. Solo estará asociado cuando cumpla las validaciones y el resultado lo confirme.

### Desde una línea

1. Abra una línea propia, guardada y sin ticket. Salga de la edición y use **Vincular ticket** cuando esté disponible.
2. Seleccione un único ticket y pulse **Asociar ticket existente**. Revise la confirmación y confirme solo si el ticket y el destino son correctos.
3. Al volver a la misma línea, compruebe **Ticket Id.** y abra la referencia para verificar el justificante.

## Resultado y comprobación

Revise tickets vinculados y líneas de la hoja. Si el resultado es parcial, corrija solo los casos fallidos; no repita toda la selección.

## Campos

| Campo | Qué representa y cómo se usa | Condiciones y ejemplo |
| --- | --- | --- |
| Fecha | Filtra por 7, 30 o 90 días, o por un intervalo. | El periodo es opcional en este flujo de vinculación. |
| Ticket | Busca un justificante por identificador. | Seleccione la coincidencia entre las sugerencias. |
| Categoría y Divisa | Acotan la consulta. | Seleccione los criterios necesarios; retire la selección para ampliar la consulta. |
| Procesado por IA | Filtra la lectura automática con Todo, Sí o No. | No acredita revisión del contenido. |
| Usuario | Filtra por persona. | Solo desde una hoja y con gestión autorizada; no desde una línea. |

Aquí no aparece el filtro Estado. **Borrar** limpia filtros y selección y recarga la lista inicial del contexto.

## Variantes e incidencias

Ayuda: «No aparece un menú, botón o usuario» y «Qué información enviar a soporte».
