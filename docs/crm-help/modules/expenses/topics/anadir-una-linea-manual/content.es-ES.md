# Añadir una línea manual

<!-- Fuente: Manual App CRM 1.5.docx, sección 8.6. -->

## Objetivo

Registrar un gasto individual en una hoja.

## Antes de empezar

Abra una hoja guardada y editable; compruebe su **Identificador**. Prepare la fecha y el concepto del gasto.

## Pasos

1. En una hoja editable, abra Acciones rápidas y pulse Nueva línea.

2. Indique la Fecha del gasto.

3. Seleccione la Categoría adecuada (en algunos casos las categorías están definidas en cada compañía de forma diferente).

4. Escriba una Descripción clara.

5. Introduzca Precio y Cantidad. Revise el importe calculado.

6. Seleccione Divisa gasto y revise Imp. divisa, Tipo cambio e Importe reembolso.

7. Complete Proyecto, Internacional, Reembolsable y demás campos que correspondan.

8. Pulse Guardar y confirme.

## Resultado y comprobación

En **LÍNEAS**, localice la nueva tarjeta. Revise **Descripción**, **Fecha**, **Categoría** y **Proyecto**; púlsela para ver todos los datos.

## Campos

| Campo | Qué representa y cómo se usa | Condiciones y ejemplo |
| --- | --- | --- |
| Descripción | Describe este gasto individual. | Obligatoria. Incluya contexto: «Aparcamiento durante la visita al cliente». |
| Fecha | Fecha del gasto. | Se propone la fecha actual. Seleccione una fecha válida y compruebe día, mes y año. |
| Categoría | Clasifica el gasto. | Obligatoria. Seleccione en el desplegable la opción correspondiente al concepto. |
| Proyecto | Proyecto de la línea. | Revise el valor propuesto; busque por código y descripción. Compruebe también el proyecto de cabecera. |
| Internacional | Como orientación, suele referirse a gastos realizados fuera de España. | La interpretación puede variar: siga el criterio de su área o compañía. Seleccione Sí o No según esas indicaciones y consulte si tiene dudas. |
| Reembolsable | Indica la opción seleccionada para la línea. | Revise el valor del selector de acuerdo con el procedimiento de su compañía. |
| Ticket Id. | Referencia del ticket vinculado. | Es de consulta y abre el ticket. No aparece si la línea no tiene ticket. |

La descripción de cabecera identifica el conjunto; la de línea, un solo gasto.

## Variantes e incidencias

CAMPOS OBLIGATORIOS: La descripción y la categoría deben estar informadas. Precio y Cantidad deben ser mayores que cero. En la categoría Km, el precio puede calcularse desde la configuración establecida en la compañía y aparecer bloqueado.

- **Descripción vacía:** complétela y guarde.
- **Sin categoría:** seleccione una opción válida.
- **Fecha inválida:** selecciónela de nuevo en el calendario.
- **Proyecto ausente:** revise búsqueda y compañía. No lo sustituya por otro.
- **Abandonar:** pulse Cancelar para volver sin guardar la línea.
- **Sin Nueva línea:** compruebe la edición de la hoja y sus permisos.
