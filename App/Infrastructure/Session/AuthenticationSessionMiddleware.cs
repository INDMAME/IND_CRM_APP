using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace IND_CRM_APP.Infrastructure.Session;

// Isolates session data by protected login generation instead of the anonymous session cookie.
internal sealed class AuthenticationSessionMiddleware(RequestDelegate next, IOptions<SessionOptions> options)
{
    // Keeps normal session expiry and concurrent merges within one authenticated login.
    public async Task InvokeAsync(HttpContext http, ISessionStore store, AuthenticationSessionRegistry registry)
    {
        if (AuthenticationSessionRequest.IsUnavailable(http))
            return;
        if (AuthenticationSessionRequest.IsRejected(http))
        {
            http.Response.Headers.CacheControl = "no-store";
            if (IsRecoveryPath(http.Request.Path))
            {
                await next(http);
                return;
            }
            if (http.Request.Path.StartsWithSegments("/api") ||
                http.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                http.Response.StatusCode = StatusCodes.Status401Unauthorized;
            else
                http.Response.Redirect("/Auth/Login?loggedOut=true");
            return;
        }
        var identity = AuthenticationSessionRequest.GetIdentity(http);
        if (identity == null)
        {
            await next(http);
            return;
        }
        var original = http.Session;
        // Establish the anonymous session before headers start so logout TempData still works.
        original.SetString(AuthenticationSessionRequest.AnonymousFamilyKey, identity.Family);
        var session = store.Create(CacheKey(identity), options.Value.IdleTimeout, options.Value.IOTimeout, () => true, false);
        AuthenticationSessionRequest.SetOriginalSession(http, original);
        http.Session = session;
        try
        {
            await session.LoadAsync(http.RequestAborted);
            var previousOid = session.GetString("ENTRAOID");
            if (!string.IsNullOrEmpty(previousOid) &&
                !string.Equals(previousOid, identity.EntraOid, StringComparison.OrdinalIgnoreCase))
                session.Clear();
            session.SetString("ENTRAOID", identity.EntraOid);
            var display = http.User.FindFirst("preferred_username")?.Value ?? http.User.FindFirst("email")?.Value ??
                http.User.FindFirst(ClaimTypes.Email)?.Value ?? http.User.Identity?.Name;
            if (!string.IsNullOrWhiteSpace(display))
                session.SetString("Username", display);
            await next(http);
        }
        finally
        {
            try
            {
                if (registry.IsCurrent(identity))
                    await session.CommitAsync();
            }
            finally
            {
                http.Session = original;
            }
        }
    }

    // Opaque generations contain no user or company data and never reuse an older login key.
    internal static string CacheKey(AuthenticationSessionIdentity identity) => "IND.AuthenticatedSession:" + identity.Generation;

    // A rejected old cookie must still allow the login page and a new explicit OIDC challenge.
    private static bool IsRecoveryPath(PathString path)
    {
        var value = (path.Value ?? string.Empty).TrimEnd('/');
        return value.Equals("/Auth/Login", StringComparison.OrdinalIgnoreCase) ||
               value.Equals("/Auth/EntraLogin", StringComparison.OrdinalIgnoreCase);
    }
}
