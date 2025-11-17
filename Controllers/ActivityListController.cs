using IND_CRM_APP.Models;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador que gestiona la visualización de todas las visitas (actividades)
    /// registradas en Axapta y sus asistentes.
    /// </summary>
    public class ActivityListController : Controller
    {
        private readonly ApiClientService _apiClient;

        public ActivityListController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Carga la vista principal donde se mostrará el listado de actividades.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> ActivityList()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = environment;
            ViewBag.Company = company;

            return View("~/Views/Activities/ActivityList.cshtml");
        }

        /// <summary>
        /// Obtiene la lista de actividades desde la API con filtros opcionales.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> GetActivities(
            string? userId,
            string? fromDate,
            string? toDate,
            string? actividadType)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            var result = await _apiClient.GetActivitiesAsync(
                token,
                userId ?? "",
                fromDate ?? "",
                toDate ?? "",
                actividadType ?? ""
            );

            return Json(result);
        }
    }
}
