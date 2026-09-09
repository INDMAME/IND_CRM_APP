using IND_CRM_APP.Extensions;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    public partial class GastosController
    {
        // Resumes only API-authorized cleanup, preserving the normal sheet policy before first deletion.
        private async Task<IActionResult> ExecuteExpenseSheetDeletionAsync(
            string token,
            string sheetId,
            string? axUserId,
            string operation,
            bool legacyResponse = false,
            bool setActionMark = false)
        {
            try
            {
                var existing = await _apiClient.GetExpenseSheetDeletionAsync(
                    token, sheetId, axUserId, HttpContext.RequestAborted);
                if (!IsSuccessfulDeletionTransport(existing) || existing.Response.Data == null)
                    return CreateExpenseSheetDeletionResponse(existing, legacyResponse, requireComplete: false);

                // The progress endpoint revalidates the saved owner and current signed actor.
                var progress = existing.Response.Data;
                if (!progress.Exists || (!progress.SheetDeleted && !progress.DeleteAttempted))
                {
                    var guard = await ValidateExpenseSheetMutationAsync(
                        token, sheetId, axUserId, operation, ExpenseSheetMutationType.DeleteSheet);
                    if (!guard.Allowed)
                    {
                        return legacyResponse
                            ? StatusCode(guard.StatusCode, new { success = false, message = guard.Message, errorCode = guard.ErrorCode })
                            : CreateApiCommandError(guard.StatusCode, guard.Message, guard.ErrorCode);
                    }
                }

                var deletion = await _apiClient.DeleteExpenseSheetWithTicketsAsync(
                    token, sheetId, axUserId, HttpContext.RequestAborted);
                var result = CreateExpenseSheetDeletionResponse(deletion, legacyResponse, requireComplete: true);
                if (setActionMark && result.StatusCode == StatusCodes.Status200OK)
                    TempData.INDSetActionMarkDanger();
                return result;
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error during durable expense sheet deletion in {Operation}", operation);
                var statusCode = (int)ex.StatusCode;
                if (statusCode < 400 || statusCode > 599) statusCode = StatusCodes.Status502BadGateway;
                return legacyResponse
                    ? StatusCode(statusCode, new { success = false, message = _sr["Api_RequestFailed"].Value, errorCode = "UPSTREAM_ERROR" })
                    : CreateApiCommandError(statusCode, _sr["Api_RequestFailed"].Value, "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled durable expense sheet deletion error in {Operation}", operation);
                return legacyResponse
                    ? StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = _sr["Api_RequestFailed"].Value, errorCode = "UNHANDLED_ERROR" })
                    : CreateApiCommandError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value, "UNHANDLED_ERROR");
            }
        }

        // Requires HTTP and envelope success; neither alone authorizes a retry.
        private static bool IsSuccessfulDeletionTransport(ApiTransportResponse<ExpenseSheetDeletionProgressDto> transport)
        {
            return (int)transport.StatusCode is >= 200 and <= 299 && transport.Response.Success;
        }

        // Keeps progress and actual HTTP errors visible until every deletion stage is complete.
        private static JsonResult CreateExpenseSheetDeletionResponse(
            ApiTransportResponse<ExpenseSheetDeletionProgressDto> transport,
            bool legacyResponse,
            bool requireComplete)
        {
            var response = transport.Response;
            var statusCode = (int)transport.StatusCode;
            var complete = response.Data is { Exists: true, SheetDeleted: true, Complete: true };
            var success = IsSuccessfulDeletionTransport(transport) && response.Data != null && (!requireComplete || complete);
            var pending = response.Data is { Exists: true, SheetDeleted: true, Complete: false };
            if (statusCode < 100 || statusCode > 599 || (!success && statusCode < 400))
                statusCode = pending && requireComplete ? StatusCodes.Status409Conflict : StatusCodes.Status502BadGateway;
            var errorCode = response.ErrorCode ?? (!success ? pending ? "CRM_EXPENSESHEET_CLEANUP_PENDING" : "UPSTREAM_ERROR" : null);
            var errors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();
            object payload = legacyResponse
                ? new { success, message = response.Message ?? string.Empty, errorCode, data = response.Data, errors, traceId = response.TraceId }
                : new { Success = success, Message = response.Message ?? string.Empty, ErrorCode = errorCode, Data = response.Data, Errors = errors, TraceId = response.TraceId };
            return CreateApiResponse(payload, statusCode);
        }
    }
}
