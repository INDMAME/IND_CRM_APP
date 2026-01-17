using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Linq;
using System.Threading;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Centralized HTTP client for IND CRM API (Axapta).
    /// Encapsulates login/refresh, environment data, accounts, contacts,
    /// activities CRUD and visit assistants. Controllers should not build URLs
    /// or headers directly.
    /// </summary>
    public class ApiClientService : ICrmApiClient
    {
        private readonly HttpClient _client;
        private readonly string _baseUrl;
        private readonly ITokenSessionService _tokenSession;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<ApiClientService> _logger;
        private readonly int _accountsTimeoutSeconds;

        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            Converters =
            {
                new ActivityDtoArrayConverter(),
                new ActivityAsistenteDtoArrayConverter(),
                new AccountDtoArrayConverter(),
                new ContactoDtoArrayConverter()
            }
        };

        public ApiClientService(
            HttpClient client,
            IConfiguration config,
            ITokenSessionService tokenSession,
            IHttpContextAccessor httpContextAccessor,
            IHostEnvironment environment,
            ILogger<ApiClientService> logger)
        {
            _client = client;
            _tokenSession = tokenSession;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _baseUrl = (config["ApiSettings:BaseUrl"] ?? string.Empty).TrimEnd('/');

            // Defensive config check to avoid empty or insecure API base URL.
            if (string.IsNullOrWhiteSpace(_baseUrl))
            {
                throw new InvalidOperationException(
                    "ApiSettings:BaseUrl is required. Configure it in appsettings.json or environment-specific settings.");
            }

            if (environment.IsProduction() && _baseUrl.StartsWith("http://", StringComparison.OrdinalIgnoreCase))
            {
                _logger.LogError("ApiSettings:BaseUrl must use HTTPS in Production. Current value starts with http://");
                throw new InvalidOperationException("ApiSettings:BaseUrl must use HTTPS in Production.");
            }

            if (int.TryParse(config["ApiSettings:TimeoutSeconds"], out var seconds) && seconds > 0)
            {
                _client.Timeout = TimeSpan.FromSeconds(seconds);
            }

            if (int.TryParse(config["ApiSettings:AccountsTimeoutSeconds"], out var accountSeconds) && accountSeconds > 0)
            {
                _accountsTimeoutSeconds = accountSeconds;
                // Ensure the HttpClient-level timeout is not shorter than the account search timeout.
                if (_client.Timeout < TimeSpan.FromSeconds(accountSeconds))
                {
                    _client.Timeout = TimeSpan.FromSeconds(accountSeconds);
                }
            }
            else
            {
                _accountsTimeoutSeconds = (int)_client.Timeout.TotalSeconds;
            }
        }

        private string BuildUrl(string relativePath) => $"{_baseUrl}/{relativePath.TrimStart('/')}";

        private static string SafeLogPayload(string? raw)
        {
            return string.IsNullOrWhiteSpace(raw) ? "<empty>" : $"len={raw.Length}";
        }

        // ======================================================
        // Authentication
        // ======================================================
        public async Task<LoginResult?> AuthenticateAsync(string username, string password)
        {
            var payload = new LoginRequest { Username = username, Password = password };
            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/auth/login"),
                Serialize(payload)
            );

            var response = DeserializeApiResponse<LoginEnvelope>(result, "Login");
            ApplyRefreshedToken(result.Headers, response.Data?.Expires);

            var login = MapLoginResult(response);
            ApplyRefreshedTokenFromBody(login);
            return login;
        }

        public async Task<LoginResult?> RefreshTokenAsync(string currentToken)
        {
            AddToken(currentToken);
            LogCompanyHeader("RefreshToken", requireCompany: false);

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/auth/refresh"),
                "{}"
            );

            var response = DeserializeApiResponse<LoginEnvelope>(result, "Refresh");
            ApplyRefreshedToken(result.Headers, response.Data?.Expires);

            var login = MapLoginResult(response);
            ApplyRefreshedTokenFromBody(login);
            return login;
        }

        // ======================================================
        // Entra context
        // ======================================================
        public async Task<IndEntraContextResponse> GetEntraContextAsync(string token, string entraOid, string appCode)
        {
            AddToken(token);
            LogCompanyHeader("GetEntraContext", requireCompany: false);

            var payload = new
            {
                entraOid = entraOid ?? string.Empty,
                appCode = appCode ?? string.Empty
            };

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/auth/entra/context"),
                Serialize(payload)
            );

            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
            {
                return new IndEntraContextResponse
                {
                    Success = result.IsSuccessStatusCode,
                    Message = result.ErrorMessage ?? "Empty response from entra context."
                };
            }

            try
            {
                var response = ParseEntraContextResponse(result.Raw, result.IsSuccessStatusCode);
                if (response.Items.Count == 0)
                {
                    _logger.LogWarning(
                        "Entra context response has no items. Success: {Success}. Message: {Message}. ErrorCode: {ErrorCode}. Raw: {Raw}",
                        response.Success,
                        response.Message ?? "<null>",
                        response.ErrorCode ?? "<null>",
                        SafeLogPayload(result.Raw));
                }

                return response;
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "JSON parse error in GetEntraContext. Raw: {Raw}", SafeLogPayload(result.Raw));
                return new IndEntraContextResponse
                {
                    Success = false,
                    Message = "Failed to parse entra context response."
                };
            }
        }

        // ======================================================
        // Environment
        // ======================================================
        public async Task<string> GetEnvironmentAsync(string token)
        {
            AddToken(token);
            LogCompanyHeader("GetEnvironment", requireCompany: true);

            var result = await HttpHelper.GetAsync(
                _client,
                BuildUrl("api/system/getEnvironmentName")
            );

            ThrowIfHttpFailed(result, "GetEnvironment");
            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
                return string.Empty;

            try
            {
                var envObj = JsonSerializer.Deserialize<EnvironmentEnvelope>(result.Raw, JsonOptions);
                var envValue = envObj?.Data?.Environment;
                if (string.IsNullOrWhiteSpace(envValue))
                {
                    envValue = envObj?.Items?.FirstOrDefault()?.Environment;
                }
                return string.IsNullOrWhiteSpace(envValue)
                    ? result.Raw.Replace("\"", string.Empty)
                    : envValue;
            }
            catch
            {
                return result.Raw.Replace("\"", string.Empty);
            }
        }

        // ======================================================
        // Company
        // ======================================================
        public async Task<string> GetCompanyNameAsync(string token)
        {
            AddToken(token);
            LogCompanyHeader("GetCompanyName", requireCompany: true);

            var result = await HttpHelper.GetAsync(
                _client,
                BuildUrl("api/system/getCompanyName")
            );

            ThrowIfHttpFailed(result, "GetCompanyName");
            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
                return string.Empty;

            try
            {
                var compObj = JsonSerializer.Deserialize<CompanyEnvelope>(result.Raw, JsonOptions);
                var companyValue = compObj?.Data?.CompanyName
                    ?? compObj?.Data?.Company
                    ?? compObj?.Data?.CompanyId;

                if (string.IsNullOrWhiteSpace(companyValue))
                {
                    var item = compObj?.Items?.FirstOrDefault();
                    companyValue = item?.CompanyName ?? item?.Company ?? item?.CompanyId;
                }

                return string.IsNullOrWhiteSpace(companyValue)
                    ? result.Raw.Replace("\"", string.Empty)
                    : companyValue;
            }
            catch
            {
                return result.Raw.Replace("\"", string.Empty);
            }
        }

        // ======================================================
        // Accounts
        // ======================================================
        public async Task<PagedApiResponse<AccountDto>> GetAccountsAsync(
            string token,
            string? accountNum,
            int page,
            int pageSize)
        {
            AddToken(token);
            LogCompanyHeader("GetAccounts", requireCompany: true);

            var payload = new
            {
                accountNum = accountNum ?? string.Empty,
                page,
                pageSize
            };

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(_accountsTimeoutSeconds));

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/accounts/listAccounts"),
                Serialize(payload),
                cts.Token
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializePagedResponse<AccountDto>(result, "GetAccounts");
        }

        // ======================================================
        // Contacts
        // ======================================================
        public async Task<PagedApiResponse<ContactoDto>> GetContactosAsync(
            string token,
            string accountNum,
            int page,
            int pageSize)
        {
            AddToken(token);
            LogCompanyHeader("GetContacts", requireCompany: true);

            var payload = new
            {
                accountNum = accountNum ?? string.Empty,
                page,
                pageSize
            };

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/accounts/listContacts"),
                Serialize(payload)
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializePagedResponse<ContactoDto>(result, "GetContacts");
        }

        // ======================================================
        // Activities
        // ======================================================
        public async Task<PagedApiResponse<ActivityDto>> GetActivitiesAsync(
            string token,
            ActivitiesFilter filter)
        {
            AddToken(token);
            LogCompanyHeader("GetActivities", requireCompany: true);

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/activities/list"),
                Serialize(filter)
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializePagedResponse<ActivityDto>(result, "GetActivities");
        }

        public async Task<ApiResponse<ActivityDto>> GetActivityByCodeAsync(string token, string actividadId)
        {
            AddToken(token);
            LogCompanyHeader("GetActivityByCode", requireCompany: true);

            var safeCode = Uri.EscapeDataString(actividadId ?? string.Empty);

            var result = await HttpHelper.GetAsync(
                _client,
                BuildUrl($"api/crm/activities/by-code/{safeCode}")
            );

            ApplyRefreshedToken(result.Headers, null);

            // Si la respuesta no parece JSON, devuelve el cuerpo como mensaje
            if (!LooksLikeJson(result.Raw))
            {
                return new ApiResponse<ActivityDto>
                {
                    Success = result.IsSuccessStatusCode,
                    Message = string.IsNullOrWhiteSpace(result.Raw) ? "Empty response" : result.Raw,
                    Data = null,
                    TraceId = TryGetTraceId(result.Headers)
                };
            }

            try
            {
                // 1) intenta deserializar como ApiResponse<ActivityDto>
                var parsedEnvelope = JsonSerializer.Deserialize<ApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                if (parsedEnvelope != null && parsedEnvelope.Data != null && !IsActivityEmpty(parsedEnvelope.Data))
                {
                    parsedEnvelope.TraceId ??= TryGetTraceId(result.Headers);
                    return parsedEnvelope;
                }

                // 1b) Algunos entornos devuelven un envelope paginado con Items.
                //     Toma el primer item si existe.
                try
                {
                    var pagedEnvelope = JsonSerializer.Deserialize<PagedApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                    var firstItem = pagedEnvelope?.GetAnyItems().FirstOrDefault();
                    if (firstItem != null && !IsActivityEmpty(firstItem))
                    {
                        return new ApiResponse<ActivityDto>
                        {
                            Success = pagedEnvelope!.Success,
                            Message = pagedEnvelope.Message,
                            ErrorCode = pagedEnvelope.ErrorCode,
                            Errors = pagedEnvelope.Errors ?? new List<IndValidationError>(),
                            Data = firstItem,
                            TraceId = pagedEnvelope.TraceId ?? TryGetTraceId(result.Headers)
                        };
                    }
                }
                catch
                {
                    // ignore paged parsing errors and continue with manual parsing
                }

                using var doc = JsonDocument.Parse(result.Raw);
                var root = doc.RootElement;

                ActivityDto? data = null;
                string? message = null;

                if (root.TryGetProperty("Message", out var msgProp) && msgProp.ValueKind == JsonValueKind.String)
                    message = msgProp.GetString();
                if (root.TryGetProperty("message", out var msgProp2) && msgProp2.ValueKind == JsonValueKind.String)
                    message ??= msgProp2.GetString();

                if (root.TryGetProperty("Data", out var dataProp))
                {
                    data = ParseActivityFromElement(dataProp);
                }
                else if (root.ValueKind == JsonValueKind.Array && root.GetArrayLength() > 0)
                {
                    data = ParseActivityFromElement(root[0]);
                }
                else if (root.ValueKind == JsonValueKind.Object)
                {
                    data = ParseActivityFromElement(root);
                }

                return new ApiResponse<ActivityDto>
                {
                    Success = result.IsSuccessStatusCode && data != null,
                    Message = data != null ? message ?? "OK" : message ?? "No data",
                    Data = data,
                    TraceId = TryGetTraceId(result.Headers)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetActivityByCode parse error. Raw: {Raw}", SafeLogPayload(result.Raw));
            }

            // Si llegamos aquí seguimos sin data; intenta parsear JSON embebido en el mensaje
            try
            {
                var embedded = result.Raw;

                // Si el mensaje viene envuelto en el envelope estándar ya deserializado
                if (LooksLikeJson(result.Raw))
                {
                    var envelope = JsonSerializer.Deserialize<ApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                    if (envelope?.Data != null)
                    {
                        envelope.TraceId ??= TryGetTraceId(result.Headers);
                        return envelope;
                    }
                    embedded = envelope?.Message ?? result.Raw;
                }

                if (!string.IsNullOrWhiteSpace(embedded))
                {
                    var normalized = embedded.Replace("\\u0022", "\"");
                    if (LooksLikeJson(normalized))
                    {
                        if (TryParseEnvelope(normalized, out var parsedFromMessage))
                        {
                            parsedFromMessage.TraceId ??= TryGetTraceId(result.Headers);
                            return parsedFromMessage;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetActivityByCode embedded parse error. Raw: {Raw}", SafeLogPayload(result.Raw));
            }

            return new ApiResponse<ActivityDto>
            {
                Success = false,
                Message = string.IsNullOrWhiteSpace(result.Raw)
                    ? result.ErrorMessage ?? "Failed to parse response for GetActivityByCode"
                    : result.Raw,
                TraceId = TryGetTraceId(result.Headers),
                Data = null
            };
        }

        private ActivityDto? ParseActivityFromElement(JsonElement el)
        {
            try
            {
                if (el.ValueKind == JsonValueKind.Null || el.ValueKind == JsonValueKind.Undefined)
                    return null;

                if (el.ValueKind == JsonValueKind.Array)
                {
                    if (el.GetArrayLength() == 0)
                        return null;

                    return ParseActivityFromElement(el[0]);
                }

                return el.Deserialize<ActivityDto>(JsonOptions);
            }
            catch
            {
                return null;
            }
        }

        // Treat a DTO with no meaningful fields as empty.
        private static bool IsActivityEmpty(ActivityDto dto)
        {
            if (dto == null) return true;

            return string.IsNullOrWhiteSpace(dto.ActividadId) &&
                   string.IsNullOrWhiteSpace(dto.RecId) &&
                   string.IsNullOrWhiteSpace(dto.AccountNum) &&
                   string.IsNullOrWhiteSpace(dto.Description) &&
                   string.IsNullOrWhiteSpace(dto.TransDate);
        }

        private static bool LooksLikeJson(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw)) return false;
            var trimmed = raw.TrimStart();
            return trimmed.StartsWith("{") || trimmed.StartsWith("[");
        }

        private bool TryParseEnvelope(string raw, out ApiResponse<ActivityDto> envelope)
        {
            envelope = new ApiResponse<ActivityDto>();
            try
            {
                using var doc = JsonDocument.Parse(raw);
                var root = doc.RootElement;

                envelope.Success = root.TryGetProperty("Success", out var s) && s.GetBoolean();
                envelope.Message = root.TryGetProperty("Message", out var m) && m.ValueKind == JsonValueKind.String ? m.GetString() : null;
                envelope.TraceId = root.TryGetProperty("TraceId", out var t) && t.ValueKind == JsonValueKind.String ? t.GetString() : null;

                if (root.TryGetProperty("Data", out var dataEl))
                {
                    envelope.Data = ParseActivityFromElement(dataEl);
                }
                else if (root.ValueKind == JsonValueKind.Object && root.GetRawText().Contains("ActividadId"))
                {
                    envelope.Data = ParseActivityFromElement(root);
                }

                return envelope.Data != null || envelope.Success;
            }
            catch
            {
                return false;
            }
        }

        public async Task<ApiResponse<ActivityDto>> GetActivityByRecIdAsync(string token, long recId)
        {
            AddToken(token);
            LogCompanyHeader("GetActivityByRecId", requireCompany: true);

            var result = await HttpHelper.GetAsync(
                _client,
                BuildUrl($"api/crm/activities/{recId}")
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializeApiResponse<ActivityDto>(result, "GetActivityByRecId");
        }

        public async Task<ApiResponse<object>> CreateActivityAsync(string token, CreateActivityRequest req)
        {
            AddToken(token);
            LogCompanyHeader("CreateActivity", requireCompany: true);

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/activities/create"),
                Serialize(req)
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializeApiResponse<object>(result, "CreateActivity");
        }

        public async Task<ApiResponse<object>> UpdateActivityAsync(string token, long recId, UpdateActivityRequest req)
        {
            AddToken(token);
            LogCompanyHeader("UpdateActivity", requireCompany: true);

            var result = await HttpHelper.PutAsync(
                _client,
                BuildUrl($"api/crm/activities/{recId}"),
                Serialize(req)
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializeApiResponse<object>(result, "UpdateActivity");
        }

        public async Task<ApiResponse<object>> DeleteActivityAsync(string token, long recId)
        {
            AddToken(token);
            LogCompanyHeader("DeleteActivity", requireCompany: true);

            var result = await HttpHelper.DeleteAsync(
                _client,
                BuildUrl($"api/crm/activities/{recId}")
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializeApiResponse<object>(result, "DeleteActivity");
        }

        // ======================================================
        // Visit assistants
        // ======================================================
        public async Task<ApiResponse<object>> CreateVisitaAsistenteAsync(string token, CreateVisitaAsistenteRequest req)
        {
            AddToken(token);
            LogCompanyHeader("CreateVisitaAsistente", requireCompany: true);

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/visits/createVisitaAsistente"),
                Serialize(req)
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializeApiResponse<object>(result, "CreateVisitaAsistente");
        }

        public async Task<ApiResponse<object>> DeleteVisitaAsistenteAsync(string token, DeleteVisitaAsistenteRequest req)
        {
            AddToken(token);
            LogCompanyHeader("DeleteVisitaAsistente", requireCompany: true);

            var result = await HttpHelper.DeleteAsync(
                _client,
                BuildUrl("api/crm/visits/deleteVisitaAsistente"),
                Serialize(req)
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializeApiResponse<object>(result, "DeleteVisitaAsistente");
        }

        // ======================================================
        // Speech
        // ======================================================
        public async Task<ApiResponse<string>> TranscribeSpeechAsync(
            string token,
            string languageId,
            Stream audioStream,
            string fileName,
            string? contentType,
            double? temperature = null,
            string? prompt = null,
            CancellationToken cancellationToken = default)
        {
            AddToken(token);
            LogCompanyHeader("TranscribeSpeech", requireCompany: true);

            var safeLanguageId = string.IsNullOrWhiteSpace(languageId) ? "auto" : languageId.Trim();
            var safeFileName = string.IsNullOrWhiteSpace(fileName) ? "audio.wav" : Path.GetFileName(fileName);

            using var form = new MultipartFormDataContent();
            form.Add(new StringContent(safeLanguageId), "languageId");

            if (temperature.HasValue)
            {
                var tempRaw = temperature.Value.ToString(System.Globalization.CultureInfo.InvariantCulture);
                form.Add(new StringContent(tempRaw), "temperature");
            }

            if (!string.IsNullOrWhiteSpace(prompt))
            {
                form.Add(new StringContent(prompt), "prompt");
            }

            using var fileContent = new StreamContent(audioStream);
            var mime = string.IsNullOrWhiteSpace(contentType) ? "audio/wav" : contentType.Trim();
            var isAllowedMime =
                mime.Equals("audio/wav", StringComparison.OrdinalIgnoreCase) ||
                mime.Equals("audio/x-wav", StringComparison.OrdinalIgnoreCase) ||
                mime.Equals("audio/wave", StringComparison.OrdinalIgnoreCase) ||
                mime.Equals("audio/vnd.wave", StringComparison.OrdinalIgnoreCase);
            if (!isAllowedMime)
            {
                mime = "audio/wav";
            }
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(mime);
            form.Add(fileContent, "audioFile", safeFileName);

            var result = await HttpHelper.PostMultipartAsync(
                _client,
                BuildUrl("api/speech/transcribe"),
                form,
                cancellationToken
            );

            ApplyRefreshedToken(result.Headers, null);

            var response = DeserializeApiResponse<string>(result, "SpeechTranscribe");
            if (string.IsNullOrWhiteSpace(response.Data))
            {
                var extracted = TryExtractSpeechText(result.Raw);
                if (!string.IsNullOrWhiteSpace(extracted))
                {
                    response.Data = extracted;
                }
            }

            if (string.IsNullOrWhiteSpace(response.Data))
            {
                _logger.LogWarning(
                    "Speech transcribe returned empty data. HttpSuccess: {HttpSuccess} StatusCode: {StatusCode} Success: {Success} ErrorCode: {ErrorCode} Message: {Message} RawLen: {RawLen}",
                    result.IsSuccessStatusCode,
                    (int)result.StatusCode,
                    response.Success,
                    response.ErrorCode,
                    response.Message,
                    result.Raw?.Length ?? 0);
            }

            return response;
        }

        // ======================================================
        // Helpers
        // ======================================================
        private static string Serialize(object payload) =>
            JsonSerializer.Serialize(payload);

        private IndEntraContextResponse ParseEntraContextResponse(string raw, bool httpSuccess)
        {
            using var doc = JsonDocument.Parse(raw);
            var root = doc.RootElement;

            var response = new IndEntraContextResponse
            {
                Success = TryGetBool(root, "success") ?? httpSuccess,
                Message = TryGetString(root, "message"),
                ErrorCode = TryGetString(root, "errorCode")
            };

            var items = ExtractContextItems(root);
            if (items.Count == 0 && TryGetPropertyInsensitive(root, "data", out var dataEl))
            {
                items = ExtractContextItems(dataEl);
            }

            response.Items = items;
            return response;
        }

        private List<IndEntraContextItem> ExtractContextItems(JsonElement element)
        {
            if (element.ValueKind == JsonValueKind.Array)
            {
                var list = DeserializeContextList(element);
                if (list.Count > 0)
                    return list;

                foreach (var entry in element.EnumerateArray())
                {
                    var nested = ExtractContextItems(entry);
                    if (nested.Count > 0)
                        return nested;
                }

                return new List<IndEntraContextItem>();
            }

            if (element.ValueKind == JsonValueKind.Object)
            {
                if (TryGetPropertyInsensitive(element, "items", out var itemsEl))
                {
                    if (itemsEl.ValueKind == JsonValueKind.Array)
                        return DeserializeContextList(itemsEl);

                    if (itemsEl.ValueKind == JsonValueKind.Object)
                    {
                        var item = TryDeserializeContextItem(itemsEl);
                        if (item != null)
                            return new List<IndEntraContextItem> { item };
                    }

                    if (itemsEl.ValueKind == JsonValueKind.String)
                    {
                        var fromString = TryParseContextItemsFromString(itemsEl.GetString());
                        if (fromString.Count > 0)
                            return fromString;
                    }
                }

                if (TryGetPropertyInsensitive(element, "data", out var dataEl))
                {
                    var nested = ExtractContextItems(dataEl);
                    if (nested.Count > 0)
                        return nested;
                }

                if (TryGetPropertyInsensitive(element, "result", out var resultEl))
                {
                    var nested = ExtractContextItems(resultEl);
                    if (nested.Count > 0)
                        return nested;
                }

                if (TryGetPropertyInsensitive(element, "payload", out var payloadEl))
                {
                    var nested = ExtractContextItems(payloadEl);
                    if (nested.Count > 0)
                        return nested;
                }

                if (TryGetPropertyInsensitive(element, "header", out _))
                {
                    var item = TryDeserializeContextItem(element);
                    if (item != null)
                        return new List<IndEntraContextItem> { item };
                }

                foreach (var prop in element.EnumerateObject())
                {
                    if (prop.Value.ValueKind == JsonValueKind.Object ||
                        prop.Value.ValueKind == JsonValueKind.Array)
                    {
                        var nested = ExtractContextItems(prop.Value);
                        if (nested.Count > 0)
                            return nested;
                    }

                    if (prop.Value.ValueKind == JsonValueKind.String)
                    {
                        var fromString = TryParseContextItemsFromString(prop.Value.GetString());
                        if (fromString.Count > 0)
                            return fromString;
                    }
                }
            }

            return new List<IndEntraContextItem>();
        }

        private List<IndEntraContextItem> DeserializeContextList(JsonElement itemsEl)
        {
            try
            {
                return JsonSerializer.Deserialize<List<IndEntraContextItem>>(itemsEl.GetRawText(), JsonOptions)
                    ?? new List<IndEntraContextItem>();
            }
            catch
            {
                return new List<IndEntraContextItem>();
            }
        }

        // Tries to deserialize a single context item from a JSON object.
        private IndEntraContextItem? TryDeserializeContextItem(JsonElement element)
        {
            try
            {
                return element.Deserialize<IndEntraContextItem>(JsonOptions);
            }
            catch
            {
                return null;
            }
        }

        // Parses context items from a JSON string payload if present.
        private List<IndEntraContextItem> TryParseContextItemsFromString(string? raw)
        {
            if (!LooksLikeJson(raw))
                return new List<IndEntraContextItem>();

            try
            {
                using var doc = JsonDocument.Parse(raw!);
                return ExtractContextItems(doc.RootElement);
            }
            catch
            {
                return new List<IndEntraContextItem>();
            }
        }

        private static bool? TryGetBool(JsonElement root, string name)
        {
            if (!TryGetPropertyInsensitive(root, name, out var el))
                return null;

            if (el.ValueKind == JsonValueKind.True || el.ValueKind == JsonValueKind.False)
                return el.GetBoolean();

            if (el.ValueKind == JsonValueKind.Number && el.TryGetInt32(out var number))
                return number != 0;

            if (el.ValueKind == JsonValueKind.String)
            {
                var raw = el.GetString();
                if (bool.TryParse(raw, out var b))
                    return b;
                if (int.TryParse(raw, out var i))
                    return i != 0;
            }

            return null;
        }

        private static string? TryGetString(JsonElement root, string name)
        {
            if (!TryGetPropertyInsensitive(root, name, out var el))
                return null;

            return el.ValueKind == JsonValueKind.String ? el.GetString() : null;
        }

        private static bool TryGetPropertyInsensitive(JsonElement root, string name, out JsonElement value)
        {
            if (root.TryGetProperty(name, out value))
                return true;

            var alt = char.ToUpperInvariant(name[0]) + name[1..];
            if (root.TryGetProperty(alt, out value))
                return true;

            var lower = name.ToLowerInvariant();
            if (root.TryGetProperty(lower, out value))
                return true;

            value = default;
            return false;
        }

        private static readonly string[] SpeechTextKeys = new[]
        {
            "text",
            "transcript",
            "transcription"
        };

        // Try to pull transcription text from non-standard speech responses.
        private static string? TryExtractSpeechText(string raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            try
            {
                using var doc = JsonDocument.Parse(raw);
                var root = doc.RootElement;

                if (TryGetPropertyInsensitive(root, "items", out var itemsEl) &&
                    itemsEl.ValueKind == JsonValueKind.Array)
                {
                    var fromItems = ExtractSpeechTextFromArray(itemsEl);
                    if (!string.IsNullOrWhiteSpace(fromItems))
                        return fromItems;
                }

                if (TryGetPropertyInsensitive(root, "data", out var dataEl))
                {
                    if (dataEl.ValueKind == JsonValueKind.String)
                        return dataEl.GetString();

                    if (dataEl.ValueKind == JsonValueKind.Array)
                    {
                        var fromData = ExtractSpeechTextFromArray(dataEl);
                        if (!string.IsNullOrWhiteSpace(fromData))
                            return fromData;
                    }
                }

                return FindSpeechText(root, 0, 5);
            }
            catch
            {
                // Ignore parsing failures and let the caller handle the empty response.
            }

            return null;
        }

        // Extract a transcript from array-based payloads.
        private static string? ExtractSpeechTextFromArray(JsonElement arrayEl)
        {
            foreach (var item in arrayEl.EnumerateArray())
            {
                if (item.ValueKind == JsonValueKind.String)
                {
                    var value = item.GetString();
                    if (!string.IsNullOrWhiteSpace(value))
                        return value;
                    continue;
                }

                if (item.ValueKind == JsonValueKind.Object || item.ValueKind == JsonValueKind.Array)
                {
                    var found = FindSpeechText(item, 0, 5);
                    if (!string.IsNullOrWhiteSpace(found))
                        return found;
                }
            }

            return null;
        }

        // Find a text field in nested JSON payloads.
        private static string? FindSpeechText(JsonElement element, int depth, int maxDepth)
        {
            if (depth > maxDepth)
                return null;

            if (element.ValueKind == JsonValueKind.Object)
            {
                foreach (var key in SpeechTextKeys)
                {
                    if (TryGetPropertyInsensitive(element, key, out var textEl) &&
                        textEl.ValueKind == JsonValueKind.String)
                    {
                        return textEl.GetString();
                    }
                }

                foreach (var prop in element.EnumerateObject())
                {
                    var found = FindSpeechText(prop.Value, depth + 1, maxDepth);
                    if (!string.IsNullOrWhiteSpace(found))
                        return found;
                }
            }
            else if (element.ValueKind == JsonValueKind.Array)
            {
                foreach (var item in element.EnumerateArray())
                {
                    var found = FindSpeechText(item, depth + 1, maxDepth);
                    if (!string.IsNullOrWhiteSpace(found))
                        return found;
                }
            }

            return null;
        }

        private ApiResponse<T> DeserializeApiResponse<T>(HttpResult result, string operation)
        {
            if (string.IsNullOrWhiteSpace(result.Raw))
            {
                LogHttpFailure(result, operation);
                return new ApiResponse<T>
                {
                    Success = result.IsSuccessStatusCode,
                    Message = result.ErrorMessage ?? $"Empty response for {operation}",
                    TraceId = TryGetTraceId(result.Headers)
                };
            }

            try
            {
                var parsed = JsonSerializer.Deserialize<ApiResponse<T>>(result.Raw, JsonOptions);
                if (parsed != null)
                {
                    parsed.TraceId ??= TryGetTraceId(result.Headers);
                    return parsed;
                }
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "JSON deserialization failed for {Operation}. Raw: {Raw}", operation, SafeLogPayload(result.Raw));
            }

            // Fallback: intenta extraer Data o deserializar directamente T
            try
            {
                using var doc = JsonDocument.Parse(result.Raw);
                var root = doc.RootElement;

                // Si root tiene propiedad Data
                if (root.TryGetProperty("Data", out var dataElement))
                {
                    var dataObj = dataElement.Deserialize<T>(JsonOptions);
                    return new ApiResponse<T>
                    {
                        Success = result.IsSuccessStatusCode,
                        Message = TryGetMessage(root),
                        Data = dataObj,
                        TraceId = TryGetTraceId(result.Headers)
                    };
                }

                // Si no hay Data, intenta mapear root a T directamente
                var direct = root.Deserialize<T>(JsonOptions);
                return new ApiResponse<T>
                {
                    Success = result.IsSuccessStatusCode,
                    Message = TryGetMessage(root),
                    Data = direct,
                    TraceId = TryGetTraceId(result.Headers)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Fallback deserialization failed for {Operation}. Raw: {Raw}", operation, SafeLogPayload(result.Raw));
            }

            LogHttpFailure(result, operation);
            return new ApiResponse<T>
            {
                Success = result.IsSuccessStatusCode,
                Message = result.ErrorMessage ?? $"Failed to parse response for {operation}",
                TraceId = TryGetTraceId(result.Headers)
            };
        }

        private PagedApiResponse<T> DeserializePagedResponse<T>(HttpResult result, string operation)
        {
            if (string.IsNullOrWhiteSpace(result.Raw))
            {
                LogHttpFailure(result, operation);
                return new PagedApiResponse<T>
                {
                    Success = result.IsSuccessStatusCode,
                    Message = result.ErrorMessage ?? $"Empty response for {operation}",
                    TraceId = TryGetTraceId(result.Headers)
                };
            }

            try
            {
                var parsed = JsonSerializer.Deserialize<PagedApiResponse<T>>(result.Raw, JsonOptions);
                if (parsed != null)
                {
                    parsed.TraceId ??= TryGetTraceId(result.Headers);
                    return parsed;
                }
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "JSON deserialization failed for {Operation}. Raw: {Raw}", operation, SafeLogPayload(result.Raw));
            }

            LogHttpFailure(result, operation);
            return new PagedApiResponse<T>
            {
                Success = result.IsSuccessStatusCode,
                Message = result.ErrorMessage ?? $"Failed to parse response for {operation}",
                TraceId = TryGetTraceId(result.Headers)
            };
        }

        private void ThrowIfHttpFailed(HttpResult result, string operation)
        {
            if (result.IsSuccessStatusCode)
                return;

            var message = result.ErrorMessage ?? $"HTTP error in {operation}";
            _logger.LogError("API call failed: {Message}. Status: {Status}. Body: {Body}", message, result.StatusCode, SafeLogPayload(result.Raw));
            throw new ApiException(message, result.StatusCode, result.Raw, result.Headers);
        }

        private void LogHttpFailure(HttpResult result, string operation)
        {
            if (result.IsSuccessStatusCode)
                return;

            _logger.LogError(
                "API call failed: {Operation}. Status: {Status}. Message: {Error}. Body: {Body}",
                operation,
                result.StatusCode,
                result.ErrorMessage,
                SafeLogPayload(result.Raw)
            );
        }

        private static string? TryGetMessage(JsonElement root)
        {
            if (root.TryGetProperty("Message", out var msgProp) && msgProp.ValueKind == JsonValueKind.String)
            {
                return msgProp.GetString();
            }
            if (root.TryGetProperty("message", out var msgLower) && msgLower.ValueKind == JsonValueKind.String)
            {
                return msgLower.GetString();
            }
            return null;
        }

        private void ApplyRefreshedToken(IDictionary<string, IEnumerable<string>> headers, DateTime? expires)
        {
            if (headers == null || headers.Count == 0)
                return;

            if (!headers.TryGetValue("X-Refreshed-Token", out var values))
                return;

            var newToken = values?.FirstOrDefault();
            if (string.IsNullOrWhiteSpace(newToken))
                return;

            ApplyTokenToSessionAndResponse(newToken, expires);
        }

        private void ApplyRefreshedTokenFromBody(LoginResult? login)
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Token))
                return;

            var expires = login.Expires != default ? login.Expires : (DateTime?)null;
            ApplyTokenToSessionAndResponse(login.Token, expires);
        }

        private void ApplyTokenToSessionAndResponse(string newToken, DateTime? expires)
        {
            _tokenSession.SetToken(newToken, expires);
            AddToken(newToken);
        }

        private void AddToken(string token)
        {
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            ApplyCompanyHeader();
        }

        private void ApplyCompanyHeader()
        {
            _client.DefaultRequestHeaders.Remove("X-IND-Company");

            var companyId = GetSelectedCompanyId();
            if (string.IsNullOrWhiteSpace(companyId))
                return;

            _client.DefaultRequestHeaders.Add("X-IND-Company", companyId);
        }

        // Reads the current company id from session, if present.
        private string? GetSelectedCompanyId()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var companyId = ctx.Session.GetString("INDCompanySelected");
            return string.IsNullOrWhiteSpace(companyId) ? null : companyId;
        }

        // Logs whether the company header is present for a given operation.
        private void LogCompanyHeader(string operation, bool requireCompany)
        {
            var companyId = GetSelectedCompanyId();
            if (string.IsNullOrWhiteSpace(companyId))
            {
                if (requireCompany)
                {
                    _logger.LogWarning("X-IND-Company not set for {Operation}.", operation);
                }
                else
                {
                    _logger.LogInformation("X-IND-Company not set for {Operation}.", operation);
                }

                return;
            }

            _logger.LogInformation("X-IND-Company={CompanyId} for {Operation}.", companyId, operation);
        }

        private static string? TryGetTraceId(IDictionary<string, IEnumerable<string>> headers)
        {
            if (headers == null || headers.Count == 0)
                return null;

            if (headers.TryGetValue("TraceId", out var trace))
                return trace.FirstOrDefault();

            if (headers.TryGetValue("X-TraceId", out var xtrace))
                return xtrace.FirstOrDefault();

            if (headers.TryGetValue("Request-Id", out var req))
                return req.FirstOrDefault();

            return null;
        }

        private LoginResult MapLoginResult(ApiResponse<LoginEnvelope> response)
        {
            var data = response.Data;
            var token = data?.Token
                        ?? data?.Jwt
                        ?? data?.AccessToken
                        ?? data?.BearerToken
                        ?? string.Empty;

            var expires = data?.Expires
                         ?? ParseDate(data?.Expiration)
                         ?? ParseExpiresInSeconds(data?.ExpiresInSeconds);

            return new LoginResult
            {
                Success = response.Success,
                Token = token,
                Message = response.Message ?? string.Empty,
                Expires = expires ?? default,
                ErrorCode = response.ErrorCode,
                Errors = response.Errors,
                TraceId = response.TraceId
            };
        }

        private static DateTime? ParseDate(string? dateString)
        {
            if (string.IsNullOrWhiteSpace(dateString))
                return null;

            if (DateTime.TryParse(dateString, null, System.Globalization.DateTimeStyles.RoundtripKind, out var dt))
                return dt;

            return null;
        }

        private static DateTime? ParseExpiresInSeconds(int? seconds)
        {
            if (!seconds.HasValue)
                return null;

            return DateTime.UtcNow.AddSeconds(seconds.Value);
        }

        // ======================================================
        // Internal DTOs used only for deserialization
        // ======================================================
        private class EnvironmentEnvelope
        {
            public EnvironmentData? Data { get; set; }
            public List<EnvironmentData>? Items { get; set; }
        }

        private class EnvironmentData
        {
            public string Environment { get; set; } = string.Empty;
        }

        private class CompanyEnvelope
        {
            public CompanyData? Data { get; set; }
            public List<CompanyData>? Items { get; set; }
        }

        private class CompanyData
        {
            public string CompanyId { get; set; } = string.Empty;
            public string CompanyName { get; set; } = string.Empty;
            public string Company { get; set; } = string.Empty;
        }

        private class LoginEnvelope
        {
            public string? Token { get; set; }
            public string? Jwt { get; set; }
            public string? AccessToken { get; set; }
            public string? BearerToken { get; set; }
            public DateTime? Expires { get; set; }
            public string? Expiration { get; set; }
            public int? ExpiresInSeconds { get; set; }
        }
    }
}
