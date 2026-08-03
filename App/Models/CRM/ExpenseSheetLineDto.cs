using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Expense sheet line detail.
    public class ExpenseSheetLineDto
    {
        [JsonPropertyName("RecId")]
        public string RecId { get; set; } = string.Empty;

        [JsonPropertyName("lineRecId")]
        public string LineRecId { get; set; } = string.Empty;

        [JsonPropertyName("TransDate")]
        public string TransDate { get; set; } = string.Empty;

        [JsonPropertyName("TypeValue")]
        public int? TypeValue { get; set; }

        [JsonPropertyName("Description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("Internacional")]
        public bool? Internacional { get; set; }

        [JsonPropertyName("FileId")]
        public string FileId { get; set; } = string.Empty;

        [JsonPropertyName("Ticket")]
        public bool? Ticket { get; set; }

        [JsonPropertyName("Price")]
        public decimal? Price { get; set; }

        [JsonPropertyName("Qty")]
        public decimal? Qty { get; set; }

        [JsonPropertyName("Amount")]
        public decimal? Amount { get; set; }

        [JsonPropertyName("ProjId")]
        public string ProjId { get; set; } = string.Empty;

        [JsonPropertyName("IndAttachFiles")]
        public string IndAttachFiles { get; set; } = string.Empty;

        [JsonPropertyName("ReimbursableExpense")]
        public int? ReimbursableExpense { get; set; }

        [JsonPropertyName("CurrencyCode")]
        public string CurrencyCode { get; set; } = string.Empty;

        [JsonPropertyName("AmountMST")]
        public decimal? AmountMST { get; set; }

        [JsonPropertyName("ReimbursableAmount")]
        public decimal? ReimbursableAmount { get; set; }

        [JsonPropertyName("TotalAmountCurrency")]
        public decimal? TotalAmountCurrency { get; set; }

        [JsonPropertyName("TotalAmountMST")]
        public decimal? TotalAmountMST { get; set; }

        [JsonPropertyName("ExchRate")]
        public decimal? ExchRate { get; set; }

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? Extra { get; set; }
    }
}
