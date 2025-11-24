using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // Controller for activity history
    public class HistorialController : BaseMvcController
    {
        public HistorialController(ICrmApiClient apiClient) : base(apiClient)
        {
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

            // Default period: last month
            var to = DateTime.Today;
            var from = to.AddMonths(-1);

            ViewBag.DefaultFromDate = from.ToString("yyyy-MM-dd");
            ViewBag.DefaultToDate = to.ToString("yyyy-MM-dd");

            return View("~/Views/Visitas/History.cshtml");
        }

        // Returns activity list as json with simple paging
        [HttpPost]
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

            // Call API client (maps to api/crm/activities/list)
            var result = await _apiClient.GetActivitiesAsync(token, filter);

            if (result == null)
                return Json(new { total = 0, items = Array.Empty<object>() });

            var itemsList = result.Items?.ToList() ?? new List<ActivityDto>();

            // Local paging on client side
            var pageItems = Paginate(itemsList, page, pageSize);

            return Json(new { total = itemsList.Count, items = pageItems });
        }

        // Helper to normalize date string
        private static string SanitizeDate(string? date)
        {
            return string.IsNullOrWhiteSpace(date) ? string.Empty : date.Trim();
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
