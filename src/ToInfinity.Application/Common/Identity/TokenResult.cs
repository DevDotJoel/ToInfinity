namespace ToInfinity.Application.Common.Identity;

public record TokenResult(
    string AccessToken,
    string RefreshToken,
    DateTime ExpiresAt);
