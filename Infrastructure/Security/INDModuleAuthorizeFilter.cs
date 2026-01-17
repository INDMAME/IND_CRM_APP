using System;
using System.Linq;
using System.Threading.Tasks;
using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Infrastructure.Security
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
                Deny(context, string.IsNullOrWhiteSpace(ctxResult.Message)
                    ? AccessDeniedMessage("Context not available.")
                    : ctxResult.Message);
                return;
            }

            var moduleCode = ResolveModuleCode(path, http, ctxResult.Context);
            if (string.IsNullOrWhiteSpace(moduleCode))
            {
                Deny(context, AccessDeniedMessage("Module not mapped."));
                return;
            }

            var companyId = _authContext.GetSelectedCompanyId(ctxResult.Context);
            var company = ResolveCompany(ctxResult.Context, companyId);
            if (company == null)
            {
                Deny(context, AccessDeniedMessage("Company not selected."));
                return;
            }

            var required = GetRequiredAccess(path);
            if (!HasAccess(company, moduleCode, required))
            {
                var reason = $"Module {moduleCode} requires access {required}.";
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

        private string? ResolveModuleCode(string path, Microsoft.AspNetCore.Http.HttpContext http, IndWebContext context)
        {
            if (INDModuleRegistry.TryResolveModule(path, out var moduleCode))
                return moduleCode;

            if (IsHomePath(path))
            {
                return context.Companies.SelectMany(c => c.Modules)
                    .FirstOrDefault(m => m.AccessRightsInt >= (int)SysAccessRights.View)?.ModuleCode;
            }

            if (IsContextActionPath(path))
            {
                var contextReturnUrl = TryGetReturnUrl(http);
                if (!string.IsNullOrWhiteSpace(contextReturnUrl) &&
                    INDModuleRegistry.TryResolveModule(contextReturnUrl, out var contextModule))
                {
                    return contextModule;
                }

                return context.Companies.SelectMany(c => c.Modules)
                    .FirstOrDefault(m => m.AccessRightsInt >= (int)SysAccessRights.View)?.ModuleCode;
            }

            var returnUrl = TryGetReturnUrl(http);
            if (!string.IsNullOrWhiteSpace(returnUrl) &&
                INDModuleRegistry.TryResolveModule(returnUrl, out var fromReturn))
            {
                return fromReturn;
            }

            return null;
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

        private static IndWebCompany? ResolveCompany(IndWebContext context, string? companyId)
        {
            if (!string.IsNullOrWhiteSpace(companyId))
            {
                var match = context.Companies.FirstOrDefault(c =>
                    string.Equals(c.CompanyId, companyId, StringComparison.OrdinalIgnoreCase));
                if (match != null)
                    return match;
            }

            return context.Companies.FirstOrDefault();
        }

        private static bool HasAccess(IndWebCompany company, string moduleCode, int requiredAccess)
        {
            var module = company.Modules.FirstOrDefault(m =>
                string.Equals(m.ModuleCode, moduleCode, StringComparison.OrdinalIgnoreCase));
            if (module == null)
                return false;

            return module.AccessRightsInt >= requiredAccess;
        }

        private static int GetRequiredAccess(string path)
        {
            if (path.Contains("/Create", StringComparison.OrdinalIgnoreCase))
                return (int)SysAccessRights.Add;
            if (path.Contains("/Edit", StringComparison.OrdinalIgnoreCase))
                return (int)SysAccessRights.Edit;
            if (path.Contains("/Delete", StringComparison.OrdinalIgnoreCase))
                return (int)SysAccessRights.FullAccess;

            return (int)SysAccessRights.View;
        }

        private string? TryGetReturnUrl(Microsoft.AspNetCore.Http.HttpContext http)
        {
            var returnUrl = http.Request.Query["returnUrl"].FirstOrDefault();
            if (!string.IsNullOrWhiteSpace(returnUrl) && IsLocalUrl(returnUrl))
                return NormalizeReturnUrl(returnUrl);

            if (http.Request.HasFormContentType)
            {
                try
                {
                    var form = http.Request.ReadFormAsync().GetAwaiter().GetResult();
                    returnUrl = form["returnUrl"].FirstOrDefault();
                    if (!string.IsNullOrWhiteSpace(returnUrl) && IsLocalUrl(returnUrl))
                        return NormalizeReturnUrl(returnUrl);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to read returnUrl from form.");
                }
            }

            return null;
        }

        private static string NormalizeReturnUrl(string returnUrl)
        {
            var idx = returnUrl.IndexOf("?", StringComparison.Ordinal);
            return idx >= 0 ? returnUrl[..idx] : returnUrl;
        }

        private static bool IsLocalUrl(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return false;

            if (url[0] != '/')
                return false;

            if (url.StartsWith("//", StringComparison.Ordinal) || url.StartsWith("/\\", StringComparison.Ordinal))
                return false;

            return true;
        }

        private void Deny(ActionExecutingContext context, string message)
        {
            var tempData = _tempDataFactory.GetTempData(context.HttpContext);
            tempData["AuthError"] = message;
            context.Result = new RedirectToActionResult("Login", "Auth", null);
        }

        private string AccessDeniedMessage(string reason)
        {
            var template = _sr["Auth_AccessDenied"].Value;
            return string.Format(template, reason);
        }

        private enum SysAccessRights
        {
            NoAccess = 0,
            View = 1,
            Edit = 2,
            Add = 3,
            FullAccess = 4
        }
    }
}
