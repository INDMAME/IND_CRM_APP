using IND_CRM_APP.Middleware;
using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Diagnostics;



var builder = WebApplication.CreateBuilder(args);

// -----------------------------
// Servicios
// -----------------------------
//builder.Services.AddResponseCompression();
builder.Services.AddControllersWithViews();
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
builder.Logging.AddFilter("System.Net.Http.HttpClient", LogLevel.Information);


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
                logger.LogError(feature.Error, "❌ Excepción no controlada en la ruta: {Path}", feature.Path);
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
app.UseRouting();
app.UseSession();
// Middleware de refresco de token
app.UseMiddleware<TokenRefreshMiddleware>();

// -----------------------------
// Rutas MVC
// -----------------------------
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Login}/{id?}"
);


app.Run();
