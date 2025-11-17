using IND_CRM_APP.Models;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador que gestiona la visualización del listado de proyectos 
    /// registrados en Axapta y expuestos a través de la API REST.
    /// </summary>
    /// <remarks>
    /// Este controlador utiliza el servicio <see cref="ApiClientService"/> 
    /// para obtener la información de los proyectos mediante llamadas autenticadas 
    /// a la API de Axapta 3.0.  
    /// También obtiene los datos de entorno y compañía activos.
    /// </remarks>
    public class ProjectListController : Controller
    {
        private readonly ApiClientService _apiClient;


        /// <summary>
        /// Inicializa una nueva instancia del controlador.
        /// </summary>
        /// <param name="apiClient">Servicio HTTP cliente de la API de Axapta.</param>
        public ProjectListController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Carga la vista principal con la lista de proyectos.
        /// </summary>
        /// <returns>
        /// Vista HTML con los datos de entorno y compañía cargados.
        /// Si el usuario no está autenticado, redirige al login.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> ProjectList()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            // 🔹 Obtener datos de entorno y compañía directamente de la API
            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = string.IsNullOrWhiteSpace(environment) ? "Desconocido" : environment;
            ViewBag.Company = string.IsNullOrWhiteSpace(company) ? "N/A" : company;

            return View("~/Views/Projects/ProjectList.cshtml");
        }

        /// <summary>
        /// Endpoint auxiliar que devuelve la lista de proyectos en formato JSON.
        /// </summary>
        /// <param name="skip">Número de registros a omitir (para paginación).</param>
        /// <param name="take">Número máximo de registros a devolver.</param>
        /// <param name="filter">Texto de búsqueda opcional para filtrar proyectos.</param>
        /// <returns>
        /// Objeto JSON con el total de registros y la lista de proyectos solicitados.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetProjects(int skip = 0, int take = 100, string? filter = null)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            var (items, total) = await _apiClient.GetProjectsAsync(token, skip, take, filter);
            return Json(new { total, items });
        }
    }
}
