using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // MVC controller for login and logout
    public class AuthController : Controller
    {
        private readonly ICrmApiClient _api;

        public AuthController(ICrmApiClient api)
        {
            _api = api;
        }

        // Shows login page
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        // Processes login form and stores token in session
        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            if (!ModelState.IsValid)
                return View(model);

            // Ask API for token
            var token = await _api.AuthenticateAsync(model.Username, model.Password);
            if (string.IsNullOrEmpty(token))
            {
                ModelState.AddModelError(string.Empty, "Invalid credentials or API error.");
                return View(model);
            }

            // Store token in session
            HttpContext.Session.SetString("Token", token);
            
            // Soft expiration used by middleware to decide refresh
            // Here we set 15 minutes window, real JWT expiration is handled in API
            HttpContext.Session.SetString(
                "TokenExpires",
                DateTime.UtcNow.AddMinutes(15).ToString("o")
            );

            HttpContext.Session.SetString("AxUser", model.Username);

            return RedirectToAction("Index", "Home");
        }

        // Clears session and redirects to login
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
