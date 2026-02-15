using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.Shared;
using ToInfinity.Infrastructure.Identity;

namespace ToInfinity.Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<WeddingVenue> WeddingVenues => Set<WeddingVenue>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }

    public override int SaveChanges()
    {
        UpdateAuditableEntities();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateAuditableEntities();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateAuditableEntities()
    {
        var entries = ChangeTracker.Entries<AuditableEntity>();

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Property(nameof(AuditableEntity.CreatedAt)).CurrentValue = DateTime.UtcNow;
                entry.Property(nameof(AuditableEntity.UpdatedAt)).CurrentValue = DateTime.UtcNow;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Property(nameof(AuditableEntity.UpdatedAt)).CurrentValue = DateTime.UtcNow;
            }
        }
    }
}
