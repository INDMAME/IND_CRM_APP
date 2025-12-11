using System.Net;
using System.Text;
using System.Threading;

namespace IND_CRM_APP.Services.Http
{
    /// <summary>
    /// Resultado estándar de una llamada HTTP (cuerpo + cabeceras).
    /// </summary>
    public class HttpResult
    {
        public string Raw { get; set; } = string.Empty;
        public IDictionary<string, IEnumerable<string>> Headers { get; set; } =
            new Dictionary<string, IEnumerable<string>>(StringComparer.OrdinalIgnoreCase);
        public bool IsSuccessStatusCode { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string? ErrorMessage { get; set; }
    }

    /// <summary>
    /// Helper centralizado para llamadas HTTP devolviendo cabeceras.
    /// </summary>
    public static class HttpHelper
    {
        // ======================================================
        // GET
        // ======================================================
        public static async Task<HttpResult> GetAsync(HttpClient client, string url, CancellationToken cancellationToken = default)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            return await SendAsync(client, request, url, "GET", cancellationToken);
        }

        // ======================================================
        // POST
        // ======================================================
        public static async Task<HttpResult> PostAsync(HttpClient client, string url, string jsonBody, CancellationToken cancellationToken = default)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, url)
            {
                Content = new StringContent(jsonBody, Encoding.UTF8, "application/json")
            };

            return await SendAsync(client, request, url, "POST", cancellationToken);
        }

        // ======================================================
        // PUT
        // ======================================================
        public static async Task<HttpResult> PutAsync(HttpClient client, string url, string jsonBody, CancellationToken cancellationToken = default)
        {
            var request = new HttpRequestMessage(HttpMethod.Put, url)
            {
                Content = new StringContent(jsonBody, Encoding.UTF8, "application/json")
            };

            return await SendAsync(client, request, url, "PUT", cancellationToken);
        }

        // ======================================================
        // DELETE
        // ======================================================
        public static async Task<HttpResult> DeleteAsync(HttpClient client, string url, CancellationToken cancellationToken = default)
        {
            var request = new HttpRequestMessage(HttpMethod.Delete, url);
            return await SendAsync(client, request, url, "DELETE", cancellationToken);
        }

        // DELETE with JSON body (needed for some IND endpoints)
        public static async Task<HttpResult> DeleteAsync(HttpClient client, string url, string jsonBody, CancellationToken cancellationToken = default)
        {
            var request = new HttpRequestMessage(HttpMethod.Delete, url)
            {
                Content = new StringContent(jsonBody, Encoding.UTF8, "application/json")
            };

            return await SendAsync(client, request, url, "DELETE", cancellationToken);
        }

        // ======================================================
        // Core
        // ======================================================
        private static async Task<HttpResult> SendAsync(
            HttpClient client,
            HttpRequestMessage request,
            string url,
            string verb,
            CancellationToken cancellationToken = default)
        {
            try
            {
                using var response = await client.SendAsync(request, HttpCompletionOption.ResponseContentRead, cancellationToken);

                var raw = await response.Content.ReadAsStringAsync();

                return new HttpResult
                {
                    Raw = raw,
                    Headers = CopyHeaders(response),
                    IsSuccessStatusCode = response.IsSuccessStatusCode,
                    StatusCode = response.StatusCode,
                    ErrorMessage = response.IsSuccessStatusCode ? null : $"{verb} {url} - {(int)response.StatusCode} {response.ReasonPhrase}"
                };
            }
            catch (Exception ex)
            {
                return new HttpResult
                {
                    Raw = string.Empty,
                    Headers = new Dictionary<string, IEnumerable<string>>(StringComparer.OrdinalIgnoreCase),
                    IsSuccessStatusCode = false,
                    StatusCode = 0,
                    ErrorMessage = $"Error en {verb} {url}: {ex.Message}"
                };
            }
        }

        private static IDictionary<string, IEnumerable<string>> CopyHeaders(HttpResponseMessage response)
        {
            var dict = new Dictionary<string, IEnumerable<string>>(StringComparer.OrdinalIgnoreCase);

            foreach (var h in response.Headers)
                dict[h.Key] = h.Value;

            foreach (var h in response.Content.Headers)
                dict[h.Key] = h.Value;

            return dict;
        }
    }
}
