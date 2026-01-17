using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using IND_CRM_APP.Extensions;
using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Infrastructure.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Localization;
using System;
using System.Linq;

namespace IND_CRM_APP.Controllers
{
    // Controller for visit and activity screens
    public class VisitasController : BaseMvcController
    {
        private readonly ILogger<VisitasController> _logger;
        private readonly IINDCrmEnumLocalizer _enumLocalizer;
        private readonly IStringLocalizer<INDSharedResource> _sr;

        public VisitasController(
            ICrmApiClient apiClient,
            ILogger<VisitasController> logger,
            IINDCrmEnumLocalizer enumLocalizer,
            IStringLocalizer<INDSharedResource> sr) : base(apiClient)
        {
            _logger = logger;
            _enumLocalizer = enumLocalizer;
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
            var token = HttpContext.Session.GetString("Token");
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
            var token = HttpContext.Session.GetString("Token");
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
                var token = HttpContext.Session.GetString("Token");
                if (string.IsNullOrEmpty(token))
                    return RedirectToAction("Login", "Auth");

                await LoadEnvironmentInfoAsync();

                // Load enum lists for selects
                ViewBag.CRMActividadTypeEnum = _enumLocalizer.GetActividadTypeItems();
                ViewBag.CRMTipoVisitaEnum = _enumLocalizer.GetTipoVisitaItems();
                ViewBag.CRMActividadOrigenEnum = _enumLocalizer.GetActividadOrigenItems();
                ViewBag.AsistenteTipoEnum = _enumLocalizer.GetAsistenteTipoItems();

                ViewBag.AxUser = HttpContext.Session.GetString("AxUser");

                return View();
            }
            catch
            {
                // In case of error, still return view
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
                string token = HttpContext.Session.GetString("Token") ?? string.Empty;
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = _sr["Api_TokenMissing"].Value });

                if (req == null)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var axUser = (HttpContext.Session.GetString("AxUser") ?? string.Empty).Trim();
                if (string.IsNullOrWhiteSpace(req.CreatedByUserId) && !string.IsNullOrWhiteSpace(axUser))
                {
                    req.CreatedByUserId = axUser;
                }

                // API expects the service user as userId and the actual user as createdByUserId.
                req.UserId = IndAuthEnv.ServiceUser;

                var response = await _apiClient.CreateActivityAsync(token, req);

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
                string token = HttpContext.Session.GetString("Token") ?? string.Empty;
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = _sr["Api_TokenMissing"].Value });

                if (req == null)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

                var axUser = HttpContext.Session.GetString("AxUser") ?? string.Empty;
                if (!string.IsNullOrWhiteSpace(axUser) && string.IsNullOrWhiteSpace(req.CreatedByUserId))
                {
                    req.CreatedByUserId = axUser;
                }

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

        // Transcribes a WAV audio file into text using api/speech/transcribe
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
                string token = HttpContext.Session.GetString("Token") ?? string.Empty;
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
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            await LoadEnvironmentInfoAsync();

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

                // Fallback to legacy recId lookup if needed or if by-code returned empty data.
                long? recIdFallback = null;
                if (long.TryParse(code, out var recIdParsedFromCode))
                {
                    recIdFallback = recIdParsedFromCode;
                }
                else if (long.TryParse(activity.RecId, out var recIdParsedFromActivity))
                {
                    recIdFallback = recIdParsedFromActivity;
                }

                if ((!byCodeSuccess || IsActivityEmpty(activity)) && recIdFallback.HasValue)
                {
                    try
                    {
                        var byRec = await _apiClient.GetActivityByRecIdAsync(token, recIdFallback.Value);
                        if (byRec.Data != null)
                        {
                            var legacy = byRec.Data;
                            activity.ActividadId = Pick(activity.ActividadId, legacy.ActividadId);
                            activity.RecId = Pick(activity.RecId, legacy.RecId);
                            activity.AccountNum = Pick(activity.AccountNum, legacy.AccountNum);
                            activity.Name = Pick(activity.Name, legacy.Name);
                            activity.TransDate = Pick(activity.TransDate, legacy.TransDate);
                            activity.Country = Pick(activity.Country, legacy.Country);
                            activity.ActividadType = Pick(activity.ActividadType, legacy.ActividadType);
                            activity.TipoVisita = Pick(activity.TipoVisita, legacy.TipoVisita);
                            activity.Description = Pick(activity.Description, legacy.Description);
                            activity.Comentarios = Pick(activity.Comentarios, legacy.Comentarios);
                            activity.Antecedentes = Pick(activity.Antecedentes, legacy.Antecedentes);
                            activity.Conclusiones = Pick(activity.Conclusiones, legacy.Conclusiones);
                            activity.Asistentes = activity.Asistentes ?? legacy.Asistentes;
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
                    return CrmEnumHelper.NormalizeTipoVisitaValue(raw);
                }

                var recIdValue = !string.IsNullOrWhiteSpace(activity.RecId) ? activity.RecId : null
                    ?? (recIdFallback.HasValue ? recIdFallback.Value.ToString() : null)
                    ?? (long.TryParse(code, out var recIdParsed) ? recIdParsed.ToString() : string.Empty);

                var detail = new
                {
                    RecId = recIdValue,
                    ActividadId = activity.ActividadId ?? code,
                    AccountNum = activity.AccountNum ?? string.Empty,
                    VisitType = NormalizeVisitType(activity.TipoVisita ?? activity.ActividadType),
                    UserId = HttpContext.Session.GetString("AxUser") ?? string.Empty,
                    Description = activity.Description ?? string.Empty,
                    TransDate = NormalizeDate(activity.TransDate),
                    Comentarios = activity.Comentarios ?? string.Empty,
                    Antecedentes = activity.Antecedentes ?? string.Empty,
                    Conclusiones = activity.Conclusiones ?? string.Empty,
                    Cliente = activity.Name ?? string.Empty
                };

                ViewBag.CRMActividadTypeEnum = _enumLocalizer.GetActividadTypeItems();
                ViewBag.CRMTipoVisitaEnum = _enumLocalizer.GetTipoVisitaItems();
                ViewBag.CRMActividadOrigenEnum = _enumLocalizer.GetActividadOrigenItems();
                ViewBag.AsistenteTipoEnum = _enumLocalizer.GetAsistenteTipoItems();
                ViewBag.AxUser = HttpContext.Session.GetString("AxUser");
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
            var token = HttpContext.Session.GetString("Token");
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
                var token = HttpContext.Session.GetString("Token");
                if (string.IsNullOrEmpty(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                if (req == null)
                    return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

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
                var token = HttpContext.Session.GetString("Token");
                if (string.IsNullOrEmpty(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

                if (req == null || string.IsNullOrWhiteSpace(req.AsistenteTipo))
                    return BadRequest(new { success = false, message = _sr["Api_MissingAsistenteTipo"].Value });

                var axUser = HttpContext.Session.GetString("AxUser") ?? string.Empty;

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
                        AsistenteTipo = req.AsistenteTipo.Trim(),
                        AsistenteId = a.AsistenteId.Trim(),
                        ContactoRecId = string.Empty,
                        CreatedByUserId = axUser
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
                var token = HttpContext.Session.GetString("Token");
                if (string.IsNullOrEmpty(token))
                    return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

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
    }
}
