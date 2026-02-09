# Technical Specs (IND_CRM_APP)

## Scope and hierarchy
- Scope: architecture, API integration, auth, permissions, localization, build system.
- If conflict: system > .codex/AGENTS.md > this doc.

## Architecture summary
- MVC + Razor is the base. React is islands only (no SPA rewrite).
- Backend code lives under App/ (services, infra, middleware, models, extensions).
- Web code lives under Web/ (controllers, views, wwwroot).

## API surface (IND_CRM_API)
- Base URL: ApiSettings:BaseUrl.
- Envelopes:
  - IndApiResponse<T>: Success, Message, ErrorCode, Data, Errors, TraceId.
  - IndPagedResponse<T>: Success, Message, Total, Page, PageSize, Items, TraceId.
- Controllers never build URLs/headers or parse JSON; use ICrmApiClient.

## Auth and Entra context
- OIDC is used for Microsoft Entra.
- Context is cached in session under INDWebContext and keyed by OID.
- Company selection is preserved in INDCompanySelected + INDCompanySelectionSource.
- Module access is enforced by INDModuleAuthorizeFilter + INDModuleRegistry.

## Localization
- UI localization only. Use App/Resources/Infrastructure/Localization/INDSharedResource.*.resx.
- Razor: IStringLocalizer<INDSharedResource>.
- React: window.__IND_I18N__ + indT.

## Enum lists
- Add enum-like lists in App/Services/Enums and update all resource files.
- Keep numeric string values and do not renumber.

## Build system
- Tailwind CLI builds Web/wwwroot/css/tailwind.css.
- esbuild bundles React islands to ESM entries in Web/wwwroot/js and shared chunks in Web/wwwroot/js/chunks.
- Razor views that load React island bundles must use script type="module".
- JS legacy source lives in Web/wwwroot/react/src/legacy and is compiled to js.
- For deploy, use publish.ps1 so React/CSS build, dotnet publish, IIS sync, and restart stay consistent.

## TypeScript only rule
- All new frontend source must be TypeScript (.ts / .tsx).
 - Input-like UI components must accept a readOnly (or mode) prop and apply label/value colors locally.

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
- Reuse Spinner and LoadingOverlay for loading states.
- Always import React components with the file extension (e.g., `./Widget.tsx`).
- Do not add new .js source files under Web/wwwroot/react/src.
- Legacy JS must be migrated into Web/wwwroot/react/src/legacy as TS and compiled.

## Last updated
- 2026-02-09
