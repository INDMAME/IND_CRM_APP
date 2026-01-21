# Permisos y contexto (IND CRM)

## Scope and hierarchy
- Scope: permisos, contexto Entra y cambio de compania.
- If conflict: system > `.codex/AGENTS.md` > this doc.

## Objetivo
- Garantizar que los permisos de Axapta se apliquen antes de navegar, guardar o ejecutar acciones.
- Mantener la compania seleccionada por el usuario aunque el contexto se refresque.
- Evitar que una llamada AJAX quede bloqueada o redirigida por falta de modulo mapeado.

## Fuentes del contexto (Entra)
- El contexto de permisos llega desde el endpoint Entra y se mapea a `IndWebContext`.
- Se guarda en sesion como JSON en `INDWebContext`.
- Se cachea por OID en `INDEntraOidContext` para evitar mezclar usuarios.
- Si cambia el OID, se limpia el contexto en sesion.

## Claves de sesion usadas
- `INDWebContext`: cache del contexto Entra.
- `INDCompanySelected`: compania elegida por el usuario.
- `INDCompanySelectionSource`: `user` o `default`.
- `INDCompanySelectedName`: nombre de compania para UI.
- `ENTRAOID`: OID del usuario en sesion.
- `Token`, `TokenExpires`: token interno para API.

## Seleccion de compania
- Regla base: si el usuario eligio compania, no se debe volver a `DefaultCompany`.
- `IndAuthContextService.GetSelectedCompanyId()`:
  - Si existe `INDCompanySelected`, se usa siempre.
  - Si `INDCompanySelectionSource` es `user`, no se usa default.
  - Si no hay seleccion, usa `DefaultCompany` del contexto, o la primera empresa.
- Cuando el usuario cambia compania:
  - `INDCompanySelected` se actualiza.
  - `INDCompanySelectionSource` se fija en `user`.
  - Se limpia cache del contexto preservando la seleccion.
  - Se vuelve a pedir contexto (para refrescar permisos).
  - Se redirige a `Home/Index`.

## Refresco en Home/Index
- `HomeController.Index()` siempre llama:
  - `ClearContextCache(preserveCompanySelection: true)`
  - `EnsureContextAsync()`
- Esto refresca permisos sin perder la compania seleccionada.

## Niveles de acceso (Axapta)
- `0` NoAccess
- `1` View
- `2` Edit
- `3` Add
- `4` FullAccess

## Registro de modulos (INDModuleRegistry)
- Modulos canonicos:
  - `VISITAS_CREACION`
  - `VISITAS_HISTORIAL`
- Se deben mapear aliases y rutas a cada modulo.
- Si una ruta nueva no aparece en el registro, el filtro responde "Module not mapped".

## Filtro global de permisos (INDModuleAuthorizeFilter)
- Se ejecuta en todas las acciones MVC (excepto bypass paths).
- Flujo:
  1) Verifica autenticacion.
  2) `EnsureContextAsync()` y valida contexto.
  3) Resuelve compania seleccionada.
  4) Protege cambios de compania forzados via URL.
  5) Resuelve modulo y valida acceso.
- Reglas de acceso segun ruta:
  - `/TextEditorReact/*` -> View
  - `/Create*` -> Add
  - `/Update*` o `/Edit*` -> Edit
  - `/Delete*` -> FullAccess
  - resto -> View

## Resolucion de modulo (returnUrl)
- Si la ruta no esta mapeada directamente:
  - Se intenta `returnUrl` desde query, form o `Referer`.
  - Solo se acepta si es local (empieza con `/`).
  - Se normaliza para comparar con el registro.
- Esto es critico para llamadas AJAX como `TranscribeSpeech`.

## Guardas de cambio de compania
- Si se detecta compania distinta en query, route o path, se redirige a `Home/Index`.
- Se revisan keys: `company`, `companyId`, `indCompany`, `indCompanyId`.
- Para rutas con compania en el path, se valida en `IsCompanyGuardPath`.

## Denegacion y popup estandar
- Si es JSON/AJAX: se devuelve `{ success: false, message }` con 403.
- Si es HTML:
  - Se redirige a `Home/Index`.
  - Se guarda `IndPermissionRedirectMessage` en TempData.
  - En el layout se muestra modal con el mensaje y el usuario debe aceptar.

## UI basada en permisos
- El layout expone `window.__IND_MODULE_ACCESS__` con los accesos por modulo.
- Topbar y sidebar ocultan botones de editar/eliminar/crear segun nivel.
- El microfono del editor solo se muestra si `allowEdit` es true.

## Cache y datos por compania (frontend)
- Cualquier cache en `sessionStorage` debe incluir el id de compania.
- Si no se separa por compania, se puede mezclar informacion y crear errores.

## Directrices para nueva funcionalidad
1) Preguntar siempre:
   - `ModuleCode` exacto de Axapta.
   - Nivel de acceso requerido para ver, editar, crear y borrar.
2) Actualizar `INDModuleRegistry`:
   - Agregar constante del modulo.
   - Agregar alias si cambia el nombre.
   - Agregar todas las rutas/acciones nuevas.
3) Asegurar returnUrl en llamadas AJAX:
   - Enviar `returnUrl` en query o form cuando la ruta no sea mapeable.
4) UI y botones:
   - Ocultar/mostrar acciones con `__IND_MODULE_ACCESS__`.
5) Validar cambio de compania:
   - Si hay rutas con compania en el path, agregar al guard.
6) Probar:
   - Usuario con permisos solo View.
   - Usuario con Add sin Historial.
   - Cambio de compania y refresco de permisos en Index.

## Last updated
- 2026-01-21
