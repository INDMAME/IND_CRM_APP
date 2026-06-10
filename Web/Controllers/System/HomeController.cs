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
            // Force-refresh without clearing first so a temporary API failure does not destroy a valid context.
            await _authContext.EnsureContextAsync(forceRefresh: true);

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
