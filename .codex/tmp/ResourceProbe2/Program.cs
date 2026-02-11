using System;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Resources;
using System.Runtime.Loader;

var appDir = @"C:\inetpub\wwwroot\IND_CRM_APP";
var target = Path.Combine(appDir, "IND_CRM_APP.dll");
var alc = new AssemblyLoadContext("probe", isCollectible: true);
alc.Resolving += (context, name) =>
{
    var asmPath = Path.Combine(appDir, name.Name + ".dll");
    if (File.Exists(asmPath)) return context.LoadFromAssemblyPath(asmPath);
    foreach (var dir in Directory.EnumerateDirectories(appDir))
    {
        var satellite = Path.Combine(dir, name.Name + ".dll");
        if (File.Exists(satellite)) return context.LoadFromAssemblyPath(satellite);
    }
    return null;
};

var asm = alc.LoadFromAssemblyPath(target);
var rm = new ResourceManager("IND_CRM_APP.App.Resources.Infrastructure.Localization.INDSharedResource", asm);
var culture = CultureInfo.GetCultureInfo("es-ES");
var keys = new[] {
  "ExpenseSheets_Filter_Project",
  "ExpenseSheets_Filter_Sheet",
  "ExpenseSheets_Filter_Currency",
  "ExpenseSheets_Filter_Status",
  "ExpenseSheets_Filter_Status_Unbilled",
  "History_Filter_Toggle",
  "History_Filter_Refresh"
};
foreach (var k in keys)
{
    Console.WriteLine($"{k} = {rm.GetString(k, culture)}");
}