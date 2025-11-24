using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services.Http;
using System.Net.Http.Headers;
using System.Text.Json;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Servicio central de comunicacion con IND CRM APIs (Axapta 3.0).
    /// Maneja login, entorno, cuentas, contactos, actividades y visitas.
    /// </summary>
    public class ApiClientService : ICrmApiClient
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
            // Se guarda la base url sin barra final para evitar errores al concatenar
            _baseUrl = (config["ApiSettings:BaseUrl"] ?? string.Empty).TrimEnd('/');
        }

        // Metodo interno para construir urls relativas a la base
        // Ejemplo: BuildUrl("api/auth/login")
        private string BuildUrl(string relativePath)
        {
            return $"{_baseUrl}/{relativePath.TrimStart('/')}";
        }

        // ======================================================
        // LOGIN
        // ======================================================

        // Metodo para autenticar al usuario contra la API
        // Llama a /api/auth/login y devuelve el token JWT
        public async Task<string?> AuthenticateAsync(string username, string password)
        {
            var req = new LoginRequest
            {
                Username = username,
                Password = password
            };

            var json = JsonSerializer.Serialize(req);
            var raw = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/auth/login"),
                json
            );

            var result = JsonSerializer.Deserialize<LoginResult>(raw, _jsonOptions);

            return result?.Token;
        }

        // Metodo para refrescar el token actual sin usar password
        // Llama a /api/auth/refresh enviando el token en Authorization
        // Devuelve el nuevo token y la nueva fecha de expiracion
        public async Task<LoginResult?> RefreshTokenAsync(string currentToken)
        {
            // Aplicar el token actual en el header Authorization
            AddToken(currentToken);

            // El endpoint de refresh no necesita body, se envia un json vacio
            var raw = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/auth/refresh"),
                "{}"
            );

            var result = JsonSerializer.Deserialize<LoginResult>(raw, _jsonOptions);
            return result;
        }

        // ======================================================
        // ENTORNO
        // ======================================================

        // Metodo para obtener el nombre del entorno (por ejemplo TEST o PROD)
        // Llama a /api/system/getEnvironmentName y devuelve solo el texto
        public async Task<string> GetEnvironmentAsync(string token)
        {
            AddToken(token);

            var raw = await HttpHelper.GetAsync(
                _client,
                BuildUrl("api/system/getEnvironmentName")
            );

            if (string.IsNullOrWhiteSpace(raw))
                return string.Empty;

            // Se espera un json del tipo { "environment": "TEST" }
            try
            {
                var envObj = JsonSerializer.Deserialize<EnvironmentResult>(raw, _jsonOptions);
                return envObj?.Environment ?? string.Empty;
            }
            catch
            {
                // Si falla la deserializacion se devuelve el raw sin comillas
                return raw.Replace("\"", string.Empty);
            }
        }

        // Metodo para obtener los datos de la compania actual
        // Llama a /api/system/getCompanyName y devuelve el nombre de la empresa
        public async Task<string> GetCompanyNameAsync(string token)
        {
            AddToken(token);

            var raw = await HttpHelper.GetAsync(
                _client,
                BuildUrl("api/system/getCompanyName")
            );

            if (string.IsNullOrWhiteSpace(raw))
                return string.Empty;

            // Se espera un json del tipo { "companyId": "...", "companyName": "...", "company": "..." }
            try
            {
                var compObj = JsonSerializer.Deserialize<CompanyResult>(raw, _jsonOptions);
                return compObj?.CompanyName ?? string.Empty;
            }
            catch
            {
                return raw.Replace("\"", string.Empty);
            }
        }

        // ======================================================
        // CUENTAS CRM
        // ======================================================

        // Metodo para obtener la lista paginada de cuentas CRM
        // Llama a /api/crm/accounts/listAccounts enviando filtro y paginacion
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
                page = page,
                pageSize = pageSize
            };

            var json = JsonSerializer.Serialize(payload);
            var raw = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/accounts/listAccounts"),
                json
            );

            return JsonSerializer.Deserialize<PagedApiResponse<AccountDto>>(raw, _jsonOptions)
                   ?? new PagedApiResponse<AccountDto>();
        }

        // ======================================================
        // CONTACTOS CRM
        // ======================================================

        // Metodo para obtener la lista paginada de contactos de una cuenta
        // Llama a /api/crm/accounts/listContacts enviando el accountNum
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
                page = page,
                pageSize = pageSize
            };

            var json = JsonSerializer.Serialize(payload);
            var raw = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/accounts/listContacts"),
                json
            );

            return JsonSerializer.Deserialize<PagedApiResponse<ContactoDto>>(raw, _jsonOptions)
                   ?? new PagedApiResponse<ContactoDto>();
        }

        // ======================================================
        // HISTORIAL DE ACTIVIDADES
        // ======================================================

        // Metodo para obtener la lista paginada de actividades
        // Llama a /api/crm/activities/list enviando el filtro ActivitiesFilter
        public async Task<PagedApiResponse<ActivityDto>> GetActivitiesAsync(
            string token,
            ActivitiesFilter filter)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(filter);
            var raw = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/activities/list"),
                json
            );

            return JsonSerializer.Deserialize<PagedApiResponse<ActivityDto>>(raw, _jsonOptions)
                   ?? new PagedApiResponse<ActivityDto>();
        }

        // ======================================================
        // CREAR ACTIVIDAD
        // ======================================================

        // Metodo para crear una nueva actividad en Axapta
        // Llama a /api/crm/activities/create con los datos de CreateActivityRequest
        public async Task<ApiResponse> CreateActivityAsync(string token, CreateActivityRequest req)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(req);
            var raw = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/activities/create"),
                json
            );

            return JsonSerializer.Deserialize<ApiResponse>(raw, _jsonOptions)
                    ?? new ApiResponse { Success = false, Message = "Null response" };
        }

        // ======================================================
        // CREAR VISITA ASISTENTE
        // ======================================================

        // Metodo para crear un asistente asociado a una visita o actividad
        // Llama a /api/crm/visits/createVisitaAsistente con los datos del asistente
        public async Task<ApiResponse> CreateVisitaAsistenteAsync(string token, CreateVisitaAsistenteRequest req)
        {
            AddToken(token);

            var json = JsonSerializer.Serialize(req);
            var raw = await HttpHelper.PostAsync(
                _client,
                BuildUrl("api/crm/visits/createVisitaAsistente"),
                json
            );

            return JsonSerializer.Deserialize<ApiResponse>(raw, _jsonOptions)
                ?? new ApiResponse { Success = false, Message = "Null response" };
        }

        // ======================================================
        // TOKEN HEADER
        // ======================================================

        // Metodo interno para aplicar el token JWT en el header Authorization
        private void AddToken(string token)
        {
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }

        // Tipos internos simples para deserializar respuestas de entorno y compania
        private class EnvironmentResult
        {
            public string Environment { get; set; }
        }

        private class CompanyResult
        {
            public string CompanyId { get; set; }
            public string CompanyName { get; set; }
            public string Company { get; set; }
        }
    }
}
