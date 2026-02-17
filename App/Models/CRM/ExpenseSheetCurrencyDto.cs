using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Expense sheet currency item returned by the currencies endpoint.
    public class ExpenseSheetCurrencyDto
    {
        [JsonPropertyName("CurrencyCode")]
        public string CurrencyCode { get; set; } = string.Empty;

        [JsonPropertyName("CurrencyCodeISO")]
        public string CurrencyCodeISO { get; set; } = string.Empty;

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? Extra { get; set; }
    }
}
