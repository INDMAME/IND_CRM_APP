# Project Structure (IND_CRM_APP)

## Context
- This map documents the intended folder layout after reorganization.
- Generated folders (`bin`, `obj`, `node_modules`, `.publish_tmp`) are excluded from details.
- Canonical static path is `Web/wwwroot`. Root `wwwroot` is a compatibility junction and should not be the authoring target for new source files.

## Structure map (with context)
```
.
|-- .agents/                            // Local helper skills and optional templates
|-- .codex/                             // Internal documentation and guardrails (source of truth)
|-- .config/                            // Tooling config
|-- .githooks/                          // Local git hook scripts
|-- .github/                            // CI workflows and automation
|-- .playwright/                        // Playwright local artifacts/config helpers
|-- .vscode/                            // VSCode workspace config
|-- App/                                // Backend domain and infrastructure code
|   |-- Extensions/                     // Extension methods and helpers (C#)
|   |-- Infrastructure/                 // Security, validation, localization, configuration
|   |-- Middleware/                     // ASP.NET Core middleware
|   |-- Models/                         // DTOs and view models for MVC
|   |-- Resources/                      // Localization resources (.resx)
|   `-- Services/                       // API clients and business services
|-- docs/                               // Project documentation (external)
|-- Logs/                               // Runtime logs (local/IIS)
|-- Properties/                         // ASP.NET Core properties (launchSettings)
|-- scripts/                            // Build scripts (esbuild entry map, codex sync)
|-- test-results/                       // Playwright output artifacts
|-- tests/                              // Playwright tests
|-- Web/                                // Web layer (MVC + static assets)
|   |-- Assets/                         // Source assets (Tailwind input, etc.)
|   |-- Controllers/                    // MVC controllers
|   |-- Views/                          // Razor views and layouts
|   `-- wwwroot/                        // Static web root (canonical path)
|       |-- css/                        // CSS outputs (tailwind.css, page css)
|       |-- images/                     // App images
|       |-- js/                         // Compiled JS ESM entries + generated chunks
|       |-- lib/                        // Third party libraries (jquery, validation)
|       `-- react/                      // React source
|           |-- global.d.ts             // Global TS types for window variables
|           `-- src/                    // React sources (TS/TSX)
|               |-- components/         // Shared components
|               |   |-- commons/        // Shared UI building blocks
|               |   |-- data/           // Shared data display components
|               |   |-- navigation/     // Shared navigation components
|               |   `-- visitas/        // Shared Visitas-only components
|               |-- context/            // React context providers
|               |-- facades/            // Facades for business logic (if used)
|               |-- hooks/              // Cross-page React hooks
|               |-- legacy/             // TS sources that compile to global JS
|               |-- pages/              // Page containers (React islands)
|               |   |-- system/         // System tools (TextEditor, AudioRecorder)
|               |   `-- visitas/        // Visitas module pages
|               |       |-- components/ // Visitas page-local UI blocks
|               |       |-- creacion/   // Create page, form, and page-local hooks
|               |       |-- detail/     // Detail page, form, and page-local hooks
|               |       `-- historial/  // History page, table, and page-local hooks
|               |-- services/           // Frontend services (fetch helpers)
|               |-- types/              // Shared frontend type definitions
|               `-- utils/              // Frontend utilities
|-- wwwroot/                            // Junction to Web/wwwroot (compatibility mirror)
`-- Root files                          // See list below
```

## Root files (no folder)
- `Program.cs`: ASP.NET Core startup and middleware pipeline.
- `IND_CRM_APP.csproj`: project file and package references.
- `package.json`: frontend build scripts (esbuild + tailwind + codex sync).
- `tailwind.config.js`: Tailwind setup and content scan paths.
- `tsconfig.json`: TS compiler settings for React sources.
- `publish.ps1`: publish + IIS copy helper.
- `appsettings.json` / `appsettings.Development.json`: app config.
- `playwright.config.js`: E2E config.
- `.gitattributes` / `.gitignore`: git settings.
- `IND_CRM_APP.slnx`: solution container.

## Master instruction (must follow for new work)
1) Place new backend code under `App/` and new web code under `Web/`.
2) Keep React source only in `Web/wwwroot/react/src`. Do not add manual source files in `Web/wwwroot/js` (build outputs and generated chunks only).
3) Treat `Web/wwwroot` as canonical. Root `wwwroot` is a mirror path and must not be used as the primary location for new source files.
4) Every new class and method must include a short English ASCII comment describing purpose.
5) Add or update documentation in `.codex/` when introducing new patterns.
6) If you add a new React island, add it to `scripts/build-react.mjs`, use `mountReactIsland` + `mountWhenDocumentReady`, and load it from Razor with `script type="module"`.
7) Never change date pickers or filters without validating events and payloads.
8) Keep MVC controllers thin; call services only.
9) When adding UI strings, update all resource files.
10) Input-like components must accept a `readOnly` (or `mode`) prop and apply label/value colors locally.
11) Before creating any new object (class, component, hook, service, script, test, view), do a pre-check against this structure map and place it in the existing module path.
12) For any React/frontend object creation or refactor, apply `vercel-react-best-practices` first (waterfalls, bundle size, listener strategy, rerender safety) and `vercel-composition-patterns` when component APIs are involved.
13) Do not create new root folders or parallel module trees unless explicitly required.
14) When `.codex/*.md` changes, run `npm run sync:codex:references` so skill references stay aligned.

## Last updated
- 2026-02-10
