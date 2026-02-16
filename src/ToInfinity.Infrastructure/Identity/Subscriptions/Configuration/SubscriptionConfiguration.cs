using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToInfinity.Infrastructure.Identity.Subscriptions.Entities;

namespace ToInfinity.Infrastructure.Identity.Subscriptions.Configuration;

public class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
{
    public void Configure(EntityTypeBuilder<Subscription> builder)
    {
        builder.ToTable("Subscriptions");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.UserId)
            .IsRequired()
            .HasMaxLength(450);

        builder.Property(s => s.PlanType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(s => s.Status)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(s => s.StripeSubscriptionId)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(s => s.StripeCustomerId)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(s => s.Amount)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(s => s.Currency)
            .IsRequired()
            .HasMaxLength(3);

        builder.Property(s => s.StartDate)
            .IsRequired();

        builder.Property(s => s.CreatedAt)
            .IsRequired();

        builder.Property(s => s.UpdatedAt)
            .IsRequired();

        // Relationship with ApplicationUser
        builder.HasOne(s => s.User)
            .WithMany(u => u.SubscriptionHistory)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(s => s.UserId);
        builder.HasIndex(s => s.StripeSubscriptionId)
            .IsUnique();
        builder.HasIndex(s => new { s.UserId, s.Status });
    }
}
