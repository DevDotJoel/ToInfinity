using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ErrorOr;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using ToInfinity.Application.Auth.Models;
using ToInfinity.Application.Common.Identity;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ITokenClaimService _tokenClaimService;
    private readonly IConfiguration _configuration;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ITokenClaimService tokenClaimService,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenClaimService = tokenClaimService;
        _configuration = configuration;
    }

    public async Task<ErrorOr<AuthResultModel>> RegisterAsync(
        RegisterModel request,
        CancellationToken cancellationToken = default)
    {
        // Validate password confirmation
        if (request.Password != request.ConfirmPassword)
        {
            return Error.Validation(
                code: "User.PasswordMismatch",
                description: "Password and confirmation password do not match.");
        }

        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
        {
            return Error.Conflict(
                code: "User.DuplicateEmail",
                description: "User with this email already exists.");
        }

        var user = new ApplicationUser
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            UserName = request.Email

        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return Error.Validation(
                code: "User.RegistrationFailed",
                description: string.Join(", ", result.Errors.Select(e => e.Description)));
        }

        // Assign default User role
        var roleResult = await _userManager.AddToRoleAsync(user, "User");
        if (!roleResult.Succeeded)
        {
            return Error.Validation(
                code: "User.RoleAssignmentFailed",
                description: string.Join(", ", roleResult.Errors.Select(e => e.Description)));
        }

        var roles = new List<string> { "User" };
        var tokenResult = _tokenClaimService.GenerateAccessToken(user.Id, user.Email!, roles);

        // Store hashed refresh token
        user.RefreshToken = HashToken(tokenResult.RefreshToken);
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);

        // Return unhashed token to user (only once)
        return new AuthResultModel(
            user.Id,
            tokenResult.AccessToken,
            tokenResult.RefreshToken);
    }

    public async Task<ErrorOr<AuthResultModel>> LoginAsync(
        LoginModel request,
        CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Error.NotFound(
                code: "User.InvalidCredentials",
                description: "Invalid email or password.");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);

        if (result.IsLockedOut)
        {
            return Error.Forbidden(
                code: "User.LockedOut",
                description: "Account is locked due to multiple failed login attempts. Please try again later.");
        }

        if (!result.Succeeded)
        {
            return Error.Unauthorized(
                code: "User.InvalidCredentials",
                description: "Invalid email or password.");
        }

        var roles = (await _userManager.GetRolesAsync(user)).ToList();
        var tokenResult = _tokenClaimService.GenerateAccessToken(user.Id, user.Email!, roles);

        // Store hashed refresh token
        user.RefreshToken = HashToken(tokenResult.RefreshToken);
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);

        // Return unhashed token to user (only once)
        return new AuthResultModel(
            user.Id,
            tokenResult.AccessToken,
            tokenResult.RefreshToken);
    }

    public async Task<ErrorOr<AuthResultModel>> RefreshTokenAsync(
        RefreshTokenModel request,
        CancellationToken cancellationToken = default)
    {
        if (!_tokenClaimService.ValidateExpiredToken(request.AccessToken))
        {
            return Error.Unauthorized(
                code: "Token.Invalid",
                description: "Invalid access token.");
        }

        var principal = _tokenClaimService.GetPrincipalFromExpiredToken(request.AccessToken);
        var userIdClaim = principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim is null || !Guid.TryParse(userIdClaim, out var userId))
        {
            return Error.Unauthorized(
                code: "Token.InvalidUserId",
                description: "Invalid user ID in token.");
        }

        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
        {
            return Error.NotFound(
                code: "User.NotFound",
                description: "User not found.");
        }

        // Hash incoming refresh token for comparison
        var hashedRefreshToken = HashToken(request.RefreshToken);

        if (!ConstantTimeEquals(user.RefreshToken, hashedRefreshToken))
        {
            return Error.Unauthorized(
                code: "Token.InvalidRefreshToken",
                description: "Invalid refresh token.");
        }

        if (user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            return Error.Unauthorized(
                code: "Token.RefreshTokenExpired",
                description: "Refresh token has expired.");
        }

        var roles = (await _userManager.GetRolesAsync(user)).ToList();
        var tokenResult = _tokenClaimService.GenerateAccessToken(user.Id, user.Email!, roles);

        // Store hashed refresh token
        user.RefreshToken = HashToken(tokenResult.RefreshToken);
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);

        // Return unhashed token to user (only once)
        return new AuthResultModel(
            user.Id,
            tokenResult.AccessToken,
            tokenResult.RefreshToken);
    }

    public async Task<ErrorOr<Success>> LogoutAsync(
        UserId userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId.Value.ToString());
        if (user is null)
        {
            return Error.NotFound(
                code: "User.NotFound",
                description: "User not found.");
        }

        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = null;

        await _userManager.UpdateAsync(user);

        // Sign out from Identity
        await _signInManager.SignOutAsync();

        return Result.Success;
    }

    public async Task<ErrorOr<AuthResultModel>> ExternalLoginAsync(
        CancellationToken cancellationToken = default)
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info is null)
        {
            return Error.Unauthorized(
                code: "ExternalLogin.NoInfo",
                description: "External login information not found.");
        }

        // Try to sign in with the external login first
        var signInResult = await _signInManager.ExternalLoginSignInAsync(
            info.LoginProvider,
            info.ProviderKey,
            isPersistent: true,
            bypassTwoFactor: true);

        ApplicationUser user;

        if (signInResult.Succeeded)
        {
            // User already exists and has this external login
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            if (email is null)
            {
                return Error.Unauthorized(
                    code: "ExternalLogin.NoEmail",
                    description: "Email not provided by external provider.");
            }

            var existingUser = await _userManager.FindByEmailAsync(email);
            if (existingUser is null)
            {
                return Error.NotFound(
                    code: "User.NotFound",
                    description: "User not found.");
            }

            user = existingUser;
        }
        else
        {
            // User doesn't have this external login, check if they exist by email
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            if (email is null)
            {
                return Error.Unauthorized(
                    code: "ExternalLogin.NoEmail",
                    description: "Email not provided by external provider.");
            }

            var existingUser = await _userManager.FindByEmailAsync(email);

            if (existingUser is null)
            {
                // Create new user
                user = new ApplicationUser
                {
                    Id = Guid.NewGuid(),
                    Email = email,
                    UserName = email,
                    EmailConfirmed = true // External providers verify email
                };

                var createResult = await _userManager.CreateAsync(user);
                if (!createResult.Succeeded)
                {
                    return Error.Validation(
                        code: "User.CreateFailed",
                        description: string.Join(", ", createResult.Errors.Select(e => e.Description)));
                }

                // Assign default role
                await _userManager.AddToRoleAsync(user, "User");
            }
            else
            {
                user = existingUser;
            }

            // Add the external login to the user
            var addLoginResult = await _userManager.AddLoginAsync(user, info);
            if (!addLoginResult.Succeeded)
            {
                return Error.Validation(
                    code: "ExternalLogin.AddFailed",
                    description: string.Join(", ", addLoginResult.Errors.Select(e => e.Description)));
            }

            // Sign in the user after creating/linking account
            await _signInManager.SignInAsync(user, isPersistent: true);
        }

        // Generate tokens for cookies
        var roles = (await _userManager.GetRolesAsync(user)).ToList();
        var tokenResult = _tokenClaimService.GenerateAccessToken(user.Id, user.Email!, roles);

        // Store hashed refresh token
        user.RefreshToken = HashToken(tokenResult.RefreshToken);
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);

        // Return unhashed token to user (only once)
        return new AuthResultModel(
            user.Id,
            tokenResult.AccessToken,
            tokenResult.RefreshToken);
    }

    public ExternalLoginInitiation InitiateExternalLogin(
        string provider,
        string returnUrl)
    {
        var backendUrl = _configuration["WebApp:BackendPublicUrl"]
            ?? throw new InvalidOperationException("Backend URL not configured");

        var redirectUrl = $"{backendUrl}/api/auth/external-callback?returnUrl={Uri.EscapeDataString(returnUrl)}";
        var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);

        return new ExternalLoginInitiation(provider, properties);
    }

    public async Task<ErrorOr<UserInfoModel>> GetUserInfoAsync(
        UserId userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId.Value.ToString());
        if (user is null)
        {
            return Error.NotFound(
                code: "User.NotFound",
                description: "User not found.");
        }

        return new UserInfoModel(
            UserId: user.Id,
            Email: user.Email ?? string.Empty,
            FirstName: user.FirstName ?? string.Empty,
            LastName: user.LastName ?? string.Empty,
            CurrentPlan: user.CurrentPlan.ToString(),
            SubscriptionStatus: user.SubscriptionStatus.ToString(),
            SubscriptionExpiresAt: user.SubscriptionExpiresAt
        );
    }

    public string GetFrontendUrl()
    {
        return _configuration["WebApp:FrontendPublicUrl"]
            ?? throw new InvalidOperationException("Frontend URL not configured");
    }

    // Security helper methods
    private static string HashToken(string token)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(token);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }

    private static bool ConstantTimeEquals(string? a, string? b)
    {
        if (a == null || b == null)
            return a == b;

        if (a.Length != b.Length)
            return false;

        var result = 0;
        for (var i = 0; i < a.Length; i++)
        {
            result |= a[i] ^ b[i];
        }

        return result == 0;
    }
}
