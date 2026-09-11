# Crear un ticket desde el módulo Tickets

<!-- Fuente: Manual App CRM 1.5.docx, sección 9.2. -->

## Objetivo

Crear un justificante digital desde el menú **Tickets**, revisar los datos extraídos y dejarlo disponible para su posterior vinculación.

## Antes de empezar

Compruebe la empresa activa y busque primero el justificante para evitar cargar el mismo documento otra vez. Prepare una imagen legible y completa. Necesita tener disponible la acción de creación en el módulo.

## Pasos

1. Entre en **GASTOS** y abra **Tickets**.
2. Pulse **Crear** o el botón redondo con el signo más.
3. Elija **Usar cámara** para tomar la fotografía o **Elegir imagen** para seleccionar un archivo del dispositivo.
4. Seleccione o capture la imagen y espere a que termine el procesamiento. No vuelva a iniciar la creación mientras la operación siga en curso.
5. En el detalle que se abre en modo edición, compare la imagen con los datos y las líneas del ticket. Corrija los campos que estén habilitados.
6. Pulse **Guardar** y confirme la acción cuando se solicite.
7. Espere al resultado. Conserve el identificador para localizar después el justificante.

## Resultado y comprobación

Busque el ticket por su identificador y abra el detalle. Compruebe que la imagen corresponde al justificante y que se conservan las correcciones realizadas. Un ticket creado desde la consulta general de **Tickets** queda disponible para vincularlo después; la creación desde una hoja tiene su propio procedimiento.

> **REVISIÓN OBLIGATORIA:** La lectura automática puede confundir fechas, separadores decimales, divisas, cantidades o categorías. Compare los campos con la imagen original antes de guardar.

## Campos

| Campo | Qué representa y cómo se usa | Condiciones y ejemplo |
| --- | --- | --- |
| Descripción | Identifica el justificante. | Obligatoria al guardar; contraste el texto con la imagen. |
| Fecha | Fecha del justificante. | Selección por calendario en edición; compruébela en la imagen. |
| Hora | Hora del justificante. | Puede corregirse si la hora original falta o es 00:00:00; si ya hay una hora válida, es de solo lectura. |
| Categoría | Clasificación del gasto. | Elija una opción válida; Ninguno no completa el campo. |
| Estado y Ticket Id. | Situación e identificador del ticket. | Son datos de consulta. |
| Hoja de gasto Id. | Referencia de la hoja vinculada. | Aparece cuando existe esa relación y permite abrir la hoja. |
| Ver adjunto | Abre la imagen disponible del justificante. | Úselo para contrastar los datos; aparece cuando hay un adjunto accesible. |

Proyecto y Reembolsable pertenecen al contexto de la línea o de la creación desde una hoja; su presencia depende del recorrido utilizado.

## Variantes e incidencias

Si la aplicación indica que el ticket se ha creado pero el proceso no ha terminado, anote el identificador y el mensaje antes de cerrar la pantalla. Consulte «La imagen del ticket no se procesa» y compruebe el registro existente antes de realizar una nueva carga.

Si **Guardar** no está disponible, lea los mensajes de validación y compruebe si ha entrado en un contexto de solo lectura. **Procesado por IA** informa sobre la lectura automática; no significa que el usuario haya revisado el ticket.
