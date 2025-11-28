using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Controllers
{
    // Controller that manages assistant creation for an activity
    public class CreateVisitaAsistenteController : BaseMvcController
    {
        private readonly ILogger<CreateVisitaAsistenteController> _logger;

        public CreateVisitaAsistenteController(ICrmApiClient apiClient, ILogger<CreateVisitaAsistenteController> logger)
            : base(apiClient)
        {
            _logger = logger;
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

            try
            {
                var result = await _apiClient.CreateVisitaAsistenteAsync(token, model);
                return Json(result);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in CreateAsistente");
                return Json(new { Success = false, Message = ex.Message });
            }
        }
    }
}
