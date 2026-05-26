using System;
using System.Linq;
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

            var contextResult = await _authContext.EnsureContextAsync();
            if (!contextResult.Success || contextResult.Context == null)
            {
                _logger.LogWarning(
                    "Expense sheet email link context resolution failed. ErrorCode={ErrorCode}; Message={Message}",
                    contextResult.ErrorCode ?? string.Empty,
                    contextResult.Message ?? string.Empty);
                return RedirectWithMessage("ExpenseSheetLink_ResolveFailed", "Error_Title", warning: false);
            }

            var targetCompany = FindCompany(contextResult.Context, safeTargetCompanyId);
            if (targetCompany == null)
                return RedirectWithMessage("ExpenseSheetLink_CompanyAccessDenied", "Auth_PermissionDenied_Title", warning: false);

            if (!HasExpenseSheetViewAccess(targetCompany))
                return RedirectWithMessage("ExpenseSheetLink_SheetAccessDenied", "Auth_PermissionDenied_Title", warning: false);

            var selectedCompanyId = _authContext.GetSelectedCompanyId(contextResult.Context);
            var companyChanged = !string.Equals(selectedCompanyId, targetCompany.CompanyId, StringComparison.OrdinalIgnoreCase);
            if (companyChanged)
            {
                var refreshResult = await SwitchCompanyAsync(targetCompany.CompanyId);
                if (!refreshResult.Success || refreshResult.Context == null)
                    return RedirectWithMessage("ExpenseSheetLink_CompanySwitchFailed", "Error_Title", warning: false);

                targetCompany = FindCompany(refreshResult.Context, targetCompany.CompanyId);
                if (targetCompany == null)
                    return RedirectWithMessage("ExpenseSheetLink_CompanyAccessDenied", "Auth_PermissionDenied_Title", warning: false);

                if (!HasExpenseSheetViewAccess(targetCompany))
                    return RedirectWithMessage("ExpenseSheetLink_SheetAccessDenied", "Auth_PermissionDenied_Title", warning: false);
            }

            var token = _tokenSession.GetToken().Token;
            if (string.IsNullOrWhiteSpace(token))
                return RedirectWithMessage("ExpenseSheetLink_ResolveFailed", "Error_Title", warning: false);

            try
            {
                var detailResult = await _apiClient.GetExpenseSheetDetailAsync(token, safeSheetId);
                var sheet = SelectSheet(detailResult.GetAnyItems(), safeSheetId);
                if (sheet == null)
                {
                    var messageKey = IsNotFound(detailResult)
                        ? "ExpenseSheetLink_SheetNotFound"
                        : "ExpenseSheetLink_SheetAccessDenied";

                    _logger.LogWarning(
                        "Expense sheet email link validation failed. HojaGastosId={HojaGastosId}; TargetCompanyId={TargetCompanyId}; Success={Success}; ErrorCode={ErrorCode}; TraceId={TraceId}",
                        safeSheetId,
                        targetCompany.CompanyId,
                        detailResult.Success,
                        detailResult.ErrorCode ?? string.Empty,
                        detailResult.TraceId ?? string.Empty);

                    return RedirectWithMessage(messageKey, "Auth_PermissionDenied_Title", warning: false);
                }

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
