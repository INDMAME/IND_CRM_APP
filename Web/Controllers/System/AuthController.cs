using System;
using IND_CRM_APP.Extensions;
using IND_CRM_APP.Infrastructure.Security.Auth;
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
using System.Linq;
using System.Text.Json;

namespace IND_CRM_APP.Controllers
{
    // MVC controller for login and logout flows.
    public class AuthController : Controller
    {
        private readonly ICrmApiClient _api;
        private readonly IIndAuthContextService _authContext;
        private readonly ITokenSessionService _tokenSession;
        private readonly ILogger<AuthController> _logger;
        private readonly IStringLocalizer<INDSharedResource> _sr;

        public AuthController(
            ICrmApiClient api,
            IIndAuthContextService authContext,
            ITokenSessionService tokenSession,
            ILogger<AuthController> logger,
            IStringLocalizer<INDSharedResource> sr)
        {
            _api = api;
            _authContext = authContext;
            _tokenSession = tokenSession;
            _logger = logger;
            _sr = sr;
        }

        // Shows login page.
        [HttpGet]
        public IActionResult Login(bool loggedOut = false, string? returnUrl = null)
        {
            var safeReturnUrl = LocalReturnUrlHelper.TryNormalizeLocalReturnUrl(Url, returnUrl);
            ViewBag.ReturnUrl = safeReturnUrl;

            if (User?.Identity?.IsAuthenticated == true &&
                !TempData.ContainsKey("AuthError") &&
                !TempData.ContainsKey("IND_ActionMark_Type"))
            {
                return Redirect(safeReturnUrl ?? "/Home/Index");
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
            var safeReturnUrl = LocalReturnUrlHelper.NormalizeLocalReturnUrl(Url, returnUrl);

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
        public async Task<IActionResult> Login(LoginRequest model, string? returnUrl = null)
        {
            var safeReturnUrl = LocalReturnUrlHelper.TryNormalizeLocalReturnUrl(Url, returnUrl);
            ViewBag.ReturnUrl = safeReturnUrl;

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

                return Redirect(safeReturnUrl ?? "/Home/Index");
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
            LogAuthContextSnapshot("ForceRelogin before clear", _authContext.GetCachedContext(), safeReason);

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
        public async Task<IActionResult> ApiEntraContext([FromBody] EntraContextRequest? request)
        {
            if (User?.Identity?.IsAuthenticated != true)
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

            var requestedAppCode = (request?.AppCode ?? string.Empty).Trim();
            if (!string.IsNullOrWhiteSpace(requestedAppCode) &&
                !string.Equals(requestedAppCode, IndAuthEnv.AppCode, StringComparison.OrdinalIgnoreCase))
            {
                _logger.LogInformation(
                    "ApiEntraContext ignored client appCode '{RequestedAppCode}' and used server appCode '{ServerAppCode}'.",
                    requestedAppCode,
                    IndAuthEnv.AppCode);
            }

            try
            {
                LogAuthContextSnapshot("ApiEntraContext before EnsureContextAsync", _authContext.GetCachedContext(), requestedAppCode);
                var contextResult = await _authContext.EnsureContextAsync();
                if (!contextResult.Success || contextResult.Context == null)
                {
                    var (statusCode, errorCode) = ResolveContextFailure(contextResult.ErrorCode, contextResult.Message);
                    LogAuthContextSnapshot(
                        "ApiEntraContext failure",
                        contextResult.Context,
                        (contextResult.ErrorCode ?? string.Empty) + "|" + (contextResult.Message ?? errorCode));

                    return CreateApiPagedResponse(
                        new
                        {
                            Success = false,
                            Message = string.IsNullOrWhiteSpace(contextResult.Message)
                                ? _sr["Api_RequestFailed"].Value
                                : contextResult.Message,
                            Total = 0,
                            Page = 1,
                            PageSize = 0,
                            Items = Array.Empty<object>(),
                            ErrorCode = errorCode
                        },
                        statusCode);
                }

                var items = new[] { ToApiEntraContextItem(contextResult.Context) };
                const int total = 1;
                LogAuthContextSnapshot(
                    "ApiEntraContext success",
                    contextResult.Context,
                    contextResult.Context.Header.Message);

                return CreateApiPagedResponse(
                    new
                    {
                        Success = true,
                        Message = contextResult.Context.Header.Message ?? string.Empty,
                        Total = total,
                        Page = 1,
                        PageSize = total,
                        Items = items,
                        ErrorCode = (string?)null
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

        // Maps cached web context back to the React-facing Entra context shape.
        private static object ToApiEntraContextItem(IndWebContext context)
        {
            return new
            {
                context.TenantId,
                context.EntraOid,
                context.ContextVersion,
                context.PermissionsRevision,
                context.ContextIssuedUtc,
                context.ContextExpiresUtc,
                Header = new
                {
                    context.Header.Success,
                    context.Header.Message,
                    context.Header.AxUserId,
                    context.Header.UserActive,
                    context.Header.AppActive,
                    context.Header.DefaultCompany,
                    context.Header.DefaultCurrencyCode
                },
                Companies = context.Companies.Select(company => new
                {
                    company.CompanyId,
                    company.IsDefault,
                    company.CompanyName,
                    company.CurrencyCode,
                    company.CrmUserId,
                    company.AllowSelfManagement,
                    Modules = company.Modules.Select(module => new
                    {
                        module.ModuleCode,
                        module.Description,
                        module.IsActive,
                        module.AccessRightsInt,
                        module.DataVisibilityMode,
                        module.DataVisibilityModeInt,
                        module.HierarchyDepth,
                        module.HierarchyDepthInt,
                        module.MutationPolicy,
                        module.MutationPolicyInt,
                        module.MutationPolicyLabel
                    }).ToList()
                }).ToList()
            };
        }

        // Keeps auth failures distinct from denied or upstream context failures.
        private static (int StatusCode, string ErrorCode) ResolveContextFailure(string? errorCode, string? message)
        {
            var normalizedErrorCode = (errorCode ?? string.Empty).Trim();
            if (string.Equals(normalizedErrorCode, "AUTH_CONTEXT_REQUIRED", StringComparison.OrdinalIgnoreCase))
                return (StatusCodes.Status403Forbidden, "AUTH_CONTEXT_REQUIRED");

            if (string.Equals(normalizedErrorCode, "AUTH_CONTEXT_STALE", StringComparison.OrdinalIgnoreCase))
                return (StatusCodes.Status403Forbidden, "AUTH_CONTEXT_STALE");

            if (string.Equals(normalizedErrorCode, "AUTH_FORBIDDEN", StringComparison.OrdinalIgnoreCase))
                return (StatusCodes.Status403Forbidden, "AUTH_FORBIDDEN");

            if (string.Equals(normalizedErrorCode, "CONTEXT_DENIED", StringComparison.OrdinalIgnoreCase))
                return (StatusCodes.Status403Forbidden, "CONTEXT_DENIED");

            if (string.Equals(normalizedErrorCode, "AUTH_REQUIRED", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(normalizedErrorCode, "SESSION_EXPIRED", StringComparison.OrdinalIgnoreCase))
            {
                return (StatusCodes.Status401Unauthorized, "SESSION_EXPIRED");
            }

            if (string.Equals(normalizedErrorCode, "UPSTREAM_ERROR", StringComparison.OrdinalIgnoreCase))
                return (StatusCodes.Status502BadGateway, "UPSTREAM_ERROR");

            var normalized = (message ?? string.Empty).Trim();
            if (string.Equals(normalized, "Missing Entra OID.", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(normalized, "Session not available.", StringComparison.OrdinalIgnoreCase))
            {
                return (StatusCodes.Status401Unauthorized, "SESSION_EXPIRED");
            }

            if (string.Equals(normalized, "Access denied.", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(normalized, "Context not available.", StringComparison.OrdinalIgnoreCase))
            {
                return (StatusCodes.Status403Forbidden, "CONTEXT_DENIED");
            }

            if (string.Equals(normalized, "Missing internal token.", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(normalized, "Context API error.", StringComparison.OrdinalIgnoreCase))
            {
                return (StatusCodes.Status502BadGateway, "UPSTREAM_ERROR");
            }

            return (StatusCodes.Status400BadRequest, "CONTEXT_ERROR");
        }

        private void LogAuthContextSnapshot(string stage, IndWebContext? context, string? note)
        {
            _logger.LogInformation(
                "Auth context trace [{Stage}]. SessionEntraOid={SessionEntraOid}; ContextEntraOid={ContextEntraOid}; ClaimsEntraOid={ClaimsEntraOid}; SessionAxUser={SessionAxUser}; ContextAxUser={ContextAxUser}; SessionCompany={SessionCompany}; SessionCompanyName={SessionCompanyName}; SelectionSource={SelectionSource}; ResolvedCompany={ResolvedCompany}; DefaultCompany={DefaultCompany}; CompanyCount={CompanyCount}; SessionPermissionsRevision={SessionPermissionsRevision}; ContextPermissionsRevision={ContextPermissionsRevision}; Note={Note}",
                stage,
                NormalizeLogValue(HttpContext.Session.GetString("ENTRAOID")),
                NormalizeLogValue(HttpContext.Session.GetString("INDEntraOidContext")),
                NormalizeLogValue(TryGetEntraOidFromClaims(User)),
                NormalizeLogValue(HttpContext.Session.GetString("AxUser")),
                NormalizeLogValue(context?.Header?.AxUserId),
                NormalizeLogValue(HttpContext.Session.GetString("INDCompanySelected")),
                NormalizeLogValue(HttpContext.Session.GetString("INDCompanySelectedName")),
                NormalizeLogValue(HttpContext.Session.GetString("INDCompanySelectionSource")),
                NormalizeLogValue(_authContext.GetSelectedCompanyId(context)),
                NormalizeLogValue(context?.Header?.DefaultCompany),
                context?.Companies?.Count ?? 0,
                NormalizeLogValue(HttpContext.Session.GetString("INDPermissionsRevision")),
                NormalizeLogValue(context?.PermissionsRevision),
                NormalizeLogValue(note));
        }

        private static string? TryGetEntraOidFromClaims(System.Security.Claims.ClaimsPrincipal? user)
        {
            if (user == null)
                return null;

            return user.FindFirst(IndAuthEnv.ClaimOid)?.Value
                   ?? user.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
        }

        private static string NormalizeLogValue(string? value)
        {
            var trimmed = (value ?? string.Empty).Trim();
            return string.IsNullOrWhiteSpace(trimmed) ? "(empty)" : trimmed;
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
