using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using IND_CRM_APP.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text.Json;

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
        private static readonly HashSet<int> AllowedTicketGastoTypes = new() { 0, 1, 2, 3, 4, 5, 6, 7, 8, 14 };
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

            ViewBag.GastoTypeOptions = _crmEnumCatalog
                .GetGastoTypeMap()
                .Select(x => new { value = x.Key, text = x.Value })
                .OrderBy(x => int.TryParse(x.value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var code) ? code : int.MaxValue)
                .ToList();
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

            ViewBag.TicketFileId = safeFileId;
            ViewBag.GastoTypeOptions = _crmEnumCatalog
                .GetGastoTypeMap()
                .Select(x => new { value = x.Key, text = x.Value })
                .OrderBy(x => int.TryParse(x.value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var code) ? code : int.MaxValue)
                .ToList();
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
        public async Task<IActionResult> TicketLineDetail(string fileId, string lineRecId, string mode = "", string origin = "", string sheetId = "")
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            var safeFileId = (fileId ?? string.Empty).Trim();
            var safeLineRecId = (lineRecId ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(safeFileId) || string.IsNullOrWhiteSpace(safeLineRecId))
                return RedirectToAction(nameof(Tickets));

            await LoadEnvironmentInfoAsync();

            ViewBag.TicketFileId = safeFileId;
            ViewBag.TicketLineRecId = safeLineRecId;
            var normalizedOrigin = (origin ?? string.Empty).Trim().ToLowerInvariant();
            var backQuery = new List<string>
            {
                $"fileId={Uri.EscapeDataString(safeFileId)}"
            };
            if (!string.IsNullOrWhiteSpace(mode))
                backQuery.Add($"mode={Uri.EscapeDataString(mode.Trim())}");
            if (!string.IsNullOrWhiteSpace(normalizedOrigin))
                backQuery.Add($"origin={Uri.EscapeDataString(normalizedOrigin)}");
            if (!string.IsNullOrWhiteSpace(sheetId))
                backQuery.Add($"sheetId={Uri.EscapeDataString(sheetId.Trim())}");
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
            return View("~/Web/Views/Gastos/ExpenseSheetDetail.cshtml");
        }

        // Shows the expense sheet line detail page.
        [HttpGet]
        public async Task<IActionResult> ExpenseSheetLineDetail(string hojaGastosId, string lineRecId, string mode = "")
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            var isCreateMode = string.Equals(mode, "create", StringComparison.OrdinalIgnoreCase);
            if (string.IsNullOrWhiteSpace(hojaGastosId))
                return RedirectToAction(nameof(ExpenseSheets));

            if (!isCreateMode && string.IsNullOrWhiteSpace(lineRecId))
                return RedirectToAction(nameof(ExpenseSheets));

            await LoadEnvironmentInfoAsync();

            var safeSheetId = hojaGastosId.Trim();
            ViewBag.HojaGastosId = safeSheetId;
            ViewBag.LineRecId = (lineRecId ?? string.Empty).Trim();
            ViewBag.ExpenseSheetLineMode = isCreateMode ? "create" : "view";
            ViewBag.GastoTypeOptions = _crmEnumCatalog
                .GetGastoTypeMap()
                .Select(x => new { value = x.Key, text = x.Value })
                .OrderBy(x => int.TryParse(x.value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var code) ? code : int.MaxValue)
                .ToList();
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
                ExpenseSheetStatus = req.ExpenseSheetStatus is >= 0 and <= 4 ? req.ExpenseSheetStatus : null,
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
                        ExpenseSheetStatus = req.ListRequest.ExpenseSheetStatus is >= 0 and <= 4 ? req.ListRequest.ExpenseSheetStatus : null,
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
                var transport = await _apiClient.AskExpenseSheetsAsync(
                    token,
                    request,
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

        // API route used by React clients for /api/crm/expensesheets/currencies.
        [HttpGet]
        public async Task<IActionResult> ApiExpenseSheetsCurrencies()
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            try
            {
                var result = await _apiClient.GetExpenseSheetCurrenciesAsync(token);
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

            try
            {
                var result = await _apiClient.GetExpenseSheetSubordinatesAsync(token);
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
                    return CreateApiPagedError(StatusCodes.Status404NotFound, _sr["ExpenseSheets_NotFound"].Value);
                var detailItem = ToExpenseSheetApiDetailItem(sheet);

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
            if (string.IsNullOrWhiteSpace(normalizedCurrency))
                normalizedCurrency = "EUR";

            var normalizedExchRate = req.ExchRate > 0 ? req.ExchRate : 1m;
            var normalizedDescription = (req.Description ?? string.Empty).Trim();
            var normalizedLines = (req.Lines ?? new List<ExpenseSheetLineRequest>())
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
                Lines = normalizedLines
            };

            // Mode 1 creates only header so lines must be empty.
            if (normalizedMode == 1)
            {
                request.Lines = new List<ExpenseSheetLineRequest>();
            }
            else if (hasInvalidLines)
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
                request.CurrencyCode = string.Empty;
                request.ExchRate = 0m;
                request.ProjId = null;
            }

            var actingUser = await ResolveExpenseActingUserForCommandAsync(token, nameof(ApiExpenseSheetsCreate));
            if (actingUser.Error != null)
                return actingUser.Error;
            var requestAxUserId = actingUser.AxUserId;
            if (normalizedMode == 2 && !string.IsNullOrWhiteSpace(normalizedExistingSheetId))
            {
                var mutationGuard = await ValidateExpenseSheetMutationAsync(
                    token,
                    normalizedExistingSheetId,
                    requestAxUserId,
                    nameof(ApiExpenseSheetsCreate),
                    ExpenseSheetMutationType.LineMutation);
                if (!mutationGuard.Allowed)
                    return CreateApiCommandError(mutationGuard.StatusCode, mutationGuard.Message, mutationGuard.ErrorCode);
            }

            try
            {
                var response = await _apiClient.CreateExpenseSheetAsync(token, request, requestAxUserId);
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
            if (string.IsNullOrWhiteSpace(safeSheetId) || req == null)
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            var normalizedCurrency = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant() ?? string.Empty;
            if (!string.Equals(normalizedCurrency, "EUR", StringComparison.OrdinalIgnoreCase) && req.ExchRate <= 0)
            {
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["ExpenseSheets_Validation_ExchangeRateRequired"].Value,
                    "VALIDATION_ERROR");
            }

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
                ExchRate = req.ExchRate,
                ProjId = NormalizeOptionalText(req.ProjId),
                Voucher = normalizedVoucher,
                ExpenseSheetStatus = normalizedExpenseSheetStatus,
                ExchangeRateMode = normalizedExchangeRateMode,
                EstadoComentarios = normalizedEstadoComentarios
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

            try
            {
                var response = await _apiClient.UpdateExpenseSheetHeaderAsync(token, safeSheetId, request, requestAxUserId);
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
            if (string.IsNullOrWhiteSpace(normalizedDate) || req.TypeValue <= 0 || req.Qty <= 0 || req.Price <= 0)
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
                .Select(line => new ExpenseSheetTicketLineRequest
                {
                    Description = (line.Description ?? string.Empty).Trim(),
                    Qty = line.Qty,
                    Price = line.Price,
                    TotalAmount = line.TotalAmount.HasValue && line.TotalAmount.Value > 0
                        ? line.TotalAmount.Value
                        : null
                })
                .ToList();

            var hasInvalidLines = normalizedLines.Any(line =>
                string.IsNullOrWhiteSpace(line.Description) ||
                line.Qty <= 0 ||
                line.Price <= 0);

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
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
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
                var response = await _apiClient.CreateExpenseSheetTicketAsync(token, request, requestAxUserId);
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
                ProjectId = NormalizeOptionalText(projectId)
            };

            try
            {
                using var stream = ticketImage.OpenReadStream();
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
                _logger.LogError(ex, "Upstream API error in ApiExpenseSheetTicketQuickCreate");
                return CreateApiCommandError(
                    StatusCodes.Status502BadGateway,
                    _sr["Api_RequestFailed"].Value,
                    "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiExpenseSheetTicketQuickCreate");
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
                var items = result.GetAnyItems()
                    .Select(ToExpenseSheetTicketApiListItem)
                    .ToList();
                var responsePage = result.Page > 0 ? result.Page : page;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : pageSize;

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
                var items = result.GetAnyItems()
                    .Select(ToExpenseSheetTicketLinkApiListItem)
                    .ToList();
                var responsePage = result.Page > 0 ? result.Page : page;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : pageSize;

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
                var response = await _apiClient.LinkExpenseSheetTicketsBulkAsync(token, request, requestAxUserId, HttpContext.RequestAborted);
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
            var requestAxUserId = actingUser.AxUserId;

            try
            {
                var result = await _apiClient.GetExpenseSheetTicketDetailAsync(token, safeFileId, requestAxUserId);
                var ticket = SelectTicket(result.GetAnyItems(), safeFileId);
                if (ticket == null)
                    return CreateApiPagedError(StatusCodes.Status404NotFound, _sr["Tickets_Detail_NotFound"].Value);
                var ticketItem = ticket;

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
                Status = req.Status is >= 0 ? req.Status : null,
                TransDate = NormalizeTicketTransDate(req.TransDate) ?? NormalizeOptionalText(req.TransDate),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
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
                var response = await _apiClient.UpdateExpenseSheetTicketAsync(token, safeFileId, request);
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
                TotalAmount = req.TotalAmount.HasValue && req.TotalAmount.Value > 0
                    ? req.TotalAmount.Value
                    : null
            };

            if (string.IsNullOrWhiteSpace(request.Description) || request.Qty <= 0 || request.Price <= 0)
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
                TotalAmount = req.TotalAmount.HasValue && req.TotalAmount.Value > 0
                    ? req.TotalAmount.Value
                    : null
            };

            if (string.IsNullOrWhiteSpace(request.Description) || request.Qty <= 0 || request.Price <= 0)
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
                if (string.IsNullOrWhiteSpace(normalizedCurrency))
                    normalizedCurrency = "EUR";

                var normalizedExchRate = req.ExchRate > 0 ? req.ExchRate : 1m;
                var normalizedDescription = (req.Description ?? string.Empty).Trim();
                var normalizedLines = (req.Lines ?? new List<ExpenseSheetLineRequest>())
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
                    Lines = normalizedLines
                };

                // Mode 1 creates only header so lines must be empty.
                if (normalizedMode == 1)
                {
                    request.Lines = new List<ExpenseSheetLineRequest>();
                }
                else if (hasInvalidLines)
                {
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });
                }

                // Mode 2 adds lines to existing header and does not need header fields.
                if (normalizedMode == 2)
                {
                    request.Description = string.Empty;
                    request.CurrencyCode = string.Empty;
                    request.ExchRate = 0m;
                    request.ProjId = null;
                }

                var actingUser = await ResolveExpenseActingUserForJsonAsync(token, nameof(CreateExpenseSheet));
                if (actingUser.Error != null)
                    return actingUser.Error;
                var requestAxUserId = actingUser.AxUserId;
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

                if (string.IsNullOrWhiteSpace(hojaGastosId) || req == null)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var normalizedCurrency = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant() ?? string.Empty;
                if (!string.Equals(normalizedCurrency, "EUR", StringComparison.OrdinalIgnoreCase) && req.ExchRate <= 0)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = _sr["ExpenseSheets_Validation_ExchangeRateRequired"].Value
                    });
                }

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
                    ExchRate = req.ExchRate,
                    ProjId = NormalizeOptionalText(req.ProjId),
                    Voucher = normalizedVoucher,
                    ExpenseSheetStatus = normalizedExpenseSheetStatus,
                    ExchangeRateMode = normalizedExchangeRateMode,
                    EstadoComentarios = normalizedEstadoComentarios
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
                var response = await _apiClient.UpdateExpenseSheetHeaderAsync(token, hojaGastosId.Trim(), request, requestAxUserId);

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
                if (string.IsNullOrWhiteSpace(normalizedDate) || req.TypeValue <= 0 || req.Qty <= 0 || req.Price <= 0)
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

        // Returns projects for optional list filter assistance.
        [HttpGet]
        public async Task<IActionResult> GetProjectsForDropdown(string term = "", int page = 1, int pageSize = 30)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { message = _sr["Api_SessionExpired"].Value });

            var safePage = page < 1 ? 1 : page;
            var safePageSize = pageSize <= 0 ? 30 : pageSize;

            try
            {
                var result = await _apiClient.GetProjectsAsync(token, term ?? string.Empty, safePage, safePageSize);
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
                var sheet = SelectSheet(result.GetAnyItems(), safeSheetId);
                if (sheet == null)
                {
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
                OwnerUserId = NormalizeOptionalText(GetExtraString(sheet.Extra, "userId", "axUserId", "usuario")) ?? string.Empty,
                StatusCode = GetExtraInt(sheet.Extra, "expenseSheetStatus", "status", "estado"),
                Description = NormalizeOptionalText(GetExtraString(sheet.Extra, "description", "descripcion", "desc")) ?? string.Empty,
                CurrencyCode = (NormalizeOptionalText(GetExtraString(sheet.Extra, "currencyCode", "currency", "divisa")) ?? string.Empty).ToUpperInvariant(),
                ExchangeRate = GetExtraDecimal(sheet.Extra, "exchRate", "exchangeRate", "tipoCambio") ?? 0m,
                ProjectId = NormalizeOptionalText(GetExtraString(sheet.Extra, "projId", "projectId", "proyectoId", "project")),
                Voucher = NormalizeOptionalText(GetExtraString(sheet.Extra, "voucher")),
                ExchangeRateMode = GetExtraInt(sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                StatusComment = NormalizeOptionalText(GetExtraString(sheet.Extra, "estadoComentarios")),
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
            var hasHeaderFieldChanges = HasExpenseSheetHeaderFieldChanges(snapshot, request);
            var currentStatus = snapshot.StatusCode;
            var requestedStatus = request.ExpenseSheetStatus ?? currentStatus;
            var requestedStatusChanged = requestedStatus != currentStatus;

            if (policy.InteractionMode == ExpenseSheetInteractionMode.ReadOnly)
            {
                return BuildExpenseSheetReadOnlyGuard(snapshot, policy);
            }

            if (policy.InteractionMode == ExpenseSheetInteractionMode.CommentOnlyEdit &&
                hasHeaderFieldChanges)
            {
                return BuildExpenseSheetReadOnlyGuard(snapshot, policy);
            }

            if (policy.InteractionMode == ExpenseSheetInteractionMode.StatusActionOnly &&
                (hasHeaderFieldChanges || !requestedStatusChanged))
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

        // Detects any non-comment header mutation so comment-only mode can stay locked down.
        private static bool HasExpenseSheetHeaderFieldChanges(ExpenseSheetSnapshot snapshot, ExpenseSheetUpdateRequest request)
        {
            if (!string.Equals((request.Description ?? string.Empty).Trim(), snapshot.Description, StringComparison.Ordinal))
                return true;

            if (!string.Equals((NormalizeOptionalText(request.CurrencyCode) ?? string.Empty).ToUpperInvariant(), snapshot.CurrencyCode, StringComparison.OrdinalIgnoreCase))
                return true;

            if (!AreExpenseDecimalsEquivalent(request.ExchRate, snapshot.ExchangeRate))
                return true;

            if (!string.Equals(NormalizeOptionalText(request.ProjId) ?? string.Empty, snapshot.ProjectId ?? string.Empty, StringComparison.OrdinalIgnoreCase))
                return true;

            if (!string.Equals(NormalizeOptionalText(request.Voucher) ?? string.Empty, snapshot.Voucher ?? string.Empty, StringComparison.OrdinalIgnoreCase))
                return true;

            if (NormalizeExpenseNullableInt(request.ExchangeRateMode) != NormalizeExpenseNullableInt(snapshot.ExchangeRateMode))
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
                ExpenseSheetStatus = req.ExpenseSheetStatus is >= 0 and <= 4 ? req.ExpenseSheetStatus : null,
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

        // Validates optional ticket gasto type values against the fixed enum set.
        private static bool IsValidTicketGastoType(int? gastoType)
        {
            return !gastoType.HasValue || AllowedTicketGastoTypes.Contains(gastoType.Value);
        }

        // Normalizes optional ticket gasto type values before proxying upstream.
        private static int? NormalizeTicketGastoType(int? gastoType)
        {
            return IsValidTicketGastoType(gastoType) ? gastoType : null;
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

            return AllowedTicketGastoTypes.Contains(parsed);
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

        // Reuses the subordinate scope lookup within one request to avoid duplicate upstream calls.
        private async Task<IReadOnlyList<ExpenseSheetSubordinateDto>> GetExpenseSheetSubordinatesForScopeAsync(string token)
        {
            if (HttpContext?.Items != null &&
                HttpContext.Items.TryGetValue(ExpenseSubordinatesScopeCacheKey, out var cachedItems) &&
                cachedItems is IReadOnlyList<ExpenseSheetSubordinateDto> cachedList)
            {
                return cachedList;
            }

            var result = await _apiClient.GetExpenseSheetSubordinatesAsync(token);
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
                var isAllowed = items.Any(item => MatchesExpenseSubordinateUserId(item, normalizedOverride));

                if (isAllowed)
                {
                    return new ExpenseActingUserGuardResult
                    {
                        Allowed = true,
                        StatusCode = StatusCodes.Status200OK,
                        AxUserId = normalizedOverride
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

        // Treats voucher assignment or paid status code as immutable paid state.
        private static bool IsPaidExpenseSheet(ExpenseSheetDetailDto sheet)
        {
            var statusCode = GetExtraInt(sheet.Extra, "expenseSheetStatus", "status", "estado");
            if (statusCode == ExpenseSheetStatusPaid)
                return true;

            return HasAssignedVoucher(GetExtraString(sheet.Extra, "voucher"));
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

        // Maps a list item to a card payload for the list screen.
        private static object ToExpenseSheetCard(ExpenseSheetDetailDto sheet)
        {
            return new
            {
                hojaGastosId = sheet.HojaGastosId ?? string.Empty,
                description = GetExtraString(sheet.Extra, "description", "descripcion", "desc"),
                expenseSheetStatus = GetExtraInt(sheet.Extra, "expenseSheetStatus", "status", "estado"),
                estadoComentarios = GetExtraString(sheet.Extra, "estadoComentarios"),
                userId = GetExtraString(sheet.Extra, "userId", "axUserId", "usuario"),
                userName = GetExtraString(sheet.Extra, "userName", "name", "userDisplayName", "nombreUsuario"),
                voucher = GetExtraString(sheet.Extra, "voucher"),
                projId = GetExtraString(sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                currencyCode = GetExtraString(sheet.Extra, "currencyCode", "currency", "divisa"),
                totalAmount = GetExtraDecimal(sheet.Extra, "totalAmount", "totalAmountMST", "totalamountmst"),
                totalAmountMST = GetExtraDecimal(sheet.Extra, "totalAmountMST", "totalamountmst"),
                exchRate = GetExtraDecimal(sheet.Extra, "exchRate", "exchangeRate", "tipoCambio"),
                exchangeRateMode = GetExtraInt(sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                createdDate = NormalizeDate(GetExtraString(sheet.Extra, "createdDate", "creationDate", "transDate", "fechaCreacion"))
            };
        }

        // Maps a list item to API contract fields expected by /api/crm/expensesheets/list.
        private static object ToExpenseSheetApiListItem(ExpenseSheetDetailDto sheet)
        {
            return new
            {
                HojaGastosId = sheet.HojaGastosId ?? string.Empty,
                Description = GetExtraString(sheet.Extra, "description", "descripcion", "desc"),
                ExpenseSheetStatus = GetExtraInt(sheet.Extra, "expenseSheetStatus", "status", "estado"),
                EstadoComentarios = GetExtraString(sheet.Extra, "estadoComentarios"),
                UserId = GetExtraString(sheet.Extra, "userId", "axUserId", "usuario"),
                UserName = GetExtraString(sheet.Extra, "userName", "name", "userDisplayName", "nombreUsuario"),
                Voucher = GetExtraString(sheet.Extra, "voucher"),
                ProjId = GetExtraString(sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                CurrencyCode = GetExtraString(sheet.Extra, "currencyCode", "currency", "divisa"),
                TotalAmount = GetExtraDecimal(sheet.Extra, "totalAmount", "totalAmountMST", "totalamountmst"),
                ExchRate = GetExtraDecimal(sheet.Extra, "exchRate", "exchangeRate", "tipoCambio"),
                ExchangeRateMode = GetExtraInt(sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                CreatedDate = NormalizeDate(GetExtraString(sheet.Extra, "createdDate", "creationDate", "transDate", "fechaCreacion"))
            };
        }

        // Maps one detail item to API contract fields expected by /api/crm/expensesheets/{hojaGastosId}.
        private static object ToExpenseSheetApiDetailItem(ExpenseSheetDetailDto sheet)
        {
            return new
            {
                HojaGastosId = sheet.HojaGastosId ?? string.Empty,
                Description = GetExtraString(sheet.Extra, "description", "descripcion", "desc"),
                UserId = GetExtraString(sheet.Extra, "userId", "axUserId", "usuario"),
                ExpenseSheetStatus = GetExtraInt(sheet.Extra, "expenseSheetStatus", "status", "estado"),
                EstadoComentarios = GetExtraString(sheet.Extra, "estadoComentarios"),
                CurrencyCode = GetExtraString(sheet.Extra, "currencyCode", "currency", "divisa"),
                TotalAmount = GetExtraDecimal(sheet.Extra, "totalAmount", "totalAmountMST", "totalamountmst"),
                ExchRate = GetExtraString(sheet.Extra, "exchRate", "exchangeRate", "tipoCambio"),
                ExchangeRateMode = GetExtraInt(sheet.Extra, "exchangeRateMode", "tipoCambioModo"),
                ProjId = GetExtraString(sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                Voucher = GetExtraString(sheet.Extra, "voucher"),
                CreatedDate = NormalizeDate(GetExtraString(sheet.Extra, "createdDate", "creationDate", "transDate", "fechaCreacion")),
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

            return new
            {
                RecId = ResolveLineRecId(line),
                TransDate = NormalizeDate(!string.IsNullOrWhiteSpace(line.TransDate) ? line.TransDate : GetExtraString(line.Extra, "transDate", "fecha")),
                TypeValue = NormalizeEnumCode(typeValueRaw),
                Description = !string.IsNullOrWhiteSpace(line.Description) ? line.Description : GetExtraString(line.Extra, "description", "descripcion"),
                Internacional = line.Internacional ?? GetExtraBool(line.Extra, "internacional", "international"),
                FileId = fileId ?? string.Empty,
                Ticket = GetExtraBool(line.Extra, "ticket"),
                Price = line.Price ?? GetExtraDecimal(line.Extra, "price", "precio"),
                Qty = line.Qty ?? GetExtraDecimal(line.Extra, "qty", "cantidad"),
                Amount = line.Amount ?? GetExtraDecimal(line.Extra, "amount", "importe"),
                ProjId = !string.IsNullOrWhiteSpace(line.ProjId) ? line.ProjId : GetExtraString(line.Extra, "projId", "projectId", "proyectoId"),
                IndAttachFiles = GetExtraString(line.Extra, "indAttachFiles", "attachFiles", "attachments")
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
            return new
            {
                FileId = item.FileId ?? string.Empty,
                Description = item.Description ?? string.Empty,
                Status = item.Status,
                ProcessedByAI = item.ProcessedByAI,
                CurrencyCode = item.CurrencyCode ?? string.Empty,
                TotalAmount = item.TotalAmount,
                TransDate = NormalizeDate(item.TransDate),
                FileName = item.FileName ?? string.Empty,
                GastoType = NormalizeTicketGastoType(item.GastoType)
            };
        }

        // Maps one link-mode ticket list item to API contract fields expected by /api/crm/expensesheets/tickets/link/list.
        private static object ToExpenseSheetTicketLinkApiListItem(ExpenseSheetTicketLinkListItemDto item)
        {
            return new
            {
                FileId = item.FileId ?? string.Empty,
                Description = item.Description ?? string.Empty,
                ProcessedByAI = item.ProcessedByAI,
                CurrencyCode = item.CurrencyCode ?? string.Empty,
                TotalAmount = item.TotalAmount,
                TransDate = NormalizeDate(item.TransDate),
                FileName = item.FileName ?? string.Empty,
                GastoType = NormalizeTicketGastoType(item.GastoType)
            };
        }

        // Maps one ticket detail item to API contract fields expected by /api/crm/expensesheets/tickets/{fileId}.
        private static object ToExpenseSheetTicketApiDetailItem(ExpenseSheetTicketDetailDto item)
        {
            return new
            {
                FileId = item.FileId ?? string.Empty,
                Description = item.Description ?? string.Empty,
                Status = item.Status,
                HojaGastosIdDisplay = item.HojaGastosIdDisplay ?? string.Empty,
                ProcessedByAI = item.ProcessedByAI,
                CurrencyCode = item.CurrencyCode ?? string.Empty,
                TotalAmount = item.TotalAmount,
                CreatedByUserId = item.CreatedByUserId ?? string.Empty,
                TransDate = NormalizeDate(item.TransDate),
                Comentario = item.Comentario ?? string.Empty,
                UrlFile = item.UrlFile ?? string.Empty,
                FileName = item.FileName ?? string.Empty,
                GastoType = NormalizeTicketGastoType(item.GastoType),
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
                CreatedByUserId = line.CreatedByUserId ?? string.Empty
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
            return new
            {
                hojaGastosId = sheet.HojaGastosId ?? string.Empty,
                description = GetExtraString(sheet.Extra, "description", "descripcion", "desc"),
                userId = GetExtraString(sheet.Extra, "userId"),
                estadoComentarios = GetExtraString(sheet.Extra, "estadoComentarios"),
                currencyCode = GetExtraString(sheet.Extra, "currencyCode", "currency", "divisa"),
                totalAmountMST = GetExtraDecimal(sheet.Extra, "totalAmountMST", "totalamountmst"),
                exchRate = GetExtraString(sheet.Extra, "exchRate", "exchangeRate", "tipoCambio"),
                projId = GetExtraString(sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                voucher = GetExtraString(sheet.Extra, "voucher")
            };
        }

        // Maps one line to a detail payload used by detail and line screens.
        // Resolves typeValue text from fixed gasto type enums and preserves typeValueCode.
        private object ToExpenseSheetLine(ExpenseSheetLineDto line)
        {
            var rawTypeValue = line.TypeValue.HasValue
                ? line.TypeValue.Value.ToString(CultureInfo.InvariantCulture)
                : GetExtraString(line.Extra, "typeValue", "tipo", "gastoType");
            var typeValueCode = NormalizeEnumCode(rawTypeValue);
            var typeValueLabel = _crmEnumCatalog.GetGastoTypeLabel(typeValueCode);
            var fileId = NormalizeOptionalText(line.FileId)
                         ?? NormalizeOptionalText(GetExtraString(line.Extra, "fileId", "FileId"));

            return new
            {
                lineRecId = ResolveLineRecId(line),
                transDate = NormalizeDate(!string.IsNullOrWhiteSpace(line.TransDate) ? line.TransDate : GetExtraString(line.Extra, "transDate", "fecha")),
                typeValue = string.IsNullOrWhiteSpace(typeValueLabel) ? typeValueCode : typeValueLabel,
                typeValueCode = typeValueCode,
                description = !string.IsNullOrWhiteSpace(line.Description) ? line.Description : GetExtraString(line.Extra, "description", "descripcion"),
                internacional = line.Internacional ?? GetExtraBool(line.Extra, "internacional", "international"),
                fileId = fileId ?? string.Empty,
                ticket = GetExtraBool(line.Extra, "ticket"),
                price = line.Price ?? GetExtraDecimal(line.Extra, "price", "precio"),
                qty = line.Qty ?? GetExtraDecimal(line.Extra, "qty", "cantidad"),
                amount = line.Amount ?? GetExtraDecimal(line.Extra, "amount", "importe"),
                projId = !string.IsNullOrWhiteSpace(line.ProjId) ? line.ProjId : GetExtraString(line.Extra, "projId", "projectId", "proyectoId"),
                indAttachFiles = GetExtraString(line.Extra, "indAttachFiles", "attachFiles", "attachments")
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

        // Maps a project dto to simple option values.
        private static (string Value, string Text) ToProjectOption(ProjectDto dto)
        {
            var value = GetExtraString(dto.Extra, "projId", "projectId", "projectCode", "code", "id");
            var text = GetExtraString(dto.Extra, "name", "projectName", "projName", "description", "text");

            if (string.IsNullOrWhiteSpace(text))
                text = value;

            return (value, text);
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
