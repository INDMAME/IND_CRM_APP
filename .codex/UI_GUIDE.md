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
  - Assistant chat UI must reuse `components/commons/chat/AssistantChatShell.tsx` for the floating launcher, panel, messages, quick actions, and composer.
  - Assistant chat adapters may change copy and business logic only; they should not fork spacing, radius, icon placement, or message layout without an approved design update.
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
- Section title divider:
  - Use shared `ExpenseSectionDivider` (`pages/gastos/components/ExpenseSectionDivider.tsx`) for centered section titles with side guide lines.
  - Label style is borderless and background-free (no pill or box frame).
  - Keep labels uppercase via CSS and source text from i18n keys.
  - Use `expense-section-divider--compact`, `expense-section-divider--standard`, and `expense-section-divider--spaced` for spacing variants.
  - Reuse the same pattern for section titles like `LINEAS` and expense header titles in detail pages.

## Dropdown / Combobox pattern
- Use the shared `FloatingList` + `useOutsideClick` + `useFloatingPosition`.
- List is a portal to `document.body`, with fixed positioning and high z-index.
- Arrow toggles open, no auto-load per keystroke.
- Keyboard: ArrowUp/Down, Enter select, Esc close.
- Reuse `handleComboboxKeyDown` from `hooks/useComboboxKeyboard.ts` for React combobox inputs.
- Use shared chevrons (`components/commons/chevrons.tsx`) for consistent icon behavior.
- Cache options and selected items in sessionStorage by parent key.
- All copy via `indT`.

## Input type matrix
- `remote-search-dropdown`
  - Use when results come from API search.
  - Magnifier icon is required in the input.
  - Execute API search only on Enter or magnifier click.
  - Keep placeholder inside the input and hide fixed labels when page style requires placeholder-first UX.
- `fixed-enum-instant-search`
  - Use for fixed local lists that still need quick filtering.
  - No magnifier icon.
  - Filter locally while typing and keep selection constrained to known options.
- `fixed-enum-select`
  - Use for very small fixed lists (for example three statuses).
  - Disable free text editing.
  - Picking a new value always replaces the previous one.

## Expense tickets filter patterns
- Ticket filter key (`FilterKey`):
  - Must use `remote-search-dropdown` behavior with placeholder-first UX and no external label in the compact filter panel.
  - Placeholder text must be exactly `Ticket`.
  - Suggestions must come from `/api/crm/expensesheets/tickets/list`.
  - Suggestions must only render `FileId` as title and `Description` as subtitle.
  - Selecting an option must write `FileId` as the filter value.
  - Use the same suggestion pagination size as expense sheet picker (`pageSize = 20`).
- Processed by IA:
  - Must use `fixed-enum-select` with values `Both`, `Yes`, `No`.
  - In compact filter panels, keep label integrated in the field (placeholder style), not as a separate text block.
  - `Both` maps to internal `all` and must not add a restrictive API parameter.
- Expense sheets status filter placeholder:
  - When UI state is the global option (`All`/default), show empty selected value so the field displays placeholder text (`Status`) until user chooses a specific status.

## Localization note for tickets
- Spanish `Tickets_Filter_Category` value must keep the accented form of "Categoria" (acute accent on the i).

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
- Run a short architecture plan before coding: page container, dumb components, hooks, shared utilities, and destination paths.
- If there is any ambiguity in component split or input type selection, ask targeted questions before implementation.
- Keep page entry files thin: provider composition + one form/page component + mount helper.
- For Visitas page entries, use `VisitasPageProviders` by default.
- Wrap complex form roots (`CreateForm`, `DetailForm`) with `AppErrorBoundary` and localized fallback message.
- Move heavy effect logic to page-local hooks (`useHistoryFiltersState`, `useHistoryPageListeners`, `useHistoryTableEffects`, etc.).
- Reuse `VisitNarrativeFields` when rendering repeated long-text sections in create/detail flows.
- Keep shared components dumb (prop-driven) and move stateful behavior to hooks.
- Reuse-first policy:
  - If a UI block is repeated across modules with the same behavior, extract it to shared.
  - If behavior differs by module, keep the component module-local and share only visual primitives.
- Performance policy:
  - Avoid auto-fetch on every key stroke unless explicitly required by UX.
  - For remote-search-dropdown, trigger endpoint calls only on Enter or search icon click.

## Pixel hover and typing effect
- Pixel hover: use timeline card canvas overlay pattern (history timeline).
- Typing effect: keep text editor typing animation for speech transcription.
- Source of truth is code. If code and docs differ, update this doc.

## Component extraction guidelines
- Prefer dumb, presentational components for reusable UI blocks.
- Use shared `Spinner` from `components/commons/Spinner.tsx` for loading states.
- Extract repeated UI blocks into module components (history cards, pagination, form sections).
- Keep side effects (listeners, tooltip orchestration, animation lifecycle) in hooks, not in presentational components.
- Assistant chat pattern:
  - `AssistantChatShell` is the reusable visual primitive.
  - Module hooks/containers adapt backend data to the shell props.
  - If a new page needs an assistant, start from the shared shell instead of cloning an existing page-local chat.

## TextEditor UI behavior (system)
- Reads data attributes: `data-field-id`, `data-field-label`, `data-field-value`, `data-return-url`.
- Read-only is controlled by `data-read-only` and `allowEdit`.
- Saves drafts in sessionStorage under `ind_texteditor_{fieldId}`.
- Transcription uses `/Visitas/TranscribeSpeech` and replaces textarea text.

## Last updated
- 2026-03-18
