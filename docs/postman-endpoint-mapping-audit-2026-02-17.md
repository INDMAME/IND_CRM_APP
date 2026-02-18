# Postman Endpoint Mapping Audit

Last updated: 2026-02-17

## Scope
- Source collection: `.codex/postman/IND_CRM_API V17.postman_collection.json`
- Total endpoints in collection: 30
- Template endpoint excluded by request: `GET /api/crm/template/sample`
- Evaluated endpoints: 29

## Coverage Summary
- Mapped in `ApiRoutes` + `ICrmApiClient` + `ApiClientService`: 29/29
- Direct frontend `/api/...` consumers mapped in `Program.cs` + controller API actions: 8 endpoint paths (all currently used by React)
- Endpoints mapped in backend but not currently consumed by frontend UI: health, ping, auth login/refresh, expense-from-ticket, and a few server-only activity/visit flows

## Endpoint Matrix

| Method | Postman Endpoint | Frontend Mapping | Backend Mapping | Status |
|---|---|---|---|---|
| POST | `/api/auth/login` | Server auth flow (`/Auth/Login`) | `ApiRoutes.AuthLogin` -> `AuthenticateAsync` | Mapped |
| POST | `/api/auth/refresh` | Token middleware/session refresh | `ApiRoutes.AuthRefresh` -> `RefreshTokenAsync` | Mapped |
| POST | `/api/auth/entra/context` | Direct React call in `expenseApi.ts` | `Program.cs` + `AuthController.ApiEntraContext` + `ApiRoutes.AuthEntraContext` | Mapped |
| GET | `/api/system/getEnvironmentName` | Server-side environment banner | `ApiRoutes.SystemEnvironment` -> `GetEnvironmentAsync` | Mapped |
| GET | `/api/system/getCompanyName` | Server-side company banner | `ApiRoutes.SystemCompany` -> `GetCompanyNameAsync` | Mapped |
| GET | `/api/system/exchange-rate` | Direct React call in `expenseApi.ts` | `Program.cs` + `GastosController.ApiSystemExchangeRate` + `ApiRoutes.SystemExchangeRate` | Mapped |
| GET | `/api/health/health` | No current UI consumer | `ApiRoutes.Health` -> `GetHealthAsync` | Mapped |
| GET | `/api/health/ping` | No current UI consumer | `ApiRoutes.HealthPing` -> `GetHealthPingAsync` | Mapped |
| POST | `/api/crm/accounts/listAccounts` | React via `/Visitas/GetAccountsForDropdown` proxy | `ApiRoutes.AccountsList` -> `GetAccountsAsync` | Mapped |
| POST | `/api/crm/accounts/listContacts` | React via `/Visitas/GetContactsForDropdown` proxy | `ApiRoutes.ContactsList` -> `GetContactosAsync` | Mapped |
| POST | `/api/crm/activities/list` | React via `/Historial/GetActivities` proxy | `ApiRoutes.ActivitiesList` -> `GetActivitiesAsync` | Mapped |
| POST | `/api/crm/activities/create` | React via `/Visitas/CreateActivity` proxy | `ApiRoutes.ActivitiesCreate` -> `CreateActivityAsync` | Mapped |
| GET | `/api/crm/activities/by-code/{code}` | React via `/Visitas/GetActivityByCode` proxy | `ApiRoutes.ActivityByCode` -> `GetActivityByCodeAsync` | Mapped |
| GET | `/api/crm/activities/{recId}` | Server-side support flow | `ApiRoutes.ActivityByRecId` -> `GetActivityByRecIdAsync` | Mapped |
| PUT | `/api/crm/activities/{recId}` | React via `/Visitas/UpdateActivity/{recId}` proxy | `ApiRoutes.ActivityByRecId` -> `UpdateActivityAsync` | Mapped |
| DELETE | `/api/crm/activities/{recId}` | React via `/Visitas/DeleteActivity/{recId}` proxy | `ApiRoutes.ActivityByRecId` -> `DeleteActivityAsync` | Mapped |
| POST | `/api/crm/visits/createVisitaAsistente` | React via `/Visitas/CreateVisitaAsistente` proxy | `ApiRoutes.VisitsCreateAsistente` -> `CreateVisitaAsistenteAsync` | Mapped |
| DELETE | `/api/crm/visits/deleteVisitaAsistente` | Server-side support flow | `ApiRoutes.VisitsDeleteAsistente` -> `DeleteVisitaAsistenteAsync` | Mapped |
| POST | `/api/crm/expensesheets` | Direct React call in `expenseApi.ts` | `Program.cs` + `GastosController.ApiExpenseSheetsCreate` + `ApiRoutes.ExpenseSheets` | Mapped |
| POST | `/api/crm/expensesheets/list` | Direct React call in `expenseApi.ts` | `Program.cs` + `GastosController.ApiExpenseSheetsList` + `ApiRoutes.ExpenseSheetsList` | Mapped |
| GET | `/api/crm/expensesheets/currencies` | Direct React call in `expenseApi.ts` | `Program.cs` + `GastosController.ApiExpenseSheetsCurrencies` + `ApiRoutes.ExpenseSheetCurrencies` | Mapped |
| GET | `/api/crm/expensesheets/{hojaGastosId}` | Direct React call in `expenseApi.ts` | `Program.cs` + `GastosController.ApiExpenseSheetDetail` + `ApiRoutes.ExpenseSheetById` | Mapped |
| PUT | `/api/crm/expensesheets/{hojaGastosId}` | Direct React call in `expenseApi.ts` | `Program.cs` + `GastosController.ApiExpenseSheetUpdate` + `ApiRoutes.ExpenseSheetById` | Mapped |
| PUT | `/api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}` | Direct React call in `expenseApi.ts` | `Program.cs` + `GastosController.ApiExpenseSheetLineUpdate` + `ApiRoutes.ExpenseSheetLine` | Mapped |
| DELETE | `/api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}` | Direct React call in `expenseApi.ts` (line delete + whole sheet delete via query) | `Program.cs` + `GastosController.ApiExpenseSheetLineDelete` + `ApiRoutes.ExpenseSheetLineDelete` | Mapped |
| GET | `/api/crm/projects/list` | React via `/Gastos/GetProjectsForDropdown` proxy | `ApiRoutes.ProjectsList` -> `GetProjectsAsync` | Mapped |
| POST | `/api/ia/service/speech` | React via `/Visitas/TranscribeSpeech` proxy | `ApiRoutes.SpeechTranscribe` -> `TranscribeSpeechAsync` | Mapped |
| POST | `/api/ia/service/expensefromticket` | No current UI consumer | `ApiRoutes.ExpenseFromTicket` -> `ExpenseFromTicketAsync` | Mapped |

## Excluded Endpoint
- `GET /api/crm/template/sample` was intentionally excluded as requested.
