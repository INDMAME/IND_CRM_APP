using System;
using System.Collections.Generic;
using System.Net;

namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Wraps one API envelope with its HTTP transport metadata.
    /// </summary>
    public class ApiTransportResponse<T>
    {
        public ApiResponse<T> Response { get; set; } = new();

        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;

        public IDictionary<string, IEnumerable<string>> Headers { get; set; } =
            new Dictionary<string, IEnumerable<string>>(StringComparer.OrdinalIgnoreCase);
    }
}
