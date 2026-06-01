using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Expense sheet detail payload from list/detail endpoints.
    public class ExpenseSheetDetailDto
    {
        [JsonPropertyName("hojaGastosId")]
        public string HojaGastosId { get; set; } = string.Empty;

        [JsonPropertyName("UserName")]
        public string? UserName { get; set; }

        [JsonPropertyName("lines")]
        public List<ExpenseSheetLineDto> Lines { get; set; } = new();

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? Extra { get; set; }
    }
}
