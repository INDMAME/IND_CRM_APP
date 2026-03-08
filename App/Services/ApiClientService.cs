using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services.ApiHelpers;
using IND_CRM_APP.Services.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Net;
using System.Net.Http.Headers;
using System.Globalization;
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
        private static readonly HashSet<int> AllowedGastoTypeCodes = new() { 0, 1, 2, 3, 4, 5, 6, 7, 8, 14 };

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

        // Returns a compact safe snippet for diagnostics without flooding logs.
        private static string SafeLogSnippet(string? raw, int maxChars = 1200)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return "<empty>";

            var normalized = raw
                .Replace('\r', ' ')
                .Replace('\n', ' ')
                .Trim();

            if (normalized.Length <= maxChars)
                return normalized;

            return normalized.Substring(0, maxChars) + "...";
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

        // Normalizes list date filters to AX expected compact format (ddMMyyyy).
        private static string? NormalizeAxListDate(string? value)
        {
            var normalized = NormalizeOptionalText(value);
            if (string.IsNullOrWhiteSpace(normalized))
                return null;

            if (DateTime.TryParseExact(normalized, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedCompact))
                return parsedCompact.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedIso))
                return parsedIso.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "ddMMyyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdMmYyyy))
                return parsedDdMmYyyy.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdDotMmDotYyyy))
                return parsedDdDotMmDotYyyy.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdSlashMmSlashYyyy))
                return parsedDdSlashMmSlashYyyy.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdDashMmDashYyyy))
                return parsedDdDashMmDashYyyy.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParse(normalized, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedInv))
                return parsedInv.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParse(normalized, CultureInfo.CurrentCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedCur))
                return parsedCur.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            return normalized;
        }

        // Normalizes optional gasto type values against the fixed enum set.
        private static int? NormalizeTicketGastoType(int? gastoType)
        {
            return gastoType.HasValue && AllowedGastoTypeCodes.Contains(gastoType.Value)
                ? gastoType
                : null;
        }

        // Builds the optional token expected by AX list filters: 0/1 when set, null when omitted.
        private static int? BuildTicketStatusFilterToken(int? status)
        {
            return status.HasValue && (status.Value == 0 || status.Value == 1)
                ? status.Value
                : null;
        }

        // Builds the optional token expected by AX list filters: 0/1 when set, null when omitted.
        private static int? BuildTicketProcessedByAiFilterToken(bool? processedByAI)
        {
            return processedByAI.HasValue
                ? (processedByAI.Value ? 1 : 0)
                : null;
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
        // Exchange rate
        // ======================================================
        public async Task<ApiResponse<ExchangeRateDto>> GetExchangeRateAsync(
            string token,
            string baseCurrency,
            string targetCurrency,
            string? date)
        {
            PrepareRequestHeaders(token, "GetExchangeRate", requireCompany: true);

            var safeBaseCurrency = EscapeQueryValue((baseCurrency ?? string.Empty).Trim().ToUpperInvariant());
            var safeTargetCurrency = EscapeQueryValue((targetCurrency ?? string.Empty).Trim().ToUpperInvariant());
            var safeDate = NormalizeOptionalText(date);

            var route = ApiRoutes.SystemExchangeRateByQuery(
                safeBaseCurrency,
                safeTargetCurrency,
                string.IsNullOrWhiteSpace(safeDate) ? null : EscapeQueryValue(safeDate));

            var result = await SendGetAsync(route);
            return BuildApiResponse<ExchangeRateDto>(result, "GetExchangeRate");
        }

        public async Task<ApiResponse<ExchangeRateDto>> GetExchangeRatePublicDirectAsync(
            string token,
            string baseCurrency,
            string targetCurrency,
            string? date)
        {
            PrepareRequestHeaders(
                token,
                "GetExchangeRatePublicDirect",
                requireCompany: false,
                includeCompanyHeader: false,
                includeAxUserHeader: false);

            var safeBaseCurrency = EscapeQueryValue((baseCurrency ?? string.Empty).Trim().ToUpperInvariant());
            var safeTargetCurrency = EscapeQueryValue((targetCurrency ?? string.Empty).Trim().ToUpperInvariant());
            var safeDate = NormalizeOptionalText(date);

            var route = ApiRoutes.SystemExchangeRatePublicDirectByQuery(
                safeBaseCurrency,
                safeTargetCurrency,
                string.IsNullOrWhiteSpace(safeDate) ? null : EscapeQueryValue(safeDate));

            var result = await SendGetAsync(route);
            return BuildApiResponse<ExchangeRateDto>(result, "GetExchangeRatePublicDirect");
        }

        public async Task<ApiResponse<FuelPriceKmDto>> GetFuelPriceKmAsync(
            string token,
            string transDate)
        {
            PrepareRequestHeaders(token, "GetFuelPriceKm", requireCompany: true);

            var normalizedTransDate = NormalizeOptionalText(transDate) ?? string.Empty;
            var route = ApiRoutes.ExpenseSheetFuelPriceKmByQuery(EscapeQueryValue(normalizedTransDate));

            var result = await SendGetAsync(route);
            return BuildApiResponse<FuelPriceKmDto>(result, "GetFuelPriceKm");
        }

        // Gets backend health summary using the health endpoint.
        public async Task<ApiResponse<object>> GetHealthAsync(string token)
        {
            PrepareRequestHeaders(
                token,
                "GetHealth",
                requireCompany: false,
                includeCompanyHeader: false,
                includeAxUserHeader: false);

            var result = await SendGetAsync(ApiRoutes.Health);
            return BuildApiResponse<object>(result, "GetHealth");
        }

        // Gets backend ping status using the lightweight ping endpoint.
        public async Task<ApiResponse<object>> GetHealthPingAsync(string token)
        {
            PrepareRequestHeaders(
                token,
                "GetHealthPing",
                requireCompany: false,
                includeCompanyHeader: false,
                includeAxUserHeader: false);

            var result = await SendGetAsync(ApiRoutes.HealthPing);
            return BuildApiResponse<object>(result, "GetHealthPing");
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
            bool deleteWholeSheet,
            int? deleteMode = null)
        {
            PrepareRequestHeaders(token, "DeleteExpenseSheetLine", requireCompany: true);

            var safeSheetId = EscapePathSegment(hojaGastosId);
            var safeLineId = EscapePathSegment(lineRecId ?? "0");

            var result = await SendDeleteAsync(
                ApiRoutes.ExpenseSheetLineDelete(safeSheetId, safeLineId, deleteMode, deleteWholeSheet));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetLine");
        }

        public async Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetsAsync(
            string token,
            ExpenseSheetListApiRequest req)
        {
            PrepareRequestHeaders(token, "GetExpenseSheets", requireCompany: true);

            req ??= new ExpenseSheetListApiRequest();

            var normalizedPage = req.Page < 1 ? 1 : req.Page;
            var normalizedPageSize = req.PageSize <= 0 ? 50 : req.PageSize;
            var normalizedBilledMode = req.BilledMode is >= 0 and <= 2 ? req.BilledMode.Value : 2;
            var normalizedExpenseSheetStatus = req.ExpenseSheetStatus is >= 0 and <= 4 ? req.ExpenseSheetStatus : null;
            var normalizedFilter = NormalizeOptionalText(req.Filter) ?? string.Empty;
            var normalizedCreatedDateFrom = NormalizeAxListDate(req.CreatedDateFrom) ?? string.Empty;
            var normalizedCreatedDateTo = NormalizeAxListDate(req.CreatedDateTo) ?? string.Empty;
            var normalizedProjId = NormalizeOptionalText(req.ProjId) ?? string.Empty;
            var normalizedCurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant() ?? string.Empty;

            var payload = new Dictionary<string, object?>
            {
                ["filter"] = normalizedFilter,
                ["billedMode"] = normalizedBilledMode,
                ["createdDateFrom"] = normalizedCreatedDateFrom,
                ["createdDateTo"] = normalizedCreatedDateTo,
                ["projId"] = normalizedProjId,
                ["currencyCode"] = normalizedCurrencyCode,
                ["expenseSheetStatus"] = normalizedExpenseSheetStatus,
                ["page"] = normalizedPage,
                ["pageSize"] = normalizedPageSize
            };

            var serializedPayload = Serialize(payload);
            _logger.LogInformation(
                "Upstream request {Operation}: payloadLength={PayloadLength} billedMode={BilledMode} page={Page} pageSize={PageSize} createdDateFrom={CreatedDateFrom} createdDateTo={CreatedDateTo} filterLen={FilterLen} projIdLen={ProjIdLen} currencyCode={CurrencyCode} expenseSheetStatus={ExpenseSheetStatus}",
                "GetExpenseSheets",
                serializedPayload.Length,
                normalizedBilledMode,
                normalizedPage,
                normalizedPageSize,
                normalizedCreatedDateFrom,
                normalizedCreatedDateTo,
                normalizedFilter.Length,
                normalizedProjId.Length,
                string.IsNullOrWhiteSpace(normalizedCurrencyCode) ? "<empty>" : normalizedCurrencyCode,
                normalizedExpenseSheetStatus.HasValue ? normalizedExpenseSheetStatus.Value.ToString(CultureInfo.InvariantCulture) : "null");

            var result = await SendPostAsync(ApiRoutes.ExpenseSheetsList, serializedPayload);
            if (!result.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "Upstream non-success {Operation}: statusCode={StatusCode} payloadLength={PayloadLength} body={BodySnippet}",
                    "GetExpenseSheets",
                    (int)result.StatusCode,
                    serializedPayload.Length,
                    SafeLogSnippet(result.Raw));
            }
            return BuildPagedResponse<ExpenseSheetDetailDto>(result, "GetExpenseSheets");
        }

        public async Task<PagedApiResponse<ExpenseSheetCurrencyDto>> GetExpenseSheetCurrenciesAsync(
            string token)
        {
            PrepareRequestHeaders(
                token,
                "GetExpenseSheetCurrencies",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: false);

            var result = await SendGetAsync(ApiRoutes.ExpenseSheetCurrencies);
            var parsed = BuildPagedResponse<ExpenseSheetCurrencyDto>(result, "GetExpenseSheetCurrencies");
            if (parsed.GetAnyItems().Any())
            {
                return parsed;
            }

            var fallback = TryParseExpenseSheetCurrenciesFallback(result);
            return fallback ?? parsed;
        }

        public async Task<PagedApiResponse<ExpenseSheetSubordinateDto>> GetExpenseSheetSubordinatesAsync(
            string token)
        {
            PrepareRequestHeaders(token, "GetExpenseSheetSubordinates", requireCompany: true);

            var result = await SendGetAsync(ApiRoutes.ExpenseSheetSubordinates);
            return BuildPagedResponse<ExpenseSheetSubordinateDto>(result, "GetExpenseSheetSubordinates");
        }

        public async Task<ApiResponse<object>> CreateExpenseSheetTicketAsync(
            string token,
            ExpenseSheetTicketCreateRequest req)
        {
            PrepareRequestHeaders(token, "CreateExpenseSheetTicket", requireCompany: true);

            req ??= new ExpenseSheetTicketCreateRequest();
            var lines = req.Lines?
                .Where(x => x != null)
                .Select(x => new ExpenseSheetTicketLineRequest
                {
                    Description = (x.Description ?? string.Empty).Trim(),
                    Qty = x.Qty,
                    Price = x.Price,
                    TotalAmount = x.TotalAmount.HasValue && x.TotalAmount.Value > 0
                        ? x.TotalAmount.Value
                        : null
                })
                .ToList();

            var payload = new ExpenseSheetTicketCreateRequest
            {
                Mode = req.Mode,
                ExistingFileId = NormalizeOptionalText(req.ExistingFileId),
                Description = NormalizeOptionalText(req.Description),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                TotalAmount = req.TotalAmount,
                Status = req.Status,
                TransDate = NormalizeOptionalText(req.TransDate),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
                FileName = NormalizeOptionalText(req.FileName),
                FileExtension = NormalizeOptionalText(req.FileExtension),
                ProcessedByAI = req.ProcessedByAI,
                GastoType = NormalizeTicketGastoType(req.GastoType),
                Lines = lines != null && lines.Count > 0 ? lines : null
            };

            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheetTickets, payload);
            return BuildApiResponse<object>(result, "CreateExpenseSheetTicket");
        }

        public async Task<PagedApiResponse<ExpenseSheetTicketListItemDto>> GetExpenseSheetTicketsAsync(
            string token,
            ExpenseSheetTicketListRequest req,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(token, "GetExpenseSheetTickets", requireCompany: true);

            req ??= new ExpenseSheetTicketListRequest();

            var normalizedPage = req.Page < 1 ? 1 : req.Page;
            var normalizedPageSize = req.PageSize <= 0 ? 50 : req.PageSize;
            var normalizedCreatedDateFrom = NormalizeAxListDate(req.CreatedDateFrom) ?? string.Empty;
            var normalizedCreatedDateTo = NormalizeAxListDate(req.CreatedDateTo) ?? string.Empty;
            var normalizedSearchKey = NormalizeOptionalText(req.SearchKey) ?? NormalizeOptionalText(req.Filter) ?? string.Empty;
            var normalizedFilter = NormalizeOptionalText(req.Filter) ?? normalizedSearchKey;
            var normalizedCurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant() ?? string.Empty;
            var normalizedGastoType = NormalizeTicketGastoType(req.GastoType);
            var normalizedStatus = BuildTicketStatusFilterToken(req.Status);
            var normalizedProcessedByAi = BuildTicketProcessedByAiFilterToken(req.ProcessedByAI);

            var payload = new Dictionary<string, object?>
            {
                ["page"] = normalizedPage,
                ["pageSize"] = normalizedPageSize,
                ["createdDateFrom"] = normalizedCreatedDateFrom,
                ["createdDateTo"] = normalizedCreatedDateTo,
                ["searchKey"] = normalizedSearchKey,
                ["filter"] = normalizedFilter,
                ["status"] = normalizedStatus,
                ["currencyCode"] = normalizedCurrencyCode,
                ["gastoType"] = normalizedGastoType,
                ["processedByAI"] = normalizedProcessedByAi
            };

            var serializedPayload = Serialize(payload);
            _logger.LogInformation(
                "Upstream request {Operation}: payloadLength={PayloadLength} page={Page} pageSize={PageSize} createdDateFrom={CreatedDateFrom} createdDateTo={CreatedDateTo} searchKeyLen={SearchKeyLen} filterLen={FilterLen} status={Status} currencyCode={CurrencyCode} gastoType={GastoType} processedByAI={ProcessedByAI}",
                "GetExpenseSheetTickets",
                serializedPayload.Length,
                normalizedPage,
                normalizedPageSize,
                normalizedCreatedDateFrom,
                normalizedCreatedDateTo,
                normalizedSearchKey.Length,
                normalizedFilter.Length,
                normalizedStatus.HasValue ? normalizedStatus.Value.ToString(CultureInfo.InvariantCulture) : "null",
                string.IsNullOrWhiteSpace(normalizedCurrencyCode) ? "<empty>" : normalizedCurrencyCode,
                normalizedGastoType.HasValue ? normalizedGastoType.Value.ToString(CultureInfo.InvariantCulture) : "null",
                normalizedProcessedByAi.HasValue ? normalizedProcessedByAi.Value.ToString(CultureInfo.InvariantCulture) : "null");

            var result = await SendPostAsync(ApiRoutes.ExpenseSheetTicketsList, serializedPayload, cancellationToken);
            if (!result.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "Upstream non-success {Operation}: statusCode={StatusCode} payloadLength={PayloadLength} body={BodySnippet}",
                    "GetExpenseSheetTickets",
                    (int)result.StatusCode,
                    serializedPayload.Length,
                    SafeLogSnippet(result.Raw));
            }
            return BuildPagedResponse<ExpenseSheetTicketListItemDto>(result, "GetExpenseSheetTickets");
        }

        public async Task<PagedApiResponse<ExpenseSheetTicketDetailDto>> GetExpenseSheetTicketDetailAsync(
            string token,
            string fileId)
        {
            PrepareRequestHeaders(token, "GetExpenseSheetTicketDetail", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendGetAsync(ApiRoutes.ExpenseSheetTicketByFileId(safeFileId));
            return BuildPagedResponse<ExpenseSheetTicketDetailDto>(result, "GetExpenseSheetTicketDetail");
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetTicketAsync(
            string token,
            string fileId,
            ExpenseSheetTicketUpdateRequest req)
        {
            PrepareRequestHeaders(token, "UpdateExpenseSheetTicket", requireCompany: true);

            req ??= new ExpenseSheetTicketUpdateRequest();
            var payload = new ExpenseSheetTicketUpdateRequest
            {
                Description = NormalizeOptionalText(req.Description),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                TotalAmount = req.TotalAmount,
                Status = req.Status,
                TransDate = NormalizeOptionalText(req.TransDate),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
                FileName = NormalizeOptionalText(req.FileName),
                ProcessedByAI = req.ProcessedByAI,
                FileExtension = NormalizeOptionalText(req.FileExtension),
                GastoType = NormalizeTicketGastoType(req.GastoType)
            };

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendPutJsonAsync(ApiRoutes.ExpenseSheetTicketByFileId(safeFileId), payload);
            return BuildApiResponse<object>(result, "UpdateExpenseSheetTicket");
        }

        public async Task<ApiResponse<object>> DeleteExpenseSheetTicketAsync(
            string token,
            string fileId,
            int? lineRecId = null)
        {
            PrepareRequestHeaders(token, "DeleteExpenseSheetTicket", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendDeleteAsync(ApiRoutes.ExpenseSheetTicketDelete(safeFileId, lineRecId));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetTicket");
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetTicketFromIAAsync(
            string token,
            string fileId,
            object req)
        {
            PrepareRequestHeaders(token, "UpdateExpenseSheetTicketFromIA", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var payload = req ?? new { };
            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheetTicketIa(safeFileId), payload);
            return BuildApiResponse<object>(result, "UpdateExpenseSheetTicketFromIA");
        }

        public async Task<ApiResponse<object>> CreateExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            ExpenseSheetTicketLineRequest req)
        {
            PrepareRequestHeaders(token, "CreateExpenseSheetTicketLine", requireCompany: true);

            req ??= new ExpenseSheetTicketLineRequest();
            var payload = new ExpenseSheetTicketLineRequest
            {
                Description = (req.Description ?? string.Empty).Trim(),
                Qty = req.Qty,
                Price = req.Price,
                TotalAmount = req.TotalAmount.HasValue && req.TotalAmount.Value > 0
                    ? req.TotalAmount.Value
                    : null
            };

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheetTicketLines(safeFileId), payload);
            return BuildApiResponse<object>(result, "CreateExpenseSheetTicketLine");
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            string lineRecId,
            ExpenseSheetTicketLineRequest req)
        {
            PrepareRequestHeaders(token, "UpdateExpenseSheetTicketLine", requireCompany: true);

            req ??= new ExpenseSheetTicketLineRequest();
            var payload = new ExpenseSheetTicketLineRequest
            {
                Description = (req.Description ?? string.Empty).Trim(),
                Qty = req.Qty,
                Price = req.Price,
                TotalAmount = req.TotalAmount.HasValue && req.TotalAmount.Value > 0
                    ? req.TotalAmount.Value
                    : null
            };

            var safeFileId = EscapePathSegment(fileId);
            var safeLineId = EscapePathSegment(lineRecId);
            var result = await SendPutJsonAsync(ApiRoutes.ExpenseSheetTicketLine(safeFileId, safeLineId), payload);
            return BuildApiResponse<object>(result, "UpdateExpenseSheetTicketLine");
        }

        public async Task<ApiResponse<object>> DeleteExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            string lineRecId)
        {
            PrepareRequestHeaders(token, "DeleteExpenseSheetTicketLine", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var safeLineId = EscapePathSegment(lineRecId);
            var result = await SendDeleteAsync(ApiRoutes.ExpenseSheetTicketLine(safeFileId, safeLineId));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetTicketLine");
        }

        public async Task<ApiResponse<object>> UploadExpenseSheetTicketFileAsync(
            string token,
            string fileId,
            Stream fileStream,
            string fileName,
            string? contentType,
            string? extension = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(token, "UploadExpenseSheetTicketFile", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var safeFileName = string.IsNullOrWhiteSpace(fileName) ? "ticket.jpg" : Path.GetFileName(fileName);
            var normalizedExtension = NormalizeOptionalText(extension);
            var safeExtension = string.IsNullOrWhiteSpace(normalizedExtension)
                ? null
                : EscapeQueryValue(normalizedExtension.TrimStart('.').ToLowerInvariant());
            var mime = string.IsNullOrWhiteSpace(contentType) ? "application/octet-stream" : contentType.Trim();
            var canReportLength = fileStream.CanSeek;
            var streamLength = canReportLength ? fileStream.Length : -1;

            _logger.LogInformation(
                "UploadExpenseSheetTicketFile request. FileId: {FileId}. FileName: {FileName}. ContentType: {ContentType}. Extension: {Extension}. StreamLength: {StreamLength}",
                safeFileId,
                safeFileName,
                mime,
                normalizedExtension ?? "<empty>",
                streamLength);

            using var form = new MultipartFormDataContent();
            using var fileContent = new StreamContent(fileStream);
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(mime);
            form.Add(fileContent, "file", safeFileName);

            var result = await SendPostMultipartAsync(
                ApiRoutes.ExpenseSheetTicketFile(safeFileId, safeExtension),
                form,
                cancellationToken);

            var response = BuildApiResponse<object>(result, "UploadExpenseSheetTicketFile");
            _logger.LogInformation(
                "UploadExpenseSheetTicketFile upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. Raw: {Raw}",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                SafeLogPayload(result.Raw));

            return response;
        }

        public async Task<ApiResponse<object>> DeleteExpenseSheetTicketFileAsync(
            string token,
            string fileId)
        {
            PrepareRequestHeaders(token, "DeleteExpenseSheetTicketFile", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendDeleteAsync(ApiRoutes.ExpenseSheetTicketFile(safeFileId));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetTicketFile");
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

        // Creates expense data from a ticket image using OCR/AI endpoint.
        public async Task<ApiResponse<object>> ExpenseFromTicketAsync(
            string token,
            Stream ticketImageStream,
            string fileName,
            string? contentType,
            bool? persistTicket = null,
            string? ticketUrlFile = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(token, "ExpenseFromTicket", requireCompany: true);

            var safeFileName = string.IsNullOrWhiteSpace(fileName) ? "ticket.jpg" : Path.GetFileName(fileName);
            var mime = string.IsNullOrWhiteSpace(contentType) ? "image/jpeg" : contentType.Trim();
            var safeTicketUrlFile = NormalizeOptionalText(ticketUrlFile);
            var canReportLength = ticketImageStream.CanSeek;
            var streamLength = canReportLength ? ticketImageStream.Length : -1;

            _logger.LogInformation(
                "ExpenseFromTicket request. FileName: {FileName}. ContentType: {ContentType}. PersistTicket: {PersistTicket}. TicketUrlFilePresent: {HasTicketUrlFile}. StreamLength: {StreamLength}",
                safeFileName,
                mime,
                persistTicket.HasValue ? persistTicket.Value.ToString() : "<null>",
                !string.IsNullOrWhiteSpace(safeTicketUrlFile),
                streamLength);

            using var form = new MultipartFormDataContent();
            using var fileContent = new StreamContent(ticketImageStream);
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(mime);
            form.Add(fileContent, "ticketImage", safeFileName);

            if (persistTicket.HasValue)
            {
                form.Add(new StringContent(persistTicket.Value ? "true" : "false"), "persistTicket");
            }

            if (!string.IsNullOrWhiteSpace(safeTicketUrlFile))
            {
                form.Add(new StringContent(safeTicketUrlFile), "ticketUrlFile");
            }

            var result = await SendPostMultipartAsync(
                ApiRoutes.ExpenseFromTicket,
                form,
                cancellationToken);

            var response = BuildApiResponse<object>(result, "ExpenseFromTicket");
            _logger.LogInformation(
                "ExpenseFromTicket upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. Raw: {Raw}",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                SafeLogPayload(result.Raw));

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

            LogNullPagedMetricsIfAny(result.Raw, operation, result.StatusCode);
            if (!result.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "Paged upstream response not successful for {Operation}. StatusCode: {StatusCode}. Error: {ErrorMessage}. Raw: {RawSnippet}",
                    operation,
                    (int)result.StatusCode,
                    result.ErrorMessage ?? "<null>",
                    SafeLogSnippet(result.Raw));
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

            // Fallback: supports envelopes where Data is a single object and direct object/array payloads.
            try
            {
                using var doc = JsonDocument.Parse(result.Raw);
                var root = doc.RootElement;
                var fallbackItems = ExtractPagedItems<T>(root);
                var fallbackSuccess = TryReadBoolProperty(root, "Success", "success") ?? result.IsSuccessStatusCode;
                var fallbackMessage = TryGetMessage(root) ?? result.ErrorMessage;
                var fallbackTotal = TryReadIntProperty(root, "Total") ?? TryReadIntProperty(root, "total") ?? fallbackItems.Count;
                var fallbackPage = TryReadIntProperty(root, "Page") ?? TryReadIntProperty(root, "page") ?? 1;
                var fallbackPageSize = TryReadIntProperty(root, "PageSize") ?? TryReadIntProperty(root, "pageSize") ?? fallbackItems.Count;
                var fallbackTraceId = ReadStringLikeProperty(root, "TraceId", "traceId");
                _logger.LogWarning(
                    "Using paged fallback parser for {Operation}. ItemCount: {ItemCount}. Total: {Total}. Page: {Page}. PageSize: {PageSize}. StatusCode: {StatusCode}. TraceId: {TraceId}",
                    operation,
                    fallbackItems.Count,
                    fallbackTotal,
                    fallbackPage,
                    fallbackPageSize,
                    (int)result.StatusCode,
                    fallbackTraceId ?? TryGetTraceId(result.Headers) ?? "<null>");

                return new PagedApiResponse<T>
                {
                    Success = fallbackSuccess,
                    Message = fallbackMessage,
                    Items = fallbackItems,
                    Data = fallbackItems,
                    Total = Math.Max(0, fallbackTotal),
                    Page = fallbackPage > 0 ? fallbackPage : 1,
                    PageSize = Math.Max(0, fallbackPageSize),
                    TraceId = fallbackTraceId ?? TryGetTraceId(result.Headers)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Fallback paged deserialization failed for {Operation}. Raw: {Raw}", operation, SafeLogPayload(result.Raw));
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

        // Logs when paged envelopes arrive with null metrics to make backend regressions visible.
        private void LogNullPagedMetricsIfAny(string raw, string operation, HttpStatusCode statusCode)
        {
            if (string.IsNullOrWhiteSpace(raw))
            {
                return;
            }

            try
            {
                using var doc = JsonDocument.Parse(raw);
                var root = doc.RootElement;
                if (root.ValueKind != JsonValueKind.Object)
                {
                    return;
                }

                var totalNull = JsonPropertyHelper.TryGetPropertyInsensitive(root, "Total", out var totalElement) &&
                                totalElement.ValueKind == JsonValueKind.Null;
                var pageNull = JsonPropertyHelper.TryGetPropertyInsensitive(root, "Page", out var pageElement) &&
                               pageElement.ValueKind == JsonValueKind.Null;
                var pageSizeNull = JsonPropertyHelper.TryGetPropertyInsensitive(root, "PageSize", out var pageSizeElement) &&
                                   pageSizeElement.ValueKind == JsonValueKind.Null;

                if (!totalNull && !pageNull && !pageSizeNull)
                {
                    return;
                }

                _logger.LogWarning(
                    "Paged response includes null metrics for {Operation}. StatusCode: {StatusCode}. TotalNull: {TotalNull}. PageNull: {PageNull}. PageSizeNull: {PageSizeNull}. Raw: {Raw}",
                    operation,
                    (int)statusCode,
                    totalNull,
                    pageNull,
                    pageSizeNull,
                    SafeLogPayload(raw));
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "Could not inspect paged metrics for {Operation}.", operation);
            }
        }

        // Reads bool values from bool, numeric or string JSON fields.
        private static bool? TryReadBoolProperty(JsonElement root, params string[] keys)
        {
            foreach (var key in keys)
            {
                if (!JsonPropertyHelper.TryGetPropertyInsensitive(root, key, out var element))
                    continue;

                if (element.ValueKind == JsonValueKind.True) return true;
                if (element.ValueKind == JsonValueKind.False) return false;

                if (element.ValueKind == JsonValueKind.Number && element.TryGetInt32(out var fromNumber))
                {
                    if (fromNumber == 1) return true;
                    if (fromNumber == 0) return false;
                }

                if (element.ValueKind == JsonValueKind.String)
                {
                    var normalized = element.GetString()?.Trim().ToLowerInvariant();
                    if (normalized == "true" || normalized == "1") return true;
                    if (normalized == "false" || normalized == "0") return false;
                }
            }

            return null;
        }

        // Extracts paged items from envelopes, nested Data, or direct JSON payloads.
        private List<T> ExtractPagedItems<T>(JsonElement root)
        {
            var items = new List<T>();

            if (root.ValueKind == JsonValueKind.Array)
            {
                AddPagedItemsFromArray(items, root);
                return items;
            }

            if (root.ValueKind != JsonValueKind.Object)
                return items;

            if (TryGetArrayProperty(root, "Items", out var itemsArray))
            {
                AddPagedItemsFromArray(items, itemsArray);
                return items;
            }

            if (JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out var dataElement))
            {
                if (dataElement.ValueKind == JsonValueKind.Array)
                {
                    AddPagedItemsFromArray(items, dataElement);
                    return items;
                }

                if (dataElement.ValueKind == JsonValueKind.Object)
                {
                    if (TryGetArrayProperty(dataElement, "Items", out var nestedItems))
                    {
                        AddPagedItemsFromArray(items, nestedItems);
                        return items;
                    }

                    if (TryDeserializeItem(dataElement, out T? singleFromData))
                    {
                        items.Add(singleFromData!);
                    }

                    return items;
                }
            }

            var looksLikeEnvelope =
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Success", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Message", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Total", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Page", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "PageSize", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Items", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "ErrorCode", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Errors", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "TraceId", out _);

            if (!looksLikeEnvelope && TryDeserializeItem(root, out T? singleFromRoot))
            {
                items.Add(singleFromRoot!);
            }

            return items;
        }

        // Adds parsed items from a JSON array while tolerating malformed elements.
        private void AddPagedItemsFromArray<T>(List<T> target, JsonElement arrayElement)
        {
            if (arrayElement.ValueKind != JsonValueKind.Array)
                return;

            foreach (var element in arrayElement.EnumerateArray())
            {
                if (!TryDeserializeItem(element, out T? item))
                    continue;

                target.Add(item!);
            }
        }

        // Safely deserializes one item from a JSON element.
        private static bool TryDeserializeItem<T>(JsonElement element, out T? item)
        {
            try
            {
                item = element.Deserialize<T>(JsonOptions);
                return item != null;
            }
            catch
            {
                item = default;
                return false;
            }
        }

        // Tries to parse currencies payloads from tolerant response shapes.
        private PagedApiResponse<ExpenseSheetCurrencyDto>? TryParseExpenseSheetCurrenciesFallback(HttpResult result)
        {
            if (string.IsNullOrWhiteSpace(result.Raw))
            {
                return null;
            }

            try
            {
                using var doc = JsonDocument.Parse(result.Raw);
                var root = doc.RootElement;
                var knownEnvelope = root.ValueKind == JsonValueKind.Array || LooksLikeCurrencyEnvelope(root);
                var items = ExtractCurrencyItems(root);
                if (!knownEnvelope && items.Count == 0)
                {
                    return null;
                }

                var success = root.ValueKind == JsonValueKind.Object
                    ? JsonPropertyHelper.TryGetBool(root, "Success") ?? result.IsSuccessStatusCode
                    : result.IsSuccessStatusCode;
                var message = root.ValueKind == JsonValueKind.Object
                    ? TryGetMessage(root) ?? string.Empty
                    : string.Empty;
                var total = root.ValueKind == JsonValueKind.Object
                    ? (TryReadIntProperty(root, "Total") ?? items.Count)
                    : items.Count;
                var page = root.ValueKind == JsonValueKind.Object
                    ? (TryReadIntProperty(root, "Page") ?? 1)
                    : 1;
                var pageSize = root.ValueKind == JsonValueKind.Object
                    ? (TryReadIntProperty(root, "PageSize") ?? items.Count)
                    : items.Count;
                var traceId = root.ValueKind == JsonValueKind.Object
                    ? JsonPropertyHelper.TryGetString(root, "TraceId") ?? TryGetTraceId(result.Headers)
                    : TryGetTraceId(result.Headers);

                return new PagedApiResponse<ExpenseSheetCurrencyDto>
                {
                    Success = success,
                    Message = message,
                    Data = items,
                    Items = items,
                    Total = total < 0 ? 0 : total,
                    Page = page < 1 ? 1 : page,
                    PageSize = pageSize < 0 ? 0 : pageSize,
                    TraceId = traceId
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Currency fallback parse failed. Raw: {Raw}", SafeLogPayload(result.Raw));
                return null;
            }
        }

        // Detects currencies response envelopes even when they contain no items.
        private static bool LooksLikeCurrencyEnvelope(JsonElement root)
        {
            if (root.ValueKind != JsonValueKind.Object)
            {
                return false;
            }

            return JsonPropertyHelper.TryGetPropertyInsensitive(root, "Items", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Success", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Message", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Total", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Page", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "PageSize", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "TraceId", out _);
        }

        // Extracts currencies from either envelope objects or direct arrays.
        private List<ExpenseSheetCurrencyDto> ExtractCurrencyItems(JsonElement root)
        {
            var items = new List<ExpenseSheetCurrencyDto>();
            if (root.ValueKind == JsonValueKind.Array)
            {
                AddCurrencyElements(root, items);
                return items;
            }

            if (root.ValueKind != JsonValueKind.Object)
            {
                return items;
            }

            if (TryGetArrayProperty(root, "Items", out var itemsArray))
            {
                AddCurrencyElements(itemsArray, items);
                return items;
            }

            if (JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out var dataElement))
            {
                if (dataElement.ValueKind == JsonValueKind.Array)
                {
                    AddCurrencyElements(dataElement, items);
                    return items;
                }

                if (dataElement.ValueKind == JsonValueKind.Object)
                {
                    if (TryGetArrayProperty(dataElement, "Items", out var nestedItems))
                    {
                        AddCurrencyElements(nestedItems, items);
                        return items;
                    }

                    var singleFromData = ParseCurrencyItem(dataElement);
                    if (singleFromData != null)
                    {
                        items.Add(singleFromData);
                        return items;
                    }
                }
            }

            var singleFromRoot = ParseCurrencyItem(root);
            if (singleFromRoot != null)
            {
                items.Add(singleFromRoot);
            }

            return items;
        }

        // Adds currency items from a JSON array while tolerating mixed element shapes.
        private void AddCurrencyElements(JsonElement arrayElement, List<ExpenseSheetCurrencyDto> target)
        {
            if (arrayElement.ValueKind != JsonValueKind.Array)
            {
                return;
            }

            foreach (var item in arrayElement.EnumerateArray())
            {
                var parsed = ParseCurrencyItem(item);
                if (parsed == null)
                {
                    continue;
                }

                target.Add(parsed);
            }
        }

        // Parses one currency entry from object or string values.
        private static ExpenseSheetCurrencyDto? ParseCurrencyItem(JsonElement element)
        {
            if (element.ValueKind == JsonValueKind.String)
            {
                var codeFromString = NormalizeOptionalText(element.GetString())?.ToUpperInvariant();
                if (string.IsNullOrWhiteSpace(codeFromString))
                {
                    return null;
                }

                return new ExpenseSheetCurrencyDto
                {
                    CurrencyCode = codeFromString,
                    CurrencyCodeISO = codeFromString
                };
            }

            if (element.ValueKind != JsonValueKind.Object)
            {
                return null;
            }

            var code = ReadStringLikeProperty(element, "CurrencyCode", "currencyCode", "Code", "code", "Currency", "currency");
            var iso = ReadStringLikeProperty(element, "CurrencyCodeISO", "currencyCodeISO", "currencyCodeIso", "IsoCode", "isoCode");
            var normalizedCode = NormalizeOptionalText(code)?.ToUpperInvariant();
            var normalizedIso = NormalizeOptionalText(iso)?.ToUpperInvariant();

            if (string.IsNullOrWhiteSpace(normalizedCode) && string.IsNullOrWhiteSpace(normalizedIso))
            {
                return null;
            }

            return new ExpenseSheetCurrencyDto
            {
                CurrencyCode = normalizedCode ?? normalizedIso ?? string.Empty,
                CurrencyCodeISO = normalizedIso ?? normalizedCode ?? string.Empty
            };
        }

        // Reads an array property using tolerant key matching.
        private static bool TryGetArrayProperty(JsonElement root, string propertyName, out JsonElement arrayElement)
        {
            if (JsonPropertyHelper.TryGetPropertyInsensitive(root, propertyName, out arrayElement) &&
                arrayElement.ValueKind == JsonValueKind.Array)
            {
                return true;
            }

            arrayElement = default;
            return false;
        }

        // Reads integer properties from number or numeric string values.
        private static int? TryReadIntProperty(JsonElement root, string propertyName)
        {
            if (!JsonPropertyHelper.TryGetPropertyInsensitive(root, propertyName, out var element))
            {
                return null;
            }

            if (element.ValueKind == JsonValueKind.Number && element.TryGetInt32(out var fromNumber))
            {
                return fromNumber;
            }

            if (element.ValueKind == JsonValueKind.String &&
                int.TryParse(element.GetString(), out var fromString))
            {
                return fromString;
            }

            return null;
        }

        // Reads a property value as text from string or primitive values.
        private static string? ReadStringLikeProperty(JsonElement root, params string[] keys)
        {
            foreach (var key in keys)
            {
                if (!JsonPropertyHelper.TryGetPropertyInsensitive(root, key, out var value))
                {
                    continue;
                }

                if (value.ValueKind == JsonValueKind.String)
                {
                    return value.GetString();
                }

                if (value.ValueKind == JsonValueKind.Number ||
                    value.ValueKind == JsonValueKind.True ||
                    value.ValueKind == JsonValueKind.False)
                {
                    return value.ToString();
                }
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
