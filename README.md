# ToInfinity

A wedding venue management platform built with Clean Architecture principles, CQRS, and Domain-Driven Design.

## 🏗️ Architecture

This project follows **Clean Architecture** with 5 distinct layers:

- **Api** - ASP.NET Core Web API (Presentation Layer)
- **Application** - Use Cases / Business Logic (CQRS with MediatR)
- **Domain** - Business Entities, Value Objects, Domain Events
- **Infrastructure** - External Concerns (EF Core, Identity, JWT)
- **Contracts** - DTOs for API communication

### Key Architectural Patterns

- **CQRS** - Command Query Responsibility Segregation using MediatR
- **DDD** - Domain-Driven Design with Aggregates, Entities, Value Objects
- **ErrorOr** - Functional error handling (no exceptions in domain/application)
- **Repository Pattern** - Data access abstraction
- **JWT Authentication** - Token-based security with refresh tokens

## 🚀 Tech Stack

### Backend

- **.NET 9.0**
- **ASP.NET Core Identity** - User authentication and management
- **Entity Framework Core 9.0** - ORM with SQL Server
- **MediatR** - CQRS implementation
- **FluentValidation** - Input validation
- **Mapster** - Object-to-object mapping
- **ErrorOr** - Functional error handling

### Database

- **SQL Server** - Primary data store

## 📁 Project Structure

```
ToInfinity/
├── src/
│   └── ToInfinity/
│       ├── ToInfinity.Api/                    # ASP.NET Core Web API
│       │   ├── Controllers/                   # API Controllers
│       │   ├── Mappings/                      # Mapster configurations
│       │   └── Services/                      # API services (UserContext)
│       ├── ToInfinity.Application/            # Application Layer (CQRS)
│       │   ├── Common/
│       │   │   ├── Identity/                  # Auth interfaces
│       │   │   ├── Persistence/               # Repository interfaces
│       │   │   └── Services/                  # Application services
│       │   └── Venues/
│       │       └── CreateWeddingVenueOnboarding/  # Feature folder
│       │           ├── Command.cs
│       │           ├── CommandHandler.cs
│       │           └── CommandValidator.cs
│       ├── ToInfinity.Contracts/              # DTOs
│       │   ├── Auth/                          # Authentication DTOs
│       │   └── Venues/                        # Venue DTOs
│       ├── ToInfinity.Domain/                 # Domain Layer
│       │   ├── Entities/                      # Aggregates & Entities
│       │   ├── Events/                        # Domain Events
│       │   ├── Interfaces/                    # Domain interfaces
│       │   ├── Shared/                        # Base classes
│       │   └── ValueObjects/                  # Value Objects
│       └── ToInfinity.Infrastructure/         # Infrastructure Layer
│           ├── Identity/                      # Identity & JWT services
│           └── Persistence/                   # EF Core, Repositories
└── .github/
    └── copilot-instructions.md               # Development guidelines
```

## 🛠️ Getting Started

### Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads) (LocalDB or full instance)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/DevDotJoel/ToInfinity.git
   cd ToInfinity
   ```

2. **Configure Application Settings**

   Copy the template and update with your settings:

   ```bash
   cd src/ToInfinity.Api
   # Edit appsettings.Development.json with your configuration
   ```

   Required settings:
   - **ConnectionStrings:DefaultConnection** - SQL Server connection string
   - **JWTSettings:securityKey** - JWT signing key (min 32 characters)
   - **Azure:Storage** - Azure Storage connection string (if using)
   - **Google:ClientId/ClientSecret** - Google OAuth credentials (if using)
   - **Stripe:ApiKey** - Stripe API key (if using)

3. **Restore Dependencies**

   ```bash
   dotnet restore
   ```

4. **Apply Database Migrations**

   ```bash
   cd src/ToInfinity.Infrastructure
   dotnet ef database update --project ../ToInfinity.Api
   ```

5. **Run the Application**

   ```bash
   cd ../ToInfinity.Api
   dotnet run
   ```

   The API will be available at:
   - HTTPS: `https://localhost:7001`
   - HTTP: `http://localhost:5000`

## 🔐 Authentication

The API uses JWT-based authentication with refresh tokens:

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

### Response

```json
{
  "userId": "guid",
  "accessToken": "eyJhbGc...",
  "refreshToken": "random-string"
}
```

### Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "accessToken": "expired-token",
  "refreshToken": "refresh-token"
}
```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Venues (Requires Authentication)

- `POST /api/venues` - Create wedding venue

## 🏛️ Domain Model

### Aggregates

- **WeddingVenue** - Wedding venue aggregate root with gallery images

### Value Objects

- **UserId** - Strongly-typed user identifier
- **VenueId** - Strongly-typed venue identifier
- **Address** - Street and City
- **PriceRange** - Min and Max pricing

### Domain Events

- **VenueCreated** - Raised when venue is created

## 🧪 Development Guidelines

### Controllers

- Inject `IMediator` and `IMapper` only
- No business logic in controllers
- Use ErrorOr pattern: `result.Match(Ok, Problem)`
- All methods async, return `IActionResult`

### CQRS Commands/Queries

- Implement `IRequest<ErrorOr<T>>`
- One folder per feature
- Include Command, CommandHandler, and CommandValidator

### Domain Layer

- Entities inherit `Entity<TId>`
- Use factory methods: `Entity.Create(...)`
- Strongly-typed IDs (UserId, VenueId)
- Private setters, public setter methods
- No exceptions - return `ErrorOr<T>`

### Validation

- FluentValidation for all commands/queries
- Validate in Application layer, not Domain

### Mapping

- Mapster with `IRegister` config classes
- Api: Request → Command
- Application: Entity → Response

## 📦 NuGet Packages

### Core

- Microsoft.EntityFrameworkCore (9.0.0)
- Microsoft.EntityFrameworkCore.SqlServer (9.0.0)
- Microsoft.AspNetCore.Identity.EntityFrameworkCore (9.0.0)

### Authentication

- Microsoft.AspNetCore.Authentication.JwtBearer (9.0.0)

### CQRS & Validation

- MediatR (14.0.0)
- FluentValidation (12.1.1)

### Mapping & Error Handling

- Mapster (7.4.0)
- Mapster.DependencyInjection (1.0.1)
- ErrorOr

## 🔒 Security Notes

- **Never commit secrets** - Use `appsettings.Development.json` for local secrets (already in .gitignore)
- **Rotate exposed secrets** - If secrets are accidentally committed, rotate them immediately
- **Use strong JWT keys** - Minimum 32 characters
- **Enable HTTPS** - Always use HTTPS in production
- **Validate inputs** - FluentValidation on all commands/queries

## 🤝 Contributing

1. Follow Clean Architecture principles
2. Use CQRS for all business operations
3. Apply DDD patterns (Aggregates, Value Objects, Events)
4. Write unit tests for domain logic
5. Use ErrorOr for error handling (no exceptions)
6. Follow naming conventions in copilot-instructions.md

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

DevDotJoel

---

For detailed development guidelines, see [.github/copilot-instructions.md](.github/copilot-instructions.md)
