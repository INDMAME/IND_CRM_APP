using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace IND_CRM_APP.Services
{
    // Downloads ticket image streams from Azure Blob using the local connection string.
    public sealed class TicketBlobPreviewService : ITicketBlobPreviewService
    {
        private const string BlobConnectionKey = "AZURE_BLOB_CONNECTION_STRING";
        private readonly BlobServiceClient? _blobServiceClient;

        public TicketBlobPreviewService()
        {
            var connectionString = Environment.GetEnvironmentVariable(BlobConnectionKey);
            if (string.IsNullOrWhiteSpace(connectionString))
                return;

            try
            {
                _blobServiceClient = new BlobServiceClient(connectionString.Trim());
            }
            catch
            {
                _blobServiceClient = null;
            }
        }

        // Downloads one blob stream if URL and storage config are valid.
        public async Task<TicketBlobPreviewResult?> DownloadAsync(string blobUrl, CancellationToken cancellationToken = default)
        {
            if (_blobServiceClient == null)
                return null;

            if (!Uri.TryCreate((blobUrl ?? string.Empty).Trim(), UriKind.Absolute, out var blobUri))
                return null;

            if (!blobUri.Scheme.Equals("https", StringComparison.OrdinalIgnoreCase))
                return null;

            BlobUriBuilder uriBuilder;
            try
            {
                uriBuilder = new BlobUriBuilder(blobUri);
            }
            catch
            {
                return null;
            }

            if (string.IsNullOrWhiteSpace(uriBuilder.BlobContainerName) || string.IsNullOrWhiteSpace(uriBuilder.BlobName))
                return null;

            try
            {
                var container = _blobServiceClient.GetBlobContainerClient(uriBuilder.BlobContainerName);
                var blobClient = container.GetBlobClient(uriBuilder.BlobName);
                var download = await blobClient.DownloadStreamingAsync(cancellationToken: cancellationToken);

                var contentType = ResolveContentType(download.Value.Details, uriBuilder.BlobName);
                var fileName = Path.GetFileName(uriBuilder.BlobName);
                if (string.IsNullOrWhiteSpace(fileName))
                    fileName = "ticket-preview";

                return new TicketBlobPreviewResult
                {
                    Content = download.Value.Content,
                    ContentType = contentType,
                    FileName = fileName
                };
            }
            catch (RequestFailedException)
            {
                return null;
            }
        }

        // Resolves a content type from blob metadata or extension fallback.
        private static string ResolveContentType(BlobDownloadDetails details, string blobName)
        {
            var provided = (details.ContentType ?? string.Empty).Trim();
            if (!string.IsNullOrWhiteSpace(provided))
                return provided;

            var extension = Path.GetExtension(blobName)?.ToLowerInvariant() ?? string.Empty;
            return extension switch
            {
                ".png" => "image/png",
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".gif" => "image/gif",
                ".webp" => "image/webp",
                ".bmp" => "image/bmp",
                ".tif" => "image/tiff",
                ".tiff" => "image/tiff",
                ".svg" => "image/svg+xml",
                _ => "application/octet-stream"
            };
        }
    }
}
