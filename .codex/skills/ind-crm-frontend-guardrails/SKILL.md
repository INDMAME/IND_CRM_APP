---
name: ind-crm-frontend-guardrails
description: Usar al trabajar en IND_CRM_APP con Razor, islas React, Tailwind, localización, consumo de API desde la interfaz, estado del navegador, permisos por registro, documentación, preparación de entregas o publicación en IIS.
---

# Guardas de IND_CRM_APP

## Preparación

1. Leer `references/AGENTS.md` y `references/PROJECT_STRUCTURE.md`.
2. Cargar solo las referencias necesarias:
   - arquitectura, API, identidad, caché o permisos: `references/TECH_SPECS.md`;
   - diseño o interacción: `references/UI_GUIDE.md`;
   - componentes compartidos: `references/COMPONENT_CONTRACTS.md`;
   - AX/XPO: `references/AX_XPO_WORKFLOW.md`;
   - validación o publicación: `references/QUALITY_CHECKLIST.md`.
3. Consultar `references/SKILL_ROUTING.md` y añadir únicamente las skills cuyo disparador coincida.
4. Antes de editar, revisar estado de Git, flujo actual, propietario de la responsabilidad y consumidores afectados.

## Reglas de ejecución

- Presentar un plan breve antes de cambios importantes.
- Mantener MVC/Razor como base y React como islas.
- Reutilizar objetos existentes y respetar las rutas de `references/PROJECT_STRUCTURE.md`.
- No crear una llamada, caché, permiso, DTO o componente paralelo cuando ya existe un propietario común.
- Tratar API/AX como autoridad de datos y autorización; la interfaz solo mejora la experiencia.
- Aislar estado sensible del navegador por OID Entra y empresa.
- Preservar localización, accesibilidad, móvil y contratos de fechas, filtros, dropdowns y permisos.
- No hacer commit, push, despliegue o promoción de producción sin petición explícita.

## Cierre

1. Ejecutar las comprobaciones proporcionales de `references/QUALITY_CHECKLIST.md`.
2. Revisar el diff y distinguir regresiones nuevas de deuda anterior.
3. Si cambiaron reglas `.codex`, ejecutar `npm run sync:codex:references` y `npm run check:codex:references`.
4. Informar resultados, impacto contractual, supuestos y límites de validación externa.
