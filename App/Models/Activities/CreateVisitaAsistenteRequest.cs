using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// Model for create visita asistente request data.
    /// </summary>
    public class CreateVisitaAsistenteRequest
    {
        // Maps RefRecIdActividad -> refRecIdActividad.
        [JsonPropertyName("refRecIdActividad")]
        public string RefRecIdActividad { get; set; } = string.Empty;

        // Maps AsistenteTipo -> asistenteTipo as the AX enum numeric value.
        [JsonPropertyName("asistenteTipo")]
        public int? AsistenteTipo { get; set; }

        // Maps AsistenteId -> asistenteId.
        [JsonPropertyName("asistenteId")]
        public string AsistenteId { get; set; } = string.Empty;

        // Maps ContactoRecId -> contactoRecId.
        [JsonPropertyName("contactoRecId")]
        public string ContactoRecId { get; set; } = string.Empty;

    }
}
