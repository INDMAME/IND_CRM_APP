# Comprender el detalle de la hoja

<!-- Fuente: Manual App CRM 1.5.docx, sección 8.5. -->

## Objetivo

Identificar la hoja y consultar sus líneas.

## Antes de empezar

Abra una hoja desde **GASTOS > Hojas de gastos** en la compañía correcta y espere su carga.

## Pasos

1. Confirme la hoja mediante **Descripción** e **Identificador**.
2. Revise **Estado**, **Proyecto** y, si aparece, **Usuario propietario**.
3. Lea **Comentario estado** si aparece.
4. En **LÍNEAS**, pulse la tarjeta que necesita.
5. Revise descripción, fecha y categoría; use la opción de volver para regresar a la hoja.

## Resultado y comprobación

Antes de actuar, contraste identificador y propietario y distinga cabecera y línea.

La parte superior contiene los datos generales: Descripción, Importe reembolso, Divisa Reembolso, Estado, Identificador, Reembolsable, Proyecto, Propietario cuando corresponda y Comentario estado si existe. La parte inferior muestra las líneas de gasto.

## Campos

| Campo | Qué representa y cómo se usa | Condiciones y ejemplo |
| --- | --- | --- |
| Descripción | Motivo o periodo de la hoja. | Compruebe que corresponde a la hoja buscada. |
| Identificador | Referencia exacta de la hoja. | Solo lectura; contrástela con la consulta o el enlace recibido. |
| Estado | Situación actual. | Solo lectura; las acciones de estado se ejecutan por separado. |
| Proyecto | Proyecto de cabecera. | Cada línea tiene además su propio Proyecto. |
| Usuario propietario | Titular de una hoja ajena. | Solo lectura; compruebe la persona. Puede no aparecer en hojas propias. |
| Comentario estado | Explicación de una acción de estado. | Solo lectura; aparece si contiene texto. Léalo antes de corregir o revisar la hoja. |
| LÍNEAS | Gastos individuales. | Cada tarjeta abre el detalle de su línea. |

## Variantes e incidencias

En Borrador y con permisos de edición, el botón de acciones rápidas ofrece Nuevo ticket, Vincular ticket y Nueva línea. Cuando la hoja es de solo lectura, estas opciones no aparecen.

- **Sin Usuario propietario en una hoja propia:** no indica por sí solo un error.
- **Sin Comentario estado:** el campo está vacío.
- **Estado e Identificador bloqueados:** son de consulta; use las acciones disponibles.
- **Ticket Id.:** abre el ticket relacionado. La línea vinculada es de solo lectura; continúe la revisión en el ticket.
