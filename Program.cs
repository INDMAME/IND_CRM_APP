using IND_CRM_APP.Middleware;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using Microsoft.AspNetCore.Diagnostics;
using IND_CRM_APP.Infrastructure;
using System.Reflection;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Globalization;



var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(options =>
{
    // Reduce server fingerprinting.
    options.AddServerHeader = false;
});

// -----------------------------
// Servicios
// -----------------------------
//builder.Services.AddResponseCompression();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

builder.Services
    .AddControllersWithViews(options =>
    {
        // Enforce antiforgery validation on unsafe HTTP verbs.
        options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
    })
    .AddSessionStateTempDataProvider()
    .AddViewLocalization(Microsoft.AspNetCore.Mvc.Razor.LanguageViewLocationExpanderFormat.Suffix)
    .AddDataAnnotationsLocalization();

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
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Lax;
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
builder.Services.AddScoped<IINDCrmEnumLocalizer, INDCrmEnumLocalizer>();
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
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["X-Frame-Options"] = "DENY";
    context.Response.Headers["Permissions-Policy"] = "camera=(), microphone=(self), geolocation=()";
    context.Response.Headers["Content-Security-Policy"] =
        "default-src 'self'; " +
        "base-uri 'self'; " +
        "frame-ancestors 'none'; " +
        "form-action 'self'; " +
        "script-src 'self' 'unsafe-inline'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "img-src 'self' data:; " +
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
// Token refresh middleware
app.UseMiddleware<TokenRefreshMiddleware>();

// -----------------------------
// Rutas MVC
// -----------------------------
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Login}/{id?}"
);


app.Run();
