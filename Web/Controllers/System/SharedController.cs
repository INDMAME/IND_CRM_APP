using IND_CRM_APP.Extensions;
using IND_CRM_APP.Infrastructure.Security.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers;

// Renders unhandled failures without depending on authentication or the upstream API.
public sealed class SharedController : Controller
{
    private readonly ILogger<SharedController> _logger;

    public SharedController(ILogger<SharedController> logger)
    {
        _logger = logger;
    }

    // Renders browser status pages using only the original HTTP error code.
    [AcceptVerbs("GET", "HEAD")]
    [AllowAnonymous]
    [IndErrorEndpoint]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Status(int? code = null)
    {
        var status = code is >= 400 and <= 599 ? code.Value : StatusCodes.Status404NotFound;
        Response.StatusCode = status;
        return View("~/Web/Views/Shared/HttpError.cshtml", status);
    }

    // Exception re-execution retains the original method, including failed unsafe requests.
    [AllowAnonymous]
    [IndErrorEndpoint]
    [IgnoreAntiforgeryToken]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public async Task<IActionResult> Error()
    {
        var failure = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
        if (failure?.Error != null)
            _logger.LogError(failure.Error, "Unhandled exception on path: {Path}", failure.Path);

        Response.StatusCode = StatusCodes.Status500InternalServerError;
        if (CrmStatusCodePagesExtensions.RequiresDirectResponse(HttpContext, failure?.Path))
        {
            await CrmStatusCodePagesExtensions.WriteProblemAsync(HttpContext);
            return new EmptyResult();
        }

        return View("~/Web/Views/Shared/HttpError.cshtml", StatusCodes.Status500InternalServerError);
    }
}
