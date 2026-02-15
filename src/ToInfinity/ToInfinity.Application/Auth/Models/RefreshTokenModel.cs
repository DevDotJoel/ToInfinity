namespace ToInfinity.Application.Auth.Models;

public record RefreshTokenModel(
    string AccessToken,
    string RefreshToken);
