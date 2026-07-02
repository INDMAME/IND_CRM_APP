# Expense Sheet Email Deep Links and Notifications

Date: 2026-05-27
Scope: `IND_CRM_APP` web resolver alignment with iteration 1 documents.
Iteration source: `C:\INDProjects\IND_INTERNAL_API\docs\*_iteracion1.md`

## Goal

Keep `IND_CRM_APP` focused on resolving expense sheet email links into the existing CRM detail screen after authentication, company validation, and sheet access validation.

The email link is only a navigation aid. Opening it must never approve, reject, pay, cancel, submit, update, or otherwise mutate an expense sheet. The existing expense sheet detail page and the current permission/status policy continue to decide which actions the user may perform after the page opens.

## Current Ownership

- Axapta owns expense sheet status transition detection, notification recipients, subject/body construction, and deep-link construction through `INDCRMExpenseSheetService`.
- `IND_INTERNAL_API` owns generic mail transport through its internal mail endpoint and Microsoft Graph integration.
- `IND_CRM_API` remains a backend-for-frontend/context API. It must keep expense sheet endpoints stable and must not send expense sheet notification emails directly.
- `IND_CRM_APP` owns only `GET /Gastos/ExpenseSheetLink`, which validates the authenticated web context and redirects to the existing detail page.

`IND_CRM_APP` must not call Microsoft Graph, must not call `IND_INTERNAL_API` for mail, and must not contain email notification rules.

## Link Contract

Email links generated outside the web app must use this shape:

```text
{CRMAppUrl}/Gastos/ExpenseSheetLink?hojaGastosId={id}&targetCompanyId={companyId}&source={source}
```

`CRMAppUrl` is the `INDDefaultParameters` value that stores the public CRM web endpoint. It must not be confused with the internal mail transport/API endpoint.

DEV endpoints:

```text
CRM web:      https://dev.insertec.biz:2053/
Internal API: https://dev.service.insertec.eu:2087/
```

Axapta link construction in `INDCRMExpenseSheetService::buildExpenseSheetWebLink` must resolve the web base from `INDDefaultParameters::find().CRMAppUrl`, trim whitespace, and remove trailing slashes before appending `/Gastos/ExpenseSheetLink`. It must not use `INDDefaultParameters.InternalAPIUrlService`.

Route:

```text
GET /Gastos/ExpenseSheetLink
```

Query parameters:

- `hojaGastosId`: required expense sheet id.
- `targetCompanyId`: required company id for the expense sheet.
- `source`: optional untrusted trace metadata only. Do not authorize from it.

Accepted example paths:

```text
/Gastos/ExpenseSheetLink?hojaGastosId=HG000059&targetCompanyId=ise&source=axapta-job
/Gastos/ExpenseSheetLink?hojaGastosId=HG000056&targetCompanyId=ise&source=axapta-job
/Gastos/ExpenseSheetLink?hojaGastosId=HG000055&targetCompanyId=es01&source=email
```

Final web route:

```text
/Gastos/ExpenseSheetDetail?hojaGastosId={id}
```

The final detail URL must not include company query parameters. Company context is a server-side session selection.

## Current Incident Notes

Observed on 2026-05-27:

- `https://dev.service.insertec.eu:2087/Gastos/ExpenseSheetLink?...` returns browser 404 because it targets `IND_INTERNAL_API`, not the CRM web app.
- `https://dev.insertec.biz:2053/Gastos/ExpenseSheetLink?...` reaches the web resolver correctly.
- `HG000056` with `targetCompanyId=ise` reached the resolver, but CRM API returned `CRM_EXPENSESHEET_NOT_FOUND` for selected company `ISE` and session AX user `MAME`.
- The AX row showed owner `UserId=IJI`; the resolver must keep using the normal detail API and must not grant access just because the URL exists.

## Permission Diagnostics

The link resolver and CRM API log the values used by the permission gates so access denials can be traced without weakening the rule.

Web CRM search strings:

```text
Expense sheet email link context resolved
Expense sheet email link company validation denied
Expense sheet email link module validation denied
Expense sheet email link detail validation started
Expense sheet email link detail validation denied
Expense sheet email link detail validation allowed
```

CRM API search tag:

```text
[EXPENSE-AUTHZ-DETAIL]
```

When AX denies detail access, `INDCRMExpenseSheetService::getExpenseSheet` returns diagnostic extras for API logging:

```text
stage=detail-access
rule=header.UserId==crmUserId&&header.HojaGastosId==hojaId
companyId={company}
axUserId={session AX user}
crmUserId={CRMUsuarioTable::Find(axUserId).UserId}
hojaGastosId={sheet id}
sheetExists={0|1}
sheetUserId={CRMHojaGastosTable.UserId}
sheetCreatedBy={CRMHojaGastosTable.INDCreatedByUserId}
sheetStatus={CRMHojaGastosTable.ExpenseSheetStatus}
```

These diagnostics are server-side only. The user-facing redirect message remains localized and generic.

## Implemented Web Flow

1. Validate `hojaGastosId` and `targetCompanyId`.
2. If the user is unauthenticated, redirect to `/Auth/Login` and preserve the full local resolver URL as `returnUrl`.
3. After login, return to the same resolver URL with the query string intact.
4. Load the authenticated Entra/web context.
5. Validate that `targetCompanyId` is available to the current user.
6. Validate that the target company grants at least view access to `GASTOS_HOJA_GASTO`.
7. If the selected company differs from `targetCompanyId`, update the existing session company selection and refresh context.
8. Validate sheet access by calling the existing expense sheet detail API path with the selected company header.
9. Redirect to `/Gastos/ExpenseSheetDetail?hojaGastosId={id}` on success.
10. Redirect safely with a localized message on invalid link, denied access, not found, switch failure, or upstream failure.

## Current CRM App Files

- `Program.cs`: maps literal `GET /Gastos/ExpenseSheetLink` before the default route.
- `Web/Controllers/Gastos/ExpenseSheetLinkController.cs`: validates link input, target company, module access, company switch, and sheet detail access.
- `App/Infrastructure/Security/Auth/LocalReturnUrlHelper.cs`: centralizes local-only `returnUrl` handling and rejects auth-exit paths.
- `Web/Controllers/System/AuthController.cs`: accepts and preserves safe `returnUrl` for login and Entra login.
- `Web/Views/Auth/Login.cshtml`: passes `returnUrl` into the Microsoft login link.
- `App/Infrastructure/Security/Filters/INDModuleAuthorizeFilter.cs`: lets only `ExpenseSheetLink.Index` run its own target-company validation after authentication/context bootstrap.
- `App/Resources/Infrastructure/Localization/INDSharedResource*.resx`: contains all `ExpenseSheetLink_*` localized messages.

## Security Rules

- Treat all query parameters as untrusted.
- Accept only local `returnUrl` values.
- Prevent open redirects and protocol-relative redirects.
- Do not expose stack traces or raw upstream errors to the user.
- Do not leak more sheet/company detail than the normal app behavior.
- Do not use `source` to skip authorization.
- Do not add action tokens or one-click approval/payment behavior to the link.

## Failure Messages

The resolver uses these localized keys:

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
INDSharedResource.resx
INDSharedResource.en.resx
INDSharedResource.es-ES.resx
INDSharedResource.eu-ES.resx
INDSharedResource.it.resx
INDSharedResource.pt.resx
INDSharedResource.zh-Hans.resx
```

## Regression-Sensitive Behavior

- Login and Entra return flow must preserve the full local resolver URL.
- Company selection is session-wide; opening an email link for another company changes the active company for the browser session.
- The resolver must show a company-switched message when it changes session company.
- The detail page must remain the only place where users manage the sheet.
- Existing Gastos detail/list API payloads and date contracts are unchanged.

## Verification Checklist

- Logged-out user opens resolver, signs in, and returns to the same resolver URL.
- Logged-in user already in target company lands on the detail route.
- Logged-in user in another allowed company switches context and lands on detail.
- Missing `hojaGastosId` fails safely.
- Missing `targetCompanyId` fails safely.
- User without target company access is denied safely.
- User without sheet access is denied safely.
- Nonexistent sheet is handled safely.
- Final success URL is `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.
- No approval, rejection, payment, submit, or update action happens from the resolver.
- No email send happens from the web app.
