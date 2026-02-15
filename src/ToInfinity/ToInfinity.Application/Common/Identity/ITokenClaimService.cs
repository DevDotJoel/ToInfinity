using System.Security.Claims;

namespace ToInfinity.Application.Common.Identity;

public interface ITokenClaimService
{
    TokenResult GenerateAccessToken(Guid userId, string email, IEnumerable<string> roles);
    string GenerateRefreshToken();
    bool ValidateExpiredToken(string token);
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
}
