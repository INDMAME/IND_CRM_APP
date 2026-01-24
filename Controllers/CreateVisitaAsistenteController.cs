using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using IND_CRM_APP.Infrastructure.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Localization;

namespace IND_CRM_APP.Controllers
{
    // Controller that manages assistant creation for an activity
    public class CreateVisitaAsistenteController : BaseMvcController
    {
        private readonly ILogger<CreateVisitaAsistenteController> _logger;
        private readonly IStringLocalizer<INDSharedResource> _sr;

        public CreateVisitaAsistenteController(
            ICrmApiClient apiClient,
            ILogger<CreateVisitaAsistenteController> logger,
            IStringLocalizer<INDSharedResource> sr)
            : base(apiClient)
        {
            _logger = logger;
            _sr = sr;
        }

        // Receives assistant data and calls API to create it
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateAsistente(CreateVisitaAsistenteRequest model)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = _sr["Api_RequestFailed"].Value });

            try
            {
                var result = await _apiClient.CreateVisitaAsistenteAsync(token, model);
                return Json(result);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in CreateAsistente");
                return Json(new { Success = false, Message = _sr["Api_RequestFailed"].Value });
            }
        }
    }
}
