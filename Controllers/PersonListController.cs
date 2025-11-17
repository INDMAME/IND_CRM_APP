using Microsoft.AspNetCore.Mvc;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;              // ← extensiones GetString/SetString
using System.Threading.Tasks;                 // ← para Task<IActionResult>


namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador que gestiona la visualización del listado de personas
    /// registradas en el sistema Axapta.
    /// </summary>
    /// <remarks>
    /// Este controlador obtiene datos de entorno y compañía desde la API,
    /// utilizando el token JWT activo en la sesión.
    /// </remarks>
    public class PersonListController : Controller
    {
        private readonly ApiClientService _apiClient;

        /// <summary>
        /// Inicializa una nueva instancia del controlador.
        /// </summary>
        /// <param name="apiClient">Servicio HTTP cliente que accede a la API backend.</param>

        public PersonListController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Carga la vista con la lista de personas disponibles en Axapta.
        /// </summary>
        /// <returns>
        /// Devuelve la vista con datos del entorno y compañía actual.
        /// Si el usuario no está autenticado, redirige a la página de login.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var username = HttpContext.Session.GetString("Username");
            var password = HttpContext.Session.GetString("Password");
            var token = HttpContext.Session.GetString("Token");

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = environment ?? "Desconocido";
            ViewBag.Company = company ?? "N/A";

            return View("~/Views/Person/PersonList.cshtml");
        }
    }
}
