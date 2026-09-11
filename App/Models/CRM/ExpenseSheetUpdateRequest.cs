using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Request payload for updating the expense sheet header.
    public class ExpenseSheetUpdateRequest
    {
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

        // Distinguishes an omitted project from an explicit value, including an empty value.
        [JsonPropertyName("projIdProvided")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public bool? ProjIdProvided { get; set; }

        [JsonPropertyName("voucher")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Voucher { get; set; }

        [JsonPropertyName("expenseSheetStatus")]
        public int? ExpenseSheetStatus { get; set; }

        [JsonPropertyName("exchangeRateMode")]
        public int? ExchangeRateMode { get; set; }

        [JsonPropertyName("estadoComentarios")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? EstadoComentarios { get; set; }

        [JsonPropertyName("reimbursableExpense")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? ReimbursableExpense { get; set; }
    }
}
