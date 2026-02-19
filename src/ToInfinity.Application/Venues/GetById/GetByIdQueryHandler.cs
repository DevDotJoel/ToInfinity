using ErrorOr;
using MapsterMapper;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Venues.Models;

namespace ToInfinity.Application.Venues.GetById;

public class GetByIdQueryHandler
    : IRequestHandler<GetByIdQuery, ErrorOr<VenueDto>>
{
    private readonly IWeddingVenueRepository _venueRepository;
    private readonly IMapper _mapper;

    public GetByIdQueryHandler(
        IWeddingVenueRepository venueRepository,
        IMapper mapper)
    {
        _venueRepository = venueRepository;
        _mapper = mapper;
    }

    public async Task<ErrorOr<VenueDto>> Handle(
        GetByIdQuery query,
        CancellationToken cancellationToken)
    {
        var venue = await _venueRepository.GetByIdAsync(query.VenueId, cancellationToken);

        if (venue is null)
        {
            return Error.NotFound(
                code: "Venue.NotFound",
                description: "The specified venue does not exist.");
        }

        return _mapper.Map<VenueDto>(venue);
    }
}
