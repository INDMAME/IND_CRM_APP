using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Localization;
using IND_CRM_APP.Infrastructure.Localization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace IND_CRM_APP.Controllers
{
    // MVC controller for login and logout
    public class AuthController : Controller
    {
        private readonly ICrmApiClient _api;
        private readonly ITokenSessionService _tokenSession;
        private readonly ILogger<AuthController> _logger;
        private readonly IStringLocalizer<INDSharedResource> _sr;

        public AuthController(
            ICrmApiClient api,
            ITokenSessionService tokenSession,
            ILogger<AuthController> logger,
            IStringLocalizer<INDSharedResource> sr)
        {
            _api = api;
            _tokenSession = tokenSession;
            _logger = logger;
            _sr = sr;
        }

        // Shows login page
        [HttpGet]
        public IActionResult Login(bool loggedOut = false)
        {
            if (User?.Identity?.IsAuthenticated == true && !TempData.ContainsKey("AuthError"))
                return Redirect("/Home/Index");

            if (loggedOut)
            {
                ViewBag.ForceEntra = true;
            }

            return View();
        }

        // Starts Entra OIDC login
        [HttpGet]
        public IActionResult EntraLogin(string? returnUrl = null, bool force = false)
        {
            var safeReturnUrl = !string.IsNullOrWhiteSpace(returnUrl) && Url.IsLocalUrl(returnUrl)
                ? returnUrl
                : "/";

            var props = new AuthenticationProperties
            {
                RedirectUri = safeReturnUrl
            };

            if (force)
            {
                // Force re-authentication after explicit logout.
                props.Items["prompt"] = "login";
                props.Items["max_age"] = "0";
            }

            return Challenge(props, OpenIdConnectDefaults.AuthenticationScheme);
        }

        // Processes login form and stores token in session
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            if (!ModelState.IsValid)
                return View(model);

            try
            {
                var loginResult = await _api.AuthenticateAsync(model.Username, model.Password);
                if (loginResult == null || string.IsNullOrWhiteSpace(loginResult.Token))
                {
                    _tokenSession.Clear();
                    ViewBag.Error = !string.IsNullOrWhiteSpace(loginResult?.Message)
                        ? loginResult.Message
                        : _sr["Auth_InvalidCredentials"].Value;
                    return View(model);
                }

                _tokenSession.SetToken(
                    loginResult.Token,
                    loginResult.Expires != default ? loginResult.Expires : null
                );

                return RedirectToAction("Index", "Home");
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error during login");
                _tokenSession.Clear();
                ViewBag.Error = _sr["Auth_LoginApiError"].Value;
                return View(model);
            }
        }

        // Clears session and redirects to login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            return await LogoutCore();
        }

        private async Task<IActionResult> LogoutCore()
        {
            HttpContext.Session.Clear();
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Auth", new { loggedOut = true });
        }
    }
}
