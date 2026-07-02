# Prompt for Codex: Global Graph Mail Transport in IND_INTERNAL_API

Use this prompt in project `C:\INDProjects\IND_INTERNAL_API`.

Date: 2026-05-26
Version: 2

## Objective

Implement and document a reusable, generic email sending capability in `IND_INTERNAL_API` using Microsoft Graph.

`IND_INTERNAL_API` is the transport layer only. It must be callable from any internal process, including Axapta through the COM-visible client DLL.

This project must not contain CRM, expense sheet, approval workflow, paid remittance, localization, or email template logic. Callers provide sender, recipients, subject, body, metadata, idempotency key, and correlation ID.

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

- Expense sheet recipient resolution.
- Expense sheet deep-link generation.
- CRM app routes.
- Email localization.
- Approval or payment workflow changes.
- Direct Axapta AOT changes beyond documenting DLL signatures.

Related ownership:

- `IND_INTERNAL_API`: generic transport and Graph.
- `IND_CRM_API`: expense sheet notification orchestration and call into this API.
- Axapta: generic COM helper and Axapta-originated business triggers.
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
- Add short English comments to new public classes and methods.
- Update docs when endpoint or DLL contracts change.

## Architecture decision

`IND_INTERNAL_API` owns only the generic mail transport:

1. Validate a generic mail request.
2. Enforce JWT auth and `internal.mail.send` scope.
3. Validate optional company claim if the request includes company metadata and current auth policy requires company filtering.
4. Obtain a Microsoft Graph app token with client credentials.
5. Call Graph `/users/{fromEmail}/sendMail`.
6. Return a structured response when Graph accepts the request.
7. Return structured validation/config/provider errors when it cannot send.
8. Log sanitized metadata.

It must not decide:

- Who receives an expense sheet notification.
- Which language should be used.
- How a CRM web deep link is built.
- Whether a sheet is approved or paid.

## Endpoint

Add or confirm a single endpoint:

```text
POST /api/internal/v1/mail/messages
```

There must not be separate HTTP endpoints for simple and extended mail. The same endpoint supports both shapes through optional fields.

Authentication:

- Existing internal JWT bearer token.
- Existing login endpoint, normally `POST /api/auth/login`.
- Required scope:

```text
internal.mail.send
```

Content type:

```text
application/json
```

## Request contract

Full extended request:

```json
{
  "company": "es01",
  "from": {
    "email": "sender@example.com",
    "displayName": "Sender Name"
  },
  "to": [
    {
      "email": "recipient@example.com",
      "displayName": "Recipient Name"
    }
  ],
  "cc": [
    {
      "email": "copy@example.com",
      "displayName": "Copy Name"
    }
  ],
  "bcc": [
    {
      "email": "hidden@example.com",
      "displayName": "Hidden Name"
    }
  ],
  "replyTo": [
    {
      "email": "reply@example.com",
      "displayName": "Reply Name"
    }
  ],
  "subject": "Subject",
  "htmlBody": "<p>Message</p>",
  "textBody": "Message",
  "saveToSentItems": false,
  "importance": "normal",
  "sourceSystem": "IND_CRM_API",
  "sourceProcess": "ExpenseSheetNotifications",
  "eventType": "ExpenseSheetApproved",
  "aggregateType": "ExpenseSheet",
  "aggregateId": "12345",
  "idempotencyKey": "ExpenseSheetApproved:es01:12345:status-2",
  "correlationId": "optional-correlation-id"
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
company         Optional company metadata. If informed, validate against auth claims if current policy requires it.
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
eventType       Optional business event for logs.
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
- Accept only `low`, `normal`, or `high` for `importance`; normalize case or reject according to existing API validation style.
- Default missing `importance` to `normal`.
- Default missing `saveToSentItems` to `INTSERV_GRAPH_SAVE_TO_SENT_ITEMS_DEFAULT`.
- Treat metadata as optional unless existing internal API standards require it.

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
  "idempotencyKey": "ExpenseSheetApproved:es01:12345:status-2"
}
```

Important behavior:

- Graph `202 Accepted` means Graph accepted the request.
- It does not guarantee final inbox delivery.
- Document that distinction in endpoint docs and README.

## Microsoft Graph implementation

Use HTTP against Microsoft Graph unless the project already has a Graph SDK dependency and established pattern.

Suggested classes:

```text
Contracts/Requests/MailAddressRequest.cs
Contracts/Requests/SendMailRequest.cs
Contracts/Responses/SendMailResponse.cs
Services/Interfaces/IGraphMailClient.cs
Services/GraphMailClient.cs
Services/GraphMailOptions.cs
Services/GraphTokenProvider.cs
Controllers/Internal/MailMessagesController.cs
```

Adapt names to existing project conventions.

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

Graph payload:

```json
{
  "message": {
    "subject": "Subject",
    "body": {
      "contentType": "HTML",
      "content": "<p>Message</p>"
    },
    "toRecipients": [
      {
        "emailAddress": {
          "address": "recipient@example.com",
          "name": "Recipient Name"
        }
      }
    ],
    "ccRecipients": [],
    "bccRecipients": [],
    "replyTo": [],
    "importance": "normal"
  },
  "saveToSentItems": false
}
```

Body mapping:

- If `htmlBody` is present, send Graph body `contentType=HTML`.
- Else send `textBody` with `contentType=Text`.
- Preserve body content exactly except for serialization escaping.

Recipient mapping:

- `to` -> `toRecipients`
- `cc` -> `ccRecipients`
- `bcc` -> `bccRecipients`
- `replyTo` -> `replyTo`

Assume the Azure app registration already has working Graph permissions to send as the requested sender. Still return/log Graph authorization failures clearly.

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

Use placeholders for:

```text
INTSERV_GRAPH_TENANT_ID
INTSERV_GRAPH_CLIENT_ID
INTSERV_GRAPH_CLIENT_SECRET
```

Never commit real tenant/client/secret values.

If `INTSERV_GRAPH_MAIL_ENABLED=false`, return a structured not-configured error and log sanitized context.

## Error handling

Use existing error/response style. Add or confirm mail-related error codes:

```text
MAIL_NOT_CONFIGURED
MAIL_VALIDATION_FAILED
MAIL_TOKEN_FAILED
MAIL_SEND_FAILED
```

Expected handling:

- Missing config -> `MAIL_NOT_CONFIGURED`.
- Invalid request -> validation error / `MAIL_VALIDATION_FAILED`.
- OAuth token failure -> `MAIL_TOKEN_FAILED`.
- Graph send failure -> `MAIL_SEND_FAILED`.
- Scope/auth failure -> existing auth/forbidden error style.

Do not expose raw Graph responses in normal API responses if they may contain sensitive data. Log sanitized provider status and message.

Log at least:

```text
correlationId
sourceSystem
sourceProcess
eventType
aggregateType
aggregateId
idempotencyKey
company
fromEmail
recipientCount
Graph HTTP status
error code
sanitized provider error
```

Never log:

- Graph client secret.
- OAuth token.
- Internal API password.
- Full HTML/text body.

## COM client DLL for Axapta/global callers

Extend the existing COM-visible `INDInternalApiClient` without breaking existing methods.

Required methods:

```csharp
string SendMailJson(
    string baseUrl,
    string username,
    string password,
    string mailRequestJson,
    string correlationId
);
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
    string correlationId
);
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
    string correlationId
);
```

Rules:

- Add new `DispId` values after existing methods. Current expected `SendMailEx` `DispId` is `7` if available.
- `SendMail` is the simple convenience method.
- `SendMailEx` is the standard extended convenience method.
- `SendMailJson` remains available for advanced/raw JSON scenarios and diagnostics.
- `SendMail` should delegate internally to `SendMailEx` with empty CC/BCC/Reply-To, `saveToSentItems=false`, and `importance=normal`.
- `SendMailEx` builds JSON and calls `POST /api/internal/v1/mail/messages`.
- All recipient list strings are semicolon-separated.
- Return `true` only when the API/provider accepts the send.
- Keep all methods generic. Do not mention CRM or expense sheets in DLL code.

Large JSON/body handling in DLL:

- Do not trim body values.
- Do not log body values.
- Avoid full deserialization of arbitrary `mailRequestJson` just to validate it.
- If using `JavaScriptSerializer`, set `MaxJsonLength=int.MaxValue` for this mail path.
- For `SendMailJson`, lightweight object-shape validation is enough before sending.

Deployment note:

- Rebuild the DLL.
- Register COM on the AOS/client machine as required by the current deployment.
- Reimport the type library in Axapta if early binding or cached COM signatures are used.

## Postman tests

Create or update a new collection version instead of mutating a stable old baseline:

```text
.codex/Postman/DEV/IND_INTERNAL_API_DEV_V02.postman_collection.json
```

Add a folder:

```text
Mail
```

Add two requests against the same endpoint:

```text
Send Mail - Simple
Send Mail - Extended
```

Both requests must:

- Login/authenticate using the existing Postman auth variables or scripts.
- Call `POST /api/internal/v1/mail/messages`.
- Send `Content-Type: application/json`.
- Set or reuse a correlation ID.
- Assert a successful response when configured Graph credentials are valid.
- Store useful response values, such as provider status and correlation ID.

Simple test body:

- `from`
- `to`
- `subject`
- `htmlBody` or `textBody`
- metadata

Extended test body:

- `from.displayName`
- `to`
- `cc`
- `bcc`
- `replyTo`
- `subject`
- `htmlBody`
- `textBody`
- `saveToSentItems`
- `importance`
- metadata

Use collection variables with placeholders for real email addresses. Do not commit personal or secret values as defaults.

## Documentation updates

Update:

```text
.codex/ENDPOINTS.md
README.md
INDInternalApiClient/README.md
.codex/IND_INTERNAL_API_CLIENT_DLL.md
scripts/set-intserv-machine-all-env.ps1
.codex/Postman/DEV/IND_INTERNAL_API_DEV_V02.postman_collection.json
```

Document:

- `POST /api/internal/v1/mail/messages`.
- Required auth scope `internal.mail.send`.
- Full request contract.
- Minimal/simple request contract.
- Extended fields `cc`, `bcc`, `replyTo`, `importance`, `saveToSentItems`.
- Response contract.
- Error codes.
- Graph `202 Accepted` behavior.
- Required `INTSERV_GRAPH_*` keys.
- COM `SendMail`, `SendMailEx`, and `SendMailJson`.
- Large body handling and provider limit caveat.
- Postman V02 collection and both test requests.

## Verification

Build:

```powershell
.\scripts\build-internal-api.ps1 -Configuration Debug
```

or for deployment:

```powershell
.\scripts\build-internal-api.ps1 -Configuration Release
```

If the COM client project is not included in the script, build it separately.

Manual checklist:

- Auth without `internal.mail.send` is rejected.
- Missing Graph config returns `MAIL_NOT_CONFIGURED`.
- Missing `from`, `to`, `subject`, or body returns validation error.
- Invalid To/CC/BCC/Reply-To email returns validation error and does not partially send.
- Simple request calls Graph `/users/{fromEmail}/sendMail`.
- Extended request maps CC, BCC, Reply-To, saveToSentItems, and importance.
- Graph `202` maps to `acceptedByProvider=true`.
- Graph `401/403/429/5xx` maps to structured errors and sanitized logs.
- `SendMailJson` can authenticate and call the endpoint with a raw JSON payload.
- `SendMail` can authenticate and send a simple email.
- `SendMailEx` can authenticate and send an extended email.
- Bodies are not trimmed or logged.
- Postman V02 simple and extended requests run against DEV when Graph keys are configured.

## Out of scope

Do not implement:

- Expense sheet recipient resolution.
- Expense sheet link generation.
- Approval workflow changes.
- Paid remittance workflow changes.
- CRM app routes.
- Email localization.
- Durable retry/outbox unless the project already has one and the user explicitly asks to use it.
