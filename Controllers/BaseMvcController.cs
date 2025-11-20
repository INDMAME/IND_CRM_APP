using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador base para todos los controladores MVC de la aplicacion.
    /// Centraliza la obtencion del token JWT y la carga de informacion comun,
    /// como el entorno y la compañia de Axapta.
    /// </summary>
    public abstract class BaseMvcController : Controller
    {
        protected readonly ApiClientService _apiClient;

        protected BaseMvcController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Obtiene el token de la sesion actual. Si no existe, devuelve null.
        /// </summary>
        protected string GetToken()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return null;

            return token;
        }

        /// <summary>
        /// Devuelve un redirect al Login si el token no es valido.
        /// Si el token existe, devuelve null para indicar que se puede continuar.
        /// </summary>
        protected IActionResult RedirectIfNoToken()
        {
            var token = GetToken();
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            return null;
        }

        /// <summary>
        /// Carga en ViewBag los datos de entorno y compañia usando la API de Axapta.
        /// </summary>
        protected async Task LoadEnvironmentAndCompanyAsync(string token)
        {
            var environment = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.Environment = string.IsNullOrWhiteSpace(environment) ? "Desconocido" : environment;
            ViewBag.Company = string.IsNullOrWhiteSpace(company) ? "N/A" : company;
        }
    }
}
