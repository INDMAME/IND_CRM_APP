using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // Hosts internal tooling pages (React islands + Razor layout).
    [Route("tools")]
    public class ToolsController : BaseMvcController
    {
        public ToolsController(ICrmApiClient apiClient) : base(apiClient)
        {
        }

        // Standalone audio recorder tool (client-only, no upload).
        [HttpGet("audio-recorder")]
        public async Task<IActionResult> AudioRecorder()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Auth");

            await LoadEnvironmentInfoAsync();
            return View();
        }
    }
}

