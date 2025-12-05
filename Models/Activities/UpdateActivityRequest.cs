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

        [JsonPropertyName("visitType")]
        public string VisitType { get; set; } = string.Empty;

        [JsonPropertyName("userId")]
        public string UserId { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("transDate")]
        public string TransDate { get; set; } = string.Empty;

        [JsonPropertyName("comentarios")]
        public string Comentarios { get; set; } = string.Empty;

        [JsonPropertyName("antecedentes")]
        public string Antecedentes { get; set; } = string.Empty;

        [JsonPropertyName("conclusiones")]
        public string Conclusiones { get; set; } = string.Empty;
    }
}

