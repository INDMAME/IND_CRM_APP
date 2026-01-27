# UI Guide (IND_CRM_APP)

## Scope and hierarchy
- Scope: UI rules and interaction patterns for Razor + React islands.
- If conflict: system > .codex/AGENTS.md > this doc.

## Base UI rules
- Styling: Tailwind only (no Bootstrap/jQuery UI).
- Typography: Montserrat, sans-serif.
- Primary color: #00296b (use via Tailwind primary tokens).
- All user facing text must come from i18n resources.

## Shared UI rules
- Overflow preview: show centered preview tooltip only if text overflows.
- Read-only guard: add ind-readonly-surface and block copy/paste/select/contextmenu.
- Base control rounding: use rounded-xl unless matching an existing component.

## Dropdown / Combobox pattern
- Use the shared FloatingList + useOutsideClick + useFloatingPosition.
- List is a portal to document.body, with fixed positioning and high z-index.
- Arrow toggles open, no auto-load per keystroke.
- Keyboard: ArrowUp/Down, Enter select, Esc close.
- Use the shared chevrons (chevrons.tsx) for a consistent icon.
- Cache options and selected items in sessionStorage by parent key.
- All copy via indT.

## Visitas confirm + action mark flow
- No popup on edit toggle. Edit mode is instant.
- Before create/update/delete: show one confirm modal.
- On success: show IND action mark only, then optional redirect.
- On error: show inline error message, no action mark.
- Action mark API:
  window.IND.flashActionMark({ type: 'okProcess'|'okDelProcess'|'errorProcess'|'warningProcess', durationMs })

## Pixel hover and typing effect
- Pixel hover: use the timeline card canvas overlay pattern (see code in History components).
- Typing effect: keep the text editor typing animation for speech transcription.
- Source of truth is code. If code and docs differ, update this doc.

## Component extraction guidelines
- Prefer dumb, presentational components for reusable UI blocks.
- Use shared Spinner from `components/commons/Spinner.tsx` for all loading states.
- Use `usePixelHoverEffect` for card hover animations to keep side effects centralized.
- Extract repeated UI blocks into module components (e.g., Visitas History cards, pagination, form sections).
- Use `FormSectionCard` and `LoadingOverlay` for standard form sections and blocking loads.

## TextEditor UI behavior (system)
- Reads data attributes: data-field-id, data-field-label, data-field-value, data-return-url.
- Read-only is controlled by data-read-only and allowEdit.
- Saves drafts in sessionStorage under ind_texteditor_{fieldId}.
- Transcription uses /Visitas/TranscribeSpeech and replaces textarea text.

## Last updated
- 2026-01-27
