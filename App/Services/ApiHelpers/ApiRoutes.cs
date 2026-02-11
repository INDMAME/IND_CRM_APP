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
        public const string AccountsList = "api/crm/accounts/listAccounts";
        public const string ContactsList = "api/crm/accounts/listContacts";
        public const string ActivitiesList = "api/crm/activities/list";
        public const string ActivitiesCreate = "api/crm/activities/create";
        public const string VisitsCreateAsistente = "api/crm/visits/createVisitaAsistente";
        public const string VisitsDeleteAsistente = "api/crm/visits/deleteVisitaAsistente";
        public const string ExpenseSheets = "api/crm/expensesheets";
        public const string SpeechTranscribe = "api/speech/transcribe";

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

        // Builds the expense sheet line delete route with query.
        public static string ExpenseSheetLineDelete(string safeSheetId, string safeLineId, string deleteFlag) =>
            $"api/crm/expensesheets/{safeSheetId}/lines/{safeLineId}?deleteWholeSheet={deleteFlag}";

        // Expense sheets list route. Filters are sent in POST body.
        public const string ExpenseSheetsList = "api/crm/expensesheets/list";

        // Builds the projects list route with query.
        public static string ProjectsList(string safeFilter, int page, int pageSize) =>
            $"api/crm/projects/list?filter={safeFilter}&page={page}&pageSize={pageSize}";
    }
}
