using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
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

        public HistorialController(
            ICrmApiClient apiClient,
            ILogger<HistorialController> logger,
            IStringLocalizer<INDSharedResource> sr) : base(apiClient)
        {
            _logger = logger;
            _sr = sr;
        }

        // Shows main history view with default date range
        [HttpGet]
        public async Task<IActionResult> History()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            // Load environment and company using API client
            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = string.IsNullOrWhiteSpace(environment) ? "Unknown" : environment;
            ViewBag.Company = string.IsNullOrWhiteSpace(company) ? "N/A" : company;

            // Start with empty filters to avoid unnecessary load
            ViewBag.DefaultFromDate = string.Empty;
            ViewBag.DefaultToDate = string.Empty;

            return View("~/Views/Visitas/History.cshtml");
        }

        // Returns activity list as json with simple paging
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> GetActivities(
            [FromBody] ActivitiesFilter filter,
            int page = 1,
            int pageSize = 50)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            if (filter == null)
                return BadRequest("Empty filter.");

            // Normalize filter values
            filter.userId = filter.userId ?? string.Empty;
            filter.fromDate = SanitizeDate(filter.fromDate);
            filter.toDate = SanitizeDate(filter.toDate);

            try
            {
                // Call API client (maps to api/crm/activities/list)
                var result = await _apiClient.GetActivitiesAsync(token, filter);

                if (result == null)
                    return Json(new { total = 0, items = Array.Empty<object>() });

                var itemsList = result.GetAnyItems()?.ToList() ?? new List<ActivityDto>();

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
