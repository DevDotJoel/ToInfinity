namespace ToInfinity.Application.Common.Storage;

public interface IFileStorageService
{
    /// <summary>
    /// Uploads an image file to Azure Blob Storage
    /// </summary>
    /// <param name="fileData">The file content as byte array</param>
    /// <param name="fileName">Original file name</param>
    /// <param name="contentType">MIME type (e.g., image/jpeg)</param>
    /// <param name="containerName">Container to upload to (e.g., venues, catering, wedding-planners)</param>
    /// <param name="folderPath">Virtual folder path within container (e.g., userId/main-image, userId/gallery)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Public URL of the uploaded file</returns>
    Task<string> UploadImageAsync(
        byte[] fileData,
        string fileName,
        string contentType,
        string containerName,
        string folderPath,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes a file from Azure Blob Storage
    /// </summary>
    /// <param name="fileUrl">Public URL of the file to delete</param>
    /// <param name="cancellationToken">Cancellation token</param>
    Task<bool> DeleteImageAsync(string fileUrl, CancellationToken cancellationToken = default);
}
