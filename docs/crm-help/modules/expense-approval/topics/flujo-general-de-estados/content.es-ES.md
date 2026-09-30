# Flujo general de estados

<!-- Fuente: Manual App CRM 1.5.docx, sección 10.1. -->

Las transiciones disponibles dependen de la configuración, del perfil del usuario y del estado actual:

- Desde Borrador, Solicitar aprobación lleva a Aprobación solicitada; cuando no se requiere aprobación, Aprobar lleva a Aprobado.
- Desde Aprobación solicitada, Deshacer solicitud devuelve a Borrador, Aprobar lleva a Aprobado y Rechazar lleva a Rechazado.
- Desde Aprobado, el destino de Deshacer aprobación depende del perfil y de quién sea el propietario: un responsable que gestiona la hoja de un subordinado la devuelve a Aprobación solicitada; el propietario con autogestión que revierte su propia aprobación la devuelve a Borrador. Contabilizar en Axapta lleva a Pagado.
- Desde Rechazado, Pasar a Borrador devuelve a Borrador y Deshacer rechazo devuelve a Aprobación solicitada.

La pantalla solo muestra las acciones permitidas para la hoja y el usuario actuales. Lea siempre la confirmación porque indica el estado al que pasará la hoja; no dé por hecho que Deshacer aprobación tiene el mismo destino para todos los perfiles.
