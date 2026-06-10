using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Visible user returned by the CRM data visibility layer.
    public class DataVisibilityVisibleUserDto
    {
        /// <summary>
        /// Short user alias from AX or the data-visibility source.
        /// </summary>
        [JsonPropertyName("Alias")]
        public string Alias { get; set; } = string.Empty;

        /// <summary>
        /// Functional AX user id used as the owner key for record-level checks.
        /// </summary>
        [JsonPropertyName("AxUserId")]
        public string AxUserId { get; set; } = string.Empty;

        /// <summary>
        /// Optional legacy CRM user id. Do not use it as the owner key when AX ownership is available.
        /// </summary>
        [JsonPropertyName("CrmUserId")]
        public string CrmUserId { get; set; } = string.Empty;

        /// <summary>
        /// Display name for selectors and read-only owner labels.
        /// </summary>
        [JsonPropertyName("Name")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Visibility source, such as self, subordinate, or module business rule.
        /// </summary>
        [JsonPropertyName("Source")]
        public string Source { get; set; } = string.Empty;

        /// <summary>
        /// Mutation policy code returned by AX/API for this visible owner.
        /// </summary>
        [JsonPropertyName("MutationPolicy")]
        public string MutationPolicy { get; set; } = string.Empty;

        /// <summary>
        /// Numeric mutation policy value when AX/API returns enum-style policies.
        /// </summary>
        [JsonPropertyName("MutationPolicyInt")]
        public int? MutationPolicyInt { get; set; }

        /// <summary>
        /// Human-readable mutation policy label for diagnostics or admin views.
        /// </summary>
        [JsonPropertyName("MutationPolicyLabel")]
        public string MutationPolicyLabel { get; set; } = string.Empty;

        /// <summary>
        /// True when the current user can mutate records owned by this AX user.
        /// </summary>
        [JsonPropertyName("CanMutate")]
        public bool CanMutate { get; set; }
    }
}
