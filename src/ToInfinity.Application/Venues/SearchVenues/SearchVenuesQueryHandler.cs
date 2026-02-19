using ErrorOr;
using MapsterMapper;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.SearchVenues;

public class SearchVenuesQueryHandler
    : IRequestHandler<SearchVenuesQuery, ErrorOr<List<VenueDto>>>
{
    private readonly IWeddingVenueRepository _venueRepository;
    private readonly IMapper _mapper;

    public SearchVenuesQueryHandler(
        IWeddingVenueRepository venueRepository,
        IMapper mapper)
    {
        _venueRepository = venueRepository;
        _mapper = mapper;
    }

    public async Task<ErrorOr<List<VenueDto>>> Handle(
        SearchVenuesQuery query,
        CancellationToken cancellationToken)
    {
        var countryId = query.CountryId.HasValue ? CountryId.Create(query.CountryId.Value) : null;
        var districtId = query.DistrictId.HasValue ? DistrictId.Create(query.DistrictId.Value) : null;
        var municipalityId = query.MunicipalityId.HasValue ? MunicipalityId.Create(query.MunicipalityId.Value) : null;

        var venues = await _venueRepository.SearchAsync(
            countryId,
            districtId,
            municipalityId,
            query.Page,
            query.Size,
            cancellationToken);

        return venues.Select(v => _mapper.Map<VenueDto>(v)).ToList();
    }
}
