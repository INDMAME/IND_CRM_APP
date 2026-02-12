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
        private readonly IStringLocalizer<INDSharedResource> _sr;

        public GastosController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            ILogger<GastosController> logger,
            ICrmEnumCatalog crmEnumCatalog,
            IStringLocalizer<INDSharedResource> sr) : base(apiClient, tokenSession)
        {
            _logger = logger;
            _crmEnumCatalog = crmEnumCatalog;
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
                var normalizedLines = req.Lines ?? new List<ExpenseSheetLineRequest>();

                var request = new ExpenseSheetCreateRequest
                {
                    Mode = normalizedMode,
                    ExistingHojaGastosId = normalizedExistingSheetId,
                    Description = normalizedDescription,
                    CurrencyCode = normalizedCurrency,
                    ExchRate = normalizedExchRate,
                    ProjId = NormalizeOptionalText(req.ProjId),
                    Lines = normalizedLines
                };

                // Mode 1 creates only header so lines must be empty.
                if (normalizedMode == 1)
                {
                    request.Lines = new List<ExpenseSheetLineRequest>();
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

                var request = new ExpenseSheetUpdateRequest
                {
                    Description = (req.Description ?? string.Empty).Trim(),
                    CurrencyCode = normalizedCurrency,
                    ExchRate = req.ExchRate,
                    ProjId = NormalizeOptionalText(req.ProjId)
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
                if (string.IsNullOrWhiteSpace(normalizedDate) || req.TypeValue <= 0)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var request = new ExpenseSheetLineRequest
                {
                    TransDate = normalizedDate,
                    TypeValue = req.TypeValue,
                    Description = (req.Description ?? string.Empty).Trim(),
                    Internacional = req.Internacional,
                    Ticket = req.Ticket,
                    Qty = req.Qty,
                    Amount = req.Amount,
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
                    deleteWholeSheet: false);

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
                    deleteWholeSheet: true);

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

        // Normalizes date filters to accepted API formats.
        private static string? NormalizeListDateFilter(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            var value = raw.Trim();
            if (DateTime.TryParseExact(value, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                return value;

            if (DateTime.TryParseExact(value, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                return value;

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

        // Maps one sheet to a detail header payload.
        private static object ToExpenseSheetHeader(ExpenseSheetDetailDto sheet)
        {
            return new
            {
                hojaGastosId = sheet.HojaGastosId ?? string.Empty,
                description = GetExtraString(sheet.Extra, "description", "descripcion", "desc"),
                userId = GetExtraString(sheet.Extra, "userId"),
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
            var rawTypeValue = GetExtraString(line.Extra, "typeValue", "tipo", "gastoType");
            var typeValueCode = NormalizeEnumCode(rawTypeValue);
            var typeValueLabel = _crmEnumCatalog.GetGastoTypeLabel(typeValueCode);

            return new
            {
                lineRecId = ResolveLineRecId(line),
                transDate = NormalizeDate(GetExtraString(line.Extra, "transDate", "fecha")),
                typeValue = string.IsNullOrWhiteSpace(typeValueLabel) ? typeValueCode : typeValueLabel,
                typeValueCode = typeValueCode,
                description = GetExtraString(line.Extra, "description", "descripcion"),
                internacional = GetExtraBool(line.Extra, "internacional", "international"),
                ticket = GetExtraBool(line.Extra, "ticket"),
                qty = GetExtraDecimal(line.Extra, "qty", "cantidad"),
                amount = GetExtraDecimal(line.Extra, "amount", "importe"),
                projId = GetExtraString(line.Extra, "projId", "projectId", "proyectoId"),
                indAttachFiles = GetExtraString(line.Extra, "indAttachFiles", "attachFiles", "attachments")
            };
        }

        // Resolves line record id from dto property or fallback extension keys.
        private static string ResolveLineRecId(ExpenseSheetLineDto line)
        {
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
        private static string NormalizeDate(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return string.Empty;

            var value = raw.Trim();
            if (DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedInv))
                return parsedInv.ToString("yyyy-MM-dd");

            if (DateTime.TryParse(value, CultureInfo.CurrentCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedCur))
                return parsedCur.ToString("yyyy-MM-dd");

            if (value.Length == 8 && long.TryParse(value, out _))
            {
                if (DateTime.TryParseExact(value, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var exact))
                    return exact.ToString("yyyy-MM-dd");
            }

            return value;
        }
    }
}
