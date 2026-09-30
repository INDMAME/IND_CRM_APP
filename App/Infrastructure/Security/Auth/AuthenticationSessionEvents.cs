using IND_CRM_APP.Infrastructure.Session;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.Options;
using System.Globalization;
using System.Security.Cryptography;

namespace IND_CRM_APP.Infrastructure.Security.Auth;

// Connects protected authentication tickets and OIDC state to the session lifecycle.
internal static class AuthenticationSessionEvents
{
    private const string FamilyKey = ".ind.auth.family";
    private const string GenerationKey = ".ind.auth.generation";
    private const string RevisionKey = ".ind.auth.revision";
    private const string AttemptKey = ".ind.auth.attempt";
    private const string AttemptIssuedKey = ".ind.auth.attempt-issued";

    // Validates each cookie before it can initialize session or call the API.
    internal static Task ValidateCookie(CookieValidatePrincipalContext context)
    {
        try
        {
            return ValidateCookieCore(context);
        }
        catch (AuthenticationSessionCapacityException)
        {
            RejectCookie(context);
            AuthenticationSessionRequest.SetUnavailable(context.HttpContext);
            return Task.CompletedTask;
        }
    }

    // Recovers existing tickets while retaining the original authentication lifetime.
    private static Task ValidateCookieCore(CookieValidatePrincipalContext context)
    {
        var oid = GetOid(context.Principal);
        var properties = context.Properties;
        var expires = properties.ExpiresUtc;
        if (string.IsNullOrWhiteSpace(oid) || !expires.HasValue)
        {
            RejectCookie(context);
            return Task.CompletedTask;
        }
        if (!properties.Items.TryGetValue(GenerationKey, out var generation) || string.IsNullOrWhiteSpace(generation))
        {
            // Existing protected cookies migrate consistently across overlapping requests.
            var ticket = new AuthenticationTicket(context.Principal!, properties, context.Scheme.Name);
            generation = Convert.ToHexString(SHA256.HashData(TicketSerializer.Default.Serialize(ticket)));
            properties.Items[GenerationKey] = generation;
            properties.Items[FamilyKey] = generation;
            properties.Items[RevisionKey] = "0";
            context.ShouldRenew = true;
        }
        var family = Read(properties, FamilyKey);
        if (string.IsNullOrWhiteSpace(family) || !long.TryParse(Read(properties, RevisionKey),
                NumberStyles.None, CultureInfo.InvariantCulture, out var revision))
        {
            RejectCookie(context);
            return Task.CompletedTask;
        }
        var identity = new AuthenticationSessionIdentity(family, generation, oid, revision, expires.Value);
        var registry = context.HttpContext.RequestServices.GetRequiredService<AuthenticationSessionRegistry>();
        if (!registry.Validate(identity, DateTimeOffset.UtcNow.Add(context.Options.ExpireTimeSpan)))
            RejectCookie(context);
        else
            AuthenticationSessionRequest.Bind(context.HttpContext, identity);
        return Task.CompletedTask;
    }

    // Reserves a browser-local attempt before the identity provider can reorder callbacks.
    internal static bool BeginLogin(RedirectContext context)
    {
        try
        {
            return BeginLoginCore(context);
        }
        catch (AuthenticationSessionCapacityException)
        {
            context.HandleResponse();
            AuthenticationSessionRequest.SetUnavailable(context.HttpContext);
            return false;
        }
    }

    // A challenge carries its lineage in the protocol's protected state.
    private static bool BeginLoginCore(RedirectContext context)
    {
        var http = context.HttpContext;
        var identity = AuthenticationSessionRequest.GetIdentity(http);
        var family = identity?.Family ?? http.Session.GetString(AuthenticationSessionRequest.AnonymousFamilyKey);
        if (string.IsNullOrWhiteSpace(family))
        {
            family = Guid.NewGuid().ToString("N");
            http.Session.SetString(AuthenticationSessionRequest.AnonymousFamilyKey, family);
        }
        var attempt = http.RequestServices.GetRequiredService<AuthenticationSessionRegistry>()
            .Begin(family, identity, context.Options.RemoteAuthenticationTimeout);
        if (attempt == null)
        {
            context.HandleResponse();
            context.Response.Redirect("/Auth/Login?loggedOut=true");
            return false;
        }
        context.Properties.Items[FamilyKey] = attempt.Family;
        context.Properties.Items[AttemptKey] = attempt.Revision.ToString(CultureInfo.InvariantCulture);
        context.Properties.Items[AttemptIssuedKey] = attempt.IssuedUtc.ToString("O", CultureInfo.InvariantCulture);
        return true;
    }

    // Activates only after OIDC protocol validation, without requiring a callback session cookie.
    internal static Task CompleteLogin(TicketReceivedContext context)
    {
        try
        {
            return CompleteLoginCore(context);
        }
        catch (AuthenticationSessionCapacityException)
        {
            context.HandleResponse();
            AuthenticationSessionRequest.SetUnavailable(context.HttpContext);
            return Task.CompletedTask;
        }
    }

    // An accepted callback starts with empty session data on its first authenticated request.
    private static Task CompleteLoginCore(TicketReceivedContext context)
    {
        var properties = context.Properties!;
        var family = Read(properties, FamilyKey);
        var oid = GetOid(context.Principal);
        var timeout = context.Options.RemoteAuthenticationTimeout;
        AuthenticationSessionIdentity? identity = null;
        if (!string.IsNullOrWhiteSpace(family) && !string.IsNullOrWhiteSpace(oid) &&
            long.TryParse(Read(properties, AttemptKey), NumberStyles.None,
                CultureInfo.InvariantCulture, out var revision) &&
            DateTimeOffset.TryParseExact(Read(properties, AttemptIssuedKey), "O",
                CultureInfo.InvariantCulture, DateTimeStyles.None, out var issued))
        {
            var cookie = context.HttpContext.RequestServices.GetRequiredService<IOptionsMonitor<CookieAuthenticationOptions>>()
                .Get(CookieAuthenticationDefaults.AuthenticationScheme);
            var now = DateTimeOffset.UtcNow;
            properties.IssuedUtc ??= now;
            properties.ExpiresUtc ??= now.Add(cookie.ExpireTimeSpan);
            identity = context.HttpContext.RequestServices.GetRequiredService<AuthenticationSessionRegistry>()
                .Activate(new(family, revision, issued), oid, properties.ExpiresUtc.Value, timeout);
        }
        if (identity == null)
        {
            context.HandleResponse();
            context.Response.Redirect("/Auth/Login?loggedOut=true");
            return Task.CompletedTask;
        }
        properties.Items[FamilyKey] = identity.Family;
        properties.Items[GenerationKey] = identity.Generation;
        properties.Items[RevisionKey] = identity.Revision.ToString(CultureInfo.InvariantCulture);
        properties.Items.Remove(AttemptKey);
        properties.Items.Remove(AttemptIssuedKey);
        AuthenticationSessionRequest.Bind(context.HttpContext, identity);
        return Task.CompletedTask;
    }

    // Missing metadata is rejected instead of being synthesized for a new ticket.
    private static string? Read(AuthenticationProperties properties, string key)
        => properties.Items.TryGetValue(key, out var value) ? value : null;

    // Both claim forms are already accepted by the app's Entra context service.
    private static string? GetOid(System.Security.Claims.ClaimsPrincipal? principal)
        => principal?.FindFirst(IndAuthEnv.ClaimOid)?.Value ??
           principal?.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;

    // Rejection leaves cookie deletion to an explicit current-session logout.
    private static void RejectCookie(CookieValidatePrincipalContext context)
    {
        context.RejectPrincipal();
        context.ShouldRenew = false;
        AuthenticationSessionRequest.Reject(context.HttpContext);
    }
}
