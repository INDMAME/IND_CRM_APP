using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

//Probando cambios de APP
namespace IND_CRM_APP.Controllers
{
    // MVC controller for login and logout
    public class AuthController : Controller
    {
        private readonly ICrmApiClient _api;
        private readonly ITokenSessionService _tokenSession;

        public AuthController(ICrmApiClient api, ITokenSessionService tokenSession)
        {
            _api = api;
            _tokenSession = tokenSession;
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

        // Clears session and redirects to login
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
