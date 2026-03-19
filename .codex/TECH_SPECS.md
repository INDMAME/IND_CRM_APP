# Technical Specs (IND_CRM_APP)

## Scope and hierarchy
- Scope: architecture, API integration, auth, permissions, localization, build system.
- If conflict: system > .codex/AGENTS.md > this doc.

## Architecture summary
- MVC + Razor is the base. React is islands only (no SPA rewrite).
- Backend code lives under `App/` (services, infra, middleware, models, extensions).
- Web code lives under `Web/` (controllers, views, wwwroot).

## API surface (IND_CRM_API)
- Base URL: `ApiSettings:BaseUrl`.
- Envelopes:
  - `IndApiResponse<T>`: `Success`, `Message`, `ErrorCode`, `Data`, `Errors`, `TraceId`.
  - `IndPagedResponse<T>`: `Success`, `Message`, `Total`, `Page`, `PageSize`, `Items`, `TraceId`.
- Controllers never build URLs/headers or parse JSON; use `ICrmApiClient`.

## Internal endpoint exposure standard (mandatory)
- Scope: any endpoint this MVC app exposes under `/api/...` for frontend consumption.
- Route definitions:
  - Keep canonical route constants in `App/Services/ApiHelpers/ApiRoutes.cs`.
  - Add explicit route map in `Program.cs` with `app.MapControllerRoute(...)` per endpoint path.
- Controller action requirements:
  - Use dedicated API actions (for example `ApiExpenseSheetsList`) separated from page actions.
  - Match verb attribute with caller verb exactly (`[HttpGet]`, `[HttpPost]`, etc.).
  - For JSON POST endpoints consumed by React islands, use `[IgnoreAntiforgeryToken]` and perform token/session validation in action logic.
  - Return wrapper-compatible payloads for consistency (`Success`, `Message`, `Data`/`Items`, `TraceId`).
- Regression checks for each new endpoint:
  - Expected verb must not return 404 or 405.
  - Wrong verb should return 405 by design.
  - Response contract must stay aligned with `IndApiResponse<T>` or `IndPagedResponse<T>`-style payloads.

## Auth and Entra context
- OIDC is used for Microsoft Entra.
- Context is cached in session under `INDWebContext` and keyed by OID.
- Company selection is preserved in `INDCompanySelected` + `INDCompanySelectionSource`.
- Module access is enforced by `INDModuleAuthorizeFilter` + `INDModuleRegistry`.
- `AllowSelfManagement` is company-scoped and must come from the selected company in Entra context.
- `_Layout.cshtml` injects this value into `window.__IND_ALLOW_SELF_MANAGEMENT__`, and React must consume it through `AuthProvider` -> `useAuthContext().allowSelfManagement`.
- For Gastos context and React/session cache keys, use a composite scope `entraOid + companyId` (same user in different companies must never share cache entries).
- `subordinates` must be loaded as part of the Entra context bootstrap right after login context resolution for the selected company.
- If `subordinates` is missing at runtime, run one automatic recovery call to `/api/crm/expensesheets/subordinates` and persist the result in the same `entraOid + companyId` scope.

## Localization
- UI localization only. Use `App/Resources/Infrastructure/Localization/INDSharedResource.*.resx`.
- Razor: `IStringLocalizer<INDSharedResource>`.
- React: `window.__IND_I18N__` + `indT`.

## Enum lists
- Add enum-like lists in `App/Services/Enums` and update all resource files.
- Keep numeric string values and do not renumber.

## React island composition standards
- Keep page entry files thin (`CreatePage.tsx`, `DetailPage.tsx`, `HistoryPage.tsx`, system pages):
  - compose providers,
  - render the page/form root,
  - mount with `mountReactIsland` + `mountWhenDocumentReady`.
- For Visitas pages, use `components/commons/VisitasPageProviders.tsx` as the default provider wrapper.
- Wrap complex form roots with `components/commons/AppErrorBoundary.tsx` and localized fallback text.
- Move non-trivial side effects out of JSX trees into page-local hooks (`useHistoryFiltersState`, `useHistoryPageListeners`, `useHistoryTableEffects`, `useDetailMutations`, etc.).
- Keep reusable UI dumb and prop-driven (`FilterButton`, `ActionButton`, `CompactPagination`, `VisitNarrativeFields`).
- Shared assistant rule:
  - Use `components/commons/chat/AssistantChatShell.tsx` as the standard visual shell for chatbot-style experiences.
  - Keep module-specific request lifecycles, prompts, dataset capture, and API integration in page hooks/containers.
  - Reuse `components/commons/chat/assistantChatTypes.ts` for message contracts so assistant UIs stay compatible across modules.
- Reuse shared behavior helpers before adding new logic:
  - combobox keyboard behavior: `hooks/useComboboxKeyboard.ts`
  - text editor navigation and return flow: `utils/textEditorNavigation.ts` + `hooks/useTextEditorFields.ts`

## React performance guardrails (Vercel aligned)
- Start independent async work in parallel and await late (`Promise.all` where dependencies allow it).
- Avoid client waterfalls in hooks: do not chain fetch calls when data can be requested together.
- Keep expensive derivations memoized only when they are truly expensive or passed to memoized children.
- Keep effect dependencies primitive and stable; move interaction-driven logic to event handlers.
- Deduplicate global listeners (resize, scroll, keydown) and always clean them in hook teardown.
- Prefer derived render state over effect-driven mirror state when possible.
- Avoid large barrel imports in hot paths; prefer direct imports for bundle control.

## Frontend security and permission gates
- Server authorization remains the source of truth. UI permission checks are defense in depth.
- Any edit/delete/create control must be gated by module permissions, mirroring the Visitas pattern.
- Self-management sensitive actions must require `allowSelfManagement === true` in addition to module rights.
- If `allowSelfManagement` is false, keep sensitive fields read-only or hidden per business rule and do not send protected payload fields in updates.
- Destructive actions must use the site confirm modal flow (not browser-native dialogs).
- Unsaved-change navigation warnings must use integrated app dialogs, not `beforeunload` browser popups.
- Never handle or persist JWT tokens directly in React page state; use backend/session abstractions.
- Validate route/query identifiers before API usage and fail safely with localized user messages.

## Build system
- Tailwind CLI builds `Web/wwwroot/css/tailwind.css`.
- esbuild bundles React islands to ESM entries in `Web/wwwroot/js` and shared chunks in `Web/wwwroot/js/chunks`.
- Entry points are declared in `scripts/build-react.mjs` (create, detail, history, text editor, audio recorder, audio worklet).
- Razor views that load React island bundles must use `script type="module"`.
- JS legacy source lives in `Web/wwwroot/react/src/legacy` and is compiled to JS.
- Root `wwwroot/` is a junction to `Web/wwwroot`. Author and review source in `Web/wwwroot/*` to avoid path drift.
- Do not hand-edit generated files under `Web/wwwroot/js` or `Web/wwwroot/js/chunks`.
- For deploy, use `publish.ps1` so React/CSS build, dotnet publish, IIS sync, and restart stay consistent.

## Tailwind usage standard
- Tailwind packages are v4, but this project currently standardizes on `tailwind.config.js` + CLI pipeline.
- Keep project tokens in Tailwind config (`primary`, `Montserrat`) and current utility conventions.
- Do not mix migration-only directives (`@theme`, `@utility`, `@variant`) in production CSS unless a full migration task is explicitly requested.

## TypeScript only rule
- All new frontend source must be TypeScript (`.ts` / `.tsx`).
- Input-like UI components must accept a `readOnly` (or `mode`) prop and apply label/value colors locally.

## Master reuse rule
- Every new page must review existing public components first.
- If a module needs a private component, evaluate whether it can be promoted to shared.
- Prefer shared components for repeated UI/UX patterns; keep truly module-specific pieces private.

## Encapsulation and module boundaries
- Keep business logic inside its module; share only presentational UI when it is reusable.
- Do not leak module-specific state into shared components (use props only).
- Favor small, focused components and hooks with clear responsibilities.

## New page checklist
- Check shared components catalog before creating a new UI block.
- If a private component is created, document whether it can become shared later.
- Reuse `Spinner` and `LoadingOverlay` for loading states.
- Always import React components with the file extension (example: `./Widget.tsx`).
- Do not add new `.js` source files under `Web/wwwroot/react/src`.
- Legacy JS must be migrated into `Web/wwwroot/react/src/legacy` as TS and compiled.

## Last updated
- 2026-03-18
