using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Models.CRM;
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
using System.Text.Json;

namespace IND_CRM_APP.Controllers
{
    // Controller for expense sheet pages and read endpoints.
    public class GastosController : BaseMvcController
    {
        private readonly ILogger<GastosController> _logger;
        private readonly ICrmEnumCatalog _crmEnumCatalog;
        private readonly ITicketBlobPreviewService _ticketBlobPreviewService;
        private readonly IStringLocalizer<INDSharedResource> _sr;
        private static readonly HashSet<int> AllowedTicketGastoTypes = new() { 0, 1, 2, 3, 4, 5, 6, 7, 8, 14 };
        private static readonly HashSet<string> AllowedTicketImageContentTypes = new(StringComparer.OrdinalIgnoreCase)
        {
            "image/jpeg",
            "image/jpg",
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
            IStringLocalizer<INDSharedResource> sr) : base(apiClient, tokenSession)
        {
            _logger = logger;
            _crmEnumCatalog = crmEnumCatalog;
            _ticketBlobPreviewService = ticketBlobPreviewService;
            _sr = sr;
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
        public async Task<IActionResult> Tickets()
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return RedirectToAction("Login", "Auth");

            await LoadEnvironmentInfoAsync();

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
            else if (normalizedOrigin == "sheet-create")
            {
                ViewData["TopbarBackUrl"] = $"/Gastos/Tickets?ticketFileId={Uri.EscapeDataString(safeFileId)}";
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

            try
            {
                var result = await _apiClient.GetExpenseSheetsAsync(token, listRequest);
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
        [IgnoreAntiforgeryToken]
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
                Page = page,
                PageSize = pageSize
            };

            try
            {
                var result = await _apiClient.GetExpenseSheetsAsync(token, payload);
                var items = result.GetAnyItems()
                    .Select(ToExpenseSheetApiListItem)
                    .ToList();
                var responsePage = result.Page > 0 ? result.Page : page;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : pageSize;

                if (!result.Success && items.Count == 0)
                {
                    _logger.LogWarning(
                        "ApiExpenseSheetsList upstream returned non-success. Message={Message} TraceId={TraceId} page={Page} pageSize={PageSize} billedMode={BilledMode} createdDateFrom={CreatedDateFrom} createdDateTo={CreatedDateTo} projId={ProjId} currencyCode={CurrencyCode} expenseSheetStatus={ExpenseSheetStatus}",
                        result.Message ?? string.Empty,
                        result.TraceId ?? string.Empty,
                        page,
                        pageSize,
                        payload.BilledMode.HasValue ? payload.BilledMode.Value.ToString(CultureInfo.InvariantCulture) : "null",
                        payload.CreatedDateFrom ?? string.Empty,
                        payload.CreatedDateTo ?? string.Empty,
                        payload.ProjId ?? string.Empty,
                        payload.CurrencyCode ?? string.Empty,
                        payload.ExpenseSheetStatus.HasValue ? payload.ExpenseSheetStatus.Value.ToString(CultureInfo.InvariantCulture) : "null");
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
                    .Where(x => !string.IsNullOrWhiteSpace(x.UserId))
                    .GroupBy(x => x.UserId, StringComparer.OrdinalIgnoreCase)
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
        [IgnoreAntiforgeryToken]
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
                using var stream = ticketImage.OpenReadStream();
                var response = await _apiClient.ExpenseFromTicketAsync(
                    token,
                    stream,
                    safeTicketFileName,
                    ticketImage.ContentType,
                    persistValue,
                    NormalizeOptionalText(ticketUrlFile),
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

            try
            {
                var result = await _apiClient.GetExpenseSheetDetailAsync(token, safeSheetId);
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
        [IgnoreAntiforgeryToken]
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

            try
            {
                var response = await _apiClient.CreateExpenseSheetAsync(token, request);
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
        [IgnoreAntiforgeryToken]
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
            var normalizedEstadoComentarios = NormalizeOptionalText(req.EstadoComentarios);

            var request = new ExpenseSheetUpdateRequest
            {
                Description = (req.Description ?? string.Empty).Trim(),
                CurrencyCode = normalizedCurrency,
                ExchRate = req.ExchRate,
                ProjId = NormalizeOptionalText(req.ProjId),
                ExpenseSheetStatus = normalizedExpenseSheetStatus,
                ExchangeRateMode = normalizedExchangeRateMode,
                EstadoComentarios = normalizedEstadoComentarios
            };

            try
            {
                var response = await _apiClient.UpdateExpenseSheetHeaderAsync(token, safeSheetId, request);
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
        [IgnoreAntiforgeryToken]
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

            try
            {
                var response = await _apiClient.UpdateExpenseSheetLineAsync(
                    token,
                    safeSheetId,
                    safeLineId,
                    request);
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

            try
            {
                var response = await _apiClient.DeleteExpenseSheetLineAsync(
                    token,
                    safeSheetId,
                    safeLineId,
                    resolvedDeleteWholeSheet,
                    resolvedDeleteMode);
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

        // API route used by React clients for /api/crm/expensesheets/tickets.
        [HttpPost]
        [IgnoreAntiforgeryToken]
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
                TransDate = NormalizeListDateFilter(req.TransDate) ?? NormalizeOptionalText(req.TransDate),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
                FileName = NormalizeOptionalText(req.FileName),
                FileExtension = NormalizeOptionalText(req.FileExtension),
                ProcessedByAI = req.ProcessedByAI,
                GastoType = NormalizeTicketGastoType(req.GastoType),
                Lines = normalizedLines.Count > 0 ? normalizedLines : null
            };

            try
            {
                var response = await _apiClient.CreateExpenseSheetTicketAsync(token, request);
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

        // API route used by React clients for /api/crm/expensesheets/tickets/list.
        [HttpPost]
        [IgnoreAntiforgeryToken]
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

            try
            {
                var result = await _apiClient.GetExpenseSheetTicketsAsync(token, request);
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

            try
            {
                var result = await _apiClient.GetExpenseSheetTicketDetailAsync(token, safeFileId);
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
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> ApiExpenseSheetTicketPreview([FromBody] ExpenseSheetTicketPreviewRequest req)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiCommandError(
                    StatusCodes.Status401Unauthorized,
                    _sr["Api_SessionExpired"].Value,
                    "SESSION_EXPIRED");

            var safeUrl = NormalizeOptionalText(req?.UrlFile);
            if (string.IsNullOrWhiteSpace(safeUrl))
                return CreateApiCommandError(
                    StatusCodes.Status400BadRequest,
                    _sr["Api_RequestFailed"].Value,
                    "INVALID_REQUEST");

            try
            {
                var preview = await _ticketBlobPreviewService.DownloadAsync(safeUrl, HttpContext.RequestAborted);
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
        [IgnoreAntiforgeryToken]
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
                TransDate = NormalizeListDateFilter(req.TransDate) ?? NormalizeOptionalText(req.TransDate),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
                FileName = NormalizeOptionalText(req.FileName),
                ProcessedByAI = req.ProcessedByAI,
                FileExtension = NormalizeOptionalText(req.FileExtension),
                GastoType = NormalizeTicketGastoType(req.GastoType)
            };

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
        [IgnoreAntiforgeryToken]
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

            try
            {
                var response = await _apiClient.UpdateExpenseSheetTicketFromIAAsync(token, safeFileId, req);
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
        [IgnoreAntiforgeryToken]
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
        [IgnoreAntiforgeryToken]
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
        [IgnoreAntiforgeryToken]
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

                var response = await _apiClient.CreateExpenseSheetAsync(token, request);

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
                var normalizedEstadoComentarios = NormalizeOptionalText(req.EstadoComentarios);

                var request = new ExpenseSheetUpdateRequest
                {
                    Description = (req.Description ?? string.Empty).Trim(),
                    CurrencyCode = normalizedCurrency,
                    ExchRate = req.ExchRate,
                    ProjId = NormalizeOptionalText(req.ProjId),
                    ExpenseSheetStatus = normalizedExpenseSheetStatus,
                    ExchangeRateMode = normalizedExchangeRateMode,
                    EstadoComentarios = normalizedEstadoComentarios
                };

                var response = await _apiClient.UpdateExpenseSheetHeaderAsync(token, hojaGastosId.Trim(), request);

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

                var response = await _apiClient.UpdateExpenseSheetLineAsync(
                    token,
                    hojaGastosId.Trim(),
                    lineRecId.Trim(),
                    request);

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

                var response = await _apiClient.DeleteExpenseSheetLineAsync(
                    token,
                    hojaGastosId.Trim(),
                    lineRecId.Trim(),
                    deleteWholeSheet: false,
                    deleteMode: 0);

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

                var response = await _apiClient.DeleteExpenseSheetLineAsync(
                    token,
                    hojaGastosId.Trim(),
                    "0",
                    deleteWholeSheet: true,
                    deleteMode: 2);

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

        // Normalizes date filters to accepted API formats.
        // Accepts yyyyMMdd, yyyy-MM-dd, DDMMYYYY and DD.MM.YYYY in a culture-safe way.
        private static string? NormalizeListDateFilter(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            var value = raw.Trim();
            if (DateTime.TryParseExact(value, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                return value;

            if (DateTime.TryParseExact(value, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                return value;

            if (DateTime.TryParseExact(value, "ddMMyyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdMmYyyy))
                return parsedDdMmYyyy.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(value, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdDotMmDotYyyy))
                return parsedDdDotMmDotYyyy.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(value, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdDashMmDashYyyy))
                return parsedDdDashMmDashYyyy.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(value, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdSlashMmSlashYyyy))
                return parsedDdSlashMmSlashYyyy.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedInv))
                return parsedInv.ToString("yyyy-MM-dd");

            if (DateTime.TryParse(value, CultureInfo.CurrentCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedCur))
                return parsedCur.ToString("yyyy-MM-dd");

            return null;
        }

        // Normalizes line transDate values to yyyyMMdd for upstream update payloads.
        private static string NormalizeLineTransDate(string? raw)
        {
            var normalized = NormalizeListDateFilter(raw);
            if (string.IsNullOrWhiteSpace(normalized))
                return string.Empty;

            if (DateTime.TryParseExact(
                    normalized,
                    "yyyy-MM-dd",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out var parsed))
            {
                return parsed.ToString("yyyyMMdd", CultureInfo.InvariantCulture);
            }

            if (DateTime.TryParseExact(
                    normalized,
                    "yyyyMMdd",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out parsed))
            {
                return parsed.ToString("yyyyMMdd", CultureInfo.InvariantCulture);
            }

            return string.Empty;
        }

        // Returns a trimmed string or null for optional API fields.
        private static string? NormalizeOptionalText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
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

        // Maps a list item to a card payload for the list screen.
        private static object ToExpenseSheetCard(ExpenseSheetDetailDto sheet)
        {
            return new
            {
                hojaGastosId = sheet.HojaGastosId ?? string.Empty,
                description = GetExtraString(sheet.Extra, "description", "descripcion", "desc"),
                voucher = GetExtraString(sheet.Extra, "voucher"),
                projId = GetExtraString(sheet.Extra, "projId", "projectId", "proyectoId", "project"),
                currencyCode = GetExtraString(sheet.Extra, "currencyCode", "currency", "divisa"),
                totalAmountMST = GetExtraDecimal(sheet.Extra, "totalAmountMST", "totalamountmst"),
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
                HojaGastosIdDisplay = item.HojaGastosIdDisplay ?? string.Empty,
                ProcessedByAI = item.ProcessedByAI,
                CurrencyCode = item.CurrencyCode ?? string.Empty,
                TotalAmount = item.TotalAmount,
                CreatedByUserId = item.CreatedByUserId ?? string.Empty,
                TransDate = NormalizeDate(item.TransDate),
                UrlFile = item.UrlFile ?? string.Empty,
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
        private static ExpenseSheetSubordinateDto ToExpenseSheetSubordinateApiItem(ExpenseSheetSubordinateDto item)
        {
            var userId = NormalizeOptionalText(item.UserId)
                         ?? NormalizeOptionalText(GetExtraString(item.Extra, "userId", "UserId"));
            var name = NormalizeOptionalText(item.Name)
                       ?? NormalizeOptionalText(GetExtraString(item.Extra, "name", "Name"));

            return new ExpenseSheetSubordinateDto
            {
                UserId = userId ?? string.Empty,
                Name = name ?? string.Empty
            };
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

            var value = raw.Trim();
            if (DateTime.TryParseExact(value, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var exactYmdCompact))
                return exactYmdCompact.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(value, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var exactYmdDash))
                return exactYmdDash.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(value, "ddMMyyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var exactDdMmCompact))
                return exactDdMmCompact.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(value, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var exactDdMmDot))
                return exactDdMmDot.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(value, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var exactDdMmDash))
                return exactDdMmDash.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(value, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var exactDdMmSlash))
                return exactDdMmSlash.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

            if (DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedInv))
                return parsedInv.ToString("yyyy-MM-dd");

            if (DateTime.TryParse(value, CultureInfo.CurrentCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedCur))
                return parsedCur.ToString("yyyy-MM-dd");

            return value;
        }
    }
}
