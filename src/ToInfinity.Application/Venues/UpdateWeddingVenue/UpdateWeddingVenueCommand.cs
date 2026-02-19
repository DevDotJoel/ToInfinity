using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.UpdateWeddingVenue;

public record UpdateWeddingVenueCommand(
    VenueId VenueId,
    UserId UserId,
    string Name,
    string Description,
    string Street,
    string PostalCode,
    int MunicipalityId,
    int Capacity,
    decimal PricePerPerson,
    byte[]? ImageData,
    string? ImageFileName,
    string? ImageContentType) : IRequest<ErrorOr<VenueDto>>;
