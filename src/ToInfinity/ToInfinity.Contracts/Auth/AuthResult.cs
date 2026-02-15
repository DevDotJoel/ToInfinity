namespace ToInfinity.Contracts.Auth;

public record AuthResult(
    Guid UserId,
    string AccessToken,
    string RefreshToken);
