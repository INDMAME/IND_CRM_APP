# Expense Sheet Email Deep Links and Notifications

Date: 2026-05-22
Scope: `IND_CRM_API` and `IND_CRM_APP`

## Goal

Define the technical implementation for expense sheet email notifications sent through Microsoft Graph and for email links that open the target expense sheet after login, including company context switching.

The email button is only a navigation aid. Opening the link must never approve, reject, undo, or mutate the expense sheet. The user must land on the existing expense sheet detail page, and the current application permissions and status policy decide what actions are available.

## Current State

### Web project

- Project path: `C:\INDProjects\IND_CRM_APP`.
- MVC auth is configured in `Program.cs` with Cookie + OpenID Connect.
- `Web/Controllers/System/AuthController.cs` already has `EntraLogin(string? returnUrl = null, bool force = false)` and uses `Url.IsLocalUrl(returnUrl)`, but several entry points lose the original URL before calling it.
- `Web/Views/Auth/Login.cshtml` renders the Microsoft login link without passing the original `returnUrl`.
- `App/Infrastructure/Security/Filters/INDModuleAuthorizeFilter.cs` redirects unauthenticated users to `Auth/Login` without `returnUrl`.
- `App/Middleware/TokenRefreshMiddleware.cs` redirects expired non-API sessions to `/Auth/Login` without preserving the current URL.
- `Web/Controllers/Gastos/GastosController.cs` has page actions that redirect to login without `returnUrl` when the token is missing.
- Expense sheet detail page:
  - MVC page action: `GastosController.ExpenseSheetDetail(string hojaGastosId, string mode = "")`.
  - View: `Web/Views/Gastos/ExpenseSheetDetail.cshtml`.
  - React source: `Web/wwwroot/react/src/pages/gastos/detail`.
  - Detail API from React: `GET /api/crm/expensesheets/{hojaGastosId}` via `expenseApi.ts`.
- Expense sheet update flow:
  - React mutation: `Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailMutations.ts`.
  - Web proxy action: `GastosController.ApiExpenseSheetUpdate`.
  - Web route: `PUT /api/crm/expensesheets/{hojaGastosId}` in `Program.cs`.
  - Current web-side validation uses `ValidateExpenseSheetMutationAsync` and `ResolveExpenseSheetMutationPolicy`.
- Company context:
  - Selected company is stored in session with keys such as `INDCompanySelected` and `INDCompanySelectionSource`.
  - `Web/Controllers/System/INDCompanyController.cs` changes company with `SetCompany`, clears context cache with `ClearContextCache(preserveCompanySelection: true)`, and refreshes with `EnsureContextAsync()`.
  - `INDModuleAuthorizeFilter.IsForcedCompanyChange` treats query/route/path company values as forced company changes and redirects to Home when they differ from the selected company.
  - The filter checks query names `company`, `companyId`, `indCompany`, and `indCompanyId`. Do not put these names on the final expense sheet detail URL.

### API project

- Project path: `C:\INDProjects\IND_CRM_API`.
- Expense sheet controller: `Controllers/CRM/CrmExpenseSheetsController.cs`.
- API route prefix: `api/crm/expensesheets`.
- Status/header update endpoint: `PUT /api/crm/expensesheets/{hojaGastosId}` through `UpdateExpenseSheetHeader`.
- Request contract: `Contracts/Requests/UpdateExpenseSheetHeaderRequest.cs`.
- Detail contract: `Contracts/Responses/ExpenseSheetDetailDto.cs`.
- Dependency registration: `App_Start/DependencyConfig.cs`.
- Configuration helper: `Helpers/AppSettingsHelper.cs`.
- No existing Graph, mail, or notification service was found in the API project.

## Target Flow

1. A status-changing process updates an expense sheet through `IND_CRM_API`.
2. The API detects whether the operation produced a relevant status transition.
3. If the transition should notify someone, the API builds an expense sheet notification command.
4. The API sends the email through Microsoft Graph.
5. The email CTA points to a web deep-link resolver, not directly to the detail page.
6. If the user is not authenticated, the web redirects to login with a safe local `returnUrl`.
7. After Entra login, the web returns to the resolver URL.
8. The resolver validates the requested company and module access for the logged user.
9. If needed, the resolver switches the session company to the expense sheet company.
10. The resolver redirects to the canonical detail URL:

```text
/Gastos/ExpenseSheetDetail?hojaGastosId={hojaGastosId}
```

## Deep-Link URL Contract

Use this email URL shape:

```text
{INDCRM_WEB_BASE_URL}/Gastos/ExpenseSheetLink?hojaGastosId={encodedHojaGastosId}&targetCompanyId={encodedCompanyId}&source=email
```

Rules:

- `hojaGastosId` is required.
- `targetCompanyId` is required.
- `source=email` is optional and only for tracing/analytics.
- Do not use `company`, `companyId`, `indCompany`, or `indCompanyId` as query parameter names because the current company guard uses those names.
- Do not include tokens, one-time action approvals, or privileged commands in the URL.
- The final redirected detail URL must not include the company id.
- `INDCRM_WEB_BASE_URL` is the existing machine variable used as the public web base URL for DEV and PROD.
- `INDCRM_BASE_URL` is the API base URL and must not be used for the email CTA.

## Web Implementation Specification

### 1. Preserve returnUrl through login

Update these files:

- `Web/Controllers/System/AuthController.cs`
- `Web/Views/Auth/Login.cshtml`
- `App/Infrastructure/Security/Filters/INDModuleAuthorizeFilter.cs`
- `App/Middleware/TokenRefreshMiddleware.cs`
- Targeted token-missing redirects in MVC controllers, starting with `Web/Controllers/Gastos/GastosController.cs`

Required behavior:

- `AuthController.Login` must accept `string? returnUrl`.
- If the user is already authenticated and `returnUrl` is safe, redirect to it instead of `/Home/Index`.
- Store the safe value in `ViewBag.ReturnUrl` so the Razor view can pass it into the Microsoft login link.
- `Login.cshtml` must pass `asp-route-returnUrl` to `Auth/EntraLogin`.
- `AuthController.EntraLogin` can keep the existing `Url.IsLocalUrl` validation, but the validation should be centralized to avoid divergent rules.
- Form login, if kept, must also post and honor the same safe `returnUrl`.
- Unauthenticated redirects must include the current local path and query:

```text
/Auth/Login?returnUrl=/Gastos/ExpenseSheetLink%3FhojaGastosId%3D...%26targetCompanyId%3D...
```

Recommended helper:

- Add a small helper/service for local return URL handling, for example under `App/Infrastructure/Security/Auth`.
- It should expose:
  - `BuildCurrentLocalUrl(HttpRequest request)`
  - `NormalizeLocalReturnUrl(IUrlHelper url, string? returnUrl, string fallback = "/Home/Index")`

Validation rules:

- Accept only local URLs.
- Reject external absolute URLs.
- Reject protocol-relative values like `//host/path`.
- Reject auth logout/signout destinations.
- Prefer `/Home/Index` as fallback.

### 2. Add an expense sheet email link resolver

Add a dedicated MVC controller:

```text
Web/Controllers/Gastos/ExpenseSheetLinkController.cs
```

Add an explicit route in `Program.cs` before the default route:

```csharp
app.MapControllerRoute(
    name: "expense-sheet-email-link",
    pattern: "Gastos/ExpenseSheetLink",
    defaults: new { controller = "ExpenseSheetLink", action = "Index" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("GET") }
);
```

Action contract:

```csharp
public async Task<IActionResult> Index(string hojaGastosId, string targetCompanyId, string source = "")
```

Required behavior:

- If `hojaGastosId` or `targetCompanyId` is missing, redirect to Home with a localized invalid-link message.
- If the user is not authenticated, redirect to `Auth/Login` with `returnUrl` set to the full current resolver URL.
- Call `IIndAuthContextService.EnsureContextAsync()`.
- Validate that `targetCompanyId` exists in the current user's `IndWebContext.Companies`.
- Validate that the target company has at least `View` access to `GASTOS_HOJA_GASTO`.
- If the selected company differs from `targetCompanyId`:
  - Set session `INDCompanySelected = targetCompanyId`.
  - Set session `INDCompanySelectionSource = "user"`.
  - Clear context cache with `ClearContextCache(preserveCompanySelection: true)`.
  - Refresh context with `EnsureContextAsync(forceRefresh: true)` if supported, otherwise call `EnsureContextAsync()` after clearing.
  - Store a one-shot warning/info TempData message to tell the user that the company changed to open the expense sheet from the email.
- Redirect to:

```text
/Gastos/ExpenseSheetDetail?hojaGastosId={encodedHojaGastosId}
```

If access fails:

- Redirect to `/Home/Index`.
- Use the existing permission modal pattern (`TempData["IndPermissionRedirectMessage"]`) for permission errors.
- Use the existing ActionMark warning/error helpers if the error is not a permission issue.

### 3. Adjust the module authorization filter for the resolver

`INDModuleAuthorizeFilter` currently evaluates the selected company before an action can switch company. That can block a valid email link when the current session company is not the target company or does not expose Gastos access.

Add a narrow bypass for the resolver after authentication and context bootstrap, but before current-company module validation.

Expected placement in `OnActionExecutionAsync`:

1. Keep static/auth bypasses as they are.
2. Keep unauthenticated handling.
3. Keep `EnsureContextAsync()` and context failure handling.
4. If action is `ExpenseSheetLink.Index`, call `await next()` and return.
5. Continue existing selected-company, forced-company, and module validation for every other route.

Important:

- Do not add `/Gastos/ExpenseSheetLink` to the global static bypass path.
- The resolver action must perform its own target-company access validation.
- The resolver should not trust the URL just because the API generated it.

### 4. Company switch UX and tab behavior

Company selection is session-wide. If a user opens the email link in a second browser tab and the link switches company, the first tab uses the same session cookie and is affected.

Expected behavior:

- The first tab may still visually show the previous company until it reloads or makes a request.
- Any new server request or API call from that first tab will use the new selected company.
- This can make stale UI confusing if the first tab stays open on another company.

Required mitigation:

- The email-link resolver must show a visible warning/info message when it switches company.
- The message should say that the company was changed to open the expense sheet.
- Keep this as an explicit user-visible event, not a silent switch.

Optional future mitigation:

- Add a lightweight client-side session-company freshness check in the layout and show a reload prompt when the server company changed.
- A true per-tab company context would avoid this, but it is a large architecture change because the current web and API clients are built around session-level `INDCompanySelected`.

### 5. Localization

Add localized keys to all `INDSharedResource.*.resx` files used by the project.

Suggested keys:

- `ExpenseSheetLink_InvalidLink`
- `ExpenseSheetLink_TargetCompanyUnavailable`
- `ExpenseSheetLink_TargetCompanyNoAccess`
- `ExpenseSheetLink_CompanyChanged`
- `ExpenseSheetLink_OpenFailed`

Suggested English default text:

- `The expense sheet link is invalid or incomplete.`
- `You do not have access to the company required by this expense sheet.`
- `You do not have access to expense sheets in the target company.`
- `Your company was changed to {0} to open expense sheet {1}.`
- `The expense sheet could not be opened from this link.`

## API Implementation Specification

### 1. Notification ownership

The API should own email notification creation because the real status mutation lives there. The web should not send the email after proxying the status update, because other future status-changing processes could bypass the web.

Initial trigger:

- `Controllers/CRM/CrmExpenseSheetsController.cs`
- Method: `UpdateExpenseSheetHeader`
- Trigger only after the AX update succeeds.

No public email endpoint is required for v1 unless there is an explicit resend/admin requirement.

### 2. Add notification services

Recommended new API files:

```text
Services/Interfaces/IExpenseSheetNotificationService.cs
Services/Interfaces/IExpenseSheetRecipientResolver.cs
Services/Interfaces/IGraphMailClient.cs
Services/ExpenseSheetNotificationService.cs
Services/ExpenseSheetRecipientResolver.cs
Services/GraphMailClient.cs
Contracts/Notifications/ExpenseSheetStatusChangedNotification.cs
Contracts/Notifications/ExpenseSheetEmailRecipient.cs
Contracts/Notifications/ExpenseSheetNotificationResult.cs
```

Register them in:

```text
App_Start/DependencyConfig.cs
```

Recommended dependency style:

- Keep the existing manual DI dictionary.
- Avoid adding the Microsoft Graph SDK in v1 unless there is a strong reason.
- Use `HttpClient` directly for token acquisition and `sendMail` to keep dependency impact low.

### 3. Status transition detection

`UpdateExpenseSheetHeaderRequest` can include `expenseSheetStatus`, but the API needs a reliable before/after transition.

Recommended v1:

1. Before calling `INDCRMExpenseSheetService.updateExpenseSheetHeader`, read a minimal current snapshot for the same `company`, `axUserId`, and `hojaGastosId`.
2. Extract at least:
   - `HojaGastosId`
   - `ExpenseSheetStatus`
   - `UserId`
   - `Description`
   - `TotalAmount`
   - `CurrencyCode`
3. Execute the AX update.
4. If the update succeeds and `body.expenseSheetStatus` is present, compare previous status with requested status.
5. Notify only if the status changed and the transition is configured for notification.

If AX can return the canonical updated status in the update response, prefer that over trusting the request value.

Performance impact:

- This adds at least one AX read to each status update where notification detection is enabled.
- If this becomes expensive, add a lighter AX method dedicated to notification snapshots.

### 4. Transition policy

Use a configuration-backed policy, not hardcoded recipients in the controller.

Known status codes from the existing app:

- `0` = Draft
- `1` = Approval requested
- `2` = Approved
- `3` = Rejected
- `4` = Paid

Suggested default event names:

- `ExpenseSheetApprovalRequested`
- `ExpenseSheetApproved`
- `ExpenseSheetRejected`
- `ExpenseSheetApprovalUndo`
- `ExpenseSheetRequestUndo`
- `ExpenseSheetRejectionUndo`

Do not send an email for:

- Header-only updates with no status change.
- Repeated updates where `fromStatus == toStatus`.
- Failed AX updates.
- Missing recipients, unless business decides this should be treated as an error.

### 5. Recipient resolution

This is the main business decision still to close.

Recommended approach:

- Add an API-side resolver that gets recipients from the authoritative workflow source.
- Do not infer approvers only from the web session.
- Prefer an AX/CRM method that returns the recipients for a given transition:

```text
getExpenseSheetNotificationRecipients(company, hojaGastosId, fromStatus, toStatus, actorAxUserId)
```

Resolver output:

```csharp
public sealed class ExpenseSheetEmailRecipient
{
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public string Role { get; set; } // Owner, Approver, Manager, Actor, Observer
}
```

Rules:

- Drop empty or invalid email addresses.
- De-duplicate recipients case-insensitively.
- Do not send to the actor unless the transition policy says so.
- Log missing recipient cases with `traceId`, `company`, `hojaGastosId`, `fromStatus`, and `toStatus`.

### 6. Microsoft Graph mail client

Use Microsoft Graph `sendMail`.

Official references:

- Microsoft Graph `sendMail`: https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0
- Microsoft identity platform client credentials flow: https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow
- Exchange Online application RBAC: https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac
- Application access policies, legacy option: https://learn.microsoft.com/en-us/exchange/permissions-exo/application-access-policies

Authentication:

- App registration in Microsoft Entra.
- Application permission: `Mail.Send`.
- Admin consent required.
- Prefer certificate-based credentials for production.
- Client secret is acceptable only if the existing infrastructure cannot handle certificates yet.

Security:

- Scope the app to the sender mailbox with Exchange Online Application RBAC when available.
- If RBAC cannot be used, use Application Access Policy as the legacy restriction mechanism.
- Do not grant broad Graph permissions such as `Mail.ReadWrite`.

Token request:

```text
POST https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id={clientId}
&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default
&client_secret={clientSecret}
&grant_type=client_credentials
```

Mail request:

```text
POST https://graph.microsoft.com/v1.0/users/{senderUserPrincipalName}/sendMail
Authorization: Bearer {accessToken}
Content-Type: application/json
```

Payload shape:

```json
{
  "message": {
    "subject": "Expense sheet HG-000123 requires your review",
    "body": {
      "contentType": "HTML",
      "content": "<html>...</html>"
    },
    "toRecipients": [
      {
        "emailAddress": {
          "address": "user@example.com"
        }
      }
    ]
  },
  "saveToSentItems": false
}
```

Graph success response:

- `202 Accepted` means Graph accepted the send request.
- It does not prove that the message was delivered to the recipient mailbox.

### 7. Email template

Email clients do not reliably support real buttons, so the CTA should be an HTML link styled as a button.

Template requirements:

- Subject includes the expense sheet id and the transition meaning.
- Body includes:
  - Expense sheet id.
  - Company display name or company id.
  - Current status.
  - Actor, if allowed by privacy rules.
  - Status comment, if allowed by privacy rules.
  - CTA link to `{INDCRM_WEB_BASE_URL}/Gastos/ExpenseSheetLink?...`.
  - Fallback plain URL under the CTA.
- Avoid including secrets, bearer tokens, or privileged commands.
- Avoid including sensitive amounts unless business confirms it is acceptable for email.

### 8. Configuration

Use `AppSettingsHelper` so values can come from `App.config` or machine environment variables.

The URL used in the email must reuse the existing environment split already defined by `C:\INDProjects\IND_CRM_API\scripts\set-indcrm-machine-env.ps1`.

Existing URL keys to reuse:

```text
INDCRM_WEB_BASE_URL       Public web base URL used by email links.
INDCRM_WEB_PUBLIC_HOST    Public web host, useful for diagnostics/fallback validation.
INDCRM_WEB_PUBLIC_PORT    Public web port, useful for diagnostics/fallback validation.
INDCRM_BASE_URL           API base URL. Do not use it for email CTA links.
ApiSettings__BaseUrl      Web-to-API base URL used by IND_CRM_APP.
```

Current environment defaults in the API bootstrap script:

```text
DEV  WEB: https://dev.insertec.biz:2053/  API: https://dev.insertec.biz:2083/
PROD WEB: https://crm.insertec.biz:7702/  API: https://crm.insertec.biz:7776/
```

Implementation rule:

- The notification service should require `INDCRM_WEB_BASE_URL` to build the email link.
- Do not introduce `ExpenseNotifications:WebBaseUrl` or another parallel base URL unless the existing key is removed from the platform.
- If `INDCRM_WEB_BASE_URL` is missing or invalid, skip email sending in best-effort mode and log a configuration error with `traceId`.
- Keep `INDCRM_WEB_PUBLIC_HOST` and `INDCRM_WEB_PUBLIC_PORT` as validation/diagnostic inputs, not as the main source of truth when `INDCRM_WEB_BASE_URL` exists.

New notification keys:

```text
GraphMail:Enabled                         -> INDCRM_GRAPH_MAIL_ENABLED
GraphMail:TenantId                        -> INDCRM_GRAPH_TENANT_ID
GraphMail:ClientId                        -> INDCRM_GRAPH_CLIENT_ID
GraphMail:ClientSecret                    -> INDCRM_GRAPH_CLIENT_SECRET
GraphMail:SenderUserPrincipalName         -> INDCRM_GRAPH_SENDER_UPN
GraphMail:BaseUrl                         -> INDCRM_GRAPH_BASE_URL
GraphMail:TokenUrlTemplate                -> INDCRM_GRAPH_TOKEN_URL_TEMPLATE
ExpenseNotifications:Enabled              -> INDCRM_EXPENSE_NOTIFICATIONS_ENABLED
ExpenseNotifications:BestEffort           -> INDCRM_EXPENSE_NOTIFICATIONS_BEST_EFFORT
ExpenseNotifications:NotifyTransitions    -> INDCRM_EXPENSE_NOTIFY_TRANSITIONS
```

Suggested defaults:

- `GraphMail:Enabled = false`
- `GraphMail:BaseUrl = https://graph.microsoft.com/v1.0`
- `GraphMail:TokenUrlTemplate = https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`
- `ExpenseNotifications:BestEffort = true`

Do not commit real tenant ids, client ids, secrets, or sender addresses if they are environment-specific.

### 9. Best-effort behavior

For v1, notification sending should be best-effort.

Meaning:

- The expense sheet status update remains the primary business operation.
- If AX updated the status successfully but email sending fails, the API should still return success for the status update.
- The notification failure must be logged with enough data to investigate.
- Graph `429`, `5xx`, token errors, invalid recipients, or malformed template errors should not roll back the status change.

Why this fits this feature:

- The email button only navigates the user to the detail page.
- The actual approval/rejection action is manual and still guarded by the app.
- Missing one email is operationally undesirable, but it should not corrupt the expense sheet state.

If the business later requires guaranteed delivery or retry:

- Add an outbox table/queue in `IND_CRM_API`.
- Write the notification event to outbox in the same successful status-change flow.
- Process the outbox asynchronously with retry and dead-letter handling.

Suggested outbox fields:

```text
NotificationId
AggregateType
AggregateId
EventType
CompanyId
PayloadJson
Status
Attempts
NextAttemptUtc
LastError
CreatedUtc
SentUtc
TraceId
```

## API Response Impact

Do not change the current success shape of `UpdateExpenseSheetHeader` in v1.

Current successful data can remain:

```json
{
  "HojaGastosId": "HG-000123"
}
```

Optional non-breaking addition:

```json
{
  "HojaGastosId": "HG-000123",
  "Notification": {
    "Attempted": true,
    "AcceptedByProvider": true,
    "BestEffort": true
  }
}
```

Only add this if the web needs to show notification diagnostics. Otherwise keep notification details server-side only.

## Security Considerations

- The email link is not an authorization grant.
- The link must not contain access tokens, refresh tokens, approval tokens, or user impersonation data.
- The resolver must validate the logged user against the target company and `GASTOS_HOJA_GASTO`.
- `returnUrl` must be local-only to avoid open redirects.
- Target company switching must be explicit and logged.
- Graph credentials must be stored outside source control.
- Scope Graph mail permissions to the sender mailbox.
- Log email addresses only when needed and avoid logging full email body HTML.

## Impact Assessment

### Web impact

Risk level: medium.

Reasons:

- Login redirection is a global auth behavior.
- The returnUrl fix touches auth, filters, middleware, and some page redirects.
- The company switch affects the whole browser session, including already-open tabs.
- The resolver must be carefully excluded from current-company module validation, but only after authentication/context bootstrap.

Expected positive impact:

- Direct links from email work whether the user is already logged in or not.
- The app can land on the intended expense sheet after Entra login.
- Cross-company links become explicit and auditable.

### API impact

Risk level: medium.

Reasons:

- The status update endpoint gets a side effect after successful AX update.
- Transition detection may add an extra AX read.
- Graph can fail, throttle, or accept without guaranteeing final delivery.
- Recipient resolution depends on business data not currently exposed in the inspected DTOs.

Expected positive impact:

- Notifications are centralized where the real state transition occurs.
- Future backend processes can reuse the same notification service.
- Web remains responsible for navigation and permissions, not email delivery.

### Infrastructure impact

Risk level: medium.

Required:

- Entra app registration.
- Graph `Mail.Send` application permission.
- Admin consent.
- Sender mailbox.
- Exchange Online RBAC/Application Access Policy restricting the app.
- Environment variables or secure configuration for Graph credentials.
- Public web base URL available to the API.

## Test Plan

### Web tests

- Unauthenticated user opens email link:
  - Goes to `/Auth/Login?returnUrl=...`.
  - Microsoft login preserves the resolver URL.
  - User returns to resolver.
  - Resolver switches company if needed.
  - User lands on `/Gastos/ExpenseSheetDetail?hojaGastosId=...`.
- Authenticated user, same company:
  - Resolver redirects directly to detail.
  - No company-changed message.
- Authenticated user, different company:
  - Resolver switches company.
  - Message is shown.
  - User lands on detail.
- Authenticated user without target company:
  - Redirects Home.
  - Permission/invalid access message shown.
- Authenticated user with target company but no `GASTOS_HOJA_GASTO` view access:
  - Redirects Home.
  - Permission message shown.
- External returnUrl attempt:
  - Is rejected and falls back to `/Home/Index`.
- First tab in company A, email link opens company B in second tab:
  - Second tab switches company and opens detail.
  - First tab uses company B on next request/refresh.

### API tests

- Status update with no status change does not send notification.
- Status update with configured transition sends one notification command.
- AX update failure sends no notification.
- Missing recipients logs and skips notification.
- Graph token failure is logged and does not fail status update when best-effort is true.
- Graph `sendMail` failure is logged and does not fail status update when best-effort is true.
- Graph disabled configuration skips sending and logs as disabled.
- Recipient de-duplication works case-insensitively.
- Email link contains encoded `hojaGastosId` and `targetCompanyId`.

### Manual validation

- Verify email CTA opens correctly from Outlook desktop and Outlook web.
- Verify fallback URL is visible/clickable.
- Verify mobile browser login returns to the resolver.
- Verify special characters in `hojaGastosId` are URL encoded.
- Verify no sensitive token appears in the email source.

## Questions To Close Before Implementation

1. Which status transitions must notify, and who receives each notification?
2. What is the authoritative source for recipient email addresses: AX, CRM API context, Entra, or another table/service?
3. Should v1 stay best-effort, or is retry/outbox required from the first release?
4. What exact public web base URL should the API use per environment?
5. Should email bodies include amount/project/comment details, or only the minimal link and status context?
6. Should the actor receive a copy of the email for audit/confirmation, or only the target approver/owner?

## Recommended Implementation Order

1. Implement and test returnUrl preservation in `IND_CRM_APP`.
2. Implement the expense sheet resolver and company switch validation.
3. Validate the resolver manually with same-company, cross-company, unauthenticated, and no-access cases.
4. Add API notification service interfaces and disabled-by-default configuration.
5. Add transition detection after successful `UpdateExpenseSheetHeader`.
6. Add recipient resolver once the source is confirmed.
7. Add Graph mail client and environment configuration.
8. Enable best-effort email in a non-production environment.
9. Run end-to-end tests from status update to email CTA to expense sheet detail.
