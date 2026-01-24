using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Request payload for updating the expense sheet header.
    public class ExpenseSheetUpdateRequest
    {
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("currencyCode")]
        public string CurrencyCode { get; set; } = string.Empty;

        [JsonPropertyName("exchRate")]
        public decimal ExchRate { get; set; }

        [JsonPropertyName("projId")]
        public string? ProjId { get; set; }
    }
}
