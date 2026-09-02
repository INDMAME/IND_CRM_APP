# Validación de cambios en IND_CRM_APP

No todas las tareas ejecutan todo. Seleccionar las comprobaciones según los archivos y el riesgo, y registrar el resultado real.

## Siempre

- Revisar `git status`, el diff completo y los archivos no relacionados.
- Confirmar que se conservan contratos, permisos, localización y flujo existente.
- Comprobar que no se añadieron secretos, valores privados de entorno ni dependencias innecesarias.
- Ejecutar la prueba más específica disponible antes de ampliar el alcance.

## Documentación y reglas

- Verificar que no se crearon bitácoras, temporales ni una segunda fuente del mismo concepto.
- Comprobar enlaces Markdown locales y encabezados duplicados.
- Si cambia `.codex/*.md` o `.codex/config.toml`:
  - `npm run sync:skill:local:references`
  - `npm run check:codex:references`
- Si cambia `docs/crm-help`, ejecutar el generador y las evaluaciones de la ayuda, comprobar el bundle determinista y sincronizar su copia en `IND_CRM_API/Knowledge` sin desplegar salvo petición explícita.
- Si cambia AX/XPO, aplicar `AX_XPO_WORKFLOW.md` y el comprobador de formato/paridad.

## Frontend

- Tipos: `npm run check:types`.
- Bundle y CSS cuando se tocan sus fuentes: `npm run build` o las variantes de producción requeridas.
- Pruebas del módulo afectado; para Gastos, preferir los scripts `test:gastos*` aplicables.
- React Doctor sobre los archivos cambiados antes del cierre; separar deuda histórica de regresiones nuevas.
- Verificar rutas ESM, chunks, listeners, peticiones independientes y desmontaje de efectos.
- Revisar manualmente móvil y escritorio cuando cambie la presentación; no usar automatización visual salvo petición explícita.

## Servidor

- `dotnet build` y pruebas .NET aplicables.
- Para un nuevo proxy `/api/...`: ruta, verbo esperado, 405 del verbo incorrecto y forma del envoltorio.
- Comprobar OIDC/contexto si se modifica identidad, empresa, sesión o autorización.
- En seguridad por registro, comprobar `OwnerAxUserId`, `CanMutate`, política y rechazo servidor de la petición no autorizada.

## Regresiones sensibles

- Calendarios y filtros: apertura, foco, eventos, validación y formato de fecha enviado.
- Empresa/usuario: claves de navegador aisladas, cambio de empresa, logout y actualización de permisos.
- Formularios: solo lectura, formato numérico, confirmaciones y marcas de resultado.
- Datos: una optimización de recursos fijos no debe evitar la consulta API que aporta datos actuales.

## Publicación, solo si se solicita

- Web local/IIS: completar comprobaciones, ejecutar `publish.ps1` y verificar reinicio, salud y artefactos servidos.
- Producción: solo mediante el flujo PR `DEV` → `PROD` definido en `AGENTS.md`.
- Una publicación APP/API no demuestra activación en AX; documentar siempre esa frontera.
