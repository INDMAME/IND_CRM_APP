---
name: safe-change-loop
description: Usar al realizar cambios no triviales en código, configuración, arquitectura, datos, API, contratos, seguridad, despliegue, documentación o integraciones.
---

# Ciclo de cambio seguro

Esta skill aplica el mismo ciclo defensivo en `IND_CRM_APP` e `IND_CRM_API`. Las reglas del repositorio y las instrucciones superiores tienen precedencia.

## Antes de editar

1. Revisar `git status`, diff existente y archivos no rastreados.
2. Identificar el flujo actual, propietario, consumidores, contrato y pruebas.
3. Clasificar el riesgo y escoger el cambio más pequeño, compatible y reversible.
4. Presentar un plan breve antes de una modificación importante.

Detenerse solo si falta una decisión que cambie de forma material arquitectura, datos, seguridad o compatibilidad; hay riesgo de pérdida; se requiere autoridad externa; o una validación crítica es imposible.

## Durante el cambio

- Editar una unidad coherente cada vez y no tocar trabajo ajeno.
- Mantener compatibilidad de rutas, verbos, cabeceras, campos, nulabilidad, enums, fechas, errores, paginación y configuración.
- Preferir cambios aditivos; un cambio incompatible necesita migración aprobada.
- No añadir dependencias, valores por defecto o casts para ocultar el problema.
- Los comentarios y la documentación siguen la política de idioma del repositorio y cualquier instrucción superior activa.
- Para AX/XPO, usar exclusivamente `.codex/AX_XPO_WORKFLOW.md`; la paridad de archivos no demuestra activación en AX.

## Validación y cierre

1. Ejecutar primero la comprobación específica y ampliar según el riesgo.
2. Revisar formato/lint, compilación, pruebas, contrato e integración aplicables.
3. Revisar el diff completo y confirmar que no hay cambios accidentales.
4. Informar qué cambió, validaciones reales, impacto contractual, supuestos y pendientes externos.

Si una comprobación externa depende de AX, credenciales, una GUI o un runtime inaccesible, preparar los pasos manuales y declarar esa frontera; no inventar evidencia de extremo a extremo.
