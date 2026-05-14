using System;
using System.Linq;
using System.Threading.Tasks;
using IND_CRM_APP.Extensions;
using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Infrastructure.Security.Modules;
using IND_CRM_APP.Infrastructure.Security.Permissions;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Infrastructure.Security.Filters
{
    // Global MVC filter that enforces module permissions.
    public class INDModuleAuthorizeFilter : IAsyncActionFilter
    {
        private readonly IIndAuthContextService _authContext;
        private readonly ITempDataDictionaryFactory _tempDataFactory;
        private readonly IStringLocalizer<INDSharedResource> _sr;
        private readonly ILogger<INDModuleAuthorizeFilter> _logger;

        public INDModuleAuthorizeFilter(
            IIndAuthContextService authContext,
            ITempDataDictionaryFactory tempDataFactory,
            IStringLocalizer<INDSharedResource> sr,
            ILogger<INDModuleAuthorizeFilter> logger)
        {
            _authContext = authContext;
            _tempDataFactory = tempDataFactory;
            _sr = sr;
            _logger = logger;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var http = context.HttpContext;
            var path = http.Request.Path.Value ?? string.Empty;

            if (IsBypassPath(path) || IsBypassAction(context))
            {
                await next();
                return;
            }

            if (http.User?.Identity?.IsAuthenticated != true)
            {
                Deny(context, _sr["Auth_LoginRequired"].Value);
                return;
            }

            var ctxResult = await _authContext.EnsureContextAsync();
            if (!ctxResult.Success || ctxResult.Context == null)
            {
                await HandleContextFailureAsync(context, ctxResult.Message, ctxResult.ErrorCode);
                return;
            }

            var companyId = _authContext.GetSelectedCompanyId(ctxResult.Context);
            var company = ResolveCompany(ctxResult.Context, companyId);
            if (company == null)
            {
                Deny(context, AccessDeniedMessage("Company not selected."));
                return;
            }

            if (IsForcedCompanyChange(context, ctxResult.Context, company))
            {
                context.Result = new RedirectToActionResult("Index", "Home", null);
                return;
            }

            var moduleCandidates = ResolveModuleCandidates(path, company);
            if (moduleCandidates.Length == 0)
            {
                Deny(context, AccessDeniedMessage("Module not mapped."));
                return;
            }

            var required = GetRequiredAccess(path, http.Request.Method);
            var hasAccess = HasAnyAccess(company, moduleCandidates, required);
            if (!hasAccess && IsSelfManagementOverrideAllowed(company, path, http.Request.Method, required))
            {
                hasAccess = true;
            }

            if (!hasAccess)
            {
                var reason = $"Modules [{string.Join(",", moduleCandidates)}] require access {required}.";
                Deny(context, AccessDeniedMessage(reason));
                return;
            }

            await next();
        }

        private static bool IsBypassPath(string path)
        {
            if (string.IsNullOrWhiteSpace(path))
                return true;

            return path.StartsWith("/Auth", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/api/auth", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/signin-oidc", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/signout-callback-oidc", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/signout-oidc", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/css", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/js", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/lib", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/images", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/favicon", StringComparison.OrdinalIgnoreCase);
        }

        // Allows Auth/Login even when it is reached via the default "/" route.
        private static bool IsBypassAction(ActionExecutingContext context)
        {
            if (context?.ActionDescriptor?.RouteValues == null)
                return false;

            context.ActionDescriptor.RouteValues.TryGetValue("controller", out var controller);
            context.ActionDescriptor.RouteValues.TryGetValue("action", out var action);

            return string.Equals(controller, "Auth", StringComparison.OrdinalIgnoreCase) &&
                   string.Equals(action, "Login", StringComparison.OrdinalIgnoreCase);
        }

        // Resolves module candidates only from explicit route mapping or fixed safe fallbacks.
        private static string[] ResolveModuleCandidates(string path, IndWebCompany company)
        {
            if (INDModuleRegistry.TryResolveSharedRouteCandidates(path, out var sharedCandidates))
                return sharedCandidates;

            if (INDModuleRegistry.TryResolveModule(path, out var moduleCode))
                return new[] { moduleCode };

            if (IsHomePath(path) || IsContextActionPath(path))
                return GetAccessibleModuleCandidates(company);

            return Array.Empty<string>();
        }

        private static bool IsHomePath(string path)
        {
            return path == "/" ||
                   path.StartsWith("/Home", StringComparison.OrdinalIgnoreCase);
        }

        private static bool IsContextActionPath(string path)
        {
            return path.StartsWith("/INDCompany", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/INDLocalization", StringComparison.OrdinalIgnoreCase);
        }

        private static string[] GetAccessibleModuleCandidates(IndWebCompany company)
        {
            if (company?.Modules == null || company.Modules.Count == 0)
                return Array.Empty<string>();

            return company.Modules
                .Where(m => m.AccessRightsInt >= IndAccessRights.View && !string.IsNullOrWhiteSpace(m.ModuleCode))
                .Select(m => INDModuleRegistry.TryGetCanonicalModuleCode(m.ModuleCode, out var canonical)
                    ? canonical
                    : string.Empty)
                .Where(code => !string.IsNullOrWhiteSpace(code))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray();
        }

        private static IndWebCompany? ResolveCompany(IndWebContext context, string? companyId)
        {
            if (!string.IsNullOrWhiteSpace(companyId))
            {
                var match = context.Companies.FirstOrDefault(c =>
                    string.Equals(c.CompanyId, companyId, StringComparison.OrdinalIgnoreCase));
                return match;
            }

            return context.Companies.FirstOrDefault();
        }

        private static bool HasAnyAccess(IndWebCompany company, string[] moduleCodes, int requiredAccess)
        {
            if (moduleCodes == null || moduleCodes.Length == 0)
                return false;

            foreach (var moduleCode in moduleCodes)
            {
                if (HasAccess(company, moduleCode, requiredAccess))
                    return true;
            }

            return false;
        }

        private static bool HasAccess(IndWebCompany company, string moduleCode, int requiredAccess)
        {
            if (company?.Modules == null || company.Modules.Count == 0)
                return false;

            var module = company.Modules.FirstOrDefault(m =>
                INDModuleRegistry.MatchesModuleCode(m.ModuleCode, moduleCode));
            if (module == null)
                return false;

            return module.AccessRightsInt >= requiredAccess;
        }

        private static int GetRequiredAccess(string path, string method)
        {
            // REST expense endpoints map required access from HTTP verb.
            if (path.StartsWith("/api/crm/expensesheets", StringComparison.OrdinalIgnoreCase))
            {
                if (path.Equals("/api/crm/expensesheets/list", StringComparison.OrdinalIgnoreCase) ||
                    path.Equals("/api/crm/expensesheets/tickets/list", StringComparison.OrdinalIgnoreCase))
                    return IndAccessRights.View;

                if (HttpMethods.IsPost(method))
                    return IndAccessRights.Add;
                if (HttpMethods.IsPut(method) || HttpMethods.IsPatch(method))
                    return IndAccessRights.Edit;
                if (HttpMethods.IsDelete(method))
                    return IndAccessRights.FullAccess;

                return IndAccessRights.View;
            }

            // IA draft generation for tickets is a write operation when called via POST.
            if (path.StartsWith("/api/ia/service/expensefromticket", StringComparison.OrdinalIgnoreCase))
            {
                if (HttpMethods.IsPost(method))
                    return IndAccessRights.Add;

                return IndAccessRights.View;
            }

            // Expense sheet assistant only reads already loaded sheet data.
            if (path.StartsWith("/api/ia/service/expensesheets/ask", StringComparison.OrdinalIgnoreCase))
                return IndAccessRights.View;

            if (path.StartsWith("/TextEditorReact", StringComparison.OrdinalIgnoreCase))
                return IndAccessRights.View;
            if (path.Contains("/Create", StringComparison.OrdinalIgnoreCase))
                return IndAccessRights.Add;
            if (path.Contains("/Update", StringComparison.OrdinalIgnoreCase) ||
                path.Contains("/Edit", StringComparison.OrdinalIgnoreCase))
                return IndAccessRights.Edit;
            if (path.Contains("/Delete", StringComparison.OrdinalIgnoreCase))
                return IndAccessRights.FullAccess;

            return IndAccessRights.View;
        }

        // Allows status management updates for self-management companies on expense sheet headers.
        private static bool IsSelfManagementOverrideAllowed(
            IndWebCompany company,
            string path,
            string method,
            int requiredAccess)
        {
            if (company?.AllowSelfManagement != true)
                return false;

            if (requiredAccess < IndAccessRights.Edit)
                return false;

            if (!HttpMethods.IsPut(method) && !HttpMethods.IsPatch(method))
                return false;

            if (!path.StartsWith("/api/crm/expensesheets/", StringComparison.OrdinalIgnoreCase))
                return false;

            if (path.Equals("/api/crm/expensesheets/list", StringComparison.OrdinalIgnoreCase))
                return false;

            if (path.Contains("/lines/", StringComparison.OrdinalIgnoreCase))
                return false;

            return true;
        }

        // Detects attempts to force a different company via URL/query.
        private static bool IsForcedCompanyChange(ActionExecutingContext context, IndWebContext webContext, IndWebCompany company)
        {
            var http = context.HttpContext;
            if (!HttpMethods.IsGet(http.Request.Method) && !HttpMethods.IsHead(http.Request.Method))
                return false;

            if (TryGetCompanyFromQuery(http, out var requestedCompany) &&
                !string.Equals(requestedCompany, company.CompanyId, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            if (TryGetCompanyFromRouteValues(context, webContext, out requestedCompany) &&
                !string.Equals(requestedCompany, company.CompanyId, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            if (TryGetCompanyFromPath(http, webContext, out requestedCompany) &&
                !string.Equals(requestedCompany, company.CompanyId, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            return false;
        }

        // Reads a requested company id from query string parameters.
        private static bool TryGetCompanyFromQuery(Microsoft.AspNetCore.Http.HttpContext http, out string companyId)
        {
            companyId = string.Empty;
            var query = http.Request.Query;
            if (query == null || query.Count == 0)
                return false;

            foreach (var key in new[] { "company", "companyId", "indCompany", "indCompanyId" })
            {
                if (query.TryGetValue(key, out var value) && !string.IsNullOrWhiteSpace(value))
                {
                    companyId = value.ToString().Trim();
                    return !string.IsNullOrWhiteSpace(companyId);
                }
            }

            return false;
        }

        // Detects a company value inside route data.
        private static bool TryGetCompanyFromRouteValues(ActionExecutingContext context, IndWebContext webContext, out string companyId)
        {
            companyId = string.Empty;
            if (webContext?.Companies == null || webContext.Companies.Count == 0)
                return false;

            var values = context.RouteData?.Values;
            if (values == null || values.Count == 0)
                return false;

            foreach (var key in new[] { "company", "companyId", "indCompany", "indCompanyId" })
            {
                if (values.TryGetValue(key, out var raw) && raw != null)
                {
                    var candidate = raw.ToString()?.Trim();
                    if (string.IsNullOrWhiteSpace(candidate))
                        continue;

                    if (webContext.Companies.Any(c =>
                            string.Equals(c.CompanyId, candidate, StringComparison.OrdinalIgnoreCase)))
                    {
                        companyId = candidate;
                        return true;
                    }
                }
            }

            if (values.TryGetValue("id", out var idRaw) && idRaw != null)
            {
                var candidate = idRaw.ToString()?.Trim();
                if (!string.IsNullOrWhiteSpace(candidate) &&
                    !ActionHasParameter(context, "id") &&
                    webContext.Companies.Any(c => string.Equals(c.CompanyId, candidate, StringComparison.OrdinalIgnoreCase)))
                {
                    companyId = candidate;
                    return true;
                }
            }

            return false;
        }

        private static bool ActionHasParameter(ActionExecutingContext context, string name)
        {
            if (context?.ActionDescriptor?.Parameters == null)
                return false;

            return context.ActionDescriptor.Parameters.Any(p =>
                string.Equals(p.Name, name, StringComparison.OrdinalIgnoreCase));
        }

        // Detects a trailing company segment on fixed routes.
        private static bool TryGetCompanyFromPath(Microsoft.AspNetCore.Http.HttpContext http, IndWebContext webContext, out string companyId)
        {
            companyId = string.Empty;
            if (webContext?.Companies == null || webContext.Companies.Count == 0)
                return false;

            var path = http.Request.Path.Value ?? string.Empty;
            if (string.IsNullOrWhiteSpace(path))
                return false;

            var trimmed = path.TrimEnd('/');
            if (string.IsNullOrWhiteSpace(trimmed))
                return false;

            var lastSlash = trimmed.LastIndexOf("/", StringComparison.Ordinal);
            if (lastSlash < 0 || lastSlash == trimmed.Length - 1)
                return false;

            var candidate = trimmed[(lastSlash + 1)..];
            if (string.IsNullOrWhiteSpace(candidate))
                return false;

            var basePath = lastSlash == 0 ? "/" : trimmed[..lastSlash];
            if (!IsCompanyGuardPath(basePath))
                return false;

            var match = webContext.Companies.FirstOrDefault(c =>
                string.Equals(c.CompanyId, candidate, StringComparison.OrdinalIgnoreCase));
            if (match == null)
                return false;

            companyId = match.CompanyId;
            return true;
        }

        // List of routes where a trailing company segment should trigger a redirect.
        private static bool IsCompanyGuardPath(string basePath)
        {
            if (string.IsNullOrWhiteSpace(basePath))
                return false;

            return basePath.Equals("/", StringComparison.OrdinalIgnoreCase) ||
                   basePath.Equals("/Home", StringComparison.OrdinalIgnoreCase) ||
                   basePath.Equals("/Home/Index", StringComparison.OrdinalIgnoreCase) ||
                   basePath.Equals("/Historial/History", StringComparison.OrdinalIgnoreCase) ||
                   basePath.Equals("/Visitas/Create", StringComparison.OrdinalIgnoreCase);
        }

        // Handles context bootstrap failures by clearing cache and forcing a clean login.
        private async Task HandleContextFailureAsync(ActionExecutingContext context, string? technicalMessage, string? errorCode)
        {
            var http = context.HttpContext;
            var path = http.Request.Path.Value ?? string.Empty;
            var safeReason = string.IsNullOrWhiteSpace(technicalMessage)
                ? "Context not available."
                : technicalMessage;

            _logger.LogError("Context initialization failed for {Path}. ErrorCode: {ErrorCode}. Reason: {Reason}", path, errorCode ?? string.Empty, safeReason);

            // Clear session cache and auth cookie to prevent stale context loops.
            http.Session.Clear();
            await http.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var tempData = _tempDataFactory.GetTempData(http);
            tempData.INDSetActionMarkError();

            var loginUrl = "/Auth/Login?loggedOut=true";
            var publicMessage = _sr["Api_SessionExpired"].Value;

            if (IsJsonRequest(http))
            {
                context.Result = new JsonResult(new
                {
                    success = false,
                    message = publicMessage,
                    forceRelogin = true,
                    errorCode = string.IsNullOrWhiteSpace(errorCode) ? "SESSION_EXPIRED" : errorCode,
                    loginUrl
                })
                {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
                return;
            }

            context.Result = new RedirectToActionResult("Login", "Auth", new { loggedOut = true });
        }

        private void Deny(ActionExecutingContext context, string message)
        {
            var http = context.HttpContext;
            var isAuthenticated = http.User?.Identity?.IsAuthenticated == true;

            if (isAuthenticated && IsJsonRequest(http))
            {
                context.Result = new JsonResult(new { success = false, message })
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
                return;
            }

            if (isAuthenticated)
            {
                var path = http.Request.Path.Value ?? string.Empty;
                if (IsHomePath(path))
                {
                    context.Result = new StatusCodeResult(StatusCodes.Status403Forbidden);
                }
                else
                {
                    var tempDataRedirect = _tempDataFactory.GetTempData(http);
                    tempDataRedirect["IndPermissionRedirectMessage"] = message;
                    context.Result = new RedirectToActionResult("Index", "Home", null);
                }
                return;
            }

            var tempData = _tempDataFactory.GetTempData(http);
            tempData["AuthError"] = message;
            context.Result = new RedirectToActionResult("Login", "Auth", null);
        }

        private string AccessDeniedMessage(string reason)
        {
            var template = _sr["Auth_AccessDenied"].Value;
            return string.Format(template, reason);
        }

        private static bool IsJsonRequest(Microsoft.AspNetCore.Http.HttpContext http)
        {
            var accept = http.Request.Headers["Accept"].ToString();
            if (!string.IsNullOrWhiteSpace(accept) &&
                accept.Contains("application/json", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            var contentType = http.Request.ContentType ?? string.Empty;
            if (!string.IsNullOrWhiteSpace(contentType) &&
                contentType.Contains("application/json", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            var requestedWith = http.Request.Headers["X-Requested-With"].ToString();
            return string.Equals(requestedWith, "XMLHttpRequest", StringComparison.OrdinalIgnoreCase);
        }
    }
}
