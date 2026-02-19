using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToInfinity.Application.Locations.GetLocations;
using ToInfinity.Contracts.Locations;

namespace ToInfinity.Api.Controllers;

[Route("api/[controller]")]
public class LocationsController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public LocationsController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetLocations(CancellationToken cancellationToken)
    {
        var query = new GetLocationsQuery();

        var result = await _mediator.Send(query, cancellationToken);

        return result.Match(
            locationsDto => Ok(_mapper.Map<LocationsResponse>(locationsDto)),
            errors => Problem(errors));
    }
}
