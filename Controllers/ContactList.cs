using IND_CRM_APP.Models;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador que gestiona la visualización del listado de contactos
    /// obtenidos desde Axapta 3.0 a través de la API REST CRM.
    /// </summary>
    public class ContactListController : Controller
    {
        private readonly ApiClientService _apiClient;

        /// <summary>
        /// Inicializa una nueva instancia del controlador.
        /// </summary>
        public ContactListController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Carga la vista principal con la lista de contactos CRM.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> ContactList()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = string.IsNullOrWhiteSpace(environment) ? "Desconocido" : environment;
            ViewBag.Company = string.IsNullOrWhiteSpace(company) ? "N/A" : company;

            return View("~/Views/Contacts/ContactList.cshtml");
        }

        /// <summary>
        /// Devuelve la lista de contactos en formato JSON para renderizado dinámico.
        /// </summary>
        /// <param name="accountNum">Filtro opcional por número de cuenta.</param>
        /// <param name="page">Número de página (>=1).</param>
        /// <param name="pageSize">Tamaño de página.</param>
        [HttpGet]
        public async Task<IActionResult> GetContacts(string? accountNum = null, int page = 1, int pageSize = 50)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            var result = await _apiClient.GetContactosAsync(token, accountNum, page, pageSize);

            return Json(new
            {
                total = result.Total,
                items = result.Items
            });
        }
    }
}
