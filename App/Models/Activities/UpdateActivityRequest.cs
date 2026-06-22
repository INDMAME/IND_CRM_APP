using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// DTO for updating an existing CRM activity in Axapta.
    /// </summary>
    public class UpdateActivityRequest
    {
        [JsonPropertyName("accountNum")]
        public string AccountNum { get; set; } = string.Empty;

        // AX visit type enum numeric value used by activity endpoints.
        [JsonPropertyName("visitType")]
        public int? VisitType { get; set; }

        // Assistant type AX enum numeric value for the first assistant entry.
        [JsonPropertyName("asistenteTipo")]
        public int? AsistenteTipo { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("transDate")]
        public string TransDate { get; set; } = string.Empty;

        [JsonPropertyName("contactMethod")]
        public int? ContactMethod { get; set; }

        [JsonPropertyName("comentarios")]
        public string Comentarios { get; set; } = string.Empty;

        [JsonPropertyName("antecedentes")]
        public string Antecedentes { get; set; } = string.Empty;

        [JsonPropertyName("conclusiones")]
        public string Conclusiones { get; set; } = string.Empty;
    }
}
