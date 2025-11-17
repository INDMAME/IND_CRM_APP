using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Diagnostics;
using IND_CRM_APP.Models.Shared;



var builder = WebApplication.CreateBuilder(args);

// -----------------------------
// Servicios
// -----------------------------
//builder.Services.AddResponseCompression();
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient<ApiClientService>();
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

// -----------------------------
// Rutas MVC
// -----------------------------
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Login}/{id?}"
);

// Personas
app.MapControllerRoute(
    name: "person_list",
    pattern: "personas",
    defaults: new { controller = "PersonList", action = "Index" }
);

// Crear persona
app.MapControllerRoute(
    name: "create_person",
    pattern: "personas/nueva",
    defaults: new { controller = "CreatePerson", action = "Index" }
);

// Proyectos
app.MapControllerRoute(
    name: "projects",
    pattern: "proyectos",
    defaults: new { controller = "ProjectList", action = "ProjectList" }
);

app.Run();
