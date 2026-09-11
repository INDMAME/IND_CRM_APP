# Editar la cabecera y las líneas

<!-- Fuente: Manual App CRM 1.5.docx, sección 8.10. -->

## Objetivo

Corregir una cabecera o línea y comprobar el guardado.

## Antes de empezar

Solo puede modificar una hoja cuando su estado y sus permisos permiten la edición.

Compruebe **Identificador**, **Usuario propietario** si aparece y, para un gasto concreto, su tarjeta en **LÍNEAS**.

## Pasos

### Editar la cabecera

1. Abra el detalle de la hoja y pulse Editar.

2. Modifique la Descripción, el Proyecto o el valor Reembolsable.

3. Si ya existen líneas y cambia Proyecto o Reembolsable, la aplicación puede preguntar si desea actualizar todas las líneas. Confirme solo si quiere aplicar el nuevo valor a todas ellas.

4. Pulse Guardar y revise el resultado.

### Editar una línea

1. Abra la línea desde el detalle de la hoja.

2. Pulse Editar, cambie únicamente los campos habilitados y vuelva a comprobar la fecha, la categoría, la divisa y los importes.

3. Pulse Guardar y confirme que el total de la hoja se ha actualizado.

## Resultado y comprobación

Vuelva a consultar los datos corregidos y contraste el **Identificador** de la hoja.

## Campos

| Campo | Qué representa y cómo se usa | Condiciones y ejemplo |
| --- | --- | --- |
| Descripción | Cabecera y línea. | Obligatoria: describe el conjunto en cabecera y el gasto individual en línea. |
| Proyecto | Cabecera y línea. | Seleccione el resultado del desplegable y lea las confirmaciones. |
| Reembolsable | Selección de la cabecera y de la línea. | Revise la opción seleccionada y las confirmaciones de la aplicación antes de guardar. |
| Fecha | Línea. | Revise en el calendario día, mes y año del gasto. |
| Categoría | Línea. | Seleccione la opción correspondiente al concepto. |
| Internacional | Línea; orientación habitual: gasto fuera de España. | Revise Sí o No según el criterio de su área o compañía; consulte si tiene dudas. |
| Identificador y Estado | Cabecera. | Solo lectura. |
| Usuario propietario | Cabecera, cuando corresponde. | Identifica al titular y es de solo lectura. |
| Comentario estado | Cabecera, cuando existe. | Solo lectura aquí; se introduce al confirmar una acción de estado. |
| Ticket Id. | Línea vinculada a un ticket. | Pulse el código para abrir el ticket. |

## Variantes e incidencias

Divisa Reembolso de la cabecera está bloqueada porque la determina la empresa. Divisa gasto y Tipo cambio se revisan en cada línea o ticket. Si un registro está bloqueado por su origen o estado, no elimine información para forzar el cambio: consulte el procedimiento interno.

- **Un solo gasto:** abra su línea y edite los campos habilitados.
- **Línea vinculada:** no admite edición directa; abra **Ticket Id.** y revise sus opciones.
- **Descartar Descripción pendiente:** pulse **Cancelar** antes de guardar para recuperar el texto guardado.
- **Error al guardar:** lea el mensaje, corrija y compruebe el resultado. Ver texto en el formulario no demuestra su guardado.
- **Sin Editar:** revise estado, propietario y permisos de la hoja.
