using IND_CRM_APP.Models;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador que gestiona la visualización del listado de cuentas CRM
    /// obtenidas desde Axapta 3.0 mediante la API REST.
    /// </summary>
    public class AccountListController : Controller
    {
        private readonly ApiClientService _apiClient;

        /// <summary>
        /// Inicializa una nueva instancia del controlador.
        /// </summary>
        public AccountListController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Carga la vista principal con el listado de cuentas.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> AccountList()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = string.IsNullOrWhiteSpace(environment) ? "Desconocido" : environment;
            ViewBag.Company = string.IsNullOrWhiteSpace(company) ? "N/A" : company;

            return View("~/Views/Accounts/AccountList.cshtml");
        }

        /// <summary>
        /// Devuelve las cuentas CRM en formato JSON con paginación.
        /// </summary>
        /// <param name="accountNum">Filtro opcional por número de cuenta.</param>
        /// <param name="page">Número de página.</param>
        /// <param name="pageSize">Tamaño de página.</param>
        [HttpGet]
        public async Task<IActionResult> GetAccounts(string? accountNum = null, int page = 1, int pageSize = 50)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            var result = await _apiClient.GetAccountsAsync(token, accountNum, page, pageSize);

            return Json(new
            {
                total = result.Total,
                items = result.Items
            });
        }
    }
}
