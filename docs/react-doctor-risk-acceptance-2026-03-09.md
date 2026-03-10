# React Doctor Risk Acceptance (2026-03-09)

## Summary

A full `react-doctor` baseline scan was executed on `2026-03-09`.

- Baseline score: `89/100`
- Result: `6 errors`, `222 warnings`
- Decision: accept the current findings for now and avoid remediation work in this cycle to preserve application stability

No frontend code changes were approved as part of this review.

## Scan Notes

The repo script:

- `npm run check:react-doctor`

scans only the diff against `HEAD`.

Because the working tree was clean, a full baseline scan was also run with:

- `npx -y react-doctor@latest . --yes --offline --verbose`

This document records the baseline and the decision to defer fixes.

## Accepted Findings

### 1. Derived state in shared comboboxes

Affected shared components include:

- `Web/wwwroot/react/src/components/visitas/ContactsCombobox.tsx`
- `Web/wwwroot/react/src/components/visitas/ClientSearchCombobox.tsx`
- `Web/wwwroot/react/src/components/commons/SelectCombobox.tsx`
- `Web/wwwroot/react/src/components/commons/RemoteSearchCombobox.tsx`

Observed pattern:

- Internal state is initialized from props and later synchronized again with `useEffect`

Why this is deferred:

- These are shared form primitives with broad reuse across visitas and gastos flows
- Refactoring them changes component contracts and interaction timing
- Regression risk is higher than the current benefit for a stability-first cycle

Accepted risk:

- Parent rerenders, cache restore flows, or remote updates may occasionally reset internal combobox state in edge cases

### 2. Accessibility warnings in expense ticket flows

Affected areas include:

- `Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx`
- `Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketPreviewModal.tsx`

Observed pattern:

- Non-semantic containers handle pointer or click interactions
- Keyboard and role coverage is not fully aligned with lint expectations

Why this is deferred:

- The current ticket flow includes custom logic that separates checkbox selection from detail navigation
- Small semantic changes can interfere with the existing guard logic and produce accidental navigations

Accepted risk:

- Accessibility debt remains in the ticket selection and preview flow, especially for keyboard-first usage

### 3. Index-based keys in filtered or reordered lists

Examples were reported in:

- `Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx`
- `Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsPage.tsx`

Why this is deferred:

- The current UI is stable in day-to-day usage
- Reworking keys safely requires reviewing the real identity rules for several payloads and list renderers

Accepted risk:

- Some filtered or reordered lists may reuse DOM nodes in ways that are harder to reason about during future enhancements

### 4. Unused file diagnostics are not trusted as a deletion signal

The scan reported a large set of `Unused file` warnings.

Why this is deferred:

- This repo uses explicit React entry points in `scripts/build-react.mjs`
- Some pages are mounted from Razor or from build entry points outside a simple import graph
- The warning is useful as a prompt for review, but not reliable enough to justify deletion by itself

Accepted risk:

- The baseline includes noisy dead-code diagnostics that should be manually validated before any cleanup

## Reopen Criteria

Revisit these findings only when one of the following is true:

- A bug is confirmed in combobox value retention, selection sync, or filter restore behavior
- The ticket flow is already being modified for UX or behavior reasons
- A dedicated accessibility pass is planned for ticket pages
- A broader React cleanup cycle is approved with QA coverage for shared form controls

## Change Control Guidance

Until these findings are reopened:

- Do not refactor shared combobox state logic only to satisfy `react-doctor`
- Do not rewrite ticket selection markup without validating the current selection-vs-navigation guard behavior
- Do not delete files based only on `Unused file` diagnostics

## Verification

Validation commands used for this record:

- `npm run check:react-doctor`
- `npm run check:react-doctor:score`
- `npx -y react-doctor@latest . --yes --offline --verbose`
- `npx -y react-doctor@latest . --yes --offline --score`
