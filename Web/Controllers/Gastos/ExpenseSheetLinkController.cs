using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using IND_CRM_APP.Extensions;
using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Infrastructure.Security.Auth;
using IND_CRM_APP.Infrastructure.Security.Modules;
using IND_CRM_APP.Infrastructure.Security.Permissions;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Controllers
{
    // Resolves expense sheet email deep links without mutating expense sheet state.
    [Route("Gastos/ExpenseSheetLink")]
    public class ExpenseSheetLinkController : Controller
    {
        private const string CompanyKey = "INDCompanySelected";
        private const string CompanySelectionSourceKey = "INDCompanySelectionSource";
        private const string CompanySelectionSourceUser = "user";
        private const string RedirectModalTitleKey = "IndRedirectModalTitle";
        private const string RedirectModalMessageKey = "IndRedirectModalMessage";
        public const string ActingUserTempDataKey = "ExpenseSheetLinkActingUserId";

        private readonly ICrmApiClient _apiClient;
        private readonly ITokenSessionService _tokenSession;
        private readonly IIndAuthContextService _authContext;
        private readonly IStringLocalizer<INDSharedResource> _sr;
        private readonly ILogger<ExpenseSheetLinkController> _logger;

        // Creates the resolver with auth context and upstream API dependencies.
        public ExpenseSheetLinkController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            IIndAuthContextService authContext,
            IStringLocalizer<INDSharedResource> sr,
            ILogger<ExpenseSheetLinkController> logger)
        {
            _apiClient = apiClient;
            _tokenSession = tokenSession;
            _authContext = authContext;
            _sr = sr;
            _logger = logger;
        }

        // Validates the email link, switches company when needed, and redirects to detail.
        [HttpGet("")]
        public async Task<IActionResult> Index(string? hojaGastosId, string? targetCompanyId, string? source = null)
        {
            var safeSheetId = NormalizeOptionalText(hojaGastosId);
            var safeTargetCompanyId = NormalizeOptionalText(targetCompanyId);
            var safeSource = NormalizeSource(source);

            _logger.LogInformation(
                "Expense sheet email link requested. HojaGastosId={HojaGastosId}; TargetCompanyId={TargetCompanyId}; Source={Source}",
                safeSheetId ?? string.Empty,
                safeTargetCompanyId ?? string.Empty,
                safeSource);

            if (string.IsNullOrWhiteSpace(safeSheetId) || string.IsNullOrWhiteSpace(safeTargetCompanyId))
                return RedirectWithMessage("ExpenseSheetLink_InvalidLink", "Error_Title", warning: true);

            if (User?.Identity?.IsAuthenticated != true)
            {
                return RedirectToAction(
                    "Login",
                    "Auth",
                    new { returnUrl = LocalReturnUrlHelper.BuildCurrentLocalUrl(Request) });
            }

            var contextResult = await _authContext.EnsureContextAsync(forceRefresh: true);
            if (!contextResult.Success || contextResult.Context == null)
            {
                _logger.LogWarning(
                    "Expense sheet email link context resolution failed. ErrorCode={ErrorCode}; Message={Message}",
                    contextResult.ErrorCode ?? string.Empty,
                    contextResult.Message ?? string.Empty);
                return RedirectWithMessage("ExpenseSheetLink_ResolveFailed", "Error_Title", warning: false);
            }

            var activeContext = contextResult.Context;
            var selectedCompanyId = _authContext.GetSelectedCompanyId(activeContext);
            _logger.LogInformation(
                "Expense sheet email link context force refreshed. HojaGastosId={HojaGastosId}; TargetCompanyId={TargetCompanyId}; SelectedCompany={SelectedCompany}; DefaultCompany={DefaultCompany}; SessionAxUserId={SessionAxUserId}; ContextAxUserId={ContextAxUserId}; CompanyCount={CompanyCount}; AvailableCompanies={AvailableCompanies}",
                safeSheetId,
                safeTargetCompanyId,
                selectedCompanyId ?? string.Empty,
                NormalizeOptionalText(activeContext.Header.DefaultCompany) ?? string.Empty,
                GetSessionAxUserId() ?? string.Empty,
                NormalizeOptionalText(activeContext.Header.AxUserId) ?? string.Empty,
                activeContext.Companies.Count,
                BuildCompanySample(activeContext.Companies));

            var targetCompany = FindCompany(contextResult.Context, safeTargetCompanyId);
            if (targetCompany == null)
            {
                _logger.LogWarning(
                    "Expense sheet email link company validation denied. HojaGastosId={HojaGastosId}; TargetCompanyId={TargetCompanyId}; SelectedCompany={SelectedCompany}; SessionAxUserId={SessionAxUserId}; ContextAxUserId={ContextAxUserId}; AvailableCompanies={AvailableCompanies}",
                    safeSheetId,
                    safeTargetCompanyId,
                    selectedCompanyId ?? string.Empty,
                    GetSessionAxUserId() ?? string.Empty,
                    NormalizeOptionalText(activeContext.Header.AxUserId) ?? string.Empty,
                    BuildCompanySample(activeContext.Companies));
                return RedirectCompanyAccessDenied(safeTargetCompanyId);
            }

            if (!HasExpenseSheetViewAccess(targetCompany))
            {
                _logger.LogWarning(
                    "Expense sheet email link module validation denied. HojaGastosId={HojaGastosId}; TargetCompanyId={TargetCompanyId}; SelectedCompany={SelectedCompany}; SessionAxUserId={SessionAxUserId}; ContextAxUserId={ContextAxUserId}; TargetCrmUserId={TargetCrmUserId}; ModuleSummary={ModuleSummary}",
                    safeSheetId,
                    targetCompany.CompanyId,
                    selectedCompanyId ?? string.Empty,
                    GetSessionAxUserId() ?? string.Empty,
                    NormalizeOptionalText(activeContext.Header.AxUserId) ?? string.Empty,
                    NormalizeOptionalText(targetCompany.CrmUserId) ?? string.Empty,
                    BuildExpenseModuleSummary(targetCompany));
                return RedirectWithMessage("ExpenseSheetLink_SheetAccessDenied", "Auth_PermissionDenied_Title", warning: false);
            }

            var companyChanged = !string.Equals(selectedCompanyId, targetCompany.CompanyId, StringComparison.OrdinalIgnoreCase);
            if (companyChanged)
            {
                var refreshResult = await SwitchCompanyAsync(targetCompany.CompanyId);
                if (!refreshResult.Success || refreshResult.Context == null)
                    return RedirectWithMessage("ExpenseSheetLink_CompanySwitchFailed", "Error_Title", warning: false);

                targetCompany = FindCompany(refreshResult.Context, targetCompany.CompanyId);
                if (targetCompany == null)
                    return RedirectCompanyAccessDenied(safeTargetCompanyId);

                if (!HasExpenseSheetViewAccess(targetCompany))
                    return RedirectWithMessage("ExpenseSheetLink_SheetAccessDenied", "Auth_PermissionDenied_Title", warning: false);

                activeContext = refreshResult.Context;
                selectedCompanyId = _authContext.GetSelectedCompanyId(activeContext);
            }

            var token = _tokenSession.GetToken().Token;
            if (string.IsNullOrWhiteSpace(token))
                return RedirectWithMessage("ExpenseSheetLink_ResolveFailed", "Error_Title", warning: false);

            try
            {
                _logger.LogInformation(
                    "Expense sheet email link detail validation started. HojaGastosId={HojaGastosId}; TargetCompanyId={TargetCompanyId}; SelectedCompany={SelectedCompany}; SessionAxUserId={SessionAxUserId}; ContextAxUserId={ContextAxUserId}; TargetCrmUserId={TargetCrmUserId}; CompanyChanged={CompanyChanged}; ModuleSummary={ModuleSummary}",
                    safeSheetId,
                    targetCompany.CompanyId,
                    selectedCompanyId ?? string.Empty,
                    GetSessionAxUserId() ?? string.Empty,
                    NormalizeOptionalText(activeContext.Header.AxUserId) ?? string.Empty,
                    NormalizeOptionalText(targetCompany.CrmUserId) ?? string.Empty,
                    companyChanged,
                    BuildExpenseModuleSummary(targetCompany));

                var accessResult = await ResolveExpenseSheetLinkAccessAsync(token, safeSheetId);
                var detailResult = accessResult.DetailResult;
                var detailItems = accessResult.DetailItems;
                var sheet = accessResult.Sheet;
                if (sheet == null)
                {
                    var messageKey = IsNotFound(detailResult)
                        ? "ExpenseSheetLink_SheetNotFound"
                        : "ExpenseSheetLink_SheetAccessDenied";

                    _logger.LogWarning(
                        "Expense sheet email link detail validation denied. HojaGastosId={HojaGastosId}; TargetCompanyId={TargetCompanyId}; SelectedCompany={SelectedCompany}; SessionAxUserId={SessionAxUserId}; ContextAxUserId={ContextAxUserId}; TargetCrmUserId={TargetCrmUserId}; UpstreamSuccess={Success}; UpstreamErrorCode={ErrorCode}; UpstreamTraceId={TraceId}; UpstreamItemCount={UpstreamItemCount}; UpstreamMessage={UpstreamMessage}; ProbedSubordinates={ProbedSubordinates}; MessageKey={MessageKey}",
                        safeSheetId,
                        targetCompany.CompanyId,
                        selectedCompanyId ?? string.Empty,
                        GetSessionAxUserId() ?? string.Empty,
                        NormalizeOptionalText(activeContext.Header.AxUserId) ?? string.Empty,
                        NormalizeOptionalText(targetCompany.CrmUserId) ?? string.Empty,
                        detailResult.Success,
                        detailResult.ErrorCode ?? string.Empty,
                        detailResult.TraceId ?? string.Empty,
                        detailItems.Count,
                        detailResult.Message ?? string.Empty,
                        accessResult.ProbedSubordinateCount,
                        messageKey);

                    return RedirectWithMessage(messageKey, "Auth_PermissionDenied_Title", warning: false);
                }

                var resolvedActingUserId = accessResult.ActingAxUserId ?? GetSessionAxUserId();
                if (!string.IsNullOrWhiteSpace(resolvedActingUserId))
                    TempData[ActingUserTempDataKey] = resolvedActingUserId;

                _logger.LogInformation(
                    "Expense sheet email link detail validation allowed. HojaGastosId={HojaGastosId}; TargetCompanyId={TargetCompanyId}; SelectedCompany={SelectedCompany}; SessionAxUserId={SessionAxUserId}; ContextAxUserId={ContextAxUserId}; ActingAxUserId={ActingAxUserId}; UsedSubordinateScope={UsedSubordinateScope}; ReturnedHojaGastosId={ReturnedHojaGastosId}; LineCount={LineCount}; UpstreamTraceId={TraceId}",
                    safeSheetId,
                    targetCompany.CompanyId,
                    selectedCompanyId ?? string.Empty,
                    GetSessionAxUserId() ?? string.Empty,
                    NormalizeOptionalText(activeContext.Header.AxUserId) ?? string.Empty,
                    resolvedActingUserId ?? string.Empty,
                    accessResult.UsedSubordinateScope,
                    NormalizeOptionalText(sheet.HojaGastosId) ?? string.Empty,
                    sheet.Lines?.Count ?? 0,
                    detailResult.TraceId ?? string.Empty);

                if (companyChanged)
                {
                    SetRedirectMessage("ExpenseSheetLink_CompanySwitched", "ExpenseSheets_Title");
                    TempData.INDSetActionMarkWarning(2000);
                }

                return Redirect($"/Gastos/ExpenseSheetDetail?hojaGastosId={Uri.EscapeDataString(safeSheetId)}");
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error while resolving expense sheet email link.");
                return RedirectWithMessage("ExpenseSheetLink_ResolveFailed", "Error_Title", warning: false);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error while resolving expense sheet email link.");
                return RedirectWithMessage("ExpenseSheetLink_ResolveFailed", "Error_Title", warning: false);
            }
        }

        // Keeps the detail validation result together with the AX user scope that produced it.
        private sealed class ExpenseSheetLinkAccessResult
        {
            public ExpenseSheetLinkAccessResult(
                PagedApiResponse<ExpenseSheetDetailDto> detailResult,
                IReadOnlyList<ExpenseSheetDetailDto> detailItems,
                ExpenseSheetDetailDto? sheet,
                string? actingAxUserId,
                bool usedSubordinateScope,
                int probedSubordinateCount)
            {
                DetailResult = detailResult;
                DetailItems = detailItems;
                Sheet = sheet;
                ActingAxUserId = NormalizeOptionalText(actingAxUserId);
                UsedSubordinateScope = usedSubordinateScope;
                ProbedSubordinateCount = probedSubordinateCount;
            }

            public PagedApiResponse<ExpenseSheetDetailDto> DetailResult { get; }
            public IReadOnlyList<ExpenseSheetDetailDto> DetailItems { get; }
            public ExpenseSheetDetailDto? Sheet { get; }
            public string? ActingAxUserId { get; }
            public bool UsedSubordinateScope { get; }
            public int ProbedSubordinateCount { get; }
        }

        // Resolves a sheet first as the signed-in user, then within the user's subordinate scope.
        private async Task<ExpenseSheetLinkAccessResult> ResolveExpenseSheetLinkAccessAsync(string token, string hojaGastosId)
        {
            var directResult = await _apiClient.GetExpenseSheetDetailAsync(token, hojaGastosId);
            var directItems = directResult.GetAnyItems().ToList();
            var directSheet = SelectSheet(directItems, hojaGastosId);
            if (directSheet != null)
            {
                return new ExpenseSheetLinkAccessResult(
                    directResult,
                    directItems,
                    directSheet,
                    actingAxUserId: null,
                    usedSubordinateScope: false,
                    probedSubordinateCount: 0);
            }

            var sessionAxUserId = GetSessionAxUserId();
            if (string.IsNullOrWhiteSpace(sessionAxUserId))
                return new ExpenseSheetLinkAccessResult(directResult, directItems, null, null, false, 0);

            var subordinatesResult = await _apiClient.GetExpenseSheetSubordinatesAsync(token, sessionAxUserId);
            var candidateAxUserIds = subordinatesResult.GetAnyItems()
                .Select(ReadSubordinateAxUserIdForHeader)
                .Where(candidate => !string.IsNullOrWhiteSpace(candidate))
                .Cast<string>()
                .Where(candidate => !string.Equals(candidate, sessionAxUserId, StringComparison.OrdinalIgnoreCase))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToList();

            _logger.LogInformation(
                "Expense sheet email link subordinate detail probe started. HojaGastosId={HojaGastosId}; CandidateCount={CandidateCount}; SubordinatesSuccess={SubordinatesSuccess}; SubordinatesTraceId={SubordinatesTraceId}",
                hojaGastosId,
                candidateAxUserIds.Count,
                subordinatesResult.Success,
                subordinatesResult.TraceId ?? string.Empty);

            foreach (var candidateAxUserId in candidateAxUserIds)
            {
                var scopedResult = await _apiClient.GetExpenseSheetDetailAsync(token, hojaGastosId, candidateAxUserId);
                var scopedItems = scopedResult.GetAnyItems().ToList();
                var scopedSheet = SelectSheet(scopedItems, hojaGastosId);
                if (scopedSheet == null)
                    continue;

                return new ExpenseSheetLinkAccessResult(
                    scopedResult,
                    scopedItems,
                    scopedSheet,
                    candidateAxUserId,
                    usedSubordinateScope: true,
                    probedSubordinateCount: candidateAxUserIds.Count);
            }

            return new ExpenseSheetLinkAccessResult(
                directResult,
                directItems,
                null,
                actingAxUserId: null,
                usedSubordinateScope: false,
                probedSubordinateCount: candidateAxUserIds.Count);
        }

        // Switches the selected company using the same session keys as the sidebar flow.
        private async Task<IndAuthContextResult> SwitchCompanyAsync(string companyId)
        {
            HttpContext.Session.SetString(CompanyKey, companyId);
            HttpContext.Session.SetString(CompanySelectionSourceKey, CompanySelectionSourceUser);
            _authContext.ClearContextCache(preserveCompanySelection: true);

            var refreshResult = await _authContext.EnsureContextAsync(forceRefresh: true);
            _logger.LogInformation(
                "Expense sheet email link company switch completed. CompanyId={CompanyId}; Success={Success}; Message={Message}",
                companyId,
                refreshResult.Success,
                refreshResult.Message ?? string.Empty);

            return refreshResult;
        }

        // Redirects safely after storing a localized modal message.
        private IActionResult RedirectWithMessage(string messageKey, string titleKey, bool warning)
        {
            SetRedirectMessage(messageKey, titleKey);
            if (warning)
                TempData.INDSetActionMarkWarning(2000);
            else
                TempData.INDSetActionMarkError(2000);

            return RedirectToAction("Index", "Home");
        }

        // Redirects with a specific hint when Axapta does not authorize the target company.
        private IActionResult RedirectCompanyAccessDenied(string companyId)
        {
            TempData[RedirectModalTitleKey] = _sr["Auth_PermissionDenied_Title"].Value;
            TempData[RedirectModalMessageKey] = _sr["ExpenseSheetLink_CompanyAccessDeniedDetail", companyId].Value;
            TempData.INDSetActionMarkError(2000);

            return RedirectToAction("Index", "Home");
        }

        // Stores a localized one-shot message for the shared layout modal.
        private void SetRedirectMessage(string messageKey, string titleKey)
        {
            TempData[RedirectModalTitleKey] = _sr[titleKey].Value;
            TempData[RedirectModalMessageKey] = _sr[messageKey].Value;
        }

        // Finds a company by id using the current authenticated context.
        private static IndWebCompany? FindCompany(IndWebContext context, string companyId)
        {
            return context.Companies.FirstOrDefault(company =>
                string.Equals(company.CompanyId, companyId, StringComparison.OrdinalIgnoreCase));
        }

        // Checks the same Gastos module view permission used by the detail page.
        private static bool HasExpenseSheetViewAccess(IndWebCompany company)
        {
            return company.Modules.Any(module =>
                module.AccessRightsInt >= IndAccessRights.View &&
                INDModuleRegistry.MatchesModuleCode(module.ModuleCode, INDModuleRegistry.ModuleGastosHojaGasto));
        }

        // Builds a compact company list for access diagnostics.
        private static string BuildCompanySample(IEnumerable<IndWebCompany> companies)
        {
            var sample = companies
                .Take(20)
                .Select(company => $"{NormalizeOptionalText(company.CompanyId) ?? "<empty>"}:{NormalizeOptionalText(company.CrmUserId) ?? "<empty>"}")
                .ToList();

            return sample.Count == 0 ? "<none>" : string.Join("|", sample);
        }

        // Builds a compact module summary so permission denials show the evaluated rights.
        private static string BuildExpenseModuleSummary(IndWebCompany company)
        {
            var matches = company.Modules
                .Where(module => INDModuleRegistry.MatchesModuleCode(module.ModuleCode, INDModuleRegistry.ModuleGastosHojaGasto))
                .Select(module => $"{NormalizeOptionalText(module.ModuleCode) ?? "<empty>"}:active={module.IsActive}:access={module.AccessRightsInt}")
                .ToList();

            if (matches.Count > 0)
                return string.Join("|", matches);

            var sample = company.Modules
                .Take(10)
                .Select(module => $"{NormalizeOptionalText(module.ModuleCode) ?? "<empty>"}:active={module.IsActive}:access={module.AccessRightsInt}")
                .ToList();

            return sample.Count == 0 ? "<none>" : string.Join("|", sample);
        }

        // Reads the AX user stored in the current web session for log correlation.
        private string? GetSessionAxUserId()
        {
            return NormalizeOptionalText(HttpContext.Session.GetString("AxUser"));
        }

        // Reads the AX user identifier to forward as the acting-user header.
        private static string? ReadSubordinateAxUserIdForHeader(ExpenseSheetSubordinateDto item)
        {
            return NormalizeOptionalText(item.AxUserId)
                   ?? NormalizeOptionalText(GetExtraString(item.Extra, "axUserId", "AxUserId"))
                   ?? NormalizeOptionalText(item.UserId)
                   ?? NormalizeOptionalText(item.CrmUserId)
                   ?? NormalizeOptionalText(GetExtraString(item.Extra, "userId", "UserId", "crmUserId", "CrmUserId"));
        }

        // Reads one string value from extension data with tolerant JSON conversion.
        private static string GetExtraString(Dictionary<string, JsonElement>? extra, params string[] keys)
        {
            if (extra == null || keys == null || keys.Length == 0)
                return string.Empty;

            foreach (var key in keys)
            {
                if (string.IsNullOrWhiteSpace(key))
                    continue;

                var match = extra.FirstOrDefault(entry =>
                    string.Equals(entry.Key, key, StringComparison.OrdinalIgnoreCase));
                if (string.IsNullOrWhiteSpace(match.Key))
                    continue;

                var value = JsonElementToString(match.Value);
                if (!string.IsNullOrWhiteSpace(value))
                    return value;
            }

            return string.Empty;
        }

        // Converts primitive JSON values to compact diagnostic and identifier text.
        private static string JsonElementToString(JsonElement element)
        {
            return element.ValueKind switch
            {
                JsonValueKind.String => element.GetString() ?? string.Empty,
                JsonValueKind.Number => element.GetRawText(),
                JsonValueKind.True => "true",
                JsonValueKind.False => "false",
                _ => string.Empty
            };
        }

        // Selects the requested sheet from the upstream detail response.
        private static ExpenseSheetDetailDto? SelectSheet(IEnumerable<ExpenseSheetDetailDto> items, string hojaGastosId)
        {
            var list = items.ToList();
            if (list.Count == 0)
                return null;

            var match = list.FirstOrDefault(sheet =>
                string.Equals((sheet.HojaGastosId ?? string.Empty).Trim(), hojaGastosId, StringComparison.OrdinalIgnoreCase));
            if (match != null)
                return match;

            return list.Count == 1 && string.IsNullOrWhiteSpace(list[0].HojaGastosId)
                ? list[0]
                : null;
        }

        // Treats known upstream not-found codes as a not-found validation result.
        private static bool IsNotFound(PagedApiResponse<ExpenseSheetDetailDto> result)
        {
            var errorCode = (result.ErrorCode ?? string.Empty).Trim();
            return string.Equals(errorCode, "CRM_EXPENSESHEET_NOT_FOUND", StringComparison.OrdinalIgnoreCase) ||
                   errorCode.Contains("NOT_FOUND", StringComparison.OrdinalIgnoreCase);
        }

        // Normalizes optional query text before logging or API use.
        private static string? NormalizeOptionalText(string? value)
        {
            var trimmed = (value ?? string.Empty).Trim();
            return string.IsNullOrWhiteSpace(trimmed) ? null : trimmed;
        }

        // Limits trace metadata from the optional source query parameter.
        private static string NormalizeSource(string? value)
        {
            var normalized = NormalizeOptionalText(value) ?? string.Empty;
            return normalized.Length <= 64 ? normalized : normalized[..64];
        }
    }
}
