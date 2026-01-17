using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // Handles company selection from the sidebar menu.
    public class INDCompanyController : Controller
    {
        // Stores the selected company in session and redirects back.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SetCompany(string? companyId, string? returnUrl)
        {
            if (!string.IsNullOrWhiteSpace(companyId))
            {
                HttpContext.Session.SetString("INDCompanySelected", companyId.Trim());
            }

            var safeReturnUrl = !string.IsNullOrWhiteSpace(returnUrl) && Url.IsLocalUrl(returnUrl)
                ? returnUrl
                : "/";

            return LocalRedirect(safeReturnUrl);
        }
    }
}
