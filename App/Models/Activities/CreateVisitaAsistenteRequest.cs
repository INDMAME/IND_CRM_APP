using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// Model for create visita asistente request data.
    /// </summary>
    public class CreateVisitaAsistenteRequest
    {
        // Mapea RefRecIdActividad -> refRecIdActividad
        [JsonPropertyName("refRecIdActividad")]
        public string RefRecIdActividad { get; set; } = string.Empty;

        // Mapea AsistenteTipo -> asistenteTipo
        [JsonPropertyName("asistenteTipo")]
        public string AsistenteTipo { get; set; } = string.Empty;

        // Mapea AsistenteId -> asistenteId
        [JsonPropertyName("asistenteId")]
        public string AsistenteId { get; set; } = string.Empty;

        // Mapea ContactoRecId -> contactoRecId
        [JsonPropertyName("contactoRecId")]
        public string ContactoRecId { get; set; } = string.Empty;

    }
}
