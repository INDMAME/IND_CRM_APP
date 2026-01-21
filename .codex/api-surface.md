# IND_CRM_API surface for MVC client (Dec 2025)

## Scope and hierarchy
- Scope: API surface mapping for the MVC client.
- If conflict: system > `.codex/AGENTS.md` > this doc.

## Base
- Base URL: `ApiSettings:BaseUrl` (default `https://crm.insertec.biz:7776/`)
- Auth: JWT in `Authorization: Bearer {token}`
- Envelopes:
  - `IndApiResponse<T>`: `Success`, `Message`, `ErrorCode`, `Data`, `Errors[]`, `TraceId`
  - `IndPagedResponse<T>`: `Success`, `Message`, `Total`, `Page`, `PageSize`, `Items[]`, `TraceId`
  - Common `ErrorCode`: `ValidationError`, `CrmActivityMissingFields`, `CrmActivityNotFound`, `AxComError`, `AxSessionError`, `AuthRequired`, `AuthInvalidCredentials`

## Endpoints and client mapping
- `POST /api/auth/login` -> `ICrmApiClient.AuthenticateAsync(username, password)` -> `LoginResult`
- `POST /api/auth/refresh` -> `ICrmApiClient.RefreshTokenAsync(currentToken)` -> `LoginResult`
- `POST /api/auth/entra/context` -> `ICrmApiClient.GetEntraContextAsync(token, entraOid, appCode)` -> `IndEntraContextResponse`

- `GET /api/system/getEnvironmentName` -> `ICrmApiClient.GetEnvironmentAsync(token)` -> `string`
- `GET /api/system/getCompanyName` -> `ICrmApiClient.GetCompanyNameAsync(token)` -> `string`

- `POST /api/crm/accounts/listAccounts` -> `ICrmApiClient.GetAccountsAsync(token, accountNum, page, pageSize)` -> `PagedApiResponse<AccountDto>`
- `POST /api/crm/accounts/listContacts` -> `ICrmApiClient.GetContactosAsync(token, accountNum, page, pageSize)` -> `PagedApiResponse<ContactoDto>`

- `POST /api/crm/activities/list` (and GET with query) -> `ICrmApiClient.GetActivitiesAsync(token, ActivitiesFilter)` -> `PagedApiResponse<ActivityDto>`
- `GET /api/crm/activities/{recId}` -> `ICrmApiClient.GetActivityByRecIdAsync(token, recId)` -> `ApiResponse<ActivityDto>`
- `POST /api/crm/activities/create` -> `ICrmApiClient.CreateActivityAsync(token, CreateActivityRequest)` -> `ApiResponse<object>`
- `PUT /api/crm/activities/{recId}` -> `ICrmApiClient.UpdateActivityAsync(token, recId, UpdateActivityRequest)` -> `ApiResponse<object>`
- `DELETE /api/crm/activities/{recId}` -> `ICrmApiClient.DeleteActivityAsync(token, recId)` -> `ApiResponse<object>`
- `POST /api/crm/activities/test` -> uses same list logic (not mapped in client, can reuse `GetActivitiesAsync`)

- `POST /api/crm/visits/createVisitaAsistente` -> `ICrmApiClient.CreateVisitaAsistenteAsync(token, CreateVisitaAsistenteRequest)` -> `ApiResponse<object>`
- `DELETE /api/crm/visits/deleteVisitaAsistente` -> `ICrmApiClient.DeleteVisitaAsistenteAsync(token, DeleteVisitaAsistenteRequest)` -> `ApiResponse<object>`

- `POST /api/speech/transcribe` (multipart/form-data: `languageId`, `audioFile` (.wav), optional `temperature`, `prompt`/`context`) -> `ICrmApiClient.TranscribeSpeechAsync(...)` -> `ApiResponse<string>`

- Health: `GET /api/health/ping`, `GET /api/health/health` (not mapped; call via HttpHelper if needed)

## DTOs used
- `LoginRequest`, `LoginResult`
- `ActivitiesFilter` (`userId`, `fromDate`, `toDate`)
- `CreateActivityRequest` / `UpdateActivityRequest` (accountNum, visitType, userId, description, transDate, comentarios, antecedentes, conclusiones)
- `CreateVisitaAsistenteRequest`, `DeleteVisitaAsistenteRequest`
- Speech: no JSON DTO (multipart form upload for WAV audio)
- `ActivityDto` (+ `ActivityAsistenteDto`)
- `AccountDto`, `ContactoDto`

## Client behavior notes
- `ApiClientService` adds bearer token per call and applies refreshed token from header `X-Refreshed-Token` or body (`LoginResult.Token`).
- `X-IND-Company` header is added for CRM/system calls using the current session company (`INDCompanySelected`).
- Timeouts: `ApiSettings:TimeoutSeconds` (default 30s in `appsettings.json`) and `ApiSettings:AccountsTimeoutSeconds` (default 120s).
- Deserialization uses custom converters to parse array-shaped payloads from Axapta for activities, accounts, contacts.
- `PagedApiResponse<T>.GetAnyItems()` returns `Items` then `Data` (no duplicate property names).

## UI usage hints
- Always check `Success` before using `Data`/`Items`.
- Show `Message`/`ErrorCode` on errors; for 422 list validation `Errors[field,message]`.
- Paginate with `Total`, `Page`, `PageSize`.

## Shared UI rules
- See `.codex/core-ui-rules.md`.

## Last updated
- 2026-01-21
