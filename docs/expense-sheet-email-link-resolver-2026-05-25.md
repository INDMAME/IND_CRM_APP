# Expense Sheet Email Link Resolver

Date: 2026-05-27
Last verified against the application: 2026-07-13
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
- The resolver first validates the specific expense sheet with the signed-in user's AX scope.
- If that direct lookup cannot retrieve the sheet, the resolver loads the user's authorized Gastos subordinates and probes the same detail endpoint only with those AX user ids.
- A successful subordinate probe stores the effective acting AX user temporarily so the destination detail page opens in the same authorized scope.
- The subordinate fallback does not grant new access. It is limited to the users returned by the existing authorized subordinates endpoint.
- On success, it redirects to `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.

## Failure Behavior

The resolver never approves, rejects, pays, deletes, or updates an expense sheet. Missing parameters, denied company access, denied sheet access, not-found sheets, or upstream failures redirect safely to `Home/Index` with a localized one-shot modal message.

Company switch failures use `ExpenseSheetLink_CompanySwitchFailed`. Successful company switches use `ExpenseSheetLink_CompanySwitched` so users understand why the active company changed before the detail page opened.

## Diagnostic Notes

- A browser 404 on `https://dev.service.insertec.eu:2087/Gastos/ExpenseSheetLink?...` means the generated email URL used the internal API host instead of the CRM web host.
- A resolved CRM web URL that redirects to `Home/Index` with `ExpenseSheetLink_SheetNotFound` means the resolver could not resolve the sheet through the direct scope or the subordinate candidates available at that moment. A failed subordinate-list request may leave no candidates to probe.
- The `HG000056` investigation from 2026-05-27 is historical evidence from before the subordinate fallback existed. Its direct lookup failed because the session and sheet owners differed. It must not be treated as the complete current resolution rule.
- The email URL itself never grants owner or subordinate access. It only reuses the permissions already returned by the authenticated context and Gastos endpoints.

## Permission Diagnostics Logs

The resolver logs the evaluated values at each authorization gate without changing the access rule.

Web CRM log messages to search:

```text
Expense sheet email link requested
Expense sheet email link context force refreshed
Expense sheet email link company validation denied
Expense sheet email link module validation denied
Expense sheet email link detail validation started
Expense sheet email link subordinate detail probe started
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

The AX diagnostic block applies to each detail probe. A direct denial can still be followed by a successful subordinate probe. Use the web log fields `ActingAxUserId`, `UsedSubordinateScope`, and `ProbedSubordinates` to determine the final resolver decision.

## Implementation Notes

- Literal route: `Program.cs` maps `GET /Gastos/ExpenseSheetLink` to `ExpenseSheetLinkController.Index`.
- Auth preservation: unauthenticated requests keep the full local path and query through `LocalReturnUrlHelper`.
- Module filter: `INDModuleAuthorizeFilter` lets only `ExpenseSheetLink.Index` perform target-company validation itself after auth context bootstrap.
- Company switch: the resolver writes `INDCompanySelected` and `INDCompanySelectionSource`, clears cached context while preserving the selection, then refreshes context before validating sheet detail.
- Detail validation: the resolver calls the existing expense sheet detail API first as the signed-in AX user and, only if needed, as each authorized subordinate candidate.
- Acting scope: a successful subordinate probe carries `ExpenseSheetLinkActingUserId` through temporary server data into the destination page. The frontend then stores that scoped override in `sessionStorage` for up to 12 hours or until the Gastos flow clears or replaces it. It never changes the authenticated identity, and every request remains subject to server authorization.

## Manual Checks

- Logged-out user opens the resolver, signs in, and returns to the same resolver URL.
- Logged-in user in the target company redirects to detail.
- Logged-in user in another allowed company switches context and redirects to detail.
- Manager opens a link for an authorized subordinate sheet and reaches detail in subordinate read-only/action scope.
- User opens a link for a sheet outside both direct and subordinate scope and is denied safely.
- Missing `hojaGastosId` or `targetCompanyId` fails safely.
- User without target company or sheet access is denied safely.
- Final success URL is `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.
