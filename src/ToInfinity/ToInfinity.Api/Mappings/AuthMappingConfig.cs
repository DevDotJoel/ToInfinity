using Mapster;
using ToInfinity.Application.Auth.Models;
using ToInfinity.Contracts.Auth;

namespace ToInfinity.Api.Mappings;

public class AuthMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        // Request DTOs → Application Models
        config.NewConfig<RegisterRequest, RegisterModel>();
        config.NewConfig<LoginRequest, LoginModel>();
        config.NewConfig<RefreshTokenRequest, RefreshTokenModel>();

        // Application Models → Response DTOs
        config.NewConfig<AuthResultModel, AuthResult>();
    }
}
