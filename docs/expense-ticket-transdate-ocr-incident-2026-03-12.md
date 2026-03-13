# Expense Ticket OCR TransDate Incident (2026-03-12)

## Summary

The ticket-from-image flow and the expense-sheet-line-from-image flow were failing with a `422 Unprocessable Entity`.
The web layer issue is fixed and was published to IIS on March 12, 2026.

## Symptom

- Upstream response code: `422 Unprocessable Entity`
- Error code: `CRM_EXPENSESHEET_TICKET_MISSING_FIELDS`
- Error detail:
  - `TransDate invalida (yyyymmdd): 09071220`
- Affected user flows:
  - Ticket creation from the tickets page
  - Expense sheet line creation from an image processed by IA

## Root Cause

The IA or OCR extraction could return ambiguous day-first dates such as:

- `09071220`
- `09.07.1220`
- `09/07/20`

The shared web date normalizer accepted the year `1220` as a technically valid four-digit year instead of treating it as an OCR-style short-year artifact for `2020`.
That bad value then propagated to ticket finalization and line creation payloads.

A second factor made the incident user-visible in the tickets page:

- The new composite endpoint `/api/crm/expensesheets/tickets/quick-create` had replaced the old manual orchestration path in the web UI.
- At that time, the web layer still needed a temporary recovery path because the composite endpoint did not normalize the invalid OCR `TransDate` upstream.

## Fixed Behavior

- The shared React date parser now uses a supported year range and repairs OCR-style years outside that range.
- Inputs such as `09071220`, `09.07.1220`, and `09/07/20` now normalize to `09.07.2020`.
- The web backend proxy now applies the same supported-year parsing for:
  - Ticket dates
  - Expense line dates
  - General expense date normalization shown back to the UI
- The composite endpoint now resolves the invalid OCR `TransDate` upstream before validating or finalizing the ticket.
- The web quick-create proxy no longer performs a second recovery pass for this case and simply returns the composite endpoint result.

## Validation Signals

The following local checks passed on March 12, 2026:

- `dotnet build .\IND_CRM_APP.csproj`
- `npm run build:react`
- `npm run check:react-doctor`
- Direct parser check:
  - `09071220 => 09.07.2020`
  - `09.07.1220 => 09.07.2020`
  - `09/07/20 => 09.07.2020`

After publish and IIS restart:

- `https://crm.insertec.biz:7702/` returned `200`
- IIS AspNetCore Module V2 logged:
  - `Application 'C:\inetpub\wwwroot\IND_CRM_APP\' started successfully.`

## Prevention Rule

For OCR or IA derived expense dates:

- Never trust years outside the supported business range.
- Normalize or reject short or corrupted OCR years before sending ticket or line payloads upstream.
- Keep the date guard in the composite endpoint so the browser can stay on a single `quick-create` call without web-side recovery logic.
