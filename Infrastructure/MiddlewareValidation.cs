using System;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace IND_CRM_APP.Infrastructure
{
    internal static class MiddlewareValidation
    {
        public static void ValidateMiddlewares(IServiceCollection services, Assembly[] assembliesToScan)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));
            if (assembliesToScan == null || assembliesToScan.Length == 0) return;

            // Mapear tipo -> lifetime (primer descriptor encontrado)
            var lifetimeMap = services
                .Where(sd => sd.ServiceType != null)
                .GroupBy(sd => sd.ServiceType)
                .ToDictionary(g => g.Key, g => g.First().Lifetime);

            var problematic = assembliesToScan
                .Where(a => !a.IsDynamic)
                .SelectMany(a =>
                {
                    try { return a.GetTypes(); }
                    catch { return Array.Empty<Type>(); }
                })
                .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Middleware", StringComparison.OrdinalIgnoreCase))
                .Select(t =>
                {
                    var ctorParams = t.GetConstructors(BindingFlags.Public | BindingFlags.Instance)
                        .OrderByDescending(c => c.GetParameters().Length)
                        .FirstOrDefault()?.GetParameters() ?? Array.Empty<ParameterInfo>();

                    var offending = ctorParams
                        .Where(p =>
                        {
                            var pType = p.ParameterType;
                            // Ignore RequestDelegate (es normal en middlewares)
                            if (pType == typeof(RequestDelegate)) return false;
                            // Comprobar si el tipo está registrado como Scoped
                            if (lifetimeMap.TryGetValue(pType, out var lt))
                            {
                                return lt == ServiceLifetime.Scoped;
                            }

                            // Si no hay registro exacto, intentar con interfaces genéricos (ej. ILogger<T>, IOptions<T>) -> ignorar
                            if (pType.IsGenericType)
                            {
                                var genericDef = pType.GetGenericTypeDefinition();
                                if (genericDef == typeof(ILogger<>) || genericDef == typeof(Microsoft.Extensions.Options.IOptions<>))
                                    return false;
                            }

                            return false;
                        })
                        .Select(p => p.ParameterType.FullName)
                        .ToArray();

                    return new { MiddlewareType = t, Offending = offending };
                })
                .Where(x => x.Offending.Length > 0)
                .ToList();

            if (problematic.Any())
            {
                var message = "Middlewares with scoped constructor dependencies detected. Resolve scoped services inside Invoke/InvokeAsync instead of constructor.\n\n";
                foreach (var p in problematic)
                {
                    message += $"- {p.MiddlewareType.FullName}\n";
                    foreach (var param in p.Offending)
                    {
                        message += $"    • {param}\n";
                    }
                    message += "\n";
                }

                message += "Recommendation: Inject only singleton/transient-safe services in middleware constructors (RequestDelegate, ILogger<T>, IOptions<T>, etc.), " +
                           "and resolve scoped services via HttpContext.RequestServices.GetRequiredService<T>() inside Invoke/InvokeAsync.\n";

                throw new InvalidOperationException(message);
            }
        }
    }
}
