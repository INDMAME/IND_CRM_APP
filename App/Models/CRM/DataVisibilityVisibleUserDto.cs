using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Visible user returned by the CRM data visibility layer.
    public class DataVisibilityVisibleUserDto
    {
        [JsonPropertyName("Alias")]
        public string Alias { get; set; } = string.Empty;

        [JsonPropertyName("AxUserId")]
        public string AxUserId { get; set; } = string.Empty;

        [JsonPropertyName("CrmUserId")]
        public string CrmUserId { get; set; } = string.Empty;

        [JsonPropertyName("Name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("Source")]
        public string Source { get; set; } = string.Empty;

        [JsonPropertyName("MutationPolicy")]
        public string MutationPolicy { get; set; } = string.Empty;

        [JsonPropertyName("MutationPolicyInt")]
        public int MutationPolicyInt { get; set; }

        [JsonPropertyName("MutationPolicyLabel")]
        public string MutationPolicyLabel { get; set; } = string.Empty;

        [JsonPropertyName("CanMutate")]
        public bool CanMutate { get; set; }
    }
}
