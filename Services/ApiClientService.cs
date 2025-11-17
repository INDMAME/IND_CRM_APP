using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;


namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Servicio central para la comunicación entre la aplicación web
    /// y la API de Axapta 3.0.  
    /// Gestiona autenticación, consultas, creación de registros y caching de datos.
    /// </summary>
    /// <remarks>
    /// Todas las operaciones de este servicio utilizan <see cref="HttpClient"/>
    /// para interactuar con los endpoints REST de la API configurada en <see cref="ApiSettings.BaseUrl"/>.
    /// </remarks>
    public class ApiClientService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly string _baseUrl;

        /// <summary>
        /// Constructor principal del servicio API.
        /// </summary>
        /// <param name="httpClient">Cliente HTTP inyectado por el contenedor de dependencias.</param>
        /// <param name="cache">Servicio de caché en memoria.</param>
        /// <param name="settings">Configuración de la URL base de la API.</param>
        public ApiClientService(HttpClient httpClient, IMemoryCache cache, IOptions<ApiSettings> settings)
        {
            _httpClient = httpClient;
            _cache = cache;
            _baseUrl = settings.Value.BaseUrl.TrimEnd('/') + "/";
        }

        /// <summary>
        /// Realiza la autenticación del usuario en la API de Axapta y obtiene un token JWT.
        /// </summary>
        /// <param name="username">Nombre de usuario.</param>
        /// <param name="password">Contraseña del usuario.</param>
        /// <returns>Token JWT válido si la autenticación fue exitosa; de lo contrario, <c>null</c>.</returns>
        public async Task<string?> AuthenticateAsync(string username, string password)
        {
            try
            {
                var payload = new { username, password };
                var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_baseUrl}auth/login", content);
                if (!response.IsSuccessStatusCode)
                    return null;

                var body = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(body);
                var root = doc.RootElement;

                if (root.TryGetProperty("token", out var tokenProp))
                {
                    if (tokenProp.ValueKind == JsonValueKind.String)
                        return tokenProp.GetString();

                    if (tokenProp.TryGetProperty("token", out var inner))
                        return inner.GetString();
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error de autenticación: {ex.Message}");
                return null;
            }
        }

        /// <summary>
        /// Obtiene una lista paginada de proyectos desde la API, con soporte de caché local.
        /// </summary>
        /// <param name="token">Token JWT de autenticación.</param>
        /// <param name="skip">Número de registros a omitir (para paginación).</param>
        /// <param name="take">Número máximo de registros a devolver.</param>
        /// <param name="filter">Texto de filtro opcional.</param>
        /// <returns>Tupla con los elementos y el total de registros disponibles.</returns>
        public async Task<(List<ProjectResponse> Items, int Total)> GetProjectsAsync(
            string token, int skip = 0, int take = 100, string? filter = null)
        {
            var cacheKey = $"projects:{skip}:{take}:{filter}";
            if (_cache.TryGetValue(cacheKey, out (List<ProjectResponse> Items, int Total) cached))
                return cached;

            try
            {
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var url = $"{_baseUrl}axapta/GetProjectsList?skip={skip}&take={take}";
                if (!string.IsNullOrEmpty(filter))
                    url += $"&filter={Uri.EscapeDataString(filter)}";

                var resp = await _httpClient.GetAsync(url);
                if (!resp.IsSuccessStatusCode)
                    return (new List<ProjectResponse>(), 0);

                var json = await resp.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                if (root.TryGetProperty("items", out var items))
                {
                    var total = root.TryGetProperty("total", out var t) ? t.GetInt32() : 0;
                    var list = JsonSerializer.Deserialize<List<ProjectResponse>>(items.GetRawText(),
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new List<ProjectResponse>();

                    _cache.Set(cacheKey, (list, total), TimeSpan.FromSeconds(30));
                    return (list, total);
                }
                else
                {
                    var data = JsonSerializer.Deserialize<List<ProjectResponse>>(json,
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new List<ProjectResponse>();

                    _cache.Set(cacheKey, (data, data.Count), TimeSpan.FromSeconds(30));
                    return (data, data.Count);
                }
            }
            catch
            {
                return (new List<ProjectResponse>(), 0);
            }
        }


        /// <summary>
        /// Obtiene el nombre del entorno (TEST, PROD, etc.) desde la API de Axapta.
        /// </summary>
        /// <param name="token">Token JWT válido.</param>
        /// <returns>Nombre del ambiente o <c>null</c> si no se pudo recuperar.</returns>
        public async Task<string?> GetEnvironmentAsync(string token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var resp = await _httpClient.GetAsync($"{_baseUrl}axapta/GetEnvironmentName");
                if (!resp.IsSuccessStatusCode)
                    return null;

                var text = await resp.Content.ReadAsStringAsync();

                // 🔹 Normaliza el texto: si está entre comillas, quítalas
                text = text.Trim();

                if (text.StartsWith("\"") && text.EndsWith("\""))
                {
                    text = text.Trim('"'); // ← quita las comillas del JSON plano
                    return text;
                }

                // 🔹 Si es JSON real, lo parsea correctamente
                if (text.StartsWith("{"))
                {
                    using var doc = JsonDocument.Parse(text);
                    if (doc.RootElement.TryGetProperty("environment", out var env))
                        return env.GetString();
                }

                return text;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error GetEnvironmentAsync: {ex.Message}");
                return null;
            }
        }


        /// <summary>
        /// Obtiene el nombre de la compañía actual de la sesión Axapta.
        /// </summary>
        /// <param name="token">Token JWT activo.</param>
        /// <returns>Nombre de la compañía o <c>null</c>.</returns>
        public async Task<string?> GetCompanyNameAsync(string token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var resp = await _httpClient.GetAsync($"{_baseUrl}axapta/GetCompanyName");
                if (!resp.IsSuccessStatusCode) return null;

                var json = await resp.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                return doc.RootElement.TryGetProperty("company", out var c) ? c.GetString() : null;
            }
            catch { return null; }
        }


        public async Task<(int Total, List<ActivityResponse> Items)> GetActivitiesAsync(string token,
                                                                                        string userId,
                                                                                        string fromDate,
                                                                                        string toDate,
                                                                                        string actividadType)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                var payload = new
                {
                    userId = userId ?? "",
                    fromDate = fromDate ?? "",
                    toDate = toDate ?? "",
                    actividadType = actividadType ?? ""
                };

                var content = new StringContent(
                    JsonSerializer.Serialize(payload),
                    Encoding.UTF8,
                    "application/json");

                var resp = await _httpClient.PostAsync($"{_baseUrl}axapta/GetActivitiesContainer", content);
                if (!resp.IsSuccessStatusCode)
                    return (0, new List<ActivityResponse>());

                var json = await resp.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                int total = root.TryGetProperty("total", out var t) ? t.GetInt32() : 0;

                var list = new List<ActivityResponse>();

                if (root.TryGetProperty("items", out var itemsEl))
                {
                    list = JsonSerializer.Deserialize<List<ActivityResponse>>(
                        itemsEl.GetRawText(),
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                    ) ?? new List<ActivityResponse>();
                }

                return (total, list);
            }
            catch
            {
                return (0, new List<ActivityResponse>());
            }
        }

        public async Task<ApiBasicResult> CreateActivityAsync(string token, CreateActivityRequest model)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                var content = new StringContent(
                    JsonSerializer.Serialize(model),
                    Encoding.UTF8,
                    "application/json");

                var resp = await _httpClient.PostAsync($"{_baseUrl}axapta/CreateActivity", content);

                var json = await resp.Content.ReadAsStringAsync();

                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                string message = root.TryGetProperty("message", out var m) ? m.GetString() : "NOK";

                return new ApiBasicResult
                {
                    Success = message.StartsWith("OK"),
                    Message = message
                };
            }
            catch (Exception ex)
            {
                return new ApiBasicResult
                {
                    Success = false,
                    Message = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<ApiBasicResult> CreateVisitaAsistenteAsync(string token, CreateVisitaAsistenteRequest model)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                var content = new StringContent(
                    JsonSerializer.Serialize(model),
                    Encoding.UTF8,
                    "application/json");

                var resp = await _httpClient.PostAsync($"{_baseUrl}axapta/CreateVisitaAsistente", content);

                var json = await resp.Content.ReadAsStringAsync();

                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                string message = root.TryGetProperty("message", out var m) ? m.GetString() : "NOK";

                return new ApiBasicResult
                {
                    Success = message.StartsWith("OK"),
                    Message = message
                };
            }
            catch (Exception ex)
            {
                return new ApiBasicResult
                {
                    Success = false,
                    Message = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<(int Total, List<ContactDto> Items)> GetContactosAsync(string token, string accountNum, int page, int pageSize)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                var payload = new
                {
                    accountNum = accountNum ?? "",
                    page = page,
                    pageSize = pageSize
                };

                var content = new StringContent(
                    JsonSerializer.Serialize(payload),
                    Encoding.UTF8,
                    "application/json");

                var resp = await _httpClient.PostAsync($"{_baseUrl}axapta/GetContactoContainer", content);

                var json = await resp.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                int total = root.TryGetProperty("total", out var t) ? t.GetInt32() : 0;

                var items = JsonSerializer.Deserialize<List<ContactDto>>(
                    root.GetProperty("items").GetRawText(),
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                return (total, items ?? new List<ContactDto>());
            }
            catch
            {
                return (0, new List<ContactDto>());
            }
        }

        public async Task<(int Total, List<AccountDto> Items)> GetAccountsAsync(string token, string accountNum, int page, int pageSize)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                var payload = new
                {
                    accountNum = accountNum ?? "",
                    page = page,
                    pageSize = pageSize
                };

                var content = new StringContent(
                    JsonSerializer.Serialize(payload),
                    Encoding.UTF8,
                    "application/json");

                var resp = await _httpClient.PostAsync($"{_baseUrl}axapta/GetAccountContainer", content);

                var json = await resp.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                int total = root.TryGetProperty("total", out var t) ? t.GetInt32() : 0;

                var items = JsonSerializer.Deserialize<List<AccountDto>>(
                    root.GetProperty("items").GetRawText(),
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                return (total, items ?? new List<AccountDto>());
            }
            catch
            {
                return (0, new List<AccountDto>());
            }
        }

    }
}
