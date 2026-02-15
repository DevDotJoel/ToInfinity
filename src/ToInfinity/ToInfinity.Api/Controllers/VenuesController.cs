using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToInfinity.Application.Common.Services;
using ToInfinity.Application.Common.Storage;
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
    private readonly IFileStorageService _fileStorageService;

    public VenuesController(
        IMediator mediator,
        IMapper mapper,
        IUserContext userContext,
        IFileStorageService fileStorageService)
    {
        _mediator = mediator;
        _mapper = mapper;
        _userContext = userContext;
        _fileStorageService = fileStorageService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateVenue(
        [FromForm] CreateWeddingVenueRequest request,
        CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId();

        // Upload main image to Azure Storage (API layer responsibility)
        byte[] imageData;
        using (var memoryStream = new MemoryStream())
        {
            await request.MainImage.CopyToAsync(memoryStream, cancellationToken);
            imageData = memoryStream.ToArray();
        }

        var mainImageUrl = await _fileStorageService.UploadImageAsync(
            imageData,
            request.MainImage.FileName,
            request.MainImage.ContentType,
            "venues",
            $"{userId.Value}/main-image",
            cancellationToken);

        // Map to command using Mapster
        var command = _mapper.Map<CreateWeddingVenueOnboardingCommand>((request, userId, mainImageUrl));

        var result = await _mediator.Send(command, cancellationToken);

        return result.Match(
            Ok,
            errors => Problem(errors));
    }
}
