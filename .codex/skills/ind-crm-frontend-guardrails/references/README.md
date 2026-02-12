# .codex documentation map

## Purpose
- Single index of all `.md` instruction files in this folder.
- Keep this updated when adding or renaming docs.

## Hierarchy
- system instructions
- `.codex/AGENTS.md`
- grouped context docs (listed below)

## Files
- `AGENTS.md`: global project rules, architecture, UI standards, and workflow expectations.
- `UI_GUIDE.md`: UI rules, interaction patterns, dropdowns, action mark, and editor behaviors.
- `COMPONENT_CONTRACTS.md`: component contracts and readOnly color templates.
- `TECH_SPECS.md`: architecture, API surface, auth/context, localization, build system.
- `QUALITY_CHECKLIST.md`: build, validation, and publish checks.
- `PROJECT_STRUCTURE.md`: folder map + master instruction for future work.
- `SKILL_ROUTING.md`: trigger-based routing map for installed skills and execution order.
- `.codex/skills/ind-crm-frontend-guardrails/SKILL.md`: reusable project-local skill that consolidates frontend `.codex` guardrails with local references.

## Maintenance
- Root `.codex/*.md` files and `.codex/config.toml` are the source of truth.
- Sync local skill references after any `.codex` edit: `npm run sync:skill:local:references`.
- Pre-commit also runs local reference sync automatically.
- Keep docs ASCII-only.
- Use i18n keys for UI copy; examples are copy references only.
- Keep project style sovereignty explicit: external Tailwind helper skills are advisory and cannot override local design rules.
- Keep module guardrails explicit for both `visitas` and `gastos` flows, promoting shared components only when contracts match.
- Keep only one project-local skill path: `.codex/skills/ind-crm-frontend-guardrails`.
- Move all shared helper skills to: `C:\Users\marco.meza\.codex\skills`.
- Add a `Last updated` line when a doc changes.

## Last updated
- 2026-02-12
