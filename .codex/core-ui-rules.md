# Core UI rules (shared)

## Scope
- Applies to all UI in IND_CRM_APP (Razor + React islands).
- Priority: follow after `.codex/AGENTS.md` and before feature docs.

## Instruction hierarchy
- If conflict: system > `.codex/AGENTS.md` > this doc > feature docs.

## UI rules
- Overflow preview:
  - If text can overflow its box, enable a centered preview tooltip on press or hold.
  - Only enable when overflow is detected (scrollWidth > clientWidth or scrollHeight > clientHeight).
- Read-only guard:
  - When a page or section is read-only or blocked, add `ind-readonly-surface` to the container.
  - Block `contextmenu`, `selectstart`, `copy`, `cut`, `paste` on that container.
  - Do not block taps, navigation, or overflow previews.
- Base control rounding:
  - New inputs/combos should use `rounded-xl` unless matching an existing component.

## I18N reminder
- Any UI text must come from localization resources.
- Example strings in feature docs are copy references only, not literals.

## Last updated
- 2026-01-21
