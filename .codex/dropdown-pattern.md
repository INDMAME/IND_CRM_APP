# Dropdown UX pattern (Tailwind + React islands)

## Scope and hierarchy
- Scope: dropdowns/comboboxes in React islands (Visitas and future).
- If conflict: system > `.codex/AGENTS.md` > `.codex/core-ui-rules.md` > this doc.

Goal: every new combobox/dropdown in `wwwroot/react/visitas` (or future islands) must feel identical and stay stable when navigating steps.

## Core rules
- I18N: any UI text must come from localization. Strings below are copy references only.
- React: use `indT("Key", "Fallback")`. Razor: use `SR["Key"]`.
- Use Tailwind only; no Bootstrap/jQuery. Chevron icons use the shared inline SVGs in `wwwroot/react/visitas/chevrons.jsx` (ChevronDownSvg, ChevronUpSvg). Other icons can use `@heroicons/react` (XMarkIcon, etc.).
- Typography inherits project base (Montserrat). Primary color `#00296b` maps to `text-primary`, `bg-primary`, etc.
- Render the floating list with `createPortal` into `document.body` and position using a fixed style computed from the anchor (see `FloatingList` helper).
- Close on outside click (mousedown/touchstart) via shared `useOutsideClick`.
- Z-index: keep list above forms (>= 360000) and blockers above list when loading.
- Chevron standard (todas las listas):
  - Flecha siempre `h-5 w-5`.
  - Icono cambia: chevron-down cuando esta cerrada, chevron-up cuando esta abierta.
  - Usa `ChevronDownSvg` / `ChevronUpSvg` para que el diseno sea identico al de Clientes.
- Lupa de busqueda:
  - Solo se muestra en el combobox de **clientes**.
  - Otros dropdowns no muestran lupa, solo la flecha estandar.

## Interaction must-haves
- Arrow click toggles open/close. If data needs loading, arrow triggers load then opens.
- Keyboard: ArrowUp/ArrowDown moves active option; Enter selects/toggles; Escape closes. Opening with Enter/ArrowDown when closed.
- Placeholder disappears when there is a selection; restore when empty.
- Multi-select chips removable with an `XMarkIcon`.
- Infinite scroll: when list scroll is near bottom, load next page (pageSize 10).

## Data loading and caching
- Keep a bounded in-memory cache (`makeCache`) and mirror it to `sessionStorage`:
  - Options per entity: key `visitas_contacts_cache_v1`.
  - Selected items per entity: key `visitas_contacts_selected_v1`.
- On mount:
  1) If there is no parent key (e.g., no client), show a localized "select a client first" message and disable input.
  2) Prime from cache/storage; if found, show instantly without flicker.
  3) If not cached, show a localized "press arrow to load" message and load only when user opens/toggles.
- On parent change (client change):
  - Clear selection and options.
  - Persist new selection after every change with `setStoredSelection`.
  - Clear stored selection for the previous parent.
- Keep selection in sync with parent prop to restore drafts when returning from page 2.

## Visual layout
- Input wrapper: `rounded-xl border border-slate-300 bg-white shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary`.
- List items:
  - Active: `bg-primary text-white`.
  - Selected: `bg-primary/10 text-primary`.
  - Text lines: contactos usan dos lineas (Nombre, Cargo); selects simples usan una linea.
- Loading overlay: semi-transparent white with a small spinner.

## Error and status messaging
- Status line aligned to the right in `text-xs text-slate-500`.
- Use i18n keys for all copy. Examples (copy only):
  - Network error: "Error al cargar ..."
  - Empty: "Sin resultados" / "Sin contactos"
- Suggested keys if missing (define in all cultures):
  - `Visits_SelectClientFirst`
  - `Visits_PressArrowToLoad`
  - `Visits_LoadError`
  - `Visits_EmptyResults`
  - `Visits_EmptyContacts`
- Keep strings short; Spanish as the default copy.

## Reusable helpers to import
- `FloatingList`, `useOutsideClick`, `makeCache`, `fetchJson`, `wait`.
- For position: `useFloatingPosition` uses `useLayoutEffect` and `getBoundingClientRect`.

## Template snippet (multi-select)
Use `ContactsCombobox` in `wwwroot/react/visitas/create.jsx` as the reference implementation. When building a new dropdown:
1) Copy the skeleton: local `query`, `options`, `selected`, `open`, `hasLoaded`, `hasMore`, `page`, `status`, `blocking`, `activeIndex`, `abortRef`.
2) Add cache keys and `primeFromCache()` + `ensureLoaded()` pattern.
3) Wire arrow button toggle to `ensureLoaded()` + `setOpen(true/false)`.
4) Add `useEffect` to sync prop `value` into local `selected`.
5) Persist selection per parent key into `sessionStorage` with `setStoredSelection` / `getStoredSelection`.

## Do not
- Do not auto-load on every keystroke; load on open/toggle or explicit Enter when no cache.
- Do not call IND_CRM_API directly from the React island; keep MVC controller/service rules intact.
- Do not add new dependencies for dropdowns.

## Shared UI rules
- See `.codex/core-ui-rules.md`.

## Last updated
- 2026-01-21
