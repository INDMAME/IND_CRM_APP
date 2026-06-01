using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using System.Threading;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// CRM API client contract.
    /// </summary>
    public interface ICrmApiClient
    {
        // Main login.
        Task<LoginResult?> AuthenticateAsync(string username, string password);

        // Entra context.
        Task<IndEntraContextResponse> GetEntraContextAsync(
            string token,
            string entraOid,
            string appCode
        );

        // Environment and company.
        Task<string> GetEnvironmentAsync(string token);
        Task<string> GetCompanyNameAsync(string token);
        Task<ApiResponse<ExchangeRateDto>> GetExchangeRateAsync(
            string token,
            string baseCurrency,
            string targetCurrency,
            string? date
        );
        Task<ApiResponse<ExchangeRateDto>> GetExchangeRatePublicDirectAsync(
            string token,
            string baseCurrency,
            string targetCurrency,
            string? date
        );
        Task<ApiResponse<FuelPriceKmDto>> GetFuelPriceKmAsync(
            string token,
            string transDate
        );
        Task<ApiResponse<object>> GetHealthAsync(string token);
        Task<ApiResponse<object>> GetHealthPingAsync(string token);

        // CRM accounts.
        Task<PagedApiResponse<AccountDto>> GetAccountsAsync(
            string token,
            string? accountNum,
            int page,
            int pageSize
        );

        // CRM contacts.
        Task<PagedApiResponse<ContactoDto>> GetContactosAsync(
            string token,
            string accountNum,
            int page,
            int pageSize
        );

        // Activities.
        Task<PagedApiResponse<ActivityDto>> GetActivitiesAsync(
            string token,
            ActivitiesFilter filter
        );

        Task<ApiResponse<object>> CreateActivityAsync(
            string token,
            CreateActivityRequest req
        );

        Task<ApiResponse<object>> UpdateActivityAsync(
            string token,
            long recId,
            UpdateActivityRequest req
        );

        Task<ApiResponse<object>> DeleteActivityAsync(
            string token,
            long recId
        );

        Task<ApiResponse<ActivityDto>> GetActivityByCodeAsync(
            string token,
            string actividadId
        );

        Task<ApiResponse<ActivityDto>> GetActivityByRecIdAsync(
            string token,
            long recId
        );

        // Visit assistants.
        Task<ApiResponse<object>> CreateVisitaAsistenteAsync(
            string token,
            CreateVisitaAsistenteRequest req
        );

        Task<ApiResponse<object>> DeleteVisitaAsistenteAsync(
            string token,
            DeleteVisitaAsistenteRequest req
        );

        // Speech transcription (WAV upload).
        Task<ApiResponse<string>> TranscribeSpeechAsync(
            string token,
            string languageId,
            Stream audioStream,
            string fileName,
            string? contentType,
            double? temperature = null,
            string? prompt = null,
            CancellationToken cancellationToken = default
        );
        Task<ApiResponse<object>> ExpenseFromTicketAsync(
            string token,
            Stream ticketImageStream,
            string fileName,
            string? contentType,
            bool? persistTicket = null,
            string? ticketUrlFile = null,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default
        );

        // Expense sheets.
        Task<ApiResponse<ExpenseSheetCreateResponseData>> CreateExpenseSheetAsync(
            string token,
            ExpenseSheetCreateRequest req,
            string? axUserIdOverride = null
        );

        Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetDetailAsync(
            string token,
            string hojaGastosId,
            string? axUserIdOverride = null
        );

        Task<ApiResponse<object>> UpdateExpenseSheetHeaderAsync(
            string token,
            string hojaGastosId,
            ExpenseSheetUpdateRequest req,
            string? axUserIdOverride = null,
            string? actorAxUserIdOverride = null
        );

        Task<ApiResponse<object>> UpdateExpenseSheetLineAsync(
            string token,
            string hojaGastosId,
            string lineRecId,
            ExpenseSheetLineRequest req,
            string? axUserIdOverride = null
        );

        Task<ApiResponse<object>> DeleteExpenseSheetLineAsync(
            string token,
            string hojaGastosId,
            string lineRecId,
            bool deleteWholeSheet,
            int? deleteMode = null,
            string? axUserIdOverride = null
        );

        Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetsAsync(
            string token,
            ExpenseSheetListApiRequest req,
            string? axUserIdOverride = null
        );

        Task<PagedApiResponse<ExpenseSheetCurrencyDto>> GetExpenseSheetCurrenciesAsync(
            string token,
            string? axUserIdOverride = null
        );

        Task<PagedApiResponse<ExpenseSheetSubordinateDto>> GetExpenseSheetSubordinatesAsync(
            string token,
            string? axUserIdOverride = null
        );

        Task<ApiTransportResponse<ExpenseSheetsAskResponseData>> AskExpenseSheetsAsync(
            string token,
            ExpenseSheetsAskRequest req,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default
        );

        // Expense sheet tickets.
        Task<ApiTransportResponse<object>> QuickCreateExpenseSheetTicketAsync(
            string token,
            ExpenseSheetTicketQuickCreateRequest req,
            Stream ticketImageStream,
            string fileName,
            string? contentType,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default
        );

        Task<ApiResponse<object>> CreateExpenseSheetTicketAsync(
            string token,
            ExpenseSheetTicketCreateRequest req,
            string? axUserIdOverride = null
        );

        Task<PagedApiResponse<ExpenseSheetTicketListItemDto>> GetExpenseSheetTicketsAsync(
            string token,
            ExpenseSheetTicketListRequest req,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default
        );

        Task<PagedApiResponse<ExpenseSheetTicketLinkListItemDto>> GetExpenseSheetTicketLinkListAsync(
            string token,
            ExpenseSheetTicketLinkListRequest req,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default
        );

        Task<ApiResponse<ExpenseSheetTicketLinkBulkResultDto>> LinkExpenseSheetTicketsBulkAsync(
            string token,
            ExpenseSheetTicketLinkBulkRequest req,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default
        );

        Task<PagedApiResponse<ExpenseSheetTicketDetailDto>> GetExpenseSheetTicketDetailAsync(
            string token,
            string fileId,
            string? axUserIdOverride = null
        );

        Task<ApiResponse<object>> UpdateExpenseSheetTicketAsync(
            string token,
            string fileId,
            ExpenseSheetTicketUpdateRequest req
        );

        Task<ApiResponse<object>> DeleteExpenseSheetTicketAsync(
            string token,
            string fileId,
            int? lineRecId = null
        );

        Task<ApiResponse<object>> UpdateExpenseSheetTicketFromIAAsync(
            string token,
            string fileId,
            object req,
            string? axUserIdOverride = null
        );

        Task<ApiResponse<object>> CreateExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            ExpenseSheetTicketLineRequest req
        );

        Task<ApiResponse<object>> UpdateExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            string lineRecId,
            ExpenseSheetTicketLineRequest req
        );

        Task<ApiResponse<object>> DeleteExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            string lineRecId
        );

        Task<ApiResponse<object>> UploadExpenseSheetTicketFileAsync(
            string token,
            string fileId,
            Stream fileStream,
            string fileName,
            string? contentType,
            string? extension = null,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default
        );

        Task<ApiResponse<object>> DeleteExpenseSheetTicketFileAsync(
            string token,
            string fileId
        );

        // Projects.
        Task<PagedApiResponse<ProjectDto>> GetProjectsAsync(
            string token,
            string? filter,
            int page,
            int pageSize
        );

        // Token refresh.
        Task<LoginResult?> RefreshTokenAsync(string currentToken);
    }
}
