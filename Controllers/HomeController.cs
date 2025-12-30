using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    public class HomeController : BaseMvcController
    {
        public HomeController(ICrmApiClient apiClient) : base(apiClient)
        {
        }

        public async Task<IActionResult> Index()
        {
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
