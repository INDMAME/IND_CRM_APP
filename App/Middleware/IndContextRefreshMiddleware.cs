using System.Threading.Tasks;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Middleware
{
    /// <summary>
    /// Refreshes the per-user auth context after inactivity or near expiry.
    /// </summary>
    public class IndContextRefreshMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<IndContextRefreshMiddleware> _logger;

        public IndContextRefreshMiddleware(
            RequestDelegate next,
            ILogger<IndContextRefreshMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            if (ShouldSkip(context))
            {
                await _next(context);
                return;
            }

            if (context.User?.Identity?.IsAuthenticated == true)
            {
                var authContext = context.RequestServices.GetRequiredService<IIndAuthContextService>();
                try
                {
                    await authContext.EnsureFreshContextForRequestAsync();
                }
                catch (System.Exception ex)
                {
                    _logger.LogWarning(ex, "Auth context refresh middleware could not complete.");
                }
            }

            await _next(context);
        }

        private static bool ShouldSkip(HttpContext context)
        {
            var lowerPath = (context.Request.Path.Value ?? string.Empty).ToLowerInvariant();
            return lowerPath.StartsWith("/auth/login") ||
                   lowerPath.StartsWith("/auth/logout") ||
                   lowerPath.StartsWith("/auth/entralogin") ||
                   lowerPath.StartsWith("/api/auth/entra/context") ||
                   lowerPath.StartsWith("/signin-oidc") ||
                   lowerPath.StartsWith("/signout-callback-oidc") ||
                   lowerPath.StartsWith("/signout-oidc") ||
                   lowerPath.StartsWith("/css") ||
                   lowerPath.StartsWith("/js") ||
                   lowerPath.StartsWith("/lib") ||
                   lowerPath.StartsWith("/images") ||
                   lowerPath.StartsWith("/favicon");
        }
    }
}
