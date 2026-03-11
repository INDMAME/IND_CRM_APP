# Expense Sheet Detail Status Actions

Date: 2026-03-11
Scope: `Gastos/ExpenseSheetDetail`

## Goal

Define one explicit policy for:

- editability of the expense sheet detail page
- visible bottom status actions
- FAB visibility
- ownership and subordinate behavior
- backend validation rules for status transitions

This document is the implementation source of truth for the expense sheet detail status flow.

## Global Rules

- The `Status` field is always read-only.
- Status changes are only allowed through `PageBottomActions`.
- Existing sheets can resolve to one of these interaction modes:
  - `full_edit`
  - `comment_only_edit`
  - `read_only`
- `full_edit` means:
  - header fields can be edited
  - lines can be edited
  - FAB is visible
  - topbar edit/save/cancel remains available
- `comment_only_edit` means:
  - only `Status comment` can be edited
  - all other header fields are read-only
  - lines are read-only
  - FAB is hidden
  - topbar edit/save/cancel remains available
- `read_only` means:
  - all fields are read-only
  - lines are read-only
  - FAB is hidden
  - no bottom status actions are shown
  - topbar edit/save/cancel is hidden
- `Paid` is always `read_only`.
- Subordinate sheets can never enter `full_edit`.
- Subordinate sheets can never show the FAB.
- Subordinate sheets can never be deleted from this flow.
- Sheet delete is allowed only for own sheets in `full_edit`.
- If an unknown status is received, the page must fall back to `read_only`.

## Status Codes

- `0` = `Draft`
- `1` = `Approval requested`
- `2` = `Approved`
- `3` = `Rejected`
- `4` = `Paid`

## Interaction Matrix

### Own Sheet + Self Management TRUE

| Status | Interaction mode | FAB | Bottom actions |
|---|---|---|---|
| Draft | `full_edit` | Yes | `Approve` -> `Approved` |
| Approval requested | `comment_only_edit` | No | `Approve` -> `Approved` |
| Approved | `comment_only_edit` | No | `Undo approval` -> `Approval requested` |
| Rejected | `comment_only_edit` | No | `Undo rejection` -> `Approval requested` |
| Paid | `read_only` | No | None |

Notes:

- `Rejected` should not normally happen for own sheets in this branch, but the UI and backend must support it defensively.

### Own Sheet + Self Management FALSE

| Status | Interaction mode | FAB | Bottom actions |
|---|---|---|---|
| Draft | `full_edit` | Yes | `Request approval` -> `Approval requested` |
| Approval requested | `comment_only_edit` | No | `Undo request` -> `Draft` |
| Approved | `read_only` | No | None |
| Rejected | `full_edit` | Yes | `Request approval` -> `Approval requested` |
| Paid | `read_only` | No | None |

### Subordinate Sheet + Self Management TRUE or FALSE

| Status | Interaction mode | FAB | Bottom actions |
|---|---|---|---|
| Draft | `read_only` | No | None |
| Approval requested | `comment_only_edit` | No | `Approve` -> `Approved`, `Reject` -> `Rejected` |
| Approved | `comment_only_edit` | No | `Undo approval` -> `Approval requested` |
| Rejected | `comment_only_edit` | No | `Undo rejection` -> `Approval requested` |
| Paid | `read_only` | No | None |

Notes:

- Subordinate behavior is independent from the manager's self-management flag.
- If the logged user has subordinate management power, they can manage subordinate sheet statuses.
- This power does not include deleting subordinate sheets.

## Edit Behavior Rules

### Full edit

Allowed only for own sheets in these cases:

- self management TRUE + `Draft`
- self management FALSE + `Draft`
- self management FALSE + `Rejected`

During `full_edit`:

- header fields remain editable
- lines remain editable
- FAB remains visible
- `Status comment` is not the only editable field

### Comment-only edit

Allowed only when the matrix resolves to `comment_only_edit`.

During `comment_only_edit`:

- `Status comment` is the only editable field
- `Status` remains read-only
- all other header fields remain read-only
- lines remain read-only
- FAB is hidden

### Read-only

Use `read_only` when:

- the sheet is `Paid`
- the matrix does not allow actions for the current ownership and self-management context
- the sheet is a subordinate sheet in `Draft`
- the sheet is an own sheet in `Approved` with self management FALSE
- the status is unknown

## Bottom Action Rules

- Bottom actions are rendered only for the current matrix row.
- If no action applies, the bottom action bar is not rendered.
- Buttons not listed for a case are treated as not applicable.
- Each bottom action must update the target status and persist the current `Status comment`.
- The action flow must ask for confirmation before sending the mutation.
- After a successful action:
  - refresh sheet detail
  - refresh list cache
  - keep backend as source of truth

## FAB Rules

- FAB is visible only in `full_edit`.
- FAB is hidden in `comment_only_edit`.
- FAB is hidden in `read_only`.
- For subordinate sheets, FAB is always hidden.

## Backend Validation Rules

The backend must enforce the same matrix as the frontend.

Required checks:

- resolve current sheet owner
- resolve whether the current request is acting on own or subordinate data
- resolve selected company self-management flag
- read current sheet status before update
- block unsupported transitions
- block subordinate header edits and line edits
- block subordinate delete
- allow subordinate status transitions only through the approved matrix
- allow own status transitions only through the approved matrix
- preserve `Paid` as immutable

## Implementation Notes

- Keep bottom action policy in one focused frontend object, not spread across the page.
- Keep status transition validation in one focused backend object or helper, not inline boolean chains.
- Reuse the same status constants in policy resolution and UI rendering.
- Do not allow the status combobox to return.
