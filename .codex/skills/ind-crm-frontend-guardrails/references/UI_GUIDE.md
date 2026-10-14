# Guía de interfaz de IND_CRM_APP

## Lenguaje visual vigente

- Tailwind como sistema de estilos, Montserrat como fuente y `#00296b` como color principal.
- Tamaño base: 14 px en móvil y 16 px desde 768 px.
- Radio global: 5 px. Las utilidades `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl` y `rounded-2xl` resuelven actualmente al mismo valor. `rounded-full` se reserva para círculos reales.
- Heroicons como iconos predeterminados; 16×16 en controles y 24×24 dentro de 25×25 en la barra superior.
- Todo texto visible procede de localización.

## Responsive y accesibilidad

- El móvil es la base de regresión. Las mejoras de escritorio comienzan normalmente en `lg` sin duplicar controles ni alterar el orden lógico o de teclado.
- Formularios y filtros parten de una columna centrada (`w-full max-w-3xl mx-auto`) salvo que el contenido justifique otra anchura.
- Overlays, calendarios y listas deben permanecer dentro del viewport; dropdowns de escritorio se anclan al control y se limitan normalmente a 480 px, calendarios a 640 px.
- Mantener roles, etiquetas, `aria-*`, foco visible, navegación por teclado y objetivos táctiles.
- La aceptación puramente visual es manual. Las pruebas automatizadas se reservan para comportamiento, accesibilidad, rutas, eventos y contratos.

## Formularios

- Los componentes tipo input aceptan `readOnly` o `mode` y aplican el estado localmente.
- Etiqueta: `#00296be0` siempre. Valor editable: `#00296be0`. Valor de solo lectura: `#64748b`; fondo `#f1f5f9` y borde `#e2e8f0`.
- No utilizar opacidad de un contenedor para simular solo lectura.
- Importes, precios, cantidades, tipos de cambio y totales se alinean a la derecha, usan cifras tabulares cuando sea posible y muestran `#,##0.00`. Identificadores, fechas, monedas, estados y etiquetas no se tratan como cifras comparables.
- La protección `ind-readonly-surface` se usa solo donde el flujo actual impide selección/copia; no se aplica globalmente.

## Selectores y listas flotantes

- Reutilizar `FloatingList`, `useOutsideClick`, `useFloatingPosition`, los chevrons comunes y `handleComboboxKeyDown`.
- La lista se muestra mediante portal, con posición fija, z-index suficiente y scroll visible.
- Teclado: flechas para navegar, Enter para elegir y Escape para cerrar.
- Las opciones y selecciones sensibles se guardan con el ámbito de usuario y empresa descrito en `TECH_SPECS.md`; nunca solo por una clave padre.

Tipos admitidos:

| Tipo | Uso | Búsqueda |
|---|---|---|
| `remote-search-dropdown` | Resultados remotos | Solo Enter o icono de lupa; no una llamada por pulsación. |
| `fixed-enum-instant-search` | Catálogo fijo amplio | Filtrado local al escribir. |
| `fixed-enum-select` | Lista fija pequeña | Sin texto libre; una selección reemplaza a la anterior. |

Antes de crear un selector nuevo se confirma qué tipo corresponde.

## Botones, confirmaciones y estados

- Reutilizar `FilterButton`, `ActionButton`, `Spinner`, `LoadingOverlay` y los modales comunes.
- Las acciones destructivas o de guardado usan el modal integrado, no `confirm`, `alert` ni avisos nativos de salida.
- En Visitas: edición inmediata; una confirmación antes de crear/actualizar/eliminar; spinner durante la petición; después, marca `okProcess`, `okDelProcess`, `warningProcess` o `errorProcess` según el resultado.
- Los controles de crear, editar y eliminar reflejan permisos en UI, pero el servidor sigue siendo la autoridad.

## Patrones específicos que siguen vigentes

- `ExpenseSectionDivider` muestra títulos centrados con líneas laterales, sin píldora ni borde alrededor de la etiqueta.
- El filtro remoto de ticket muestra `FileId` y `Description`, selecciona `FileId` y pagina 20 elementos.
- “Procesado por IA” es un `fixed-enum-select`; la opción global no envía filtro restrictivo.
- Cuando el estado de hojas está en la opción global, el control muestra el placeholder hasta elegir uno concreto.
- Calendarios, filtros de fecha y dropdowns son sensibles a regresión: verificar apertura, foco, cambio, blur, validación y formato exacto del payload antes de aceptar una modificación.

## React

- La entrada de página solo compone providers, boundary, raíz y montaje.
- Estado, peticiones, listeners y mutaciones pertenecen a hooks o contenedores del módulo.
- Los componentes compartidos son tontos, controlados por props y sin contratos de API del módulo.
- Evitar proliferación de flags booleanos cuando una variante explícita o composición expresa mejor el comportamiento.
