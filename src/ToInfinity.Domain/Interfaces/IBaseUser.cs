using ErrorOr;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Domain.Interfaces;

public interface IBaseUser
{
    UserId UserId { get; }

    ErrorOr<Success> SetUserId(UserId userId);
}
