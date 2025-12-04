using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;
using System.Linq;
using System.Text.Json;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Servicio central de comunicación con IND CRM APIs (Axapta 3.0).
    /// Maneja login, entorno, cuentas, contactos, actividades y visitas.
    /// Incluye propagación de cabecera X-Refreshed-Token para refresco transparente.
    /// </summary>
    public class ApiClientService : ICrmApiClient
    {
        private readonly HttpClient _client;
        private readonly string _baseUrl;
        private readonly ITokenSessionService _tokenSession;
        private readonly ILogger<ApiClientService> _logger;

        private static readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters =
            {
                new IND_CRM_APP.Models.Activities.ActivityDtoArrayConverter(),
                new IND_CRM_APP.Models.Activities.ActivityAsistenteDtoArrayConverter(),
                new IND_CRM_APP.Models.CRM.AccountDtoArrayConverter(),
                new IND_CRM_APP.Models.CRM.ContactoDtoArrayConverter()
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

            // Base URL sin barra final
            _baseUrl = (config["ApiSettings:BaseUrl"] ?? string.Empty).TrimEnd('/');
        }

        // Construye url absoluta desde relativa
        private string BuildUrl(string relativePath)
        {
            return $"{_baseUrl}/{relativePath.TrimStart('/')}";
        }

        // ======================================================
        // LOGIN
        // ======================================================
        public async Task<LoginResult?> AuthenticateAsync(string username, string password)
        {
            var req = new LoginRequest
            {
                Username = username,
                Password = password
            };

            var json = JsonSerializer.Serialize(req);
            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/auth/login"),
                json
            );

            EnsureSuccess(result, "Login");

            var login = Deserialize<LoginResult>(result.Raw);
            ApplyRefreshedToken(result.Headers, login?.Expires);
            return login;
        }

        // ======================================================
        // REFRESH
        // ======================================================
        public async Task<LoginResult?> RefreshTokenAsync(string currentToken)
        {
            AddToken(currentToken);

            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/auth/refresh"),
                "{}"
            );

            EnsureSuccess(result, "Refresh");

            var login = Deserialize<LoginResult>(result.Raw);
            ApplyRefreshedToken(result.Headers, login?.Expires);

            // Si la API no mandó cabecera, aplicamos el token retornado en el body
            if (login != null && !string.IsNullOrWhiteSpace(login.Token))
            {
                ApplyRefreshedTokenFromBody(login);
            }

            return login;
        }

        // ======================================================
        // ENTORNO
        // ======================================================
        public async Task<string> GetEnvironmentAsync(string token)
        {
            AddToken(token);

            var result = await HttpHelper.GetAsync(
                _client,
                BuildUrl("api/system/getEnvironmentName")
            );

            EnsureSuccess(result, "GetEnvironment");
            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
                return string.Empty;

            try
            {
                var envObj = Deserialize<EnvironmentResult>(result.Raw);
                return envObj?.Environment ?? string.Empty;
            }
            catch
            {
                return result.Raw.Replace("\"", string.Empty);
            }
        }

        // ======================================================
        // COMPANY
        // ======================================================
        public async Task<string> GetCompanyNameAsync(string token)
        {
            AddToken(token);

            var result = await HttpHelper.GetAsync(
                _client,
                BuildUrl("api/system/getCompanyName")
            );

            EnsureSuccess(result, "GetCompanyName");
            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
                return string.Empty;

            try
            {
                var compObj = Deserialize<CompanyResult>(result.Raw);
                return compObj?.CompanyName ?? string.Empty;
            }
            catch
            {
                return result.Raw.Replace("\"", string.Empty);
            }
        }

        // ======================================================
        // CUENTAS
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

            var json = JsonSerializer.Serialize(payload);
            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/accounts/listAccounts"),
                json
            );

            EnsureSuccess(result, "GetAccounts");
            ApplyRefreshedToken(result.Headers, null);

            return Deserialize<PagedApiResponse<AccountDto>>(result.Raw)
                   ?? new PagedApiResponse<AccountDto>();
        }

        // ======================================================
        // CONTACTOS
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

            var json = JsonSerializer.Serialize(payload);
            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/accounts/listContacts"),
                json
            );

            EnsureSuccess(result, "GetContactos");
            ApplyRefreshedToken(result.Headers, null);

            return Deserialize<PagedApiResponse<ContactoDto>>(result.Raw)
                   ?? new PagedApiResponse<ContactoDto>();
        }

        // ======================================================
        // ACTIVIDADES
        // ======================================================
        public async Task<PagedApiResponse<ActivityDto>> GetActivitiesAsync(
            string token,
            ActivitiesFilter filter)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(filter);
            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/activities/list"),
                json
            );

            EnsureSuccess(result, "GetActivities");
            ApplyRefreshedToken(result.Headers, null);

            return Deserialize<PagedApiResponse<ActivityDto>>(result.Raw)
                   ?? new PagedApiResponse<ActivityDto>();
        }

        // ======================================================
        // CREAR ACTIVIDAD
        // ======================================================
        public async Task<ApiResponse> CreateActivityAsync(string token, CreateActivityRequest req)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(req);
            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/activities/create"),
                json
            );

            EnsureSuccess(result, "CreateActivity");
            ApplyRefreshedToken(result.Headers, null);

            return Deserialize<ApiResponse>(result.Raw)
                    ?? new ApiResponse { Success = false, Message = "Null response" };
        }

        // ======================================================
        // CREAR VISITA ASISTENTE
        // ======================================================
        public async Task<ApiResponse> CreateVisitaAsistenteAsync(string token, CreateVisitaAsistenteRequest req)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(req);
            var result = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/visits/createVisitaAsistente"),
                json
            );

            EnsureSuccess(result, "CreateVisitaAsistente");
            ApplyRefreshedToken(result.Headers, null);

            return Deserialize<ApiResponse>(result.Raw)
                ?? new ApiResponse { Success = false, Message = "Null response" };
        }

        // ======================================================
        // Helpers internos
        // ======================================================

        private void EnsureSuccess(HttpResult result, string operation)
        {
            if (result.IsSuccessStatusCode)
                return;

            var message = result.ErrorMessage ?? $"Error en {operation}";
            _logger.LogError("API call failed: {Message}. Status: {Status}. Body: {Body}", message, result.StatusCode, result.Raw);
            throw new ApiException(message, result.StatusCode, result.Raw, result.Headers);
        }

        private T? Deserialize<T>(string raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return default;

            try
            {
                return JsonSerializer.Deserialize<T>(raw, _jsonOptions);
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "JSON deserialization failed. Raw: {Raw}", raw);
                throw;
            }
        }

        /// <summary>
        /// Aplica token refrescado recibido en cabecera (API -> MVC) y lo propaga a sesión + respuesta.
        /// </summary>
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

        /// <summary>
        /// Usa el token devuelto en el body (login/refresh) cuando no hay cabecera.
        /// </summary>
        private void ApplyRefreshedTokenFromBody(LoginResult login)
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Token))
                return;

            var expires = login.Expires != default ? login.Expires : (DateTime?)null;
            ApplyTokenToSessionAndResponse(login.Token, expires);
        }

        private void ApplyTokenToSessionAndResponse(string newToken, DateTime? expires)
        {
            _tokenSession.SetToken(newToken, expires);
            // Asegurar que el HttpClient use el nuevo token en siguientes peticiones
            AddToken(newToken);
        }

        // Aplica el token JWT al header Authorization del HttpClient
        private void AddToken(string token)
        {
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }

        // Clases internas para deserializar
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
    }
}
