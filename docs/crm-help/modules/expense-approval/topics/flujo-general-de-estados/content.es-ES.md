# Flujo general de estados

<!-- Fuente: Manual App CRM 1.5.docx, sección 10.1. -->

Las transiciones disponibles dependen de la configuración, del perfil del usuario y del estado actual:

- Desde Borrador, Solicitar aprobación lleva a Aprobación solicitada; cuando no se requiere aprobación, Aprobar lleva a Aprobada.
- Desde Aprobación solicitada, Deshacer solicitud devuelve a Borrador, Aprobar lleva a Aprobada y Rechazar lleva a Rechazada.
- Desde Aprobada, Deshacer aprobación devuelve a Aprobación solicitada y Contabilizar en Axapta lleva a Pagada.
- Desde Rechazada, Pasar a Borrador devuelve a Borrador y Deshacer rechazo devuelve a Aprobación solicitada.

La pantalla solo muestra las acciones permitidas para la hoja y el usuario actuales. Lea siempre la confirmación porque indica el estado al que pasará la hoja.
