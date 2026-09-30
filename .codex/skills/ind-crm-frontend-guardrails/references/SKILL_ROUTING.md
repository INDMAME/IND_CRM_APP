# Enrutamiento de skills en IND_CRM_APP

La skill local `ind-crm-frontend-guardrails` es la entrada para tareas del repositorio. Carga únicamente las referencias temáticas necesarias y añade skills especializadas por el tipo real de trabajo.

| Situación | Skill adicional |
|---|---|
| Nueva funcionalidad o cambio creativo de comportamiento | `brainstorming` |
| Edición de skills o normas `.codex` | `writing-skills` |
| Bug, prueba fallida o comportamiento inesperado | `systematic-debugging` |
| React, TS/TSX, renderizado, peticiones o rendimiento | `vercel-react-best-practices` |
| API de componentes o composición React | `vercel-composition-patterns` |
| Revisión de accesibilidad, UI o UX | `web-design-guidelines` |
| Cierre de un cambio React | `react-doctor` |
| Auditoría o corrección de seguridad | La skill de seguridad específica al alcance solicitado |
| Creación o edición de documentación de ayuda CRM | `publishing-crm-help-docs` |
| Creación o cambio de diagramas de arquitectura | `architecture-flow-docs` |

Las skills de Tailwind ayudan con sintaxis, pero no sustituyen `UI_GUIDE.md`. No se cargan skills sin relación con el alcance.

Las reglas de permisos por registro, contexto de empresa, datos sensibles o AX/XPO requieren además leer `TECH_SPECS.md` o `AX_XPO_WORKFLOW.md` respectivamente.
