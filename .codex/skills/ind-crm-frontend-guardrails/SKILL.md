---
name: ind-crm-frontend-guardrails
description: Use when working on IND_CRM_APP frontend scope (Razor views, React islands, Tailwind UI, frontend i18n, and UI API consumption) and changes must follow .codex guardrails.
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
| Impact pre-check | Assess effects on filters, calendars, dropdowns, forms, handlers, hooks, components, and UI services. |
| Object placement | Validate path with `references/PROJECT_STRUCTURE.md`; reuse existing objects first. |
| Frontend architecture | MVC + Razor first, React islands only, Tailwind only, Heroicons default, Montserrat base, primary `#00296b`. |
| React entry pattern | Keep page bootstrap thin. Use `mountReactIsland` + `mountWhenDocumentReady`; use `VisitasPageProviders` and `AppErrorBoundary` where applicable. |
| Legacy JS | Do not add new jQuery or jquery-validation usage. |
| API contract | Frontend services and hooks do not invent response formats; consume `IndApiResponse<T>` / `IndPagedResponse<T>` contracts. |
| i18n | No hardcoded user-facing strings; add resource keys to all supported cultures in the same change. |
| Anti-regression | Preserve date pickers, date filters, and payload formats unless explicitly requested. |
| Style ownership | External Tailwind helper skills can suggest syntax or patterns, but local style rules are mandatory. |
| Canonical web path | Treat `Web/wwwroot` as canonical source path. Root `wwwroot` is a compatibility mirror/junction. |
| Documentation sync | Edit root `.codex/*.md` files or `.codex/config.toml` and run `npm run sync:skill:local:references` when references are changed. |
| Completion checks | Run `references/QUALITY_CHECKLIST.md`; publish plus `iisreset` when frontend release tasks require it. |

## Required Sub-Skill Routing

Before implementation or review, match the task against `references/SKILL_ROUTING.md` and load every applicable skill.

Required triggers:
- `REQUIRED SUB-SKILL: brainstorming` before new features, behavior changes, or design work.
- `REQUIRED SUB-SKILL: writing-skills` when creating or editing any skill document or `.codex` guardrail documentation.
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

1. Run impact pre-check before editing:
   - Identify effects on filters, calendars, dropdowns, forms, handlers, hooks, components, and UI services.
   - If risk is not trivial, propose a safe alternative before implementation.
2. Confirm destination path and ownership before creating or moving files.
3. Apply architecture and contract rules during implementation.
4. Validate i18n and anti-regression critical paths.
5. Execute quality checks and release steps required by scope.
6. If guardrail docs changed, sync root `.codex/*.md` and `.codex/config.toml` to `references/` with `npm run sync:skill:local:references`.

## Common Mistakes

- Starting edits before loading `references/AGENTS.md` and `references/PROJECT_STRUCTURE.md`.
- Creating new top-level folders when existing layers already own the responsibility.
- Mixing React full-page patterns into areas that must remain MVC plus Razor.
- Hardcoding labels or messages instead of resource keys in all supported cultures.
- Treating date behavior changes as harmless refactors without explicit requirement.
- Editing `wwwroot` mirror paths as primary source instead of `Web/wwwroot`.

## Last updated
- 2026-02-10
