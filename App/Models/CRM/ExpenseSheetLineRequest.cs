using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Line payload for expense sheets.
    public class ExpenseSheetLineRequest
    {
        [JsonPropertyName("transDate")]
        public string TransDate { get; set; } = string.Empty;

        [JsonPropertyName("typeValue")]
        public int TypeValue { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("internacional")]
        public bool Internacional { get; set; }

        [JsonPropertyName("fileId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? FileId { get; set; }

        [JsonPropertyName("ticket")]
        public bool Ticket { get; set; }

        [JsonPropertyName("qty")]
        public decimal Qty { get; set; }

        [JsonPropertyName("price")]
        public decimal Price { get; set; }

        [JsonPropertyName("projId")]
        public string? ProjId { get; set; }

        [JsonPropertyName("reimbursableExpense")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? ReimbursableExpense { get; set; }

        [JsonPropertyName("currencyCode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CurrencyCode { get; set; }

        [JsonPropertyName("amountMST")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public decimal? AmountMST { get; set; }

        [JsonPropertyName("exchRate")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public decimal? ExchRate { get; set; }

        [JsonPropertyName("indAttachFiles")]
        public string IndAttachFiles { get; set; } = string.Empty;
    }
}
