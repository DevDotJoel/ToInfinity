using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToInfinity.Application.Common.Services;
using ToInfinity.Application.Subscriptions.Models;
using ToInfinity.Contracts.Subscriptions;

namespace ToInfinity.Api.Controllers;

[Route("api/[controller]")]
public class SubscriptionsController : ApiController
{
    private readonly ISubscriptionService _subscriptionService;
    private readonly IUserContext _userContext;
    private readonly IMapper _mapper;

    public SubscriptionsController(
        ISubscriptionService subscriptionService,
        IUserContext userContext,
        IMapper mapper)
    {
        _subscriptionService = subscriptionService;
        _userContext = userContext;
        _mapper = mapper;
    }

    [HttpPost("checkout")]
    [Authorize]
    public async Task<IActionResult> CreateCheckout(
        [FromBody] CreateCheckoutSessionRequest request,
        CancellationToken cancellationToken)
    {
        var planType = Enum.Parse<PlanType>(request.PlanType);
        var userId = _userContext.GetCurrentUserId();

        var result = await _subscriptionService.CreateSubscriptionCheckoutAsync(
            userId,
            planType,
            cancellationToken);

        return result.Match(
            url => Ok(new CreateCheckoutSessionResponse(url)),
            Problem);
    }

    [HttpGet("current")]
    [Authorize]
    public async Task<IActionResult> GetCurrentSubscription(
        CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId();

        var result = await _subscriptionService.GetUserSubscriptionAsync(
            userId,
            cancellationToken);

        return result.Match(
            subscription => Ok(_mapper.Map<SubscriptionResponse>(subscription)),
            Problem);
    }

    [HttpPost("webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> StripeWebhook(CancellationToken cancellationToken)
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();
        var signature = Request.Headers["Stripe-Signature"].ToString();

        var result = await _subscriptionService.HandleWebhookAsync(
            json,
            signature,
            cancellationToken);

        return result.Match(
            _ => Ok(),
            Problem);
    }

    [HttpPost("cancel")]
    [Authorize]
    public async Task<IActionResult> CancelSubscription(CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId();

        var result = await _subscriptionService.CancelSubscriptionAsync(
            userId,
            cancellationToken);

        return result.Match(
            _ => Ok(),
            Problem);
    }
}
