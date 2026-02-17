using System;
using IND_CRM_APP.Extensions;
using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Text.Json;

namespace IND_CRM_APP.Controllers
{
    // MVC controller for login and logout flows.
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

        // Shows login page.
        [HttpGet]
        public IActionResult Login(bool loggedOut = false)
        {
            if (User?.Identity?.IsAuthenticated == true &&
                !TempData.ContainsKey("AuthError") &&
                !TempData.ContainsKey("IND_ActionMark_Type"))
            {
                return Redirect("/Home/Index");
            }

            if (loggedOut)
            {
                ViewBag.ForceEntra = true;
            }

            return View();
        }

        // Starts Entra OIDC login.
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

        // Processes login form and stores token in session.
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

        // Clears session and redirects to login.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            return await LogoutCore();
        }

        // Clears auth/session after context failures and returns login destination.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForceRelogin([FromQuery] string? reason = null)
        {
            var safeReason = string.IsNullOrWhiteSpace(reason) ? "unspecified" : reason.Trim();
            _logger.LogWarning("Forced relogin requested. Reason: {Reason}", safeReason);

            await ClearAuthSessionAsync();
            TempData.INDSetActionMarkError();

            var loginUrl = Url.Action("Login", "Auth", new { loggedOut = true }) ?? "/Auth/Login?loggedOut=true";
            if (IsJsonRequest())
            {
                return Json(new
                {
                    success = true,
                    loginUrl
                });
            }

            return RedirectToAction("Login", "Auth", new { loggedOut = true });
        }

        // Proxies /api/auth/entra/context for React consumers with IND API envelope.
        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> ApiEntraContext([FromBody] EntraContextRequest? request)
        {
            var token = _tokenSession.GetToken().Token;
            if (string.IsNullOrWhiteSpace(token))
            {
                return CreateApiPagedResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_SessionExpired"].Value,
                        Total = 0,
                        Page = 1,
                        PageSize = 0,
                        Items = Array.Empty<object>(),
                        ErrorCode = "SESSION_EXPIRED"
                    },
                    StatusCodes.Status401Unauthorized);
            }

            var entraOid = (request?.EntraOid ?? string.Empty).Trim();
            var appCode = (request?.AppCode ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(entraOid) || string.IsNullOrWhiteSpace(appCode))
            {
                return CreateApiPagedResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        Total = 0,
                        Page = 1,
                        PageSize = 0,
                        Items = Array.Empty<object>(),
                        ErrorCode = "INVALID_REQUEST"
                    },
                    StatusCodes.Status400BadRequest);
            }

            try
            {
                var response = await _api.GetEntraContextAsync(token, entraOid, appCode);
                var items = response.Items ?? new List<IndEntraContextItem>();
                var total = items.Count;

                return CreateApiPagedResponse(
                    new
                    {
                        Success = response.Success,
                        Message = response.Message ?? string.Empty,
                        Total = total,
                        Page = 1,
                        PageSize = total,
                        Items = items,
                        ErrorCode = response.ErrorCode
                    });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiEntraContext");
                return CreateApiPagedResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        Total = 0,
                        Page = 1,
                        PageSize = 0,
                        Items = Array.Empty<object>(),
                        ErrorCode = "UPSTREAM_ERROR"
                    },
                    StatusCodes.Status502BadGateway);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiEntraContext");
                return CreateApiPagedResponse(
                    new
                    {
                        Success = false,
                        Message = _sr["Api_RequestFailed"].Value,
                        Total = 0,
                        Page = 1,
                        PageSize = 0,
                        Items = Array.Empty<object>(),
                        ErrorCode = "UNHANDLED_ERROR"
                    },
                    StatusCodes.Status500InternalServerError);
            }
        }

        private async Task<IActionResult> LogoutCore()
        {
            await ClearAuthSessionAsync();
            return RedirectToAction("Login", "Auth", new { loggedOut = true });
        }

        // Clears both session values and auth cookie.
        private async Task ClearAuthSessionAsync()
        {
            HttpContext.Session.Clear();
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        // Detects whether the current request expects JSON.
        private bool IsJsonRequest()
        {
            var request = HttpContext.Request;
            var accept = request.Headers["Accept"].ToString();
            if (!string.IsNullOrWhiteSpace(accept) &&
                accept.Contains("application/json", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            var contentType = request.ContentType ?? string.Empty;
            if (!string.IsNullOrWhiteSpace(contentType) &&
                contentType.Contains("application/json", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            var requestedWith = request.Headers["X-Requested-With"].ToString();
            return string.Equals(requestedWith, "XMLHttpRequest", StringComparison.OrdinalIgnoreCase);
        }

        // Builds a paged API JSON payload preserving property casing.
        private static JsonResult CreateApiPagedResponse(object payload, int? statusCode = null)
        {
            var result = new JsonResult(
                payload,
                new JsonSerializerOptions
                {
                    PropertyNamingPolicy = null,
                    DictionaryKeyPolicy = null
                });

            if (statusCode.HasValue)
                result.StatusCode = statusCode;

            return result;
        }
    }
}
