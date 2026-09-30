using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Options;

namespace IND_CRM_APP.Infrastructure.Session;

// Keeps the accepted authentication boundary available throughout one request.
internal static class AuthenticationSessionRequest
{
    internal const string AnonymousFamilyKey = "INDAuthAnonymousFamily";
    private static readonly object IdentityKey = new();
    private static readonly object ResponseKey = new();
    private static readonly object OriginalSessionKey = new();
    private static readonly object RejectedKey = new();
    private static readonly object UnavailableKey = new();

    // Cookie validation binds identity before any business middleware executes.
    internal static void Bind(HttpContext http, AuthenticationSessionIdentity identity)
    {
        http.Items[IdentityKey] = identity;
        GuardResponse(http, identity.Family, identity.Revision);
    }

    // Records rejected cookies without deleting a potentially newer browser cookie.
    internal static void Reject(HttpContext http)
    {
        http.Items[RejectedKey] = true;
        PrepareResponse(http);
    }
    internal static bool IsRejected(HttpContext http) => http.Items.ContainsKey(RejectedKey);
    // Capacity failures are temporary and must not turn into repeated login redirects.
    internal static void SetUnavailable(HttpContext http)
    {
        http.Items[UnavailableKey] = true;
        http.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
        http.Response.Headers.RetryAfter = "60";
        http.Response.Headers.CacheControl = "no-store";
    }
    internal static bool IsUnavailable(HttpContext http) => http.Items.ContainsKey(UnavailableKey);
    internal static AuthenticationSessionIdentity? GetIdentity(HttpContext http)
        => http.Items.TryGetValue(IdentityKey, out var identity) ? identity as AuthenticationSessionIdentity : null;

    // The original framework session retains anonymous TempData and login attempts.
    internal static void SetOriginalSession(HttpContext http, ISession session)
        => http.Items[OriginalSessionKey] = session;

    // Async completions can test their original login without reading another session.
    internal static bool IsCurrent(HttpContext http)
    {
        var identity = GetIdentity(http);
        return !IsRejected(http) && (identity == null || Registry(http).IsCurrent(identity));
    }

    // Only the active login may clear authentication or its company preference.
    internal static bool TryClose(HttpContext http)
    {
        var identity = GetIdentity(http);
        if (identity != null)
        {
            var revision = Registry(http).Close(identity);
            if (!revision.HasValue)
                return false;
            GuardResponse(http, identity.Family, revision.Value);
            if (http.Items.TryGetValue(OriginalSessionKey, out var original) && original is ISession session)
                http.Session = session;
            return true;
        }
        if (IsRejected(http))
            return false;
        var family = http.Session.GetString(AnonymousFamilyKey);
        if (!string.IsNullOrWhiteSpace(family))
        {
            var revision = Registry(http).CancelAnonymous(family);
            if (revision.HasValue)
                GuardResponse(http, family, revision.Value);
        }
        return true;
    }

    // Drops stale cookie mutations immediately before headers are sent.
    private static void GuardResponse(HttpContext http, string family, long revision)
    {
        PrepareResponse(http);
        var boundary = (ResponseBoundary)http.Items[ResponseKey]!;
        boundary.Family = family;
        boundary.Revision = revision;
    }

    // Register before authentication so this runs after the framework's sliding renewal.
    internal static void PrepareResponse(HttpContext http)
    {
        if (http.Items.ContainsKey(ResponseKey))
            return;
        var boundary = new ResponseBoundary();
        http.Items[ResponseKey] = boundary;
        http.Response.OnStarting(() =>
        {
            var stale = boundary.Family.Length > 0 && !Registry(http).IsRevision(boundary.Family, boundary.Revision);
            if (stale || IsRejected(http))
            {
                var authName = http.RequestServices.GetRequiredService<IOptionsMonitor<CookieAuthenticationOptions>>()
                    .Get(CookieAuthenticationDefaults.AuthenticationScheme).Cookie.Name!;
                var sessionName = http.RequestServices.GetRequiredService<IOptions<SessionOptions>>().Value.Cookie.Name!;
                var retained = http.Response.Headers.SetCookie.Where(value =>
                    !IsCookie(value, authName) && (!stale || !IsCookie(value, sessionName)) &&
                    !IsCookie(value, "IND_CRM_APP.SelectedCompany")).ToArray();
                http.Response.Headers.SetCookie = retained;
            }
            return Task.CompletedTask;
        });
    }

    // Also recognizes chunks emitted by the framework cookie manager.
    private static bool IsCookie(string? value, string name)
    {
        var separator = value?.IndexOf('=') ?? -1;
        if (separator < 0)
            return false;
        var key = value![..separator];
        return key == name || (key.StartsWith(name + "C", StringComparison.Ordinal) &&
            key[(name.Length + 1)..].Length > 0 && key[(name.Length + 1)..].All(char.IsAsciiDigit));
    }

    // Resolves the singleton without holding scoped services beyond the request.
    private static AuthenticationSessionRegistry Registry(HttpContext http)
        => http.RequestServices.GetRequiredService<AuthenticationSessionRegistry>();

    // Logout updates the permitted response revision while retaining the same callback.
    private sealed class ResponseBoundary
    {
        internal string Family = string.Empty;
        internal long Revision;
    }
}
