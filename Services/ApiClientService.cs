using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services.Http;
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
            ILogger<ApiClientService> logger)
        {
            _client = client;
            _tokenSession = tokenSession;
            _logger = logger;
            _baseUrl = (config["ApiSettings:BaseUrl"] ?? string.Empty).TrimEnd('/');

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
        // Environment
        // ======================================================
        public async Task<string> GetEnvironmentAsync(string token)
        {
            AddToken(token);

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
                var envObj = JsonSerializer.Deserialize<EnvironmentResult>(result.Raw, JsonOptions);
                return envObj?.Environment ?? result.Raw.Replace("\"", string.Empty);
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
                var compObj = JsonSerializer.Deserialize<CompanyResult>(result.Raw, JsonOptions);
                return compObj?.CompanyName ?? compObj?.Company ?? compObj?.CompanyId ?? result.Raw.Replace("\"", string.Empty);
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

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/activities/list"),
                Serialize(filter)
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializePagedResponse<ActivityDto>(result, "GetActivities");
        }

        public async Task<ApiResponse<ActivityDto>> GetActivityByRecIdAsync(string token, long recId)
        {
            AddToken(token);

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

            var result = await HttpHelper.DeleteAsync(
                _client,
                BuildUrl("api/crm/visits/deleteVisitaAsistente"),
                Serialize(req)
            );

            ApplyRefreshedToken(result.Headers, null);

            return DeserializeApiResponse<object>(result, "DeleteVisitaAsistente");
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
                _logger.LogError(ex, "JSON deserialization failed for {Operation}. Raw: {Raw}", operation, result.Raw);
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
                _logger.LogError(ex, "JSON deserialization failed for {Operation}. Raw: {Raw}", operation, result.Raw);
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
            _logger.LogError("API call failed: {Message}. Status: {Status}. Body: {Body}", message, result.StatusCode, result.Raw);
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
                result.Raw
            );
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
        private class EnvironmentResult
        {
            public string Environment { get; set; } = string.Empty;
        }

        private class CompanyResult
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
