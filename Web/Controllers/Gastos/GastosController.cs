using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using IND_CRM_APP.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Xml.Linq;

namespace IND_CRM_APP.Controllers
{
    // Controller for expense sheet pages and read endpoints.
    public class GastosController : BaseMvcController
    {
        private readonly ILogger<GastosController> _logger;
        private readonly ICrmEnumCatalog _crmEnumCatalog;
        private readonly ITicketBlobPreviewService _ticketBlobPreviewService;
        private readonly IIndAuthContextService _authContext;
        private readonly IStringLocalizer<INDSharedResource> _sr;
        private const string CrmAppCode = "CRM";
        private const string GastoTypeEnumName = "CRMGastoType";
        private static readonly string[] ExpenseCatalogEnumNames =
        {
            "CRMGastoType",
            "INDExpenseSheetStatus",
            "INDReimbursableExpense",
            "INDReimbursableExpenseLines",
            "INDExchangeRateMode",
            "INDTicketStatus"
        };
        private const int ExpenseSheetStatusDraft = 0;
        private const int ExpenseSheetStatusApprovalRequested = 1;
        private const int ExpenseSheetStatusApproved = 2;
        private const int ExpenseSheetStatusRejected = 3;
        private const int ExpenseSheetStatusPaid = 4;
        private const string ExpenseSheetNotFoundErrorCode = "CRM_EXPENSESHEET_NOT_FOUND";
        private const string ExpenseSheetPaidReadOnlyErrorCode = "CRM_EXPENSESHEET_PAID_READ_ONLY";
        private const string ExpenseSheetReadOnlyByStatusErrorCode = "CRM_EXPENSESHEET_STATUS_READ_ONLY";
        private const string ExpenseSheetStatusTransitionErrorCode = "CRM_EXPENSESHEET_STATUS_TRANSITION_NOT_ALLOWED";
        private const string ExpenseManagedUserReadOnlyErrorCode = "CRM_EXPENSE_MANAGED_USER_READ_ONLY";
        private const string ExpenseManagedUserScopeDeniedErrorCode = "CRM_EXPENSE_MANAGED_USER_SCOPE_DENIED";
        private const string ExpenseSubordinatesScopeCacheKey = "__expense_subordinates_scope_cache";
        private static readonly HashSet<string> AllowedTicketImageContentTypes = new(StringComparer.OrdinalIgnoreCase)
        {
            "image/jpeg",
            "image/jpg",
            "image/pjpeg",
            "image/png",
            "image/webp"
        };
        private static readonly HashSet<string> AllowedTicketImageExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            "jpg",
            "jpeg",
            "png",
            "webp"
        };

        public GastosController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            ILogger<GastosController> logger,
            ICrmEnumCatalog crmEnumCatalog,
            ITicketBlobPreviewService ticketBlobPreviewService,
            IIndAuthContextService authContext,
            IStringLocalizer<INDSharedResource> sr) : base(apiClient, tokenSession)
        {
            _logger = logger;
            _crmEnumCatalog = crmEnumCatalog;
            _ticketBlobPreviewService = ticketBlobPreviewService;
            _authContext = authContext;
            _sr = sr;
        }

        // Immutable guard result for expense sheet mutation checks.
        private sealed class ExpenseSheetMutationGuardResult
        {
            public bool Allowed { get; init; }
            public int StatusCode { get; init; }
            public string Message { get; init; } = string.Empty;
            public string ErrorCode { get; init; } = string.Empty;
            public ExpenseSheetSnapshot? Snapshot { get; init; }
            public ExpenseSheetMutationPolicy? Policy { get; init; }
        }

        // Immutable guard result for acting-user validation before forwarding one override upstream.
        private sealed class ExpenseActingUserGuardResult
        {
            public bool Allowed { get; init; }
            public int StatusCode { get; init; }
            public string Message { get; init; } = string.Empty;
            public string ErrorCode { get; init; } = string.Empty;
            public string? AxUserId { get; init; }
        }

        // Defines the expense mutation family so one policy can protect all entry points.
        private enum ExpenseSheetMutationType
        {
            HeaderUpdate,
            LineMutation,
            DeleteSheet
        }

        // Mirrors the frontend interaction modes used by expense sheet detail.
        private enum ExpenseSheetInteractionMode
        {
            FullEdit,
            CommentOnlyEdit,
            StatusActionOnly,
            ReadOnly
        }

        // Normalized server snapshot for policy evaluation and payload comparison.
        private sealed class ExpenseSheetSnapshot
        {
            public string OwnerUserId { get; init; } = string.Empty;
            public int? StatusCode { get; init; }
            public string Description { get; init; } = string.Empty;
            public string CurrencyCode { get; init; } = string.Empty;
            public decimal ExchangeRate { get; init; }
            public string? ProjectId { get; init; }
            public string? Voucher { get; init; }
            public int? ExchangeRateMode { get; init; }
            public string? StatusComment { get; init; }
            public int? ReimbursableExpense { get; init; }
            public bool IsPaid { get; init; }
        }

        // Encapsulates the resolved mutation rules for one expense sheet and actor context.
        private sealed class ExpenseSheetMutationPolicy
        {
            public ExpenseSheetInteractionMode InteractionMode { get; init; }
            public bool IsManagingOtherUser { get; init; }
            public bool AllowSelfManagement { get; init; }
            public bool CanDeleteSheet { get; init; }
            public HashSet<int> AllowedNextStatuses { get; init; } = new();
        }

        // Shows the expense sheet list page.
        [HttpGet]
        public async Task<IActionResult> ExpenseSheets()
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            await LoadEnvironmentInfoAsync();
            await LoadExpenseEnumViewBagsAsync(token);

            return View("~/Web/Views/Gastos/ExpenseSheets.cshtml");
        }

        // Shows the expense tickets list page.
        [HttpGet]
        public async Task<IActionResult> Tickets([FromQuery(Name = "action")] string ticketsAction = "", string hojaGastosId = "")
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            await LoadEnvironmentInfoAsync();
            var normalizedAction = (ticketsAction ?? string.Empty).Trim().ToLowerInvariant();
            var safeSheetId = (hojaGastosId ?? string.Empty).Trim();
            if (normalizedAction == "link" && !string.IsNullOrWhiteSpace(safeSheetId))
            {
                ViewData["TopbarBackUrl"] = $"/Gastos/ExpenseSheetDetail?hojaGastosId={Uri.EscapeDataString(safeSheetId)}";
            }

            await LoadExpenseEnumViewBagsAsync(token);
            return View("~/Web/Views/Gastos/Tickets.cshtml");
        }

        // Shows the expense ticket detail page.
        [HttpGet]
        public async Task<IActionResult> TicketDetail(string fileId, string mode = "", string origin = "", string sheetId = "", string lineRecId = "")
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            var safeFileId = (fileId ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(safeFileId))
                return RedirectToAction(nameof(Tickets));

            await LoadEnvironmentInfoAsync();
            await LoadExpenseEnumViewBagsAsync(token);

            ViewBag.TicketFileId = safeFileId;
            var normalizedOrigin = (origin ?? string.Empty).Trim().ToLowerInvariant();
            if (normalizedOrigin == "expense-line" && !string.IsNullOrWhiteSpace(sheetId) && !string.IsNullOrWhiteSpace(lineRecId))
            {
                ViewData["TopbarBackUrl"] = $"/Gastos/ExpenseSheetLineDetail?hojaGastosId={Uri.EscapeDataString(sheetId.Trim())}&lineRecId={Uri.EscapeDataString(lineRecId.Trim())}";
            }
            else if (normalizedOrigin == "sheet-link" && !string.IsNullOrWhiteSpace(sheetId))
            {
                ViewData["TopbarBackUrl"] = $"/Gastos/Tickets?action=link&hojaGastosId={Uri.EscapeDataString(sheetId.Trim())}";
            }
            else if (normalizedOrigin == "sheet-create" || normalizedOrigin == "ticket-create")
            {
                var createdTicketDate = DateTime.Today.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
                ViewData["TopbarBackUrl"] =
                    $"/Gastos/Tickets?ticketFileId={Uri.EscapeDataString(safeFileId)}&ticketDate={Uri.EscapeDataString(createdTicketDate)}";
            }
            else
            {
                ViewData["TopbarBackUrl"] = "/Gastos/Tickets";
            }
            return View("~/Web/Views/Gastos/TicketDetail.cshtml");
        }

        // Shows one ticket line detail page.
        [HttpGet]
        public async Task<IActionResult> TicketLineDetail(
            string fileId,
            string lineRecId,
            string mode = "",
            string origin = "",
            string sheetId = "",
            string sheetLineRecId = "")
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            var safeFileId = (fileId ?? string.Empty).Trim();
            var safeLineRecId = (lineRecId ?? string.Empty).Trim();
            var normalizedMode = (mode ?? string.Empty).Trim().ToLowerInvariant();
            var isCreateMode = string.Equals(normalizedMode, "create", StringComparison.OrdinalIgnoreCase);
            var isEditMode = string.Equals(normalizedMode, "edit", StringComparison.OrdinalIgnoreCase);
            if (string.IsNullOrWhiteSpace(safeFileId) || (!isCreateMode && string.IsNullOrWhiteSpace(safeLineRecId)))
                return RedirectToAction(nameof(Tickets));

            await LoadEnvironmentInfoAsync();

            ViewBag.TicketFileId = safeFileId;
            ViewBag.TicketLineRecId = safeLineRecId;
            ViewBag.TicketLineMode = isCreateMode ? "create" : isEditMode ? "edit" : "view";
            var normalizedOrigin = (origin ?? string.Empty).Trim().ToLowerInvariant();
            var backQuery = new List<string>
            {
                $"fileId={Uri.EscapeDataString(safeFileId)}"
            };
            if (!string.IsNullOrWhiteSpace(normalizedOrigin))
                backQuery.Add($"origin={Uri.EscapeDataString(normalizedOrigin)}");
            if (!string.IsNullOrWhiteSpace(sheetId))
                backQuery.Add($"sheetId={Uri.EscapeDataString(sheetId.Trim())}");
            if (!string.IsNullOrWhiteSpace(sheetLineRecId))
                backQuery.Add($"sheetLineRecId={Uri.EscapeDataString(sheetLineRecId.Trim())}");
            ViewData["TopbarBackUrl"] = $"/Gastos/TicketDetail?{string.Join("&", backQuery)}";
            return View("~/Web/Views/Gastos/TicketLineDetail.cshtml");
        }

        // Shows the expense sheet detail page.
        [HttpGet]
        public async Task<IActionResult> ExpenseSheetDetail(string hojaGastosId, string mode = "")
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            var isCreateMode = string.Equals(mode, "create", StringComparison.OrdinalIgnoreCase);
            if (!isCreateMode && string.IsNullOrWhiteSpace(hojaGastosId))
                return RedirectToAction(nameof(ExpenseSheets));

            await LoadEnvironmentInfoAsync();

            ViewBag.HojaGastosId = (hojaGastosId ?? string.Empty).Trim();
            ViewBag.ExpenseSheetMode = isCreateMode ? "create" : "view";
            ViewBag.ExpenseActingUserId = NormalizeOptionalText(TempData[ExpenseSheetLinkController.ActingUserTempDataKey]?.ToString()) ?? string.Empty;
            await LoadExpenseEnumViewBagsAsync(token);
            return View("~/Web/Views/Gastos/ExpenseSheetDetail.cshtml");
        }

        // Shows the expense sheet line detail page.
        [HttpGet]
        public async Task<IActionResult> ExpenseSheetLineDetail(string hojaGastosId, string lineRecId, string mode = "")
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            var normalizedMode = (mode ?? string.Empty).Trim();
            var isCreateMode = string.Equals(normalizedMode, "create", StringComparison.OrdinalIgnoreCase);
            var isEditMode = string.Equals(normalizedMode, "edit", StringComparison.OrdinalIgnoreCase);
            if (string.IsNullOrWhiteSpace(hojaGastosId))
                return RedirectToAction(nameof(ExpenseSheets));

            if (!isCreateMode && string.IsNullOrWhiteSpace(lineRecId))
                return RedirectToAction(nameof(ExpenseSheets));

            await LoadEnvironmentInfoAsync();

            var safeSheetId = hojaGastosId.Trim();
            ViewBag.HojaGastosId = safeSheetId;
            ViewBag.LineRecId = (lineRecId ?? string.Empty).Trim();
            ViewBag.ExpenseSheetLineMode = isCreateMode ? "create" : isEditMode ? "edit" : "view";
            await LoadExpenseEnumViewBagsAsync(token);
            ViewData["TopbarBackUrl"] = $"/Gastos/ExpenseSheetDetail?hojaGastosId={Uri.EscapeDataString(safeSheetId)}";
            return View("~/Web/Views/Gastos/ExpenseSheetLineDetail.cshtml");
        }

        // Lists expense sheets for the list screen.
        // Uses the upstream POST list endpoint with a JSON filter payload.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ListExpenseSheets([FromBody] ExpenseSheetListFilterRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

            if (req == null)
                return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

            var page = req.Page < 1 ? 1 : req.Page;
            var pageSize = req.PageSize <= 0 ? 6 : req.PageSize;
            var listRequest = BuildExpenseSheetListApiRequest(req, page, pageSize);
            var actingUser = await ResolveExpenseActingUserForJsonAsync(token, nameof(ListExpenseSheets));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;

            try
            {
                var result = await _apiClient.GetExpenseSheetsAsync(token, listRequest, requestAxUserId);
                var items = result.GetAnyItems().Select(ToExpenseSheetCard).ToList();
                var responsePage = result.Page > 0 ? result.Page : page;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : pageSize;

                return Json(new
                {
                    success = result.Success || items.Count > 0,
                    message = result.Message,
                    total = result.Total > 0 ? result.Total : items.Count,
                    page = responsePage,
                    pageSize = responsePageSize,
                    items
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ListExpenseSheets");
                return StatusCode(StatusCodes.Status502BadGateway, new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ListExpenseSheets");
                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // API route used by React clients for /api/crm/expensesheets/list.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetsList([FromBody] ExpenseSheetListApiRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            req ??= new ExpenseSheetListApiRequest();
            var page = req.Page < 1 ? 1 : req.Page;
            var pageSize = req.PageSize <= 0 ? 50 : req.PageSize;

            var payload = new ExpenseSheetListApiRequest
            {
                Filter = NormalizeOptionalText(req.Filter),
                BilledMode = req.BilledMode is >= 0 and <= 2 ? req.BilledMode : null,
                CreatedDateFrom = NormalizeListDateFilter(req.CreatedDateFrom),
                CreatedDateTo = NormalizeListDateFilter(req.CreatedDateTo),
                ProjId = NormalizeOptionalText(req.ProjId),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode),
                ExpenseSheetStatus = req.ExpenseSheetStatus is >= 0 ? req.ExpenseSheetStatus : null,
                ReimbursableExpense = NormalizeExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense),
                IncludeSubordinates = req.IncludeSubordinates,
                Page = page,
                PageSize = pageSize
            };
            var actingUser = await ResolveExpenseActingUserForPagedAsync(token, nameof(ApiExpenseSheetsList));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            _logger.LogInformation(
                "ApiExpenseSheetsList request trace. hojaGastosId={HojaGastosId} X-IND-AxUserId={AxUserId} page={Page} pageSize={PageSize} includeSubordinates={IncludeSubordinates}",
                payload.Filter ?? string.Empty,
                requestAxUserId ?? string.Empty,
                page,
                pageSize,
                payload.IncludeSubordinates);

            try
            {
                var result = await _apiClient.GetExpenseSheetsAsync(token, payload, requestAxUserId);
                var items = result.GetAnyItems()
                    .Select(ToExpenseSheetApiListItem)
                    .ToList();
                var responsePage = result.Page > 0 ? result.Page : page;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : pageSize;

                if (!result.Success && items.Count == 0)
                {
                    _logger.LogWarning(
                        "ApiExpenseSheetsList upstream returned non-success. Message={Message} TraceId={TraceId} page={Page} pageSize={PageSize} billedMode={BilledMode} createdDateFrom={CreatedDateFrom} createdDateTo={CreatedDateTo} projId={ProjId} currencyCode={CurrencyCode} expenseSheetStatus={ExpenseSheetStatus} includeSubordinates={IncludeSubordinates}",
                        result.Message ?? string.Empty,
                        result.TraceId ?? string.Empty,
                        page,
                        pageSize,
                        payload.BilledMode.HasValue ? payload.BilledMode.Value.ToString(CultureInfo.InvariantCulture) : "null",
                        payload.CreatedDateFrom ?? string.Empty,
                        payload.CreatedDateTo ?? string.Empty,
                        payload.ProjId ?? string.Empty,
                        payload.CurrencyCode ?? string.Empty,
                        payload.ExpenseSheetStatus.HasValue ? payload.ExpenseSheetStatus.Value.ToString(CultureInfo.InvariantCulture) : "null",
                        payload.IncludeSubordinates);
                }

                return CreateApiPagedResponse(new
                {
                    Success = result.Success || items.Count > 0,
                    Message = result.Message ?? string.Empty,
                    Total = result.Total > 0 ? result.Total : items.Count,
                    Page = responsePage,
                    PageSize = responsePageSize,
                    Items = items,
                    TraceId = result.TraceId
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetsList");
                return CreateApiPagedError(StatusCodes.Status502BadGateway, _sr["Api_RequestFailed"].Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetsList");
                return CreateApiPagedError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value);
            }
        }

        // API route used by React clients for /api/ia/service/expensesheets/ask.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetsAsk([FromBody] ExpenseSheetsAskRequest? req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
            {
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");
            }

            req ??= new ExpenseSheetsAskRequest();
            var hasSourceJson = req.SourceJson.HasValue &&
                                req.SourceJson.Value.ValueKind != JsonValueKind.Null &&
                                req.SourceJson.Value.ValueKind != JsonValueKind.Undefined;
            var request = new ExpenseSheetsAskRequest
            {
                Question = NormalizeOptionalText(req.Question),
                AnswerInstructions = NormalizeOptionalText(req.AnswerInstructions),
                ListRequest = req.ListRequest == null
                    ? null
                    : new ExpenseSheetListApiRequest
                    {
                        Filter = NormalizeOptionalText(req.ListRequest.Filter),
                        BilledMode = req.ListRequest.BilledMode is >= 0 and <= 2 ? req.ListRequest.BilledMode : null,
                        CreatedDateFrom = NormalizeListDateFilter(req.ListRequest.CreatedDateFrom),
                        CreatedDateTo = NormalizeListDateFilter(req.ListRequest.CreatedDateTo),
                        ProjId = NormalizeOptionalText(req.ListRequest.ProjId),
                        CurrencyCode = NormalizeOptionalText(req.ListRequest.CurrencyCode)?.ToUpperInvariant(),
                        ExpenseSheetStatus = req.ListRequest.ExpenseSheetStatus is >= 0 ? req.ListRequest.ExpenseSheetStatus : null,
                        ReimbursableExpense = NormalizeExpenseSheetHeaderReimbursableExpense(req.ListRequest.ReimbursableExpense),
                        IncludeSubordinates = req.ListRequest.IncludeSubordinates,
                        Page = req.ListRequest.Page < 1 ? 1 : req.ListRequest.Page,
                        PageSize = req.ListRequest.PageSize <= 0 ? 50 : req.ListRequest.PageSize
                    },
                SourceJson = req.SourceJson
            };

            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetsAsk));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;

            _logger.LogInformation(
                "ApiExpenseSheetsAsk request. QuestionLength={QuestionLength}. HasListRequest={HasListRequest}. HasSourceJson={HasSourceJson}. X-IND-AxUserId={AxUserId}",
                request.Question?.Length ?? 0,
                request.ListRequest != null,
                hasSourceJson,
                requestAxUserId ?? string.Empty);

            try
            {
                var askResult = await SendExpenseSheetsAskWithContextRecoveryAsync(token, request, requestAxUserId);
                if (askResult.Error != null)
                    return askResult.Error;

                var transport = askResult.Transport;

                var response = transport.Response;
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();
                var retryAfter = transport.Headers
                    .FirstOrDefault(entry => string.Equals(entry.Key, "Retry-After", StringComparison.OrdinalIgnoreCase))
                    .Value?
                    .FirstOrDefault();

                if (!string.IsNullOrWhiteSpace(retryAfter))
                {
                    Response.Headers["Retry-After"] = retryAfter;
                }

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    },
                    (int)transport.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetsAsk");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetsAsk");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // Retries one expense assistant call when the upstream API lost its company bootstrap context.
        private async Task<(ApiTransportResponse<ExpenseSheetsAskResponseData> Transport, IActionResult? Error)>
            SendExpenseSheetsAskWithContextRecoveryAsync(
                string token,
                ExpenseSheetsAskRequest request,
                string? axUserIdOverride)
        {
            var transport = await _apiClient.AskExpenseSheetsAsync(
                token,
                request,
                axUserIdOverride,
                HttpContext.RequestAborted);

            if (!IsExpenseAssistantContextBootstrapFailure(transport))
            {
                return (transport, null);
            }

            _logger.LogWarning(
                "Expense assistant ask lost upstream company context. Refreshing cached context and retrying once. StatusCode={StatusCode}. Message={Message}",
                (int)transport.StatusCode,
                transport.Response?.Message ?? string.Empty);

            _authContext.ClearContextCache(preserveCompanySelection: true);
            HttpContext.Items.Remove(ExpenseSubordinatesScopeCacheKey);

            var refreshedContext = await _authContext.EnsureContextAsync();
            if (!refreshedContext.Success || refreshedContext.Context == null)
            {
                _logger.LogWarning(
                    "Expense assistant context refresh failed before retry. Message={Message}",
                    refreshedContext.Message ?? string.Empty);
                return (transport, null);
            }

            var requestedAxUserId = GetRequestedExpenseAxUserId();
            var retryAxUserIdOverride = axUserIdOverride;
            if (!string.IsNullOrWhiteSpace(requestedAxUserId))
            {
                var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetsAsk));
                if (actingUser.Error != null)
                    return (transport, actingUser.Error);

                retryAxUserIdOverride = actingUser.AxUserId;
            }

            var retryTransport = await _apiClient.AskExpenseSheetsAsync(
                token,
                request,
                retryAxUserIdOverride,
                HttpContext.RequestAborted);

            _logger.LogInformation(
                "Expense assistant ask retry after context refresh completed. StatusCode={StatusCode}. Success={Success}. Message={Message}",
                (int)retryTransport.StatusCode,
                retryTransport.Response?.Success,
                retryTransport.Response?.Message ?? string.Empty);

            return (retryTransport, null);
        }

        // API route used by React clients for /api/crm/expensesheets/currencies.
        [HttpGet]
        public async Task<IActionResult> ApiExpenseSheetsCurrencies()
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            var currentAxUserId = GetCurrentSessionAxUserId();

            try
            {
                _logger.LogInformation(
                    "ApiExpenseSheetsCurrencies request trace. X-IND-AxUserId={AxUserId}",
                    currentAxUserId ?? string.Empty);

                var result = await _apiClient.GetExpenseSheetCurrenciesAsync(token, currentAxUserId);
                var items = result.GetAnyItems()
                    .Select(ToExpenseSheetCurrencyApiItem)
                    .Where(x => !string.IsNullOrWhiteSpace(x.CurrencyCode) || !string.IsNullOrWhiteSpace(x.CurrencyCodeISO))
                    .GroupBy(
                        x => string.IsNullOrWhiteSpace(x.CurrencyCodeISO) ? x.CurrencyCode : x.CurrencyCodeISO,
                        StringComparer.OrdinalIgnoreCase)
                    .Select(x => x.First())
                    .ToList();
                var responsePage = result.Page > 0 ? result.Page : 1;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : items.Count;

                return CreateApiPagedResponse(new
                {
                    Success = result.Success || items.Count > 0,
                    Message = result.Message ?? string.Empty,
                    Total = result.Total > 0 ? result.Total : items.Count,
                    Page = responsePage,
                    PageSize = responsePageSize,
                    Items = items,
                    TraceId = result.TraceId
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetsCurrencies");
                return CreateApiPagedError(StatusCodes.Status502BadGateway, _sr["Api_RequestFailed"].Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetsCurrencies");
                return CreateApiPagedError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value);
            }
        }

        // API route used by React clients for /api/crm/expensesheets/subordinates.
        [HttpGet]
        public async Task<IActionResult> ApiExpenseSheetsSubordinates()
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            var currentAxUserId = GetCurrentSessionAxUserId();
            var cachedContext = _authContext.GetCachedContext();
            var selectedCompanyId = GetSelectedExpenseCompanyIdForLogs();
            var selectionSource = NormalizeOptionalText(HttpContext.Session.GetString("INDCompanySelectionSource"));

            try
            {
                _logger.LogInformation(
                    "ApiExpenseSheetsSubordinates request trace. SessionAxUser={SessionAxUser}; ContextAxUser={ContextAxUser}; SelectedCompany={SelectedCompany}; DefaultCompany={DefaultCompany}; SelectionSource={SelectionSource}; CachedCompanyCount={CachedCompanyCount}; X-IND-AxUserId={AxUserId}",
                    currentAxUserId ?? string.Empty,
                    NormalizeOptionalText(cachedContext?.Header?.AxUserId) ?? string.Empty,
                    selectedCompanyId ?? string.Empty,
                    NormalizeOptionalText(cachedContext?.Header?.DefaultCompany) ?? string.Empty,
                    selectionSource ?? string.Empty,
                    cachedContext?.Companies?.Count ?? 0,
                    currentAxUserId ?? string.Empty);

                var result = await _apiClient.GetExpenseSheetSubordinatesAsync(token, currentAxUserId);
                var items = result.GetAnyItems()
                    .Select(ToExpenseSheetSubordinateApiItem)
                    .Where(x =>
                        !string.IsNullOrWhiteSpace(x.AxUserId) ||
                        !string.IsNullOrWhiteSpace(x.UserId))
                    .GroupBy(
                        x => !string.IsNullOrWhiteSpace(x.AxUserId)
                            ? x.AxUserId
                            : x.UserId,
                        StringComparer.OrdinalIgnoreCase)
                    .Select(x => x.First())
                    .ToList();
                var responsePage = result.Page > 0 ? result.Page : 1;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : items.Count;
                _logger.LogInformation(
                    "ApiExpenseSheetsSubordinates response trace. Success={Success}; Message={Message}; ErrorCode={ErrorCode}; TraceId={TraceId}; ItemCount={ItemCount}; Total={Total}; Page={Page}; PageSize={PageSize}; SessionAxUser={SessionAxUser}; ContextAxUser={ContextAxUser}; SelectedCompany={SelectedCompany}; DefaultCompany={DefaultCompany}",
                    result.Success,
                    result.Message ?? string.Empty,
                    result.ErrorCode ?? string.Empty,
                    result.TraceId ?? string.Empty,
                    items.Count,
                    result.Total,
                    responsePage,
                    responsePageSize,
                    currentAxUserId ?? string.Empty,
                    NormalizeOptionalText(cachedContext?.Header?.AxUserId) ?? string.Empty,
                    selectedCompanyId ?? string.Empty,
                    NormalizeOptionalText(cachedContext?.Header?.DefaultCompany) ?? string.Empty);

                return CreateApiPagedResponse(new
                {
                    Success = result.Success || items.Count > 0,
                    Message = result.Message ?? string.Empty,
                    Total = result.Total > 0 ? result.Total : items.Count,
                    Page = responsePage,
                    PageSize = responsePageSize,
                    Items = items,
                    TraceId = result.TraceId
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetsSubordinates");
                return CreateApiPagedError(StatusCodes.Status502BadGateway, _sr["Api_RequestFailed"].Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetsSubordinates");
                return CreateApiPagedError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value);
            }
        }

        // API route used by React clients for /api/system/exchange-rate.
        [HttpGet]
        public async Task<IActionResult> ApiSystemExchangeRate(string baseCurrency, string targetCurrency, string? date)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_SessionExpired"].Value,
                        ErrorCode = "SESSION_EXPIRED",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status401Unauthorized);

            var normalizedBaseCurrency = (baseCurrency ?? string.Empty).Trim().ToUpperInvariant();
            var normalizedTargetCurrency = (targetCurrency ?? string.Empty).Trim().ToUpperInvariant();
            var normalizedDate = NormalizeListDateFilter(date) ?? DateTime.Now.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (string.IsNullOrWhiteSpace(normalizedBaseCurrency) || string.IsNullOrWhiteSpace(normalizedTargetCurrency))
            {
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "INVALID_REQUEST",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status400BadRequest);
            }

            try
            {
                var response = await _apiClient.GetExchangeRateAsync(
                    token,
                    normalizedBaseCurrency,
                    normalizedTargetCurrency,
                    normalizedDate);

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = response.Errors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiSystemExchangeRate");
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "UPSTREAM_ERROR",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status502BadGateway);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiSystemExchangeRate");
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "UNHANDLED_ERROR",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status500InternalServerError);
            }
        }

        // API route used by React clients for /api/system/exchange-rate/public-direct.
        [HttpGet]
        public async Task<IActionResult> ApiSystemExchangeRatePublicDirect(string baseCurrency, string targetCurrency, string? date)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_SessionExpired"].Value,
                        ErrorCode = "SESSION_EXPIRED",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status401Unauthorized);

            var normalizedBaseCurrency = (baseCurrency ?? string.Empty).Trim().ToUpperInvariant();
            var normalizedTargetCurrency = (targetCurrency ?? string.Empty).Trim().ToUpperInvariant();
            var normalizedDate = NormalizeListDateFilter(date) ?? DateTime.Now.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (string.IsNullOrWhiteSpace(normalizedBaseCurrency) || string.IsNullOrWhiteSpace(normalizedTargetCurrency))
            {
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "INVALID_REQUEST",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status400BadRequest);
            }

            try
            {
                var response = await _apiClient.GetExchangeRatePublicDirectAsync(
                    token,
                    normalizedBaseCurrency,
                    normalizedTargetCurrency,
                    normalizedDate);

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = response.Errors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiSystemExchangeRatePublicDirect");
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "UPSTREAM_ERROR",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status502BadGateway);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiSystemExchangeRatePublicDirect");
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "UNHANDLED_ERROR",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status500InternalServerError);
            }
        }

        // API route used by React clients for /api/crm/expensesheets/fuel-price-km.
        [HttpGet]
        public async Task<IActionResult> ApiExpenseSheetFuelPriceKm(string transDate)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
            {
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_SessionExpired"].Value,
                        ErrorCode = "SESSION_EXPIRED",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status401Unauthorized);
            }

            var normalizedDate = NormalizeLineTransDate(transDate);
            if (string.IsNullOrWhiteSpace(normalizedDate))
            {
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "INVALID_REQUEST",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status400BadRequest);
            }

            try
            {
                var response = await _apiClient.GetFuelPriceKmAsync(token, normalizedDate);
                var normalizedData = response.Data == null
                    ? null
                    : new FuelPriceKmDto
                    {
                        PriceKm = response.Data.PriceKm,
                        Source = response.Data.Source ?? string.Empty,
                        TransDate = string.IsNullOrWhiteSpace(response.Data.TransDate)
                            ? normalizedDate
                            : response.Data.TransDate
                    };

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = normalizedData,
                        Errors = response.Errors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetFuelPriceKm");
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "UPSTREAM_ERROR",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status502BadGateway);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetFuelPriceKm");
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        ErrorCode = "UNHANDLED_ERROR",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status500InternalServerError);
            }
        }

        // API route used by React clients for /api/ia/service/expensefromticket.
        [HttpPost]
        [RequestSizeLimit(52428800)]
        [RequestFormLimits(MultipartBodyLengthLimit = 52428800)]
        public async Task<IActionResult> ApiExpenseFromTicket(
            [FromForm] IFormFile? ticketImage,
            [FromForm] string? persistTicket,
            [FromForm] string? ticketUrlFile)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
            {
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_SessionExpired"].Value,
                        ErrorCode = "SESSION_EXPIRED",
                        Data = (object?)null,
                        Errors = Array.Empty<object>()
                    },
                    StatusCodes.Status401Unauthorized);
            }

            if (ticketImage == null || ticketImage.Length <= 0)
            {
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            }

            var safeTicketFileName = Path.GetFileName(ticketImage.FileName ?? "ticket.jpg");
            var normalizedContentType = (ticketImage.ContentType ?? string.Empty).Trim();
            var normalizedExtension = Path.GetExtension(ticketImage.FileName ?? string.Empty).TrimStart('.').Trim();
            var hasAllowedContentType = !string.IsNullOrWhiteSpace(normalizedContentType) &&
                                        AllowedTicketImageContentTypes.Contains(normalizedContentType);
            var hasAllowedExtension = !string.IsNullOrWhiteSpace(normalizedExtension) &&
                                      AllowedTicketImageExtensions.Contains(normalizedExtension);

            _logger.LogInformation(
                "ApiExpenseFromTicket request received. FileName: {FileName}. SizeBytes: {SizeBytes}. ContentType: {ContentType}. Extension: {Extension}. PersistRaw: {PersistRaw}. TicketUrlFilePresent: {HasTicketUrlFile}",
                safeTicketFileName,
                ticketImage.Length,
                string.IsNullOrWhiteSpace(normalizedContentType) ? "<empty>" : normalizedContentType,
                string.IsNullOrWhiteSpace(normalizedExtension) ? "<empty>" : normalizedExtension,
                string.IsNullOrWhiteSpace(persistTicket) ? "<empty>" : persistTicket,
                !string.IsNullOrWhiteSpace(NormalizeOptionalText(ticketUrlFile)));

            if (!hasAllowedContentType && !hasAllowedExtension)
            {
                _logger.LogWarning(
                    "ApiExpenseFromTicket validation rejected file. FileName: {FileName}. ContentType: {ContentType}. Extension: {Extension}.",
                    safeTicketFileName,
                    string.IsNullOrWhiteSpace(normalizedContentType) ? "<empty>" : normalizedContentType,
                    string.IsNullOrWhiteSpace(normalizedExtension) ? "<empty>" : normalizedExtension);

                return CreateApiCommandError(
                    StatusCodes.Status422UnprocessableEntity,
                    _sr["ExpenseSheets_NewTicket_Error_FileType"].Value,
                    "VALIDATION_ERROR");
            }

            var persistRaw = (persistTicket ?? string.Empty).Trim();
            bool? persistValue = null;
            if (!string.IsNullOrWhiteSpace(persistRaw))
            {
                if (string.Equals(persistRaw, "1", StringComparison.OrdinalIgnoreCase))
                {
                    persistValue = true;
                }
                else if (string.Equals(persistRaw, "0", StringComparison.OrdinalIgnoreCase))
                {
                    persistValue = false;
                }
                else if (bool.TryParse(persistRaw, out var parsedPersist))
                {
                    persistValue = parsedPersist;
                }
            }

            try
            {
                var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseFromTicket));
                if (actingUser.Error != null)
                    return actingUser.Error;
                var requestAxUserId = actingUser.AxUserId;
                using var stream = ticketImage.OpenReadStream();
                var response = await _apiClient.ExpenseFromTicketAsync(
                    token,
                    stream,
                    safeTicketFileName,
                    ticketImage.ContentType,
                    persistValue,
                    NormalizeOptionalText(ticketUrlFile),
                    requestAxUserId,
                    HttpContext.RequestAborted);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                _logger.LogInformation(
                    "ApiExpenseFromTicket completed. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. PersistValue: {PersistValue}.",
                    response.Success,
                    response.ErrorCode ?? "<null>",
                    response.TraceId ?? "<null>",
                    persistValue.HasValue ? persistValue.Value.ToString() : "<null>");

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(
                    ex,
                    "Upstream API error in ApiExpenseFromTicket. FileName: {FileName}. ContentType: {ContentType}. Extension: {Extension}. PersistValue: {PersistValue}.",
                    safeTicketFileName,
                    string.IsNullOrWhiteSpace(normalizedContentType) ? "<empty>" : normalizedContentType,
                    string.IsNullOrWhiteSpace(normalizedExtension) ? "<empty>" : normalizedExtension,
                    persistValue.HasValue ? persistValue.Value.ToString() : "<null>");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Unhandled error in ApiExpenseFromTicket. FileName: {FileName}. ContentType: {ContentType}. Extension: {Extension}. PersistValue: {PersistValue}.",
                    safeTicketFileName,
                    string.IsNullOrWhiteSpace(normalizedContentType) ? "<empty>" : normalizedContentType,
                    string.IsNullOrWhiteSpace(normalizedExtension) ? "<empty>" : normalizedExtension,
                    persistValue.HasValue ? persistValue.Value.ToString() : "<null>");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/{hojaGastosId}.
        [HttpGet]
        public async Task<IActionResult> ApiExpenseSheetDetail(string hojaGastosId)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            var safeSheetId = NormalizeOptionalText(hojaGastosId);
            if (string.IsNullOrWhiteSpace(safeSheetId))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);
            var actingUser = await ResolveExpenseActingUserForPagedAsync(token, nameof(ApiExpenseSheetDetail));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            _logger.LogInformation(
                "ApiExpenseSheetDetail request trace. hojaGastosId={HojaGastosId} X-IND-AxUserId={AxUserId}",
                safeSheetId,
                requestAxUserId ?? string.Empty);

            try
            {
                var result = await _apiClient.GetExpenseSheetDetailAsync(token, safeSheetId, requestAxUserId);
                var sheet = SelectSheet(result.GetAnyItems(), safeSheetId);
                if (sheet == null)
                {
                    LogExpenseSheetLookupMiss(
                        nameof(ApiExpenseSheetDetail),
                        safeSheetId,
                        requestAxUserId,
                        result,
                        "Returning 404 because the upstream detail envelope produced no selectable sheet item.");
                    return CreateApiPagedError(StatusCodes.Status404NotFound, _sr["ExpenseSheets_NotFound"].Value);
                }
                var detailItem = ToExpenseSheetApiDetailItem(sheet);
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetDetail),
                    "response",
                    ("hojaGastosId", safeSheetId),
                    ("requestedAxUserId", requestAxUserId),
                    ("traceId", result.TraceId ?? string.Empty),
                    ("currencyCode", ReadExpenseSheetCurrencyCodeForTrace(sheet)),
                    ("exchangeRate", ReadExpenseSheetExchangeRateForTrace(sheet)),
                    ("lineCount", sheet.Lines?.Count ?? 0));

                return CreateApiPagedResponse(new
                {
                    Success = result.Success || sheet != null,
                    Message = result.Message ?? string.Empty,
                    Total = 1,
                    Page = 1,
                    PageSize = 1,
                    Items = new[] { detailItem },
                    TraceId = result.TraceId
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetDetail");
                return CreateApiPagedError(StatusCodes.Status502BadGateway, _sr["Api_RequestFailed"].Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetDetail");
                return CreateApiPagedError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value);
            }
        }

        // API route used by React clients for /api/crm/expensesheets.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetsCreate([FromBody] ExpenseSheetCreateRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            req ??= new ExpenseSheetCreateRequest();
            var normalizedMode = req.Mode is >= 0 and <= 2 ? req.Mode : 0;
            var normalizedExistingSheetId = NormalizeOptionalText(req.ExistingHojaGastosId);
            var normalizedCurrency = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant();
            var normalizedExchRate = req.ExchRate.HasValue && req.ExchRate.Value > 0m
                ? NormalizeExpenseSheetExchangeRateForWrite(normalizedCurrency, req.ExchRate)
                : (decimal?)null;
            var normalizedDescription = (req.Description ?? string.Empty).Trim();
            if (normalizedMode != 2 && !IsValidExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var sourceLines = req.Lines ?? new List<ExpenseSheetLineRequest>();
            var hasInvalidLineReimbursableExpense = sourceLines.Any(line =>
                line != null && !IsValidExpenseSheetLineReimbursableExpense(line.ReimbursableExpense));
            var normalizedLines = sourceLines
                .Where(line => line != null)
                .Select(line => new ExpenseSheetLineRequest
                {
                    TransDate = line.TransDate,
                    TypeValue = line.TypeValue,
                    Description = (line.Description ?? string.Empty).Trim(),
                    Internacional = line.Internacional,
                    FileId = NormalizeOptionalText(line.FileId),
                    Ticket = line.Ticket,
                    Qty = line.Qty,
                    Price = line.Price,
                    ProjId = NormalizeOptionalText(line.ProjId),
                    ReimbursableExpense = NormalizeExpenseSheetLineReimbursableExpense(line.ReimbursableExpense),
                    CurrencyCode = NormalizeOptionalText(line.CurrencyCode)?.ToUpperInvariant(),
                    AmountMST = line.AmountMST,
                    ExchRate = line.ExchRate > 0 ? line.ExchRate : null,
                    IndAttachFiles = line.IndAttachFiles ?? string.Empty
                })
                .ToList();
            var hasInvalidLines = normalizedLines.Any(line =>
                line == null ||
                string.IsNullOrWhiteSpace(NormalizeLineTransDate(line.TransDate)) ||
                line.TypeValue <= 0 ||
                line.Qty <= 0 ||
                line.Price <= 0);

            var request = new ExpenseSheetCreateRequest
            {
                UserId = NormalizeOptionalText(req.UserId),
                Mode = normalizedMode,
                ExistingHojaGastosId = normalizedExistingSheetId,
                Description = normalizedDescription,
                CurrencyCode = normalizedCurrency,
                ExchRate = normalizedExchRate,
                ProjId = NormalizeOptionalText(req.ProjId),
                ExpenseSheetStatus = req.ExpenseSheetStatus is >= 0 ? req.ExpenseSheetStatus : null,
                ExchangeRateMode = req.ExchangeRateMode is >= 0 ? req.ExchangeRateMode : null,
                ReimbursableExpense = NormalizeExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense),
                Lines = normalizedLines
            };

            // Mode 1 creates only header so lines must be empty.
            if (normalizedMode == 1)
            {
                request.Lines = new List<ExpenseSheetLineRequest>();
            }
            else if (hasInvalidLines || hasInvalidLineReimbursableExpense)
            {
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            }

            // Mode 2 adds lines to existing header and does not need header fields.
            if (normalizedMode == 2)
            {
                request.Description = string.Empty;
                request.CurrencyCode = null;
                request.ExchRate = null;
                request.ProjId = null;
            }

            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetsCreate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            _logger.LogInformation(
                "ApiExpenseSheetsCreate request trace. mode={Mode} existingHojaGastosId={ExistingHojaGastosId} X-IND-AxUserId={AxUserId}",
                normalizedMode,
                normalizedExistingSheetId ?? string.Empty,
                requestAxUserId ?? string.Empty);
            if (normalizedMode != 2)
            {
                var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetsCreate));
                if (managedUserGuard != null)
                    return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);
            }
            if (normalizedMode == 2 && !string.IsNullOrWhiteSpace(normalizedExistingSheetId))
            {
                var mutationGuard = await ValidateExpenseSheetMutationAsync(
                    token,
                    normalizedExistingSheetId,
                    requestAxUserId,
                    nameof(ApiExpenseSheetsCreate),
                    ExpenseSheetMutationType.LineMutation);
                if (!mutationGuard.Allowed)
                {
                    _logger.LogWarning(
                        "ApiExpenseSheetsCreate mutation guard denied. Mode: {Mode}. ExistingHojaGastosId: {ExistingHojaGastosId}. SelectedCompany: {SelectedCompany}. AxUserId: {AxUserId}. StatusCode: {StatusCode}. ErrorCode: {ErrorCode}. Message: {Message}.",
                        normalizedMode,
                        normalizedExistingSheetId ?? "<empty>",
                        GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                        requestAxUserId ?? "<empty>",
                        mutationGuard.StatusCode,
                        mutationGuard.ErrorCode ?? "<empty>",
                        mutationGuard.Message ?? "<empty>");
                    return CreateApiCommandError(
                        mutationGuard.StatusCode,
                        mutationGuard.Message ?? _sr["Api_RequestFailed"].Value,
                        mutationGuard.ErrorCode ?? "UNKNOWN_ERROR");
                }
            }

            try
            {
                var response = await _apiClient.CreateExpenseSheetAsync(token, request, requestAxUserId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                if (!response.Success)
                {
                    _logger.LogWarning(
                        "ApiExpenseSheetsCreate upstream logical failure. Mode: {Mode}. ExistingHojaGastosId: {ExistingHojaGastosId}. SelectedCompany: {SelectedCompany}. AxUserId: {AxUserId}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. Message: {Message}.",
                        normalizedMode,
                        normalizedExistingSheetId ?? "<empty>",
                        GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                        requestAxUserId ?? "<empty>",
                        response.ErrorCode ?? "<null>",
                        response.TraceId ?? "<null>",
                        response.Message ?? "<null>");
                }

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetsCreate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetsCreate");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/{hojaGastosId}.
        [HttpPut]
        public async Task<IActionResult> ApiExpenseSheetUpdate(string hojaGastosId, [FromBody] ExpenseSheetUpdateRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeSheetId = NormalizeOptionalText(hojaGastosId);
            if (string.IsNullOrWhiteSpace(safeSheetId) ||
                req == null ||
                !IsValidExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var normalizedCurrency = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant();
            var normalizedExchRate = req.ExchRate.HasValue && req.ExchRate.Value > 0m
                ? NormalizeExpenseSheetExchangeRateForWrite(normalizedCurrency, req.ExchRate)
                : (decimal?)null;

            var normalizedExpenseSheetStatus = req.ExpenseSheetStatus.HasValue && req.ExpenseSheetStatus.Value >= 0
                ? req.ExpenseSheetStatus.Value
                : (int?)null;
            var normalizedExchangeRateMode = req.ExchangeRateMode.HasValue && req.ExchangeRateMode.Value >= 0
                ? req.ExchangeRateMode.Value
                : (int?)null;
            var normalizedEstadoComentarios = NormalizeOptionalClearableText(req.EstadoComentarios);
            var normalizedVoucher = NormalizeOptionalText(req.Voucher);

            var request = new ExpenseSheetUpdateRequest
            {
                Description = (req.Description ?? string.Empty).Trim(),
                CurrencyCode = normalizedCurrency,
                ExchRate = normalizedExchRate,
                ProjId = NormalizeOptionalText(req.ProjId),
                Voucher = normalizedVoucher,
                ExpenseSheetStatus = normalizedExpenseSheetStatus,
                ExchangeRateMode = normalizedExchangeRateMode,
                EstadoComentarios = normalizedEstadoComentarios,
                ReimbursableExpense = NormalizeExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense)
            };

            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetUpdate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var mutationGuard = await ValidateExpenseSheetMutationAsync(
                token,
                safeSheetId,
                requestAxUserId,
                nameof(ApiExpenseSheetUpdate),
                ExpenseSheetMutationType.HeaderUpdate,
                request);
            if (!mutationGuard.Allowed)
                return CreateApiCommandError(mutationGuard.StatusCode, mutationGuard.Message, mutationGuard.ErrorCode);

            var effectiveRequest = BuildExpenseSheetEffectiveHeaderUpdateRequest(
                mutationGuard,
                request,
                nameof(ApiExpenseSheetUpdate),
                safeSheetId);
            var actorAxUserId = await ResolveManagedExpenseStatusActorAxUserIdAsync(
                token,
                requestAxUserId,
                mutationGuard,
                effectiveRequest,
                nameof(ApiExpenseSheetUpdate));

            try
            {
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetUpdate),
                    "request",
                    ("hojaGastosId", safeSheetId),
                    ("requestedAxUserId", requestAxUserId),
                    ("actorAxUserId", actorAxUserId),
                    ("currencyCode", effectiveRequest.CurrencyCode),
                    ("exchangeRate", effectiveRequest.ExchRate),
                    ("projectId", effectiveRequest.ProjId),
                    ("expenseSheetStatus", effectiveRequest.ExpenseSheetStatus),
                    ("exchangeRateMode", effectiveRequest.ExchangeRateMode));
                var response = await _apiClient.UpdateExpenseSheetHeaderAsync(
                    token,
                    safeSheetId,
                    effectiveRequest,
                    requestAxUserId,
                    actorAxUserId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetUpdate),
                    "response",
                    ("hojaGastosId", safeSheetId),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", effectiveRequest.CurrencyCode),
                    ("exchangeRate", effectiveRequest.ExchRate),
                    ("success", response.Success),
                    ("traceId", response.TraceId ?? string.Empty),
                    ("message", response.Message ?? string.Empty));

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetUpdate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetUpdate");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // Proxies reimbursement propagation while preserving the existing expense sheet mutation policy.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetReimbursableExpensePropagate(string hojaGastosId)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeSheetId = NormalizeOptionalText(hojaGastosId);
            if (string.IsNullOrWhiteSpace(safeSheetId))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var actingUser = await ResolveExpenseActingUserForCommandAsync(
                token,
                nameof(ApiExpenseSheetReimbursableExpensePropagate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;

            var mutationGuard = await ValidateExpenseSheetMutationAsync(
                token,
                safeSheetId,
                requestAxUserId,
                nameof(ApiExpenseSheetReimbursableExpensePropagate),
                ExpenseSheetMutationType.LineMutation);
            if (!mutationGuard.Allowed)
                return CreateApiCommandError(mutationGuard.StatusCode, mutationGuard.Message, mutationGuard.ErrorCode);

            if (mutationGuard.Snapshot?.ReimbursableExpense == 2)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            try
            {
                var response = await _apiClient.PropagateExpenseSheetReimbursableExpenseAsync(
                    token,
                    safeSheetId,
                    requestAxUserId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetReimbursableExpensePropagate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetReimbursableExpensePropagate");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}.
        [HttpPut]
        public async Task<IActionResult> ApiExpenseSheetLineUpdate(
            string hojaGastosId,
            string lineRecId,
            [FromBody] ExpenseSheetLineRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeSheetId = NormalizeOptionalText(hojaGastosId);
            var safeLineId = NormalizeOptionalText(lineRecId);
            if (string.IsNullOrWhiteSpace(safeSheetId) || string.IsNullOrWhiteSpace(safeLineId) || req == null)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var normalizedDate = NormalizeLineTransDate(req.TransDate);
            if (string.IsNullOrWhiteSpace(normalizedDate) ||
                req.TypeValue <= 0 ||
                req.Qty <= 0 ||
                req.Price <= 0 ||
                !IsValidExpenseSheetLineReimbursableExpense(req.ReimbursableExpense))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var request = new ExpenseSheetLineRequest
            {
                TransDate = normalizedDate,
                TypeValue = req.TypeValue,
                Description = (req.Description ?? string.Empty).Trim(),
                Internacional = req.Internacional,
                FileId = NormalizeOptionalText(req.FileId),
                Ticket = req.Ticket,
                Qty = req.Qty,
                Price = req.Price,
                ProjId = NormalizeOptionalText(req.ProjId),
                ReimbursableExpense = NormalizeExpenseSheetLineReimbursableExpense(req.ReimbursableExpense),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                AmountMST = req.AmountMST,
                ExchRate = req.ExchRate > 0 ? req.ExchRate : null,
                IndAttachFiles = req.IndAttachFiles ?? string.Empty
            };

            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetLineUpdate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var mutationGuard = await ValidateExpenseSheetMutationAsync(
                token,
                safeSheetId,
                requestAxUserId,
                nameof(ApiExpenseSheetLineUpdate),
                ExpenseSheetMutationType.LineMutation);
            if (!mutationGuard.Allowed)
                return CreateApiCommandError(mutationGuard.StatusCode, mutationGuard.Message, mutationGuard.ErrorCode);

            try
            {
                var response = await _apiClient.UpdateExpenseSheetLineAsync(
                    token,
                    safeSheetId,
                    safeLineId,
                    request,
                    requestAxUserId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetLineUpdate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetLineUpdate");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}.
        [HttpDelete]
        public async Task<IActionResult> ApiExpenseSheetLineDelete(
            string hojaGastosId,
            string lineRecId,
            [FromQuery] bool deleteWholeSheet = false,
            [FromQuery] int? deleteMode = null)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var resolvedDeleteMode = deleteMode ?? (deleteWholeSheet ? 2 : 0);
            if (resolvedDeleteMode < 0 || resolvedDeleteMode > 2)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var resolvedDeleteWholeSheet = resolvedDeleteMode == 1 || resolvedDeleteMode == 2;
            var safeSheetId = NormalizeOptionalText(hojaGastosId);
            var safeLineId = resolvedDeleteWholeSheet ? "0" : NormalizeOptionalText(lineRecId);
            if (string.IsNullOrWhiteSpace(safeSheetId) || string.IsNullOrWhiteSpace(safeLineId))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetLineDelete));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var mutationGuard = await ValidateExpenseSheetMutationAsync(
                token,
                safeSheetId,
                requestAxUserId,
                nameof(ApiExpenseSheetLineDelete),
                resolvedDeleteWholeSheet ? ExpenseSheetMutationType.DeleteSheet : ExpenseSheetMutationType.LineMutation);
            if (!mutationGuard.Allowed)
                return CreateApiCommandError(mutationGuard.StatusCode, mutationGuard.Message, mutationGuard.ErrorCode);

            try
            {
                if (resolvedDeleteWholeSheet)
                {
                    var cleanupResult = await CleanupExpenseSheetLinkedTicketsBeforeDeleteAsync(
                        token,
                        safeSheetId,
                        requestAxUserId);
                    if (cleanupResult != null)
                        return cleanupResult;
                }

                var response = await _apiClient.DeleteExpenseSheetLineAsync(
                    token,
                    safeSheetId,
                    safeLineId,
                    resolvedDeleteWholeSheet,
                    resolvedDeleteMode,
                    requestAxUserId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetLineDelete");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetLineDelete");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // Cleans up linked ticket blobs and headers before deleting a full expense sheet.
        private async Task<IActionResult?> CleanupExpenseSheetLinkedTicketsBeforeDeleteAsync(
            string token,
            string hojaGastosId,
            string? axUserIdOverride)
        {
            var detailResult = await _apiClient.GetExpenseSheetDetailAsync(token, hojaGastosId, axUserIdOverride);
            var sheet = SelectSheet(detailResult.GetAnyItems(), hojaGastosId);
            if (sheet == null)
            {
                _logger.LogWarning(
                    "Skipping whole sheet delete because linked ticket files could not be discovered. hojaGastosId={HojaGastosId} traceId={TraceId}",
                    hojaGastosId,
                    detailResult.TraceId ?? string.Empty);
                return CreateApiResponse(
                    new
                    {
                        Success = false,
                        Message = detailResult.GetMessageOrDefault(_sr["Api_RequestFailed"].Value),
                        ErrorCode = detailResult.ErrorCode ?? "DELETE_FILE_DISCOVERY_FAILED",
                        Data = (object?)null,
                        Errors = Array.Empty<object>(),
                        TraceId = detailResult.TraceId
                    },
                    StatusCodes.Status502BadGateway);
            }

            var linkedFileIds = GetExpenseSheetLinkedTicketFileIds(sheet);
            if (linkedFileIds.Count == 0)
                return null;

            _logger.LogInformation(
                "Deleting {Count} linked ticket files and tickets before deleting expense sheet {HojaGastosId}.",
                linkedFileIds.Count,
                hojaGastosId);

            foreach (var fileId in linkedFileIds)
            {
                try
                {
                    var response = await _apiClient.DeleteExpenseSheetTicketFileAsync(token, fileId);
                    if (!response.Success && !CanIgnoreMissingTicketFileResponse(response))
                    {
                        _logger.LogWarning(
                            "Linked ticket file cleanup failed before whole sheet delete. hojaGastosId={HojaGastosId} fileId={FileId} errorCode={ErrorCode} traceId={TraceId} message={Message}",
                            hojaGastosId,
                            fileId,
                            response.ErrorCode ?? string.Empty,
                            response.TraceId ?? string.Empty,
                            response.Message ?? string.Empty);

                        return CreateApiResponse(
                            new
                            {
                                Success = false,
                                Message = response.GetMessageOrDefault(_sr["ExpenseSheets_Detail_DeleteFailed"].Value),
                                ErrorCode = response.ErrorCode ?? "DELETE_FILE_FAILED",
                                Data = (object?)null,
                                Errors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>(),
                                TraceId = response.TraceId
                            },
                            StatusCodes.Status409Conflict);
                    }
                }
                catch (ApiException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
                {
                    _logger.LogInformation(
                        "Linked ticket file was already missing before whole sheet delete. hojaGastosId={HojaGastosId} fileId={FileId}",
                        hojaGastosId,
                        fileId);
                }

                try
                {
                    var response = await _apiClient.DeleteExpenseSheetTicketAsync(token, fileId);
                    if (!response.Success && !CanIgnoreMissingExpenseSheetTicketResponse(response))
                    {
                        _logger.LogWarning(
                            "Linked ticket cleanup failed before whole sheet delete. hojaGastosId={HojaGastosId} fileId={FileId} errorCode={ErrorCode} traceId={TraceId} message={Message}",
                            hojaGastosId,
                            fileId,
                            response.ErrorCode ?? string.Empty,
                            response.TraceId ?? string.Empty,
                            response.Message ?? string.Empty);

                        return CreateApiResponse(
                            new
                            {
                                Success = false,
                                Message = response.GetMessageOrDefault(_sr["ExpenseSheets_Detail_DeleteFailed"].Value),
                                ErrorCode = response.ErrorCode ?? "DELETE_TICKET_FAILED",
                                Data = (object?)null,
                                Errors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>(),
                                TraceId = response.TraceId
                            },
                            StatusCodes.Status409Conflict);
                    }
                }
                catch (ApiException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
                {
                    _logger.LogInformation(
                        "Linked ticket was already missing before whole sheet delete. hojaGastosId={HojaGastosId} fileId={FileId}",
                        hojaGastosId,
                        fileId);
                }
            }

            return null;
        }

        // API route used by React clients for /api/crm/expensesheets/tickets.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetTicketsCreate([FromBody] ExpenseSheetTicketCreateRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            req ??= new ExpenseSheetTicketCreateRequest();
            if (req.Mode < 0 || req.Mode > 2)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var normalizedLines = (req.Lines ?? new List<ExpenseSheetTicketLineRequest>())
                .Where(line => line != null)
                .Select(line =>
                {
                    var normalizedLine = new ExpenseSheetTicketLineRequest
                    {
                        Description = (line.Description ?? string.Empty).Trim(),
                        Qty = line.Qty,
                        Price = line.Price,
                        TotalAmount = line.TotalAmount
                    };
                    normalizedLine.TotalAmount ??= ResolveTicketLineTotalAmount(normalizedLine);
                    return normalizedLine;
                })
                .ToList();

            var hasInvalidLines = normalizedLines.Any(line =>
                string.IsNullOrWhiteSpace(line.Description) ||
                !IsValidTicketLineAmount(line));

            if (hasInvalidLines)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            if (req.Mode == 2 && string.IsNullOrWhiteSpace(NormalizeOptionalText(req.ExistingFileId)))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            if (!IsValidTicketGastoType(req.GastoType))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var request = new ExpenseSheetTicketCreateRequest
            {
                Mode = req.Mode,
                ExistingFileId = NormalizeOptionalText(req.ExistingFileId),
                Description = NormalizeOptionalText(req.Description),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                TotalAmount = req.TotalAmount,
                Status = req.Status is >= 0 ? req.Status : null,
                TransDate = NormalizeTicketTransDate(req.TransDate) ?? NormalizeOptionalText(req.TransDate),
                TicketDate = NormalizeTicketTransDate(req.TicketDate ?? req.TransDate) ?? NormalizeOptionalText(req.TicketDate),
                TicketTime = NormalizeTicketTime(req.TicketTime),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
                OcrJson = NormalizeOptionalText(req.OcrJson),
                NormalizedJson = NormalizeOptionalText(req.NormalizedJson),
                FileName = NormalizeOptionalText(req.FileName),
                FileExtension = NormalizeOptionalText(req.FileExtension),
                ProcessedByAI = req.ProcessedByAI,
                GastoType = NormalizeTicketGastoType(req.GastoType),
                Lines = normalizedLines.Count > 0 ? normalizedLines : null
            };
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketsCreate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketsCreate));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketsCreate),
                    "request",
                    ("mode", request.Mode),
                    ("existingFileId", request.ExistingFileId),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", request.CurrencyCode),
                    ("totalAmount", request.TotalAmount),
                    ("transDate", request.TransDate),
                    ("gastoType", request.GastoType),
                    ("lineCount", request.Lines?.Count ?? 0));
                var response = await _apiClient.CreateExpenseSheetTicketAsync(token, request, requestAxUserId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketsCreate),
                    "response",
                    ("mode", request.Mode),
                    ("existingFileId", request.ExistingFileId),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", request.CurrencyCode),
                    ("success", response.Success),
                    ("traceId", response.TraceId ?? string.Empty),
                    ("message", response.Message ?? string.Empty));

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketsCreate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketsCreate");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/quick-create.
        [HttpPost]
        [RequestSizeLimit(52428800)]
        [RequestFormLimits(MultipartBodyLengthLimit = 52428800)]
        public async Task<IActionResult> ApiExpenseSheetTicketQuickCreate(
            [FromForm] IFormFile? ticketImage,
            [FromForm] string? currencyCode,
            [FromForm] string? description,
            [FromForm] string? comentario,
            [FromForm] string? existingHojaGastosId,
            [FromForm] string? projId,
            [FromForm] string? projectId)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
            {
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");
            }

            if (ticketImage == null || ticketImage.Length <= 0)
            {
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            }

            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketQuickCreate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketQuickCreate));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            var safeTicketFileName = Path.GetFileName(ticketImage.FileName ?? "ticket.jpg");
            var normalizedContentType = (ticketImage.ContentType ?? string.Empty).Trim();
            var normalizedExtension = Path.GetExtension(ticketImage.FileName ?? string.Empty).TrimStart('.').Trim();
            var hasAllowedContentType = !string.IsNullOrWhiteSpace(normalizedContentType) &&
                                        AllowedTicketImageContentTypes.Contains(normalizedContentType);
            var hasAllowedExtension = !string.IsNullOrWhiteSpace(normalizedExtension) &&
                                      AllowedTicketImageExtensions.Contains(normalizedExtension);

            if (!hasAllowedContentType && !hasAllowedExtension)
            {
                return CreateApiCommandError(
                    StatusCodes.Status422UnprocessableEntity,
                    _sr["ExpenseSheets_NewTicket_Error_FileType"].Value,
                    "VALIDATION_ERROR");
            }

            var request = new ExpenseSheetTicketQuickCreateRequest
            {
                CurrencyCode = NormalizeOptionalText(currencyCode)?.ToUpperInvariant(),
                Description = NormalizeOptionalText(description),
                Comentario = NormalizeOptionalText(comentario),
                ExistingHojaGastosId = NormalizeOptionalText(existingHojaGastosId),
                ProjId = NormalizeOptionalText(projId) ?? NormalizeOptionalText(projectId),
                ProjectId = NormalizeOptionalText(projectId)
            };
            var actionStopwatch = Stopwatch.StartNew();
            LogQuickCreateIngressDiagnostics(ticketImage, request, requestAxUserId);

            try
            {
                using var stream = ticketImage.OpenReadStream();
                _logger.LogInformation(
                    "ApiExpenseSheetTicketQuickCreate request stream opened. CanSeek: {CanSeek}. StreamLength: {StreamLength}. RequestAborted: {RequestAborted}.",
                    stream.CanSeek,
                    stream.CanSeek ? stream.Length : -1,
                    HttpContext.RequestAborted.IsCancellationRequested);
                var transport = await _apiClient.QuickCreateExpenseSheetTicketAsync(
                    token,
                    request,
                    stream,
                    safeTicketFileName,
                    ticketImage.ContentType,
                    requestAxUserId,
                    HttpContext.RequestAborted);

                var response = transport.Response;
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();
                var retryAfter = transport.Headers
                    .FirstOrDefault(entry => string.Equals(entry.Key, "Retry-After", StringComparison.OrdinalIgnoreCase))
                    .Value?
                    .FirstOrDefault();

                if (!string.IsNullOrWhiteSpace(retryAfter))
                {
                    Response.Headers["Retry-After"] = retryAfter;
                }

                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketQuickCreate),
                    "response",
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", request.CurrencyCode),
                    ("existingHojaGastosId", request.ExistingHojaGastosId),
                    ("statusCode", (int)transport.StatusCode),
                    ("success", response.Success),
                    ("traceId", response.TraceId ?? string.Empty),
                    ("retryAfter", retryAfter ?? string.Empty),
                    ("message", response.Message ?? string.Empty));

                actionStopwatch.Stop();
                _logger.LogInformation(
                    "ApiExpenseSheetTicketQuickCreate completed. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. RetryAfter: {RetryAfter}. ElapsedMs: {ElapsedMs}. SelectedCompany: {SelectedCompany}. AxUserId: {AxUserId}.",
                    (int)transport.StatusCode,
                    response.Success,
                    response.ErrorCode ?? "<null>",
                    response.TraceId ?? "<null>",
                    retryAfter ?? "<null>",
                    actionStopwatch.ElapsedMilliseconds,
                    GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                    requestAxUserId ?? "<empty>");

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    },
                    (int)transport.StatusCode);
            }
            catch (ApiException ex)
            {
                actionStopwatch.Stop();
                _logger.LogError(
                    ex,
                    "Upstream API error in ApiExpenseSheetTicketQuickCreate. SelectedCompany: {SelectedCompany}. AxUserId: {AxUserId}. RequestContentLength: {RequestContentLength}. TicketLength: {TicketLength}. ElapsedMs: {ElapsedMs}.",
                    GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                    requestAxUserId ?? "<empty>",
                    Request.ContentLength ?? -1,
                    ticketImage.Length,
                    actionStopwatch.ElapsedMilliseconds);
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                actionStopwatch.Stop();
                _logger.LogError(
                    ex,
                    "Unhandled error in ApiExpenseSheetTicketQuickCreate. SelectedCompany: {SelectedCompany}. AxUserId: {AxUserId}. RequestContentLength: {RequestContentLength}. TicketLength: {TicketLength}. ElapsedMs: {ElapsedMs}.",
                    GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                    requestAxUserId ?? "<empty>",
                    Request.ContentLength ?? -1,
                    ticketImage.Length,
                    actionStopwatch.ElapsedMilliseconds);
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/list.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetTicketsList([FromBody] ExpenseSheetTicketListRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            if (req == null || req.Page < 1 || req.PageSize <= 0)
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            var normalizedCreatedDateFrom = NormalizeListDateFilter(req.CreatedDateFrom);
            var normalizedCreatedDateTo = NormalizeListDateFilter(req.CreatedDateTo);
            if (!string.IsNullOrWhiteSpace(req.CreatedDateFrom) && string.IsNullOrWhiteSpace(normalizedCreatedDateFrom))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            if (!string.IsNullOrWhiteSpace(req.CreatedDateTo) && string.IsNullOrWhiteSpace(normalizedCreatedDateTo))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            if (req.Status.HasValue && (req.Status.Value < 0 || req.Status.Value > 1))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            if (!IsValidTicketGastoType(req.GastoType))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            var page = req.Page;
            var pageSize = req.PageSize;
            var normalizedSearchKey = NormalizeOptionalText(req.SearchKey) ?? NormalizeOptionalText(req.Filter);

            var request = new ExpenseSheetTicketListRequest
            {
                Page = page,
                PageSize = pageSize,
                CreatedDateFrom = normalizedCreatedDateFrom,
                CreatedDateTo = normalizedCreatedDateTo,
                SearchKey = normalizedSearchKey,
                Filter = NormalizeOptionalText(req.Filter) ?? normalizedSearchKey,
                Status = req.Status,
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                GastoType = NormalizeTicketGastoType(req.GastoType),
                ProcessedByAI = req.ProcessedByAI
            };
            var actingUser = await ResolveExpenseActingUserForPagedAsync(token, nameof(ApiExpenseSheetTicketsList));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;

            try
            {
                var result = await _apiClient.GetExpenseSheetTicketsAsync(token, request, requestAxUserId, HttpContext.RequestAborted);
                var rawItems = result.GetAnyItems().ToList();
                var items = rawItems
                    .Select(ToExpenseSheetTicketApiListItem)
                    .ToList();
                var responsePage = result.Page > 0 ? result.Page : page;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : pageSize;
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketsList),
                    "response",
                    ("requestedAxUserId", requestAxUserId),
                    ("requestedCurrencyFilter", request.CurrencyCode),
                    ("traceId", result.TraceId ?? string.Empty),
                    ("success", result.Success),
                    ("resultSummary", BuildTicketCurrencySummary(rawItems, item => item.FileId, item => item.CurrencyCode)));

                if (!result.Success && items.Count == 0)
                {
                    _logger.LogWarning(
                        "ApiExpenseSheetTicketsList upstream returned non-success. Message={Message} TraceId={TraceId} page={Page} pageSize={PageSize} createdDateFrom={CreatedDateFrom} createdDateTo={CreatedDateTo} searchKey={SearchKey} filter={Filter} status={Status} currencyCode={CurrencyCode} gastoType={GastoType} processedByAI={ProcessedByAI}",
                        result.Message ?? string.Empty,
                        result.TraceId ?? string.Empty,
                        page,
                        pageSize,
                        request.CreatedDateFrom ?? string.Empty,
                        request.CreatedDateTo ?? string.Empty,
                        request.SearchKey ?? string.Empty,
                        request.Filter ?? string.Empty,
                        request.Status.HasValue ? request.Status.Value.ToString(CultureInfo.InvariantCulture) : "null",
                        request.CurrencyCode ?? string.Empty,
                        request.GastoType.HasValue ? request.GastoType.Value.ToString(CultureInfo.InvariantCulture) : "null",
                        request.ProcessedByAI.HasValue ? request.ProcessedByAI.Value.ToString() : "null");
                }

                return CreateApiPagedResponse(new
                {
                    Success = result.Success || items.Count > 0,
                    Message = result.Message ?? string.Empty,
                    Total = result.Total > 0 ? result.Total : items.Count,
                    Page = responsePage,
                    PageSize = responsePageSize,
                    Items = items,
                    TraceId = result.TraceId
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketsList");
                return CreateApiPagedError(StatusCodes.Status502BadGateway, _sr["Api_RequestFailed"].Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketsList");
                return CreateApiPagedError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value);
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/link/list.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetTicketsLinkList([FromBody] ExpenseSheetTicketLinkListRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            if (req == null || req.Page < 1 || req.PageSize <= 0)
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            var normalizedCreatedDateFrom = NormalizeListDateFilter(req.CreatedDateFrom);
            var normalizedCreatedDateTo = NormalizeListDateFilter(req.CreatedDateTo);
            if (!string.IsNullOrWhiteSpace(req.CreatedDateFrom) && string.IsNullOrWhiteSpace(normalizedCreatedDateFrom))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            if (!string.IsNullOrWhiteSpace(req.CreatedDateTo) && string.IsNullOrWhiteSpace(normalizedCreatedDateTo))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            if (!IsValidTicketGastoType(req.GastoType))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);

            var page = req.Page;
            var pageSize = req.PageSize;
            var normalizedSearchKey = NormalizeOptionalText(req.SearchKey) ?? NormalizeOptionalText(req.Filter);
            var request = new ExpenseSheetTicketLinkListRequest
            {
                Page = page,
                PageSize = pageSize,
                CreatedDateFrom = normalizedCreatedDateFrom,
                CreatedDateTo = normalizedCreatedDateTo,
                SearchKey = normalizedSearchKey,
                Filter = NormalizeOptionalText(req.Filter) ?? normalizedSearchKey,
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                GastoType = NormalizeTicketGastoType(req.GastoType),
                ProcessedByAI = req.ProcessedByAI
            };
            var actingUser = await ResolveExpenseActingUserForPagedAsync(token, nameof(ApiExpenseSheetTicketsLinkList));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;

            try
            {
                var result = await _apiClient.GetExpenseSheetTicketLinkListAsync(token, request, requestAxUserId, HttpContext.RequestAborted);
                var rawItems = result.GetAnyItems().ToList();
                var items = rawItems
                    .Select(ToExpenseSheetTicketLinkApiListItem)
                    .ToList();
                var responsePage = result.Page > 0 ? result.Page : page;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : pageSize;
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketsLinkList),
                    "response",
                    ("requestedAxUserId", requestAxUserId),
                    ("requestedCurrencyFilter", request.CurrencyCode),
                    ("traceId", result.TraceId ?? string.Empty),
                    ("success", result.Success),
                    ("resultSummary", BuildTicketCurrencySummary(rawItems, item => item.FileId, item => item.CurrencyCode)));

                return CreateApiPagedResponse(new
                {
                    Success = result.Success || items.Count > 0,
                    Message = result.Message ?? string.Empty,
                    Total = result.Total > 0 ? result.Total : items.Count,
                    Page = responsePage,
                    PageSize = responsePageSize,
                    Items = items,
                    TraceId = result.TraceId
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketsLinkList");
                return CreateApiPagedError(StatusCodes.Status502BadGateway, _sr["Api_RequestFailed"].Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketsLinkList");
                return CreateApiPagedError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value);
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/link/bulk.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetTicketsLinkBulk([FromBody] ExpenseSheetTicketLinkBulkRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            if (req == null || string.IsNullOrWhiteSpace(NormalizeOptionalText(req.ExpenseSheetId)))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var normalizedSelectionMode = string.Equals(req.SelectionMode, "filtered", StringComparison.OrdinalIgnoreCase)
                ? "filtered"
                : "selected";

            if (normalizedSelectionMode == "selected" && (req.TicketIds == null || req.TicketIds.Count < 1))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            if (normalizedSelectionMode == "filtered" && req.Filters != null && !IsValidTicketGastoType(req.Filters.GastoType))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var request = new ExpenseSheetTicketLinkBulkRequest
            {
                ExpenseSheetId = NormalizeOptionalText(req.ExpenseSheetId) ?? string.Empty,
                SelectionMode = normalizedSelectionMode,
                TicketIds = req.TicketIds?
                    .Select(NormalizeOptionalText)
                    .Where(value => !string.IsNullOrWhiteSpace(value))
                    .Cast<string>()
                    .ToList(),
                Filters = req.Filters == null
                    ? null
                    : new ExpenseSheetTicketLinkBulkFilters
                    {
                        SearchKey = NormalizeOptionalText(req.Filters.SearchKey),
                        Filter = NormalizeOptionalText(req.Filters.Filter),
                        CreatedDateFrom = NormalizeListDateFilter(req.Filters.CreatedDateFrom),
                        CreatedDateTo = NormalizeListDateFilter(req.Filters.CreatedDateTo),
                        CurrencyCode = NormalizeOptionalText(req.Filters.CurrencyCode)?.ToUpperInvariant(),
                        GastoType = NormalizeTicketGastoType(req.Filters.GastoType),
                        ProcessedByAI = req.Filters.ProcessedByAI
                    },
                ExcludedIds = req.ExcludedIds?
                    .Select(NormalizeOptionalText)
                    .Where(value => !string.IsNullOrWhiteSpace(value))
                    .Cast<string>()
                    .ToList()
            };
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketsLinkBulk));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketsLinkBulk));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketsLinkBulk),
                    "request",
                    ("expenseSheetId", request.ExpenseSheetId),
                    ("selectionMode", request.SelectionMode),
                    ("requestedAxUserId", requestAxUserId),
                    ("filterCurrencyCode", request.Filters?.CurrencyCode),
                    ("ticketIds", BuildTraceListSample(request.TicketIds)),
                    ("excludedIds", BuildTraceListSample(request.ExcludedIds)));
                var response = await _apiClient.LinkExpenseSheetTicketsBulkAsync(token, request, requestAxUserId, HttpContext.RequestAborted);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketsLinkBulk),
                    "response",
                    ("expenseSheetId", request.ExpenseSheetId),
                    ("selectionMode", request.SelectionMode),
                    ("requestedAxUserId", requestAxUserId),
                    ("filterCurrencyCode", request.Filters?.CurrencyCode),
                    ("success", response.Success),
                    ("traceId", response.TraceId ?? string.Empty),
                    ("message", response.Message ?? string.Empty),
                    ("requestedCount", response.Data?.RequestedCount),
                    ("linkedCount", response.Data?.LinkedCount),
                    ("skippedCount", response.Data?.SkippedCount),
                    ("failedCount", response.Data?.FailedCount),
                    ("skipped", BuildBulkIssueSummary(response.Data?.Skipped)),
                    ("failed", BuildBulkIssueSummary(response.Data?.Failed)));

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketsLinkBulk");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketsLinkBulk");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}.
        [HttpGet]
        public async Task<IActionResult> ApiExpenseSheetTicketDetail(string fileId)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            var safeFileId = NormalizeOptionalText(fileId);
            if (string.IsNullOrWhiteSpace(safeFileId))
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);
            var actingUser = await ResolveExpenseActingUserForPagedAsync(token, nameof(ApiExpenseSheetTicketDetail));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId ?? GetCurrentSessionAxUserId();

            try
            {
                _logger.LogInformation(
                    "ApiExpenseSheetTicketDetail request trace. fileId={FileId} X-IND-AxUserId={AxUserId}",
                    safeFileId,
                    requestAxUserId ?? string.Empty);

                var result = await _apiClient.GetExpenseSheetTicketDetailAsync(token, safeFileId, requestAxUserId);
                var ticket = SelectTicket(result.GetAnyItems(), safeFileId);
                if (ticket == null)
                    return CreateApiPagedError(StatusCodes.Status404NotFound, _sr["Tickets_Detail_NotFound"].Value);
                var ticketItem = ticket;
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketDetail),
                    "response",
                    ("fileId", safeFileId),
                    ("requestedAxUserId", requestAxUserId),
                    ("traceId", result.TraceId ?? string.Empty),
                    ("currencyCode", ticketItem.CurrencyCode),
                    ("totalAmount", ticketItem.TotalAmount),
                    ("hojaGastosIdDisplay", ticketItem.HojaGastosIdDisplay),
                    ("processedByAI", ticketItem.ProcessedByAI),
                    ("gastoType", ticketItem.GastoType));

                return CreateApiPagedResponse(new
                {
                    Success = result.Success || ticketItem != null,
                    Message = result.Message ?? string.Empty,
                    Total = 1,
                    Page = 1,
                    PageSize = 1,
                    Items = new[] { ToExpenseSheetTicketApiDetailItem(ticketItem!) },
                    TraceId = result.TraceId
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketDetail");
                return CreateApiPagedError(StatusCodes.Status502BadGateway, _sr["Api_RequestFailed"].Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketDetail");
                return CreateApiPagedError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value);
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/preview.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetTicketPreview([FromBody] ExpenseSheetTicketPreviewRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(req?.FileId);
            if (string.IsNullOrWhiteSpace(safeFileId))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            try
            {
                var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketPreview));
                if (actingUser.Error != null)
                    return actingUser.Error;
                var requestAxUserId = actingUser.AxUserId;
                var detailResult = await _apiClient.GetExpenseSheetTicketDetailAsync(token, safeFileId, requestAxUserId);
                var ticket = SelectTicket(detailResult.GetAnyItems(), safeFileId);
                if (ticket == null)
                    return CreateApiCommandError(
                        StatusCodes.Status404NotFound,
                        _sr["Tickets_Detail_NotFound"].Value,
                        "NOT_FOUND");

                var resolvedUrl = NormalizeOptionalText(ticket.UrlFile);
                if (string.IsNullOrWhiteSpace(resolvedUrl))
                    return CreateApiCommandError(
                        StatusCodes.Status404NotFound,
                        _sr["Api_RequestFailed"].Value,
                        "NOT_FOUND");

                var requestedUrl = NormalizeOptionalText(req?.UrlFile);
                if (!string.IsNullOrWhiteSpace(requestedUrl) &&
                    !string.Equals(requestedUrl, resolvedUrl, StringComparison.OrdinalIgnoreCase))
                {
                    _logger.LogWarning(
                        "Ticket preview URL mismatch detected for fileId {FileId}. Client URL was ignored.",
                        safeFileId);
                }

                var preview = await _ticketBlobPreviewService.DownloadAsync(resolvedUrl, HttpContext.RequestAborted);
                if (preview == null)
                    return CreateApiCommandError(
                        StatusCodes.Status404NotFound,
                        _sr["Api_RequestFailed"].Value,
                        "NOT_FOUND");

                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketPreview),
                    "resolved-ticket",
                    ("fileId", safeFileId),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", ticket.CurrencyCode),
                    ("hojaGastosIdDisplay", ticket.HojaGastosIdDisplay),
                    ("resolvedUrlLength", resolvedUrl.Length));

                Response.Headers.CacheControl = "no-store";
                Response.Headers.Pragma = "no-cache";
                Response.Headers["X-Content-Type-Options"] = "nosniff";
                return File(preview.Content, preview.ContentType);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketPreview");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketPreview");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}.
        [HttpPut]
        public async Task<IActionResult> ApiExpenseSheetTicketUpdate(string fileId, [FromBody] ExpenseSheetTicketUpdateRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            if (string.IsNullOrWhiteSpace(safeFileId) || req == null)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            if (!IsValidTicketGastoType(req.GastoType))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var request = new ExpenseSheetTicketUpdateRequest
            {
                Description = NormalizeOptionalText(req.Description),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                TotalAmount = req.TotalAmount,
                AmountMST = req.AmountMST,
                ExchRate = req.ExchRate,
                Status = req.Status is >= 0 ? req.Status : null,
                TransDate = NormalizeTicketTransDate(req.TransDate) ?? NormalizeOptionalText(req.TransDate),
                TicketDate = NormalizeTicketTransDate(req.TicketDate ?? req.TransDate) ?? NormalizeOptionalText(req.TicketDate),
                TicketTime = NormalizeTicketTime(req.TicketTime),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
                OcrJson = NormalizeOptionalText(req.OcrJson),
                NormalizedJson = NormalizeOptionalText(req.NormalizedJson),
                FileName = NormalizeOptionalText(req.FileName),
                ProcessedByAI = req.ProcessedByAI,
                FileExtension = NormalizeOptionalText(req.FileExtension),
                GastoType = NormalizeTicketGastoType(req.GastoType)
            };
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketUpdate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketUpdate));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketUpdate),
                    "request",
                    ("fileId", safeFileId),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", request.CurrencyCode),
                    ("totalAmount", request.TotalAmount),
                    ("amountMST", request.AmountMST),
                    ("exchRate", request.ExchRate),
                    ("transDate", request.TransDate),
                    ("gastoType", request.GastoType),
                    ("processedByAI", request.ProcessedByAI));
                var response = await _apiClient.UpdateExpenseSheetTicketAsync(token, safeFileId, request);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketUpdate),
                    "response",
                    ("fileId", safeFileId),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", request.CurrencyCode),
                    ("success", response.Success),
                    ("traceId", response.TraceId ?? string.Empty),
                    ("message", response.Message ?? string.Empty));

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketUpdate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketUpdate");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}/total-adjustment.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetTicketTotalAdjustment(string fileId, [FromBody] ExpenseSheetTicketTotalAdjustmentRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            if (string.IsNullOrWhiteSpace(safeFileId) || req == null || !req.TotalAmount.HasValue || req.TotalAmount.Value < 0m)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketTotalAdjustment));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketTotalAdjustment));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            var request = new ExpenseSheetTicketTotalAdjustmentRequest
            {
                TotalAmount = req.TotalAmount
            };

            try
            {
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketTotalAdjustment),
                    "request",
                    ("fileId", safeFileId),
                    ("requestedAxUserId", requestAxUserId),
                    ("totalAmount", request.TotalAmount));
                var response = await _apiClient.AdjustExpenseSheetTicketTotalAmountAsync(token, safeFileId, request);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();
                LogExpenseCurrencyTrace(
                    nameof(ApiExpenseSheetTicketTotalAdjustment),
                    "response",
                    ("fileId", safeFileId),
                    ("requestedAxUserId", requestAxUserId),
                    ("success", response.Success),
                    ("traceId", response.TraceId ?? string.Empty),
                    ("adjustmentLineCreated", response.Data?.AdjustmentLineCreated),
                    ("adjustmentLineRecId", response.Data?.AdjustmentLineRecId));

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketTotalAdjustment");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketTotalAdjustment");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}.
        [HttpDelete]
        public async Task<IActionResult> ApiExpenseSheetTicketDelete(string fileId, [FromQuery] int? lineRecId = null)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            if (string.IsNullOrWhiteSpace(safeFileId) || (lineRecId.HasValue && lineRecId.Value <= 0))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketDelete));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketDelete));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                var response = await _apiClient.DeleteExpenseSheetTicketAsync(token, safeFileId, lineRecId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketDelete");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketDelete");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}/ia.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetTicketApplyIa(string fileId, [FromBody] JsonElement req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            if (string.IsNullOrWhiteSpace(safeFileId) || req.ValueKind == JsonValueKind.Undefined || req.ValueKind == JsonValueKind.Null)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            if (req.ValueKind == JsonValueKind.Object &&
                req.TryGetProperty("gastoType", out var gastoTypeElement) &&
                !IsValidTicketGastoTypeElement(gastoTypeElement))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketApplyIa));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketApplyIa));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                var response = await _apiClient.UpdateExpenseSheetTicketFromIAAsync(token, safeFileId, req, requestAxUserId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketApplyIa");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketApplyIa");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}/lines.
        [HttpPost]
        public async Task<IActionResult> ApiExpenseSheetTicketLineCreate(string fileId, [FromBody] ExpenseSheetTicketLineRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            if (string.IsNullOrWhiteSpace(safeFileId) || req == null)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var request = new ExpenseSheetTicketLineRequest
            {
                Description = (req.Description ?? string.Empty).Trim(),
                Qty = req.Qty,
                Price = req.Price,
                TotalAmount = req.TotalAmount
            };
            request.TotalAmount ??= ResolveTicketLineTotalAmount(request);

            if (string.IsNullOrWhiteSpace(request.Description) ||
                !IsValidTicketLineAmount(request))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketLineCreate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketLineCreate));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                var response = await _apiClient.CreateExpenseSheetTicketLineAsync(token, safeFileId, request);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketLineCreate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketLineCreate");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}/lines/{lineRecId}.
        [HttpPut]
        public async Task<IActionResult> ApiExpenseSheetTicketLineUpdate(
            string fileId,
            string lineRecId,
            [FromBody] ExpenseSheetTicketLineRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            var safeLineId = NormalizeOptionalText(lineRecId);
            if (string.IsNullOrWhiteSpace(safeFileId) || string.IsNullOrWhiteSpace(safeLineId) || req == null)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var request = new ExpenseSheetTicketLineRequest
            {
                Description = (req.Description ?? string.Empty).Trim(),
                Qty = req.Qty,
                Price = req.Price,
                TotalAmount = req.TotalAmount
            };
            request.TotalAmount ??= ResolveTicketLineTotalAmount(request);

            if (string.IsNullOrWhiteSpace(request.Description) ||
                !IsValidTicketLineAmount(request))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketLineUpdate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketLineUpdate));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                var response = await _apiClient.UpdateExpenseSheetTicketLineAsync(token, safeFileId, safeLineId, request);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketLineUpdate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketLineUpdate");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}/lines/{lineRecId}.
        [HttpDelete]
        public async Task<IActionResult> ApiExpenseSheetTicketLineDelete(string fileId, string lineRecId)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            var safeLineId = NormalizeOptionalText(lineRecId);
            if (string.IsNullOrWhiteSpace(safeFileId) || string.IsNullOrWhiteSpace(safeLineId))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketLineDelete));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketLineDelete));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                var response = await _apiClient.DeleteExpenseSheetTicketLineAsync(token, safeFileId, safeLineId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketLineDelete");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketLineDelete");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}/file.
        [HttpPost]
        [RequestSizeLimit(52428800)]
        [RequestFormLimits(MultipartBodyLengthLimit = 52428800)]
        public async Task<IActionResult> ApiExpenseSheetTicketFileUpload(
            string fileId,
            [FromQuery] string? extension,
            [FromForm] IFormFile? file)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            if (string.IsNullOrWhiteSpace(safeFileId) || file == null || file.Length <= 0)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketFileUpload));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketFileUpload));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            var safeUploadFileName = Path.GetFileName(file.FileName ?? "ticket.jpg");
            var normalizedUploadContentType = NormalizeOptionalText(file.ContentType) ?? "<empty>";
            var normalizedUploadExtension = NormalizeOptionalText(extension) ?? "<empty>";

            _logger.LogInformation(
                "ApiExpenseSheetTicketFileUpload request received. FileId: {FileId}. FileName: {FileName}. SizeBytes: {SizeBytes}. ContentType: {ContentType}. Extension: {Extension}.",
                safeFileId,
                safeUploadFileName,
                file.Length,
                normalizedUploadContentType,
                normalizedUploadExtension);

            try
            {
                using var stream = file.OpenReadStream();
                var response = await _apiClient.UploadExpenseSheetTicketFileAsync(
                    token,
                    safeFileId,
                    stream,
                    safeUploadFileName,
                    file.ContentType,
                    NormalizeOptionalText(extension),
                    requestAxUserId,
                    HttpContext.RequestAborted);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                _logger.LogInformation(
                    "ApiExpenseSheetTicketFileUpload completed. FileId: {FileId}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}.",
                    safeFileId,
                    response.Success,
                    response.ErrorCode ?? "<null>",
                    response.TraceId ?? "<null>");

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(
                    ex,
                    "Upstream API error in ApiExpenseSheetTicketFileUpload. FileId: {FileId}. FileName: {FileName}. ContentType: {ContentType}. Extension: {Extension}.",
                    safeFileId,
                    safeUploadFileName,
                    normalizedUploadContentType,
                    normalizedUploadExtension);
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Unhandled error in ApiExpenseSheetTicketFileUpload. FileId: {FileId}. FileName: {FileName}. ContentType: {ContentType}. Extension: {Extension}.",
                    safeFileId,
                    safeUploadFileName,
                    normalizedUploadContentType,
                    normalizedUploadExtension);
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // API route used by React clients for /api/crm/expensesheets/tickets/{fileId}/file.
        [HttpDelete]
        public async Task<IActionResult> ApiExpenseSheetTicketFileDelete(string fileId)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeFileId = NormalizeOptionalText(fileId);
            if (string.IsNullOrWhiteSpace(safeFileId))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");
            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetTicketFileDelete));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(ApiExpenseSheetTicketFileDelete));
            if (managedUserGuard != null)
                return CreateApiCommandError(managedUserGuard.StatusCode, managedUserGuard.Message, managedUserGuard.ErrorCode);

            try
            {
                var response = await _apiClient.DeleteExpenseSheetTicketFileAsync(token, safeFileId);
                var responseErrors = response.Errors?.Cast<object>().ToArray() ?? Array.Empty<object>();

                return CreateApiResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        ErrorCode = response.ErrorCode,
                        Data = response.Data,
                        Errors = responseErrors,
                        TraceId = response.TraceId
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketFileDelete");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketFileDelete");
                return CreateApiCommandError(
                    StatusCodes.Status500InternalServerError,
                    _sr["Api_RequestFailed"].Value,
                    "UNHANDLED_ERROR");
            }
        }

        // Returns one expense sheet with normalized header and line fields.
        [HttpGet]
        public async Task<IActionResult> GetExpenseSheetDetail(string hojaGastosId)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

            if (string.IsNullOrWhiteSpace(hojaGastosId))
                return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

            try
            {
                var result = await _apiClient.GetExpenseSheetDetailAsync(token, hojaGastosId.Trim());
                var sheet = SelectSheet(result.GetAnyItems(), hojaGastosId.Trim());
                if (sheet == null)
                {
                    return NotFound(new { success = false, message = _sr["ExpenseSheets_NotFound"].Value });
                }

                var lines = (sheet.Lines ?? new List<ExpenseSheetLineDto>())
                    .Select(ToExpenseSheetLine)
                    .ToList();
                LogExpenseCurrencyTrace(
                    nameof(GetExpenseSheetDetail),
                    "response",
                    ("hojaGastosId", hojaGastosId.Trim()),
                    ("traceId", result.TraceId ?? string.Empty),
                    ("currencyCode", ReadExpenseSheetCurrencyCodeForTrace(sheet)),
                    ("exchangeRate", ReadExpenseSheetExchangeRateForTrace(sheet)),
                    ("lineCount", lines.Count));

                return Json(new
                {
                    success = true,
                    message = result.Message,
                    data = new
                    {
                        header = ToExpenseSheetHeader(sheet),
                        lines
                    }
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in GetExpenseSheetDetail");
                return StatusCode(StatusCodes.Status502BadGateway, new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in GetExpenseSheetDetail");
                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Returns one expense sheet line with normalized fields.
        [HttpGet]
        public async Task<IActionResult> GetExpenseSheetLineDetail(string hojaGastosId, string lineRecId)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

            if (string.IsNullOrWhiteSpace(hojaGastosId) || string.IsNullOrWhiteSpace(lineRecId))
                return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

            try
            {
                var result = await _apiClient.GetExpenseSheetDetailAsync(token, hojaGastosId.Trim());
                var sheet = SelectSheet(result.GetAnyItems(), hojaGastosId.Trim());
                if (sheet == null)
                {
                    return NotFound(new { success = false, message = _sr["ExpenseSheets_NotFound"].Value });
                }

                var line = (sheet.Lines ?? new List<ExpenseSheetLineDto>())
                    .FirstOrDefault(x => string.Equals(ResolveLineRecId(x), lineRecId.Trim(), StringComparison.OrdinalIgnoreCase));
                if (line == null)
                {
                    return NotFound(new { success = false, message = _sr["ExpenseSheets_NotFound"].Value });
                }

                return Json(new
                {
                    success = true,
                    message = result.Message,
                    data = new
                    {
                        header = ToExpenseSheetHeader(sheet),
                        line = ToExpenseSheetLine(line)
                    }
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in GetExpenseSheetLineDetail");
                return StatusCode(StatusCodes.Status502BadGateway, new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in GetExpenseSheetLineDetail");
                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Creates a new expense sheet using the upstream create endpoint.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateExpenseSheet([FromBody] ExpenseSheetCreateRequest req, [FromQuery] bool IND_SetActionMark = false)
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrWhiteSpace(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                req ??= new ExpenseSheetCreateRequest();
                var normalizedMode = req.Mode is >= 0 and <= 2 ? req.Mode : 0;
                var normalizedExistingSheetId = NormalizeOptionalText(req.ExistingHojaGastosId);
                var normalizedCurrency = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant();
                var normalizedExchRate = req.ExchRate.HasValue && req.ExchRate.Value > 0m
                    ? NormalizeExpenseSheetExchangeRateForWrite(normalizedCurrency, req.ExchRate)
                    : (decimal?)null;
                var normalizedDescription = (req.Description ?? string.Empty).Trim();
                if (normalizedMode != 2 && !IsValidExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense))
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var sourceLines = req.Lines ?? new List<ExpenseSheetLineRequest>();
                var hasInvalidLineReimbursableExpense = sourceLines.Any(line =>
                    line != null && !IsValidExpenseSheetLineReimbursableExpense(line.ReimbursableExpense));
                var normalizedLines = sourceLines
                    .Where(line => line != null)
                    .Select(line => new ExpenseSheetLineRequest
                    {
                        TransDate = line.TransDate,
                        TypeValue = line.TypeValue,
                        Description = (line.Description ?? string.Empty).Trim(),
                        Internacional = line.Internacional,
                        FileId = NormalizeOptionalText(line.FileId),
                        Ticket = line.Ticket,
                        Qty = line.Qty,
                        Price = line.Price,
                        ProjId = NormalizeOptionalText(line.ProjId),
                        ReimbursableExpense = NormalizeExpenseSheetLineReimbursableExpense(line.ReimbursableExpense),
                        CurrencyCode = NormalizeOptionalText(line.CurrencyCode)?.ToUpperInvariant(),
                        AmountMST = line.AmountMST,
                        ExchRate = line.ExchRate > 0 ? line.ExchRate : null,
                        IndAttachFiles = line.IndAttachFiles ?? string.Empty
                    })
                    .ToList();
                var hasInvalidLines = normalizedLines.Any(line =>
                    line == null ||
                    string.IsNullOrWhiteSpace(NormalizeLineTransDate(line.TransDate)) ||
                    line.TypeValue <= 0 ||
                    line.Qty <= 0 ||
                    line.Price <= 0);

                var request = new ExpenseSheetCreateRequest
                {
                    UserId = NormalizeOptionalText(req.UserId),
                    Mode = normalizedMode,
                    ExistingHojaGastosId = normalizedExistingSheetId,
                    Description = normalizedDescription,
                    CurrencyCode = normalizedCurrency,
                    ExchRate = normalizedExchRate,
                    ProjId = NormalizeOptionalText(req.ProjId),
                    ExpenseSheetStatus = req.ExpenseSheetStatus is >= 0 ? req.ExpenseSheetStatus : null,
                    ExchangeRateMode = req.ExchangeRateMode is >= 0 ? req.ExchangeRateMode : null,
                    ReimbursableExpense = NormalizeExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense),
                    Lines = normalizedLines
                };

                // Mode 1 creates only header so lines must be empty.
                if (normalizedMode == 1)
                {
                    request.Lines = new List<ExpenseSheetLineRequest>();
                }
                else if (hasInvalidLines || hasInvalidLineReimbursableExpense)
                {
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });
                }

                // Mode 2 adds lines to existing header and does not need header fields.
            if (normalizedMode == 2)
            {
                request.Description = string.Empty;
                request.CurrencyCode = null;
                request.ExchRate = null;
                request.ProjId = null;
            }

                var actingUser = await ResolveExpenseActingUserForJsonAsync(token, nameof(CreateExpenseSheet));
                if (actingUser.Error != null)
                    return actingUser.Error;
                var requestAxUserId = actingUser.AxUserId;
                _logger.LogInformation(
                    "CreateExpenseSheet request trace. mode={Mode} existingHojaGastosId={ExistingHojaGastosId} X-IND-AxUserId={AxUserId}",
                    normalizedMode,
                    normalizedExistingSheetId ?? string.Empty,
                    requestAxUserId ?? string.Empty);
                LogExpenseCurrencyTrace(
                    nameof(CreateExpenseSheet),
                    "request",
                    ("mode", normalizedMode),
                    ("existingHojaGastosId", normalizedExistingSheetId),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", request.CurrencyCode),
                    ("exchangeRate", request.ExchRate),
                    ("lineCount", request.Lines?.Count ?? 0));
                if (normalizedMode != 2)
                {
                    var managedUserGuard = ValidateManagedUserMutation(requestAxUserId, nameof(CreateExpenseSheet));
                    if (managedUserGuard != null)
                        return StatusCode(managedUserGuard.StatusCode, new { success = false, message = managedUserGuard.Message });
                }
                if (normalizedMode == 2 && !string.IsNullOrWhiteSpace(normalizedExistingSheetId))
                {
                    var mutationGuard = await ValidateExpenseSheetMutationAsync(
                        token,
                        normalizedExistingSheetId,
                        requestAxUserId,
                        nameof(CreateExpenseSheet),
                        ExpenseSheetMutationType.LineMutation);
                    if (!mutationGuard.Allowed)
                        return StatusCode(mutationGuard.StatusCode, new { success = false, message = mutationGuard.Message });
                }

                var response = await _apiClient.CreateExpenseSheetAsync(token, request, requestAxUserId);
                LogExpenseCurrencyTrace(
                    nameof(CreateExpenseSheet),
                    "response",
                    ("mode", normalizedMode),
                    ("existingHojaGastosId", normalizedExistingSheetId),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", request.CurrencyCode),
                    ("success", response.Success),
                    ("traceId", response.TraceId ?? string.Empty),
                    ("message", response.Message ?? string.Empty),
                    ("createdHojaGastosId", response.Data?.HojaGastosId),
                    ("lineRecIdCount", response.Data?.LineRecIds?.Count ?? 0));

                if (IND_SetActionMark && response.Success)
                {
                    TempData.INDSetActionMarkSuccess();
                }

                return Json(new { success = response.Success, message = response.Message, data = response.Data });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in CreateExpenseSheet");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in CreateExpenseSheet");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Updates one expense sheet header with defensive validation.
        [HttpPut("Gastos/UpdateExpenseSheetHeader/{hojaGastosId}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateExpenseSheetHeader(string hojaGastosId, [FromBody] ExpenseSheetUpdateRequest req, [FromQuery] bool IND_SetActionMark = false)
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrWhiteSpace(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                if (string.IsNullOrWhiteSpace(hojaGastosId) ||
                    req == null ||
                    !IsValidExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense))
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var normalizedCurrency = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant();
                var normalizedExchRate = req.ExchRate.HasValue && req.ExchRate.Value > 0m
                    ? NormalizeExpenseSheetExchangeRateForWrite(normalizedCurrency, req.ExchRate)
                    : (decimal?)null;

                var normalizedExpenseSheetStatus = req.ExpenseSheetStatus.HasValue && req.ExpenseSheetStatus.Value >= 0
                    ? req.ExpenseSheetStatus.Value
                    : (int?)null;
                var normalizedExchangeRateMode = req.ExchangeRateMode.HasValue && req.ExchangeRateMode.Value >= 0
                    ? req.ExchangeRateMode.Value
                    : (int?)null;
                var normalizedEstadoComentarios = NormalizeOptionalClearableText(req.EstadoComentarios);
                var normalizedVoucher = NormalizeOptionalText(req.Voucher);

                var request = new ExpenseSheetUpdateRequest
                {
                    Description = (req.Description ?? string.Empty).Trim(),
                    CurrencyCode = normalizedCurrency,
                    ExchRate = normalizedExchRate,
                    ProjId = NormalizeOptionalText(req.ProjId),
                    Voucher = normalizedVoucher,
                    ExpenseSheetStatus = normalizedExpenseSheetStatus,
                    ExchangeRateMode = normalizedExchangeRateMode,
                    EstadoComentarios = normalizedEstadoComentarios,
                    ReimbursableExpense = NormalizeExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense)
                };

                var actingUser = await ResolveExpenseActingUserForJsonAsync(token, nameof(UpdateExpenseSheetHeader));
                if (actingUser.Error != null)
                    return actingUser.Error;
                var requestAxUserId = actingUser.AxUserId;
                var mutationGuard = await ValidateExpenseSheetMutationAsync(
                    token,
                    hojaGastosId.Trim(),
                    requestAxUserId,
                    nameof(UpdateExpenseSheetHeader),
                    ExpenseSheetMutationType.HeaderUpdate,
                    request);
                if (!mutationGuard.Allowed)
                    return StatusCode(mutationGuard.StatusCode, new { success = false, message = mutationGuard.Message });

                var effectiveRequest = BuildExpenseSheetEffectiveHeaderUpdateRequest(
                    mutationGuard,
                    request,
                    nameof(UpdateExpenseSheetHeader),
                    hojaGastosId.Trim());
                LogExpenseCurrencyTrace(
                    nameof(UpdateExpenseSheetHeader),
                    "request",
                    ("hojaGastosId", hojaGastosId.Trim()),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", effectiveRequest.CurrencyCode),
                    ("exchangeRate", effectiveRequest.ExchRate),
                    ("projectId", effectiveRequest.ProjId),
                    ("expenseSheetStatus", effectiveRequest.ExpenseSheetStatus),
                    ("exchangeRateMode", effectiveRequest.ExchangeRateMode));
                var response = await _apiClient.UpdateExpenseSheetHeaderAsync(token, hojaGastosId.Trim(), effectiveRequest, requestAxUserId);
                LogExpenseCurrencyTrace(
                    nameof(UpdateExpenseSheetHeader),
                    "response",
                    ("hojaGastosId", hojaGastosId.Trim()),
                    ("requestedAxUserId", requestAxUserId),
                    ("currencyCode", effectiveRequest.CurrencyCode),
                    ("exchangeRate", effectiveRequest.ExchRate),
                    ("success", response.Success),
                    ("traceId", response.TraceId ?? string.Empty),
                    ("message", response.Message ?? string.Empty));

                if (IND_SetActionMark && response.Success)
                {
                    TempData.INDSetActionMarkSuccess();
                }

                return Json(new { success = response.Success, message = response.Message, data = response.Data });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in UpdateExpenseSheetHeader");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in UpdateExpenseSheetHeader");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Updates one expense sheet line with defensive normalization.
        [HttpPut("Gastos/UpdateExpenseSheetLine/{hojaGastosId}/{lineRecId}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateExpenseSheetLine(
            string hojaGastosId,
            string lineRecId,
            [FromBody] ExpenseSheetLineRequest req,
            [FromQuery] bool IND_SetActionMark = false)
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrWhiteSpace(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                if (string.IsNullOrWhiteSpace(hojaGastosId) || string.IsNullOrWhiteSpace(lineRecId) || req == null)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var normalizedDate = NormalizeLineTransDate(req.TransDate);
                if (string.IsNullOrWhiteSpace(normalizedDate) ||
                    req.TypeValue <= 0 ||
                    req.Qty <= 0 ||
                    req.Price <= 0 ||
                    !IsValidExpenseSheetLineReimbursableExpense(req.ReimbursableExpense))
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var request = new ExpenseSheetLineRequest
                {
                    TransDate = normalizedDate,
                    TypeValue = req.TypeValue,
                    Description = (req.Description ?? string.Empty).Trim(),
                    Internacional = req.Internacional,
                    FileId = NormalizeOptionalText(req.FileId),
                    Ticket = req.Ticket,
                    Qty = req.Qty,
                    Price = req.Price,
                    ProjId = NormalizeOptionalText(req.ProjId),
                    ReimbursableExpense = NormalizeExpenseSheetLineReimbursableExpense(req.ReimbursableExpense),
                    CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                    AmountMST = req.AmountMST,
                    ExchRate = req.ExchRate > 0 ? req.ExchRate : null,
                    IndAttachFiles = req.IndAttachFiles ?? string.Empty
                };

                var actingUser = await ResolveExpenseActingUserForJsonAsync(token, nameof(UpdateExpenseSheetLine));
                if (actingUser.Error != null)
                    return actingUser.Error;
                var requestAxUserId = actingUser.AxUserId;
                var mutationGuard = await ValidateExpenseSheetMutationAsync(
                    token,
                    hojaGastosId.Trim(),
                    requestAxUserId,
                    nameof(UpdateExpenseSheetLine),
                    ExpenseSheetMutationType.LineMutation);
                if (!mutationGuard.Allowed)
                    return StatusCode(mutationGuard.StatusCode, new { success = false, message = mutationGuard.Message });
                var response = await _apiClient.UpdateExpenseSheetLineAsync(
                    token,
                    hojaGastosId.Trim(),
                    lineRecId.Trim(),
                    request,
                    requestAxUserId);

                if (IND_SetActionMark && response.Success)
                {
                    TempData.INDSetActionMarkSuccess();
                }

                return Json(new { success = response.Success, message = response.Message, data = response.Data });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in UpdateExpenseSheetLine");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in UpdateExpenseSheetLine");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Deletes one expense sheet line using the upstream line delete route.
        [HttpDelete("Gastos/DeleteExpenseSheetLine/{hojaGastosId}/{lineRecId}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExpenseSheetLine(
            string hojaGastosId,
            string lineRecId,
            [FromQuery] bool IND_SetActionMark = false)
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrWhiteSpace(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                if (string.IsNullOrWhiteSpace(hojaGastosId) || string.IsNullOrWhiteSpace(lineRecId))
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var actingUser = await ResolveExpenseActingUserForJsonAsync(token, nameof(DeleteExpenseSheetLine));
                if (actingUser.Error != null)
                    return actingUser.Error;
                var requestAxUserId = actingUser.AxUserId;
                var mutationGuard = await ValidateExpenseSheetMutationAsync(
                    token,
                    hojaGastosId.Trim(),
                    requestAxUserId,
                    nameof(DeleteExpenseSheetLine),
                    ExpenseSheetMutationType.LineMutation);
                if (!mutationGuard.Allowed)
                    return StatusCode(mutationGuard.StatusCode, new { success = false, message = mutationGuard.Message });
                var response = await _apiClient.DeleteExpenseSheetLineAsync(
                    token,
                    hojaGastosId.Trim(),
                    lineRecId.Trim(),
                    deleteWholeSheet: false,
                    deleteMode: 0,
                    axUserIdOverride: requestAxUserId);

                if (IND_SetActionMark && response.Success)
                {
                    TempData.INDSetActionMarkDanger();
                }

                return Json(new { success = response.Success, message = response.Message, data = response.Data });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in DeleteExpenseSheetLine");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in DeleteExpenseSheetLine");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Deletes a whole expense sheet using the upstream delete route with deleteWholeSheet flag.
        [HttpDelete("Gastos/DeleteExpenseSheet/{hojaGastosId}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExpenseSheet(string hojaGastosId, [FromQuery] bool IND_SetActionMark = false)
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrWhiteSpace(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                if (string.IsNullOrWhiteSpace(hojaGastosId))
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var actingUser = await ResolveExpenseActingUserForJsonAsync(token, nameof(DeleteExpenseSheet));
                if (actingUser.Error != null)
                    return actingUser.Error;
                var requestAxUserId = actingUser.AxUserId;
                var mutationGuard = await ValidateExpenseSheetMutationAsync(
                    token,
                    hojaGastosId.Trim(),
                    requestAxUserId,
                    nameof(DeleteExpenseSheet),
                    ExpenseSheetMutationType.DeleteSheet);
                if (!mutationGuard.Allowed)
                    return StatusCode(mutationGuard.StatusCode, new { success = false, message = mutationGuard.Message });
                var response = await _apiClient.DeleteExpenseSheetLineAsync(
                    token,
                    hojaGastosId.Trim(),
                    "0",
                    deleteWholeSheet: true,
                    deleteMode: 2,
                    axUserIdOverride: requestAxUserId);

                if (IND_SetActionMark && response.Success)
                {
                    TempData.INDSetActionMarkDanger();
                }

                return Json(new { success = response.Success, message = response.Message, data = response.Data });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in DeleteExpenseSheet");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in DeleteExpenseSheet");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // API route used by React clients for /api/crm/projects/list.
        [HttpGet]
        public Task<IActionResult> ApiProjectsList(string filter = "", int page = 1, int pageSize = 50)
        {
            return GetProjectsListJsonAsync(filter, page, pageSize);
        }

        // Returns projects for optional list filter assistance.
        [HttpGet]
        public async Task<IActionResult> GetProjectsForDropdown(string term = "", int page = 1, int pageSize = 30)
        {
            return await GetProjectsListJsonAsync(term, page, pageSize);
        }

        // Loads project options from IND_CRM_API and emits the dropdown-friendly shape.
        private async Task<IActionResult> GetProjectsListJsonAsync(string filter, int page, int pageSize)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { message = _sr["Api_SessionExpired"].Value });

            var safePage = page < 1 ? 1 : page;
            var safePageSize = pageSize <= 0 ? 30 : pageSize;

            try
            {
                var result = await _apiClient.GetProjectsAsync(token, filter ?? string.Empty, safePage, safePageSize);
                var items = result.GetAnyItems()
                    .Select(ToProjectOption)
                    .Where(x => !string.IsNullOrWhiteSpace(x.Value) || !string.IsNullOrWhiteSpace(x.Text))
                    .ToList();

                return Json(new
                {
                    total = result.Total > 0 ? result.Total : items.Count,
                    items = items.Select(x => new { value = x.Value, text = string.IsNullOrWhiteSpace(x.Text) ? x.Value : x.Text })
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in GetProjectsForDropdown");
                return Json(new { total = 0, items = Array.Empty<object>() });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in GetProjectsForDropdown");
                return Json(new { total = 0, items = Array.Empty<object>() });
            }
        }

        // Loads the current sheet state and resolves the final mutation policy before any write.
        private async Task<ExpenseSheetMutationGuardResult> ValidateExpenseSheetMutationAsync(
            string token,
            string hojaGastosId,
            string? axUserIdOverride,
            string operationName,
            ExpenseSheetMutationType mutationType,
            ExpenseSheetUpdateRequest? headerRequest = null)
        {
            var safeSheetId = NormalizeOptionalText(hojaGastosId);
            if (string.IsNullOrWhiteSpace(safeSheetId))
            {
                return new ExpenseSheetMutationGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = _sr["Api_RequestFailed"].Value,
                    ErrorCode = "INVALID_REQUEST"
                };
            }

            try
            {
                var result = await _apiClient.GetExpenseSheetDetailAsync(token, safeSheetId, axUserIdOverride);
                _logger.LogInformation(
                    "ValidateExpenseSheetMutationAsync upstream detail result. Operation: {Operation}. HojaGastosId: {HojaGastosId}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. ItemCount: {ItemCount}. Message: {Message}.",
                    operationName,
                    safeSheetId,
                    GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                    NormalizeOptionalText(axUserIdOverride) ?? "<session>",
                    result.Success,
                    result.ErrorCode ?? "<null>",
                    result.TraceId ?? "<null>",
                    result.GetAnyItems().Count(),
                    result.Message ?? "<null>");
                var sheet = SelectSheet(result.GetAnyItems(), safeSheetId);
                if (sheet == null)
                {
                    LogExpenseSheetLookupMiss(
                        operationName,
                        safeSheetId,
                        axUserIdOverride,
                        result,
                        "Mutation guard is returning not found because the upstream detail envelope produced no selectable sheet item.");
                    return new ExpenseSheetMutationGuardResult
                    {
                        Allowed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = _sr["ExpenseSheets_NotFound"].Value,
                        ErrorCode = ExpenseSheetNotFoundErrorCode
                    };
                }

                var snapshot = BuildExpenseSheetSnapshot(sheet);
                if (snapshot.IsPaid)
                {
                    return new ExpenseSheetMutationGuardResult
                    {
                        Allowed = false,
                        StatusCode = StatusCodes.Status409Conflict,
                        Message = _sr["ExpenseSheets_Detail_PaidReadOnly"].Value,
                        ErrorCode = ExpenseSheetPaidReadOnlyErrorCode,
                        Snapshot = snapshot
                    };
                }

                var cachedContext = _authContext.GetCachedContext();
                if (cachedContext == null)
                {
                    var contextResult = await _authContext.EnsureContextAsync();
                    if (!contextResult.Success || contextResult.Context == null)
                    {
                        return new ExpenseSheetMutationGuardResult
                        {
                            Allowed = false,
                            StatusCode = StatusCodes.Status403Forbidden,
                            Message = _sr["Auth_PermissionDenied_Body"].Value,
                            ErrorCode = ExpenseManagedUserReadOnlyErrorCode,
                            Snapshot = snapshot
                        };
                    }

                    cachedContext = contextResult.Context;
                }

                var currentAxUserId = NormalizeOptionalText(cachedContext?.Header?.AxUserId) ?? GetCurrentSessionAxUserId() ?? string.Empty;
                var selectedCompanyId = NormalizeOptionalText(_authContext.GetSelectedCompanyId(cachedContext));
                var selectedCompany = cachedContext?.Companies?.FirstOrDefault(company =>
                    string.Equals(company.CompanyId, selectedCompanyId, StringComparison.OrdinalIgnoreCase))
                    ?? cachedContext?.Companies?.FirstOrDefault();
                var allowSelfManagement = selectedCompany?.AllowSelfManagement == true;
                var currentCrmUserId = NormalizeOptionalText(selectedCompany?.CrmUserId);
                var isManagingOtherUser = ResolveIsManagingOtherExpenseRecord(
                    currentAxUserId,
                    currentCrmUserId,
                    snapshot.OwnerUserId,
                    axUserIdOverride);

                if (isManagingOtherUser)
                {
                    var subordinateGuard = await ValidateManagedExpenseSheetOwnerAsync(token, snapshot.OwnerUserId, operationName, snapshot);
                    if (!subordinateGuard.Allowed)
                        return subordinateGuard;
                }

                var policy = ResolveExpenseSheetMutationPolicy(snapshot, isManagingOtherUser, allowSelfManagement);

                if (mutationType == ExpenseSheetMutationType.LineMutation && policy.InteractionMode != ExpenseSheetInteractionMode.FullEdit)
                {
                    return BuildExpenseSheetReadOnlyGuard(snapshot, policy);
                }

                if (mutationType == ExpenseSheetMutationType.DeleteSheet && !policy.CanDeleteSheet)
                {
                    return BuildExpenseSheetReadOnlyGuard(snapshot, policy);
                }

                if (mutationType == ExpenseSheetMutationType.HeaderUpdate)
                {
                    if (headerRequest == null)
                    {
                        return new ExpenseSheetMutationGuardResult
                        {
                            Allowed = false,
                            StatusCode = StatusCodes.Status400BadRequest,
                            Message = _sr["Api_RequestFailed"].Value,
                            ErrorCode = "INVALID_REQUEST",
                            Snapshot = snapshot,
                            Policy = policy
                        };
                    }

                    var headerGuard = ValidateExpenseSheetHeaderUpdate(policy, snapshot, headerRequest);
                    if (!headerGuard.Allowed)
                        return headerGuard;
                }

                return new ExpenseSheetMutationGuardResult
                {
                    Allowed = true,
                    StatusCode = StatusCodes.Status200OK,
                    Snapshot = snapshot,
                    Policy = policy
                };
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error while validating expense sheet mutation in {Operation}", operationName);
                return new ExpenseSheetMutationGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status502BadGateway,
                    Message = _sr["Api_RequestFailed"].Value,
                    ErrorCode = "UPSTREAM_ERROR"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error while validating expense sheet mutation in {Operation}", operationName);
                return new ExpenseSheetMutationGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = _sr["Api_RequestFailed"].Value,
                    ErrorCode = "UNHANDLED_ERROR"
                };
            }
        }

        // Builds a normalized snapshot so backend policy checks stay independent from raw DTO shapes.
        private static ExpenseSheetSnapshot BuildExpenseSheetSnapshot(ExpenseSheetDetailDto sheet)
        {
            return new ExpenseSheetSnapshot
            {
                OwnerUserId = NormalizeOptionalText(sheet.OwnerAxUserId)
                              ?? NormalizeOptionalText(sheet.UserId)
                              ?? NormalizeOptionalText(GetExtraString(sheet.Extra, "ownerAxUserId", "OwnerAxUserId", "userId", "axUserId", "usuario"))
                              ?? string.Empty,
                StatusCode = sheet.ExpenseSheetStatus ?? GetExtraInt(sheet.Extra, "expenseSheetStatus", "status", "estado"),
                Description = NormalizeOptionalText(sheet.Description)
                              ?? NormalizeOptionalText(GetExtraString(sheet.Extra, "description", "descripcion", "desc"))
                              ?? string.Empty,
                CurrencyCode = (NormalizeOptionalText(sheet.CurrencyCode)
                                ?? NormalizeOptionalText(GetExtraString(sheet.Extra, "currencyCode", "currency", "divisa"))
                                ?? string.Empty).ToUpperInvariant(),
                ExchangeRate = NormalizeExpenseSheetExchangeRateForRead(
                    sheet.CurrencyCode ?? GetExtraString(sheet.Extra, "currencyCode", "currency", "divisa"),
                    sheet.ExchRate ?? GetExtraDecimal(sheet.Extra, "exchRate", "exchangeRate", "tipoCambio")) ?? 0m,
                ProjectId = NormalizeOptionalText(sheet.ProjId)
                            ?? NormalizeOptionalText(GetExtraString(sheet.Extra, "projId", "projectId", "proyectoId", "project")),
                Voucher = NormalizeOptionalText(sheet.Voucher) ?? NormalizeOptionalText(GetExtraString(sheet.Extra, "voucher")),
                ExchangeRateMode = sheet.ExchangeRateMode ?? GetExtraInt(sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                StatusComment = NormalizeOptionalText(sheet.EstadoComentarios) ?? NormalizeOptionalText(GetExtraString(sheet.Extra, "estadoComentarios")),
                ReimbursableExpense = sheet.ReimbursableExpense ?? GetExtraInt(sheet.Extra, "reimbursableExpense", "ReimbursableExpense"),
                IsPaid = IsPaidExpenseSheet(sheet)
            };
        }

        // Mirrors the UI matrix in server-side form so direct API calls cannot bypass the workflow.
        private static ExpenseSheetMutationPolicy ResolveExpenseSheetMutationPolicy(
            ExpenseSheetSnapshot snapshot,
            bool isManagingOtherUser,
            bool allowSelfManagement)
        {
            if (snapshot.IsPaid)
            {
                return new ExpenseSheetMutationPolicy
                {
                    InteractionMode = ExpenseSheetInteractionMode.ReadOnly,
                    IsManagingOtherUser = isManagingOtherUser,
                    AllowSelfManagement = allowSelfManagement,
                    CanDeleteSheet = false
                };
            }

            var statusCode = snapshot.StatusCode;
            if (isManagingOtherUser)
            {
                return statusCode switch
                {
                    ExpenseSheetStatusApprovalRequested => BuildPolicy(ExpenseSheetInteractionMode.StatusActionOnly, isManagingOtherUser, allowSelfManagement, false, ExpenseSheetStatusApproved, ExpenseSheetStatusRejected),
                    ExpenseSheetStatusApproved => BuildPolicy(ExpenseSheetInteractionMode.StatusActionOnly, isManagingOtherUser, allowSelfManagement, false, ExpenseSheetStatusApprovalRequested),
                    ExpenseSheetStatusRejected => BuildPolicy(ExpenseSheetInteractionMode.StatusActionOnly, isManagingOtherUser, allowSelfManagement, false, ExpenseSheetStatusApprovalRequested),
                    _ => BuildPolicy(ExpenseSheetInteractionMode.ReadOnly, isManagingOtherUser, allowSelfManagement, false)
                };
            }

            if (allowSelfManagement)
            {
                return statusCode switch
                {
                    ExpenseSheetStatusDraft => BuildPolicy(ExpenseSheetInteractionMode.FullEdit, false, true, true, ExpenseSheetStatusApproved),
                    ExpenseSheetStatusApproved => BuildPolicy(ExpenseSheetInteractionMode.StatusActionOnly, false, true, false, ExpenseSheetStatusDraft),
                    _ => BuildPolicy(ExpenseSheetInteractionMode.ReadOnly, false, true, false)
                };
            }

            return statusCode switch
            {
                ExpenseSheetStatusDraft => BuildPolicy(ExpenseSheetInteractionMode.FullEdit, false, false, true, ExpenseSheetStatusApprovalRequested),
                ExpenseSheetStatusApprovalRequested => BuildPolicy(ExpenseSheetInteractionMode.StatusActionOnly, false, false, false, ExpenseSheetStatusDraft),
                ExpenseSheetStatusRejected => BuildPolicy(ExpenseSheetInteractionMode.StatusActionOnly, false, false, false, ExpenseSheetStatusDraft),
                _ => BuildPolicy(ExpenseSheetInteractionMode.ReadOnly, false, false, false)
            };
        }

        // Creates a compact policy instance with the allowed target statuses for the current matrix cell.
        private static ExpenseSheetMutationPolicy BuildPolicy(
            ExpenseSheetInteractionMode interactionMode,
            bool isManagingOtherUser,
            bool allowSelfManagement,
            bool canDeleteSheet,
            params int[] allowedNextStatuses)
        {
            return new ExpenseSheetMutationPolicy
            {
                InteractionMode = interactionMode,
                IsManagingOtherUser = isManagingOtherUser,
                AllowSelfManagement = allowSelfManagement,
                CanDeleteSheet = canDeleteSheet,
                AllowedNextStatuses = new HashSet<int>(allowedNextStatuses ?? Array.Empty<int>())
            };
        }

        // Validates comment-only and status-transition rules for header updates.
        private ExpenseSheetMutationGuardResult ValidateExpenseSheetHeaderUpdate(
            ExpenseSheetMutationPolicy policy,
            ExpenseSheetSnapshot snapshot,
            ExpenseSheetUpdateRequest request)
        {
            var currentStatus = snapshot.StatusCode;
            var requestedStatus = request.ExpenseSheetStatus ?? currentStatus;
            var requestedStatusChanged = requestedStatus != currentStatus;

            if (policy.InteractionMode == ExpenseSheetInteractionMode.ReadOnly)
            {
                return BuildExpenseSheetReadOnlyGuard(snapshot, policy);
            }

            if (policy.InteractionMode == ExpenseSheetInteractionMode.CommentOnlyEdit &&
                HasExpenseSheetHeaderFieldChanges(snapshot, request))
            {
                return BuildExpenseSheetReadOnlyGuard(snapshot, policy);
            }

            if (policy.InteractionMode == ExpenseSheetInteractionMode.StatusActionOnly &&
                !requestedStatusChanged)
            {
                return BuildExpenseSheetReadOnlyGuard(snapshot, policy);
            }

            if (requestedStatusChanged)
            {
                if (!requestedStatus.HasValue || !policy.AllowedNextStatuses.Contains(requestedStatus.Value))
                {
                    return new ExpenseSheetMutationGuardResult
                    {
                        Allowed = false,
                        StatusCode = StatusCodes.Status409Conflict,
                        Message = _sr["ExpenseSheets_Detail_StatusTransitionNotAllowed"].Value,
                        ErrorCode = ExpenseSheetStatusTransitionErrorCode,
                        Snapshot = snapshot,
                        Policy = policy
                    };
                }
            }

            return new ExpenseSheetMutationGuardResult
            {
                Allowed = true,
                StatusCode = StatusCodes.Status200OK,
                Snapshot = snapshot,
                Policy = policy
            };
        }

        // Keeps status-only actions from mutating header fields echoed by the client form.
        private ExpenseSheetUpdateRequest BuildExpenseSheetEffectiveHeaderUpdateRequest(
            ExpenseSheetMutationGuardResult mutationGuard,
            ExpenseSheetUpdateRequest request,
            string operationName,
            string hojaGastosId)
        {
            if (mutationGuard.Policy?.InteractionMode != ExpenseSheetInteractionMode.StatusActionOnly ||
                mutationGuard.Snapshot == null)
            {
                return request;
            }

            var snapshot = mutationGuard.Snapshot;
            var effectiveRequest = new ExpenseSheetUpdateRequest
            {
                Description = snapshot.Description,
                CurrencyCode = snapshot.CurrencyCode,
                ExchRate = NormalizeExpenseSheetExchangeRateForWrite(snapshot.CurrencyCode, snapshot.ExchangeRate),
                ProjId = snapshot.ProjectId,
                Voucher = snapshot.Voucher,
                ExpenseSheetStatus = request.ExpenseSheetStatus,
                ExchangeRateMode = snapshot.ExchangeRateMode,
                EstadoComentarios = request.EstadoComentarios,
                ReimbursableExpense = snapshot.ReimbursableExpense
            };

            _logger.LogInformation(
                "Sanitized expense sheet status-only update in {Operation}. HojaGastosId: {HojaGastosId}. CurrentStatus: {CurrentStatus}. TargetStatus: {TargetStatus}. IsManagingOtherUser: {IsManagingOtherUser}. AllowSelfManagement: {AllowSelfManagement}.",
                operationName,
                hojaGastosId,
                snapshot.StatusCode?.ToString(CultureInfo.InvariantCulture) ?? "<null>",
                request.ExpenseSheetStatus?.ToString(CultureInfo.InvariantCulture) ?? "<null>",
                mutationGuard.Policy.IsManagingOtherUser,
                mutationGuard.Policy.AllowSelfManagement);

            return effectiveRequest;
        }

        // Status-only actions reuse the stored snapshot, so request exchange-rate validation only applies to editable header payloads.
        private static bool ShouldValidateExpenseSheetExchangeRate(ExpenseSheetMutationGuardResult mutationGuard)
        {
            return mutationGuard.Policy?.InteractionMode != ExpenseSheetInteractionMode.StatusActionOnly;
        }

        // Detects any non-comment header mutation so comment-only mode can stay locked down.
        private static bool HasExpenseSheetHeaderFieldChanges(ExpenseSheetSnapshot snapshot, ExpenseSheetUpdateRequest request)
        {
            if (!string.Equals((request.Description ?? string.Empty).Trim(), snapshot.Description, StringComparison.Ordinal))
                return true;

            if (!string.Equals(NormalizeOptionalText(request.ProjId) ?? string.Empty, snapshot.ProjectId ?? string.Empty, StringComparison.OrdinalIgnoreCase))
                return true;

            if (!string.Equals(NormalizeOptionalText(request.Voucher) ?? string.Empty, snapshot.Voucher ?? string.Empty, StringComparison.OrdinalIgnoreCase))
                return true;

            if (NormalizeExpenseNullableInt(request.ReimbursableExpense) != NormalizeExpenseNullableInt(snapshot.ReimbursableExpense))
                return true;

            return false;
        }

        // Protects subordinate mutations by verifying the record owner belongs to the current subordinate scope.
        private async Task<ExpenseSheetMutationGuardResult> ValidateManagedExpenseSheetOwnerAsync(
            string token,
            string ownerUserId,
            string operationName,
            ExpenseSheetSnapshot snapshot)
        {
            var normalizedOwnerUserId = NormalizeOptionalText(ownerUserId);
            if (string.IsNullOrWhiteSpace(normalizedOwnerUserId))
            {
                return new ExpenseSheetMutationGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status403Forbidden,
                    Message = _sr["Auth_PermissionDenied_Body"].Value,
                    ErrorCode = ExpenseManagedUserReadOnlyErrorCode,
                    Snapshot = snapshot
                };
            }

            try
            {
                var items = await GetExpenseSheetSubordinatesForScopeAsync(token);
                var belongsToSubordinates = items.Any(item => MatchesExpenseSubordinateUserId(item, normalizedOwnerUserId));

                if (belongsToSubordinates)
                {
                    return new ExpenseSheetMutationGuardResult
                    {
                        Allowed = true,
                        StatusCode = StatusCodes.Status200OK,
                        Snapshot = snapshot
                    };
                }

                _logger.LogInformation(
                    "Blocked expense mutation outside subordinate scope in {Operation}. ownerUserId={OwnerUserId}",
                    operationName,
                    normalizedOwnerUserId);

                return new ExpenseSheetMutationGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status403Forbidden,
                    Message = _sr["Auth_PermissionDenied_Body"].Value,
                    ErrorCode = ExpenseManagedUserReadOnlyErrorCode,
                    Snapshot = snapshot
                };
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error while validating subordinate ownership in {Operation}", operationName);
                return new ExpenseSheetMutationGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status502BadGateway,
                    Message = _sr["Api_RequestFailed"].Value,
                    ErrorCode = "UPSTREAM_ERROR",
                    Snapshot = snapshot
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error while validating subordinate ownership in {Operation}", operationName);
                return new ExpenseSheetMutationGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = _sr["Api_RequestFailed"].Value,
                    ErrorCode = "UNHANDLED_ERROR",
                    Snapshot = snapshot
                };
            }
        }

        // Resolves the real approver actor only for managed-user status transitions.
        private async Task<string?> ResolveManagedExpenseStatusActorAxUserIdAsync(
            string token,
            string? requestAxUserId,
            ExpenseSheetMutationGuardResult mutationGuard,
            ExpenseSheetUpdateRequest request,
            string operationName)
        {
            var sessionAxUserId = GetCurrentSessionAxUserId();
            var normalizedRequestAxUserId = NormalizeOptionalText(requestAxUserId);
            if (string.IsNullOrWhiteSpace(sessionAxUserId) ||
                string.IsNullOrWhiteSpace(normalizedRequestAxUserId) ||
                IsSameExpenseUserId(sessionAxUserId, normalizedRequestAxUserId))
            {
                return null;
            }

            var snapshot = mutationGuard.Snapshot;
            var policy = mutationGuard.Policy;
            if (snapshot == null || policy?.IsManagingOtherUser != true)
                return null;

            var requestedStatus = request.ExpenseSheetStatus;
            if (!requestedStatus.HasValue || requestedStatus.Value == snapshot.StatusCode)
                return null;

            try
            {
                var items = await GetExpenseSheetSubordinatesForScopeAsync(token);
                var ownerMatchesScope = items.Any(item => MatchesExpenseSubordinateUserId(item, snapshot.OwnerUserId));
                var requestMatchesOwner = IsSameExpenseUserId(snapshot.OwnerUserId, normalizedRequestAxUserId) ||
                                          items.Any(item =>
                                              MatchesExpenseSubordinateUserId(item, snapshot.OwnerUserId) &&
                                              MatchesExpenseSubordinateUserId(item, normalizedRequestAxUserId));

                if (ownerMatchesScope && requestMatchesOwner)
                    return sessionAxUserId;

                _logger.LogInformation(
                    "Skipped expense status actor forwarding in {Operation}. OwnerMatchesScope={OwnerMatchesScope}. RequestMatchesOwner={RequestMatchesOwner}. RequestAxUserId={RequestAxUserId}. OwnerUserId={OwnerUserId}.",
                    operationName,
                    ownerMatchesScope,
                    requestMatchesOwner,
                    normalizedRequestAxUserId,
                    snapshot.OwnerUserId);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not resolve expense status actor forwarding in {Operation}.", operationName);
            }

            return null;
        }

        // Reuses the same read-only message for blocked header, line and delete mutations outside allowed modes.
        private ExpenseSheetMutationGuardResult BuildExpenseSheetReadOnlyGuard(
            ExpenseSheetSnapshot snapshot,
            ExpenseSheetMutationPolicy policy)
        {
            return new ExpenseSheetMutationGuardResult
            {
                Allowed = false,
                StatusCode = StatusCodes.Status409Conflict,
                Message = _sr["ExpenseSheets_Detail_ReadOnlyByStatus"].Value,
                ErrorCode = ExpenseSheetReadOnlyByStatusErrorCode,
                Snapshot = snapshot,
                Policy = policy
            };
        }

        // Resolves own vs subordinate mode using both Ax and CRM user identities.
        private static bool ResolveIsManagingOtherExpenseRecord(
            string? currentAxUserId,
            string? currentCrmUserId,
            string? ownerUserId,
            string? axUserIdOverride)
        {
            var normalizedCurrentAxUserId = NormalizeOptionalText(currentAxUserId);
            var normalizedCurrentCrmUserId = NormalizeOptionalText(currentCrmUserId);
            var normalizedOwnerUserId = NormalizeOptionalText(ownerUserId);
            if (!string.IsNullOrWhiteSpace(normalizedOwnerUserId))
            {
                var matchesCurrentIdentity =
                    (!string.IsNullOrWhiteSpace(normalizedCurrentAxUserId) && IsSameExpenseUserId(normalizedCurrentAxUserId, normalizedOwnerUserId)) ||
                    (!string.IsNullOrWhiteSpace(normalizedCurrentCrmUserId) && IsSameExpenseUserId(normalizedCurrentCrmUserId, normalizedOwnerUserId));

                if (!string.IsNullOrWhiteSpace(normalizedCurrentAxUserId) || !string.IsNullOrWhiteSpace(normalizedCurrentCrmUserId))
                    return !matchesCurrentIdentity;
            }

            var normalizedOverride = NormalizeOptionalText(axUserIdOverride);
            return !string.IsNullOrWhiteSpace(normalizedCurrentAxUserId) &&
                   !string.IsNullOrWhiteSpace(normalizedOverride) &&
                   !IsSameExpenseUserId(normalizedCurrentAxUserId, normalizedOverride);
        }

        // Compares expense user identifiers with stable trimming and casing.
        private static bool IsSameExpenseUserId(string? left, string? right)
        {
            var normalizedLeft = NormalizeOptionalText(left);
            var normalizedRight = NormalizeOptionalText(right);
            if (string.IsNullOrWhiteSpace(normalizedLeft) || string.IsNullOrWhiteSpace(normalizedRight))
                return false;

            return string.Equals(normalizedLeft, normalizedRight, StringComparison.OrdinalIgnoreCase);
        }

        // Normalizes nullable ints used by status and exchange-rate mode comparisons.
        private static int? NormalizeExpenseNullableInt(int? value)
        {
            return value.HasValue && value.Value >= 0 ? value.Value : null;
        }

        // Treats EUR sheets as a fixed 100 reference rate so read and write flows stay aligned.
        private static decimal? NormalizeExpenseSheetExchangeRateForRead(string? currencyCode, decimal? exchangeRate)
        {
            return string.Equals(
                NormalizeOptionalText(currencyCode),
                "EUR",
                StringComparison.OrdinalIgnoreCase)
                ? 100m
                : exchangeRate;
        }

        // Forces the persisted rate for EUR sheets while preserving legacy fallbacks for other currencies.
        private static decimal NormalizeExpenseSheetExchangeRateForWrite(
            string? currencyCode,
            decimal? exchangeRate,
            decimal fallbackNonEurRate = 0m)
        {
            return string.Equals(
                NormalizeOptionalText(currencyCode),
                "EUR",
                StringComparison.OrdinalIgnoreCase)
                ? 100m
                : (exchangeRate ?? fallbackNonEurRate);
        }

        // Keeps detail payloads consistent with the normalized decimal exchange-rate value.
        private static string NormalizeExpenseSheetExchangeRateText(string? currencyCode, string? exchangeRate)
        {
            var normalizedExchangeRate = NormalizeExpenseSheetExchangeRateForRead(currencyCode, ParseNullableDecimal(exchangeRate));
            return normalizedExchangeRate.HasValue
                ? normalizedExchangeRate.Value.ToString(CultureInfo.InvariantCulture)
                : NormalizeOptionalText(exchangeRate) ?? string.Empty;
        }

        // Parses nullable decimal text defensively because upstream payloads may vary in shape.
        private static decimal? ParseNullableDecimal(string? value)
        {
            var normalizedValue = NormalizeOptionalText(value);
            if (string.IsNullOrWhiteSpace(normalizedValue))
                return null;

            if (decimal.TryParse(normalizedValue, NumberStyles.Any, CultureInfo.InvariantCulture, out var invariantValue))
                return invariantValue;

            if (decimal.TryParse(normalizedValue, NumberStyles.Any, CultureInfo.CurrentCulture, out var currentCultureValue))
                return currentCultureValue;

            return null;
        }

        // Uses tolerance so payload decimals do not fail policy checks on formatting-only differences.
        private static bool AreExpenseDecimalsEquivalent(decimal left, decimal right)
        {
            return Math.Abs(left - right) < 0.0000001m;
        }

        // Builds a paged API JSON response with exact property casing.
        private static JsonResult CreateApiPagedResponse(object payload, int? statusCode = null)
        {
            var result = new JsonResult(
                payload,
                new JsonSerializerOptions
                {
                    PropertyNamingPolicy = null,
                    DictionaryKeyPolicy = null
                });

            if (statusCode.HasValue)
                result.StatusCode = statusCode;

            return result;
        }

        // Builds a command API JSON response with exact property casing.
        private static JsonResult CreateApiResponse(object payload, int? statusCode = null)
        {
            var result = new JsonResult(
                payload,
                new JsonSerializerOptions
                {
                    PropertyNamingPolicy = null,
                    DictionaryKeyPolicy = null
                });

            if (statusCode.HasValue)
                result.StatusCode = statusCode;

            return result;
        }

        // Builds a standard paged API error payload for list-like endpoints.
        private static JsonResult CreateApiPagedError(int statusCode, string message)
        {
            return CreateApiPagedResponse(
                new
                {
                    Success = false,
                    Message = message,
                    Total = 0,
                    Page = 1,
                    PageSize = 0,
                    Items = Array.Empty<object>()
                },
                statusCode);
        }

        // Builds a standard command API error payload.
        private static JsonResult CreateApiCommandError(int statusCode, string message, string errorCode)
        {
            return CreateApiResponse(
                new
                {
                    Success = false,
                    Message = message,
                    ErrorCode = errorCode,
                    Data = (object?)null,
                    Errors = Array.Empty<object>()
                },
                statusCode);
        }

        // Maps UI list filters to the upstream API body contract.
        private static ExpenseSheetListApiRequest BuildExpenseSheetListApiRequest(
            ExpenseSheetListFilterRequest req,
            int page,
            int pageSize)
        {
            return new ExpenseSheetListApiRequest
            {
                Filter = NormalizeOptionalText(BuildListFilter(req)),
                BilledMode = req.BilledMode is >= 0 and <= 2 ? req.BilledMode : null,
                CreatedDateFrom = NormalizeListDateFilter(req.FromDate),
                CreatedDateTo = NormalizeListDateFilter(req.ToDate),
                ProjId = NormalizeOptionalText(req.ProjectId),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode),
                ExpenseSheetStatus = req.ExpenseSheetStatus is >= 0 ? req.ExpenseSheetStatus : null,
                ReimbursableExpense = NormalizeExpenseSheetHeaderReimbursableExpense(req.ReimbursableExpense),
                IncludeSubordinates = req.IncludeSubordinates,
                Page = page,
                PageSize = pageSize
            };
        }

        // Picks the primary text filter for the list endpoint.
        private static string BuildListFilter(ExpenseSheetListFilterRequest req)
        {
            if (!string.IsNullOrWhiteSpace(req.Filter))
                return req.Filter.Trim();

            return string.IsNullOrWhiteSpace(req.HojaGastosId)
                ? string.Empty
                : req.HojaGastosId.Trim();
        }

        // Validates optional ticket gasto type values as numeric AX enum values.
        private static bool IsValidTicketGastoType(int? gastoType)
        {
            return !gastoType.HasValue || gastoType.Value >= 0;
        }

        // Normalizes optional ticket gasto type values before proxying upstream.
        private static int? NormalizeTicketGastoType(int? gastoType)
        {
            return IsValidTicketGastoType(gastoType) ? gastoType : null;
        }

        // Keeps only valid AX reimbursement values for expense sheet headers and list filters.
        private static int? NormalizeExpenseSheetHeaderReimbursableExpense(int? reimbursableExpense)
        {
            return reimbursableExpense is >= 0 and <= 2 ? reimbursableExpense : null;
        }

        // Accepts optional header values while rejecting numeric codes outside No, Yes and Both.
        private static bool IsValidExpenseSheetHeaderReimbursableExpense(int? reimbursableExpense)
        {
            return !reimbursableExpense.HasValue || reimbursableExpense is >= 0 and <= 2;
        }

        // Keeps Both out of expense sheet line payloads while preserving optional null values.
        private static int? NormalizeExpenseSheetLineReimbursableExpense(int? reimbursableExpense)
        {
            return reimbursableExpense is >= 0 and <= 1 ? reimbursableExpense : null;
        }

        // Accepts optional line values but rejects the header-only Both enum value.
        private static bool IsValidExpenseSheetLineReimbursableExpense(int? reimbursableExpense)
        {
            return !reimbursableExpense.HasValue || reimbursableExpense is >= 0 and <= 1;
        }

        // Validates an optional gastoType field read from a raw JSON payload.
        private static bool IsValidTicketGastoTypeElement(JsonElement value)
        {
            if (value.ValueKind == JsonValueKind.Null || value.ValueKind == JsonValueKind.Undefined)
                return true;

            var raw = JsonElementToString(value);
            var normalized = NormalizeEnumCode(raw);
            if (!int.TryParse(normalized, NumberStyles.Integer, CultureInfo.InvariantCulture, out var parsed))
                return false;

            return parsed >= 0;
        }

        // Resolves signed ticket line totals while preserving zero-quantity discounts.
        private static decimal ResolveTicketLineTotalAmount(ExpenseSheetTicketLineRequest? line)
        {
            if (line == null)
                return 0m;

            if (line.TotalAmount.HasValue)
                return line.TotalAmount.Value;

            if (line.Qty == 0m && line.Price < 0m)
                return line.Price;

            return line.Qty * line.Price;
        }

        // Allows qty=0 only when the signed line total represents a discount.
        private static bool IsValidTicketLineAmount(ExpenseSheetTicketLineRequest? line)
        {
            if (line == null || line.Qty < 0m || line.Price == 0m)
                return false;

            if (line.Qty > 0m)
                return true;

            return ResolveTicketLineTotalAmount(line) < 0m;
        }

        private const int MinSupportedExpenseYear = 1900;
        private const int MaxSupportedExpenseYear = 2100;

        private static bool IsSupportedExpenseYear(int year)
        {
            return year >= MinSupportedExpenseYear && year <= MaxSupportedExpenseYear;
        }

        private static int ExpandTwoDigitExpenseYear(int year)
        {
            var normalized = Math.Abs(year % 100);
            return normalized >= 50 ? 1900 + normalized : 2000 + normalized;
        }

        private static DateTime? TryBuildSupportedExpenseDate(int year, int month, int day)
        {
            if (!IsSupportedExpenseYear(year) || month < 1 || month > 12)
                return null;

            var maxDay = DateTime.DaysInMonth(year, month);
            if (day < 1 || day > maxDay)
                return null;

            return new DateTime(year, month, day);
        }

        // Repairs OCR-style years like 1220 by reusing the implied two-digit year (2020).
        private static bool TryParseSupportedCompactDayFirstDate(string value, out DateTime parsed)
        {
            parsed = default;
            if (value.Length != 8 || value.Any(ch => !char.IsDigit(ch)))
                return false;

            if (!int.TryParse(value.AsSpan(0, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var day) ||
                !int.TryParse(value.AsSpan(2, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var month) ||
                !int.TryParse(value.AsSpan(4, 4), NumberStyles.None, CultureInfo.InvariantCulture, out var year))
                return false;

            var candidate = TryBuildSupportedExpenseDate(year, month, day) ??
                            TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day);
            if (!candidate.HasValue)
                return false;

            parsed = candidate.Value;
            return true;
        }

        private static bool TryParseSupportedCompactShortDayFirstDate(string value, out DateTime parsed)
        {
            parsed = default;
            if (value.Length != 6 || value.Any(ch => !char.IsDigit(ch)))
                return false;

            if (!int.TryParse(value.AsSpan(0, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var day) ||
                !int.TryParse(value.AsSpan(2, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var month) ||
                !int.TryParse(value.AsSpan(4, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var year))
                return false;

            var candidate = TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day);
            if (!candidate.HasValue)
                return false;

            parsed = candidate.Value;
            return true;
        }

        private static bool TryParseSupportedSeparatedDayFirstDate(string value, out DateTime parsed)
        {
            parsed = default;
            var parts = value.Split(new[] { '.', '/', '-' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length != 3 || parts[0].Length != 2 || parts[1].Length != 2 || (parts[2].Length != 2 && parts[2].Length != 4))
                return false;

            if (!int.TryParse(parts[0], NumberStyles.None, CultureInfo.InvariantCulture, out var day) ||
                !int.TryParse(parts[1], NumberStyles.None, CultureInfo.InvariantCulture, out var month) ||
                !int.TryParse(parts[2], NumberStyles.None, CultureInfo.InvariantCulture, out var year))
                return false;

            var candidate = parts[2].Length == 2
                ? TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day)
                : TryBuildSupportedExpenseDate(year, month, day) ??
                  TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day);

            if (!candidate.HasValue)
                return false;

            parsed = candidate.Value;
            return true;
        }

        private static bool TryParseSupportedSeparatedYearFirstDate(string value, out DateTime parsed)
        {
            parsed = default;
            var parts = value.Split(new[] { '.', '/', '-' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length != 3 || parts[0].Length != 4 || parts[1].Length != 2 || parts[2].Length != 2)
                return false;

            if (!int.TryParse(parts[0], NumberStyles.None, CultureInfo.InvariantCulture, out var year) ||
                !int.TryParse(parts[1], NumberStyles.None, CultureInfo.InvariantCulture, out var month) ||
                !int.TryParse(parts[2], NumberStyles.None, CultureInfo.InvariantCulture, out var day))
                return false;

            var candidate = TryBuildSupportedExpenseDate(year, month, day) ??
                            TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day);
            if (!candidate.HasValue)
                return false;

            parsed = candidate.Value;
            return true;
        }

        private static DateTime? TryParseSupportedExpenseDate(string? raw)
        {
            var value = NormalizeOptionalText(raw);
            if (string.IsNullOrWhiteSpace(value))
                return null;

            if (TryParseSupportedCompactShortDayFirstDate(value, out var shortDayFirst))
                return shortDayFirst;

            if (TryParseSupportedCompactDayFirstDate(value, out var compactDayFirst))
                return compactDayFirst;

            if (DateTime.TryParseExact(value, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var compactYearFirst) &&
                IsSupportedExpenseYear(compactYearFirst.Year))
                return compactYearFirst;

            if (TryParseSupportedSeparatedDayFirstDate(value, out var separatedDayFirst))
                return separatedDayFirst;

            if (TryParseSupportedSeparatedYearFirstDate(value, out var separatedYearFirst))
                return separatedYearFirst;

            if (DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedInv) &&
                IsSupportedExpenseYear(parsedInv.Year))
                return parsedInv;

            if (DateTime.TryParse(value, CultureInfo.CurrentCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedCur) &&
                IsSupportedExpenseYear(parsedCur.Year))
                return parsedCur;

            return null;
        }

        // Normalizes date filters to accepted API formats using a stable year range and OCR-safe parsing.
        private static string? NormalizeListDateFilter(string? raw)
        {
            var parsed = TryParseSupportedExpenseDate(raw);
            return parsed?.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
        }

        // Normalizes ticket transDate fields to DD.MM.YYYY required by upstream ticket contracts.
        private static string? NormalizeTicketTransDate(string? raw)
        {
            var parsed = TryParseSupportedExpenseDate(raw);
            return parsed?.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture);
        }

        // Normalizes ticket time values to HH:mm:ss for the upstream API.
        private static string? NormalizeTicketTime(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            var value = raw.Trim();
            if (int.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var seconds) &&
                seconds >= 0 &&
                seconds <= 86399)
            {
                return TimeSpan.FromSeconds(seconds).ToString(@"hh\:mm\:ss", CultureInfo.InvariantCulture);
            }

            return DateTime.TryParseExact(
                    value,
                    new[] { "H:mm", "HH:mm", "H:mm:ss", "HH:mm:ss" },
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out var parsed)
                ? parsed.TimeOfDay.ToString(@"hh\:mm\:ss", CultureInfo.InvariantCulture)
                : NormalizeOptionalText(raw);
        }

        // Normalizes line transDate values to DD.MM.YYYY for upstream line contracts.
        private static string NormalizeLineTransDate(string? raw)
        {
            var normalized = NormalizeListDateFilter(raw);
            if (string.IsNullOrWhiteSpace(normalized))
                return string.Empty;

            return NormalizeTicketTransDate(normalized) ?? string.Empty;
        }

        // Returns a trimmed string or null for optional API fields.
        private static string? NormalizeOptionalText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        // Returns trimmed text while preserving explicit empty strings for clearable fields.
        private static string? NormalizeOptionalClearableText(string? value)
        {
            return value == null ? null : value.Trim();
        }

        // Reads the requested acting user override from the current request headers.
        private string? GetRequestedExpenseAxUserId()
        {
            return NormalizeOptionalText(Request.Headers["X-IND-AxUserId"].ToString());
        }

        // Resolves and validates the acting user for paged API responses.
        private async Task<(string? AxUserId, IActionResult? Error)> ResolveExpenseActingUserForPagedAsync(string token, string operationName)
        {
            var guard = await ValidateExpenseActingUserAsync(token, GetRequestedExpenseAxUserId(), operationName);
            if (guard.Allowed)
                return (guard.AxUserId, null);

            return (null, CreateApiPagedError(guard.StatusCode, guard.Message));
        }

        // Resolves and validates the acting user for command API responses.
        private async Task<(string? AxUserId, IActionResult? Error)> ResolveExpenseActingUserForCommandAsync(string token, string operationName)
        {
            var guard = await ValidateExpenseActingUserAsync(token, GetRequestedExpenseAxUserId(), operationName);
            if (guard.Allowed)
                return (guard.AxUserId, null);

            return (null, CreateApiCommandError(guard.StatusCode, guard.Message, guard.ErrorCode));
        }

        // Resolves and validates the acting user for legacy JSON responses.
        private async Task<(string? AxUserId, IActionResult? Error)> ResolveExpenseActingUserForJsonAsync(string token, string operationName)
        {
            var guard = await ValidateExpenseActingUserAsync(token, GetRequestedExpenseAxUserId(), operationName);
            if (guard.Allowed)
                return (guard.AxUserId, null);

            return (null, StatusCode(guard.StatusCode, new { success = false, message = guard.Message }));
        }

        // Returns the Ax user stored in session for the signed-in context.
        private string? GetCurrentSessionAxUserId()
        {
            return NormalizeOptionalText(HttpContext?.Session.GetString("AxUser"));
        }

        // Resolves the current company id exactly as the expense API headers would see it.
        private string? GetSelectedExpenseCompanyIdForLogs()
        {
            var cachedContext = _authContext.GetCachedContext();
            return NormalizeOptionalText(_authContext.GetSelectedCompanyId(cachedContext))
                   ?? NormalizeOptionalText(HttpContext?.Session.GetString("INDCompanySelected"));
        }

        // Emits one compact currency trace so diagnostics stay readable across sheet and ticket flows.
        private void LogExpenseCurrencyTrace(string operation, string stage, params (string Key, object? Value)[] details)
        {
            var detailText = string.Join(
                "; ",
                (details ?? Array.Empty<(string Key, object? Value)>())
                    .Select(detail => $"{detail.Key}={FormatExpenseCurrencyTraceValue(detail.Value)}"));

            _logger.LogInformation(
                "Expense currency trace. operation={Operation}. stage={Stage}. company={Company}. sessionAxUserId={SessionAxUserId}. details={Details}",
                operation,
                stage,
                GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                GetCurrentSessionAxUserId() ?? "<empty>",
                string.IsNullOrWhiteSpace(detailText) ? "<none>" : detailText);
        }

        // Formats one diagnostic value without flooding the logs with null or blank noise.
        private static string FormatExpenseCurrencyTraceValue(object? value)
        {
            if (value == null)
                return "<null>";

            if (value is string text)
                return string.IsNullOrWhiteSpace(text) ? "<empty>" : text.Trim();

            if (value is bool boolValue)
                return boolValue ? "true" : "false";

            if (value is IFormattable formattable)
                return formattable.ToString(null, CultureInfo.InvariantCulture) ?? "<null>";

            return value.ToString() ?? "<null>";
        }

        // Normalizes a currency code for diagnostics while preserving empty-state visibility.
        private static string NormalizeCurrencyCodeForTrace(string? currencyCode)
        {
            return NormalizeOptionalText(currencyCode)?.ToUpperInvariant() ?? "<empty>";
        }

        // Builds a short sample list for ids or composite ticket markers in diagnostic traces.
        private static string BuildTraceListSample(IEnumerable<string>? values, int maxItems = 5)
        {
            var sample = (values ?? Enumerable.Empty<string>())
                .Select(value => NormalizeOptionalText(value) ?? "<empty>")
                .Take(maxItems)
                .ToList();

            return sample.Count == 0 ? "<none>" : string.Join(",", sample);
        }

        // Summarizes ticket currencies so empty values stand out immediately in the logs.
        private static string BuildTicketCurrencySummary<T>(
            IEnumerable<T>? items,
            Func<T, string?> idSelector,
            Func<T, string?> currencySelector,
            int maxItems = 5)
        {
            var list = (items ?? Enumerable.Empty<T>()).ToList();
            var sample = list
                .Take(maxItems)
                .Select(item => $"{NormalizeOptionalText(idSelector(item)) ?? "<empty>"}:{NormalizeCurrencyCodeForTrace(currencySelector(item))}")
                .ToList();
            var emptyCurrencyItems = list
                .Where(item => string.IsNullOrWhiteSpace(NormalizeOptionalText(currencySelector(item))))
                .Select(item => NormalizeOptionalText(idSelector(item)) ?? "<empty>")
                .ToList();

            return $"count={list.Count}; emptyCurrencyCount={emptyCurrencyItems.Count}; sample={BuildTraceListSample(sample, maxItems)}; emptyCurrencyIds={BuildTraceListSample(emptyCurrencyItems, maxItems)}";
        }

        // Summarizes skipped or failed bulk-link issues with a compact ticketId:reason sample.
        private static string BuildBulkIssueSummary(IEnumerable<ExpenseSheetTicketLinkBulkIssueDto>? issues, int maxItems = 5)
        {
            var list = (issues ?? Enumerable.Empty<ExpenseSheetTicketLinkBulkIssueDto>()).ToList();
            var sample = list
                .Take(maxItems)
                .Select(issue => $"{NormalizeOptionalText(issue.TicketId) ?? "<empty>"}:{NormalizeOptionalText(issue.Reason) ?? "<empty>"}")
                .ToList();

            return $"count={list.Count}; sample={BuildTraceListSample(sample, maxItems)}";
        }

        // Reads the effective sheet currency from tolerant extra fields for diagnostics.
        private static string ReadExpenseSheetCurrencyCodeForTrace(ExpenseSheetDetailDto? sheet)
        {
            return NormalizeCurrencyCodeForTrace(GetExtraString(sheet?.Extra, "currencyCode", "CurrencyCode", "currency", "divisa"));
        }

        // Reads the effective sheet exchange rate from tolerant extra fields for diagnostics.
        private static decimal? ReadExpenseSheetExchangeRateForTrace(ExpenseSheetDetailDto? sheet)
        {
            if (sheet == null)
                return null;

            var currencyCode = GetExtraString(sheet.Extra, "currencyCode", "CurrencyCode", "currency", "divisa");
            var exchangeRate = GetExtraDecimal(sheet.Extra, "exchRate", "exchangeRate", "tipoCambio");
            return NormalizeExpenseSheetExchangeRateForRead(currencyCode, exchangeRate);
        }

        // Emits one structured trace with the effective quick-create request limits and multipart metadata.
        private void LogQuickCreateIngressDiagnostics(
            IFormFile ticketImage,
            ExpenseSheetTicketQuickCreateRequest request,
            string? requestAxUserId)
        {
            var maxBodySizeFeature = HttpContext.Features.Get<IHttpMaxRequestBodySizeFeature>();
            var maxRequestBodySize = maxBodySizeFeature?.MaxRequestBodySize;
            var boundaryLength = TryGetMultipartBoundaryLength(Request.ContentType);
            var iisConfigPath = string.Empty;
            var iisMaxAllowedContentLength = TryReadIisMaxAllowedContentLength(out iisConfigPath);

            _logger.LogInformation(
                "ApiExpenseSheetTicketQuickCreate ingress. SelectedCompany: {SelectedCompany}. AxUserId: {AxUserId}. RequestContentLength: {RequestContentLength}. RequestContentType: {RequestContentType}. HasFormContentType: {HasFormContentType}. BoundaryLength: {BoundaryLength}. TicketLength: {TicketLength}. TicketContentType: {TicketContentType}. TicketFileName: {TicketFileName}. TicketExtension: {TicketExtension}. CurrencyCode: {CurrencyCode}. ExistingHojaGastosId: {ExistingHojaGastosId}. ProjId: {ProjId}. DescriptionLength: {DescriptionLength}. ComentarioLength: {ComentarioLength}. MaxRequestBodySize: {MaxRequestBodySize}. MaxRequestBodySizeReadOnly: {MaxRequestBodySizeReadOnly}. IisMaxAllowedContentLength: {IisMaxAllowedContentLength}. IisConfigPath: {IisConfigPath}.",
                GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                NormalizeOptionalText(requestAxUserId) ?? "<empty>",
                Request.ContentLength ?? -1,
                Request.ContentType ?? "<empty>",
                Request.HasFormContentType,
                boundaryLength ?? -1,
                ticketImage.Length,
                ticketImage.ContentType ?? "<empty>",
                Path.GetFileName(ticketImage.FileName ?? string.Empty),
                Path.GetExtension(ticketImage.FileName ?? string.Empty),
                request.CurrencyCode ?? "<empty>",
                request.ExistingHojaGastosId ?? "<empty>",
                request.ProjId ?? "<empty>",
                request.Description?.Length ?? 0,
                request.Comentario?.Length ?? 0,
                maxRequestBodySize ?? -1,
                maxBodySizeFeature?.IsReadOnly ?? false,
                iisMaxAllowedContentLength ?? -1,
                string.IsNullOrWhiteSpace(iisConfigPath) ? "<missing>" : iisConfigPath);

            if (Request.ContentLength.HasValue && maxRequestBodySize.HasValue && Request.ContentLength.Value > maxRequestBodySize.Value)
            {
                _logger.LogWarning(
                    "ApiExpenseSheetTicketQuickCreate request content length exceeds MaxRequestBodySize. RequestContentLength: {RequestContentLength}. MaxRequestBodySize: {MaxRequestBodySize}.",
                    Request.ContentLength.Value,
                    maxRequestBodySize.Value);
            }

            if (Request.ContentLength.HasValue && iisMaxAllowedContentLength.HasValue && Request.ContentLength.Value > iisMaxAllowedContentLength.Value)
            {
                _logger.LogWarning(
                    "ApiExpenseSheetTicketQuickCreate request content length exceeds IIS maxAllowedContentLength. RequestContentLength: {RequestContentLength}. IisMaxAllowedContentLength: {IisMaxAllowedContentLength}.",
                    Request.ContentLength.Value,
                    iisMaxAllowedContentLength.Value);
            }

            if (maxRequestBodySize.HasValue && iisMaxAllowedContentLength.HasValue && maxRequestBodySize.Value != iisMaxAllowedContentLength.Value)
            {
                _logger.LogWarning(
                    "ApiExpenseSheetTicketQuickCreate request size configuration differs between ASP.NET Core and IIS. MaxRequestBodySize: {MaxRequestBodySize}. IisMaxAllowedContentLength: {IisMaxAllowedContentLength}.",
                    maxRequestBodySize.Value,
                    iisMaxAllowedContentLength.Value);
            }
        }

        // Logs when the web proxy converts an upstream miss or rejection into a local not-found style response.
        private void LogExpenseSheetLookupMiss(
            string operationName,
            string hojaGastosId,
            string? requestAxUserId,
            PagedApiResponse<ExpenseSheetDetailDto> result,
            string reason)
        {
            _logger.LogWarning(
                "Expense sheet lookup miss. Operation: {Operation}. HojaGastosId: {HojaGastosId}. SelectedCompany: {SelectedCompany}. RequestedAxUserId: {RequestedAxUserId}. SessionAxUserId: {SessionAxUserId}. UpstreamSuccess: {UpstreamSuccess}. UpstreamErrorCode: {UpstreamErrorCode}. UpstreamTraceId: {UpstreamTraceId}. UpstreamItemCount: {UpstreamItemCount}. UpstreamMessage: {UpstreamMessage}. Reason: {Reason}.",
                operationName,
                hojaGastosId,
                GetSelectedExpenseCompanyIdForLogs() ?? "<empty>",
                NormalizeOptionalText(requestAxUserId) ?? "<empty>",
                GetCurrentSessionAxUserId() ?? "<empty>",
                result.Success,
                result.ErrorCode ?? "<null>",
                result.TraceId ?? "<null>",
                result.GetAnyItems().Count(),
                result.Message ?? "<null>",
                reason);
        }

        // Extracts the multipart boundary length so uploads can be correlated with server buffering behavior.
        private static int? TryGetMultipartBoundaryLength(string? contentType)
        {
            var normalized = NormalizeOptionalText(contentType);
            if (string.IsNullOrWhiteSpace(normalized))
                return null;

            const string boundaryToken = "boundary=";
            var index = normalized.IndexOf(boundaryToken, StringComparison.OrdinalIgnoreCase);
            if (index < 0)
                return null;

            var boundary = normalized[(index + boundaryToken.Length)..].Trim().Trim('"');
            var semicolonIndex = boundary.IndexOf(';');
            if (semicolonIndex >= 0)
                boundary = boundary[..semicolonIndex].Trim();

            return string.IsNullOrWhiteSpace(boundary) ? null : boundary.Length;
        }

        // Reads maxAllowedContentLength from the nearest web.config when the app runs behind IIS.
        private static long? TryReadIisMaxAllowedContentLength(out string configPath)
        {
            configPath = string.Empty;

            foreach (var candidate in EnumerateWebConfigCandidates())
            {
                if (!System.IO.File.Exists(candidate))
                    continue;

                configPath = candidate;
                try
                {
                    var document = XDocument.Load(candidate);
                    var requestLimits = document
                        .Descendants("requestLimits")
                        .FirstOrDefault();
                    var rawValue = requestLimits?.Attribute("maxAllowedContentLength")?.Value;
                    return long.TryParse(rawValue, out var parsed) && parsed > 0
                        ? parsed
                        : null;
                }
                catch
                {
                    return null;
                }
            }

            return null;
        }

        private static IEnumerable<string> EnumerateWebConfigCandidates()
        {
            var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var roots = new[]
            {
                AppContext.BaseDirectory,
                Directory.GetCurrentDirectory()
            };

            foreach (var root in roots)
            {
                var current = root;
                while (!string.IsNullOrWhiteSpace(current))
                {
                    var candidate = Path.Combine(current, "web.config");
                    if (seen.Add(candidate))
                        yield return candidate;

                    current = Directory.GetParent(current)?.FullName;
                }
            }
        }

        // Detects the upstream error that appears when the API company bootstrap context has been lost.
        private static bool IsExpenseAssistantContextBootstrapFailure(ApiTransportResponse<ExpenseSheetsAskResponseData>? transport)
        {
            if (transport == null || transport.StatusCode != HttpStatusCode.Forbidden)
                return false;

            var errorCode = (transport.Response?.ErrorCode ?? string.Empty).Trim();
            if (string.Equals(errorCode, "AUTH_CONTEXT_REQUIRED", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(errorCode, "AUTH_CONTEXT_STALE", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            var normalizedMessage = NormalizeAssistantDiagnosticText(transport.Response?.Message);
            if (string.IsNullOrWhiteSpace(normalizedMessage))
                return false;

            return normalizedMessage.Contains("contexto de companias no inicializado") ||
                   normalizedMessage.Contains("/api/auth/entra/context") ||
                   normalizedMessage.Contains("company context not initialized") ||
                   normalizedMessage.Contains("context not initialized");
        }

        private static string NormalizeAssistantDiagnosticText(string? value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return string.Empty;

            var normalized = value.Normalize(NormalizationForm.FormD);
            var builder = new StringBuilder(normalized.Length);

            foreach (var character in normalized)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(character) == UnicodeCategory.NonSpacingMark)
                    continue;

                builder.Append(char.ToLowerInvariant(character));
            }

            return builder.ToString();
        }

        // Reuses the subordinate scope lookup within one request to avoid duplicate upstream calls.
        private async Task<IReadOnlyList<ExpenseSheetSubordinateDto>> GetExpenseSheetSubordinatesForScopeAsync(string token)
        {
            if (HttpContext?.Items != null &&
                HttpContext.Items.TryGetValue(ExpenseSubordinatesScopeCacheKey, out var cachedItems) &&
                cachedItems is IReadOnlyList<ExpenseSheetSubordinateDto> cachedList)
            {
                return cachedList;
            }

            var result = await _apiClient.GetExpenseSheetSubordinatesAsync(token, GetCurrentSessionAxUserId());
            var items = result.GetAnyItems().ToList();

            if (HttpContext?.Items != null)
            {
                HttpContext.Items[ExpenseSubordinatesScopeCacheKey] = items;
            }

            return items;
        }

        // Validates one acting-user override against the signed-in user and their subordinate scope.
        private async Task<ExpenseActingUserGuardResult> ValidateExpenseActingUserAsync(
            string token,
            string? axUserIdOverride,
            string operationName)
        {
            var normalizedOverride = NormalizeOptionalText(axUserIdOverride);
            if (string.IsNullOrWhiteSpace(normalizedOverride))
            {
                return new ExpenseActingUserGuardResult
                {
                    Allowed = true,
                    StatusCode = StatusCodes.Status200OK,
                    AxUserId = null
                };
            }

            var currentSessionAxUserId = GetCurrentSessionAxUserId();
            if (!string.IsNullOrWhiteSpace(currentSessionAxUserId) &&
                string.Equals(normalizedOverride, currentSessionAxUserId, StringComparison.OrdinalIgnoreCase))
            {
                return new ExpenseActingUserGuardResult
                {
                    Allowed = true,
                    StatusCode = StatusCodes.Status200OK,
                    AxUserId = normalizedOverride
                };
            }

            if (string.IsNullOrWhiteSpace(currentSessionAxUserId))
            {
                _logger.LogWarning(
                    "Blocked acting-user override in {Operation} because the current Ax user is not available in session. RequestedAxUserId={AxUserId}",
                    operationName,
                    normalizedOverride);

                return new ExpenseActingUserGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status401Unauthorized,
                    Message = _sr["Api_SessionExpired"].Value,
                    ErrorCode = "SESSION_EXPIRED"
                };
            }

            try
            {
                var items = await GetExpenseSheetSubordinatesForScopeAsync(token);
                var matchingSubordinate = items.FirstOrDefault(item => MatchesExpenseSubordinateUserId(item, normalizedOverride));

                if (matchingSubordinate != null)
                {
                    var effectiveAxUserId = ResolveExpenseSubordinateAxUserId(matchingSubordinate) ?? normalizedOverride;
                    if (!IsSameExpenseUserId(effectiveAxUserId, normalizedOverride))
                    {
                        _logger.LogInformation(
                            "Resolved expense acting-user override in {Operation}. RequestedUserId={RequestedUserId}; EffectiveAxUserId={EffectiveAxUserId}",
                            operationName,
                            normalizedOverride,
                            effectiveAxUserId);
                    }

                    return new ExpenseActingUserGuardResult
                    {
                        Allowed = true,
                        StatusCode = StatusCodes.Status200OK,
                        AxUserId = effectiveAxUserId
                    };
                }

                _logger.LogInformation(
                    "Blocked acting-user override outside subordinate scope in {Operation}. RequestedAxUserId={AxUserId}",
                    operationName,
                    normalizedOverride);

                return new ExpenseActingUserGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status403Forbidden,
                    Message = _sr["Auth_PermissionDenied_Body"].Value,
                    ErrorCode = ExpenseManagedUserScopeDeniedErrorCode
                };
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error while validating acting-user scope in {Operation}", operationName);
                return new ExpenseActingUserGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status502BadGateway,
                    Message = _sr["Api_RequestFailed"].Value,
                    ErrorCode = "UPSTREAM_ERROR"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error while validating acting-user scope in {Operation}", operationName);
                return new ExpenseActingUserGuardResult
                {
                    Allowed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = _sr["Api_RequestFailed"].Value,
                    ErrorCode = "UNHANDLED_ERROR"
                };
            }
        }

        // Detects when Gastos is acting on another user through X-IND-AxUserId.
        private bool IsManagingOtherExpenseUser(string? axUserIdOverride)
        {
            var normalizedOverride = NormalizeOptionalText(axUserIdOverride);
            var currentSessionAxUserId = GetCurrentSessionAxUserId();
            return !string.IsNullOrWhiteSpace(normalizedOverride) &&
                   !string.IsNullOrWhiteSpace(currentSessionAxUserId) &&
                   !string.Equals(normalizedOverride, currentSessionAxUserId, StringComparison.OrdinalIgnoreCase);
        }

        // Blocks managed-user mutations that are not allowed outside the sheet header state flow.
        private ExpenseSheetMutationGuardResult? ValidateManagedUserMutation(string? axUserIdOverride, string operationName)
        {
            if (!IsManagingOtherExpenseUser(axUserIdOverride))
                return null;

            _logger.LogInformation(
                "Blocked managed-user expense mutation in {Operation}. X-IND-AxUserId={AxUserId}",
                operationName,
                NormalizeOptionalText(axUserIdOverride) ?? string.Empty);

            return new ExpenseSheetMutationGuardResult
            {
                Allowed = false,
                StatusCode = StatusCodes.Status403Forbidden,
                Message = _sr["Auth_PermissionDenied_Body"].Value,
                ErrorCode = ExpenseManagedUserReadOnlyErrorCode
            };
        }

        // Matches one subordinate entry against any stable expense user identifier field.
        private static bool MatchesExpenseSubordinateUserId(ExpenseSheetSubordinateDto item, string normalizedUserId)
        {
            return IsSameExpenseUserId(item?.AxUserId, normalizedUserId) ||
                   IsSameExpenseUserId(item?.CrmUserId, normalizedUserId) ||
                   IsSameExpenseUserId(item?.UserId, normalizedUserId) ||
                   IsSameExpenseUserId(GetExtraString(item?.Extra, "axUserId", "AxUserId"), normalizedUserId) ||
                   IsSameExpenseUserId(GetExtraString(item?.Extra, "crmUserId", "CrmUserId"), normalizedUserId) ||
                   IsSameExpenseUserId(GetExtraString(item?.Extra, "userId", "UserId"), normalizedUserId);
        }

        // Returns the Ax user id that must be sent to upstream for a subordinate match.
        private static string? ResolveExpenseSubordinateAxUserId(ExpenseSheetSubordinateDto item)
        {
            return NormalizeOptionalText(item?.AxUserId)
                   ?? NormalizeOptionalText(GetExtraString(item?.Extra, "axUserId", "AxUserId"))
                   ?? NormalizeOptionalText(item?.CrmUserId)
                   ?? NormalizeOptionalText(GetExtraString(item?.Extra, "crmUserId", "CrmUserId"))
                   ?? NormalizeOptionalText(item?.UserId)
                   ?? NormalizeOptionalText(GetExtraString(item?.Extra, "userId", "UserId"));
        }

        // Treats voucher assignment or paid status code as immutable paid state.
        private static bool IsPaidExpenseSheet(ExpenseSheetDetailDto sheet)
        {
            var statusCode = sheet.ExpenseSheetStatus ?? GetExtraInt(sheet.Extra, "expenseSheetStatus", "status", "estado");
            if (statusCode == ExpenseSheetStatusPaid)
                return true;

            return HasAssignedVoucher(sheet.Voucher ?? GetExtraString(sheet.Extra, "voucher"));
        }

        // Matches the same voucher semantics used by the React expense pages.
        private static bool HasAssignedVoucher(string? value)
        {
            var voucher = (value ?? string.Empty).Trim().ToUpperInvariant();
            if (string.IsNullOrWhiteSpace(voucher))
                return false;

            return voucher != "-" && voucher != "." && voucher != "0";
        }

        // Selects one sheet by id or falls back to the first item.
        private static ExpenseSheetDetailDto? SelectSheet(IEnumerable<ExpenseSheetDetailDto> items, string hojaGastosId)
        {
            var list = (items ?? Enumerable.Empty<ExpenseSheetDetailDto>()).ToList();
            if (list.Count == 0)
                return null;

            var match = list.FirstOrDefault(x =>
                string.Equals((x.HojaGastosId ?? string.Empty).Trim(), hojaGastosId.Trim(), StringComparison.OrdinalIgnoreCase));

            return match ?? list[0];
        }

        // Collects unique linked ticket file ids from a sheet detail payload.
        private static List<string> GetExpenseSheetLinkedTicketFileIds(ExpenseSheetDetailDto? sheet)
        {
            return (sheet?.Lines ?? new List<ExpenseSheetLineDto>())
                .Select(line => NormalizeOptionalText(line.FileId))
                .Where(fileId => !string.IsNullOrWhiteSpace(fileId))
                .Cast<string>()
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToList();
        }

        // Treats missing blob/file cleanup responses as already-clean states.
        private static bool CanIgnoreMissingTicketFileResponse(ApiResponse<object>? response)
        {
            if (response == null || response.Success)
                return false;

            return IsMissingTicketFileMessage(response.Message);
        }

        // Treats missing ticket delete responses as already-clean states.
        private static bool CanIgnoreMissingExpenseSheetTicketResponse(ApiResponse<object>? response)
        {
            if (response == null || response.Success)
                return false;

            return IsMissingExpenseSheetTicketMessage(response.Message)
                || string.Equals(response.ErrorCode, "NOT_FOUND", StringComparison.OrdinalIgnoreCase);
        }

        // Mirrors the tolerant missing-file checks already used by the expense delete flows.
        private static bool IsMissingTicketFileMessage(string? message)
        {
            var normalized = (message ?? string.Empty).Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(normalized))
                return false;

            return normalized.Contains("archivo asociado")
                || normalized.Contains("archivo adjunto")
                || normalized.Contains("associated file")
                || normalized.Contains("attached file");
        }

        // Mirrors backend messages for tickets that were already deleted.
        private static bool IsMissingExpenseSheetTicketMessage(string? message)
        {
            var normalized = (message ?? string.Empty).Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(normalized))
                return false;

            return normalized.Contains("ticket no encontrado")
                || normalized.Contains("ticket not found")
                || normalized.Contains("not found");
        }

        // Resolves the document-currency total for expense sheet headers.
        private static decimal? ResolveExpenseSheetTotalAmountCurrency(ExpenseSheetDetailDto sheet)
        {
            return ReadTypedOrExtraDecimal(
                sheet.TotalAmountCurrency ?? sheet.TotalAmount,
                sheet.Extra,
                "TotalAmountCurrency",
                "totalAmountCurrency",
                "totalAmount",
                "TotalAmount");
        }

        // Resolves the MST reimbursable total for expense sheet headers.
        private static decimal? ResolveExpenseSheetTotalAmountMST(ExpenseSheetDetailDto sheet)
        {
            return ReadTypedOrExtraDecimal(
                sheet.TotalAmountMST,
                sheet.Extra,
                "TotalAmountMST",
                "totalAmountMST",
                "totalamountmst");
        }

        // Reads only the authoritative gross company-currency total returned by the expense sheet API.
        private static decimal? ResolveExpenseSheetTotalGrossAmountMST(ExpenseSheetDetailDto sheet)
        {
            return ReadTypedOrExtraDecimal(
                sheet.TotalGrossAmountMST,
                sheet.Extra,
                "TotalGrossAmountMST",
                "totalGrossAmountMST");
        }

        // Reads only the authoritative employee reimbursement total returned by the expense sheet API.
        private static decimal? ResolveExpenseSheetTotalReimbursableAmount(ExpenseSheetDetailDto sheet)
        {
            return ReadTypedOrExtraDecimal(
                sheet.TotalReimbursableAmount,
                sheet.Extra,
                "TotalReimbursableAmount",
                "totalReimbursableAmount");
        }

        // Resolves the document-currency total for expense sheet lines.
        private static decimal? ResolveExpenseSheetLineTotalAmountCurrency(ExpenseSheetLineDto line)
        {
            return ReadTypedOrExtraDecimal(
                line.TotalAmountCurrency ?? line.Amount,
                line.Extra,
                "TotalAmountCurrency",
                "totalAmountCurrency",
                "amount",
                "Amount");
        }

        // Resolves the MST reimbursable total for expense sheet lines.
        private static decimal? ResolveExpenseSheetLineTotalAmountMST(ExpenseSheetLineDto line)
        {
            return ReadTypedOrExtraDecimal(
                line.TotalAmountMST,
                line.Extra,
                "TotalAmountMST",
                "totalAmountMST",
                "totalamountmst");
        }

        // Reads the line reimbursement amount without falling back to gross or legacy totals.
        private static decimal? ResolveExpenseSheetLineReimbursableAmount(ExpenseSheetLineDto line)
        {
            return ReadTypedOrExtraDecimal(
                line.ReimbursableAmount,
                line.Extra,
                "ReimbursableAmount",
                "reimbursableAmount");
        }

        // Maps a list item to a card payload for the list screen.
        private static object ToExpenseSheetCard(ExpenseSheetDetailDto sheet)
        {
            var currencyCode = ReadTypedOrExtraString(sheet.CurrencyCode, sheet.Extra, "currencyCode", "currency", "divisa");
            var normalizedExchangeRate = NormalizeExpenseSheetExchangeRateForRead(
                currencyCode,
                ReadTypedOrExtraDecimal(sheet.ExchRate, sheet.Extra, "exchRate", "exchangeRate", "tipoCambio"));
            var totalAmountCurrency = ResolveExpenseSheetTotalAmountCurrency(sheet);
            var totalAmountMST = ResolveExpenseSheetTotalAmountMST(sheet);
            var totalGrossAmountMST = ResolveExpenseSheetTotalGrossAmountMST(sheet);
            var totalReimbursableAmount = ResolveExpenseSheetTotalReimbursableAmount(sheet);

            return new
            {
                hojaGastosId = sheet.HojaGastosId ?? string.Empty,
                description = ReadTypedOrExtraString(sheet.Description, sheet.Extra, "description", "descripcion", "desc"),
                expenseSheetStatus = ReadTypedOrExtraInt(sheet.ExpenseSheetStatus, sheet.Extra, "expenseSheetStatus", "status", "estado"),
                estadoComentarios = ReadTypedOrExtraString(sheet.EstadoComentarios, sheet.Extra, "estadoComentarios"),
                userId = ReadTypedOrExtraString(sheet.UserId, sheet.Extra, "userId", "axUserId", "usuario"),
                userName = GetExpenseSheetOwnerUserName(sheet),
                ownerAxUserId = ReadTypedOrExtraString(sheet.OwnerAxUserId, sheet.Extra, "ownerAxUserId", "OwnerAxUserId"),
                ownerName = ReadTypedOrExtraString(sheet.OwnerName, sheet.Extra, "ownerName", "OwnerName"),
                voucher = ReadTypedOrExtraString(sheet.Voucher, sheet.Extra, "voucher"),
                projId = ReadTypedOrExtraString(sheet.ProjId, sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                currencyCode = currencyCode,
                totalAmount = totalAmountCurrency,
                totalAmountCurrency = totalAmountCurrency,
                totalAmountMST = totalAmountMST,
                totalGrossAmountMST = totalGrossAmountMST,
                totalReimbursableAmount = totalReimbursableAmount,
                exchRate = normalizedExchangeRate,
                exchangeRateMode = ReadTypedOrExtraInt(sheet.ExchangeRateMode, sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                reimbursableExpense = ReadTypedOrExtraInt(sheet.ReimbursableExpense, sheet.Extra, "reimbursableExpense", "ReimbursableExpense"),
                createdDate = NormalizeDate(ReadTypedOrExtraString(sheet.CreatedDate, sheet.Extra, "createdDate", "creationDate", "transDate", "fechaCreacion"))
            };
        }

        // Maps a list item to API contract fields expected by /api/crm/expensesheets/list.
        private static object ToExpenseSheetApiListItem(ExpenseSheetDetailDto sheet)
        {
            var currencyCode = ReadTypedOrExtraString(sheet.CurrencyCode, sheet.Extra, "currencyCode", "currency", "divisa");
            var normalizedExchangeRate = NormalizeExpenseSheetExchangeRateForRead(
                currencyCode,
                ReadTypedOrExtraDecimal(sheet.ExchRate, sheet.Extra, "exchRate", "exchangeRate", "tipoCambio"));
            var totalAmountCurrency = ResolveExpenseSheetTotalAmountCurrency(sheet);
            var totalAmountMST = ResolveExpenseSheetTotalAmountMST(sheet);
            var totalGrossAmountMST = ResolveExpenseSheetTotalGrossAmountMST(sheet);
            var totalReimbursableAmount = ResolveExpenseSheetTotalReimbursableAmount(sheet);

            return new
            {
                HojaGastosId = sheet.HojaGastosId ?? string.Empty,
                Description = ReadTypedOrExtraString(sheet.Description, sheet.Extra, "description", "descripcion", "desc"),
                ExpenseSheetStatus = ReadTypedOrExtraInt(sheet.ExpenseSheetStatus, sheet.Extra, "expenseSheetStatus", "status", "estado"),
                EstadoComentarios = ReadTypedOrExtraString(sheet.EstadoComentarios, sheet.Extra, "estadoComentarios"),
                UserId = ReadTypedOrExtraString(sheet.UserId, sheet.Extra, "userId", "axUserId", "usuario"),
                UserName = GetExpenseSheetOwnerUserName(sheet),
                OwnerAxUserId = ReadTypedOrExtraString(sheet.OwnerAxUserId, sheet.Extra, "ownerAxUserId", "OwnerAxUserId"),
                OwnerName = ReadTypedOrExtraString(sheet.OwnerName, sheet.Extra, "ownerName", "OwnerName"),
                Voucher = ReadTypedOrExtraString(sheet.Voucher, sheet.Extra, "voucher"),
                ProjId = ReadTypedOrExtraString(sheet.ProjId, sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                CurrencyCode = currencyCode,
                TotalAmount = totalAmountCurrency,
                TotalAmountCurrency = totalAmountCurrency,
                TotalAmountMST = totalAmountMST,
                TotalGrossAmountMST = totalGrossAmountMST,
                TotalReimbursableAmount = totalReimbursableAmount,
                ExchRate = normalizedExchangeRate,
                ExchangeRateMode = ReadTypedOrExtraInt(sheet.ExchangeRateMode, sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                ReimbursableExpense = ReadTypedOrExtraInt(sheet.ReimbursableExpense, sheet.Extra, "reimbursableExpense", "ReimbursableExpense"),
                CreatedDate = NormalizeDate(ReadTypedOrExtraString(sheet.CreatedDate, sheet.Extra, "createdDate", "creationDate", "transDate", "fechaCreacion"))
            };
        }

        // Maps one detail item to API contract fields expected by /api/crm/expensesheets/{hojaGastosId}.
        private static object ToExpenseSheetApiDetailItem(ExpenseSheetDetailDto sheet)
        {
            var currencyCode = ReadTypedOrExtraString(sheet.CurrencyCode, sheet.Extra, "currencyCode", "currency", "divisa");
            var totalAmountCurrency = ResolveExpenseSheetTotalAmountCurrency(sheet);
            var totalAmountMST = ResolveExpenseSheetTotalAmountMST(sheet);
            var totalGrossAmountMST = ResolveExpenseSheetTotalGrossAmountMST(sheet);
            var totalReimbursableAmount = ResolveExpenseSheetTotalReimbursableAmount(sheet);

            return new
            {
                HojaGastosId = sheet.HojaGastosId ?? string.Empty,
                Description = ReadTypedOrExtraString(sheet.Description, sheet.Extra, "description", "descripcion", "desc"),
                UserId = ReadTypedOrExtraString(sheet.UserId, sheet.Extra, "userId", "axUserId", "usuario"),
                UserName = GetExpenseSheetOwnerUserName(sheet),
                OwnerAxUserId = ReadTypedOrExtraString(sheet.OwnerAxUserId, sheet.Extra, "ownerAxUserId", "OwnerAxUserId"),
                OwnerName = ReadTypedOrExtraString(sheet.OwnerName, sheet.Extra, "ownerName", "OwnerName"),
                ExpenseSheetStatus = ReadTypedOrExtraInt(sheet.ExpenseSheetStatus, sheet.Extra, "expenseSheetStatus", "status", "estado"),
                EstadoComentarios = ReadTypedOrExtraString(sheet.EstadoComentarios, sheet.Extra, "estadoComentarios"),
                CurrencyCode = currencyCode,
                TotalAmount = totalAmountCurrency,
                TotalAmountCurrency = totalAmountCurrency,
                TotalAmountMST = totalAmountMST,
                TotalGrossAmountMST = totalGrossAmountMST,
                TotalReimbursableAmount = totalReimbursableAmount,
                ExchRate = NormalizeExpenseSheetExchangeRateText(
                    currencyCode,
                    ReadTypedOrExtraString(sheet.ExchRate?.ToString(CultureInfo.InvariantCulture), sheet.Extra, "exchRate", "exchangeRate", "tipoCambio")),
                ExchangeRateMode = ReadTypedOrExtraInt(sheet.ExchangeRateMode, sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                ReimbursableExpense = ReadTypedOrExtraInt(sheet.ReimbursableExpense, sheet.Extra, "reimbursableExpense", "ReimbursableExpense"),
                ProjId = ReadTypedOrExtraString(sheet.ProjId, sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                Voucher = ReadTypedOrExtraString(sheet.Voucher, sheet.Extra, "voucher"),
                CreatedDate = NormalizeDate(ReadTypedOrExtraString(sheet.CreatedDate, sheet.Extra, "createdDate", "creationDate", "transDate", "fechaCreacion")),
                Lines = (sheet.Lines ?? new List<ExpenseSheetLineDto>())
                    .Select(ToExpenseSheetApiDetailLine)
                    .ToList()
            };
        }

        // Maps one line detail to API contract fields expected by /api/crm/expensesheets/{hojaGastosId}.
        private static object ToExpenseSheetApiDetailLine(ExpenseSheetLineDto line)
        {
            var typeValueRaw = line.TypeValue.HasValue
                ? line.TypeValue.Value.ToString(CultureInfo.InvariantCulture)
                : GetExtraString(line.Extra, "typeValue", "tipo", "gastoType");
            var fileId = NormalizeOptionalText(line.FileId)
                         ?? NormalizeOptionalText(GetExtraString(line.Extra, "fileId", "FileId"));
            var totalAmountCurrency = ResolveExpenseSheetLineTotalAmountCurrency(line);
            var totalAmountMST = ResolveExpenseSheetLineTotalAmountMST(line);
            var reimbursableAmount = ResolveExpenseSheetLineReimbursableAmount(line);

            return new
            {
                RecId = ResolveLineRecId(line),
                TransDate = NormalizeDate(!string.IsNullOrWhiteSpace(line.TransDate) ? line.TransDate : GetExtraString(line.Extra, "transDate", "fecha")),
                TypeValue = NormalizeEnumCode(typeValueRaw),
                Description = !string.IsNullOrWhiteSpace(line.Description) ? line.Description : GetExtraString(line.Extra, "description", "descripcion"),
                Internacional = line.Internacional ?? GetExtraBool(line.Extra, "internacional", "international"),
                FileId = fileId ?? string.Empty,
                Ticket = line.Ticket ?? GetExtraBool(line.Extra, "ticket"),
                Price = line.Price ?? GetExtraDecimal(line.Extra, "price", "precio"),
                Qty = line.Qty ?? GetExtraDecimal(line.Extra, "qty", "cantidad"),
                Amount = line.Amount ?? GetExtraDecimal(line.Extra, "amount", "importe"),
                ProjId = !string.IsNullOrWhiteSpace(line.ProjId) ? line.ProjId : GetExtraString(line.Extra, "projId", "projectId", "proyectoId"),
                IndAttachFiles = ReadTypedOrExtraString(line.IndAttachFiles, line.Extra, "indAttachFiles", "attachFiles", "attachments"),
                ReimbursableExpense = line.ReimbursableExpense ?? GetExtraInt(line.Extra, "reimbursableExpense", "ReimbursableExpense"),
                CurrencyCode = ReadTypedOrExtraString(line.CurrencyCode, line.Extra, "currencyCode", "CurrencyCode"),
                AmountMST = line.AmountMST ?? GetExtraDecimal(line.Extra, "amountMST", "AmountMST", "amountMst"),
                ReimbursableAmount = reimbursableAmount,
                TotalAmountCurrency = totalAmountCurrency,
                TotalAmountMST = totalAmountMST,
                ExchRate = line.ExchRate ?? GetExtraDecimal(line.Extra, "exchRate", "ExchRate", "exchangeRate")
            };
        }

        // Selects one ticket by file id or falls back to the first item.
        private static ExpenseSheetTicketDetailDto? SelectTicket(IEnumerable<ExpenseSheetTicketDetailDto> items, string fileId)
        {
            var list = (items ?? Enumerable.Empty<ExpenseSheetTicketDetailDto>()).ToList();
            if (list.Count == 0)
                return null;

            var match = list.FirstOrDefault(x =>
                string.Equals((x.FileId ?? string.Empty).Trim(), fileId.Trim(), StringComparison.OrdinalIgnoreCase));

            return match ?? list[0];
        }

        // Maps one ticket list item to API contract fields expected by /api/crm/expensesheets/tickets/list.
        private static object ToExpenseSheetTicketApiListItem(ExpenseSheetTicketListItemDto item)
        {
            var totalAmountCurrency = item.TotalAmountCurrency ?? item.TotalAmount;

            return new
            {
                FileId = item.FileId ?? string.Empty,
                Description = item.Description ?? string.Empty,
                Status = item.Status,
                ProcessedByAI = item.ProcessedByAI,
                CurrencyCode = item.CurrencyCode ?? string.Empty,
                TotalAmount = totalAmountCurrency,
                TotalAmountCurrency = totalAmountCurrency,
                TotalAmountMST = item.TotalAmountMST,
                TransDate = NormalizeDate(item.TransDate),
                TicketDate = NormalizeDate(item.TicketDate),
                TicketTime = NormalizeTicketTime(item.TicketTime) ?? string.Empty,
                FileName = item.FileName ?? string.Empty,
                GastoType = NormalizeTicketGastoType(item.GastoType),
                OwnerAxUserId = item.OwnerAxUserId ?? string.Empty,
                OwnerName = item.OwnerName ?? string.Empty
            };
        }

        // Maps one link-mode ticket list item to API contract fields expected by /api/crm/expensesheets/tickets/link/list.
        private static object ToExpenseSheetTicketLinkApiListItem(ExpenseSheetTicketLinkListItemDto item)
        {
            var totalAmountCurrency = item.TotalAmountCurrency ?? item.TotalAmount;

            return new
            {
                FileId = item.FileId ?? string.Empty,
                Description = item.Description ?? string.Empty,
                ProcessedByAI = item.ProcessedByAI,
                CurrencyCode = item.CurrencyCode ?? string.Empty,
                TotalAmount = totalAmountCurrency,
                TotalAmountCurrency = totalAmountCurrency,
                TotalAmountMST = item.TotalAmountMST,
                TransDate = NormalizeDate(item.TransDate),
                TicketDate = NormalizeDate(item.TicketDate),
                TicketTime = NormalizeTicketTime(item.TicketTime) ?? string.Empty,
                FileName = item.FileName ?? string.Empty,
                GastoType = NormalizeTicketGastoType(item.GastoType),
                OwnerAxUserId = item.OwnerAxUserId ?? string.Empty,
                OwnerName = item.OwnerName ?? string.Empty
            };
        }

        // Maps one ticket detail item to API contract fields expected by /api/crm/expensesheets/tickets/{fileId}.
        private static object ToExpenseSheetTicketApiDetailItem(ExpenseSheetTicketDetailDto item)
        {
            var totalAmountCurrency = item.TotalAmountCurrency ?? item.TotalAmount;

            return new
            {
                FileId = item.FileId ?? string.Empty,
                Description = item.Description ?? string.Empty,
                Status = item.Status,
                HojaGastosIdDisplay = item.HojaGastosIdDisplay ?? string.Empty,
                ProcessedByAI = item.ProcessedByAI,
                CurrencyCode = item.CurrencyCode ?? string.Empty,
                TotalAmount = totalAmountCurrency,
                TotalAmountCurrency = totalAmountCurrency,
                TotalAmountMST = item.TotalAmountMST,
                AmountMST = item.AmountMST,
                ExchRate = item.ExchRate,
                CreatedByUserId = item.CreatedByUserId ?? string.Empty,
                TransDate = NormalizeDate(item.TransDate),
                TicketDate = NormalizeDate(item.TicketDate),
                TicketTime = NormalizeTicketTime(item.TicketTime) ?? string.Empty,
                Comentario = item.Comentario ?? string.Empty,
                UrlFile = item.UrlFile ?? string.Empty,
                OcrJson = item.OcrJson ?? string.Empty,
                NormalizedJson = item.NormalizedJson ?? string.Empty,
                FileName = item.FileName ?? string.Empty,
                GastoType = NormalizeTicketGastoType(item.GastoType),
                OwnerAxUserId = item.OwnerAxUserId ?? string.Empty,
                OwnerName = item.OwnerName ?? string.Empty,
                Lines = (item.Lines ?? new List<ExpenseSheetTicketLineDto>())
                    .Select(ToExpenseSheetTicketApiDetailLine)
                    .ToList()
            };
        }

        // Maps one ticket line detail to API contract fields expected by /api/crm/expensesheets/tickets/{fileId}.
        private static object ToExpenseSheetTicketApiDetailLine(ExpenseSheetTicketLineDto line)
        {
            return new
            {
                RecId = line.RecId ?? string.Empty,
                Description = line.Description ?? string.Empty,
                Qty = line.Qty,
                Price = line.Price,
                TotalAmount = line.TotalAmount,
                RefRecIdTable = line.RefRecIdTable ?? string.Empty,
                CreatedByUserId = line.CreatedByUserId ?? string.Empty,
                AdjustmentAmount = line.AdjustmentAmount
            };
        }

        // Maps currency items to API contract fields expected by /api/crm/expensesheets/currencies.
        private static ExpenseSheetCurrencyDto ToExpenseSheetCurrencyApiItem(ExpenseSheetCurrencyDto item)
        {
            var rawCode = NormalizeOptionalText(item.CurrencyCode)
                          ?? NormalizeOptionalText(GetExtraString(item.Extra, "currencyCode", "CurrencyCode"));
            var rawIso = NormalizeOptionalText(item.CurrencyCodeISO)
                         ?? NormalizeOptionalText(GetExtraString(item.Extra, "currencyCodeISO", "CurrencyCodeISO", "currencyCodeIso", "isoCode"));
            var effective = rawIso ?? rawCode ?? string.Empty;

            return new ExpenseSheetCurrencyDto
            {
                CurrencyCode = (rawCode ?? effective).ToUpperInvariant(),
                CurrencyCodeISO = (rawIso ?? effective).ToUpperInvariant()
            };
        }

        // Maps subordinate items to API contract fields expected by /api/crm/expensesheets/subordinates.
        private static ExpenseSheetSubordinateApiItem ToExpenseSheetSubordinateApiItem(ExpenseSheetSubordinateDto item)
        {
            var legacyUserId = NormalizeOptionalText(item.UserId)
                               ?? NormalizeOptionalText(GetExtraString(item.Extra, "userId", "UserId"));
            var crmUserId = NormalizeOptionalText(item.CrmUserId)
                            ?? NormalizeOptionalText(GetExtraString(item.Extra, "crmUserId", "CrmUserId"))
                            ?? legacyUserId;
            var axUserId = NormalizeOptionalText(item.AxUserId)
                           ?? NormalizeOptionalText(GetExtraString(item.Extra, "axUserId", "AxUserId"))
                           ?? legacyUserId;
            var name = NormalizeOptionalText(item.Name)
                       ?? NormalizeOptionalText(GetExtraString(item.Extra, "name", "Name"));
            var effectiveCrmUserId = crmUserId ?? axUserId ?? string.Empty;
            var effectiveAxUserId = axUserId ?? crmUserId ?? string.Empty;

            return new ExpenseSheetSubordinateApiItem
            {
                UserId = effectiveCrmUserId,
                AxUserId = effectiveAxUserId,
                Name = name ?? effectiveAxUserId
            };
        }

        // Reads the owner display name from typed fields first and then from legacy extension data.
        private static string GetExpenseSheetOwnerUserName(ExpenseSheetDetailDto sheet)
        {
            return NormalizeOptionalText(sheet.UserName)
                   ?? NormalizeOptionalText(GetExtraString(sheet.Extra, "userName", "UserName", "name", "userDisplayName", "nombreUsuario"))
                   ?? string.Empty;
        }

        // Public subordinate API contract. Keep only fields expected by consumers.
        private sealed class ExpenseSheetSubordinateApiItem
        {
            public string UserId { get; set; } = string.Empty;
            public string AxUserId { get; set; } = string.Empty;
            public string Name { get; set; } = string.Empty;
        }

        // Maps one sheet to a detail header payload.
        private static object ToExpenseSheetHeader(ExpenseSheetDetailDto sheet)
        {
            var currencyCode = ReadTypedOrExtraString(sheet.CurrencyCode, sheet.Extra, "currencyCode", "currency", "divisa");
            var totalAmountCurrency = ResolveExpenseSheetTotalAmountCurrency(sheet);
            var totalAmountMST = ResolveExpenseSheetTotalAmountMST(sheet);
            var totalGrossAmountMST = ResolveExpenseSheetTotalGrossAmountMST(sheet);
            var totalReimbursableAmount = ResolveExpenseSheetTotalReimbursableAmount(sheet);

            return new
            {
                hojaGastosId = sheet.HojaGastosId ?? string.Empty,
                description = ReadTypedOrExtraString(sheet.Description, sheet.Extra, "description", "descripcion", "desc"),
                userId = ReadTypedOrExtraString(sheet.UserId, sheet.Extra, "userId"),
                userName = GetExpenseSheetOwnerUserName(sheet),
                ownerAxUserId = ReadTypedOrExtraString(sheet.OwnerAxUserId, sheet.Extra, "ownerAxUserId", "OwnerAxUserId"),
                ownerName = ReadTypedOrExtraString(sheet.OwnerName, sheet.Extra, "ownerName", "OwnerName"),
                expenseSheetStatus = ReadTypedOrExtraInt(sheet.ExpenseSheetStatus, sheet.Extra, "expenseSheetStatus", "status", "estado"),
                estadoComentarios = ReadTypedOrExtraString(sheet.EstadoComentarios, sheet.Extra, "estadoComentarios"),
                currencyCode = currencyCode,
                totalAmount = totalAmountCurrency,
                totalAmountCurrency = totalAmountCurrency,
                totalAmountMST = totalAmountMST,
                totalGrossAmountMST = totalGrossAmountMST,
                totalReimbursableAmount = totalReimbursableAmount,
                exchRate = NormalizeExpenseSheetExchangeRateText(
                    currencyCode,
                    ReadTypedOrExtraString(sheet.ExchRate?.ToString(CultureInfo.InvariantCulture), sheet.Extra, "exchRate", "exchangeRate", "tipoCambio")),
                exchangeRateMode = ReadTypedOrExtraInt(sheet.ExchangeRateMode, sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                reimbursableExpense = ReadTypedOrExtraInt(sheet.ReimbursableExpense, sheet.Extra, "reimbursableExpense", "ReimbursableExpense"),
                projId = ReadTypedOrExtraString(sheet.ProjId, sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                voucher = ReadTypedOrExtraString(sheet.Voucher, sheet.Extra, "voucher")
            };
        }

        // Maps one line to a detail payload used by detail and line screens.
        // Preserves the numeric typeValueCode and includes a defensive label for legacy callers.
        private object ToExpenseSheetLine(ExpenseSheetLineDto line)
        {
            var rawTypeValue = line.TypeValue.HasValue
                ? line.TypeValue.Value.ToString(CultureInfo.InvariantCulture)
                : GetExtraString(line.Extra, "typeValue", "tipo", "gastoType");
            var typeValueCode = NormalizeEnumCode(rawTypeValue);
            var typeValueLabel = _crmEnumCatalog.GetGastoTypeLabel(typeValueCode);
            var fileId = NormalizeOptionalText(line.FileId)
                         ?? NormalizeOptionalText(GetExtraString(line.Extra, "fileId", "FileId"));
            var totalAmountCurrency = ResolveExpenseSheetLineTotalAmountCurrency(line);
            var totalAmountMST = ResolveExpenseSheetLineTotalAmountMST(line);
            var reimbursableAmount = ResolveExpenseSheetLineReimbursableAmount(line);

            return new
            {
                lineRecId = ResolveLineRecId(line),
                transDate = NormalizeDate(!string.IsNullOrWhiteSpace(line.TransDate) ? line.TransDate : GetExtraString(line.Extra, "transDate", "fecha")),
                typeValue = string.IsNullOrWhiteSpace(typeValueLabel) ? typeValueCode : typeValueLabel,
                typeValueCode = typeValueCode,
                description = !string.IsNullOrWhiteSpace(line.Description) ? line.Description : GetExtraString(line.Extra, "description", "descripcion"),
                internacional = line.Internacional ?? GetExtraBool(line.Extra, "internacional", "international"),
                fileId = fileId ?? string.Empty,
                ticket = line.Ticket ?? GetExtraBool(line.Extra, "ticket"),
                price = line.Price ?? GetExtraDecimal(line.Extra, "price", "precio"),
                qty = line.Qty ?? GetExtraDecimal(line.Extra, "qty", "cantidad"),
                amount = line.Amount ?? GetExtraDecimal(line.Extra, "amount", "importe"),
                projId = !string.IsNullOrWhiteSpace(line.ProjId) ? line.ProjId : GetExtraString(line.Extra, "projId", "projectId", "proyectoId"),
                indAttachFiles = ReadTypedOrExtraString(line.IndAttachFiles, line.Extra, "indAttachFiles", "attachFiles", "attachments"),
                reimbursableExpense = line.ReimbursableExpense ?? GetExtraInt(line.Extra, "reimbursableExpense", "ReimbursableExpense"),
                currencyCode = ReadTypedOrExtraString(line.CurrencyCode, line.Extra, "currencyCode", "CurrencyCode"),
                amountMST = line.AmountMST ?? GetExtraDecimal(line.Extra, "amountMST", "AmountMST", "amountMst"),
                reimbursableAmount = reimbursableAmount,
                totalAmountCurrency = totalAmountCurrency,
                totalAmountMST = totalAmountMST,
                exchRate = line.ExchRate ?? GetExtraDecimal(line.Extra, "exchRate", "ExchRate", "exchangeRate")
            };
        }

        // Resolves line record id from dto property or fallback extension keys.
        private static string ResolveLineRecId(ExpenseSheetLineDto line)
        {
            var directRecId = (line.RecId ?? string.Empty).Trim();
            if (!string.IsNullOrWhiteSpace(directRecId))
                return directRecId;

            var direct = (line.LineRecId ?? string.Empty).Trim();
            if (!string.IsNullOrWhiteSpace(direct))
                return direct;

            return GetExtraString(line.Extra, "lineRecId", "recId");
        }

        // Loads expense enum select options from the AX catalog with defensive fallbacks.
        private async Task LoadExpenseEnumViewBagsAsync(string token)
        {
            var gastoTypeFallback = LoadFallbackGastoTypeOptions();
            ViewBag.GastoTypeOptions = gastoTypeFallback;
            ViewBag.ExpenseSheetStatusOptions = Array.Empty<object>();
            ViewBag.ReimbursableExpenseOptions = Array.Empty<object>();
            ViewBag.ReimbursableExpenseLineOptions = Array.Empty<object>();
            ViewBag.ExchangeRateModeOptions = Array.Empty<object>();
            ViewBag.TicketStatusOptions = Array.Empty<object>();

            try
            {
                var result = await _apiClient.GetEnumCatalogByNameAsync(token, CrmAppCode, ExpenseCatalogEnumNames);
                var catalog = result.GetAnyItems().ToList();
                if (!result.Success && catalog.Count == 0)
                {
                    _logger.LogWarning("Expense enum catalog returned no usable data. Message={Message} TraceId={TraceId}", result.Message, result.TraceId);
                    return;
                }

                ViewBag.GastoTypeOptions = LoadOptionsFromCatalog(catalog, GastoTypeEnumName, gastoTypeFallback, result.TraceId);
                ViewBag.ExpenseSheetStatusOptions = LoadOptionsFromCatalog(catalog, "INDExpenseSheetStatus", traceId: result.TraceId);
                ViewBag.ReimbursableExpenseOptions = LoadOptionsFromCatalog(catalog, "INDReimbursableExpense", traceId: result.TraceId);
                ViewBag.ReimbursableExpenseLineOptions = LoadOptionsFromCatalog(catalog, "INDReimbursableExpenseLines", traceId: result.TraceId);
                ViewBag.ExchangeRateModeOptions = LoadOptionsFromCatalog(catalog, "INDExchangeRateMode", traceId: result.TraceId);
                ViewBag.TicketStatusOptions = LoadOptionsFromCatalog(catalog, "INDTicketStatus", traceId: result.TraceId);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not load expense enum catalog. Local fallback options will be used.");
            }
        }

        // Resolves one enum option list from a loaded catalog.
        private List<dynamic> LoadOptionsFromCatalog(
            IEnumerable<CrmEnumCatalogDto> catalog,
            string axEnumName,
            IEnumerable<dynamic>? fallback = null,
            string? traceId = null)
        {
            var catalogList = catalog?.ToList() ?? new List<CrmEnumCatalogDto>();
            var fallbackItems = fallback?.Cast<dynamic>().ToList() ?? new List<dynamic>();
            var options = _crmEnumCatalog
                .GetOptionsByAxEnumName(catalogList, axEnumName, fallbackItems)
                .Cast<dynamic>()
                .ToList();

            if (!_crmEnumCatalog.HasUsableOptionsByAxEnumName(catalogList, axEnumName))
            {
                _logger.LogWarning(
                    "Expense enum catalog fallback used. AppCode={AppCode}; Company={Company}; AxEnumName={AxEnumName}; FallbackCount={FallbackCount}; ReturnedOptionCount={ReturnedOptionCount}; TraceId={TraceId}",
                    CrmAppCode,
                    ResolveCatalogCompany(catalogList),
                    axEnumName,
                    fallbackItems.Count,
                    options.Count,
                    traceId);
            }

            return options;
        }

        // Resolves the company from returned enum catalog rows for fallback logging.
        private static string ResolveCatalogCompany(IEnumerable<CrmEnumCatalogDto> catalog)
        {
            return catalog
                .Select(item => item.Company)
                .FirstOrDefault(company => !string.IsNullOrWhiteSpace(company)) ?? string.Empty;
        }

        // Builds stable local fallback options for CRMGastoType.
        private List<dynamic> LoadFallbackGastoTypeOptions()
        {
            return _crmEnumCatalog
                .GetGastoTypeMap()
                .Select(x => new { value = x.Key, text = x.Value })
                .OrderBy(x => int.TryParse(x.value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var code) ? code : int.MaxValue)
                .Cast<dynamic>()
                .ToList();
        }

        // Maps a project dto to simple option values.
        private static (string Value, string Text) ToProjectOption(ProjectDto dto)
        {
            var value = ReadTypedOrExtraString(dto.ProjId, dto.Extra, "projId", "projectId", "projectCode", "code", "id");
            var text = ReadTypedOrExtraString(dto.Name, dto.Extra, "name", "projectName", "projName", "description", "text");

            if (string.IsNullOrWhiteSpace(text))
                text = value;

            return (value, text);
        }

        // Reads the current typed API field first, then falls back to legacy JsonExtensionData keys.
        private static string ReadTypedOrExtraString(string? typedValue, Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            return NormalizeOptionalText(typedValue) ?? GetExtraString(extra, keys);
        }

        // Reads the current typed integer API field first, then falls back to legacy JsonExtensionData keys.
        private static int? ReadTypedOrExtraInt(int? typedValue, Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            return typedValue ?? GetExtraInt(extra, keys);
        }

        // Reads the current typed decimal API field first, then falls back to legacy JsonExtensionData keys.
        private static decimal? ReadTypedOrExtraDecimal(decimal? typedValue, Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            return typedValue ?? GetExtraDecimal(extra, keys);
        }

        // Reads the first matching extra value as string.
        private static string GetExtraString(Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            if (extra == null || keys == null || keys.Length == 0)
                return string.Empty;

            foreach (var key in keys)
            {
                if (!TryGetExtra(extra, key, out var element))
                    continue;

                var value = JsonElementToString(element);
                if (!string.IsNullOrWhiteSpace(value))
                    return value;
            }

            return string.Empty;
        }

        // Normalizes enum code values so numeric strings with decimals can resolve enum labels.
        private static string NormalizeEnumCode(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return string.Empty;

            var value = raw.Trim();
            if (long.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var parsedLong))
                return parsedLong.ToString(CultureInfo.InvariantCulture);

            if (decimal.TryParse(value, NumberStyles.Float, CultureInfo.InvariantCulture, out var parsedDecimal) &&
                decimal.Truncate(parsedDecimal) == parsedDecimal)
            {
                return decimal.ToInt64(parsedDecimal).ToString(CultureInfo.InvariantCulture);
            }

            return value;
        }

        // Reads the first matching extra value as decimal.
        private static decimal? GetExtraDecimal(Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            var raw = GetExtraString(extra, keys);
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            if (decimal.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out var inv))
                return inv;

            if (decimal.TryParse(raw, NumberStyles.Any, CultureInfo.CurrentCulture, out var cur))
                return cur;

            return null;
        }

        // Reads the first matching extra value as integer.
        private static int? GetExtraInt(Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            var raw = GetExtraString(extra, keys);
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            if (int.TryParse(raw, NumberStyles.Integer, CultureInfo.InvariantCulture, out var integer))
                return integer;

            if (decimal.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out var decimalInv) &&
                decimal.Truncate(decimalInv) == decimalInv &&
                decimalInv >= int.MinValue &&
                decimalInv <= int.MaxValue)
            {
                return decimal.ToInt32(decimalInv);
            }

            if (decimal.TryParse(raw, NumberStyles.Any, CultureInfo.CurrentCulture, out var decimalCur) &&
                decimal.Truncate(decimalCur) == decimalCur &&
                decimalCur >= int.MinValue &&
                decimalCur <= int.MaxValue)
            {
                return decimal.ToInt32(decimalCur);
            }

            return null;
        }

        // Reads the first matching extra value as bool.
        private static bool? GetExtraBool(Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            var raw = GetExtraString(extra, keys);
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            if (bool.TryParse(raw, out var result))
                return result;

            if (string.Equals(raw, "1", StringComparison.OrdinalIgnoreCase))
                return true;

            if (string.Equals(raw, "0", StringComparison.OrdinalIgnoreCase))
                return false;

            return null;
        }

        // Finds one key in a case-insensitive extra dictionary.
        private static bool TryGetExtra(Dictionary<string, JsonElement> extra, string key, out JsonElement element)
        {
            foreach (var entry in extra)
            {
                if (string.Equals(entry.Key, key, StringComparison.OrdinalIgnoreCase))
                {
                    element = entry.Value;
                    return true;
                }
            }

            element = default;
            return false;
        }

        // Converts a JsonElement to a plain string safely.
        private static string JsonElementToString(JsonElement element)
        {
            try
            {
                return element.ValueKind switch
                {
                    JsonValueKind.String => element.GetString() ?? string.Empty,
                    JsonValueKind.Number => element.ToString(),
                    JsonValueKind.True => "true",
                    JsonValueKind.False => "false",
                    JsonValueKind.Null => string.Empty,
                    JsonValueKind.Undefined => string.Empty,
                    _ => element.ToString()
                };
            }
            catch
            {
                return string.Empty;
            }
        }

        // Normalizes date values to yyyy-MM-dd when possible.
        // Parses explicit day-first formats first to avoid month/day swaps on server cultures.
        private static string NormalizeDate(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return string.Empty;

            var parsed = TryParseSupportedExpenseDate(raw);
            return parsed?.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture) ?? raw.Trim();
        }
    }
}
