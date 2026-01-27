using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Expense sheet line detail.
    public class ExpenseSheetLineDto
    {
        [JsonPropertyName("lineRecId")]
        public string LineRecId { get; set; } = string.Empty;

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? Extra { get; set; }
    }
}
