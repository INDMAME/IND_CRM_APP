using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Controlador que gestiona la creación de asistentes asociados a una actividad.
    /// </summary>
    public class CreateVisitaAsistenteController : Controller
    {
        private readonly ApiClientService _apiClient;

        public CreateVisitaAsistenteController(ApiClientService apiClient)
        {
            _apiClient = apiClient;
        }

        /// <summary>
        /// Recibe los datos del asistente y llama al endpoint API.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateAsistente(CreateVisitaAsistenteRequest model)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest("Datos inválidos.");

            var result = await _apiClient.CreateVisitaAsistenteAsync(token, model);

            return Json(result);
        }
    }
}
