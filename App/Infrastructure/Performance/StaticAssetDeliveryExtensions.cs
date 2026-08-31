using System.IO.Compression;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;

namespace IND_CRM_APP.Infrastructure.Performance;

// Configures the optimized pipeline used only by public fixed assets.
internal static class StaticAssetDeliveryExtensions
{
    // Registers compression only for the public static asset pipeline.
    public static IServiceCollection AddStaticAssetDelivery(this IServiceCollection services)
    {
        services.AddResponseCompression(options =>
        {
            options.EnableForHttps = true;
            options.Providers.Add<BrotliCompressionProvider>();
            options.Providers.Add<GzipCompressionProvider>();
            options.MimeTypes = StaticAssetCachePolicy.CompressibleMimeTypes;
        });
        services.Configure<BrotliCompressionProviderOptions>(options =>
            options.Level = CompressionLevel.Fastest);
        services.Configure<GzipCompressionProviderOptions>(options =>
            options.Level = CompressionLevel.Fastest);

        return services;
    }

    // Adds compression and cache headers without touching MVC or API responses.
    public static IApplicationBuilder UseStaticAssetDelivery(
        this IApplicationBuilder app,
        IFileProvider webRootFileProvider)
    {
        app.UseWhen(
            context => StaticAssetCachePolicy.ShouldCompress(context, webRootFileProvider),
            branch => branch.UseResponseCompression());

        app.UseStaticFiles(new StaticFileOptions
        {
            OnPrepareResponse = StaticAssetCachePolicy.ApplyCacheHeaders
        });

        return app;
    }
}

// Classifies fixed assets and assigns their safe cache behavior.
internal static class StaticAssetCachePolicy
{
    private const string ImmutableCacheControl = "public,max-age=31536000,immutable";
    private const string RevalidatedCacheControl = "public,max-age=0,must-revalidate";

    private static readonly HashSet<string> CacheableCssPaths = new(StringComparer.OrdinalIgnoreCase)
    {
        "/css/tailwind.css",
        "/css/layout.css",
        "/css/historial.css",
        "/css/visitas.css",
        "/css/index.css",
        "/css/technical-info.css"
    };

    private static readonly HashSet<string> CacheableImagePaths = new(StringComparer.OrdinalIgnoreCase)
    {
        "/images/insertec_logo_blanco.png",
        "/images/insertec_sin_fondo.png",
        "/images/kaloria_bot.png",
        "/images/kaloria_horno.png"
    };

    private static readonly HashSet<string> CacheableImageExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".gif",
        ".png",
        ".webp"
    };

    internal static readonly string[] CompressibleMimeTypes =
    {
        "application/javascript",
        "image/svg+xml",
        "text/css",
        "text/javascript"
    };

    // Restricts compression to an existing, allowlisted physical file.
    internal static bool ShouldCompress(HttpContext context, IFileProvider webRootFileProvider)
    {
        if (!HttpMethods.IsGet(context.Request.Method) && !HttpMethods.IsHead(context.Request.Method))
            return false;

        var path = context.Request.Path.Value ?? string.Empty;
        if (!IsCacheableStaticAsset(path) || !IsCompressiblePath(path))
            return false;

        var relativePath = path.TrimStart('/');
        return relativePath.Length > 0 && webRootFileProvider.GetFileInfo(relativePath).Exists;
    }

    // Applies immutable caching only when the URL proves which content it represents.
    internal static void ApplyCacheHeaders(StaticFileResponseContext context)
    {
        var path = context.Context.Request.Path.Value ?? string.Empty;
        if (!IsCacheableStaticAsset(path))
            return;

        var cacheControl = IsHashedChunk(path) || HasCurrentContentVersion(context.Context)
            ? ImmutableCacheControl
            : RevalidatedCacheControl;

        context.Context.Response.Headers[HeaderNames.CacheControl] = cacheControl;
    }

    // Keeps the allowlist limited to build output and fixed public artwork.
    internal static bool IsCacheableStaticAsset(string path)
    {
        if (CacheableCssPaths.Contains(path))
            return true;

        if (path.StartsWith("/js/", StringComparison.OrdinalIgnoreCase))
            return string.Equals(Path.GetExtension(path), ".js", StringComparison.OrdinalIgnoreCase);

        if (CacheableImagePaths.Contains(path))
            return true;

        if (path.StartsWith("/assets/flags/", StringComparison.OrdinalIgnoreCase))
            return string.Equals(Path.GetExtension(path), ".svg", StringComparison.OrdinalIgnoreCase);

        if (path.StartsWith("/assets/kaloria/", StringComparison.OrdinalIgnoreCase))
            return CacheableImageExtensions.Contains(Path.GetExtension(path));

        return string.Equals(path, "/favicon.ico", StringComparison.OrdinalIgnoreCase);
    }

    // Identifies text formats that benefit from transport compression.
    private static bool IsCompressiblePath(string path)
    {
        var extension = Path.GetExtension(path);
        return string.Equals(extension, ".css", StringComparison.OrdinalIgnoreCase)
               || string.Equals(extension, ".js", StringComparison.OrdinalIgnoreCase)
               || string.Equals(extension, ".svg", StringComparison.OrdinalIgnoreCase);
    }

    // Recognizes esbuild chunks whose file name changes with their content.
    private static bool IsHashedChunk(string path)
    {
        if (!path.StartsWith("/js/chunks/", StringComparison.OrdinalIgnoreCase)
            || !string.Equals(Path.GetExtension(path), ".js", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(path);
        var separatorIndex = fileNameWithoutExtension.LastIndexOf('-');
        if (separatorIndex <= 0 || separatorIndex == fileNameWithoutExtension.Length - 1)
            return false;

        var hash = fileNameWithoutExtension.AsSpan(separatorIndex + 1);
        return hash.Length == 8 && IsAsciiAlphaNumeric(hash);
    }

    // Validates the restricted character set emitted by esbuild hashes.
    private static bool IsAsciiAlphaNumeric(ReadOnlySpan<char> value)
    {
        foreach (var character in value)
        {
            var isAsciiLetter = character is >= 'A' and <= 'Z' or >= 'a' and <= 'z';
            var isAsciiDigit = character is >= '0' and <= '9';
            if (!isAsciiLetter && !isAsciiDigit)
                return false;
        }

        return true;
    }

    // Verifies that the requested version is the current physical file hash.
    private static bool HasCurrentContentVersion(HttpContext context)
    {
        if (!context.Request.Query.TryGetValue("v", out StringValues requestedVersions)
            || requestedVersions.Count != 1
            || string.IsNullOrWhiteSpace(requestedVersions[0]))
        {
            return false;
        }

        try
        {
            var versionProvider = context.RequestServices.GetRequiredService<IFileVersionProvider>();
            var path = context.Request.Path.Value ?? string.Empty;
            var versionedPath = versionProvider.AddFileVersionToPath(context.Request.PathBase, path);
            const string versionMarker = "?v=";
            var markerIndex = versionedPath.IndexOf(versionMarker, StringComparison.Ordinal);
            if (markerIndex < 0)
                return false;

            var expectedVersion = versionedPath[(markerIndex + versionMarker.Length)..];
            var nextParameterIndex = expectedVersion.IndexOf('&');
            if (nextParameterIndex >= 0)
                expectedVersion = expectedVersion[..nextParameterIndex];

            return string.Equals(requestedVersions[0], expectedVersion, StringComparison.Ordinal);
        }
        catch
        {
            // A version lookup failure safely falls back to server revalidation.
            return false;
        }
    }
}
