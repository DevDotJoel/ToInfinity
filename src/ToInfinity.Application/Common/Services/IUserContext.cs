using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Common.Services;

public interface IUserContext
{
    UserId GetCurrentUserId();
}
