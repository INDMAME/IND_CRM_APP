# Prompt for Codex: Expense Sheet Email Notifications in IND_CRM_API and Axapta

Use this prompt in project `C:\INDProjects\IND_CRM_API`.

Date: 2026-05-26
Version: 2

## Objective

Implement and document the CRM-context and Axapta side of expense sheet email notifications.

`IND_CRM_API` is a backend-for-frontend/context API. It owns CRM expense sheet notification orchestration for web-originated transitions, but it must not send mail directly with Microsoft Graph.

Axapta owns Axapta-originated notification triggers, including the paid remittance notification.

All real email transport must go through `IND_INTERNAL_API`.

## Project boundaries

This prompt covers:

- `IND_CRM_API` notification orchestration.
- `IND_CRM_API` configuration for calling `IND_INTERNAL_API`.
- Axapta helper changes under `.codex/Axapta`.
- Documentation and environment scripts in `IND_CRM_API`.

This prompt does not cover:

- Microsoft Graph implementation.
- `INTSERV_GRAPH_*` keys.
- Direct Graph calls from CRM API or Axapta.
- CRM web deep-link resolver implementation.
- One-click approval/rejection/payment links.

Related ownership:

- `IND_INTERNAL_API`: generic mail transport, Graph token, Graph `sendMail`, COM DLL.
- `IND_CRM_API`: expense sheet event detection, recipients, localized subject/body, call to internal mail API.
- Axapta: paid remittance trigger and generic COM helper for any AX process.
- `IND_CRM_APP`: `/Gastos/ExpenseSheetLink` resolver.

## Required context to read first

Read current code/docs before editing:

```text
.codex/skills/ind-crm-backend-guardrails/SKILL.md
docs/plans/2026-05-22-expense-sheet-email-deeplinks-design_API.md
.codex/ENDPOINTS.md
README.md
App.config
App_Start/DependencyConfig.cs
Helpers/AppSettingsHelper.cs
Controllers/CRM/CrmExpenseSheetsController.cs
Contracts/Requests/UpdateExpenseSheetHeaderRequest.cs
Contracts/Responses/ExpenseSheetDetailDto.cs
Contracts/Notifications/InternalMailContracts.cs
Services/InternalMailClient.cs
Services/ExpenseSheetNotificationService.cs
scripts/set-indcrm-machine-env.ps1
scripts/set-indcrm-machine-critical-env.ps1
scripts/set-indcrm-machine-all-env.ps1
.codex/Axapta/INDCRMUtilityService.xpo
.codex/Axapta/INDCRMExpenseSheetService.xpo
.codex/Axapta/CRMHojaGastosTable.xpo
```

Follow local guardrails:

- Keep .NET Framework 4.8 and x86.
- Do not add new test projects.
- Add new `.cs` files to `IND_CRM_API.csproj`.
- Do not hardcode secrets, tenant IDs, client IDs, passwords, company IDs, or environment-specific URLs.
- Preserve public response shapes unless the change is explicitly required.
- Email failures are best-effort by default and must not block the business process.
- Use existing logging patterns.
- Use existing Axapta COM wrapper/session patterns.
- Add short English comments to new public classes and methods.

## End-to-end events

Only these notification event types are in scope:

```text
ExpenseSheetApprovalRequested
ExpenseSheetApproved
ExpenseSheetPaid
```

Event ownership:

```text
ExpenseSheetApprovalRequested  CRM API/web-originated status transition only
ExpenseSheetApproved           CRM API/web-originated status transition only
ExpenseSheetPaid               Axapta payment/remittance posting only
```

Deep links always navigate to the CRM web detail resolver and never execute a business action.

Canonical deep link:

```text
{INDCRM_WEB_BASE_URL}/Gastos/ExpenseSheetLink?hojaGastosId={id}&targetCompanyId={companyId}&source={source}
```

Final web detail route after `IND_CRM_APP` resolves the link:

```text
/Gastos/ExpenseSheetDetail?hojaGastosId={id}
```

`targetCompanyId` is for web app company validation/switching. Do not include it in the final detail URL unless the current app route requires it.

## IND_CRM_API configuration

Add or confirm these keys in `App.config`, `AppSettingsHelper` usage, docs, and env scripts:

```text
INDCRM_INTERNAL_API_BASE_URL
INDCRM_INTERNAL_API_CLIENT_ID
INDCRM_INTERNAL_API_CLIENT_SECRET
INDCRM_EXPENSE_NOTIFICATIONS_ENABLED
INDCRM_EXPENSE_NOTIFICATIONS_BEST_EFFORT
INDCRM_EXPENSE_NOTIFY_TRANSITIONS
INDCRM_WEB_BASE_URL
```

Recommended defaults for scripts/docs:

```text
INDCRM_INTERNAL_API_BASE_URL=<environment internal API base URL>
INDCRM_INTERNAL_API_CLIENT_ID=<SET_ME_INTERNAL_API_CLIENT_ID>
INDCRM_INTERNAL_API_CLIENT_SECRET=<SET_ME_INTERNAL_API_CLIENT_SECRET>
INDCRM_EXPENSE_NOTIFICATIONS_ENABLED=false
INDCRM_EXPENSE_NOTIFICATIONS_BEST_EFFORT=true
INDCRM_EXPENSE_NOTIFY_TRANSITIONS=ExpenseSheetApprovalRequested,ExpenseSheetApproved
```

Known environment defaults if the project already uses them:

```text
DEV  INDCRM_INTERNAL_API_BASE_URL=https://dev.service.insertec.eu:2087/
PROD INDCRM_INTERNAL_API_BASE_URL=https://prod.service.insertec.eu:2096/
```

Use placeholders for credentials. Never commit real values.

Do not add Graph keys to this project. The following keys belong only to `IND_INTERNAL_API` and must not be used by `IND_CRM_API`:

```text
GRAPH_TENANT_ID
GRAPH_CLIENT_ID
GRAPH_CLIENT_SECRET
INTSERV_GRAPH_TENANT_ID
INTSERV_GRAPH_CLIENT_ID
INTSERV_GRAPH_CLIENT_SECRET
```

## Internal mail API contract used by CRM API

`IND_CRM_API` calls this internal endpoint:

```text
POST {INDCRM_INTERNAL_API_BASE_URL}/api/internal/v1/mail/messages
```

The endpoint is authenticated by first logging in to `IND_INTERNAL_API` with:

```text
INDCRM_INTERNAL_API_CLIENT_ID
INDCRM_INTERNAL_API_CLIENT_SECRET
```

The internal API service user must have scope:

```text
internal.mail.send
```

Use the generic mail contract. Keep the CRM request DTO aligned with `IND_INTERNAL_API`, including optional extended fields even if expense sheet notifications do not use all of them today:

```json
{
  "company": "es01",
  "from": { "email": "sender@example.com", "displayName": "Sender Name" },
  "to": [{ "email": "recipient@example.com", "displayName": "Recipient Name" }],
  "cc": [],
  "bcc": [],
  "replyTo": [],
  "subject": "Localized subject",
  "htmlBody": "<p>Localized message</p><p><a href=\"...\">Open expense sheet</a></p>",
  "textBody": "Localized message\nOpen expense sheet: ...",
  "saveToSentItems": false,
  "importance": "normal",
  "sourceSystem": "IND_CRM_API",
  "sourceProcess": "ExpenseSheetNotifications",
  "eventType": "ExpenseSheetApproved",
  "aggregateType": "ExpenseSheet",
  "aggregateId": "12345",
  "idempotencyKey": "ExpenseSheetApproved:es01:12345:2",
  "correlationId": "request-trace-id"
}
```

Allowed `importance` values:

```text
low
normal
high
```

Default to `normal`.

Do not log full email bodies. Body values may contain large HTML, including inline base64 image strings in other global email use cases.

## Internal mail client in IND_CRM_API

Keep or add:

```text
Services/Interfaces/IInternalMailClient.cs
Services/InternalMailClient.cs
Contracts/Notifications/InternalMailContracts.cs
```

Responsibilities:

1. Validate required local configuration.
2. Login to `IND_INTERNAL_API`.
3. Call `POST /api/internal/v1/mail/messages`.
4. Return a small result with accepted/provider/correlation details.
5. Log sanitized failures.
6. Never leak client secret, bearer token, or full email body.

If `IND_INTERNAL_API` is unavailable and best-effort is enabled, log and return a non-accepted result without breaking the caller.

Use bounded timeouts and existing HTTP conventions. Do not introduce a new dependency unless there is already a strong project precedent.

## Expense sheet notification service

Keep or add:

```text
Services/Interfaces/IExpenseSheetNotificationService.cs
Services/ExpenseSheetNotificationService.cs
```

Responsibilities:

1. Detect the notification event from before/after sheet state.
2. Check `INDCRM_EXPENSE_NOTIFICATIONS_ENABLED`.
3. Check `INDCRM_EXPENSE_NOTIFY_TRANSITIONS`.
4. Build the web deep link using `INDCRM_WEB_BASE_URL`.
5. Resolve sender and recipients through Axapta-backed data.
6. Build localized subject, HTML body, and text body.
7. Call `IInternalMailClient`.
8. Log success, skipped sends, and failures.
9. Respect `INDCRM_EXPENSE_NOTIFICATIONS_BEST_EFFORT`.

The body must be minimal:

- Short localized message.
- Expense sheet ID.
- Link to `/Gastos/ExpenseSheetLink`.

Do not add approve/reject/payment action buttons. The user must manually open the detail and act in the app.

## Recipient and sender rules

All email addresses come from:

```text
INDPersonaTable.Email
```

Sender for web-originated notifications:

- Logged CRM/Axapta user for the current request.
- Resolve that user to `INDPersonaTable.Email`.
- If missing, log and skip sending.

Recipients:

```text
ExpenseSheetApprovalRequested -> approver user(s) according to Axapta authoritative logic
ExpenseSheetApproved          -> CRMHojaGastosTable.INDCreatedByUserId
ExpenseSheetPaid              -> CRMHojaGastosTable.INDCreatedByUserId
```

For created-by recipients, resolve:

```text
CRMHojaGastosTable.INDCreatedByUserId -> INDPersonaTable.Email
```

If a recipient email is missing, log and skip sending. Do not block the business process.

Do not guess approvers in C#. If Axapta does not expose reliable approver resolution, add/adjust a method in `INDCRMExpenseSheetService.xpo` that uses the same Axapta source as the approval workflow/UI. If the source is unclear, stop and ask.

## CRM API transition detection

Update `CrmExpenseSheetsController.UpdateExpenseSheetHeader` only after confirming current behavior.

Required flow:

1. Read current sheet detail before the update.
2. Execute the existing Axapta update.
3. If the update succeeds, read sheet detail again.
4. Compare before/after status.
5. Send notification only when status actually changes into a configured event state.
6. Keep the same public API response shape as today.

Mapping:

```text
ExpenseSheetApprovalRequested -> status changes to approval requested state
ExpenseSheetApproved          -> status changes to approved state
ExpenseSheetPaid              -> never sent by web/API update
```

Avoid duplicate sends:

```text
idempotencyKey={eventType}:{companyId}:{hojaGastosId}:{afterStatus}
```

Pass the key to `IND_INTERNAL_API` even if durable idempotency storage is not yet implemented in this repo.

## Localization in IND_CRM_API

Messages must exist for all app-supported languages:

```text
es-ES
en
eu-ES
it
pt
zh-Hans
```

If the API already has localization infrastructure, use it. If not, keep a small focused helper/resource class for this feature.

Fallback:

```text
es-ES
```

Subjects and bodies should be short and business-oriented.

Do not depend on the web app to translate the email body after the email has already been sent.

## Axapta design

Axapta needs two layers:

1. Generic mail helper in `INDCRMUtilityService.xpo`.
2. Expense-sheet-specific helpers in `INDCRMExpenseSheetService.xpo`.

### Generic helper in INDCRMUtilityService.xpo

`INDCRMUtilityService` must expose a reusable email utility for any Axapta process.

Keep two public static methods:

```xpp
// Simple generic mail send. Supports From, To, subject, HTML/text body and trace metadata.
public static server boolean sendInternalApiMail(
    str _companyId,
    str _fromEmail,
    str _toEmails,
    str _subject,
    str _htmlBody,
    str _textBody,
    str _sourceProcess,
    str _eventType,
    str _aggregateType,
    str _aggregateId,
    str _idempotencyKey,
    str _correlationId = '')
```

```xpp
// Extended generic mail send. Adds sender display name, CC, BCC, Reply-To, saveToSentItems and importance.
public static server boolean sendInternalApiMailEx(
    str _companyId,
    str _fromEmail,
    str _fromDisplayName,
    str _toEmails,
    str _ccEmails,
    str _bccEmails,
    str _replyToEmails,
    str _subject,
    str _htmlBody,
    str _textBody,
    boolean _saveToSentItems,
    str _importance,
    str _sourceProcess,
    str _eventType,
    str _aggregateType,
    str _aggregateId,
    str _idempotencyKey,
    str _correlationId = '')
```

Rules:

- `sendInternalApiMail` must delegate to `sendInternalApiMailEx`.
- `sendInternalApiMailEx` must instantiate COM `IND.InternalApiClient`.
- `sendInternalApiMailEx` must call COM `SendMailEx`.
- Do not build raw JSON in this helper for normal use.
- Keep `SendMailJson` only as an advanced/diagnostic DLL method in `IND_INTERNAL_API`; do not make it the standard Axapta helper.
- `toEmails`, `ccEmails`, `bccEmails`, and `replyToEmails` are semicolon-separated lists.
- `importance` must normalize to `low`, `normal`, or `high`; default to `normal`.
- Missing config, From, To, Subject, or Body returns `false` and logs a warning.
- COM/CLR failures return `false` and log a warning.
- Do not throw from generic mail helper in normal business flows.
- Do not log full bodies, because they may contain very large HTML/base64 strings.

Temporary config placeholders:

```xpp
ParameterTable::find().INDInternalApiBaseUrl
ParameterTable::find().INDInternalApiClientId
ParameterTable::find().INDInternalApiClientSecret
```

The user will later move these placeholders to the final technical configuration table.

### COM DLL method signatures expected by Axapta

Simple COM method:

```text
IND.InternalApiClient.SendMail(
    baseUrl,
    username,
    password,
    fromEmail,
    toEmails,
    subject,
    htmlBody,
    textBody,
    company,
    sourceSystem,
    sourceProcess,
    eventType,
    aggregateType,
    aggregateId,
    idempotencyKey,
    correlationId)
```

Extended COM method:

```text
IND.InternalApiClient.SendMailEx(
    baseUrl,
    username,
    password,
    fromEmail,
    fromDisplayName,
    toEmails,
    ccEmails,
    bccEmails,
    replyToEmails,
    subject,
    htmlBody,
    textBody,
    saveToSentItems,
    importance,
    company,
    sourceSystem,
    sourceProcess,
    eventType,
    aggregateType,
    aggregateId,
    idempotencyKey,
    correlationId)
```

COM `SendMail` and `SendMailEx` must return `true` only when `IND_INTERNAL_API` accepts the request.

If the DLL was already registered on the AOS machine, deployment may require rebuilding/registering the COM DLL and reimporting the type library depending on how Axapta references it.

## Expense-sheet helpers in INDCRMExpenseSheetService.xpo

CRM/expense-sheet-specific logic belongs here, not in `INDCRMUtilityService`.

Add or keep:

```xpp
public static str buildExpenseSheetWebLink(str _companyId, str _hojaGastosId, str _source = 'axapta')
```

Temporary web base URL placeholder:

```xpp
ParameterTable::find().INDCrmWebBaseUrl
```

Build:

```text
{ParameterTable::find().INDCrmWebBaseUrl}/Gastos/ExpenseSheetLink?hojaGastosId={id}&targetCompanyId={companyId}&source={source}
```

URL-encode query values. If there is no existing AX helper, implement minimal safe encoding for common query characters.

Add/keep:

```xpp
public static boolean sendExpenseSheetPaidNotification(CRMHojaGastosTable _expenseSheet)
```

Behavior:

- Triggered only from Axapta after payment/remittance posting succeeds.
- From email: `INDPersonaTable.Email` for current logged AX user, normally `curUserId()`.
- To email: `INDPersonaTable.Email` for `CRMHojaGastosTable.INDCreatedByUserId`.
- Link source: `axapta`.
- Event type: `ExpenseSheetPaid`.
- Source process: `AxaptaExpenseSheetPayment`.
- Aggregate type: `ExpenseSheet`.
- Aggregate ID: `CRMHojaGastosTable.HojaGastosId` or the actual field used by the class.
- Body: minimal localized message plus detail link.
- Missing from/to email logs and returns false.
- Email failure does not block payment posting.
- Calls `INDCRMUtilityService::sendInternalApiMail` or `sendInternalApiMailEx`.

Add/keep recipient resolver methods if needed by the API:

```xpp
public static container getExpenseSheetNotificationRecipients(str _companyId, str _hojaGastosId, str _eventType)
public static str getPersonaEmailByUserId(str _userId)
```

Use `INDPersonaTable.Email`. Validate exact AX field names in AOT before finalizing.

## Axapta paid/remittance trigger

Find the authoritative method that posts or marks paid expense sheet remittances. The current export suggests reviewing:

```text
.codex/Axapta/CRMHojaGastosTable.xpo
```

especially methods around:

```text
ContabilizaAsientoHojaGastos
```

After posting succeeds and only after the business operation is accepted, call:

```xpp
INDCRMExpenseSheetService::sendExpenseSheetPaidNotification(expenseSheetRecord);
```

Do not call before success/commit.

Do not throw if email fails.

## X++ smoke test documentation

Update the Axapta documentation/change log with two copy-paste jobs:

- `Job_INDInternalApi_SendMail_Simple`
- `Job_INDInternalApi_SendMail_Extended`

Each job must include comments explaining every meaningful variable:

```text
baseUrl         -> IND_INTERNAL_API base URL, ending with slash if current helper expects it
apiUser         -> internal API client/user id
apiPassword     -> internal API client secret/password
fromEmail       -> sender mailbox used by Graph
fromDisplayName -> optional sender name for extended send
toEmails        -> semicolon-separated To recipients
ccEmails        -> semicolon-separated CC recipients
bccEmails       -> semicolon-separated BCC recipients
replyToEmails   -> semicolon-separated Reply-To addresses
subject         -> email subject
htmlBody        -> HTML body; may be large
textBody        -> plain text fallback; may be empty if htmlBody exists
company         -> optional company metadata; if sent, must be allowed by internal API JWT claims
saveToSentItems -> extended flag forwarded to Graph
importance      -> low, normal, or high
sourceSystem    -> AXAPTA for Axapta callers
sourceProcess   -> process that sends the email
eventType       -> business event/type for logs
aggregateType   -> entity type for traceability
aggregateId     -> entity id for traceability
idempotencyKey  -> deterministic duplicate-control key
correlationId   -> trace id shared across logs
```

The jobs should use the two COM methods directly so AX developers can validate the DLL independently from the CRM-specific helpers.

## Logging requirements

Log in all involved layers:

- Axapta: missing config, missing sender/recipient, COM call failure, internal API rejection.
- `IND_CRM_API`: skipped notification, missing mapping, failed internal API auth/send, accepted send.
- `IND_INTERNAL_API`: Graph config/token/send status, provider acceptance, provider rejection.

Never log:

- Internal API client secret.
- Graph secret/token.
- Full HTML/text body.

## Documentation updates in IND_CRM_API

Update:

```text
.codex/ENDPOINTS.md
docs/plans/2026-05-22-expense-sheet-email-deeplinks-design_API.md
.codex/AX_INDCRMUtilityService_CHANGES_2026-05-25.md
README.md or the existing configuration/release doc
scripts/set-indcrm-machine-env.ps1
scripts/set-indcrm-machine-critical-env.ps1
scripts/set-indcrm-machine-all-env.ps1
```

Document:

- New CRM API keys.
- Explicit statement that Graph keys are not configured in CRM API.
- Internal API endpoint dependency.
- Event ownership.
- Deep-link format.
- Best-effort behavior.
- Axapta `ParameterTable` placeholders.
- Simple and extended AX/COM send methods.
- Large body note: CRM/Axapta should not trim body values, but provider limits still apply.

## Verification

Build:

```powershell
.\scripts\build-api.ps1 -Configuration Debug
```

or use `Release` if preparing deployment:

```powershell
.\scripts\build-api.ps1 -Configuration Release
```

Manual checklist:

- Updating an expense sheet without a status transition sends no email.
- Transition to approval requested sends one best-effort email to approvers.
- Transition to approved sends one best-effort email to the sheet creator/requester.
- Paid remittance posting in Axapta sends one best-effort email to `INDCreatedByUserId`.
- Missing sender email logs and does not block.
- Missing recipient email logs and does not block.
- Internal API failure logs and does not block when best-effort is enabled.
- Deep link uses `/Gastos/ExpenseSheetLink`.
- `IND_CRM_API` has no Graph keys and makes no Graph calls.
- `IND_INTERNAL_API` has no expense-sheet-specific business logic.
- Simple AX smoke job can send.
- Extended AX smoke job can send with CC/BCC/Reply-To/importance.
