namespace ToInfinity.Application.Auth.Models;

public record RegisterModel(
    string Email,
    string Password,
    string FirstName,
    string LastName);
