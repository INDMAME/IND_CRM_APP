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

        // Maps VisitType -> visitType as the AX enum numeric value.
        [JsonPropertyName("visitType")]
        public int? VisitType { get; set; }

        // Maps Description -> description.
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        // Maps TransDate -> transDate.
        [JsonPropertyName("transDate")]
        public string TransDate { get; set; } = string.Empty;

        // Maps ContactMethod -> contactMethod (INDContactMethod enum value).
        [JsonPropertyName("contactMethod")]
        public int? ContactMethod { get; set; }

        // Maps Comentarios -> comentarios.
        [JsonPropertyName("comentarios")]
        public string Comentarios { get; set; } = string.Empty;

        // Maps Antecedentes -> antecedentes.
        [JsonPropertyName("antecedentes")]
        public string Antecedentes { get; set; } = string.Empty;

        // Maps Conclusiones -> conclusiones.
        [JsonPropertyName("conclusiones")]
        public string Conclusiones { get; set; } = string.Empty;
    }
}
