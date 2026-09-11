# Módulo Tickets

<!-- Fuente: Manual App CRM 1.5.docx, sección 9. -->

## Finalidad

Un ticket reúne la imagen y los datos de un justificante de gasto. Puede crearse directamente desde una hoja o desde el menú Tickets, donde permanecerá disponible hasta que se vincule a una hoja editable.

Utilice este módulo para buscar justificantes, revisar los datos leídos de la imagen y corregir los campos permitidos. Antes de guardar, compruebe la fecha, la divisa, el establecimiento o la descripción, los importes y la categoría.

El estado Pendiente indica que el ticket todavía no está asociado a una hoja; Asignado indica que ya forma parte de una. No cargue de nuevo el mismo justificante si ya existe: búsquelo primero.

## Procesos disponibles

| Necesidad | Procedimiento | Comprobación final |
| --- | --- | --- |
| Encontrar un justificante | Abrir y filtrar tickets. | El identificador y la imagen coinciden con el documento buscado. |
| Incorporar una imagen nueva | Crear un ticket desde el módulo Tickets. | Se ha creado el registro, se ve su imagen y se han revisado sus datos. |
| Consultar si está vinculado | Estado del ticket. | Se distingue Pendiente de Asignado y se revisa la relación existente. |
| Incorporarlo a una hoja | Vincular ticket desde la hoja o línea que corresponda. | El justificante queda relacionado con el destino seleccionado. |

## Qué revisar en el detalle

Identifique el ticket antes de actuar. Utilice la imagen como referencia para revisar el encabezado y las líneas que lo componen. Los campos bloqueados dependen del contexto de entrada y de las condiciones de edición; consulte las indicaciones de la pantalla antes de intentar cambiarlos.

Crear el ticket, revisar la lectura automática y vincularlo son pasos diferentes. El indicador **Procesado por IA** no certifica que los datos sean correctos. Tras corregir campos permitidos, complete el guardado y compruebe el resultado.

## Variantes e incidencias

Si la carga termina con un aviso parcial, conserve el identificador y consulte el registro antes de repetir la captura. Si el ticket ya está **Asignado** a un destino incorrecto, siga «Estado del ticket»; no genere otra copia para intentar resolver la asignación.
