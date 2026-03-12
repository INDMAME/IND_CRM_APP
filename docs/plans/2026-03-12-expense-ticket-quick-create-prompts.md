# Expense Ticket Quick Create Prompts

## Prompt 1: upstream API project

```text
Implement a new composite endpoint `POST /api/crm/expensesheets/tickets/quick-create` for the ticket-from-image flow.

Goal
- Preserve the current "manual" behavior and final business outcome.
- Accept the image only once from the client.
- Perform server-side orchestration of the existing steps: create provisional ticket -> upload file -> OCR/AI extract -> apply AI to ticket -> optionally link to an expense sheet.
- Do not introduce new dependencies.

Request contract
- Content-Type: `multipart/form-data`
- Fields:
  - `ticketImage`: required image file.
  - `currencyCode`: optional, default `EUR`.
  - `description`: optional; if empty, derive it from the sanitized file name without extension.
  - `comentario`: optional.
  - `existingHojaGastosId`: optional; when present, link the created ticket to that sheet.
  - `projectId`: optional; only used when creating the expense sheet line.
- Reuse the current allowed image validation and the current 50 MB size limit used by the ticket image flow.

Response contract
- Keep the standard API response envelope already used by the project.
- `Data` must minimally return:
  - `FileId`
  - `UrlFile`
  - `FileName`
  - `ProcessedByAI`
  - `LinkedToSheet`
  - `HojaGastosId` when applicable
  - `CompletedStage` with one of: `ticket-created`, `file-uploaded`, `draft-extracted`, `ticket-finalized`, `sheet-linked`
  - `StepTraceIds` as an object with per-step trace ids when available
- On partial failure after the ticket exists, still return `Data.FileId`, `CompletedStage`, and any known `UrlFile` so the web layer can diagnose and decide on retry UX.

Server flow
1. Validate auth, company headers, and managed-user rules the same way as the current expense ticket mutation endpoints.
2. Validate file type, extension, and size with the same rules as the current ticket image endpoints.
3. Create the provisional ticket using the same semantics as the current manual frontend flow:
   - `mode = 1`
   - placeholder `urlFile` such as `pending://ticket-upload/<guid>`
   - `fileExtension` from the uploaded image
   - `description` from request or file-name fallback
   - `currencyCode` uppercased with default `EUR`
   - `transDate` set to today as the provisional value
   - empty `comentario` when not provided
4. Persist the incoming image once to a reusable temp stream or temp file so the same uploaded bytes can feed both file storage sync and OCR without requiring a second client upload.
5. Upload the image to the existing ticket file endpoint or service and capture `UrlFile` and `FileName`.
6. Run OCR or AI extraction using the same image bytes and pass `persistTicket = false` plus the uploaded `ticketUrlFile` when available.
7. Normalize the AI draft with the same rules currently used in the web flow:
   - safe date normalization
   - currency fallback to `EUR`
   - positive amount validation
   - gasto type validation
   - line normalization and total fallback
8. Apply the AI payload to the created ticket using the existing IA update path.
9. If `existingHojaGastosId` is present, append one expense line to that sheet using the same header-based mapping the current web flow uses. Use `projectId` if supplied.
10. Return the final response envelope with `Success = true`.

Error handling
- Keep the endpoint synchronous for now.
- Log one top-level trace for the composite operation and preserve per-step trace ids in the response.
- If create fails: return a normal error with no partial state.
- If upload, OCR, apply, or link fails after create: return `Success = false` with `Data.FileId`, `CompletedStage`, and known step trace ids. Do not silently swallow partial success.
- Do not change existing endpoints or current contracts unless required by the new endpoint.
- Prefer reusing existing services and helpers instead of duplicating mapping code. Extract shared normalization code only if it reduces risk.

Implementation notes
- Keep the endpoint backward compatible with all current consumers.
- Avoid changing the existing `expensefromticket` contract in this task.
- Add focused unit or integration coverage for:
  - success path
  - upload failure after ticket creation
  - OCR failure after upload
  - optional sheet link path
  - invalid image validation
```

## Prompt 2: current web project

```text
Implement support for a new composite endpoint `POST /api/crm/expensesheets/tickets/quick-create` in the web project and migrate the quick ticket-from-image flow to use it safely.

Current context to refresh
- Current flow lives in `Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts`
- Current flow helpers live in `Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlowCore.ts`
- Current mode is `manual`
- Current manual orchestration is: create ticket -> upload file -> expensefromticket -> apply IA -> optional create expense sheet line
- Web proxy/controller layer lives in `Web/Controllers/Gastos/GastosController.cs`
- Upstream client lives in `App/Services/ApiClientService.cs`
- Shared route constants live in `App/Services/ApiHelpers/ApiRoutes.cs`
- Ticket flow types live in `Web/wwwroot/react/src/pages/gastos/expenseTypes.ts`
- Frontend API helpers live in `Web/wwwroot/react/src/pages/gastos/utils/expenseApi.ts`

What to implement
1. Add the new web proxy endpoint for `POST /api/crm/expensesheets/tickets/quick-create`.
   - Accept `multipart/form-data`.
   - Forward `ticketImage`, `currencyCode`, `description`, `comentario`, `existingHojaGastosId`, and `projectId`.
   - Keep auth, session, company, and `X-IND-AxUserId` behavior aligned with the existing ticket mutation endpoints.
2. Add the upstream client method and route constant for the new API endpoint.
3. Add a typed frontend API helper to call the new endpoint.
4. Replace the current manual multi-call path in `useExpenseSheetQuickTicketFlow.ts` with the new single call.
   - On success, preserve the same UX end state:
     - `flashActionMark("okProcess")`
     - `onCompleted({ fileId, linkedToSheet })`
     - clear the cached retry file if present
   - Keep the existing manual fallback path available and automatically use it when the new endpoint is unavailable, for example HTTP `404`, `405`, `501`, or a dedicated upstream-not-ready error.
5. Keep camera and gallery behavior unchanged from the user perspective.
6. Keep the existing IA-first path untouched unless required for compatibility.

Extra adjustments to include
- Move `cacheImageFile(cacheKey, file)` out of the critical path:
  - replace the awaited call with a fire-and-forget background call guarded with `.catch(() => {})`
  - retry flow must still work when the cache succeeds
- Remove or reduce the artificial `320ms` success delay unless there is a concrete UX dependency
- Preserve trace logging and session storage, but adapt them to store the new composite trace id and any `StepTraceIds`
- If the new endpoint returns partial failure metadata such as `FileId` or `CompletedStage`, surface a user-friendly error and keep enough state for diagnostics without breaking the current screen

Files to update
- `App/Services/ApiHelpers/ApiRoutes.cs`
- `App/Services/ApiClientService.cs`
- `Web/Controllers/Gastos/GastosController.cs`
- `Web/wwwroot/react/src/pages/gastos/utils/expenseApi.ts`
- `Web/wwwroot/react/src/pages/gastos/expenseTypes.ts`
- `Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts`
- `Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlowCore.ts` only if strictly necessary

Constraints
- Do not remove the existing endpoints.
- Do not introduce new dependencies.
- Keep current behavior stable for users.
- Prefer small, defensive changes.
- Add focused tests only where they protect the new flow and fallback behavior.
- If build artifacts under `wwwroot/js` are generated by the normal frontend build in this repo, update them only if needed by the established workflow.

Deliverable
- Implement the new path end to end in the web project.
- Summarize:
  - which files changed
  - how fallback works
  - what user-visible latency was removed from the frontend path
  - any residual deployment sequencing risk between web and upstream API
```
