using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IND_CRM_APP.Infrastructure.Localization;
using Microsoft.Extensions.Localization;

namespace IND_CRM_APP.Extensions;

// Keeps API and unsafe-method errors out of the GET-only MVC error page.
public static class CrmStatusCodePagesExtensions
{
    // Fills empty error responses without replacing existing application payloads.
    public static IApplicationBuilder UseCrmStatusCodePages(this IApplicationBuilder app)
    {
        app.UseWhen(context => RequiresDirectResponse(context), branch =>
            branch.UseStatusCodePages(context => WriteProblemAsync(context.HttpContext)));
        app.UseWhen(context => !RequiresDirectResponse(context), branch =>
            branch.UseStatusCodePagesWithReExecute("/Shared/Status", "?code={0}"));
        return app;
    }

    // Only ordinary GET/HEAD navigation may render the friendly HTML error page.
    public static bool RequiresDirectResponse(HttpContext context, string? originalPath = null)
    {
        var request = context.Request;
        return (!HttpMethods.IsGet(request.Method) && !HttpMethods.IsHead(request.Method)) ||
            new PathString(originalPath ?? request.Path.Value).StartsWithSegments("/api") ||
            string.Equals(request.Headers["X-Requested-With"], "XMLHttpRequest", StringComparison.OrdinalIgnoreCase) ||
            request.Headers.Accept.Any(value =>
                value?.Contains("/json", StringComparison.OrdinalIgnoreCase) == true ||
                value?.Contains("+json", StringComparison.OrdinalIgnoreCase) == true);
    }

    // Writes the same localized problem shape for empty failures and unhandled exceptions.
    public static async Task WriteProblemAsync(HttpContext context)
    {
        var response = context.Response;
        var status = response.StatusCode;
        var localizer = context.RequestServices.GetRequiredService<IStringLocalizer<INDSharedResource>>();
        var titleKey = status switch
        {
            StatusCodes.Status401Unauthorized => "Api_SessionExpired",
            StatusCodes.Status403Forbidden => "Auth_PermissionDenied_Body",
            StatusCodes.Status404NotFound => "NotFound_Title",
            _ => "Api_RequestFailed"
        };
        response.Headers.CacheControl = "no-store";
        await response.WriteAsJsonAsync(new ProblemDetails
        {
            Status = status,
            Title = localizer[titleKey].Value
        }, options: null, contentType: "application/problem+json",
            cancellationToken: context.RequestAborted);
    }
}
