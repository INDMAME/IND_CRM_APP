# Documentación de IND_CRM_APP

Este índice contiene solo documentación vigente y respaldada por el código actual. Las reglas internas para agentes permanecen en `.codex`; el manual funcional y los backups tienen ciclos de mantenimiento independientes.

## Operaciones

- [Entornos y publicación](operations/environment-and-publish.md): variables, resolución de direcciones y protecciones de `publish.ps1`.

## Arquitectura

- [Consistencia de proyectos en hojas de gastos](architecture/expenses/project-consistency.md): relación entre cabecera, líneas, marcador de varios proyectos y contratos AX.
- [Metodología común para AX y XPO](../.codex/AX_XPO_WORKFLOW.md): regla transversal idéntica en APP y API para editar, sincronizar y activar artefactos de Axapta.

## Funcionalidades

- [Resolución de enlaces de hojas de gastos](features/expenses/email-link-resolver.md): autenticación, empresa, consulta única y acceso propio o de subordinado.
- [Acciones de estado de una hoja de gastos](features/expenses/status-actions.md): matrices vigentes para propietario, autoaprobación y responsable.

## Documentación con mantenimiento propio

- [Base documental del asistente CRM](crm-help/README.md): fuente canónica del manual y su flujo de compilación. No se reorganiza desde este índice.
- `backups/codex-global-skills`: snapshot de recuperación. No es documentación activa del proyecto y no debe editarse como fuente canónica.

## Reglas de mantenimiento

- Mantener en `docs` solo arquitectura, operaciones y funcionalidades vigentes.
- Escribir la documentación superviviente en español y conservar sin traducir identificadores, rutas, claves y nombres de código.
- No guardar prompts temporales, bitácoras de ejecución, auditorías caducadas ni planes ya implementados como documentación activa.
- Antes de conservar un documento, contrastarlo con las fuentes que cita.
- Actualizar este índice al agregar, mover o retirar documentación.
- Tratar el código como fuente final de verdad cuando exista una diferencia.
- Modificar `docs/crm-help` solo mediante su flujo específico de mantenimiento y validación.
- No modificar `docs/backups` durante una limpieza documental ordinaria.
