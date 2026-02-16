using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Configurations;

public class WeddingVenueConfiguration : IEntityTypeConfiguration<WeddingVenue>
{
    public void Configure(EntityTypeBuilder<WeddingVenue> builder)
    {
        ConfigureWeddingVenuesTable(builder);
        ConfigureWeddingGalleryImagesTable(builder);
    }

    private void ConfigureWeddingVenuesTable(EntityTypeBuilder<WeddingVenue> builder)
    {
        builder.ToTable("WeddingVenues");

        builder.HasKey(v => v.Id);

        builder.Property(v => v.Id)
            .HasConversion(
                id => id.Value,
                value => VenueId.Create(value))
            .ValueGeneratedNever();

        builder.Property(v => v.UserId)
            .HasConversion(
                id => id.Value,
                value => UserId.Create(value))
            .IsRequired();

        builder.Property(v => v.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(v => v.Description)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(v => v.Capacity)
            .IsRequired();

        builder.Property(v => v.MainImageUrl)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(v => v.CreatedAt)
            .IsRequired();

        builder.Property(v => v.UpdatedAt)
            .IsRequired();

        builder.OwnsOne(v => v.Address, address =>
        {
            address.Property(a => a.Street)
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnName("Address_Street");

            address.Property(a => a.City)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Address_City");
        });

        builder.OwnsOne(v => v.PriceRange, priceRange =>
        {
            priceRange.Property(p => p.Min)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasColumnName("PriceRange_Min");

            priceRange.Property(p => p.Max)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasColumnName("PriceRange_Max");
        });
    }

    private void ConfigureWeddingGalleryImagesTable(EntityTypeBuilder<WeddingVenue> builder)
    {
        builder.OwnsMany(v => v.Gallery, gb =>
        {
            gb.ToTable("WeddingGalleryImages");

            gb.HasKey("Id", "WeddingVenueId");

            gb.Property(g => g.Id)
                .HasConversion(
                    id => id.Value,
                    value => GalleryImageId.Create(value))
                .ValueGeneratedNever();

            gb.Property(g => g.Url)
                .IsRequired()
                .HasMaxLength(500);

            gb.Property(g => g.Order)
                .IsRequired();

            gb.Property(g => g.CreatedAt)
                .IsRequired();

            gb.Property(g => g.UpdatedAt)
                .IsRequired();

            gb.WithOwner().HasForeignKey("WeddingVenueId");
        });

        builder.Metadata.FindNavigation(nameof(WeddingVenue.Gallery))!
            .SetPropertyAccessMode(PropertyAccessMode.Field);
    }
}
