using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToInfinity.Application.Common.Identity;
using ToInfinity.Application.Common.Services;
using ToInfinity.Contracts.Auth;

namespace ToInfinity.Api.Controllers;

[Route("api/[controller]")]
public class AuthController : ApiController
{
    private readonly IIdentityService _identityService;

    public AuthController(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterRequest request,
        CancellationToken cancellationToken)
    {
        var registerModel = new Application.Auth.Models.RegisterModel(
            request.Email,
            request.Password,
            request.ConfirmPassword,
            request.FirstName,
            request.LastName);

        var result = await _identityService.RegisterAsync(registerModel, cancellationToken);

        if (result.IsError)
        {
            return Problem(result.Errors);
        }

        // Set tokens in secure HttpOnly cookies
        SetAuthCookies(result.Value.AccessToken, result.Value.RefreshToken);

        return Ok(new AuthResult(result.Value.UserId, "Registration successful"));
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequest request,
        CancellationToken cancellationToken)
    {
        var loginModel = new Application.Auth.Models.LoginModel(
            request.Email,
            request.Password);

        var result = await _identityService.LoginAsync(loginModel, cancellationToken);

        if (result.IsError)
        {
            return Problem(result.Errors);
        }

        // Set tokens in secure HttpOnly cookies
        SetAuthCookies(result.Value.AccessToken, result.Value.RefreshToken);

        return Ok(new AuthResult(result.Value.UserId, "Login successful"));
    }

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(CancellationToken cancellationToken)
    {
        // Read tokens from cookies
        if (!Request.Cookies.TryGetValue("accessToken", out var accessToken) ||
            !Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
        {
            return Unauthorized(new { Message = "No authentication tokens found" });
        }

        var refreshModel = new Application.Auth.Models.RefreshTokenModel(
            accessToken,
            refreshToken);

        var result = await _identityService.RefreshTokenAsync(refreshModel, cancellationToken);

        if (result.IsError)
        {
            // Clear invalid cookies
            ClearAuthCookies();
            return Problem(result.Errors);
        }

        // Set new tokens in cookies
        SetAuthCookies(result.Value.AccessToken, result.Value.RefreshToken);

        return Ok(new { Message = "Token refreshed successfully" });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout(
        [FromServices] IUserContext userContext,
        CancellationToken cancellationToken)
    {
        var result = await _identityService.LogoutAsync(userContext.GetCurrentUserId(), cancellationToken);

        // Clear cookies regardless of service result
        ClearAuthCookies();

        return result.Match(
            _ => Ok(new { Message = "Logged out successfully" }),
            errors => Problem(errors));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser(
        [FromServices] IUserContext userContext,
        CancellationToken cancellationToken)
    {
        var userId = userContext.GetCurrentUserId();
        var result = await _identityService.GetUserInfoAsync(userId, cancellationToken);

        return result.Match(
            userInfo => Ok(new UserInfoResponse(
                userInfo.UserId,
                userInfo.Email,
                userInfo.FirstName,
                userInfo.LastName,
                userInfo.CurrentPlan,
                userInfo.SubscriptionStatus,
                userInfo.SubscriptionExpiresAt
            )),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpGet("external-login")]
    public IActionResult ExternalLogin([FromQuery] string provider, [FromQuery] string returnUrl = "/")
    {
        var initiation = _identityService.InitiateExternalLogin(provider, returnUrl);
        return Challenge((Microsoft.AspNetCore.Authentication.AuthenticationProperties)initiation.AuthenticationProperties, initiation.Provider);
    }

    [AllowAnonymous]
    [HttpGet("external-callback")]
    public async Task<IActionResult> ExternalCallback([FromQuery] string returnUrl = "/", CancellationToken cancellationToken = default)
    {
        var frontendUrl = _identityService.GetFrontendUrl();

        var result = await _identityService.ExternalLoginAsync(cancellationToken);

        if (result.IsError)
        {
            return Redirect($"{frontendUrl}/auth/error");
        }

        // Set tokens in secure HttpOnly cookies
        SetAuthCookies(result.Value.AccessToken, result.Value.RefreshToken);

        // Validate returnUrl to prevent open redirect attacks
        var safeReturnUrl = ValidateReturnUrl(returnUrl);
        return Redirect($"{frontendUrl}{safeReturnUrl}");
    }

    private void SetAuthCookies(string accessToken, string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true, // Require HTTPS
            SameSite = SameSiteMode.None, // Required for cross-origin with credentials
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        };

        Response.Cookies.Append("accessToken", accessToken, cookieOptions);
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }

    private void ClearAuthCookies()
    {
        Response.Cookies.Delete("accessToken");
        Response.Cookies.Delete("refreshToken");
    }

    private static string ValidateReturnUrl(string returnUrl)
    {
        // Only allow relative URLs starting with /
        if (string.IsNullOrWhiteSpace(returnUrl) ||
            !returnUrl.StartsWith('/') ||
            returnUrl.StartsWith("//"))
        {
            return "/"; // Default to home
        }

        return returnUrl;
    }
}
