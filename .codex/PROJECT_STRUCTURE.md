# Project Structure (IND_CRM_APP)

## Context
- This map documents the intended folder layout after reorganization.
- Generated folders (bin, obj, node_modules, .publish_tmp) are excluded from details.

## Structure map (with context)
```
.
├── App/                                // Backend domain and infrastructure code
│   ├── Extensions/                     // Extension methods and helpers (C#)
│   ├── Infrastructure/                 // Security, validation, localization, configuration
│   ├── Middleware/                     // ASP.NET Core middleware
│   ├── Models/                         // DTOs and view models for MVC
│   ├── Resources/                      // Localization resources (.resx)
│   └── Services/                       // API clients and business services
├── Web/                                // Web layer (MVC + static assets)
│   ├── Assets/                         // Source assets (Tailwind input, etc.)
│   ├── Controllers/                    // MVC controllers
│   ├── Views/                          // Razor views and layouts
│   └── wwwroot/                        // Static web root
│       ├── css/                        // CSS outputs (tailwind.css, page css)
│       ├── images/                     // App images
│       ├── js/                         // Compiled JS bundles
│       ├── lib/                        // Third party libraries (jquery, validation)
│       └── react/                      // React source
│           ├── global.d.ts             // Global TS types for window variables
│           └── src/                    // React sources (TS/TSX)
│               ├── components/         // Shared components
│               │   ├── commons/        // Small shared UI (picker, spinner, etc.)
│               │   ├── data/           // Shared data display components
│               │   ├── layout/         // Shared layout components
│               │   ├── navigation/     // Shared navigation components
│               │   └── visitas/        // Shared Visitas-only components
│               ├── context/            // React context providers
│               ├── facades/            // Facades for business logic (if used)
│               ├── hooks/              // React hooks
│               ├── legacy/             // TS sources that compile to global JS (ind-action-mark)
│               ├── pages/              // Page containers (React islands)
│               │   ├── gastos/         // Gastos module (pending)
│               │   ├── system/         // System tools (TextEditor, AudioRecorder)
│               │   └── visitas/        // Visitas module pages
│               │       ├── components/ // Visitas page-specific UI
│               │       ├── creacion/   // Create page and form
│               │       ├── detail/     // Detail page and form
│               │       └── historial/  // History page and table
│               ├── services/           // Frontend services (fetch helpers)
│               └── utils/              // Frontend utilities
├── .codex/                             // Internal documentation and rules
├── .config/                            // Tooling config
├── .vscode/                            // VSCode workspace config
├── docs/                               // Project documentation (external)
├── tests/                              // Playwright tests
├── Logs/                               // Runtime logs (local/IIS)
├── Properties/                         // ASP.NET Core properties (launchSettings)
├── scripts/                            // Build scripts (esbuild entry map)
└── Root files                          // See list below
```

## Root files (no folder)
- Program.cs: ASP.NET Core startup and middleware pipeline.
- IND_CRM_APP.csproj: Project file and package references.
- package.json: Frontend build scripts (esbuild + tailwind).
- tailwind.config.js: Tailwind setup and content scan paths.
- tsconfig.json: TS compiler settings for React sources.
- publish.ps1: Publish + IIS copy helper.
- appsettings.json / appsettings.Development.json: App config.
- playwright.config.js: E2E config.
- .gitattributes / .gitignore: Git settings.
- IND_CRM_APP.slnx: Solution container.
- TEMP_DO_NOT_COMMIT.txt: Local marker (do not commit).

## Master instruction (must follow for new work)
1) Place new backend code under App/ and new web code under Web/.
2) Keep React source only in Web/wwwroot/react/src. Do not add new entries in Web/wwwroot/js.
3) Every new class and method must include a short English ASCII comment describing purpose.
4) Add or update documentation in .codex/ when introducing new patterns.
5) If you add a new React island, add it to scripts/build-react.mjs.
6) Never change date pickers or filters without validating events and payloads.
7) Keep MVC controllers thin; call services only.
8) When adding UI strings, update all resource files.
9) Input-like components must accept a readOnly (or mode) prop and apply label/value colors locally.

## Last updated
- 2026-02-03
