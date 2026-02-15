using ErrorOr;
using ToInfinity.Application.Auth.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Common.Identity;

public interface IIdentityService
{
    Task<ErrorOr<AuthResultModel>> RegisterAsync(RegisterModel request, CancellationToken cancellationToken = default);
    Task<ErrorOr<AuthResultModel>> LoginAsync(LoginModel request, CancellationToken cancellationToken = default);
    Task<ErrorOr<AuthResultModel>> RefreshTokenAsync(RefreshTokenModel request, CancellationToken cancellationToken = default);
    Task<ErrorOr<Success>> LogoutAsync(UserId userId, CancellationToken cancellationToken = default);
}
