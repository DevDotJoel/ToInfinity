using Microsoft.AspNetCore.Identity;

namespace ToInfinity.Infrastructure.Identity;

public class ApplicationUser : IdentityUser<Guid>
{
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
}
