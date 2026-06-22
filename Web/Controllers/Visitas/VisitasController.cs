using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using IND_CRM_APP.Extensions;
using IND_CRM_APP.Infrastructure.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Localization;
using System;
using System.Globalization;
using System.Linq;
using System.Text.Json;

namespace IND_CRM_APP.Controllers
{
    // Controller for visit and activity screens
    public class VisitasController : BaseMvcController
    {
        private readonly ILogger<VisitasController> _logger;
        private readonly IINDCrmEnumLocalizer _enumLocalizer;
        private readonly ICrmEnumCatalog _crmEnumCatalog;
        private readonly IVisitMutationPermissionService _visitMutationPermissions;
        private readonly IStringLocalizer<INDSharedResource> _sr;
        private const string CrmAppCode = "CRM";
        private static readonly string[] VisitCatalogEnumNames =
        {
            "CRMActividadType",
            "CRMTipoVisita",
            "INDContactMethod",
            "CRMActividadOrigen",
            "CRMCustVendVisitaAsistente"
        };

        public VisitasController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            ILogger<VisitasController> logger,
            IINDCrmEnumLocalizer enumLocalizer,
            ICrmEnumCatalog crmEnumCatalog,
            IVisitMutationPermissionService visitMutationPermissions,
            IStringLocalizer<INDSharedResource> sr) : base(apiClient, tokenSession)
        {
            _logger = logger;
            _enumLocalizer = enumLocalizer;
            _crmEnumCatalog = crmEnumCatalog;
            _visitMutationPermissions = visitMutationPermissions;
            _sr = sr;
        }

        // Returns accounts for dropdown with paging
        // Uses api/crm/accounts/listAccounts via ICrmApiClient
        [HttpGet]
        public async Task<IActionResult> GetAccountsForDropdown(
            string term = "",
            int page = 1,
            int pageSize = 20)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { message = _sr["Api_SessionExpired"].Value });

            try
            {
                var result = await _apiClient.GetAccountsAsync(token, term ?? string.Empty, page, pageSize);

                var items = result.GetAnyItems();

                if (!result.Success && !items.Any())
                {
                    var msg = result.GetMessageOrDefault(_sr["Api_AccountsFetchFailed"].Value);
                    return StatusCode(StatusCodes.Status504GatewayTimeout, new { message = msg });
                }

                return Json(new
                {
                    total = result.Total > 0 ? result.Total : items.Count(),
                    items
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in GetAccountsForDropdown");
                return Json(new { total = 0, items = Array.Empty<object>() });
            }
        }

        // Returns contacts for dropdown given an account number
        // Uses api/crm/accounts/listContacts via ICrmApiClient
        [HttpGet]
        public async Task<IActionResult> GetContactsForDropdown(
            string accountNum,
            int page = 1,
            int pageSize = 500)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { message = _sr["Api_SessionExpired"].Value });

            if (string.IsNullOrWhiteSpace(accountNum))
                return BadRequest(new { message = _sr["Api_MissingAccountNum"].Value });

            try
            {
                var result = await _apiClient.GetContactosAsync(token, accountNum, page, pageSize);

                var items = result.GetAnyItems();

                return Json(new
                {
                    total = result.Total > 0 ? result.Total : items.Count(),
                    items
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in GetContactsForDropdown");
                return Json(new { total = 0, items = Array.Empty<object>() });
            }
        }

        // Shows main create activity view
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrEmpty(token))
                    return RedirectToAction("Login", "Auth");

                await LoadEnvironmentInfoAsync();

                await LoadVisitEnumViewBagsAsync(token);

                return View();
            }
            catch
            {
                // In case of error, still return view
                LoadVisitEnumFallbackViewBags();
                return View();
            }
        }

        // Creates a new activity calling api/crm/activities/create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateActivity([FromBody] CreateActivityRequest req)
        {
            try
            {
                string token = GetToken() ?? string.Empty;
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = _sr["Api_TokenMissing"].Value });

                if (req == null)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var response = await _apiClient.CreateActivityAsync(token, req);
                if (response.Success)
                {
                    LogCreatedActivityResponse(response.Data, response.Message);
                }

                return Json(new
                {
                    success = response.Success,
                    message = response.Message,
                    data = response.Data
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in CreateActivity");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in CreateActivity");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Creates a new visit assistant calling api/crm/visits/createVisitaAsistente
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateVisitaAsistente([FromBody] CreateVisitaAsistenteRequest req, [FromQuery] bool IND_SetActionMark = false)
        {
            try
            {
                string token = GetToken() ?? string.Empty;
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = _sr["Api_TokenMissing"].Value });

                if (req == null)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                if (!TryResolveActivityRecId(req.RefRecIdActividad, out var assistantActivityRecId))
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var assistantGuardResponse = ModuleRecordMutationActionResults.ToActionResult(
                    this,
                    await _visitMutationPermissions.ValidateAsync(token, assistantActivityRecId),
                    _sr);
                if (assistantGuardResponse != null)
                    return assistantGuardResponse;

                var response = await _apiClient.CreateVisitaAsistenteAsync(token, req);

                if (IND_SetActionMark && response.Success)
                {
                    TempData.INDSetActionMarkSuccess();
                }

                return Json(new
                {
                    success = response.Success,
                    message = response.Message,
                    data = response.Data
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in CreateVisitaAsistente");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in CreateVisitaAsistente");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Transcribes a WAV audio file into text using api/ia/service/speech
        [HttpPost]
        [ValidateAntiForgeryToken]
        [RequestSizeLimit(30000000)]
        [RequestFormLimits(MultipartBodyLengthLimit = 30000000)]
        public async Task<IActionResult> TranscribeSpeech(
            [FromForm] string languageId,
            [FromForm] IFormFile? audioFile,
            [FromForm] string? temperature,
            [FromForm] string? prompt,
            [FromForm] string? context)
        {
            try
            {
                string token = GetToken() ?? string.Empty;
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = _sr["Api_TokenMissing"].Value });

                if (audioFile == null || audioFile.Length <= 0)
                    return Json(new { success = false, message = _sr["Speech_Transcribe_MissingFile"].Value });

                var fileName = audioFile.FileName ?? string.Empty;
                if (!fileName.EndsWith(".wav", StringComparison.OrdinalIgnoreCase))
                    return Json(new { success = false, message = _sr["Speech_Transcribe_OnlyWav"].Value });

                const long maxBytes = 25L * 1024 * 1024;
                if (audioFile.Length > maxBytes)
                    return Json(new { success = false, message = _sr["Speech_Transcribe_FileTooLarge"].Value });

                double? tempValue = null;
                var tempRaw = (temperature ?? string.Empty).Trim();
                if (!string.IsNullOrWhiteSpace(tempRaw))
                {
                    if (!double.TryParse(
                            tempRaw,
                            System.Globalization.NumberStyles.Float,
                            System.Globalization.CultureInfo.InvariantCulture,
                            out var parsed))
                    {
                        return Json(new { success = false, message = _sr["Speech_Transcribe_InvalidTemperature"].Value });
                    }

                    if (parsed < 0 || parsed > 1)
                        return Json(new { success = false, message = _sr["Speech_Transcribe_InvalidTemperature"].Value });

                    tempValue = parsed;
                }

                var languageFinal = string.IsNullOrWhiteSpace(languageId) ? "auto" : languageId.Trim();
                var promptFinal = !string.IsNullOrWhiteSpace(context) ? context : prompt;
                if (!tempValue.HasValue)
                    tempValue = 0d;
                if (string.IsNullOrWhiteSpace(promptFinal))
                    promptFinal = "Return only the transcription of the audio.";

                using var stream = audioFile.OpenReadStream();
                var response = await _apiClient.TranscribeSpeechAsync(
                    token,
                    languageFinal,
                    stream,
                    audioFile.FileName ?? "audio.wav",
                    audioFile.ContentType,
                    tempValue,
                    promptFinal,
                    HttpContext.RequestAborted
                );

                var transcript = response.Data ?? string.Empty;
                var hasTranscript = !string.IsNullOrWhiteSpace(transcript);
                var success = response.Success || hasTranscript;
                var message = response.Message;

                if (!success)
                {
                    if (string.IsNullOrWhiteSpace(message))
                    {
                        var firstError = response.Errors.FirstOrDefault(e => !string.IsNullOrWhiteSpace(e.Message))?.Message;
                        message = !string.IsNullOrWhiteSpace(firstError)
                            ? firstError
                            : _sr["Speech_Transcribe_Failed"].Value;
                    }
                }

                return Json(new
                {
                    success,
                    message,
                    data = hasTranscript ? transcript : string.Empty,
                    errorCode = response.ErrorCode,
                    errors = response.Errors
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in TranscribeSpeech");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in TranscribeSpeech");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Detail view for editing an existing activity (step 2 equivalent)
        [HttpGet("Visitas/Detalle/{code}")]
        public async Task<IActionResult> Detail(string code)
        {
            var token = GetToken();
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            await LoadEnvironmentInfoAsync();
            ViewBag.SelectedCompanyId = HttpContext.Session.GetString("INDCompanySelected") ?? string.Empty;
            ViewBag.CurrentAxUserId = GetCurrentSessionAxUserId() ?? string.Empty;
            ViewBag.PermissionsRevision = HttpContext.Session.GetString("INDPermissionsRevision") ?? string.Empty;
            ViewBag.VisibleVisitUsers = await _visitMutationPermissions.GetVisibleVisitUsersForViewAsync(token);

            if (string.IsNullOrWhiteSpace(code))
                return NotFound();

            static string? Pick(string? primary, string? fallback) =>
                string.IsNullOrWhiteSpace(primary) ? fallback : primary;

            static bool IsActivityEmpty(ActivityDto dto) =>
                string.IsNullOrWhiteSpace(dto.ActividadId) &&
                string.IsNullOrWhiteSpace(dto.AccountNum) &&
                string.IsNullOrWhiteSpace(dto.Description) &&
                string.IsNullOrWhiteSpace(dto.TransDate);

            try
            {
                ActivityDto activity = new();
                bool byCodeSuccess = false;

                try
                {
                    var byCode = await _apiClient.GetActivityByCodeAsync(token, code);
                    activity = byCode.Data ?? new ActivityDto();
                    byCodeSuccess = byCode.Success && byCode.Data != null;
                }
                catch (ApiException ex)
                {
                    _logger.LogWarning(ex, "Upstream API error in GetActivityByCode for {Code}", code);
                    activity = new ActivityDto();
                }

                // Fallback to recId lookup if by-code returns empty data or misses newer fields.
                long? recIdFallback = null;
                if (long.TryParse(code, out var recIdParsedFromCode))
                {
                    recIdFallback = recIdParsedFromCode;
                }
                else if (long.TryParse(activity.RecId, out var recIdParsedFromActivity))
                {
                    recIdFallback = recIdParsedFromActivity;
                }

                var shouldTryRecIdFallback = !byCodeSuccess ||
                                             IsActivityEmpty(activity) ||
                                             activity.ContactMethod == null;

                if (shouldTryRecIdFallback && recIdFallback.HasValue)
                {
                    try
                    {
                        var byRec = await _apiClient.GetActivityByRecIdAsync(token, recIdFallback.Value);
                        if (byRec.Data != null)
                        {
                            var recIdActivity = byRec.Data;
                            activity.ActividadId = Pick(activity.ActividadId, recIdActivity.ActividadId);
                            activity.RecId = Pick(activity.RecId, recIdActivity.RecId);
                            activity.AccountNum = Pick(activity.AccountNum, recIdActivity.AccountNum);
                            activity.Name = Pick(activity.Name, recIdActivity.Name);
                            activity.TransDate = Pick(activity.TransDate, recIdActivity.TransDate);
                            activity.Country = Pick(activity.Country, recIdActivity.Country);
                            activity.ActividadType = Pick(activity.ActividadType, recIdActivity.ActividadType);
                            activity.TipoVisita = Pick(activity.TipoVisita, recIdActivity.TipoVisita);
                            activity.ContactMethod = activity.ContactMethod ?? recIdActivity.ContactMethod;
                            activity.Description = Pick(activity.Description, recIdActivity.Description);
                            activity.Comentarios = Pick(activity.Comentarios, recIdActivity.Comentarios);
                            activity.Antecedentes = Pick(activity.Antecedentes, recIdActivity.Antecedentes);
                            activity.Conclusiones = Pick(activity.Conclusiones, recIdActivity.Conclusiones);
                            activity.OwnerAxUserId = Pick(activity.OwnerAxUserId, recIdActivity.OwnerAxUserId);
                            activity.OwnerName = Pick(activity.OwnerName, recIdActivity.OwnerName);
                            activity.OwnerAlias = Pick(activity.OwnerAlias, recIdActivity.OwnerAlias);
                            activity.UserId = Pick(activity.UserId, recIdActivity.UserId);
                            activity.CreatedByUserId = Pick(activity.CreatedByUserId, recIdActivity.CreatedByUserId);
                            activity.INDCreatedByUserId = Pick(activity.INDCreatedByUserId, recIdActivity.INDCreatedByUserId);
                            activity.Asistentes = activity.Asistentes ?? recIdActivity.Asistentes;
                        }
                    }
                    catch (ApiException ex)
                    {
                        _logger.LogWarning(ex, "Upstream API error in GetActivityByRecId for {RecId}", recIdFallback);
                    }
                }

                string NormalizeDate(string? value)
                {
                    if (string.IsNullOrWhiteSpace(value)) return string.Empty;
                    if (DateTime.TryParse(value, out var dt)) return dt.ToString("yyyy-MM-dd");
                    var parts = value.Split(new[] { '.', '-', '/' }, StringSplitOptions.RemoveEmptyEntries);
                    if (parts.Length == 3 &&
                        int.TryParse(parts[2], out var y) &&
                        int.TryParse(parts[1], out var m) &&
                        int.TryParse(parts[0], out var d))
                    {
                        return new DateTime(y, m, d).ToString("yyyy-MM-dd");
                    }
                    return string.Empty;
                }

                string NormalizeVisitType(string? raw)
                {
                    return _crmEnumCatalog.NormalizeTipoVisitaValue(raw);
                }

                string NormalizeContactMethod(int? raw)
                {
                    return raw.HasValue
                        ? _crmEnumCatalog.NormalizeContactMethodValue(raw.Value.ToString())
                        : string.Empty;
                }

                var recIdValue = !string.IsNullOrWhiteSpace(activity.RecId) ? activity.RecId : null
                    ?? (recIdFallback.HasValue ? recIdFallback.Value.ToString() : null)
                    ?? (long.TryParse(code, out var recIdParsed) ? recIdParsed.ToString() : string.Empty);
                var ownerAxUserId = Pick(
                    activity.OwnerAxUserId,
                    Pick(activity.INDCreatedByUserId, Pick(activity.CreatedByUserId, activity.UserId))) ?? string.Empty;
                bool? canMutateVisit = null;
                var mutationPermissionStatus = string.Empty;
                if (long.TryParse(recIdValue, NumberStyles.Integer, CultureInfo.InvariantCulture, out var detailRecId) &&
                    detailRecId != 0)
                {
                    var mutationPermission = await _visitMutationPermissions.ValidateActivityAsync(
                        token,
                        detailRecId,
                        activity,
                        "visit-detail-preload");
                    canMutateVisit = mutationPermission.IsAllowed;
                    mutationPermissionStatus = mutationPermission.Status.ToString();
                    _logger.LogInformation(
                        "Visit detail mutation permission preload. Code={Code}; RecId={RecId}; OwnerAxUserId={OwnerAxUserId}; CanMutate={CanMutate}; Status={Status}",
                        code,
                        detailRecId,
                        ownerAxUserId,
                        canMutateVisit,
                        mutationPermissionStatus);
                }

                var detail = new
                {
                    RecId = recIdValue,
                    ActividadId = activity.ActividadId ?? code,
                    AccountNum = activity.AccountNum ?? string.Empty,
                    VisitType = NormalizeVisitType(activity.TipoVisita ?? activity.ActividadType),
                    ContactMethod = NormalizeContactMethod(activity.ContactMethod),
                    Description = activity.Description ?? string.Empty,
                    TransDate = NormalizeDate(activity.TransDate),
                    Comentarios = activity.Comentarios ?? string.Empty,
                    Antecedentes = activity.Antecedentes ?? string.Empty,
                    Conclusiones = activity.Conclusiones ?? string.Empty,
                    Cliente = activity.Name ?? string.Empty,
                    OwnerAxUserId = ownerAxUserId,
                    OwnerName = activity.OwnerName ?? string.Empty,
                    OwnerAlias = activity.OwnerAlias ?? string.Empty,
                    CreatedByUserId = activity.CreatedByUserId ?? string.Empty,
                    UserId = activity.UserId ?? string.Empty,
                    INDCreatedByUserId = activity.INDCreatedByUserId ?? string.Empty,
                    CanMutateVisit = canMutateVisit,
                    MutationPermissionStatus = mutationPermissionStatus
                };

                await LoadVisitEnumViewBagsAsync(token);
                ViewData["IsVisitaDetail"] = true;
                ViewBag.ActivityDetail = detail;

                return View("Detail");
            }
            catch (ApiException)
            {
                return NotFound();
            }
        }

        // Lightweight JSON proxy for by-code lookup (used by React on detail page)
        [HttpGet("Visitas/GetActivityByCode")]
        public async Task<IActionResult> GetActivityByCode(string code)
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

            if (string.IsNullOrWhiteSpace(code))
                return BadRequest(new { success = false, message = _sr["Api_MissingCode"].Value });

            var response = await _apiClient.GetActivityByCodeAsync(token, code);
            return Json(response);
        }

        // Updates an activity (PUT api/crm/activities/{recId})
        [HttpPut("Visitas/UpdateActivity/{recId:long}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateActivity(long recId, [FromBody] UpdateActivityRequest req, [FromQuery] bool IND_SetActionMark = false)
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrEmpty(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                if (req == null)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var guardResponse = ModuleRecordMutationActionResults.ToActionResult(
                    this,
                    await _visitMutationPermissions.ValidateAsync(token, recId),
                    _sr);
                if (guardResponse != null)
                    return guardResponse;

                var response = await _apiClient.UpdateActivityAsync(token, recId, req);

                if (IND_SetActionMark && response.Success)
                {
                    TempData.INDSetActionMarkSuccess();
                }

                return Json(new { success = response.Success, message = response.Message, data = response.Data });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in UpdateActivity");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in UpdateActivity");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Updates assistant type for all assistants in a visit.
        // The API does not expose a dedicated update, so we re-send
        // existing assistants with the new type using createVisitaAsistente.
        [HttpPut("Visitas/UpdateAsistenteTipo/{recId:long}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateAsistenteTipo(long recId, [FromBody] UpdateAsistenteTipoRequest req)
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrEmpty(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                if (req == null || !req.AsistenteTipo.HasValue)
                    return BadRequest(new { success = false, message = _sr["Api_MissingAsistenteTipo"].Value });

                var guardResponse = ModuleRecordMutationActionResults.ToActionResult(
                    this,
                    await _visitMutationPermissions.ValidateAsync(token, recId),
                    _sr);
                if (guardResponse != null)
                    return guardResponse;

                var activityResp = await _apiClient.GetActivityByRecIdAsync(token, recId);
                var asistentes = activityResp.Data?.Asistentes ?? new List<ActivityAsistenteDto>();

                if (asistentes.Count == 0)
                    return Json(new { success = true, message = _sr["Api_NoAsistentesToUpdate"].Value });

                var failures = 0;
                foreach (var a in asistentes)
                {
                    if (string.IsNullOrWhiteSpace(a.AsistenteId))
                        continue;

                    var upsertReq = new CreateVisitaAsistenteRequest
                    {
                        RefRecIdActividad = recId.ToString(),
                        AsistenteTipo = req.AsistenteTipo,
                        AsistenteId = a.AsistenteId.Trim(),
                        ContactoRecId = string.Empty
                    };

                    var upsertResp = await _apiClient.CreateVisitaAsistenteAsync(token, upsertReq);
                    if (!upsertResp.Success)
                        failures++;
                }

                return Json(new
                {
                    success = failures == 0,
                    message = failures == 0 ? _sr["Common_OK"].Value : string.Format(_sr["Api_AsistentesUpdateFailedCount"].Value, failures)
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in UpdateAsistenteTipo");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in UpdateAsistenteTipo");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Deletes an activity (DELETE api/crm/activities/{recId})
        [HttpDelete("Visitas/DeleteActivity/{recId:long}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteActivity(long recId, [FromQuery] bool IND_SetActionMark = false)
        {
            try
            {
                var token = GetToken();
                if (string.IsNullOrEmpty(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                var guardResponse = ModuleRecordMutationActionResults.ToActionResult(
                    this,
                    await _visitMutationPermissions.ValidateAsync(token, recId),
                    _sr);
                if (guardResponse != null)
                    return guardResponse;

                var response = await _apiClient.DeleteActivityAsync(token, recId);

                if (IND_SetActionMark && response.Success)
                {
                    TempData.INDSetActionMarkDanger();
                }

                return Json(new { success = response.Success, message = response.Message, data = response.Data });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in DeleteActivity");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in DeleteActivity");
                return Json(new { success = false, message = _sr["Api_RequestFailed"].Value });
            }
        }

        // Logs the owner metadata returned by the activity create command.
        private void LogCreatedActivityResponse(object? responseData, string? responseMessage)
        {
            var recIdText = TryResolveActivityRecId(responseData, out var recId)
                ? recId.ToString(CultureInfo.InvariantCulture)
                : TryResolveActivityRecId(responseMessage, out recId)
                    ? recId.ToString(CultureInfo.InvariantCulture)
                    : string.Empty;
            var ownerResolution = ResolveActivityOwnerFromResponseData(responseData);

            _logger.LogInformation(
                "Visit activity create response resolved. RecId={RecId}; OwnerAxUserId={OwnerAxUserId}; OwnerSource={OwnerSource}; CurrentAxUserId={CurrentAxUserId}; CompanyId={CompanyId}",
                recIdText,
                ownerResolution.OwnerAxUserId,
                ownerResolution.Source,
                GetCurrentSessionAxUserId() ?? string.Empty,
                GetCurrentSessionCompanyId() ?? string.Empty);
        }

        // Reads the current AX user id from the session context.
        private string? GetCurrentSessionAxUserId()
        {
            return NormalizeOptionalText(HttpContext?.Session.GetString("AxUser"));
        }

        // Reads the current selected company id from the session context.
        private string? GetCurrentSessionCompanyId()
        {
            return NormalizeOptionalText(HttpContext?.Session.GetString("INDCompanySelected"));
        }

        // Trims optional text and preserves null for empty values.
        private static string? NormalizeOptionalText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        // Resolves owner fields from the create response Data payload for diagnostics only.
        private static (string OwnerAxUserId, string Source) ResolveActivityOwnerFromResponseData(object? value)
        {
            if (!TryConvertResponseDataToJsonElement(value, out var element) ||
                element.ValueKind != JsonValueKind.Object)
            {
                return (string.Empty, string.Empty);
            }

            return FirstJsonTextPropertyWithSource(
                element,
                ("OwnerAxUserId", nameof(ActivityDto.OwnerAxUserId)),
                ("ownerAxUserId", nameof(ActivityDto.OwnerAxUserId)),
                ("INDCreatedByUserId", nameof(ActivityDto.INDCreatedByUserId)),
                ("indCreatedByUserId", nameof(ActivityDto.INDCreatedByUserId)),
                ("CreatedByUserId", nameof(ActivityDto.CreatedByUserId)),
                ("createdByUserId", nameof(ActivityDto.CreatedByUserId)),
                ("UserId", nameof(ActivityDto.UserId)),
                ("userId", nameof(ActivityDto.UserId)));
        }

        // Converts arbitrary response Data values to JsonElement for tolerant field reads.
        private static bool TryConvertResponseDataToJsonElement(object? value, out JsonElement element)
        {
            if (value is JsonElement jsonElement)
            {
                element = jsonElement;
                return true;
            }

            element = default;
            if (value == null)
                return false;

            try
            {
                using var document = JsonDocument.Parse(JsonSerializer.Serialize(value));
                element = document.RootElement.Clone();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Reads the first non-empty string-like JSON property in priority order.
        private static (string Value, string Source) FirstJsonTextPropertyWithSource(
            JsonElement element,
            params (string PropertyName, string Source)[] properties)
        {
            foreach (var (propertyName, source) in properties)
            {
                if (element.TryGetProperty(propertyName, out var property))
                {
                    var value = ReadJsonStringLikeValue(property);
                    if (!string.IsNullOrWhiteSpace(value))
                        return (value, source);
                }
            }

            return (string.Empty, string.Empty);
        }

        // Reads a JSON primitive as trimmed text.
        private static string ReadJsonStringLikeValue(JsonElement element)
        {
            return element.ValueKind switch
            {
                JsonValueKind.String => element.GetString()?.Trim() ?? string.Empty,
                JsonValueKind.Number => element.GetRawText().Trim(),
                JsonValueKind.True => bool.TrueString,
                JsonValueKind.False => bool.FalseString,
                _ => string.Empty
            };
        }

        // Parses activity RecIds from API command response payloads.
        private static bool TryResolveActivityRecId(object? value, out long recId)
        {
            recId = 0;
            if (value == null)
                return false;

            if (value is JsonElement element)
                return TryResolveActivityRecId(element, out recId);

            var rawValue = Convert.ToString(value, CultureInfo.InvariantCulture);
            if (TryResolveActivityRecId(rawValue, out recId))
                return true;

            return TryConvertResponseDataToJsonElement(value, out element) &&
                   TryResolveActivityRecId(element, out recId);
        }

        // Parses activity RecIds from JSON response values.
        private static bool TryResolveActivityRecId(JsonElement element, out long recId)
        {
            recId = 0;
            if (element.ValueKind == JsonValueKind.Number)
                return element.TryGetInt64(out recId) && recId != 0;

            if (element.ValueKind == JsonValueKind.String)
                return TryResolveActivityRecId(element.GetString(), out recId);

            if (element.ValueKind == JsonValueKind.Array)
            {
                foreach (var item in element.EnumerateArray())
                {
                    if (TryResolveActivityRecId(item, out recId))
                        return true;
                }

                return false;
            }

            if (element.ValueKind != JsonValueKind.Object)
                return false;

            return TryResolveJsonPropertyRecId(element, "recId", out recId) ||
                   TryResolveJsonPropertyRecId(element, "RecId", out recId) ||
                   TryResolveJsonPropertyRecId(element, "refRecId", out recId) ||
                   TryResolveJsonPropertyRecId(element, "RefRecId", out recId) ||
                   TryResolveJsonPropertyRecId(element, "refRecIdActividad", out recId) ||
                   TryResolveJsonPropertyRecId(element, "RefRecIdActividad", out recId) ||
                   TryResolveJsonPropertyRecId(element, "data", out recId) ||
                   TryResolveJsonPropertyRecId(element, "Data", out recId);
        }

        // Parses an activity RecId from one JSON object property.
        private static bool TryResolveJsonPropertyRecId(JsonElement element, string propertyName, out long recId)
        {
            recId = 0;
            return element.TryGetProperty(propertyName, out var property) &&
                   TryResolveActivityRecId(property, out recId);
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

        // Loads visit select options from the AX enum catalog with local fallback.
        private async Task LoadVisitEnumViewBagsAsync(string token)
        {
            LoadVisitEnumFallbackViewBags();

            try
            {
                var result = await _apiClient.GetEnumCatalogByNameAsync(token, CrmAppCode, VisitCatalogEnumNames);
                var catalog = result.GetAnyItems().ToList();
                if (!result.Success && catalog.Count == 0)
                {
                    _logger.LogWarning("Visit enum catalog returned no usable data. Message={Message} TraceId={TraceId}", result.Message, result.TraceId);
                    return;
                }

                ViewBag.CRMTipoVisitaEnum = _crmEnumCatalog.GetOptionsByAxEnumName(
                    catalog,
                    "CRMTipoVisita",
                    _enumLocalizer.GetTipoVisitaItems());
                ViewBag.CRMActividadTypeEnum = _crmEnumCatalog.GetOptionsByAxEnumName(
                    catalog,
                    "CRMActividadType",
                    _enumLocalizer.GetActividadTypeItems());
                ViewBag.ContactMethodEnum = _crmEnumCatalog.GetOptionsByAxEnumName(
                    catalog,
                    "INDContactMethod",
                    _enumLocalizer.GetContactMethodItems());
                ViewBag.CRMActividadOrigenEnum = _crmEnumCatalog.GetOptionsByAxEnumName(
                    catalog,
                    "CRMActividadOrigen",
                    _enumLocalizer.GetActividadOrigenItems());
                ViewBag.AsistenteTipoEnum = _crmEnumCatalog.GetOptionsByAxEnumName(
                    catalog,
                    "CRMCustVendVisitaAsistente",
                    _enumLocalizer.GetAsistenteTipoItems());
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not load visit enum catalog. Local fallback options will be used.");
            }
        }

        // Loads stable local fallback select options for visit screens.
        private void LoadVisitEnumFallbackViewBags()
        {
            ViewBag.CRMActividadTypeEnum = _enumLocalizer.GetActividadTypeItems();
            ViewBag.CRMTipoVisitaEnum = _enumLocalizer.GetTipoVisitaItems();
            ViewBag.ContactMethodEnum = _enumLocalizer.GetContactMethodItems();
            ViewBag.CRMActividadOrigenEnum = _enumLocalizer.GetActividadOrigenItems();
            ViewBag.AsistenteTipoEnum = _enumLocalizer.GetAsistenteTipoItems();
        }

    }
}
