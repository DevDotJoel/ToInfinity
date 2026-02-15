using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Configurations;

public class WeddingGalleryImageConfiguration : IEntityTypeConfiguration<WeddingGalleryImage>
{
    public void Configure(EntityTypeBuilder<WeddingGalleryImage> builder)
    {
        builder.ToTable("WeddingGalleryImages");

        builder.HasKey(i => i.Id);

        builder.Property(i => i.Id)
            .HasConversion(
                id => id.Value,
                value => GalleryImageId.Create(value))
            .ValueGeneratedNever();

        builder.Property(i => i.Url)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(i => i.Order)
            .IsRequired();

        builder.Property(i => i.CreatedAt)
            .IsRequired();

        builder.Property(i => i.UpdatedAt)
            .IsRequired();

        builder.Property<Guid>("VenueId")
            .IsRequired();
    }
}
