# Prompt for Codex: Expense Sheet Email Deep-Link Resolver in IND_CRM_APP

> Historical implementation prompt. It is not a current functional or technical source of truth. Use `docs/expense-sheet-email-link-resolver-2026-05-25.md` for the as-built web resolver.

Use this prompt in project `C:\INDProjects\IND_CRM_APP`.

Date: 2026-05-27
Version: 3

## Objective

Implement or verify only the CRM web deep-link resolver used by expense-sheet notification emails.

`IND_CRM_APP` must not send emails, must not call Microsoft Graph, and must not call `IND_INTERNAL_API` for mail. Expense-sheet notification decisions and sending are owned by Axapta through `INDCRMExpenseSheetService`. The web app only receives a link, validates the authenticated user context, optionally switches company, and opens the existing expense-sheet detail screen.

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

Out of scope:

- Microsoft Graph configuration.
- `INTSERV_GRAPH_*` keys.
- `INDCRM_INTERNAL_API_*` keys.
- Email templates beyond resolver UI/error messages.
- Expense-sheet notification trigger rules.
- Axapta COM or DLL changes.
- Any action token or one-click approval behavior.

Related ownership:

- `IND_INTERNAL_API`: generic Graph mail transport.
- Axapta/`INDCRMExpenseSheetService`: expense-sheet status notification events and emails.
- `IND_CRM_API`: backend context API that calls Axapta.
- `IND_CRM_APP`: `/Gastos/ExpenseSheetLink` resolver.

## Required context to read first

Read current app flow before editing:

```text
Program.cs
Authentication/login controller and view
Existing returnUrl handling
Existing company switch services/controllers
Existing gastos controllers, views, route definitions, and detail navigation
Existing module authorization filters
Existing API client used by the expense-sheet detail page
Existing localization resource files
```

Use existing patterns for auth, return URL preservation, company switching, TempData/toasts, localization, and module authorization.

## Route contract

Add or confirm this explicit route:

```text
GET /Gastos/ExpenseSheetLink
```

Query parameters:

```text
hojaGastosId      required
targetCompanyId  required
source           optional, untrusted trace metadata only
```

Examples:

```text
/Gastos/ExpenseSheetLink?hojaGastosId=HG000055&targetCompanyId=es01&source=axapta
/Gastos/ExpenseSheetLink?hojaGastosId=HG000055&targetCompanyId=es01&source=crm-api
/Gastos/ExpenseSheetLink?hojaGastosId=HG000055&targetCompanyId=es01&source=email
```

Do not authorize based on `source`.

If route order matters, register this literal route before broad parameterized `Gastos` routes.

## Required behavior

1. Validate `hojaGastosId` and `targetCompanyId`.
2. If unauthenticated, redirect to login preserving the full local resolver URL as `returnUrl`.
3. After login, return to the same resolver URL with query string intact.
4. Validate that the authenticated user can access `targetCompanyId`.
5. Switch active company/session context to `targetCompanyId` when needed using the existing company switch mechanism.
6. Validate that the user can access the expense sheet using the same backend/API path as the existing detail page.
7. Redirect to `/Gastos/ExpenseSheetDetail?hojaGastosId={id}` on success.
8. On failure, show a localized message and redirect to a safe existing page such as the expense-sheet list or home.

Do not create a landing page or explanatory screen.

## Security requirements

- Treat all query parameters as untrusted.
- Validate `returnUrl` is local before redirecting.
- Prevent open redirects.
- Do not expose stack traces or raw backend errors.
- Do not leak more sheet/company detail than normal app behavior.
- Do not mutate the expense sheet from this route.
- Do not use `source` to skip authorization.

## Localization

Add or verify resolver messages in every supported resource file:

```text
ExpenseSheetLink_InvalidLink
ExpenseSheetLink_CompanyAccessDenied
ExpenseSheetLink_CompanySwitchFailed
ExpenseSheetLink_SheetAccessDenied
ExpenseSheetLink_SheetNotFound
ExpenseSheetLink_ResolveFailed
ExpenseSheetLink_CompanySwitched
```

Supported languages:

```text
neutral
en
es-ES
eu-ES
it
pt
zh-Hans
```

## Documentation updates

Document:

- `/Gastos/ExpenseSheetLink`.
- Required query parameters.
- Login preservation behavior.
- Company switch behavior.
- Final redirect route.
- Failure behavior.
- Explicit statement that the link is navigation only.
- Explicit statement that emails are sent by Axapta/backend, never by the web app.

## Verification

Run the established build/test workflow for `IND_CRM_APP`.

Manual checklist:

- Logged-out user opens resolver, logs in, and returns to the same resolver URL.
- Logged-in user in target company redirects to detail.
- Logged-in user in another allowed company switches context and redirects to detail.
- Missing `hojaGastosId` fails safely.
- Missing `targetCompanyId` fails safely.
- User without target company access is denied.
- User without sheet access is denied.
- Nonexistent sheet is handled safely.
- Final success URL is `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.
- No approval, rejection, payment, submit, or update action happens from this resolver.
- No email send happens from the web app.
