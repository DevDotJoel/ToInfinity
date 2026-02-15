using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToInfinity.Application.Common.Identity;
using ToInfinity.Contracts.Auth;

namespace ToInfinity.Api.Controllers;

[Route("api/[controller]")]
public class AuthController : ApiController
{
    private readonly IIdentityService _identityService;
    private readonly IMapper _mapper;

    public AuthController(
        IIdentityService identityService,
        IMapper mapper)
    {
        _identityService = identityService;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterRequest request,
        CancellationToken cancellationToken)
    {
        var registerModel = _mapper.Map<Application.Auth.Models.RegisterModel>(request);
        var result = await _identityService.RegisterAsync(registerModel, cancellationToken);

        return result.Match(
            authResultModel => Ok(_mapper.Map<AuthResult>(authResultModel)),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequest request,
        CancellationToken cancellationToken)
    {
        var loginModel = _mapper.Map<Application.Auth.Models.LoginModel>(request);
        var result = await _identityService.LoginAsync(loginModel, cancellationToken);

        return result.Match(
            authResultModel => Ok(_mapper.Map<AuthResult>(authResultModel)),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(
        RefreshTokenRequest request,
        CancellationToken cancellationToken)
    {
        var refreshModel = _mapper.Map<Application.Auth.Models.RefreshTokenModel>(request);
        var result = await _identityService.RefreshTokenAsync(refreshModel, cancellationToken);

        return result.Match(
            authResultModel => Ok(_mapper.Map<AuthResult>(authResultModel)),
            errors => Problem(errors));
    }
}
