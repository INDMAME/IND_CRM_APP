using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // Controller that manages assistant creation for an activity
    public class CreateVisitaAsistenteController : BaseMvcController
    {
        public CreateVisitaAsistenteController(ICrmApiClient apiClient)
            : base(apiClient)
        {
        }

        // Receives assistant data and calls API to create it
        [HttpPost]
        public async Task<IActionResult> CreateAsistente(CreateVisitaAsistenteRequest model)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var result = await _apiClient.CreateVisitaAsistenteAsync(token, model);

            return Json(result);
        }
    }
}
