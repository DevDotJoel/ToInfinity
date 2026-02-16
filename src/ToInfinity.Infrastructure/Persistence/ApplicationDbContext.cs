using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.Shared;
using ToInfinity.Infrastructure.Identity;
using ToInfinity.Infrastructure.Identity.Subscriptions.Entities;

namespace ToInfinity.Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
{

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<WeddingVenue> WeddingVenues => Set<WeddingVenue>();
    public DbSet<Subscription> Subscriptions => Set<Subscription>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Customize Identity table names
        modelBuilder.Entity<ApplicationUser>().ToTable("Users");
        modelBuilder.Entity<ApplicationRole>().ToTable("Roles");
        modelBuilder.Entity<IdentityUserClaim<Guid>>().ToTable("UsersClaims");
        modelBuilder.Entity<IdentityUserRole<Guid>>().ToTable("UsersRoles");
        modelBuilder.Entity<IdentityUserLogin<Guid>>().ToTable("UsersLogins");
        modelBuilder.Entity<IdentityRoleClaim<Guid>>().ToTable("RolesClaims");
        modelBuilder.Entity<IdentityUserToken<Guid>>().ToTable("UsersTokens");

        // Seed roles
        SeedRoles(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }

    private void SeedRoles(ModelBuilder modelBuilder)
    {
        var userRoleId = Guid.Parse("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d");
        var adminRoleId = Guid.Parse("b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e");

        modelBuilder.Entity<ApplicationRole>().HasData(
            new ApplicationRole
            {
                Id = userRoleId,
                Name = "User",
                NormalizedName = "USER",
                ConcurrencyStamp = userRoleId.ToString()
            },
            new ApplicationRole
            {
                Id = adminRoleId,
                Name = "Administrator",
                NormalizedName = "ADMINISTRATOR",
                ConcurrencyStamp = adminRoleId.ToString()
            }
        );
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
