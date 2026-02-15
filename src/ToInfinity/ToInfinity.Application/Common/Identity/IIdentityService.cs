using ErrorOr;
using ToInfinity.Contracts.Auth;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Common.Identity;

public interface IIdentityService
{
    Task<ErrorOr<AuthResult>> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);
    Task<ErrorOr<AuthResult>> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
    Task<ErrorOr<AuthResult>> RefreshTokenAsync(RefreshTokenRequest request, CancellationToken cancellationToken = default);
    Task<ErrorOr<Success>> LogoutAsync(UserId userId, CancellationToken cancellationToken = default);
}
