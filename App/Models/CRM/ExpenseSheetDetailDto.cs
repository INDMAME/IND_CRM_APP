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

        [JsonPropertyName("UserId")]
        public string? UserId { get; set; }

        [JsonPropertyName("Description")]
        public string? Description { get; set; }

        [JsonPropertyName("ExpenseSheetStatus")]
        public int? ExpenseSheetStatus { get; set; }

        [JsonPropertyName("CurrencyCode")]
        public string? CurrencyCode { get; set; }

        [JsonPropertyName("TotalAmount")]
        public decimal? TotalAmount { get; set; }

        [JsonPropertyName("ExchRate")]
        public decimal? ExchRate { get; set; }

        [JsonPropertyName("ExchangeRateMode")]
        public int? ExchangeRateMode { get; set; }

        [JsonPropertyName("ProjId")]
        public string? ProjId { get; set; }

        [JsonPropertyName("Voucher")]
        public string? Voucher { get; set; }

        [JsonPropertyName("CreatedDate")]
        public string? CreatedDate { get; set; }

        [JsonPropertyName("EstadoComentarios")]
        public string? EstadoComentarios { get; set; }

        [JsonPropertyName("ReimbursableExpense")]
        public int? ReimbursableExpense { get; set; }

        [JsonPropertyName("UserName")]
        public string? UserName { get; set; }

        [JsonPropertyName("OwnerAxUserId")]
        public string? OwnerAxUserId { get; set; }

        [JsonPropertyName("OwnerName")]
        public string? OwnerName { get; set; }

        [JsonPropertyName("lines")]
        public List<ExpenseSheetLineDto> Lines { get; set; } = new();

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? Extra { get; set; }
    }
}
