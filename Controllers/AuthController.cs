using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

//Probando cambios de APP
namespace IND_CRM_APP.Controllers
{
    // MVC controller for login and logout
    public class AuthController : Controller
    {
        private readonly ICrmApiClient _api;
        private readonly ITokenSessionService _tokenSession;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ICrmApiClient api, ITokenSessionService tokenSession, ILogger<AuthController> logger)
        {
            _api = api;
            _tokenSession = tokenSession;
            _logger = logger;
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

            try
            {
                var loginResult = await _api.AuthenticateAsync(model.Username, model.Password);
                if (loginResult == null || string.IsNullOrWhiteSpace(loginResult.Token))
                {
                    ModelState.AddModelError(string.Empty, "Invalid credentials or API error.");
                    return View(model);
                }

                _tokenSession.SetToken(
                    loginResult.Token,
                    loginResult.Expires != default ? loginResult.Expires : null
                );

                HttpContext.Session.SetString("AxUser", model.Username);

                return RedirectToAction("Index", "Home");
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error during login");
                ModelState.AddModelError(string.Empty, "Login failed due to API error.");
                return View(model);
            }
        }

        // Clears session and redirects to login
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
