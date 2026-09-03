using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Middleware
{
    /// <summary>
    /// Rejects requests sent by a page rendered for a company that is no longer active in session.
    /// </summary>
    public sealed class ExpectedCompanyContextMiddleware
    {
        public const string ExpectedCompanyHeader = "X-IND-Expected-Company";
        public const string StaleContextHeader = "X-IND-Company-Context-Stale";
        public const string StaleContextErrorCode = "STALE_COMPANY_CONTEXT";

        private const string SelectedCompanySessionKey = "INDCompanySelected";
        private readonly RequestDelegate _next;
        private readonly ILogger<ExpectedCompanyContextMiddleware> _logger;

        public ExpectedCompanyContextMiddleware(
            RequestDelegate next,
            ILogger<ExpectedCompanyContextMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        /// <summary>
        /// Stops stale company requests before token refresh, context refresh, controllers, or upstream calls run.
        /// </summary>
        public async Task Invoke(HttpContext context)
        {
            var expectedCompanyId = context.Request.Headers[ExpectedCompanyHeader].ToString();
            var selectedCompanyId = context.Session.GetString(SelectedCompanySessionKey);

            if (!ShouldReject(
                    context.User?.Identity?.IsAuthenticated == true,
                    context.Request.Path.Value,
                    expectedCompanyId,
                    selectedCompanyId))
            {
                await _next(context);
                return;
            }

            _logger.LogWarning(
                "Rejected stale browser company context. Path={Path}; Method={Method}; ExpectedCompany={ExpectedCompany}; SelectedCompany={SelectedCompany}; TraceId={TraceId}",
                context.Request.Path.Value ?? string.Empty,
                context.Request.Method,
                NormalizeCompanyId(expectedCompanyId),
                NormalizeCompanyId(selectedCompanyId),
                context.TraceIdentifier);

            context.Response.StatusCode = StatusCodes.Status409Conflict;
            context.Response.ContentType = "application/json; charset=utf-8";
            context.Response.Headers[StaleContextHeader] = "true";

            await context.Response.WriteAsync(JsonSerializer.Serialize(new
            {
                Success = false,
                Message = "The active company changed in another browser tab. Reload the page and try again.",
                ErrorCode = StaleContextErrorCode,
                TraceId = context.TraceIdentifier
            }));
        }

        /// <summary>
        /// Applies a compatibility-safe decision without using the browser header for authorization.
        /// </summary>
        public static bool ShouldReject(
            bool isAuthenticated,
            string? requestPath,
            string? expectedCompanyId,
            string? selectedCompanyId)
        {
            if (!isAuthenticated || IsCompatibilityRoute(requestPath))
                return false;

            var expected = NormalizeCompanyId(expectedCompanyId);
            var selected = NormalizeCompanyId(selectedCompanyId);

            // Missing values remain allowed for legacy requests and sessions without a selected company.
            return expected.Length > 0 &&
                   selected.Length > 0 &&
                   !string.Equals(expected, selected, StringComparison.OrdinalIgnoreCase);
        }

        private static bool IsCompatibilityRoute(string? requestPath)
        {
            var path = (requestPath ?? string.Empty).Trim();
            return IsRoute(path, "/Auth/Login") ||
                   IsRoute(path, "/Auth/Logout") ||
                   IsRoute(path, "/Auth/ForceRelogin") ||
                   IsRoute(path, "/INDCompany/SetCompany");
        }

        private static bool IsRoute(string path, string route)
        {
            return string.Equals(path, route, StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith(route + "/", StringComparison.OrdinalIgnoreCase);
        }

        private static string NormalizeCompanyId(string? companyId)
        {
            return (companyId ?? string.Empty).Trim();
        }
    }
}
