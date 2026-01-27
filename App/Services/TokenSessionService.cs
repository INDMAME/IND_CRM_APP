using IND_CRM_APP.Models.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Central service to manage JWT tokens in session.
    /// </summary>
    public class TokenSessionService : ITokenSessionService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly double _defaultMinutes;

        public TokenSessionService(
            IHttpContextAccessor httpContextAccessor,
            IOptions<JwtSettings> jwtOptions)
        {
            _httpContextAccessor = httpContextAccessor;
            _defaultMinutes = jwtOptions?.Value?.RefreshThresholdMinutes > 0
                ? jwtOptions.Value.RefreshThresholdMinutes
                : 5.0;
        }

        public void SetToken(string token, DateTime? expiresUtc = null)
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return;

            var expiration = expiresUtc ?? DateTime.UtcNow.AddMinutes(_defaultMinutes);

            ctx.Session.SetString("Token", token);
            ctx.Session.SetString("TokenExpires", expiration.ToString("o"));
        }

        public (string? Token, DateTime? ExpiresUtc) GetToken()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return (null, null);

            var token = ctx.Session.GetString("Token");
            var expString = ctx.Session.GetString("TokenExpires");

            if (!DateTime.TryParse(
                    expString,
                    null,
                    System.Globalization.DateTimeStyles.RoundtripKind,
                    out var expUtc))
            {
                return (token, null);
            }

            return (token, expUtc);
        }

        public void Clear()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return;

            // Only clear token fields so company selection/session context remains intact.
            ctx.Session.Remove("Token");
            ctx.Session.Remove("TokenExpires");
        }
    }
}
