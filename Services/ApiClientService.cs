using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services.Http;
using System.Net.Http.Headers;

using System.Text.Json;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Servicio central de comunicación con IND CRM APIs (Axapta 3.0).
    /// Maneja login, clientes, contactos, actividades y asistencias.
    /// </summary>
    public class ApiClientService
    {
        private readonly HttpClient _client;
        private readonly string _baseUrl;

        private static readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public ApiClientService(HttpClient client, IConfiguration config)
        {
            _client = client;
            _baseUrl = config["ApiSettings:BaseUrl"];
        }

        // ======================================================
        // LOGIN
        // ======================================================
        public async Task<string?> AuthenticateAsync(string username, string password)
        {
            var req = new LoginRequest
            {
                Username = username,
                Password = password
            };

            var json = JsonSerializer.Serialize(req);
            var raw = await HttpHelper.PostAsync(_client, $"{_baseUrl}/auth/login", json);

            var result = JsonSerializer.Deserialize<LoginResult>(raw, _jsonOptions);

            return result?.Token;
        }

        // ======================================================
        // ENTORNO
        // ======================================================
        public async Task<string> GetEnvironmentAsync(string token)
        {
            AddToken(token);

            var raw = await HttpHelper.GetAsync(_client, $"{_baseUrl}/axapta/GetEnvironmentName");
            return raw?.Replace("\"", "") ?? "";
        }

        public async Task<string> GetCompanyNameAsync(string token)
        {
            AddToken(token);

            var raw = await HttpHelper.GetAsync(_client, $"{_baseUrl}/axapta/GetCompanyName");
            return raw?.Replace("\"", "") ?? "";
        }

        // ======================================================
        // CUENTAS CRM
        // ======================================================
        public async Task<PagedApiResponse<AccountDto>> GetAccountsAsync(string token, string? accountNum, int page, int pageSize)
        {
            AddToken(token);

            var payload = new
            {
                accountNum = accountNum ?? "",
                page = page,
                pageSize = pageSize
            };

            var json = JsonSerializer.Serialize(payload);
            var raw = await HttpHelper.PostAsync(
                _client,
                $"{_baseUrl}/axapta/GetAccountContainer",
                json
            );

            return JsonSerializer.Deserialize<PagedApiResponse<AccountDto>>(raw, _jsonOptions)
                   ?? new PagedApiResponse<AccountDto>();
        }


        // ======================================================
        // CONTACTOS CRM
        // ======================================================
        public async Task<PagedApiResponse<ContactoDto>> GetContactosAsync(string token, string accountNum, int page, int pageSize)
        {
            AddToken(token);

            var payload = new
            {
                accountNum = accountNum ?? "",
                page = page,
                pageSize = pageSize
            };

            var json = JsonSerializer.Serialize(payload);
            var raw = await HttpHelper.PostAsync(
                _client,
                $"{_baseUrl}/axapta/GetContactoContainer",
                json
            );

            return JsonSerializer.Deserialize<PagedApiResponse<ContactoDto>>(raw, _jsonOptions)
                   ?? new PagedApiResponse<ContactoDto>();
        }


        // ======================================================
        // HISTORIAL DE ACTIVIDADES (opción C)
        // ======================================================
        public async Task<PagedApiResponse<ActivityDto>> GetActivitiesAsync(
    string token, ActivitiesFilter filter)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(filter);
            var raw = await HttpHelper.PostAsync(
                _client,
                $"{_baseUrl}/axapta/GetActivitiesContainer",
                json
            );

            return JsonSerializer.Deserialize<PagedApiResponse<ActivityDto>>(raw, _jsonOptions)
                   ?? new PagedApiResponse<ActivityDto>();
        }


        // ======================================================
        // CREAR ACTIVIDAD
        // ======================================================
        public async Task<ApiResponse> CreateActivityAsync(string token, CreateActivityRequest req)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(req);
            var raw = await HttpHelper.PostAsync(_client, $"{_baseUrl}/axapta/CreateActivity", json);

            return JsonSerializer.Deserialize<ApiResponse>(raw, _jsonOptions)
                    ?? new ApiResponse { Success = false, Message = "Null response" };
        }


        // ======================================================
        // CREAR VISITA ASISTENTE
        // ======================================================
        public async Task<ApiResponse> CreateVisitaAsistenteAsync(string token, CreateVisitaAsistenteRequest req)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(req);
            var raw = await HttpHelper.PostAsync(_client, $"{_baseUrl}/axapta/CreateVisitaAsistente", json);

            return JsonSerializer.Deserialize<ApiResponse>(raw, _jsonOptions)
                ?? new ApiResponse { Success = false, Message = "Null response" };

        }

        // ======================================================
        // TOKEN HEADER
        // ======================================================
        private void AddToken(string token)
        {
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }
    }
}
