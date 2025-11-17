using Microsoft.AspNetCore.Http;              // Extensiones de sesión GetString/SetString
using System.Threading.Tasks;                 // Para uso de métodos asincrónicos Task<IActionResult>
using System.Collections.Generic;             // Para listas genéricas
using Microsoft.AspNetCore.Mvc;
using IND_CRM_APP.Services;
using IND_CRM_APP.Models.Shared;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador responsable de la autenticación de usuarios dentro del sistema web.
    /// Se encarga de manejar el proceso de inicio y cierre de sesión, 
    /// interactuando con la API backend que valida las credenciales y devuelve el token JWT.
    /// </summary>
    /// <remarks>
    /// Este controlador utiliza el servicio <see cref="ApiClientService"/> 
    /// para comunicarse con la API de autenticación hospedada en el servidor de Axapta.
    /// Los tokens JWT generados se almacenan en la sesión de usuario 
    /// y se utilizan para autorizar las solicitudes posteriores a la API.
    /// </remarks> 
    public class AuthController : Controller
    {
        private readonly ApiClientService _apiClient;

        /// <summary>
        /// Constructor que inicializa el controlador de autenticación.
        /// </summary>
        /// <param name="apiClient">
        /// Servicio inyectado que gestiona las solicitudes HTTP a la API de Axapta.
        /// </param>
        public AuthController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }


        /// <summary>
        /// Cierra la sesión del usuario actual.
        /// </summary>
        /// <returns>
        /// Redirige a la vista de inicio de sesión después de limpiar la sesión.
        /// </returns>
        [HttpPost]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Auth");
        }


        // <summary>
        /// Muestra la vista de inicio de sesión (formulario HTML).
        /// </summary>
        /// <returns>Vista correspondiente a la pantalla de inicio de sesión.</returns>

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }


        /// <summary>
        /// Procesa el inicio de sesión del usuario.
        /// </summary>
        /// <param name="model">
        /// Objeto <see cref="LoginRequest"/> con las credenciales (usuario y contraseña).
        /// </param>
        /// <returns>
        /// Si las credenciales son válidas, redirige al listado de personas;
        /// en caso contrario, retorna la vista con un mensaje de error.
        /// </returns>
        /// <remarks>
        /// - Valida el modelo de entrada antes de enviar los datos.  
        /// - Llama al método <see cref="ApiClientService.AuthenticateAsync(string, string)"/> 
        ///   para obtener el token JWT.  
        /// - Almacena el token, usuario y contraseña en la sesión HTTP actual.  
        /// - Redirige a <see cref="PersonListController.Index"/> si la autenticación es exitosa.
        /// </remarks>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Error = "Por favor ingresa usuario y contraseña.";
                return View(model);
            }

            var token = await _apiClient.AuthenticateAsync(model.Username, model.Password);

            if (string.IsNullOrEmpty(token))
            {
                ViewBag.Error = "Credenciales inválidas o no se pudo conectar con la API.";
                return View(model);
            }

            HttpContext.Session.SetString("Username", model.Username);
            HttpContext.Session.SetString("Password", model.Password);
            HttpContext.Session.SetString("Token", token);


            // ⬇️ Redirige a la new ruta/controlador de Home
            return RedirectToAction("Index", "Home");

        }
    }
}
