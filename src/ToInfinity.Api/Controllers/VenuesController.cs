using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToInfinity.Application.Common.Services;
using ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;
using ToInfinity.Application.Venues.GetById;
using ToInfinity.Application.Venues.GetByUser;
using ToInfinity.Application.Venues.GetMyVenueById;
using ToInfinity.Application.Venues.SearchVenues;
using ToInfinity.Application.Venues.UpdateWeddingVenue;
using ToInfinity.Contracts.Venues;
using ToInfinity.Domain.ValueObjects;

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

    [AllowAnonymous]
    [HttpGet("search")]
    public async Task<IActionResult> SearchVenues(
        [FromQuery] SearchVenuesRequest request,
        CancellationToken cancellationToken)
    {
        var query = _mapper.Map<SearchVenuesQuery>(request);

        var result = await _mediator.Send(query, cancellationToken);

        return result.Match(
            Ok,
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetVenue(
        Guid id,
        CancellationToken cancellationToken)
    {
        var venueId = VenueId.Create(id);

        var query = new GetByIdQuery(venueId);

        var result = await _mediator.Send(query, cancellationToken);

        return result.Match(
            Ok,
            errors => Problem(errors));
    }

    [HttpGet("mine")]
    public async Task<IActionResult> GetMyVenues(CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId();

        var query = new GetByUserQuery(userId);

        var result = await _mediator.Send(query, cancellationToken);

        return result.Match(
            Ok,
            errors => Problem(errors));
    }

    [HttpGet("mine/{id:guid}")]
    public async Task<IActionResult> GetMyVenue(
        Guid id,
        CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId();
        var venueId = VenueId.Create(id);

        var query = new GetMyVenueByIdQuery(venueId, userId);

        var result = await _mediator.Send(query, cancellationToken);

        return result.Match(
            Ok,
            errors => Problem(errors));
    }

    [HttpPost]
    public async Task<IActionResult> CreateVenue(
        [FromForm] CreateWeddingVenueRequest request,
        CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId();

        var command = _mapper.Map<CreateWeddingVenueOnboardingCommand>((request, userId));

        var result = await _mediator.Send(command, cancellationToken);

        return result.Match(
            Ok,
            errors => Problem(errors));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateVenue(
        Guid id,
        [FromForm] UpdateWeddingVenueRequest request,
        CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId();
        var venueId = VenueId.Create(id);

        var command = _mapper.Map<UpdateWeddingVenueCommand>((request, userId, venueId));

        var result = await _mediator.Send(command, cancellationToken);

        return result.Match(
            Ok,
            errors => Problem(errors));
    }
}
