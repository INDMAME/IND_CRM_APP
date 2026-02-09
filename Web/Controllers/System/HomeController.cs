using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Handles MVC requests for home.
    /// </summary>
    public class HomeController : BaseMvcController
    {
        private readonly IIndAuthContextService _authContext;

        public HomeController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            IIndAuthContextService authContext) : base(apiClient, tokenSession)
        {
            _authContext = authContext;
        }

        public async Task<IActionResult> Index()
        {
            // Refresh context on every Index load to reflect permission changes, preserving company selection.
            _authContext.ClearContextCache(preserveCompanySelection: true);
            await _authContext.EnsureContextAsync();

            await LoadEnvironmentInfoAsync();
            return View();
        }

        // Shows a friendly 404 page for missing routes.
        [HttpGet]
        public IActionResult NotFound(int? code = null)
        {
            Response.StatusCode = 404;
            ViewData["StatusCode"] = code ?? 404;
            return View("NotFound");
        }
    }
}
