using System;
using Microsoft.AspNetCore.Mvc;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;              // ← extensiones GetString/SetString
using System.Threading.Tasks;                 // ← para Task<IActionResult>



namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador encargado de gestionar la creación de nuevas personas
    /// desde la interfaz web, comunicándose con la API de Axapta para registrar
    /// los datos en el sistema ERP.
    /// </summary>
    /// <remarks>
    /// Este controlador utiliza el servicio <see cref="ApiClientService"/> 
    /// para enviar solicitudes a la API backend (Axapta Web Services).
    /// Requiere un token JWT válido almacenado en la sesión activa del usuario.
    /// </remarks>
    public class CreatePersonController : Controller
    {
        private readonly ApiClientService _apiClient;

        /// <summary>
        /// Inicializa una nueva instancia del controlador con el servicio de comunicación API.
        /// </summary>
        /// <param name="apiClient">Servicio HTTP cliente para interactuar con la API.</param>

        public CreatePersonController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Redirige la ruta /CreatePerson/Index hacia la acción principal <see cref="CreatePerson"/>.
        /// </summary>
        [HttpGet]
        public IActionResult Index()
        {
            return RedirectToAction("CreatePerson");
        }

        /// <summary>
        /// Muestra el formulario de creación de una nueva persona.
        /// </summary>
        [HttpGet]
        public IActionResult CreatePerson()
        {
            return View("~/Views/Person/New/CreatePerson.cshtml");
        }

        /// <summary>
        /// Envía la solicitud para crear una nueva persona en Axapta.
        /// </summary>
        /// <param name="name">Nombre completo de la persona a registrar.</param>
        /// <returns>
        /// Devuelve la misma vista con un mensaje de éxito o error según el resultado
        /// de la operación en la API.
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> CreatePerson(string name)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            if (string.IsNullOrWhiteSpace(name))
            {
                ViewBag.Error = "El nombre no puede estar vacío.";
                return View("~/Views/Person/New/CreatePerson.cshtml");
            }

            try
            {
                var result = await _apiClient.CreatePersonAsync(name, token);

                if (string.IsNullOrEmpty(result))
                {
                    ViewBag.Error = "Error al crear la persona.";
                    return View("~/Views/Person/New/CreatePerson.cshtml");
                }

                ViewBag.Success = result;
                return View("~/Views/Person/New/CreatePerson.cshtml");
            }
            catch (Exception ex)
            {
                ViewBag.Error = "Error de conexión: " + ex.Message;
                return View("~/Views/Person/New/CreatePerson.cshtml");
            }
        }
    }
}
