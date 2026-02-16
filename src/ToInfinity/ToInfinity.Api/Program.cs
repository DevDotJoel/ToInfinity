using System.Reflection;
using AspNetCoreRateLimit;
using Mapster;
using MapsterMapper;
using ToInfinity.Api.Services;
using ToInfinity.Application;
using ToInfinity.Application.Common.Services;
using ToInfinity.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserContext, UserContext>();

// Configure rate limiting
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.Configure<IpRateLimitPolicies>(builder.Configuration.GetSection("IpRateLimitPolicies"));
builder.Services.AddInMemoryRateLimiting();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

// Configure CORS for same-domain (subdomain)
builder.Services.AddCors(options =>
{
    options.AddPolicy("SameDomain", policy =>
    {
        var frontendUrl = builder.Configuration["WebApp:FrontendPublicUrl"]
            ?? "https://toinfinity.com";

        policy.WithOrigins(frontendUrl)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // Required for cookies
    });
});

// Configure Mapster
var config = TypeAdapterConfig.GlobalSettings;
config.Scan(Assembly.GetExecutingAssembly());
builder.Services.AddSingleton(config);
builder.Services.AddScoped<IMapper, ServiceMapper>();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseIpRateLimiting();

app.UseCors("SameDomain");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
