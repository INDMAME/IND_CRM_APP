using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;

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
            CancellationToken cancellationToken = default
        );

        // Expense sheets.
        Task<ApiResponse<ExpenseSheetCreateResponseData>> CreateExpenseSheetAsync(
            string token,
            ExpenseSheetCreateRequest req
        );

        Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetDetailAsync(
            string token,
            string hojaGastosId
        );

        Task<ApiResponse<object>> UpdateExpenseSheetHeaderAsync(
            string token,
            string hojaGastosId,
            ExpenseSheetUpdateRequest req
        );

        Task<ApiResponse<object>> UpdateExpenseSheetLineAsync(
            string token,
            string hojaGastosId,
            string lineRecId,
            ExpenseSheetLineRequest req
        );

        Task<ApiResponse<object>> DeleteExpenseSheetLineAsync(
            string token,
            string hojaGastosId,
            string lineRecId,
            bool deleteWholeSheet
        );

        Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetsAsync(
            string token,
            ExpenseSheetListApiRequest req
        );

        Task<PagedApiResponse<ExpenseSheetCurrencyDto>> GetExpenseSheetCurrenciesAsync(
            string token
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
