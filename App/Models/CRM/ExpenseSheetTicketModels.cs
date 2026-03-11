using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Request payload for ticket list filtering.
    public class ExpenseSheetTicketListRequest
    {
        [JsonPropertyName("page")]
        public int Page { get; set; } = 1;

        [JsonPropertyName("pageSize")]
        public int PageSize { get; set; } = 50;

        [JsonPropertyName("createdDateFrom")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CreatedDateFrom { get; set; }

        [JsonPropertyName("createdDateTo")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CreatedDateTo { get; set; }

        [JsonPropertyName("searchKey")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? SearchKey { get; set; }

        [JsonPropertyName("filter")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Filter { get; set; }

        [JsonPropertyName("status")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? Status { get; set; }

        [JsonPropertyName("currencyCode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CurrencyCode { get; set; }

        [JsonPropertyName("gastoType")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? GastoType { get; set; }

        [JsonPropertyName("processedByAI")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public bool? ProcessedByAI { get; set; }
    }

    // Request payload for ticket line create/update.
    public class ExpenseSheetTicketLineRequest
    {
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("qty")]
        public decimal Qty { get; set; }

        [JsonPropertyName("price")]
        public decimal Price { get; set; }

        [JsonPropertyName("totalAmount")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public decimal? TotalAmount { get; set; }
    }

    // Request payload for ticket creation by mode.
    public class ExpenseSheetTicketCreateRequest
    {
        [JsonPropertyName("mode")]
        public int Mode { get; set; }

        [JsonPropertyName("existingFileId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ExistingFileId { get; set; }

        [JsonPropertyName("description")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Description { get; set; }

        [JsonPropertyName("currencyCode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CurrencyCode { get; set; }

        [JsonPropertyName("totalAmount")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public decimal? TotalAmount { get; set; }

        [JsonPropertyName("status")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? Status { get; set; }

        [JsonPropertyName("transDate")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TransDate { get; set; }

        [JsonPropertyName("comentario")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Comentario { get; set; }

        [JsonPropertyName("urlFile")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? UrlFile { get; set; }

        [JsonPropertyName("fileName")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? FileName { get; set; }

        [JsonPropertyName("fileExtension")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? FileExtension { get; set; }

        [JsonPropertyName("processedByAI")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public bool? ProcessedByAI { get; set; }

        [JsonPropertyName("gastoType")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? GastoType { get; set; }

        [JsonPropertyName("lines")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public List<ExpenseSheetTicketLineRequest>? Lines { get; set; }
    }

    // Request payload for ticket header update.
    public class ExpenseSheetTicketUpdateRequest
    {
        [JsonPropertyName("description")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Description { get; set; }

        [JsonPropertyName("currencyCode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CurrencyCode { get; set; }

        [JsonPropertyName("totalAmount")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public decimal? TotalAmount { get; set; }

        [JsonPropertyName("status")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? Status { get; set; }

        [JsonPropertyName("transDate")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TransDate { get; set; }

        [JsonPropertyName("comentario")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Comentario { get; set; }

        [JsonPropertyName("urlFile")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? UrlFile { get; set; }

        [JsonPropertyName("fileName")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? FileName { get; set; }

        [JsonPropertyName("processedByAI")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public bool? ProcessedByAI { get; set; }

        [JsonPropertyName("fileExtension")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? FileExtension { get; set; }

        [JsonPropertyName("gastoType")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? GastoType { get; set; }
    }

    // Request payload for ticket file preview loading.
    public class ExpenseSheetTicketPreviewRequest
    {
        [JsonPropertyName("fileId")]
        public string? FileId { get; set; }

        [JsonPropertyName("urlFile")]
        public string? UrlFile { get; set; }
    }

    // Ticket item returned by list endpoint.
    public class ExpenseSheetTicketListItemDto
    {
        [JsonPropertyName("FileId")]
        public string FileId { get; set; } = string.Empty;

        [JsonPropertyName("Description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("Status")]
        public int? Status { get; set; }

        [JsonPropertyName("HojaGastosIdDisplay")]
        public string HojaGastosIdDisplay { get; set; } = string.Empty;

        [JsonPropertyName("ProcessedByAI")]
        public bool? ProcessedByAI { get; set; }

        [JsonPropertyName("CurrencyCode")]
        public string CurrencyCode { get; set; } = string.Empty;

        [JsonPropertyName("TotalAmount")]
        public decimal? TotalAmount { get; set; }

        [JsonPropertyName("CreatedByUserId")]
        public string CreatedByUserId { get; set; } = string.Empty;

        [JsonPropertyName("TransDate")]
        public string TransDate { get; set; } = string.Empty;

        [JsonPropertyName("UrlFile")]
        public string UrlFile { get; set; } = string.Empty;

        [JsonPropertyName("FileName")]
        public string FileName { get; set; } = string.Empty;

        [JsonPropertyName("GastoType")]
        public int? GastoType { get; set; }
    }

    // Ticket line item returned by detail endpoint.
    public class ExpenseSheetTicketLineDto
    {
        [JsonPropertyName("RecId")]
        public string RecId { get; set; } = string.Empty;

        [JsonPropertyName("Description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("Qty")]
        public decimal? Qty { get; set; }

        [JsonPropertyName("Price")]
        public decimal? Price { get; set; }

        [JsonPropertyName("TotalAmount")]
        public decimal? TotalAmount { get; set; }

        [JsonPropertyName("RefRecIdTable")]
        public string RefRecIdTable { get; set; } = string.Empty;

        [JsonPropertyName("CreatedByUserId")]
        public string CreatedByUserId { get; set; } = string.Empty;
    }

    // Ticket detail with line collection.
    public class ExpenseSheetTicketDetailDto
    {
        [JsonPropertyName("FileId")]
        public string FileId { get; set; } = string.Empty;

        [JsonPropertyName("Description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("Status")]
        public int? Status { get; set; }

        [JsonPropertyName("HojaGastosIdDisplay")]
        public string HojaGastosIdDisplay { get; set; } = string.Empty;

        [JsonPropertyName("ProcessedByAI")]
        public bool? ProcessedByAI { get; set; }

        [JsonPropertyName("CurrencyCode")]
        public string CurrencyCode { get; set; } = string.Empty;

        [JsonPropertyName("TotalAmount")]
        public decimal? TotalAmount { get; set; }

        [JsonPropertyName("CreatedByUserId")]
        public string CreatedByUserId { get; set; } = string.Empty;

        [JsonPropertyName("TransDate")]
        public string TransDate { get; set; } = string.Empty;

        [JsonPropertyName("Comentario")]
        public string Comentario { get; set; } = string.Empty;

        [JsonPropertyName("UrlFile")]
        public string UrlFile { get; set; } = string.Empty;

        [JsonPropertyName("FileName")]
        public string FileName { get; set; } = string.Empty;

        [JsonPropertyName("GastoType")]
        public int? GastoType { get; set; }

        [JsonPropertyName("Lines")]
        public List<ExpenseSheetTicketLineDto> Lines { get; set; } = new();
    }
}
