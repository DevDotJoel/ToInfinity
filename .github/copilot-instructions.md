# Copilot Instructions

## Architecture

- Clean Architecture with 5 layers: Api, Application, Domain, Infrastructure, Contracts
- CQRS using MediatR
- DDD: Entities, Value Objects, Domain Events, Aggregates
- ErrorOr for error handling (never throw exceptions in domain/application)

## Backend (.NET)

### Controllers

- Inject IMediator and IMapper only
- No business logic, repositories, or other services
- All methods async, return IActionResult
- No try/catch blocks
- Use ErrorOr Pattern: `result.Match(Ok, Problem)`

### Application Layer (CQRS)

- Commands/Queries: records implementing IRequest<ErrorOr<T>>
- Handlers: IRequestHandler<TCommand, ErrorOr<TResult>>
- One folder per feature: CreateAlbum/, UpdateAlbum/, etc.
- Each folder contains: Command.cs, CommandHandler.cs, CommandValidator.cs

### Domain Layer

- Entities inherit Entity<TId> where TId is a ValueObject
- Private setters, public setter methods (SetName, SetDescription)
- Factory methods: `public static Entity Create(...)`
- Strongly-typed IDs (AlbumId, UserId) inherit EntityId<Guid>
- Domain events: records implementing IDomainEvent

### Validation

- FluentValidation for all commands/queries
- Validation pipeline behavior in MediatR

### Mapping

- Mapster with IRegister config classes
- Api layer: Request → Command
- Application layer: Entity → Model

## Frontend (React + TypeScript)

### Structure

- Feature-based: features/albums/{api, components, types, routes}
- Export public API via index.ts

### Forms

- React Hook Form + Zod (zodResolver)
- Zod schemas mirror backend DTOs exactly

### API Calls

- Never call APIs from components directly
- Use centralized api client (Axios) from libs/api-client.ts
- Wrap in TanStack Query custom hooks: useCreateAlbum(), useAlbums()
- Pattern: api function → custom hook → component

### Components

- Functional components only
- TypeScript interfaces for props

## Naming Conventions

- Backend: PascalCase for files/classes
- Frontend: kebab-case for files, PascalCase for components
- No abbreviations except standard ones (Id, Url, Dto)
