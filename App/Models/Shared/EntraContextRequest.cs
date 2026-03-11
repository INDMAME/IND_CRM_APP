using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Shared
{
    // Request payload for internal /api/auth/entra/context proxy action.
    public class EntraContextRequest
    {
        [JsonPropertyName("entraOid")]
        public string? EntraOid { get; set; }

        [JsonPropertyName("appCode")]
        public string? AppCode { get; set; }
    }
}
