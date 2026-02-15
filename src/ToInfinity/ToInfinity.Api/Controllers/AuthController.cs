using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToInfinity.Application.Common.Identity;
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
        var result = await _identityService.RegisterAsync(request, cancellationToken);

        return result.Match(
            authResult => Ok(authResult),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _identityService.LoginAsync(request, cancellationToken);

        return result.Match(
            authResult => Ok(authResult),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(
        RefreshTokenRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _identityService.RefreshTokenAsync(request, cancellationToken);

        return result.Match(
            authResult => Ok(authResult),
            errors => Problem(errors));
    }
}
