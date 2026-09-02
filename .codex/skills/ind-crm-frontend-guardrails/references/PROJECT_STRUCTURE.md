# Estructura y propiedad de IND_CRM_APP

## Directorios principales

| Ruta | Responsabilidad |
|---|---|
| `App/` | Infraestructura, modelos, middleware, recursos y servicios de servidor. |
| `Web/Controllers/` | Acciones MVC y proxies locales para las islas frontend. |
| `Web/Views/` | Vistas Razor, layout y parciales. |
| `Web/wwwroot/` | Origen canónico de los archivos web. |
| `Web/wwwroot/react/src/` | Código TypeScript/TSX de React y legado migrado. |
| `Web/wwwroot/js/` | Salida generada por esbuild; no se edita a mano. |
| `Web/wwwroot/css/` | Entrada y salidas CSS actuales. |
| `wwwroot/` | Copia de compatibilidad generada desde `Web/wwwroot`; no es un enlace ni el origen de edición. |
| `scripts/` | Compilación, comprobaciones y sincronización documental. |
| `tests/` | Pruebas automatizadas. |
| `docs/` | Documentación de producto, arquitectura y operaciones. |
| `docs/crm-help/` | Fuente canónica de la ayuda funcional del CRM. |
| `docs/backups/` | Copias explícitas de herramientas; no son reglas activas. |
| `.codex/` | Normas temáticas vigentes. |
| `.codex/Axapta/` | Espejo de XPO cuyo origen canónico está en `IND_CRM_API`. |

## Frontera frontend

- Las páginas React viven en `Web/wwwroot/react/src/pages/<módulo>/`.
- El estado y la orquestación pertenecen a la página o a hooks del módulo.
- Los componentes compartidos, tontos y dirigidos por props viven en `components/commons/`.
- Un componente pasa a compartido solo cuando al menos dos flujos usan el mismo contrato y comportamiento.
- Servicios HTTP en `services/`, utilidades puras en `utils/` y tipos compartidos en `types/`.
- Los puntos de entrada se registran en `scripts/build-react.mjs`, montan con los helpers existentes y se cargan desde Razor como módulos ESM.
- Todo código frontend nuevo es `.ts` o `.tsx`; no se crean fuentes manuales en las carpetas de salida `js/` o `chunks/`.

## Frontera servidor

- La lógica de integración y negocio vive en servicios de `App/`, no en Razor ni en los controladores.
- Las rutas canónicas hacia la API se centralizan en `App/Services/ApiHelpers/ApiRoutes.cs`.
- Los DTO y view models pertenecen a `App/Models/` y mantienen el contrato real de `IND_CRM_API`.
- La seguridad, contexto y localización se amplían dentro de sus carpetas actuales; no se crean árboles paralelos.

## Archivos raíz relevantes

- `Program.cs`: registro de servicios, middleware y rutas.
- `IND_CRM_APP.csproj`: .NET 10 y `Web/wwwroot` como `WebRootPath`.
- `package.json`: compilación y comprobaciones frontend/documentales.
- `tailwind.config.js`: contenido, color principal y tipografía.
- `publish.ps1`: compila, sincroniza `Web/wwwroot` → `wwwroot` y publica en IIS cuando se solicita.

## Regla de colocación

Antes de crear un objeto, identificar su propietario actual y reutilizar el árbol del módulo. No crear carpetas raíz nuevas ni duplicar servicios, hooks, componentes o contratos salvo necesidad demostrada.
