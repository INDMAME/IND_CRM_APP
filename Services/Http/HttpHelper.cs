using System.Text;
using System.Text.Json;

namespace IND_CRM_APP.Services.Http
{
    /// <summary>
    /// Helper centralizado para llamadas HTTP (GET/POST/PUT/DELETE)
    /// con manejo seguro de errores, logs y validación JSON.
    /// </summary>
    public static class HttpHelper
    {
        private static readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        // ======================================================
        // GET
        // ======================================================
        public static async Task<string> GetAsync(HttpClient client, string url)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, url);

            try
            {
                using var response = await client.SendAsync(request, HttpCompletionOption.ResponseContentRead);

                var raw = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    throw new Exception($"GET {url} → Status: {(int)response.StatusCode} → {raw}");

                return raw;
            }
            catch (Exception ex)
            {
                return JsonError($"Error en GET {url}: {ex.Message}");
            }
        }

        // ======================================================
        // POST
        // ======================================================
        public static async Task<string> PostAsync(HttpClient client, string url, string jsonBody)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, url)
            {
                Content = new StringContent(jsonBody, Encoding.UTF8, "application/json")
            };

            try
            {
                using var response = await client.SendAsync(request, HttpCompletionOption.ResponseContentRead);

                var raw = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    throw new Exception($"POST {url} → Status: {(int)response.StatusCode} → {raw}");

                return raw;
            }
            catch (Exception ex)
            {
                return JsonError($"Error en POST {url}: {ex.Message}");
            }
        }

        // ======================================================
        // PUT
        // ======================================================
        public static async Task<string> PutAsync(HttpClient client, string url, string jsonBody)
        {
            var request = new HttpRequestMessage(HttpMethod.Put, url)
            {
                Content = new StringContent(jsonBody, Encoding.UTF8, "application/json")
            };

            try
            {
                using var response = await client.SendAsync(request);

                var raw = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    throw new Exception($"PUT {url} → Status: {(int)response.StatusCode} → {raw}");

                return raw;
            }
            catch (Exception ex)
            {
                return JsonError($"Error en PUT {url}: {ex.Message}");
            }
        }

        // ======================================================
        // DELETE
        // ======================================================
        public static async Task<string> DeleteAsync(HttpClient client, string url)
        {
            var request = new HttpRequestMessage(HttpMethod.Delete, url);

            try
            {
                using var response = await client.SendAsync(request);

                var raw = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    throw new Exception($"DELETE {url} → Status: {(int)response.StatusCode} → {raw}");

                return raw;
            }
            catch (Exception ex)
            {
                return JsonError($"Error en DELETE {url}: {ex.Message}");
            }
        }

        // ======================================================
        // Helper privado para devolver errores en JSON estable
        // ======================================================
        private static string JsonError(string msg)
        {
            var obj = new
            {
                success = false,
                message = msg
            };

            return JsonSerializer.Serialize(obj, _jsonOptions);
        }
    }
}
