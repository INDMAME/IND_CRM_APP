using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Optional project target for atomic header-to-line propagation.
    public class ExpenseSheetProjectDefaultPropagationRequest
    {
        [JsonPropertyName("projId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ProjId { get; set; }

        // True keeps an explicit empty project distinct from an omitted target.
        [JsonPropertyName("projIdProvided")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public bool? ProjIdProvided { get; set; }
    }
}
