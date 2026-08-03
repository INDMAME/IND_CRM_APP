using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Response data for expense sheet creation.
    public class ExpenseSheetCreateResponseData
    {
        [JsonPropertyName("HojaGastosId")]
        public string HojaGastosId { get; set; } = string.Empty;

        [JsonPropertyName("LineRecIds")]
        public List<long> LineRecIds { get; set; } = new();
    }
}
