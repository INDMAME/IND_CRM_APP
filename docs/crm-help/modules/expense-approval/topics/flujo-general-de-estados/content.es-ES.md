# Flujo general de estados

<!-- Fuente: Manual App CRM 1.5.docx, sección 10.1. -->

<!-- Descripción funcional revisada a partir de la captura de esta sección. -->

**Descripción funcional del diagrama:**

- El diagrama indica que las transiciones disponibles dependen de la configuración, el perfil y la acción.
- Desde Borrador, Solicitar aprobación lleva a Aprobación solicitada; cuando no se requiere aprobación, Aprobar lleva a Aprobada.
- Desde Aprobación solicitada, Deshacer solicitud devuelve a Borrador, Aprobar lleva a Aprobada y Rechazar lleva a Rechazada.
- Desde Aprobada, Deshacer aprobación devuelve a Aprobación solicitada y Contabilizar en Axapta lleva a Pagada.
- Desde Rechazada, Pasar a Borrador devuelve a Borrador y Deshacer rechazo devuelve a Aprobación solicitada.

![Captura de «Flujo general de estados» relacionada con: Desde Rechazada, Pasar a Borrador devuelve a Borrador y Deshacer rechazo devuelve a Aprobación solicitada.](../../../../assets/manual-1.5/image49.png)
