# Visitas popup + action-mark behavior (Dec 2025)

Use this prompt when changing popups in Visitas create/edit/detail pages:

## 1. Edit mode toggle
- Do NOT show a popup when enabling edit mode.
- Pressing the edit icon must immediately enable fields (only state change).

## 2. Confirm popups (before any action)
- Every write operation must show **one confirm modal before calling the API**:
  - Create visita
  - Update visita / activity
  - Delete visita / activity
- Confirm modal rules:
  - Tailwind only; rendered in-page (React portal to `document.body`) with high z-index (>= `z-[600000]`).
  - Must darken/blur the background slightly, but the main page remains visible.
  - Buttons: primary text like `"Aceptar"`, `"Guardar"`, `"Eliminar"` and secondary `"Cancelar"`.
  - Closing with Cancel must not call the API and must not trigger the action mark.

## 3. Post-action feedback (after the API call)
- After a successful operation, do **not** show an informational popup with text.
- Always use **IND Action Mark** on the current page, then optionally redirect:
  - One unique icon: check inside rounded square.
  - Colors:
    - Green (`text-emerald-600`) for create/update (`type: 'okProcess'`).
    - Red (`text-rose-600`) for delete (`type: 'okDelProcess'`).
    - Red (`text-rose-600`) for errors (`type: 'errorProcess'`).
    - Amber (`text-amber-500`) for warnings (`type: 'warningProcess'`).
  - Background: full-screen blur + dim (`bg-black/35 backdrop-blur-[10px]`) behind the icon.
  - No extra text, no secondary popup, no extra buttons.
  - The check auto-hides after a short delay.

### 3.1 API and usage
- Global API (JS):
  - `window.IND.flashActionMark({ type: 'okProcess'|'okDelProcess'|'errorProcess'|'warningProcess', durationMs: number })`
  - Default `durationMs` for Visitas flows: `1500` (1.5 seconds) before redirect.
- Pattern for create/edit/delete (React islands):
  1. Show confirm modal and, on confirm, call the corresponding MVC endpoint.
  2. If the response is successful:
     - Call `flashActionMark('okProcess'|'okDelProcess', 1500)`.
     - Wait `await wait(1500)` before redirecting away.
  3. If the response is an error:
     - Do not show the action mark.
     - Show the error in the status text area inside the Visitas page.

## 4. Historial filter preservation
- When redirecting to Historial after an operation, always pre-filter by the visit date:
  - Use ISO format `yyyy-MM-dd` (same value for from/to).
  - Before redirecting to `/Historial/History`, store the filter in `sessionStorage`:
    - `sessionStorage.setItem('visitas_history_filter_v1', JSON.stringify({ fromDate: isoDate, toDate: isoDate }))`
  - Historial JS (`history.js`) already reads `visitas_history_filter_v1` on load to restore the filter.

## 5. Implementation reminders
- The action mark overlay must always be on top of any modal or dropdown:
  - Use `z-[2147483647]` for `#indActionMark` and keep `pointer-events-none` so it does not block layout logic.
- JS for the action mark is global and defensive (`wwwroot/js/ind-action-mark.js`):
  - If markup is missing, it creates it at runtime.
  - Debugging: setting `sessionStorage["IND_ActionMark_Debug"] = "1"` enables console logs.
- Do not create new success popups or toast components for Visitas:
  - Confirm modal (before API) + IND Action Mark (after success) is the only accepted pattern.

## UI overflow preview rule
- When a text box can overflow its width, enable a centered preview tooltip on press or hold.
- Only enable the preview when overflow is detected.

## Read-only guard rule
- When Visitas pages are in read-only or blocked mode, add `ind-readonly-surface` to the container.
- Block `contextmenu`, `selectstart`, `copy`, `cut`, `paste` on that container to prevent Android copy overlays.
- Keep tap navigation and overflow preview behavior working.
