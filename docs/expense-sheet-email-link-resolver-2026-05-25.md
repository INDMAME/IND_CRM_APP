# Expense Sheet Email Link Resolver

Date: 2026-05-27
Iteration source: `C:\INDProjects\IND_INTERNAL_API\docs\*_iteracion1.md`

## Ownership

`IND_CRM_APP` owns only the CRM web deep-link resolver.

The web app must not send expense sheet notification emails, call Microsoft Graph, or call `IND_INTERNAL_API` for mail. Expense sheet notification decisions and email sending are owned by Axapta through `INDCRMExpenseSheetService`; transport is delegated to `IND_INTERNAL_API`.

The email link is navigation only. It must never approve, reject, pay, cancel, submit, update, or otherwise mutate an expense sheet.

## Route

`GET /Gastos/ExpenseSheetLink`

Query parameters:

- `hojaGastosId`: required expense sheet id.
- `targetCompanyId`: required company id for the expense sheet.
- `source`: optional trace metadata only. It is not used for authorization.

Examples:

```text
/Gastos/ExpenseSheetLink?hojaGastosId=HG000059&targetCompanyId=ise&source=axapta-job
/Gastos/ExpenseSheetLink?hojaGastosId=HG000056&targetCompanyId=ise&source=axapta-job
/Gastos/ExpenseSheetLink?hojaGastosId=HG000055&targetCompanyId=es01&source=email
```

## URL Generation

Axapta must build the absolute email URL with the CRM web base URL, not with the internal mail/API transport URL.

- DEV CRM web base: `https://dev.insertec.biz:2053/`
- DEV internal API base: `https://dev.service.insertec.eu:2087/`

`INDCRMExpenseSheetService::buildExpenseSheetWebLink` resolves the web base from `INDDefaultParameters::find().CRMAppUrl`. The method trims whitespace, removes trailing slashes, and returns an empty link if `CRMAppUrl`, `targetCompanyId`, or `hojaGastosId` is missing. It must not fall back to `INDDefaultParameters.InternalAPIUrlService`, because that points to `IND_INTERNAL_API` and cannot serve `/Gastos/ExpenseSheetLink`.

## Behavior

- If the user is not authenticated, the app redirects to `/Auth/Login` with the full local resolver URL in `returnUrl`.
- The Microsoft login link preserves that `returnUrl` and Entra redirects back to the resolver after login.
- The resolver validates that the authenticated user can access `targetCompanyId`.
- The resolver validates view access to `GASTOS_HOJA_GASTO` in the target company.
- If the selected company differs from `targetCompanyId`, the resolver updates the existing session company selection and refreshes the auth context.
- The resolver validates the specific expense sheet through the existing detail API call.
- On success, it redirects to `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.

## Failure Behavior

The resolver never approves, rejects, pays, deletes, or updates an expense sheet. Missing parameters, denied company access, denied sheet access, not-found sheets, or upstream failures redirect safely to `Home/Index` with a localized one-shot modal message.

Company switch failures use `ExpenseSheetLink_CompanySwitchFailed`. Successful company switches use `ExpenseSheetLink_CompanySwitched` so users understand why the active company changed before the detail page opened.

## Diagnostic Notes

- A browser 404 on `https://dev.service.insertec.eu:2087/Gastos/ExpenseSheetLink?...` means the generated email URL used the internal API host instead of the CRM web host.
- A resolved CRM web URL that redirects to `Home/Index` with `ExpenseSheetLink_SheetNotFound` means the route was detected but the current authenticated user/company could not retrieve that sheet through the normal detail API.
- For `HG000056` tested on 2026-05-27, CRM web logs showed `SelectedCompany=ISE`, session AX user `MAME`, and upstream error `CRM_EXPENSESHEET_NOT_FOUND`. The AX row showed owner `UserId=IJI`; that must be opened by the owner or an allowed acting/subordinate user. The email URL itself must not grant extra access.

## Permission Diagnostics Logs

The resolver logs the evaluated values at each authorization gate without changing the access rule.

Web CRM log messages to search:

```text
Expense sheet email link context resolved
Expense sheet email link company validation denied
Expense sheet email link module validation denied
Expense sheet email link detail validation started
Expense sheet email link detail validation denied
Expense sheet email link detail validation allowed
```

API log tag to search:

```text
[EXPENSE-AUTHZ-DETAIL]
```

AX diagnostics included in API `axExtras` when the detail rule fails:

```text
stage=detail-access
rule=header.UserId==crmUserId&&header.HojaGastosId==hojaId
companyId={company}
axUserId={session AX user sent by the web/API}
crmUserId={CRMUsuarioTable::Find(axUserId).UserId}
hojaGastosId={sheet id}
sheetExists={0|1}
sheetUserId={CRMHojaGastosTable.UserId}
sheetCreatedBy={CRMHojaGastosTable.INDCreatedByUserId}
sheetStatus={CRMHojaGastosTable.ExpenseSheetStatus}
```

For the known `HG000056` case, the expected denial evidence is `crmUserId=MAME` and `sheetUserId=IJI` under the exact AX rule above. If `sheetCreatedBy=MAME` must grant access, that is a new explicit AX/API permission rule; it should not be inferred from the email URL.

## Implementation Notes

- Literal route: `Program.cs` maps `GET /Gastos/ExpenseSheetLink` to `ExpenseSheetLinkController.Index`.
- Auth preservation: unauthenticated requests keep the full local path and query through `LocalReturnUrlHelper`.
- Module filter: `INDModuleAuthorizeFilter` lets only `ExpenseSheetLink.Index` perform target-company validation itself after auth context bootstrap.
- Company switch: the resolver writes `INDCompanySelected` and `INDCompanySelectionSource`, clears cached context while preserving the selection, then refreshes context before validating sheet detail.
- Detail validation: the resolver calls the existing expense sheet detail API path with the selected company header before redirecting to the final detail page.

## Manual Checks

- Logged-out user opens the resolver, signs in, and returns to the same resolver URL.
- Logged-in user in the target company redirects to detail.
- Logged-in user in another allowed company switches context and redirects to detail.
- Missing `hojaGastosId` or `targetCompanyId` fails safely.
- User without target company or sheet access is denied safely.
- Final success URL is `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.
