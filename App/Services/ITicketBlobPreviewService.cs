using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace IND_CRM_APP.Services
{
    // Result payload returned by the ticket blob preview service.
    public sealed class TicketBlobPreviewResult
    {
        public Stream Content { get; init; } = Stream.Null;
        public string ContentType { get; init; } = "application/octet-stream";
        public string FileName { get; init; } = "ticket-preview";
    }

    // Contract for downloading one ticket image stream from Azure Blob storage.
    public interface ITicketBlobPreviewService
    {
        Task<TicketBlobPreviewResult?> DownloadAsync(string blobUrl, CancellationToken cancellationToken = default);
    }
}
