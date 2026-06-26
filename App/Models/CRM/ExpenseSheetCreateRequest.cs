using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Request payload for creating an expense sheet.
    public class ExpenseSheetCreateRequest
    {
        [JsonPropertyName("userId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? UserId { get; set; }

        [JsonPropertyName("mode")]
        public int Mode { get; set; } = 0;

        [JsonPropertyName("existingHojaGastosId")]
        public string? ExistingHojaGastosId { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("currencyCode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CurrencyCode { get; set; }

        [JsonPropertyName("exchRate")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public decimal? ExchRate { get; set; }

        [JsonPropertyName("projId")]
        public string? ProjId { get; set; }

        [JsonPropertyName("expenseSheetStatus")]
        public int? ExpenseSheetStatus { get; set; }

        [JsonPropertyName("exchangeRateMode")]
        public int? ExchangeRateMode { get; set; }

        [JsonPropertyName("reimbursableExpense")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? ReimbursableExpense { get; set; }

        [JsonPropertyName("lines")]
        public List<ExpenseSheetLineRequest> Lines { get; set; } = new();
    }
}
