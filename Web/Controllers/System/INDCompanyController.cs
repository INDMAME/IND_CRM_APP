using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Controllers
{
    // Handles company selection from the sidebar menu.
    public class INDCompanyController : Controller
    {
        private readonly IIndAuthContextService _authContext;
        private readonly ILogger<INDCompanyController> _logger;

        public INDCompanyController(
            IIndAuthContextService authContext,
            ILogger<INDCompanyController> logger)
        {
            _authContext = authContext;
            _logger = logger;
        }

        // Stores the selected company in session and redirects back.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SetCompany(string? companyId, string? returnUrl)
        {
            var current = HttpContext.Session.GetString("INDCompanySelected");
            var currentSelectionSource = HttpContext.Session.GetString("INDCompanySelectionSource");
            var currentAxUser = HttpContext.Session.GetString("AxUser");
            var trimmed = companyId?.Trim();
            var cachedContext = _authContext.GetCachedContext();
            var changed = !string.IsNullOrWhiteSpace(trimmed) &&
                          !string.Equals(current, trimmed, StringComparison.OrdinalIgnoreCase);
            _logger.LogInformation(
                "SetCompany request trace. RequestedCompany={RequestedCompany}; CurrentCompany={CurrentCompany}; SelectionSource={SelectionSource}; SessionAxUser={SessionAxUser}; CachedContextAxUser={CachedContextAxUser}; CachedResolvedCompany={CachedResolvedCompany}; CachedDefaultCompany={CachedDefaultCompany}; CachedCompanyCount={CachedCompanyCount}; Changed={Changed}; ReturnUrl={ReturnUrl}",
                NormalizeLogValue(trimmed),
                NormalizeLogValue(current),
                NormalizeLogValue(currentSelectionSource),
                NormalizeLogValue(currentAxUser),
                NormalizeLogValue(cachedContext?.Header?.AxUserId),
                NormalizeLogValue(_authContext.GetSelectedCompanyId(cachedContext)),
                NormalizeLogValue(cachedContext?.Header?.DefaultCompany),
                cachedContext?.Companies?.Count ?? 0,
                changed,
                NormalizeLogValue(returnUrl));

            if (!string.IsNullOrWhiteSpace(trimmed))
            {
                HttpContext.Session.SetString("INDCompanySelected", trimmed);
                HttpContext.Session.SetString("INDCompanySelectionSource", "user");
                _authContext.RememberSelectedCompanyPreference(trimmed);
            }

            if (changed)
            {
                _authContext.ClearContextCache(preserveCompanySelection: true);
                var refreshedContext = await _authContext.EnsureContextAsync();
                _logger.LogInformation(
                    "SetCompany refresh trace. RequestedCompany={RequestedCompany}; Success={Success}; Message={Message}; SessionCompany={SessionCompany}; SessionAxUser={SessionAxUser}; ContextAxUser={ContextAxUser}; ResolvedCompany={ResolvedCompany}; DefaultCompany={DefaultCompany}; CompanyCount={CompanyCount}",
                    NormalizeLogValue(trimmed),
                    refreshedContext.Success,
                    NormalizeLogValue(refreshedContext.Message),
                    NormalizeLogValue(HttpContext.Session.GetString("INDCompanySelected")),
                    NormalizeLogValue(HttpContext.Session.GetString("AxUser")),
                    NormalizeLogValue(refreshedContext.Context?.Header?.AxUserId),
                    NormalizeLogValue(_authContext.GetSelectedCompanyId(refreshedContext.Context)),
                    NormalizeLogValue(refreshedContext.Context?.Header?.DefaultCompany),
                    refreshedContext.Context?.Companies?.Count ?? 0);
            }
            else
            {
                _logger.LogInformation(
                    "SetCompany no refresh required. RequestedCompany={RequestedCompany}; SessionCompany={SessionCompany}; SessionAxUser={SessionAxUser}",
                    NormalizeLogValue(trimmed),
                    NormalizeLogValue(HttpContext.Session.GetString("INDCompanySelected")),
                    NormalizeLogValue(HttpContext.Session.GetString("AxUser")));
            }

            // Always send users to Home after a company change to avoid stale pages.
            if (IsAjaxRequest())
            {
                return Ok();
            }

            return RedirectToAction("Index", "Home");
        }

        // Checks if the request was sent via AJAX/fetch.
        private bool IsAjaxRequest()
        {
            var requestedWith = Request.Headers["X-Requested-With"].ToString();
            return string.Equals(requestedWith, "XMLHttpRequest", StringComparison.OrdinalIgnoreCase);
        }

        private static string NormalizeLogValue(string? value)
        {
            var trimmed = (value ?? string.Empty).Trim();
            return string.IsNullOrWhiteSpace(trimmed) ? "(empty)" : trimmed;
        }
    }
}
