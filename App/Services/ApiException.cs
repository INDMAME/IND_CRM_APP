using System.Net;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Exception that captures HTTP error details for API calls.
    /// </summary>
    public class ApiException : Exception
    {
        public HttpStatusCode StatusCode { get; }
        public string RawBody { get; }
        public IDictionary<string, IEnumerable<string>> Headers { get; }

        // Builds an exception with status, body, and headers.
        public ApiException(string message, HttpStatusCode statusCode, string rawBody, IDictionary<string, IEnumerable<string>> headers)
            : base(message)
        {
            StatusCode = statusCode;
            RawBody = rawBody;
            Headers = headers ?? new Dictionary<string, IEnumerable<string>>(StringComparer.OrdinalIgnoreCase);
        }
    }
}
