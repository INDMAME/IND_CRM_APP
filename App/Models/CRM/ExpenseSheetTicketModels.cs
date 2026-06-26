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

    // Request payload for link-mode ticket filtering.
    public class ExpenseSheetTicketLinkListRequest
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

    // Shared filter payload used by filtered bulk link mode.
    public class ExpenseSheetTicketLinkBulkFilters
    {
        [JsonPropertyName("searchKey")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? SearchKey { get; set; }

        [JsonPropertyName("filter")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Filter { get; set; }

        [JsonPropertyName("createdDateFrom")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CreatedDateFrom { get; set; }

        [JsonPropertyName("createdDateTo")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CreatedDateTo { get; set; }

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

    // Request payload for selected or filtered bulk ticket linking.
    public class ExpenseSheetTicketLinkBulkRequest
    {
        [JsonPropertyName("expenseSheetId")]
        public string ExpenseSheetId { get; set; } = string.Empty;

        [JsonPropertyName("selectionMode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? SelectionMode { get; set; }

        [JsonPropertyName("ticketIds")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public List<string>? TicketIds { get; set; }

        [JsonPropertyName("filters")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public ExpenseSheetTicketLinkBulkFilters? Filters { get; set; }

        [JsonPropertyName("excludedIds")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public List<string>? ExcludedIds { get; set; }
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

        [JsonPropertyName("ticketDate")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TicketDate { get; set; }

        [JsonPropertyName("ticketTime")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TicketTime { get; set; }

        [JsonPropertyName("comentario")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Comentario { get; set; }

        [JsonPropertyName("urlFile")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? UrlFile { get; set; }

        [JsonPropertyName("ocrJson")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? OcrJson { get; set; }

        [JsonPropertyName("normalizedJson")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? NormalizedJson { get; set; }

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

        [JsonPropertyName("ticketDate")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TicketDate { get; set; }

        [JsonPropertyName("ticketTime")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? TicketTime { get; set; }

        [JsonPropertyName("comentario")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Comentario { get; set; }

        [JsonPropertyName("urlFile")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? UrlFile { get; set; }

        [JsonPropertyName("ocrJson")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? OcrJson { get; set; }

        [JsonPropertyName("normalizedJson")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? NormalizedJson { get; set; }

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

    // Request payload for ticket total amount adjustment.
    public class ExpenseSheetTicketTotalAdjustmentRequest
    {
        [JsonPropertyName("totalAmount")]
        public decimal? TotalAmount { get; set; }
    }

    // Result payload returned after a ticket total amount adjustment.
    public class ExpenseSheetTicketTotalAdjustmentResultDto
    {
        [JsonPropertyName("FileId")]
        public string FileId { get; set; } = string.Empty;

        [JsonPropertyName("PreviousTotalAmount")]
        public decimal? PreviousTotalAmount { get; set; }

        [JsonPropertyName("NewTotalAmount")]
        public decimal? NewTotalAmount { get; set; }

        [JsonPropertyName("DifferenceAmount")]
        public decimal? DifferenceAmount { get; set; }

        [JsonPropertyName("AdjustmentLineRecId")]
        public string AdjustmentLineRecId { get; set; } = string.Empty;

        [JsonPropertyName("AdjustmentLineCreated")]
        public bool? AdjustmentLineCreated { get; set; }

        [JsonPropertyName("AdjustmentDescription")]
        public string AdjustmentDescription { get; set; } = string.Empty;

        [JsonPropertyName("AdjustmentAmount")]
        public bool? AdjustmentAmount { get; set; }
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

        [JsonPropertyName("ProcessedByAI")]
        public bool? ProcessedByAI { get; set; }

        [JsonPropertyName("CurrencyCode")]
        public string CurrencyCode { get; set; } = string.Empty;

        [JsonPropertyName("TotalAmount")]
        public decimal? TotalAmount { get; set; }

        [JsonPropertyName("TransDate")]
        public string TransDate { get; set; } = string.Empty;

        [JsonPropertyName("TicketDate")]
        public string TicketDate { get; set; } = string.Empty;

        [JsonPropertyName("TicketTime")]
        public string TicketTime { get; set; } = string.Empty;

        [JsonPropertyName("FileName")]
        public string FileName { get; set; } = string.Empty;

        [JsonPropertyName("GastoType")]
        public int? GastoType { get; set; }

        [JsonPropertyName("OwnerAxUserId")]
        public string OwnerAxUserId { get; set; } = string.Empty;

        [JsonPropertyName("OwnerName")]
        public string OwnerName { get; set; } = string.Empty;
    }

    // Ticket item returned by link-mode list endpoint.
    public class ExpenseSheetTicketLinkListItemDto
    {
        [JsonPropertyName("FileId")]
        public string FileId { get; set; } = string.Empty;

        [JsonPropertyName("Description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("ProcessedByAI")]
        public bool? ProcessedByAI { get; set; }

        [JsonPropertyName("CurrencyCode")]
        public string CurrencyCode { get; set; } = string.Empty;

        [JsonPropertyName("TotalAmount")]
        public decimal? TotalAmount { get; set; }

        [JsonPropertyName("TransDate")]
        public string TransDate { get; set; } = string.Empty;

        [JsonPropertyName("TicketDate")]
        public string TicketDate { get; set; } = string.Empty;

        [JsonPropertyName("TicketTime")]
        public string TicketTime { get; set; } = string.Empty;

        [JsonPropertyName("FileName")]
        public string FileName { get; set; } = string.Empty;

        [JsonPropertyName("GastoType")]
        public int? GastoType { get; set; }

        [JsonPropertyName("OwnerAxUserId")]
        public string OwnerAxUserId { get; set; } = string.Empty;

        [JsonPropertyName("OwnerName")]
        public string OwnerName { get; set; } = string.Empty;
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

        [JsonPropertyName("AdjustmentAmount")]
        public bool? AdjustmentAmount { get; set; }
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

        [JsonPropertyName("TicketDate")]
        public string TicketDate { get; set; } = string.Empty;

        [JsonPropertyName("TicketTime")]
        public string TicketTime { get; set; } = string.Empty;

        [JsonPropertyName("Comentario")]
        public string Comentario { get; set; } = string.Empty;

        [JsonPropertyName("UrlFile")]
        public string UrlFile { get; set; } = string.Empty;

        [JsonPropertyName("OcrJson")]
        public string OcrJson { get; set; } = string.Empty;

        [JsonPropertyName("NormalizedJson")]
        public string NormalizedJson { get; set; } = string.Empty;

        [JsonPropertyName("FileName")]
        public string FileName { get; set; } = string.Empty;

        [JsonPropertyName("GastoType")]
        public int? GastoType { get; set; }

        [JsonPropertyName("OwnerAxUserId")]
        public string OwnerAxUserId { get; set; } = string.Empty;

        [JsonPropertyName("OwnerName")]
        public string OwnerName { get; set; } = string.Empty;

        [JsonPropertyName("Lines")]
        public List<ExpenseSheetTicketLineDto> Lines { get; set; } = new();
    }

    // One skipped or failed ticket returned by bulk link.
    public class ExpenseSheetTicketLinkBulkIssueDto
    {
        [JsonPropertyName("ticketId")]
        public string TicketId { get; set; } = string.Empty;

        [JsonPropertyName("reason")]
        public string Reason { get; set; } = string.Empty;
    }

    // Result payload returned by the bulk link endpoint.
    public class ExpenseSheetTicketLinkBulkResultDto
    {
        [JsonPropertyName("expenseSheetId")]
        public string ExpenseSheetId { get; set; } = string.Empty;

        [JsonPropertyName("requestedCount")]
        public int RequestedCount { get; set; }

        [JsonPropertyName("linkedCount")]
        public int LinkedCount { get; set; }

        [JsonPropertyName("skippedCount")]
        public int SkippedCount { get; set; }

        [JsonPropertyName("failedCount")]
        public int FailedCount { get; set; }

        [JsonPropertyName("linkedTicketIds")]
        public List<string> LinkedTicketIds { get; set; } = new();

        [JsonPropertyName("skipped")]
        public List<ExpenseSheetTicketLinkBulkIssueDto> Skipped { get; set; } = new();

        [JsonPropertyName("failed")]
        public List<ExpenseSheetTicketLinkBulkIssueDto> Failed { get; set; } = new();
    }
}
