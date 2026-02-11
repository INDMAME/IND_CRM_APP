# UI Guide (IND_CRM_APP)

## Scope and hierarchy
- Scope: UI rules and interaction patterns for Razor + React islands.
- If conflict: system > .codex/AGENTS.md > this doc.

## Base UI rules
- Styling: Tailwind only (no Bootstrap/jQuery UI).
- Typography: Montserrat, sans-serif.
- Base font size: 14px on mobile. Scale to 16px from 768px and up.
- Primary color: #00296b (use via Tailwind primary tokens).
- All user facing text must come from i18n resources.
- Forms: use `form-label`, `form-control`, and `form-select` utilities for consistent base sizes.
- Global rounding standard: 5px for inputs, buttons, and containers (use `rounded-md` or `rounded-[5px]`).
- Avoid `rounded-full` unless a component explicitly requires a circle.

## Shared UI rules
- Overflow preview: show centered preview tooltip only if text overflows.
- Read-only guard: add `ind-readonly-surface` and block copy/paste/select/contextmenu.
- Base control rounding: use 5px (`rounded-md` / `rounded-[5px]`) unless a view explicitly needs a different shape.
- Buttons and icons:
  - Use `FilterButton` (`components/commons/FilterButton.tsx`) for quick filters.
  - Use `ActionButton` (`components/commons/ActionButton.tsx`) for standard action buttons.
  - Filter button styling uses `.ind-filter-btn` / `.ind-filter-btn--active` with local CSS vars per page.
  - Use StarBorder for buttons (primary, secondary, and quick actions) unless there is a clear exception.
  - StarBorder defaults: thickness 2.5px and speed 2.5s.
  - Button colors: active #00296b, inactive #00296bc4, text color #e2e8f0.
  - Icon size standard: 16x16 (`h-4 w-4`) unless a view explicitly needs a larger icon.
  - Topbar icons: 24x24 (`h-6 w-6`) with a 25x25 container via `topbar-btn`.
  - Topbar SVG standard: enforce `aspect-ratio: 1 / 1` and `stroke-width: 1.5 !important` on `path/line/polyline`.
  - Topbar SVG visibility: use Tailwind `hidden` on SVG for state swaps. CSS enforces `.topbar svg.hidden { display: none !important; }`.
- Read-only fields:
  - Use `ind-readonly-field` for any read-only or disabled input/select/textarea.
  - Read-only text color standard: #64748b (must be `!important` to override text utilities).
  - Read-only background/border: #f1f5f9 / #e2e8f0, placeholder #94a3b8.
  - Component contract (high priority):
    - Every input-like component must accept a `readOnly` (or `mode`) prop and apply colors locally.
    - Do not rely on global overrides alone; apply label/value colors in the component.
    - Label color is always #00296be0 (read or edit).
    - Value color: edit = #00296be0, read = #64748b.
    - Avoid wrapper opacity for read-only; it washes text color.

## Dropdown / Combobox pattern
- Use the shared `FloatingList` + `useOutsideClick` + `useFloatingPosition`.
- List is a portal to `document.body`, with fixed positioning and high z-index.
- Arrow toggles open, no auto-load per keystroke.
- Keyboard: ArrowUp/Down, Enter select, Esc close.
- Reuse `handleComboboxKeyDown` from `hooks/useComboboxKeyboard.ts` for React combobox inputs.
- Use shared chevrons (`components/commons/chevrons.tsx`) for consistent icon behavior.
- Cache options and selected items in sessionStorage by parent key.
- All copy via `indT`.

## Visitas confirm + action mark flow
- No popup on edit toggle. Edit mode is instant.
- Before create/update/delete: show one confirm modal.
- Confirm modal: use dumb `components/commons/ConfirmModal.tsx` and show spinner inside modal while request runs.
- On success: close modal, then show IND action mark only, then optional redirect.
- On error: show inline error message, no action mark.
- Action mark API:
  - `window.IND.flashActionMark({ type: 'okProcess'|'okDelProcess'|'errorProcess'|'warningProcess', durationMs })`
- Delete success uses `okDelProcess` (same check icon as `okProcess`, but red).
- Action mark container is global in `_Layout.cshtml` via `_IndActionMark`.

## React page decomposition conventions
- Keep page entry files thin: provider composition + one form/page component + mount helper.
- For Visitas page entries, use `VisitasPageProviders` by default.
- Wrap complex form roots (`CreateForm`, `DetailForm`) with `AppErrorBoundary` and localized fallback message.
- Move heavy effect logic to page-local hooks (`useHistoryFiltersState`, `useHistoryPageListeners`, `useHistoryTableEffects`, etc.).
- Reuse `VisitNarrativeFields` when rendering repeated long-text sections in create/detail flows.
- Keep shared components dumb (prop-driven) and move stateful behavior to hooks.

## Pixel hover and typing effect
- Pixel hover: use timeline card canvas overlay pattern (history timeline).
- Typing effect: keep text editor typing animation for speech transcription.
- Source of truth is code. If code and docs differ, update this doc.

## Component extraction guidelines
- Prefer dumb, presentational components for reusable UI blocks.
- Use shared `Spinner` from `components/commons/Spinner.tsx` for loading states.
- Extract repeated UI blocks into module components (history cards, pagination, form sections).
- Keep side effects (listeners, tooltip orchestration, animation lifecycle) in hooks, not in presentational components.

## TextEditor UI behavior (system)
- Reads data attributes: `data-field-id`, `data-field-label`, `data-field-value`, `data-return-url`.
- Read-only is controlled by `data-read-only` and `allowEdit`.
- Saves drafts in sessionStorage under `ind_texteditor_{fieldId}`.
- Transcription uses `/Visitas/TranscribeSpeech` and replaces textarea text.

## Last updated
- 2026-02-10
