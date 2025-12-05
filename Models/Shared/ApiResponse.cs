using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Standard IND API response envelope for command endpoints.
    /// Mirrors IndApiResponse<T> from the backend.
    /// </summary>
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? ErrorCode { get; set; }
        public T? Data { get; set; }
        public List<IndValidationError> Errors { get; set; } = new();
        public string? TraceId { get; set; }

        [JsonIgnore]
        public bool HasValidationErrors => Errors.Count > 0;

        public string GetMessageOrDefault(string fallback)
        {
            if (!string.IsNullOrWhiteSpace(Message))
                return Message!;
            if (!string.IsNullOrWhiteSpace(ErrorCode))
                return ErrorCode!;
            return fallback;
        }
    }

    /// <summary>
    /// Non generic helper type for endpoints that do not return data.
    /// </summary>
    public class ApiResponse : ApiResponse<object>
    {
    }
}

