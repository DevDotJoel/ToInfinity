using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToInfinity.Application.Common.Services;
using ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;
using ToInfinity.Contracts.Venues;

namespace ToInfinity.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class VenuesController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IUserContext _userContext;

    public VenuesController(
        IMediator mediator,
        IMapper mapper,
        IUserContext userContext)
    {
        _mediator = mediator;
        _mapper = mapper;
        _userContext = userContext;
    }

    [HttpPost]
    public async Task<IActionResult> CreateVenue(
        CreateWeddingVenueRequest request,
        CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId();

        var command = _mapper.Map<CreateWeddingVenueOnboardingCommand>((request, userId));

        var result = await _mediator.Send(command, cancellationToken);

        return result.Match(
            venueResult => Ok(venueResult),
            errors => Problem(errors));
    }
}
