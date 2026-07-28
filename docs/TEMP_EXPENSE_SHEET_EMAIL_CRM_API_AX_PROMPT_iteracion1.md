# Prompt for Codex: Expense Sheet Email Notifications in IND_CRM_API and Axapta

> Historical implementation prompt. It is not a current functional or technical source of truth. Verify the current repositories and deployed Axapta runtime before reuse.

Use this prompt in project `C:\INDProjects\IND_CRM_API`.

Date: 2026-05-27
Version: 3

## Objective

Align `IND_CRM_API` and the Axapta exports so Axapta is the single owner of expense-sheet status notification decisions and email sending.

`IND_CRM_API` remains a backend-for-frontend/context API. It must keep the public CRM expense-sheet endpoints stable and pass `X-IND-AxUserId` to Axapta, but it must not send expense-sheet notification emails directly and must not call Microsoft Graph.

All real email transport still goes through `IND_INTERNAL_API`, normally from Axapta through the COM/DLL helper exposed by `INDInternalApiClientServer` and the CRM facade `INDCRMUtilityService`.

Important Axapta compatibility note:

- `INDCRMExpenseSheetService` must call the simple facade `INDCRMUtilityService::sendInternalApiMail` for expense-sheet notifications.
- `INDCRMUtilityService::sendInternalApiMail` delegates to `INDInternalApiClientServer::sendInternalApiMail`.
- `INDInternalApiClientServer::sendInternalApiMail` must call COM `IND.InternalApiClient.SendMail` directly, not `sendInternalApiMailEx`, so the simple notification path does not depend on a regenerated AX Business Class wrapper or `SendMailEx`.
- Keep `sendInternalApiMailEx` only for extended mail properties such as CC, BCC, Reply-To, SaveToSentItems, and Importance.
- In these AX COM mail helpers, catch `Exception::Error` only. Do not use `Exception::CLRError` because Axapta 3.0 can leave the method without valid executable code.

## Project boundaries

This prompt covers:

- `IND_CRM_API` controller alignment so it does not duplicate email sends.
- Axapta XPO changes under `.codex/Axapta`.
- `INDCRMExpenseSheetService` as the expense-sheet notification owner.
- `CRMHojaGastosTable` status-change trigger points.
- Documentation and manual Axapta job samples.

This prompt does not cover:

- Microsoft Graph transport implementation.
- Graph configuration keys.
- CRM web deep-link resolver implementation.
- One-click approval/rejection/payment links.
- Durable outbox/retry unless explicitly requested later.

Related ownership:

- `IND_INTERNAL_API`: generic mail transport, Graph token, Graph `sendMail`, COM DLL.
- `IND_CRM_API`: endpoint/context layer; calls Axapta and documents the contract.
- Axapta: expense-sheet transition detection, recipients, email body/link, and trigger execution.
- `IND_CRM_APP`: `/Gastos/ExpenseSheetLink` resolver only.

## Required context to read first

Read current code/docs before editing:

```text
.codex/skills/ind-crm-backend-guardrails/SKILL.md
.codex/ENDPOINTS.md
docs/plans/2026-05-22-expense-sheet-email-deeplinks-design_API.md
Controllers/CRM/CrmExpenseSheetsController.cs
App_Start/DependencyConfig.cs
.codex/Axapta/INDCRMExpenseSheetService.xpo
.codex/Axapta/CRMHojaGastosTable.xpo
.codex/Axapta/INDCRMUtilityService.xpo
.codex/Axapta/INDInternalApiClientServer.xpo
```

Follow local guardrails:

- Keep .NET Framework 4.8 and x86.
- Preserve public API response envelopes and routes.
- Do not hardcode secrets, URLs, company IDs, or user IDs.
- Plan first and explicitly list loose ends before coding.
- Every changed/new Axapta method must have a simple Spanish source comment.
- Email sending is best-effort and must not block the business transaction.
- External HTTP/DLL/email calls must run outside `tts` whenever possible.

## Canonical event matrix

Only these expense-sheet notification events are in scope:

```text
Draft    -> InReview  ExpenseSheetApprovalRequested
InReview -> Approved  ExpenseSheetApproved
InReview -> Rejected  ExpenseSheetRejected
Rejected -> InReview  ExpenseSheetRejectionCancelled
Any      -> Paid      ExpenseSheetPaid
```

Important transition rule:

- `Rejected -> InReview` uses the specific `ExpenseSheetRejectionCancelled` event.
- Do not also send `ExpenseSheetApprovalRequested` for the same `Rejected -> InReview` transition unless business explicitly requests a second email later.
- If `fromStatus == toStatus`, no email must be sent.

No email for:

```text
InReview -> Draft
Approved -> InReview
Draft -> Approved unless it is forced through an approved business path and later confirmed
No status change
Unknown status transition
```

## Sender and recipient rules

All email addresses come from:

```text
INDPersonaTable.Email
```

Resolve AX users and CRM users defensively:

1. `SysUserInfo::getCRMUsuarioTable(axUserId).UserId`
2. `CRMUsuarioTable::Find_AxaptaUserId(userId).UserId`
3. `CRMUsuarioTable::Find(userId).UserId`
4. Fallback to the incoming value only when it may already be a CRM `UserId`.

Rules:

```text
ExpenseSheetApprovalRequested  From: CRMHojaGastosTable.UserId owner, To: actor user passed to the method
ExpenseSheetApproved           From: actor user, To: CRMHojaGastosTable.UserId owner
ExpenseSheetRejected           From: actor user, To: CRMHojaGastosTable.UserId owner
ExpenseSheetRejectionCancelled From: actor user, To: CRMHojaGastosTable.UserId owner
ExpenseSheetPaid               From: userPagador if provided, else actor/current user; To: INDCreatedByUserId if present, else owner
```

If sender CRM user and recipient CRM user are equal, skip the email and log/info. This covers self-managed/autogestion cases.

If sender email, recipient email, or deep link is missing, skip and log. Do not throw.

## Paid/remittance loose end

The exact payment/remittance posting method may still be pending final confirmation. Keep `sendExpenseSheetPaidNotification` with a `userPagador` bypass parameter so the final posting code can pass the payment actor explicitly.

Expected signature shape:

```xpp
static server boolean sendExpenseSheetPaidNotification(
    CRMHojaGastosTable _expenseSheet,
    str 20 _userPagador = '')
```

This method should delegate to the global status notification method with `_toStatus = INDExpenseSheetStatus::Paid`.

## INDCRMExpenseSheetService requirements

Create/keep one global method that owns all status notification decisions:

```xpp
static server boolean sendExpenseSheetStatusNotification(
    CRMHojaGastosTable    _expenseSheet,
    INDExpenseSheetStatus _fromStatus,
    INDExpenseSheetStatus _toStatus,
    str 20                _actorUserId = '',
    str 20                _userPagador = '',
    str                   _source = 'axapta',
    str                   _correlationId = '')
```

Responsibilities:

1. Resolve event type from `_fromStatus` and `_toStatus`.
2. Resolve sender and recipient users.
3. Skip if sender and recipient resolve to the same CRM user.
4. Resolve `INDPersonaTable.Email` for both sides.
5. Build the link with `buildExpenseSheetWebLink(companyId, hojaGastosId, source)`.
6. Build a short Spanish subject and body.
7. Call `INDCRMUtilityService::sendInternalApiMail`.
8. Catch/log send failures and return `false`; never block the status change.

Keep these helper methods in `INDCRMExpenseSheetService`:

```xpp
resolveExpenseSheetNotificationEvent(fromStatus, toStatus)
resolveCrmUserIdFromAny(userId)
buildExpenseSheetNotificationSubject(eventType, hojaGastosId)
buildExpenseSheetNotificationMessage(eventType, hojaGastosId)
buildExpenseSheetWebLink(companyId, hojaGastosId, source)
getPersonaEmailByUserId(str 20 userId)
getPersonaNameByUserId(str 20 userId)
sendExpenseSheetPaidNotification(expenseSheet, str 20 userPagador = '')
```

`getExpenseSheetNotificationRecipients` may stay for compatibility, but it must support the new event types and use `str 20` for AX user values that previously used `UserId`.

## UserId type rule in Axapta

Any Axapta method variable or parameter touched by this work that used EDT/type `UserId` for AX user identifiers must become:

```xpp
str 20
```

Reason: the current `UserId` type is truncating longer IDs.

Do not change AOT table fields/EDTs globally in the export unless business explicitly asks for a schema-level change. This rule is for method variables and parameters in the touched classes.

## CRMHojaGastosTable trigger points

Call `INDCRMExpenseSheetService::sendExpenseSheetStatusNotification` after the status change is committed.

Update these paths:

```text
CRMHojaGastosTable.UpdateStatus
CRMHojaGastosTable.Aprobar_DesaprobarHojaDeGastos
CRMHojaGastosTable.Aprobar_DesaprobarHojaDeGastos_MEX
CRMHojaGastosTable.Aprobar_DesaprobarHojaDeGastos_TOTAL
CRMHojaGastosTable.ContabilizaAsientoHojaGastos paid loop
```

Rules:

- Capture old status before the update.
- Capture new status after assigning the final value.
- Commit the business operation first.
- Send email best-effort outside `tts`.
- Do not send email from `modifiedField` or `validateWrite` for this workflow.

## IND_CRM_API controller alignment

`CrmExpenseSheetsController.UpdateExpenseSheetHeader` must:

1. Validate request as today.
2. Build the existing Axapta container.
3. Call `INDCRMExpenseSheetService.updateExpenseSheetHeader`.
4. Return the same public response as today.

It must not:

- Read a notification snapshot before/after the update.
- Instantiate or call `IExpenseSheetNotificationService` for status emails.
- Call `IND_INTERNAL_API` for expense-sheet status notifications.
- Call Graph.

If legacy classes such as `ExpenseSheetNotificationService` remain in the project, they must not be wired into this expense-sheet update flow.

## Deep-link format

Every email must include only a navigation link:

```text
{INDCRM_WEB_BASE_URL}/Gastos/ExpenseSheetLink?hojaGastosId={id}&targetCompanyId={companyId}&source={source}
```

The link never approves, rejects, pays, cancels, or mutates anything.

Temporary Axapta config placeholders can remain in `ParameterTable`/`INDDefaultParameters` until the final technical configuration table exists.

## Manual Axapta job

Add a copy-paste job to test `INDCRMExpenseSheetService` directly. It should:

- Select a real `CRMHojaGastosTable` record by `HojaGastosId`.
- Let the developer configure `fromStatus`, `toStatus`, `actorUserId`, and `userPagador`.
- Call `sendExpenseSheetStatusNotification` directly.
- Include comments explaining every variable.
- Remind the developer that real email only sends when sender and recipient are different CRM users and both have `INDPersonaTable.Email`.

## Documentation updates

Update as applicable:

```text
.codex/ENDPOINTS.md
docs/plans/2026-05-22-expense-sheet-email-deeplinks-design_API.md
.codex/AX_INDCRMExpenseSheetService_CHANGES_2026-05-27.md
.codex/AX_CRMHojaGastosTable_CHANGES_2026-05-27.md
.codex/Axapta/JOB_INDCRMExpenseSheetService_SendStatusNotification_2026-05-27.xpp
```

## Verification

Build:

```powershell
.\scripts\build-api.ps1 -Configuration Debug
```

Manual checklist:

- PUT update without status change does not send email.
- `Draft -> InReview` calls AX notification logic once.
- `InReview -> Approved` calls AX notification logic once.
- `InReview -> Rejected` calls AX notification logic once.
- `Rejected -> InReview` sends `ExpenseSheetRejectionCancelled`, not a duplicate approval-request email.
- Paid helper delegates to the global method and accepts `userPagador`.
- Same sender/recipient CRM user skips email.
- Missing email/link logs and does not block.
- `IND_CRM_API` no longer sends expense-sheet status email directly.
- Axapta comments for changed methods are in simple Spanish.
