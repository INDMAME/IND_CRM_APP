using System.Net;

namespace IND_CRM_APP.Services
{
    public class ApiException : Exception
    {
        public HttpStatusCode StatusCode { get; }
        public string RawBody { get; }
        public IDictionary<string, IEnumerable<string>> Headers { get; }

        public ApiException(string message, HttpStatusCode statusCode, string rawBody, IDictionary<string, IEnumerable<string>> headers)
            : base(message)
        {
            StatusCode = statusCode;
            RawBody = rawBody;
            Headers = headers ?? new Dictionary<string, IEnumerable<string>>(StringComparer.OrdinalIgnoreCase);
        }
    }
}
