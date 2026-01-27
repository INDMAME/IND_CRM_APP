namespace IND_CRM_APP.Models.Shared
{
    // Login or refresh result data.
    public class LoginResult
    {
        // Indicates whether the operation succeeded.
        public bool Success { get; set; }

        // JWT token received from the API.
        public string Token { get; set; } = string.Empty;

        // Error message or additional info.
        public string Message { get; set; } = string.Empty;

        // Token expiration date in UTC.
        public DateTime Expires { get; set; }

        // Business error code when Success is false.
        public string? ErrorCode { get; set; }

        // Validation errors returned by the API.
        public List<IndValidationError> Errors { get; set; } = new();

        // Optional trace identifier.
        public string? TraceId { get; set; }
    }
}
