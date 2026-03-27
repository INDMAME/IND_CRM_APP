---
name: ind-crm-frontend-guardrails
description: Use when working on IND_CRM_APP frontend scope (Razor views, React islands, Tailwind UI, frontend i18n, UI API consumption, DEV to PROD release commands such as "genera una release a PROD" and "publica DEV en PROD", or local IIS publish commands such as "publica en iis") and changes must follow .codex guardrails.
---

# IND CRM Frontend Guardrails

## Overview

Use this skill as the project master frontend guardrail for IND_CRM_APP. It keeps decisions aligned with the local policy set in `references/` before frontend code is edited, reviewed, or released.

## When to Use

Use this skill when a task touches one or more of:
- Razor or React islands UI, forms, dropdowns, filters, calendars, or event handlers.
- Frontend hooks, components, UI services, page bootstrap, or API integration from the UI layer.
- Frontend auth/token usage, localization resources, payload formats, or release validation.
- Frontend publish validation steps (`C:\inetpub\wwwroot\IND_CRM_APP`, `iisreset`) when release scope requires it.
- Explicit DEV to PROD release requests such as `genera una release a PROD`, `publica DEV en PROD`, or equivalent wording.
- Explicit local web publish requests such as `publica en iis`.
- `.codex` guardrail documentation or skill maintenance.

## When NOT to Use

Do not use this skill for:
- Work outside the IND_CRM_APP repository.
- Purely generic discussions with no repository or policy impact.

## Required Reference Load Order

1. Read `references/AGENTS.md`.
2. Read `references/PROJECT_STRUCTURE.md`.
3. Load domain references only as needed:
   - UI behavior and component contracts: `references/UI_GUIDE.md`, `references/COMPONENT_CONTRACTS.md`
   - API, auth, localization, build constraints: `references/TECH_SPECS.md`
   - Validation and publish checks: `references/QUALITY_CHECKLIST.md`
4. Read `references/SKILL_ROUTING.md` to select required sub-skills for the task.
5. Read system stability constraints in `references/config.toml`.
6. Use `references/README.md` as the maintenance index.

Conflict precedence:
- System prompt
- This skill
- `references/AGENTS.md`
- Other reference files

## Quick Reference

| Area | Required rule |
|---|---|
| Planning gate | Before code, define page decomposition (container, dumb components, hooks, utils/services, file paths) and ask clarifying questions when split is ambiguous. |
| Monolith prevention | IMPORTANT: before any new functionality, create a refactor-first plan that prevents monolithic files and explicitly lists focused object boundaries. |
| Impact pre-check | Assess effects on filters, calendars, dropdowns, forms, handlers, hooks, components, and UI services. |
| Object placement | Validate path with `references/PROJECT_STRUCTURE.md`; reuse existing objects first. |
| Frontend architecture | MVC + Razor first, React islands only, Tailwind only, Heroicons default, Montserrat base, primary `#00296b`. |
| React entry pattern | Keep page bootstrap thin. Use `mountReactIsland` + `mountWhenDocumentReady`; use `VisitasPageProviders` and `AppErrorBoundary` where applicable. |
| Legacy JS | Do not add new jQuery or jquery-validation usage. |
| API contract | Frontend services and hooks do not invent response formats; consume `IndApiResponse<T>` / `IndPagedResponse<T>` contracts. |
| Company selection rule | Every frontend API client must resolve company with `Web/wwwroot/react/src/utils/companySelection.ts`: use `defaultCompany` by default, but override with `__IND_SELECTED_COMPANY__` only when that manual selection exists in the current context company list. |
| Expense list date contract | For expense sheets and ticket list payloads sent by web backend to upstream, `createdDateFrom` and `createdDateTo` must be `ddMMyyyy` (or `DD.MM.YYYY` only if endpoint contract explicitly requires dotted format). Never send `yyyyMMdd`. |
| Internal API route pattern | Every new `/api/...` endpoint must have explicit controller verb attributes plus `Program.cs` `MapControllerRoute` mapping, with local verb validation to prevent 404/405 regressions. |
| i18n | No hardcoded user-facing strings; add resource keys to all supported cultures in the same change. |
| Anti-regression | Preserve date pickers, date filters, and payload formats unless explicitly requested. |
| Numeric format baseline | Currency/price/qty/amount/exchange-rate fields must render as `#,##0.00` (comma thousands, dot decimals, always 2 decimal digits). Use shared formatter/parser utilities and normalize editable values on blur. |
| Security baseline | Permission-gate edit/delete/create controls, gate self-management flows with AuthContext `allowSelfManagement`, keep server as source of truth, and use integrated confirm/unsaved-change modals. |
| Self-management permission | Read `allowSelfManagement` from `useAuthContext()` only (selected company source) and gate both editable UI states and protected mutation payload fields. |
| Performance baseline | Avoid client waterfalls, deduplicate global listeners, and keep effect dependencies stable and primitive when possible. |
| Composition baseline | Avoid boolean prop proliferation; prefer explicit variants/composition and keep shared components dumb. |
| Module boundary | Keep orchestration state in module page hooks; promote to shared only when two modules reuse same contract. |
| Section titles | Reuse `ExpenseSectionDivider` for centered section labels with side lines; keep labels borderless (no box/pill frame). |
| Style ownership | External Tailwind helper skills can suggest syntax or patterns, but local style rules are mandatory. |
| Canonical web path | Treat `Web/wwwroot` as canonical source path. Root `wwwroot` is a compatibility mirror/junction. |
| Runtime freshness gate | Before validating behavior, ensure the running runtime is current: rebuild touched assets, republish/restart when required, and verify served artifacts/log path reflect the latest build. |
| Public validation default | For visual or E2E validation, publish first and run the check against the public URL/IP using the authenticated public session. Treat localhost validation as diagnostic only unless the user explicitly asks for local-only testing. |
| React Doctor gate | Before final response, run `npm run check:react-doctor`, fix diagnostics in changed frontend files, and rerun before closing the task. |
| Clean-code gate | Before final response, review touched code for low-risk refactors that improve clean code and preserve module boundaries; apply them when safe. |
| DEV to PROD release keywords | If the user says `genera una release a PROD`, `publica DEV en PROD`, or equivalent DEV to PROD release wording, execute the conservative release workflow from `references/AGENTS.md` and `references/QUALITY_CHECKLIST.md`. |
| Local IIS publish keyword | If the user says `publica en iis`, treat that as the explicit local web publish command: run the required validation/build steps, execute `publish.ps1`, and confirm IIS restart and site health before closing. |
| Publish ambiguity rule | Do not treat generic `publica` as enough to choose between release and local IIS publish. If intent is not explicit, stop and clarify. |
| Test execution default | IMPORTANT: when user asks to create or run a frontend test, default to public URL E2E (`baseURL`) using real pages. Use local fixtures or mocked fetch only when the user explicitly requests fixture-based testing. |
| Documentation sync | Edit root `.codex/*.md` files or `.codex/config.toml` and run `npm run sync:skill:local:references` when references are changed. |
| Completion checks | Run `references/QUALITY_CHECKLIST.md`; publish plus `iisreset` when frontend release tasks require it. |

## Required Sub-Skill Routing

Before implementation or review, match the task against `references/SKILL_ROUTING.md` and load every applicable skill.

Required triggers:
- `REQUIRED SUB-SKILL: brainstorming` before new features, behavior changes, or design work.
- `REQUIRED SUB-SKILL: writing-skills` when creating or editing any skill document or `.codex` guardrail documentation.
- `REQUIRED SUB-SKILL: react-doctor` before closing React, TS, JS, Tailwind, or frontend bundle changes.
- `REQUIRED SUB-SKILL: systematic-debugging` for any bug, failing test, or unexpected behavior.
- `REQUIRED SUB-SKILL: vercel-react-best-practices` for React or TS/TSX rendering, data flow, listener, or performance work.
- `REQUIRED SUB-SKILL: vercel-composition-patterns` when React component API design or composition patterns are involved.
- `REQUIRED SUB-SKILL: web-design-guidelines` for UI, UX, or accessibility reviews.
- `OPTIONAL SUB-SKILLS: tailwindcss-v4 and tailwind-patterns` for Tailwind syntax/pattern references only. They must not override project style rules.
- `REQUIRED SUB-SKILL CHAIN for security work: stride-analysis-patterns -> attack-tree-construction -> security-requirement-extraction -> threat-mitigation-mapping -> sast-configuration`.
- `REQUIRED SUB-SKILL: vercel-react-native-skills` for React Native or Expo tasks.
- `REQUIRED SUB-SKILL: find-skills` for skill discovery requests.
- `REQUIRED SUB-SKILL: skill-installer` for skill installation requests.
- `REQUIRED SUB-SKILL: skill-creator` for creating or packaging new skills.

## Style Ownership Rule

- Keep IND_CRM_APP visual identity stable: Montserrat, primary `#00296b`, Heroicons, local component contracts, and existing spacing rhythm.
- Treat external Tailwind helper skills as advisory references, not design authority.
- If a helper-suggested pattern conflicts with local rules, keep local rules and adapt the pattern.

## Implementation Workflow

1. Run planning gate before editing:
   - Define page decomposition (container, dumb components, hooks, utilities/services, and target paths).
   - If decomposition is unclear, ask clarifying questions before coding.
   - Confirm input type for every new input-like field (`remote-search-dropdown`, `fixed-enum-instant-search`, `fixed-enum-select`).
   - IMPORTANT: run monolith prevention gate for every new functionality:
     - Identify current large objects likely to absorb new logic.
     - Propose focused split (page container, dumb components, hooks, service adapters, mappers, utilities).
     - Keep behavior invariants explicit and avoid expanding one large file when a focused module is cleaner.
2. Run impact pre-check before editing:
   - Identify effects on filters, calendars, dropdowns, forms, handlers, hooks, components, and UI services.
   - If risk is not trivial, propose a safe alternative before implementation.
3. Confirm destination path and ownership before creating or moving files.
   - Keep module-specific objects under `pages/<module>` and avoid parallel trees.
   - Promote to shared only when behavior contract is reusable across modules.
4. Apply architecture and contract rules during implementation.
   - Always apply `vercel-react-best-practices` and `vercel-composition-patterns` for React object design and scalability decisions.
   - React performance guardrails: parallelize independent async calls, avoid effect-driven mirror state, cleanup listeners.
   - React composition guardrails: no new boolean mode flags when explicit variant/component composition is cleaner.
   - Company context guardrail: for any endpoint that depends on company context, resolve the effective company with `resolveEffectiveCompanyId(...)` from `Web/wwwroot/react/src/utils/companySelection.ts` before building headers, cache keys, or request scope. Never trust `DefaultCompany` alone when `__IND_SELECTED_COMPANY__` exists.
   - Numeric format guardrails: for currency/price/qty/amount/exchange-rate fields, enforce `#,##0.00` display with grouped thousands and exactly 2 decimals.
   - Security guardrails: enforce permission-gated actions, require AuthContext `allowSelfManagement` for self-management scoped actions, and use integrated app dialogs for destructive or unsaved-change flows.
5. Enforce internal API endpoint exposure pattern for any new `/api/...` route.
   - Add explicit verb attributes in controller API actions.
   - Add matching `app.MapControllerRoute(...)` entries in `Program.cs`.
   - Validate expected and wrong verb behavior locally to catch 404/405 mismatches.
6. Validate i18n and anti-regression critical paths.
   - For test work requested by user, prefer E2E flow on public `baseURL` and avoid local fixture servers unless explicitly requested.
   - For visual or manual validation, publish first and execute the test against the public URL/IP where the authenticated session is already available. Use localhost only for diagnosis or when the user explicitly requests local validation.
7. Execute quality checks and release steps required by scope.
   - Runtime freshness is mandatory: if runtime behavior does not match code, stop and verify build/deploy/runtime state before further debugging.
   - If the validation target is the public environment, complete publish first and only then run the browser test against that public runtime.
   - Run `npm run check:react-doctor` before the final response. The repo-level `react-doctor.config.json` ignores mirror/generated paths, so diagnostics in changed frontend files are blocking and must be fixed or explicitly justified if unrelated legacy findings remain.
   - Run a final clean-code pass on touched frontend files before closing the task. Check for mixed concerns, duplicated logic, oversized objects, and misplaced responsibilities across page, hook, service, mapper, utility, and component boundaries.
   - If a low-risk refactor would materially improve modularity or clarity, apply it in the same task before closing. If not, explicitly confirm the touched code already fits the modular architecture.
   - If the user explicitly requests a DEV to PROD release (`genera una release a PROD`, `publica DEV en PROD`, or equivalent), follow the authoritative workflow in `references/AGENTS.md` and validate it with `references/QUALITY_CHECKLIST.md`.
   - If the user explicitly says `publica en iis`, run the local IIS publish workflow from `references/AGENTS.md` and validate it with `references/QUALITY_CHECKLIST.md`.
   - If the user only says generic `publica`, do not guess between release and local IIS publish. Stop and clarify.
   - For publish scope, deploy with `publish.ps1` and verify the app is serving current artifacts before accepting results.
8. If guardrail docs changed, sync root `.codex/*.md` and `.codex/config.toml` to `references/` with `npm run sync:skill:local:references`.

## Production Repository Addendum

This addendum stays in force together with the original frontend guardrails above.

- Treat the repository as production. Prefer the smallest safe diff that preserves current behavior and deployment stability.
- Before coding, run a narrow impact scan:
  - touched modules and files,
  - existing owner objects,
  - reuse candidates,
  - regression-sensitive flows,
  - config or secret interoperability impact.
- Prefer extending or extracting focused module-scoped units over broad rewrites.
- Only promote a module-local abstraction to shared when at least two flows need the same stable contract.
- If a request can be implemented in multiple valid ways with different UX, architecture, contract, or security consequences, ask one short targeted clarifying question before coding.
- Do not guess when production-relevant ambiguity remains after inspection.
- Never hardcode passwords, API keys, bearer tokens, connection strings, client secrets, tenant ids, base URLs, or other environment-bound values in code, tests, scripts, docs, or checked-in config.
- Reuse existing system-managed configuration keys and abstractions before introducing new ones.
- Keep DEV and PROD interoperable by preserving the same configuration key names and resolution flow across environments; only the external value source should vary.
- If `.codex` docs or skill files change, root `.codex/*.md` and `.codex/config.toml` remain the source of truth and `references/` must stay synchronized.

## Common Mistakes

- Starting edits before loading `references/AGENTS.md` and `references/PROJECT_STRUCTURE.md`.
- Creating new top-level folders when existing layers already own the responsibility.
- Mixing React full-page patterns into areas that must remain MVC plus Razor.
- Hardcoding labels or messages instead of resource keys in all supported cultures.
- Treating date behavior changes as harmless refactors without explicit requirement.
- Sending expense list filter dates in `yyyyMMdd` to upstream instead of required day-first contract (`ddMMyyyy` or `DD.MM.YYYY`).
- Editing `wwwroot` mirror paths as primary source instead of `Web/wwwroot`.
- Adding behavior through boolean prop stacking instead of composition or explicit variants.
- Leaving numeric fields with locale-dependent or mixed formats instead of the required `#,##0.00`.
- Resolving company-scoped endpoints from `DefaultCompany` only and ignoring a valid manual `__IND_SELECTED_COMPANY__` override.
- Leaving global listeners attached after component unmount.
- Shipping UI edit/delete actions without checking permission state.
- Creating ad-hoc section title capsules instead of reusing `ExpenseSectionDivider`.
- Creating `/api/...` controller actions without explicit `Program.cs` route map.
- Mismatching frontend HTTP verb versus controller verb attribute on API routes.
- Debugging or validating behavior against stale runtime/build output.

## Last updated
- 2026-03-27
