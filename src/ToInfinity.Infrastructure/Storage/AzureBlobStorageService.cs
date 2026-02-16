using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using ToInfinity.Application.Common.Storage;

namespace ToInfinity.Infrastructure.Storage;

public class AzureBlobStorageService : IFileStorageService
{
    private readonly BlobServiceClient _blobServiceClient;

    public AzureBlobStorageService(string connectionString)
    {
        _blobServiceClient = new BlobServiceClient(connectionString);
    }

    public async Task<string> UploadImageAsync(
        byte[] fileData,
        string fileName,
        string contentType,
        string containerName,
        string folderPath,
        CancellationToken cancellationToken = default)
    {
        // Get or create container
        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        await containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob, cancellationToken: cancellationToken);

        // Generate unique blob name with folder path
        var fileExtension = Path.GetExtension(fileName);
        var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
        var blobName = string.IsNullOrWhiteSpace(folderPath)
            ? uniqueFileName
            : $"{folderPath.TrimEnd('/')}/{uniqueFileName}";

        // Upload blob
        var blobClient = containerClient.GetBlobClient(blobName);

        using var stream = new MemoryStream(fileData);
        await blobClient.UploadAsync(
            stream,
            new BlobHttpHeaders { ContentType = contentType },
            cancellationToken: cancellationToken);

        // Return public URL
        return blobClient.Uri.ToString();
    }

    public async Task<bool> DeleteImageAsync(string fileUrl, CancellationToken cancellationToken = default)
    {
        try
        {
            var uri = new Uri(fileUrl);
            var blobClient = new BlobClient(uri);

            var response = await blobClient.DeleteIfExistsAsync(cancellationToken: cancellationToken);
            return response.Value;
        }
        catch
        {
            return false;
        }
    }
}
