using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // Handles company selection from the sidebar menu.
    public class INDCompanyController : Controller
    {
        private readonly IIndAuthContextService _authContext;

        public INDCompanyController(IIndAuthContextService authContext)
        {
            _authContext = authContext;
        }

        // Stores the selected company in session and redirects back.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SetCompany(string? companyId, string? returnUrl)
        {
            var current = HttpContext.Session.GetString("INDCompanySelected");
            var trimmed = companyId?.Trim();
            var changed = !string.IsNullOrWhiteSpace(trimmed) &&
                          !string.Equals(current, trimmed, StringComparison.OrdinalIgnoreCase);

            if (!string.IsNullOrWhiteSpace(trimmed))
            {
                HttpContext.Session.SetString("INDCompanySelected", trimmed);
                HttpContext.Session.SetString("INDCompanySelectionSource", "user");
            }

            if (changed)
            {
                _authContext.ClearContextCache(preserveCompanySelection: true);
                await _authContext.EnsureContextAsync();
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
    }
}
