namespace IND_CRM_APP.Services.ApiHelpers
{
    /// <summary>
    /// Centralized API route builders for the CRM API.
    /// </summary>
    internal static class ApiRoutes
    {
        public const string AuthLogin = "api/auth/login";
        public const string AuthRefresh = "api/auth/refresh";
        public const string AuthEntraContext = "api/auth/entra/context";
        public const string SystemEnvironment = "api/system/getEnvironmentName";
        public const string SystemCompany = "api/system/getCompanyName";
        public const string SystemExchangeRate = "api/system/exchange-rate";
        public const string SystemExchangeRatePublicDirect = "api/system/exchange-rate/public-direct";
        public const string Health = "api/health/health";
        public const string HealthPing = "api/health/ping";
        public const string AccountsList = "api/crm/accounts/listAccounts";
        public const string ContactsList = "api/crm/accounts/listContacts";
        public const string ActivitiesList = "api/crm/activities/list";
        public const string ActivitiesCreate = "api/crm/activities/create";
        public const string VisitsCreateAsistente = "api/crm/visits/createVisitaAsistente";
        public const string VisitsDeleteAsistente = "api/crm/visits/deleteVisitaAsistente";
        public const string ExpenseSheets = "api/crm/expensesheets";
        public const string ExpenseSheetTickets = "api/crm/expensesheets/tickets";
        public const string ExpenseSheetTicketsQuickCreate = "api/crm/expensesheets/tickets/quick-create";
        public const string ExpenseSheetTicketsList = "api/crm/expensesheets/tickets/list";
        public const string ExpenseSheetTicketsLinkList = "api/crm/expensesheets/tickets/link/list";
        public const string ExpenseSheetTicketsLinkBulk = "api/crm/expensesheets/tickets/link/bulk";
        public const string SpeechTranscribe = "api/ia/service/speech";
        public const string ExpenseFromTicket = "api/ia/service/expensefromticket";
        public const string ExpenseSheetsAsk = "api/ia/service/expensesheets/ask";

        // Builds the activity by code route.
        public static string ActivityByCode(string safeCode) =>
            $"api/crm/activities/by-code/{safeCode}";

        // Builds the activity by record id route.
        public static string ActivityByRecId(long recId) =>
            $"api/crm/activities/{recId}";

        // Builds the expense sheet by id route.
        public static string ExpenseSheetById(string safeId) =>
            $"api/crm/expensesheets/{safeId}";

        // Builds the expense sheet line route.
        public static string ExpenseSheetLine(string safeSheetId, string safeLineId) =>
            $"api/crm/expensesheets/{safeSheetId}/lines/{safeLineId}";

        // Builds the expense sheet ticket by file id route.
        public static string ExpenseSheetTicketByFileId(string safeFileId) =>
            $"api/crm/expensesheets/tickets/{safeFileId}";

        // Builds the expense sheet ticket IA apply route.
        public static string ExpenseSheetTicketIa(string safeFileId) =>
            $"api/crm/expensesheets/tickets/{safeFileId}/ia";

        // Builds the expense sheet ticket file route with optional extension query.
        public static string ExpenseSheetTicketFile(string safeFileId, string? safeExtension = null)
        {
            var route = $"api/crm/expensesheets/tickets/{safeFileId}/file";
            if (string.IsNullOrWhiteSpace(safeExtension))
                return route;

            return $"{route}?extension={safeExtension}";
        }

        // Builds the expense sheet ticket line route.
        public static string ExpenseSheetTicketLine(string safeFileId, string safeLineId) =>
            $"api/crm/expensesheets/tickets/{safeFileId}/lines/{safeLineId}";

        // Builds the expense sheet ticket lines create route.
        public static string ExpenseSheetTicketLines(string safeFileId) =>
            $"api/crm/expensesheets/tickets/{safeFileId}/lines";

        // Builds the expense sheet ticket delete route with optional line selector.
        public static string ExpenseSheetTicketDelete(string safeFileId, int? lineRecId = null)
        {
            var route = ExpenseSheetTicketByFileId(safeFileId);
            if (!lineRecId.HasValue)
                return route;

            return $"{route}?lineRecId={lineRecId.Value}";
        }

        // Builds the expense sheet line delete route supporting legacy and new query selectors.
        public static string ExpenseSheetLineDelete(string safeSheetId, string safeLineId, int? deleteMode, bool deleteWholeSheet)
        {
            var route = $"api/crm/expensesheets/{safeSheetId}/lines/{safeLineId}";
            var hasMode = deleteMode.HasValue;
            var modeSegment = hasMode ? $"deleteMode={deleteMode.GetValueOrDefault()}" : string.Empty;
            var legacySegment = $"deleteWholeSheet={(deleteWholeSheet ? "true" : "false")}";
            var query = hasMode ? $"{modeSegment}&{legacySegment}" : legacySegment;
            return $"{route}?{query}";
        }

        // Expense sheets list route. Filters are sent in POST body.
        public const string ExpenseSheetsList = "api/crm/expensesheets/list";
        public const string ExpenseSheetCurrencies = "api/crm/expensesheets/currencies";
        public const string ExpenseSheetSubordinates = "api/crm/expensesheets/subordinates";
        public const string ExpenseSheetFuelPriceKm = "api/crm/expensesheets/fuel-price-km";

        // Builds the projects list route with query.
        public static string ProjectsList(string safeFilter, int page, int pageSize) =>
            $"api/crm/projects/list?filter={safeFilter}&page={page}&pageSize={pageSize}";

        // Builds fuel-price-km route with query.
        public static string ExpenseSheetFuelPriceKmByQuery(string safeTransDate) =>
            $"{ExpenseSheetFuelPriceKm}?transDate={safeTransDate}";

        // Builds exchange-rate route with query.
        public static string SystemExchangeRateByQuery(string safeBaseCurrency, string safeTargetCurrency, string? safeDate = null)
        {
            var route = $"{SystemExchangeRate}?baseCurrency={safeBaseCurrency}&targetCurrency={safeTargetCurrency}";
            if (!string.IsNullOrWhiteSpace(safeDate))
                route = $"{route}&date={safeDate}";

            return route;
        }

        // Builds public-direct exchange-rate route with query.
        public static string SystemExchangeRatePublicDirectByQuery(string safeBaseCurrency, string safeTargetCurrency, string? safeDate = null)
        {
            var route = $"{SystemExchangeRatePublicDirect}?baseCurrency={safeBaseCurrency}&targetCurrency={safeTargetCurrency}";
            if (!string.IsNullOrWhiteSpace(safeDate))
                route = $"{route}&date={safeDate}";

            return route;
        }
    }
}
