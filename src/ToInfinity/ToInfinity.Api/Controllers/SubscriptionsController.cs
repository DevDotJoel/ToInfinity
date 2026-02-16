using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using ToInfinity.Api.Services;
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
    private readonly IConfiguration _configuration;

    public SubscriptionsController(
        ISubscriptionService subscriptionService,
        IUserContext userContext,
        IMapper mapper,
        IConfiguration configuration)
    {
        _subscriptionService = subscriptionService;
        _userContext = userContext;
        _mapper = mapper;
        _configuration = configuration;
    }

    [HttpPost("checkout")]
    [Authorize]
    public async Task<IActionResult> CreateCheckout(
        [FromBody] CreateCheckoutSessionRequest request,
        CancellationToken cancellationToken)
    {
        var planType = Enum.Parse<PlanType>(request.PlanType);
        var userId = _userContext.GetCurrentUserId().Value;

        var checkoutUrl = await _subscriptionService.CreateSubscriptionCheckoutAsync(
            userId,
            planType,
            cancellationToken);

        return Ok(new CreateCheckoutSessionResponse(checkoutUrl));
    }

    [HttpGet("current")]
    [Authorize]
    public async Task<IActionResult> GetCurrentSubscription(
        CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId().Value;

        var subscription = await _subscriptionService.GetUserSubscriptionAsync(
            userId,
            cancellationToken);

        if (subscription == null)
            return NotFound();

        return Ok(_mapper.Map<SubscriptionResponse>(subscription));
    }

    [HttpPost("webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> StripeWebhook(CancellationToken cancellationToken)
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();
        var signature = Request.Headers["Stripe-Signature"].ToString();
        var webhookSecret = _configuration["Stripe:WebhookSecret"];

        try
        {
            var stripeEvent = EventUtility.ConstructEvent(json, signature, webhookSecret);

            switch (stripeEvent.Type)
            {
                case "checkout.session.completed":
                    var session = stripeEvent.Data.Object as Session;
                    if (session != null)
                    {
                        await _subscriptionService.CompleteSubscriptionCheckoutAsync(
                            session.Id,
                            cancellationToken);
                    }
                    break;

                case "customer.subscription.updated":
                case "customer.subscription.deleted":
                    var subscription = stripeEvent.Data.Object as Stripe.Subscription;
                    if (subscription != null)
                    {
                        await _subscriptionService.SyncSubscriptionStatusAsync(
                            subscription.Id,
                            cancellationToken);
                    }
                    break;
            }

            return Ok();
        }
        catch (StripeException)
        {
            return BadRequest();
        }
    }

    [HttpPost("cancel")]
    [Authorize]
    public async Task<IActionResult> CancelSubscription(CancellationToken cancellationToken)
    {
        var userId = _userContext.GetCurrentUserId().Value;

        await _subscriptionService.CancelSubscriptionAsync(
            userId,
            cancellationToken);

        return Ok();
    }
}
