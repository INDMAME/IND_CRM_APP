using Microsoft.AspNetCore.Mvc;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;              // ← extensiones GetString/SetString
using System.Threading.Tasks;
using IND_CRM_APP.Services;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador principal de la aplicación web.
    /// Gestiona la página inicial y verifica la sesión activa del usuario.
    /// </summary>
    /// <remarks>
    /// Si el usuario no ha iniciado sesión, redirige automáticamente a la vista de autenticación.
    /// </remarks>
    public class HomeController : Controller
    {
        private readonly ApiClientService _apiClient;

        /// <summary>
        /// Constructor que inicializa el servicio cliente de la API.
        /// </summary>
        public HomeController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Carga la página principal del sistema web.
        /// </summary>
        /// <returns>
        /// Devuelve la vista principal si el usuario está autenticado;
        /// en caso contrario, redirige al inicio de sesión.
        /// </returns>
        public IActionResult Index()
        {
            var username = HttpContext.Session.GetString("Username");
            if (string.IsNullOrEmpty(username))
                return RedirectToAction("Login", "Auth");

            return View("~/Views/Home/Index.cshtml");
        }

    }
}
