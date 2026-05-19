using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services.ApiHelpers;
using IND_CRM_APP.Services.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Net;
using System.Net.Http.Headers;
using System.Globalization;
using System.Text.Json;
using System.Linq;
using System.Threading;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Centralized HTTP client for IND CRM API (Axapta).
    /// Encapsulates login/refresh, environment data, accounts, contacts,
    /// activities CRUD and visit assistants. Controllers should not build URLs
    /// or headers directly.
    /// </summary>
    public class ApiClientService : ICrmApiClient
    {
        private readonly HttpClient _client;
        private readonly string _baseUrl;
        private readonly string _configuredEnvironmentName;
        private readonly ITokenSessionService _tokenSession;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<ApiClientService> _logger;
        private readonly int _accountsTimeoutSeconds;
        private static readonly HashSet<int> AllowedGastoTypeCodes = new() { 0, 1, 2, 3, 4, 5, 6, 7, 8, 14 };
        private const int MinSupportedExpenseYear = 1900;
        private const int MaxSupportedExpenseYear = 2100;
        private const int TwoDigitExpenseYearPivot = 50;

        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            Converters =
            {
                new ActivityDtoArrayConverter(),
                new ActivityAsistenteDtoArrayConverter(),
                new AccountDtoArrayConverter(),
                new ContactoDtoArrayConverter()
            }
        };

        /// <summary>
        /// Carries partial quick-create data so the web layer can recover known OCR failures.
        /// </summary>
        private sealed class QuickCreatePartialState
        {
            public string FileId { get; init; } = string.Empty;
            public string UrlFile { get; init; } = string.Empty;
            public string FileName { get; init; } = string.Empty;
            public bool? ProcessedByAI { get; init; }
                = null;
            public bool LinkedToSheet { get; init; }
                = false;
            public string? HojaGastosId { get; init; }
                = null;
            public string CompletedStage { get; init; } = string.Empty;
            public string FailedStage { get; init; } = string.Empty;
            public bool? RollbackAttempted { get; init; }
                = null;
            public bool? RollbackSucceeded { get; init; }
                = null;
            public string RollbackMessage { get; init; } = string.Empty;
            public QuickCreateStepTraceIds StepTraceIds { get; init; } = new();
        }

        /// <summary>
        /// Tracks the trace ids emitted by each quick-create sub-step.
        /// </summary>
        private sealed class QuickCreateStepTraceIds
        {
            public string TicketCreate { get; init; } = string.Empty;
            public string FileUpload { get; init; } = string.Empty;
            public string DraftExtract { get; init; } = string.Empty;
            public string TicketFinalize { get; init; } = string.Empty;
            public string SheetLink { get; init; } = string.Empty;
        }

        public ApiClientService(
            HttpClient client,
            IConfiguration config,
            ITokenSessionService tokenSession,
            IHttpContextAccessor httpContextAccessor,
            IHostEnvironment environment,
            ILogger<ApiClientService> logger)
        {
            _client = client;
            _tokenSession = tokenSession;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _baseUrl = ResolveBaseUrl(config, logger);
            _configuredEnvironmentName = ResolveConfiguredEnvironmentName(config, logger);

            // Defensive config check to avoid empty or insecure API base URL.
            if (string.IsNullOrWhiteSpace(_baseUrl))
            {
                throw new InvalidOperationException(
                    "CRM API BaseUrl is required. Configure ApiSettings__BaseUrl or INDCRM_BASE_URL on the target machine.");
            }

            if (environment.IsProduction() && _baseUrl.StartsWith("http://", StringComparison.OrdinalIgnoreCase))
            {
                _logger.LogError("CRM API BaseUrl must use HTTPS in Production. Current value starts with http://");
                throw new InvalidOperationException("CRM API BaseUrl must use HTTPS in Production.");
            }

            if (int.TryParse(config["ApiSettings:TimeoutSeconds"], out var seconds) && seconds > 0)
            {
                _client.Timeout = TimeSpan.FromSeconds(seconds);
            }

            if (int.TryParse(config["ApiSettings:AccountsTimeoutSeconds"], out var accountSeconds) && accountSeconds > 0)
            {
                _accountsTimeoutSeconds = accountSeconds;
                // Ensure the HttpClient-level timeout is not shorter than the account search timeout.
                if (_client.Timeout < TimeSpan.FromSeconds(accountSeconds))
                {
                    _client.Timeout = TimeSpan.FromSeconds(accountSeconds);
                }
            }
            else
            {
                _accountsTimeoutSeconds = (int)_client.Timeout.TotalSeconds;
            }
        }

        private static string ResolveBaseUrl(IConfiguration config, ILogger<ApiClientService> logger)
        {
            var directSetting = NormalizeConfigValue(config["ApiSettings:BaseUrl"]);
            if (!string.IsNullOrWhiteSpace(directSetting))
            {
                logger.LogInformation("CRM API BaseUrl resolved from ApiSettings:BaseUrl.");
                return directSetting.TrimEnd('/');
            }

            var sharedEnvironmentSetting = NormalizeConfigValue(config["INDCRM_BASE_URL"]);
            if (!string.IsNullOrWhiteSpace(sharedEnvironmentSetting))
            {
                logger.LogInformation("CRM API BaseUrl resolved from INDCRM_BASE_URL.");
                return sharedEnvironmentSetting.TrimEnd('/');
            }

            return string.Empty;
        }

        // Resolves the web environment name from the machine-level IND_ENV key.
        private static string ResolveConfiguredEnvironmentName(IConfiguration config, ILogger<ApiClientService> logger)
        {
            var configuredEnvironment = NormalizeConfigValue(config["IND_ENV"]);
            var normalizedEnvironment = NormalizeEnvironmentName(configuredEnvironment);
            if (!string.IsNullOrWhiteSpace(normalizedEnvironment))
            {
                logger.LogInformation("CRM environment name resolved from IND_ENV.");
                return normalizedEnvironment;
            }

            if (!string.IsNullOrWhiteSpace(configuredEnvironment))
            {
                logger.LogWarning(
                    "IND_ENV must be DEV or PROD to replace API environment lookup. Current value will use API fallback.");
            }

            return string.Empty;
        }

        // Normalizes supported web environment names to the display contract.
        private static string NormalizeEnvironmentName(string? value)
        {
            var normalized = NormalizeConfigValue(value);
            if (string.IsNullOrWhiteSpace(normalized))
                return string.Empty;

            return normalized.Equals("DEV", StringComparison.OrdinalIgnoreCase)
                   || normalized.Equals("PROD", StringComparison.OrdinalIgnoreCase)
                ? normalized.ToUpperInvariant()
                : string.Empty;
        }

        private static string NormalizeConfigValue(string? value)
        {
            var normalized = (value ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(normalized))
                return string.Empty;

            if (LooksLikeUnresolvedEnvironmentToken(normalized))
                return string.Empty;

            return normalized;
        }

        private static bool LooksLikeUnresolvedEnvironmentToken(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return false;

            return value.Length > 2
                   && value.StartsWith("%", StringComparison.Ordinal)
                   && value.EndsWith("%", StringComparison.Ordinal);
        }

        private string BuildUrl(string relativePath) => $"{_baseUrl}/{relativePath.TrimStart('/')}";

        private static string SafeLogPayload(string? raw)
        {
            return string.IsNullOrWhiteSpace(raw) ? "<empty>" : $"len={raw.Length}";
        }

        // Returns a compact safe snippet for diagnostics without flooding logs.
        private static string SafeLogSnippet(string? raw, int maxChars = 1200)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return "<empty>";

            var normalized = raw
                .Replace('\r', ' ')
                .Replace('\n', ' ')
                .Trim();

            if (normalized.Length <= maxChars)
                return normalized;

            return normalized.Substring(0, maxChars) + "...";
        }

        // Normalize a quoted string response into a plain value.
        private static string NormalizeQuotedValue(string? raw)
        {
            return string.IsNullOrWhiteSpace(raw) ? string.Empty : raw.Replace("\"", string.Empty);
        }

        // Extracts the environment name from the API response payload.
        private static string ExtractEnvironmentValue(string raw)
        {
            try
            {
                var envObj = JsonSerializer.Deserialize<EnvironmentEnvelope>(raw, JsonOptions);
                var envValue = envObj?.Data?.Environment;
                if (string.IsNullOrWhiteSpace(envValue))
                {
                    envValue = envObj?.Items?.FirstOrDefault()?.Environment;
                }

                return string.IsNullOrWhiteSpace(envValue)
                    ? NormalizeQuotedValue(raw)
                    : envValue;
            }
            catch
            {
                return NormalizeQuotedValue(raw);
            }
        }

        // Extracts the company name from the API response payload.
        private static string ExtractCompanyValue(string raw)
        {
            try
            {
                var compObj = JsonSerializer.Deserialize<CompanyEnvelope>(raw, JsonOptions);
                var companyValue = compObj?.Data?.CompanyName
                    ?? compObj?.Data?.Company
                    ?? compObj?.Data?.CompanyId;

                if (string.IsNullOrWhiteSpace(companyValue))
                {
                    var item = compObj?.Items?.FirstOrDefault();
                    companyValue = item?.CompanyName ?? item?.Company ?? item?.CompanyId;
                }

                return string.IsNullOrWhiteSpace(companyValue)
                    ? NormalizeQuotedValue(raw)
                    : companyValue;
            }
            catch
            {
                return NormalizeQuotedValue(raw);
            }
        }

        // Escapes a value used in query string parameters.
        private static string EscapeQueryValue(string? value)
        {
            return Uri.EscapeDataString(value ?? string.Empty);
        }

        // Escapes a value used in URL path segments.
        private static string EscapePathSegment(string? value)
        {
            return Uri.EscapeDataString(value ?? string.Empty);
        }

        // Returns a trimmed string or null when it has no value.
        private static string? NormalizeOptionalText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        // Normalizes a currency code for compact diagnostics while keeping empty states visible.
        private static string NormalizeCurrencyCodeForTrace(string? currencyCode)
        {
            return NormalizeOptionalText(currencyCode)?.ToUpperInvariant() ?? "<empty>";
        }

        // Builds a short list sample for diagnostic traces.
        private static string BuildTraceListSample(IEnumerable<string>? values, int maxItems = 5)
        {
            var sample = (values ?? Enumerable.Empty<string>())
                .Select(value => NormalizeOptionalText(value) ?? "<empty>")
                .Take(maxItems)
                .ToList();

            return sample.Count == 0 ? "<none>" : string.Join(",", sample);
        }

        // Reads one tolerant string value from extra sheet fields.
        private static string? ReadExtraStringForTrace(Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            if (extra == null || keys == null || keys.Length == 0)
                return null;

            foreach (var key in keys)
            {
                foreach (var entry in extra)
                {
                    if (!string.Equals(entry.Key, key, StringComparison.OrdinalIgnoreCase))
                        continue;

                    var rawValue = entry.Value.ValueKind switch
                    {
                        JsonValueKind.String => entry.Value.GetString(),
                        JsonValueKind.Null => null,
                        JsonValueKind.Undefined => null,
                        _ => entry.Value.ToString()
                    };

                    var normalized = NormalizeOptionalText(rawValue);
                    if (!string.IsNullOrWhiteSpace(normalized))
                        return normalized;
                }
            }

            return null;
        }

        // Summarizes ticket currencies so empty values stand out quickly in logs.
        private static string BuildTicketCurrencySummary<T>(
            IEnumerable<T>? items,
            Func<T, string?> idSelector,
            Func<T, string?> currencySelector,
            int maxItems = 5)
        {
            var list = (items ?? Enumerable.Empty<T>()).ToList();
            var sample = list
                .Take(maxItems)
                .Select(item => $"{NormalizeOptionalText(idSelector(item)) ?? "<empty>"}:{NormalizeCurrencyCodeForTrace(currencySelector(item))}")
                .ToList();
            var emptyCurrencyItems = list
                .Where(item => string.IsNullOrWhiteSpace(NormalizeOptionalText(currencySelector(item))))
                .Select(item => NormalizeOptionalText(idSelector(item)) ?? "<empty>")
                .ToList();

            return $"count={list.Count}; emptyCurrencyCount={emptyCurrencyItems.Count}; sample={BuildTraceListSample(sample, maxItems)}; emptyCurrencyIds={BuildTraceListSample(emptyCurrencyItems, maxItems)}";
        }

        // Summarizes sheet currencies so the returned header state is visible in logs.
        private static string BuildExpenseSheetCurrencySummary(IEnumerable<ExpenseSheetDetailDto>? items, int maxItems = 5)
        {
            var list = (items ?? Enumerable.Empty<ExpenseSheetDetailDto>()).ToList();
            var sample = list
                .Take(maxItems)
                .Select(sheet => $"{NormalizeOptionalText(sheet.HojaGastosId) ?? "<empty>"}:{NormalizeCurrencyCodeForTrace(ReadExtraStringForTrace(sheet.Extra, "currencyCode", "CurrencyCode", "currency", "divisa"))}")
                .ToList();
            var emptyCurrencyItems = list
                .Where(sheet => string.IsNullOrWhiteSpace(ReadExtraStringForTrace(sheet.Extra, "currencyCode", "CurrencyCode", "currency", "divisa")))
                .Select(sheet => NormalizeOptionalText(sheet.HojaGastosId) ?? "<empty>")
                .ToList();

            return $"count={list.Count}; emptyCurrencyCount={emptyCurrencyItems.Count}; sample={BuildTraceListSample(sample, maxItems)}; emptyCurrencySheetIds={BuildTraceListSample(emptyCurrencyItems, maxItems)}";
        }

        // Summarizes skipped or failed bulk-link issues with a compact ticketId:reason sample.
        private static string BuildBulkIssueSummary(IEnumerable<ExpenseSheetTicketLinkBulkIssueDto>? issues, int maxItems = 5)
        {
            var list = (issues ?? Enumerable.Empty<ExpenseSheetTicketLinkBulkIssueDto>()).ToList();
            var sample = list
                .Take(maxItems)
                .Select(issue => $"{NormalizeOptionalText(issue.TicketId) ?? "<empty>"}:{NormalizeOptionalText(issue.Reason) ?? "<empty>"}")
                .ToList();

            return $"count={list.Count}; sample={BuildTraceListSample(sample, maxItems)}";
        }

        // Reads the effective sheet currency for one detail item.
        private static string ReadExpenseSheetCurrencyCodeForTrace(ExpenseSheetDetailDto? sheet)
        {
            return NormalizeCurrencyCodeForTrace(ReadExtraStringForTrace(sheet?.Extra, "currencyCode", "CurrencyCode", "currency", "divisa"));
        }

        private static bool IsSupportedExpenseYear(int year)
        {
            return year >= MinSupportedExpenseYear && year <= MaxSupportedExpenseYear;
        }

        private static int ExpandTwoDigitExpenseYear(int year)
        {
            var normalized = Math.Abs(year % 100);
            return normalized >= TwoDigitExpenseYearPivot ? 1900 + normalized : 2000 + normalized;
        }

        private static DateTime? TryBuildSupportedExpenseDate(int year, int month, int day)
        {
            if (!IsSupportedExpenseYear(year) || month < 1 || month > 12)
                return null;

            var maxDay = DateTime.DaysInMonth(year, month);
            if (day < 1 || day > maxDay)
                return null;

            return new DateTime(year, month, day);
        }

        private static bool TryParseSupportedCompactShortDayFirstDate(string value, out DateTime parsed)
        {
            parsed = default;
            if (value.Length != 6 || value.Any(ch => !char.IsDigit(ch)))
                return false;

            if (!int.TryParse(value.AsSpan(0, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var day) ||
                !int.TryParse(value.AsSpan(2, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var month) ||
                !int.TryParse(value.AsSpan(4, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var year))
                return false;

            var candidate = TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day);
            if (!candidate.HasValue)
                return false;

            parsed = candidate.Value;
            return true;
        }

        // Repairs OCR-style years like 1220 by reusing the implied two-digit year (2020).
        private static bool TryParseSupportedCompactDayFirstDate(string value, out DateTime parsed)
        {
            parsed = default;
            if (value.Length != 8 || value.Any(ch => !char.IsDigit(ch)))
                return false;

            if (!int.TryParse(value.AsSpan(0, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var day) ||
                !int.TryParse(value.AsSpan(2, 2), NumberStyles.None, CultureInfo.InvariantCulture, out var month) ||
                !int.TryParse(value.AsSpan(4, 4), NumberStyles.None, CultureInfo.InvariantCulture, out var year))
                return false;

            var candidate = TryBuildSupportedExpenseDate(year, month, day) ??
                            TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day);
            if (!candidate.HasValue)
                return false;

            parsed = candidate.Value;
            return true;
        }

        private static bool TryParseSupportedSeparatedDayFirstDate(string value, out DateTime parsed)
        {
            parsed = default;
            var parts = value.Split(new[] { '.', '/', '-' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length != 3 || parts[0].Length != 2 || parts[1].Length != 2 || (parts[2].Length != 2 && parts[2].Length != 4))
                return false;

            if (!int.TryParse(parts[0], NumberStyles.None, CultureInfo.InvariantCulture, out var day) ||
                !int.TryParse(parts[1], NumberStyles.None, CultureInfo.InvariantCulture, out var month) ||
                !int.TryParse(parts[2], NumberStyles.None, CultureInfo.InvariantCulture, out var year))
                return false;

            var candidate = parts[2].Length == 2
                ? TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day)
                : TryBuildSupportedExpenseDate(year, month, day) ??
                  TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day);

            if (!candidate.HasValue)
                return false;

            parsed = candidate.Value;
            return true;
        }

        private static bool TryParseSupportedSeparatedYearFirstDate(string value, out DateTime parsed)
        {
            parsed = default;
            var parts = value.Split(new[] { '.', '/', '-' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length != 3 || parts[0].Length != 4 || parts[1].Length != 2 || parts[2].Length != 2)
                return false;

            if (!int.TryParse(parts[0], NumberStyles.None, CultureInfo.InvariantCulture, out var year) ||
                !int.TryParse(parts[1], NumberStyles.None, CultureInfo.InvariantCulture, out var month) ||
                !int.TryParse(parts[2], NumberStyles.None, CultureInfo.InvariantCulture, out var day))
                return false;

            var candidate = TryBuildSupportedExpenseDate(year, month, day) ??
                            TryBuildSupportedExpenseDate(ExpandTwoDigitExpenseYear(year), month, day);
            if (!candidate.HasValue)
                return false;

            parsed = candidate.Value;
            return true;
        }

        private static DateTime? TryParseSupportedExpenseDate(string? raw)
        {
            var value = NormalizeOptionalText(raw);
            if (string.IsNullOrWhiteSpace(value))
                return null;

            if (TryParseSupportedCompactShortDayFirstDate(value, out var shortDayFirst))
                return shortDayFirst;

            if (TryParseSupportedCompactDayFirstDate(value, out var compactDayFirst))
                return compactDayFirst;

            if (DateTime.TryParseExact(value, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var compactYearFirst) &&
                IsSupportedExpenseYear(compactYearFirst.Year))
                return compactYearFirst;

            if (TryParseSupportedSeparatedDayFirstDate(value, out var separatedDayFirst))
                return separatedDayFirst;

            if (TryParseSupportedSeparatedYearFirstDate(value, out var separatedYearFirst))
                return separatedYearFirst;

            if (DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedInv) &&
                IsSupportedExpenseYear(parsedInv.Year))
                return parsedInv;

            if (DateTime.TryParse(value, CultureInfo.CurrentCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedCur) &&
                IsSupportedExpenseYear(parsedCur.Year))
                return parsedCur;

            return null;
        }

        // Normalizes list date filters to AX expected compact format (ddMMyyyy).
        private static string? NormalizeAxListDate(string? value)
        {
            var normalized = NormalizeOptionalText(value);
            if (string.IsNullOrWhiteSpace(normalized))
                return null;

            if (DateTime.TryParseExact(normalized, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedCompact))
                return parsedCompact.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedIso))
                return parsedIso.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "ddMMyyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdMmYyyy))
                return parsedDdMmYyyy.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdDotMmDotYyyy))
                return parsedDdDotMmDotYyyy.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdSlashMmSlashYyyy))
                return parsedDdSlashMmSlashYyyy.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParseExact(normalized, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDdDashMmDashYyyy))
                return parsedDdDashMmDashYyyy.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParse(normalized, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedInv))
                return parsedInv.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            if (DateTime.TryParse(normalized, CultureInfo.CurrentCulture, DateTimeStyles.AllowWhiteSpaces, out var parsedCur))
                return parsedCur.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

            return normalized;
        }

        // Normalizes optional gasto type values against the fixed enum set.
        private static int? NormalizeTicketGastoType(int? gastoType)
        {
            return gastoType.HasValue && AllowedGastoTypeCodes.Contains(gastoType.Value)
                ? gastoType
                : null;
        }

        // Builds the optional token expected by AX list filters: 0/1 when set, null when omitted.
        private static int? BuildTicketStatusFilterToken(int? status)
        {
            return status.HasValue && (status.Value == 0 || status.Value == 1)
                ? status.Value
                : null;
        }

        // Builds the optional token expected by AX list filters: 0/1 when set, null when omitted.
        private static int? BuildTicketProcessedByAiFilterToken(bool? processedByAI)
        {
            return processedByAI.HasValue
                ? (processedByAI.Value ? 1 : 0)
                : null;
        }

        // Prepares auth headers and logs company header state for an operation.
        private void PrepareRequestHeaders(
            string token,
            string operation,
            bool requireCompany,
            bool includeCompanyHeader = true,
            bool includeAxUserHeader = true,
            bool includeContextHeaders = true,
            string? axUserIdOverride = null)
        {
            AddToken(token, includeCompanyHeader, includeAxUserHeader, includeContextHeaders, axUserIdOverride);
            LogCompanyHeader(operation, requireCompany);
        }

        // Sends a GET request to the API base URL.
        private Task<HttpResult> SendGetAsync(string relativePath, CancellationToken cancellationToken = default)
        {
            return HttpHelper.GetAsync(_client, BuildUrl(relativePath), cancellationToken);
        }

        // Sends a POST request with a JSON body.
        private Task<HttpResult> SendPostAsync(string relativePath, string jsonBody, CancellationToken cancellationToken = default)
        {
            return HttpHelper.PostAsync(_client, BuildUrl(relativePath), jsonBody, cancellationToken);
        }

        // Sends a POST request with a JSON-serialized payload.
        private Task<HttpResult> SendPostJsonAsync(string relativePath, object payload, CancellationToken cancellationToken = default)
        {
            return SendPostAsync(relativePath, Serialize(payload), cancellationToken);
        }

        // Sends a POST request with multipart form data.
        private Task<HttpResult> SendPostMultipartAsync(
            string relativePath,
            MultipartFormDataContent formData,
            CancellationToken cancellationToken = default)
        {
            return HttpHelper.PostMultipartAsync(_client, BuildUrl(relativePath), formData, cancellationToken);
        }

        // Sends a PUT request with a JSON body.
        private Task<HttpResult> SendPutAsync(string relativePath, string jsonBody, CancellationToken cancellationToken = default)
        {
            return HttpHelper.PutAsync(_client, BuildUrl(relativePath), jsonBody, cancellationToken);
        }

        // Sends a PUT request with a JSON-serialized payload.
        private Task<HttpResult> SendPutJsonAsync(string relativePath, object payload, CancellationToken cancellationToken = default)
        {
            return SendPutAsync(relativePath, Serialize(payload), cancellationToken);
        }

        // Sends a DELETE request without a body.
        private Task<HttpResult> SendDeleteAsync(string relativePath, CancellationToken cancellationToken = default)
        {
            return HttpHelper.DeleteAsync(_client, BuildUrl(relativePath), cancellationToken);
        }

        // Sends a DELETE request with a JSON-serialized payload.
        private Task<HttpResult> SendDeleteJsonAsync(string relativePath, object payload, CancellationToken cancellationToken = default)
        {
            return HttpHelper.DeleteAsync(_client, BuildUrl(relativePath), Serialize(payload), cancellationToken);
        }

        // Applies refreshed token headers and deserializes a standard response.
        private ApiResponse<T> BuildApiResponse<T>(HttpResult result, string operation)
        {
            ApplyRefreshedToken(result.Headers, null);
            return DeserializeApiResponse<T>(result, operation);
        }

        // Applies refreshed token headers and deserializes a paged response.
        private PagedApiResponse<T> BuildPagedResponse<T>(HttpResult result, string operation)
        {
            ApplyRefreshedToken(result.Headers, null);
            return DeserializePagedResponse<T>(result, operation);
        }

        // ======================================================
        // Authentication
        // ======================================================
        public async Task<LoginResult?> AuthenticateAsync(string username, string password)
        {
            var payload = new LoginRequest { Username = username, Password = password };
            var result = await SendPostJsonAsync(ApiRoutes.AuthLogin, payload);

            var response = DeserializeApiResponse<LoginEnvelope>(result, "Login");
            ApplyRefreshedToken(result.Headers, response.Data?.Expires);

            var login = MapLoginResult(response);
            ApplyRefreshedTokenFromBody(login);
            return login;
        }

        public async Task<LoginResult?> RefreshTokenAsync(string currentToken)
        {
            PrepareRequestHeaders(currentToken, "RefreshToken", requireCompany: false);

            var result = await SendPostAsync(ApiRoutes.AuthRefresh, "{}");

            var response = DeserializeApiResponse<LoginEnvelope>(result, "Refresh");
            ApplyRefreshedToken(result.Headers, response.Data?.Expires);

            var login = MapLoginResult(response);
            ApplyRefreshedTokenFromBody(login);
            return login;
        }

        // ======================================================
        // Entra context
        // ======================================================
        public async Task<IndEntraContextResponse> GetEntraContextAsync(string token, string entraOid, string appCode)
        {
            PrepareRequestHeaders(
                token,
                "GetEntraContext",
                requireCompany: false,
                includeCompanyHeader: false,
                includeAxUserHeader: false,
                includeContextHeaders: false);

            var payload = new
            {
                entraOid = entraOid ?? string.Empty,
                appCode = appCode ?? string.Empty
            };

            var result = await SendPostJsonAsync(ApiRoutes.AuthEntraContext, payload);

            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
            {
                return new IndEntraContextResponse
                {
                    Success = result.IsSuccessStatusCode,
                    Message = result.ErrorMessage ?? "Empty response from entra context."
                };
            }

            try
            {
                var response = EntraContextParser.Parse(result.Raw, result.IsSuccessStatusCode, JsonOptions);
                if (response.Items.Count == 0)
                {
                    _logger.LogWarning(
                        "Entra context response has no items. Success: {Success}. Message: {Message}. ErrorCode: {ErrorCode}. Raw: {Raw}",
                        response.Success,
                        response.Message ?? "<null>",
                        response.ErrorCode ?? "<null>",
                        SafeLogPayload(result.Raw));
                }

                return response;
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "JSON parse error in GetEntraContext. Raw: {Raw}", SafeLogPayload(result.Raw));
                return new IndEntraContextResponse
                {
                    Success = false,
                    Message = "Failed to parse entra context response."
                };
            }
        }

        // ======================================================
        // Environment
        // ======================================================
        public async Task<string> GetEnvironmentAsync(string token)
        {
            if (!string.IsNullOrWhiteSpace(_configuredEnvironmentName))
                return _configuredEnvironmentName;

            PrepareRequestHeaders(token, "GetEnvironment", requireCompany: true);

            var result = await SendGetAsync(ApiRoutes.SystemEnvironment);

            ThrowIfHttpFailed(result, "GetEnvironment");
            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
                return string.Empty;

            return ExtractEnvironmentValue(result.Raw);
        }

        // ======================================================
        // Company
        // ======================================================
        public async Task<string> GetCompanyNameAsync(string token)
        {
            PrepareRequestHeaders(token, "GetCompanyName", requireCompany: true);

            var result = await SendGetAsync(ApiRoutes.SystemCompany);

            ThrowIfHttpFailed(result, "GetCompanyName");
            ApplyRefreshedToken(result.Headers, null);

            if (string.IsNullOrWhiteSpace(result.Raw))
                return string.Empty;

            return ExtractCompanyValue(result.Raw);
        }

        // ======================================================
        // Exchange rate
        // ======================================================
        public async Task<ApiResponse<ExchangeRateDto>> GetExchangeRateAsync(
            string token,
            string baseCurrency,
            string targetCurrency,
            string? date)
        {
            PrepareRequestHeaders(token, "GetExchangeRate", requireCompany: true);

            var safeBaseCurrency = EscapeQueryValue((baseCurrency ?? string.Empty).Trim().ToUpperInvariant());
            var safeTargetCurrency = EscapeQueryValue((targetCurrency ?? string.Empty).Trim().ToUpperInvariant());
            var safeDate = NormalizeOptionalText(date);

            var route = ApiRoutes.SystemExchangeRateByQuery(
                safeBaseCurrency,
                safeTargetCurrency,
                string.IsNullOrWhiteSpace(safeDate) ? null : EscapeQueryValue(safeDate));

            var result = await SendGetAsync(route);
            return BuildApiResponse<ExchangeRateDto>(result, "GetExchangeRate");
        }

        public async Task<ApiResponse<ExchangeRateDto>> GetExchangeRatePublicDirectAsync(
            string token,
            string baseCurrency,
            string targetCurrency,
            string? date)
        {
            PrepareRequestHeaders(
                token,
                "GetExchangeRatePublicDirect",
                requireCompany: false,
                includeCompanyHeader: false,
                includeAxUserHeader: false);

            var safeBaseCurrency = EscapeQueryValue((baseCurrency ?? string.Empty).Trim().ToUpperInvariant());
            var safeTargetCurrency = EscapeQueryValue((targetCurrency ?? string.Empty).Trim().ToUpperInvariant());
            var safeDate = NormalizeOptionalText(date);

            var route = ApiRoutes.SystemExchangeRatePublicDirectByQuery(
                safeBaseCurrency,
                safeTargetCurrency,
                string.IsNullOrWhiteSpace(safeDate) ? null : EscapeQueryValue(safeDate));

            var result = await SendGetAsync(route);
            return BuildApiResponse<ExchangeRateDto>(result, "GetExchangeRatePublicDirect");
        }

        public async Task<ApiResponse<FuelPriceKmDto>> GetFuelPriceKmAsync(
            string token,
            string transDate)
        {
            PrepareRequestHeaders(token, "GetFuelPriceKm", requireCompany: true);

            var normalizedTransDate = NormalizeOptionalText(transDate) ?? string.Empty;
            var route = ApiRoutes.ExpenseSheetFuelPriceKmByQuery(EscapeQueryValue(normalizedTransDate));

            var result = await SendGetAsync(route);
            return BuildApiResponse<FuelPriceKmDto>(result, "GetFuelPriceKm");
        }

        // Gets backend health summary using the health endpoint.
        public async Task<ApiResponse<object>> GetHealthAsync(string token)
        {
            PrepareRequestHeaders(
                token,
                "GetHealth",
                requireCompany: false,
                includeCompanyHeader: false,
                includeAxUserHeader: false);

            var result = await SendGetAsync(ApiRoutes.Health);
            return BuildApiResponse<object>(result, "GetHealth");
        }

        // Gets backend ping status using the lightweight ping endpoint.
        public async Task<ApiResponse<object>> GetHealthPingAsync(string token)
        {
            PrepareRequestHeaders(
                token,
                "GetHealthPing",
                requireCompany: false,
                includeCompanyHeader: false,
                includeAxUserHeader: false);

            var result = await SendGetAsync(ApiRoutes.HealthPing);
            return BuildApiResponse<object>(result, "GetHealthPing");
        }

        // ======================================================
        // Accounts
        // ======================================================
        public async Task<PagedApiResponse<AccountDto>> GetAccountsAsync(
            string token,
            string? accountNum,
            int page,
            int pageSize)
        {
            PrepareRequestHeaders(token, "GetAccounts", requireCompany: true);

            var payload = new
            {
                accountNum = accountNum ?? string.Empty,
                page,
                pageSize
            };

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(_accountsTimeoutSeconds));

            var result = await SendPostJsonAsync(
                ApiRoutes.AccountsList,
                payload,
                cts.Token);
            return BuildPagedResponse<AccountDto>(result, "GetAccounts");
        }

        // ======================================================
        // Contacts
        // ======================================================
        public async Task<PagedApiResponse<ContactoDto>> GetContactosAsync(
            string token,
            string accountNum,
            int page,
            int pageSize)
        {
            PrepareRequestHeaders(token, "GetContacts", requireCompany: true);

            var payload = new
            {
                accountNum = accountNum ?? string.Empty,
                page,
                pageSize
            };

            var result = await SendPostJsonAsync(ApiRoutes.ContactsList, payload);
            return BuildPagedResponse<ContactoDto>(result, "GetContacts");
        }

        // ======================================================
        // Activities
        // ======================================================
        public async Task<PagedApiResponse<ActivityDto>> GetActivitiesAsync(
            string token,
            ActivitiesFilter filter)
        {
            PrepareRequestHeaders(token, "GetActivities", requireCompany: true);

            var result = await SendPostJsonAsync(ApiRoutes.ActivitiesList, filter);
            return BuildPagedResponse<ActivityDto>(result, "GetActivities");
        }

        public async Task<ApiResponse<ActivityDto>> GetActivityByCodeAsync(string token, string actividadId)
        {
            PrepareRequestHeaders(token, "GetActivityByCode", requireCompany: true);

            var safeCode = EscapePathSegment(actividadId);

            var result = await SendGetAsync(ApiRoutes.ActivityByCode(safeCode));

            ApplyRefreshedToken(result.Headers, null);

            // If the response does not look like JSON, return the body as the message.
            if (!ApiPayloadParser.LooksLikeJson(result.Raw))
            {
                return new ApiResponse<ActivityDto>
                {
                    Success = result.IsSuccessStatusCode,
                    Message = string.IsNullOrWhiteSpace(result.Raw) ? "Empty response" : result.Raw,
                    Data = null,
                    TraceId = TryGetTraceId(result.Headers)
                };
            }

            try
            {
                // 1) Try to deserialize as ApiResponse<ActivityDto>.
                var parsedEnvelope = JsonSerializer.Deserialize<ApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                if (parsedEnvelope != null && parsedEnvelope.Data != null && !ApiPayloadParser.IsActivityEmpty(parsedEnvelope.Data))
                {
                    parsedEnvelope.TraceId ??= TryGetTraceId(result.Headers);
                    return parsedEnvelope;
                }

                // 1b) Some environments return a paged envelope with Items.
                //     Take the first item when present.
                try
                {
                    var pagedEnvelope = JsonSerializer.Deserialize<PagedApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                    var firstItem = pagedEnvelope?.GetAnyItems().FirstOrDefault();
                    if (firstItem != null && !ApiPayloadParser.IsActivityEmpty(firstItem))
                    {
                        return new ApiResponse<ActivityDto>
                        {
                            Success = pagedEnvelope!.Success,
                            Message = pagedEnvelope.Message,
                            ErrorCode = pagedEnvelope.ErrorCode,
                            Errors = pagedEnvelope.Errors ?? new List<IndValidationError>(),
                            Data = firstItem,
                            TraceId = pagedEnvelope.TraceId ?? TryGetTraceId(result.Headers)
                        };
                    }
                }
                catch
                {
                    // ignore paged parsing errors and continue with manual parsing
                }

                using var doc = JsonDocument.Parse(result.Raw);
                var root = doc.RootElement;

                ActivityDto? data = null;
                string? message = null;

                if (root.TryGetProperty("Message", out var msgProp) && msgProp.ValueKind == JsonValueKind.String)
                    message = msgProp.GetString();
                if (root.TryGetProperty("message", out var msgProp2) && msgProp2.ValueKind == JsonValueKind.String)
                    message ??= msgProp2.GetString();

                if (root.TryGetProperty("Data", out var dataProp))
                {
                    data = ApiPayloadParser.ParseActivityFromElement(dataProp, JsonOptions);
                }
                else if (root.ValueKind == JsonValueKind.Array && root.GetArrayLength() > 0)
                {
                    data = ApiPayloadParser.ParseActivityFromElement(root[0], JsonOptions);
                }
                else if (root.ValueKind == JsonValueKind.Object)
                {
                    data = ApiPayloadParser.ParseActivityFromElement(root, JsonOptions);
                }

                return new ApiResponse<ActivityDto>
                {
                    Success = result.IsSuccessStatusCode && data != null,
                    Message = data != null ? message ?? "OK" : message ?? "No data",
                    Data = data,
                    TraceId = TryGetTraceId(result.Headers)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetActivityByCode parse error. Raw: {Raw}", SafeLogPayload(result.Raw));
            }

            // If we get here with no data, try parsing JSON embedded in the message.
            try
            {
                var embedded = result.Raw;

                // If the message is already wrapped in the standard envelope.
                if (ApiPayloadParser.LooksLikeJson(result.Raw))
                {
                    var envelope = JsonSerializer.Deserialize<ApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                    if (envelope?.Data != null)
                    {
                        envelope.TraceId ??= TryGetTraceId(result.Headers);
                        return envelope;
                    }
                    embedded = envelope?.Message ?? result.Raw;
                }

                if (!string.IsNullOrWhiteSpace(embedded))
                {
                    var normalized = embedded.Replace("\\u0022", "\"");
                    if (ApiPayloadParser.LooksLikeJson(normalized))
                    {
                        if (ApiPayloadParser.TryParseEnvelope(normalized, JsonOptions, out var parsedFromMessage))
                        {
                            parsedFromMessage.TraceId ??= TryGetTraceId(result.Headers);
                            return parsedFromMessage;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "GetActivityByCode embedded parse error. Raw: {Raw}", SafeLogPayload(result.Raw));
            }

            return new ApiResponse<ActivityDto>
            {
                Success = false,
                Message = string.IsNullOrWhiteSpace(result.Raw)
                    ? result.ErrorMessage ?? "Failed to parse response for GetActivityByCode"
                    : result.Raw,
                TraceId = TryGetTraceId(result.Headers),
                Data = null
            };
        }


        public async Task<ApiResponse<ActivityDto>> GetActivityByRecIdAsync(string token, long recId)
        {
            PrepareRequestHeaders(token, "GetActivityByRecId", requireCompany: true);

            var result = await SendGetAsync(ApiRoutes.ActivityByRecId(recId));
            ApplyRefreshedToken(result.Headers, null);

            try
            {
                var pagedEnvelope = JsonSerializer.Deserialize<PagedApiResponse<ActivityDto>>(result.Raw, JsonOptions);
                var firstItem = pagedEnvelope?.GetAnyItems().FirstOrDefault();
                if (firstItem != null && !ApiPayloadParser.IsActivityEmpty(firstItem))
                {
                    return new ApiResponse<ActivityDto>
                    {
                        Success = pagedEnvelope!.Success,
                        Message = pagedEnvelope.Message,
                        ErrorCode = pagedEnvelope.ErrorCode,
                        Errors = pagedEnvelope.Errors ?? new List<IndValidationError>(),
                        Data = firstItem,
                        TraceId = pagedEnvelope.TraceId ?? TryGetTraceId(result.Headers)
                    };
                }
            }
            catch
            {
                // Fall through to the standard response parser.
            }

            return BuildApiResponse<ActivityDto>(result, "GetActivityByRecId");
        }

        public async Task<ApiResponse<object>> CreateActivityAsync(string token, CreateActivityRequest req)
        {
            PrepareRequestHeaders(token, "CreateActivity", requireCompany: true);

            var result = await SendPostJsonAsync(ApiRoutes.ActivitiesCreate, req);
            return BuildApiResponse<object>(result, "CreateActivity");
        }

        public async Task<ApiResponse<object>> UpdateActivityAsync(string token, long recId, UpdateActivityRequest req)
        {
            PrepareRequestHeaders(token, "UpdateActivity", requireCompany: true);

            var result = await SendPutJsonAsync(ApiRoutes.ActivityByRecId(recId), req);
            return BuildApiResponse<object>(result, "UpdateActivity");
        }

        public async Task<ApiResponse<object>> DeleteActivityAsync(string token, long recId)
        {
            PrepareRequestHeaders(token, "DeleteActivity", requireCompany: true);

            var result = await SendDeleteAsync(ApiRoutes.ActivityByRecId(recId));
            return BuildApiResponse<object>(result, "DeleteActivity");
        }

        // ======================================================
        // Visit assistants
        // ======================================================
        public async Task<ApiResponse<object>> CreateVisitaAsistenteAsync(string token, CreateVisitaAsistenteRequest req)
        {
            PrepareRequestHeaders(token, "CreateVisitaAsistente", requireCompany: true);

            var result = await SendPostJsonAsync(ApiRoutes.VisitsCreateAsistente, req);
            return BuildApiResponse<object>(result, "CreateVisitaAsistente");
        }

        public async Task<ApiResponse<object>> DeleteVisitaAsistenteAsync(string token, DeleteVisitaAsistenteRequest req)
        {
            PrepareRequestHeaders(token, "DeleteVisitaAsistente", requireCompany: true);

            var result = await SendDeleteJsonAsync(ApiRoutes.VisitsDeleteAsistente, req);
            return BuildApiResponse<object>(result, "DeleteVisitaAsistente");
        }

        // ======================================================
        // Expense sheets
        // ======================================================
        public async Task<ApiResponse<ExpenseSheetCreateResponseData>> CreateExpenseSheetAsync(
            string token,
            ExpenseSheetCreateRequest req,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "CreateExpenseSheet",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            req ??= new ExpenseSheetCreateRequest();
            _logger.LogInformation(
                "CreateExpenseSheet request. Mode: {Mode}. ExistingHojaGastosId: {ExistingHojaGastosId}. CurrencyCode: {CurrencyCode}. ExchRate: {ExchRate}. LineCount: {LineCount}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}.",
                req.Mode,
                NormalizeOptionalText(req.ExistingHojaGastosId) ?? "<empty>",
                NormalizeCurrencyCodeForTrace(req.CurrencyCode),
                req.ExchRate,
                req.Lines?.Count ?? 0,
                GetSelectedCompanyId() ?? "<empty>",
                NormalizeOptionalText(axUserIdOverride) ?? "<session>");
            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheets, req);
            var response = BuildApiResponse<ExpenseSheetCreateResponseData>(result, "CreateExpenseSheet");
            _logger.LogInformation(
                "CreateExpenseSheet upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. HojaGastosId: {HojaGastosId}. LineRecIdCount: {LineRecIdCount}.",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                NormalizeOptionalText(response.Data?.HojaGastosId) ?? "<empty>",
                response.Data?.LineRecIds?.Count ?? 0);
            return response;
        }

        public async Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetDetailAsync(
            string token,
            string hojaGastosId,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "GetExpenseSheetDetail",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var safeId = EscapePathSegment(hojaGastosId);
            _logger.LogInformation(
                "GetExpenseSheetDetail upstream request. HojaGastosId: {HojaGastosId}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}.",
                hojaGastosId,
                GetSelectedCompanyId() ?? "<empty>",
                NormalizeOptionalText(axUserIdOverride) ?? "<session>");
            var result = await SendGetAsync(ApiRoutes.ExpenseSheetById(safeId));
            if (!result.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "GetExpenseSheetDetail upstream HTTP result. StatusCode: {StatusCode}. DurationMs: {DurationMs}. TraceId: {TraceId}. HojaGastosId: {HojaGastosId}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}. Error: {Error}. Raw: {Raw}.",
                    (int)result.StatusCode,
                    result.DurationMs,
                    TryGetTraceId(result.Headers) ?? "<null>",
                    hojaGastosId,
                    GetSelectedCompanyId() ?? "<empty>",
                    NormalizeOptionalText(axUserIdOverride) ?? "<session>",
                    result.ErrorMessage ?? "<null>",
                    SafeLogPayload(result.Raw));
            }
            var response = BuildPagedResponse<ExpenseSheetDetailDto>(result, "GetExpenseSheetDetail");
            _logger.LogInformation(
                "GetExpenseSheetDetail upstream result. Success: {Success}. TraceId: {TraceId}. HojaGastosId: {HojaGastosId}. CurrencyCode: {CurrencyCode}. Summary: {Summary}.",
                response.Success,
                response.TraceId ?? "<null>",
                hojaGastosId,
                ReadExpenseSheetCurrencyCodeForTrace(response.GetAnyItems().FirstOrDefault()),
                BuildExpenseSheetCurrencySummary(response.GetAnyItems()));
            return response;
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetHeaderAsync(
            string token,
            string hojaGastosId,
            ExpenseSheetUpdateRequest req,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "UpdateExpenseSheetHeader",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var safeId = EscapePathSegment(hojaGastosId);
            req ??= new ExpenseSheetUpdateRequest();
            _logger.LogInformation(
                "UpdateExpenseSheetHeader request. HojaGastosId: {HojaGastosId}. CurrencyCode: {CurrencyCode}. ExchRate: {ExchRate}. ProjId: {ProjId}. ExpenseSheetStatus: {ExpenseSheetStatus}. ExchangeRateMode: {ExchangeRateMode}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}.",
                hojaGastosId,
                NormalizeCurrencyCodeForTrace(req.CurrencyCode),
                req.ExchRate,
                NormalizeOptionalText(req.ProjId) ?? "<empty>",
                req.ExpenseSheetStatus.HasValue ? req.ExpenseSheetStatus.Value.ToString(CultureInfo.InvariantCulture) : "null",
                req.ExchangeRateMode.HasValue ? req.ExchangeRateMode.Value.ToString(CultureInfo.InvariantCulture) : "null",
                GetSelectedCompanyId() ?? "<empty>",
                NormalizeOptionalText(axUserIdOverride) ?? "<session>");
            var result = await SendPutJsonAsync(ApiRoutes.ExpenseSheetById(safeId), req);
            var response = BuildApiResponse<object>(result, "UpdateExpenseSheetHeader");
            _logger.LogInformation(
                "UpdateExpenseSheetHeader upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. HojaGastosId: {HojaGastosId}. CurrencyCode: {CurrencyCode}.",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                hojaGastosId,
                NormalizeCurrencyCodeForTrace(req.CurrencyCode));
            return response;
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetLineAsync(
            string token,
            string hojaGastosId,
            string lineRecId,
            ExpenseSheetLineRequest req,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "UpdateExpenseSheetLine",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var safeSheetId = EscapePathSegment(hojaGastosId);
            var safeLineId = EscapePathSegment(lineRecId);
            var result = await SendPutJsonAsync(ApiRoutes.ExpenseSheetLine(safeSheetId, safeLineId), req);
            return BuildApiResponse<object>(result, "UpdateExpenseSheetLine");
        }

        public async Task<ApiResponse<object>> DeleteExpenseSheetLineAsync(
            string token,
            string hojaGastosId,
            string lineRecId,
            bool deleteWholeSheet,
            int? deleteMode = null,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "DeleteExpenseSheetLine",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var safeSheetId = EscapePathSegment(hojaGastosId);
            var safeLineId = EscapePathSegment(lineRecId ?? "0");

            var result = await SendDeleteAsync(
                ApiRoutes.ExpenseSheetLineDelete(safeSheetId, safeLineId, deleteMode, deleteWholeSheet));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetLine");
        }

        public async Task<PagedApiResponse<ExpenseSheetDetailDto>> GetExpenseSheetsAsync(
            string token,
            ExpenseSheetListApiRequest req,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "GetExpenseSheets",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            req ??= new ExpenseSheetListApiRequest();

            var normalizedPage = req.Page < 1 ? 1 : req.Page;
            var normalizedPageSize = req.PageSize <= 0 ? 50 : req.PageSize;
            var normalizedBilledMode = req.BilledMode is >= 0 and <= 2 ? req.BilledMode.Value : 2;
            var normalizedExpenseSheetStatus = req.ExpenseSheetStatus is >= 0 and <= 4 ? req.ExpenseSheetStatus : null;
            var normalizedFilter = NormalizeOptionalText(req.Filter) ?? string.Empty;
            var normalizedCreatedDateFrom = NormalizeAxListDate(req.CreatedDateFrom) ?? string.Empty;
            var normalizedCreatedDateTo = NormalizeAxListDate(req.CreatedDateTo) ?? string.Empty;
            var normalizedProjId = NormalizeOptionalText(req.ProjId) ?? string.Empty;
            var normalizedCurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant() ?? string.Empty;
            var normalizedIncludeSubordinates = req.IncludeSubordinates;

            var payload = new Dictionary<string, object?>
            {
                ["filter"] = normalizedFilter,
                ["billedMode"] = normalizedBilledMode,
                ["createdDateFrom"] = normalizedCreatedDateFrom,
                ["createdDateTo"] = normalizedCreatedDateTo,
                ["projId"] = normalizedProjId,
                ["currencyCode"] = normalizedCurrencyCode,
                ["expenseSheetStatus"] = normalizedExpenseSheetStatus,
                ["includeSubordinates"] = normalizedIncludeSubordinates,
                ["page"] = normalizedPage,
                ["pageSize"] = normalizedPageSize
            };

            var serializedPayload = Serialize(payload);
            _logger.LogInformation(
                "Upstream request {Operation}: payloadLength={PayloadLength} billedMode={BilledMode} page={Page} pageSize={PageSize} createdDateFrom={CreatedDateFrom} createdDateTo={CreatedDateTo} filterLen={FilterLen} projIdLen={ProjIdLen} currencyCode={CurrencyCode} expenseSheetStatus={ExpenseSheetStatus} includeSubordinates={IncludeSubordinates} axUserIdOverride={AxUserIdOverride}",
                "GetExpenseSheets",
                serializedPayload.Length,
                normalizedBilledMode,
                normalizedPage,
                normalizedPageSize,
                normalizedCreatedDateFrom,
                normalizedCreatedDateTo,
                normalizedFilter.Length,
                normalizedProjId.Length,
                string.IsNullOrWhiteSpace(normalizedCurrencyCode) ? "<empty>" : normalizedCurrencyCode,
                normalizedExpenseSheetStatus.HasValue ? normalizedExpenseSheetStatus.Value.ToString(CultureInfo.InvariantCulture) : "null",
                normalizedIncludeSubordinates,
                NormalizeOptionalText(axUserIdOverride) ?? "<session>");

            var result = await SendPostAsync(ApiRoutes.ExpenseSheetsList, serializedPayload);
            if (!result.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "Upstream non-success {Operation}: statusCode={StatusCode} payloadLength={PayloadLength} body={BodySnippet}",
                    "GetExpenseSheets",
                    (int)result.StatusCode,
                    serializedPayload.Length,
                    SafeLogSnippet(result.Raw));
            }
            var response = BuildPagedResponse<ExpenseSheetDetailDto>(result, "GetExpenseSheets");
            _logger.LogInformation(
                "GetExpenseSheets upstream result. Success: {Success}. TraceId: {TraceId}. RequestedCurrencyCode: {RequestedCurrencyCode}. Summary: {Summary}.",
                response.Success,
                response.TraceId ?? "<null>",
                string.IsNullOrWhiteSpace(normalizedCurrencyCode) ? "<empty>" : normalizedCurrencyCode,
                BuildExpenseSheetCurrencySummary(response.GetAnyItems()));
            return response;
        }

        public async Task<PagedApiResponse<ExpenseSheetCurrencyDto>> GetExpenseSheetCurrenciesAsync(
            string token,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "GetExpenseSheetCurrencies",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var result = await SendGetAsync(ApiRoutes.ExpenseSheetCurrencies);
            var parsed = BuildPagedResponse<ExpenseSheetCurrencyDto>(result, "GetExpenseSheetCurrencies");
            if (parsed.GetAnyItems().Any())
            {
                return parsed;
            }

            var fallback = TryParseExpenseSheetCurrenciesFallback(result);
            return fallback ?? parsed;
        }

        public async Task<PagedApiResponse<ExpenseSheetSubordinateDto>> GetExpenseSheetSubordinatesAsync(
            string token,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "GetExpenseSheetSubordinates",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var result = await SendGetAsync(ApiRoutes.ExpenseSheetSubordinates);
            if (!result.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "GetExpenseSheetSubordinates upstream HTTP result. StatusCode: {StatusCode}. DurationMs: {DurationMs}. TraceId: {TraceId}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}. Error: {Error}. Raw: {Raw}.",
                    (int)result.StatusCode,
                    result.DurationMs,
                    TryGetTraceId(result.Headers) ?? "<null>",
                    GetSelectedCompanyId() ?? "<empty>",
                    NormalizeOptionalText(axUserIdOverride) ?? "<session>",
                    result.ErrorMessage ?? "<null>",
                    SafeLogPayload(result.Raw));
            }
            return BuildPagedResponse<ExpenseSheetSubordinateDto>(result, "GetExpenseSheetSubordinates");
        }

        // Asks AI questions about the filtered expense sheet dataset.
        public async Task<ApiTransportResponse<ExpenseSheetsAskResponseData>> AskExpenseSheetsAsync(
            string token,
            ExpenseSheetsAskRequest req,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(
                token,
                "AskExpenseSheets",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            req ??= new ExpenseSheetsAskRequest();
            var payload = new ExpenseSheetsAskRequest
            {
                Question = NormalizeOptionalText(req.Question),
                AnswerInstructions = NormalizeOptionalText(req.AnswerInstructions),
                ListRequest = NormalizeExpenseSheetsAskListRequest(req.ListRequest),
                SourceJson = CloneOptionalJsonElement(req.SourceJson)
            };

            var serializedPayload = Serialize(payload);
            _logger.LogInformation(
                "AskExpenseSheets request. QuestionLength: {QuestionLength}. HasAnswerInstructions: {HasAnswerInstructions}. HasListRequest: {HasListRequest}. HasSourceJson: {HasSourceJson}. PayloadLength: {PayloadLength}. AxUserIdOverride: {AxUserIdOverride}.",
                payload.Question?.Length ?? 0,
                !string.IsNullOrWhiteSpace(payload.AnswerInstructions),
                payload.ListRequest != null,
                payload.SourceJson.HasValue && payload.SourceJson.Value.ValueKind != JsonValueKind.Null && payload.SourceJson.Value.ValueKind != JsonValueKind.Undefined,
                serializedPayload.Length,
                NormalizeOptionalText(axUserIdOverride) ?? "<session>");

            var result = await SendPostAsync(ApiRoutes.ExpenseSheetsAsk, serializedPayload, cancellationToken);
            var response = BuildApiResponse<ExpenseSheetsAskResponseData>(result, "AskExpenseSheets");
            _logger.LogInformation(
                "AskExpenseSheets upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. RetryAfter: {RetryAfter}. Message: {Message}. Raw: {Raw}",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                TryGetHeaderValue(result.Headers, "Retry-After") ?? "<null>",
                response.Message ?? "<null>",
                SafeLogPayload(result.Raw));

            return new ApiTransportResponse<ExpenseSheetsAskResponseData>
            {
                Response = response,
                StatusCode = result.StatusCode,
                Headers = result.Headers
            };
        }

        public async Task<ApiResponse<object>> CreateExpenseSheetTicketAsync(
            string token,
            ExpenseSheetTicketCreateRequest req,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "CreateExpenseSheetTicket",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            req ??= new ExpenseSheetTicketCreateRequest();
            var lines = req.Lines?
                .Where(x => x != null)
                .Select(x => new ExpenseSheetTicketLineRequest
                {
                    Description = (x.Description ?? string.Empty).Trim(),
                    Qty = x.Qty,
                    Price = x.Price,
                    TotalAmount = x.TotalAmount
                })
                .ToList();

            var payload = new ExpenseSheetTicketCreateRequest
            {
                Mode = req.Mode,
                ExistingFileId = NormalizeOptionalText(req.ExistingFileId),
                Description = NormalizeOptionalText(req.Description),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                TotalAmount = req.TotalAmount,
                Status = req.Status,
                TransDate = NormalizeOptionalText(req.TransDate),
                TicketDate = NormalizeOptionalText(req.TicketDate),
                TicketTime = NormalizeOptionalText(req.TicketTime),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
                FileName = NormalizeOptionalText(req.FileName),
                FileExtension = NormalizeOptionalText(req.FileExtension),
                ProcessedByAI = req.ProcessedByAI,
                GastoType = NormalizeTicketGastoType(req.GastoType),
                Lines = lines != null && lines.Count > 0 ? lines : null
            };

            _logger.LogInformation(
                "CreateExpenseSheetTicket request. Mode: {Mode}. ExistingFileId: {ExistingFileId}. CurrencyCode: {CurrencyCode}. TotalAmount: {TotalAmount}. TransDate: {TransDate}. GastoType: {GastoType}. LineCount: {LineCount}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}.",
                payload.Mode,
                payload.ExistingFileId ?? "<empty>",
                NormalizeCurrencyCodeForTrace(payload.CurrencyCode),
                payload.TotalAmount,
                payload.TransDate ?? "<empty>",
                payload.GastoType.HasValue ? payload.GastoType.Value.ToString(CultureInfo.InvariantCulture) : "null",
                payload.Lines?.Count ?? 0,
                GetSelectedCompanyId() ?? "<empty>",
                NormalizeOptionalText(axUserIdOverride) ?? "<session>");
            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheetTickets, payload);
            var response = BuildApiResponse<object>(result, "CreateExpenseSheetTicket");
            _logger.LogInformation(
                "CreateExpenseSheetTicket upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. CurrencyCode: {CurrencyCode}.",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                NormalizeCurrencyCodeForTrace(payload.CurrencyCode));
            return response;
        }

        // Creates and finalizes a ticket from one uploaded image through the composite endpoint.
        public async Task<ApiTransportResponse<object>> QuickCreateExpenseSheetTicketAsync(
            string token,
            ExpenseSheetTicketQuickCreateRequest req,
            Stream ticketImageStream,
            string fileName,
            string? contentType,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(
                token,
                "QuickCreateExpenseSheetTicket",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            req ??= new ExpenseSheetTicketQuickCreateRequest();
            var payload = new ExpenseSheetTicketQuickCreateRequest
            {
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                Description = NormalizeOptionalText(req.Description),
                Comentario = NormalizeOptionalText(req.Comentario),
                ExistingHojaGastosId = NormalizeOptionalText(req.ExistingHojaGastosId),
                ProjId = NormalizeOptionalText(req.ProjId) ?? NormalizeOptionalText(req.ProjectId),
                ProjectId = NormalizeOptionalText(req.ProjectId)
            };

            var safeFileName = string.IsNullOrWhiteSpace(fileName) ? "ticket.jpg" : Path.GetFileName(fileName);
            var mime = string.IsNullOrWhiteSpace(contentType) ? "application/octet-stream" : contentType.Trim();
            var canReportLength = ticketImageStream.CanSeek;
            var streamLength = canReportLength ? ticketImageStream.Length : -1;

            _logger.LogInformation(
                "QuickCreateExpenseSheetTicket request. FileName: {FileName}. ContentType: {ContentType}. StreamLength: {StreamLength}. CurrencyCode: {CurrencyCode}. ExistingHojaGastosId: {ExistingHojaGastosId}. ProjId: {ProjId}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}. DescriptionLength: {DescriptionLength}. ComentarioLength: {ComentarioLength}.",
                safeFileName,
                mime,
                streamLength,
                payload.CurrencyCode ?? "<empty>",
                payload.ExistingHojaGastosId ?? "<empty>",
                payload.ProjId ?? "<empty>",
                GetSelectedCompanyId() ?? "<empty>",
                NormalizeOptionalText(axUserIdOverride) ?? "<session>",
                payload.Description?.Length ?? 0,
                payload.Comentario?.Length ?? 0);

            return await SendQuickCreateExpenseSheetTicketRequestAsync(
                payload,
                ticketImageStream,
                safeFileName,
                mime,
                cancellationToken);
        }

        // Sends one uploaded image through the composite endpoint and logs the stage data returned by upstream.
        private async Task<ApiTransportResponse<object>> SendQuickCreateExpenseSheetTicketRequestAsync(
            ExpenseSheetTicketQuickCreateRequest payload,
            Stream ticketImageStream,
            string safeFileName,
            string mime,
            CancellationToken cancellationToken)
        {
            using var form = new MultipartFormDataContent();
            if (ticketImageStream.CanSeek)
                ticketImageStream.Position = 0;

            using var fileContent = new StreamContent(ticketImageStream);
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(mime);
            form.Add(fileContent, "ticketImage", safeFileName);

            if (payload.CurrencyCode != null)
                form.Add(new StringContent(payload.CurrencyCode), "currencyCode");

            if (payload.Description != null)
                form.Add(new StringContent(payload.Description), "description");

            if (payload.Comentario != null)
                form.Add(new StringContent(payload.Comentario), "comentario");

            if (!string.IsNullOrWhiteSpace(payload.ExistingHojaGastosId))
                form.Add(new StringContent(payload.ExistingHojaGastosId), "existingHojaGastosId");

            if (!string.IsNullOrWhiteSpace(payload.ProjId))
                form.Add(new StringContent(payload.ProjId), "projId");

            _logger.LogInformation(
                "QuickCreateExpenseSheetTicket multipart envelope. FileName: {FileName}. Mime: {Mime}. StreamCanSeek: {StreamCanSeek}. StreamLength: {StreamLength}. HasCurrencyCode: {HasCurrencyCode}. HasDescription: {HasDescription}. HasComentario: {HasComentario}. HasExistingHojaGastosId: {HasExistingHojaGastosId}. HasProjId: {HasProjId}.",
                safeFileName,
                mime,
                ticketImageStream.CanSeek,
                ticketImageStream.CanSeek ? ticketImageStream.Length : -1,
                !string.IsNullOrWhiteSpace(payload.CurrencyCode),
                !string.IsNullOrWhiteSpace(payload.Description),
                !string.IsNullOrWhiteSpace(payload.Comentario),
                !string.IsNullOrWhiteSpace(payload.ExistingHojaGastosId),
                !string.IsNullOrWhiteSpace(payload.ProjId));

            var result = await SendPostMultipartAsync(
                ApiRoutes.ExpenseSheetTicketsQuickCreate,
                form,
                cancellationToken);

            var response = BuildApiResponse<object>(result, "QuickCreateExpenseSheetTicket");
            var hasPartialState = TryReadQuickCreatePartialState(response.Data, out var partialState);
            _logger.LogInformation(
                "QuickCreateExpenseSheetTicket upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. DurationMs: {DurationMs}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. FileId: {FileId}. CompletedStage: {CompletedStage}. FailedStage: {FailedStage}. LinkedToSheet: {LinkedToSheet}. RollbackAttempted: {RollbackAttempted}. RollbackSucceeded: {RollbackSucceeded}. RollbackMessage: {RollbackMessage}. RetryAfter: {RetryAfter}. Message: {Message}. Raw: {Raw}",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                result.DurationMs,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                hasPartialState ? partialState!.FileId : "<null>",
                hasPartialState ? partialState!.CompletedStage : "<null>",
                hasPartialState ? partialState!.FailedStage : "<null>",
                hasPartialState ? partialState!.LinkedToSheet.ToString() : "<null>",
                hasPartialState ? (partialState!.RollbackAttempted?.ToString() ?? "<null>") : "<null>",
                hasPartialState ? (partialState!.RollbackSucceeded?.ToString() ?? "<null>") : "<null>",
                hasPartialState ? partialState!.RollbackMessage : "<null>",
                TryGetHeaderValue(result.Headers, "Retry-After") ?? "<null>",
                response.Message ?? "<null>",
                SafeLogPayload(result.Raw));

            return new ApiTransportResponse<object>
            {
                Response = response,
                StatusCode = result.StatusCode,
                Headers = result.Headers
            };
        }

        // Reads the partial quick-create state returned by the composite endpoint after sub-step failures.
        private static bool TryReadQuickCreatePartialState(object? rawData, out QuickCreatePartialState? partialState)
        {
            partialState = null;
            if (!TryConvertToJsonElement(rawData, out var root) || root.ValueKind != JsonValueKind.Object)
            {
                return false;
            }

            var fileId = NormalizeOptionalText(ReadStringLikeProperty(root, "FileId", "fileId"));
            if (string.IsNullOrWhiteSpace(fileId))
            {
                return false;
            }

            var stepTraceIds = new QuickCreateStepTraceIds();
            if (JsonPropertyHelper.TryGetPropertyInsensitive(root, "StepTraceIds", out var stepTraceElement) &&
                stepTraceElement.ValueKind == JsonValueKind.Object)
            {
                stepTraceIds = new QuickCreateStepTraceIds
                {
                    TicketCreate = NormalizeOptionalText(ReadStringLikeProperty(stepTraceElement, "TicketCreate", "ticketCreate")) ?? string.Empty,
                    FileUpload = NormalizeOptionalText(ReadStringLikeProperty(stepTraceElement, "FileUpload", "fileUpload")) ?? string.Empty,
                    DraftExtract = NormalizeOptionalText(ReadStringLikeProperty(stepTraceElement, "DraftExtract", "draftExtract")) ?? string.Empty,
                    TicketFinalize = NormalizeOptionalText(ReadStringLikeProperty(stepTraceElement, "TicketFinalize", "ticketFinalize")) ?? string.Empty,
                    SheetLink = NormalizeOptionalText(ReadStringLikeProperty(stepTraceElement, "SheetLink", "sheetLink")) ?? string.Empty
                };
            }

            partialState = new QuickCreatePartialState
            {
                FileId = fileId,
                UrlFile = NormalizeOptionalText(ReadStringLikeProperty(root, "UrlFile", "urlFile")) ?? string.Empty,
                FileName = NormalizeOptionalText(ReadStringLikeProperty(root, "FileName", "fileName")) ?? string.Empty,
                ProcessedByAI = TryReadBoolProperty(root, "ProcessedByAI", "processedByAI"),
                LinkedToSheet = TryReadBoolProperty(root, "LinkedToSheet", "linkedToSheet") ?? false,
                HojaGastosId = NormalizeOptionalText(ReadStringLikeProperty(root, "HojaGastosId", "hojaGastosId")),
                CompletedStage = NormalizeOptionalText(ReadStringLikeProperty(root, "CompletedStage", "completedStage")) ?? string.Empty,
                FailedStage = NormalizeOptionalText(ReadStringLikeProperty(root, "FailedStage", "failedStage")) ?? string.Empty,
                RollbackAttempted = TryReadBoolProperty(root, "RollbackAttempted", "rollbackAttempted"),
                RollbackSucceeded = TryReadBoolProperty(root, "RollbackSucceeded", "rollbackSucceeded"),
                RollbackMessage = NormalizeOptionalText(ReadStringLikeProperty(root, "RollbackMessage", "rollbackMessage")) ?? string.Empty,
                StepTraceIds = stepTraceIds
            };

            return true;
        }

        // Converts arbitrary response payloads into detached JsonElements for tolerant parsing.
        private static bool TryConvertToJsonElement(object? value, out JsonElement element)
        {
            if (value is JsonElement jsonElement)
            {
                element = jsonElement.Clone();
                return true;
            }

            if (value is JsonDocument jsonDocument)
            {
                element = jsonDocument.RootElement.Clone();
                return true;
            }

            if (value == null)
            {
                element = default;
                return false;
            }

            try
            {
                using var document = JsonDocument.Parse(JsonSerializer.Serialize(value, JsonOptions));
                element = document.RootElement.Clone();
                return true;
            }
            catch
            {
                element = default;
                return false;
            }
        }

        // Reads integer-like values from one object using tolerant key matching.
        private static int? TryReadIntFromProperties(JsonElement root, params string[] keys)
        {
            foreach (var key in keys)
            {
                if (!JsonPropertyHelper.TryGetPropertyInsensitive(root, key, out var element))
                    continue;

                if (TryReadIntValue(element, out var value))
                    return value;
            }

            return null;
        }

        // Reads decimal-like values from one object using tolerant key matching.
        private static decimal? TryReadDecimalFromProperties(JsonElement root, params string[] keys)
        {
            foreach (var key in keys)
            {
                if (!JsonPropertyHelper.TryGetPropertyInsensitive(root, key, out var element))
                    continue;

                if (TryReadDecimalValue(element, out var value))
                    return value;
            }

            return null;
        }

        // Parses one integer value from either number or numeric string JSON nodes.
        private static bool TryReadIntValue(JsonElement element, out int value)
        {
            value = default;
            if (element.ValueKind == JsonValueKind.Number && element.TryGetInt32(out value))
                return true;

            if (element.ValueKind == JsonValueKind.String)
            {
                var raw = NormalizeOptionalText(element.GetString());
                if (raw != null && int.TryParse(raw, NumberStyles.Integer, CultureInfo.InvariantCulture, out value))
                    return true;
            }

            return false;
        }

        // Parses one decimal value from either number or numeric string JSON nodes.
        private static bool TryReadDecimalValue(JsonElement element, out decimal value)
        {
            value = default;
            if (element.ValueKind == JsonValueKind.Number && element.TryGetDecimal(out value))
                return true;

            if (element.ValueKind == JsonValueKind.String)
            {
                var raw = NormalizeOptionalText(element.GetString());
                if (raw == null)
                    return false;

                if (decimal.TryParse(raw, NumberStyles.Number, CultureInfo.InvariantCulture, out value))
                    return true;

                if (decimal.TryParse(raw, NumberStyles.Number, CultureInfo.CurrentCulture, out value))
                    return true;
            }

            return false;
        }

        public async Task<PagedApiResponse<ExpenseSheetTicketListItemDto>> GetExpenseSheetTicketsAsync(
            string token,
            ExpenseSheetTicketListRequest req,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(
                token,
                "GetExpenseSheetTickets",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            req ??= new ExpenseSheetTicketListRequest();

            var normalizedPage = req.Page < 1 ? 1 : req.Page;
            var normalizedPageSize = req.PageSize <= 0 ? 50 : req.PageSize;
            var normalizedCreatedDateFrom = NormalizeAxListDate(req.CreatedDateFrom) ?? string.Empty;
            var normalizedCreatedDateTo = NormalizeAxListDate(req.CreatedDateTo) ?? string.Empty;
            var normalizedSearchKey = NormalizeOptionalText(req.SearchKey) ?? NormalizeOptionalText(req.Filter) ?? string.Empty;
            var normalizedFilter = NormalizeOptionalText(req.Filter) ?? normalizedSearchKey;
            var normalizedCurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant() ?? string.Empty;
            var normalizedGastoType = NormalizeTicketGastoType(req.GastoType);
            var normalizedStatus = BuildTicketStatusFilterToken(req.Status);
            var normalizedProcessedByAi = req.ProcessedByAI;
            var payload = new Dictionary<string, object?>
            {
                ["page"] = normalizedPage,
                ["pageSize"] = normalizedPageSize,
                ["createdDateFrom"] = normalizedCreatedDateFrom,
                ["createdDateTo"] = normalizedCreatedDateTo,
                ["searchKey"] = normalizedSearchKey,
                ["filter"] = normalizedFilter,
                ["status"] = normalizedStatus,
                ["currencyCode"] = normalizedCurrencyCode,
                ["gastoType"] = normalizedGastoType,
                ["processedByAI"] = normalizedProcessedByAi
            };

            var serializedPayload = Serialize(payload);
            _logger.LogInformation(
                "Upstream request {Operation}: payloadLength={PayloadLength} page={Page} pageSize={PageSize} createdDateFrom={CreatedDateFrom} createdDateTo={CreatedDateTo} searchKeyLen={SearchKeyLen} filterLen={FilterLen} status={Status} currencyCode={CurrencyCode} gastoType={GastoType} processedByAI={ProcessedByAI}",
                "GetExpenseSheetTickets",
                serializedPayload.Length,
                normalizedPage,
                normalizedPageSize,
                normalizedCreatedDateFrom,
                normalizedCreatedDateTo,
                normalizedSearchKey.Length,
                normalizedFilter.Length,
                normalizedStatus.HasValue ? normalizedStatus.Value.ToString(CultureInfo.InvariantCulture) : "null",
                string.IsNullOrWhiteSpace(normalizedCurrencyCode) ? "<empty>" : normalizedCurrencyCode,
                normalizedGastoType.HasValue ? normalizedGastoType.Value.ToString(CultureInfo.InvariantCulture) : "null",
                normalizedProcessedByAi.HasValue ? normalizedProcessedByAi.Value.ToString(CultureInfo.InvariantCulture) : "null");

            var result = await SendPostAsync(ApiRoutes.ExpenseSheetTicketsList, serializedPayload, cancellationToken);
            if (!result.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "Upstream non-success {Operation}: statusCode={StatusCode} payloadLength={PayloadLength} body={BodySnippet}",
                    "GetExpenseSheetTickets",
                    (int)result.StatusCode,
                    serializedPayload.Length,
                    SafeLogSnippet(result.Raw));
            }
            var response = BuildPagedResponse<ExpenseSheetTicketListItemDto>(result, "GetExpenseSheetTickets");
            _logger.LogInformation(
                "GetExpenseSheetTickets upstream result. Success: {Success}. TraceId: {TraceId}. RequestedCurrencyCode: {RequestedCurrencyCode}. Summary: {Summary}.",
                response.Success,
                response.TraceId ?? "<null>",
                string.IsNullOrWhiteSpace(normalizedCurrencyCode) ? "<empty>" : normalizedCurrencyCode,
                BuildTicketCurrencySummary(response.GetAnyItems(), item => item.FileId, item => item.CurrencyCode));
            return response;
        }

        public async Task<PagedApiResponse<ExpenseSheetTicketLinkListItemDto>> GetExpenseSheetTicketLinkListAsync(
            string token,
            ExpenseSheetTicketLinkListRequest req,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(
                token,
                "GetExpenseSheetTicketLinkList",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            req ??= new ExpenseSheetTicketLinkListRequest();

            var normalizedPage = req.Page < 1 ? 1 : req.Page;
            var normalizedPageSize = req.PageSize <= 0 ? 50 : req.PageSize;
            var normalizedCreatedDateFrom = NormalizeAxListDate(req.CreatedDateFrom) ?? string.Empty;
            var normalizedCreatedDateTo = NormalizeAxListDate(req.CreatedDateTo) ?? string.Empty;
            var normalizedSearchKey = NormalizeOptionalText(req.SearchKey) ?? NormalizeOptionalText(req.Filter) ?? string.Empty;
            var normalizedFilter = NormalizeOptionalText(req.Filter) ?? normalizedSearchKey;
            var normalizedCurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant() ?? string.Empty;
            var normalizedGastoType = NormalizeTicketGastoType(req.GastoType);

            var payload = new Dictionary<string, object?>
            {
                ["page"] = normalizedPage,
                ["pageSize"] = normalizedPageSize,
                ["createdDateFrom"] = normalizedCreatedDateFrom,
                ["createdDateTo"] = normalizedCreatedDateTo,
                ["searchKey"] = normalizedSearchKey,
                ["filter"] = normalizedFilter,
                ["currencyCode"] = normalizedCurrencyCode,
                ["gastoType"] = normalizedGastoType,
                ["processedByAI"] = req.ProcessedByAI
            };

            var serializedPayload = Serialize(payload);
            _logger.LogInformation(
                "Upstream request {Operation}: payloadLength={PayloadLength} page={Page} pageSize={PageSize} createdDateFrom={CreatedDateFrom} createdDateTo={CreatedDateTo} searchKeyLen={SearchKeyLen} filterLen={FilterLen} currencyCode={CurrencyCode} gastoType={GastoType} processedByAI={ProcessedByAI}",
                "GetExpenseSheetTicketLinkList",
                serializedPayload.Length,
                normalizedPage,
                normalizedPageSize,
                normalizedCreatedDateFrom,
                normalizedCreatedDateTo,
                normalizedSearchKey.Length,
                normalizedFilter.Length,
                string.IsNullOrWhiteSpace(normalizedCurrencyCode) ? "<empty>" : normalizedCurrencyCode,
                normalizedGastoType.HasValue ? normalizedGastoType.Value.ToString(CultureInfo.InvariantCulture) : "null",
                req.ProcessedByAI.HasValue ? req.ProcessedByAI.Value.ToString(CultureInfo.InvariantCulture) : "null");
            var result = await SendPostAsync(ApiRoutes.ExpenseSheetTicketsLinkList, serializedPayload, cancellationToken);
            var response = BuildPagedResponse<ExpenseSheetTicketLinkListItemDto>(result, "GetExpenseSheetTicketLinkList");
            _logger.LogInformation(
                "GetExpenseSheetTicketLinkList upstream result. Success: {Success}. TraceId: {TraceId}. RequestedCurrencyCode: {RequestedCurrencyCode}. Summary: {Summary}.",
                response.Success,
                response.TraceId ?? "<null>",
                string.IsNullOrWhiteSpace(normalizedCurrencyCode) ? "<empty>" : normalizedCurrencyCode,
                BuildTicketCurrencySummary(response.GetAnyItems(), item => item.FileId, item => item.CurrencyCode));
            return response;
        }

        public async Task<ApiResponse<ExpenseSheetTicketLinkBulkResultDto>> LinkExpenseSheetTicketsBulkAsync(
            string token,
            ExpenseSheetTicketLinkBulkRequest req,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(
                token,
                "LinkExpenseSheetTicketsBulk",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            req ??= new ExpenseSheetTicketLinkBulkRequest();
            var normalizedSelectionMode = string.Equals(req.SelectionMode, "filtered", StringComparison.OrdinalIgnoreCase)
                ? "filtered"
                : "selected";

            var payload = new ExpenseSheetTicketLinkBulkRequest
            {
                ExpenseSheetId = NormalizeOptionalText(req.ExpenseSheetId) ?? string.Empty,
                SelectionMode = normalizedSelectionMode,
                TicketIds = req.TicketIds?
                    .Select(NormalizeOptionalText)
                    .Where(value => !string.IsNullOrWhiteSpace(value))
                    .Cast<string>()
                    .ToList(),
                Filters = req.Filters == null
                    ? null
                    : new ExpenseSheetTicketLinkBulkFilters
                    {
                        SearchKey = NormalizeOptionalText(req.Filters.SearchKey),
                        Filter = NormalizeOptionalText(req.Filters.Filter),
                        CreatedDateFrom = NormalizeAxListDate(req.Filters.CreatedDateFrom),
                        CreatedDateTo = NormalizeAxListDate(req.Filters.CreatedDateTo),
                        CurrencyCode = NormalizeOptionalText(req.Filters.CurrencyCode)?.ToUpperInvariant(),
                        GastoType = NormalizeTicketGastoType(req.Filters.GastoType),
                        ProcessedByAI = req.Filters.ProcessedByAI
                    },
                ExcludedIds = req.ExcludedIds?
                    .Select(NormalizeOptionalText)
                    .Where(value => !string.IsNullOrWhiteSpace(value))
                    .Cast<string>()
                    .ToList()
            };

            _logger.LogInformation(
                "LinkExpenseSheetTicketsBulk request. ExpenseSheetId: {ExpenseSheetId}. SelectionMode: {SelectionMode}. FilterCurrencyCode: {FilterCurrencyCode}. TicketIds: {TicketIds}. ExcludedIds: {ExcludedIds}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}.",
                payload.ExpenseSheetId,
                payload.SelectionMode ?? "<empty>",
                NormalizeCurrencyCodeForTrace(payload.Filters?.CurrencyCode),
                BuildTraceListSample(payload.TicketIds),
                BuildTraceListSample(payload.ExcludedIds),
                GetSelectedCompanyId() ?? "<empty>",
                NormalizeOptionalText(axUserIdOverride) ?? "<session>");
            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheetTicketsLinkBulk, payload, cancellationToken);
            var response = BuildApiResponse<ExpenseSheetTicketLinkBulkResultDto>(result, "LinkExpenseSheetTicketsBulk");
            _logger.LogInformation(
                "LinkExpenseSheetTicketsBulk upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. RequestedCount: {RequestedCount}. LinkedCount: {LinkedCount}. Skipped: {Skipped}. Failed: {Failed}.",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                response.Data?.RequestedCount ?? 0,
                response.Data?.LinkedCount ?? 0,
                BuildBulkIssueSummary(response.Data?.Skipped),
                BuildBulkIssueSummary(response.Data?.Failed));
            return response;
        }

        public async Task<PagedApiResponse<ExpenseSheetTicketDetailDto>> GetExpenseSheetTicketDetailAsync(
            string token,
            string fileId,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "GetExpenseSheetTicketDetail",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendGetAsync(ApiRoutes.ExpenseSheetTicketByFileId(safeFileId));
            var response = BuildPagedResponse<ExpenseSheetTicketDetailDto>(result, "GetExpenseSheetTicketDetail");
            _logger.LogInformation(
                "GetExpenseSheetTicketDetail upstream result. Success: {Success}. TraceId: {TraceId}. FileId: {FileId}. Summary: {Summary}.",
                response.Success,
                response.TraceId ?? "<null>",
                fileId,
                BuildTicketCurrencySummary(response.GetAnyItems(), item => item.FileId, item => item.CurrencyCode));
            return response;
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetTicketAsync(
            string token,
            string fileId,
            ExpenseSheetTicketUpdateRequest req)
        {
            PrepareRequestHeaders(token, "UpdateExpenseSheetTicket", requireCompany: true);

            req ??= new ExpenseSheetTicketUpdateRequest();
            var payload = new ExpenseSheetTicketUpdateRequest
            {
                Description = NormalizeOptionalText(req.Description),
                CurrencyCode = NormalizeOptionalText(req.CurrencyCode)?.ToUpperInvariant(),
                TotalAmount = req.TotalAmount,
                Status = req.Status,
                TransDate = NormalizeOptionalText(req.TransDate),
                TicketDate = NormalizeOptionalText(req.TicketDate),
                TicketTime = NormalizeOptionalText(req.TicketTime),
                Comentario = NormalizeOptionalText(req.Comentario),
                UrlFile = NormalizeOptionalText(req.UrlFile),
                FileName = NormalizeOptionalText(req.FileName),
                ProcessedByAI = req.ProcessedByAI,
                FileExtension = NormalizeOptionalText(req.FileExtension),
                GastoType = NormalizeTicketGastoType(req.GastoType)
            };

            var safeFileId = EscapePathSegment(fileId);
            _logger.LogInformation(
                "UpdateExpenseSheetTicket request. FileId: {FileId}. CurrencyCode: {CurrencyCode}. TotalAmount: {TotalAmount}. TransDate: {TransDate}. GastoType: {GastoType}. ProcessedByAI: {ProcessedByAI}. SelectedCompany: {SelectedCompany}.",
                fileId,
                NormalizeCurrencyCodeForTrace(payload.CurrencyCode),
                payload.TotalAmount,
                payload.TransDate ?? "<empty>",
                payload.GastoType.HasValue ? payload.GastoType.Value.ToString(CultureInfo.InvariantCulture) : "null",
                payload.ProcessedByAI.HasValue ? payload.ProcessedByAI.Value.ToString(CultureInfo.InvariantCulture) : "null",
                GetSelectedCompanyId() ?? "<empty>");
            var result = await SendPutJsonAsync(ApiRoutes.ExpenseSheetTicketByFileId(safeFileId), payload);
            var response = BuildApiResponse<object>(result, "UpdateExpenseSheetTicket");
            _logger.LogInformation(
                "UpdateExpenseSheetTicket upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. FileId: {FileId}. CurrencyCode: {CurrencyCode}.",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                fileId,
                NormalizeCurrencyCodeForTrace(payload.CurrencyCode));
            return response;
        }

        public async Task<ApiResponse<object>> DeleteExpenseSheetTicketAsync(
            string token,
            string fileId,
            int? lineRecId = null)
        {
            PrepareRequestHeaders(token, "DeleteExpenseSheetTicket", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendDeleteAsync(ApiRoutes.ExpenseSheetTicketDelete(safeFileId, lineRecId));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetTicket");
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetTicketFromIAAsync(
            string token,
            string fileId,
            object req,
            string? axUserIdOverride = null)
        {
            PrepareRequestHeaders(
                token,
                "UpdateExpenseSheetTicketFromIA",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var safeFileId = EscapePathSegment(fileId);
            var payload = req ?? new { };
            var currencyCode = "<unavailable>";
            if (TryConvertToJsonElement(payload, out var root) && root.ValueKind == JsonValueKind.Object)
            {
                currencyCode = NormalizeCurrencyCodeForTrace(ReadStringLikeProperty(root, "currencyCode", "CurrencyCode", "currency", "divisa"));
            }

            _logger.LogInformation(
                "UpdateExpenseSheetTicketFromIA request. FileId: {FileId}. CurrencyCode: {CurrencyCode}. SelectedCompany: {SelectedCompany}. AxUserIdOverride: {AxUserIdOverride}.",
                fileId,
                currencyCode,
                GetSelectedCompanyId() ?? "<empty>",
                NormalizeOptionalText(axUserIdOverride) ?? "<session>");
            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheetTicketIa(safeFileId), payload);
            var response = BuildApiResponse<object>(result, "UpdateExpenseSheetTicketFromIA");
            _logger.LogInformation(
                "UpdateExpenseSheetTicketFromIA upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. FileId: {FileId}. CurrencyCode: {CurrencyCode}.",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                fileId,
                currencyCode);
            return response;
        }

        public async Task<ApiResponse<object>> CreateExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            ExpenseSheetTicketLineRequest req)
        {
            PrepareRequestHeaders(token, "CreateExpenseSheetTicketLine", requireCompany: true);

            req ??= new ExpenseSheetTicketLineRequest();
            var payload = new ExpenseSheetTicketLineRequest
            {
                Description = (req.Description ?? string.Empty).Trim(),
                Qty = req.Qty,
                Price = req.Price,
                TotalAmount = req.TotalAmount
            };

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendPostJsonAsync(ApiRoutes.ExpenseSheetTicketLines(safeFileId), payload);
            return BuildApiResponse<object>(result, "CreateExpenseSheetTicketLine");
        }

        public async Task<ApiResponse<object>> UpdateExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            string lineRecId,
            ExpenseSheetTicketLineRequest req)
        {
            PrepareRequestHeaders(token, "UpdateExpenseSheetTicketLine", requireCompany: true);

            req ??= new ExpenseSheetTicketLineRequest();
            var payload = new ExpenseSheetTicketLineRequest
            {
                Description = (req.Description ?? string.Empty).Trim(),
                Qty = req.Qty,
                Price = req.Price,
                TotalAmount = req.TotalAmount
            };

            var safeFileId = EscapePathSegment(fileId);
            var safeLineId = EscapePathSegment(lineRecId);
            var result = await SendPutJsonAsync(ApiRoutes.ExpenseSheetTicketLine(safeFileId, safeLineId), payload);
            return BuildApiResponse<object>(result, "UpdateExpenseSheetTicketLine");
        }

        public async Task<ApiResponse<object>> DeleteExpenseSheetTicketLineAsync(
            string token,
            string fileId,
            string lineRecId)
        {
            PrepareRequestHeaders(token, "DeleteExpenseSheetTicketLine", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var safeLineId = EscapePathSegment(lineRecId);
            var result = await SendDeleteAsync(ApiRoutes.ExpenseSheetTicketLine(safeFileId, safeLineId));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetTicketLine");
        }

        public async Task<ApiResponse<object>> UploadExpenseSheetTicketFileAsync(
            string token,
            string fileId,
            Stream fileStream,
            string fileName,
            string? contentType,
            string? extension = null,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(
                token,
                "UploadExpenseSheetTicketFile",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var safeFileId = EscapePathSegment(fileId);
            var safeFileName = string.IsNullOrWhiteSpace(fileName) ? "ticket.jpg" : Path.GetFileName(fileName);
            var normalizedExtension = NormalizeOptionalText(extension);
            var safeExtension = string.IsNullOrWhiteSpace(normalizedExtension)
                ? null
                : EscapeQueryValue(normalizedExtension.TrimStart('.').ToLowerInvariant());
            var mime = string.IsNullOrWhiteSpace(contentType) ? "application/octet-stream" : contentType.Trim();
            var canReportLength = fileStream.CanSeek;
            var streamLength = canReportLength ? fileStream.Length : -1;

            _logger.LogInformation(
                "UploadExpenseSheetTicketFile request. FileId: {FileId}. FileName: {FileName}. ContentType: {ContentType}. Extension: {Extension}. StreamLength: {StreamLength}",
                safeFileId,
                safeFileName,
                mime,
                normalizedExtension ?? "<empty>",
                streamLength);

            using var form = new MultipartFormDataContent();
            using var fileContent = new StreamContent(fileStream);
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(mime);
            form.Add(fileContent, "file", safeFileName);

            var result = await SendPostMultipartAsync(
                ApiRoutes.ExpenseSheetTicketFile(safeFileId, safeExtension),
                form,
                cancellationToken);

            var response = BuildApiResponse<object>(result, "UploadExpenseSheetTicketFile");
            _logger.LogInformation(
                "UploadExpenseSheetTicketFile upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. Raw: {Raw}",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                SafeLogPayload(result.Raw));

            return response;
        }

        public async Task<ApiResponse<object>> DeleteExpenseSheetTicketFileAsync(
            string token,
            string fileId)
        {
            PrepareRequestHeaders(token, "DeleteExpenseSheetTicketFile", requireCompany: true);

            var safeFileId = EscapePathSegment(fileId);
            var result = await SendDeleteAsync(ApiRoutes.ExpenseSheetTicketFile(safeFileId));
            return BuildApiResponse<object>(result, "DeleteExpenseSheetTicketFile");
        }

        // ======================================================
        // Projects
        // ======================================================
        public async Task<PagedApiResponse<ProjectDto>> GetProjectsAsync(
            string token,
            string? filter,
            int page,
            int pageSize)
        {
            PrepareRequestHeaders(token, "GetProjects", requireCompany: true);

            var safeFilter = EscapeQueryValue(filter);
            var result = await SendGetAsync(ApiRoutes.ProjectsList(safeFilter, page, pageSize));
            return BuildPagedResponse<ProjectDto>(result, "GetProjects");
        }

        // ======================================================
        // Speech
        // ======================================================
        public async Task<ApiResponse<string>> TranscribeSpeechAsync(
            string token,
            string languageId,
            Stream audioStream,
            string fileName,
            string? contentType,
            double? temperature = null,
            string? prompt = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(token, "TranscribeSpeech", requireCompany: true);

            var safeLanguageId = string.IsNullOrWhiteSpace(languageId) ? "auto" : languageId.Trim();
            var safeFileName = string.IsNullOrWhiteSpace(fileName) ? "audio.wav" : Path.GetFileName(fileName);

            using var form = new MultipartFormDataContent();
            form.Add(new StringContent(safeLanguageId), "languageId");

            if (temperature.HasValue)
            {
                var tempRaw = temperature.Value.ToString(System.Globalization.CultureInfo.InvariantCulture);
                form.Add(new StringContent(tempRaw), "temperature");
            }

            if (!string.IsNullOrWhiteSpace(prompt))
            {
                form.Add(new StringContent(prompt), "prompt");
            }

            using var fileContent = new StreamContent(audioStream);
            var mime = string.IsNullOrWhiteSpace(contentType) ? "audio/wav" : contentType.Trim();
            var isAllowedMime =
                mime.Equals("audio/wav", StringComparison.OrdinalIgnoreCase) ||
                mime.Equals("audio/x-wav", StringComparison.OrdinalIgnoreCase) ||
                mime.Equals("audio/wave", StringComparison.OrdinalIgnoreCase) ||
                mime.Equals("audio/vnd.wave", StringComparison.OrdinalIgnoreCase);
            if (!isAllowedMime)
            {
                mime = "audio/wav";
            }
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(mime);
            form.Add(fileContent, "audioFile", safeFileName);

            var result = await SendPostMultipartAsync(
                ApiRoutes.SpeechTranscribe,
                form,
                cancellationToken);

            var response = BuildApiResponse<string>(result, "SpeechTranscribe");
            if (string.IsNullOrWhiteSpace(response.Data))
            {
                var extracted = ApiPayloadParser.TryExtractSpeechText(result.Raw);
                if (!string.IsNullOrWhiteSpace(extracted))
                {
                    response.Data = extracted;
                }
            }

            if (string.IsNullOrWhiteSpace(response.Data))
            {
                _logger.LogWarning(
                    "Speech transcribe returned empty data. HttpSuccess: {HttpSuccess} StatusCode: {StatusCode} Success: {Success} ErrorCode: {ErrorCode} Message: {Message} RawLen: {RawLen}",
                    result.IsSuccessStatusCode,
                    (int)result.StatusCode,
                    response.Success,
                    response.ErrorCode,
                    response.Message,
                    result.Raw?.Length ?? 0);
            }

            return response;
        }

        // Creates expense data from a ticket image using OCR/AI endpoint.
        public async Task<ApiResponse<object>> ExpenseFromTicketAsync(
            string token,
            Stream ticketImageStream,
            string fileName,
            string? contentType,
            bool? persistTicket = null,
            string? ticketUrlFile = null,
            string? axUserIdOverride = null,
            CancellationToken cancellationToken = default)
        {
            PrepareRequestHeaders(
                token,
                "ExpenseFromTicket",
                requireCompany: true,
                includeCompanyHeader: true,
                includeAxUserHeader: true,
                axUserIdOverride: axUserIdOverride);

            var safeFileName = string.IsNullOrWhiteSpace(fileName) ? "ticket.jpg" : Path.GetFileName(fileName);
            var mime = string.IsNullOrWhiteSpace(contentType) ? "image/jpeg" : contentType.Trim();
            var safeTicketUrlFile = NormalizeOptionalText(ticketUrlFile);
            var canReportLength = ticketImageStream.CanSeek;
            var streamLength = canReportLength ? ticketImageStream.Length : -1;

            _logger.LogInformation(
                "ExpenseFromTicket request. FileName: {FileName}. ContentType: {ContentType}. PersistTicket: {PersistTicket}. TicketUrlFilePresent: {HasTicketUrlFile}. StreamLength: {StreamLength}",
                safeFileName,
                mime,
                persistTicket.HasValue ? persistTicket.Value.ToString() : "<null>",
                !string.IsNullOrWhiteSpace(safeTicketUrlFile),
                streamLength);

            using var form = new MultipartFormDataContent();
            using var fileContent = new StreamContent(ticketImageStream);
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(mime);
            form.Add(fileContent, "ticketImage", safeFileName);

            if (persistTicket.HasValue)
            {
                form.Add(new StringContent(persistTicket.Value ? "true" : "false"), "persistTicket");
            }

            if (!string.IsNullOrWhiteSpace(safeTicketUrlFile))
            {
                form.Add(new StringContent(safeTicketUrlFile), "ticketUrlFile");
            }

            var result = await SendPostMultipartAsync(
                ApiRoutes.ExpenseFromTicket,
                form,
                cancellationToken);

            var response = BuildApiResponse<object>(result, "ExpenseFromTicket");
            _logger.LogInformation(
                "ExpenseFromTicket upstream result. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. Success: {Success}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. Raw: {Raw}",
                result.IsSuccessStatusCode,
                (int)result.StatusCode,
                response.Success,
                response.ErrorCode ?? "<null>",
                response.TraceId ?? "<null>",
                SafeLogPayload(result.Raw));

            return response;
        }

        // Normalizes optional list filters before forwarding them to the AI ask endpoint.
        private static ExpenseSheetListApiRequest? NormalizeExpenseSheetsAskListRequest(ExpenseSheetListApiRequest? request)
        {
            if (request == null)
                return null;

            return new ExpenseSheetListApiRequest
            {
                Filter = NormalizeOptionalText(request.Filter),
                BilledMode = request.BilledMode is >= 0 and <= 2 ? request.BilledMode : null,
                CreatedDateFrom = NormalizeAxListDate(request.CreatedDateFrom),
                CreatedDateTo = NormalizeAxListDate(request.CreatedDateTo),
                ProjId = NormalizeOptionalText(request.ProjId),
                CurrencyCode = NormalizeOptionalText(request.CurrencyCode)?.ToUpperInvariant(),
                ExpenseSheetStatus = request.ExpenseSheetStatus is >= 0 and <= 4 ? request.ExpenseSheetStatus : null,
                IncludeSubordinates = request.IncludeSubordinates,
                Page = request.Page < 1 ? 1 : request.Page,
                PageSize = request.PageSize <= 0 ? 50 : request.PageSize
            };
        }

        // Clones a JsonElement so payload forwarding does not depend on the original request lifetime.
        private static JsonElement? CloneOptionalJsonElement(JsonElement? value)
        {
            if (!value.HasValue)
                return null;

            var element = value.Value;
            if (element.ValueKind == JsonValueKind.Null || element.ValueKind == JsonValueKind.Undefined)
                return null;

            using var document = JsonDocument.Parse(element.GetRawText());
            return document.RootElement.Clone();
        }

        // ======================================================
        // Helpers
        // ======================================================
        private static string Serialize(object payload) =>
            JsonSerializer.Serialize(payload);

        private ApiResponse<T> DeserializeApiResponse<T>(HttpResult result, string operation)
        {
            if (string.IsNullOrWhiteSpace(result.Raw))
            {
                LogHttpFailure(result, operation);
                return new ApiResponse<T>
                {
                    Success = result.IsSuccessStatusCode,
                    Message = result.ErrorMessage ?? $"Empty response for {operation}",
                    TraceId = TryGetTraceId(result.Headers)
                };
            }

            try
            {
                var parsed = JsonSerializer.Deserialize<ApiResponse<T>>(result.Raw, JsonOptions);
                if (parsed != null)
                {
                    parsed.TraceId ??= TryGetTraceId(result.Headers);
                    return parsed;
                }
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "JSON deserialization failed for {Operation}. Raw: {Raw}", operation, SafeLogPayload(result.Raw));
            }

            // Fallback: intenta extraer Data o deserializar directamente T
            try
            {
                using var doc = JsonDocument.Parse(result.Raw);
                var root = doc.RootElement;

                // If root has a Data property.
                if (root.TryGetProperty("Data", out var dataElement))
                {
                    var dataObj = dataElement.Deserialize<T>(JsonOptions);
                    return new ApiResponse<T>
                    {
                        Success = result.IsSuccessStatusCode,
                        Message = TryGetMessage(root),
                        Data = dataObj,
                        TraceId = TryGetTraceId(result.Headers)
                    };
                }

                // If there is no Data, try mapping root to T directly.
                var direct = root.Deserialize<T>(JsonOptions);
                return new ApiResponse<T>
                {
                    Success = result.IsSuccessStatusCode,
                    Message = TryGetMessage(root),
                    Data = direct,
                    TraceId = TryGetTraceId(result.Headers)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Fallback deserialization failed for {Operation}. Raw: {Raw}", operation, SafeLogPayload(result.Raw));
            }

            LogHttpFailure(result, operation);
            return new ApiResponse<T>
            {
                Success = result.IsSuccessStatusCode,
                Message = result.ErrorMessage ?? $"Failed to parse response for {operation}",
                TraceId = TryGetTraceId(result.Headers)
            };
        }

        private PagedApiResponse<T> DeserializePagedResponse<T>(HttpResult result, string operation)
        {
            if (string.IsNullOrWhiteSpace(result.Raw))
            {
                LogHttpFailure(result, operation);
                return new PagedApiResponse<T>
                {
                    Success = result.IsSuccessStatusCode,
                    Message = result.ErrorMessage ?? $"Empty response for {operation}",
                    TraceId = TryGetTraceId(result.Headers)
                };
            }

            LogPagedEnvelopeDiagnostics(result.Raw, operation, result.StatusCode, result.DurationMs, result.IsSuccessStatusCode);

            try
            {
                var parsed = JsonSerializer.Deserialize<PagedApiResponse<T>>(result.Raw, JsonOptions);
                if (parsed != null)
                {
                    parsed.TraceId ??= TryGetTraceId(result.Headers);
                    return parsed;
                }
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "JSON deserialization failed for {Operation}. Raw: {Raw}", operation, SafeLogPayload(result.Raw));
            }

            // Fallback: supports envelopes where Data is a single object and direct object/array payloads.
            try
            {
                using var doc = JsonDocument.Parse(result.Raw);
                var root = doc.RootElement;
                var fallbackItems = ExtractPagedItems<T>(root);
                var fallbackSuccess = TryReadBoolProperty(root, "Success", "success") ?? result.IsSuccessStatusCode;
                var fallbackMessage = TryGetMessage(root) ?? result.ErrorMessage;
                var fallbackTotal = TryReadIntProperty(root, "Total") ?? TryReadIntProperty(root, "total") ?? fallbackItems.Count;
                var fallbackPage = TryReadIntProperty(root, "Page") ?? TryReadIntProperty(root, "page") ?? 1;
                var fallbackPageSize = TryReadIntProperty(root, "PageSize") ?? TryReadIntProperty(root, "pageSize") ?? fallbackItems.Count;
                var fallbackTraceId = ReadStringLikeProperty(root, "TraceId", "traceId");
                _logger.LogWarning(
                    "Using paged fallback parser for {Operation}. ItemCount: {ItemCount}. Total: {Total}. Page: {Page}. PageSize: {PageSize}. StatusCode: {StatusCode}. TraceId: {TraceId}",
                    operation,
                    fallbackItems.Count,
                    fallbackTotal,
                    fallbackPage,
                    fallbackPageSize,
                    (int)result.StatusCode,
                    fallbackTraceId ?? TryGetTraceId(result.Headers) ?? "<null>");

                return new PagedApiResponse<T>
                {
                    Success = fallbackSuccess,
                    Message = fallbackMessage,
                    Items = fallbackItems,
                    Data = fallbackItems,
                    Total = Math.Max(0, fallbackTotal),
                    Page = fallbackPage > 0 ? fallbackPage : 1,
                    PageSize = Math.Max(0, fallbackPageSize),
                    TraceId = fallbackTraceId ?? TryGetTraceId(result.Headers)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Fallback paged deserialization failed for {Operation}. Raw: {Raw}", operation, SafeLogPayload(result.Raw));
            }

            LogHttpFailure(result, operation);
            return new PagedApiResponse<T>
            {
                Success = result.IsSuccessStatusCode,
                Message = result.ErrorMessage ?? $"Failed to parse response for {operation}",
                TraceId = TryGetTraceId(result.Headers)
            };
        }

        private void ThrowIfHttpFailed(HttpResult result, string operation)
        {
            if (result.IsSuccessStatusCode)
                return;

            var message = result.ErrorMessage ?? $"HTTP error in {operation}";
            _logger.LogError("API call failed: {Message}. Status: {Status}. Body: {Body}", message, result.StatusCode, SafeLogPayload(result.Raw));
            throw new ApiException(message, result.StatusCode, result.Raw, result.Headers);
        }

        private void LogHttpFailure(HttpResult result, string operation)
        {
            if (result.IsSuccessStatusCode)
                return;

            _logger.LogError(
                "API call failed: {Operation}. Status: {Status}. Message: {Error}. Body: {Body}",
                operation,
                result.StatusCode,
                result.ErrorMessage,
                SafeLogPayload(result.Raw)
            );
        }

        private static string? TryGetMessage(JsonElement root)
        {
            if (root.TryGetProperty("Message", out var msgProp) && msgProp.ValueKind == JsonValueKind.String)
            {
                return msgProp.GetString();
            }
            if (root.TryGetProperty("message", out var msgLower) && msgLower.ValueKind == JsonValueKind.String)
            {
                return msgLower.GetString();
            }
            return null;
        }

        // Logs the effective paged envelope shape when contracts degrade or upstream rejects the request.
        private void LogPagedEnvelopeDiagnostics(
            string raw,
            string operation,
            HttpStatusCode statusCode,
            long durationMs,
            bool isSuccessStatusCode)
        {
            if (string.IsNullOrWhiteSpace(raw))
            {
                return;
            }

            try
            {
                using var doc = JsonDocument.Parse(raw);
                var root = doc.RootElement;
                if (root.ValueKind != JsonValueKind.Object)
                {
                    if (!isSuccessStatusCode)
                    {
                        _logger.LogWarning(
                            "Paged response diagnostics unavailable for {Operation}. StatusCode: {StatusCode}. DurationMs: {DurationMs}. RootKind: {RootKind}. Raw: {Raw}",
                            operation,
                            (int)statusCode,
                            durationMs,
                            root.ValueKind,
                            SafeLogPayload(raw));
                    }
                    return;
                }

                var hasItems = JsonPropertyHelper.TryGetPropertyInsensitive(root, "Items", out var itemsElement);
                var hasData = JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out var dataElement);
                var hasTotal = JsonPropertyHelper.TryGetPropertyInsensitive(root, "Total", out var totalElement);
                var hasPage = JsonPropertyHelper.TryGetPropertyInsensitive(root, "Page", out var pageElement);
                var hasPageSize = JsonPropertyHelper.TryGetPropertyInsensitive(root, "PageSize", out var pageSizeElement);

                var totalNull = hasTotal && totalElement.ValueKind == JsonValueKind.Null;
                var pageNull = hasPage && pageElement.ValueKind == JsonValueKind.Null;
                var pageSizeNull = hasPageSize && pageSizeElement.ValueKind == JsonValueKind.Null;
                var shouldLog = !isSuccessStatusCode || totalNull || pageNull || pageSizeNull;

                if (!shouldLog)
                {
                    return;
                }

                var itemsKind = hasItems ? itemsElement.ValueKind.ToString() : "<missing>";
                var dataKind = hasData ? dataElement.ValueKind.ToString() : "<missing>";
                var itemsCount = hasItems && itemsElement.ValueKind == JsonValueKind.Array ? itemsElement.GetArrayLength() : -1;
                var dataCount = hasData && dataElement.ValueKind == JsonValueKind.Array ? dataElement.GetArrayLength() : -1;
                var looksNonPaged = hasData &&
                                    dataElement.ValueKind == JsonValueKind.Object &&
                                    (!hasItems || itemsElement.ValueKind == JsonValueKind.Null || itemsElement.ValueKind == JsonValueKind.Undefined);

                _logger.LogWarning(
                    "Paged response diagnostics for {Operation}. HttpSuccess: {HttpSuccess}. StatusCode: {StatusCode}. DurationMs: {DurationMs}. HasItems: {HasItems}. ItemsKind: {ItemsKind}. ItemsCount: {ItemsCount}. HasData: {HasData}. DataKind: {DataKind}. DataCount: {DataCount}. LooksNonPaged: {LooksNonPaged}. TotalPresent: {HasTotal}. TotalNull: {TotalNull}. PagePresent: {HasPage}. PageNull: {PageNull}. PageSizePresent: {HasPageSize}. PageSizeNull: {PageSizeNull}. ErrorCode: {ErrorCode}. TraceId: {TraceId}. Message: {Message}. Raw: {Raw}",
                    operation,
                    isSuccessStatusCode,
                    (int)statusCode,
                    durationMs,
                    hasItems,
                    itemsKind,
                    itemsCount,
                    hasData,
                    dataKind,
                    dataCount,
                    looksNonPaged,
                    hasTotal,
                    totalNull,
                    hasPage,
                    pageNull,
                    hasPageSize,
                    pageSizeNull,
                    ReadStringLikeProperty(root, "ErrorCode", "errorCode") ?? "<null>",
                    ReadStringLikeProperty(root, "TraceId", "traceId") ?? "<null>",
                    TryGetMessage(root) ?? "<null>",
                    SafeLogPayload(raw));
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "Could not inspect paged response diagnostics for {Operation}.", operation);
            }
        }

        // Reads bool values from bool, numeric or string JSON fields.
        private static bool? TryReadBoolProperty(JsonElement root, params string[] keys)
        {
            foreach (var key in keys)
            {
                if (!JsonPropertyHelper.TryGetPropertyInsensitive(root, key, out var element))
                    continue;

                if (element.ValueKind == JsonValueKind.True) return true;
                if (element.ValueKind == JsonValueKind.False) return false;

                if (element.ValueKind == JsonValueKind.Number && element.TryGetInt32(out var fromNumber))
                {
                    if (fromNumber == 1) return true;
                    if (fromNumber == 0) return false;
                }

                if (element.ValueKind == JsonValueKind.String)
                {
                    var normalized = element.GetString()?.Trim().ToLowerInvariant();
                    if (normalized == "true" || normalized == "1") return true;
                    if (normalized == "false" || normalized == "0") return false;
                }
            }

            return null;
        }

        // Extracts paged items from envelopes, nested Data, or direct JSON payloads.
        private List<T> ExtractPagedItems<T>(JsonElement root)
        {
            var items = new List<T>();

            if (root.ValueKind == JsonValueKind.Array)
            {
                AddPagedItemsFromArray(items, root);
                return items;
            }

            if (root.ValueKind != JsonValueKind.Object)
                return items;

            if (TryGetArrayProperty(root, "Items", out var itemsArray))
            {
                AddPagedItemsFromArray(items, itemsArray);
                return items;
            }

            if (JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out var dataElement))
            {
                if (dataElement.ValueKind == JsonValueKind.Array)
                {
                    AddPagedItemsFromArray(items, dataElement);
                    return items;
                }

                if (dataElement.ValueKind == JsonValueKind.Object)
                {
                    if (TryGetArrayProperty(dataElement, "Items", out var nestedItems))
                    {
                        AddPagedItemsFromArray(items, nestedItems);
                        return items;
                    }

                    if (TryDeserializeItem(dataElement, out T? singleFromData))
                    {
                        items.Add(singleFromData!);
                    }

                    return items;
                }
            }

            var looksLikeEnvelope =
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Success", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Message", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Total", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Page", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "PageSize", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Items", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "ErrorCode", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "Errors", out _) ||
                JsonPropertyHelper.TryGetPropertyInsensitive(root, "TraceId", out _);

            if (!looksLikeEnvelope && TryDeserializeItem(root, out T? singleFromRoot))
            {
                items.Add(singleFromRoot!);
            }

            return items;
        }

        // Adds parsed items from a JSON array while tolerating malformed elements.
        private void AddPagedItemsFromArray<T>(List<T> target, JsonElement arrayElement)
        {
            if (arrayElement.ValueKind != JsonValueKind.Array)
                return;

            foreach (var element in arrayElement.EnumerateArray())
            {
                if (!TryDeserializeItem(element, out T? item))
                    continue;

                target.Add(item!);
            }
        }

        // Safely deserializes one item from a JSON element.
        private static bool TryDeserializeItem<T>(JsonElement element, out T? item)
        {
            try
            {
                item = element.Deserialize<T>(JsonOptions);
                return item != null;
            }
            catch
            {
                item = default;
                return false;
            }
        }

        // Tries to parse currencies payloads from tolerant response shapes.
        private PagedApiResponse<ExpenseSheetCurrencyDto>? TryParseExpenseSheetCurrenciesFallback(HttpResult result)
        {
            if (string.IsNullOrWhiteSpace(result.Raw))
            {
                return null;
            }

            try
            {
                using var doc = JsonDocument.Parse(result.Raw);
                var root = doc.RootElement;
                var knownEnvelope = root.ValueKind == JsonValueKind.Array || LooksLikeCurrencyEnvelope(root);
                var items = ExtractCurrencyItems(root);
                if (!knownEnvelope && items.Count == 0)
                {
                    return null;
                }

                var success = root.ValueKind == JsonValueKind.Object
                    ? JsonPropertyHelper.TryGetBool(root, "Success") ?? result.IsSuccessStatusCode
                    : result.IsSuccessStatusCode;
                var message = root.ValueKind == JsonValueKind.Object
                    ? TryGetMessage(root) ?? string.Empty
                    : string.Empty;
                var total = root.ValueKind == JsonValueKind.Object
                    ? (TryReadIntProperty(root, "Total") ?? items.Count)
                    : items.Count;
                var page = root.ValueKind == JsonValueKind.Object
                    ? (TryReadIntProperty(root, "Page") ?? 1)
                    : 1;
                var pageSize = root.ValueKind == JsonValueKind.Object
                    ? (TryReadIntProperty(root, "PageSize") ?? items.Count)
                    : items.Count;
                var traceId = root.ValueKind == JsonValueKind.Object
                    ? JsonPropertyHelper.TryGetString(root, "TraceId") ?? TryGetTraceId(result.Headers)
                    : TryGetTraceId(result.Headers);

                return new PagedApiResponse<ExpenseSheetCurrencyDto>
                {
                    Success = success,
                    Message = message,
                    Data = items,
                    Items = items,
                    Total = total < 0 ? 0 : total,
                    Page = page < 1 ? 1 : page,
                    PageSize = pageSize < 0 ? 0 : pageSize,
                    TraceId = traceId
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Currency fallback parse failed. Raw: {Raw}", SafeLogPayload(result.Raw));
                return null;
            }
        }

        // Detects currencies response envelopes even when they contain no items.
        private static bool LooksLikeCurrencyEnvelope(JsonElement root)
        {
            if (root.ValueKind != JsonValueKind.Object)
            {
                return false;
            }

            return JsonPropertyHelper.TryGetPropertyInsensitive(root, "Items", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Success", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Message", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Total", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "Page", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "PageSize", out _) ||
                   JsonPropertyHelper.TryGetPropertyInsensitive(root, "TraceId", out _);
        }

        // Extracts currencies from either envelope objects or direct arrays.
        private List<ExpenseSheetCurrencyDto> ExtractCurrencyItems(JsonElement root)
        {
            var items = new List<ExpenseSheetCurrencyDto>();
            if (root.ValueKind == JsonValueKind.Array)
            {
                AddCurrencyElements(root, items);
                return items;
            }

            if (root.ValueKind != JsonValueKind.Object)
            {
                return items;
            }

            if (TryGetArrayProperty(root, "Items", out var itemsArray))
            {
                AddCurrencyElements(itemsArray, items);
                return items;
            }

            if (JsonPropertyHelper.TryGetPropertyInsensitive(root, "Data", out var dataElement))
            {
                if (dataElement.ValueKind == JsonValueKind.Array)
                {
                    AddCurrencyElements(dataElement, items);
                    return items;
                }

                if (dataElement.ValueKind == JsonValueKind.Object)
                {
                    if (TryGetArrayProperty(dataElement, "Items", out var nestedItems))
                    {
                        AddCurrencyElements(nestedItems, items);
                        return items;
                    }

                    var singleFromData = ParseCurrencyItem(dataElement);
                    if (singleFromData != null)
                    {
                        items.Add(singleFromData);
                        return items;
                    }
                }
            }

            var singleFromRoot = ParseCurrencyItem(root);
            if (singleFromRoot != null)
            {
                items.Add(singleFromRoot);
            }

            return items;
        }

        // Adds currency items from a JSON array while tolerating mixed element shapes.
        private void AddCurrencyElements(JsonElement arrayElement, List<ExpenseSheetCurrencyDto> target)
        {
            if (arrayElement.ValueKind != JsonValueKind.Array)
            {
                return;
            }

            foreach (var item in arrayElement.EnumerateArray())
            {
                var parsed = ParseCurrencyItem(item);
                if (parsed == null)
                {
                    continue;
                }

                target.Add(parsed);
            }
        }

        // Parses one currency entry from object or string values.
        private static ExpenseSheetCurrencyDto? ParseCurrencyItem(JsonElement element)
        {
            if (element.ValueKind == JsonValueKind.String)
            {
                var codeFromString = NormalizeOptionalText(element.GetString())?.ToUpperInvariant();
                if (string.IsNullOrWhiteSpace(codeFromString))
                {
                    return null;
                }

                return new ExpenseSheetCurrencyDto
                {
                    CurrencyCode = codeFromString,
                    CurrencyCodeISO = codeFromString
                };
            }

            if (element.ValueKind != JsonValueKind.Object)
            {
                return null;
            }

            var code = ReadStringLikeProperty(element, "CurrencyCode", "currencyCode", "Code", "code", "Currency", "currency");
            var iso = ReadStringLikeProperty(element, "CurrencyCodeISO", "currencyCodeISO", "currencyCodeIso", "IsoCode", "isoCode");
            var normalizedCode = NormalizeOptionalText(code)?.ToUpperInvariant();
            var normalizedIso = NormalizeOptionalText(iso)?.ToUpperInvariant();

            if (string.IsNullOrWhiteSpace(normalizedCode) && string.IsNullOrWhiteSpace(normalizedIso))
            {
                return null;
            }

            return new ExpenseSheetCurrencyDto
            {
                CurrencyCode = normalizedCode ?? normalizedIso ?? string.Empty,
                CurrencyCodeISO = normalizedIso ?? normalizedCode ?? string.Empty
            };
        }

        // Reads an array property using tolerant key matching.
        private static bool TryGetArrayProperty(JsonElement root, string propertyName, out JsonElement arrayElement)
        {
            if (JsonPropertyHelper.TryGetPropertyInsensitive(root, propertyName, out arrayElement) &&
                arrayElement.ValueKind == JsonValueKind.Array)
            {
                return true;
            }

            arrayElement = default;
            return false;
        }

        // Reads integer properties from number or numeric string values.
        private static int? TryReadIntProperty(JsonElement root, string propertyName)
        {
            if (!JsonPropertyHelper.TryGetPropertyInsensitive(root, propertyName, out var element))
            {
                return null;
            }

            if (element.ValueKind == JsonValueKind.Number && element.TryGetInt32(out var fromNumber))
            {
                return fromNumber;
            }

            if (element.ValueKind == JsonValueKind.String &&
                int.TryParse(element.GetString(), out var fromString))
            {
                return fromString;
            }

            return null;
        }

        // Reads a property value as text from string or primitive values.
        private static string? ReadStringLikeProperty(JsonElement root, params string[] keys)
        {
            foreach (var key in keys)
            {
                if (!JsonPropertyHelper.TryGetPropertyInsensitive(root, key, out var value))
                {
                    continue;
                }

                if (value.ValueKind == JsonValueKind.String)
                {
                    return value.GetString();
                }

                if (value.ValueKind == JsonValueKind.Number ||
                    value.ValueKind == JsonValueKind.True ||
                    value.ValueKind == JsonValueKind.False)
                {
                    return value.ToString();
                }
            }

            return null;
        }

        private void ApplyRefreshedToken(IDictionary<string, IEnumerable<string>> headers, DateTime? expires)
        {
            if (headers == null || headers.Count == 0)
                return;

            if (!headers.TryGetValue("X-Refreshed-Token", out var values))
                return;

            var newToken = values?.FirstOrDefault();
            if (string.IsNullOrWhiteSpace(newToken))
                return;

            ApplyTokenToSessionAndResponse(newToken, expires);
        }

        private void ApplyRefreshedTokenFromBody(LoginResult? login)
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Token))
                return;

            var expires = login.Expires != default ? login.Expires : (DateTime?)null;
            ApplyTokenToSessionAndResponse(login.Token, expires);
        }

        private void ApplyTokenToSessionAndResponse(string newToken, DateTime? expires)
        {
            _tokenSession.SetToken(newToken, expires);
            AddToken(newToken);
        }

        private void AddToken(
            string token,
            bool includeCompanyHeader = true,
            bool includeAxUserHeader = true,
            bool includeContextHeaders = true,
            string? axUserIdOverride = null)
        {
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            if (includeCompanyHeader)
            {
                ApplyCompanyHeader();
            }
            else
            {
                _client.DefaultRequestHeaders.Remove("X-IND-Company");
            }

            if (includeAxUserHeader)
            {
                ApplyAxUserHeader(axUserIdOverride);
            }
            else
            {
                _client.DefaultRequestHeaders.Remove("X-IND-AxUserId");
            }

            if (includeContextHeaders)
            {
                ApplyContextHeaders();
            }
            else
            {
                _client.DefaultRequestHeaders.Remove("X-IND-EntraOid");
                _client.DefaultRequestHeaders.Remove("X-IND-Context-Version");
                _client.DefaultRequestHeaders.Remove("X-IND-Permissions-Revision");
                _client.DefaultRequestHeaders.Remove("X-IND-Context-Token");
            }
        }

        private void ApplyCompanyHeader()
        {
            _client.DefaultRequestHeaders.Remove("X-IND-Company");

            var companyId = GetSelectedCompanyId();
            if (string.IsNullOrWhiteSpace(companyId))
                return;

            _client.DefaultRequestHeaders.Add("X-IND-Company", companyId);
        }

        private void ApplyAxUserHeader(string? axUserIdOverride = null)
        {
            _client.DefaultRequestHeaders.Remove("X-IND-AxUserId");

            var axUserId = NormalizeOptionalText(axUserIdOverride) ?? GetAxUserId();
            if (string.IsNullOrWhiteSpace(axUserId))
                return;

            _client.DefaultRequestHeaders.Add("X-IND-AxUserId", axUserId);
        }

        private void ApplyContextHeaders()
        {
            _client.DefaultRequestHeaders.Remove("X-IND-EntraOid");
            _client.DefaultRequestHeaders.Remove("X-IND-Context-Version");
            _client.DefaultRequestHeaders.Remove("X-IND-Permissions-Revision");
            _client.DefaultRequestHeaders.Remove("X-IND-Context-Token");

            var entraOid = GetEntraOid();
            if (!string.IsNullOrWhiteSpace(entraOid))
                _client.DefaultRequestHeaders.Add("X-IND-EntraOid", entraOid);

            var contextVersion = GetContextVersion();
            if (!string.IsNullOrWhiteSpace(contextVersion))
                _client.DefaultRequestHeaders.Add("X-IND-Context-Version", contextVersion);

            var permissionsRevision = GetPermissionsRevision();
            if (!string.IsNullOrWhiteSpace(permissionsRevision))
                _client.DefaultRequestHeaders.Add("X-IND-Permissions-Revision", permissionsRevision);

            var contextToken = GetContextToken();
            if (!string.IsNullOrWhiteSpace(contextToken))
                _client.DefaultRequestHeaders.Add("X-IND-Context-Token", contextToken);
        }

        // Reads the current company id from session, if present.
        private string? GetSelectedCompanyId()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var companyId = ctx.Session.GetString("INDCompanySelected");
            return string.IsNullOrWhiteSpace(companyId) ? null : companyId;
        }

        // Reads the AX user id from session, if present.
        private string? GetAxUserId()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var axUserId = ctx.Session.GetString("AxUser");
            return string.IsNullOrWhiteSpace(axUserId) ? null : axUserId;
        }

        // Reads the real Entra OID from session, if present.
        private string? GetEntraOid()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var entraOid = ctx.Session.GetString("ENTRAOID");
            return string.IsNullOrWhiteSpace(entraOid) ? null : entraOid;
        }

        // Reads the current signed context version from session, if present.
        private string? GetContextVersion()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var contextVersion = ctx.Session.GetString("INDContextVersion");
            return string.IsNullOrWhiteSpace(contextVersion) ? null : contextVersion;
        }

        // Reads the current signed context token from session, if present.
        private string? GetContextToken()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var contextToken = ctx.Session.GetString("INDContextToken");
            return string.IsNullOrWhiteSpace(contextToken) ? null : contextToken;
        }

        // Reads the stable permission revision from session, if present.
        private string? GetPermissionsRevision()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var permissionsRevision = ctx.Session.GetString("INDPermissionsRevision");
            return string.IsNullOrWhiteSpace(permissionsRevision) ? null : permissionsRevision;
        }

        // Logs whether the company header is present for a given operation.
        private void LogCompanyHeader(string operation, bool requireCompany)
        {
            var companyId = GetSelectedCompanyId();
            if (string.IsNullOrWhiteSpace(companyId))
            {
                if (requireCompany)
                {
                    _logger.LogWarning("X-IND-Company not set for {Operation}.", operation);
                }
                else
                {
                    _logger.LogInformation("X-IND-Company not set for {Operation}.", operation);
                }

                return;
            }

            _logger.LogInformation("X-IND-Company={CompanyId} for {Operation}.", companyId, operation);
        }

        private static string? TryGetTraceId(IDictionary<string, IEnumerable<string>> headers)
        {
            if (headers == null || headers.Count == 0)
                return null;

            if (headers.TryGetValue("TraceId", out var trace))
                return trace.FirstOrDefault();

            if (headers.TryGetValue("X-TraceId", out var xtrace))
                return xtrace.FirstOrDefault();

            if (headers.TryGetValue("Request-Id", out var req))
                return req.FirstOrDefault();

            return null;
        }

        // Reads one response header value without throwing on missing transport metadata.
        private static string? TryGetHeaderValue(IDictionary<string, IEnumerable<string>> headers, string headerName)
        {
            if (headers == null || headers.Count == 0 || string.IsNullOrWhiteSpace(headerName))
                return null;

            foreach (var entry in headers)
            {
                if (!string.Equals(entry.Key, headerName, StringComparison.OrdinalIgnoreCase))
                    continue;

                var value = entry.Value?.FirstOrDefault();
                return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
            }

            return null;
        }

        private LoginResult MapLoginResult(ApiResponse<LoginEnvelope> response)
        {
            var data = response.Data;
            var token = data?.Token
                        ?? data?.Jwt
                        ?? data?.AccessToken
                        ?? data?.BearerToken
                        ?? string.Empty;

            var expires = data?.Expires
                         ?? ParseDate(data?.Expiration)
                         ?? ParseExpiresInSeconds(data?.ExpiresInSeconds);

            return new LoginResult
            {
                Success = response.Success,
                Token = token,
                Message = response.Message ?? string.Empty,
                Expires = expires ?? default,
                ErrorCode = response.ErrorCode,
                Errors = response.Errors,
                TraceId = response.TraceId
            };
        }

        private static DateTime? ParseDate(string? dateString)
        {
            if (string.IsNullOrWhiteSpace(dateString))
                return null;

            if (DateTime.TryParse(dateString, null, System.Globalization.DateTimeStyles.RoundtripKind, out var dt))
                return dt;

            return null;
        }

        private static DateTime? ParseExpiresInSeconds(int? seconds)
        {
            if (!seconds.HasValue)
                return null;

            return DateTime.UtcNow.AddSeconds(seconds.Value);
        }

    }
}
