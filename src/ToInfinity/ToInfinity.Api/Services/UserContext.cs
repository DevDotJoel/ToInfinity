using System.Security.Claims;
using ToInfinity.Application.Common.Services;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Api.Services;

public class UserContext : IUserContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserContext(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public UserId GetCurrentUserId()
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User
            .FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim is null)
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            throw new UnauthorizedAccessException("Invalid user ID claim.");
        }

        return UserId.Create(userId);
    }
}
