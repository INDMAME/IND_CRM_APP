using IND_CRM_APP.Middleware;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using Microsoft.AspNetCore.Diagnostics;
using IND_CRM_APP.Infrastructure.Security.Auth;
using IND_CRM_APP.Infrastructure.Security.Filters;
using IND_CRM_APP.Infrastructure.Validation;
using System.Reflection;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using System.Globalization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Routing.Constraints;
using System.Security.Claims;
using System.IO;
using System.Security.Cryptography;



// Resolve the correct web root for dev vs publish output.
static bool HasExpectedStaticAssets(string path)
{
    if (!Directory.Exists(path))
        return false;

    // Detect a usable web root by checking canonical static asset folders/files.
    var cssTailwind = Path.Combine(path, "css", "tailwind.css");
    var jsDir = Path.Combine(path, "js");
    var imagesDir = Path.Combine(path, "images");

    return File.Exists(cssTailwind)
           || Directory.Exists(jsDir)
           || Directory.Exists(imagesDir);
}

static string ResolveWebRoot()
{
    var startPaths = new[]
    {
        AppContext.BaseDirectory,
        Directory.GetCurrentDirectory()
    };

    foreach (var start in startPaths)
    {
        var current = start;
        while (!string.IsNullOrWhiteSpace(current))
        {
            var webRoot = Path.Combine(current, "Web", "wwwroot");
            var root = Path.Combine(current, "wwwroot");

            // In publish output both folders may exist, but only one contains full static assets.
            if (HasExpectedStaticAssets(root))
                return root;

            if (HasExpectedStaticAssets(webRoot))
                return webRoot;

            if (Directory.Exists(webRoot) && Directory.EnumerateFileSystemEntries(webRoot).Any())
                return webRoot;

            if (Directory.Exists(root) && Directory.EnumerateFileSystemEntries(root).Any())
                return root;

            if (Directory.Exists(webRoot))
                return webRoot;

            if (Directory.Exists(root))
                return root;

            current = Directory.GetParent(current)?.FullName;
        }
    }

    return "wwwroot";
}

var resolvedWebRoot = ResolveWebRoot();
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = resolvedWebRoot
});
builder.WebHost.ConfigureKestrel(options =>
{
    // Reduce server fingerprinting.
    options.AddServerHeader = false;
});

// -----------------------------
// Servicios
// -----------------------------
//builder.Services.AddResponseCompression();
// Point localization to the new Resources root.
builder.Services.AddLocalization(options => options.ResourcesPath = "App/Resources");

builder.Services
    .AddControllersWithViews(options =>
    {
        // Enforce antiforgery validation on unsafe HTTP verbs.
        options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
        // Enforce module authorization for MVC actions.
        options.Filters.AddService<INDModuleAuthorizeFilter>();
    })
    .AddSessionStateTempDataProvider()
    .AddViewLocalization(Microsoft.AspNetCore.Mvc.Razor.LanguageViewLocationExpanderFormat.Suffix)
    .AddDataAnnotationsLocalization();

// Add view locations for Web/Views after reorganizing folders.
builder.Services.Configure<RazorViewEngineOptions>(options =>
{
    options.ViewLocationFormats.Insert(0, "/Web/Views/{1}/{0}.cshtml");
    options.ViewLocationFormats.Insert(1, "/Web/Views/Shared/{0}.cshtml");
    options.AreaViewLocationFormats.Insert(0, "/Web/Areas/{2}/Views/{1}/{0}.cshtml");
    options.AreaViewLocationFormats.Insert(1, "/Web/Areas/{2}/Views/Shared/{0}.cshtml");
});

builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "RequestVerificationToken";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
        ? CookieSecurePolicy.SameAsRequest
        : CookieSecurePolicy.Always;
});

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    // UI localization only. Do not translate business data.
    var supportedCultures = new[]
    {
        new CultureInfo("es-ES"),
        new CultureInfo("eu-ES"),
        new CultureInfo("en"),
        new CultureInfo("pt"),
        new CultureInfo("it"),
        new CultureInfo("zh-Hans")
    };

    options.DefaultRequestCulture = new RequestCulture("es-ES");
    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;

    // Ensure cookie-based culture is evaluated first.
    options.RequestCultureProviders.Insert(0, new CookieRequestCultureProvider());
});
builder.Services.AddHttpClient<ICrmApiClient, ApiClientService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
    options.Cookie.Name = "IND_CRM_APP.Auth";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
        ? CookieSecurePolicy.SameAsRequest
        : CookieSecurePolicy.Always;
    options.LoginPath = "/Auth/Login";
    options.AccessDeniedPath = "/Auth/Login";
})
.AddOpenIdConnect(options =>
{
    options.Authority = IndAuthEnv.Authority;
    // Allow HTTP metadata only in Development.
    options.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
    options.ClientId = IndAuthEnv.ClientId;
    options.ClientSecret = IndAuthEnv.ClientSecret;
    options.CallbackPath = IndAuthEnv.RedirectPath;
    options.ResponseType = "code";
    options.GetClaimsFromUserInfoEndpoint = true;
    options.SaveTokens = false;
    options.Scope.Clear();
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = IndAuthEnv.ClaimEmailPreferred
    };
    options.Events = new OpenIdConnectEvents
    {
        OnTokenValidated = context =>
        {
            var httpContext = context.HttpContext;
            var logger = httpContext.RequestServices.GetRequiredService<ILogger<Program>>();
            var principal = context.Principal;
            var oid = principal?.FindFirst(IndAuthEnv.ClaimOid)?.Value
                      ?? principal?.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;

            // Log Entra OID to help diagnose Entra user mapping issues.
            if (string.IsNullOrWhiteSpace(oid))
                logger.LogWarning("Entra OID claim missing in token.");
            else
                logger.LogInformation("Entra OID received: {EntraOid}", oid);

            if (!string.IsNullOrWhiteSpace(oid))
                httpContext.Session.SetString("ENTRAOID", oid);

            // Always clear cached context on a fresh Entra sign-in.
            const string contextKey = "INDWebContext";
            const string companyKey = "INDCompanySelected";
            const string companyNameKey = "INDCompanySelectedName";
            const string contextOidKey = "INDEntraOidContext";
            httpContext.Session.Remove(contextKey);
            httpContext.Session.Remove(companyKey);
            httpContext.Session.Remove(companyNameKey);
            httpContext.Session.Remove(contextOidKey);
            httpContext.Session.Remove("AxUser");
            logger.LogInformation("Cleared cached context after Entra sign-in.");

            var preferred = principal?.FindFirst(IndAuthEnv.ClaimEmailPreferred)?.Value;
            var email = preferred
                        ?? principal?.FindFirst("email")?.Value
                        ?? principal?.FindFirst(ClaimTypes.Email)?.Value;
            var display = email ?? principal?.Identity?.Name ?? string.Empty;

            if (!string.IsNullOrWhiteSpace(display))
                httpContext.Session.SetString("Username", display);

            return Task.CompletedTask;
        },
        OnRedirectToIdentityProvider = context =>
        {
            if (context.Properties?.Items == null)
                return Task.CompletedTask;

            if (context.Properties.Items.TryGetValue("prompt", out var prompt) && !string.IsNullOrWhiteSpace(prompt))
            {
                context.ProtocolMessage.Prompt = prompt;
            }

            if (context.Properties.Items.TryGetValue("max_age", out var maxAge) && !string.IsNullOrWhiteSpace(maxAge))
            {
                context.ProtocolMessage.MaxAge = maxAge;
            }

            return Task.CompletedTask;
        }
    };
    // OIDC callback is a cross-site POST, so correlation/nonce must be SameSite=None.
    options.CorrelationCookie.SameSite = SameSiteMode.None;
    options.NonceCookie.SameSite = SameSiteMode.None;
    options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.Always;
    options.NonceCookie.SecurePolicy = CookieSecurePolicy.Always;
});
builder.Services.AddAuthorization();
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    // Allow OIDC correlation/nonce cookies to use SameSite=None.
    options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
    options.Secure = builder.Environment.IsDevelopment()
        ? CookieSecurePolicy.SameAsRequest
        : CookieSecurePolicy.Always;
});
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
        ? CookieSecurePolicy.SameAsRequest
        : CookieSecurePolicy.Always;
});

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Logging.AddFile("Logs/indpersonasapp-{Date}.log");
builder.Services.AddMemoryCache();
builder.Services.Configure<ApiSettings>(builder.Configuration.GetSection("ApiSettings"));
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.AddScoped<ITokenSessionService, TokenSessionService>();
builder.Services.AddScoped<IIndAuthContextService, IndAuthContextService>();
builder.Services.AddScoped<IINDCrmEnumLocalizer, INDCrmEnumLocalizer>();
builder.Services.AddScoped<ICrmEnumCatalog, CrmEnumCatalog>();
builder.Services.AddScoped<INDModuleAuthorizeFilter>();
builder.Logging.AddFilter("System.Net.Http.HttpClient", LogLevel.Information);

// -----------------------------
// Middleware validation
// -----------------------------
// Scan loaded assemblies and fail startup if a middleware has a scoped dependency in its constructor.
MiddlewareValidation.ValidateMiddlewares(
    builder.Services,
    AppDomain.CurrentDomain.GetAssemblies()
);

var app = builder.Build();

// -----------------------------
// Middlewares
// -----------------------------
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler(errorApp =>
    {
        errorApp.Run(async context =>
        {
            var feature = context.Features.Get<IExceptionHandlerPathFeature>();
            var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();

            if (feature?.Error != null)
            {
                logger.LogError(feature.Error, "Unhandled exception on path: {Path}", feature.Path);
            }

            context.Response.Redirect("/Shared/Error");
        });
    });

    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    var cspNonce = Convert.ToBase64String(RandomNumberGenerator.GetBytes(16));
    context.Items["CspNonce"] = cspNonce;

    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["X-Frame-Options"] = "DENY";
    context.Response.Headers["Permissions-Policy"] = "camera=(), microphone=(self), geolocation=()";
    context.Response.Headers["Content-Security-Policy"] =
        "default-src 'self'; " +
        "base-uri 'self'; " +
        "frame-ancestors 'none'; " +
        "form-action 'self'; " +
        $"script-src 'self' 'nonce-{cspNonce}'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "img-src 'self' data: blob:; " +
        "connect-src 'self'; " +
        "media-src 'self' blob:; " +
        "worker-src 'self' blob:;";

    await next();
});

//app.UseResponseCompression();
app.UseStaticFiles();
app.UseRequestLocalization(app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>().Value);
app.UseRouting();
// Friendly 404 page for missing routes.
app.UseStatusCodePagesWithReExecute("/Home/NotFound", "?code={0}");
app.UseCookiePolicy();
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();
// Token refresh middleware
app.UseMiddleware<TokenRefreshMiddleware>();

// -----------------------------
// Rutas MVC
// -----------------------------
app.MapControllerRoute(
    name: "api-auth-entra-context",
    pattern: "api/auth/entra/context",
    defaults: new { controller = "Auth", action = "ApiEntraContext" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-list",
    pattern: "api/crm/expensesheets/list",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetsList" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-currencies",
    pattern: "api/crm/expensesheets/currencies",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetsCurrencies" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("GET") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-subordinates",
    pattern: "api/crm/expensesheets/subordinates",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetsSubordinates" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("GET") }
);

app.MapControllerRoute(
    name: "api-system-exchange-rate",
    pattern: "api/system/exchange-rate",
    defaults: new { controller = "Gastos", action = "ApiSystemExchangeRate" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("GET") }
);

app.MapControllerRoute(
    name: "api-system-exchange-rate-public-direct",
    pattern: "api/system/exchange-rate/public-direct",
    defaults: new { controller = "Gastos", action = "ApiSystemExchangeRatePublicDirect" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("GET") }
);

app.MapControllerRoute(
    name: "api-expense-from-ticket",
    pattern: "api/ia/service/expensefromticket",
    defaults: new { controller = "Gastos", action = "ApiExpenseFromTicket" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-create",
    pattern: "api/crm/expensesheets",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetsCreate" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-fuel-price-km",
    pattern: "api/crm/expensesheets/fuel-price-km",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetFuelPriceKm" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("GET") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-tickets-create",
    pattern: "api/crm/expensesheets/tickets",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketsCreate" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-tickets-list",
    pattern: "api/crm/expensesheets/tickets/list",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketsList" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-detail",
    pattern: "api/crm/expensesheets/tickets/{fileId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketDetail" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("GET") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-update",
    pattern: "api/crm/expensesheets/tickets/{fileId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketUpdate" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("PUT") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-delete",
    pattern: "api/crm/expensesheets/tickets/{fileId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketDelete" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("DELETE") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-apply-ia",
    pattern: "api/crm/expensesheets/tickets/{fileId}/ia",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketApplyIa" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-line-create",
    pattern: "api/crm/expensesheets/tickets/{fileId}/lines",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketLineCreate" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-line-update",
    pattern: "api/crm/expensesheets/tickets/{fileId}/lines/{lineRecId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketLineUpdate" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("PUT") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-line-delete",
    pattern: "api/crm/expensesheets/tickets/{fileId}/lines/{lineRecId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketLineDelete" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("DELETE") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-file-upload",
    pattern: "api/crm/expensesheets/tickets/{fileId}/file",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketFileUpload" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("POST") }
);

app.MapControllerRoute(
    name: "api-expense-sheet-ticket-file-delete",
    pattern: "api/crm/expensesheets/tickets/{fileId}/file",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetTicketFileDelete" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("DELETE") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-detail",
    pattern: "api/crm/expensesheets/{hojaGastosId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetDetail" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("GET") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-update",
    pattern: "api/crm/expensesheets/{hojaGastosId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetUpdate" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("PUT") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-line-update",
    pattern: "api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetLineUpdate" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("PUT") }
);

app.MapControllerRoute(
    name: "api-expense-sheets-line-delete",
    pattern: "api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}",
    defaults: new { controller = "Gastos", action = "ApiExpenseSheetLineDelete" },
    constraints: new { httpMethod = new HttpMethodRouteConstraint("DELETE") }
);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Login}/{id?}" 
);


app.Run();
