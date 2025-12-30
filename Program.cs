using IND_CRM_APP.Middleware;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using Microsoft.AspNetCore.Diagnostics;
using IND_CRM_APP.Infrastructure;
using System.Reflection;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using System.Globalization;



var builder = WebApplication.CreateBuilder(args);

// -----------------------------
// Servicios
// -----------------------------
//builder.Services.AddResponseCompression();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

builder.Services
    .AddControllersWithViews()
    .AddSessionStateTempDataProvider()
    .AddViewLocalization(Microsoft.AspNetCore.Mvc.Razor.LanguageViewLocationExpanderFormat.Suffix)
    .AddDataAnnotationsLocalization();

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    // UI localization only. Do not translate business data.
    var supportedCultures = new[]
    {
        new CultureInfo("es-ES"),
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
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
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
}
else
{
    app.UseDeveloperExceptionPage();
}

//app.UseResponseCompression();
app.UseStaticFiles();
app.UseRequestLocalization(app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>().Value);
app.UseRouting();
// Friendly 404 page for missing routes.
app.UseStatusCodePagesWithReExecute("/Home/NotFound", "?code={0}");
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
