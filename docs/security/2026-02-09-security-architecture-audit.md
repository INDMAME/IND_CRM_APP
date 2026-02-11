# IND CRM App Security and Architecture Audit

Date: 2026-02-09

## Scope
- Backend: ASP.NET Core MVC pipeline, auth context, token lifecycle, controllers.
- Frontend islands: React data fetch flows and combobox interaction patterns.
- Test tooling: Playwright fixture defaults.

## Skills Applied
- `ind-crm-frontend-guardrails`
- `stride-analysis-patterns`
- `attack-tree-construction`
- `security-requirement-extraction`
- `threat-mitigation-mapping`
- `sast-configuration` (planning and execution guidance)
- `vercel-react-best-practices`
- `vercel-composition-patterns`
- `web-design-guidelines`

## STRIDE Findings

### Spoofing
- Risk: stale or inconsistent token access patterns across controllers can increase auth drift and weaken trust boundaries.
- Evidence: multiple direct token session reads were spread across MVC controllers.
- Status: mitigated in this change by centralizing token reads through `ITokenSessionService` in `BaseMvcController`.

### Tampering
- Risk: missing centralized fetch error typing can blur API failure states and allow inconsistent client-side flows.
- Evidence: duplicated manual fetch/parse logic in history hook.
- Status: mitigated in this change by using shared `fetchJson` with typed `ApiFetchError`.

### Repudiation
- Risk: inconsistent error channeling can reduce reliable operation tracing.
- Evidence: mixed per-hook manual error handling and manual response parsing.
- Status: partially mitigated by consolidating frontend API error handling.

### Information Disclosure
- Risk: end-to-end test fixture ignores TLS errors by default.
- Evidence: `ignoreHTTPSErrors: true` in `tests/e2e-devtools-mobile.fixture.js`.
- Status: open (test-only scope, still relevant for secure testing posture).

### Denial of Service
- Risk: unnecessary scoped service resolution on every request in token refresh middleware adds overhead under load.
- Evidence: middleware resolved scoped services before static/public route bypass.
- Status: mitigated in this change by deferring resolution until after bypass checks.

### Elevation of Privilege
- Risk: permission enforcement depends on module path mapping and cached context consistency.
- Evidence: `INDModuleAuthorizeFilter` enforces module rights and company guards.
- Status: controlled, with residual risk if new routes are added without registry mapping.

## Attack Tree (Condensed)

Root goal: access or manipulate CRM data without intended permissions.

Path A (OR): exploit auth and token handling inconsistencies
- A1: trigger paths with inconsistent token validation.
- A2: exploit stale token state between middleware and action logic.
- A3: force weak client error handling to bypass expected UX gates.

Path B (OR): exploit insufficient verification in dev/test process
- B1: run tests with TLS verification disabled and accept untrusted endpoints.
- B2: miss regressions due lack of automated SAST gates in CI.

## Security Requirements Extracted

- SR-001 (Authentication): all controller token reads must use a single token session abstraction.
- SR-002 (Authorization): every new route must map to module registry with explicit required access rights.
- SR-003 (Transport Trust): E2E suites must default to TLS validation, with explicit opt-in bypass only.
- SR-004 (Error Handling): frontend API calls must return typed errors with status metadata.
- SR-005 (Security Automation): baseline SAST scan must run at least in local pre-release checks.

## Threat-to-Mitigation Mapping

- TM-001: Centralize token access in base controller and token service.
  - Type: preventive
  - Coverage: implemented
- TM-002: Delay scoped service resolution for bypassed routes in middleware.
  - Type: preventive/performance hardening
  - Coverage: implemented
- TM-003: Use shared frontend fetch wrapper with typed errors.
  - Type: preventive/detective
  - Coverage: implemented
- TM-004: Enforce accessible combobox semantics to reduce UX-driven misuse and ambiguity.
  - Type: preventive
  - Coverage: implemented
- TM-005: Add SAST execution workflow and rule baseline.
  - Type: detective
  - Coverage: planned (not yet automated in repo CI)

## Refactors Implemented In This Audit

- Backend token reuse and architecture consistency
  - `Web/Controllers/System/BaseMvcController.cs`
  - `Web/Controllers/Visitas/VisitasController.cs`
  - `Web/Controllers/Visitas/HistorialController.cs`
  - `Web/Controllers/Visitas/CreateVisitaAsistenteController.cs`
  - `Web/Controllers/System/ToolsController.cs`
  - `Web/Controllers/System/HomeController.cs`

- Middleware performance hardening
  - `App/Middleware/TokenRefreshMiddleware.cs`

- Frontend API reuse and error model consistency
  - `Web/wwwroot/react/src/services/apiService.ts`
  - `Web/wwwroot/react/src/hooks/useHistoryActivities.ts`

- Frontend accessibility hardening (combobox semantics)
  - `Web/wwwroot/react/src/components/visitas/ContactsCombobox.tsx`

## Open Risks and Next Actions

- Open: `ignoreHTTPSErrors: true` in Playwright fixture should be environment-gated with secure default.
- Open: no repository-level SAST automation pipeline currently present.
- Open: maintain route-to-module registry discipline for any new controllers/actions.
