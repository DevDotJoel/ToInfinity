using ErrorOr;
using MapsterMapper;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Venues.Models;

namespace ToInfinity.Application.Venues.GetMyVenueById;

public class GetMyVenueByIdQueryHandler
    : IRequestHandler<GetMyVenueByIdQuery, ErrorOr<VenueDto>>
{
    private readonly IWeddingVenueRepository _venueRepository;
    private readonly IMapper _mapper;

    public GetMyVenueByIdQueryHandler(
        IWeddingVenueRepository venueRepository,
        IMapper mapper)
    {
        _venueRepository = venueRepository;
        _mapper = mapper;
    }

    public async Task<ErrorOr<VenueDto>> Handle(
        GetMyVenueByIdQuery query,
        CancellationToken cancellationToken)
    {
        var venue = await _venueRepository.GetByIdAsync(query.VenueId, cancellationToken);

        if (venue is null)
        {
            return Error.NotFound(
                code: "Venue.NotFound",
                description: "The specified venue does not exist.");
        }

        if (venue.UserId != query.UserId)
        {
            return Error.Forbidden(
                code: "Venue.Forbidden",
                description: "You do not have access to this venue.");
        }

        return _mapper.Map<VenueDto>(venue);
    }
}
