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
- `skills/ind-crm-codex-guardrails/SKILL.md`: reusable skill that consolidates `.codex` guardrails with local references.

## Maintenance
- Root `.codex/*.md` files are the source of truth.
- Sync references after any `.codex` edit: `npm run sync:codex:references`.
- Keep docs ASCII-only.
- Use i18n keys for UI copy; examples are copy references only.
- Keep project style sovereignty explicit: external Tailwind helper skills are advisory and cannot override local design rules.
- Add a `Last updated` line when a doc changes.

## Last updated
- 2026-02-10
