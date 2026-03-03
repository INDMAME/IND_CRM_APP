# IND_CRM_APP agent profile

## Scope and hierarchy
- Scope: global project rules for IND_CRM_APP.
- If conflict: system > this file > other `.codex/*.md` feature docs.
- Shared UI rules live in `.codex/UI_GUIDE.md`.

## Technical context

- Project: ASP.NET Core MVC web application on .NET 10.0 with Razor views (server side rendering).
- This app consumes the internal IND_CRM_API via HTTP.
- IND_CRM_API is documented with Swagger 2.0 (OpenAPI) and uses standard wrappers:
  - IND_CRM_API.Models.Responses.IndApiResponse<T> for command operations (login, create, update, delete, etc.).
  - IND_CRM_API.Models.Responses.IndPagedResponse<T> for lists and paged results.
- Solution is organized by CRM modules: authentication (auth), activities (activities), accounts (accounts), visits (visits), expenses (gastos), system (system) and health (health).
- Internal line-of-business app: focus on clarity, robustness and modern design, not public SEO.

## IND_CRM_API consumption

- Source of truth for contracts: IND_CRM_API OpenAPI (Swagger 2.0) and API DTOs (LoginRequest, CreateActivityRequest, UpdateActivityRequest, CreateVisitaAsistenteRequest, etc.).
- Long term goal:
  - Use a strongly typed C# client generated from the IND_CRM_API OpenAPI document (for example NSwag or similar).
- Short term goal:
  - Encapsulate all HTTP calls in a clean service (for example ICrmApiClient / ApiClientService) and keep MVC controllers free from low level HTTP logic.
- Important rules:
  - Controllers must NEVER build URLs, headers or parse JSON manually.
  - Controllers must depend on service interfaces (for example ICrmApiClient, IAuthService, ICrmActivitiesService, etc.).
  - API calls must respect the current response structure and JSON contract used by the Postman collection:
    - For commands: Success, Message, ErrorCode, Data, Errors, TraceId.
    - For paged lists: Success, Message, Total, Page, PageSize, Items, TraceId.
  - Do not invent new response formats in the web app: the API defines the contract, the web consumes it and maps it to view models.

## Response contracts

- Use these API classes as reference:
  - IndApiResponse<T>:
    - Success (bool)
    - Message (string)
    - ErrorCode (string)
    - Data (T)
    - Errors (list of validation errors)
    - TraceId (string)
  - IndPagedResponse<T>:
    - Success (bool)
    - Message (string)
    - Total (int)
    - Page (int)
    - PageSize (int)
    - Items (list of T)
    - TraceId (string)
- In the web app:
  - Define response models/DTOs that mirror these contracts (for example IndApiResult<TViewModel>, IndPagedResult<TViewModel>) if needed, or later use the models from the generated OpenAPI client.
  - Always check Success before reading Data or Items.
  - Use Message and ErrorCode to show clear error information to the user.
  - For lists (activities, accounts, contacts, etc.) use Total, Page, PageSize and Items as the base for UI pagination.

## Mandatory internal MVC API endpoint pattern

- Applies to every endpoint exposed by this app under `/api/...` and consumed by React or JS clients.
- Define canonical route constants in `App/Services/ApiHelpers/ApiRoutes.cs` and reuse them in service calls. Avoid inline route strings.
- In controller actions:
  - Use dedicated API actions (`Api*` naming) separate from page MVC actions.
  - Declare explicit HTTP verb attributes (`[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]`) that exactly match the caller verb.
  - For JSON API POST endpoints called from React islands, use `[IgnoreAntiforgeryToken]` and validate session/token inside the action.
  - Return API envelope-compatible payloads (`Success`, `Message`, `Data` or `Items`, `TraceId`) using shared helpers (`CreateApiPagedResponse`, `CreateApiPagedError`, etc.) when available.
- In routing (`Program.cs`):
  - Add explicit `app.MapControllerRoute(...)` entries for each `/api/...` endpoint.
  - Ensure route pattern, controller, and action names match exactly to avoid fallback to `Home/NotFound`.
- Mandatory validation before completion:
  - Call each new local endpoint with the expected HTTP verb and confirm no 404/405.
  - Call the same path with a wrong verb and confirm 405 behavior is intentional.
  - Confirm response shape matches current API wrapper contracts.

## Authentication and tokens

- Authentication flow:
  - POST /api/auth/login returns IndApiResponse<object> with a JWT token in Data or in fields defined by the API.
  - POST /api/auth/refresh renews the token.
- JWT token management:
  - Must be handled in a dedicated service (for example ITokenService or IAuthClient), not scattered across controllers.
  - Only that service should:
    - Store and retrieve the token from session or cookies.
    - Add Authorization: Bearer {token} header to HTTP calls to IND_CRM_API.
- Controllers must not manipulate the token directly, they just call the authenticated services.

## UI, design system and frontend architecture

- Allowed UI architecture:
  - Keep ASP.NET Core MVC with Razor views as the primary rendering model.
  - React is allowed only as a complement: React components embedded as islands inside MVC/Razor views when it brings value, but NOT as a full SPA rewrite.
  - Do not introduce other frontend frameworks (Angular, Vue, Blazor, Svelte, etc.) unless explicitly requested.
- Mandatory design standard:
  - Use only Tailwind CSS for styles in new views, partials, Razor components and React components.
  - Any new HTML/CSHTML/JSX must use Tailwind classes, not Bootstrap classes.
  - Use base font family "Montserrat", sans-serif in the main layout and in all new components.
  - Use color #00296b as the primary/base color in the UI (sidebar, headers, primary buttons, main links, active items) and configure it as the primary color in Tailwind.
  - Use StarBorder for buttons by default. Standard icon size is 16x16 (h-4 w-4). Active button color #00296b, inactive #00296bc4, text color #e2e8f0.
  - Topbar icons: 24x24 SVG inside 25x25 container, with `aspect-ratio: 1 / 1` and `stroke-width: 1.5 !important` on `path/line/polyline`. When swapping states, keep `hidden` on the inactive SVG (CSS enforces `.topbar svg.hidden { display: none !important; }`).
  - Input components must accept a readOnly (or mode) prop and apply label/value colors locally:
    - Label color is always #00296be0.
    - Value color: edit = #00296be0, read = #64748b.
    - Do not rely on global CSS overrides or opacity wrappers for read-only.
- Interactive components:
  - Use Tailwind CSS components and patterns for modals, menus, dropdown lists, dialogs, steps, etc., integrated with Tailwind (both in Razor and React).
  - Use Heroicons as the default icon set across the UI.
  - Dropdown/combobox rules: follow `.codex/UI_GUIDE.md` dropdown pattern (cache, portals, keyboard, chevron toggle) for any new selectable field.
- Static legacy libraries:
  - jQuery v3.7.1, jquery-validation and unobtrusive are considered legacy code.
  - Do not write new code that depends on these libs.
  - Do not add new jQuery/jq-validation usage.
  - Only touch this legacy code to safely migrate it to Tailwind + Tailwind CSS + Heroicons + Montserrat + #00296b, using small and safe refactors without breaking current behavior.
- Reuse:
  - Create reusable Razor partials/components and React components for:
    - Main layout (header, navigation, content).
    - Info cards (for example "Data from Axapta 3.0" blocks and CRM summaries).
    - Page headers.
    - Primary buttons (Tailwind classes with #00296b).
  - Replace duplicated HTML in views with these shared components.

## Tailwind CSS and frontend build

- Tailwind CSS 4.x is built via CLI (npm run build:css) defined in package.json and tailwind.config.js; main output is Web/wwwroot/css/tailwind.css.
- There should be a single CSS entry point where Tailwind can grow progressively.
- Configure Tailwind to:
  - Register "Montserrat" as base font family.
  - Register #00296b as a primary color in the palette (for example "primary").
- React islands are bundled by esbuild to ESM entry files under Web/wwwroot/js and shared chunks under Web/wwwroot/js/chunks.
- Root wwwroot is a compatibility junction to Web/wwwroot. Use Web/wwwroot as the canonical authoring path for source changes.
- Do not hand-edit generated files under Web/wwwroot/js or Web/wwwroot/js/chunks.
- Razor pages that load React island bundles must use script type="module".
- Do not introduce new CSS frameworks or heavy frontend toolchains unless clearly justified.
- Priority is SSR and utility CSS; React is used only as a complement on top of MVC, not as a full SPA.

## Documentation and code style

- Comments and docstrings:
  - Must be in simple English and ASCII only (no accents, no special characters).
  - Briefly explain:
    - What each controller and public action does.
    - What each service calling IND_CRM_API does.
    - What each shared UI component represents (layout, card, header, button, React component).
- Any new DTO or view model:
  - Must have a clear English name.
  - Prefer meaningful names that express function (for example CrmActivityViewModel, CrmAccountListItemViewModel).
- Do not introduce non ASCII characters in C#, Razor, JSX or comments.
- When updating .codex guardrail docs, edit root .codex/*.md files or .codex/config.toml first and run npm run sync:skill:local:references to keep skill references aligned.

## I18N rules (UI only)

- Supported UI cultures: es-ES (default), Basque, en, pt, it, zh-Hans.
- Any user-facing UI string (labels, titles, placeholders, aria-labels, empty states, error messages) must come from localization resources, not hardcoded text.
- Razor: use `IStringLocalizer<INDSharedResource>` and resource keys under `App/Resources/Infrastructure/Localization/INDSharedResource.*.resx`.
- React islands / JS: inject a per-page `window.__IND_I18N__` dictionary from Razor and read it via `indT(...)` helpers.
- When adding a new key, add it to all supported culture .resx files in the same change.
- Do not translate business data from the API; translate only fixed UI strings.

## Shared UI rules

- See `.codex/UI_GUIDE.md` for overflow preview, read-only guard, dropdowns, and action mark rules.

## How Codex should work

- Refactoring:
  - Prefer small, focused changes instead of large rewrites.
  - Keep existing MVC routes and view models unless there is a clear bug or major inconsistency.
- View logic:
  - Keep Razor views as light as possible.
  - Business rules and integration logic must live in services or helpers.
- Error handling:
  - When changing how the API is called, clearly explain how IndApiResponse / IndPagedResponse errors are transformed into user facing messages.
  - Do not fully hide technical errors, but present them in a way that makes sense for internal users.
- Dependencies:
  - Avoid new frontend or backend dependencies unless they clearly reduce complexity.
  - Any new library must be justified in a short English comment.
- UI style:
  - All UI proposals must align with:
    - ASP.NET Core MVC + Razor as base.
    - React only as optional islands when needed.
    - Tailwind CSS as styling framework.
    - Tailwind CSS as component pattern.
    - Heroicons as icon set.
    - "Montserrat", sans-serif as base font.
    - #00296b as primary corporate color.
  - Tailwind helper skills (`tailwindcss-v4`, `tailwind-patterns`) are support tools only. They must not override project tokens, spacing rhythm, component contracts, or established page composition.
  - Do not propose solutions based on Angular, Vue, Blazor, Svelte, Bootstrap, jQuery UI, Material, etc.

## Mandatory skill-first object creation rule

- Before creating any new object of any type, Codex must do a short pre-check:
  - Object types include (not limited to): class, interface, DTO, view model, controller, service, helper, middleware, React component, hook, context, facade, script, test, Razor view/partial, and resource keys.
  - First apply the `vercel-react-best-practices` skill when the change touches React, TS/TSX, frontend rendering, fetch flow, bundle output, listeners, or re-render behavior.
  - Validate destination path against `.codex/PROJECT_STRUCTURE.md` and keep the current folder taxonomy.
  - Reuse an existing object if the responsibility already exists; do not create parallel duplicates.
  - Do not create new top-level folders or module trees unless explicitly requested.
- If a request conflicts with file structure rules, Codex must warn and propose a structure-safe location first.
- Before creating any new input-like component, Codex must ask which input type is required:
  - remote-search-dropdown
  - fixed-enum-instant-search
  - fixed-enum-select
- The selected input type must be confirmed before implementation starts.

## Mandatory planning gate for React page work

- Before implementing or refactoring any React page, Codex must produce a short plan that defines:
  - Smart containers/pages.
  - Dumb presentational components.
  - Page-local hooks (state, listeners, mutations).
  - Shared utilities/services and what will be reused.
  - Exact destination paths following `.codex/PROJECT_STRUCTURE.md`.
- If page decomposition is ambiguous, Codex must ask clarifying questions before coding:
  - Number of sections/steps in the page.
  - Which blocks must be shared vs page-local.
  - Expected input types per field (remote-search-dropdown, fixed-enum-instant-search, fixed-enum-select).
  - Required apply/refresh/caching behavior for API calls.
- Do not start implementation with unresolved assumptions unless the user explicitly approves those assumptions.
- The plan must list required skills to be used for the task (at minimum `ind-crm-frontend-guardrails`, plus triggered sub-skills from routing).

## Critical anti regression rule (dates, calendars and API)

Codex must apply this rule for any change that touches views, scripts or filter logic:

- Never change initialization of interactive components (calendars, datepickers, dropdowns) without validating full behavior.
- Any change on date filters must check that:
  1) The calendar still opens and works correctly.
  2) onChange, click, blur and validation events still work.
  3) Requests sent to IND_CRM_API keep exactly the expected format.
  4) No Razor binding, ViewModel or HTML helper is broken.
- If a visual, structural or logic change has risk on a calendar or filter:
  - Codex must warn explicitly and offer a no risk alternative.
- No change is accepted if it breaks the current filtering flow.
- Absolute priority: zero regressions on date components and any component depending on the API.

# Global Codex working agreements

- Prefer clean, defensive code and small focused functions.
- Always explain your plan in a few bullet points before big changes.
- Use simple English in comments and commit messages (ASCII only).
- Add short comments to new methods/classes so any developer can understand them.
- Avoid new dependencies unless clearly justified in a comment.
- Keep existing behavior stable unless there is a clear bug or requirement.
- Frontend standard: ASP.NET Core MVC + Razor views, with optional React components; Tailwind CSS only; Tailwind CSS for interactive components; Heroicons for icons; base font "Montserrat", sans-serif; primary color #00296b.
- Treat jQuery, and jquery-validation as legacy; do not add new usage.
- Critical anti regression rule: never change calendars/date filters/dropdowns without validating events, payload formats to IND_CRM_API, and Razor bindings; propose a safe alternative if risk exists.
- Always run a full compile at the end of every task before responding to the user:
  - npm run build:react
  - npm run build:css
  - npm run build
  - dotnet build
- After any change that must be deployed, publish to C:\inetpub\wwwroot\IND_CRM_APP and restart IIS using iisreset.

## Quick design prompt (visitas/historial)
- Tailwind only; Bootstrap removed (no `spinner-border`, `page-item`, `page-link`, etc.).
- Inputs/combos: `rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary`.
- Dropdowns: portal lists `rounded-xl` with visible scrollbar; options usan 10px de padding left (clase `type-option`), hover/active en primary.
- Spinners: Tailwind ring `border-2 border-primary border-t-transparent rounded-full animate-spin`.
- Paginacion (historial): botones Tailwind (`rounded-lg border`, activo bg primary; contenedor `flex gap-2`).

## Last updated
- 2026-02-17
