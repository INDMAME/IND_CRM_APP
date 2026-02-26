using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Subordinate item returned by /api/crm/expensesheets/subordinates.
    public class ExpenseSheetSubordinateDto
    {
        [JsonPropertyName("UserId")]
        public string UserId { get; set; } = string.Empty;

        [JsonPropertyName("Name")]
        public string Name { get; set; } = string.Empty;

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? Extra { get; set; }
    }
}
