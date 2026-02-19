using ErrorOr;
using MapsterMapper;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Venues.Models;

namespace ToInfinity.Application.Venues.GetByUser;

public class GetByUserQueryHandler
    : IRequestHandler<GetByUserQuery, ErrorOr<List<VenueDto>>>
{
    private readonly IWeddingVenueRepository _venueRepository;
    private readonly IMapper _mapper;

    public GetByUserQueryHandler(
        IWeddingVenueRepository venueRepository,
        IMapper mapper)
    {
        _venueRepository = venueRepository;
        _mapper = mapper;
    }

    public async Task<ErrorOr<List<VenueDto>>> Handle(
        GetByUserQuery query,
        CancellationToken cancellationToken)
    {
        var venues = await _venueRepository.GetByUserIdAsync(query.UserId, cancellationToken);

        return venues.Select(v => _mapper.Map<VenueDto>(v)).ToList();
    }
}
