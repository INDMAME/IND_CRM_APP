using System;
using System.Collections.Generic;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Envelope for environment API responses.
    /// </summary>
    internal class EnvironmentEnvelope
    {
        public EnvironmentData? Data { get; set; }
        public List<EnvironmentData>? Items { get; set; }
    }

    /// <summary>
    /// Environment data payload.
    /// </summary>
    internal class EnvironmentData
    {
        public string Environment { get; set; } = string.Empty;
    }

    /// <summary>
    /// Envelope for company API responses.
    /// </summary>
    internal class CompanyEnvelope
    {
        public CompanyData? Data { get; set; }
        public List<CompanyData>? Items { get; set; }
    }

    /// <summary>
    /// Company data payload.
    /// </summary>
    internal class CompanyData
    {
        public string CompanyId { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
    }

    /// <summary>
    /// Envelope for login API responses.
    /// </summary>
    internal class LoginEnvelope
    {
        public string? Token { get; set; }
        public string? Jwt { get; set; }
        public string? AccessToken { get; set; }
        public string? BearerToken { get; set; }
        public DateTime? Expires { get; set; }
        public string? Expiration { get; set; }
        public int? ExpiresInSeconds { get; set; }
    }
}
