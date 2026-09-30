# Normas de trabajo de IND_CRM_APP

Esta carpeta contiene únicamente reglas vigentes. No debe utilizarse como bitácora, archivo histórico ni almacén de prompts temporales.

## Jerarquía

1. Instrucciones del sistema y del usuario.
2. `AGENTS.md`, con las reglas generales del repositorio.
3. El documento temático aplicable.
4. El código y los contratos ejecutados actualmente, que deciden cualquier duda entre documentos del mismo nivel.

## Mapa temático

| Documento | Responsabilidad única |
|---|---|
| `AGENTS.md` | Forma de trabajo, estabilidad, seguridad y publicación. |
| `PROJECT_STRUCTURE.md` | Propiedad y ubicación de archivos. |
| `TECH_SPECS.md` | Arquitectura, API, identidad, contexto, caché, localización y compilación. |
| `UI_GUIDE.md` | Diseño, accesibilidad e interacción. |
| `COMPONENT_CONTRACTS.md` | Contratos de componentes compartidos. |
| `QUALITY_CHECKLIST.md` | Validaciones proporcionales al cambio. |
| `AX_XPO_WORKFLOW.md` | Metodología común de AX/XPO con `IND_CRM_API`. |
| `SKILL_ROUTING.md` | Selección de skills especializadas. |

## Mantenimiento

- La documentación se redacta en español y describe el estado vigente, no la cronología de cambios.
- No se crean documentos con fechas para registrar cada tarea. El historial pertenece a Git.
- Un concepto se explica en un solo documento; los demás enlazan al propietario.
- Los `.xpo` canónicos pertenecen a `IND_CRM_API`; este proyecto conserva una copia sincronizada.
- Tras cambiar `.codex/*.md` o `.codex/config.toml`, ejecutar `npm run sync:skill:local:references` y `npm run check:codex:references`.
