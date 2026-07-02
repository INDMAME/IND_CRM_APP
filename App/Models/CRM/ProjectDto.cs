using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Project list item payload.
    public class ProjectDto
    {
        [JsonPropertyName("ProjId")]
        public string ProjId { get; set; } = string.Empty;

        [JsonPropertyName("Name")]
        public string Name { get; set; } = string.Empty;

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? Extra { get; set; }
    }
}
