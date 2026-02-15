using System.Security.Claims;
using ErrorOr;
using Microsoft.AspNetCore.Identity;
using ToInfinity.Application.Common.Identity;
using ToInfinity.Contracts.Auth;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ITokenClaimService _tokenClaimService;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ITokenClaimService tokenClaimService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenClaimService = tokenClaimService;
    }

    public async Task<ErrorOr<AuthResult>> RegisterAsync(
        RegisterRequest request,
        CancellationToken cancellationToken = default)
    {
        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
        {
            return Error.Conflict(
                code: "User.DuplicateEmail",
                description: "User with this email already exists.");
        }

        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
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

        var roles = new List<string> { "User" };
        var tokenResult = _tokenClaimService.GenerateAccessToken(user.Id, user.Email!, roles);

        user.RefreshToken = tokenResult.RefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);

        return new AuthResult(
            user.Id,
            tokenResult.AccessToken,
            tokenResult.RefreshToken);
    }

    public async Task<ErrorOr<AuthResult>> LoginAsync(
        LoginRequest request,
        CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Error.NotFound(
                code: "User.InvalidCredentials",
                description: "Invalid email or password.");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: false);
        if (!result.Succeeded)
        {
            return Error.Unauthorized(
                code: "User.InvalidCredentials",
                description: "Invalid email or password.");
        }

        var roles = (await _userManager.GetRolesAsync(user)).ToList();
        var tokenResult = _tokenClaimService.GenerateAccessToken(user.Id, user.Email!, roles);

        user.RefreshToken = tokenResult.RefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);

        return new AuthResult(
            user.Id,
            tokenResult.AccessToken,
            tokenResult.RefreshToken);
    }

    public async Task<ErrorOr<AuthResult>> RefreshTokenAsync(
        RefreshTokenRequest request,
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

        if (user.RefreshToken != request.RefreshToken)
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

        user.RefreshToken = tokenResult.RefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);

        return new AuthResult(
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

        return Result.Success;
    }
}
