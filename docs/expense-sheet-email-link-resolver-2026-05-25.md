# Expense Sheet Email Link Resolver

Date: 2026-05-25

## Route

`GET /Gastos/ExpenseSheetLink`

Query parameters:

- `hojaGastosId`: required expense sheet id.
- `targetCompanyId`: required company id for the expense sheet.
- `source`: optional trace metadata only. It is not used for authorization.

Example:

```text
/Gastos/ExpenseSheetLink?hojaGastosId=12345&targetCompanyId=es01&source=axapta
```

## Behavior

- If the user is not authenticated, the app redirects to `/Auth/Login` with the full local resolver URL in `returnUrl`.
- The Microsoft login link preserves that `returnUrl` and Entra redirects back to the resolver after login.
- The web app does not send email, call Microsoft Graph, or call `IND_INTERNAL_API` for mail.
- The resolver validates that the authenticated user can access `targetCompanyId`.
- The resolver validates view access to `GASTOS_HOJA_GASTO` in the target company.
- If the selected company differs from `targetCompanyId`, the resolver updates the existing session company selection and refreshes the auth context.
- The resolver validates the specific expense sheet through the existing detail API call.
- On success, it redirects to `/Gastos/ExpenseSheetDetail?hojaGastosId={id}`.

## Failure Behavior

The resolver never approves, rejects, pays, deletes, or updates an expense sheet. Missing parameters, denied company access, denied sheet access, not-found sheets, or upstream failures redirect safely to `Home/Index` with a localized one-shot modal message.

Company switch failures use `ExpenseSheetLink_CompanySwitchFailed`. Successful company switches use `ExpenseSheetLink_CompanySwitched` so users understand why the active company changed before the detail page opened.
