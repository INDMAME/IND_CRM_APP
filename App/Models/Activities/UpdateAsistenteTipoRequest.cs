using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// DTO for updating assistant type of an existing visit.
    /// The backend does not expose a dedicated update, so we re-send
    /// assistant entries with the new type.
    /// </summary>
    public class UpdateAsistenteTipoRequest
    {
        [JsonPropertyName("asistenteTipo")]
        public string AsistenteTipo { get; set; } = string.Empty;
    }
}

