using System;
using System.Threading.Tasks;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Middleware
{
    // Middleware que revisa el token JWT en cada peticion
    // Si esta cerca de caducar intenta refrescarlo
    public class TokenRefreshMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ICrmApiClient _apiClient;
        private readonly ILogger<TokenRefreshMiddleware> _logger;

        // Margen en minutos para refrescar el token antes de que caduque
        private const double RefreshThresholdMinutes = 5.0;

        // El logger se inyecta por constructor junto con el cliente de API
        public TokenRefreshMiddleware(
            RequestDelegate next,
            ICrmApiClient apiClient,
            ILogger<TokenRefreshMiddleware> logger)
        {
            _next = next;
            _apiClient = apiClient;
            _logger = logger;
        }

        // Metodo principal del middleware
        public async Task Invoke(HttpContext context)
        {
            var path = context.Request.Path.Value ?? string.Empty;
            var lowerPath = path.ToLowerInvariant();

            // Omitir rutas de login, logout y archivos estaticos
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

            // Leer el token y su fecha de expiracion desde Session
            var token = context.Session.GetString("Token");
            var expiresString = context.Session.GetString("TokenExpires");

            if (!string.IsNullOrWhiteSpace(token) &&
                !string.IsNullOrWhiteSpace(expiresString) &&
                DateTime.TryParse(
                    expiresString,
                    null,
                    System.Globalization.DateTimeStyles.RoundtripKind,
                    out var expiresUtc))
            {
                var nowUtc = DateTime.UtcNow;
                var minutesLeft = (expiresUtc - nowUtc).TotalMinutes;

                // Si el token ya esta caducado, limpiar sesion y redirigir a login
                if (minutesLeft <= 0)
                {
                    context.Session.Clear();
                    _logger.LogInformation("Token expired, redirecting to login.");
                    context.Response.Redirect("/Auth/Login");
                    return;
                }

                // Si el token esta vivo pero cerca de caducar intentamos refrescarlo
                if (minutesLeft <= RefreshThresholdMinutes)
                {
                    try
                    {
                        _logger.LogInformation(
                            "Refreshing token. Minutes left before expiration {Minutes}",
                            minutesLeft
                        );

                        var refreshResult = await _apiClient.RefreshTokenAsync(token);

                        // Si la API devuelve un nuevo token valido lo guardamos en Session
                        if (refreshResult != null &&
                            !string.IsNullOrWhiteSpace(refreshResult.Token))
                        {
                            context.Session.SetString("Token", refreshResult.Token);

                            // Guardar nueva fecha de expiracion en formato ISO
                            context.Session.SetString(
                                "TokenExpires",
                                refreshResult.Expires.ToString("o")
                            );

                            _logger.LogInformation("Token refreshed successfully.");
                        }
                    }
                    catch (Exception ex)
                    {
                        // Si el refresh falla se deja continuar la peticion
                        // La proxima llamada a la API puede fallar y llevar al login
                        _logger.LogError(ex, "Error refreshing token.");
                    }
                }
            }

            // Continuar con el siguiente middleware o controlador
            await _next(context);
        }
    }
}
