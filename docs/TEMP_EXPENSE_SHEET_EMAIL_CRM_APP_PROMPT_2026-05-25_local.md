# Prompt for Codex: Expense Sheet Email Deep-Link Resolver in IND_CRM_APP

Local consolidated copy for IND_CRM_APP. Use this `_local.md` file as the local source of truth when comparing future prompt versions copied from other projects.

Use this prompt in project `C:\INDProjects\IND_CRM_APP`.

Date: 2026-05-26
Version: 2

## Objective

Implement only the CRM web deep-link resolver used by expense sheet notification emails.

`IND_CRM_APP` must not send emails, must not call Microsoft Graph, and must not call `IND_INTERNAL_API` for mail. Email sending is owned by backend services and Axapta. The web app only receives a link, validates the authenticated user context, optionally switches company, and opens the existing expense sheet detail screen.

Canonical email link:

```text
{INDCRM_WEB_BASE_URL}/Gastos/ExpenseSheetLink?hojaGastosId={id}&targetCompanyId={companyId}&source={source}
```

Final web detail route:

```text
/Gastos/ExpenseSheetDetail?hojaGastosId={id}
```

The resolver must never approve, reject, pay, submit, update, or mutate an expense sheet. It is navigation only.

## Project boundaries

This prompt covers only `IND_CRM_APP`.

Out of scope for this project:

- Microsoft Graph configuration.
- `INTSERV_GRAPH_*` keys.
- `INDCRM_INTERNAL_API_*` keys.
- Email templates beyond user-facing resolver error messages.
- Expense sheet notification trigger rules.
- Axapta COM or DLL changes.
- Any action token or one-click approval behavior.

Related ownership:

- `IND_INTERNAL_API` owns generic Graph mail transport.
- `IND_CRM_API` owns CRM-context notification orchestration.
- Axapta owns Axapta-originated triggers such as paid remittance notifications.
- `IND_CRM_APP` owns `/Gastos/ExpenseSheetLink`.

## Required context to read first

Read the current app flow before editing:

- `Program.cs`
- Authentication controller and login view.
- Existing middleware for token refresh and session handling.
- Existing company selection or company switch services/controllers.
- Existing gastos controllers, views, route definitions, and detail navigation.
- Existing authorization filters for modules/menu access.
- Existing API client used by the expense sheet detail page.
- Existing localization resource files.

Suggested files to inspect, adjusting names to the actual project structure:

```text
Program.cs
Web/Controllers/System/AuthController.cs
Web/Views/Auth/Login.cshtml
App/Infrastructure/Security/Filters/INDModuleAuthorizeFilter.cs
App/Middleware/TokenRefreshMiddleware.cs
Web/Controllers/Gastos/GastosController.cs
App/Resources/Infrastructure/Localization/INDSharedResource.resx
App/Resources/Infrastructure/Localization/INDSharedResource.en.resx
App/Resources/Infrastructure/Localization/INDSharedResource.es-ES.resx
App/Resources/Infrastructure/Localization/INDSharedResource.eu-ES.resx
App/Resources/Infrastructure/Localization/INDSharedResource.it.resx
App/Resources/Infrastructure/Localization/INDSharedResource.pt.resx
App/Resources/Infrastructure/Localization/INDSharedResource.zh-Hans.resx
```

Use existing app patterns for auth, return URL preservation, company switching, TempData/toasts, localization, and module authorization. Do not invent a parallel flow if one already exists.

## Route contract

Add or confirm this explicit route:

```text
GET /Gastos/ExpenseSheetLink
```

Query parameters:

```text
hojaGastosId      required, string or numeric according to current detail route
targetCompanyId  required, company/dataArea identifier
source           optional, trace/debug metadata only
```

Examples:

```text
/Gastos/ExpenseSheetLink?hojaGastosId=12345&targetCompanyId=es01&source=axapta
/Gastos/ExpenseSheetLink?hojaGastosId=12345&targetCompanyId=es01&source=crm-api
/Gastos/ExpenseSheetLink?hojaGastosId=12345&targetCompanyId=es01&source=email
```

Do not authorize based on `source`. Treat it as untrusted text.

If route order matters in the project, register this literal route before broad parameterized `Gastos` routes.

## Suggested implementation

Add a focused controller if the project style allows it:

```text
Web/Controllers/Gastos/ExpenseSheetLinkController.cs
```

Suggested action:

```csharp
[HttpGet]
public async Task<IActionResult> Index(string hojaGastosId, string targetCompanyId, string source)
```

If the project is MVC 5 instead of ASP.NET Core, use the equivalent `ActionResult` pattern and current async conventions.

Required behavior:

1. Validate that `hojaGastosId` and `targetCompanyId` are present.
2. If the user is not authenticated, redirect to login and preserve the full original local URL as `returnUrl`.
3. After login, return to the same resolver URL with all query parameters intact.
4. Validate that the authenticated user can access `targetCompanyId`.
5. Switch active company/session context to `targetCompanyId` when needed, using the existing company switch mechanism.
6. Validate that the user can access the specific expense sheet by using the same backend/API path used by the existing detail page whenever possible.
7. On success, redirect to the existing detail route:

```text
/Gastos/ExpenseSheetDetail?hojaGastosId={id}
```

8. On failure, show a localized message through the existing toast/TempData/error pattern and redirect to a safe existing route such as the expense sheet list or home.

Do not create a new landing page. Do not add cards, dashboards, marketing text, or instructional screens.

## Login and returnUrl handling

Preserve this exact URL through login:

```text
/Gastos/ExpenseSheetLink?hojaGastosId=12345&targetCompanyId=es01&source=axapta
```

Required checks:

- Login action accepts `returnUrl` if it does not already.
- Login form posts back the hidden `returnUrl` if the existing flow does not already preserve it.
- Successful login redirects only to a validated local URL.
- Missing or unsafe `returnUrl` falls back to the normal post-login route.
- Token refresh or session middleware does not drop the query string.

Never redirect to an absolute external URL from `returnUrl`.

## Company context

When the authenticated user opens a resolver link:

- If current company equals `targetCompanyId`, continue directly.
- If the user can access `targetCompanyId`, switch the session/current company using the existing company switch logic.
- If the user cannot access `targetCompanyId`, deny access with a localized message.

If the app already shows a company switch toast/message, reuse it. If not, add a subtle localized info message only when switching company helps avoid confusion.

The final detail route does not need `targetCompanyId` unless the existing detail route requires it. The company context should already be active before redirecting.

## Expense sheet access validation

The resolver must verify the sheet before redirecting to detail.

Preferred validation:

- Call the existing expense sheet detail API/service used by the detail page after company context is set.
- Treat not found, forbidden, or missing permissions as resolver failure.

Validation must ensure:

- The sheet exists.
- The sheet belongs to the target company.
- The current user has access according to existing backend rules.

Do not duplicate server-side authorization rules in the browser. Use the existing backend/API authorization surface.

## Authorization filters and middleware

Review whether module authorization blocks `/Gastos/ExpenseSheetLink` before company context is resolved.

Required behavior:

- Unauthenticated users are redirected to login with the original link preserved.
- Authenticated users without Gastos/expense sheet access are denied.
- Authenticated users without target company access are denied.
- Resolver permission must be at least as strong as the permission needed to open the expense sheet detail page.
- No weaker bypass route is introduced.

If a filter must be adjusted, keep the exception narrow to the resolver route and preserve the normal detail/list permissions.

## Localization

Add resolver messages to every supported resource file:

```text
ExpenseSheetLink_InvalidLink
ExpenseSheetLink_CompanyAccessDenied
ExpenseSheetLink_CompanySwitchFailed
ExpenseSheetLink_SheetAccessDenied
ExpenseSheetLink_SheetNotFound
ExpenseSheetLink_ResolveFailed
ExpenseSheetLink_CompanySwitched
```

Supported resource files:

```text
neutral .resx
en
es-ES
eu-ES
it
pt
zh-Hans
```

Use the existing wording style in each resource file. If an exact translation is not available, use a clear fallback phrase in that language rather than leaving a missing key.

## Security requirements

- Treat all query parameters as untrusted.
- Validate `returnUrl` is local before redirecting.
- Prevent open redirects.
- Do not expose internal stack traces or raw backend errors in the UI.
- Do not leak more sheet/company detail than normal app behavior.
- Do not mutate the expense sheet from this route.
- Do not add action tokens, signed approval URLs, or one-click workflow actions.
- Do not use `source` to skip authorization.

## Documentation updates

Update the app docs where routes or auth flows are documented.

Document:

- `/Gastos/ExpenseSheetLink`.
- Required query parameters.
- Login preservation behavior.
- Company switch behavior.
- Final redirect route.
- Failure behavior.
- Explicit statement that the link is navigation only.

## Verification

Run the established build/test workflow for `IND_CRM_APP`.

Manual checklist:

- Logged-out user opens resolver, logs in, and returns to the same resolver URL.
- Logged-in user in the target company redirects to detail.
- Logged-in user in another allowed company switches context and redirects to detail.
- Missing `hojaGastosId` fails with localized message.
- Missing `targetCompanyId` fails with localized message.
- User without target company access is denied.
- User without sheet access is denied.
- Nonexistent sheet is handled safely.
- Final success URL is `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.
- No approval, rejection, payment, submit, or update action happens from this resolver.
- No email send happens from the web app.
