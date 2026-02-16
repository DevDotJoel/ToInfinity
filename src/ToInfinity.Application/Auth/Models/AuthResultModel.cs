namespace ToInfinity.Application.Auth.Models;

public record AuthResultModel(
    Guid UserId,
    string AccessToken,
    string RefreshToken);
