using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using IND_CRM_APP.Infrastructure.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Localization;
using System.Globalization;

namespace IND_CRM_APP.Controllers
{
    // Controller that manages assistant creation for an activity
    public class CreateVisitaAsistenteController : BaseMvcController
    {
        private readonly ILogger<CreateVisitaAsistenteController> _logger;
        private readonly IVisitMutationPermissionService _visitMutationPermissions;
        private readonly IStringLocalizer<INDSharedResource> _sr;

        public CreateVisitaAsistenteController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            ILogger<CreateVisitaAsistenteController> logger,
            IVisitMutationPermissionService visitMutationPermissions,
            IStringLocalizer<INDSharedResource> sr)
            : base(apiClient, tokenSession)
        {
            _logger = logger;
            _visitMutationPermissions = visitMutationPermissions;
            _sr = sr;
        }

        // Receives assistant data and calls API to create it
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateAsistente(CreateVisitaAsistenteRequest model)
        {
            var token = GetToken();
            if (string.IsNullOrEmpty(token))
                return Unauthorized();

            if (model == null || !ModelState.IsValid)
                return BadRequest(new { Success = false, Message = _sr["Api_RequestFailed"].Value });

            try
            {
                if (!TryResolveActivityRecId(model.RefRecIdActividad, out var activityRecId))
                    return BadRequest(new { Success = false, Message = _sr["Api_RequestFailed"].Value });

                var guardResponse = ModuleRecordMutationActionResults.ToActionResult(
                    this,
                    await _visitMutationPermissions.ValidateAsync(token, activityRecId),
                    _sr,
                    ModuleRecordMutationJsonCase.PascalCase);
                if (guardResponse != null)
                    return guardResponse;

                var result = await _apiClient.CreateVisitaAsistenteAsync(token, model);
                return Json(result);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in CreateAsistente");
                return Json(new { Success = false, Message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Parses activity RecIds from assistant mutation payloads.
        private static bool TryResolveActivityRecId(string? value, out long recId)
        {
            return long.TryParse(
                    value?.Trim(),
                    NumberStyles.Integer,
                    CultureInfo.InvariantCulture,
                    out recId)
                && recId != 0;
        }

    }
}
