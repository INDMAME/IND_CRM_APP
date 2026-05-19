using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// Model for create activity request data.
    /// </summary>
    public class CreateActivityRequest
    {
        // Map AccountNum -> accountNum to match the API.
        [JsonPropertyName("accountNum")]
        public string AccountNum { get; set; } = string.Empty;

        // Mapea VisitType -> visitType
        [JsonPropertyName("visitType")]
        public string VisitType { get; set; } = string.Empty;

        // Mapea Description -> description
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        // Mapea TransDate -> transDate
        [JsonPropertyName("transDate")]
        public string TransDate { get; set; } = string.Empty;

        // Maps ContactMethod -> contactMethod (INDContactMethod enum value).
        [JsonPropertyName("contactMethod")]
        public int? ContactMethod { get; set; }

        // Mapea Comentarios -> comentarios
        [JsonPropertyName("comentarios")]
        public string Comentarios { get; set; } = string.Empty;

        // Mapea Antecedentes -> antecedentes
        [JsonPropertyName("antecedentes")]
        public string Antecedentes { get; set; } = string.Empty;

        // Mapea Conclusiones -> conclusiones
        [JsonPropertyName("conclusiones")]
        public string Conclusiones { get; set; } = string.Empty;
    }
}
