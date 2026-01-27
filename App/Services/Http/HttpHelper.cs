using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace IND_CRM_APP.Services.Http
{
    /// <summary>
    /// Centralized helper for HTTP calls that returns headers.
    /// </summary>
    public static class HttpHelper
    {
        // ======================================================
        // GET
        // ======================================================
        public static async Task<HttpResult> GetAsync(HttpClient client, string url, CancellationToken cancellationToken = default)
        {
            var request = BuildRequest(HttpMethod.Get, url);
            return await SendAsync(client, request, url, "GET", cancellationToken);
        }

        // ======================================================
        // POST
        // ======================================================
        public static async Task<HttpResult> PostAsync(HttpClient client, string url, string jsonBody, CancellationToken cancellationToken = default)
        {
            var content = BuildJsonContent(jsonBody);
            var request = BuildRequest(HttpMethod.Post, url, content);

            return await SendAsync(client, request, url, "POST", cancellationToken);
        }

        // POST multipart/form-data (file uploads)
        public static async Task<HttpResult> PostMultipartAsync(
            HttpClient client,
            string url,
            MultipartFormDataContent formData,
            CancellationToken cancellationToken = default)
        {
            var request = BuildRequest(HttpMethod.Post, url, formData);

            return await SendAsync(client, request, url, "POST", cancellationToken);
        }

        // ======================================================
        // PUT
        // ======================================================
        public static async Task<HttpResult> PutAsync(HttpClient client, string url, string jsonBody, CancellationToken cancellationToken = default)
        {
            var content = BuildJsonContent(jsonBody);
            var request = BuildRequest(HttpMethod.Put, url, content);

            return await SendAsync(client, request, url, "PUT", cancellationToken);
        }

        // ======================================================
        // DELETE
        // ======================================================
        public static async Task<HttpResult> DeleteAsync(HttpClient client, string url, CancellationToken cancellationToken = default)
        {
            var request = BuildRequest(HttpMethod.Delete, url);
            return await SendAsync(client, request, url, "DELETE", cancellationToken);
        }

        // DELETE with JSON body (needed for some IND endpoints)
        public static async Task<HttpResult> DeleteAsync(HttpClient client, string url, string jsonBody, CancellationToken cancellationToken = default)
        {
            var content = BuildJsonContent(jsonBody);
            var request = BuildRequest(HttpMethod.Delete, url, content);

            return await SendAsync(client, request, url, "DELETE", cancellationToken);
        }

        // ======================================================
        // Core
        // ======================================================
        // Builds a JSON content payload for API calls.
        private static StringContent BuildJsonContent(string jsonBody)
        {
            return new StringContent(jsonBody ?? string.Empty, Encoding.UTF8, "application/json");
        }

        // Builds a request message with optional content.
        private static HttpRequestMessage BuildRequest(HttpMethod method, string url, HttpContent? content = null)
        {
            var request = new HttpRequestMessage(method, url);
            if (content != null)
                request.Content = content;

            return request;
        }

        private static async Task<HttpResult> SendAsync(
            HttpClient client,
            HttpRequestMessage requestMessage,
            string url,
            string verb,
            CancellationToken cancellationToken = default)
        {
            try
            {
                using var request = requestMessage;
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
                return BuildErrorResult(verb, url, ex);
            }
        }

        // Creates a consistent error result for failed requests.
        private static HttpResult BuildErrorResult(string verb, string url, Exception ex)
        {
            return new HttpResult
            {
                Raw = string.Empty,
                Headers = EmptyHeaders(),
                IsSuccessStatusCode = false,
                StatusCode = 0,
                ErrorMessage = $"Error en {verb} {url}: {ex.Message}"
            };
        }

        // Returns a fresh headers dictionary for error cases.
        private static IDictionary<string, IEnumerable<string>> EmptyHeaders()
        {
            return new Dictionary<string, IEnumerable<string>>(StringComparer.OrdinalIgnoreCase);
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
