using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services.ApiHelpers;
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

        // Normalize a quoted string response into a plain value.
        private static string NormalizeQuotedValue(string? raw)
        {
            return string.IsNullOrWhiteSpace(raw) ? string.Empty : raw.Replace("\"", string.Empty);
        }

        // Extracts the environment name from the API response payload.
        private static string ExtractEnvironmentValue(string raw)
        {
            try
            {
                var envObj = JsonSerializer.Deserialize<EnvironmentEnvelope>(raw, JsonOptions);
                var envValue = envObj?.Data?.Environment;
                if (string.IsNullOrWhiteSpace(envValue))
                {
                    envValue = envObj?.Items?.FirstOrDefault()?.Environment;
                }

                return string.IsNullOrWhiteSpace(envValue)
                    ? NormalizeQuotedValue(raw)
                    : envValue;
            }
            catch
            {
                return NormalizeQuotedValue(raw);
            }
        }

        // Extracts the company name from the API response payload.
        private static string ExtractCompanyValue(string raw)
        {
            try
            {
                var compObj = JsonSerializer.Deserialize<CompanyEnvelope>(raw, JsonOptions);
                var companyValue = compObj?.Data?.CompanyName
                    ?? compObj?.Data?.Company
                    ?? compObj?.Data?.CompanyId;

                if (string.IsNullOrWhiteSpace(companyValue))
                {
                    var item = compObj?.Items?.FirstOrDefault();
                    companyValue = item?.CompanyName ?? item?.Company ?? item?.CompanyId;
                }

                return string.IsNullOrWhiteSpace(companyValue)
                    ? NormalizeQuotedValue(raw)
                    : companyValue;
            }
            catch
            {
                return NormalizeQuotedValue(raw);
            }
        }

        // Escapes a value used in query string parameters.
        private static string EscapeQueryValue(string? value)
        {
            return Uri.EscapeDataString(value ?? string.Empty);
        }

        // Escapes a value used in URL path segments.
        private static string EscapePathSegment(string? value)
        {
            return Uri.EscapeDataString(value ?? string.Empty);
        }

        // Returns a trimmed string or null when it has no value.
        private static string? NormalizeOptionalText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        // Prepares auth headers and logs company header state for an operation.
        private void PrepareRequestHeaders(
            string token,
            string operation,
            bool requireCompany,
            bool includeCompanyHeader = true,
            bool includeAxUserHeader = true)
        {
            AddToken(token, includeCompanyHeader, includeAxUserHeader);
            LogCompanyHeader(operation, requireCompany);
        }

        // Sends a GET request to the API base URL.
        private Task<HttpResult> SendGetAsync(string relativePath, CancellationToken cancellationToken = default)
        {
            return HttpHelper.GetAsync(_client, BuildUrl(relativePath), cancellationToken);
        }

        // Sends a POST request with a JSON body.
        private Task<HttpResult> SendPostAsync(string relativePath, string jsonBody, CancellationToken cancellationToken = default)
        {
            return HttpHelper.PostAsync(_client, BuildUrl(relativePath), jsonBody, cancellationToken);
        }

        // Sends a POST request with a JSON-serialized payload.
        private Task<HttpResult> SendPostJsonAsync(string relativePath, object payload, CancellationToken cancellationToken = default)
        {
            return SendPostAsync(relativePath, Serialize(payload), cancellationToken);
        }

        // Sends a POST request with multipart form data.
        private Task<HttpResult> SendPostMultipartAsync(
            string relativePath,
            MultipartFormDataContent formData,
            CancellationToken cancellationToken = default)
        {
            return HttpHelper.PostMultipartAsync(_client, BuildUrl(relativePath), formData, cancellationToken);
        }

        // Sends a PUT request with a JSON body.
        private Task<HttpResult> SendPutAsync(string relativePath, string jsonBody, CancellationToken cancellationToken = default)
        {
            return HttpHelper.PutAsync(_client, BuildUrl(relativePath), jsonBody, cancellationToken);
        }

        // Sends a PUT request with a JSON-serialized payload.
        private Task<HttpResult> SendPutJsonAsync(string relativePath, object payload, CancellationToken cancellationToken = default)
        {
            return SendPutAsync(relativePath, Serialize(payload), cancellationToken);
        }

        // Sends a DELETE request without a body.
        private Task<HttpResult> SendDeleteAsync(string relativePath, CancellationToken cancellationToken = default)
        {
            return HttpHelper.DeleteAsync(_client, BuildUrl(relativePath), cancellationToken);
        }

        // Sends a DELETE request with a JSON-serialized payload.
        private Task<HttpResult> SendDeleteJsonAsync(string relativePath, object payload, CancellationToken cancellationToken = default)
        {
            return HttpHelper.DeleteAsync(_client, BuildUrl(relativePath), Serialize(payload), cancellationToken);
        }

        // Applies refreshed token headers and deserializes a standard response.
        private ApiResponse<T> BuildApiResponse<T>(HttpResult result, string operation)
        {
            ApplyRefreshedToken(result.Headers, null);
            return DeserializeApiResponse<T>(result, operation);
        }

        // Applies refreshed token headers and deserializes a paged response.
        private PagedApiResponse<T> BuildPagedResponse<T>(HttpResult result, string operation)
        {
            ApplyRefreshedToken(result.Headers, null);
            return DeserializePagedResponse<T>(result, operation);
        }

        // ======================================================
        // Authentication
        // ======================================================
        public async Task<LoginResult?> AuthenticateAsync(string username, string password)
        {
            var payload = new LoginRequest { Username = username, Password = password };
            var result = await SendPostJsonAsync(ApiRoutes.AuthLogin, payload);

            var response = DeserializeApiResponse<LoginEnvelope>(result, "Login");
            ApplyRefreshedToken(result.Headers, response.Data?.Expires);

            var login = MapLoginResult(response);
            ApplyRefreshedTokenFromBody(login);
            return login;
        }

        public async Task<LoginResult?> RefreshTokenAsync(string currentToken)
        {
            PrepareRequestHeaders(currentToken, "RefreshToken", requireCompany: false);

            var result = await SendPostAsync(ApiRoutes.AuthRefresh, "{}");

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
            PrepareRequestHeaders(
                token,
                "GetEntraContext",
                requireCompany: false,
                includeCompanyHeader: false,
                includeAxUserHeader: false);

            var payload = new
            {
                entraOid = entraOid ?? string.Empty,
                appCode = appCode ?? string.Empty
            };

            var result = await SendPostJsonAsync(ApiRoutes.AuthEntraContext, payload);

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
                var response = EntraContextParser.Parse(result.Raw, result.IsSuccessStatusCode, JsonOptions);
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
            PrepareRequestHeaders(token, "GetEnvironment", requireCompany: true);

            var result = await SendGetAsync(ApiRoutes.SystemEnvironment);

            ThrowIfHttpFailed(result, "GetEnvironment");
            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
                return string.Empty;

            return ExtractEnvironmentValue(result.Raw);
        }

        // ======================================================
        // Company
        // ======================================================
        public async Task<string> GetCompanyNameAsync(string token)
        {
            PrepareRequestHeaders(token, "GetCompanyName", requireCompany: true);

            var result = await SendGetAsync(ApiRoutes.SystemCompany);

            ThrowIfHttpFailed(result, "GetCompanyName");
            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
                return string.Empty;

            return ExtractCompanyValue(result.Raw);
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
            PrepareRequestHeaders(token, "GetAccounts", requireCompany: true);

            var payload = new
            {
                accountNum = accountNum ?? string.Empty,
                page,
                pageSize
            };

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(_accountsTimeoutSeconds));

            var result = await SendPostJsonAsync(
                ApiRoutes.AccountsList,
                payload,
                cts.Token);
            return BuildPagedResponse<AccountDto>(result, "GetAccounts");
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
            PrepareRequestHeaders(token, "GetContacts", requireCompany: true);

            var payload = new
            {
                accountNum = accountNum ?? string.Empty,
                page,
                pageSize
            };

            var result = await SendPostJsonAsync(ApiRoutes.ContactsList, payload);
            return BuildPagedResponse<ContactoDto>(result, "GetContacts");
        }

        // ======================================================
        // Activities
        // ======================================================
        public async Task<PagedApiResponse<ActivityDto>> GetActivitiesAsync(
            string token,
            ActivitiesFilter filter)
        {
            PrepareRequestHeaders(token, "GetActivities", requireCompany: true);

            var result = await SendPostJsonAsync(ApiRoutes.ActivitiesList, filter);
            return BuildPagedResponse<ActivityDto>(result, "GetActivities");
        }

        public async Task<ApiResponse<ActivityDto>> GetActivityByCodeAsync(string token, string actividadId)
        {
            PrepareRequestHeaders(token, "GetActivityByCode", requireCompany: true);

            var safeCode = EscapePathSegment(actividadId);

            var result = await SendGetAsync(ApiRoutes.ActivityByCode(safeCode));

            ApplyRefreshedToken(result.Headers, null);

            // If the response does not look like JSON, return the body as the message.
            if (!ApiPayloadParser.LooksLikeJson(result.Raw))
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
                // 1) Try to deserialize as ApiResponse<ActivityDto>.
                var parsedEnvelope = JsonSerializer.Deserialize<ApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                if (parsedEnvelope != null && parsedEnvelope.Data != null && !ApiPayloadParser.IsActivityEmpty(parsedEnvelope.Data))
                {
                    parsedEnvelope.TraceId ??= TryGetTraceId(result.Headers);
                    return parsedEnvelope;
                }

                // 1b) Some environments return a paged envelope with Items.
                //     Take the first item when present.
                try
                {
                    var pagedEnvelope = JsonSerializer.Deserialize<PagedApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                    var firstItem = pagedEnvelope?.GetAnyItems().FirstOrDefault();
                    if (firstItem != null && !ApiPayloadParser.IsActivityEmpty(firstItem))
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
                    data = ApiPayloadParser.ParseActivityFromElement(dataProp, JsonOptions);
                }
                else if (root.ValueKind == JsonValueKind.Array && root.GetArrayLength() > 0)
                {
                    data = ApiPayloadParser.ParseActivityFromElement(root[0], JsonOptions);
                }
                else if (root.ValueKind == JsonValueKind.Object)
                {
                    data = ApiPayloadParser.ParseActivityFromElement(root, JsonOptions);
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

            // If we get here with no data, try parsing JSON embedded in the message.
            try
            {
                var embedded = result.Raw;

                // If the message is already wrapped in the standard envelope.
                if (ApiPayloadParser.LooksLikeJson(result.Raw))
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
                    if (ApiPayloadParser.LooksLikeJson(normalized))
                    {
                        if (ApiPayloadParser.TryParseEnvelope(normalized, JsonOptions, out var parsedFromMessage))
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


        public async Task<ApiResponse<ActivityDto>> GetActivityByRecIdAsync(string token, long recId)
        {
            PrepareRequestHeaders(token, "GetActivityByRecId", requireCompany: true);

            var result = await SendGetAsync(ApiRoutes.ActivityByRecId(recId));
            return BuildApiResponse<ActivityDto>(result, "GetActivityByRecId");
        }

        public async Task<ApiResponse<object>> CreateActivityAsync(string token, CreateActivityRequest req)
        {
            PrepareRequestHeaders(token, "CreateActivity", requireCompany: true);

            var result = await SendPostJsonAsync(ApiRoutes.ActivitiesCreate, req);
            return BuildApiResponse<object>(result, "CreateActivity");
        }

        public async Task<ApiResponse<object>> UpdateActivityAsync(string token, long recId, UpdateActivityRequest req)
        {
            PrepareRequestHeaders(token, "UpdateActivity", requireCompany: true);

            var result = await SendPutJsonAsync(ApiRoutes.ActivityByRecId(recId), req);
            return BuildApiResponse<object>(result, "UpdateActivity");
        }

        public async Task<ApiResponse<object>> DeleteActivityAsync(string token, long recId)
        {
            PrepareRequestHeaders(token, "DeleteActivity", requireCompany: true);

            var result = await SendDeleteAsync(ApiRoutes.ActivityByRecId(recId));
            return BuildApiResponse<object>(result, "DeleteActivity");
        }

        // ======================================================
        // Visit assistants
        // ======================================================
        public async Task<ApiResponse<object>> CreateVisitaAsistenteAsync(string token, CreateVisitaAsistenteRequest req)
        {
            PrepareRequestHeaders(token, "CreateVisitaAsistente", requireCompany: true);

            var result = await SendPostJsonAsync(ApiRoutes.VisitsCreateAsistente, req);
            return BuildApiResponse<object>(result, "CreateVisitaAsistente");
        }

        public async Task<ApiResponse<object>> DeleteVisitaAsistenteAsync(string token, DeleteVisitaAsistenteRequest req)
        {
            PrepareRequestHeaders(token, "DeleteVisitaAsistente", requireCompany: true);

            var result = await SendDeleteJsonAsync(ApiRoutes.VisitsDeleteAsistente, req);
            return BuildApiResponse<object>(result, "DeleteVisitaAsistente");
        }

        // ======================================================
        // Expense sheets
        // ======================================================
        public async Task<ApiResponse<ExpenseSheetCreateResponseData>> CreateExpenseSheetAsync(
            string token,
            ExpenseSheetCreateRequest req)
        {
            PrepareRequestHeaders(token, "CreateExpenseSheet", requireCompany: true);

            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheets, req);
            return BuildApiResponse<ExpenseSheetCreateResponseData>(result, "CreateExpenseSheet");
        }

        public async Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetDetailAsync(
            string token,
            string hojaGastosId)
        {
            PrepareRequestHeaders(token, "GetExpenseSheetDetail", requireCompany: true);

            var safeId = EscapePathSegment(hojaGastosId);
            var result = await SendGetAsync(ApiRoutes.ExpenseSheetById(safeId));
            return BuildPagedResponse<ExpenseSheetDetailDto>(result, "GetExpenseSheetDetail");
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetHeaderAsync(
            string token,
            string hojaGastosId,
            ExpenseSheetUpdateRequest req)
        {
            PrepareRequestHeaders(token, "UpdateExpenseSheetHeader", requireCompany: true);

            var safeId = EscapePathSegment(hojaGastosId);
            var result = await SendPutJsonAsync(ApiRoutes.ExpenseSheetById(safeId), req);
            return BuildApiResponse<object>(result, "UpdateExpenseSheetHeader");
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetLineAsync(
            string token,
            string hojaGastosId,
            string lineRecId,
            ExpenseSheetLineRequest req)
        {
            PrepareRequestHeaders(token, "UpdateExpenseSheetLine", requireCompany: true);

            var safeSheetId = EscapePathSegment(hojaGastosId);
            var safeLineId = EscapePathSegment(lineRecId);
            var result = await SendPutJsonAsync(ApiRoutes.ExpenseSheetLine(safeSheetId, safeLineId), req);
            return BuildApiResponse<object>(result, "UpdateExpenseSheetLine");
        }

        public async Task<ApiResponse<object>> DeleteExpenseSheetLineAsync(
            string token,
            string hojaGastosId,
            string lineRecId,
            bool deleteWholeSheet)
        {
            PrepareRequestHeaders(token, "DeleteExpenseSheetLine", requireCompany: true);

            var safeSheetId = EscapePathSegment(hojaGastosId);
            var safeLineId = EscapePathSegment(lineRecId ?? "0");
            var deleteFlag = deleteWholeSheet ? "1" : "0";

            var result = await SendDeleteAsync(
                ApiRoutes.ExpenseSheetLineDelete(safeSheetId, safeLineId, deleteFlag));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetLine");
        }

        public async Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetsAsync(
            string token,
            ExpenseSheetListApiRequest req)
        {
            PrepareRequestHeaders(token, "GetExpenseSheets", requireCompany: true);

            req ??= new ExpenseSheetListApiRequest();

            var payload = new ExpenseSheetListApiRequest
            {
                Filter = NormalizeOptionalText(req.Filter),
                BilledMode = req.BilledMode is >= 0 and <= 2 ? req.BilledMode : null,
                CreatedDateFrom = NormalizeOptionalText(req.CreatedDateFrom),
                CreatedDateTo = NormalizeOptionalText(req.CreatedDateTo),
                ProjId = NormalizeOptionalText(req.ProjId),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode),
                Page = req.Page < 1 ? 1 : req.Page,
                PageSize = req.PageSize <= 0 ? 50 : req.PageSize
            };

            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheetsList, payload);
            return BuildPagedResponse<ExpenseSheetDetailDto>(result, "GetExpenseSheets");
        }

        // ======================================================
        // Projects
        // ======================================================
        public async Task<PagedApiResponse<ProjectDto>> GetProjectsAsync(
            string token,
            string? filter,
            int page,
            int pageSize)
        {
            PrepareRequestHeaders(token, "GetProjects", requireCompany: true);

            var safeFilter = EscapeQueryValue(filter);
            var result = await SendGetAsync(ApiRoutes.ProjectsList(safeFilter, page, pageSize));
            return BuildPagedResponse<ProjectDto>(result, "GetProjects");
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
            PrepareRequestHeaders(token, "TranscribeSpeech", requireCompany: true);

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

            var result = await SendPostMultipartAsync(
                ApiRoutes.SpeechTranscribe,
                form,
                cancellationToken);

            var response = BuildApiResponse<string>(result, "SpeechTranscribe");
            if (string.IsNullOrWhiteSpace(response.Data))
            {
                var extracted = ApiPayloadParser.TryExtractSpeechText(result.Raw);
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

                // If root has a Data property.
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

                // If there is no Data, try mapping root to T directly.
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

        private void AddToken(string token, bool includeCompanyHeader = true, bool includeAxUserHeader = true)
        {
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            if (includeCompanyHeader)
            {
                ApplyCompanyHeader();
            }
            else
            {
                _client.DefaultRequestHeaders.Remove("X-IND-Company");
            }

            if (includeAxUserHeader)
            {
                ApplyAxUserHeader();
            }
            else
            {
                _client.DefaultRequestHeaders.Remove("X-IND-AxUserId");
            }
        }

        private void ApplyCompanyHeader()
        {
            _client.DefaultRequestHeaders.Remove("X-IND-Company");

            var companyId = GetSelectedCompanyId();
            if (string.IsNullOrWhiteSpace(companyId))
                return;

            _client.DefaultRequestHeaders.Add("X-IND-Company", companyId);
        }

        private void ApplyAxUserHeader()
        {
            _client.DefaultRequestHeaders.Remove("X-IND-AxUserId");

            var axUserId = GetAxUserId();
            if (string.IsNullOrWhiteSpace(axUserId))
                return;

            _client.DefaultRequestHeaders.Add("X-IND-AxUserId", axUserId);
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

        // Reads the AX user id from session, if present.
        private string? GetAxUserId()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var axUserId = ctx.Session.GetString("AxUser");
            return string.IsNullOrWhiteSpace(axUserId) ? null : axUserId;
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

    }
}
