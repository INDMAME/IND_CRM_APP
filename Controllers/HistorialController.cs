using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    public class HistorialController : Controller
    {

        private readonly ApiClientService _apiClient;

        public HistorialController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        // ============================================
        // VISTA PRINCIPAL
        // ============================================
        [HttpGet]
        public async Task<IActionResult> History()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = environment ?? "Desconocido";
            ViewBag.Company = company ?? "N/A";

            var to = DateTime.Today;
            var from = to.AddMonths(-1);

            ViewBag.DefaultFromDate = from.ToString("yyyy-MM-dd");
            ViewBag.DefaultToDate = to.ToString("yyyy-MM-dd");

            return View("~/Views/Visitas/History.cshtml");
        }


        // ============================================
        // API JSON - CONSULTAR HISTORIAL
        // ============================================
        [HttpPost]
        public async Task<IActionResult> GetActivities([FromBody] ActivitiesFilter filter,
                                                       int page = 1,
                                                       int pageSize = 50)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            if (filter == null)
                return BadRequest("Filtro vacío.");

            filter.userId = filter.userId ?? "";
            filter.fromDate = SanitizeDate(filter.fromDate);
            filter.toDate = SanitizeDate(filter.toDate);

            var result = await _apiClient.GetActivitiesAsync(token, filter);

            if (result == null)
                return Json(new { total = 0, items = Array.Empty<object>() });

            var itemsList = result.Items?.ToList() ?? new List<ActivityDto>();

            var pageItems = Paginate(itemsList, page, pageSize);

            return Json(new { total = itemsList.Count, items = pageItems });
        }






        // ============================================
        // HELPERS
        // ============================================
        private static string SanitizeDate(string? date)
        {
            return string.IsNullOrWhiteSpace(date) ? "" : date.Trim();
        }

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
