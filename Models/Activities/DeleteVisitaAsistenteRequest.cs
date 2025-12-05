using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// DTO for deleting an assistant from a visit.
    /// </summary>
    public class DeleteVisitaAsistenteRequest
    {
        [JsonPropertyName("refRecIdActividad")]
        public string RefRecIdActividad { get; set; } = string.Empty;

        [JsonPropertyName("asistenteId")]
        public string AsistenteId { get; set; } = string.Empty;
    }
}

