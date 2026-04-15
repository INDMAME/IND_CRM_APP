using System;
using System.Collections.Generic;
using System.Net;

namespace IND_CRM_APP.Services.Http
{
    /// <summary>
    /// DTO for HTTP response data (raw body, headers, status, error).
    /// </summary>
    public class HttpResult
    {
        public string Raw { get; set; } = string.Empty;
        public IDictionary<string, IEnumerable<string>> Headers { get; set; } =
            new Dictionary<string, IEnumerable<string>>(StringComparer.OrdinalIgnoreCase);
        public bool IsSuccessStatusCode { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string? ErrorMessage { get; set; }
        public long DurationMs { get; set; }
    }
}
