# Prompt for Codex: Global Graph Mail Transport in IND_INTERNAL_API

> Historical implementation prompt. It is not a current functional or technical source of truth. Verify the current repositories and deployed mail transport before reuse.

Use this prompt in project `C:\INDProjects\IND_INTERNAL_API`.

Date: 2026-05-27
Version: 3

## Objective

Implement or verify a reusable, generic email sending capability in `IND_INTERNAL_API` using Microsoft Graph.

`IND_INTERNAL_API` is the transport layer only. It must be callable from any internal process, including Axapta through the COM-visible client DLL.

This project must not contain CRM, expense-sheet, approval workflow, paid remittance, localization, recipient-resolution, or email-template logic. Callers provide sender, recipients, subject, body, metadata, idempotency key, and correlation ID.

## Current ownership alignment

Expense-sheet notification decisions are now owned by Axapta in `INDCRMExpenseSheetService` from the `IND_CRM_API` repository exports.

`IND_INTERNAL_API` only receives generic mail requests for event types such as:

```text
ExpenseSheetApprovalRequested
ExpenseSheetApproved
ExpenseSheetRejected
ExpenseSheetRejectionCancelled
ExpenseSheetPaid
MailTransportSmokeTest
```

Do not add code branches for those event names. Treat them as metadata.

## Project boundaries

This prompt covers:

- Generic mail endpoint.
- Microsoft Graph client credentials configuration.
- Microsoft Graph `sendMail` call.
- Internal JWT scope enforcement.
- COM client DLL methods for Axapta and other COM callers.
- Postman tests for simple and extended payloads.
- Documentation and environment scripts in `IND_INTERNAL_API`.

This prompt does not cover:

- Expense-sheet recipient resolution.
- Expense-sheet deep-link generation.
- CRM app routes.
- Email localization.
- Approval/payment workflow changes.
- Direct Axapta AOT changes beyond documenting DLL signatures.

Related ownership:

- `IND_INTERNAL_API`: generic transport and Graph.
- Axapta: generic COM helper, expense-sheet transition logic, and Axapta-originated business triggers.
- `IND_CRM_API`: backend context API and Axapta exports/documentation.
- `IND_CRM_APP`: web deep-link resolver.

## Required context to read first

Read current project conventions before editing:

```text
.codex/skills/ind-internal-api-guardrails/SKILL.md
.codex/ENDPOINTS.md
README.md
Web.config
App.config
App_Start/DependencyConfig.cs
Controllers
Contracts
Services
Existing auth/JWT implementation
Existing authorization/scope filters
Existing logging helpers
Existing response/error contracts
scripts/set-intserv-machine-all-env.ps1
INDInternalApiClient/IINDInternalApiClient.cs
INDInternalApiClient/INDInternalApiClient.cs
INDInternalApiClient/InternalApiHttpClient.cs
INDInternalApiClient/README.md
```

Follow local guardrails:

- Keep .NET Framework 4.8 and x86.
- Do not create a new test project.
- Do not hardcode secrets, tenant IDs, client IDs, passwords, company IDs, or environment-specific URLs.
- New internal endpoints must use `api/internal/v1`.
- Protected endpoints must require the existing JWT authentication flow.
- Add new `.cs` files to the project file.
- Keep COM binary compatibility where possible; add new `DispId` values after existing methods.
- Add short comments to new public classes and methods.
- Update docs when endpoint or DLL contracts change.

## Endpoint

Add or confirm a single endpoint:

```text
POST /api/internal/v1/mail/messages
```

There must not be separate HTTP endpoints for simple and extended mail. The same endpoint supports both shapes through optional fields.

Authentication:

- Existing internal JWT bearer token.
- Existing login endpoint, normally `POST /api/auth/login`.
- Required scope: `internal.mail.send`.

Content type:

```text
application/json
```

## Request contract

Full extended request:

```json
{
  "company": "es01",
  "from": { "email": "sender@example.com", "displayName": "Sender Name" },
  "to": [{ "email": "recipient@example.com", "displayName": "Recipient Name" }],
  "cc": [{ "email": "copy@example.com", "displayName": "Copy Name" }],
  "bcc": [{ "email": "hidden@example.com", "displayName": "Hidden Name" }],
  "replyTo": [{ "email": "reply@example.com", "displayName": "Reply Name" }],
  "subject": "Subject",
  "htmlBody": "<p>Message</p>",
  "textBody": "Message",
  "saveToSentItems": false,
  "importance": "normal",
  "sourceSystem": "AXAPTA",
  "sourceProcess": "AxaptaExpenseSheetStatus",
  "eventType": "ExpenseSheetApproved",
  "aggregateType": "ExpenseSheet",
  "aggregateId": "HG000055",
  "idempotencyKey": "ExpenseSheetApproved:es01:HG000055:1:2:trace",
  "correlationId": "trace-id"
}
```

Minimal simple request:

```json
{
  "from": { "email": "sender@example.com" },
  "to": [{ "email": "recipient@example.com" }],
  "subject": "Subject",
  "htmlBody": "<p>Message</p>",
  "sourceSystem": "AXAPTA",
  "sourceProcess": "ManualSmokeTest",
  "eventType": "MailTransportSmokeTest",
  "aggregateType": "ManualTest",
  "aggregateId": "12345",
  "idempotencyKey": "ManualTest:12345",
  "correlationId": "manual-test-12345"
}
```

Field semantics:

```text
company         Optional company metadata.
from            Required sender mailbox. Graph sends through /users/{from.email}/sendMail.
to              Required To recipients. At least one valid email.
cc              Optional CC recipients.
bcc             Optional BCC recipients.
replyTo         Optional Reply-To recipients.
subject         Required subject.
htmlBody        Optional HTML body. Preferred when both bodies are present.
textBody        Optional plain text body.
saveToSentItems Optional Graph flag. If null, use configured default.
importance      Optional low/normal/high. Defaults to normal.
sourceSystem    Optional caller system for logs.
sourceProcess   Optional caller process for logs.
eventType       Optional business event for logs only.
aggregateType   Optional entity type for logs.
aggregateId     Optional entity id for logs.
idempotencyKey  Optional deterministic key for traceability/future duplicate control.
correlationId   Optional trace id. Generate one if missing.
```

## Validation rules

Required:

- `from.email`
- At least one `to` recipient.
- `subject`
- At least one body: `htmlBody` or `textBody`.

Validation:

- Validate all emails with `System.Net.Mail.MailAddress`.
- Reject the entire request if any recipient email is invalid. Do not partially send.
- Bound `subject` to a reasonable max length.
- Accept only `low`, `normal`, or `high` for `importance`; normalize case or reject according to existing style.
- Default missing `importance` to `normal`.
- Default missing `saveToSentItems` to `INTSERV_GRAPH_SAVE_TO_SENT_ITEMS_DEFAULT`.

Large body handling:

- Do not trim `htmlBody` or `textBody`.
- Do not log full body values.
- Do not add artificial low character limits in the API or DLL.
- Keep serializers configured to tolerate large JSON bodies where the project allows it.
- Document that Microsoft Graph and the HTTP host still impose provider/server limits. Very large inline base64 images may need attachments or external links if Graph rejects the payload.

## Response contract

Success:

```json
{
  "acceptedByProvider": true,
  "provider": "MicrosoftGraph",
  "providerStatusCode": 202,
  "fromEmail": "sender@example.com",
  "recipientCount": 1,
  "correlationId": "correlation-id-used",
  "idempotencyKey": "ExpenseSheetApproved:es01:HG000055:1:2:trace"
}
```

Graph `202 Accepted` means Graph accepted the request. It does not guarantee final inbox delivery.

## Microsoft Graph implementation

Use HTTP against Microsoft Graph unless the project already has a Graph SDK dependency and established pattern.

Token flow:

```text
grant_type=client_credentials
scope=https://graph.microsoft.com/.default
token endpoint=https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token
```

Send endpoint:

```text
POST https://graph.microsoft.com/v1.0/users/{fromEmail}/sendMail
```

Body mapping:

- If `htmlBody` is present, send Graph body `contentType=HTML`.
- Else send `textBody` with `contentType=Text`.
- Preserve body content except JSON escaping.

Recipient mapping:

- `to` -> `toRecipients`
- `cc` -> `ccRecipients`
- `bcc` -> `bccRecipients`
- `replyTo` -> `replyTo`

## Configuration keys

Add or confirm these settings in config helpers, environment scripts, and docs:

```text
INTSERV_GRAPH_MAIL_ENABLED
INTSERV_GRAPH_TENANT_ID
INTSERV_GRAPH_CLIENT_ID
INTSERV_GRAPH_CLIENT_SECRET
INTSERV_GRAPH_BASE_URL
INTSERV_GRAPH_TOKEN_URL_TEMPLATE
INTSERV_GRAPH_SEND_TIMEOUT_SECONDS
INTSERV_GRAPH_SAVE_TO_SENT_ITEMS_DEFAULT
```

Recommended defaults:

```text
INTSERV_GRAPH_MAIL_ENABLED=false
INTSERV_GRAPH_BASE_URL=https://graph.microsoft.com/v1.0
INTSERV_GRAPH_TOKEN_URL_TEMPLATE=https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token
INTSERV_GRAPH_SEND_TIMEOUT_SECONDS=30
INTSERV_GRAPH_SAVE_TO_SENT_ITEMS_DEFAULT=false
```

Never commit real tenant/client/secret values.

## Error handling and logs

Use existing error/response style. Mail-related errors:

```text
MAIL_NOT_CONFIGURED
MAIL_VALIDATION_FAILED
MAIL_TOKEN_FAILED
MAIL_SEND_FAILED
```

Log sanitized metadata:

```text
correlationId, sourceSystem, sourceProcess, eventType, aggregateType, aggregateId,
idempotencyKey, company, fromEmail, recipientCount, Graph HTTP status, error code
```

Never log:

- Graph client secret.
- OAuth token.
- Internal API password.
- Full HTML/text body.

## COM client DLL for Axapta/global callers

Extend or verify the COM-visible `INDInternalApiClient` without breaking existing methods.

Required methods:

```csharp
string SendMailJson(string baseUrl, string username, string password, string mailRequestJson, string correlationId);
```

```csharp
bool SendMail(
    string baseUrl,
    string username,
    string password,
    string fromEmail,
    string toEmails,
    string subject,
    string htmlBody,
    string textBody,
    string company,
    string sourceSystem,
    string sourceProcess,
    string eventType,
    string aggregateType,
    string aggregateId,
    string idempotencyKey,
    string correlationId);
```

```csharp
bool SendMailEx(
    string baseUrl,
    string username,
    string password,
    string fromEmail,
    string fromDisplayName,
    string toEmails,
    string ccEmails,
    string bccEmails,
    string replyToEmails,
    string subject,
    string htmlBody,
    string textBody,
    bool saveToSentItems,
    string importance,
    string company,
    string sourceSystem,
    string sourceProcess,
    string eventType,
    string aggregateType,
    string aggregateId,
    string idempotencyKey,
    string correlationId);
```

Rules:

- `SendMail` is the simple convenience method.
- `SendMailEx` is the standard extended convenience method.
- `SendMailJson` remains advanced/diagnostic only.
- `SendMail` delegates internally to `SendMailEx` with empty CC/BCC/Reply-To, `saveToSentItems=false`, and `importance=normal`.
- Recipient list strings are semicolon-separated.
- Return `true` only when the API/provider accepts the send.
- Keep all methods generic. Do not mention CRM or expense sheets in DLL code.
- Do not trim or log body values.

## Postman tests

Create/update a new collection version instead of mutating stable baselines.

Folder:

```text
Mail
```

Requests:

```text
Send Mail - Simple
Send Mail - Extended
```

Both must authenticate, call `POST /api/internal/v1/mail/messages`, send JSON, set/reuse correlation ID, and assert success when Graph is configured.

Use placeholders for real email addresses. Do not commit personal or secret values.

## Documentation updates

Update:

```text
.codex/ENDPOINTS.md
README.md
INDInternalApiClient/README.md
.codex/IND_INTERNAL_API_CLIENT_DLL.md
scripts/set-intserv-machine-all-env.ps1
Postman DEV collection/version notes
```

Document endpoint, auth scope, request/response contracts, Graph `202`, required keys, COM methods, large body handling, and Postman tests.

## Verification

Build:

```powershell
.\scripts\build-internal-api.ps1 -Configuration Debug
```

Manual checklist:

- Auth without `internal.mail.send` is rejected.
- Missing Graph config returns `MAIL_NOT_CONFIGURED`.
- Missing `from`, `to`, `subject`, or body returns validation error.
- Invalid To/CC/BCC/Reply-To rejects the whole request.
- Simple request calls Graph `/users/{fromEmail}/sendMail`.
- Extended request maps CC, BCC, Reply-To, saveToSentItems, and importance.
- Graph `202` maps to `acceptedByProvider=true`.
- `SendMailJson`, `SendMail`, and `SendMailEx` work from the COM client.
- Bodies are not trimmed or logged.
