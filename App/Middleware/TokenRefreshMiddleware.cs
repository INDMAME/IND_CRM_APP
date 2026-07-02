using System;
using System.Text.Json;
using System.Threading.Tasks;
using IND_CRM_APP.Infrastructure.Security.Auth;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IND_CRM_APP.Middleware
{
    /// <summary>
    /// Middleware that checks the JWT on each request and refreshes it when near expiry.
    /// </summary>
    public class TokenRefreshMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TokenRefreshMiddleware> _logger;
        private readonly double _refreshThresholdMinutes;

        public TokenRefreshMiddleware(
            RequestDelegate next,
            ILogger<TokenRefreshMiddleware> logger,
            IOptions<JwtSettings> jwtOptions)
        {
            _next = next;
            _logger = logger;
            _refreshThresholdMinutes = jwtOptions?.Value?.RefreshThresholdMinutes > 0
                ? jwtOptions.Value.RefreshThresholdMinutes
                : 5.0;
        }

        public async Task Invoke(HttpContext context)
        {
            var path = context.Request.Path.Value ?? string.Empty;
            var lowerPath = path.ToLowerInvariant();

            // Skip public and static routes.
            if (lowerPath.StartsWith("/auth/login") ||
                lowerPath.StartsWith("/auth/logout") ||
                lowerPath.StartsWith("/auth/entralogin") ||
                lowerPath.StartsWith("/signin-oidc") ||
                lowerPath.StartsWith("/signout-callback-oidc") ||
                lowerPath.StartsWith("/signout-oidc") ||
                lowerPath.StartsWith("/css") ||
                lowerPath.StartsWith("/js") ||
                lowerPath.StartsWith("/lib") ||
                lowerPath.StartsWith("/images") ||
                lowerPath.StartsWith("/favicon"))
            {
                await _next(context);
                return;
            }

            // Resolve scoped services only for protected routes.
            var tokenSession = context.RequestServices.GetRequiredService<ITokenSessionService>();
            var apiClient = context.RequestServices.GetRequiredService<ICrmApiClient>();

            var (token, expiresUtc) = tokenSession.GetToken();

            if (!string.IsNullOrWhiteSpace(token) &&
                expiresUtc.HasValue)
            {
                var nowUtc = DateTime.UtcNow;
                var minutesLeft = (expiresUtc.Value - nowUtc).TotalMinutes;

                if (minutesLeft <= 0)
                {
                    tokenSession.Clear();
                    _logger.LogInformation("Token expired, rejecting request.");
                    await RejectExpiredSessionAsync(context);
                    return;
                }

                if (minutesLeft <= _refreshThresholdMinutes)
                {
                    try
                    {
                        _logger.LogInformation(
                            "Refreshing token. Minutes left before expiration {Minutes}",
                            minutesLeft);

                        var refreshResult = await apiClient.RefreshTokenAsync(token);

                        if (refreshResult != null &&
                            !string.IsNullOrWhiteSpace(refreshResult.Token))
                        {
                            var newExpires = refreshResult.Expires != default
                                ? refreshResult.Expires
                                : expiresUtc.Value.AddMinutes(_refreshThresholdMinutes);

                            tokenSession.SetToken(refreshResult.Token, newExpires);

                            _logger.LogInformation("Token refreshed successfully.");
                        }
                        else
                        {
                            tokenSession.Clear();
                            _logger.LogWarning("Token refresh returned an empty token. Rejecting request.");
                            await RejectExpiredSessionAsync(context);
                            return;
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error refreshing token.");
                        tokenSession.Clear();
                        await RejectExpiredSessionAsync(context);
                        return;
                    }
                }
            }

            await _next(context);
        }

        private static bool IsApiRequest(HttpRequest request)
        {
            if (request.Path.StartsWithSegments("/api"))
                return true;

            var accept = request.Headers["Accept"].ToString();
            if (!string.IsNullOrWhiteSpace(accept) &&
                accept.Contains("application/json", StringComparison.OrdinalIgnoreCase))
                return true;

            var requestedWith = request.Headers["X-Requested-With"].ToString();
            return string.Equals(requestedWith, "XMLHttpRequest", StringComparison.OrdinalIgnoreCase);
        }

        private static Task RejectExpiredSessionAsync(HttpContext context)
        {
            if (!IsApiRequest(context.Request))
            {
                context.Response.Redirect(LocalReturnUrlHelper.BuildLoginUrlWithReturnUrl(context.Request));
                return Task.CompletedTask;
            }

            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json; charset=utf-8";
            context.Response.Headers.CacheControl = "no-store";
            context.Response.Headers.Pragma = "no-cache";

            var payload = JsonSerializer.Serialize(new
            {
                Success = false,
                Message = "Your session has expired.",
                ErrorCode = "SESSION_EXPIRED",
                ForceRelogin = true,
                LoginUrl = LocalReturnUrlHelper.BuildLoginUrlWithReturnUrl(context.Request),
                Errors = Array.Empty<object>()
            });

            return context.Response.WriteAsync(payload);
        }
    }
}
