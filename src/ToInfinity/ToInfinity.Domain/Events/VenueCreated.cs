using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.Events;

public record VenueCreated(Guid VenueId) : IDomainEvent;
