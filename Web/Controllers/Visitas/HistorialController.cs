using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Infrastructure.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Localization;
using System.Globalization;
using System.Text.Json;

namespace IND_CRM_APP.Controllers
{
    // Controller for activity history
    public class HistorialController : BaseMvcController
    {
        private readonly ILogger<HistorialController> _logger;
        private readonly IStringLocalizer<INDSharedResource> _sr;
        private const string DataVisibilityAppCode = "CRM";
        private const string DataVisibilityVisitsModuleCode = "VISITAS_GESTION";

        public HistorialController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            ILogger<HistorialController> logger,
            IStringLocalizer<INDSharedResource> sr) : base(apiClient, tokenSession)
        {
            _logger = logger;
            _sr = sr;
        }

        // Shows main history view with default date range
        [HttpGet]
        public async Task<IActionResult> History()
        {
            var token = GetToken();
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            // Load environment and company using API client
            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = string.IsNullOrWhiteSpace(environment) ? "Unknown" : environment;
            ViewBag.Company = string.IsNullOrWhiteSpace(company) ? "N/A" : company;

            // Start first entry with the latest 90-day window so the page loads collapsed with data.
            var today = DateTime.Today;
            var fromDate = today.AddDays(-89);
            ViewBag.DefaultFromDate = fromDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            ViewBag.DefaultToDate = today.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            ViewBag.SelectedCompanyId = HttpContext.Session.GetString("INDCompanySelected") ?? string.Empty;
            ViewBag.CurrentAxUserId = GetCurrentSessionAxUserId() ?? string.Empty;
            ViewBag.PermissionsRevision = HttpContext.Session.GetString("INDPermissionsRevision") ?? string.Empty;

            return View("~/Web/Views/Visitas/History.cshtml");
        }

        // API route used by React clients for /api/crm/data-visibility/visible-users.
        [HttpGet]
        public async Task<IActionResult> ApiVisibleVisitUsers(
            string? appCode = DataVisibilityAppCode,
            string? moduleCode = DataVisibilityVisitsModuleCode,
            bool includeCrmUserId = true)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return CreateApiPagedError(StatusCodes.Status401Unauthorized, _sr["Api_SessionExpired"].Value);

            var normalizedAppCode = NormalizeOptionalText(appCode) ?? DataVisibilityAppCode;
            var normalizedModuleCode = NormalizeOptionalText(moduleCode) ?? DataVisibilityVisitsModuleCode;
            if (!string.Equals(normalizedAppCode, DataVisibilityAppCode, StringComparison.OrdinalIgnoreCase) ||
                !string.Equals(normalizedModuleCode, DataVisibilityVisitsModuleCode, StringComparison.OrdinalIgnoreCase))
            {
                return CreateApiPagedError(StatusCodes.Status400BadRequest, _sr["Api_RequestFailed"].Value);
            }

            try
            {
                var currentAxUserId = GetCurrentSessionAxUserId();
                var selectedCompanyId = HttpContext.Session.GetString("INDCompanySelected") ?? string.Empty;
                var permissionsRevision = HttpContext.Session.GetString("INDPermissionsRevision") ?? string.Empty;

                _logger.LogInformation(
                    "ApiVisibleVisitUsers request trace. SessionAxUser={SessionAxUser}; SelectedCompany={SelectedCompany}; PermissionsRevision={PermissionsRevision}; AppCode={AppCode}; ModuleCode={ModuleCode}",
                    currentAxUserId ?? string.Empty,
                    selectedCompanyId,
                    permissionsRevision,
                    normalizedAppCode,
                    normalizedModuleCode);

                var result = await _apiClient.GetVisibleUsersAsync(
                    token,
                    normalizedAppCode,
                    normalizedModuleCode,
                    includeCrmUserId);

                var items = result.GetAnyItems()
                    .Select(NormalizeVisibleUser)
                    .Where(x => !string.IsNullOrWhiteSpace(x.AxUserId))
                    .GroupBy(x => x.AxUserId, StringComparer.OrdinalIgnoreCase)
                    .Select(x => x.First())
                    .OrderBy(x => string.IsNullOrWhiteSpace(x.Name) ? x.AxUserId : x.Name, StringComparer.OrdinalIgnoreCase)
                    .ToList();

                var responsePage = result.Page > 0 ? result.Page : 1;
                var responsePageSize = result.PageSize > 0 ? result.PageSize : items.Count;

                _logger.LogInformation(
                    "ApiVisibleVisitUsers response trace. Success={Success}; Message={Message}; TraceId={TraceId}; ItemCount={ItemCount}; Total={Total}; Page={Page}; PageSize={PageSize}",
                    result.Success,
                    result.Message ?? string.Empty,
                    result.TraceId ?? string.Empty,
                    items.Count,
                    result.Total,
                    responsePage,
                    responsePageSize);

                return CreateApiPagedResponse(new
                {
                    Success = result.Success || items.Count > 0,
                    Message = result.Message ?? string.Empty,
                    Total = items.Count,
                    Page = responsePage,
                    PageSize = responsePageSize,
                    Items = items,
                    TraceId = result.TraceId
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiVisibleVisitUsers");
                return CreateApiPagedError(StatusCodes.Status502BadGateway, _sr["Api_RequestFailed"].Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error in ApiVisibleVisitUsers");
                return CreateApiPagedError(StatusCodes.Status500InternalServerError, _sr["Api_RequestFailed"].Value);
            }
        }

        // Returns activity list as json with simple paging
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> GetActivities(
            [FromBody] ActivitiesFilter filter,
            int page = 1,
            int pageSize = 50)
        {
            var token = GetToken();
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            if (filter == null)
                return BadRequest("Empty filter.");

            // Normalize filter values
            filter.fromDate = SanitizeDate(filter.fromDate);
            filter.toDate = SanitizeDate(filter.toDate);
            filter.accountNum = SanitizeValue(filter.accountNum);
            filter.ownerAxUserId = SanitizeValue(filter.ownerAxUserId);

            try
            {
                // Call API client (maps to api/crm/activities/list)
                var result = await _apiClient.GetActivitiesAsync(token, filter);

                if (result == null)
                    return Json(new { total = 0, items = Array.Empty<object>() });

                var itemsList = result.GetAnyItems()?.ToList() ?? new List<ActivityDto>();

                _logger.LogInformation(
                    "GetActivities filter: from={From} to={To} accountNum={Account} ownerAxUserId={OwnerAxUserId} items={Count}",
                    filter.fromDate,
                    filter.toDate,
                    filter.accountNum,
                    filter.ownerAxUserId,
                    itemsList.Count);

                if (!string.IsNullOrWhiteSpace(filter.accountNum))
                {
                    var hasAccountValues = itemsList.Any(x => !string.IsNullOrWhiteSpace(x.AccountNum));
                    if (hasAccountValues)
                    {
                        itemsList = itemsList
                            .Where(x => string.Equals(x.AccountNum, filter.accountNum, StringComparison.OrdinalIgnoreCase))
                            .ToList();
                    }
                }

                // Sort by most recent date before paging.
                itemsList = itemsList
                    .OrderByDescending(x => TryParseActivityDate(x.TransDate) ?? DateTime.MinValue)
                    .ThenByDescending(x => TryParseRecId(x.RecId))
                    .ToList();

                // Local paging on client side
                var pageItems = Paginate(itemsList, page, pageSize);

                return Json(new { total = itemsList.Count, items = pageItems });
            }
            catch (ApiException ex)
            {
                // Error from upstream API (non-success status codes)
                _logger.LogError(ex, "Upstream API error in GetActivities");
                return StatusCode(StatusCodes.Status502BadGateway, new { status = (int)ex.StatusCode, error = _sr["Api_RequestFailed"].Value });
            }
            catch (JsonException ex)
            {
                // Malformed JSON from upstream
                _logger.LogError(ex, "JSON deserialization error in GetActivities");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "Error al procesar la respuesta del servidor" });
            }
            catch (Exception ex)
            {
                // Fallback: log and return 500
                _logger.LogError(ex, "Unexpected error in GetActivities");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "Error interno del servidor" });
            }
        }

        // Helper to normalize date string
        private static string SanitizeDate(string? date)
        {
            return string.IsNullOrWhiteSpace(date) ? string.Empty : date.Trim();
        }

        private static string SanitizeValue(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? string.Empty : value.Trim();
        }

        // Reads the current AX user id from the session context.
        private string? GetCurrentSessionAxUserId()
        {
            return NormalizeOptionalText(HttpContext?.Session.GetString("AxUser"));
        }

        // Trims optional text and preserves null for empty values.
        private static string? NormalizeOptionalText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        // Sanitizes visible-user fields before returning them to React.
        private static DataVisibilityVisibleUserDto NormalizeVisibleUser(DataVisibilityVisibleUserDto item)
        {
            return new DataVisibilityVisibleUserDto
            {
                Alias = SanitizeValue(item.Alias),
                AxUserId = SanitizeValue(item.AxUserId),
                CrmUserId = SanitizeValue(item.CrmUserId),
                Name = SanitizeValue(item.Name),
                Source = SanitizeValue(item.Source)
            };
        }

        // Creates JSON responses with upstream casing preserved.
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

        // Creates a paged API error response for React callers.
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

        private static long TryParseRecId(string? raw)
        {
            return long.TryParse(raw, out var recId) ? recId : 0;
        }

        private static DateTime? TryParseActivityDate(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw)) return null;

            var value = raw.Trim();
            var datePart = value.Split('T', ' ')[0];

            var parts = datePart.Split(new[] { '.', '-', '/' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length == 3)
            {
                // yyyy-MM-dd
                if (parts[0].Length == 4 &&
                    int.TryParse(parts[0], out var y) &&
                    int.TryParse(parts[1], out var m) &&
                    int.TryParse(parts[2], out var d))
                {
                    return new DateTime(y, m, d);
                }

                // dd.MM.yyyy (or dd/MM/yyyy)
                if (parts[2].Length == 4 &&
                    int.TryParse(parts[2], out var y2) &&
                    int.TryParse(parts[1], out var m2) &&
                    int.TryParse(parts[0], out var d2))
                {
                    return new DateTime(y2, m2, d2);
                }
            }

            if (DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out var parsed))
            {
                return parsed.Date;
            }

            return null;
        }

        // Simple paging helper
        private static List<T> Paginate<T>(List<T> list, int page, int pageSize)
        {
            if (page < 1) page = 1;
            if (pageSize <= 0) pageSize = 50;

            return list
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }
    }
}
