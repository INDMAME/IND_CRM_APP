using System;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IND_CRM_APP.Middleware
{
    /// <summary>
    /// Middleware que revisa el token JWT en cada petición y lo refresca si está cerca de caducar.
    /// Propaga X-Refreshed-Token cuando se obtiene un token nuevo.
    /// </summary>
    public class TokenRefreshMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ICrmApiClient _apiClient;
        private readonly ITokenSessionService _tokenSession;
        private readonly ILogger<TokenRefreshMiddleware> _logger;
        private readonly double _refreshThresholdMinutes;

        public TokenRefreshMiddleware(
            RequestDelegate next,
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            ILogger<TokenRefreshMiddleware> logger,
            IOptions<JwtSettings> jwtOptions)
        {
            _next = next;
            _apiClient = apiClient;
            _tokenSession = tokenSession;
            _logger = logger;
            _refreshThresholdMinutes = jwtOptions?.Value?.RefreshThresholdMinutes > 0
                ? jwtOptions.Value.RefreshThresholdMinutes
                : 5.0;
        }

        public async Task Invoke(HttpContext context)
        {
            var path = context.Request.Path.Value ?? string.Empty;
            var lowerPath = path.ToLowerInvariant();

            // Omitir rutas públicas/estáticas
            if (lowerPath.StartsWith("/auth/login") ||
                lowerPath.StartsWith("/auth/logout") ||
                lowerPath.StartsWith("/css") ||
                lowerPath.StartsWith("/js") ||
                lowerPath.StartsWith("/lib") ||
                lowerPath.StartsWith("/images") ||
                lowerPath.StartsWith("/favicon"))
            {
                await _next(context);
                return;
            }

            var (token, expiresUtc) = _tokenSession.GetToken();

            if (!string.IsNullOrWhiteSpace(token) &&
                expiresUtc.HasValue)
            {
                var nowUtc = DateTime.UtcNow;
                var minutesLeft = (expiresUtc.Value - nowUtc).TotalMinutes;

                if (minutesLeft <= 0)
                {
                    _tokenSession.Clear();
                    _logger.LogInformation("Token expired, redirecting to login.");
                    context.Response.Redirect("/Auth/Login");
                    return;
                }

                if (minutesLeft <= _refreshThresholdMinutes)
                {
                    try
                    {
                        _logger.LogInformation(
                            "Refreshing token. Minutes left before expiration {Minutes}",
                            minutesLeft);

                        var refreshResult = await _apiClient.RefreshTokenAsync(token);

                        if (refreshResult != null &&
                            !string.IsNullOrWhiteSpace(refreshResult.Token))
                        {
                            var newExpires = refreshResult.Expires != default
                                ? refreshResult.Expires
                                : expiresUtc.Value.AddMinutes(_refreshThresholdMinutes);

                            _tokenSession.SetToken(refreshResult.Token, newExpires);

                            _logger.LogInformation("Token refreshed successfully.");
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error refreshing token.");
                        // Continuamos; la siguiente llamada podrá forzar re-login si falla
                    }
                }
            }

            await _next(context);
        }
    }
}
