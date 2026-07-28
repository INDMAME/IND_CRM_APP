# Expense Sheet Detail Status Actions

Original date: 2026-03-11
Last verified against the application: 2026-07-13
Status: Implemented as built

## Purpose and source of truth

This document describes the current expense sheet detail status flow. It replaces the original interaction matrix that was stored in this file.

The implementation remains the final source of truth:

- frontend policy: `Web/wwwroot/react/src/pages/gastos/detail/expenseSheetDetailPolicy.ts`
- status dialog and minimum-content gate: `Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailPageController.tsx`
- server-side transition enforcement: `Web/Controllers/Gastos/GastosController.cs`

## Global rules

- The `Status` field is always read-only.
- Status changes are available only through the bottom status actions.
- The current functional interaction modes are `full_edit` and `read_only`. The legacy `comment_only_edit` type is not returned by the current policy.
- A status action may be visible while the sheet content remains read-only.
- The status comment is entered in the confirmation dialog for the selected transition. It is not edited directly through a partial-edit mode on the form.
- `Paid` sheets are always read-only.
- A sheet is also treated as paid and locked when it has an assigned voucher, even if the numeric status is not `Paid`.
- Subordinate sheets are always read-only. A manager may receive status actions, but cannot edit header fields, lines, or delete the sheet.
- Deletion is allowed only for an own sheet while the policy resolves to `full_edit`.
- Unknown or unsupported statuses fall back to `read_only` with no status actions.

## Status codes

- `0` = `Draft`
- `1` = `Approval requested`
- `2` = `Approved`
- `3` = `Rejected`
- `4` = `Paid`

## Current interaction matrix

### Own sheet with self-management enabled

| Status | Sheet content | FAB | Delete | Bottom actions |
|---|---|---|---|---|
| Draft | `full_edit` | Yes | Yes | `Approve` -> `Approved` |
| Approval requested | `read_only` | No | No | None |
| Approved | `read_only` | No | No | `Undo approval` -> `Draft` |
| Rejected | `read_only` | No | No | None |
| Paid | `read_only` | No | No | None |

Self-management allows the owner to approve a draft directly. Undoing that approval returns the sheet to `Draft`, not to `Approval requested`.

### Own sheet with self-management disabled

| Status | Sheet content | FAB | Delete | Bottom actions |
|---|---|---|---|---|
| Draft | `full_edit` | Yes | Yes | `Request approval` -> `Approval requested` |
| Approval requested | `read_only` | No | No | `Undo request` -> `Draft` |
| Approved | `read_only` | No | No | None |
| Rejected | `read_only` | No | No | `Move to Draft` -> `Draft` |
| Paid | `read_only` | No | No | None |

A rejected sheet must first return to `Draft`. The user can edit it and request approval again only after that transition succeeds.

### Subordinate sheet

| Status | Sheet content | FAB | Delete | Bottom actions |
|---|---|---|---|---|
| Draft | `read_only` | No | No | None |
| Approval requested | `read_only` | No | No | `Approve` -> `Approved`, `Reject` -> `Rejected` |
| Approved | `read_only` | No | No | `Undo approval` -> `Approval requested` |
| Rejected | `read_only` | No | No | `Undo rejection` -> `Approval requested` |
| Paid | `read_only` | No | No | None |

Subordinate behavior is independent of the manager's self-management setting. The manager can act only within the subordinate scope authorized by the server.

## Status dialog

Selecting a status action opens a confirmation dialog that shows:

- the current status;
- the target status;
- the action label;
- the current status comment, which the user may update for this transition.

After a successful transition, the application invalidates the cached list, closes the dialog, and reloads the detail. If the request fails, the sheet is not treated as updated.

## Minimum-content gate

Status action buttons are disabled only when the sheet has no lines and does not have a positive total. A sheet with at least one line or a positive total can continue through the policy matrix.

This is a user-interface guard. The server still validates the requested transition and the current authorization context.

## Backend enforcement

The backend mirrors the same matrix so a direct HTTP request cannot bypass the web interface. It resolves:

- current sheet owner;
- own versus subordinate scope;
- the selected company's self-management flag;
- current status and paid/voucher lock;
- allowed target statuses for the resolved matrix row.

For status-only actions, the backend preserves the stored business fields and applies only the permitted status/comment transition. Unsupported transitions, subordinate content mutations, unauthorized deletes, and paid-sheet mutations are rejected.

## Axapta visibility

The expense sheet created or updated in CRM is also stored and can be consulted in Axapta. CRM and Axapta represent the same business sheet and status. Internal accounting, posting, remittance, and payment work may continue in Axapta, but those back-office steps are outside this user-flow document. Once the sheet is paid or has a voucher, CRM presents it as locked.
