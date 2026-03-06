# Expense Date Contract Incident (2026-03-06)

## Summary

Expense sheets and tickets list endpoints were returning validation errors from upstream.
The issue is fixed.

## Symptom

- Upstream response code: `422 Unprocessable Entity`
- Error code: `CRM_EXPENSESHEET_MISSING_FIELDS` and `CRM_EXPENSESHEET_TICKET_MISSING_FIELDS`
- Error detail:
  - `createdDateFrom debe ser DDMMYYYY o DD.MM.YYYY.`
  - `createdDateTo debe ser DDMMYYYY o DD.MM.YYYY.`

## Root Cause

The web backend proxy (`ApiClientService`) serialized outbound list filter dates as `yyyyMMdd`.
Upstream contract for these list endpoints requires day-first format (`DDMMYYYY` or `DD.MM.YYYY`).

This happened during refactor/alignment work where date normalization stayed strict but was normalized to the wrong outbound format.

## Fixed Behavior

- `NormalizeAxListDate` now emits `ddMMyyyy`.
- Both flows now use this corrected outbound format:
  - `GetExpenseSheetsAsync`
  - `GetExpenseSheetTicketsAsync`

## Validation Signals

After publish and IIS restart, outbound request logs must show:

- `createdDateFrom="28022026"`
- `createdDateTo="06032026"`

For source dates:

- `2026-02-28`
- `2026-03-06`

## Prevention Rule

For these upstream endpoints:

- `/api/crm/expensesheets/list`
- `/api/crm/expensesheets/tickets/list`

Always send outbound `createdDateFrom` and `createdDateTo` as `ddMMyyyy` (or dotted `DD.MM.YYYY` when explicitly required by endpoint contract). Never send `yyyyMMdd`.
