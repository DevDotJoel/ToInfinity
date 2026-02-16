using ErrorOr;
using ToInfinity.Application.Auth.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Common.Identity;

public record ExternalLoginInitiation(
    string Provider,
    object AuthenticationProperties);

public interface IIdentityService
{
    Task<ErrorOr<AuthResultModel>> RegisterAsync(RegisterModel request, CancellationToken cancellationToken = default);
    Task<ErrorOr<AuthResultModel>> LoginAsync(LoginModel request, CancellationToken cancellationToken = default);
    Task<ErrorOr<AuthResultModel>> RefreshTokenAsync(RefreshTokenModel request, CancellationToken cancellationToken = default);
    Task<ErrorOr<Success>> LogoutAsync(UserId userId, CancellationToken cancellationToken = default);
    Task<ErrorOr<AuthResultModel>> ExternalLoginAsync(CancellationToken cancellationToken = default);
    Task<ErrorOr<UserInfoModel>> GetUserInfoAsync(UserId userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Initiates external authentication flow by configuring authentication properties
    /// </summary>
    /// <returns>Data needed to initiate OAuth challenge</returns>
    ExternalLoginInitiation InitiateExternalLogin(string provider, string returnUrl);

    /// <summary>
    /// Gets the frontend URL for redirects after external auth
    /// </summary>
    string GetFrontendUrl();
}
